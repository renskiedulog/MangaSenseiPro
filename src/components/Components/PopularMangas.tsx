"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

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
    <Card className="shadow-none bg-[var(--card-background)] color-text h-max w-full overflow-hidden rounded-md border-accent">
      <header key="header" className="flex items-center border-b border-accent">
        <Button
          variant={`${toggle ? "secondary" : "ghost"}`}
          className={`px-3 rounded-none py-2 ${toggle ? "text-blue-500" : ""}`}
          onClick={() => handleToggle(true)}
        >
          Popular
        </Button>
        <Button
          variant={`${!toggle ? "secondary" : "ghost"}`}
          className={`px-3 rounded-none py-2 ${!toggle ? "text-blue-500" : ""}`}
          onClick={() => handleToggle(false)}
        >
          Top Rated
        </Button>
      </header>
      {/* Mangas */}
      {displayed?.manga?.map((manga: any, index: number) => {
        return (
          <Card
            key={index}
            className={`flex shadow-none bg-transparent border-t-0 border-x-0 border-b-2 rounded-none border-accent gap-2 p-2`}
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
              <Image
                height={400}
                width={300}
                priority
                alt="top-manga-cover"
                className="h-auto w-20 max-w-20 place-self-center rounded object-cover"
                src={manga?.cover}
              />
            </Link>
            <div className="flex flex-col justify-between z-10 text-primary">
              <Link
                href={`/manga/${manga?.id}`}
                key={manga.title["en"]}
                className="line-clamp-2 text-lg hover:text-blue-500 font-bold"
              >
                {manga.title["en"] ||
                  manga.title["ja-ro"]}
              </Link>
              <div className="flex gap-1 text-sm">
                <p className="opacity-75">Genres:</p>
                <div className="flex h-12 flex-wrap gap-1 overflow-hidden whitespace-nowrap break-all opacity-100">
                  {manga?.tags?.map((tag: any, index: number) => {
                    if (index <= 5) {
                      return (
                        <Link
                          key={index}
                          href="#"
                          className="hover:text-blue-500"
                        >
                          {tag?.attributes?.name["en"]}
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
                {!toggle && (
                  <StarIcon className="size-5 fill-yellow-500 stroke-none" />
                )}
                <p className="text-xs md:text-sm">
                  {toggle
                    ? displayed?.stats[index]
                    : displayed?.stats[index].toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </Card>
  );
};

export default PopularMangas;
