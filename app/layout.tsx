import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import AchievementToast from "@/components/ui/AchievementToast";
import GlobalAudioListener from "@/components/GlobalAudioListener";
import GlobalIntelligenceListener from "@/components/GlobalIntelligenceListener";
import GlobalProgressListener from "@/components/GlobalProgressListener";
import InternalDeveloperPanel from "@/components/InternalDeveloperPanel";

export const metadata: Metadata = {
  title: 'LinguaLearn – Free Language Learning',
  description:
    'Learn French, German, Japanese, and Spanish for free with interactive exercises, speech recognition, and gamified progress tracking.',
  manifest: '/manifest.json',
  keywords: ['language learning', 'French', 'German', 'Japanese', 'Spanish', 'free', 'duolingo alternative'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (t === 'dark' || (!t && d)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
        <GlobalAudioListener />
        <GlobalIntelligenceListener />
        <GlobalProgressListener />
        <InternalDeveloperPanel />
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="mt-16 pb-8 text-center text-xs text-gray-400 dark:text-gray-600">
          <p>Content sourced from Tatoeba (CC BY 2.0) &amp; Wiktionary (CC BY-SA 4.0) — LinguaLearn is free and open source</p>
        </footer>
      </body>
    </html>
  );
}
