"use client";
import { cn } from '@/lib/utils';
import { useState, useEffect  } from 'react'

const Description = ({ description }: any) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='w-full'>
      <p className="text-primary text-base md:text-lg font-bold">Description:</p>
      <div className={`${toggle ? "" : "line-clamp-4"} !text-[15px] opacity-80 md:text-base`}>{description}</div>
      <button className="opacity-60 py-2 uppercase text-left w-full" onClick={() => setToggle(!toggle)}>{toggle ? "Show Less" : "Show More"}</button>
    </div>
  );
};

export default Description;
