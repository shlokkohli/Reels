'use client'
import { Video } from '@/models/Video'
import { IKVideo } from 'imagekitio-next'
import React from 'react'

interface videoDataType {
  video: Video
}

const VideoRender = ({video} : videoDataType) => {

  console.log(video.videoURL)

  return (
    <div>
      
    </div>
  )
}

export default VideoRender