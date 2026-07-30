import Link from 'next/link';
import { LANGUAGE_LIST } from '@/lib/languages';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-12">
      {/* Hero */}
      <section className="text-center pt-8 pb-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Learn a language,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            completely free
          </span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
          Interactive exercises, speech recognition, and gamified progress — no account needed.
        </p>
      </section>

      {/* Language grid */}
      <section className="w-full max-w-3xl">
        <h2 className="text-center text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
          Choose your language
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LANGUAGE_LIST.map((lang) => (
            <Link
              key={lang.code}
              href={`/${lang.code}`}
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
                {lang.flag}
              </span>
              <div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{lang.name}</p>
                <p className="text-gray-400 dark:text-gray-500">{lang.nativeName}</p>
              </div>
              <span className="ml-auto text-gray-300 dark:text-gray-600 group-hover:text-blue-400 text-xl transition">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
        {[
          { icon: '🎯', title: '6 Exercise Types', desc: 'MCQ, translation, matching, fill-blank, listening, and speaking' },
          { icon: '🔊', title: 'Voice Powered', desc: 'Text-to-speech and speech recognition via your browser' },
          { icon: '🔥', title: 'Gamified', desc: 'XP, streaks, hearts, and confetti to keep you motivated' },
        ].map((f) => (
          <div
            key={f.title}
            className="flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          >
            <span className="text-3xl">{f.icon}</span>
            <p className="font-bold text-gray-900 dark:text-white">{f.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Grammar hints teaser */}
      <section className="w-full max-w-3xl p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 border border-blue-100 dark:border-blue-900">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">📚 Grammar Tips Included</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Each language comes with grammar reference cards covering verb conjugation, gendered nouns, sentence structure, and more — all built-in, no subscription required.
        </p>
      </section>
    </div>
  );
}
