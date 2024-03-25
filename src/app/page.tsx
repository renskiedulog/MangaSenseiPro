import MangaCarousel from "@/components/Components/MangaCarousel";
import PopularMangas from "./../components/Components/PopularMangas";
import MangaFeed from "./../components/Components/MangaFeed";
import { Carousel, fetchTopListings } from "@/utils/requests";
import StickyHelper from "@/components/Components/StickyHelper";

export default async function Home() {
  "use server";
  const carouselItems = await Carousel();
  const popular = await fetchTopListings();

  return (
    <main className="min-h-[90vh] grid grid-cols-1 sm:grid-cols-1 py-2 md:grid-cols-[75%,25%] gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full min-h-screen h-auto">
        <MangaCarousel carouselItems={carouselItems} />
        <MangaFeed />
      </div>
      <div className="w-full !relative md:mt-0">
        <PopularMangas mangas={popular} />
        <StickyHelper />
      </div>
    </main>
  );
}
