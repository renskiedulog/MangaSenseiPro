import React from "react";
import Mangas from "./Mangas";
import { getLatestManga } from "@/utils/requests";

const MangaFeed = async () => {
  "use server";
  const latest = await getLatestManga();

  return (
    <div className="flex flex-wrap gap-2 bg-[#fff1] mt-2 rounded w-full h-[200vh]">
      <Mangas mangas={latest} />
    </div>
  );
};

export default MangaFeed;
