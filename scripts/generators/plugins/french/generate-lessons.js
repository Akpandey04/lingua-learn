const fs = require('fs');
const path = require('path');

const generateLessons = async (lessons, language, level) => {
  if (!lessons || lessons.length === 0) return;

  lessons.forEach(l => {
    // Determine the unit directory based on the lesson's unitId
    const unitDir = path.join(process.cwd(), 'content', language.toLowerCase(), level.toUpperCase(), l.unitId);
    const lessonDir = path.join(unitDir, l.id);
    
    if (!fs.existsSync(lessonDir)) {
      fs.mkdirSync(lessonDir, { recursive: true });
    }
    
    const modules = [];
    
    // Knowledge Cards (Grammar/Explanations)
    if (l.knowledgeCards && l.knowledgeCards.length > 0) {
      modules.push({
        id: `${l.id}-knowledge`,
        type: 'knowledge_card',
        config: { cards: l.knowledgeCards }
      });
    }
    
    // Vocabulary Module
    if (l.vocabulary && l.vocabulary.length > 0) {
      modules.push({
        id: `${l.id}-vocab`,
        type: 'vocabulary',
        config: { words: l.vocabulary }
      });
    }
    
    // Dialogue Module
    if (l.dialogue && l.dialogue.lines && l.dialogue.lines.length > 0) {
      modules.push({
        id: `${l.id}-dialogue`,
        type: 'dialogue',
        config: l.dialogue
      });
    }
    
    // Quiz/Practice Module
    if (l.quiz && l.quiz.length > 0) {
      modules.push({
        id: `${l.id}-quiz`,
        type: 'quiz',
        config: { activities: l.quiz.map(q => ({ type: q.type, payload: q })) }
      });
    }

    if (modules.length === 0) {
      modules.push({
        id: `${l.id}-vocab`,
        type: 'vocabulary',
        config: {
          words: [
            {
              conceptId: 'review_bonjour',
              emoji: '👋',
              nativeWord: 'Bonjour',
              englishMeaning: 'Hello',
              pronunciation: 'Bon-zhoor',
              ipa: '/bɔ̃ʒuʁ/',
              exampleSentence: 'Bonjour !',
              exampleTranslation: 'Hello!'
            }
          ]
        }
      });
    }

    const lessonData = {
      id: l.id,
      title: l.title,
      description: l.description,
      learningObjectives: l.objectives || [],
      modules: modules
    };

    fs.writeFileSync(path.join(lessonDir, 'lesson.json'), JSON.stringify(lessonData, null, 2));
  });
};

module.exports = { generateLessons };
