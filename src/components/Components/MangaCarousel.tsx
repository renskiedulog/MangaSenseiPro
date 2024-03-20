"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";

const MangaCarousel = ({ carouselItems }: { carouselItems: any }) => {
  const carouselRef: any = useRef(null);

  const contentTypeBg: any = {
    safe: "bg-[green]",
    suggestive: "bg-[#AC87C5]",
    pornographic: "bg-[crimson]",
    erotica: "bg-[#FF004D]",
    completed: "bg-[orange]",
    ongoing: "bg-[green]",
    cancelled: "bg-[red]",
  };

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
      }, 600000);
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
      className="scrollbar-hidden flex overflow-x-auto pt-2 snap-x snap-mandatory overflow-y-hidden min-h-[20rem]"
      ref={carouselRef}
    >
      {carouselItems?.map((manga: any, index: number) => (
        <Card
          key={index}
          className="relative min-w-[100%] snap-start overflow-hidden flex flex-row-reverse md:flex-row justify-center md:gap-5 px-5 gap-2 items-center dark:border-accent"
        >
          {/* Background */}
          <Image
            src={manga.cover}
            height={500}
            width={400}
            alt="featured-image-alt"
            className="w-full absolute h-full object-cover z-0 featured-bg shadow-md"
          />
          {/* Front */}
          <Image
            height={500}
            width={400}
            src={manga?.cover}
            alt="alt"
            className="z-20 w-32 md:w-40 sm:w-36 md:h-4/5 object-cover rounded-md mx-2"
          />
          <div className="z-20 w-7/12 md:w-full h-4/5 flex flex-col md:px-0 px-2 justify-between">
            <div className="w-full">
              {/* Badges */}
              <h2 className="flex gap-1 uppercase font-semibold text-white">
                <p
                  className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
                >
                  {manga?.type}
                </p>
                {manga?.attributes?.publicationDemographic && (
                  <p
                    className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
                  >
                    {manga?.attributes?.publicationDemographic}
                  </p>
                )}
                <p
                  className={`w-min rounded px-1 py-[2px] text-[.6rem] ${
                    contentTypeBg[manga?.attributes?.contentRating]
                  }`}
                >
                  {manga?.attributes?.contentRating}
                </p>
                <p
                  className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem] ${
                    contentTypeBg[manga?.attributes?.status?.toLowerCase()]
                  }`}
                >
                  {manga?.attributes?.status?.toUpperCase()}
                </p>
              </h2>
              {/* Title */}
              <h1
                className="text-xl md:text-3xl line-clamp-1 text-white shadow-sm font-semibold md:font-bold"
                title={manga?.attributes?.title["en"]}
              >
                {manga?.attributes?.title["en"]}
              </h1>
              {/* Genres */}
              <div className="h-5 w-5/6 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-white md:text-sm">
                {manga?.attributes?.tags?.map((tag: any, index: number) => {
                  const isLastTag =
                    index === manga?.attributes?.tags?.length - 1;
                  if (index <= 5) {
                    return (
                      <Link
                        href="#"
                        key={index}
                        className="mr-1 hover:text-blue-500 opacity-80 hover:opacity-100"
                      >
                        {tag.attributes.name["en"]}
                        {!isLastTag && index !== 5 && ","}
                      </Link>
                    );
                  }
                })}
              </div>
              {/* Summary */}
              <div className="py-2 text-sm font-semibold text-white md:text-base">
                <h5>Summary</h5>
                <p className="text-xs md:text-sm opacity-70 font-normal w-full whitespace-nowrap pt-1 text-wrap mx-auto line-clamp-5 leading-tight md:leading-5">
                  {manga?.attributes?.description["en"]}
                </p>
              </div>
            </div>
            {/* Statistics */}
            <div className="flex items-center justify-between justify-self-end flex-wrap">
              <div className="flex items-center gap-2">
                <Button
                  className="bg-[#fff3] text-white hover:bg-blue-500"
                  size="sm"
                >
                  <BookmarkIcon />
                </Button>
                <Button
                  className="min-w-32 bg-[#fff3] text-white hover:bg-blue-500"
                  size="sm"
                >
                  Read
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MangaCarousel;
