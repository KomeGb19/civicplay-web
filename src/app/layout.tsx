import type { Metadata } from "next";
import { DM_Sans, Syne, Cal_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const calSans = Cal_Sans({
  subsets: ["latin"],
  variable: "--font-cal",
  display: "swap",
  weight: ["400"],
});


export const metadata: Metadata = {
  title: "Civic Play — Nigeria’s Civic Education Quiz Game",
  description:
    "Learn. Compete. Test your civic knowledge. Civic Play is Nigeria’s interactive civic education quiz game for students and citizens.",
  metadataBase: new URL("https://civicplay.ng"),
  openGraph: {
    title: "Civic Play — Learn Civics. Play to Win.",
    description:
      "Nigeria’s civic education game for students & citizens. Quiz, compete, and level up your civic IQ.",
    url: "https://civicplay.ng",
    siteName: "Civic Play",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Civic Play — Learn Civics. Play to Win.",
    description:
      "Nigeria’s civic education game for students & citizens.",
  },
  keywords: [
    "civic education",
    "Nigeria",
    "quiz game",
    "democracy",
    "youth participation",
    "Roundcheck",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${calSans.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-cal), ui-sans-serif, system-ui" }}>
        {children}
      </body>
    </html>
  );
}
