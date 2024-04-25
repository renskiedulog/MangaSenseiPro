import Chapters from "@/components/Components/Chapters";
import MangaInfo from "@/components/Components/MangaInfo";
import PopularMangas from "@/components/Components/PopularMangas";
import StickyHelper from "@/components/Components/StickyHelper";
import { fetchTopListings, getChapters, getMangaInfo } from "@/utils/requests";

const page = async ({ params }: any) => {
  "use server"
  const popular = await fetchTopListings();
  const chapters = await getChapters(params?.mangaId);
  const manga = await getMangaInfo(params.mangaId) || [];

  return (
    <main className="flex lg:flex-row flex-col py-2 gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full lg:w-9/12">
        <MangaInfo manga={manga} chaptersLength={chapters?.length === 0 ? 0 : chapters?.length - 1}/>
        <Chapters chapters={chapters} mangaId={params?.mangaId} />
      </div>
      <div className="w-full !relative md:mt-0 lg:w-3/12">
        <PopularMangas key="top-mangas" mangas={popular} />
        <StickyHelper key="helper" />
      </div>
    </main>
  );
};

export default page;
