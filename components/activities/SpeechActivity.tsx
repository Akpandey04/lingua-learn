'use client';
import { useState, useEffect, useRef } from 'react';
import PlayAudioActivity from './PlayAudioActivity';
import { isAnswerMatch } from '@/lib/utils';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Props {
  expectedText: string;
  lang?: string;
  onSuccess: () => void;
  onFail?: () => void;
  onSkip?: () => void;
  pronunciation?: string;
}

export default function SpeechActivity({ expectedText, lang = 'fr-FR', onSuccess, onFail, onSkip, pronunciation }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'fail' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [forceTyping, setForceTyping] = useState(false);
  const [typedInput, setTypedInput] = useState('');
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = lang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        if (!event.results || !event.results[0] || !event.results[0][0]) return;
        const text = event.results[0][0].transcript.trim();
        setTranscript(text);
        
        if (isAnswerMatch(text, expectedText)) {
          setFeedback('success');
          setTimeout(onSuccess, 1000);
        } else {
          setFeedback('fail');
          setFailedAttempts(prev => prev + 1);
          if (onFail) onFail();
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setFeedback('error');
        
        switch (event.error) {
          case 'not-allowed':
          case 'denied':
            setErrorMessage("I couldn't hear you. Please allow the microphone.");
            break;
          case 'no-speech':
            setErrorMessage("I couldn't hear you. Please try again.");
            break;
          case 'network':
            setErrorMessage("I couldn't hear you clearly. Please try again.");
            break;
          default:
            setErrorMessage("I couldn't hear you. Please try again.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [expectedText, lang, onSuccess, onFail]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setFeedback('idle');
      setErrorMessage('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;

    if (isAnswerMatch(typedInput, expectedText)) {
      setFeedback('success');
      setTimeout(onSuccess, 1000);
    } else {
      setFeedback('fail');
      setFailedAttempts(prev => prev + 1);
      if (onFail) onFail();
    }
  };

  if (forceTyping || (!recognitionRef.current && typeof window !== 'undefined' && !('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window))) {
    return (
      <div className="w-full flex flex-col gap-4 max-w-sm mx-auto">
        {!forceTyping && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 rounded-xl text-sm border border-blue-200 dark:border-blue-800">
            <p className="font-bold mb-1">Let's use typing for this one.</p>
            <p>I couldn't hear you. Type the phrase instead and keep going.</p>
          </div>
        )}
        <form onSubmit={handleTypedSubmit} className="flex flex-col gap-2">
          <input 
            type="text" 
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            placeholder={`Type "${expectedText}"...`}
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
            autoFocus
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow">
              Submit
            </button>
            {onSkip && (
              <button type="button" onClick={onSkip} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                Skip
              </button>
            )}
          </div>
        </form>

        {feedback === 'success' && <div className="text-green-500 font-bold text-center animate-bounce">Excellent!</div>}
        {feedback === 'fail' && <div className="text-orange-500 font-medium text-center">😊 Nice try! Let's practice once more.</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
      {/* Speech Interaction Controls */}
      <div className="flex items-center justify-center gap-4 w-full">
        {/* Listen Again Button */}
        <PlayAudioActivity 
          textToSpeak={expectedText} 
          lang={lang}
          autoPlay={false}
          className="!w-14 !h-14 shadow-md"
        />

        {/* Speak Button */}
        <button 
          onClick={toggleListen}
          aria-label={isListening ? "Stop listening" : "Start speaking"}
          aria-pressed={isListening}
          className={`relative flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isListening ? 'bg-red-500 scale-110 shadow-lg shadow-red-200' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
          }`}
          style={{ width: 64, height: 64 }}
        >
          <span className="text-3xl" aria-hidden="true">{isListening ? '🛑' : '🎤'}</span>
          {isListening && (
            <span className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-50 pointer-events-none" />
          )}
        </button>
      </div>

      <div className="text-center min-h-[36px] flex flex-col items-center gap-1">
        {isListening ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-blue-500 font-bold flex items-center gap-2">
              🎤 Listening... Speak now
            </span>
            <div className="flex gap-1 items-center h-4">
              <span className="w-1 bg-red-500 rounded-full h-3 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 bg-red-500 rounded-full h-4 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 bg-red-500 rounded-full h-2 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="w-1 bg-red-500 rounded-full h-4 animate-bounce" style={{ animationDelay: '450ms' }} />
              <span className="w-1 bg-red-500 rounded-full h-3 animate-bounce" style={{ animationDelay: '600ms' }} />
            </div>
          </div>
        ) : transcript ? (
          <span className="text-gray-800 dark:text-gray-200 font-medium italic">"{transcript}"</span>
        ) : (
          <span className="text-gray-400 font-medium text-sm">Tap mic to speak or listen to pronunciation</span>
        )}
      </div>

      {feedback === 'success' && <div className="text-green-500 font-bold text-lg">Excellent pronunciation!</div>}
      
      {feedback === 'error' && (
        <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium text-center w-full">
          {errorMessage}
        </div>
      )}

      {feedback === 'fail' && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="text-orange-500 font-medium text-center text-sm">
            {failedAttempts === 1 && "😊 Nice try! Let's practice once more."}
            {failedAttempts === 2 && "Almost there! Listen to the pronunciation again."}
            {failedAttempts >= 3 && "No worries! Let me guide you to the next step."}
          </div>
          {pronunciation && (
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 animate-fade-in-up">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1 text-center">Pronunciation</p>
              <p className="text-lg font-mono text-gray-800 dark:text-gray-200 text-center">{pronunciation}</p>
            </div>
          )}
        </div>
      )}

      {/* Persistent Action Bar */}
      {onSkip && (
        <div className="flex justify-center gap-3 mt-2 w-full">
          <button 
            onClick={onSkip} 
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm text-sm"
          >
            ⏭ Skip
          </button>
        </div>
      )}
    </div>
  );
}
