'use client';
import { useEffect, useState } from 'react';
import { eventBus } from '@/lib/event-bus';
import { playTone } from '@/lib/audio';

export interface Achievement {
  id: string;
  title: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  icon: string;
}

export default function AchievementToast() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleAchievement = (data: Achievement) => {
      setAchievement(data);
      playTone('achievement');
      setTimeout(() => {
        setAchievement(null);
      }, 5000);
    };

    eventBus.on('AchievementUnlocked', handleAchievement);
    return () => eventBus.off('AchievementUnlocked', handleAchievement);
  }, []);

  if (!achievement) return null;

  const tierColors = {
    bronze: 'bg-orange-100 border-orange-300 text-orange-900',
    silver: 'bg-gray-100 border-gray-400 text-gray-900',
    gold: 'bg-yellow-100 border-yellow-400 text-yellow-900',
    diamond: 'bg-blue-100 border-blue-400 text-blue-900'
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className={`flex items-center gap-4 p-4 rounded-full shadow-2xl border-2 ${tierColors[achievement.tier]}`}>
        <div className="text-4xl animate-bounce">{achievement.icon}</div>
        <div className="pr-4">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Achievement Unlocked!</p>
          <p className="text-lg font-extrabold">{achievement.title}</p>
        </div>
      </div>
    </div>
  );
}
