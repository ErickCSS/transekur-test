import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SharedMotionProvider } from "@/modules/shared/components/shared-motion-provider.components";
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
  title: "Ten Minutes Away",
  description: "Mini demo of the “driver 10 minutes away” client notice.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SharedMotionProvider>{children}</SharedMotionProvider>
      </body>
    </html>
  );
}
