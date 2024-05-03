import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import NavigationBar from "@/components/Components/NavigationBar";
import { ThemeProvider } from "@/components/Components/ThemesProvider";
import Footer from "./../components/Components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "MangaSensei",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-max bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SpeedInsights />
          <div className="pt-[3.5rem] scrolling-container max-w-screen-2xl mx-auto">
            <NavigationBar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
