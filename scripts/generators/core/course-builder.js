const fs = require('fs');
const path = require('path');
const { generateLessonJson } = require('./lesson-builder');
const { makeUnit, makeGrammar } = require('./utils');

const generateCourse = (config, contentTopics) => {
  const rootPath = path.join(__dirname, '../../../content', config.id, config.level || 'A1');
  
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true });
  }

  const allUnits = [];
  let unitOrder = 1;

  contentTopics.forEach(t => {
    const unitId = `unit-${String(unitOrder).padStart(2, '0')}-${t.id}`;
    
    // Generate the comprehensive JSON for Lesson 1 using the core lesson builder
    const lesson1Id = `${unitId}-lesson-1`;
    const lessonObj = generateLessonJson(t, config);
    
    // Save lesson JSON
    const lessonDir = path.join(rootPath, unitId, lesson1Id);
    if (!fs.existsSync(lessonDir)) {
      fs.mkdirSync(lessonDir, { recursive: true });
    }
    fs.writeFileSync(path.join(lessonDir, 'lesson.json'), JSON.stringify(lessonObj, null, 2));

    // Curriculum Data mapping
    const conceptIds = lessonObj.learningObjectives;
    allUnits.push({
      id: unitId,
      title: t.unitTitle,
      cefrLevel: config.level || 'A1',
      unitObjectives: [`Master ${t.unitTitle}`],
      concepts: conceptIds,
      lessons: [
        {
          id: lesson1Id,
          title: lessonObj.title
        }
      ]
    });
    
    unitOrder++;
  });

  const curriculum = {
    language: config.displayName,
    level: config.level || 'A1',
    units: allUnits
  };

  fs.writeFileSync(path.join(rootPath, 'curriculum.json'), JSON.stringify(curriculum, null, 2));
  console.log(`Generated ${config.displayName} curriculum with ${allUnits.length} units.`);
};

module.exports = { generateCourse };
