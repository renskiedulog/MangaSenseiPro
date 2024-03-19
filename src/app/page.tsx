"use client";
import makeRequest from "@/utils/requests";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mangas, setMangas] = useState([]);
  useEffect(() => {
    makeRequest("manga").then((res) => {
      console.log(res);
      setMangas(res.data);
    });
  }, []);
  return (
    <main>
      {mangas?.map((manga: any, idx: number) => (
        <Link href="#" key={idx}>
          {manga?.id}
        </Link>
      ))}
    </main>
  );
}
