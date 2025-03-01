import VideoModel from "@/models/Video";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

// to get videos from the database
export async function GET() {

    try {

        await dbConnect();
        
        const videos = await VideoModel.find({}).sort({createdAt: -1}).lean()

        if(!videos || videos.length === 0){
            return NextResponse.json(
                [],
                { status : 200 }
            )
        }

        return NextResponse.json(videos)
        
    } catch (error) {

        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status : 500 }
        )
        
    }
}

// to post video in database
export async function POST(request : NextRequest) {

    try {
        
        const session = await getServerSession(authOptions)

        if(!session){
            return NextResponse.json(
                { error : "Unauthorized" },
                { status: 401 }
            )
        }

        await dbConnect();

    } catch (error) {
        
    }
}