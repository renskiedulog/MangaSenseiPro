import MangaCarousel from "@/components/Components/MangaCarousel";
import { Carousel } from "@/utils/requests";

export default async function Home() {
  "use server";
  const carouselItems = await Carousel();

  return (
    <main className="min-h-[90vh]">
      <MangaCarousel carouselItems={carouselItems} />
    </main>
  );
}
