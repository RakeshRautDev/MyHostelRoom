import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "MyHostelRoom | Discover Your Room's History",
  description: "Track the history of occupants in specific hostel rooms. See who lived there before you, their placements, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <div className="main-content">
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
