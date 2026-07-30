'use client';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useParams } from 'next/navigation';
import type { ModuleProps } from '@/lib/registry';
import type { QuizModule as QuizModuleType } from '@/types/domain';
import { eventBus } from '@/lib/event-bus';
import { joinSentence } from '@/lib/sentenceUtils';
import { getLanguageConfig, JoinStrategy } from '@/lib/languageRegistry';
import PlayAudioActivity from '../activities/PlayAudioActivity';
import SpeechActivity from '../activities/SpeechActivity';
import { isAnswerMatch } from '@/lib/utils';

type PracticeQuestion = {
  id?: string;
  type?: string;
  phaseTitle?: string;
  question?: string;
  prompt?: string;
  meaning?: string;
  phrase?: string;
  audioText?: string;
  options?: string[];
  tokens?: string[];
  answer?: string;
  correctAnswer?: string;
  explanation?: string;
  conceptId?: string;
  pronunciation?: string;
};

function getQuestion(raw: unknown): PracticeQuestion {
  const item = raw as { payload?: PracticeQuestion };
  return item.payload || (raw as PracticeQuestion);
}

function getAnswer(question: PracticeQuestion) {
  return question.answer || question.correctAnswer || '';
}

function getPrompt(question: PracticeQuestion) {
  return question.question || question.prompt || question.meaning || 'Choose the correct answer.';
}

function getPhaseLabel(type?: string) {
  switch (type) {
    case 'meaning_match':
      return 'Meaning Match';
    case 'word_match':
      return 'Word Match';
    case 'listening':
      return 'Listening Practice';
    case 'speaking':
      return 'Speaking Practice';
    case 'typing':
      return 'Typing Practice';
    case 'fill':
      return 'Fill in the Blank';
    case 'sentence_build':
      return 'Sentence Building';
    default:
      return 'Practice';
  }
}

