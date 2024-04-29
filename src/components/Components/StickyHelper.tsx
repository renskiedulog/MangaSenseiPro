import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FilterIcon, ShuffleIcon } from "lucide-react";
import FeaturedManga from "./FeaturedManga";
import { getFeaturedManga } from "@/utils/requests";

const StickyHelper = async () => {
  const featuredManga = await getFeaturedManga();

  return (
    <div className="static md:sticky top-0 md:top-16 md:mr-6 transition w-full">
      <FeaturedManga newFeatured={featuredManga} />
      {/* Filter And Random Helper */}
      <Card className="bg-[var(--card-background)] p-2 border-accent">
        <h1 className="text-lg font-bold text-center py-2">
          Tired Of Browsing?
        </h1>
        <div className="w-full grid grid-cols-2">
          <div className="text-center text-sm">
            <p>Specify Search</p>
            <Button
              key="filter-btn"
              className="w-5/6 mt-1 bg-blue-500 hover:bg-blue-600 transition hover:scale-105 text-white"
              size={"sm"}
            >
              <FilterIcon className="size-4 mr-1" />
              Filter
            </Button>
          </div>
          <div className="text-center text-sm">
            <p>Randomize</p>
            <a href="/random">
              <Button
                key="randomize-btn"
                className="w-5/6 mt-1 bg-blue-500 hover:bg-blue-600 transition hover:scale-105 text-white"
                size={"sm"}
              >
                <ShuffleIcon className="size-4 mr-1" />
                Random
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StickyHelper;
