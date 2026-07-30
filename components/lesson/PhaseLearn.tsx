'use client';
import { useState } from 'react';
import type { Lesson, Language } from '@/types';
import FlashCard from './FlashCard';

interface Props {
  lesson: Lesson;
  language: Language;
  onComplete: () => void;
}

export default function PhaseLearn({ lesson, language, onComplete }: Props) {
  const [cardIndex, setCardIndex] = useState(0);
  const cards = lesson.vocabulary;

  const handleNext = () => {
    if (cardIndex + 1 >= cards.length) {
      onComplete();
    } else {
      setCardIndex((i) => i + 1);
    }
  };

  return (
    <FlashCard
      key={cardIndex}
      card={cards[cardIndex]}
      language={language}
      index={cardIndex}
      total={cards.length}
      onNext={handleNext}
      onPrev={() => setCardIndex((i) => Math.max(0, i - 1))}
    />
  );
}
