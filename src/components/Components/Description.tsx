"use client";
import { useState, useEffect  } from 'react'

const Description = ({ description }: any) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={`px-2`}>
      <p className="text-blue-500 text-base md:text-lg font-bold">Description:</p>
      <div className={`${toggle ? "" : "line-clamp-4"} text-xs md:text-base`}>{description}</div>
      <button className="opacity-60 py-2 uppercase text-center w-full" onClick={() => setToggle(!toggle)}>{toggle ? "Show Less" : "Show More"}</button>
    </div>
  );
};

export default Description;
