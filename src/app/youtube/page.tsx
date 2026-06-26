import { Metadata } from 'next';
import DownloadForm from '@/components/DownloadForm';
import { FaYoutube as Youtube } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'YouTube Video & Shorts Downloader | Free',
  description: 'Download YouTube Videos and Shorts in 1080p, 4K quality for free.',
  openGraph: {
    title: 'YouTube Video & Shorts Downloader',
    description: 'Download YouTube Videos and Shorts in 1080p, 4K quality for free.',
  },
};

export default function YouTubeDownloader() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 mx-auto bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Youtube className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          YouTube Video Downloader
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Download your favorite YouTube videos and Shorts in high resolution.
        </p>
        <DownloadForm platformName="youtube" placeholder="Paste YouTube link here..." color="bg-red-600 hover:bg-red-700 text-white" />
      </div>
    </div>
  );
}
