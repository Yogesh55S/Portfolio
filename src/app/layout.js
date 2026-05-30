export const metadata = {
  title: "Yogesh Kumar | Portfolio",
  description: "Full-Stack Developer | Anime Enthusiast",
};

import "./globals.css";
import { Outfit } from "next/font/google";
import LoaderWrapper from "@/components/LoaderWrapper";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ClerkProvider>
          <LoaderWrapper>
            {children}
          </LoaderWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
