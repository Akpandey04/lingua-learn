const fs = require('fs');
const path = require('path');
const { makeWord, makeGrammar, makeUnit, makeLesson } = require('./utils');

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const generateLessonJson = (unit, config) => {
  const vocabWords = unit.words.map(w => makeWord(w.id, w.native, w.english, w.ipa, w.pron, w.ex, w.ext, w.tip, [unit.id], '📝'));
  const learningObjectives = vocabWords.map(w => w.id);

  // 1. Listen Module
  const listenActivities = unit.words.map(w => ({
    type: "listening",
    phaseTitle: "Listening Practice",
    phrase: w.native,
    answer: w.native,
    options: shuffle([...unit.words.map(xw => xw.native)]),
    conceptId: w.id
  }));

  // 2. Speak Module
  const speakActivities = unit.words.map(w => ({
    type: "speaking",
    phaseTitle: "Pronunciation",
    prompt: `Read aloud: ${w.native}`,
    expectedPhrase: w.native,
    conceptId: w.id
  }));

  // 3. Type Module
  const typeActivities = unit.words.map(w => ({
    type: "typing",
    phaseTitle: "Typing Practice",
    prompt: `Type: ${w.english}`,
    answer: w.native,
    conceptId: w.id
  }));

  // 4. Practice Module (Meaning/Translate/Match)
  const practiceActivities = [];
  unit.words.forEach(w => {
    practiceActivities.push({
      type: "mcq",
      phaseTitle: "Meaning",
      question: `Translate: ${w.english}`,
      options: shuffle([...unit.words.map(xw => xw.native)]),
      answer: w.native,
      conceptId: w.id
    });
    
    practiceActivities.push({
      type: "translate",
      phaseTitle: "Translation",
      direction: "to-native",
      question: `Write in ${config.displayName}: ${w.english}`,
      answer: w.native,
      conceptId: w.id
    });
  });

  if (unit.words.length >= 4) {
    practiceActivities.push({
      type: "match",
      phaseTitle: "Pair Matching",
      pairs: unit.words.slice(0, 5).map(w => ({ source: w.native, target: w.english })),
      conceptId: unit.words[0].id
    });
  }

  // 5. Final Quiz
  const summaryContent = "You've learned the vocabulary, listened to the pronunciation, and practiced typing. Now, let's put it all together.";
  const finalQuizActivities = [];
  unit.words.forEach(w => {
    finalQuizActivities.push({ type: "mcq", phaseTitle: "Final Quiz", question: `Translate: ${w.english}`, answer: w.native, options: shuffle([...unit.words.map(xw => xw.native)]), conceptId: w.id });
    if (config.capabilities?.supportsTTS) {
      finalQuizActivities.push({ type: "listening", phaseTitle: "Final Quiz", phrase: w.native, answer: w.native, options: shuffle([...unit.words.map(xw => xw.native)]), conceptId: w.id });
    }
    finalQuizActivities.push({ type: "typing", phaseTitle: "Final Quiz", prompt: `Type: ${w.english}`, answer: w.native, conceptId: w.id });
  });

  unit.sentences.forEach(s => {
    finalQuizActivities.push({
      type: "sentence_build",
      phaseTitle: "Sentence Building",
      prompt: `Translate: '${s.text}'`,
      tokens: s.tokens,
      answer: s.text,
      conceptId: unit.words[0].id
    });
  });


  const moduleMap = {
    "knowledge": {
      id: "mod-intro",
      type: "knowledge_card",
      config: {
        title: `Welcome to ${unit.unitTitle}`,
        conceptId: "intro",
        content: `Today we will learn about ${unit.unitTitle} in ${config.displayName}. Let's start with important words.`,
        example: "Pay close attention to how they are pronounced."
      }
    },
    "vocabulary": { id: "mod-vocab", type: "vocabulary", config: { flow: "teach_all", words: vocabWords } },
    "listening": { id: "mod-listen", type: "quiz", config: { activities: listenActivities } },
    "speaking": { id: "mod-speak", type: "quiz", config: { activities: speakActivities } },
    "typing": { id: "mod-type", type: "quiz", config: { activities: typeActivities } },
    "practice": { id: "mod-practice", type: "quiz", config: { activities: practiceActivities } },
    "summary": {
      id: "mod-summary",
      type: "knowledge_card",
      config: {
        title: "Revision Summary",
        conceptId: "intro",
        content: summaryContent,
        example: "Take a deep breath. Let's start the final quiz!"
      }
    },
    "quiz": { id: "mod-final-quiz", type: "quiz", config: { activities: finalQuizActivities } },
    "celebration": { id: "mod-celebration", type: "celebration", config: {} }
  };

  const flow = config.lessonFlow || ["knowledge", "vocabulary", "practice", "summary", "quiz"];
  const assembledModules = flow.map(m => moduleMap[m]).filter(Boolean);
  assembledModules.push(moduleMap["celebration"]); // Always end with celebration

  return {
    id: `${unit.id}-lesson-1`,
    unitId: unit.id,
    title: unit.unitTitle,
    version: 3,
    learningObjectives,
    modules: assembledModules
  };

};

module.exports = { generateLessonJson };
