'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Download as DownloadIcon, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DownloadTask {
  id: string;
  url: string;
  filename: string;
  progress: number;
  status: 'idle' | 'downloading' | 'completed' | 'error';
  error?: string;
}

interface DownloadContextType {
  tasks: DownloadTask[];
  startDownload: (url: string, filename: string) => Promise<void>;
  removeTask: (id: string) => void;
}

const DownloadContext = createContext<DownloadContextType | null>(null);

export function useDownloadManager() {
  const context = useContext(DownloadContext);
  if (!context) throw new Error("useDownloadManager must be used within DownloadProvider");
  return context;
}

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<DownloadTask[]>([]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, options);
        });
      } else {
        new Notification(title, options);
      }
    }
  };

  const startDownload = async (url: string, filename: string) => {
    const id = Math.random().toString(36).substring(7);
    setTasks(prev => [...prev, { id, url, filename, progress: 0, status: 'downloading' }]);

    try {
      let response: Response | undefined;
      
      try {
        response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error("Proxy failed");
      } catch (e) {
        try {
          response = await fetch(url);
          if (!response.ok) throw new Error("Direct fetch failed");
        } catch (e2) {
          response = undefined;
        }
      }

      if (!response || !response.body) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed', progress: 100 } : t));
        showNotification('Download Started', {
          body: `${filename} is opening in a new tab.`,
          icon: '/icons/icon-192x192.png'
        });
        setTimeout(() => setTasks(prev => prev.filter(t => t.id !== id)), 5000);
        return;
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      let loaded = 0;

      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        chunks.push(value);
        loaded += value.length;
        
        if (total > 0) {
          const progress = Math.round((loaded / total) * 100);
          setTasks(prev => prev.map(t => t.id === id ? { ...t, progress } : t));
        } else {
           const fakeProgress = Math.min(99, Math.round((loaded / (1024 * 1024)) * 10)); 
           setTasks(prev => prev.map(t => t.id === id ? { ...t, progress: fakeProgress } : t));
        }
      }

      const blob = new Blob(chunks);
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed', progress: 100 } : t));
      
      showNotification('Download Complete', {
        body: `${filename} has been successfully downloaded.`,
        icon: '/icons/icon-192x192.png'
      });
      
      setTimeout(() => {
        setTasks(prev => prev.filter(t => t.id !== id));
      }, 5000);

    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'error', error: errorMessage } : t));
    }
  };

  const removeTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

  return (
    <DownloadContext.Provider value={{ tasks, startDownload, removeTask }}>
      {children}
      <DownloadManagerView tasks={tasks} removeTask={removeTask} />
    </DownloadContext.Provider>
  );
}

function DownloadManagerView({ tasks, removeTask }: { tasks: DownloadTask[], removeTask: (id: string) => void }) {
  if (tasks.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-[60] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`p-2 rounded-full shrink-0 ${
                  task.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                  task.status === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                  'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                }`}>
                  {task.status === 'completed' ? <CheckCircle2 size={18} /> :
                   task.status === 'error' ? <AlertCircle size={18} /> :
                   <DownloadIcon size={18} className="animate-pulse" />}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate" title={task.filename}>
                    {task.filename}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {task.status === 'downloading' ? `${task.progress}%` : 
                     task.status === 'completed' ? 'Done' : 'Failed'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => removeTask(task.id)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>
            
            {task.status === 'downloading' && (
              <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${task.progress}%` }} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
