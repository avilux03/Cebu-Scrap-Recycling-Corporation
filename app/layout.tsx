import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cebuscrap.com"),
  title: "No.1 Scrap Dealer in Cebu | Buy & Sell Recyclables | Cebu Scrap",
  description:
    "Cebu Scrap Recycling Corporation buys and sells scrap and recycled materials in Cebu — GI sheets, galvalume, steel tubes, roofing materials, and more at affordable prices.",
  openGraph: {
    title: "No.1 Scrap Dealer in Cebu | Buy & Sell Recyclables | Cebu Scrap",
    description:
      "Cebu Scrap Recycling Corporation buys and sells scrap and recycled materials in Cebu — GI sheets, galvalume, steel tubes, roofing materials, and more at affordable prices.",
    url: "https://cebuscrap.com",
    siteName: "Cebu Scrap Recycling Corporation",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={workSans.variable}>
      <body style={{ fontFamily: "'Work Sans', sans-serif" }}>
        <Navbar />
   
        {children}
      </body>
    </html>
  );
}
