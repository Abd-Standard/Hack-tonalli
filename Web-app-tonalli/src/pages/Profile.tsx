import { motion } from 'framer-motion';
import { Zap, Flame, Star, BookOpen, Award, Copy, ExternalLink } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import { Link } from 'react-router-dom';
import { useT } from '../hooks/useT';

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card"
      style={{ textAlign: 'center', padding: '24px 16px' }}
    >
      <div style={{ color, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</div>
    </motion.div>
  );
}

function NFTCard({ nft }: { nft: { id: string; title: string; description: string; txHash: string; earnedAt: string; moduleId: string } }) {
  const t = useT();
  const shortHash = `${nft.txHash.substring(0, 8)}...${nft.txHash.substring(nft.txHash.length - 8)}`;

  const copyHash = () => {
    navigator.clipboard.writeText(nft.txHash);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: 'linear-gradient(135deg, rgba(155,89,182,0.3), rgba(255,107,53,0.2))',
        border: '1px solid rgba(155,89,182,0.4)',
        borderRadius: 16,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shine effect */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
        borderRadius: '16px 16px 0 0',
      }} />

      {/* NFT image placeholder */}
      <div style={{
        width: '100%', paddingBottom: '100%',
        background: 'linear-gradient(135deg, #9B59B6, #FF6B35)',
        borderRadius: 12,
        marginBottom: 16,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>🏆</span>
        </div>
      </div>

      <div className="badge badge-purple" style={{ marginBottom: 8 }}>{t('nftCertified')}</div>
      <h3 style={{ fontWeight: 900, fontSize: '1rem', marginBottom: 6 }}>{nft.title}</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>{nft.description}</p>

      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 6 }}>{t('stellarTxHash')}</div>
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 8, padding: '8px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
      }}>
        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {shortHash}
        </span>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button onClick={copyHash} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2 }}>
            <Copy size={14} />
          </button>
          <a href={`https://stellar.expert/explorer/public/tx/${nft.txHash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        {t('obtainedOn')} {new Date(nft.earnedAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </motion.div>
  );
}

export function Profile() {
  const { user } = useAuthStore();
  const { dailyStreak, completedLessons } = useProgressStore();
  const t = useT();

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link to="/login" className="btn btn-primary">{t('loginBtn')}</Link>
      </div>
    );
  }

  const xpToNextLevel = user.level * 500;
  const currentLevelXP = (user.level - 1) * 500;
  const xpProgress = ((user.xp - currentLevelXP) / (xpToNextLevel - currentLevelXP)) * 100;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 50%, #1A2E1A 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '40px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.7 }}
          style={{ position: 'relative' }}
        >
          {/* Avatar */}
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', fontWeight: 900, color: 'white',
            margin: '0 auto 16px',
            border: '4px solid rgba(255,107,53,0.5)',
            boxShadow: '0 0 30px rgba(255,107,53,0.4)',
          }}>
            {user.username.charAt(0).toUpperCase()}
          </div>

          {/* Level badge */}
          <div style={{
            position: 'absolute', bottom: 12, right: 'calc(50% - 60px)',
            background: 'var(--primary)',
            color: 'white', fontWeight: 900, fontSize: '0.75rem',
            padding: '3px 10px', borderRadius: 20,
            border: '2px solid var(--background)',
          }}>
            {t('levelBadge')} {user.level}
          </div>
        </motion.div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 4 }}>{user.username}</h1>
        <div style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: '0.9rem' }}>
          📍 {user.city} · {user.email}
        </div>

        {user.walletAddress && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)',
            borderRadius: 20, padding: '6px 14px', fontSize: '0.8rem',
          }}>
            ⭐ {t('stellarWallet')}: {user.walletAddress}
          </div>
        )}
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ marginBottom: 24, padding: '24px 28px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{t('progressToLevel').replace('{n}', String(user.level + 1))}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {user.xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent)' }}>
              <Zap size={18} color="var(--accent)" />
              {(xpToNextLevel - user.xp).toLocaleString()} {t('xpToLevelUp')}
            </div>
          </div>
          <div className="progress-bar" style={{ height: 14 }}>
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(xpProgress, 100)}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ width: `${Math.min(xpProgress, 100)}%` }}
            />
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 32 }}
        >
          <StatCard icon={<Flame size={28} />} value={dailyStreak} label={`${t('streak')} (${t('days')})`} color="#FF6B35" />
          <StatCard icon={<Zap size={28} />} value={`${user.xp.toLocaleString()} XP`} label={t('totalXp')} color="#FFD700" />
          <StatCard icon={<Star size={28} />} value={`${user.xlmEarned} XLM`} label={t('xlmEarned')} color="#00C896" />
          <StatCard icon={<BookOpen size={28} />} value={completedLessons.length} label={t('completedModules')} color="#9B59B6" />
          <StatCard icon={<Award size={28} />} value={user.nftCertificates.length} label={t('nftBadges')} color="#3498DB" />
        </motion.div>

        {/* Streak section */}
        {dailyStreak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{
              marginBottom: 32,
              background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,215,0,0.1))',
              border: '1px solid rgba(255,107,53,0.3)',
              display: 'flex', alignItems: 'center', gap: 20, padding: '24px 28px', flexWrap: 'wrap',
            }}
          >
            <span className="float-animation" style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>🐕</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 900, fontSize: '1.2rem', marginBottom: 4 }}>
                {t('xolloHappyStreak').replace('{n}', String(dailyStreak))}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {t('streakMaintained').replace('{n}', String(dailyStreak))}
              </p>
            </div>
            <div style={{
              background: 'rgba(255,107,53,0.2)', borderRadius: 12, padding: '12px 20px', textAlign: 'center',
              border: '1px solid rgba(255,107,53,0.4)',
            }}>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--primary)' }}>🔥 {dailyStreak}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('activeDays')}</div>
            </div>
          </motion.div>
        )}

        {/* NFT Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>🎨 {t('myCertificates')}</h2>
            <span className="badge badge-purple">{user.nftCertificates.length} tokens</span>
          </div>

          {user.nftCertificates.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {user.nftCertificates.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎨</div>
              <h3 style={{ marginBottom: 8 }}>{t('noCertificates')}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.9rem' }}>
                {t('completeModulesForNft')}
              </p>
              <Link to="/dashboard" className="btn btn-primary">{t('startLearning')}</Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
