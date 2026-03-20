import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, MapPin, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const CITIES = [
  'Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana',
  'Mérida', 'Oaxaca', 'Cancún', 'Querétaro', 'San Luis Potosí',
  'León', 'Chihuahua', 'Veracruz', 'Aguascalientes', 'Otra',
];

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (!username || !email) { setError('Completa todos los campos'); return; }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password || !city || !dateOfBirth) { setError('Completa todos los campos'); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    // Client-side age check
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    if (age < 18) { setError('Debes ser mayor de 18 años para registrarte'); return; }
    try {
      await register(username, email, password, city, dateOfBirth);
      navigate('/dashboard');
    } catch {
      setError('Error al registrarse. Intenta de nuevo.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 440 }}
      >
        {/* Character */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span className="bounce-in" style={{ fontSize: '5rem', display: 'block', marginBottom: 16 }}>🐕</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8 }}>¡Únete a Tonalli!</h1>
          <p style={{ color: 'var(--text-muted)' }}>Xollo está emocionado de conocerte</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
          {[1, 2].map((s) => (
            <div key={s} style={{
              height: 6, width: s === step ? 40 : 20,
              borderRadius: 3,
              background: s <= step ? 'var(--primary)' : 'var(--border)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

        <div className="card" style={{ padding: 32 }}>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: 'rgba(255,71,87,0.15)',
                border: '1px solid rgba(255,71,87,0.4)',
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#FF4757',
                fontSize: '0.9rem',
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div className="form-group">
                <label className="form-label">Nombre de usuario</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: 44 }}
                    placeholder="CryptoAzteca"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Correo electrónico</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="input-field"
                    style={{ paddingLeft: 44 }}
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button type="button" className="btn btn-primary btn-full btn-lg" onClick={handleNext}>
                Continuar →
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    style={{ paddingLeft: 44, paddingRight: 44 }}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Fecha de nacimiento</label>
                <input
                  type="date"
                  className="input-field"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                  Debes ser mayor de 18 años
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Ciudad</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1 }} />
                  <select
                    className="input-field"
                    style={{ paddingLeft: 44, cursor: 'pointer' }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Selecciona tu ciudad</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: '0 0 auto' }}>
                  ← Atrás
                </button>
                <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                  {isLoading ? 'Creando cuenta...' : '🚀 ¡Empezar!'}
                </button>
              </div>
            </motion.form>
          )}

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'none' }}>
                Entra aquí
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