export default function QuizModule({ module, onComplete }: ModuleProps<QuizModuleType>) {
  const params = useParams();
  const languageStr = (params?.language as string) || 'french';
  let joinStrategy: JoinStrategy = 'space';
  try {
    joinStrategy = getLanguageConfig(languageStr).joinStrategy;
  } catch (e) {
    // fallback
  }

  const { activities } = module.config as unknown as { activities: unknown[] };
  const questions = activities || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [builtTokens, setBuiltTokens] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const currentQ = getQuestion(questions[currentIndex]);
  const answer = getAnswer(currentQ);
  const questionType = currentQ.type || 'mcq';

  const availableTokens = useMemo(() => {
    const tokens = currentQ.tokens || [];
    return tokens.filter((token, index) => {
      const usedCount = builtTokens.filter(item => item === token).length;
      const tokenCountBeforeIndex = tokens.slice(0, index + 1).filter(item => item === token).length;
      return usedCount < tokenCountBeforeIndex;
    });
  }, [builtTokens, currentQ.tokens]);

  const resetQuestionState = () => {
    setSelected(null);
    setTypedAnswer('');
    setBuiltTokens([]);
    setIsChecking(false);
    setIsCorrect(false);
    setAttempts(0);
  };

  const completeQuestion = (correct: boolean, actualAnswer?: string) => {
    setIsCorrect(correct);
    setIsChecking(true);

    eventBus.emit('ActivityCompleted', {
      activityId: currentQ.id || `quiz-q-${currentIndex}`,
      moduleId: module.id,
      conceptId: currentQ.conceptId,
      correct,
      skill: questionType === 'speaking' ? 'speaking' : questionType === 'listening' ? 'listening' : 'vocabulary',
      context: questionType,
      timeSpentMs: 0,
    });

    if (!correct && currentQ.conceptId) {
      let mistakeType: 'meaning' | 'spelling' | 'pronunciation' | 'listening' = 'meaning';
      if (questionType === 'speaking') mistakeType = 'pronunciation';
      else if (questionType === 'listening') mistakeType = 'listening';
      else if (questionType === 'typing' || questionType === 'fill') mistakeType = 'spelling';
      
      const explanationText = currentQ.explanation || (mistakeType === 'spelling' ? `The correct spelling is "${answer}".` : `This means "${answer}".`);
      
      eventBus.emit('ActivityFailed', {
        conceptId: currentQ.conceptId,
        expected: answer,
        actual: actualAnswer || 'No answer provided',
        mistakeType,
        explanation: explanationText
      });
    }

    eventBus.emit('AudioFeedback', { type: correct ? 'correct' : 'wrong' });
  };

  const handleOptionCheck = () => {
    if (!selected) return;
    completeQuestion(isAnswerMatch(selected, answer), selected);
  };

  const handleTextSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!typedAnswer.trim()) return;
    const correct = isAnswerMatch(typedAnswer, answer);
    setAttempts(value => value + 1);
    completeQuestion(correct, typedAnswer);
  };

  const handleSentenceCheck = () => {
    const built = joinSentence(builtTokens, joinStrategy);
    const correct = isAnswerMatch(built, answer);
    setAttempts(value => value + 1);
    completeQuestion(correct, built);
  };

  const handleRetry = () => {
    setIsChecking(false);
    setIsCorrect(false);
    setSelected(null);
    setTypedAnswer('');
    setBuiltTokens([]);
  };

  const handleNext = () => {
    resetQuestionState();

    if (currentIndex + 1 >= questions.length) {
      eventBus.emit('ModuleCompleted', { moduleId: module.id });
      onComplete();
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  if (!currentQ) return null;

  const explanationText = currentQ.explanation || (
    isCorrect
      ? 'Excellent! You are building confidence.'
      : `Almost! Correct answer: ${answer}. Try once more.`
  );

  const renderOptions = () => (
    <div className="w-full flex flex-col gap-4">
      {currentQ.options?.map((opt, idx) => {
        let btnClass = "p-4 text-xl border-2 rounded-2xl font-medium transition-all text-left ";

        if (!isChecking) {
          btnClass += selected === opt
            ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow"
            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200";
        } else if (isAnswerMatch(opt, answer)) {
          btnClass += "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 font-bold";
        } else if (selected === opt && !isCorrect) {
          btnClass += "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
        } else {
          btnClass += "border-gray-200 opacity-50 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200";
        }

        return (
          <button
            key={`quiz-${module.id}-q${currentIndex}-opt-${idx}`}
            disabled={isChecking}
            onClick={() => setSelected(opt)}
            className={btnClass}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );

  const renderTextInput = () => (
    <form onSubmit={handleTextSubmit} className="w-full flex flex-col gap-4">
      <input
        type="text"
        value={typedAnswer}
        onChange={(event) => setTypedAnswer(event.target.value)}
        disabled={isChecking}
        placeholder="Type your answer..."
        className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xl text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
        autoFocus
      />
      {!isChecking && (
        <button
          type="submit"
          disabled={!typedAnswer.trim()}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold rounded-2xl text-xl shadow-lg transition-colors"
        >
          Check
        </button>
      )}
    </form>
  );

  const renderSentenceBuilder = () => (
    <div className="w-full flex flex-col gap-5">
      <div className="min-h-[72px] p-4 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 flex flex-wrap gap-2">
        {builtTokens.length === 0 ? (
          <span className="text-gray-400 font-medium">Arrange the words here</span>
        ) : (
          builtTokens.map((token, idx) => (
            <button
              key={`built-${idx}-${token}`}
              onClick={() => !isChecking && setBuiltTokens(items => items.filter((_, itemIndex) => itemIndex !== idx))}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold"
            >
              {token}
            </button>
          ))
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTokens.map((token, idx) => (
          <button
            key={`token-${idx}-${token}`}
            disabled={isChecking}
            onClick={() => setBuiltTokens(items => [...items, token])}
            className="px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold hover:border-blue-400"
          >
            {token}
          </button>
        ))}
      </div>

      {!isChecking && (
        <button
          onClick={handleSentenceCheck}
          disabled={builtTokens.length === 0}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold rounded-2xl text-xl shadow-lg transition-colors"
        >
          Check Sentence
        </button>
      )}
    </div>
  );

  const renderQuestionBody = () => {
    if (questionType === 'listening') {
      return (
        <div className="w-full flex flex-col items-center gap-6">
          <PlayAudioActivity textToSpeak={currentQ.audioText || currentQ.phrase || answer} />
          {renderOptions()}
        </div>
      );
    }

    if (questionType === 'speaking') {
      return (
        <div className="w-full flex flex-col items-center gap-5">
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{answer}</p>
          <SpeechActivity 
            expectedText={answer} 
            pronunciation={currentQ.pronunciation}
            onSuccess={() => completeQuestion(true)} 
          />
        </div>
      );
    }

    if (questionType === 'typing' || questionType === 'fill') {
      return renderTextInput();
    }

    if (questionType === 'sentence_build') {
      return renderSentenceBuilder();
    }

    return renderOptions();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 max-w-xl mx-auto w-full">
      <div className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex justify-between">
        <span>{currentQ.phaseTitle || getPhaseLabel(questionType)}</span>
        <span>{currentIndex + 1} of {questions.length}</span>
      </div>

      {questionType === 'fill' && currentQ.phrase ? (
        <div className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          {currentQ.phrase}
        </div>
      ) : (
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          {getPrompt(currentQ)}
        </h2>
      )}

      {renderQuestionBody()}

      {isChecking && (
        <div className={`w-full mt-6 p-4 rounded-2xl border text-sm animate-fade-in ${
          isCorrect
            ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
            : 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300'
        }`}>
          <p className="font-bold mb-1 text-base">
            {isCorrect ? 'Excellent!' : 'Almost!'}
          </p>
          <p>{explanationText}</p>
        </div>
      )}

      <div className="mt-8 flex justify-between w-full items-center min-h-[64px]">
        {isChecking ? (
          <div className="flex gap-3 w-full justify-end">
            {!isCorrect && attempts < 2 && (
              <button
                onClick={handleRetry}
                className="px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl text-lg transition-colors"
              >
                Try Once More
              </button>
            )}
            <button
              onClick={isCorrect || attempts >= 2 ? handleNext : handleRetry}
              className={`px-8 py-4 text-white font-bold rounded-2xl text-xl shadow-lg transition-transform active:scale-95 ${
                isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isCorrect || attempts >= 2 ? 'Continue' : 'Try Again'}
            </button>
          </div>
        ) : (
          questionType !== 'typing' && questionType !== 'fill' && questionType !== 'speaking' && questionType !== 'sentence_build' && (
            <button
              disabled={!selected}
              onClick={handleOptionCheck}
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold rounded-2xl text-xl shadow-lg transition-colors"
            >
              Check Answer
            </button>
          )
        )}
      </div>
    </div>
  );
}
