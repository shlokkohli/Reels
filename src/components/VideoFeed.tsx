'use client'
import { Video } from "@/models/Video";
import VideoRender from './VideoRender';

interface videoDataType {
    videos: Video[]
}

function VideoFeed({videos} : videoDataType) {

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {videos.map((eachVideo) => (
            <VideoRender key={eachVideo._id?.toString()} video={eachVideo} />
        ))}

        {videos.length === 0 && (
            <div className='col-span-full text-center py-12'>
                <p className='text-base-content/70'>No videos found</p>
            </div>
        )}
    </div>
  )
}

export default VideoFeed