# LinguaLearn Gold Standard Content Specification

This document is the permanent educational specification for LinguaLearn. Every language plugin—whether French, Spanish, German, Japanese, or Hindi—must conform to this standard. It defines our pedagogical philosophy, quality expectations, and curriculum constraints.

---

## 1. Lesson Philosophy

LinguaLearn relies on a predictable, highly-structured learning loop that builds learner confidence through layered repetition. Every lesson must execute the following pipeline in exact order:

1. **Introduction:** A `knowledge_card` welcoming the learner and setting the objective.
2. **Teach Vocabulary:** Introduces all new concepts with their meaning, pronunciation, IPA, and memory tips.
3. **Listen:** Audio-only identification. Forces the learner to map sound to meaning without relying on spelling.
4. **Speak (if supported):** Voice recognition. Forces the learner to produce the sound accurately.
5. **Type:** Active recall and spelling reinforcement.
6. **Practice:** Mixed exercises (multiple choice, meaning match, sentence building) focusing on context.
7. **Summary:** A `knowledge_card` recapping what was learned and preparing them for the final test.
8. **Final Quiz:** A strict evaluation of all taught concepts.
9. **Celebration:** A positive feedback loop to end the session.

Every stage serves a distinct cognitive purpose. We do not skip stages unless platform capabilities (e.g., lack of TTS/Speech) necessitate it.

---

## 2. Vocabulary Standard

Vocabulary is the atomic unit of learning in LinguaLearn. Every vocabulary item in a language plugin's `data.js` must adhere to the following schema constraints:

- **Required Fields:**
  - `id`: Unique identifier (e.g., `a1_es_agua`).
  - `nativeWord`: The term in the target language (e.g., `Agua`).
  - `englishMeaning`: Natural English translation (e.g., `Water`).
  - `exampleSentence`: A beginner-friendly sentence using the word.
  - `englishTranslation`: Translation of the example sentence.
- **Optional (but highly recommended) Fields:**
  - `ipa`: International Phonetic Alphabet representation (e.g., `/ˈa.ɣwa/`). Required for Tier 1 quality languages.
  - `pronunciationTip`: Phonetic approximation for native English speakers (e.g., `Ah-gwah`).
  - `memoryTip`: A mnemonic or engaging tip (e.g., `Think of "Aqua"`).

**Expectations:** Memory tips must be unique, engaging, and genuinely helpful. Do not reuse generic tips. IPA must follow standard linguistic conventions.

---

## 3. Example Sentence Rules

Example sentences provide critical context. They must follow strict beginner-friendly constraints:

- **Maximum Length:** Sentences must not exceed 50 characters or 7 words.
- **Natural Language:** Must sound like something a native speaker would actually say.
- **Beginner Friendly:** Use simple syntax (Subject-Verb-Object).
- **No Unnecessary Grammar:** Avoid introducing complex conjugations, subjunctive moods, or rare idioms in A1/A2 examples.
- **No Advanced Vocabulary:** If the learner is studying "Dog," the rest of the sentence should use only extremely basic words they likely already know (e.g., "The dog is big" not "The dog is vociferous").
- **One Objective:** The sentence should highlight the target word without confusing the learner with other unknowns.

---

## 4. Practice Rules

Practice modules reinforce the taught vocabulary through varied interaction types:

- **Meaning Match:** Used early in practice. Low cognitive load. Learner maps native word to English meaning.
- **Listening / Speaking:** Used to build auditory and vocal familiarity before spelling.
- **Typing / Fill-in-the-Blank:** Used late in practice. High cognitive load. Forces active recall and exact spelling.
- **Sentence Building:** Used to demonstrate word order and syntax.

**Difficulty Progression:** Exercises must scale from recognition (multiple choice) to recall (typing) to context (sentence building).
**Repetition Policy:** Words that are historically difficult for learners (or flagged in the Mistake Notebook) should appear more frequently in the generated practice permutations.

---

## 5. Quiz Rules

