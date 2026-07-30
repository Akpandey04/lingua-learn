/**
 * Normalizes user string input for fuzzy matching.
 * Handles lowercasing, trimming extra spaces, removing punctuation,
 * and normalizing unicode diacritics/accents.
 */
export function normalizeAnswer(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '');
}

export function isAnswerMatch(input: string, expected: string): boolean {
  const normInput = normalizeAnswer(input);
  const normExpected = normalizeAnswer(expected);
  if (!normInput || !normExpected) return false;
  return normInput === normExpected || normInput.includes(normExpected) || normExpected.includes(normInput);
}
