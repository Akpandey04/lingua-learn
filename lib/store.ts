'use client';
import { create } from 'zustand';
import type { UserProgress } from '@/types';
import { progressService } from './progressService';

interface ProgressStore {
  progress: UserProgress;
  refreshProgress: () => void;
  updateStreak: () => void;
}

export const useProgressStore = create<ProgressStore>((set) => ({
  progress: {
    streak: 0,
    lessons: {},
  },

  refreshProgress: () => {
    set({ progress: progressService.getProgress() });
  },



  updateStreak: () => {
    progressService.updateStreak();
    set({ progress: progressService.getProgress() });
  },
}));
