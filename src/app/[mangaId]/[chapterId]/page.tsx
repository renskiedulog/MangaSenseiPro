import {
  generateChapterImages,
  getChapterImages,
  getChapters,
  getMangaNameAndTag,
  getSuggested,
} from "@/utils/requests";
import ImageLoader from "./ImageLoader";
import Link from "next/link";
import ChapterSelector from "./ChapterSelector";
import { Suspense } from "react";
import MangaSkeleton from "@/components/Skeletons/MangaSkeleton";
import Mangas from "@/components/Components/Mangas";
import BackToTop from "@/components/Components/BackToTop";

export async function generateMetadata({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) {
  const mangaTitle = await getMangaNameAndTag(params?.mangaId);
  return {
    title: `${mangaTitle?.title} | MangaSensei`,
  };
}

const page = async ({
  params,
}: {
  params: { mangaId: string; chapterId: string };
}) => {
  const [mangaTitle, chapterImages, chapters] = await Promise.all([
    await getMangaNameAndTag(params?.mangaId),
    await getChapterImages(params?.chapterId),
    await getChapters(params?.mangaId),
  ]);
  const [generatedBase64, suggested] = await Promise.all([
    await generateChapterImages(
      chapterImages?.chapter?.dataSaver,
      chapterImages?.chapter?.hash
    ),
    await getSuggested(mangaTitle?.tags),
  ]);

  const currentChapter = chapters?.filter(
    (chapter: any) => chapter?.id === params?.chapterId
  )[0];

  return (
    <div>
      <div className="w-full md:w-2/3 flex flex-col items-center mx-auto">
        {/* Header */}
        <div className="w-full py-5 flex flex-col md:gap-2 gap-1">
          <h1 className="px-5 md:px-10 text-xl md:text-3xl font-bold text-center">
            {mangaTitle?.title}
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
              {mangaTitle?.title}
            </Link>
          </p>
          <ChapterSelector
            chapters={chapters}
            chapterId={params?.chapterId}
            mangaId={params?.mangaId}
          />
        </div>
        <ImageLoader images={generatedBase64} />
        <ChapterSelector
          chapters={chapters}
          chapterId={params?.chapterId}
          mangaId={params?.mangaId}
        />
        <div className="w-full bg-[#fff1] rounded mt-5">
          <p className="px-4 text-2xl py-2 font-bold border-b dark:border-[#fff1] border-[#000001]">
            Suggested Mangas
          </p>
          <div className="grid grid-cols-3 p-2 gap-y-5 md:gap-y-6 md:p-4 gap-x-2 md:gap-x-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 w-full min-h-max">
            <Suspense
              fallback={[...Array(6)].map((_, index) => (
                <MangaSkeleton key={index} />
              ))}
            >
              <Mangas mangas={suggested} />
            </Suspense>
          </div>
        </div>
        <BackToTop />
      </div>
    </div>
  );
};

export default page;
