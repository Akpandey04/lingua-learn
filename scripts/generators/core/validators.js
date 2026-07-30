const fs = require('fs');
const path = require('path');

const VALIDATION_RESULTS = {
  fatals: [],
  warnings: [],
  suggestions: []
};

const addFatal = (lessonId, msg) => VALIDATION_RESULTS.fatals.push(`[${lessonId}] ${msg}`);
const addWarning = (lessonId, msg) => VALIDATION_RESULTS.warnings.push(`[${lessonId}] ${msg}`);
const addSuggestion = (lessonId, msg) => VALIDATION_RESULTS.suggestions.push(`[${lessonId}] ${msg}`);

const knownMemoryTips = new Set();
const knownExamples = new Set();

const validateLesson = (lessonPath, lesson) => {
  const lessonId = lesson.id || 'UNKNOWN_LESSON';

  if (!lesson.id || !lesson.unitId || !lesson.modules) {
    addFatal(lessonId, "Missing core fields (id, unitId, modules)");
    return;
  }

  // 1. Required modules exist and in correct order
  // Note: Depending on capabilities (tts/speech), there may be fewer quizzes.
  // At minimum: intro, vocab, practice..., final quiz, celebration.
  const actualOrder = lesson.modules.map(m => m.type);
  if (actualOrder[0] !== 'knowledge_card' || actualOrder[1] !== 'vocabulary' || actualOrder[actualOrder.length - 1] !== 'celebration') {
    addFatal(lessonId, "Invalid module order. Must start with knowledge_card -> vocabulary, and end with celebration.");
  }

  // 2. Vocabulary checks
  const vocabModule = lesson.modules.find(m => m.type === 'vocabulary');
  if (!vocabModule) {
    addFatal(lessonId, "No vocabulary module found");
    return;
  }

  const taughtWords = vocabModule.config.words;
  const taughtWordIds = taughtWords.map(w => w.conceptId);
  const uniqueWords = new Set(taughtWordIds);
  if (taughtWordIds.length !== uniqueWords.size) {
    addFatal(lessonId, "Duplicate concept IDs in vocabulary module");
  }

  // Check Level 2 warnings for vocabulary
  taughtWords.forEach(w => {
    if (!w.ipa) addWarning(lessonId, `Missing IPA for concept: ${w.conceptId}`);
    if (!w.memoryTip) {
      addWarning(lessonId, `Missing memory tip for concept: ${w.conceptId}`);
    } else {
      if (knownMemoryTips.has(w.memoryTip)) {
        addWarning(lessonId, `Repeated memory tip detected: "${w.memoryTip}"`);
      }
      knownMemoryTips.add(w.memoryTip);
    }
    
    if (!w.exampleSentence) {
      addWarning(lessonId, `Missing example sentence for concept: ${w.conceptId}`);
    } else {
      if (knownExamples.has(w.exampleSentence)) {
        addWarning(lessonId, `Repeated example sentence detected: "${w.exampleSentence}"`);
      }
      knownExamples.add(w.exampleSentence);
      
      if (w.exampleSentence.length > 50) {
        addWarning(lessonId, `Long example sentence for beginners: "${w.exampleSentence}"`);
      }
    }
    
    if (w.englishMeaning && w.nativeWord && w.englishMeaning.toLowerCase() === w.nativeWord.toLowerCase()) {
      addWarning(lessonId, `Weak/Literal translation for concept: ${w.conceptId} (${w.nativeWord})`);
    }

    addSuggestion(lessonId, `Consider adding an engaging emoji for concept: ${w.conceptId}`);
  });

  // Find practice and final quiz
  const practiceModules = lesson.modules.filter(m => m.id === 'mod-practice' || m.id === 'mod-listen' || m.id === 'mod-speak' || m.id === 'mod-type');
  const finalQuizModule = lesson.modules.find(m => m.id === 'mod-final-quiz');

  // Gather all concept IDs practiced
  let practicedConcepts = new Set();
  practiceModules.forEach(pm => {
    pm.config.activities.forEach(act => practicedConcepts.add(act.conceptId));
  });

  let testedConcepts = new Set();
  if (finalQuizModule) {
    finalQuizModule.config.activities.forEach(act => testedConcepts.add(act.conceptId));
  } else {
    addFatal(lessonId, "No final quiz module found");
  }

  // 3. Every taught word appears in Practice and Final Quiz
  uniqueWords.forEach(word => {
    if (!practicedConcepts.has(word)) {
      addFatal(lessonId, `Taught word ${word} never appears in Practice modules`);
    }
    if (!testedConcepts.has(word)) {
      addFatal(lessonId, `Taught word ${word} never appears in Final Quiz module`);
    }
  });

  // 4. No unseen vocabulary
  practicedConcepts.forEach(c => {
    if (!uniqueWords.has(c)) {
      addFatal(lessonId, `Unseen vocabulary in Practice: ${c}`);
    }
  });
  testedConcepts.forEach(c => {
    if (!uniqueWords.has(c)) {
      addFatal(lessonId, `Unseen vocabulary in Final Quiz: ${c}`);
    }
  });
};

