'use client';
import { useEffect } from 'react';
import { eventBus } from '@/lib/event-bus';
import { progressService } from '@/lib/progressService';
import { useProgressStore } from '@/lib/store';

export default function GlobalProgressListener() {
  useEffect(() => {
    const handleLessonCompleted = (data: { lessonId: string }) => {
      if (data.lessonId) {
        progressService.saveLesson({
          lessonId: data.lessonId,
          completed: true,
          dateCompleted: new Date().toISOString(),
          attempts: 1,
          wordMastery: [],
        });
        
        const store = useProgressStore.getState();
        store.updateStreak();
        store.refreshProgress();
      }
    };

    eventBus.on('LessonCompleted', handleLessonCompleted as any);
    
    return () => {
      eventBus.off('LessonCompleted', handleLessonCompleted as any);
    };
  }, []);

  return null;
}
