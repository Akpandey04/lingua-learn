'use client';
import { useState, useCallback } from 'react';

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback((text: string, locale: string) => {
    setError(null);
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setError('Speech synthesis is not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();

    // Check if matching voice exists (optional but good practice)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const hasVoice = voices.some(v => v.lang.startsWith(locale.split('-')[0]));
      if (!hasVoice) {
        // We still try to speak, but log a warning/error that the accent might be wrong or it might fail
        console.warn(`No exact voice found for ${locale}, falling back to default.`);
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;
    utterance.rate = 0.9;
    
    utterance.onstart = () => {
      setSpeaking(true);
      setError(null);
    };
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      setSpeaking(false);
      if (event.error !== 'canceled') {
        setError(`Speech playback failed: ${event.error}`);
      }
    };
    
    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  return { speak, cancel, speaking, error };
}
