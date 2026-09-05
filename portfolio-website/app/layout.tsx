import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ViewportGridProvider from "@/components/ViewportGridProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boo | Software Craftsman",
  description: "Personal portfolio of James Gabriel, frontend developer and AI interface builder.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ViewportGridProvider>{children}</ViewportGridProvider>
      </body>
    </html>
  );
}
