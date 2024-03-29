import { Skeleton } from "../ui/skeleton";

const CarouselLoader = () => {
  return (
    <Skeleton className="w-full h-2/5 max-h-[35vh] flex p-3 md:p-5 justify-center items-center gap-3 md:gap-5">
      <Skeleton className="w-1/5 h-5/6 rounded-md bg-[#fff1] dark:bg-[#fff1]" />
      <div className="w-4/5 h-5/6 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-10 h-5 bg-[#0001] dark:bg-[#fff1]" />
          ))}
        </div>
        <Skeleton className="w-full h-10 bg-[#0001] dark:bg-[#fff1]" />
        <Skeleton className="w-full h-24 bg-[#0001] dark:bg-[#fff1]" />
        <div className="flex gap-1 items-center">
        <Skeleton className="w-full max-w-10 h-10 bg-[#0001] dark:bg-[#fff1]" />
        <Skeleton className="w-full max-w-20 h-10 bg-[#0001] dark:bg-[#fff1]" />
        </div>
      </div>
    </Skeleton>
  );
};

export default CarouselLoader;
