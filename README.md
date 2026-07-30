# 🌍 LinguaLearn

A completely free, open-source Duolingo-style language learning web app built with Next.js, TypeScript, and Tailwind CSS.

## Languages Supported

| Language | Exercises | Grammar Hints |
|----------|-----------|---------------|
| 🇫🇷 French | ✅ | ✅ |
| 🇩🇪 German | ✅ | ✅ |
| 🇯🇵 Japanese | ✅ | ✅ |
| 🇪🇸 Spanish | ✅ | ✅ |

## Features

- **6 Exercise Types**: Multiple choice, translation, word matching, fill-in-the-blank, listening, and speaking
- **Text-to-Speech**: Built-in browser SpeechSynthesis — no API key needed
- **Speech Recognition**: Browser SpeechRecognition for speaking exercises (Chrome/Edge)
- **Gamification**: XP points, hearts system, daily streaks, and confetti 🎉
- **Dark Mode**: Full dark mode with system preference detection
- **Progressive Web App**: Installable, works offline after first load
- **Zero Backend**: All progress saved in localStorage — no login required
- **Grammar Reference**: Built-in grammar cards for each language

## Tech Stack (All Free)

- [Next.js 16](https://nextjs.org/) – React framework
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) – Styling
- [Zustand](https://github.com/pmndrs/zustand) – State management
- Web Speech API – TTS & STT (built into browser)
- Vercel Hobby – Hosting (free tier)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or Netlify:

```bash
npm run build
# then link your GitHub repo on netlify.com
```

## Content Sources

Content is based on common language learning vocabulary. Attribution:
- Sentence patterns inspired by [Tatoeba](https://tatoeba.org/) (CC BY 2.0 FR)
- Vocabulary aligned with [Wiktionary](https://www.wiktionary.org/) (CC BY-SA 4.0)

## Project Structure

```
/app              – Next.js App Router pages
/components       – React UI components
  /exercises      – MCQ, Translate, Match, FillBlank, Listening, Speaking
  /ui             – Shared UI (hearts, XP bar, confetti, dark mode toggle)
/data             – Course content per language
/hooks            – Custom React hooks (useSpeech, useSpeechRecognition, useProgress)
/lib              – Core logic (progressService, store, grammarHints)
/types            – TypeScript type definitions
/public           – Static assets + PWA manifest
```

## License

MIT License — use freely, modify, and deploy at zero cost.
