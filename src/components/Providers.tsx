"use client"

import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.IMAGE_KIT_URL_ENDPOINT;
const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    console.log(error)
    throw new Error(`Authentication request failed`);
  }
};

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    
    <SessionProvider>
      <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        {children}
      </ImageKitProvider>
    </SessionProvider>

  );
}