"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ToggleTheme } from "./ToggleTheme";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../ui/navigation-menu";
import React from "react";
import { genres } from "@/utils/constants";
import { ShuffleIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SearchBar from "./SearchBar";
import { Permanent_Marker } from "next/font/google";
import { usePathname } from "next/navigation";

const font = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
});

const NavigationBar = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu
      className={`max-w-screen-2xl top-0 z-50 w-full justify-between border-b border-border bg-background left-1/2 -translate-x-1/2 h-[3.5rem] md:px-10 px-5 ${
        pathname === "/" || pathname.split("/")?.length === 2 || pathname?.split("/")[1] === "search"
          ? "fixed"
          : "absolute"
      }`}
    >
      <NavigationMenuList>
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
          <p
            className={`text-xl md:text-3xl text-primary font-bold tracking-tight transition hover:scale-105 ${font.className}`}
          >
            Manga<span className="font-normal">Sensei</span>
          </p>
        </Link>
        <NavigationMenuItem className="md:pl-3 md:block hidden">
          <NavigationMenuTrigger className="opacity-70 hover:opacity-100 font-medium">
            Genre
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] sm:grid-cols-3 md:grid-cols-5 lg:w-[600px] ">
              {genres.map((genre) => (
                <ListItem
                  key={genre.title}
                  title={genre.title}
                  href={genre.href}
                  className="text-sm text-center"
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <Link
          href="#"
          className="text-sm opacity-70 hover:opacity-100 font-medium px-3 py-2 hover:bg-accent rounded md:block hidden"
        >
          Top Manga
        </Link>
        <Link
          href="#"
          className="text-sm opacity-70 hover:opacity-100 font-medium px-3 py-2 hover:bg-accent rounded md:block hidden"
        >
          Latest Manga
        </Link>
      </NavigationMenuList>
      {/* Right Side */}
      <div className="flex items-center gap-2 justify-end">
        <SearchBar />
        {/* Random Manga Button */}
        <a href="/random" className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ShuffleIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all mx-2" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Random Manga</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </a>
        {/* Light Mode / Dark Mode Button */}
        <ToggleTheme />
      </div>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {title}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavigationBar;
