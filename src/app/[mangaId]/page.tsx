"use client"
import { fetchCovers } from "@/utils/requests";
import React from "react";

const page = async ({ params }: any) => {
  const manga = await fetchCovers([params.mangaId]);
  console.log(manga)
  return <section className="">{params.mangaId}</section>;
};

export default page;
