import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { LANGUAGES } from '@/lib/languages';
import type { LanguageCode, Course } from '@/types';
import CourseOverview from '@/components/CourseOverview';
import ReviewCenterCard from '@/components/ReviewCenterCard';
import fs from 'fs';
import path from 'path';

interface Props {
  params: Promise<{ language: string }>;
}

export async function generateStaticParams() {
  return Object.keys(LANGUAGES).map((code) => ({ language: code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const lang = LANGUAGES[language as LanguageCode];
  if (!lang) return {};
  return {
    title: `Learn ${lang.name} – LinguaLearn`,
    description: `Interactive ${lang.name} lessons — vocabulary, grammar, speaking practice. 100% free.`,
  };
}

export default async function LanguagePage({ params }: Props) {
  const { language } = await params;
  const lang = LANGUAGES[language as LanguageCode];
  if (!lang) notFound();

  let courseData: Course = { language: language as LanguageCode, units: [] };

  try {
    const curriculumPath = path.join(process.cwd(), 'content', language, 'A1', 'curriculum.json');
    if (fs.existsSync(curriculumPath)) {
      const fileContent = fs.readFileSync(curriculumPath, 'utf-8');
      const curriculum = JSON.parse(fileContent);
      
      courseData.units = curriculum.units.map((u: any) => ({
        id: `A1/${u.id}`,
        title: u.title,
        description: u.unitObjectives ? u.unitObjectives[0] : '',
        icon: '📖',
        lessons: u.lessons.map((l: any) => ({
          id: l.id,
          title: l.title,
          intro: l.type === 'checkpoint' ? 'Test your skills!' : 'Learn new concepts.',
          xpReward: l.type === 'checkpoint' ? 50 : 20,
          estimatedMinutes: 10,
          vocabulary: [],
          guidedExercises: [],
          recallExercises: [],
          mixedExercises: [],
          quizExercises: []
        }))
      }));
    } else {
      console.warn(`No curriculum found at ${curriculumPath}`);
    }
  } catch (error) {
    console.error('Failed to parse curriculum', error);
  }

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-12 pb-4">
        <ReviewCenterCard language={language} />
      </div>
      <CourseOverview language={lang} course={courseData} />
    </div>
  );
}
