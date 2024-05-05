import Image from "next/image";
import React from "react";
import { Permanent_Marker } from "next/font/google";
import Link from "next/link";

const font = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
});

const topLinks = [
  {
    name: "Home",
    link: "home",
  },
  {
    name: "Hot Manga",
    link: "hot",
  },
  {
    name: "Free Anime Site",
    link: "https://anime-sensei-pro.vercel.app",
  },
  {
    name: "Manga App",
    link: "#",
  },
  {
    name: "Anime App",
    link: "#",
  },
];

const bottomLinks = [
  {
    name: "Privacy Policy",
    link: "privacy-policy",
  },
  {
    name: "Legal Disclaimer",
    link: "legal-disclaimer",
  },
  {
    name: "Terms Of Service",
    link: "terms-of-service",
  },
  {
    name: "Contact Us",
    link: "contact-us",
  },
  {
    name: "FAQ",
    link: "faqs",
  },
];

const Footer = () => {
  return (
    <section className="relative w-full max-h-[50dvh] max-w-screen-2xl md:mt-10 mt-5 h-auto flex items-center gap-3 md:gap-5 justify-center py-5 md:py-10 flex-col overflow-hidden">
      <div className="absolute top-0 hidden dark:block left-0 h-full w-full footer-bg z-[-1]"></div>
      <Image
        src="/footer.jpg"
        height={500}
        width={500}
        alt="footer-bg-image"
        priority
        className="w-full object-cover object-center brightness-[.20] absolute -z-10 top-0 left-0 h-full"
      />
      <Link
        href="/"
        className={`text-white font-semibold hover:scale-105 transition text-4xl opacity-80 ${font.className}`}
      >
        MangaSensei
      </Link>
      <div className="flex items-center text-white">
        {topLinks.map((link, index) => (
          <Link
            href={link.link}
            key={link.name}
            className={`opacity-80 text-xs md:text-sm text-center hover:opacity-100 hover:border-opacity-30 font-extralight ${
              index !== topLinks.length - 1 ? "md:border-r-2" : ""
            } px-1 md:px-5 border-opacity-30 border-white`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <p className="w-full px-2 md:px-0 md:w-3/5 text-center text-[10px] md:text-sm text-white opacity-50 leading-tight md:leading-snug tracking-wide">
        This website is intended solely for educational purposes. The manga
        content presented here is the intellectual property of their respective
        copyright holders. No copyright infringement was intended nor abused. No
        any forms of advertising were added and no type of earnings were made.
      </p>
      <div className="flex items-center text-white">
        {bottomLinks.map((link, index) => (
          <Link
            href={link.link}
            key={link.name}
            className={`opacity-50 text-[10px] text-center md:text-sm hover:opacity-100 hover:border-opacity-30 font-extralight ${
              index !== topLinks.length - 1 ? "md:border-r-2" : ""
            } px-1 md:px-5 border-opacity-30 border-white`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Footer;
