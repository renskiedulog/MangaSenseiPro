"use client";
import Image from "next/image";
import React, { createContext, useEffect } from "react";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import Description from "./Description";
import { formatDate } from "@/utils/utils";
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

const MangaInfo = ({ manga, chaptersLength }: any) => {
  const { mangaInfo, mangaStats } = manga;

  useEffect(() => {
    // Change Title
    document.title = `${mangaInfo?.title} | MangaSensei`;
  }, []);

  return (
    manga && (
      <section className="dark:bg-[#fff1] overflow-hidden p-5 flex flex-col gap-5 bg-[#0001] w-full rounded-md">
        <div className="flex flex-col gap-5 md:gap-3 md:flex-row">
          <div className="mx-auto md:mx-0 w-full relative min-w-52 md:w-52 flex flex-col gap-1 md:gap-2">
            <Image
              src={mangaInfo?.cover}
              height={500}
              width={500}
              alt={mangaInfo?.title || "manga"}
              className="rounded aspect-[1/1.4] object-cover w-2/3 md:w-full mx-auto"
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
                  <p className="text-right w-3/6 text-xs font-semibold">
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
            <h1 className="text-2xl md:text-[28px] pt-1 font-bold">
              {mangaInfo?.title}
            </h1>
            <Description description={mangaInfo?.description} />
            <div className="w-full grid grid-cols-2 gap-3">
              <p className="font-medium">
                Author
                <br />
                <span className="opacity-70 font-normal">
                  {mangaInfo?.author?.attributes?.name}
                </span>
              </p>
              <p className="font-medium">
                Artist
                <br />
                <span className="opacity-70 font-normal">
                  {mangaInfo?.artist?.attributes?.name}
                </span>
              </p>
              <p className="font-medium">
                Chapters
                <br />
                <span className="opacity-70 font-normal">{chaptersLength}</span>
              </p>
            </div>
            {/* Genres */}
            <div className="flex flex-col gap-1 mt-2">
              <p className="font-medium">Genres</p>
              <div className="flex flex-wrap gap-1.5 items-center">
                {mangaInfo?.tags?.map((tag: any, idx: number) => (
                  <Link
                    key={idx}
                    href={`/filter/${tag?.id}`}
                    className="bg-accent min-w-16 px-2 text-base font-medium hover:text-blue-500 hover:opacity-100 text-white text-center py-1 rounded"
                  >
                    {tag?.attributes?.name?.en}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default MangaInfo;
