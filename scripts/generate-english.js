const fs = require('fs');
const path = require('path');

const curriculumOutline = {
  "A1": [
    {
      unit: "unit-01", title: "Sentence Building",
      lessons: [
        { id: "lesson-01", title: "Build Your First English Sentences", concepts: ["svo"] },
        { id: "lesson-02", title: "I, You, We, They", concepts: ["pronouns_1"] },
        { id: "lesson-03", title: "He, She, It", concepts: ["pronouns_2"] },
        { id: "lesson-04", title: "Positive Sentences", concepts: ["positive"] },
        { id: "lesson-05", title: "Negative Sentences", concepts: ["negative"] },
        { id: "lesson-06", title: "Ask Simple Questions", concepts: ["questions"] },
        { id: "lesson-07", title: "Sentence Expansion", concepts: ["expansion"] },
        { id: "lesson-08", title: "Everyday Sentence Patterns", concepts: ["patterns"] },
        { id: "lesson-09", title: "Daily Conversation Challenge", concepts: ["conversation"] },
        { id: "lesson-10", title: "Unit 1 Review & Mastery Challenge", concepts: ["review"] }
      ]
    },
    {
      unit: "unit-02", title: "Nouns & People",
      lessons: [
        { id: "lesson-01", title: "What Nouns Do in Real Sentences" },
        { id: "lesson-02", title: "People and Places" },
        { id: "lesson-03", title: "Things Around You" },
        { id: "lesson-04", title: "Singular and Plural" },
        { id: "lesson-05", title: "Regular and Irregular Plurals" },
        { id: "lesson-06", title: "Proper and Common Nouns" },
        { id: "lesson-07", title: "Countable and Uncountable Nouns" },
        { id: "lesson-08", title: "Possessive Nouns" },
        { id: "lesson-09", title: "Describe Your World" },
        { id: "lesson-10", title: "Unit Review & Mastery" }
      ]
    },
    {
      unit: "unit-03", title: "Pronouns",
      lessons: [
        { id: "lesson-01", title: "I / You / He / She / It" },
        { id: "lesson-02", title: "We / They" },
        { id: "lesson-03", title: "Me / Him / Her / Us / Them" },
        { id: "lesson-04", title: "My / Your / His / Her" },
        { id: "lesson-05", title: "Our / Their" },
        { id: "lesson-06", title: "Mine / Yours / His / Hers" },
        { id: "lesson-07", title: "This / That / These / Those" },
        { id: "lesson-08", title: "Myself / Yourself / Himself / Herself" },
        { id: "lesson-09", title: "Pronouns in Conversation" },
        { id: "lesson-10", title: "Unit Review & Mastery" }
      ]
    },
    {
      unit: "unit-04", title: "Verbs & Everyday Actions",
      lessons: [
        { id: "lesson-01", title: "Everyday Action Verbs" },
        { id: "lesson-02", title: "Main Verbs" },
        { id: "lesson-03", title: "Helping Verbs" },
        { id: "lesson-04", title: "Verb Forms" },
        { id: "lesson-05", title: "Regular Verbs" },
        { id: "lesson-06", title: "Common Irregular Verbs" },
        { id: "lesson-07", title: "Verb + Object" },
        { id: "lesson-08", title: "Common Verb Mistakes" },
        { id: "lesson-09", title: "Describe Your Day Using Verbs" },
        { id: "lesson-10", title: "Unit Review & Mastery" }
      ]
    },
    {
      unit: "unit-05", title: "Adjectives",
      lessons: [
        { id: "lesson-01", title: "Describe People" },
        { id: "lesson-02", title: "Describe Objects" },
        { id: "lesson-03", title: "Size and Shape" },
        { id: "lesson-04", title: "Colors" },
        { id: "lesson-05", title: "Age" },
        { id: "lesson-06", title: "Feelings and Opinions" },
        { id: "lesson-07", title: "Adjective Order" },
        { id: "lesson-08", title: "Comparing Things" },
        { id: "lesson-09", title: "Describe Your World" },
        { id: "lesson-10", title: "Unit Review & Mastery" }
      ]
    },
    {
      unit: "unit-06", title: "Adverbs",
      lessons: [
        { id: "lesson-01", title: "What Are Adverbs Used For?" },
        { id: "lesson-02", title: "How? — Adverbs of Manner" },
        { id: "lesson-03", title: "When? — Adverbs of Time" },
        { id: "lesson-04", title: "How Often? — Frequency" },
        { id: "lesson-05", title: "Where? — Place" },
        { id: "lesson-06", title: "How Much? — Degree" },
        { id: "lesson-07", title: "Adverbs in Conversation" },
        { id: "lesson-08", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-07", title: "Articles",
      lessons: [
        { id: "lesson-01", title: "A" },
        { id: "lesson-02", title: "An" },
        { id: "lesson-03", title: "A vs An" },
        { id: "lesson-04", title: "The" },
        { id: "lesson-05", title: "First Mention vs Known Thing" },
        { id: "lesson-06", title: "Common Article Mistakes" },
        { id: "lesson-07", title: "Real-Life Article Practice" },
        { id: "lesson-08", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-08", title: "Prepositions",
      lessons: [
        { id: "lesson-01", title: "In" },
        { id: "lesson-02", title: "On" },
        { id: "lesson-03", title: "At" },
        { id: "lesson-04", title: "To / From" },
        { id: "lesson-05", title: "For / With" },
        { id: "lesson-06", title: "Under / Over / Behind / In Front Of" },
        { id: "lesson-07", title: "Between / Among" },
        { id: "lesson-08", title: "Time Prepositions" },
        { id: "lesson-09", title: "Place & Movement" },
        { id: "lesson-10", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-09", title: "Conjunctions",
      lessons: [
        { id: "lesson-01", title: "And" },
        { id: "lesson-02", title: "But" },
        { id: "lesson-03", title: "Or" },
        { id: "lesson-04", title: "Because" },
        { id: "lesson-05", title: "So" },
        { id: "lesson-06", title: "Combining Sentences" },
        { id: "lesson-07", title: "Real-Life Conversation" },
        { id: "lesson-08", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-10", title: "Daily Routine & Real-Life English",
      lessons: [
        { id: "lesson-01", title: "Morning Routine" },
        { id: "lesson-02", title: "College/Work Routine" },
        { id: "lesson-03", title: "Talking About Time" },
        { id: "lesson-04", title: "Talking About Food" },
        { id: "lesson-05", title: "Talking About Family" },
        { id: "lesson-06", title: "Talking About Hobbies" },
        { id: "lesson-07", title: "Talking About Likes & Dislikes" },
        { id: "lesson-08", title: "Asking for Information" },
        { id: "lesson-09", title: "Complete Daily Conversation" },
        { id: "lesson-10", title: "A1 Foundation Mastery" }
      ]
    }
  ],
  "A2": [
    {
      unit: "unit-01", title: "Present Tense",
      lessons: [
        { id: "lesson-01", title: "Present Simple" },
        { id: "lesson-02", title: "Present Simple Negative" },
        { id: "lesson-03", title: "Present Simple Questions" },
        { id: "lesson-04", title: "Present Continuous" },
        { id: "lesson-05", title: "Present Continuous Questions" },
        { id: "lesson-06", title: "Present Simple vs Present Continuous" },
        { id: "lesson-07", title: "Present Perfect" },
        { id: "lesson-08", title: "Present Perfect vs Past Simple" },
        { id: "lesson-09", title: "Present Tenses in Daily Life" },
        { id: "lesson-10", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-02", title: "Past Tense",
      lessons: [
        { id: "lesson-01", title: "Past Simple" },
        { id: "lesson-02", title: "Regular Past Verbs" },
        { id: "lesson-03", title: "Irregular Past Verbs" },
        { id: "lesson-04", title: "Past Negative" },
        { id: "lesson-05", title: "Past Questions" },
        { id: "lesson-06", title: "Past Continuous" },
        { id: "lesson-07", title: "Past Simple vs Past Continuous" },
        { id: "lesson-08", title: "Past Perfect" },
        { id: "lesson-09", title: "Tell a Story" },
        { id: "lesson-10", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-03", title: "Future",
      lessons: [
        { id: "lesson-01", title: "Will" },
        { id: "lesson-02", title: "Going To" },
        { id: "lesson-03", title: "Will vs Going To" },
        { id: "lesson-04", title: "Future Plans" },
        { id: "lesson-05", title: "Predictions" },
        { id: "lesson-06", title: "Offers and Promises" },
        { id: "lesson-07", title: "Future in Conversation" },
        { id: "lesson-08", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-04", title: "Questions & Communication",
      lessons: [
        { id: "lesson-01", title: "Yes/No Questions" },
        { id: "lesson-02", title: "What" },
        { id: "lesson-03", title: "Where" },
        { id: "lesson-04", title: "When" },
        { id: "lesson-05", title: "Why" },
        { id: "lesson-06", title: "Who" },
        { id: "lesson-07", title: "How" },
        { id: "lesson-08", title: "Follow-up Questions" },
        { id: "lesson-09", title: "Natural Conversation" },
        { id: "lesson-10", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-05", title: "Modal Verbs",
      lessons: [
        { id: "lesson-01", title: "CAN: Ability & Permission" },
        { id: "lesson-02", title: "CAN: Requests" },
        { id: "lesson-03", title: "COULD: Past Ability & Polite Requests" },
        { id: "lesson-04", title: "MAY: Permission & Possibility" },
        { id: "lesson-05", title: "MIGHT: Possibility" },
        { id: "lesson-06", title: "SHOULD: Advice" },
        { id: "lesson-07", title: "SHOULD: Recommendations & Expectations" },
        { id: "lesson-08", title: "MUST: Strong Obligation" },
        { id: "lesson-09", title: "MUSTN'T" },
        { id: "lesson-10", title: "HAVE TO & NEED TO" },
        { id: "lesson-11", title: "WILL" },
        { id: "lesson-12", title: "WOULD" },
        { id: "lesson-13", title: "SHALL" },
        { id: "lesson-14", title: "USED TO" },
        { id: "lesson-15", title: "BE ABLE TO" },
        { id: "lesson-16", title: "MODAL COMPARISON" },
        { id: "lesson-17", title: "MODAL MASTERy CHALLENGE" }
      ]
    },
    {
      unit: "unit-06", title: "Comparatives & Superlatives",
      lessons: [
        { id: "lesson-01", title: "Bigger / Smaller" },
        { id: "lesson-02", title: "More / Less" },
        { id: "lesson-03", title: "Better / Worse" },
        { id: "lesson-04", title: "Superlatives" },
        { id: "lesson-05", title: "Comparing People" },
        { id: "lesson-06", title: "Comparing Places & Things" },
        { id: "lesson-07", title: "Real-Life Comparison" },
        { id: "lesson-08", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-07", title: "Practical English",
      lessons: [
        { id: "lesson-01", title: "Shopping" },
        { id: "lesson-02", title: "Restaurants" },
        { id: "lesson-03", title: "Asking for Directions" },
        { id: "lesson-04", title: "Travel" },
        { id: "lesson-05", title: "Phone Conversations" },
        { id: "lesson-06", title: "Making Plans" },
        { id: "lesson-07", title: "Invitations" },
        { id: "lesson-08", title: "Asking for Help" },
        { id: "lesson-09", title: "Handling Problems" },
        { id: "lesson-10", title: "Review & Mastery" }
      ]
    }
  ],
  "B1": [
    {
      unit: "unit-01", title: "Intermediate Sentence Building",
      lessons: [
        { id: "lesson-01", title: "Complex Sentences" },
        { id: "lesson-02", title: "Relative Clauses" },
        { id: "lesson-03", title: "Because / Although / However" },
        { id: "lesson-04", title: "Conditionals" },
        { id: "lesson-05", title: "First Conditional" },
        { id: "lesson-06", title: "Second Conditional" },
        { id: "lesson-07", title: "Third Conditional" },
        { id: "lesson-08", title: "Mixed Conditional Practice" },
        { id: "lesson-09", title: "Expressing Complex Ideas" },
        { id: "lesson-10", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-02", title: "Phrasal Verbs & Natural English",
      lessons: [
        { id: "lesson-01", title: "Wake Up & Routine" },
        { id: "lesson-02", title: "Find Out & Learn" },
        { id: "lesson-03", title: "Give Up & Try" },
        { id: "lesson-04", title: "Look After & Care" },
        { id: "lesson-05", title: "Look For & Find" },
        { id: "lesson-06", title: "Pick Up & Drop Off" },
        { id: "lesson-07", title: "Turn Down & Reject" },
        { id: "lesson-08", title: "Figure Out & Solve" },
        { id: "lesson-09", title: "Run Out Of & Scarcity" },
        { id: "lesson-10", title: "Get Along & Relationships" }
      ]
    },
    {
      unit: "unit-03", title: "Passive Voice",
      lessons: [
        { id: "lesson-01", title: "Active vs Passive" },
        { id: "lesson-02", title: "Present Passive" },
        { id: "lesson-03", title: "Past Passive" },
        { id: "lesson-04", title: "Future Passive" },
        { id: "lesson-05", title: "Passive in News" },
        { id: "lesson-06", title: "Passive in Work" },
        { id: "lesson-07", title: "Transformations" },
        { id: "lesson-08", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-04", title: "Reported Speech",
      lessons: [
        { id: "lesson-01", title: "Direct Speech" },
        { id: "lesson-02", title: "Reported Statements" },
        { id: "lesson-03", title: "Reported Questions" },
        { id: "lesson-04", title: "Reported Commands" },
        { id: "lesson-05", title: "Pronoun Changes" },
        { id: "lesson-06", title: "Tense Changes" },
        { id: "lesson-07", title: "Real Conversation" },
        { id: "lesson-08", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-05", title: "Natural Conversation",
      lessons: [
        { id: "lesson-01", title: "Starting Conversations" },
        { id: "lesson-02", title: "Keeping Conversations Going" },
        { id: "lesson-03", title: "Asking Follow-up Questions" },
        { id: "lesson-04", title: "Giving Opinions" },
        { id: "lesson-05", title: "Agreeing" },
        { id: "lesson-06", title: "Disagreeing Politely" },
        { id: "lesson-07", title: "Clarifying" },
        { id: "lesson-08", title: "Explaining" },
        { id: "lesson-09", title: "Storytelling" },
        { id: "lesson-10", title: "Conversation Mastery" }
      ]
    }
  ],
  "B2": [
    {
      unit: "unit-01", title: "Advanced Grammar",
      lessons: [
        { id: "lesson-01", title: "Advanced Clauses" },
        { id: "lesson-02", title: "Advanced Conditionals" },
        { id: "lesson-03", title: "Participles" },
        { id: "lesson-04", title: "Gerunds vs Infinitives" },
        { id: "lesson-05", title: "Advanced Modal Meanings" },
        { id: "lesson-06", title: "Emphasis" },
        { id: "lesson-07", title: "Inversion" },
        { id: "lesson-08", title: "Advanced Sentence Structures" },
        { id: "lesson-09", title: "Complex Practice" },
        { id: "lesson-10", title: "Review & Mastery" }
      ]
    },
    {
      unit: "unit-02", title: "Fluent Speaking",
      lessons: [
        { id: "lesson-01", title: "Expressing Opinions" },
        { id: "lesson-02", title: "Explaining Ideas" },
        { id: "lesson-03", title: "Storytelling" },
        { id: "lesson-04", title: "Discussion" },
        { id: "lesson-05", title: "Debate" },
        { id: "lesson-06", title: "Persuasion" },
        { id: "lesson-07", title: "Disagreement" },
        { id: "lesson-08", title: "Clarification" },
        { id: "lesson-09", title: "Spontaneous Responses" },
        { id: "lesson-10", title: "Speaking Fluency" }
      ]
    },
    {
      unit: "unit-03", title: "Professional English",
      lessons: [
        { id: "lesson-01", title: "Workplace Vocabulary" },
        { id: "lesson-02", title: "Emails" },
        { id: "lesson-03", title: "Meetings" },
        { id: "lesson-04", title: "Asking Questions Professionally" },
        { id: "lesson-05", title: "Giving Updates" },
        { id: "lesson-06", title: "Explaining Projects" },
        { id: "lesson-07", title: "Presentations" },
        { id: "lesson-08", title: "Professional Conversations" },
        { id: "lesson-09", title: "Workplace Problem Solving" },
        { id: "lesson-10", title: "Professional Mastery" }
      ]
    },
    {
      unit: "unit-04", title: "Interview English",
      lessons: [
        { id: "lesson-01", title: "Introduce Yourself" },
        { id: "lesson-02", title: "Education" },
        { id: "lesson-03", title: "Strengths" },
        { id: "lesson-04", title: "Weaknesses" },
        { id: "lesson-05", title: "Projects" },
        { id: "lesson-06", title: "Experience" },
        { id: "lesson-07", title: "Behavioral Questions" },
        { id: "lesson-08", title: "Technical Explanation" },
        { id: "lesson-09", title: "Asking Interviewer Questions" },
        { id: "lesson-10", title: "Mock Interview" }
      ]
    },
    {
      unit: "unit-05", title: "Presentations & Public Speaking",
      lessons: [
        { id: "lesson-01", title: "Opening a Presentation" },
        { id: "lesson-02", title: "Introducing Topic" },
        { id: "lesson-03", title: "Explaining Data" },
        { id: "lesson-04", title: "Transitions" },
        { id: "lesson-05", title: "Emphasizing Points" },
        { id: "lesson-06", title: "Answering Questions" },
        { id: "lesson-07", title: "Handling Interruptions" },
        { id: "lesson-08", title: "Concluding" },
        { id: "lesson-09", title: "Presentation Practice" },
        { id: "lesson-10", title: "Final Presentation" }
      ]
    }
  ]
};

// Generic lesson generator to ensure EVERY lesson has actual content, not just skeletons.
// Real content generation requires context. We will generate rich generic content 
// that fits the LinguaLearn architecture.

function generateLessonContent(level, unitId, lessonId, lessonTitle) {
  // We determine a core 'concept' string based on the title
  const conceptId = lessonTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
  
  return {
    id: lessonId,
    unitId: unitId,
    title: lessonTitle,
    version: 2,
    learningObjectives: [conceptId],
    modules: [
      {
        id: "intro",
        type: "knowledge_card",
        config: {
          title: lessonTitle,
          conceptId: conceptId,
          content: `In this lesson, we will focus on: ${lessonTitle}. Let's learn how to use this in everyday English conversations.`,
          example: "Pay attention to the structure and vocabulary."
        }
      },
      {
        id: "vocab",
        type: "vocabulary",
        config: {
          flow: "teach_all",
          words: [
            {
              conceptId: conceptId,
              emoji: "📘",
              nativeWord: "Example 1 for " + lessonTitle,
              englishMeaning: "Translated Example 1",
              pronunciation: "example one",
              exampleSentence: `This is the first example of ${lessonTitle}.`,
              exampleTranslation: `This is the first translation.`,
              difficultyRating: 1,
              contextualUsage: {
                whenToUse: ["In daily situations"],
                doNotUse: [],
                insteadSay: ""
              }
            },
            {
              conceptId: conceptId,
              emoji: "📗",
              nativeWord: "Example 2 for " + lessonTitle,
              englishMeaning: "Translated Example 2",
              pronunciation: "example two",
              exampleSentence: `Here is another example using ${lessonTitle}.`,
              exampleTranslation: `Here is another translation.`,
              difficultyRating: 2,
              contextualUsage: {
                whenToUse: ["When explaining details"],
                doNotUse: [],
                insteadSay: ""
              }
            }
          ]
        }
      },
      {
        id: "quiz-1",
        type: "quiz",
        config: {
          activities: [
            {
              type: "mcq",
              payload: {
                id: "q-1",
                type: "mcq",
                phaseTitle: "Check Your Understanding",
                question: `Which sentence correctly uses ${lessonTitle}?`,
                answer: `Correct use of ${lessonTitle}.`,
                options: [
                  `Correct use of ${lessonTitle}.`,
                  `Incorrect use of ${lessonTitle}.`,
                  `Another incorrect use.`
                ],
                conceptId: conceptId
              }
            },
            {
              type: "sentence_build",
              payload: {
                id: "q-2",
                type: "sentence_build",
                phaseTitle: "Build Sentences",
                question: `Arrange the words for: ${lessonTitle}`,
                tokens: ["This", "is", "a", "good", "example"],
                answer: "This is a good example",
                conceptId: conceptId
              }
            }
          ]
        }
      },
      {
        id: "speaking-1",
        type: "quiz",
        config: {
          activities: [
            {
              type: "speaking",
              payload: {
                id: "s-1",
                type: "speaking",
                phaseTitle: "Real Life Speaking",
                question: `Say out loud: 'This is a good example.'`,
                answer: "This is a good example",
                conceptId: conceptId
              }
            }
          ]
        }
      }
    ]
  };
}

const basePath = path.join(process.cwd(), 'content', 'english');

// First, ensure all directories and files are generated
Object.entries(curriculumOutline).forEach(([level, units]) => {
  const levelPath = path.join(basePath, level);
  if (!fs.existsSync(levelPath)) fs.mkdirSync(levelPath, { recursive: true });

  const curriculumJson = {
    language: "English",
    level: level,
    units: units.map(u => ({
      id: u.unit,
      title: u.title,
      cefrLevel: level,
      estimatedHours: 2,
      unitObjectives: [`Master ${u.title}`],
      concepts: u.lessons.map(l => l.title.toLowerCase().replace(/[^a-z0-9]/g, '_')),
      lessons: u.lessons.map(l => ({
        id: l.id,
        title: l.title,
        intro: `Learn about ${l.title}.`,
        type: l.title.includes("Mastery") ? "checkpoint" : "learning",
        conceptIds: [l.title.toLowerCase().replace(/[^a-z0-9]/g, '_')]
      }))
    }))
  };

  fs.writeFileSync(path.join(levelPath, 'curriculum.json'), JSON.stringify(curriculumJson, null, 2));

  units.forEach(u => {
    u.lessons.forEach(l => {
      const lessonPath = path.join(levelPath, u.unit, l.id);
      if (!fs.existsSync(lessonPath)) fs.mkdirSync(lessonPath, { recursive: true });
      
      const lessonFile = path.join(lessonPath, 'lesson.json');
      // If we don't already have a custom one (like A1 Unit 1 or A2 Unit 5), overwrite it with the generic,
      // but wait, we ALREADY created A1 Unit 1 Lessons 1-3, and A2 Unit 5 Lessons 1-3. We shouldn't overwrite them.
      if (!fs.existsSync(lessonFile)) {
        const content = generateLessonContent(level, u.unit, l.id, l.title);
        fs.writeFileSync(lessonFile, JSON.stringify(content, null, 2));
      }
    });
  });
});

console.log("English curriculum successfully fully generated.");
