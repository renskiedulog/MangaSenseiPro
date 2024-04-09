"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import Description from "./Description";

const contentTypeBg: any = {
  safe: "bg-[green]",
  suggestive: "bg-[#AC87C5]",
  pornographic: "bg-[crimson]",
  erotica: "bg-[#FF004D]",
  completed: "bg-[orange]",
  ongoing: "bg-[green]",
  cancelled: "bg-[red]",
};

const MangaInfo = ({ manga }: any) => {
  console.log(manga);
  const { mangaInfo, mangaStats } = manga;
  return (
    manga && (
      <section className="dark:bg-[#fff1] p-5 flex flex-col gap-5 bg-[#0001] w-full rounded-md">
        <div className="flex flex-col gap-2 md:gap-3 md:flex-row">
          <div className="w-48 flex flex-col gap-1 md:gap-2">
            <Image
              src={mangaInfo?.cover}
              height={500}
              width={500}
              alt={mangaInfo?.title}
              className="rounded aspect-[1/1.4] object-cover w-full"
            />
            <div className="flex items-center gap-1">
              <Button className="bg-blue-600 w-full p-0 hover:bg-blue-500 text-white text-sm shadow-none tracking-wider rounded-sm uppercase">
                <BookmarkIcon />
                Bookmark
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 uppercase font-semibold text-white">
              <p
                className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
              >
                {mangaInfo?.type}
              </p>
              {mangaInfo?.publicationDemographic && (
                <p
                  className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
                >
                  {mangaInfo?.publicationDemographic}
                </p>
              )}
              <p
                className={`w-min rounded px-1 py-[2px] text-[.6rem] ${
                  contentTypeBg[mangaInfo?.contentRating]
                }`}
              >
                {mangaInfo?.contentRating}
              </p>
              <p
                className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem] ${
                  contentTypeBg[mangaInfo?.status?.toLowerCase()]
                }`}
              >
                {mangaInfo?.status?.toUpperCase()}
              </p>
            </div>
            <h1 className="text-xl md:text-2xl font-bold">
              {mangaInfo?.title.en || mangaInfo?.title["ja-ro"]}
            </h1>
          </div>
        </div>
        <Description description={mangaInfo?.description} />
      </section>
    )
  );
};

export default MangaInfo;
