export type KeyboardLayout = string[][];

export const KEYBOARD_LAYOUTS: Record<string, KeyboardLayout> = {
  spanish: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'á', 'é', 'í'],
    ['ó', 'ú', 'ü', '¿', '?', '¡', '!', ',', '.', '-']
  ],
  french: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'é', 'è', 'ê', 'ë'],
    ['à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', 'ü', 'œ']
  ],
  german: [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß', ',', '.', '-']
  ],
  japanese: [
    // Hiragana Compact Grid + punctuation
    ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り'],
    ['る', 'れ', 'ろ', 'わ', 'を', 'ん', 'っ', 'ー', '。', '、']
  ]
};

export function getKeyboardLayout(languageId: string): KeyboardLayout | null {
  // Return layout if it exists, otherwise null (e.g. for English)
  return KEYBOARD_LAYOUTS[languageId] || null;
}
