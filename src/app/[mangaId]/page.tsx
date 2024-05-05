import Chapters from "@/components/Components/Chapters";
import MangaInfo from "@/components/Components/MangaInfo";
import Mangas from "@/components/Components/Mangas";
import PopularMangas from "@/components/Components/PopularMangas";
import StickyHelper from "@/components/Components/StickyHelper";
import MangaSkeleton from "@/components/Skeletons/MangaSkeleton";
import { fetchTopListings, getChapters, getMangaInfo } from "@/utils/requests";
import { Suspense } from "react";

const page = async ({ params }: any) => {
  "use server";
  const [popular, chapters, manga]: any = await Promise.all([
    await fetchTopListings(),
    await getChapters(params?.mangaId),
    await getMangaInfo(params?.mangaId),
  ]);

  return (
    <main className="flex lg:flex-row flex-col py-2 gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full lg:w-9/12">
        <MangaInfo
          manga={manga}
          chaptersLength={chapters?.length === 0 ? 0 : chapters?.length}
        />
        <Chapters chapters={chapters} mangaId={params?.mangaId} />
        <div className="w-full bg-[#fff1] rounded mt-2">
          <p className="px-4 text-2xl py-2 font-bold border-b dark:border-[#fff1] border-[#0001]">
            Suggested Mangas
          </p>
          <div className="grid grid-cols-3 p-2 gap-y-5 md:gap-y-6 md:p-4 gap-x-2 md:gap-x-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 w-full min-h-max">
            <Suspense
              fallback={[...Array(6)].map((_, index) => (
                <MangaSkeleton key={index} />
              ))}
            >
              <Mangas mangas={manga?.suggested} />
            </Suspense>
          </div>
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
