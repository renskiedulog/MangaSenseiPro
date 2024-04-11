"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import Description from "./Description";
import { formatDate } from "@/utils/utils";

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
          <div className="mx-auto md:mx-0 w-2/3 md:w-48 flex flex-col gap-1 md:gap-2">
            <Image
              src={mangaInfo?.cover}
              height={500}
              width={500}
              alt={mangaInfo?.title}
              className="rounded aspect-[1/1.4] object-cover w-full"
            />
            <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
              <Button className="bg-blue-600 col-span-2 md:col-span-1 w-full p-0 mb-1 hover:bg-blue-500 text-white text-sm shadow-none tracking-wider rounded-sm uppercase">
                <BookmarkIcon />
                Bookmark
              </Button>
              {mangaStats?.follows && (
                <div className="dark:bg-[#fff1] opacity-70 uppercase min-h-10 px-2 py-1 rounded flex items-center justify-between bg-[#0001]">
                  <p className="text-xs">Follows</p>
                  <p className="text-xs font-semibold">{mangaStats?.follows}</p>
                </div>
              )}
              {mangaStats?.rating?.average && (
                <div className="dark:bg-[#fff1] opacity-70 uppercase min-h-10 px-2 py-1 rounded flex items-center justify-between bg-[#0001]">
                  <p className="text-xs">Rating</p>
                  <p className="text-xs font-semibold">
                    {mangaStats?.rating?.average?.toFixed(2)}
                  </p>
                </div>
              )}
              {mangaInfo?.updatedAt && (
                <div className="dark:bg-[#fff1] col-span-2 md:col-span-1 opacity-70 uppercase min-h-10 px-2 py-1 rounded flex items-center justify-between bg-[#0001]">
                  <p className="text-xs">Updated</p>
                  <p className="text-right w-4/6 text-xs font-semibold">
                    {formatDate(mangaInfo?.updatedAt)}
                  </p>
                </div>
              )}
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
