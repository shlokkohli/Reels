import mongoose, { Schema } from "mongoose";

export interface User {
    _id?: mongoose.Types.ObjectId;
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

// Since Next.js runs in a serverless/edge environment, the code is re-executed on every request.  
// If we don’t check for an existing model, it may try to redefine the model multiple times, causing errors.  
// To prevent this, we reuse the model if it already exists in `mongoose.models`.

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;