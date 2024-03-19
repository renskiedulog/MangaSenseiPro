import makeRequest from "@/utils/requests";
import Link from "next/link";

export default async function Home() {
  const mangas = await makeRequest("manga");
  console.log(mangas);
  return (
    <main>
      {mangas?.data?.map((manga: any, idx: number) => (
        <Link href="#" key={idx}>
          {manga?.id}
        </Link>
      ))}
    </main>
  );
}
