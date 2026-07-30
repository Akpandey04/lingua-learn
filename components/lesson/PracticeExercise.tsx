'use client';
import { useState } from 'react';
import type { Exercise } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface Props {
  exercise: Exercise;
  locale: string;
  guided: boolean; // true = show explanation on wrong; false = quiz mode
  onCorrect: () => void;
  onWrong: () => void;
  onNext: () => void;
  phaseLabel?: string;
}

function norm(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?¿¡、。？！']/g, '');
}

// ─── Sub-components ────────────────────────────────────────────────────────

function OptionButton({ label, state, onClick }: { label: string; state: 'idle' | 'selected' | 'correct' | 'wrong' | 'missed'; onClick: () => void }) {
  const base = 'w-full p-4 rounded-2xl border-2 text-left font-medium transition-all duration-200 text-sm sm:text-base';
  const styles: Record<string, string> = {
    idle: `${base} border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200 cursor-pointer`,
    selected: `${base} border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300`,
    correct: `${base} border-green-500 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300`,
    wrong: `${base} border-red-500 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300`,
    missed: `${base} border-green-400 bg-green-50/60 dark:bg-green-900/20 text-green-600 dark:text-green-400`,
  };
  return (
    <button className={styles[state]} onClick={onClick} disabled={state !== 'idle' && state !== 'selected'}>
      {label}
    </button>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────

export default function PracticeExercise({ exercise, locale, guided, onCorrect, onWrong, onNext, phaseLabel }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [notSupported, setNotSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { speak, speaking } = useSpeech();
  const { listening, startListening } = useSpeechRecognition({
    locale,
    onResult: (t) => setTranscript(t),
    onNotSupported: () => setNotSupported(true),
  });

  const checkAnswer = (answer: string, correct: string, alts: string[] = []) => {
    const n = norm(answer);
    return n === norm(correct) || alts.map(norm).includes(n);
  };

  const submit = (answer: string, correct: string, alts: string[] = []) => {
    if (submitted) return;
    const ok = checkAnswer(answer, correct, alts);
    setIsCorrect(ok);
    setSubmitted(true);
    ok ? onCorrect() : onWrong();
  };

  const handleOptionClick = (opt: string) => {
    if (submitted) return;
    setSelected(opt);
  };

  const getOptionState = (opt: string, correct: string): 'idle' | 'selected' | 'correct' | 'wrong' | 'missed' => {
    if (!submitted) return selected === opt ? 'selected' : 'idle';
    if (opt === correct) return 'correct';
    if (opt === selected && opt !== correct) return 'wrong';
    return 'idle';
  };

  const feedbackBar = submitted ? (
    <div className={`rounded-2xl p-4 ${isCorrect ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}>
      <p className={`font-bold text-lg ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
        {isCorrect ? '✅ Correct!' : '❌ Not quite'}
      </p>
      {!isCorrect && guided && 'explanation' in exercise && exercise.explanation && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{exercise.explanation}</p>
      )}
      {!isCorrect && 'answer' in exercise && (
        <p className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Correct answer: <span className="text-blue-600 dark:text-blue-400">{exercise.answer}</span>
        </p>
      )}
    </div>
  ) : null;

  const continueBtn = submitted ? (
    <button onClick={onNext} className="w-full py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg transition shadow">
      Continue →
    </button>
  ) : null;

  // ── MCQ / tap-word ──
  if (exercise.type === 'mcq' || exercise.type === 'tap-word') {
    return (
      <div className="flex flex-col gap-5">
        {phaseLabel && <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{phaseLabel}</p>}
        <p className="text-xl font-bold text-gray-800 dark:text-white">{exercise.question}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exercise.options.map((opt) => (
            <OptionButton key={opt} label={opt} state={submitted ? getOptionState(opt, exercise.answer) : selected === opt ? 'selected' : 'idle'} onClick={() => { handleOptionClick(opt); if (!submitted) submit(opt, exercise.answer); }} />
          ))}
        </div>
        {feedbackBar}
        {continueBtn}
      </div>
    );
  }

  // ── Translate ──
  if (exercise.type === 'translate') {
    const label = exercise.direction === 'to-native' ? 'Translate to the target language:' : 'Translate to English:';
    return (
      <div className="flex flex-col gap-5">
        {phaseLabel && <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{phaseLabel}</p>}
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{exercise.question}</p>
        </div>
        <input
          value={typedAnswer}
          onChange={(e) => setTypedAnswer(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && typedAnswer.trim()) submit(typedAnswer, exercise.answer, exercise.alternateAnswers); }}
          disabled={submitted}
          placeholder="Type your answer…"
          className={`w-full p-4 rounded-2xl border-2 text-lg font-medium outline-none transition-all dark:bg-gray-800 dark:text-white ${!submitted ? 'border-gray-200 dark:border-gray-700 focus:border-blue-500' : isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}
          aria-label="Translation answer"
        />
        {!submitted && (
          <button onClick={() => { if (typedAnswer.trim()) submit(typedAnswer, exercise.answer, exercise.alternateAnswers); }} disabled={!typedAnswer.trim()} className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold text-lg transition">
            Check
          </button>
        )}
        {feedbackBar}
        {continueBtn}
      </div>
    );
  }

  // ── Listening ──
  if (exercise.type === 'listening') {
    const hasOptions = exercise.options && exercise.options.length > 0;
    const [heard, setHeard] = useState('');
    return (
      <div className="flex flex-col gap-5">
        {phaseLabel && <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{phaseLabel}</p>}
        <p className="text-xl font-bold text-gray-800 dark:text-white">What do you hear?</p>
        <div className="flex justify-center">
          <button onClick={() => speak(exercise.phrase, locale)} disabled={speaking} className={`w-24 h-24 rounded-full text-5xl flex items-center justify-center shadow-lg transition-all ${speaking ? 'bg-blue-300 scale-95' : 'bg-blue-100 dark:bg-blue-900 hover:scale-105'}`} aria-label="Play audio">🔊</button>
        </div>
        {hasOptions ? (
          <div className="grid grid-cols-2 gap-3">
            {exercise.options!.map((opt) => (
              <OptionButton key={opt} label={opt} state={submitted ? getOptionState(opt, exercise.answer) : selected === opt ? 'selected' : 'idle'} onClick={() => { handleOptionClick(opt); if (!submitted) submit(opt, exercise.answer); }} />
            ))}
          </div>
        ) : (
          <>
            <input value={heard} onChange={(e) => setHeard(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && heard.trim()) submit(heard, exercise.answer); }} disabled={submitted} placeholder="Type what you heard…" className={`w-full p-4 rounded-2xl border-2 text-lg font-medium outline-none transition dark:bg-gray-800 dark:text-white ${!submitted ? 'border-gray-200 dark:border-gray-700 focus:border-blue-500' : isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`} aria-label="Type what you heard" />
            {!submitted && <button onClick={() => { if (heard.trim()) submit(heard, exercise.answer); }} disabled={!heard.trim()} className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold text-lg transition">Check</button>}
          </>
        )}
        {feedbackBar}
        {continueBtn}
      </div>
    );
  }

  // ── Fill ──
  if (exercise.type === 'fill') {
    const parts = exercise.sentence.split('___');
    const hasOptions = exercise.options && exercise.options.length > 0;
    return (
      <div className="flex flex-col gap-5">
        {phaseLabel && <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{phaseLabel}</p>}
        <p className="text-xs text-gray-400 dark:text-gray-500">Fill in the blank:</p>
        <div className="flex flex-wrap items-center gap-1 text-xl font-semibold text-gray-800 dark:text-white">
          <span>{parts[0]}</span>
          <span className={`px-3 py-1 rounded-lg border-2 min-w-[80px] text-center ${submitted ? (isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'border-red-500 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300') : 'border-dashed border-blue-400 text-blue-400'}`}>{(selected || typedAnswer) || '___'}</span>
          {parts[1] && <span>{parts[1]}</span>}
        </div>
        {hasOptions ? (
          <div className="grid grid-cols-2 gap-3">
            {exercise.options!.map((opt) => (
              <OptionButton key={opt} label={opt} state={submitted ? getOptionState(opt, exercise.answer) : selected === opt ? 'selected' : 'idle'} onClick={() => { handleOptionClick(opt); if (!submitted) submit(opt, exercise.answer); }} />
            ))}
          </div>
        ) : (
          <>
            <input value={typedAnswer} onChange={(e) => setTypedAnswer(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && typedAnswer.trim()) submit(typedAnswer, exercise.answer); }} disabled={submitted} placeholder="Type the missing word…" className={`w-full p-4 rounded-2xl border-2 text-lg font-medium outline-none transition dark:bg-gray-800 dark:text-white ${!submitted ? 'border-gray-200 dark:border-gray-700 focus:border-blue-500' : isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`} aria-label="Fill in the blank" />
            {!submitted && <button onClick={() => { if (typedAnswer.trim()) submit(typedAnswer, exercise.answer); }} disabled={!typedAnswer.trim()} className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold text-lg transition">Check</button>}
          </>
        )}
        {feedbackBar}
        {continueBtn}
      </div>
    );
  }

  // ── Match ──
  if (exercise.type === 'match') {
    return <MatchExerciseUI exercise={exercise} onCorrect={onCorrect} onWrong={onWrong} onNext={onNext} phaseLabel={phaseLabel} />;
  }

  // ── Speaking ──
  if (exercise.type === 'speaking') {
    if (notSupported) return (
      <div className="flex flex-col gap-5 text-center">
        <p className="text-xl font-bold text-gray-800 dark:text-white">Speaking Exercise</p>
        <div className="p-5 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-700 dark:text-yellow-300 font-medium">🎤 Speech recognition not supported in this browser.</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">Try Chrome or Edge for speaking exercises.</p>
        </div>
        <button onClick={onNext} className="py-3 rounded-2xl bg-gray-500 hover:bg-gray-600 text-white font-bold transition">Skip →</button>
      </div>
    );
    return (
      <div className="flex flex-col gap-5">
        {phaseLabel && <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{phaseLabel}</p>}
        <p className="text-xl font-bold text-gray-800 dark:text-white">{exercise.prompt}</p>
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{exercise.expectedPhrase}</p>
          {exercise.hint && <p className="text-sm text-blue-500 dark:text-blue-400 mt-1 italic">({exercise.hint})</p>}
        </div>
        <button onClick={() => speak(exercise.expectedPhrase, locale)} className="self-start text-sm text-gray-500 hover:text-blue-500 transition flex gap-1 items-center">🔊 Hear pronunciation</button>
        <div className="flex justify-center">
          <button onClick={() => { setTranscript(''); startListening(); }} disabled={listening || submitted} className={`w-24 h-24 rounded-full text-5xl flex items-center justify-center shadow-lg transition-all ${listening ? 'bg-red-400 scale-95 animate-pulse' : 'bg-red-100 dark:bg-red-900 hover:scale-105'}`} aria-label="Start speaking">🎤</button>
        </div>
        <p className="text-center text-sm text-gray-400">{listening ? 'Listening… speak now' : 'Tap to speak'}</p>
        {transcript && <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-500 dark:text-gray-400">You said:</p><p className="font-semibold text-gray-800 dark:text-gray-200">&ldquo;{transcript}&rdquo;</p></div>}
        {!submitted && transcript && <button onClick={() => submit(transcript, exercise.expectedPhrase)} className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition">Check</button>}
        {feedbackBar}
        {continueBtn}
      </div>
    );
  }

  return null;
}

// ─── Match sub-component ───────────────────────────────────────────────────
function MatchExerciseUI({ exercise, onCorrect, onWrong, onNext, phaseLabel }: { exercise: import('@/types').MatchExercise; onCorrect: () => void; onWrong: () => void; onNext: () => void; phaseLabel?: string }) {
  function shuffle<T>(arr: T[]): T[] { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const [sources] = useState(() => shuffle(exercise.pairs.map((p) => p.source)));
  const [targets] = useState(() => shuffle(exercise.pairs.map((p) => p.target)));
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [selSrc, setSelSrc] = useState<string | null>(null);
  const [selTgt, setSelTgt] = useState<string | null>(null);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);
  const map = Object.fromEntries(exercise.pairs.map((p) => [p.source, p.target]));

  const tryMatch = (src: string, tgt: string) => {
    if (map[src] === tgt) {
      const next = new Set([...matched, src, tgt]);
      setMatched(next);
      setSelSrc(null); setSelTgt(null);
      onCorrect();
      if (next.size === exercise.pairs.length * 2) setDone(true);
    } else {
      setErrors((e) => e + 1);
      setWrong(new Set([src, tgt]));
      onWrong();
      setTimeout(() => { setWrong(new Set()); setSelSrc(null); setSelTgt(null); }, 700);
    }
  };

  const btnCls = (val: string) => {
    const base = 'p-3 rounded-2xl border-2 text-center font-medium transition-all text-sm ';
    if (matched.has(val)) return base + 'border-green-500 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 cursor-default';
    if (wrong.has(val)) return base + 'border-red-500 bg-red-50 dark:bg-red-900/40 text-red-600';
    if (val === selSrc || val === selTgt) return base + 'border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-700';
    return base + 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 cursor-pointer text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="flex flex-col gap-5">
      {phaseLabel && <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{phaseLabel}</p>}
      <p className="text-xl font-bold text-gray-800 dark:text-white">Match the pairs</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Tap a word on each side to match them.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {sources.map((s) => <button key={s} className={btnCls(s)} disabled={matched.has(s) || done} onClick={() => { if (matched.has(s)) return; const ns = selSrc === s ? null : s; setSelSrc(ns); if (ns && selTgt) tryMatch(ns, selTgt); }}>{s}</button>)}
        </div>
        <div className="flex flex-col gap-2">
          {targets.map((t) => <button key={t} className={btnCls(t)} disabled={matched.has(t) || done} onClick={() => { if (matched.has(t)) return; const nt = selTgt === t ? null : t; setSelTgt(nt); if (selSrc && nt) tryMatch(selSrc, nt); }}>{t}</button>)}
        </div>
      </div>
      {done && (
        <>
          <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 font-bold text-center">
            🎉 All matched! {errors === 0 ? 'Perfect!' : `${errors} mistake${errors > 1 ? 's' : ''}`}
          </div>
          <button onClick={onNext} className="w-full py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg transition">Continue →</button>
        </>
      )}
    </div>
  );
}
