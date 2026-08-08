'use client';
import { useState } from 'react';
import { KeyboardLayout } from '@/lib/keyboardLayouts';

interface Props {
  layout: KeyboardLayout;
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  className?: string;
}

export default function VirtualKeyboard({ layout, onKeyPress, onBackspace, className = '' }: Props) {
  const [isShifted, setIsShifted] = useState(false);

  const handleKey = (char: string) => {
    onKeyPress(isShifted ? char.toUpperCase() : char);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto flex flex-col gap-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-inner ${className}`}>
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2">
          {rowIndex === layout.length - 1 && (
            <button
              type="button"
              onClick={() => setIsShifted(!isShifted)}
              className={`px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center min-w-[3rem] ${
                isShifted
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
              }`}
            >
              ⇧
            </button>
          )}
          
          {row.map((keyChar, keyIndex) => (
            <button
              key={`${rowIndex}-${keyIndex}`}
              type="button"
              onClick={() => handleKey(keyChar)}
              className="flex-1 max-w-[3.5rem] py-3 sm:py-4 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl shadow-sm text-lg sm:text-xl font-medium transition-all active:scale-95 flex items-center justify-center"
            >
              {isShifted ? keyChar.toUpperCase() : keyChar}
            </button>
          ))}

          {rowIndex === layout.length - 1 && (
            <button
              type="button"
              onClick={onBackspace}
              className="px-3 sm:px-4 py-3 sm:py-4 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center min-w-[3rem] active:scale-95"
            >
              ⌫
            </button>
          )}
        </div>
      ))}
      
      {/* Spacebar Row */}
      <div className="flex justify-center gap-2 mt-1 px-8">
        <button
          type="button"
          onClick={() => handleKey(' ')}
          className="w-full max-w-md py-3 sm:py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl shadow-sm font-medium transition-all active:scale-95 flex items-center justify-center"
        >
          Space
        </button>
      </div>
    </div>
  );
}
