'use client'
import VideoFeed from "@/components/VideoFeed";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Video } from "@/models/Video";

export default function Home() {

  const [videos, setVideos] = useState<Video[]>([]);

  interface ErrorResponse {
    error : string
  }

  useEffect(() => {

    const fetchVideos = async () => {
      try {

        const response = await axios.get('/api/videos');
        const data = response.data;
        setVideos(data)
        
      } catch (error) {
  
        const axiosError = error as AxiosError<ErrorResponse>
        const errorMessage = axiosError.response?.data?.error
        console.log("Error occured while fetching videos ", errorMessage)
        
      }
    }

    fetchVideos();

  }, [])

  return (

    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        ImageKit ReelsPro
      </h1>
      <VideoFeed videos={videos} />
    </main>

  );
}