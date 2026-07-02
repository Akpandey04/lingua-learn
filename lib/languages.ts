import type { Language, LanguageCode } from '@/types';

export const LANGUAGES: Record<LanguageCode, Language> = {
  french: {
    code: 'french',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    locale: 'fr-FR',
    color: '#003189',
  },
  german: {
    code: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    locale: 'de-DE',
    color: '#DD0000',
  },
  japanese: {
    code: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    locale: 'ja-JP',
    color: '#BC002D',
  },
  spanish: {
    code: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    locale: 'es-ES',
    color: '#c60b1e',
  },
};

export const LANGUAGE_LIST = Object.values(LANGUAGES);
