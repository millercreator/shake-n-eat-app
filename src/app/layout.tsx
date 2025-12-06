import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { fontVariables } from "@/assets/fonts/loader";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ViewTransitions>
      <html lang="en" className={fontVariables} suppressHydrationWarning>
        <head>
          <meta name="theme-color" content="#ff6b35" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
        </head>
        <body>
          <PWAInstaller />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}

function PWAInstaller() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        `,
      }}
    />
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://bearbite.app/"),
  title: {
    default: "BearBite – Your AI Meal Buddy",
    template: "%s | BearBite",
  },
  description:
    "BearBite is your friendly AI-powered nutrition buddy: snap meals, log nutrients, spot deficiencies, and get exactly the right meal suggestions to stay balanced—no stress, just steady wins. It tracks your food, suggests serving sizes and recipes, and keeps your nutrition steady and healthy over time.",
  generator: "BearBite",
  keywords: [
    "nutrition tracker",
    "AI diet coach",
    "meal logging",
    "nutrient tracker",
    "food snap app",
    "diet app",
    "protein tracker",
    "vitamin tracking",
    "healthy eating",
    "balanced meals",
    "AI food recognition",
    "recipe suggestions",
    "macro tracker",
    "personal nutrition",
    "smart meal planner",
    "BearBite",
    "BearBite app",
  ],
  authors: [
    { name: "Joshua Miller", url: "https://bearbite.app/" },
  ],
  creator: "Joshua Miller",
  publisher: "Joshua Miller",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "BearBite – Your AI Meal Buddy",
    description:
      "Snap a meal, track your nutrients, and get instant AI meal suggestions to stay balanced. BearBite helps you eat better without stress—just simple, steady progress.",
    url: "https://bearbite.app/",
    siteName: "BearBite",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BearBite – Your AI Meal Buddy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BearBite – Your AI Meal Buddy",
    description:
      "BearBite tracks what you eat, spots your nutrition gaps, and suggests perfect meals and recipes—just snap, eat, enjoy steady wins. Dieting, simplified.",
    images: ["/twitter-card.png"],
    creator: "@bearbiteapp",
  },
  category: "Health & Nutrition",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffcf5" },
    { media: "(prefers-color-scheme: dark)", color: "#191717" },
  ],
};
