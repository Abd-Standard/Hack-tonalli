import { motion } from 'framer-motion';
import { Flame, Zap, MapPin } from 'lucide-react';
import { mockLeaderboard } from '../data/mockData';

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const MEDAL_EMOJIS = ['🥇', '🥈', '🥉'];

export function Leaderboard() {

  const top3 = mockLeaderboard.slice(0, 3);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,107,53,0.1))',
        borderBottom: '1px solid var(--border)',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.7 }}
        >
          <div style={{ fontSize: '4rem', marginBottom: 12 }}>🏆</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 8 }}>Ranking por Ciudad</h1>
          <p style={{ color: 'var(--text-muted)' }}>Los mejores estudiantes Web3 de México</p>
        </motion.div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Top 3 podium */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 16, marginBottom: 40 }}>
          {/* 2nd place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', flex: 1, maxWidth: 180 }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{top3[1]?.username.charAt(0)}</div>
            <div style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: 4 }}>{top3[1]?.username}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <MapPin size={11} />{top3[1]?.city}
            </div>
            <div style={{
              background: '#C0C0C040',
              border: '2px solid #C0C0C0',
              borderRadius: '12px 12px 0 0',
              padding: '20px 12px 12px',
              height: 120,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🥈</div>
              <div style={{ fontWeight: 900, color: '#C0C0C0', fontSize: '1.1rem' }}>{top3[1]?.xp.toLocaleString()}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP</div>
            </div>
          </motion.div>

          {/* 1st place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ textAlign: 'center', flex: 1, maxWidth: 200 }}
          >
            <div className="float-slow" style={{ fontSize: '3rem', marginBottom: 8 }}>
              {top3[0]?.username.charAt(0)}
            </div>
            <div style={{ fontWeight: 900, marginBottom: 4 }}>{top3[0]?.username}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <MapPin size={11} />{top3[0]?.city}
            </div>
            <div style={{
              background: '#FFD70040',
              border: '2px solid #FFD700',
              borderRadius: '12px 12px 0 0',
              padding: '20px 12px 12px',
              height: 160,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 4 }}>🥇</div>
              <div style={{ fontWeight: 900, color: '#FFD700', fontSize: '1.3rem' }}>{top3[0]?.xp.toLocaleString()}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP</div>
            </div>
          </motion.div>

          {/* 3rd place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', flex: 1, maxWidth: 180 }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{top3[2]?.username.charAt(0)}</div>
            <div style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: 4 }}>{top3[2]?.username}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <MapPin size={11} />{top3[2]?.city}
            </div>
            <div style={{
              background: '#CD7F3240',
              border: '2px solid #CD7F32',
              borderRadius: '12px 12px 0 0',
              padding: '20px 12px 12px',
              height: 100,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🥉</div>
              <div style={{ fontWeight: 900, color: '#CD7F32', fontSize: '1.1rem' }}>{top3[2]?.xp.toLocaleString()}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP</div>
            </div>
          </motion.div>
        </div>

        {/* Rest of leaderboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockLeaderboard.map((entry, i) => (
            <motion.div
              key={entry.userId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: entry.isCurrentUser ? 'rgba(255,107,53,0.15)' : 'var(--card)',
                border: `1px solid ${entry.isCurrentUser ? 'rgba(255,107,53,0.4)' : 'var(--border)'}`,
                borderRadius: 14,
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'all 0.2s',
              }}
            >
              {/* Rank */}
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: i < 3 ? `${MEDAL_COLORS[i]}25` : 'var(--border)',
                border: i < 3 ? `2px solid ${MEDAL_COLORS[i]}` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: i < 3 ? '1.2rem' : '0.9rem',
                color: i < 3 ? MEDAL_COLORS[i] : 'var(--text-muted)',
                flexShrink: 0,
              }}>
                {i < 3 ? MEDAL_EMOJIS[i] : entry.rank}
              </div>

              {/* Avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: entry.isCurrentUser
                  ? 'linear-gradient(135deg, #FF6B35, #FFD700)'
                  : `hsl(${entry.rank * 37}deg, 60%, 40%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '1rem', color: 'white',
                flexShrink: 0,
              }}>
                {entry.username.charAt(0)}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>{entry.username}</span>
                  {entry.isCurrentUser && (
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Tú</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 2, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MapPin size={11} />{entry.city}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nivel {entry.level}</span>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }}>
                {entry.streak > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem' }}>
                    <Flame size={14} color="#FF6B35" />
                    <span style={{ fontWeight: 700, color: '#FF6B35' }}>{entry.streak}</span>
                  </div>
                )}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 900, color: 'var(--accent)', fontSize: '1rem' }}>
                    <Zap size={14} />
                    {entry.xp.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: 40, padding: '32px 24px' }}
        >
          <span className="float-animation" style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>🎸</span>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            <strong style={{ color: 'var(--text)' }}>Alli dice:</strong> "¿Qué esperas? ¡Sube en el ranking!"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
