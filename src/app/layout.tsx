import { Roboto, Rubik } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Glenn Garbo",
      },
    ],
  },
};

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const andes = localFont({
  src: [
    {
      path: "../../public/fonts/Andes.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-andes",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${rubik.variable} ${andes.variable} flex min-h-screen flex-col antialiased overflow-hidden`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
