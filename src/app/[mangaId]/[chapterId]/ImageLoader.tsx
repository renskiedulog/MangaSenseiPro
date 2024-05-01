"use client";
import Image from "next/image";
import React from "react";

const ImageLoader = ({ images }: any) => {
  return (
    <>
      {images !== null &&
        images?.map((image: string, idx: number) =>
          image !== null ? (
            <Image
              src={image}
              alt={`image-${idx}`}
              width={500}
              height={500}
              className="!w-full !h-full"
            />
          ) : (
            ""
          )
        )}
    </>
  );
};

export default ImageLoader;
