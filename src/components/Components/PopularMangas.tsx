"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

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
      {displayed?.map((manga: any, index: number) => {
        return (
          <Link
            href={`/manga/${manga?.id}`}
            key={index}
            className="line-clamp-2 leading-tight group font-semibold"
          >
            <Card
              key={index}
              className={`flex items-center shadow-none group-hover:text-blue-500 text-primary opacity-80 group-hover:opacity-100 border-t-0 border-x-0 border-b-2 rounded-none border-accent gap-2 p-2`}
            >
              <p className="border text-sm border-accent text-slate-400 w-7 rounded text-primary flex items-center justify-center aspect-square">
                {index + 1}
              </p>
              {manga.title["en"] || manga.title["ja-ro"]}
            </Card>
          </Link>
        );
      })}
    </Card>
  );
};

export default PopularMangas;
