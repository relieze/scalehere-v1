import type { Metadata } from "next";
import { Montserrat, Karla } from "next/font/google";
import "./globals.css";
import { ContactDialogProvider } from "@/lib/contact-dialog-context";

// Heading font — Montserrat. Weights used: 500 (subheads/eyebrows/nav),
// 700 (default section titles), 900 (hero / big statement moments only)
const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

// Body font — Karla. Weights used: 400 (body, 80% of text),
// 700 (inline emphasis, stat callouts, labels). Italic enabled for
// pull quotes, captions, and testimonial client names.
const karla = Karla({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${montserrat.variable} ${karla.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ContactDialogProvider>{children}</ContactDialogProvider>
      </body>
    </html>
  );
}
