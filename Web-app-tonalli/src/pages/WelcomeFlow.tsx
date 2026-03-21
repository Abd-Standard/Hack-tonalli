import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { apiService } from '../services/api';

export function WelcomeFlow() {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [companion, setCompanion] = useState<'chima' | 'alli' | null>(null);
  const [avatarType, setAvatarType] = useState<'mariachi_hombre' | 'mariachi_mujer' | null>(null);
  const [loading, setLoading] = useState(false);

  const canStart = companion && avatarType;

  const handleStart = async () => {
    if (!canStart) return;
    setLoading(true);
    try {
      await apiService.setupUser(companion, avatarType);
      setUser({ ...user!, companion, avatarType, isFirstLogin: false });
      navigate('/dashboard');
    } catch {
      // on error still navigate
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0E17',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle magenta glow top */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse, rgba(233,30,140,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: 720, width: '100%', position: 'relative', zIndex: 1 }}
      >
        {/* Welcome message */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}>
            Bienvenido a{' '}
            <span style={{
              background: 'linear-gradient(135deg, #F5A623, #E91E8C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Tonalli
            </span>
            {user?.username ? `, ${user.username}` : ''}
          </h1>
        </div>

        {/* Xolo introduction card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: '#111827',
            border: '1px solid #1E2538',
            borderRadius: 16,
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 36,
          }}
        >
          <motion.img
            src="/characters/xollo.png"
            alt="Xolo"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 90, height: 90, objectFit: 'contain', flexShrink: 0 }}
            draggable={false}
          />
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#00D4AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              Xolo — Tu guía
            </div>
            <p style={{ color: '#F0F4F8', fontSize: '1rem', lineHeight: 1.65 }}>
              Hola, mi nombre es <strong style={{ color: '#F5A623' }}>Xolo</strong> y te estaré acompañando en este viaje de conocimiento hacia <strong style={{ color: '#00D4AA' }}>Web3</strong>.
            </p>
          </div>
        </motion.div>

        {/* Companion selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ marginBottom: 32 }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>
            Elige tu acompañante
          </h2>
          <p style={{ color: '#8B95A5', fontSize: '0.85rem', marginBottom: 16 }}>
            Estará contigo en cada lección y quiz.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {([
              { id: 'chima', name: 'Chima', role: 'Guía Maestra', color: '#E91E8C', desc: 'Paciente y detallista. Te explica cada concepto con claridad.' },
              { id: 'alli',  name: 'Alli',  role: 'Desafiador',   color: '#F5A623', desc: 'Competitivo y motivador. Te reta a superar tus límites.' },
            ] as const).map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCompanion(c.id)}
                style={{
                  background: companion === c.id ? `${c.color}18` : '#111827',
                  border: `2px solid ${companion === c.id ? c.color : '#1E2538'}`,
                  borderRadius: 12,
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                <img
                  src={`/characters/${c.id}.png`}
                  alt={c.name}
                  style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 10 }}
                  draggable={false}
                />
                <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 }}>{c.name}</div>
                <div style={{ fontSize: '0.72rem', color: c.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{c.role}</div>
                <p style={{ fontSize: '0.8rem', color: '#8B95A5', lineHeight: 1.5 }}>{c.desc}</p>
                {companion === c.id && (
                  <div style={{ marginTop: 10, fontSize: '0.75rem', fontWeight: 700, color: c.color }}>✓ Seleccionado</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Avatar selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {([
              { id: 'mariachi_hombre', label: 'Mariachi', sub: 'Hombre', emoji: '🎺', color: '#F5A623' },
              { id: 'mariachi_mujer',  label: 'Mariachi', sub: 'Mujer',  emoji: '🎻', color: '#E91E8C' },
            ] as const).map((a) => (
              <motion.div
                key={a.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAvatarType(a.id)}
                style={{
                  background: avatarType === a.id ? `${a.color}18` : '#111827',
                  border: `2px solid ${avatarType === a.id ? a.color : '#1E2538'}`,
                  borderRadius: 12,
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 10 }}>{a.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Space Grotesk', sans-serif" }}>{a.label}</div>
                <div style={{ fontSize: '0.8rem', color: a.color, fontWeight: 600 }}>{a.sub}</div>
                {avatarType === a.id && (
                  <div style={{ marginTop: 8, fontSize: '0.75rem', fontWeight: 700, color: a.color }}>✓ Seleccionado</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start button */}
        <AnimatePresence>
          {canStart && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="btn btn-primary btn-full btn-lg"
                onClick={handleStart}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Comenzar mi viaje →'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {!canStart && (
          <p style={{ textAlign: 'center', color: '#4A5568', fontSize: '0.85rem', marginTop: 8 }}>
            Selecciona un acompañante y un avatar para continuar.
          </p>
        )}
      </motion.div>
    </div>
  );
}
