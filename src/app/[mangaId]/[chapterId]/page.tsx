import { getMangaTitle } from "@/utils/requests";

const page = async ({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) => {
  const mangaTitle = await getMangaTitle(params?.mangaId);
  return <div>{params?.mangaId}</div>;
};

export default page;
