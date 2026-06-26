import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Universal Video Downloader',
  description: 'Terms and Conditions for Universal Video Downloader.',
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-3xl mx-auto prose dark:prose-invert">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <p>
        Welcome to Universal Video Downloader!
      </p>
      <p>
        By accessing this website we assume you accept these terms and conditions. Do not continue to use Universal Video Downloader if you do not agree to take all of the terms and conditions stated on this page.
      </p>
      <h2>License</h2>
      <p>
        You must only download videos for which you have the right or permission from the original creator. We do not host or own any of the videos downloaded through our service.
      </p>
    </div>
  );
}
