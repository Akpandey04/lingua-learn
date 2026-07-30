'use client';
import { useState, useEffect } from 'react';
import type { ModuleProps } from '@/lib/registry';
import type { DialogueModule as DialogueModuleType } from '@/types/domain';
import { eventBus } from '@/lib/event-bus';
import PlayAudioActivity from '../activities/PlayAudioActivity';
import SpeechActivity from '../activities/SpeechActivity';
import { useAudioSettings } from '@/hooks/useAudioSettings';
import { isAnswerMatch } from '@/lib/utils';

export default function DialogueModule({ module, onComplete }: ModuleProps<DialogueModuleType>) {
  const { title, lines } = module.config;
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const { autoPlayDialogue } = useAudioSettings();
  const [showTranslation, setShowTranslation] = useState(false);
  const [npcReaction, setNpcReaction] = useState<string | null>(null);

  // User input states: Speak, Type, or Choose
  const [inputMode, setInputMode] = useState<'speak' | 'type' | 'choose'>('type');
  const [typedText, setTypedText] = useState('');
  const [showError, setShowError] = useState(false);

  const currentLine = lines[currentLineIndex];
  const isUserTurn = currentLine?.speaker === 'You';

  useEffect(() => {
    setShowTranslation(false);
    setNpcReaction(null);
    const t = setTimeout(() => {
      setShowTranslation(true);
    }, 2000); 
    return () => clearTimeout(t);
  }, [currentLineIndex]);

  useEffect(() => {
    if (isUserTurn) {
      setInputMode(currentLine?.options?.length ? 'choose' : 'type');
      setTypedText('');
      setShowError(false);
    }
  }, [currentLineIndex, isUserTurn, currentLine?.options?.length]);

  const handleNext = () => {
    if (currentLineIndex + 1 >= lines.length) {
      eventBus.emit('ModuleCompleted', { moduleId: module.id });
      onComplete();
    } else {
      setCurrentLineIndex(i => i + 1);
    }
  };

  const [nativeInsight, setNativeInsight] = useState<string | null>(null);

  const handleUserSuccess = (reactionEmoji = '😊') => {
    const reactions = [`${reactionEmoji} Très bien !`, '👏 Bravo !', '✨ Parfait !'];
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    setNpcReaction(randomReaction);

    if (currentLine?.options && currentLine.options.length > 1) {
      const alt = currentLine.options.find(o => o !== currentLine.text);
      if (alt) {
        setNativeInsight(`💡 Native speakers also say: "${alt}"`);
      }
    }

    eventBus.emit('AudioFeedback', { type: 'correct' });
    setTimeout(() => {
      setNativeInsight(null);
      handleNext();
    }, 1800);
  };

  const handleTypeSubmit = () => {
    if (!typedText.trim()) return;
    
    if (isAnswerMatch(typedText, currentLine.text)) {
      handleUserSuccess('✍️');
    } else {
      setShowError(true);
      eventBus.emit('AudioFeedback', { type: 'wrong' });
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleChooseSelect = (optionText: string) => {
    if (isAnswerMatch(optionText, currentLine.text)) {
      handleUserSuccess('📋');
    } else {
      setShowError(true);
      eventBus.emit('AudioFeedback', { type: 'wrong' });
      setTimeout(() => setShowError(false), 2000);
    }
  };

  // Generate fallback options for MCQ choice if not provided
  const availableOptions = currentLine?.options || [
    currentLine?.text || '',
    'Au revoir.',
    'Non, merci.'
  ];
  const canChoose = Boolean(currentLine?.options?.length);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-500 mb-8 uppercase tracking-widest flex items-center gap-2">
        <span>💬</span> {title}
      </h2>

      <div className="w-full flex flex-col gap-6 pb-24">
        {lines.slice(0, currentLineIndex + 1).map((line, idx) => {
          const isCurrent = idx === currentLineIndex;
          const isLeft = line.speaker !== 'You';

          return (
            <div 
              key={line.id || `dialogue-line-${idx}`} 
              className={`flex w-full gap-4 ${isLeft ? 'justify-start' : 'justify-end'} animate-fade-in`}
              style={{ opacity: isCurrent ? 1 : 0.6 }}
            >
              {isLeft && (
                <div className="w-12 h-12 shrink-0 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl shadow">
                  {line.avatarUrl && line.avatarUrl !== 'undefined' ? <img src={line.avatarUrl} alt={line.speaker} className="rounded-full" /> : (line.emojiAvatar || '👩')}
                </div>
              )}
              
              <div className={`flex flex-col ${isLeft ? 'items-start' : 'items-end'} max-w-[85%]`}>
                <span className="text-xs font-bold text-gray-400 mb-1">{line.speaker}</span>
                <div className={`p-4 rounded-3xl ${isLeft ? 'bg-white dark:bg-gray-800 rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm text-gray-800 dark:text-white' : 'bg-blue-600 text-white rounded-tr-none shadow-md'} flex flex-col gap-4 w-full`}>
                  
                  {isCurrent && isUserTurn ? (
                    <div className="flex flex-col w-full gap-4">
                      {/* Input Mode Selector: Speak, Type, Choose */}
                      <div className="flex bg-blue-700/60 rounded-xl p-1 gap-1">
                        <button 
                          onClick={() => setInputMode('choose')} 
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${inputMode === 'choose' ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-blue-600/50'}`}
                        >
                          📋 Choose
                        </button>
                        <button 
                          onClick={() => setInputMode('type')} 
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${inputMode === 'type' ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-blue-600/50'}`}
                        >
                          ⌨ Type
                        </button>
                        <button 
                          onClick={() => setInputMode('speak')} 
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${inputMode === 'speak' ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-blue-600/50'}`}
                        >
                          🎤 Speak
                        </button>
                      </div>

                      {/* Choose Mode */}
                      {inputMode === 'choose' && (
                        <div className="flex flex-col gap-2 w-full mt-1">
                          {availableOptions.map((opt, oIdx) => (
                            <button
                              key={`dialogue-opt-${line.id}-${oIdx}`}
                              onClick={() => handleChooseSelect(opt)}
                              className="p-3 text-left rounded-xl bg-white text-blue-900 font-bold hover:bg-blue-50 transition-colors shadow-sm text-sm border border-blue-100"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Type Mode */}
                      {inputMode === 'type' && (
                        <div className="flex flex-col gap-2 w-full mt-1">
                          <input 
                            type="text" 
                            value={typedText}
                            onChange={(e) => setTypedText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleTypeSubmit()}
                            placeholder="Type your response..."
                            className="w-full p-3.5 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-inner text-sm"
                            autoFocus
                          />
                          <button 
                            onClick={handleTypeSubmit}
                            disabled={!typedText.trim()}
                            className="w-full py-3 bg-blue-800 hover:bg-blue-900 disabled:bg-blue-400 text-white rounded-xl font-bold transition-colors shadow text-sm"
                          >
                            Send Response
                          </button>
                        </div>
                      )}

                      {/* Speak Mode */}
                      {inputMode === 'speak' && (
                        <div className="flex flex-col items-center gap-2 mt-1 bg-white/10 rounded-xl p-4">
                          <p className="text-xs font-medium opacity-90 mb-1">Say: "{line.text}"</p>
                          <SpeechActivity 
                            expectedText={line.text} 
                            onSuccess={() => handleUserSuccess('🎤')} 
                          />
                        </div>
                      )}

                      {showError && (
                        <div className="text-red-200 text-center text-xs font-bold animate-pulse p-2 bg-red-900/40 rounded-lg">
                          Almost! Let's try once more.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 justify-between">
                      <p className="text-lg font-medium">{line.text}</p>
                      {isCurrent && (
                        <PlayAudioActivity 
                          textToSpeak={line.audioText || line.text} 
                          autoPlay={autoPlayDialogue}
                          className={`w-8 h-8 flex-shrink-0 !text-current ${isLeft ? '!bg-gray-100 hover:!bg-gray-200 dark:!bg-gray-700 dark:hover:!bg-gray-600' : '!bg-white/20 hover:!bg-white/40'}`}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Translation reveal */}
                {(!isCurrent || showTranslation) && (
                  <p className="text-xs mt-1.5 text-gray-500 dark:text-gray-400 italic animate-fade-in px-1">
                    {line.translation}
                  </p>
                )}
              </div>

              {!isLeft && (
                <div className="w-12 h-12 shrink-0 bg-blue-600 rounded-full flex items-center justify-center text-2xl shadow text-white">
                  👤
                </div>
              )}
            </div>
          );
        })}
      </div>

      {npcReaction && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl font-bold animate-bounce z-50 flex flex-col items-center gap-1 border border-green-400">
          <span>{npcReaction}</span>
          {nativeInsight && <span className="text-xs font-normal opacity-90">{nativeInsight}</span>}
        </div>
      )}

      {/* Floating Next Button for NPC turns */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent flex justify-center z-10 pointer-events-none">
        <div className="max-w-2xl w-full flex justify-end pointer-events-auto">
          {!isUserTurn && (
            <button 
              onClick={handleNext}
              autoFocus
              aria-label={currentLineIndex + 1 >= lines.length ? 'Finish dialogue' : 'Next dialogue line'}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 text-white font-bold rounded-2xl text-xl shadow-lg transition-transform active:scale-95 min-h-[44px] min-w-[44px]"
            >
              {currentLineIndex + 1 >= lines.length ? 'Finish Dialogue' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
