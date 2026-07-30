import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioSettingsState {
  playbackRate: number;
  preferredVoiceURI: Record<string, string>; // Maps language code (e.g. 'fr') to voiceURI
  autoPlayVocabulary: boolean;
  autoPlayDialogue: boolean;
  
  setPlaybackRate: (rate: number) => void;
  setPreferredVoiceURI: (lang: string, voiceURI: string) => void;
  setAutoPlayVocabulary: (enabled: boolean) => void;
  setAutoPlayDialogue: (enabled: boolean) => void;
  resetSettings: () => void;
}

const initialState = {
  playbackRate: 0.75, // Default for beginners
  preferredVoiceURI: {},
  autoPlayVocabulary: true,
  autoPlayDialogue: true,
};

export const useAudioSettings = create<AudioSettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setPlaybackRate: (rate) => set({ playbackRate: rate }),
      setPreferredVoiceURI: (lang, voiceURI) => set((state) => ({
        preferredVoiceURI: { ...state.preferredVoiceURI, [lang]: voiceURI }
      })),
      setAutoPlayVocabulary: (enabled) => set({ autoPlayVocabulary: enabled }),
      setAutoPlayDialogue: (enabled) => set({ autoPlayDialogue: enabled }),
      resetSettings: () => set(initialState),
    }),
    {
      name: 'lingua-audio-settings',
    }
  )
);
