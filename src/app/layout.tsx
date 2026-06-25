import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

// Cormorant Garamond — luxury editorial serif for display headings
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Manrope — geometric, clean sans-serif for body + UI
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ashish Agrawal | CS Undergrad & Full Stack Developer",
    template: "%s | Ashish Agrawal",
  },
  description:
    "Portfolio of Ashish Agrawal - CS Undergrad at BMU, Aspiring Full Stack Developer building FinTech & Web Solutions.",
  keywords: [
    "Ashish Agrawal",
    "Full Stack Developer",
    "Founder",
    "React Developer",
    "Next.js Developer",
    "Web Designer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Ashish Agrawal" }],
  creator: "Ashish Agrawal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashishagrawal.com",
    title: "Ashish Agrawal | CS Undergrad & Full Stack Developer",
    description: "Portfolio of Ashish Agrawal - CS Undergrad at BMU, Aspiring Full Stack Developer building FinTech & Web Solutions.",
    siteName: "Ashish Agrawal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Agrawal | CS Undergrad & Full Stack Developer",
    description: "Portfolio of Ashish Agrawal - CS Undergrad at BMU, Aspiring Full Stack Developer building FinTech & Web Solutions.",
    creator: "@ashishagrawal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${cormorant.variable} ${manrope.variable}`}
    >
      <body className="bg-bg-primary text-text-primary antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
