import type { Metadata } from "next";
import { fontAloevera, fontLato } from "./fonts";
import "./globals.css";
import Navbar from "@/shared/components/Navbar";
import SmoothScroll from "@/shared/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Sportmantle | Sports for Christ",
  description: "Using sports as a tool to spread the message of Jesus Christ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${fontAloevera.variable} ${fontLato.variable} antialiased`}>
      <body
        className="selection:bg-primary selection:text-primary-foreground font-body"
      >
        <div className="noise-overlay" />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
