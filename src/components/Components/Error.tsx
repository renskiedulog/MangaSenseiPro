"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();
  return (
    <div className="w-full flex-col h-screen flex justify-center items-center gap-5">
      <h1 className="text-xl md:text-3xl">An Unexpected Error Occured.</h1>
      <p className="text-lg md:text-xl opacity-70">You might be accessing an empty page.</p>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white text-lg"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    </div>
  );
};

export default Error;
