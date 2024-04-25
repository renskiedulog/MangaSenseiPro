"use client"
import Link from "next/link";

const Chapters = ({ mangaId ,chapters }: any) => {
  console.log(chapters)
  if (chapters?.length === 0) {
    return (
      <div className="mx-auto my-2 text-center text-lg font-bold">
        No Chapters Found.
      </div>
    );
  } else {
    return (
      <section className="background mt-2 rounded-md dark:bg-[#fff1]">
        <header className="color-text border-b border-[#fff2] px-3 py-2 text-2xl font-bold">
          Chapters
        </header>
        <div className="color-text flex items-center gap-2 border-b border-[#fff2] px-3 py-2 text-xl font-bold">
          <Link
            href={`/manga/${mangaId}/${chapters[chapters.length - 1]?.id}`}
            className="flex w-full flex-col items-center justify-center rounded bg-blue-600 py-2 text-white hover:scale-[1.01] hover:brightness-90"
          >
            <p className="text-base font-normal">First Chapter</p>
            <span>
              Chapter {chapters[chapters.length - 1]?.chapter}
            </span>
          </Link>
          <Link
            href={`/manga/${mangaId}/${chapters[chapters.length - 1]?.id}`}
            className="flex w-full flex-col items-center justify-center rounded bg-blue-600 py-2 text-white hover:scale-[1.01] hover:brightness-90"
          >
            <p className="text-base font-normal">Last Chapter</p>
            <span>Chapter {chapters[0]?.chapter}</span>
          </Link>
        </div>
        <div className="scrollbar flex max-h-[60vh] w-full flex-col overflow-y-scroll pb-3 pl-3 pr-1">
          {chapters?.map((chapter: any) => (
            <Link
              key={chapter.id}
              href={`/manga/${mangaId}/${chapter.id}`}
              className="group my-1 w-full rounded border border-[#fff2] px-3 py-2 hover:bg-[#fff1]"
            >
              <div className="group-hover:text-blue-500">
                Chapter {chapter?.chapter}
                {chapter?.title
                  ? ` - ${chapter?.title}`
                  : ""}
              </div>
              <div className="flex items-center text-xs gap-2 opacity-50">
                <div className="w-max">
                  {chapter?.createdAt
                    ? new Date(
                        chapter?.createdAt,
                      ).toLocaleDateString("en-US")
                    : "-"}
                </div>
                <div className="w-max">
                  Pages: {chapter?.pages || "-"}
                </div>
                <div className="w-max ml-auto">Scanlated By: {chapter?.scanlationGroup}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }
};

export default Chapters;
