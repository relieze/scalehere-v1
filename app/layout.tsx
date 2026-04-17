import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { ContactDialogProvider } from "@/lib/contact-dialog-context";

// Heading font — bold, geometric, premium feel
const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Body font — premium, clean, modern
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Accent font — optical serif for pull quotes and high-impact statements
const fraunces = Fraunces({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
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
      className={`${syne.variable} ${plusJakartaSans.variable} ${fraunces.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ContactDialogProvider>{children}</ContactDialogProvider>
      </body>
    </html>
  );
}
