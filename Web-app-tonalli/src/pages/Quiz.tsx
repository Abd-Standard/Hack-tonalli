import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, Zap, Star } from 'lucide-react';
import { mockQuizQuestions, mockModules } from '../data/mockData';
import type { QuizQuestion, Lesson } from '../types';
import { CharacterReaction } from '../components/CharacterReaction';
import { Confetti } from '../components/Confetti';
import { useProgressStore } from '../stores/progressStore';
import { useAuthStore } from '../stores/authStore';

type AnswerState = 'idle' | 'correct' | 'wrong';
type GameState = 'playing' | 'finished';

export function Quiz() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { markLessonComplete } = useProgressStore();
  const { user, setUser } = useAuthStore();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [showExplanation, setShowExplanation] = useState(false);
  const [characterMood, setCharacterMood] = useState<'idle' | 'happy' | 'excited' | 'thinking' | 'wrong' | 'celebrate'>('thinking');
  const [characterMessage, setCharacterMessage] = useState('¿Estás listo? ¡Demuestra lo que sabes!');
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    // Load questions
    const qs = mockQuizQuestions[lessonId || ''] || [];
    setQuestions(qs);

    // Find lesson
    for (const mod of mockModules) {
      const found = mod.lessons.find((l) => l.id === lessonId);
      if (found) { setLesson(found); break; }
    }
  }, [lessonId]);

  const currentQuestion = questions[currentQ];
  const progress = questions.length > 0 ? ((currentQ) / questions.length) * 100 : 0;
  const passed = score >= Math.ceil(questions.length * 0.6);

  const handleAnswer = (optionIndex: number) => {
    if (answerState !== 'idle') return;

    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      setAnswerState('correct');
      setScore((s) => s + 1);
      setCharacterMood('excited');
      setCharacterMessage('¡Excelente! ¡Esa es la correcta! 🎉');
    } else {
      setAnswerState('wrong');
      setCharacterMood('wrong');
      setCharacterMessage('¡Uy! Esa no es. ¡Aprende de tus errores!');
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setAnswerState('idle');
      setShowExplanation(false);
      setCharacterMood('thinking');
      setCharacterMessage('¡Siguiente pregunta! Tú puedes.');
    } else {
      // Finish quiz
      const finalScore = score + (answerState === 'correct' ? 0 : 0);
      const isPassed = finalScore >= Math.ceil(questions.length * 0.6);
      const earned = lesson ? (isPassed ? lesson.xpReward : Math.floor(lesson.xpReward * 0.3)) : 0;

      setXpEarned(earned);
      setGameState('finished');
      markLessonComplete(lessonId || '');

      if (isPassed) {
        setCharacterMood('celebrate');
        setCharacterMessage('¡LO LOGRASTE! ¡Eres increíble!');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        setCharacterMood('thinking');
        setCharacterMessage('Inténtalo de nuevo. ¡Sé que puedes mejorar!');
      }

      // Update user XP in store
      if (user) {
        setUser({ ...user, xp: user.xp + earned });
      }
    }
  };

  if (questions.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>📝</div>
          <h2 style={{ marginBottom: 12 }}>Quiz no disponible</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Este quiz aún está en preparación</p>
          <Link to="/dashboard" className="btn btn-primary">← Volver al inicio</Link>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Confetti active={showConfetti} />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ width: '100%', maxWidth: 520, textAlign: 'center' }}
        >
          {/* Character */}
          <div style={{ marginBottom: 32 }}>
            <CharacterReaction
              character={passed ? 'chima' : 'alli'}
              mood={passed ? 'celebrate' : 'thinking'}
              message={characterMessage}
              size="lg"
            />
          </div>

          <div className="card" style={{ padding: 40 }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 8 }}>
              {passed ? '🏆 ¡Aprobado!' : '💪 ¡Casi!'}
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: '1.05rem' }}>
              {passed ? '¡Superaste el quiz con éxito!' : 'Sigue practicando, cada intento te hace mejor'}
            </p>

            {/* Score circle */}
            <div style={{
              width: 120, height: 120,
              borderRadius: '50%',
              background: passed ? 'rgba(0,200,150,0.15)' : 'rgba(255,107,53,0.15)',
              border: `4px solid ${passed ? 'var(--success)' : 'var(--primary)'}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: passed ? 'var(--success)' : 'var(--primary)' }}>{percentage}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{score}/{questions.length}</div>
            </div>

            {/* Rewards */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 32, justifyContent: 'center' }}>
              <div style={{
                background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: 12, padding: '12px 20px', textAlign: 'center',
              }}>
                <Zap size={20} color="var(--accent)" style={{ marginBottom: 4 }} />
                <div style={{ fontWeight: 900, color: 'var(--accent)', fontSize: '1.3rem' }}>+{xpEarned}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>XP ganados</div>
              </div>
              {passed && lesson && lesson.xlmReward > 0 && (
                <div style={{
                  background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.3)',
                  borderRadius: 12, padding: '12px 20px', textAlign: 'center',
                }}>
                  <Star size={20} color="var(--success)" style={{ marginBottom: 4 }} />
                  <div style={{ fontWeight: 900, color: 'var(--success)', fontSize: '1.3rem' }}>+{lesson.xlmReward}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>XLM ganados</div>
                </div>
              )}
              {passed && (
                <div style={{
                  background: 'rgba(155,89,182,0.1)', border: '1px solid rgba(155,89,182,0.3)',
                  borderRadius: 12, padding: '12px 20px', textAlign: 'center',
                }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 4 }}>🎨</span>
                  <div style={{ fontWeight: 900, color: '#9B59B6', fontSize: '0.9rem' }}>NFT Badge</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Certificado</div>
                </div>
              )}
            </div>

            {/* NFT earned notification */}
            {passed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(155,89,182,0.2), rgba(255,107,53,0.2))',
                  border: '1px solid rgba(155,89,182,0.4)',
                  borderRadius: 12, padding: '14px 16px',
                  marginBottom: 24,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <span style={{ fontSize: '2rem' }}>🏅</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>¡NFT Certificado minteado!</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Tx: {Math.random().toString(36).substring(2, 20)}...stellar
                  </div>
                </div>
              </motion.div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              {!passed && (
                <button
                  onClick={() => { setCurrentQ(0); setScore(0); setGameState('playing'); setSelectedAnswer(null); setAnswerState('idle'); setShowExplanation(false); setCharacterMood('thinking'); setCharacterMessage('¡Vamos a intentarlo de nuevo!'); }}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  🔄 Reintentar
                </button>
              )}
              <Link to="/dashboard" className="btn btn-primary" style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                🏠 Inicio
              </Link>
              <Link to="/profile" className="btn btn-gold" style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                👤 Perfil
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
      {/* Header */}
      <div style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link to="/dashboard" style={{ color: 'var(--text-muted)', display: 'flex' }}>
          <X size={24} />
        </Link>
        <div style={{ flex: 1 }}>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          {currentQ + 1}/{questions.length}
        </div>
      </div>

      <div style={{ paddingTop: 24, paddingBottom: 40 }}>
        {/* Character */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <CharacterReaction
            character={answerState === 'wrong' ? 'alli' : 'chima'}
            mood={characterMood}
            message={characterMessage}
            size="sm"
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card" style={{ padding: '28px 32px', marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>
                PREGUNTA {currentQ + 1}
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, lineHeight: 1.5 }}>
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {currentQuestion.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === currentQuestion.correctIndex;
                let borderColor = 'var(--border)';
                let bg = 'var(--card)';
                let textColor = 'var(--text)';
                let icon = null;

                if (answerState !== 'idle') {
                  if (isCorrect) {
                    borderColor = 'var(--success)';
                    bg = 'rgba(0,200,150,0.15)';
                    textColor = 'var(--success)';
                    icon = <CheckCircle size={20} color="var(--success)" />;
                  } else if (isSelected && !isCorrect) {
                    borderColor = 'var(--danger)';
                    bg = 'rgba(255,71,87,0.15)';
                    textColor = '#FF4757';
                    icon = <XCircle size={20} color="#FF4757" />;
                  }
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answerState !== 'idle'}
                    style={{
                      background: bg,
                      border: `2px solid ${borderColor}`,
                      borderRadius: 14,
                      padding: '16px 20px',
                      color: textColor,
                      cursor: answerState === 'idle' ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      width: '100%',
                    }}
                    whileHover={answerState === 'idle' ? { scale: 1.02, borderColor: 'rgba(255,107,53,0.5)' } : {}}
                    whileTap={answerState === 'idle' ? { scale: 0.98 } : {}}
                    animate={
                      isSelected && answerState === 'correct'
                        ? { scale: [1, 1.05, 1] }
                        : isSelected && answerState === 'wrong'
                        ? { x: [0, -8, 8, -5, 5, 0] }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: answerState !== 'idle' && isCorrect ? 'rgba(0,200,150,0.3)' : 'var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.85rem', fontWeight: 900, flexShrink: 0,
                    }}>
                      {answerState !== 'idle' && icon ? icon : ['A', 'B', 'C', 'D'][i]}
                    </div>
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: answerState === 'correct' ? 'rgba(0,200,150,0.1)' : 'rgba(255,71,87,0.1)',
                    border: `1px solid ${answerState === 'correct' ? 'rgba(0,200,150,0.3)' : 'rgba(255,71,87,0.3)'}`,
                    borderRadius: 12, padding: '16px 20px', marginBottom: 20,
                    fontSize: '0.95rem', lineHeight: 1.7,
                  }}
                >
                  <strong style={{ color: answerState === 'correct' ? 'var(--success)' : '#FF4757' }}>
                    {answerState === 'correct' ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                  </strong>
                  <br />
                  {currentQuestion.explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {answerState !== 'idle' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleNext}
                className={`btn ${answerState === 'correct' ? 'btn-success' : 'btn-primary'} btn-full btn-lg`}
              >
                {currentQ < questions.length - 1 ? 'Siguiente →' : '¡Ver resultados! 🏆'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
