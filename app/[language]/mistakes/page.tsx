'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { intelligenceEngine, MistakeLog } from '@/lib/intelligence-engine';
import { CheckCircle2, RotateCcw, Volume2, MessageCircle, Type, BookOpen } from 'lucide-react';

export default function MistakesPage() {
  const params = useParams();
  const language = (params?.language as string) || 'french';
  const [mistakes, setMistakes] = useState<MistakeLog[]>([]);
  const [filter, setFilter] = useState<'needs_practice' | 'mastered' | 'all'>('needs_practice');

  useEffect(() => {
    setMistakes(intelligenceEngine.getMistakes());
  }, []);

  const handleRetry = (id: string, success: boolean) => {
    intelligenceEngine.updateMistakeStatus(id, success);
    setMistakes([...intelligenceEngine.getMistakes()]);
  };

  const filteredMistakes = filter === 'all' 
    ? mistakes 
    : mistakes.filter(m => m.status === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'listening': return <Volume2 size={20} />;
      case 'speaking':
      case 'pronunciation': return <MessageCircle size={20} />;
      case 'typing':
      case 'spelling': return <Type size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'listening': return 'Listening';
      case 'pronunciation': return 'Pronunciation';
      case 'spelling': return 'Spelling';
      default: return 'Meaning';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/${language}`} className="text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
          ← Back
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Learning Journal</h1>
      </div>

      <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-2xl w-fit">
        <button 
          onClick={() => setFilter('needs_practice')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${filter === 'needs_practice' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Needs Practice
        </button>
        <button 
          onClick={() => setFilter('mastered')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${filter === 'mastered' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Mastered
        </button>
        <button 
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${filter === 'all' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          All
        </button>
      </div>

      {filteredMistakes.length === 0 ? (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-16 text-center shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center min-h-[40vh] animate-fade-in-up">
          <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-5xl mb-6">
            {filter === 'mastered' ? '🏆' : '🌱'}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {filter === 'mastered' ? 'No mastered mistakes yet!' : 'No mistakes found!'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
            {filter === 'mastered' 
              ? "Keep practicing your mistakes to turn them into mastered concepts."
              : "You're doing great. When you make mistakes during lessons, they'll appear here for you to practice."}
          </p>
          {filter !== 'all' && (
            <button 
              onClick={() => setFilter('all')}
              className="text-blue-600 font-bold hover:text-blue-700 transition-colors focus-visible:ring-2 focus-visible:outline-none rounded-lg px-4 py-2"
            >
              View all mistakes
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredMistakes.map(m => (
            <div key={m.id} className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col gap-5 relative overflow-hidden transition-all hover:shadow-md">
              {m.status === 'mastered' && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 dark:bg-green-500/5 rounded-bl-[100px] z-0"></div>
              )}
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${m.status === 'mastered' ? 'bg-green-500' : 'bg-orange-500'}`}>
                    {getIcon(m.mistakeType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">{getTypeLabel(m.mistakeType)}</span>
                      {m.status === 'mastered' ? (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={12} /> Mastered
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                          Needs Practice
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      First attempted on {new Date(m.firstAttemptDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/20">
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">Your Answer</p>
                  <p className="text-lg font-medium text-red-700 dark:text-red-300">{m.actual}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/20">
                  <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">Correct Answer</p>
                  <p className="text-lg font-medium text-green-700 dark:text-green-300">{m.expected}</p>
                </div>
              </div>
              
              {m.reason && (
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/20 text-blue-800 dark:text-blue-300 text-sm relative z-10">
                  <span className="font-bold flex items-center gap-2 mb-1">
                    💡 Explanation
                  </span>
                  {m.reason}
                </div>
              )}

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 mt-2 relative z-10">
                <div className="flex gap-6 text-xs text-gray-500 w-full md:w-auto">
                  <div className="flex flex-col gap-1">
                    <span className="uppercase font-bold tracking-wider">Attempts</span>
                    <span className="font-medium text-gray-900 dark:text-white text-base">{m.attemptCount}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="uppercase font-bold tracking-wider">Successes</span>
                    <span className="font-medium text-gray-900 dark:text-white text-base">{m.successCount}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="uppercase font-bold tracking-wider">Last Practice</span>
                    <span className="font-medium text-gray-900 dark:text-white text-base">
                      {m.lastPracticeDate === m.firstAttemptDate ? 'Never' : new Date(m.lastPracticeDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  {m.status === 'needs_practice' ? (
                    <button 
                      onClick={() => handleRetry(m.id, true)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm"
                    >
                      <RotateCcw size={16} /> Mark Mastered
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRetry(m.id, false)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl transition-all"
                    >
                      Needs Practice
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
