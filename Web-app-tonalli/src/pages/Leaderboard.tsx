import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, MapPin, Crown, Lock } from 'lucide-react';
import { apiService } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import type { LeaderboardEntry, WeeklyLeaderboard } from '../types';

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const MEDAL_EMOJIS = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];

type Tab = 'global' | 'weekly' | 'city';

export function Leaderboard() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<Tab>('global');
  const [globalData, setGlobalData] = useState<LeaderboardEntry[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyLeaderboard | null>(null);
  const [cityData, setCityData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [weeklyError, setWeeklyError] = useState('');

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === 'global') {
        const data = await apiService.getLeaderboard();
        setGlobalData(data);
      } else if (tab === 'weekly') {
        try {
          const data = await apiService.getWeeklyPodium();
          setWeeklyData(data);
          setWeeklyError('');
        } catch (err: any) {
          setWeeklyError(err.response?.data?.message || 'Solo usuarios Premium');
        }
      } else if (tab === 'city') {
        const city = user?.city || 'Ciudad de México';
        const data = await apiService.getCityLeaderboard(city);
        setCityData(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const renderEntry = (entry: LeaderboardEntry, i: number) => (
    <motion.div
      key={entry.userId || i}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.04 }}
      style={{
        background: entry.isCurrentUser ? 'rgba(255,107,53,0.15)' : 'var(--card)',
        border: `1px solid ${entry.isCurrentUser ? 'rgba(255,107,53,0.4)' : 'var(--border)'}`,
        borderRadius: 14,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
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

      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: `hsl(${(entry.rank || i) * 37}deg, 60%, 40%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: '1rem', color: 'white', flexShrink: 0,
      }}>
        {(entry.displayName || entry.username || '?').charAt(0)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>{entry.displayName || entry.username}</span>
          {entry.isPremium && <Crown size={14} color="#FFD700" />}
          {entry.isCurrentUser && (
            <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Tu</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 2 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <MapPin size={11} />{entry.city}
          </span>
        </div>
      </div>

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
            {(entry.xp || 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP</div>
        </div>
      </div>
    </motion.div>
  );

  const entries = tab === 'global' ? globalData : tab === 'city' ? cityData : (weeklyData?.rankings || []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,107,53,0.1))',
        borderBottom: '1px solid var(--border)',
        padding: '40px 24px 20px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: 12 }}>{'\uD83C\uDFC6'}</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>Rankings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Los mejores estudiantes Web3 de Mexico</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
          {[
            { key: 'global' as Tab, label: 'Global', icon: '\uD83C\uDF0D' },
            { key: 'weekly' as Tab, label: 'Podio Semanal', icon: '\u2B50' },
            { key: 'city' as Tab, label: `${user?.city || 'Ciudad'}`, icon: '\uD83D\uDCCD' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: tab === t.key ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: tab === t.key ? 'rgba(255,215,0,0.15)' : 'transparent',
                color: tab === t.key ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: tab === t.key ? 700 : 400,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Weekly rewards info */}
        {tab === 'weekly' && weeklyData && (
          <div style={{
            marginTop: 16,
            display: 'flex', gap: 12, justifyContent: 'center',
            fontSize: '0.85rem',
          }}>
            <span style={{ color: '#FFD700' }}>{'\uD83E\uDD47'} ${weeklyData.rewards.first} USD</span>
            <span style={{ color: '#C0C0C0' }}>{'\uD83E\uDD48'} ${weeklyData.rewards.second} USD</span>
            <span style={{ color: '#CD7F32' }}>{'\uD83E\uDD49'} ${weeklyData.rewards.third} USD</span>
          </div>
        )}
      </div>

      <div className="container" style={{ padding: '24px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div className="animate-spin" style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto' }} />
          </div>
        ) : tab === 'weekly' && weeklyError ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <Lock size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Podio Exclusivo Premium</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{weeklyError}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Hazte Premium para competir por recompensas semanales en XLM
            </p>
          </div>
        ) : entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
            No hay datos de ranking todavia
          </div>
        ) : (
          <>
            {/* Top 3 visual podium */}
            {entries.length >= 3 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 16, marginBottom: 40 }}>
                {[1, 0, 2].map((pos) => {
                  const e = entries[pos];
                  if (!e) return null;
                  const heights = [160, 120, 100];
                  return (
                    <motion.div
                      key={pos}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: pos * 0.1 }}
                      style={{ textAlign: 'center', flex: 1, maxWidth: pos === 0 ? 200 : 180 }}
                    >
                      <div style={{ fontSize: pos === 0 ? '3rem' : '2.5rem', marginBottom: 8 }}>
                        {(e.displayName || e.username || '?').charAt(0)}
                      </div>
                      <div style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: 4 }}>
                        {e.displayName || e.username}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <MapPin size={11} />{e.city}
                      </div>
                      <div style={{
                        background: `${MEDAL_COLORS[pos]}40`,
                        border: `2px solid ${MEDAL_COLORS[pos]}`,
                        borderRadius: '12px 12px 0 0',
                        padding: '20px 12px 12px',
                        height: heights[pos],
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      }}>
                        <div style={{ fontSize: pos === 0 ? '2rem' : '1.5rem', marginBottom: 4 }}>
                          {MEDAL_EMOJIS[pos]}
                        </div>
                        <div style={{ fontWeight: 900, color: MEDAL_COLORS[pos], fontSize: pos === 0 ? '1.3rem' : '1.1rem' }}>
                          {(e.xp || 0).toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>XP</div>
                        {tab === 'weekly' && (
                          <div style={{ fontSize: '0.75rem', color: MEDAL_COLORS[pos], marginTop: 4, fontWeight: 700 }}>
                            ${[15, 10, 5][pos]} USD
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Full list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {entries.map((e, i) => renderEntry({
                ...e,
                rank: e.rank || i + 1,
                isCurrentUser: e.userId === user?.id || (e as any).isCurrentUser,
              }, i))}
            </div>
          </>
        )}

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: 40, padding: '32px 24px' }}
        >
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>{'\uD83C\uDFB8'}</span>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            <strong style={{ color: 'var(--text)' }}>Alli dice:</strong> "Que esperas? Sube en el ranking!"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
