import MangaCarousel from "@/components/Components/MangaCarousel";
import PopularMangas from "./../components/Components/PopularMangas";
import MangaFeed from "./../components/Components/MangaFeed";
import {
  Carousel,
  fetchCover,
  fetchTopListings,
  getFeaturedManga,
} from "@/utils/requests";
import StickyHelper from "@/components/Components/StickyHelper";

export default async function Home() {
  "use server";
  const carouselItems = await Carousel();
  const popular = await fetchTopListings();

  return (
    <main className="flex md:flex-row flex-col py-2 gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full md:w-9/12">
        <MangaCarousel key="manga-carousel" carouselItems={carouselItems} />
        <MangaFeed key="manga-feed" />
      </div>
      <div className="w-full !relative md:mt-0 md:w-3/12">
        <PopularMangas key="top-mangas" mangas={popular} />
        <StickyHelper key="helper" />
      </div>
    </main>
  );
}
