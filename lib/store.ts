'use client';
import { create } from 'zustand';
import type { UserProgress } from '@/types';
import { progressService } from './progressService';

interface ProgressStore {
  progress: UserProgress;
  refreshProgress: () => void;
  loseHeart: () => void;
  addXP: (amount: number) => void;
  refillHearts: () => void;
  updateStreak: () => void;
}

export const useProgressStore = create<ProgressStore>((set) => ({
  progress: {
    totalXP: 0,
    streak: 0,
    hearts: 5,
    lessons: {},
  },

  refreshProgress: () => {
    set({ progress: progressService.getProgress() });
  },

  loseHeart: () => {
    progressService.loseHeart();
    set({ progress: progressService.getProgress() });
  },

  addXP: (amount: number) => {
    progressService.addXP(amount);
    set({ progress: progressService.getProgress() });
  },

  refillHearts: () => {
    progressService.refillHearts();
    set({ progress: progressService.getProgress() });
  },

  updateStreak: () => {
    progressService.updateStreak();
    set({ progress: progressService.getProgress() });
  },
}));
