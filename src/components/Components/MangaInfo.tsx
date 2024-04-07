import { fetchCovers } from "@/utils/requests";
import React from "react";

const MangaInfo = async ({ mangaId }: { mangaId: string }) => {
  "use server"
  const manga = await fetchCovers([mangaId]);
  return <div>MangaInfo</div>;
};

export default MangaInfo;
