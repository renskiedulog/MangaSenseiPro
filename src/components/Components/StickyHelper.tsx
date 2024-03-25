"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FilterIcon, ShuffleIcon } from "lucide-react";

const StickyHelper = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 520; // Adjust this value to your desired scroll threshold
      const currentScrollY = window.scrollY || window.pageYOffset;

      // Check if the scroll position is greater than or equal to the threshold
      if (currentScrollY >= scrollThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Effect depends on the scrollingContainerRef

  return (
    <Card
      className={`${
        isSticky ? "static md:fixed md:top-14 md:mr-6 md:!w-[24%]" : ""
      } mt-2 transition border-accent bg-[var(--card-background)] p-2 w-full`}
    >
      <h1 className="text-lg font-bold text-center py-2">Tired Of Browsing?</h1>
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
          <Button
            key="randomize-btn"
            className="w-5/6 mt-1 bg-blue-500 hover:bg-blue-600 transition hover:scale-105 text-white"
            size={"sm"}
          >
            <ShuffleIcon className="size-4 mr-1" />
            Random
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StickyHelper;
