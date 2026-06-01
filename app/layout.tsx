import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Space_Mono, Syne } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { WarliBackground } from "@/components/layout/WarliBackground";
import { EditorialNav } from "@/components/layout/EditorialNav";
import { AssistantWidget } from "@/components/layout/AssistantWidget";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { EditorialCursor } from "@/components/effects/EditorialCursor";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { personal } from "@/lib/content";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const siteUrl = "https://girishnalawade1.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} — Software Engineer`,
    template: `%s | ${personal.name}`,
  },
  description: personal.shortBio,
  authors: [{ name: personal.name }],
  creator: personal.name,
  keywords: [
    "Girish Nalawade",
    "Software Engineer",
    "Backend Engineer",
    "Distributed Systems",
    "Cloud Infrastructure",
    "LLM Agents",
    "Spring Boot",
    "Kubernetes",
    "Microservices",
  ],
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: `${personal.name} — Software Engineer`,
    description: personal.shortBio,
    url: siteUrl,
    siteName: `${personal.name} Portfolio`,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — Software Engineer`,
    description: personal.shortBio,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0d2" },
    { media: "(prefers-color-scheme: dark)", color: "#2d1e18" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebas.variable} ${spaceMono.variable} ${syne.variable}`}
    >
      <body className="relative min-h-screen bg-app font-sans text-ink antialiased">
        <GoogleAnalytics />
        <StructuredData />
        <ThemeProvider>
          <LenisProvider>
            <a
              href="#hero"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
            >
              Skip to content
            </a>
            <WarliBackground />
            <EditorialCursor />
            <EditorialNav />
            <main className="relative z-[1]">{children}</main>
            <CommandPalette />
            <AssistantWidget />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
