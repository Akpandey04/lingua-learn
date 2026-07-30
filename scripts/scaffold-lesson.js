const fs = require('fs');
const path = require('path');

const [language, level, unit, lesson] = process.argv.slice(2);

if (!language || !level || !unit || !lesson) {
  console.error("Usage: node scaffold-lesson.js <language> <level> <unit> <lesson>");
  console.error("Example: node scaffold-lesson.js french A1 unit-01-meeting-people lesson-02-my-name-is");
  process.exit(1);
}

const dir = path.join(process.cwd(), 'content', language, level, unit, lesson);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const lessonFile = path.join(dir, 'lesson.json');

if (fs.existsSync(lessonFile)) {
  console.error(`Error: ${lessonFile} already exists!`);
  process.exit(1);
}

const template = {
  id: lesson,
  unitId: unit,
  title: "PLACEHOLDER TITLE",
  version: 1,
  learningObjectives: [
    "PLACEHOLDER_CONCEPT_1",
    "PLACEHOLDER_CONCEPT_2"
  ],
  modules: [
    // 1. Introduction (Implicit or handled by Course UI usually, but let's assume it's part of the engine flow)
    {
      id: "mod-intro-1",
      type: "knowledge_card",
      version: 1,
      config: {
        title: "Introduction",
        conceptId: "intro",
        content: "In this lesson, you will learn to [PLACEHOLDER OBJECTIVE].",
        example: ""
      }
    },
    // 2. Vocabulary
    {
      id: "mod-vocab-1",
      type: "vocabulary",
      version: 1,
      config: {
        words: [
          {
            conceptId: "PLACEHOLDER_CONCEPT_1",
            emoji: "❓",
            nativeWord: "TARGET_WORD_1",
            englishMeaning: "ENGLISH_TRANSLATION_1",
            pronunciation: "PRONUNCIATION_HINT",
            exampleSentence: "EXAMPLE_SENTENCE",
            exampleTranslation: "EXAMPLE_TRANSLATION"
          }
        ]
      }
    },
    // 3. Dialogue
    {
      id: "mod-dialogue-1",
      type: "dialogue",
      version: 1,
      config: {
        title: "PLACEHOLDER CONVERSATION TITLE",
        lines: [
          {
            id: "line-1",
            speaker: "Person A",
            text: "Line 1 in native language using TARGET_WORD_1",
            translation: "Line 1 translation",
            conceptIds: ["PLACEHOLDER_CONCEPT_1"]
          },
          {
            id: "line-2",
            speaker: "Person B",
            text: "Line 2 in native language",
            translation: "Line 2 translation"
          }
        ]
      }
    },
    // 4. Knowledge Card
    {
      id: "mod-grammar-1",
      type: "knowledge_card",
      version: 1,
      config: {
        title: "Did you notice?",
        conceptId: "PLACEHOLDER_CONCEPT_1",
        content: "Grammar or cultural insight regarding TARGET_WORD_1.",
        example: "Example sentence showing the rule."
      }
    },
    // 5. Quiz / Listening / Speaking / Mixed Practice
    // For MVP, we use the QuizModule to handle these interactive activities.
    {
      id: "mod-quiz-1",
      type: "quiz",
      version: 1,
      config: {
        questions: [
          {
            id: "q-listening-1",
            type: "listening",
            question: "Listen and select the correct translation for [Audio].",
            options: ["Option 1", "Option 2", "Option 3"],
            answer: "Option 2"
          },
          {
            id: "q-speaking-1",
            type: "translate",
            question: "How do you say: [ENGLISH_TRANSLATION_1]?",
            options: ["Wrong 1", "TARGET_WORD_1", "Wrong 2"],
            answer: "TARGET_WORD_1"
          }
        ]
      }
    }
  ]
};

fs.writeFileSync(lessonFile, JSON.stringify(template, null, 2), 'utf-8');
console.log(`✅ Scaffolded lesson at: ${lessonFile}`);
