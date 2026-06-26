import { Metadata } from 'next';
import DownloadForm from '@/components/DownloadForm';
import { Video, Sparkles, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Universal Video Downloader | Free & Fast',
  description: 'Download videos from TikTok, Instagram, YouTube, Twitter, and Facebook for free. High quality, fast, and no watermark options available.',
  openGraph: {
    title: 'Universal Video Downloader',
    description: 'Download videos from all major platforms easily.',
    url: 'https://yourdomain.com',
    siteName: 'Universal Video Downloader',
    locale: 'en_US',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Universal Video Downloader",
  "url": "https://yourdomain.com",
  "description": "Download videos from TikTok, Instagram, YouTube, Twitter, and Facebook for free. High quality, fast, and no watermark options available.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm border border-blue-200 dark:border-blue-800 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>100% Free & No Registration Required</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Universal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Video Downloader</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Download your favorite videos from TikTok, Instagram, YouTube, Twitter, and Facebook in the highest quality possible.
          </p>

          <DownloadForm platformName="universal" placeholder="Paste any video URL here..." />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Our highly optimized servers process your requests instantly without any delays.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">High Quality</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Download videos in their original resolution and highest possible quality.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">We don&apos;t log your downloads or store your videos. Your privacy is guaranteed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
