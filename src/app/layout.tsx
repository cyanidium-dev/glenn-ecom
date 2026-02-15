import dynamic from "next/dynamic";
import { Roboto, Rubik } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/shared/header/Header";
import SplashGate from "@/components/shared/splashScreen/SplashGate";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

const Footer = dynamic(() => import("@/components/shared/footer/Footer"), {
  ssr: true,
});

export const revalidate = 60;

export const metadata = getDefaultMetadata();

/** Mobile/tablet: color for browser UI (status bar, etc.) and uncovered areas. */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#3c0006",
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
  preload: true,
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${roboto.variable} ${rubik.variable} ${andes.variable} flex min-h-screen flex-col antialiased overflow-hidden`}
      >
        <SplashGate>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SplashGate>
      </body>
    </html>
  );
}
