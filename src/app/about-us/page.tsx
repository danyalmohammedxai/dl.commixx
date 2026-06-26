import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Universal Video Downloader',
  description: 'Learn more about Universal Video Downloader.',
};

export default function AboutUs() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-3xl mx-auto prose dark:prose-invert">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p>
        Welcome to Universal Video Downloader, your number one source for downloading videos from various social media platforms including TikTok, Instagram, YouTube, Twitter, and Facebook. We&apos;re dedicated to providing you the very best of video downloading services, with an emphasis on speed, quality, and user privacy.
      </p>
      <p>
        Our platform is designed to be fast, reliable, and entirely free to use. We believe in providing open access to tools that make your digital life easier.
      </p>
    </div>
  );
}
