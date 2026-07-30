const fs = require('fs');
const path = require('path');
const { generateConcepts } = require('./generate-concepts');
const { generateGrammar } = require('./generate-grammar');
const { generateLessons } = require('./generate-lessons');
const { generateCurriculum } = require('./generate-curriculum');
const { validateData } = require('./validate-content');

const runPipeline = async () => {
  const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  
  for (const level of levels) {
    const dataPath = path.join(__dirname, 'data', `${level}.js`);
    if (!fs.existsSync(dataPath)) {
      console.log(`[Skip] No data found for level ${level.toUpperCase()}`);
      continue;
    }
    
    console.log(`\n--- Processing Level: ${level.toUpperCase()} ---`);
    const data = require(dataPath);
    
    validateData(data);
    
    console.log(`[1/4] Generating Concepts...`);
    await generateConcepts(data.concepts, data.language);
    
    console.log(`[2/4] Generating Grammar...`);
    await generateGrammar(data.grammar, data.language);
    
    console.log(`[3/4] Generating Lessons...`);
    await generateLessons(data.lessons, data.language, level);
    
    console.log(`[4/4] Generating Curriculum...`);
    await generateCurriculum(data.curriculum, data.language, level);
  }
  
  console.log('\n✅ Pipeline completed successfully.');
};

runPipeline();
