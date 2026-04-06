import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

// Heading font — bold, geometric, premium feel
const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Body font — clean, readable, modern
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Scale SD — Social Media Marketing Agency | San Diego",
  description:
    "We manage all your content & ads with just 1 hour of your time each week. 100+ clients, $1M+ revenue generated. Based in San Diego.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // "dark" class forces dark theme globally — our brand is dark by default
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
