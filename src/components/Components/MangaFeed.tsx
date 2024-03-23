import React from "react";
import Mangas from "./Mangas";
import { Carousel, fetchTopListings, getLatestManga } from "@/utils/requests";

const MangaFeed = async () => {
  "use server";
  // const latestMangas = await getLatestManga();
  const top = await fetchTopListings();

  return (
    <div>
      <Mangas mangas={top} />
    </div>
  );
};

export default MangaFeed;
