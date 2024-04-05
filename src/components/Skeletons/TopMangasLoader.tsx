import { Skeleton } from "../ui/skeleton";

const TopMangasLoader = () => {
  return (
    <div className="w-full h-auto mb-2 flex flex-grow flex-col gap-1">
      <Skeleton className="w-full h-10 flex items-center p-2 gap-1">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className="flex-grow h-full w-full bg-[#0001] dark:bg-[#fff1]"
          />
        ))}
      </Skeleton>
      {[...Array(10)].map((_, index) => (
        <div key={index}>
          <Skeleton className="w-full h-10 flex px-2 items-center gap-3">
            <Skeleton className="size-6 rounded-md bg-[#0001] dark:bg-[#fff1]" />
            <Skeleton className="w-full h-6 bg-[#0001] dark:bg-[#fff1]" />
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

export default TopMangasLoader;
