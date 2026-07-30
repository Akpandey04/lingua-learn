import type { GrammarHint, LanguageCode } from '@/types';

export const GRAMMAR_HINTS: Record<LanguageCode, GrammarHint[]> = {
  french: [
    {
      title: 'Gendered Nouns',
      explanation:
        'Every noun in French is either masculine (le/un) or feminine (la/une). There\'s no neuter. You must memorize the gender with each word.',
      examples: ['le garçon (the boy)', 'la fille (the girl)', 'le livre (the book)', 'la table (the table)'],
    },
    {
      title: 'The Verb "Être" (To Be)',
      explanation: 'Être is one of the most important French verbs. It is irregular and must be memorized.',
      examples: [
        'Je suis (I am)',
        'Tu es (You are)',
        'Il/Elle est (He/She is)',
        'Nous sommes (We are)',
        'Vous êtes (You are – formal/plural)',
        'Ils/Elles sont (They are)',
      ],
    },
    {
      title: 'Negation with "Ne...Pas"',
      explanation: 'To make a sentence negative in French, wrap the verb with "ne" before and "pas" after.',
      examples: [
        'Je parle (I speak) → Je ne parle pas (I do not speak)',
        'Il mange (He eats) → Il ne mange pas (He does not eat)',
      ],
    },
    {
      title: 'Adjective Agreement',
      explanation: 'In French, adjectives must agree in gender and number with the nouns they describe.',
      examples: [
        'un grand garçon (a tall boy)',
        'une grande fille (a tall girl)',
        'des grands garçons (tall boys)',
        'des grandes filles (tall girls)',
      ],
    },
    {
      title: 'Question Words',
      explanation: 'Common question words to know in French.',
      examples: [
        'Qui? (Who?)',
        'Quoi / Qu\'est-ce que? (What?)',
        'Où? (Where?)',
        'Quand? (When?)',
        'Comment? (How?)',
        'Pourquoi? (Why?)',
        'Combien? (How many/much?)',
      ],
    },
  ],
  german: [
    {
      title: 'German Cases (Nominative & Accusative)',
      explanation:
        'German has 4 cases. The nominative is for the subject; the accusative is for the direct object. Articles change depending on case.',
      examples: [
        'Der Mann liest (The man reads) – Nominative',
        'Ich sehe den Mann (I see the man) – Accusative',
        'der → den (masculine accusative)',
      ],
    },
    {
      title: 'Three Genders',
      explanation: 'German nouns have three genders: masculine (der), feminine (die), and neuter (das).',
      examples: [
        'der Mann (the man) – masculine',
        'die Frau (the woman) – feminine',
        'das Kind (the child) – neuter',
        'die Kinder (the children) – plural uses "die"',
      ],
    },
    {
      title: 'Verb Conjugation (Present Tense)',
      explanation: 'German verbs change their endings based on the subject. Regular verbs follow a pattern.',
      examples: [
        'ich mache (I do)',
        'du machst (you do)',
        'er/sie macht (he/she does)',
        'wir machen (we do)',
        'ihr macht (you all do)',
        'sie machen (they do)',
      ],
    },
    {
      title: 'Modal Verbs',
      explanation: 'Modal verbs express ability, obligation, or permission. They pair with an infinitive at the end.',
      examples: [
        'Ich kann schwimmen. (I can swim.)',
        'Du musst lernen. (You must learn.)',
        'Er will schlafen. (He wants to sleep.)',
        'Wir dürfen gehen. (We are allowed to go.)',
      ],
    },
  ],
  spanish: [
    {
      title: 'Ser vs. Estar (Both = "To Be")',
      explanation:
        'Spanish has two verbs for "to be". Ser is used for permanent traits; Estar is used for temporary states.',
      examples: [
        'Soy médico. (I am a doctor.) – permanent',
        'Estoy cansado. (I am tired.) – temporary',
        'Ella es inteligente. (She is intelligent.) – trait',
        'Ella está feliz. (She is happy.) – mood',
      ],
    },
    {
      title: 'Gender of Nouns',
      explanation: 'Spanish nouns are either masculine (el/un) or feminine (la/una). Most -o nouns are masculine; most -a nouns are feminine.',
      examples: [
        'el libro (the book) – masculine',
        'la mesa (the table) – feminine',
        'el problema (the problem) – exception! masculine despite -a',
      ],
    },
    {
      title: 'Present Tense Regular Verbs',
      explanation: 'Regular -AR verbs follow a predictable pattern.',
      examples: [
        'hablar (to speak):',
        'yo hablo (I speak)',
        'tú hablas (you speak)',
        'él/ella habla (he/she speaks)',
        'nosotros hablamos (we speak)',
        'ellos hablan (they speak)',
      ],
    },
    {
      title: 'Tú vs. Usted',
      explanation:
        'Spanish has informal (tú) and formal (usted) ways to say "you". Use tú with friends; usted with strangers or in formal settings.',
      examples: [
        '¿Cómo te llamas? (What\'s your name? – informal)',
        '¿Cómo se llama usted? (What\'s your name? – formal)',
      ],
    },
  ],
  japanese: [
    {
      title: 'Sentence Structure: SOV',
      explanation:
        'Japanese sentences follow Subject-Object-Verb order, unlike English (SVO). The verb always goes at the end.',
      examples: [
        'English: I eat sushi.',
        'Japanese: 私は寿司を食べます。',
        '(Watashi wa sushi wo tabemasu.)',
        'Literally: I [topic] sushi [object] eat.',
      ],
    },
    {
      title: 'Particles',
      explanation:
        'Particles are small words that mark the grammatical role of words. Key particles: は (wa) = topic, を (wo) = object, に (ni) = location/direction, が (ga) = subject.',
      examples: [
        '私は学生です。(I am a student.) – は marks topic',
        'りんごを食べる。(Eat an apple.) – を marks object',
        '東京に行く。(Go to Tokyo.) – に marks direction',
      ],
    },
    {
      title: 'Polite Form (です/ます)',
      explanation:
        'Japanese has polite and casual speech. Adding です (desu) after nouns/adjectives makes them polite. Verb ます (masu) form is polite.',
      examples: [
        'Casual: 学生だ (I\'m a student)',
        'Polite: 学生です (I am a student)',
        'Casual: 食べる (eat)',
        'Polite: 食べます (eat – polite)',
      ],
    },
    {
      title: 'Hiragana vs. Katakana vs. Kanji',
      explanation:
        'Japanese uses three writing systems. Hiragana is for native words, Katakana is for foreign words, and Kanji are Chinese-origin characters.',
      examples: [
        'さくら (sakura) – Hiragana',
        'コーヒー (kōhī = coffee) – Katakana',
        '桜 (sakura = cherry blossom) – Kanji',
      ],
    },
  ],
};
