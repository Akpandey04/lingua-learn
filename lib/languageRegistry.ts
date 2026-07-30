export type JoinStrategy = 'space' | 'none';
export type TextDirection = 'ltr' | 'rtl';

export interface LanguageCapabilities {
  supportsSpeech: boolean;
  supportsTTS: boolean;
  hasIPA: boolean;
}

export interface LanguageConfig {
  id: string;
  displayName: string;
  nativeName: string;
  locale: string; // e.g., 'es-ES'
  direction: TextDirection;
  joinStrategy: JoinStrategy;
  capabilities: LanguageCapabilities;
}

export const LANGUAGE_REGISTRY: Record<string, LanguageConfig> = {
  french: {
    id: 'french',
    displayName: 'French',
    nativeName: 'Français',
    locale: 'fr-FR',
    direction: 'ltr',
    joinStrategy: 'space',
    capabilities: {
      supportsSpeech: true,
      supportsTTS: true,
      hasIPA: true,
    }
  },
  spanish: {
    id: 'spanish',
    displayName: 'Spanish',
    nativeName: 'Español',
    locale: 'es-ES',
    direction: 'ltr',
    joinStrategy: 'space',
    capabilities: {
      supportsSpeech: true,
      supportsTTS: true,
      hasIPA: true,
    }
  },
  german: {
    id: 'german',
    displayName: 'German',
    nativeName: 'Deutsch',
    locale: 'de-DE',
    direction: 'ltr',
    joinStrategy: 'space',
    capabilities: {
      supportsSpeech: true,
      supportsTTS: true,
      hasIPA: true,
    }
  },
  hindi: {
    id: 'hindi',
    displayName: 'Hindi',
    nativeName: 'हिन्दी',
    locale: 'hi-IN',
    direction: 'ltr',
    joinStrategy: 'space', // Can be customized later if needed
    capabilities: {
      supportsSpeech: true,
      supportsTTS: true,
      hasIPA: true, // we might use romanization
    }
  },
  japanese: {
    id: 'japanese',
    displayName: 'Japanese',
    nativeName: '日本語',
    locale: 'ja-JP',
    direction: 'ltr',
    joinStrategy: 'none',
    capabilities: {
      supportsSpeech: true,
      supportsTTS: true,
      hasIPA: false, // typically uses romaji/furigana instead of strict IPA
    }
  }
};

export function getLanguageConfig(id: string): LanguageConfig {
  const config = LANGUAGE_REGISTRY[id.toLowerCase()];
  if (!config) {
    throw new Error(`Language ${id} is not supported in the registry.`);
  }
  return config;
}
