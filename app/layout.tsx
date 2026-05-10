import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const archivo = localFont({
  src: [
    { path: "../public/fonts/Archivo-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Archivo-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Archivo-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Archivo-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = localFont({
  src: [
    { path: "../public/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/IBMPlexSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "../public/fonts/IBMPlexMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/IBMPlexMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://dispatched.finance";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dispatched — Capital built for truckers",
    template: "%s | Dispatched",
  },
  description:
    "Capital built for truckers. No collateral. Bank decline is okay. We match owner-operators and small fleets with trucking-friendly lenders for repair loans, working capital, equipment financing, and commercial truck insurance.",
  applicationName: "Dispatched",
  authors: [{ name: "Dispatched, Inc.", url: SITE_URL }],
  creator: "Dispatched, Inc.",
  publisher: "Dispatched, Inc.",
  alternates: { canonical: "/" },
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Dispatched",
    title: "Dispatched — Capital built for truckers",
    description:
      "Capital and insurance for commercial trucking. One application, soft pull, lender-paid.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dispatched — Capital built for truckers",
    description:
      "Capital and insurance for commercial trucking. One application, soft pull, lender-paid.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
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
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
