import { Metadata } from 'next';
import DownloadForm from '@/components/DownloadForm';
import { FaFacebook as Facebook } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Facebook Video Downloader | Free & Fast',
  description: 'Download Facebook videos in Full HD quality for free.',
  openGraph: {
    title: 'Facebook Video Downloader',
    description: 'Download Facebook videos in Full HD quality for free.',
  },
};

export default function FacebookDownloader() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <Facebook className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Facebook Video Downloader
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Download any public Facebook video quickly and securely.
        </p>
        <DownloadForm platformName="facebook" placeholder="Paste Facebook link here..." color="bg-blue-600 hover:bg-blue-700 text-white" />
      </div>
    </div>
  );
}
