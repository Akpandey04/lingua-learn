import type { Lesson } from '@/types/domain';

export function validateLesson(lesson: Lesson): void {
  const errors: string[] = [];

  if (!lesson.id) errors.push('Lesson is missing an ID.');
  if (!lesson.title) errors.push('Lesson is missing a title.');
  
  if (!lesson.modules || lesson.modules.length === 0) {
    errors.push('Lesson has no modules.');
  }

  // Validate modules
  const seenModuleIds = new Set<string>();
  
  lesson.modules?.forEach((module, idx) => {
    if (!module.id) {
      errors.push(`Module at index ${idx} is missing an ID.`);
    } else if (seenModuleIds.has(module.id)) {
      errors.push(`Duplicate module ID found: ${module.id}`);
    } else {
      seenModuleIds.add(module.id);
    }

    if (!module.type) {
      errors.push(`Module ${(module as any).id} is missing a type.`);
    }

    // Module-specific validation
    if (module.type === 'vocabulary') {
      const words = module.config?.words;
      if (!words || !Array.isArray(words) || words.length === 0) {
        errors.push(`Vocabulary module ${module.id} has no words array.`);
      } else {
        words.forEach((w: any, wIdx: number) => {
          if (!w.conceptId) errors.push(`Vocabulary module ${module.id}, word ${wIdx} is missing conceptId.`);
          if (!w.nativeWord) errors.push(`Vocabulary module ${module.id}, word ${wIdx} is missing nativeWord.`);
        });
      }
    }

    if (module.type === 'dialogue') {
      const lines = module.config?.lines;
      if (!lines || !Array.isArray(lines) || lines.length === 0) {
        errors.push(`Dialogue module ${module.id} is empty.`);
      }
    }
  });

  if (errors.length > 0) {
    // In production, you might log this to a telemetry service
    console.error(`Validation failed for lesson ${lesson.id}:`, errors);
    throw new Error(`Lesson Validation Failed for ${lesson.id}:\n- ` + errors.join('\n- '));
  }
}
