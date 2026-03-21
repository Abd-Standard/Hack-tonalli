import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { apiService } from '../services/api';
import { useT } from '../hooks/useT';

export function PremiumPage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const t = useT();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const benefits = [
    { icon: '📚', text: t('benefit1') },
    { icon: '♾️', text: t('benefit2') },
    { icon: '⚡', text: t('benefit3') },
    { icon: '🏆', text: t('benefit4') },
    { icon: '🎨', text: t('benefit5') },
  ];

  const handleUpgrade = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      await apiService.upgradeToPremium();
      setUser({ ...user, isPremium: true });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || t('errorProcessing'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(245,166,35,0.12), rgba(233,30,140,0.10))',
          borderBottom: '1px solid var(--border)',
          padding: '48px 24px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Xollo with glow */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          style={{
            display: 'inline-block',
            marginBottom: 16,
            filter: 'drop-shadow(0 0 18px rgba(245,166,35,0.7))',
          }}
        >
          <img
            src="/characters/xollo.png"
            alt="Xollo"
            style={{ width: 80, height: 80, objectFit: 'contain' }}
          />
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>{t('becomePremium')}</h1>
          {user?.isPremium ? (
            <span style={{
              background: 'linear-gradient(135deg, #00D4AA, #00A67E)',
              color: '#0A0E17',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 20,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {t('alreadyPremium')}
            </span>
          ) : (
            <span style={{
              background: 'linear-gradient(135deg, #F5A623, #FFD60A)',
              color: '#0A0E17',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 20,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {t('premium')}
            </span>
          )}
        </div>
        <p style={{ color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto' }}>
          {t('premiumUnlockAll')}
        </p>
      </motion.div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>

        {/* Success banner */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(0,212,170,0.12)',
              border: '1px solid rgba(0,212,170,0.4)',
              borderRadius: 12,
              padding: '14px 20px',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#00D4AA',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            <span>✓</span>
            <span>{t('congratsPremium')}</span>
          </motion.div>
        )}

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(233,30,140,0.10)',
              border: '1px solid rgba(233,30,140,0.35)',
              borderRadius: 12,
              padding: '14px 20px',
              marginBottom: 24,
              color: '#E91E8C',
              fontWeight: 600,
              fontSize: '0.92rem',
            }}
          >
            {error}
          </motion.div>
        )}

        {/* Pricing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>

          {/* Premium Mensual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card"
            style={{
              padding: 28,
              border: user?.isPremium
                ? '1.5px solid rgba(0,212,170,0.5)'
                : '1.5px solid rgba(233,30,140,0.4)',
              background: user?.isPremium
                ? 'linear-gradient(145deg, rgba(0,212,170,0.08), rgba(26,31,46,1))'
                : 'linear-gradient(145deg, rgba(233,30,140,0.08), rgba(26,31,46,1))',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Badge */}
            <div style={{
              position: 'absolute', top: 14, right: 14,
              background: user?.isPremium ? 'rgba(0,212,170,0.15)' : 'rgba(233,30,140,0.2)',
              border: `1px solid ${user?.isPremium ? 'rgba(0,212,170,0.4)' : 'rgba(233,30,140,0.4)'}`,
              borderRadius: 12, padding: '2px 8px',
              fontSize: '0.68rem', fontWeight: 700,
              color: user?.isPremium ? '#00D4AA' : '#E91E8C',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              {user?.isPremium ? t('active') : t('popular')}
            </div>

            <div style={{ fontSize: '2rem', marginBottom: 8 }}>⭐</div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4, color: user?.isPremium ? '#00D4AA' : '#E91E8C' }}>
              {t('premiumMonthly')}
            </h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F0F4F8' }}>$20</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('perMonth')}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20, lineHeight: 1.5 }}>
              {t('premiumMonthlyDesc')}
            </p>

            {user?.isPremium ? (
              <div style={{
                width: '100%',
                padding: '10px 0',
                textAlign: 'center',
                background: 'rgba(0,212,170,0.10)',
                border: '1px solid rgba(0,212,170,0.35)',
                borderRadius: 8,
                color: '#00D4AA',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}>
                {t('alreadyPremium')}
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="btn"
                style={{
                  width: '100%',
                  background: loading
                    ? 'rgba(233,30,140,0.3)'
                    : 'linear-gradient(135deg, #E91E8C, #C2185B)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  padding: '10px 0',
                  borderRadius: 8,
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading ? 0.8 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? t('processing') : t('getPremium')}
              </button>
            )}
          </motion.div>

          {/* Certificado Individual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card"
            style={{
              padding: 28,
              border: '1.5px solid rgba(245,166,35,0.4)',
              background: 'linear-gradient(145deg, rgba(245,166,35,0.08), rgba(26,31,46,1))',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>📜</div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4, color: '#F5A623' }}>
              {t('individualCertificate')}
            </h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F0F4F8' }}>$10</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>USD</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20, lineHeight: 1.5 }}>
              {t('individualCertDesc')}
            </p>
            <button
              disabled
              className="btn btn-ghost"
              style={{
                width: '100%',
                border: '1px solid rgba(245,166,35,0.35)',
                color: 'rgba(245,166,35,0.6)',
                cursor: 'not-allowed',
                opacity: 0.75,
              }}
            >
              {t('comingSoonBtn')}
            </button>
          </motion.div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="card"
          style={{ padding: 28, marginBottom: 24 }}
        >
          <h3 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 20 }}>
            {t('premiumBenefits')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.07 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(0,212,170,0.12)',
                  border: '1px solid rgba(0,212,170,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#00D4AA', fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ fontSize: '0.92rem', color: 'var(--text)' }}>{b.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          style={{ textAlign: 'center' }}
        >
          {!user?.isPremium && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 12 }}>
              {t('premiumTerms')}
            </p>
          )}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm"
          >
            {t('goBack')}
          </button>
        </motion.div>

      </div>
    </div>
  );
}
