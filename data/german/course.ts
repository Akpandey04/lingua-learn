import type { Course } from '@/types';

const germanCourse: Course = {
  language: 'german',
  units: [
    {
      id: 'de-unit1',
      title: 'Basics',
      description: 'Everyday greetings and essential phrases',
      icon: '👋',
      lessons: [
        {
          id: 'de-u1-l1',
          title: 'Greetings',
          intro: 'Learn how to greet people in German.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'de-v-hallo', emoji: '☀️', nativeWord: 'Hallo', englishMeaning: 'Hello (informal)', pronunciation: 'HAH-loh', exampleSentence: 'Hallo, wie geht es dir?', exampleTranslation: 'Hello, how are you?', usageNote: 'Casual greeting for friends.' },
            { id: 'de-v-guten-morgen', emoji: '🌅', nativeWord: 'Guten Morgen', englishMeaning: 'Good morning', pronunciation: 'GOO-ten MOR-gen', exampleSentence: 'Guten Morgen, Herr Schmidt!', exampleTranslation: 'Good morning, Mr. Schmidt!' },
            { id: 'de-v-guten-tag', emoji: '🌞', nativeWord: 'Guten Tag', englishMeaning: 'Good day / Hello (formal)', pronunciation: 'GOO-ten TAHK', exampleSentence: 'Guten Tag, wie kann ich helfen?', exampleTranslation: 'Good day, how can I help?', usageNote: 'Standard formal greeting during the day.' },
            { id: 'de-v-guten-abend', emoji: '🌆', nativeWord: 'Guten Abend', englishMeaning: 'Good evening', pronunciation: 'GOO-ten AH-bent', exampleSentence: 'Guten Abend, Frau Müller.', exampleTranslation: 'Good evening, Mrs. Müller.' },
            { id: 'de-v-tschuss', emoji: '👋', nativeWord: 'Tschüss', englishMeaning: 'Bye (informal)', pronunciation: 'CHOOS', exampleSentence: 'Tschüss, bis morgen!', exampleTranslation: 'Bye, see you tomorrow!' },
            { id: 'de-v-auf-wiedersehen', emoji: '🤝', nativeWord: 'Auf Wiedersehen', englishMeaning: 'Goodbye (formal)', pronunciation: 'owf VEE-der-zay-en', exampleSentence: 'Auf Wiedersehen, Herr Braun.', exampleTranslation: 'Goodbye, Mr. Braun.', grammarTip: 'Literally "until we see again" — use in formal settings.' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'de-g1-1', question: 'Tap the word for "Hello" (informal)', options: ['Guten Tag', 'Hallo', 'Tschüss', 'Guten Abend'], answer: 'Hallo', explanation: 'Hallo is the casual hello in German.' },
            { type: 'tap-word', id: 'de-g1-2', question: 'Tap the phrase for "Good morning"', options: ['Guten Abend', 'Guten Tag', 'Guten Morgen', 'Tschüss'], answer: 'Guten Morgen', explanation: 'Guten Morgen = Good morning.' },
            { type: 'mcq', id: 'de-g1-3', question: '"Tschüss" means:', options: ['Hello', 'Good day', 'Good evening', 'Bye'], answer: 'Bye', explanation: 'Tschüss is the casual German goodbye.' },
            { type: 'listening', id: 'de-g1-4', phrase: 'Guten Morgen', answer: 'Guten Morgen', options: ['Guten Morgen', 'Guten Abend', 'Guten Tag', 'Hallo'], explanation: 'Guten Morgen = Good morning.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'de-r1-1', direction: 'to-native', question: 'Good evening', answer: 'Guten Abend', alternateAnswers: ['guten abend'] },
            { type: 'translate', id: 'de-r1-2', direction: 'to-english', question: 'Auf Wiedersehen', answer: 'Goodbye', alternateAnswers: ['goodbye', 'farewell'] },
            { type: 'mcq', id: 'de-r1-3', question: 'Which greeting is formal?', options: ['Hallo', 'Tschüss', 'Guten Tag', 'Hey'], answer: 'Guten Tag' },
            { type: 'translate', id: 'de-r1-4', direction: 'to-native', question: 'Good morning', answer: 'Guten Morgen', alternateAnswers: ['guten morgen'] },
          ],
          mixedExercises: [
            { type: 'match', id: 'de-m1-1', pairs: [{ source: 'Hallo', target: 'Hello' }, { source: 'Guten Morgen', target: 'Good morning' }, { source: 'Tschüss', target: 'Bye' }, { source: 'Auf Wiedersehen', target: 'Goodbye (formal)' }] },
            { type: 'fill', id: 'de-m1-2', sentence: '___, wie geht es dir? (Hello, how are you?)', answer: 'Hallo', options: ['Hallo', 'Tschüss', 'Guten Abend', 'Auf Wiedersehen'] },
            { type: 'speaking', id: 'de-m1-3', prompt: 'Say "Good morning" in German', expectedPhrase: 'Guten Morgen', hint: 'Pronounced: GOO-ten MOR-gen' },
          ],
          quizExercises: [
            { type: 'translate', id: 'de-q1-1', direction: 'to-native', question: 'Good evening', answer: 'Guten Abend', alternateAnswers: ['guten abend'] },
            { type: 'mcq', id: 'de-q1-2', question: '"Auf Wiedersehen" is used:', options: ['As a morning greeting', 'For casual bye', 'As a formal goodbye', 'For good night'], answer: 'As a formal goodbye' },
            { type: 'translate', id: 'de-q1-3', direction: 'to-english', question: 'Guten Tag', answer: 'Good day', alternateAnswers: ['good day', 'hello'] },
            { type: 'tap-word', id: 'de-q1-4', question: 'Tap the informal goodbye', options: ['Guten Abend', 'Auf Wiedersehen', 'Guten Tag', 'Tschüss'], answer: 'Tschüss' },
          ],
        },
        {
          id: 'de-u1-l2',
          title: 'Please & Thank You',
          intro: 'Learn the most important polite German phrases.',
          estimatedMinutes: 7,
          vocabulary: [
            { id: 'de-v-danke', emoji: '🙏', nativeWord: 'Danke', englishMeaning: 'Thank you', pronunciation: 'DAHN-keh', exampleSentence: 'Danke schön!', exampleTranslation: 'Thank you very much!' },
            { id: 'de-v-bitte', emoji: '🤲', nativeWord: 'Bitte', englishMeaning: 'Please / You\'re welcome', pronunciation: 'BIT-teh', exampleSentence: 'Einen Kaffee, bitte.', exampleTranslation: 'A coffee, please.', grammarTip: '"Bitte" means both Please AND You\'re welcome — context tells you which.' },
            { id: 'de-v-entschuldigung', emoji: '😅', nativeWord: 'Entschuldigung', englishMeaning: 'Excuse me / Sorry', pronunciation: 'ent-SHOOL-di-goong', exampleSentence: 'Entschuldigung, wo ist der Bahnhof?', exampleTranslation: 'Excuse me, where is the train station?' },
            { id: 'de-v-ja-nein', emoji: '✅', nativeWord: 'Ja / Nein', englishMeaning: 'Yes / No', pronunciation: 'yah / nine', exampleSentence: 'Ja, ich verstehe. Nein, danke.', exampleTranslation: 'Yes, I understand. No, thank you.' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'de-g2-1', question: 'Tap the word for "Thank you"', options: ['Bitte', 'Danke', 'Entschuldigung', 'Ja'], answer: 'Danke', explanation: 'Danke = Thank you.' },
            { type: 'mcq', id: 'de-g2-2', question: '"Bitte" can mean:', options: ['Thank you only', 'Please only', 'Please AND You\'re welcome', 'Sorry only'], answer: 'Please AND You\'re welcome', explanation: 'Bitte works as both Please and You\'re welcome in German!' },
            { type: 'listening', id: 'de-g2-3', phrase: 'Danke schön', answer: 'Danke schön', options: ['Danke schön', 'Bitte schön', 'Entschuldigung', 'Ja bitte'], explanation: 'Danke schön = Thank you very much.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'de-r2-1', direction: 'to-native', question: 'Please', answer: 'Bitte', alternateAnswers: ['bitte'] },
            { type: 'translate', id: 'de-r2-2', direction: 'to-english', question: 'Entschuldigung', answer: 'Excuse me', alternateAnswers: ['sorry', 'excuse me'] },
            { type: 'mcq', id: 'de-r2-3', question: 'How do you say "Yes"?', options: ['Nein', 'Bitte', 'Ja', 'Danke'], answer: 'Ja' },
          ],
          mixedExercises: [
            { type: 'match', id: 'de-m2-1', pairs: [{ source: 'Danke', target: 'Thank you' }, { source: 'Bitte', target: 'Please / Welcome' }, { source: 'Entschuldigung', target: 'Excuse me' }, { source: 'Ja', target: 'Yes' }] },
            { type: 'fill', id: 'de-m2-2', sentence: 'Einen Kaffee, ___ ! (A coffee, please!)', answer: 'bitte', options: ['bitte', 'danke', 'ja', 'nein'] },
          ],
          quizExercises: [
            { type: 'translate', id: 'de-q2-1', direction: 'to-native', question: 'Thank you', answer: 'Danke', alternateAnswers: ['danke'] },
            { type: 'mcq', id: 'de-q2-2', question: 'What does "Bitte" mean?', options: ['Thank you', 'Please / You\'re welcome', 'Sorry', 'Yes'], answer: 'Please / You\'re welcome' },
            { type: 'translate', id: 'de-q2-3', direction: 'to-native', question: 'No', answer: 'Nein', alternateAnswers: ['nein'] },
          ],
        },
      ],
    },
    {
      id: 'de-unit2',
      title: 'Family',
      description: 'Talk about your family in German',
      icon: '👨‍👩‍👧',
      lessons: [
        {
          id: 'de-u2-l1',
          title: 'Family Members',
          intro: 'Learn German words for family members.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'de-v-mutter', emoji: '👩', nativeWord: 'die Mutter', englishMeaning: 'Mother', pronunciation: 'dee MOO-ter', exampleSentence: 'Meine Mutter heißt Anna.', exampleTranslation: 'My mother\'s name is Anna.', grammarTip: '"Die" = the (feminine). German nouns have 3 genders: der, die, das.' },
            { id: 'de-v-vater', emoji: '👨', nativeWord: 'der Vater', englishMeaning: 'Father', pronunciation: 'dair FAH-ter', exampleSentence: 'Mein Vater ist Arzt.', exampleTranslation: 'My father is a doctor.' },
            { id: 'de-v-bruder', emoji: '👦', nativeWord: 'der Bruder', englishMeaning: 'Brother', pronunciation: 'dair BROO-der', exampleSentence: 'Ich habe einen Bruder.', exampleTranslation: 'I have a brother.' },
            { id: 'de-v-schwester', emoji: '👧', nativeWord: 'die Schwester', englishMeaning: 'Sister', pronunciation: 'dee SHVES-ter', exampleSentence: 'Meine Schwester ist jünger.', exampleTranslation: 'My sister is younger.' },
            { id: 'de-v-oma', emoji: '👵', nativeWord: 'die Oma', englishMeaning: 'Grandmother (informal)', pronunciation: 'dee OH-mah', exampleSentence: 'Meine Oma backt Kuchen.', exampleTranslation: 'My grandmother bakes cake.' },
            { id: 'de-v-opa', emoji: '👴', nativeWord: 'der Opa', englishMeaning: 'Grandfather (informal)', pronunciation: 'dair OH-pah', exampleSentence: 'Mein Opa ist 80 Jahre alt.', exampleTranslation: 'My grandfather is 80 years old.' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'de-g3-1', question: 'Tap the word for "Mother"', options: ['der Vater', 'die Schwester', 'die Mutter', 'der Bruder'], answer: 'die Mutter', explanation: 'die Mutter = Mother. "Die" marks feminine nouns.' },
            { type: 'mcq', id: 'de-g3-2', question: '"der Bruder" means:', options: ['Sister', 'Father', 'Brother', 'Grandfather'], answer: 'Brother', explanation: 'der Bruder = Brother.' },
            { type: 'listening', id: 'de-g3-3', phrase: 'Meine Mutter und mein Vater', answer: 'Meine Mutter und mein Vater', options: ['Meine Mutter und mein Vater', 'Mein Bruder und meine Schwester', 'Meine Oma', 'Mein Opa'], explanation: 'Meine Mutter und mein Vater = My mother and my father.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'de-r3-1', direction: 'to-native', question: 'Sister', answer: 'die Schwester', alternateAnswers: ['schwester', 'die schwester'] },
            { type: 'translate', id: 'de-r3-2', direction: 'to-english', question: 'der Vater', answer: 'Father', alternateAnswers: ['father', 'dad'] },
            { type: 'mcq', id: 'de-r3-3', question: 'How do you say "Grandmother" informally?', options: ['die Mutter', 'die Schwester', 'die Oma', 'der Opa'], answer: 'die Oma' },
          ],
          mixedExercises: [
            { type: 'match', id: 'de-m3-1', pairs: [{ source: 'die Mutter', target: 'Mother' }, { source: 'der Vater', target: 'Father' }, { source: 'der Bruder', target: 'Brother' }, { source: 'die Schwester', target: 'Sister' }] },
            { type: 'fill', id: 'de-m3-2', sentence: 'Meine ___ ist jünger. (My sister is younger.)', answer: 'Schwester', options: ['Schwester', 'Mutter', 'Oma', 'Bruder'] },
          ],
          quizExercises: [
            { type: 'translate', id: 'de-q3-1', direction: 'to-native', question: 'Brother', answer: 'der Bruder', alternateAnswers: ['bruder', 'der bruder'] },
            { type: 'mcq', id: 'de-q3-2', question: '"die Oma" means:', options: ['Mother', 'Sister', 'Grandmother', 'Aunt'], answer: 'Grandmother' },
            { type: 'tap-word', id: 'de-q3-3', question: 'Tap the German word for "Father"', options: ['die Mutter', 'der Bruder', 'der Vater', 'die Schwester'], answer: 'der Vater' },
          ],
        },
      ],
    },
    {
      id: 'de-unit3',
      title: 'Food & Drinks',
      description: 'Order food and drinks in German',
      icon: '🍽️',
      lessons: [
        {
          id: 'de-u3-l1',
          title: 'Common Foods',
          intro: 'Learn essential German food vocabulary.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'de-v-brot', emoji: '🥖', nativeWord: 'das Brot', englishMeaning: 'Bread', pronunciation: 'dahs BROHT', exampleSentence: 'Ich möchte Brot, bitte.', exampleTranslation: 'I would like bread, please.' },
            { id: 'de-v-wasser', emoji: '💧', nativeWord: 'das Wasser', englishMeaning: 'Water', pronunciation: 'dahs VAH-ser', exampleSentence: 'Ein Glas Wasser, bitte.', exampleTranslation: 'A glass of water, please.' },
            { id: 'de-v-kaffee', emoji: '☕', nativeWord: 'der Kaffee', englishMeaning: 'Coffee', pronunciation: 'dair KAH-fay', exampleSentence: 'Ich trinke jeden Morgen Kaffee.', exampleTranslation: 'I drink coffee every morning.' },
            { id: 'de-v-milch', emoji: '🥛', nativeWord: 'die Milch', englishMeaning: 'Milk', pronunciation: 'dee MILCH', exampleSentence: 'Milch ist gesund.', exampleTranslation: 'Milk is healthy.' },
            { id: 'de-v-kase', emoji: '🧀', nativeWord: 'der Käse', englishMeaning: 'Cheese', pronunciation: 'dair KAY-zeh', exampleSentence: 'Ich liebe Käse!', exampleTranslation: 'I love cheese!' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'de-g4-1', question: 'Tap the word for "Bread"', options: ['der Kaffee', 'die Milch', 'das Brot', 'das Wasser'], answer: 'das Brot', explanation: 'das Brot = Bread.' },
            { type: 'mcq', id: 'de-g4-2', question: '"der Käse" means:', options: ['Coffee', 'Milk', 'Bread', 'Cheese'], answer: 'Cheese', explanation: 'der Käse = Cheese.' },
            { type: 'listening', id: 'de-g4-3', phrase: 'Ein Kaffee und Wasser', answer: 'Ein Kaffee und Wasser', options: ['Ein Kaffee und Wasser', 'Milch und Brot', 'Käse und Brot', 'Wasser und Milch'], explanation: 'Ein Kaffee und Wasser = A coffee and water.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'de-r4-1', direction: 'to-native', question: 'Water', answer: 'das Wasser', alternateAnswers: ['wasser'] },
            { type: 'translate', id: 'de-r4-2', direction: 'to-english', question: 'die Milch', answer: 'Milk', alternateAnswers: ['milk'] },
            { type: 'mcq', id: 'de-r4-3', question: 'How do you say "Coffee"?', options: ['das Brot', 'die Milch', 'der Kaffee', 'das Wasser'], answer: 'der Kaffee' },
          ],
          mixedExercises: [
            { type: 'match', id: 'de-m4-1', pairs: [{ source: 'das Brot', target: 'Bread' }, { source: 'das Wasser', target: 'Water' }, { source: 'der Kaffee', target: 'Coffee' }, { source: 'der Käse', target: 'Cheese' }] },
            { type: 'fill', id: 'de-m4-2', sentence: 'Ich möchte ___, bitte. (I would like coffee, please.)', answer: 'Kaffee', options: ['Kaffee', 'Brot', 'Milch', 'Wasser'] },
          ],
          quizExercises: [
            { type: 'mcq', id: 'de-q4-1', question: '"die Milch" means:', options: ['Water', 'Coffee', 'Milk', 'Bread'], answer: 'Milk' },
            { type: 'translate', id: 'de-q4-2', direction: 'to-native', question: 'Cheese', answer: 'der Käse', alternateAnswers: ['käse', 'kase'] },
            { type: 'tap-word', id: 'de-q4-3', question: 'Tap the German word for "Water"', options: ['der Kaffee', 'die Milch', 'das Brot', 'das Wasser'], answer: 'das Wasser' },
          ],
        },
      ],
    },
    {
      id: 'de-unit4',
      title: 'Travel',
      description: 'Navigate Germany with confidence',
      icon: '✈️',
      lessons: [
        {
          id: 'de-u4-l1',
          title: 'Directions',
          intro: 'Ask for and understand directions in German.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'de-v-links', emoji: '⬅️', nativeWord: 'links', englishMeaning: 'Left', pronunciation: 'links', exampleSentence: 'Biegen Sie links ab.', exampleTranslation: 'Turn left.' },
            { id: 'de-v-rechts', emoji: '➡️', nativeWord: 'rechts', englishMeaning: 'Right', pronunciation: 'rechts', exampleSentence: 'Die Bank ist rechts.', exampleTranslation: 'The bank is on the right.' },
            { id: 'de-v-geradeaus', emoji: '⬆️', nativeWord: 'geradeaus', englishMeaning: 'Straight ahead', pronunciation: 'geh-RAH-deh-ows', exampleSentence: 'Gehen Sie geradeaus.', exampleTranslation: 'Go straight ahead.' },
            { id: 'de-v-bahnhof', emoji: '🚉', nativeWord: 'der Bahnhof', englishMeaning: 'Train station', pronunciation: 'dair BAHN-hohf', exampleSentence: 'Wo ist der Bahnhof?', exampleTranslation: 'Where is the train station?' },
            { id: 'de-v-wo-ist', emoji: '🗺️', nativeWord: 'Wo ist... ?', englishMeaning: 'Where is... ?', pronunciation: 'voh ist', exampleSentence: 'Wo ist das Hotel?', exampleTranslation: 'Where is the hotel?', grammarTip: 'Wo = Where. Always followed by ist (is) then the place.' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'de-g5-1', question: 'Tap the word for "Left"', options: ['rechts', 'links', 'geradeaus', 'Bahnhof'], answer: 'links', explanation: 'links = left.' },
            { type: 'mcq', id: 'de-g5-2', question: '"geradeaus" means:', options: ['Left', 'Right', 'Straight ahead', 'Back'], answer: 'Straight ahead', explanation: 'geradeaus = straight ahead.' },
            { type: 'listening', id: 'de-g5-3', phrase: 'Gehen Sie geradeaus', answer: 'Gehen Sie geradeaus', options: ['Gehen Sie geradeaus', 'Biegen Sie links ab', 'Biegen Sie rechts ab', 'Wo ist der Bahnhof?'], explanation: 'Gehen Sie geradeaus = Go straight ahead.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'de-r5-1', direction: 'to-native', question: 'Right', answer: 'rechts', alternateAnswers: ['Rechts'] },
            { type: 'translate', id: 'de-r5-2', direction: 'to-english', question: 'der Bahnhof', answer: 'Train station', alternateAnswers: ['train station', 'station'] },
            { type: 'mcq', id: 'de-r5-3', question: 'How do you ask "Where is the hotel?"', options: ['Wo ist das Hotel?', 'Gehen Sie links.', 'Der Bahnhof ist rechts.', 'Geradeaus, bitte.'], answer: 'Wo ist das Hotel?' },
          ],
          mixedExercises: [
            { type: 'match', id: 'de-m5-1', pairs: [{ source: 'links', target: 'left' }, { source: 'rechts', target: 'right' }, { source: 'geradeaus', target: 'straight' }, { source: 'der Bahnhof', target: 'train station' }] },
            { type: 'speaking', id: 'de-m5-2', prompt: 'Ask "Where is the train station?"', expectedPhrase: 'Wo ist der Bahnhof' },
          ],
          quizExercises: [
            { type: 'translate', id: 'de-q5-1', direction: 'to-native', question: 'Left', answer: 'links', alternateAnswers: ['Links'] },
            { type: 'mcq', id: 'de-q5-2', question: '"der Bahnhof" means:', options: ['Airport', 'Hotel', 'Train station', 'Street'], answer: 'Train station' },
            { type: 'translate', id: 'de-q5-3', direction: 'to-english', question: 'geradeaus', answer: 'Straight ahead', alternateAnswers: ['straight', 'straight ahead'] },
            { type: 'tap-word', id: 'de-q5-4', question: 'Tap the German for "Right"', options: ['links', 'geradeaus', 'rechts', 'Bahnhof'], answer: 'rechts' },
          ],
        },
      ],
    },
  ],
};

export default germanCourse;
