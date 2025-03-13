import VideoModel from "@/models/Video";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { Video } from '@/models/Video'

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

        // check if the user is authenticated (logged in)
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json(
                { error : "Unauthorized" },
                { status: 401 }
            )
        }

        await dbConnect();

        // take the required data from the frontend
        const videoData : Video = await request.json();

        if(!videoData.title || !videoData.description || !videoData.videoURL || !videoData.thumbnailURL){
            return NextResponse.json(
                { error : "Missing required fields" },
                { status : 400 }
            )
        }
        
        await VideoModel.create(videoData);

        return NextResponse.json(
            { message : " Video uploaded successfully"},
            { status : 200 }
        )

    } catch (error) {

        NextResponse.json(
            { error : "Failed to save video" },
            { status : 500 }
        )
        
    }
}