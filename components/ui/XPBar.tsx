'use client';

interface Props {
  current: number;
  goal?: number;
  label?: string;
}

export default function XPBar({ current, goal = 100, label }: Props) {
  const pct = Math.min(100, Math.round((current / goal) * 100));
  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemax={goal} aria-label={label ?? 'XP Progress'}>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
