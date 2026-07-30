'use client';
import React from 'react';

interface Props {
  children: React.ReactNode;
  onSkip?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ModuleErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Module Error Caught:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">This activity couldn't load.</h3>
          <p className="text-red-600 dark:text-red-300 text-sm mb-6 max-w-sm">
            Something went wrong while rendering this learning module. You can try again or skip it to continue your lesson.
          </p>
          <div className="bg-white/50 p-4 rounded-xl mb-6 font-mono text-xs text-red-800 text-left w-full overflow-auto">
            {this.state.error?.message}
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={this.resetError}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 font-bold border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-50 dark:hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              Retry
            </button>
            {this.props.onSkip && (
              <button 
                onClick={() => {
                  this.resetError();
                  this.props.onSkip!();
                }}
                className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                Skip Activity
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
