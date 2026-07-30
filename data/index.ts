import type { Course, LanguageCode } from '@/types';
import frenchCourse from './french/course';
import germanCourse from './german/course';
import spanishCourse from './spanish/course';
import japaneseCourse from './japanese/course';

export const COURSES: Record<LanguageCode, Course> = {
  french: frenchCourse,
  german: germanCourse,
  spanish: spanishCourse,
  japanese: japaneseCourse,
};

export function getCourse(language: LanguageCode): Course {
  return COURSES[language];
}

export function getUnit(language: LanguageCode, unitId: string) {
  const course = getCourse(language);
  return course.units.find((u) => u.id === unitId) ?? null;
}

export function getLesson(language: LanguageCode, unitId: string, lessonId: string) {
  const unit = getUnit(language, unitId);
  return unit?.lessons.find((l) => l.id === lessonId) ?? null;
}
