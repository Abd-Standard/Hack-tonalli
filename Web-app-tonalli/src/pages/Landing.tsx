import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Users, BookOpen, Coins, Shield, Zap, Globe, Star } from 'lucide-react';
import { useT } from '../hooks/useT';

const fadeUp = {
  initial: { y: 32, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// Star dot positions for decorative background
const starDots = [
  { top: '8%',  left: '12%',  size: 2, opacity: 0.6, gold: false },
  { top: '15%', left: '78%',  size: 3, opacity: 0.8, gold: true  },
  { top: '22%', left: '5%',   size: 2, opacity: 0.5, gold: false },
  { top: '28%', left: '90%',  size: 2, opacity: 0.6, gold: false },
  { top: '35%', left: '18%',  size: 1, opacity: 0.4, gold: false },
  { top: '42%', left: '85%',  size: 3, opacity: 0.7, gold: true  },
  { top: '55%', left: '8%',   size: 2, opacity: 0.5, gold: false },
  { top: '60%', left: '93%',  size: 2, opacity: 0.6, gold: false },
  { top: '70%', left: '22%',  size: 1, opacity: 0.4, gold: false },
  { top: '75%', left: '72%',  size: 3, opacity: 0.7, gold: true  },
  { top: '12%', left: '45%',  size: 1, opacity: 0.3, gold: false },
  { top: '80%', left: '55%',  size: 2, opacity: 0.5, gold: false },
  { top: '5%',  left: '62%',  size: 2, opacity: 0.6, gold: false },
  { top: '48%', left: '3%',   size: 1, opacity: 0.4, gold: false },
  { top: '88%', left: '35%',  size: 2, opacity: 0.5, gold: true  },
];

export function Landing() {
  const t = useT();
  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── Hero ───────────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0E17',
      }}>

        {/* Star dots */}
        {starDots.map((dot, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: dot.gold ? '#F5A623' : '#fff',
            opacity: dot.opacity,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Characters: Chima left, Alli right */}
        <motion.img
          src="/characters/chima.png"
          alt="Chima"
          className="float-animation"
          style={{
            position: 'absolute', left: '4%', top: '30%',
            transform: 'translateY(-70%)',
            width: 350, height: 350, objectFit: 'contain',
          }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          draggable={false}
        />
        <motion.img
          src="/characters/alli.png"
          alt="Alli"
          className="float-slow"
          style={{
            position: 'absolute', right: '4%', top: '30%',
            transform: 'translateY(-70%)',
            width: 350, height: 350, objectFit: 'contain',
          }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          draggable={false}
        />

        <motion.div
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Logo centered above text */}
          <motion.div
            style={{ marginBottom: 20 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src="/logo.png"
              alt="Tonalli"
              style={{
                width: 300, height: 300, objectFit: 'contain',
                filter: 'drop-shadow(0 0 14px rgba(0,212,170,0.35)) drop-shadow(0 0 6px rgba(245,166,35,0.25))',
              }}
              draggable={false}
            />
          </motion.div>

          {/* Stellar badge */}
          <div className="badge badge-gold" style={{ marginBottom: 20, gap: 6 }}>
            <Star size={11} fill="currentColor" />
            {t('poweredByStellar')}
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 780,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}>
            {t('heroTitle1')}
            <br />
            <span className="gradient-text">{t('heroTitle2')}</span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: 520,
            margin: '0 auto 36px',
            lineHeight: 1.75,
            fontWeight: 400,
          }}>
            {t('heroDesc')}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              {t('startNow')} <ChevronRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg">
              {t('enter')}
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          style={{
            display: 'flex', gap: 40, marginTop: 64,
            justifyContent: 'center', flexWrap: 'wrap',
            position: 'relative', zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { icon: <Users size={16} />, value: '12,000+', label: t('activeStudents') },
            { icon: <BookOpen size={16} />, value: '40+',     label: t('freeLessons') },
            { icon: <Coins size={16} />,   value: '500 XLM',  label: t('distributedOnNet') },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--gold)', justifyContent: 'center', marginBottom: 6 }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: 52 }}
          >
            <h2 style={{ fontSize: '1.9rem', fontWeight: 700, marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
              {t('howItWorks')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{t('threeSteps')}</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}
          >
            {[
              {
                step: '01',
                icon: <BookOpen size={22} />,
                title: t('stepLearn'),
                accent: '#E91E8C',
                description: t('stepLearnDesc'),
                cta: t('stepLearnCta'),
                char: 'chima',
              },
              {
                step: '02',
                icon: <Zap size={22} />,
                title: t('stepQuiz'),
                accent: '#F5A623',
                description: t('stepQuizDesc'),
                cta: t('stepQuizCta'),
                char: 'alli',
              },
              {
                step: '03',
                icon: <Coins size={22} />,
                title: t('stepEarn'),
                accent: '#00D4AA',
                description: t('stepEarnDesc'),
                cta: t('stepEarnCta'),
                char: 'xollo',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card"
                style={{ padding: 28, position: 'relative', overflow: 'hidden' }}
                whileHover={{ y: -4, borderColor: 'var(--border-active)' }}
              >
                {/* Frosted shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 56,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                  borderRadius: '10px 10px 0 0',
                  pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <div style={{
                    width: 38, height: 38,
                    borderRadius: 8,
                    background: `${feature.accent}18`,
                    border: `1px solid ${feature.accent}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: feature.accent,
                    flexShrink: 0,
                  }}>
                    {feature.icon}
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>
                    {t('step')} {feature.step}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 18 }}>
                  {feature.description}
                </p>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontSize: '0.8rem', fontWeight: 500, color: feature.accent,
                  background: `${feature.accent}12`,
                  border: `1px solid ${feature.accent}25`,
                  padding: '5px 12px', borderRadius: 5,
                }}>
                  <img
                    src={`/characters/${feature.char}.png`}
                    alt=""
                    style={{ width: 20, height: 20, objectFit: 'contain' }}
                    draggable={false}
                  />
                  {feature.cta}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Characters ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 52 }}
          >
            <h2 style={{ fontSize: '1.9rem', fontWeight: 700, marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
              {t('meetYourTeam')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{t('teamDesc')}</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              {
                image: '/characters/chima.png',
                name: 'Chima',
                role: t('chimaRole'),
                accent: '#E91E8C',
                glow: 'rgba(233,30,140,0.32)',
                description: t('chimaDesc'),
                animClass: 'float-animation',
              },
              {
                image: '/characters/alli.png',
                name: 'Alli',
                role: t('alliRole'),
                accent: '#F5A623',
                glow: 'rgba(245,166,35,0.32)',
                description: t('alliDesc'),
                animClass: 'float-slow',
              },
              {
                image: '/characters/xollo.png',
                name: 'Xollo',
                role: t('xolloRole'),
                accent: '#00D4AA',
                glow: 'rgba(0,212,170,0.32)',
                description: t('xolloDesc'),
                animClass: 'float-delay',
              },
            ].map((char, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card"
                style={{ textAlign: 'center', padding: 28 }}
                whileHover={{ y: -5, borderColor: 'var(--border-active)' }}
              >
                <motion.div
                  style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 90, height: 90, borderRadius: '50%',
                    background: `radial-gradient(circle, ${char.glow}, transparent 70%)`,
                    filter: 'blur(14px)', pointerEvents: 'none',
                  }} />
                  <img
                    src={char.image}
                    alt={char.name}
                    className={char.animClass}
                    draggable={false}
                    style={{ width: 120, height: 120, objectFit: 'contain', position: 'relative', filter: `drop-shadow(0 8px 18px ${char.glow})` }}
                  />
                </motion.div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {char.name}
                </h3>
                <div className="badge" style={{
                  background: `${char.accent}15`,
                  color: char.accent,
                  border: `1px solid ${char.accent}30`,
                  marginBottom: 12,
                }}>
                  {char.role}
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.88rem' }}>
                  {char.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 44 }}
          >
            <h2 style={{ fontSize: '1.9rem', fontWeight: 700, marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
              {t('fullCurriculum')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{t('beginnerToExpert')}</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { icon: <Shield size={16} />,  topic: t('topicBlockchain'),   level: t('levelBeginner'), accent: '#E91E8C' },
              { icon: <Coins size={16} />,   topic: t('topicStellar'),      level: t('levelBeginner'), accent: '#00D4AA' },
              { icon: <Zap size={16} />,     topic: t('topicWallets'),      level: t('levelIntermediate'), accent: '#F5A623' },
              { icon: <Globe size={16} />,   topic: t('topicDefi'),         level: t('levelIntermediate'), accent: '#E91E8C' },
              { icon: <Coins size={16} />,   topic: t('topicNfts'),         level: t('levelAdvanced'),     accent: '#FFD60A' },
              { icon: <Shield size={16} />,  topic: t('topicSmartContracts'), level: t('levelAdvanced'),   accent: '#00D4AA' },
              { icon: <BookOpen size={16} />,topic: t('topicTrading'),      level: t('levelIntermediate'), accent: '#F5A623' },
              { icon: <Globe size={16} />,   topic: t('topicWeb3Society'),  level: t('levelAll'),          accent: '#E91E8C' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card"
                style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'default' }}
                whileHover={{ borderColor: 'var(--border-active)', y: -2 }}
              >
                <div style={{ color: item.accent, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{item.topic}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: 2 }}>{item.level}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ marginBottom: 10, position: 'relative', display: 'inline-block' }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 100, height: 100, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,170,0.3), transparent 70%)',
              filter: 'blur(18px)', pointerEvents: 'none',
            }} />
            <img
              src="/characters/xollo.png"
              alt="Xollo"
              className="float-slow"
              style={{ width: 300, height: 300, objectFit: 'contain', position: 'relative', filter: 'drop-shadow(0 10px 12px rgba(0,212,170,0.5))' }}
              draggable={false}
            />
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
            {t('xolloWaiting')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.7 }}>
            {t('joinThousands')}
          </p>

          <Link to="/register" className="btn btn-primary btn-lg pulse-glow">
            {t('createFreeAccount')} <ChevronRight size={18} />
          </Link>
          <p style={{ marginTop: 14, color: 'var(--text-subtle)', fontSize: '0.8rem' }}>

          </p>
        </motion.div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '28px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        
      </footer>
    </div>
  );
}
