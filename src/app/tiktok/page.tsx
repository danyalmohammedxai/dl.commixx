import { Metadata } from 'next';
import DownloadForm from '@/components/DownloadForm';
import { Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TikTok Video Downloader Without Watermark | Free',
  description: 'Download TikTok videos without watermark in HD quality for free. Fast, secure, and works on all devices.',
  openGraph: {
    title: 'TikTok Video Downloader Without Watermark',
    description: 'Download TikTok videos without watermark in HD quality for free.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TikTok Video Downloader",
  "description": "Download TikTok videos without watermark in HD quality for free.",
  "applicationCategory": "MultimediaApplication",
};

export default function TikTokDownloader() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 mx-auto bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Video className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          TikTok Video Downloader
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Download TikTok videos without watermark easily. Paste the link below to get started.
        </p>
        <DownloadForm platformName="tiktok" placeholder="Paste TikTok link here..." color="bg-black hover:bg-gray-800 text-white" />
      </div>
    </div>
  );
}
