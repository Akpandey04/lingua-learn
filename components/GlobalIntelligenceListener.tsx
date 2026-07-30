'use client';
import { useEffect } from 'react';
import { eventBus, AppEvents } from '@/lib/event-bus';
import { intelligenceEngine } from '@/lib/intelligence-engine';

export default function GlobalIntelligenceListener() {
  useEffect(() => {
    const handleCompleted = (data: AppEvents['ActivityCompleted']) => {
      if (data.conceptId) {
        intelligenceEngine.logEvent({
          conceptId: data.conceptId,
          isCorrect: data.correct ?? true,
          skill: data.skill || 'vocabulary',
          responseTimeMs: data.timeSpentMs || 1500,
          confidence: data.confidence,
          context: data.context || 'activity'
        });
      }
    };

    const handleFailed = (data: AppEvents['ActivityFailed']) => {
      intelligenceEngine.logMistake({
        conceptId: data.conceptId,
        expected: data.expected,
        actual: data.actual,
        mistakeType: data.mistakeType,
        reason: data.explanation || data.reason,
        lessonId: data.lessonId
      });
      // We also log an event for the mastery penalty
      intelligenceEngine.logEvent({
        conceptId: data.conceptId,
        isCorrect: false,
        skill: 'vocabulary', // fallback
        responseTimeMs: 2000,
        context: 'activity_fail'
      });
    };

    eventBus.on('ActivityCompleted', handleCompleted);
    eventBus.on('ActivityFailed', handleFailed);
    
    return () => {
      eventBus.off('ActivityCompleted', handleCompleted);
      eventBus.off('ActivityFailed', handleFailed);
    };
  }, []);

  return null;
}
