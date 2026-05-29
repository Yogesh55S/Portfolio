export const metadata = {
  title: "Yogesh Kumar | Portfolio",
  description: "Full-Stack Developer | Anime Enthusiast",
};

import "./globals.css";
import { Outfit } from "next/font/google";
import LoaderWrapper from "@/components/LoaderWrapper";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <LoaderWrapper>
          {children}
        </LoaderWrapper>
      </body>
    </html>
  );
}
