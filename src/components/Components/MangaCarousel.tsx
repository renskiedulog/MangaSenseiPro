"use client";
import { useEffect, useRef } from "react";
import CarouselMangas from "./CarouselMangas";

const MangaCarousel = () => {
  const carouselRef: any = useRef(null);

  useEffect(() => {
    let intervalId: any;

    const startInterval = () => {
      intervalId = setInterval(() => {
        if (carouselRef.current) {
          const nextScrollLeft =
            carouselRef.current.scrollLeft + carouselRef.current.clientWidth;
          const maxScrollLeft =
            carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

          if (nextScrollLeft < maxScrollLeft) {
            carouselRef.current.scrollTo({
              left: nextScrollLeft,
              behavior: "smooth",
            });
          } else {
            carouselRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }
        }
      }, 10000);
    };

    const handleScroll = () => {
      clearInterval(intervalId);
      startInterval();
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
    }

    startInterval();

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      }
      clearInterval(intervalId);
    };
  }, [carouselRef]);

  return (
    <div
      id="carousel"
      className="scrollbar-hidden flex overflow-x-auto pt-2 snap-x snap-mandatory overflow-y-hidden"
      ref={carouselRef}
    >
      <CarouselMangas />
    </div>
  );
};

export default MangaCarousel;
