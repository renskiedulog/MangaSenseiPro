import { fetchCoverImages, getLatestMangas, makeRequest } from "@/utils/requests";
import React from "react";
import Mangas from "./Mangas";

const MangaFeed = async () => {
  "use server";
  const latestMangas = await getLatestMangas();
  return (
    <div>
      <Mangas mangas={latestMangas} />
    </div>
  );
};

export default MangaFeed;
