"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ChapterSelector = ({ chapters, chapterId, mangaId }: any) => {
  const router = useRouter();
  const [currentChapter, setCurrentChapter] = useState(chapterId || "");
  const [nextChapter, setNextChapter]: any = useState(null);
  const [prevChapter, setPrevChapter]: any = useState(null);

  useEffect(() => {
    setCurrentChapter(chapterId || "");
    chapters?.map((chapter: any, index: number) => {
      if (chapter.id === chapterId) {
        if (index !== 0) {
          setNextChapter(index - 1);
        }
        if (index + 1 !== chapters.length) {
          setPrevChapter(index + 1);
        }
      }
    });
  }, [chapterId, chapters]);

  const handleSelect = (event: any) => {
    const selectedChapterId = event.target.value;
    router.push(`/${mangaId}/${selectedChapterId}`);
  };

  const handleButton = (index: any) => {
    router.push(`/${mangaId}/${chapters[index].id}`);
  };

  return (
    chapters && (
      <div className="flex mt-5 w-full items-center justify-between text-sm md:text-base">
        <select
          onChange={handleSelect}
          value={currentChapter}
          title="chapter-selector"
          name="chapter-selector"
          className="color-text text-align-left min-w-40 rounded-md border border-[#fff2] bg-transparent px-1 py-1.5"
        >
          {chapters?.map((chapter: any) => (
            <option value={chapter.id} key={chapter.id} className="text-black">
              Chapter {chapter.chapter}
            </option>
          ))}
        </select>
        <div>
          {prevChapter !== null ? (
            <button
              className="mx-1 min-w-10 rounded-3xl bg-blue-500 hover:bg-blue-700 px-5 py-1 font-normal"
              onClick={() => handleButton(prevChapter)}
            >
              Prev
            </button>
          ) : (
            <button
              className="mx-1 min-w-10 rounded-3xl bg-[#fff1] px-5 py-1 font-normal"
              disabled
            >
              Prev
            </button>
          )}
          {nextChapter !== null ? (
            <button
              className="mx-1 min-w-10 rounded-3xl bg-blue-500 hover:bg-blue-700 px-5 py-1 font-normal"
              onClick={() => handleButton(nextChapter)}
            >
              Next
            </button>
          ) : (
            <button
              className="mx-1 min-w-10 rounded-3xl bg-[#fff1] px-5 py-1 font-normal"
              disabled
            >
              Next
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default ChapterSelector;
