'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import DarkModeToggle from './ui/DarkModeToggle';
import { useProgress } from '@/hooks/useProgress';
import StreakBadge from './ui/StreakBadge';
import AudioSettingsModal from './ui/AudioSettingsModal';

export default function Header() {
  const { progress } = useProgress();
  const params = useParams();
  const pathname = usePathname();
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
  const language = (params?.language as string) || 'fr';

  if (pathname?.includes('/lesson-')) return null;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#2b3035] border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl text-blue-600 dark:text-blue-400 hover:opacity-80 transition"
        >
          <span className="text-2xl">🌍</span>
          <span>LinguaLearn</span>
        </Link>
        
        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex gap-6 font-semibold text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="text-gray-900 dark:text-white">Home</Link>
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Languages</Link>
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Achievements</Link>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-4">
          <StreakBadge streak={progress.streak} />
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#212529] rounded-full p-1 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200">
            <button 
              onClick={() => setIsAudioSettingsOpen(true)}
              aria-label="Audio Settings"
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            >
              🔊
            </button>
            <DarkModeToggle />
          </div>
        </div>
      </div>

      <AudioSettingsModal 
        isOpen={isAudioSettingsOpen} 
        onClose={() => setIsAudioSettingsOpen(false)} 
        language={language}
      />
    </header>
  );
}
