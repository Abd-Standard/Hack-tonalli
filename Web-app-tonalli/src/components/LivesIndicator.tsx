import { useT } from '../hooks/useT';

interface Props {
  lives: number; // -1 = unlimited (premium)
  lockedUntil: string | null;
}

export function LivesIndicator({ lives }: Props) {
  const t = useT();
  // Premium users
  if (lives === -1) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: '1.1rem' }}>♾️</span>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('unlimited')}</span>
      </div>
    );
  }

  // Module reset (0 attempts left)
  if (lives === 0) {
    return (
      <div className="text-center">
        <div className="flex gap-1 mb-1">
          {[0, 0].map((_, i) => (
            <span key={i} className="text-gray-600 text-lg">&#10084;</span>
          ))}
        </div>
        <div className="bg-red-500/20 px-3 py-1 rounded-full">
          <span className="text-red-400 text-xs font-bold">{t('moduleResetLabel')}</span>
        </div>
      </div>
    );
  }

  // Show hearts (max 2)
  return (
    <div className="flex gap-1">
      {[1, 2].map((i) => (
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
