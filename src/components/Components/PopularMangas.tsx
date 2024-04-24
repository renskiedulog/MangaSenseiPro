"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import TopMangasLoader from "../Skeletons/TopMangasLoader";

const buttons = [
  { name: "Popular", tag: "popular" },
  { name: "Top", tag: "topRated" },
  { name: "Top Read", tag: "topRead" },
];

const PopularMangas = ({ mangas }: { mangas: any }) => {
  const [toggle, setToggle]: any = useState("popular");
  const [displayed, setDisplayed]: any = useState(null);

  useEffect(() => {
    setDisplayed([]);
    setDisplayed(mangas[toggle]);
  }, [toggle]);

  const handleToggle = (toggle: any) => {
    setToggle(toggle);
  };

  return displayed ? (
    <Card className="shadow-none bg-[var(--card-background)] min-w-60 color-text h-max w-full overflow-hidden rounded-md border-accent">
      <header
        key="header"
        className="flex flex-wrap items-center border-b border-accent"
      >
        {buttons?.map((btn, idx) => (
          <Button
            key={idx}
            variant={`${toggle === btn.tag ? "secondary" : "ghost"}`}
            className={`px-3 rounded-none flex-grow py-2 ${
              toggle === btn.tag ? "text-blue-500" : ""
            }`}
            onClick={() => handleToggle(btn.tag)}
          >
            {btn.name}
          </Button>
        ))}
      </header>
      {/* Mangas */}
      {displayed?.map((manga: any, index: number) => {
        return (
          <Link
            href={`/${manga?.id}`}
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
              <p className="text-ellipsis line-clamp-2 w-full">
                {manga.title}
              </p>
            </Card>
          </Link>
        );
      })}
    </Card>
  ) : (
    <TopMangasLoader />
  );
};

export default PopularMangas;
