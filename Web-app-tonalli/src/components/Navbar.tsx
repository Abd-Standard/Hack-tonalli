import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import { Zap, LogOut, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { dailyStreak } = useProgressStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      className="glass"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo */}
      <Link to={isAuthenticated ? '/dashboard' : '/'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src="/logo.png"
          alt="Tonalli"
          style={{ width: 42, height: 42, objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(46,139,63,0.5))' }}
        />
        <span style={{ fontSize: '1.4rem', fontWeight: 900, background: 'linear-gradient(135deg, #2E8B3F, #F5C518)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Tonalli
        </span>
      </Link>

      {/* Right side */}
      {isAuthenticated && user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Streak */}
          {dailyStreak > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(200,39,26,0.15)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(200,39,26,0.35)' }}>
              <span className="streak-fire" style={{ fontSize: '1.1rem' }}>🔥</span>
              <span style={{ fontWeight: 800, color: '#C8271A', fontSize: '0.95rem' }}>{dailyStreak}</span>
            </div>
          )}

          {/* XP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(245,197,24,0.15)', padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(245,197,24,0.35)' }}>
            <Zap size={14} color="#FFD700" />
            <span style={{ fontWeight: 800, color: '#F5C518', fontSize: '0.95rem' }}>{user.xp.toLocaleString()} XP</span>
          </div>

          {/* Nav links */}
          <Link to="/leaderboard" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.9rem', fontWeight: 700 }}>
            <Trophy size={16} />
            <span style={{ display: 'none' }}>Ranking</span>
          </Link>

          {/* Profile */}
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2E8B3F, #F5C518)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 900,
              color: 'white',
              border: '2px solid rgba(46,139,63,0.5)',
            }}>
              {user.username.charAt(0).toUpperCase()}
            </div>
          </Link>

          {/* Logout */}
          <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ padding: '6px 10px' }}>
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" className="btn btn-secondary btn-sm">Entrar</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Empieza gratis</Link>
        </div>
      )}
    </motion.nav>
  );
}
