import localFont from "next/font/local";
import { Geist, Geist_Mono, Libre_Barcode_128 } from "next/font/google";

export const newKansas = localFont({
  variable: "--font-newkansas",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
  src: [
    {
      path: "./newkansas/NewKansas-Thin.woff2",
      style: "normal",
      weight: "100",
    },
    {
      path: "./newkansas/NewKansas-ThinItalic.woff2",
      style: "italic",
      weight: "100",
    },
    {
      path: "./newkansas/NewKansas-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "./newkansas/NewKansas-LightItalic.woff2",
      style: "italic",
      weight: "300",
    },
    {
      path: "./newkansas/NewKansas-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./newkansas/NewKansas-RegularItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "./newkansas/NewKansas-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./newkansas/NewKansas-MediumItalic.woff2",
      style: "italic",
      weight: "500",
    },
    {
      path: "./newkansas/NewKansas-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "./newkansas/NewKansas-SemiBoldItalic.woff2",
      style: "italic",
      weight: "600",
    },
    {
      path: "./newkansas/NewKansas-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./newkansas/NewKansas-BoldItalic.woff2",
      style: "italic",
      weight: "700",
    },
    {
      path: "./newkansas/NewKansas-Heavy.woff2",
      style: "normal",
      weight: "800",
    },
    {
      path: "./newkansas/NewKansas-Black.woff2",
      style: "normal",
      weight: "900",
    },
    {
      path: "./newkansas/NewKansas-BlackItalic.woff2",
      style: "italic",
      weight: "900",
    },
  ],
});


export const circularStd = localFont({
  variable: "--font-circular",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
  src: [
    {
      path: "./circularsdt/CircularStd-Book.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./circularsdt/CircularStd-BookItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "./circularsdt/CircularStd-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./circularsdt/CircularStd-MediumItalic.woff2",
      style: "italic",
      weight: "500",
    },
    {
      path: "./circularsdt/CircularStd-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./circularsdt/CircularStd-BoldItalic.woff2",
      style: "italic",
      weight: "700",
    },
    {
      path: "./circularsdt/CircularStd-Black.woff2",
      style: "normal",
      weight: "900",
    },
    {
      path: "./circularsdt/CircularStd-BlackItalic.woff2",
      style: "italic",
      weight: "900",
    },
  ],
});

export const libreBarcode128 = Libre_Barcode_128({
  subsets: ["latin"],
  variable: "--font-barcode",
  weight: "400",
  display: "swap",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const fontVariables = [
  circularStd.variable,
  geist.variable,
  geistMono.variable,
  newKansas.variable
].join(" ");
