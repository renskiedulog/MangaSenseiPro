"use client";
import Image from "next/image";
import React, { useEffect } from "react";
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
  const { mangaInfo, mangaStats } = manga;
  console.log(manga);

  useEffect(() => {
    // Change Title
    document.title = `MangaSensei - ${mangaInfo?.title}`;
  }, []);

  return (
    manga && (
      <section className="dark:bg-[#fff1] p-5 flex flex-col gap-5 bg-[#0001] w-full rounded-md">
        <div className="flex flex-col gap-5 md:gap-3 md:flex-row">
          <div className="mx-auto md:mx-0 w-full min-w-52 md:w-52 flex flex-col gap-1 md:gap-2">
            <Image
              src={mangaInfo?.cover}
              height={500}
              width={500}
              alt={mangaInfo?.title}
              className="rounded aspect-[1/1.4] object-cover w-1/2 md:w-full mx-auto"
            />
            <div className="grid grid-cols-2 md:grid-cols-1 gap-1 w-4/5 md:w-full mx-auto">
              <Button className="bg-blue-600 col-span-2 md:col-span-1 w-full p-0 my-1 hover:bg-blue-500 text-white text-sm shadow-none tracking-wider rounded-sm uppercase">
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
          <div className="flex flex-col gap-1 w-full">
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
              {mangaInfo?.title}
            </h1>
            <Description description={mangaInfo?.description} />
            <div className="w-full grid grid-cols-2 gap-3">
              <p className="font-medium">
                Author<br />
                <span className="opacity-70 font-normal">
                  {mangaInfo?.author?.attributes?.name}
                </span>
              </p>
              <p className="font-medium">
                Artist<br />
                <span className="opacity-70 font-normal">
                  {mangaInfo?.artist?.attributes?.name}
                </span>
              </p>
              <p className="font-medium">
                Chapters<br />
                <span className="opacity-70 font-normal">
                  {/* Chapters */}
                  110
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default MangaInfo;
