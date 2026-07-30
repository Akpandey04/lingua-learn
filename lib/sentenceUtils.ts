/**
 * Joins words into a single sentence using the provided strategy.
 */
export function joinSentence(words: string[], joinStrategy: 'space' | 'none'): string {
  if (joinStrategy === 'none') {
    return words.join('');
  }
  // Default to 'space'
  return words.join(' ');
}
