import MangaCarousel from "@/components/Components/MangaCarousel";
import PopularMangas from "./../components/Components/PopularMangas";
import MangaFeed from './../components/Components/MangaFeed';
import { Carousel, fetchTopListings } from "@/utils/requests";

export default async function Home() {
  "use server";
  const carouselItems = await Carousel();
  const popular = await fetchTopListings();

  return (
    <main className="min-h-[90vh] grid grid-cols-1 py-2 md:grid-cols-[70%,30%] gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full h-screen">
        <MangaCarousel carouselItems={carouselItems} />
        {/* <MangaFeed /> */}
      </div>
      <div className="w-full h-screen">
        <PopularMangas mangas={popular} />
      </div>
    </main>
  );
}
