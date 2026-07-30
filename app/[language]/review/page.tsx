'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LessonEngine from '@/components/engine/LessonEngine';
import { generateDailyReviewQueue } from '@/lib/srs/reviewQueue';
import { ReviewLesson, ReviewOutcome } from '@/types/srs';
import { reviewService } from '@/lib/srs/reviewService';
import { eventBus } from '@/lib/event-bus';

export default function ReviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const language = (params?.language as string) || 'french';

  const [lesson, setLesson] = useState<ReviewLesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We execute queue generation strictly on the client side since it relies on localStorage
    const queue = generateDailyReviewQueue(language);
    if (!queue) {
      // Nothing to review, bounce back to dashboard
      router.push(`/${language}`);
      return;
    }
    setLesson(queue);
    setLoading(false);
  }, [language, router]);

  useEffect(() => {
    const handleLessonCompleted = (payload: { lessonId: string }) => {
      if (payload.lessonId === lesson?.id) {
        if (lesson?.metadata?.reviewItemIds) {
          for (const id of lesson.metadata.reviewItemIds) {
            reviewService.updateItem(id, ReviewOutcome.Good);
          }
        }
      }
    };
    
    // @ts-ignore - Temporary bypass if eventBus doesn't have exact strict typing for this listener yet
    eventBus.on('LessonCompleted', handleLessonCompleted);
    // @ts-ignore
    return () => eventBus.off('LessonCompleted', handleLessonCompleted);
  }, [lesson]);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading review session...</div>;
  }

  if (!lesson) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 
        The LessonEngine receives the memory-generated ReviewLesson completely blind.
        It has no idea it is running a review.
      */}
      <LessonEngine lesson={lesson} />
    </div>
  );
}
