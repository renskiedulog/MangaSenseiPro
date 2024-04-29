import React from "react";
import { Skeleton } from "../ui/skeleton";

const FeaturedLoader = () => {
  return (
    <Skeleton className="static md:sticky top-0 md:top-16 w-full mb-2 flex flex-col justify-end gap-1 p-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-10 h-5 bg-[#0001] dark:bg-[#fff1]"
          />
        ))}
      </div>
      <Skeleton className="w-full h-40 bg-[#0001] dark:bg-[#fff1]" />
    </Skeleton>
  );
};

export default FeaturedLoader;
