import type { Metadata } from "next";
import { DM_Sans, Syne, Cal_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
  adjustFontFallback: false,
});

const siteUrl = process.env.NEXTAUTH_URL || 'https://civicplay.ng';
// Remove trailing slash if present
const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const metadataBase = new URL(baseUrl);

export const metadata: Metadata = {
  title: "Civic Play — Nigeria’s Civic Education Quiz Game",
  description:
    "Learn. Compete. Test your civic knowledge. Civic Play is Nigeria’s interactive civic education quiz game for students and citizens.",
  metadataBase,
  icons: {
    icon: "/props/civicplaywhite.png",
  },
  openGraph: {
    title: "Civic Play — Learn Civics. Play to Win.",
    description:
      "Nigeria’s civic education game for students & citizens. Quiz, compete, and level up your civic IQ.",
    url: baseUrl,
    siteName: "Civic Play",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Civic Play — Learn Civics. Play to Win.",
    description: "Nigeria’s civic education game for students & citizens.",
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
    <html
      lang="en"
      className={cn(
        syne.variable,
        dmSans.variable,
        calSans.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body
        className="antialiased cursor-none"
        style={{ fontFamily: "var(--font-cal), ui-sans-serif, system-ui" }}
      >
        <AuthSessionProvider>
          <SmoothCursor />
          {children}
          <Analytics />
        </AuthSessionProvider>
      </body>
    </html>
  );
}