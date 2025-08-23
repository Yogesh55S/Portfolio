export const metadata = {
  title: "Yogesh Kumar | Portfolio",
  description: "Full-Stack Developer | Anime Enthusiast",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
