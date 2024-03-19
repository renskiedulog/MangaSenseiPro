import makeRequest from "@/utils/requests";
import Link from "next/link";

export default async function Home() {
  const getMangas = async () => {
    "use server";
    const mangas = await makeRequest("manga");
    return mangas;
  };

  const mangas = await getMangas();
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
