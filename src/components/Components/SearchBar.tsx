"use client"
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === "Enter" && search.trim() !== "") {
        setSearch("");
        router.push(`/search/${encodeURIComponent(search.trim())}`);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [search, router]);

  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex gap-1 relative items-center md:w-full w-1/2">
      <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 size-5 opacity-70" />
      <Input
        className="h-8 focus-visible:ring-accent pl-8"
        placeholder="Search..."
        value={search}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
