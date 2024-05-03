"use client";
import { useState, useRef, useEffect } from "react";

const Description = ({ description }: any) => {
  const [toggle, setToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.clientHeight < contentRef.current.scrollHeight
      );
    }
  }, [description]);

  return (
    <div className="w-full">
      <p className="text-primary text-base md:text-lg font-bold">
        Description:
      </p>
      <div
        className={`${
          toggle ? "" : "line-clamp-6"
        } !text-[15px] opacity-80 md:text-base break-all`}
        ref={contentRef}
      >
        {description}
      </div>
      {isOverflowing && (
        <button
          className="opacity-60 py-2 uppercase text-left w-full font-medium hover:text-blue-500"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Description;
