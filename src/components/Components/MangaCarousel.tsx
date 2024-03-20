import { Carousel, fetchCoverImages, makeRequest } from "@/utils/requests";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
const MangaCarousel = async () => {
  "use server";
  const featured = await Carousel();

  const contentTypeBg: any = {
    safe: "bg-[green]",
    suggestive: "bg-[#AC87C5]",
    pornographic: "bg-[crimson]",
    erotica: "bg-[#FF004D]",
  };

  return (
    <section id="carousel" className="grid grid-cols-[70%,30%] pt-2">
      <Card className="relative min-h-[20rem] max-h-[22rem] w-full overflow-hidden flex justify-center md:px-5 px-2 md:gap-5 gap-2 items-center">
        {/* Background */}
        <Image
          src={featured[0].cover}
          height={500}
          width={400}
          alt="featured-image-alt"
          className="w-full absolute h-full object-cover z-0 featured-bg shadow-md"
        />
        {/* Front */}
        <Image
          height={500}
          width={400}
          src={featured[0]?.cover}
          alt="alt"
          className="z-20 w-1/5 h-4/5 object-cover rounded-md m-auto"
        />
        <div className="z-20 w-4/5 h-4/5">
          {/* Badges */}
          <h2 className="flex gap-1 uppercase font-semibold text-white">
            <p
              className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
            >
              {featured[0]?.type}
            </p>
            {featured[0]?.attributes?.publicationDemographic && (
              <p
                className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
              >
                {featured[0]?.attributes?.publicationDemographic}
              </p>
            )}
            <p
              className={`w-min rounded px-1 py-[2px] text-[.6rem] ${
                contentTypeBg[featured[0]?.attributes?.contentRating]
              }`}
            >
              {featured[0]?.attributes?.contentRating}
            </p>
          </h2>
          {/* Title */}
          <h1
            className="text-2xl line-clamp-1 text-white shadow-sm font-bold"
            title={featured[0]?.attributes?.title["en"]}
          >
            {featured[0]?.attributes?.title["en"]}
          </h1>
          {/* Genres */}
          <div className="h-5 w-5/6 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-white md:text-sm">
            {featured[0]?.attributes?.tags?.map((tag: any, index: number) => {
              const isLastTag =
                index === featured[0]?.attributes?.tags?.length - 1;
              if (index <= 5) {
                return (
                  <Link
                    href="#"
                    key={index}
                    className="mr-1 hover:text-purple-500 opacity-80 hover:opacity-100"
                  >
                    {tag.attributes.name["en"]}
                    {!isLastTag && index !== 5 && ","}
                  </Link>
                );
              }
            })}
          </div>
          {/* Summary */}
          <div className="py-2 text-sm font-semibold text-white md:text-base">
            <h5>Summary</h5>
            <p className="text-sm opacity-70 font-normal w-full whitespace-nowrap py-1 text-wrap mx-auto line-clamp-5 leading-5">
              {featured[0]?.attributes?.description["en"]}
            </p>
          </div>
          {/* Statistics */}
          <div className="justify-self-end">asd</div>
        </div>
      </Card>
      <div></div>
    </section>
  );
};

export default MangaCarousel;
