"use client";
import { ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="md:block hidden fixed md:bottom-5 md:right-5 bottom-10 right-3 px-3 py-2.5 z-50 rounded-md shadow-md text-white hover:scale-105 bg-blue-500 transition"
        >
          <ArrowUp />
        </button>
      )}
    </div>
  );
};

export default BackToTop;