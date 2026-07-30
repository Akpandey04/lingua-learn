'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DarkModeToggle from '../ui/DarkModeToggle';
import { useProgress } from '@/hooks/useProgress';
import StreakBadge from '../ui/StreakBadge';
import AudioSettingsModal from '../ui/AudioSettingsModal';

interface Props {
  lessonTitle: string;
  progressPct: number;
  onRestart?: () => void;
}

export default function LessonHeader({ lessonTitle, progressPct, onRestart }: Props) {
  const router = useRouter();
  const params = useParams();
  const { progress } = useProgress();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  
  const language = (params?.language as string) || 'fr';

  const handleRestart = () => {
    setShowRestartModal(false);
    if (onRestart) {
      onRestart();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Back Button & Title */}
          <button 
            onClick={() => setShowLeaveModal(true)}
            className="flex items-center gap-2 font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <span className="text-xl">&larr;</span>
            <span className="hidden sm:inline truncate max-w-[150px]">{lessonTitle}</span>
          </button>

          {/* Progress Bar & Stage Indicator */}
          <div className="flex-1 max-w-xl flex flex-col gap-1">
            <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="hidden md:flex justify-between items-center text-[10px] font-bold text-gray-400">
              <span className={progressPct >= 0 ? 'text-blue-500 font-extrabold' : ''}>📖 Learn</span>
              <span className={progressPct >= 15 ? 'text-blue-500 font-extrabold' : ''}>🔊 Listen</span>
              <span className={progressPct >= 30 ? 'text-blue-500 font-extrabold' : ''}>🎤 Speak</span>
              <span className={progressPct >= 45 ? 'text-blue-500 font-extrabold' : ''}>⌨ Type</span>
              <span className={progressPct >= 60 ? 'text-blue-500 font-extrabold' : ''}>💬 Dialogue</span>
              <span className={progressPct >= 75 ? 'text-blue-500 font-extrabold' : ''}>📝 Practice</span>
              <span className={progressPct >= 90 ? 'text-blue-500 font-extrabold' : ''}>🎯 Quiz</span>
            </div>
          </div>

          {/* Stats & Tools */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-full p-1 border border-gray-100 dark:border-gray-800">
              {onRestart && (
                <button
                  onClick={() => setShowRestartModal(true)}
                  aria-label="Restart Lesson"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  🔄
                </button>
              )}
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
              <button 
                onClick={() => setIsAudioSettingsOpen(true)}
                aria-label="Audio Settings"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                🔊
              </button>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-fade-in">
            <div className="text-4xl mb-4">🚪</div>
            <h2 className="text-2xl font-bold mb-2">Leave lesson?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Your progress has already been saved. You can resume exactly where you left off.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowLeaveModal(false)}
                className="px-6 py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors w-full"
              >
                Continue Lesson
              </button>
              <button 
                onClick={() => router.push(`/${language}`)}
                className="px-6 py-4 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors w-full"
              >
                Leave Lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restart Modal */}
      {showRestartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-fade-in">
            <div className="text-4xl mb-4">🔄</div>
            <h2 className="text-2xl font-bold mb-2">Restart this lesson?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Your current lesson progress will be reset, but your completed lessons and learning history will remain safe.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleRestart}
                className="px-6 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-colors w-full"
              >
                Restart Lesson
              </button>
              <button 
                onClick={() => setShowRestartModal(false)}
                className="px-6 py-4 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <AudioSettingsModal 
        isOpen={isAudioSettingsOpen} 
        onClose={() => setIsAudioSettingsOpen(false)} 
        language={language}
      />
    </>
  );
}
