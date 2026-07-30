'use client';
import { useEffect } from 'react';
import { useProgressStore } from '@/lib/store';

export function useProgress() {
  const store = useProgressStore();

  // Hydrate from localStorage on mount
  useEffect(() => {
    store.refreshProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store;
}
