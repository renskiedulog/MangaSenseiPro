"use client";
import { timeAgo } from "@/utils/requests";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Mangas = ({ mangas }: { mangas: any }) => {
  const [items, setItems]: any = useState([]);

  useEffect(() => {
    setItems([]);
    const fetchPromises = mangas.map((manga: any, index: number) => {
      return fetch(`api/image?image=${manga.cover}`)
        .then(res => res.json())
        .then(res => {
          manga.cover = res.imageSrc;
          return manga;
        });
    });
  
    Promise.all(fetchPromises)
      .then(updatedItems => {
        setItems(updatedItems);
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return items.length !== 0 && items?.map((manga: any, idx: number) => {
    let time = timeAgo(manga?.updatedAt);
    return (
      <Link
        key={idx}
        href={`/${manga?.id}`}
        className="w-full text-center group leading-none"
        title={manga?.title["en"] || manga?.title["ja-ro"]}
      >
        <Image
          src={manga.cover}
          height={300}
          width={200}
          priority
          alt={manga.title}
          className="aspect-[1/1.3] w-full rounded object-cover group-hover:scale-[1.02] brightness-[.8] group-hover:brightness-100 shadow"
        />
        <h1 className="h-6 md:text-[15px] opacity-80 group-hover:opacity-100 pt-1 font-normal md:font-semibold text-sm overflow-hidden group-hover:text-blue-400">
          {manga?.title["en"] || manga?.title["ja-ro"]}
        </h1>
        <span className="text-xs md:text-sm text-primary brightness-50 group-hover:brightness-75">
          {time}
        </span>
      </Link>
    );
  });
};

export default Mangas;
