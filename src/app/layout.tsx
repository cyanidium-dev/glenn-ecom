import { Roboto, Rubik } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

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
        className={`${roboto.variable} ${rubik.variable} ${andes.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
