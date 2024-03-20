"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import Image from "next/image";

const PopularMangas = ({ mangas }: { mangas: any }) => {
  const [toggle, setToggle]: any = useState(true);
  const [displayed, setDisplayed]: any = useState([]);

  useEffect(() => {
    setDisplayed([]);
    if (toggle) {
      setDisplayed(mangas?.popular);
    } else {
      setDisplayed(mangas?.topRated);
    }
  }, [toggle]);

  const handleToggle = (toggle: any) => {
    setToggle(toggle);
  };

  return (
    <Card className="shadow-none bg-[#121212] color-text h-max w-full overflow-hidden rounded-md border-accent">
      <header key="header" className="flex border-b-[1px] border-accent">
        <button
          className={`px-3  py-2 ${toggle ? "text-purple-500" : ""}`}
          onClick={() => handleToggle(true)}
        >
          Popular
        </button>
        <button
          className={`px-3 py-2 ${!toggle ? "text-purple-500" : ""}`}
          onClick={() => handleToggle(false)}
        >
          Top Rated
        </button>
      </header>
      {/* Mangas */}
      {displayed?.manga?.map((manga: any, index: number) => {
        return (
          <div
            key={index}
            className={`flex my-1 gap-2 p-2 ${
              index === 0 ? "" : "border-t border-[#fff1]"
            }`}
          >
            {/* <Image
              priority
              height={500}
              width={400}
              src={manga?.cover}
              alt="top-manga-cover"
              className="absolute w-full object-cover top-0 left-0 brightness-[.3] z-0"
            /> */}
            <Link
              key={index}
              href={`/manga/${manga?.id}`}
              className="flex items-center justify-center z-10"
            >
              <img
                className="h-auto w-20 max-w-20 place-self-center rounded object-cover"
                src={manga?.cover}
              />
            </Link>
            <div className="flex flex-col justify-around z-10 text-white">
              <Link
                href={`/manga/${manga?.id}`}
                key={manga?.attributes.title["en"]}
                className="line-clamp-2 text-lg hover:text-purple-500 font-bold"
              >
                {manga?.attributes.title["en"] ||
                  manga?.attributes.title["ja-ro"]}
              </Link>
              <div className="flex gap-1 text-sm">
                <p className="opacity-75">Genres:</p>
                <div className="flex h-12 flex-wrap gap-1 overflow-hidden whitespace-nowrap break-all opacity-100">
                  {manga?.attributes?.tags?.map((tag: any, index: number) => {
                    if (index <= 5) {
                      return (
                        <Link
                          key={index}
                          href="#"
                          className="hover:text-purple-500"
                        >
                          {tag.attributes.name["en"]}
                          {index !== 5 && ","}
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-xs opacity-75 md:text-sm">
                  {toggle ? "Follows:" : "Rating:"}
                </p>
                <p className="text-xs md:text-sm">
                  {toggle
                    ? displayed?.stats[index].follows
                    : displayed?.stats[index]?.rating?.average.toFixed(2)}
                </p>
                {!toggle && (
                  <img
                    src="/images/star.png"
                    alt="rating"
                    className="aspect-auto w-5 translate-y-[-1px]"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default PopularMangas;
