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
  title: "No.1 Scrap Dealer in Cebu | Buy & Sell Recyclables | Cebu Scrap",
  description: "Your description",
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