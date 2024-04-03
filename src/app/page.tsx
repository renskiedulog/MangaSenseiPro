import MangaCarousel from "@/components/Components/MangaCarousel";
import PopularMangas from "./../components/Components/PopularMangas";
import MangaFeed from "./../components/Components/MangaFeed";
import { Carousel, fetchTopListings, getFeaturedManga } from "@/utils/requests";
import StickyHelper from "@/components/Components/StickyHelper";

export default async function Home() {
  "use server";
  const carouselItems = await Carousel();
  const popular = await fetchTopListings();
  const featured = await getFeaturedManga();

  return (
    <main className="min-h-[90vh] flex md:flex-row flex-col sm:grid-cols-1 py-2 gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full min-h-screen md:w-9/12">
        <MangaCarousel carouselItems={carouselItems} />
          <MangaFeed />
      </div>
      <div className="w-full !relative md:mt-0 md:w-3/12">
        <PopularMangas mangas={popular} />
        <StickyHelper featured={featured}/>
      </div>
    </main>
  );
}
