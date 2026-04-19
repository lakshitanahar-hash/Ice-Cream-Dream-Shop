import { motion } from 'motion/react';
import { useState } from 'react';
import { ToppingType } from '../App';

interface ToppingContainerProps {
  type: ToppingType;
  onAddTopping: (type: ToppingType) => void;
  isDisabled: boolean;
  hasTopping: boolean;
}

export function ToppingContainer({ type, onAddTopping, isDisabled, hasTopping }: ToppingContainerProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isDisabled && !hasTopping) {
      setIsAnimating(true);
      onAddTopping(type);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const colors = {
    sprinkles: {
      bg: 'from-pink-300 to-pink-400',
      border: 'border-pink-500',
      label: 'text-pink-900',
      particles: ['#ff1744', '#2196f3', '#ffeb3b', '#4caf50', '#ff9800'],
    },
    nuts: {
      bg: 'from-amber-300 to-amber-400',
      border: 'border-amber-600',
      label: 'text-amber-900',
      particles: ['#d4a373', '#c89968', '#b8894f'],
    },
  };

  const config = colors[type];

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        disabled={isDisabled || hasTopping}
        whileHover={!isDisabled && !hasTopping ? { scale: 1.05, y: -5 } : {}}
        whileTap={!isDisabled && !hasTopping ? { scale: 0.95 } : {}}
        className={`relative ${isDisabled || hasTopping ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {/* Container */}
        <div
          className={`bg-gradient-to-b ${config.bg} rounded-2xl px-4 py-3 shadow-lg border-3 ${config.border} w-24 h-28`}
        >
          <div className={`text-xs font-semibold ${config.label} mb-2 text-center`}>
            {type === 'sprinkles' ? 'Sprinkles' : 'Crushed Nuts'}
          </div>

          {/* Topping visual */}
          <div className="bg-white/40 rounded-lg h-12 relative overflow-hidden border border-white/60">
            {type === 'sprinkles' ? (
              <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-0.5 p-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 h-2 rounded-full"
                    style={{
                      backgroundColor: config.particles[i % config.particles.length],
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-1 p-2">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-1.5 rounded-sm"
                    style={{
                      backgroundColor: config.particles[i % config.particles.length],
                      transform: `rotate(${Math.random() * 45}deg)`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Checkmark when added */}
          {hasTopping && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-green-500/80 rounded-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-4xl">✓</span>
            </motion.div>
          )}
        </div>
      </motion.button>

      {/* Falling particles animation */}
      {isAnimating && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: Math.random() * 300 + 200,
                opacity: 0,
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 1,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
            >
              {type === 'sprinkles' ? (
                <div
                  className="w-1 h-3 rounded-full"
                  style={{
                    backgroundColor: config.particles[i % config.particles.length],
                  }}
                />
              ) : (
                <div
                  className="w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: config.particles[i % config.particles.length],
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
