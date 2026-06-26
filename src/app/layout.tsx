import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { DownloadProvider } from "@/components/DownloadContext";

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Universal Video Downloader",
  description: "Download videos from TikTok, Instagram, YouTube, Twitter, and Facebook easily and securely.",
  manifest: "/manifest.json",
  icons: {
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 antialiased min-h-screen flex flex-col`}>
        <DownloadProvider>
          <main className="flex-1 pb-20 md:pb-0">
            {children}
          </main>
          <BottomNav />
        </DownloadProvider>
      </body>
    </html>
  );
}
