const { generateCourse } = require('../../core/course-builder');
const { frenchUnits } = require('./data');

const config = {
  id: 'french',
  displayName: 'French',
  nativeName: 'Français',
  locale: 'fr-FR',
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

console.log('Generating French A1 Course...');
generateCourse(config, frenchUnits);
console.log('Done.');
