import { motion, AnimatePresence } from 'framer-motion';

type Character = 'chima' | 'alli' | 'xollo';
type Mood = 'idle' | 'happy' | 'excited' | 'thinking' | 'wrong' | 'celebrate';

interface CharacterReactionProps {
  character: Character;
  mood: Mood;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CHARACTER_EMOJIS: Record<Character, string> = {
  chima: '🎺',
  alli: '🎸',
  xollo: '🐕',
};

const CHARACTER_NAMES: Record<Character, string> = {
  chima: 'Chima',
  alli: 'Alli',
  xollo: 'Xollo',
};

const MOOD_ANIMATIONS: Record<Mood, string> = {
  idle: 'float-slow',
  happy: 'bounce-in',
  excited: 'pop-animation',
  thinking: 'float-animation',
  wrong: 'wiggle-animation',
  celebrate: 'bounce-in',
};

export function CharacterReaction({ character, mood, message, size = 'md' }: CharacterReactionProps) {
  const emoji = CHARACTER_EMOJIS[character];
  const name = CHARACTER_NAMES[character];
  const animClass = MOOD_ANIMATIONS[mood];

  const fontSizes = { sm: '2rem', md: '3.5rem', lg: '5rem' };
  const fontSize = fontSizes[size];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${character}-${mood}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <span
          className={animClass}
          style={{
            fontSize,
            display: 'inline-block',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
          }}
        >
          {emoji}
        </span>

        {message && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'var(--card)',
              border: '2px solid var(--border)',
              borderRadius: 12,
              padding: '10px 16px',
              maxWidth: 220,
              textAlign: 'center',
              fontSize: '0.9rem',
              fontWeight: 700,
              position: 'relative',
            }}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: 2 }}>{name}</span>
            {message}
            {/* Speech bubble tail */}
            <div style={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '8px solid var(--border)',
            }} />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
