import Link from "next/link";
// import ModalHeader from "./ModalHeader";

const MangaInfo = ({ manga, modal, chaptersCount }: { manga: any, modal: any, chaptersCount: number}) => {
  return (
    <div
      className={`scrollbar pointer-events-auto z-50 flex flex-col overflow-auto rounded-md bg-[#121212] py-3 md:flex-row ${modal ? "fixed left-1/2 top-1/2 max-h-[90vh] min-h-[70vh] w-4/5 translate-x-[-50%] translate-y-[-50%] bg-[#121212] pt-12 text-white" : "background h-max w-full"}`}
    >
      {/* {modal && <ModalHeader link={manga?.id} />} */}
      <div className="flex min-w-52 flex-col items-center gap-2 md:w-56">
        <img
          src={manga?.cover}
          alt="manga-cover"
          className="aspect-[1/1.5] w-1/4 rounded md:w-10/12"
        />
        {/* Button And Follows */}
        <div className="w-3/5 text-center md:w-10/12">
          <button className="flex w-full items-center justify-center gap-1 rounded-md bg-purple-700 py-1 text-white hover:bg-purple-900 md:py-2">
            <i className="fa-regular fa-bookmark"></i>
            Bookmark
          </button>
          <p
            className={`py-1 text-sm opacity-50 ${modal ? "text-white" : "color-text"}`}
          >
            Followed by {manga?.stats?.follows} people
          </p>
        </div>
        {/* Rating, Status and Type */}
        <div className="grid w-3/5 grid-cols-2 flex-col gap-1 py-2 text-sm md:flex md:w-10/12 md:py-0 md:pb-2">
          {/* Rating */}
          <div
            className={`col-span-2 flex w-full items-center justify-between gap-1 rounded bg-[#fff1] px-2 py-1.5 ${modal ? "bg-[#fff1] text-white" : "background"}`}
          >
            <p className=" font-light opacity-70">Rating</p>
            <p className="flex items-center gap-1 opacity-70">
              {manga?.stats?.rating?.average?.toFixed(2)}
              <img
                src="/images/star.png"
                alt="star"
                className="aspect-auto w-5 translate-y-[-2px]"
              />
            </p>
          </div>
          {/* Status */}
          <div
            className={`flex w-full justify-between gap-1 rounded bg-[#fff1] px-2 py-2 ${modal ? "bg-[#fff1] text-white" : "background"}`}
          >
            <p className=" font-light opacity-70">Status</p>
            <p className="flex items-center gap-1 opacity-70">
              {manga?.attributes?.status?.toUpperCase()}
            </p>
          </div>
          {/* Type */}
          <div
            className={`flex w-full justify-between gap-1 rounded bg-[#fff1] px-2 py-2 ${modal ? "bg-[#fff1] text-white" : "background"}`}
          >
            <p className="font-light opacity-70">Type</p>
            <p className="flex items-center gap-1 opacity-70">
              {manga?.type?.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      {/* Manga Details */}
      <div className="scrollbar mr-5 max-h-full p-5 md:overflow-y-auto md:p-0">
        <p className="text-center text-2xl font-bold md:text-left">
          {manga?.attributes?.title["en"] || manga?.attributes?.title["ja-ro"]}
        </p>
        {manga?.attributes?.altTitles && (
          <div className="flex flex-wrap items-center justify-center gap-2 py-1 text-sm opacity-50 md:justify-start md:text-base">
            {manga?.attributes?.altTitles.map(
              (title: any, index: number) =>
                (title.en && (
                  <p key={index} className="w-max">
                    {title.en}
                  </p>
                )) ||
                (title.ja && (
                  <p key={index} className="w-max">
                    {title.ja}
                  </p>
                )) ||
                (title.ko && (
                  <p key={index} className="w-max">
                    {title.ko}
                  </p>
                )),
            )}
          </div>
        )}
        <div className="my-2 flex flex-wrap items-center justify-center gap-1 md:justify-start">
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-indigo-700 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-facebook-f"></i>
            Facebook
          </Link>
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-blue-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-twitter"></i>
            Twitter
          </Link>
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-green-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-whatsapp"></i>
            Whatsapp
          </Link>
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-indigo-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-discord"></i>
            Discord
          </Link>
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-red-700 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-pinterest"></i>
            Pinterest
          </Link>
        </div>
        <div>
          <h1 className="py-1 md:text-base">Sypnosis:</h1>
          <p className="mt-1 pr-5 text-sm font-light opacity-80 md:text-base">
            {manga?.attributes?.description["en"]}
          </p>
          <div className="grid h-max grid-cols-2 py-2 text-sm md:text-base">
            <div className="flex flex-col gap-2">
              <h1>Type</h1>
              <p className="font-light opacity-70">
                {manga?.attributes?.publicationDemographic || "-"}
              </p>
              <h1>Year Released</h1>
              <p className="font-light opacity-70">
                {manga?.attributes?.year || "-"}
              </p>
              <h1>Posted On</h1>
              <p className="font-light opacity-70">
                {manga?.attributes?.createdAt
                  ? new Date(manga?.attributes?.createdAt).toLocaleDateString(
                      "en-US",
                    )
                  : "-"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Author</h1>
              <p className="font-light opacity-70">asd</p>
              <h1>Chapters</h1>
              <p className="font-light opacity-70">{chaptersCount || "-"}</p>
              <h1>Updated On</h1>
              <p className="font-light opacity-70">
                {manga?.attributes?.updatedAt
                  ? new Date(manga?.attributes?.updatedAt).toLocaleDateString(
                      "en-US",
                    )
                  : "-"}
              </p>
            </div>
          </div>
          <div className={`${modal ? "pb-0 md:pb-5" : "pb-0"}`}>
            <h1>Genres</h1>
            <div className="flex flex-wrap gap-1.5">
              {manga?.attributes?.tags?.map((tag: any, index: number) => (
                <Link
                  key={index}
                  href="#"
                  className="rounded bg-[#fff1] px-2 py-1 hover:text-purple-500 hover:brightness-90"
                >
                  {tag.attributes.name["en"]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaInfo;