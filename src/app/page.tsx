import MangaCarousel from "@/components/Components/MangaCarousel";
import { Carousel, fetchTopMangas } from "@/utils/requests";
import PopularMangas from "./../components/Components/PopularMangas";

export default async function Home() {
  "use server";
  const carouselItems = await Carousel();
  const popular = await fetchTopMangas();

  return (
    <main className="min-h-[90vh] grid grid-cols-1 py-2 md:grid-cols-[70%,30%] gap-2 md:mx-5 mx-1 justify-center">
      <div className="w-full h-screen">
        <MangaCarousel carouselItems={carouselItems} />
      </div>
      <div className="w-full h-screen">
        <PopularMangas mangas={popular} />
      </div>
    </main>
  );
}
