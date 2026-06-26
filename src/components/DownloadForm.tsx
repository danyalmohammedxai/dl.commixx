'use client';

import { useState } from 'react';
import { Download, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useDownloadManager } from './DownloadContext';

interface DownloadFormProps {
  platformName: string;
  placeholder?: string;
  color?: string;
}

interface VideoResult {
  title?: string;
  thumbnail?: string;
  videoUrl?: string;
  audioUrl?: string;
}

export default function DownloadForm({ platformName, placeholder = "Paste video URL here...", color = "bg-blue-600 hover:bg-blue-700" }: DownloadFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoResult | null>(null);
  const [error, setError] = useState('');
  const { startDownload } = useDownloadManager();

  const handleFetchInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // First try to fetch from a free public API directly from the client
      // This bypasses the server's network restrictions in your current environment
      try {
        if (platformName.toLowerCase() === 'tiktok' || url.includes('tiktok.com')) {
          const tikRes = await fetch('https://www.tikwm.com/api/?url=' + encodeURIComponent(url));
          if (tikRes.ok) {
            const tikData = await tikRes.json();
            if (tikData.code === 0 && tikData.data) {
              setResult({
                title: tikData.data.title || 'TikTok Video',
                thumbnail: tikData.data.cover || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
                videoUrl: tikData.data.play,
                audioUrl: tikData.data.music || null
              });
              setLoading(false);
              return;
            }
          }
        }
      } catch (clientErr) {
        // Silently fail and fallback to the backend API
        console.warn("Client-side direct fetch failed, falling back to backend:", clientErr);
      }

      // Fallback to our Next.js backend API (requires RapidAPI key)
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, platform: platformName.toLowerCase() })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch video details');
      }
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form onSubmit={handleFetchInfo} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <LinkIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-11 pr-32 py-4 text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none text-gray-900 dark:text-white placeholder-gray-400"
        />
        <div className="absolute inset-y-1.5 right-1.5">
          <button
            type="submit"
            disabled={loading || !url}
            className={`h-full px-6 flex items-center gap-2 rounded-xl text-white font-medium transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed ${color}`}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
            <span className="hidden sm:inline">{loading ? 'Processing...' : 'Download'}</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {result && result.videoUrl && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-6">
          {result.thumbnail && (
            <img src={result.thumbnail} alt="Video thumbnail" className="w-full sm:w-48 aspect-video object-cover rounded-xl bg-gray-100 dark:bg-gray-800" />
          )}
          <div className="flex-1 w-full space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{result.title || 'Video Ready'}</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => startDownload(result.videoUrl || "", `${platformName}-video-${Date.now()}.mp4`)}
                className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-sm"
              >
                <Download className="h-4 w-4" />
                Download Video
              </button>
              {result.audioUrl && (
                <button 
                  onClick={() => startDownload(result.audioUrl || "", `${platformName}-audio-${Date.now()}.mp3`)}
                  className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl transition-colors"
                >
                  Download Audio
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
