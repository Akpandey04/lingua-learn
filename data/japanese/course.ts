import type { Course } from '@/types';

const japaneseCourse: Course = {
  language: 'japanese',
  units: [
    {
      id: 'ja-unit1',
      title: 'Basics',
      description: 'Essential Japanese phrases and greetings',
      icon: '👋',
      lessons: [
        {
          id: 'ja-u1-l1',
          title: 'Greetings',
          intro: 'Learn how to greet people in Japanese.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'ja-v-konnichiwa', emoji: '☀️', nativeWord: 'こんにちは', englishMeaning: 'Hello / Good afternoon', pronunciation: 'kon-nee-chee-WA', exampleSentence: 'こんにちは、田中さん。', exampleTranslation: 'Hello, Tanaka-san.', usageNote: 'Used from around 10am to 5pm.' },
            { id: 'ja-v-ohayo', emoji: '🌅', nativeWord: 'おはようございます', englishMeaning: 'Good morning (formal)', pronunciation: 'oh-ha-YOH go-za-ee-mas', exampleSentence: 'おはようございます！', exampleTranslation: 'Good morning!', usageNote: 'The casual version is just おはよう (ohayō).' },
            { id: 'ja-v-konbanwa', emoji: '🌙', nativeWord: 'こんばんは', englishMeaning: 'Good evening', pronunciation: 'kon-BAN-wa', exampleSentence: 'こんばんは、お元気ですか？', exampleTranslation: 'Good evening, how are you?' },
            { id: 'ja-v-sayonara', emoji: '👋', nativeWord: 'さようなら', englishMeaning: 'Goodbye (formal)', pronunciation: 'sa-YOH-na-ra', exampleSentence: 'さようなら、また明日。', exampleTranslation: 'Goodbye, see you tomorrow.', usageNote: 'Fairly final goodbye. Use またね for "see you later".' },
            { id: 'ja-v-mata-ne', emoji: '✌️', nativeWord: 'またね', englishMeaning: 'See you later (casual)', pronunciation: 'ma-ta-NEH', exampleSentence: 'またね！気をつけて。', exampleTranslation: 'See you! Take care.' },
            { id: 'ja-v-oyasumi', emoji: '😴', nativeWord: 'おやすみなさい', englishMeaning: 'Good night', pronunciation: 'oh-ya-SOO-mee na-sai', exampleSentence: 'おやすみなさい、いい夢を。', exampleTranslation: 'Good night, sweet dreams.', grammarTip: 'Casual form: おやすみ (oyasumi).' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'ja-g1-1', question: 'Tap the greeting for "Hello / Good afternoon"', options: ['こんばんは', 'こんにちは', 'さようなら', 'またね'], answer: 'こんにちは', explanation: 'こんにちは (Konnichiwa) = Hello / Good afternoon.' },
            { type: 'mcq', id: 'ja-g1-2', question: 'When do you say おはようございます?', options: ['In the evening', 'At night', 'In the morning', 'For goodbye'], answer: 'In the morning', explanation: 'おはようございます is the formal Good morning greeting.' },
            { type: 'tap-word', id: 'ja-g1-3', question: 'Tap the casual "See you later"', options: ['さようなら', 'おやすみなさい', 'またね', 'こんにちは'], answer: 'またね', explanation: 'またね = See you later (casual).' },
            { type: 'listening', id: 'ja-g1-4', phrase: 'こんにちは', answer: 'こんにちは', options: ['こんにちは', 'こんばんは', 'おはよう', 'さようなら'], explanation: 'こんにちは = Hello!' },
          ],
          recallExercises: [
            { type: 'translate', id: 'ja-r1-1', direction: 'to-native', question: 'Good evening', answer: 'こんばんは', alternateAnswers: ['konbanwa'] },
            { type: 'translate', id: 'ja-r1-2', direction: 'to-english', question: 'さようなら', answer: 'Goodbye', alternateAnswers: ['goodbye', 'farewell'] },
            { type: 'mcq', id: 'ja-r1-3', question: '"おやすみなさい" means:', options: ['Good morning', 'Hello', 'Good night', 'Goodbye'], answer: 'Good night' },
            { type: 'translate', id: 'ja-r1-4', direction: 'to-native', question: 'Good morning (formal)', answer: 'おはようございます', alternateAnswers: ['ohayo gozaimasu'] },
          ],
          mixedExercises: [
            { type: 'match', id: 'ja-m1-1', pairs: [{ source: 'こんにちは', target: 'Hello' }, { source: 'おはようございます', target: 'Good morning' }, { source: 'さようなら', target: 'Goodbye' }, { source: 'おやすみなさい', target: 'Good night' }] },
            { type: 'fill', id: 'ja-m1-2', sentence: '___, 田中さん。(Hello, Tanaka-san.)', answer: 'こんにちは', options: ['こんにちは', 'さようなら', 'またね', 'こんばんは'] },
            { type: 'speaking', id: 'ja-m1-3', prompt: 'Say "Hello" in Japanese', expectedPhrase: 'こんにちは', hint: 'Pronounced: kon-nee-chee-WA' },
          ],
          quizExercises: [
            { type: 'translate', id: 'ja-q1-1', direction: 'to-english', question: 'こんばんは', answer: 'Good evening', alternateAnswers: ['good evening'] },
            { type: 'mcq', id: 'ja-q1-2', question: 'Which is the casual "See you later"?', options: ['さようなら', 'こんにちは', 'またね', 'おやすみなさい'], answer: 'またね' },
            { type: 'translate', id: 'ja-q1-3', direction: 'to-native', question: 'Good night', answer: 'おやすみなさい', alternateAnswers: ['おやすみ', 'oyasumi'] },
            { type: 'tap-word', id: 'ja-q1-4', question: 'Tap the formal "Good morning"', options: ['またね', 'こんにちは', 'おはようございます', 'こんばんは'], answer: 'おはようございます' },
          ],
        },
        {
          id: 'ja-u1-l2',
          title: 'Please & Thank You',
          intro: 'Learn the most important polite phrases in Japanese.',
          estimatedMinutes: 7,
          vocabulary: [
            { id: 'ja-v-arigatou', emoji: '🙏', nativeWord: 'ありがとうございます', englishMeaning: 'Thank you (formal)', pronunciation: 'ah-ree-GAH-toh go-za-ee-mas', exampleSentence: 'ありがとうございます！', exampleTranslation: 'Thank you very much!', grammarTip: 'Casual: ありがとう (arigatou).' },
            { id: 'ja-v-onegaishimasu', emoji: '🤲', nativeWord: 'おねがいします', englishMeaning: 'Please (requesting)', pronunciation: 'oh-neh-GAI-shee-mas', exampleSentence: 'コーヒーをおねがいします。', exampleTranslation: 'Coffee, please.', usageNote: 'Use when making a request or asking for something.' },
            { id: 'ja-v-douitashimashite', emoji: '😊', nativeWord: 'どういたしまして', englishMeaning: "You're welcome", pronunciation: 'doh-ee-tah-shee-MASH-teh', exampleSentence: '— ありがとう！— どういたしまして。', exampleTranslation: '— Thank you! — You\'re welcome.' },
            { id: 'ja-v-sumimasen', emoji: '🙋', nativeWord: 'すみません', englishMeaning: 'Excuse me / Sorry', pronunciation: 'soo-mee-MAH-sen', exampleSentence: 'すみません、トイレはどこですか？', exampleTranslation: 'Excuse me, where is the toilet?', usageNote: 'Very versatile — use to get attention or apologize.' },
            { id: 'ja-v-gomen', emoji: '😔', nativeWord: 'ごめんなさい', englishMeaning: 'I am sorry', pronunciation: 'go-MEN-na-sai', exampleSentence: 'ごめんなさい、遅れました。', exampleTranslation: 'I am sorry, I was late.' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'ja-g2-1', question: 'Tap the phrase for "Thank you" (formal)', options: ['すみません', 'おねがいします', 'ありがとうございます', 'どういたしまして'], answer: 'ありがとうございます', explanation: 'ありがとうございます = Thank you (formal).' },
            { type: 'mcq', id: 'ja-g2-2', question: '"すみません" can mean:', options: ['Thank you only', 'Please only', 'Excuse me AND Sorry', 'You\'re welcome'], answer: 'Excuse me AND Sorry', explanation: 'すみません is very versatile in Japanese.' },
            { type: 'listening', id: 'ja-g2-3', phrase: 'ありがとうございます', answer: 'ありがとうございます', options: ['ありがとうございます', 'どういたしまして', 'すみません', 'おねがいします'], explanation: 'ありがとうございます = Thank you very much.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'ja-r2-1', direction: 'to-native', question: 'Please (requesting)', answer: 'おねがいします', alternateAnswers: ['onegaishimasu'] },
            { type: 'translate', id: 'ja-r2-2', direction: 'to-english', question: 'どういたしまして', answer: "You're welcome", alternateAnswers: ["you're welcome", 'welcome'] },
            { type: 'mcq', id: 'ja-r2-3', question: 'How do you say "I am sorry"?', options: ['すみません', 'ごめんなさい', 'ありがとう', 'おねがいします'], answer: 'ごめんなさい' },
          ],
          mixedExercises: [
            { type: 'match', id: 'ja-m2-1', pairs: [{ source: 'ありがとうございます', target: 'Thank you' }, { source: 'おねがいします', target: 'Please' }, { source: 'どういたしまして', target: "You're welcome" }, { source: 'すみません', target: 'Excuse me' }] },
            { type: 'speaking', id: 'ja-m2-2', prompt: 'Say "Thank you very much"', expectedPhrase: 'ありがとうございます', hint: 'Pronounced: ah-ree-GAH-toh go-za-ee-mas' },
          ],
          quizExercises: [
            { type: 'translate', id: 'ja-q2-1', direction: 'to-native', question: 'Thank you (formal)', answer: 'ありがとうございます', alternateAnswers: ['arigatou gozaimasu'] },
            { type: 'mcq', id: 'ja-q2-2', question: '"どういたしまして" means:', options: ['Please', 'Thank you', "You're welcome", 'Sorry'], answer: "You're welcome" },
            { type: 'translate', id: 'ja-q2-3', direction: 'to-english', question: 'ごめんなさい', answer: 'I am sorry', alternateAnswers: ['sorry', 'i am sorry'] },
          ],
        },
      ],
    },
    {
      id: 'ja-unit2',
      title: 'Hiragana',
      description: 'Learn the Japanese hiragana writing system',
      icon: '✍️',
      lessons: [
        {
          id: 'ja-u2-l1',
          title: 'Vowels あいうえお',
          intro: 'Master the 5 fundamental Japanese vowel sounds.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'ja-v-a', emoji: '🅰️', nativeWord: 'あ (a)', englishMeaning: 'Sound: "a" as in father', pronunciation: 'ah', exampleSentence: 'あおい (aoi)', exampleTranslation: 'Blue', usageNote: 'First vowel in Japanese.' },
            { id: 'ja-v-i', emoji: '🦷', nativeWord: 'い (i)', englishMeaning: 'Sound: "i" as in machine', pronunciation: 'ee', exampleSentence: 'いぬ (inu)', exampleTranslation: 'Dog' },
            { id: 'ja-v-u', emoji: '🌙', nativeWord: 'う (u)', englishMeaning: 'Sound: "u" as in moon', pronunciation: 'oo', exampleSentence: 'うみ (umi)', exampleTranslation: 'Sea / Ocean' },
            { id: 'ja-v-e', emoji: '🪁', nativeWord: 'え (e)', englishMeaning: 'Sound: "e" as in bed', pronunciation: 'eh', exampleSentence: 'えき (eki)', exampleTranslation: 'Train station' },
            { id: 'ja-v-o', emoji: '🎵', nativeWord: 'お (o)', englishMeaning: 'Sound: "o" as in go', pronunciation: 'oh', exampleSentence: 'おかあさん (okāsan)', exampleTranslation: 'Mother', grammarTip: 'These 5 vowels are the building blocks of all Japanese syllables.' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'ja-g3-1', question: 'Tap the hiragana for the "a" sound', options: ['い', 'う', 'あ', 'え'], answer: 'あ', explanation: 'あ (a) sounds like "a" in "father".' },
            { type: 'mcq', id: 'ja-g3-2', question: 'How is い (i) pronounced?', options: ['like "a" in father', 'like "ee" in machine', 'like "o" in go', 'like "u" in moon'], answer: 'like "ee" in machine', explanation: 'い = "ee" sound, like the "i" in machine.' },
            { type: 'tap-word', id: 'ja-g3-3', question: 'Tap the hiragana for the "o" sound', options: ['え', 'う', 'い', 'お'], answer: 'お', explanation: 'お (o) sounds like "o" in "go".' },
          ],
          recallExercises: [
            { type: 'translate', id: 'ja-r3-1', direction: 'to-english', question: 'What sound is あ?', answer: 'a (as in father)', alternateAnswers: ['a', 'ah'] },
            { type: 'mcq', id: 'ja-r3-2', question: 'Which hiragana makes the "u" sound?', options: ['あ', 'い', 'う', 'え'], answer: 'う' },
            { type: 'translate', id: 'ja-r3-3', direction: 'to-english', question: 'What does いぬ (inu) mean?', answer: 'Dog', alternateAnswers: ['dog'] },
          ],
          mixedExercises: [
            { type: 'match', id: 'ja-m3-1', pairs: [{ source: 'あ', target: 'a' }, { source: 'い', target: 'i' }, { source: 'う', target: 'u' }, { source: 'え', target: 'e' }] },
            { type: 'tap-word', id: 'ja-m3-2', question: 'Tap the hiragana for "e"', options: ['お', 'あ', 'え', 'う'], answer: 'え' },
            { type: 'listening', id: 'ja-m3-3', phrase: 'あいうえお', answer: 'あいうえお' },
          ],
          quizExercises: [
            { type: 'mcq', id: 'ja-q3-1', question: 'Which hiragana makes the "a" sound?', options: ['い', 'え', 'あ', 'お'], answer: 'あ' },
            { type: 'mcq', id: 'ja-q3-2', question: 'What does うみ (umi) mean?', options: ['Dog', 'Train station', 'Mother', 'Sea / Ocean'], answer: 'Sea / Ocean' },
            { type: 'tap-word', id: 'ja-q3-3', question: 'Tap the "i" sound in hiragana', options: ['う', 'い', 'あ', 'お'], answer: 'い' },
          ],
        },
      ],
    },
    {
      id: 'ja-unit3',
      title: 'Food & Drinks',
      description: 'Order food and drinks in Japanese',
      icon: '🍱',
      lessons: [
        {
          id: 'ja-u3-l1',
          title: 'Common Foods',
          intro: 'Learn essential Japanese food vocabulary.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'ja-v-gohan', emoji: '🍚', nativeWord: 'ごはん (gohan)', englishMeaning: 'Rice / Meal', pronunciation: 'go-HAN', exampleSentence: 'ごはんを食べます。', exampleTranslation: 'I eat rice/a meal.' },
            { id: 'ja-v-mizu', emoji: '💧', nativeWord: 'みず (mizu)', englishMeaning: 'Water', pronunciation: 'mee-ZOO', exampleSentence: 'みずをください。', exampleTranslation: 'Please give me water.' },
            { id: 'ja-v-ocha', emoji: '🍵', nativeWord: 'おちゃ (ocha)', englishMeaning: 'Green tea', pronunciation: 'oh-CHA', exampleSentence: 'おちゃはおいしいです。', exampleTranslation: 'Green tea is delicious.' },
            { id: 'ja-v-sushi', emoji: '🍣', nativeWord: 'すし (sushi)', englishMeaning: 'Sushi', pronunciation: 'soo-SHEE', exampleSentence: 'すしが好きです。', exampleTranslation: 'I like sushi.' },
            { id: 'ja-v-oishii', emoji: '😋', nativeWord: 'おいしい (oishii)', englishMeaning: 'Delicious / Tasty', pronunciation: 'oh-ee-SHEE', exampleSentence: 'これはおいしい！', exampleTranslation: 'This is delicious!', grammarTip: 'おいしい ends in い — it is an い-adjective. No verb needed!' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'ja-g4-1', question: 'Tap the word for "Water"', options: ['おちゃ', 'みず', 'すし', 'ごはん'], answer: 'みず', explanation: 'みず (mizu) = Water.' },
            { type: 'mcq', id: 'ja-g4-2', question: '"おいしい" means:', options: ['Water', 'Rice', 'Delicious', 'Tea'], answer: 'Delicious', explanation: 'おいしい = Delicious / Tasty.' },
            { type: 'listening', id: 'ja-g4-3', phrase: 'おちゃとみず', answer: 'おちゃとみず', options: ['おちゃとみず', 'すしとごはん', 'みずとごはん', 'おちゃとすし'], explanation: 'おちゃとみず = Green tea and water.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'ja-r4-1', direction: 'to-native', question: 'Delicious', answer: 'おいしい', alternateAnswers: ['oishii'] },
            { type: 'translate', id: 'ja-r4-2', direction: 'to-english', question: 'ごはん', answer: 'Rice / Meal', alternateAnswers: ['rice', 'meal'] },
            { type: 'mcq', id: 'ja-r4-3', question: 'How do you say "Green tea"?', options: ['みず', 'すし', 'おちゃ', 'ごはん'], answer: 'おちゃ' },
          ],
          mixedExercises: [
            { type: 'match', id: 'ja-m4-1', pairs: [{ source: 'ごはん', target: 'Rice / Meal' }, { source: 'みず', target: 'Water' }, { source: 'おちゃ', target: 'Green tea' }, { source: 'すし', target: 'Sushi' }] },
            { type: 'fill', id: 'ja-m4-2', sentence: 'これは___！(This is delicious!)', answer: 'おいしい', options: ['おいしい', 'まずい', 'からい', 'あまい'] },
          ],
          quizExercises: [
            { type: 'mcq', id: 'ja-q4-1', question: '"みず" means:', options: ['Tea', 'Sushi', 'Water', 'Rice'], answer: 'Water' },
            { type: 'translate', id: 'ja-q4-2', direction: 'to-native', question: 'Sushi', answer: 'すし', alternateAnswers: ['sushi'] },
            { type: 'tap-word', id: 'ja-q4-3', question: 'Tap the Japanese for "Delicious"', options: ['みず', 'おちゃ', 'おいしい', 'ごはん'], answer: 'おいしい' },
          ],
        },
      ],
    },
  ],
};

export default japaneseCourse;
