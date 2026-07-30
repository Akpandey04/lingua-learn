import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LANGUAGES } from '@/lib/languages';
import { validateLesson } from '@/lib/validator';
import type { LanguageCode } from '@/types';
import LessonEngine from '@/components/engine/LessonEngine';
import fs from 'fs';
import path from 'path';

interface Props {
  params: Promise<{ language: string; level: string; unit: string; lesson: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language, lesson } = await params;
  const lang = LANGUAGES[language as LanguageCode];
  if (!lang) return {};
  return {
    title: `Lesson ${lesson} – ${lang.name} – LinguaLearn`,
  };
}

export default async function LessonPage({ params }: Props) {
  const { language, level, unit, lesson } = await params;
  const lang = LANGUAGES[language as LanguageCode];
  if (!lang) notFound();

  // Try to load from the new content engine architecture
  let lessonData;
  let unitTitle = unit;
  
  try {
    const filePath = path.join(process.cwd(), 'content', language, level, unit, lesson, 'lesson.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    lessonData = JSON.parse(fileContent);

    // Get unit title from curriculum
    const curriculumPath = path.join(process.cwd(), 'content', language, level, 'curriculum.json');
    if (fs.existsSync(curriculumPath)) {
      const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf-8'));
      const foundUnit = curriculum.units.find((u: any) => u.id === unit);
      if (foundUnit) {
        unitTitle = foundUnit.title;
      }
    }
  } catch (error) {
    console.error('Failed to load lesson content', error);
    notFound();
  }

  // Ensure this content meets Authoring Standards before serving
  validateLesson(lessonData);

  return (
    <div className="py-4 h-[calc(100vh-80px)]">
      <LessonEngine 
        lesson={lessonData} 
        courseContext={{
          languageName: lang.name,
          level: level.toUpperCase(),
          unitTitle: unitTitle
        }}
      />
    </div>
  );
}
