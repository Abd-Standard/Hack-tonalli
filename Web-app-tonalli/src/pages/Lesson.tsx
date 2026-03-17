import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { mockModules } from '../data/mockData';
import type { Lesson as LessonType, LessonContent } from '../types';
import { CharacterReaction } from '../components/CharacterReaction';
import { useProgressStore } from '../stores/progressStore';

function ContentBlock({ content, isVisible }: { content: LessonContent; isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {content.type === 'text' && (
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: 0 }}>
              {content.content}
            </p>
          )}
          {content.type === 'highlight' && (
            <div style={{
              background: 'rgba(255,107,53,0.1)',
              border: '2px solid rgba(255,107,53,0.3)',
              borderRadius: 12,
              padding: '16px 20px',
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}>
              {content.highlight ? (
                content.content.split(content.highlight).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <strong style={{ color: 'var(--primary)', background: 'rgba(255,107,53,0.15)', padding: '2px 6px', borderRadius: 4 }}>
                        {content.highlight}
                      </strong>
                    </span>
                  ) : part
                )
              ) : content.content}
            </div>
          )}
          {content.type === 'tip' && (
            <div style={{
              background: 'rgba(255,215,0,0.1)',
              border: '2px solid rgba(255,215,0,0.3)',
              borderRadius: 12,
              padding: '16px 20px',
              fontSize: '1rem',
              lineHeight: 1.8,
              fontWeight: 700,
              color: 'var(--accent)',
            }}>
              {content.content}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Lesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { markLessonComplete } = useProgressStore();
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [characterMood, setCharacterMood] = useState<'idle' | 'happy' | 'excited' | 'thinking'>('idle');
  const [characterMessage, setCharacterMessage] = useState('¡Vamos a aprender algo increíble hoy!');

  useEffect(() => {
    // Find lesson in mock data
    for (const mod of mockModules) {
      const found = mod.lessons.find((l) => l.id === lessonId);
      if (found) {
        setLesson(found);
        break;
      }
    }
  }, [lessonId]);

  useEffect(() => {
    if (!lesson) return;
    const messages = [
      '¡Vamos a aprender algo increíble hoy!',
      '¡Muy bien! Sigue leyendo con atención.',
      '¡Esto es importante! No lo olvides.',
      '¡Ya casi terminas! ¡Tú puedes!',
    ];
    const idx = Math.min(currentContentIndex, messages.length - 1);
    setCharacterMessage(messages[idx]);
    setCharacterMood(currentContentIndex === 0 ? 'idle' : 'happy');
  }, [currentContentIndex, lesson]);

  if (!lesson) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>😕</div>
          <h2>Lección no encontrada</h2>
          <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: 16 }}>← Volver al inicio</Link>
        </div>
      </div>
    );
  }

  const progress = ((currentContentIndex) / lesson.content.length) * 100;
  const isLastContent = currentContentIndex >= lesson.content.length - 1;

  const handleContinue = () => {
    if (!isLastContent) {
      setCurrentContentIndex((i) => i + 1);
    } else {
      // Complete lesson
      markLessonComplete(lesson.id);
      setCharacterMood('excited');
      // Navigate to quiz if there's one, else dashboard
      const moduleLesson = mockModules
        .flatMap((m) => m.lessons)
        .find((l) => l.moduleId === lesson.moduleId && l.type === 'quiz' && l.order === lesson.order + 1);

      setTimeout(() => {
        if (moduleLesson) {
          navigate(`/quiz/${moduleLesson.id}`);
        } else {
          navigate('/dashboard');
        }
      }, 500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
      {/* Header */}
      <div style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link to="/dashboard" style={{ color: 'var(--text-muted)', display: 'flex' }}>
          <X size={24} />
        </Link>
        <div style={{ flex: 1 }}>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          {currentContentIndex}/{lesson.content.length}
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingTop: 32 }}>
        {/* Character */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <CharacterReaction
            character="chima"
            mood={characterMood}
            message={characterMessage}
            size="md"
          />
        </div>

        {/* Lesson title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginBottom: 32, textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 8 }}>{lesson.title}</h1>
          <p style={{ color: 'var(--text-muted)' }}>{lesson.description}</p>
        </motion.div>

        {/* Content blocks - show all up to current */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {lesson.content.slice(0, currentContentIndex + 1).map((content) => (
            <ContentBlock
              key={content.id}
              content={content}
              isVisible={true}
            />
          ))}
        </div>

        {/* Rewards preview */}
        {isLastContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(0,200,150,0.1)',
              border: '2px solid rgba(0,200,150,0.3)',
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: '2rem' }}>🎉</span>
            <div>
              <div style={{ fontWeight: 900, color: 'var(--success)' }}>¡Lección completada!</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Ganas <strong style={{ color: 'var(--accent)' }}>+{lesson.xpReward} XP</strong>
                {lesson.xlmReward > 0 && <span> y <strong style={{ color: 'var(--success)' }}>+{lesson.xlmReward} XLM</strong></span>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Continue button */}
        <motion.button
          onClick={handleContinue}
          className="btn btn-primary btn-full btn-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ marginBottom: 40 }}
        >
          {isLastContent ? '🏆 ¡Finalizar lección!' : '¡Continuar! →'}
        </motion.button>
      </div>
    </div>
  );
}
