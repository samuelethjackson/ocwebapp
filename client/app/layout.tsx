import type { Metadata } from "next";
import "./globals.css";

import localFont from 'next/font/local'
import { fullBlog } from "./lib/interface";
import TitleBand from "./components/TitleBand";
const EduDiatype = localFont({ 
  src: './EduDiatype-Regular.woff2',
  display: 'swap',
  variable: '--diatype',
})

export const metadata: Metadata = {
  title: "Oceanic Refractions",
  description: "Oceanic Refractions emerges from a long-standing friendship and collaboration between us - AM Kanngieser (Germany/Australia) and Mere Nailatikau (Fiji).",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={EduDiatype.className}>
        {children}
        </body>
    </html>
  );
}
