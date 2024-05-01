import {
  generateChapterImages,
  getChapterImages,
  getMangaTitle,
} from "@/utils/requests";
import ImageLoader from "./ImageLoader";

const page = async ({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) => {
  const mangaTitle = await getMangaTitle(params?.mangaId);
  const req = await getChapterImages(params?.chapterId);
  const generatedBase64 = await generateChapterImages(
    req?.chapter?.dataSaver,
    req?.chapter?.hash
  );
  return (
    <div>
      {params?.mangaId}
      <div className="w-1/2 flex flex-col items-center mx-auto">
        <ImageLoader images={generatedBase64} />
      </div>
    </div>
  );
};

export default page;
