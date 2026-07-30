'use client';
import type { Exercise } from '@/types';
import MCQ from './MCQ';
import Translate from './Translate';
import Match from './Match';
import FillBlank from './FillBlank';
import Listening from './Listening';
import Speaking from './Speaking';

interface Props {
  exercise: Exercise;
  locale: string;
  showHints?: boolean;
  isQuiz?: boolean;
  onCorrect: (xp: number) => void;
  onWrong: () => void;
  onNext: () => void;
}

export default function ExerciseRenderer({ exercise, locale, onCorrect, onWrong, onNext }: Props) {
  const commonProps = { locale, onCorrect, onWrong, onNext };

  switch (exercise.type) {
    case 'mcq':
      return <MCQ exercise={exercise} {...commonProps} />;
    case 'translate':
      return <Translate exercise={exercise} {...commonProps} />;
    case 'match':
      return <Match exercise={exercise} {...commonProps} />;
    case 'fill':
      return <FillBlank exercise={exercise} {...commonProps} />;
    case 'listening':
      return <Listening exercise={exercise} {...commonProps} />;
    case 'speaking':
      return <Speaking exercise={exercise} {...commonProps} />;
    default:
      return null;
  }
}
