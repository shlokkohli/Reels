'use client'
import { Video } from '@/models/Video'
import { IKVideo } from 'imagekitio-next'
import Link from 'next/link'
import React from 'react'

interface videoDataType {
  video: Video
}

const VideoRender = ({video} : videoDataType) => {

  console.log("this is the id: ",video.videoURL)

  return (
    <div className='card bg-base-100 shadow hover:shadow-lg transition-all duration-300'>
      <figure className='relative px-4 pt-4'>
        <Link href={`/videos/${video._id}`} className='relative group w-full'>
          <div className='rounded-xl overflow-hidden relative w-full' style={{ aspectRatio: "9/16" }}>
            <IKVideo
              path={video.videoURL}
              transformation={[
                {
                  height: '1920',
                  width: '1080',
                },
              ]}
              controls={video.controls}
              className='w-full h-full object-cover'
            />
          </div>
        </Link>
      </figure>
    </div>
  )
}

export default VideoRender