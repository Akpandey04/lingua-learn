const fs = require('fs');
const path = require('path');

const generateConcepts = async (concepts, language) => {
  if (!concepts || concepts.length === 0) return;
  
  const conceptsDir = path.join(process.cwd(), 'content', 'concepts', language.toLowerCase());
  if (!fs.existsSync(conceptsDir)) {
    fs.mkdirSync(conceptsDir, { recursive: true });
  }

  concepts.forEach(c => {
    const data = {
      id: c.id,
      type: 'vocabulary',
      language: language,
      native: c.native,
      translation: c.translation,
      pronunciation: c.pronunciation,
      ipa: c.ipa,
      difficulty: c.difficulty || 1,
      cefr: c.cefr || 'A1',
      tags: c.tags || [],
      relatedConcepts: c.relatedConcepts || [],
      masteryThreshold: 0.9,
      exampleSentence: c.exampleSentence,
      exampleTranslation: c.exampleTranslation,
      usageNote: c.usageNote,
      formality: c.formality,
      memoryTip: c.memoryTip,
      emoji: c.emoji
    };
    
    fs.writeFileSync(path.join(conceptsDir, `${c.id}.json`), JSON.stringify(data, null, 2));
  });
};

module.exports = { generateConcepts };
