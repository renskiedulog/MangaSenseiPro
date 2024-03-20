"use client";

import { fetchCoverImages, makeRequest } from "@/utils/requests";
import Link from "next/link";
import { useState, useEffect } from "react";

const FeaturedManga = () => {
  const [featuredManga, setFeaturedManga]: any = useState(null);

  useEffect(() => {
    const getFeaturedManga = async () => {
      const storedFeatured = localStorage.getItem("featured");
      if (storedFeatured) {
        const { manga, date } = JSON.parse(storedFeatured);
        const storedDate = new Date(date);
        const currentDate = new Date();
        if (
          storedDate.getUTCDate() === currentDate.getUTCDate() &&
          storedDate.getUTCMonth() === currentDate.getUTCMonth() &&
          storedDate.getUTCFullYear() === currentDate.getUTCFullYear()
        ) {
          setFeaturedManga(manga[0]);
          return;
        }
      }
      ("use server");
      const req = await makeRequest(
        "/manga/",
        { limit: 100 },
        { followedCount: "desc", rating: "desc" }
      );
      const randomIndex = Math.floor(Math.random() * 100);
      const newFeatured = await fetchCoverImages([req?.data[randomIndex]]);
      const newFeaturedWithDate = {
        manga: newFeatured,
        date: new Date().toISOString().split("T")[0],
      };

      localStorage.setItem("featured", JSON.stringify(newFeaturedWithDate));
      setFeaturedManga(newFeatured[0]);
    };

    getFeaturedManga();
  }, []);

  return (
    <Link href={`/manga/${featuredManga?.id}`} className="">
      <img
        className="absolute w-full rounded-r-md object-cover object-center brightness-90"
        src={featuredManga?.cover}
      />
      <div className="absolute right-[-35%] top-[8%] w-full rotate-45 bg-red-500 text-center text-white md:text-base">
        Featured
      </div>
      <div className="overlay absolute bottom-0 flex h-full w-full translate-y-full transform flex-col items-center justify-end pb-2 text-center transition-transform duration-300 group-hover:translate-y-0">
        <h1 className="flex h-max w-5/6 items-center justify-center text-base text-white md:text-lg">
          {featuredManga?.attributes?.title["en"]
            ? featuredManga?.attributes?.title["en"]
            : featuredManga?.attributes?.title["ja-ro"]}
        </h1>
      </div>
    </Link>
  );
};

export default FeaturedManga;
