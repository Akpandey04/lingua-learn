'use client';
import type { ModuleProps } from '@/lib/registry';
import type { KnowledgeCardModule as KnowledgeCardModuleType } from '@/types/domain';
import { eventBus } from '@/lib/event-bus';

export default function KnowledgeCardModule({ module, onComplete }: ModuleProps<KnowledgeCardModuleType>) {
  const { title, content, example, conceptId } = module.config;

  const handleNext = () => {
    // Analytics tracking for this concept
    eventBus.emit('ActivityCompleted', {
      activityId: `kc-${conceptId}`,
      moduleId: module.id,
      correct: true, // Just reading
      timeSpentMs: 0,
    });
    
    eventBus.emit('ModuleCompleted', { moduleId: module.id });
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 max-w-lg mx-auto w-full">
      <div className="w-full bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-3xl shadow-lg p-8 relative overflow-hidden">
        
        {/* Decoration */}
        <div className="absolute top-0 right-0 p-6 text-6xl opacity-10">💡</div>

        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-3xl">💡</span>
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wide">
              {title}
            </h2>
          </div>

          <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
            {content}
          </p>

          {example && (
            <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-amber-100 dark:border-amber-800/50">
              <p className="font-mono text-lg text-amber-900 dark:text-amber-300">
                "{example}"
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 w-full flex justify-end">
        <button 
          onClick={handleNext}
          className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-xl shadow-lg transition-transform active:scale-95"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
