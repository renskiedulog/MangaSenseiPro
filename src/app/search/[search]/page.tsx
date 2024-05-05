import Mangas from "@/components/Components/Mangas";
import PopularMangas from "@/components/Components/PopularMangas";
import StickyHelper from "@/components/Components/StickyHelper";
import MangaSkeleton from "@/components/Skeletons/MangaSkeleton";
import { fetchTopListings, searchManga } from "@/utils/requests";
import React, { Suspense } from "react";

const page = async ({ params }: any) => {
  const [popular, searchedManga] = await Promise.all([await fetchTopListings(), await searchManga(params?.search)]);
  return (
    <main className="flex lg:flex-row flex-col py-2 gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full lg:w-9/12">
        <h1>Search Results For: {params?.search}</h1>
        <div className="grid grid-cols-3 p-2 gap-y-5 md:gap-y-6 md:p-4 gap-x-2 md:gap-x-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 bg-[#fff1] mt-2 rounded w-full min-h-max">
          <Suspense
            fallback={[...Array(60)].map((_, index) => (
              <MangaSkeleton key={index} />
            ))}
          >
            <Mangas mangas={searchedManga} />
          </Suspense>
        </div>
      </div>
      <div className="w-full !relative md:mt-0 lg:w-3/12">
        <PopularMangas key="top-mangas" mangas={popular} />
        <StickyHelper key="helper" />
      </div>
    </main>
  );
};

export default page;
