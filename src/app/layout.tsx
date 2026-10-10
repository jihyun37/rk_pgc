import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Pangyo Global Campus — Premium Business Stay",
    template: "%s | Pangyo Global Campus",
  },
  description:
    "A premium business residence in Daejang-dong, Pangyo, where work, rest and meaningful connections come together. PGC 403 Event Room and PGC 404 Guest Room.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={cormorant.variable}>
      <head>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
