import Image from "next/image";
import { Carousel } from "../../utils/requests";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";

const CarouselMangas = async () => {
  const carouselItems = await Carousel();

  const contentTypeBg: any = {
    safe: "bg-[green]",
    suggestive: "bg-[#AC87C5]",
    pornographic: "bg-[crimson]",
    erotica: "bg-[#FF004D]",
  };

  return carouselItems?.map((manga: any, index: number) => (
    <Card
      key={index}
      className="relative min-h-[20rem] min-w-[100%] max-h-[22rem] snap-start overflow-hidden flex justify-center md:px-5 px-2 md:gap-5 gap-2 items-center dark:border-accent"
    >
      {/* Background */}
      <Image
        src={manga.cover}
        height={500}
        width={400}
        alt="featured-image-alt"
        className="w-full absolute h-full object-cover z-0 featured-bg shadow-md"
      />
      {/* Front */}
      <Image
        height={500}
        width={400}
        src={manga?.cover}
        alt="alt"
        className="z-20 min-w-20 md:w-1/6 md:h-4/5 h-auto object-cover rounded-md m-auto"
      />
      <div className="z-20 w-4/5 h-4/5 flex flex-col justify-between">
        <div>
          {/* Badges */}
          <h2 className="flex gap-1 uppercase font-semibold text-white">
            <p
              className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
            >
              {manga?.type}
            </p>
            {manga?.attributes?.publicationDemographic && (
              <p
                className={`w-min rounded bg-[#fff5] px-1 py-[2px] text-[.6rem]`}
              >
                {manga?.attributes?.publicationDemographic}
              </p>
            )}
            <p
              className={`w-min rounded px-1 py-[2px] text-[.6rem] ${
                contentTypeBg[manga?.attributes?.contentRating]
              }`}
            >
              {manga?.attributes?.contentRating}
            </p>
          </h2>
          {/* Title */}
          <h1
            className="text-3xl line-clamp-1 text-white shadow-sm font-bold"
            title={manga?.attributes?.title["en"]}
          >
            {manga?.attributes?.title["en"]}
          </h1>
          {/* Genres */}
          <div className="h-5 w-5/6 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-white md:text-sm">
            {manga?.attributes?.tags?.map((tag: any, index: number) => {
              const isLastTag = index === manga?.attributes?.tags?.length - 1;
              if (index <= 5) {
                return (
                  <Link
                    href="#"
                    key={index}
                    className="mr-1 hover:text-blue-500 opacity-80 hover:opacity-100"
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
              {manga?.attributes?.description["en"]}
            </p>
          </div>
        </div>
        {/* Statistics */}
        <div className="flex items-center justify-between justify-self-end">
          <div className="flex items-center gap-2 text-white">
            <Button className="bg-[#fff3] hover:bg-blue-500" size="sm">
              <BookmarkIcon />
            </Button>
            <Button className="min-w-32 bg-[#fff3] hover:bg-blue-500" size="sm">
              Read
            </Button>
          </div>
          <h1 className="flex gap-1 items-center text-white font-bold text-sm">
            Status: <span>{manga?.attributes?.status?.toUpperCase()}</span>
          </h1>
        </div>
      </div>
    </Card>
  ));
};

export default CarouselMangas;
