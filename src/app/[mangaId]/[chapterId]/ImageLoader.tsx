import Image from "next/image";

const ImageLoader = async ({ images }: any) => {
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
              key={idx}
              className="!w-full !h-full object-cover"
              priority
            />
          ) : (
            ""
          )
        )}
    </>
  );
};

export default ImageLoader;
