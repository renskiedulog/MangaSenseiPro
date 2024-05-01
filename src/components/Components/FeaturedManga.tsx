"use client";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import FeaturedLoader from "../Skeletons/FeaturedLoader";
import Link from "next/link";

const contentTypeBg: any = {
  safe: "bg-[green]",
  suggestive: "bg-[#AC87C5]",
  pornographic: "bg-[crimson]",
  erotica: "bg-[#FF004D]",
  completed: "bg-[orange]",
  ongoing: "bg-[green]",
  cancelled: "bg-[red]",
};

const FeaturedManga = ({ newFeatured }: { newFeatured: any }) => {
  const [featuredManga, setFeaturedManga]: any = useState(null);

  useEffect(() => {
    const getFeaturedManga = async () => {
      const storedFeatured = localStorage?.getItem("featured");
      if (storedFeatured) {
        const { manga, date } = JSON.parse(storedFeatured);
        const storedDate = new Date(date);
        const currentDate = new Date();
        if (
          storedDate.getUTCDate() === currentDate.getUTCDate() &&
          storedDate.getUTCMonth() === currentDate.getUTCMonth() &&
          storedDate.getUTCFullYear() === currentDate.getUTCFullYear()
        ) {
          setFeaturedManga(manga);
          return;
        } else {
          localStorage.setItem("featured", JSON.stringify(newFeatured));
          setFeaturedManga(newFeatured);
        }
      } else {
        localStorage.setItem("featured", JSON.stringify(newFeatured));
        setFeaturedManga(newFeatured);
      }
    };

    getFeaturedManga();
  }, []);

  // Add Animation To Features
  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    const description = overlay?.querySelector(".description");

    const handleMouseEnter = () => {
      description?.classList.replace("animate-hover-out", "animate-hover-in");
    };

    const handleMouseLeave = () => {
      description?.classList.replace("animate-hover-in", "animate-hover-out");
    };

    overlay?.addEventListener("mouseenter", handleMouseEnter);
    overlay?.addEventListener("mouseleave", handleMouseLeave);

    // Clean up event listeners on component unmount
    return () => {
      overlay?.removeEventListener("mouseenter", handleMouseEnter);
      overlay?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [featuredManga]);

  return featuredManga !== null ? (
    <Card className="relative my-2 border-accent bg-[var(--card-background)] overflow-hidden rounded-md w-full group">
      <Image
        alt="featured-cover"
        height={300}
        width={200}
        src={featuredManga?.cover}
        priority
        className="w-full max-h-80 object-cover object-center mx-auto border-accent group-hover:brightness-50 z-0"
      />
      {/* Overlay */}
      <div className="overlay absolute top-0 left-0 z-10 w-full h-full flex flex-col px-2 py-1 justify-end overflow-hidden">
        <div className="flex gap-1 uppercase font-semibold text-white">
          <p
            className={`w-min rounded bg-[crimson] px-1 py-[2px] text-[.6rem]`}
          >
            FEATURED
          </p>
          <p className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}>
            {featuredManga?.type}
          </p>
          {featuredManga?.publicationDemographic && (
            <p
              className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
            >
              {featuredManga?.publicationDemographic}
            </p>
          )}
          <p
            className={`w-min rounded px-1 py-[2px] text-[.6rem] ${
              contentTypeBg[featuredManga?.contentRating]
            }`}
          >
            {featuredManga?.contentRating}
          </p>
          <p
            className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem] ${
              contentTypeBg[featuredManga?.status?.toLowerCase()]
            }`}
          >
            {featuredManga?.status?.toUpperCase()}
          </p>
        </div>
        <p className="text-white text-lg md:text-xl text-ellipsis line-clamp-3 font-semibold !leading-tight pt-1">
          {featuredManga?.title}
        </p>
        <div className="description group-hover:max-h-[300px]">
          <p className="text-sm line-clamp-[8] text-white text-ellipsis">
            {featuredManga?.description}
          </p>
          <div className="flex items-center py-1 gap-2">
            <Button
              className="bg-[#fff3] text-white hover:bg-blue-500"
              size="sm"
            >
              <BookmarkIcon />
            </Button>
            <Link href={`/${featuredManga?.id}`}>
              <Button
                className="min-w-32 bg-[#fff3] text-white hover:bg-blue-500"
                size="sm"
              >
                Read
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  ) : (
    <FeaturedLoader />
  );
};

export default FeaturedManga;
