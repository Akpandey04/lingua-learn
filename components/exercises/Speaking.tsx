'use client';
import { useState } from 'react';
import type { SpeakingExercise } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface Props {
  exercise: SpeakingExercise;
  locale: string;
  onCorrect: (xp: number) => void;
  onWrong: () => void;
  onNext: () => void;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?¿¡、。？！]/g, '');
}

export default function Speaking({ exercise, locale, onCorrect, onWrong, onNext }: Props) {
  const [transcript, setTranscript] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [notSupported, setNotSupported] = useState(false);
  const { speak } = useSpeech();

  const { listening, startListening, error: speechError } = useSpeechRecognition({
    locale,
    onResult: (text) => {
      setTranscript(text);
    },
    onNotSupported: () => setNotSupported(true),
  });

  const isCorrect = normalize(transcript) === normalize(exercise.expectedPhrase);

  const handleListen = () => {
    setTranscript('');
    startListening();
  };

  const handlePlayExample = () => {
    speak(exercise.expectedPhrase, locale);
  };

  const handleSubmit = () => {
    if (!transcript || submitted) return;
    setSubmitted(true);
    if (isCorrect) {
      onCorrect(10);
    } else {
      onWrong();
    }
  };

  if (notSupported) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <p className="text-2xl font-bold text-gray-800 dark:text-white">Speaking Exercise</p>
        <div className="p-6 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-700 dark:text-yellow-300 font-medium">
            🎤 Speech recognition is not supported in your browser.
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
            Try Chrome or Edge for the best experience. We&apos;ll skip this exercise.
          </p>
        </div>
        <button
          onClick={onNext}
          className="py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-bold transition"
        >
          Skip →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{exercise.prompt}</p>

      {/* Target phrase to say */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">Say this:</p>
        <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{exercise.expectedPhrase}</p>
        {exercise.hint && (
          <p className="text-sm text-blue-500 dark:text-blue-400 mt-1 italic">({exercise.hint})</p>
        )}
      </div>

      {/* Play example */}
      <button
        onClick={handlePlayExample}
        className="flex items-center gap-2 self-start text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        🔊 <span>Hear pronunciation</span>
      </button>

      {/* Record button */}
      <div className="flex flex-col items-center gap-4 mt-4">
        {speechError && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm max-w-sm text-center border border-red-100 dark:border-red-900/50">
            <p className="font-bold mb-1">Microphone Error</p>
            <p>{speechError}</p>
          </div>
        )}
        
        <button
          onClick={handleListen}
          disabled={listening || submitted}
          aria-label="Start speaking"
          className={`w-28 h-28 rounded-full text-5xl flex items-center justify-center shadow-lg transition-all duration-200 focus-visible:ring-4 focus-visible:ring-red-400 focus-visible:outline-none
            ${listening
              ? 'bg-red-400 dark:bg-red-700 scale-95 animate-pulse'
              : 'bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 hover:scale-105'
            }`}
        >
          🎤
        </button>
      </div>
      <p className="text-center text-sm text-gray-400 dark:text-gray-500">
        {listening ? 'Listening… speak now' : 'Tap to speak'}
      </p>

      {/* Transcript */}
      {transcript && (
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">You said:</p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">&ldquo;{transcript}&rdquo;</p>
        </div>
      )}

      {/* Feedback */}
      {submitted && (
        <div
          className={`p-4 rounded-xl font-semibold text-center ${
            isCorrect
              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
          }`}
        >
          {isCorrect ? '✅ Great pronunciation! +10 XP' : `❌ Close! Expected: "${exercise.expectedPhrase}"`}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!transcript}
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold transition"
          >
            Check
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition"
          >
            Continue →
          </button>
        )}
      </div>
    </div>
  );
}
