import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'login',
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {

                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email and password are required");
                }

                try {

                    await dbConnect();

                    const user = await UserModel.findOne({email: credentials.email});

                    if(!user){
                        throw new Error("No user found with this email");
                    }

                    // if the user is found, we need to verify the user's password
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if(!isPasswordCorrect){
                        throw new Error("Incorrect password")
                    }

                    // return the user object
                    return {
                        _id: user._id.toString(),
                        email: user.email
                    }
                    
                } catch (error: any) {
                    throw new Error(error)
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if(user){
                token._id = user._id        // this token is saved in the jwt
            }

            return token;

        },
        async session({ session, token}) {

            if(token._id){
                session.user._id = token._id as string
            }

            return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
}