"use client";
import React, { useRef, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from 'lucide-react'
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FIleUploadProps {
    onSuccess: (res: IKUploadResponse) => void
    onProgress?: (progess: number) => void
    fileType?: "image" | "video"
}

export default function FileUpload({onSuccess, onProgress, fileType} : FIleUploadProps) {

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState <string | null> (null)

  const onError = (err : {message : string}) => {
    console.log("Error", err);
    setError(err.message)
    setUploading(false)
  };
  
  const handleSuccess = (response : IKUploadResponse) => {
    setUploading(false)
    setError(null)
    onSuccess(response)
  };
  
  const handleProgress = (event : ProgressEvent) => {
    if(event.lengthComputable && onProgress){ // make sure onProgress is not undefined
        const percentage = (event.loaded / event.total) * 100
        onProgress(Math.round(percentage))
    }
  };
  
  const handleStartUpload = () => {
    setUploading(true)
    setError(null)
  };

  const validateFile = (file : File) => {
    // check if the upload type is video
    if(fileType === 'video'){
        //if not video then throw error
        if(!file.type.startsWith('video/')){
            setError("Please upload a video file");
            return false;
        }
        // if video file size > 100 MB, throw error
        if(file.size > 100 * 1024 * 1024){
            setError("Video must be less than 100 MB")
            return false;
        }
    } else {
        // if image is uploaded (apart from any of these formats), throw error
        const validTypes = ['image/jpeg', 'image/png', 'image/webp']
        if(!validTypes.includes(file.type)){
            setError("Please upload a valid file (JPEG, PNG, webP)")
            return false
        }
        if(file.size > 5 * 1024 * 1024){
            setError("Image must be less than 5 MB")
            return false;
        }
    }
    return true;
  }

  return (

    <div className="space-y-2">
        
        <IKUpload
          fileName={fileType == "video" ? "video" : "image"}
          useUniqueFileName={true}
          validateFile={validateFile}
          
          className="file-input file-input-bordered w-full"

          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          folder={fileType === "video" ? "/videos" : "/images"}
        />

        {uploading && (
            <div className="flex items-center gap-2 text-sm text-primary">
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Uploading...</span>
            </div>
        )}

        {error && (
            <div className="text-error text-sm">{error}</div>
        )}

    </div>
  );
}