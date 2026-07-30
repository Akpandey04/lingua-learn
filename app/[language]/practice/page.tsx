import { notFound } from 'next/navigation';
import { LANGUAGES } from '@/lib/languages';
import type { LanguageCode } from '@/types';
import LessonEngine from '@/components/engine/LessonEngine';

interface Props {
  params: Promise<{ language: string }>;
}

export default async function PracticePage({ params }: Props) {
  const { language } = await params;
  const lang = LANGUAGES[language as LanguageCode];
  if (!lang) notFound();

  // In a real app, this would dynamically fetch weak concepts from the server/MasteryEngine
  // For MVP, since intelligenceEngine runs client-side (in memory), we will just 
  // build a dynamic wrapper here or mock the practice lesson.
  // Actually, to make it client-side adaptive, we could have a `ClientAdaptivePractice` wrapper.

  // But for demonstration, we will just mock a dynamic practice JSON here.
  const practiceLesson = {
    id: 'practice-01',
    title: 'Adaptive Practice',
    description: 'Dynamic mix of weak and due concepts.',
    learningObjectives: ['greeting_hello', 'politeness_thanks'],
    modules: [
      {
        id: 'p-1',
        type: 'knowledge_card',
        config: {
          title: 'Quick Review',
          conceptId: 'greeting_hello',
          explanation: 'Remember, Bonjour is used during the day!',
          emoji: '💡'
        }
      },
      {
        id: 'p-2',
        type: 'vocabulary',
        config: {
          title: 'Vocabulary Practice',
          words: [
            { id: 'w-1', conceptId: 'greeting_hello', native: 'Bonjour', translation: 'Hello / Good morning', ipa: '/bɔ̃.ʒuʁ/' },
            { id: 'w-2', conceptId: 'politeness_thanks', native: 'Merci', translation: 'Thank you', ipa: '/mɛʁ.si/' }
          ]
        }
      },
      {
        id: 'p-3',
        type: 'quiz',
        config: {
          title: 'Knowledge Check',
          questions: [
            {
              id: 'q-1',
              conceptId: 'greeting_hello',
              type: 'mcq',
              prompt: 'How do you say "Hello"?',
              options: ['Merci', 'Au revoir', 'Bonjour', 'Salut'],
              correctAnswer: 'Bonjour'
            }
          ]
        }
      }
    ]
  };

  return (
    <div className="py-4 h-[calc(100vh-80px)]">
      <LessonEngine 
        lesson={practiceLesson as any} 
        courseContext={{
          languageName: lang.name,
          level: 'A1',
          unitTitle: 'Adaptive Review'
        }}
      />
    </div>
  );
}
