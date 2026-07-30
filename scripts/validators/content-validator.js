const fs = require('fs');
const path = require('path');

function validateContent(contentDir) {
  let hasErrors = false;
  let totalLessonsChecked = 0;

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.name === 'lesson.json') {
        totalLessonsChecked++;
        validateLessonFile(fullPath);
      }
    }
  }

  function validateLessonFile(filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      
      // Check for raw 'undefined' or 'null' text strings in JSON
      if (raw.includes('"undefined"') || raw.includes(': undefined')) {
        console.error(`❌ Validation Failure in ${relativePath}: Raw 'undefined' value detected in JSON.`);
        hasErrors = true;
      }

      const lesson = JSON.parse(raw);

      if (!lesson.id) {
        console.error(`❌ Validation Failure in ${relativePath}: Missing lesson ID.`);
        hasErrors = true;
      }

      if (!lesson.modules || !Array.isArray(lesson.modules) || lesson.modules.length === 0) {
        console.error(`❌ Validation Failure in ${relativePath}: Lesson has no modules.`);
        hasErrors = true;
        return;
      }

      // Track concept IDs to verify multi-step coverage
      const conceptIds = new Set();

      lesson.modules.forEach((mod, mIdx) => {
        if (!mod.id || !mod.type) {
          console.error(`❌ Validation Failure in ${relativePath}: Module #${mIdx} is missing id or type.`);
          hasErrors = true;
        }

        if (mod.type === 'vocabulary') {
          const words = mod.config?.words;
          if (!words || !Array.isArray(words) || words.length === 0) {
            console.error(`❌ Validation Failure in ${relativePath}: Vocabulary module '${mod.id}' is empty.`);
            hasErrors = true;
          } else {
            words.forEach((w, wIdx) => {
              if (w.conceptId) conceptIds.add(w.conceptId);
              if (!w.nativeWord || w.nativeWord.includes('undefined')) {
                console.error(`❌ Validation Failure in ${relativePath}: Vocabulary '${mod.id}' word #${wIdx} has invalid nativeWord.`);
                hasErrors = true;
              }
              if (!w.englishMeaning || w.englishMeaning.includes('undefined')) {
                console.error(`❌ Validation Failure in ${relativePath}: Vocabulary '${mod.id}' word #${wIdx} has invalid englishMeaning.`);
                hasErrors = true;
              }
            });
          }
        }

        if (mod.type === 'quiz') {
          const activities = mod.config?.activities;
          if (!activities || !Array.isArray(activities) || activities.length === 0) {
            console.error(`❌ Validation Failure in ${relativePath}: Quiz module '${mod.id}' is empty.`);
            hasErrors = true;
          } else {
            activities.forEach((act, aIdx) => {
              const payload = act.payload || act;
              if (payload.question && payload.question.includes('undefined')) {
                console.error(`❌ Validation Failure in ${relativePath}: Quiz '${mod.id}' activity #${aIdx} contains 'undefined' in question: "${payload.question}"`);
                hasErrors = true;
              }
              if (payload.answer && payload.answer.includes('undefined')) {
                console.error(`❌ Validation Failure in ${relativePath}: Quiz '${mod.id}' activity #${aIdx} contains 'undefined' in answer.`);
                hasErrors = true;
              }
            });
          }
        }
      });

    } catch (e) {
      console.error(`❌ Exception parsing ${relativePath}:`, e.message);
      hasErrors = true;
    }
  }

  const rootContent = path.join(process.cwd(), contentDir);
  console.log(`🔍 Auditing content directory: ${rootContent}...`);
  scanDirectory(rootContent);

  if (hasErrors) {
    console.error(`\n💥 Content Validation FAILED. Please fix data generators or lesson JSON files.`);
    process.exit(1);
  } else {
    console.log(`\n✅ Content Validation PASSED cleanly across ${totalLessonsChecked} lessons!`);
  }
}

// Run validation if invoked directly
if (require.main === module) {
  validateContent('content');
}

module.exports = { validateContent };
