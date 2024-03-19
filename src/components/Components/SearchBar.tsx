import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="flex gap-1 relative items-center md:w-full w-1/2">
      <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 size-5 opacity-70" />
      <Input
        className="h-8 focus-visible:ring-accent pl-8"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
