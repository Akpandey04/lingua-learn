'use client';
import { useEffect } from 'react';
import { eventBus } from '@/lib/event-bus';
import { playTone } from '@/lib/audio';

export default function GlobalAudioListener() {
  useEffect(() => {
    const handleAudio = (data: { type: 'correct' | 'wrong' | 'complete' | 'achievement' }) => {
      playTone(data.type);
    };

    eventBus.on('AudioFeedback', handleAudio);
    return () => eventBus.off('AudioFeedback', handleAudio);
  }, []);

  return null;
}
