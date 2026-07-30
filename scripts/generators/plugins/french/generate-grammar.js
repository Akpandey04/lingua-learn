const fs = require('fs');
const path = require('path');

const generateGrammar = async (grammar, language) => {
  if (!grammar || grammar.length === 0) return;
  
  const grammarDir = path.join(process.cwd(), 'content', 'grammar', language.toLowerCase());
  if (!fs.existsSync(grammarDir)) {
    fs.mkdirSync(grammarDir, { recursive: true });
  }

  grammar.forEach(g => {
    const data = {
      id: g.id,
      type: 'grammar',
      language: language,
      title: g.title,
      description: g.description,
      rules: g.rules || [],
      examples: g.examples || [],
      difficulty: g.difficulty || 2,
      cefr: g.cefr || 'A1',
      tags: g.tags || [],
      relatedConcepts: g.relatedConcepts || []
    };
    
    fs.writeFileSync(path.join(grammarDir, `${g.id}.json`), JSON.stringify(data, null, 2));
  });
};

module.exports = { generateGrammar };
