const { generateCourse } = require('../../core/course-builder');
const { japaneseUnits } = require('./data');

const config = {
  id: 'japanese',
  displayName: 'Japanese',
  nativeName: '日本語',
  locale: 'ja-JP',
  direction: 'ltr',
  joinStrategy: 'none',
  capabilities: {
    supportsSpeech: true,
    supportsTTS: true,
    hasIPA: false, // Using romaji instead of IPA
  },
  lessonFlow: [
    "knowledge",
    "vocabulary",
    "listening",
    "speaking",
    "typing",
    "practice",
    "summary",
    "quiz"
  ]
};

console.log('Generating Japanese A1 Course...');
generateCourse(config, japaneseUnits);
console.log('Done.');
