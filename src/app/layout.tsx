import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ashish Agrawal | Founder & Full Stack Developer",
    template: "%s | Ashish Agrawal",
  },
  description:
    "Portfolio of Ashish Agrawal - Founder, Full Stack Developer, and Product Designer. Building premium, high-performance digital experiences and products that matter.",
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
    url: "https://ashishagrawal.com", // update to final domain later
    title: "Ashish Agrawal | Founder & Full Stack Developer",
    description: "Building premium, high-performance digital experiences and products that matter.",
    siteName: "Ashish Agrawal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Agrawal | Founder & Full Stack Developer",
    description: "Building premium, high-performance digital experiences and products that matter.",
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
      className={`dark ${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-bg-primary text-text-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
