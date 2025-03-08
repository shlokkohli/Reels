import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import FileUpload from "./FileUpload";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast, Toaster } from "sonner";

export default function UploadVideoForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    interface VideoFormat {
        title: string,
        description: string,
        videoURL: string,
        thumbnailURL: string,
    }

    interface errorMessage {
        error: string,
    }

    const form = useForm<VideoFormat>({
        defaultValues: {
            title: '',
            description: '',
            thumbnailURL: '',
            videoURL: '',
        }
    })

    const { setValue } = form;

    const handleUploadSuccess = (response: IKUploadResponse) => {
        setValue('videoURL', response.url);
        setValue('thumbnailURL', response.thumbnailUrl || response.filePath);
    }

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    }

    const onFormSubmit = async (data: VideoFormat) => {
        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/videos', data);

            if (response.statusText == 'OK') {
                toast.success(response?.data?.message);
                setValue('title', '');
                setValue('description', '');
                setValue("videoURL", "");
                setValue("thumbnailURL", "");
                setUploadProgress(0);
            }
        } catch (error) {

            const axiosError = error as AxiosError<errorMessage>;
            const errorMessage = axiosError.response?.data?.error;
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
        
    }

    return (
        <div className=" text-white p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>

            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                <Toaster position="top-right" />

                {/* title */}
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-3">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="w-full bg-gray-800 border-none rounded-lg p-4 text-white"
                        {...form.register('title', { required: "Title is required" })}
                    />
                    {form.formState.errors.title && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.title.message}</p>
                    )}
                </div>

                {/* description */}
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-3">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        className="w-full bg-gray-800 border-none rounded-lg p-4 text-white"
                        {...form.register('description')}
                    />
                </div>

                {/* upload section */}
                <div className="mb-6">
                    <label className="block mb-3">
                        Upload Video
                    </label>
                    <div className="bg-gray-800 rounded-lg">
                        <FileUpload
                            fileType="video"
                            onSuccess={handleUploadSuccess}
                            onProgress={handleUploadProgress}
                        />
                    </div>
                    
                    {uploadProgress > 0 && (
                        <div className="mt-3">
                            <p className="text-indigo-400 mb-2">Uploading...</p>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* submit button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 px-6 rounded-lg font-medium transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 inline animate-spin"/>
                            Publishing video
                        </>
                    ) : (
                        'Publish Video'
                    )}
                </button>
            </form>
        </div>
    );
}