import MangaCarousel from "@/components/Components/MangaCarousel";
import { Carousel } from "@/utils/requests";
import Featured from "./../components/Components/Featured";

export default async function Home() {
  "use server";
  // const carouselItems = await Carousel();

  return (
    <main className="min-h-[90vh] grid grid-cols-1 md:grid-cols-[70%,30%] md:mx-5 mx-1 justify-center">
      <div className="w-full h-screen">
        {/* <MangaCarousel carouselItems={carouselItems} /> */}
      </div>
      <div className="w-full h-screen">
        <Featured />
      </div>
    </main>
  );
}
