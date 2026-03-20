import { useState, useEffect } from 'react';

interface Props {
  lives: number; // -1 = unlimited (premium)
  lockedUntil: string | null;
}

export function LivesIndicator({ lives, lockedUntil }: Props) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!lockedUntil) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const lock = new Date(lockedUntil).getTime();
      const diff = lock - now;

      if (diff <= 0) {
        setTimeLeft('');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  // Premium users
  if (lives === -1) {
    return (
      <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
        <span className="text-yellow-400 text-sm font-bold">PREMIUM</span>
        <span className="text-sm">Vidas ilimitadas</span>
      </div>
    );
  }

  // Locked
  if (lives === 0 && timeLeft) {
    return (
      <div className="text-center">
        <div className="flex gap-1 mb-1">
          {[0, 0, 0].map((_, i) => (
            <span key={i} className="text-gray-600 text-lg">&#10084;</span>
          ))}
        </div>
        <div className="bg-red-500/20 px-3 py-1 rounded-full">
          <span className="text-red-400 text-xs font-mono">{timeLeft}</span>
        </div>
      </div>
    );
  }

  // Show hearts
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`text-lg ${i <= lives ? 'text-red-500' : 'text-gray-600'}`}
        >
          &#10084;
        </span>
      ))}
    </div>
  );
}
