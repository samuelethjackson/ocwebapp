import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { AnimateProvider } from "./components/AnimateContext";
import { VideoProvider } from "./components/VideoContext";
const EduDiatype = localFont({
  src: "./EduDiatype-Regular.woff2",
  display: "swap",
  variable: "--diatype",
});

export const metadata: Metadata = {
  title: "Oceanic Refractions",
  description:
    "Oceanic Refractions emerges from a long-standing friendship and collaboration between us - AM Kanngieser (Germany/Australia) and Mere Nailatikau (Fiji).",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={EduDiatype.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <AnimateProvider>
            <VideoProvider>
              <div className="app">{children}</div>
            </VideoProvider>
          </AnimateProvider>
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
