import { NextRequest, NextResponse, userAgent } from "next/server";
import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {

    try {

        const { email, password } = await request.json();

        if(!email || !password){
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            )
        }

        await dbConnect();

        // before registering a user check if there is already an existing user
        const existingUser = await UserModel.findOne({ email });

        if(existingUser){
            return NextResponse.json(
                { error: "Email is already registered" },
                { status: 400 }
            )
        }

        // if there is no existing user, create one

        // first hash the password of the user
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            email,
            password: hashedPassword,
        })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        )
        
    } catch (error) {

        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        )
        
    }

}