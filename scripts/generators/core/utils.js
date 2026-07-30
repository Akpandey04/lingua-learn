const makeWord = (id, native, translation, ipa, pron, ex, exT, tip, tags = ['basics'], emoji = '📝', difficulty = 1) => ({
  id,
  conceptId: id,
  nativeWord: native,
  englishMeaning: translation,
  ipa,
  pronunciation: pron,
  exampleSentence: ex,
  exampleTranslation: exT,
  memoryTip: tip,
  tags,
  emoji,
  cefr: 'A1',
  difficultyRating: difficulty,
  commonMistake: {
    wrong: `${native.slice(0, -1)}`,
    correct: native
  },
  contextualUsage: {
    whenToUse: [`Standard expression for ${translation.toLowerCase()}`],
    doNotUse: ['In incorrect context'],
    insteadSay: native
  }
});

const makeGrammar = (id, title, description, rules, examples, tags = ['grammar']) => ({
  id, title, description, rules, examples, tags, cefr: 'A1'
});

const makeUnit = (id, title, objectives, concepts, lessons) => ({
  id, title, cefrLevel: 'A1', estimatedHours: 2, unitObjectives: objectives, concepts, lessons
});

const makeLesson = (id, unitId, title, type, objectives, vocabConcepts, dialogueLines, practiceActs, quizActs) => ({
  id, unitId, title, type, objectives,
  vocabulary: vocabConcepts,
  dialogue: dialogueLines ? { title: "Conversation", lines: dialogueLines } : null,
  practice: practiceActs,
  quiz: quizActs
});

const makeDialogueLine = (id, speaker, text, translation, options, avatarUrl) => ({
  id, speaker, text, translation, options, avatarUrl: avatarUrl || (speaker === 'You' ? null : `https://i.pravatar.cc/150?u=${speaker}`)
});

module.exports = { makeWord, makeGrammar, makeUnit, makeLesson, makeDialogueLine };
