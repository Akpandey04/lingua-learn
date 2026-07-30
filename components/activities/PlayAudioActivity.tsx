'use client';
import { useState, useEffect } from 'react';
import { useAudioSettings } from '@/hooks/useAudioSettings';

interface Props {
  textToSpeak: string;
  lang?: string;
  autoPlay?: boolean;
  onComplete?: () => void;
  className?: string;
}

export default function PlayAudioActivity({ 
  textToSpeak, 
  lang = 'fr-FR', 
  autoPlay = false,
  onComplete,
  className = ''
}: Props) {
  const { playbackRate, preferredVoiceURI } = useAudioSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hasError, setHasError] = useState(false);

  const play = () => {
    if (typeof window === 'undefined') return;
    if (!window.speechSynthesis) {
      setHasError(true);
      if (onComplete) setTimeout(onComplete, 500); // fail gracefully
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang;
    utterance.rate = playbackRate;

    const baseLang = lang.substring(0, 2).toLowerCase();
    const savedURI = preferredVoiceURI[baseLang];
    
    if (savedURI && savedURI !== 'default') {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.voiceURI === savedURI);
      if (voice) utterance.voice = voice;
    }
    
    utterance.onstart = () => setIsPlaying(true);
    
    utterance.onend = () => {
      setIsPlaying(false);
      setHasPlayed(true);
      if (onComplete) onComplete();
    };
    
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error/interrupted', e);
      setIsPlaying(false);
      // Only set error if it wasn't manually canceled by a new utterance
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        setHasError(true);
      }
      if (onComplete) onComplete();
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (autoPlay && !hasPlayed) {
      // Small timeout to ensure component is fully mounted/interactions allowed
      const t = setTimeout(play, 300);
      return () => clearTimeout(t);
    }
  }, [autoPlay, textToSpeak]);

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-full ${className}`}
        style={{ width: 64, height: 64 }}
        title="Audio unavailable in this browser"
      >
        <span className="text-2xl opacity-50 text-current">🔇</span>
      </div>
    );
  }

  return (
    <button 
      onClick={play}
      disabled={isPlaying}
      className={`relative group overflow-hidden rounded-full transition-all flex items-center justify-center ${isPlaying ? 'bg-blue-100 scale-95' : 'bg-blue-50 hover:bg-blue-100'} ${className}`}
      style={{ width: 64, height: 64 }}
      aria-label="Play Audio"
    >
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-50" />
      )}
      <span className="text-3xl text-blue-600 z-10">🔊</span>
    </button>
  );
}
