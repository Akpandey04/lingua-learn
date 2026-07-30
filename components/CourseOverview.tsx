'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { intelligenceEngine } from '@/lib/intelligence-engine';
import type { Course, Language } from '@/types';
import HeartsDisplay from './ui/HeartsDisplay';
import GrammarHintsPanel from './GrammarHintsPanel';
import {
  BookOpen,
  Target,
  Award,
  Flame,
  Clock,
  Brain,
  Lock,
  Play,
  User as UserIcon,
  Globe,
  PartyPopper,
  Sparkles,
  Calendar,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface Props {
  language: Language;
  course: Course;
}

export default function CourseOverview({ language, course }: Props) {
  const { progress } = useProgress();
  const [masteryData, setMasteryData] = useState<any[]>([]);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMasteryData(intelligenceEngine.getAllMastery());
    setMistakeCount(intelligenceEngine.getMistakes().filter((m: any) => m.status !== 'mastered').length);
    setMounted(true);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  // Flatten lessons to determine absolute sequential lock
  const allLessons = useMemo(() => {
    const flat: { lesson: any; unit: any; index: number }[] = [];
    course.units.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        flat.push({ lesson, unit, index: flat.length });
      });
    });
    return flat;
  }, [course]);

  let completedLessons = 0;
  let nextLessonIndex = -1;

  allLessons.forEach((item) => {
    const isCompleted = progress.lessons[item.lesson.id]?.completed;
    if (isCompleted) {
      completedLessons++;
    } else if (nextLessonIndex === -1) {
      nextLessonIndex = item.index;
    }
  });

  const nextLessonObj = nextLessonIndex !== -1 ? allLessons[nextLessonIndex] : null;
  const totalLessons = allLessons.length;
  const courseProgressPercent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
  const masteredCount = masteryData.filter(m => m.overall >= 80).length;

  if (!mounted) {
    return (
      <div className="flex flex-col gap-10 pb-20 max-w-6xl mx-auto w-full pt-6 px-4 sm:px-6 animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl w-full opacity-50"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-6">
              <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full opacity-50"></div>
           </div>
           <div className="lg:col-span-4 space-y-6">
              <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full opacity-50"></div>
           </div>
        </div>
      </div>
    );
  }

  const handleLockedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Complete the previous lesson to unlock this lesson.");
  };

  return (
    <div className="flex flex-col pb-20 max-w-6xl mx-auto w-full px-4 sm:px-6 mt-8 font-sans text-gray-900 dark:text-gray-100">
      
      {/* Premium Hero Section */}
      <div className="bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden mb-12 animate-fade-in-up">
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{language.flag}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{language.name} Course</h1>
              <span className="ml-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">A1 Beginner</span>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8">
              {greeting}! Ready to continue your learning journey?
            </p>
            
            <div className="flex flex-wrap gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-xs tracking-wider">Lessons Completed</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{completedLessons} / {totalLessons}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-xs tracking-wider">Words Learned</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{masteredCount}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 uppercase text-xs tracking-wider">Overall Progress</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{courseProgressPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Learning Path */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Continue Learning CTA */}
          {nextLessonObj ? (
             <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
               <div>
                 <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-2">
                   <Play size={14} className="fill-current"/> Current Lesson
                 </p>
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{nextLessonObj.lesson.title}</h2>
                 <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                   Unit {nextLessonObj.unit.title}
                 </p>
               </div>
               <div className="flex items-center gap-6">
                 <Link 
                   href={`/${language.code}/${nextLessonObj.unit.id}/${nextLessonObj.lesson.id}`}
                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl py-4 px-8 min-h-[44px] transition-colors flex items-center gap-2 shadow-sm w-full md:w-auto justify-center focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:outline-none"
                 >
                   Continue → {nextLessonObj.lesson.title}
                 </Link>
               </div>
             </div>
          ) : completedLessons > 0 && completedLessons === totalLessons ? (
             <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 rounded-3xl p-8 flex flex-col md:flex-row justify-between gap-8 shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
               <div className="flex-1">
                 <p className="text-green-600 dark:text-green-400 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-2">
                   <PartyPopper size={14} className="fill-current"/> Course Complete
                 </p>
                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{language.name} A1 Completed 🎉</h2>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                   <div className="bg-white/60 dark:bg-black/20 p-4 rounded-2xl">
                     <p className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Lessons Completed</p>
                     <p className="text-2xl font-black text-gray-900 dark:text-white">{completedLessons} / {totalLessons}</p>
                   </div>
                   <div className="bg-white/60 dark:bg-black/20 p-4 rounded-2xl">
                     <p className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Words Learned</p>
                     <p className="text-2xl font-black text-gray-900 dark:text-white">{masteredCount}</p>
                   </div>
                   <div className="bg-white/60 dark:bg-black/20 p-4 rounded-2xl">
                     <p className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Mistakes Remaining</p>
                     <p className="text-2xl font-black text-gray-900 dark:text-white">{mistakeCount}</p>
                   </div>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link 
                      href={`/${language.code}/mistakes`}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl py-4 px-8 min-h-[44px] transition-colors flex items-center gap-2 shadow-sm w-full md:w-auto justify-center focus-visible:ring-4 focus-visible:ring-green-400 focus-visible:outline-none"
                    >
                      Continue Reviewing Mistakes
                    </Link>
                    <button 
                      onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                      className="bg-white dark:bg-[#1c1c1e] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-2xl py-4 px-8 min-h-[44px] transition-colors flex items-center gap-2 w-full md:w-auto justify-center focus-visible:ring-4 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600 focus-visible:outline-none"
                    >
                      Restart Any Lesson
                    </button>
                  </div>
               </div>
             </div>
          ) : null}

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>Learning Path</h3>
            <div className="relative pl-6 pb-8">
              <div className="absolute top-4 bottom-0 left-6 w-[2px] bg-gray-200 dark:bg-gray-800 rounded-full z-0"></div>

              <div className="flex flex-col gap-12">
                {course.units.map((unit, uIdx) => {
                  const unitLessons = allLessons.filter(l => l.unit.id === unit.id);
                  const isUnitLocked = unitLessons[0].index > (nextLessonIndex === -1 ? totalLessons : nextLessonIndex);

                  return (
                    <div key={unit.id} className="relative z-10 animate-fade-in-up" style={{ animationDelay: `${200 + uIdx * 100}ms` }}>
                      <div className="flex items-center gap-4 -ml-[13px] mb-6 bg-white dark:bg-[#121212] py-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 ${isUnitLocked ? 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700' : 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                          {uIdx + 1}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{unit.title}</h4>
                      </div>

                      <div className="flex flex-col gap-4 ml-6">
                        {unit.lessons.map((lesson) => {
                          const flatIndex = allLessons.find(l => l.lesson.id === lesson.id)?.index || 0;
                          const isCompleted = progress.lessons[lesson.id]?.completed;
                          // A lesson is unlocked if it's the next lesson or already completed
                          const isCurrent = !isCompleted && flatIndex === nextLessonIndex;
                          const isLocked = !isCompleted && flatIndex > nextLessonIndex && nextLessonIndex !== -1;
                          const isUpcoming = !isCompleted && !isLocked && !isCurrent;
                          
                          const CardWrapper = isLocked ? 'div' : Link;
                          
                          // Determine styles based on state
                          let cardStyle = '';
                          let iconStyle = '';
                          let textStyle = '';
                          let statusText = '';
                          
                          if (isCompleted) {
                            cardStyle = 'border-green-200 dark:border-green-900/50 hover:border-green-300 hover:shadow-sm cursor-pointer';
                            iconStyle = 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
                            textStyle = 'text-gray-900 dark:text-white';
                            statusText = 'Completed';
                          } else if (isCurrent) {
                            cardStyle = 'border-blue-400 dark:border-blue-700 ring-2 ring-blue-500/30 hover:shadow-md cursor-pointer bg-blue-50/30 dark:bg-blue-900/10';
                            iconStyle = 'bg-blue-500 text-white shadow-md';
                            textStyle = 'text-gray-900 dark:text-white font-black';
                            statusText = 'Current';
                          } else if (isLocked) {
                            cardStyle = 'border-gray-100 dark:border-gray-800 opacity-60 cursor-default bg-gray-50 dark:bg-[#151515]';
                            iconStyle = 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
                            textStyle = 'text-gray-500 dark:text-gray-400';
                            statusText = 'Locked';
                          } else {
                            // Upcoming
                            cardStyle = 'border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:shadow-sm cursor-pointer';
                            iconStyle = 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
                            textStyle = 'text-gray-700 dark:text-gray-200';
                            statusText = 'Upcoming';
                          }
                          
                          return (
                            <CardWrapper 
                              key={lesson.id} 
                              href={`/${language.code}/${unit.id}/${lesson.id}`}
                              onClick={isLocked ? handleLockedClick : undefined}
                              className={`block bg-white dark:bg-[#1C1C1E] border rounded-2xl p-5 transition-all ${cardStyle}`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${iconStyle}`}>
                                  {isLocked ? <Lock size={20} /> : isCompleted ? <CheckCircle2 size={24} /> : isCurrent ? <Play size={20} className="fill-current" /> : <BookOpen size={20} />}
                                </div>
                                <div className="flex-1">
                                  <h5 className={`font-bold text-lg mb-1 ${textStyle}`}>
                                    {lesson.title}
                                  </h5>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold tracking-wider uppercase ${isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>
                                      {statusText}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                      {lesson.conceptIds?.length || 5} Concepts
                                    </span>
                                  </div>
                                </div>
                                {!isLocked && (
                                  <div className={`text-gray-400 ${isCurrent ? 'text-blue-500' : 'group-hover:text-blue-500'}`}>
                                    <ChevronRight size={20} />
                                  </div>
                                )}
                              </div>
                            </CardWrapper>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Learning Hub */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Link href={`/${language.code}/mistakes`} className="block bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-colors animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${mistakeCount > 0 ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20' : 'bg-green-50 text-green-600 dark:bg-green-900/20'}`}>
                {mistakeCount > 0 ? <BookOpen size={20} /> : <CheckCircle2 size={20} />}
              </div>
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Mistakes to Review</h5>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {mistakeCount > 0 ? `${mistakeCount} mistakes need practice` : 'All caught up!'}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
