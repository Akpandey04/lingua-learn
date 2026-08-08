import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Confetti from '../ui/Confetti';
import type { Lesson } from '@/types/domain';
import html2pdf from 'html2pdf.js';

interface Props {
  lesson: Lesson;
  conceptsLearned?: string[];
  onRestart?: () => void;
}

export default function CelebrationModule({
  lesson,
  onRestart
}: Props) {
  const router = useRouter();
  const params = useParams();
  const language = (params?.language as string) || 'fr';
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleRestart = () => {
    setShowRestartModal(false);
    if (onRestart) onRestart();
  };

  const notesRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadNotes = async () => {
    if (!notesRef.current) return;
    setIsDownloading(true);
    try {
      const opt: any = {
        margin:       10,
        filename:     `Notes_${lesson.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      await html2pdf().set(opt).from(notesRef.current).save();
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Extract vocabulary and sentences for the PDF
  const vocabularies: any[] = [];
  const dialogueLines: any[] = [];
  lesson.modules?.forEach((m: any) => {
    if (m.type === 'vocabulary' && m.config?.words) {
      vocabularies.push(...m.config.words);
    } else if (m.type === 'dialogue' && m.config?.lines) {
      dialogueLines.push(...m.config.lines);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in duration-500 relative">
      <div className="hidden motion-safe:block">
        <Confetti active={true} />
      </div>
      
      <div className="text-7xl motion-safe:animate-bounce">🎉</div>
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Lesson Complete!</h2>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-md text-left flex flex-col gap-6 relative z-10">
        <div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">You completed</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{lesson.title}</p>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />

        {/* Completion Statistics Analytics */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📊 Learning Summary</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 block mb-0.5">Concepts Taught</span>
              <span className="font-bold text-base text-gray-800 dark:text-white">{(lesson as any).modules?.[0]?.config?.words?.length || lesson.learningObjectives?.length || 5}</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
              <span className="text-gray-400 block mb-0.5">Concepts Practiced</span>
              <span className="font-bold text-base text-green-600 dark:text-green-400">100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-md gap-3 mt-4 relative z-10">
        <button 
          onClick={handleDownloadNotes}
          disabled={isDownloading}
          className="w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {isDownloading ? 'Generating PDF...' : '📄 Download PDF Notes'}
        </button>
        <button 
          onClick={() => router.push(`/${language}`)}
          className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-bold text-lg shadow-sm transition-all"
        >
          Return to Course
        </button>
        {onRestart && (
          <button 
            onClick={() => setShowRestartModal(true)}
            className="w-full py-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-2xl font-bold text-lg transition-all"
          >
            Restart Lesson
          </button>
        )}
      </div>

      {/* Restart Modal */}
      {showRestartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-fade-in relative z-[60]">
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

      {/* Hidden Notes Template for PDF Generation */}
      <div style={{ display: 'none' }}>
        <div ref={notesRef} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#1f2937' }}>
          <h1 style={{ color: '#0d9488', borderBottom: '2px solid #0d9488', paddingBottom: '10px' }}>{lesson.title} - Notes</h1>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>LinguaLearn Lesson Summary</p>

          {vocabularies.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#0f766e', marginBottom: '15px' }}>Vocabulary</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Word / Phrase</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Pronunciation</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Meaning</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Example</th>
                  </tr>
                </thead>
                <tbody>
                  {vocabularies.map((v, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}>{v.nativeWord || v.word || v.phrase || v.englishMeaning}</td>
                      <td style={{ padding: '10px', fontStyle: 'italic', color: '#4b5563' }}>{v.pronunciation || ''}</td>
                      <td style={{ padding: '10px' }}>{v.englishMeaning || v.translation || v.nativeWord}</td>
                      <td style={{ padding: '10px', fontSize: '13px', color: '#374151' }}>{v.example || v.exampleSentence || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {dialogueLines.length > 0 && (
            <div>
              <h2 style={{ color: '#0f766e', marginBottom: '15px' }}>Sentences & Dialogue</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Phrase</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Pronunciation</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Translation</th>
                  </tr>
                </thead>
                <tbody>
                  {dialogueLines.map((line, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}>{line.text}</td>
                      <td style={{ padding: '10px', fontStyle: 'italic', color: '#4b5563' }}>{line.pronunciation || ''}</td>
                      <td style={{ padding: '10px' }}>{line.translation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {(vocabularies.length === 0 && dialogueLines.length === 0) && (
            <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>No vocabulary or dialogue to display for this lesson.</p>
          )}
        </div>
      </div>

    </div>
  );
}
