import mongoose, { Document, Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
    height: 1920,
    width: 1080
} as const

export interface Video extends Document {
    title: string,
    description: string,
    videoURL: string,
    thumbnailURL: string,
    controls?: boolean,
    transformation?: {
        height: number,
        width: number,
        quality?: number
    },
    createdAt?: Date,
    updatedAt?: Date
}

const videoSchema = new Schema<Video>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        videoURL: {
            type: String,
            required: true,
        },
        thumbnailURL: {
            type: String,
            required: true,
        },
        controls: {
            type: Boolean,
            default: true
        },
        transformation: {
            height: {
                type: Number,
                default: VIDEO_DIMENSIONS.height,
            },
            width: {
                type: Number,
                default: VIDEO_DIMENSIONS.width,
            },
            quality: {
                type: Number,
                min: 1,
                max: 100
            }
        }
    },
    { timestamps: true }
)

const VideoModel = (mongoose.models.Video as mongoose.Model<Video>) || mongoose.model<Video>("Video", videoSchema);

export default VideoModel;