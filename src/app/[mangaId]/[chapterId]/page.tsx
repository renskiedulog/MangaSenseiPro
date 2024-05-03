import {
  generateChapterImages,
  getChapterImages,
  getChapters,
  getMangaTitle,
} from "@/utils/requests";
import ImageLoader from "./ImageLoader";
import Link from "next/link";
import ChapterSelector from "./ChapterSelector";

export async function generateMetadata({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) {
  const mangaTitle = await getMangaTitle(params?.mangaId);
  return {
    title: `${mangaTitle} | MangaSensei`,
  };
}

const page = async ({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) => {
  const [mangaTitle, chapterImages, chapters] = await Promise.all([
    await getMangaTitle(params?.mangaId),
    await getChapterImages(params?.chapterId),
    await getChapters(params?.mangaId),
  ]);
  const generatedBase64 = await generateChapterImages(
    chapterImages?.chapter?.dataSaver,
    chapterImages?.chapter?.hash
  );

  const currentChapter = chapters?.filter(
    (chapter: any) => chapter?.id === params?.chapterId
  )[0];

  return (
    <div>
      <div className="w-full md:w-2/3 flex flex-col items-center mx-auto">
        {/* Header */}
        <div className="w-full py-5 flex flex-col md:gap-2 gap-1">
          <h1 className="px-5 md:px-10 text-xl md:text-3xl font-bold text-center">
            {mangaTitle}
          </h1>
          {currentChapter && (
            <p className="md:text-xl text-sm w-full text-center font-semibold">
              Chapter {currentChapter?.chapter}{" "}
              {currentChapter?.title && `- ${currentChapter?.title}`}
            </p>
          )}
          <p className="w-full text-center text-xs md:text-sm">
            Manga details can be found in: <br />
            <Link
              href={`/${params?.mangaId}`}
              className="font-bold hover:text-blue-500"
            >
              {mangaTitle}
            </Link>
          </p>
          <ChapterSelector
            chapters={chapters}
            chapterId={params?.chapterId}
            mangaId={params?.mangaId}
          />
        </div>
        <ImageLoader images={generatedBase64} />
      </div>
    </div>
  );
};

export default page;
