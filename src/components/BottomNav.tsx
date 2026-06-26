'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Video } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import clsx from 'clsx';

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/tiktok', label: 'TikTok', icon: Video },
    { href: '/instagram', label: 'Instagram', icon: FaInstagram },
    { href: '/youtube', label: 'YouTube', icon: FaYoutube },
    { href: '/twitter', label: 'Twitter', icon: FaTwitter },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 md:hidden">
      <nav className="flex justify-around items-center p-2 pb-[env(safe-area-inset-bottom)]">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={clsx(
                "flex flex-col items-center justify-center w-full py-1 gap-1 transition-colors",
                isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
