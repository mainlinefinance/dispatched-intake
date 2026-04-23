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

export const metadata: Metadata = {
  title: "Dispatched — AI Capital Advisor",
  description:
    "Working capital, matched in minutes. Soft match, no credit impact.",
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
