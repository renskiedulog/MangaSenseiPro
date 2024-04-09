import MangaInfo from "@/components/Components/MangaInfo";
import PopularMangas from "@/components/Components/PopularMangas";
import StickyHelper from "@/components/Components/StickyHelper";
import { fetchCovers, fetchTopListings, getMangaInfo } from "@/utils/requests";

const page = async ({ params }: any) => {
  "use server"
  const popular = await fetchTopListings();
  const manga = await getMangaInfo(params.mangaId) || [];

  return (
    <main className="flex md:flex-row flex-col py-2 gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full md:w-9/12">
        <MangaInfo manga={manga}/>
      </div>
      <div className="w-full !relative md:mt-0 md:w-3/12">
        <PopularMangas key="top-mangas" mangas={popular} />
        <StickyHelper key="helper" />
      </div>
    </main>
  );
};

export default page;
