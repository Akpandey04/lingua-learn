'use client';

interface Props {
  streak: number;
}

export default function StreakBadge({ streak }: Props) {
  if (streak === 0) return null;
  return (
    <div
      className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-bold text-sm"
      aria-label={`${streak} day streak`}
    >
      🔥 {streak}
    </div>
  );
}
