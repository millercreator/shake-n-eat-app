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
  metadataBase: new URL("https://my-coupon-vault.vercel.app/"),
  title: {
    default: "CouponVault - Secure Digital Coupon Storage & Management",
    template: "%s | CouponVault",
  },
  description:
    "CouponVault is your secure digital coupon vault for storing, managing, and organizing all your digital coupons in one place. Never miss a discount or lose a coupon again.",
  generator: "CouponVault",
  keywords: [
    "digital coupons",
    "coupon vault",
    "coupon management",
    "coupon storage",
    "discounts",
    "savings",
    "digital wallet",
    "coupon organizer",
    "voucher management",
    "coupon expiration reminders",
    "personal finance",
    "deals",
  ],
  authors: [
    { name: "Joshua Miller", url: "https://my-coupon-vault.vercel.app/" },
  ],
  creator: "Joshua Miller",
  publisher: "Joshua miller",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "CouponVault - Secure Digital Coupon Storage & Management",
    description:
      "Safely store, manage, and organize all your digital coupons. Fast, secure, and always accessible—never miss another saving opportunity.",
    url: "https://my-coupon-vault.vercel.app/",
    siteName: "CouponVault",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "CouponVault - Secure Digital Coupon Storage & Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CouponVault - Secure Digital Coupon Storage & Management",
    description:
      "Effortlessly store and organize every digital coupon you receive. Access from anywhere, manage expiration dates, and maximize your savings with CouponVault.",
    images: ["/twitter-card.png"],
    creator: "@couponvault",
  },
  // themeColor removed, moved to viewport below
  category: "personal finance",
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#251c16" },
  ],
};
