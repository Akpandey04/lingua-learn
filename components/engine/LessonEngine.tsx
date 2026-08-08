'use client';
import { useState, useEffect } from 'react';
import { moduleRegistry } from '@/lib/registry';
import type { Lesson } from '@/types/domain';
import VocabularyModule from '../modules/VocabularyModule';
import QuizModule from '../modules/QuizModule';
import DialogueModule from '../modules/DialogueModule';
import KnowledgeCardModule from '../modules/KnowledgeCardModule';
import Confetti from '../ui/Confetti';
import CelebrationModule from '../modules/CelebrationModule';
import { ModuleErrorBoundary } from '../ui/ModuleErrorBoundary';
import { eventBus } from '@/lib/event-bus';
import LessonHeader from './LessonHeader';

// Register modules for MVP
// In a real app this would happen in a bootstrapping phase
moduleRegistry.register('vocabulary', VocabularyModule as any);
moduleRegistry.register('quiz', QuizModule as any);
moduleRegistry.register('dialogue', DialogueModule as any);
moduleRegistry.register('knowledge_card', KnowledgeCardModule as any);

interface Props {
  lesson: Lesson;
  courseContext?: {
    languageName: string;
    level: string;
    unitTitle: string;
  };
}

export default function LessonEngine({ lesson, courseContext }: Props) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);


  // Session Recovery
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`lingua_session_${lesson.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.index > 0 && parsed.index < lesson.modules.length) {
          setCurrentModuleIndex(parsed.index);
        } else if (parsed.showNotesStep || parsed.finished) {
          setFinished(true);
        }
      }
    } catch (e) {
      console.warn("Could not restore session", e);
    } finally {
      setIsRestoring(false);
    }
  }, [lesson.id, lesson.modules.length]);

  // Save session state
  useEffect(() => {
    if (isRestoring) return;
    try {
      localStorage.setItem(`lingua_session_${lesson.id}`, JSON.stringify({
        index: currentModuleIndex,
        finished
      }));
    } catch (e) {
      // Ignore localStorage errors (e.g. quota exceeded)
    }
  }, [currentModuleIndex, finished, lesson.id, isRestoring]);

  useEffect(() => {
    const handleActivity = (payload: any) => { /* handled by sub-modules */ };
    eventBus.on('ActivityCompleted', handleActivity);
    return () => eventBus.off('ActivityCompleted', handleActivity);
  }, []);

  const handleModuleComplete = () => {
    if (currentModuleIndex + 1 >= lesson.modules.length) {
      setFinished(true);
      eventBus.emit('LessonCompleted', { lessonId: lesson.id });
      eventBus.emit('AudioFeedback', { type: 'complete' });
    } else {
      setCurrentModuleIndex(i => i + 1);
    }
  };

  const handleSkipModule = () => {
    // Treat skipping via error boundary identically to completion but log it
    console.warn(`Skipped module ${lesson.modules[currentModuleIndex]?.id} due to error.`);
    handleModuleComplete();
  };

  const handleRestartLesson = () => {
    setCurrentModuleIndex(0);
    setFinished(false);
  };

  if (isRestoring) {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-400">Loading lesson session...</div>;
  }

  if (finished) {
    // For MVP Phase 4A, we mock the learned concepts based on the lesson data.
    // In a real implementation, this would be computed by the Mastery Engine.
    const learned = lesson.learningObjectives || [];
    
    return (
      <CelebrationModule
        lesson={lesson}
        conceptsLearned={learned}
        onRestart={handleRestartLesson}
      />
    );
  }



  const currentModule = lesson.modules[currentModuleIndex];
  
  if (!currentModule) return null;

  // Runtime Data Guard to prevent rendering broken modules or raw undefined strings
  const checkModuleValidity = (mod: any): string | null => {
    if (!mod || !mod.config) return "Module configuration is missing.";
    const raw = JSON.stringify(mod.config);
    if (raw.includes('"undefined"') || raw.includes(':undefined')) {
      return "Contains undefined properties.";
    }
    return null;
  };

  const validationError = checkModuleValidity(currentModule);
  if (validationError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-3xl m-6 max-w-lg mx-auto text-center">
        <span className="text-4xl mb-2">⚠️</span>
        <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">Lesson validation failed</h3>
        <p className="text-sm text-red-600 dark:text-red-400 mb-4">
          Module '{currentModule.id}' ({currentModule.type}): {validationError}
        </p>
        <button 
          onClick={handleSkipModule} 
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition"
        >
          Skip Module & Continue
        </button>
      </div>
    );
  }

  const ModuleComponent = moduleRegistry.get(currentModule.type);

  if (!ModuleComponent) {
    return <div className="text-red-500 p-8 text-center">Error: Unknown module type '{currentModule.type}'</div>;
  }

  const progressPct = Math.round((currentModuleIndex / lesson.modules.length) * 100);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -mt-4">
      <LessonHeader 
        lessonTitle={lesson.title} 
        progressPct={progressPct} 
        onRestart={handleRestartLesson}
      />
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col pt-8 px-4 relative">
        <div className="flex-1 flex flex-col items-center">

        <ModuleErrorBoundary onSkip={handleSkipModule}>
          <ModuleComponent 
            key={currentModule.id} 
            module={currentModule} 
            onComplete={handleModuleComplete} 
          />
          </ModuleErrorBoundary>
        </div>
      </div>
    </div>
  );
}
