import type { Course } from '@/types';

const spanishCourse: Course = {
  language: 'spanish',
  units: [
    {
      id: 'es-unit1',
      title: 'Basics',
      description: 'Everyday greetings and essential phrases',
      icon: '👋',
      lessons: [
        {
          id: 'es-u1-l1',
          title: 'Greetings',
          intro: 'Learn how to greet people in Spanish.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'es-v-hola', emoji: '☀️', nativeWord: 'Hola', englishMeaning: 'Hello / Hi', pronunciation: 'OH-lah', exampleSentence: 'Hola, ¿cómo estás?', exampleTranslation: 'Hello, how are you?', usageNote: 'Universal greeting — formal or informal.' },
            { id: 'es-v-buenos-dias', emoji: '🌅', nativeWord: 'Buenos días', englishMeaning: 'Good morning', pronunciation: 'BWEH-nos DEE-as', exampleSentence: 'Buenos días, señor García.', exampleTranslation: 'Good morning, Mr. García.' },
            { id: 'es-v-buenas-tardes', emoji: '🌇', nativeWord: 'Buenas tardes', englishMeaning: 'Good afternoon', pronunciation: 'BWEH-nas TAR-des', exampleSentence: 'Buenas tardes, ¿en qué puedo ayudar?', exampleTranslation: 'Good afternoon, how can I help?' },
            { id: 'es-v-buenas-noches', emoji: '🌙', nativeWord: 'Buenas noches', englishMeaning: 'Good evening / Good night', pronunciation: 'BWEH-nas NOH-ches', exampleSentence: 'Buenas noches, hasta mañana.', exampleTranslation: 'Good night, see you tomorrow.' },
            { id: 'es-v-adios', emoji: '👋', nativeWord: 'Adiós', englishMeaning: 'Goodbye', pronunciation: 'ah-dee-OHS', exampleSentence: 'Adiós, que tengas un buen día.', exampleTranslation: 'Goodbye, have a good day.' },
            { id: 'es-v-hasta-luego', emoji: '🤝', nativeWord: 'Hasta luego', englishMeaning: 'See you later', pronunciation: 'AHS-tah LWEH-go', exampleSentence: 'Hasta luego, nos vemos.', exampleTranslation: 'See you later, see you soon.', grammarTip: '"Hasta" = until. "Luego" = later. Literally "Until later".' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'es-g1-1', question: 'Tap the word for "Hello"', options: ['Adiós', 'Hola', 'Buenos días', 'Buenas noches'], answer: 'Hola', explanation: 'Hola = Hello — works at any time of day.' },
            { type: 'tap-word', id: 'es-g1-2', question: 'Tap the phrase for "Good morning"', options: ['Buenas tardes', 'Buenas noches', 'Buenos días', 'Hasta luego'], answer: 'Buenos días', explanation: 'Buenos días = Good morning.' },
            { type: 'mcq', id: 'es-g1-3', question: '"Hasta luego" means:', options: ['Goodbye forever', 'Good morning', 'See you later', 'Good night'], answer: 'See you later', explanation: 'Hasta luego = See you later, literally "until later".' },
            { type: 'listening', id: 'es-g1-4', phrase: 'Buenos días', answer: 'Buenos días', options: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hola'], explanation: 'Buenos días = Good morning.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'es-r1-1', direction: 'to-native', question: 'Good evening', answer: 'Buenas noches', alternateAnswers: ['buenas noches'] },
            { type: 'translate', id: 'es-r1-2', direction: 'to-english', question: 'Adiós', answer: 'Goodbye', alternateAnswers: ['goodbye', 'bye'] },
            { type: 'mcq', id: 'es-r1-3', question: 'Which phrase means "Good afternoon"?', options: ['Hola', 'Buenos días', 'Buenas noches', 'Buenas tardes'], answer: 'Buenas tardes' },
            { type: 'translate', id: 'es-r1-4', direction: 'to-native', question: 'Hello', answer: 'Hola', alternateAnswers: ['hola'] },
          ],
          mixedExercises: [
            { type: 'match', id: 'es-m1-1', pairs: [{ source: 'Hola', target: 'Hello' }, { source: 'Buenos días', target: 'Good morning' }, { source: 'Adiós', target: 'Goodbye' }, { source: 'Hasta luego', target: 'See you later' }] },
            { type: 'fill', id: 'es-m1-2', sentence: '___, ¿cómo estás? (Hello, how are you?)', answer: 'Hola', options: ['Hola', 'Adiós', 'Buenos días', 'Buenas noches'] },
            { type: 'speaking', id: 'es-m1-3', prompt: 'Say "Good morning" in Spanish', expectedPhrase: 'Buenos días', hint: 'Pronounced: BWEH-nos DEE-as' },
          ],
          quizExercises: [
            { type: 'translate', id: 'es-q1-1', direction: 'to-native', question: 'Good night', answer: 'Buenas noches', alternateAnswers: ['buenas noches'] },
            { type: 'mcq', id: 'es-q1-2', question: '"Buenos días" is used:', options: ['In the evening', 'At night', 'In the morning', 'For goodbye'], answer: 'In the morning' },
            { type: 'translate', id: 'es-q1-3', direction: 'to-english', question: 'Hasta luego', answer: 'See you later', alternateAnswers: ['see you later', 'until later'] },
            { type: 'tap-word', id: 'es-q1-4', question: 'Tap the Spanish for "Goodbye"', options: ['Hola', 'Buenos días', 'Buenas tardes', 'Adiós'], answer: 'Adiós' },
          ],
        },
        {
          id: 'es-u1-l2',
          title: 'Please & Thank You',
          intro: 'Master the most important polite phrases in Spanish.',
          estimatedMinutes: 7,
          vocabulary: [
            { id: 'es-v-gracias', emoji: '🙏', nativeWord: 'Gracias', englishMeaning: 'Thank you', pronunciation: 'GRAH-see-as', exampleSentence: 'Muchas gracias por tu ayuda.', exampleTranslation: 'Thank you very much for your help.' },
            { id: 'es-v-por-favor', emoji: '🤲', nativeWord: 'Por favor', englishMeaning: 'Please', pronunciation: 'por fah-VOR', exampleSentence: 'Un café, por favor.', exampleTranslation: 'A coffee, please.', grammarTip: 'Por favor = "For a favor" — always goes at the end of a request.' },
            { id: 'es-v-de-nada', emoji: '😌', nativeWord: 'De nada', englishMeaning: "You're welcome", pronunciation: 'deh NAH-dah', exampleSentence: '— Gracias! — De nada.', exampleTranslation: '— Thank you! — You\'re welcome.' },
            { id: 'es-v-perdon', emoji: '😅', nativeWord: 'Perdón', englishMeaning: 'Sorry / Excuse me', pronunciation: 'pair-DOHN', exampleSentence: 'Perdón, ¿habla inglés?', exampleTranslation: 'Excuse me, do you speak English?' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'es-g2-1', question: 'Tap the word for "Thank you"', options: ['Por favor', 'Gracias', 'De nada', 'Perdón'], answer: 'Gracias', explanation: 'Gracias = Thank you.' },
            { type: 'mcq', id: 'es-g2-2', question: 'Someone says "Gracias!" — you reply:', options: ['Perdón', 'De nada', 'Por favor', 'Hola'], answer: 'De nada', explanation: 'De nada = You\'re welcome — the reply to Gracias.' },
            { type: 'listening', id: 'es-g2-3', phrase: 'Muchas gracias', answer: 'Muchas gracias', options: ['Muchas gracias', 'De nada', 'Por favor', 'Perdón'], explanation: 'Muchas gracias = Thank you very much.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'es-r2-1', direction: 'to-native', question: 'Please', answer: 'Por favor', alternateAnswers: ['por favor'] },
            { type: 'translate', id: 'es-r2-2', direction: 'to-english', question: 'Perdón', answer: 'Sorry / Excuse me', alternateAnswers: ['sorry', 'excuse me', 'pardon'] },
            { type: 'mcq', id: 'es-r2-3', question: 'How do you say "You\'re welcome"?', options: ['Gracias', 'Por favor', 'De nada', 'Perdón'], answer: 'De nada' },
          ],
          mixedExercises: [
            { type: 'match', id: 'es-m2-1', pairs: [{ source: 'Gracias', target: 'Thank you' }, { source: 'Por favor', target: 'Please' }, { source: 'De nada', target: "You're welcome" }, { source: 'Perdón', target: 'Sorry' }] },
            { type: 'fill', id: 'es-m2-2', sentence: 'Un café, ___ . (A coffee, please.)', answer: 'por favor', options: ['por favor', 'gracias', 'de nada', 'perdón'] },
          ],
          quizExercises: [
            { type: 'translate', id: 'es-q2-1', direction: 'to-native', question: 'Thank you', answer: 'Gracias', alternateAnswers: ['gracias'] },
            { type: 'mcq', id: 'es-q2-2', question: '"De nada" means:', options: ['Thank you', 'Please', "You're welcome", 'Sorry'], answer: "You're welcome" },
            { type: 'translate', id: 'es-q2-3', direction: 'to-native', question: 'Please', answer: 'Por favor', alternateAnswers: ['por favor'] },
          ],
        },
      ],
    },
    {
      id: 'es-unit2',
      title: 'Family',
      description: 'Talk about your family in Spanish',
      icon: '👨‍👩‍👧',
      lessons: [
        {
          id: 'es-u2-l1',
          title: 'Family Members',
          intro: 'Learn Spanish words for family members.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'es-v-madre', emoji: '👩', nativeWord: 'la madre', englishMeaning: 'Mother', pronunciation: 'lah MAH-dreh', exampleSentence: 'Mi madre se llama Carmen.', exampleTranslation: 'My mother\'s name is Carmen.', grammarTip: '"Mi" = my. Spanish nouns are masculine or feminine.' },
            { id: 'es-v-padre', emoji: '👨', nativeWord: 'el padre', englishMeaning: 'Father', pronunciation: 'el PAH-dreh', exampleSentence: 'Mi padre es médico.', exampleTranslation: 'My father is a doctor.' },
            { id: 'es-v-hermano', emoji: '👦', nativeWord: 'el hermano', englishMeaning: 'Brother', pronunciation: 'el air-MAH-no', exampleSentence: 'Tengo un hermano mayor.', exampleTranslation: 'I have an older brother.' },
            { id: 'es-v-hermana', emoji: '👧', nativeWord: 'la hermana', englishMeaning: 'Sister', pronunciation: 'lah air-MAH-nah', exampleSentence: 'Mi hermana estudia medicina.', exampleTranslation: 'My sister studies medicine.' },
            { id: 'es-v-abuela', emoji: '👵', nativeWord: 'la abuela', englishMeaning: 'Grandmother', pronunciation: 'lah ah-BWEH-lah', exampleSentence: 'Mi abuela hace tamales.', exampleTranslation: 'My grandmother makes tamales.' },
            { id: 'es-v-abuelo', emoji: '👴', nativeWord: 'el abuelo', englishMeaning: 'Grandfather', pronunciation: 'el ah-BWEH-lo', exampleSentence: 'Mi abuelo tiene 75 años.', exampleTranslation: 'My grandfather is 75 years old.' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'es-g3-1', question: 'Tap the word for "Mother"', options: ['el padre', 'la hermana', 'la madre', 'el hermano'], answer: 'la madre', explanation: 'la madre = Mother.' },
            { type: 'mcq', id: 'es-g3-2', question: '"el hermano" means:', options: ['Sister', 'Father', 'Brother', 'Grandfather'], answer: 'Brother', explanation: 'el hermano = Brother.' },
            { type: 'listening', id: 'es-g3-3', phrase: 'Mi madre y mi padre', answer: 'Mi madre y mi padre', options: ['Mi madre y mi padre', 'Mi hermano y mi hermana', 'Mi abuela', 'Mi abuelo'], explanation: 'Mi madre y mi padre = My mother and my father.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'es-r3-1', direction: 'to-native', question: 'Sister', answer: 'la hermana', alternateAnswers: ['hermana', 'la hermana'] },
            { type: 'translate', id: 'es-r3-2', direction: 'to-english', question: 'el padre', answer: 'Father', alternateAnswers: ['father', 'dad'] },
            { type: 'mcq', id: 'es-r3-3', question: 'How do you say "Grandmother"?', options: ['la madre', 'la hermana', 'la abuela', 'el padre'], answer: 'la abuela' },
          ],
          mixedExercises: [
            { type: 'match', id: 'es-m3-1', pairs: [{ source: 'la madre', target: 'Mother' }, { source: 'el padre', target: 'Father' }, { source: 'el hermano', target: 'Brother' }, { source: 'la hermana', target: 'Sister' }] },
            { type: 'fill', id: 'es-m3-2', sentence: 'Mi ___ estudia medicina. (My sister studies medicine.)', answer: 'hermana', options: ['hermana', 'madre', 'abuela', 'hermano'] },
          ],
          quizExercises: [
            { type: 'translate', id: 'es-q3-1', direction: 'to-native', question: 'Brother', answer: 'el hermano', alternateAnswers: ['hermano'] },
            { type: 'mcq', id: 'es-q3-2', question: '"la abuela" means:', options: ['Mother', 'Sister', 'Grandmother', 'Aunt'], answer: 'Grandmother' },
            { type: 'tap-word', id: 'es-q3-3', question: 'Tap the Spanish for "Father"', options: ['la madre', 'el hermano', 'el padre', 'la hermana'], answer: 'el padre' },
          ],
        },
      ],
    },
    {
      id: 'es-unit3',
      title: 'Food & Drinks',
      description: 'Order food and drinks in Spanish',
      icon: '🍽️',
      lessons: [
        {
          id: 'es-u3-l1',
          title: 'Common Foods',
          intro: 'Learn essential Spanish food vocabulary.',
          estimatedMinutes: 8,
          vocabulary: [
            { id: 'es-v-pan', emoji: '🥖', nativeWord: 'el pan', englishMeaning: 'Bread', pronunciation: 'el PAN', exampleSentence: 'Quiero pan, por favor.', exampleTranslation: 'I want bread, please.' },
            { id: 'es-v-agua', emoji: '💧', nativeWord: 'el agua', englishMeaning: 'Water', pronunciation: 'el AH-gwah', exampleSentence: 'Una botella de agua, por favor.', exampleTranslation: 'A bottle of water, please.', grammarTip: '"Agua" is feminine but uses "el" — exception to the rule!' },
            { id: 'es-v-cafe', emoji: '☕', nativeWord: 'el café', englishMeaning: 'Coffee', pronunciation: 'el kah-FEH', exampleSentence: 'Un café con leche.', exampleTranslation: 'A coffee with milk.' },
            { id: 'es-v-leche', emoji: '🥛', nativeWord: 'la leche', englishMeaning: 'Milk', pronunciation: 'lah LEH-cheh', exampleSentence: 'La leche es buena para los huesos.', exampleTranslation: 'Milk is good for bones.' },
            { id: 'es-v-queso', emoji: '🧀', nativeWord: 'el queso', englishMeaning: 'Cheese', pronunciation: 'el KEH-so', exampleSentence: 'España tiene queso manchego.', exampleTranslation: 'Spain has Manchego cheese.' },
          ],
          guidedExercises: [
            { type: 'tap-word', id: 'es-g4-1', question: 'Tap the word for "Bread"', options: ['el café', 'la leche', 'el pan', 'el agua'], answer: 'el pan', explanation: 'el pan = Bread.' },
            { type: 'mcq', id: 'es-g4-2', question: '"el queso" means:', options: ['Coffee', 'Milk', 'Bread', 'Cheese'], answer: 'Cheese', explanation: 'el queso = Cheese.' },
            { type: 'listening', id: 'es-g4-3', phrase: 'Un café y agua', answer: 'Un café y agua', options: ['Un café y agua', 'Leche y pan', 'Queso y pan', 'Agua y leche'], explanation: 'Un café y agua = A coffee and water.' },
          ],
          recallExercises: [
            { type: 'translate', id: 'es-r4-1', direction: 'to-native', question: 'Water', answer: 'el agua', alternateAnswers: ['agua'] },
            { type: 'translate', id: 'es-r4-2', direction: 'to-english', question: 'la leche', answer: 'Milk', alternateAnswers: ['milk'] },
            { type: 'mcq', id: 'es-r4-3', question: 'How do you say "Coffee"?', options: ['el pan', 'la leche', 'el café', 'el agua'], answer: 'el café' },
          ],
          mixedExercises: [
            { type: 'match', id: 'es-m4-1', pairs: [{ source: 'el pan', target: 'Bread' }, { source: 'el agua', target: 'Water' }, { source: 'el café', target: 'Coffee' }, { source: 'el queso', target: 'Cheese' }] },
            { type: 'fill', id: 'es-m4-2', sentence: 'Quiero ___, por favor. (I want coffee, please.)', answer: 'café', options: ['café', 'pan', 'leche', 'agua'] },
          ],
          quizExercises: [
            { type: 'mcq', id: 'es-q4-1', question: '"la leche" means:', options: ['Water', 'Coffee', 'Milk', 'Bread'], answer: 'Milk' },
            { type: 'translate', id: 'es-q4-2', direction: 'to-native', question: 'Cheese', answer: 'el queso', alternateAnswers: ['queso'] },
            { type: 'tap-word', id: 'es-q4-3', question: 'Tap the Spanish for "Water"', options: ['el café', 'la leche', 'el pan', 'el agua'], answer: 'el agua' },
          ],
        },
      ],
    },
  ],
};

export default spanishCourse;
