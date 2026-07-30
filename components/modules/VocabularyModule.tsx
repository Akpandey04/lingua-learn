'use client';
import { useState } from 'react';
import type { ModuleProps } from '@/lib/registry';
import type { VocabularyModule as VocabModuleType } from '@/types/domain';
import { eventBus } from '@/lib/event-bus';
import PlayAudioActivity from '../activities/PlayAudioActivity';
import SpeechActivity from '../activities/SpeechActivity';
import QuestionActivity from '../activities/QuestionActivity';
import { useAudioSettings } from '@/hooks/useAudioSettings';

type JourneyStep = 'teach' | 'listen' | 'speak' | 'practice';
type VocabularyFlow = 'default' | 'teach_all';

export default function VocabularyModule({ module, onComplete }: ModuleProps<VocabModuleType>) {
  const { words } = module.config;
  const flow = ((module.config as typeof module.config & { flow?: VocabularyFlow }).flow || 'default');
  const [wordIndex, setWordIndex] = useState(0);
  const [step, setStep] = useState<JourneyStep>('teach');
  const [showRepeat, setShowRepeat] = useState(false);
  const { autoPlayVocabulary } = useAudioSettings();

  const currentWord = words[wordIndex];

  const handleStepComplete = () => {
    if (step === 'teach') setStep('listen');
    else if (step === 'listen') setStep('speak');
    else if (step === 'speak') setStep('practice');
    else if (step === 'practice') {
      eventBus.emit('ActivityCompleted', {
        activityId: `vocab-${currentWord.conceptId}`,
        moduleId: module.id,
        correct: true,
        timeSpentMs: 0,
      });

      if (wordIndex + 1 >= words.length) {
        eventBus.emit('ModuleCompleted', { moduleId: module.id });
        onComplete();
      } else {
        setWordIndex(i => i + 1);
        setStep('teach');
      }
    }
  };

  if (!currentWord) return null;

  const difficultyStars = currentWord.difficultyRating 
    ? '⭐'.repeat(currentWord.difficultyRating) + '☆'.repeat(5 - currentWord.difficultyRating)
    : '⭐☆☆☆☆';

  const handleTeachAllNext = () => {
    eventBus.emit('ActivityCompleted', {
      activityId: `learn-${currentWord.conceptId}`,
      moduleId: module.id,
      conceptId: currentWord.conceptId,
      correct: true,
      skill: 'vocabulary',
      context: 'learn_all_vocabulary',
      timeSpentMs: 0,
    });

    setShowRepeat(false);

    if (wordIndex + 1 >= words.length) {
      eventBus.emit('ModuleCompleted', { moduleId: module.id });
      onComplete();
    } else {
      setWordIndex(i => i + 1);
    }
  };

  if (flow === 'teach_all') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 max-w-2xl mx-auto w-full">
        <div className="w-full mb-5 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span>Learn all vocabulary</span>
          <span>Word {wordIndex + 1} of {words.length}</span>
        </div>

        <div className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col relative animate-fade-in">
          <div className="flex-1 flex flex-col p-8 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl mb-4">{currentWord.emoji}</div>
              <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
                {currentWord.nativeWord}
              </h2>
              <div className="flex flex-wrap justify-center gap-3 text-base">
                {currentWord.ipa && (
                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-mono">
                    {currentWord.ipa}
                  </span>
                )}
                {currentWord.pronunciation && (
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-bold">
                    {currentWord.pronunciation}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Meaning</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{currentWord.englishMeaning}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Easy pronunciation</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-300">{currentWord.pronunciation || currentWord.nativeWord}</p>
              </div>
            </div>

            {currentWord.exampleSentence && (
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Example</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{currentWord.exampleSentence}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{currentWord.exampleTranslation}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(currentWord.contextualUsage?.whenToUse?.length ?? 0) > 0 && (
                <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40">
                  <p className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wider mb-2">When to use</p>
                  <ul className="space-y-1 text-gray-800 dark:text-gray-200">
                    {currentWord.contextualUsage?.whenToUse?.map((item, i) => (
                      <li key={`teach-use-${currentWord.conceptId}-${i}`}>+ {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(currentWord.contextualUsage?.doNotUse?.length ?? 0) > 0 && (
                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40">
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider mb-2">Do not use</p>
                  <ul className="space-y-1 text-gray-800 dark:text-gray-200">
                    {currentWord.contextualUsage?.doNotUse?.map((item, i) => (
                      <li key={`teach-avoid-${currentWord.conceptId}-${i}`}>- {item}</li>
                    ))}
                  </ul>
                  {currentWord.contextualUsage?.insteadSay && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Instead use <span className="font-bold text-blue-600 dark:text-blue-300">{currentWord.contextualUsage.insteadSay}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {currentWord.memoryTip && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                <p className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">Memory tip</p>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{currentWord.memoryTip}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 w-full flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex flex-col items-center gap-2">
              <PlayAudioActivity textToSpeak={currentWord.nativeWord} />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Listen Again</span>
            </div>
            <button
              onClick={() => setShowRepeat(value => !value)}
              className="px-6 py-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 font-bold border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              Repeat After Me
            </button>
          </div>

          {showRepeat && (
            <div className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700">
              <SpeechActivity expectedText={currentWord.nativeWord} onSuccess={() => setShowRepeat(false)} />
            </div>
          )}

          <button
            onClick={handleTeachAllNext}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-colors"
          >
            {wordIndex + 1 >= words.length ? 'Start Listening Practice' : 'Next Word'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 max-w-lg mx-auto w-full">
      {/* Journey Step Progress */}
      <div className="w-full mb-6 max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 flex justify-between items-center text-sm font-bold text-gray-400">
        <div className={`flex flex-col items-center gap-1 transition-colors ${step === 'teach' || step === 'listen' || step === 'speak' || step === 'practice' ? 'text-blue-500' : ''}`}>
          <span className="text-xl">📖</span>
          <span className="text-[10px] uppercase tracking-wider">Teach</span>
        </div>
        <div className={`h-0.5 flex-1 mx-2 ${step === 'listen' || step === 'speak' || step === 'practice' ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
        <div className={`flex flex-col items-center gap-1 transition-colors ${step === 'listen' || step === 'speak' || step === 'practice' ? 'text-blue-500' : ''}`}>
          <span className="text-xl">🔊</span>
          <span className="text-[10px] uppercase tracking-wider">Listen</span>
        </div>
        <div className={`h-0.5 flex-1 mx-2 ${step === 'speak' || step === 'practice' ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
        <div className={`flex flex-col items-center gap-1 transition-colors ${step === 'speak' || step === 'practice' ? 'text-blue-500' : ''}`}>
          <span className="text-xl">🎤</span>
          <span className="text-[10px] uppercase tracking-wider">Speak</span>
        </div>
        <div className={`h-0.5 flex-1 mx-2 ${step === 'practice' ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
        <div className={`flex flex-col items-center gap-1 transition-colors ${step === 'practice' ? 'text-blue-500' : ''}`}>
          <span className="text-xl">✅</span>
          <span className="text-[10px] uppercase tracking-wider">Practice</span>
        </div>
      </div>

      {/* Main Flashcard Card */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col relative animate-fade-in">
        
        {/* Difficulty Badge */}
        <div className="flex justify-between items-center px-8 pt-6 text-xs font-bold text-gray-400">
          <span>Concept {wordIndex + 1} of {words.length}</span>
          <span title={`Difficulty: ${currentWord.difficultyRating || 1}/5`}>{difficultyStars}</span>
        </div>

        <div className="flex-1 flex flex-col p-8 gap-6 pt-4">
          
          {/* Word Section */}
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-4">{currentWord.emoji}</div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              {currentWord.nativeWord}
            </h2>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-gray-400 font-mono">/ {currentWord.ipa || '...'} /</span>
              {currentWord.pronunciation && (
                <span className="text-blue-500 font-medium">{currentWord.pronunciation}</span>
              )}
            </div>
          </div>

          {/* Meaning Section */}
          <div className="flex flex-col items-center text-center py-4 border-t border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Meaning</p>
            <p className="text-2xl font-medium text-gray-800 dark:text-gray-200">
              {currentWord.englishMeaning}
            </p>
          </div>

          {/* Example Section */}
          {currentWord.exampleSentence && (
            <div className="flex flex-col text-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Example</p>
              <p className="italic text-gray-800 dark:text-gray-200 text-lg">"{currentWord.exampleSentence}"</p>
              <p className="text-gray-500 text-sm mt-1">{currentWord.exampleTranslation}</p>
            </div>
          )}

          {/* Contextual Usage Section ("Where is this used?") */}
          {currentWord.contextualUsage && (
            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-left">
              <p className="font-bold text-blue-700 dark:text-blue-300 text-xs uppercase tracking-wider">📍 Where is this used?</p>
              
              {(currentWord.contextualUsage.whenToUse?.length ?? 0) > 0 && (
                <div className="flex flex-col gap-1 text-sm">
                  <span className="font-bold text-green-600 dark:text-green-400">✔ When to use:</span>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-2">
                    {currentWord.contextualUsage.whenToUse.map((item, i) => (
                      <li key={`use-${i}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(currentWord.contextualUsage.doNotUse?.length ?? 0) > 0 && (
                <div className="flex flex-col gap-1 text-sm mt-1">
                  <span className="font-bold text-red-500 dark:text-red-400">❌ Do NOT use:</span>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-2">
                    {currentWord.contextualUsage?.doNotUse?.map((item, i) => (
                      <li key={`avoid-${i}`}>{item}</li>
                    ))}
                  </ul>
                  {currentWord.contextualUsage.insteadSay && (
                    <p className="text-xs text-gray-500 italic mt-1 pl-2">💡 Instead say: <span className="font-bold text-blue-600 dark:text-blue-400">{currentWord.contextualUsage.insteadSay}</span></p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Common Mistake Section */}
          {currentWord.commonMistake && (
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 text-sm">
              <p className="font-bold text-orange-700 dark:text-orange-400 text-xs uppercase tracking-wider">⚠️ Common Mistake</p>
              <div className="flex items-center gap-4">
                <span className="text-red-500 line-through">❌ {currentWord.commonMistake.wrong}</span>
                <span className="text-green-600 font-bold">✅ {currentWord.commonMistake.correct}</span>
              </div>
            </div>
          )}

          {/* Deep Learning Insights Section */}
          {(currentWord.usageNote || currentWord.formality || currentWord.memoryTip) && (
            <div className="flex flex-col gap-3 py-4 border-b border-gray-100 dark:border-gray-700 text-left bg-gray-50 dark:bg-gray-800/50 -mx-8 px-8">
              {currentWord.formality && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-gray-400 uppercase tracking-wider w-24">Formality</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${currentWord.formality === 'informal' ? 'bg-orange-100 text-orange-600' : currentWord.formality === 'formal' ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'}`}>
                    {currentWord.formality}
                  </span>
                </div>
              )}
              {currentWord.usageNote && (
                <div className="flex gap-2 text-sm items-start">
                  <span className="font-bold text-gray-400 uppercase tracking-wider w-24 shrink-0">Usage</span>
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{currentWord.usageNote}</span>
                </div>
              )}
              {currentWord.memoryTip && (
                <div className="flex gap-2 text-sm items-start">
                  <span className="font-bold text-gray-400 uppercase tracking-wider w-24 shrink-0 mt-0.5">Tip 💡</span>
                  <span className="text-gray-700 dark:text-gray-300 italic leading-relaxed">{currentWord.memoryTip}</span>
                </div>
              )}
            </div>
          )}

          {/* Persistent Audio & Action Buttons */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-center">
              <PlayAudioActivity 
                textToSpeak={currentWord.nativeWord} 
                autoPlay={autoPlayVocabulary && step === 'listen'}
                onComplete={() => autoPlayVocabulary && step === 'listen' && setTimeout(handleStepComplete, 1500)}
              />
            </div>

            {step === 'teach' && (
              <button 
                onClick={handleStepComplete} 
                autoFocus 
                aria-label="Continue to listening step"
                className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors shadow-lg shadow-blue-500/30"
              >
                ▶ Listen & Repeat
              </button>
            )}

            {step === 'listen' && (
              <div className="flex gap-3">
                <button onClick={handleStepComplete} className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200 transition-colors">Skip</button>
                <button onClick={handleStepComplete} className="flex-1 py-4 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">Continue to Speaking</button>
              </div>
            )}

            {step === 'speak' && (
              <div className="flex flex-col items-center gap-6 animate-fade-in w-full">
                <SpeechActivity 
                  expectedText={currentWord.nativeWord}
                  onSuccess={handleStepComplete}
                  onFail={() => {}}
                  onSkip={handleStepComplete}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {step === 'practice' && (
        <div className="w-full mt-6 animate-fade-in">
          <QuestionActivity 
            payload={{
              type: 'mcq',
              question: `Tap the word for "${currentWord.englishMeaning}"`,
              answer: currentWord.nativeWord,
              options: [currentWord.nativeWord, "Bonjour", "Merci"].sort(() => 0.5 - Math.random())
            }}
            onSuccess={handleStepComplete}
          />
        </div>
      )}
    </div>
  );
}
