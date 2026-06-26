import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Universal Video Downloader',
  description: 'Privacy Policy for Universal Video Downloader.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-3xl mx-auto prose dark:prose-invert">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p>
        At Universal Video Downloader, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.
      </p>
      <h2>Information We Do Not Collect</h2>
      <p>
        We do not collect, store, or log any of the videos you download or the URLs you paste into our platform. Your downloading activity remains completely private and is processed directly on our servers without being saved.
      </p>
    </div>
  );
}
