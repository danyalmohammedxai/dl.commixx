import { Metadata } from 'next';
import DownloadForm from '@/components/DownloadForm';
import { FaInstagram as Instagram } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Instagram Video & Reels Downloader | Free',
  description: 'Download Instagram Reels, IGTV, and Videos in high quality. Free Instagram downloader tool.',
  openGraph: {
    title: 'Instagram Video & Reels Downloader',
    description: 'Download Instagram Reels, IGTV, and Videos in high quality.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Instagram Video Downloader",
  "description": "Download Instagram Reels, IGTV, and Videos in high quality.",
  "applicationCategory": "MultimediaApplication",
};

export default function InstagramDownloader() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Instagram className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Instagram Video Downloader
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Save your favorite Instagram Reels and videos directly to your device.
        </p>
        <DownloadForm platformName="instagram" placeholder="Paste Instagram link here..." color="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" />
      </div>
    </div>
  );
}
