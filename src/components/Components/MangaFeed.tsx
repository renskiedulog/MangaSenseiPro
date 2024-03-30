import React from "react";
import Mangas from "./Mangas";
import { getLatestManga } from "@/utils/requests";
import MangaSkeleton from "../Skeletons/MangaSkeleton";

const MangaFeed = async () => {
  "use server";
  const latest = await getLatestManga();

  return (
    <div className="grid grid-cols-3 p-2 gap-y-5 md:gap-y-6 md:p-4 gap-x-2 md:gap-x-4 md:grid-cols-5 lg:grid-cols-6 bg-[#fff1] mt-2 rounded w-full min-h-screen">
        <Mangas mangas={latest} />
    </div>
  );
};

export default MangaFeed;
