const { generateCourse } = require('../../core/course-builder');
const { germanUnits } = require('./data');

const config = {
  id: 'german',
  displayName: 'German',
  nativeName: 'Deutsch',
  locale: 'de-DE',
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

console.log('Generating German A1 Course...');
generateCourse(config, germanUnits);
console.log('Done.');
