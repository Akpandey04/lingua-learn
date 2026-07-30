'use client';

interface Props {
  hearts: number;
  max?: number;
}

export default function HeartsDisplay({ hearts, max = 5 }: Props) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${hearts} hearts remaining`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`text-xl transition-all duration-300 ${
            i < hearts ? 'opacity-100' : 'opacity-20 grayscale'
          }`}
          aria-hidden="true"
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
