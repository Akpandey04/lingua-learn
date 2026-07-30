const { generateCourse } = require('../../core/course-builder');
const { spanishUnits } = require('./data');

const config = {
  id: 'spanish',
  displayName: 'Spanish',
  nativeName: 'Español',
  locale: 'es-ES',
  direction: 'ltr',
  joinStrategy: 'space',
  capabilities: {
    supportsSpeech: true,
    supportsTTS: true,
    hasIPA: true,
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

console.log('Generating Spanish A1 Course...');
generateCourse(config, spanishUnits);
console.log('Done.');
