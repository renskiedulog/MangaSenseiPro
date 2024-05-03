import MangaCarousel from "@/components/Components/MangaCarousel";
import PopularMangas from "./../components/Components/PopularMangas";
import MangaFeed from "./../components/Components/MangaFeed";
import { Carousel, fetchTopListings } from "@/utils/requests";
import StickyHelper from "@/components/Components/StickyHelper";

export default async function Home() {
  "use server";
  const [carouselItems, popular] = await Promise.all([
    await Carousel(),
    await fetchTopListings(),
  ]);

  return (
    <main className="flex lg:flex-row flex-col py-2 gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full lg:w-9/12">
        <MangaCarousel key="manga-carousel" carouselItems={carouselItems} />
        <MangaFeed key="manga-feed" />
      </div>
      <div className="w-full !relative md:mt-0 lg:w-3/12">
        <PopularMangas key="top-mangas" mangas={popular} />
        <StickyHelper key="helper" />
      </div>
    </main>
  );
}
