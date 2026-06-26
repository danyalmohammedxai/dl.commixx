import { Metadata } from 'next';
import DownloadForm from '@/components/DownloadForm';
import { FaTwitter as Twitter } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Twitter (X) Video Downloader | Free HD',
  description: 'Download videos and GIFs from Twitter (X) easily in HD quality.',
  openGraph: {
    title: 'Twitter (X) Video Downloader',
    description: 'Download videos and GIFs from Twitter (X) easily in HD quality.',
  },
};

export default function TwitterDownloader() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 mx-auto bg-blue-400 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Twitter className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Twitter Video Downloader
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Save Twitter videos and GIFs directly to your device.
        </p>
        <DownloadForm platformName="twitter" placeholder="Paste Twitter (X) link here..." color="bg-blue-500 hover:bg-blue-600 text-white" />
      </div>
    </div>
  );
}
