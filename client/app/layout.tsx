import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { AnimateProvider } from "./components/context/AnimateContext";
import { VideoProvider } from "./components/context/VideoContext";
import { ThemeProvider } from "./components/context/ThemeProvider";
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
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <AnimateProvider>
            <VideoProvider>
              <div className="app fade-in">{children}</div>
            </VideoProvider>
          </AnimateProvider>
          </ThemeProvider>
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
