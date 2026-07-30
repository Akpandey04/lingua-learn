'use client';
import { useState, useEffect } from 'react';
import { useAudioSettings } from '@/hooks/useAudioSettings';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: string; // e.g. 'fr' or 'en'
}

export default function AudioSettingsModal({ isOpen, onClose, language }: Props) {
  const {
    playbackRate,
    preferredVoiceURI,
    autoPlayVocabulary,
    autoPlayDialogue,
    setPlaybackRate,
    setPreferredVoiceURI,
    setAutoPlayVocabulary,
    setAutoPlayDialogue,
    resetSettings
  } = useAudioSettings();

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Filter by language prefix (e.g., 'fr-FR', 'fr-CA' match 'fr')
      const filtered = voices.filter(v => v.lang.toLowerCase().startsWith(language.toLowerCase()));
      setAvailableVoices(filtered);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [language]);

  if (!isOpen) return null;

  const handleTestSpecificVoice = (voiceURI: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const testText = language === 'fr' 
      ? "Bonjour ! Je m'appelle Marie. Enchantée !" 
      : "Hello! My name is Marie. Nice to meet you!";
    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = playbackRate;

    if (voiceURI !== 'default') {
      const voice = availableVoices.find(v => v.voiceURI === voiceURI);
      if (voice) utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleSelectVoice = (uri: string) => {
    setPreferredVoiceURI(language, uri);
    handleTestSpecificVoice(uri);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🔊</span> Audio Settings
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-800 dark:text-gray-200">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* Playback Speed */}
          <section className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-xs">Playback Speed</h3>
            <div className="flex flex-col gap-2 text-gray-800 dark:text-gray-200">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <input type="radio" name="speed" checked={playbackRate === 0.75} onChange={() => setPlaybackRate(0.75)} className="w-5 h-5 text-blue-500" />
                <span>🐢 Slow (Recommended)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <input type="radio" name="speed" checked={playbackRate === 1.0} onChange={() => setPlaybackRate(1.0)} className="w-5 h-5 text-blue-500" />
                <span>▶ Normal</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <input type="radio" name="speed" checked={playbackRate === 1.25} onChange={() => setPlaybackRate(1.25)} className="w-5 h-5 text-blue-500" />
                <span>⚡ Fast</span>
              </label>
            </div>
          </section>

          {/* Voice Selection */}
          <section className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-xs">Voice Style</h3>
            <div className="flex flex-col gap-2 text-gray-800 dark:text-gray-200">
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <label className="flex items-center gap-3 cursor-pointer flex-1">
                  <input type="radio" name="voice" checked={!preferredVoiceURI[language] || preferredVoiceURI[language] === 'default'} onChange={() => setPreferredVoiceURI(language, 'default')} className="w-5 h-5 text-blue-500" />
                  <span>Default System Voice</span>
                </label>
                <button 
                  onClick={() => handleTestSpecificVoice('default')} 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-bold transition-colors"
                >
                  ▶ Preview
                </button>
              </div>

              {availableVoices.map(voice => (
                <div key={voice.voiceURI} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input type="radio" name="voice" checked={preferredVoiceURI[language] === voice.voiceURI} onChange={() => handleSelectVoice(voice.voiceURI)} className="w-5 h-5 text-blue-500" />
                    <span className="truncate max-w-[200px]">{voice.name}</span>
                  </label>
                  <button 
                    onClick={() => handleTestSpecificVoice(voice.voiceURI)} 
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-bold transition-colors"
                  >
                    ▶ Preview
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Auto Play */}
          <section className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-xs">Auto Play</h3>
            <div className="text-gray-800 dark:text-gray-200 flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <input type="checkbox" checked={autoPlayVocabulary} onChange={(e) => setAutoPlayVocabulary(e.target.checked)} className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500" />
                <span>Vocabulary Flashcards</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <input type="checkbox" checked={autoPlayDialogue} onChange={(e) => setAutoPlayDialogue(e.target.checked)} className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500" />
                <span>Dialogues</span>
              </label>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
