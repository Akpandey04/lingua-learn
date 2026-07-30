'use client';
import { useEffect } from 'react';

interface Props {
  active: boolean;
}

// Lightweight CSS-only confetti burst — no external deps
export default function Confetti({ active }: Props) {
  useEffect(() => {
    if (!active) return;
    // Trigger CSS animation via a custom event or class toggle
    const el = document.getElementById('confetti-container');
    if (!el) return;
    el.classList.add('confetti-burst');
    const timer = setTimeout(() => el.classList.remove('confetti-burst'), 1500);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  const pieces = Array.from({ length: 30 });
  const colors = ['#ffd700', '#ff6b6b', '#48dbfb', '#ff9ff3', '#1dd1a1', '#feca57'];

  return (
    <div
      id="confetti-container"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((_, i) => {
        const color = colors[i % colors.length];
        const left = `${Math.random() * 100}%`;
        const delay = `${Math.random() * 0.5}s`;
        const duration = `${0.8 + Math.random() * 0.7}s`;
        const size = `${6 + Math.floor(Math.random() * 8)}px`;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: '-20px',
              left,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              animation: `confetti-fall ${duration} ${delay} ease-in forwards`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
