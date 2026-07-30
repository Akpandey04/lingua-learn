'use client';
import { useState, useEffect } from 'react';
import { intelligenceEngine } from '@/lib/intelligence-engine';

export default function InternalDeveloperPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>({ mastery: [], mistakes: [] });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) {
            // refresh data when opening
            setData({
              mastery: intelligenceEngine.getAllMastery(),
              mistakes: intelligenceEngine.getMistakes()
            });
          }
          return !prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none p-4">
      <div className="w-full max-w-lg bg-black/90 backdrop-blur-md text-green-400 font-mono text-xs rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] pointer-events-auto border border-gray-800">
        <div className="flex justify-between items-center p-3 border-b border-gray-800 bg-black">
          <span className="font-bold uppercase tracking-wider text-white">⚙️ LinguaLearn Developer Panel</span>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }} 
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition-colors"
            >
              Reset All Progress
            </button>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white px-2 text-lg">✕</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 flex flex-col gap-6">
          <div>
            <h3 className="text-white border-b border-gray-800 pb-1 mb-2">INTELLIGENCE ENGINE (Mastery)</h3>
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(data.mastery, null, 2)}</pre>
          </div>
          
          <div>
            <h3 className="text-white border-b border-gray-800 pb-1 mb-2">INTELLIGENCE ENGINE (Mistakes)</h3>
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(data.mistakes, null, 2)}</pre>
          </div>
          
          <div>
            <h3 className="text-white border-b border-gray-800 pb-1 mb-2">LOCAL STORAGE SESSIONS</h3>
            <pre className="whitespace-pre-wrap break-words">
              {Object.keys(localStorage).filter(k => k.startsWith('lingua_session_')).map(k => `${k}: ${localStorage.getItem(k)}`).join('\n') || 'None'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
