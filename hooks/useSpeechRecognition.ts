'use client';
import { useState, useCallback, useRef } from 'react';

// Web Speech API type declarations (not yet in all TS lib versions)
type ISpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: any) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
};

type ISpeechRecognitionCtor = new () => ISpeechRecognition;

type SpeechRecognitionEvent = {
  results: { [index: number]: { [index: number]: { transcript: string } } };
};

interface Options {
  locale: string;
  onResult: (transcript: string) => void;
  onNotSupported?: () => void;
}

export function useSpeechRecognition({ locale, onResult, onNotSupported }: Options) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<ISpeechRecognition | null>(null);

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;
    const win = window as Window & {
      SpeechRecognition?: ISpeechRecognitionCtor;
      webkitSpeechRecognition?: ISpeechRecognitionCtor;
    };
    const SR: ISpeechRecognitionCtor | undefined = win.SpeechRecognition ?? win.webkitSpeechRecognition;

    if (!SR) {
      onNotSupported?.();
      return;
    }

    if (recRef.current) {
      recRef.current.abort();
    }

    const rec = new SR();
    recRef.current = rec;
    rec.lang = locale;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setListening(true);
      setError(null);
    };
    rec.onend = () => setListening(false);
    rec.onerror = (event: any) => {
      setListening(false);
      let errorMessage = 'An unknown speech error occurred.';
      if (event.error === 'not-allowed') {
        errorMessage = 'Microphone access is denied. Please check your browser permissions.';
      } else if (event.error === 'no-speech') {
        errorMessage = 'No speech was detected. Please try speaking closer to the microphone.';
      } else if (event.error === 'network') {
        errorMessage = 'Network error. Speech recognition requires an active internet connection.';
      } else if (event.error === 'language-not-supported') {
        errorMessage = `The language '${locale}' is not supported by your browser's speech recognition.`;
      }
      setError(errorMessage);
    };
    
    rec.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0]?.[0]?.transcript ?? '';
      onResult(result);
    };

    try {
      rec.start();
    } catch (e) {
      console.warn('Speech recognition failed to start', e);
      setError('Speech recognition failed to start.');
    }
  }, [locale, onResult, onNotSupported]);

  const stopListening = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  return { listening, startListening, stopListening, error };
}
