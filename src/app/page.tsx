import MangaCarousel from "@/components/Components/MangaCarousel";
import { Carousel } from "@/utils/requests";

export default async function Home() {
  "use server";
  const carouselItems = await Carousel();

  return (
    <main className="min-h-[90vh] grid grid-cols-1 md:grid-cols-[65%,30%] justify-center">
      <MangaCarousel carouselItems={carouselItems} />
    </main>
  );
}
