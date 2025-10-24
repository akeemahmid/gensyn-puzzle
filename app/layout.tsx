import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import logo from "../public/genlogo.svg";
import logoround from "../public/genround.svg";
import { FaXTwitter } from "react-icons/fa6";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gensyn Puzzle",
  description: "Gensyn puzzle test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="w-full bg-transparent text-[#FFFFFFB2] mt-7 py-4 px-4 md:px-8 sticky">
          <div className="flex items-center justify-between ">
            <a
              href="https://www.gensyn.ai/"
              className="flex items-center gap-3 md:gap-5"
            >
              <Image
                src={logoround}
                alt="name"
                className="w-[30px] md:w-auto"
              />
              <Image src={logo} alt="name" className="w-[90px] md:w-[150px]" />
            </a>
            <h3 className="font-semibold   text-xl md:font-bold">Puzzle</h3>
          </div>
        </nav>
        <main className="transition-all transform ease-in-out duration-1000 delay-1200 flex-grow container mx-auto px-4 ">
          {children}
        </main>

        <div className="flex w-full items-end justify-end-safe px-8 mt-[5%]">
          <a
            href="https://x.com/haakimii__"
            className=" p-4 border-2 border-[#6e7777] hover:bg-[#fad8d133] text-white  font-bold text-[16px] flex items-center gap-2"
          >
            <FaXTwitter className="text-xl" />
            Hakimi
          </a>
        </div>
      </body>
    </html>
  );
}