const validateCourse = (coursePath) => {
  const currPath = path.join(coursePath, 'curriculum.json');
  if (!fs.existsSync(currPath)) {
    console.error("No curriculum.json found at", currPath);
    process.exit(1);
  }

  const curriculum = JSON.parse(fs.readFileSync(currPath, 'utf8'));
  let totalLessons = 0;
  
  curriculum.units.forEach(unit => {
    unit.lessons.forEach(lessonRef => {
      const lessonJsonPath = path.join(coursePath, unit.id, lessonRef.id, 'lesson.json');
      if (!fs.existsSync(lessonJsonPath)) {
        addFatal(lessonRef.id, `Missing lesson file: ${lessonJsonPath}`);
        return;
      }
      
      try {
        const lesson = JSON.parse(fs.readFileSync(lessonJsonPath, 'utf8'));
        validateLesson(lessonJsonPath, lesson);
      } catch (e) {
        addFatal(lessonRef.id, `Invalid JSON formatting: ${e.message}`);
      }
      
      totalLessons++;
    });
  });

  // Generate Reports
  const reportPathJson = path.join(__dirname, 'qa_report.json');
  const reportPathMd = path.join(__dirname, 'qa_report.md');
  
  fs.writeFileSync(reportPathJson, JSON.stringify(VALIDATION_RESULTS, null, 2));
  
  let md = `# Production QA Report\n\n`;
  md += `**Total Lessons Checked:** ${totalLessons}\n\n`;
  
  md += `## ❌ Level 1: Build Blocking (Fatal) [${VALIDATION_RESULTS.fatals.length}]\n`;
  VALIDATION_RESULTS.fatals.forEach(f => md += `- ${f}\n`);
  
  md += `\n## ⚠️ Level 2: Quality Warnings [${VALIDATION_RESULTS.warnings.length}]\n`;
  VALIDATION_RESULTS.warnings.forEach(w => md += `- ${w}\n`);
  
  md += `\n## 💡 Level 3: Suggestions [${VALIDATION_RESULTS.suggestions.length}]\n`;
  VALIDATION_RESULTS.suggestions.forEach(s => md += `- ${s}\n`);
  
  fs.writeFileSync(reportPathMd, md);

  if (VALIDATION_RESULTS.fatals.length > 0) {
    console.error(`\n❌ Validation Failed with ${VALIDATION_RESULTS.fatals.length} fatal errors. Build blocked.`);
    console.error(`Check qa_report.md for details.`);
    process.exit(1);
  } else {
    console.log(`\n✅ Validation Passed! Checked ${totalLessons} lessons successfully.`);
    console.log(`⚠️ ${VALIDATION_RESULTS.warnings.length} Warnings, 💡 ${VALIDATION_RESULTS.suggestions.length} Suggestions. (See qa_report.md)`);
  }
};

const targetPath = process.argv[2];
if (targetPath) {
  validateCourse(path.resolve(targetPath));
} else {
  console.log("Usage: node validators.js <path-to-course-folder>");
}

module.exports = { validateLesson, validateCourse };