The Final Quiz is the strict gatekeeper of progression.

- **Coverage:** 100% of the vocabulary taught in the `vocabulary` module MUST be tested in the Final Quiz.
- **No Unseen Vocabulary:** It is strictly forbidden to test a learner on a word, concept, or grammar rule that was not explicitly introduced in the `knowledge_card` or `vocabulary` module of the current lesson (or previously mastered lessons).
- **Difficulty:** The quiz must not introduce new sentence structures. It should test retention of meaning, spelling, and pronunciation.
- **Passing Philosophy:** If a learner reaches the Celebration screen, the lesson is marked complete. Errors made during the quiz are logged to the Mistake Notebook for spaced repetition, rather than blocking lesson completion (unless the score falls below a critical threshold, if configured).

---

## 6. Grammar Rules

Grammar is taught implicitly through patterns, not explicitly through dense linguistic explanations.

- **Never Overload:** Do not teach conjugation tables in a single lesson.
- **One Concept at a Time:** If teaching gender (e.g., *El* vs *La*), do not simultaneously teach pluralization.
- **Examples Over Rules:** Show 3 examples of a grammar rule before explaining it.
- **Review Strategy:** Grammar concepts must be naturally woven into the vocabulary of subsequent lessons to enforce spaced repetition.

---

## 7. Translation Rules

Translations must bridge the gap between structural accuracy and natural English.

- **Natural Translation:** Always prefer how a native English speaker would phrase it (e.g., "I am hungry" instead of "I have hunger").
- **Literal Translation Avoidance:** Do not map word-for-word if it breaks English syntax. If a literal translation is necessary to explain a concept, use the `memoryTip` to explain the literal meaning (e.g., "Literally: I have hunger").
- **Context Preservation:** Ensure the translation conveys the correct formality (e.g., Tu vs Vous).
- **Regional Neutrality:** Use internationally understood vocabulary unless teaching a specific dialect.

---

## 8. Audio Rules

Audio is non-negotiable for language learning.

- **Speech Quality:** The platform relies on the browser's native `SpeechSynthesis` and `SpeechRecognition` APIs.
- **Native Fallback:** If a language locale (e.g., `es-ES`) is not supported by the user's browser TTS, the UI will elegantly hide the audio buttons. The generator must assume TTS works.
- **Pronunciation:** Provide `ipa` and `pronunciationTip` fields to bridge the gap when TTS accents are robotic.

---

## 9. Quality Checklist

Every generated language course must pass the automated `validators.js` script and a human review against this checklist before release:

- [ ] Every word introduced in Vocabulary is taught.
- [ ] Every taught word appears in Practice exercises.
- [ ] Every taught word appears in the Final Quiz.
- [ ] **Zero unseen vocabulary** exists in the Practice or Quiz modules.
- [ ] Example sentences are beginner-friendly (under 7 words/50 chars).
- [ ] Example sentences read naturally in both native and English.
- [ ] Unique, non-repetitive memory tips are provided for difficult words.
- [ ] Audio TTS maps correctly to the target locale (e.g., `de-DE`).
- [ ] Translations avoid robotic, literal mapping.

---

## 10. Language-Specific Adaptations

The engine is language-blind, but plugins must adapt content appropriately without breaking the core philosophy:

- **German:** Focus early on gender (`der`, `die`, `das`). Keep sentence builder examples extremely simple to avoid overwhelming learners with verb placement rules (V2 word order) too early.
- **Hindi:** Rely heavily on transliteration in the `pronunciationTip` field. Ensure the `joinStrategy` is configured correctly if script joining behaves uniquely.
- **Japanese / Chinese:** Set `joinStrategy: "none"` in the Language Registry so sentence builders do not insert spaces between characters. Use Romaji/Pinyin in the `pronunciationTip` to aid reading before Kana/Kanji/Hanzi mastery.
- **Arabic (RTL):** Ensure the registry specifies `direction: "rtl"`. The UI will flip layout automatically. Keep `memoryTip` fields focused on root consonants.
