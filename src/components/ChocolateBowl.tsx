import { motion } from 'motion/react';

interface ChocolateBowlProps {
  isActive: boolean;
}

export function ChocolateBowl({ isActive }: ChocolateBowlProps) {
  return (
    <div className="relative">
      {/* Bowl */}
      <div className="relative">
        {/* Bowl container */}
        <svg width="140" height="80" viewBox="0 0 140 80" className="drop-shadow-xl">
          <defs>
            <radialGradient id="chocolate-bowl-gradient">
              <stop offset="0%" stopColor="#6b4423" />
              <stop offset="50%" stopColor="#5a3618" />
              <stop offset="100%" stopColor="#4a2c14" />
            </radialGradient>
            <radialGradient id="bowl-gradient">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </radialGradient>
          </defs>

          {/* Bowl outer */}
          <ellipse cx="70" cy="50" rx="65" ry="25" fill="url(#bowl-gradient)" stroke="#d4a373" strokeWidth="2" />
          
          {/* Bowl inner shadow */}
          <ellipse cx="70" cy="48" rx="60" ry="22" fill="#e5c896" opacity="0.5" />
          
          {/* Chocolate inside */}
          <ellipse cx="70" cy="50" rx="55" ry="20" fill="url(#chocolate-bowl-gradient)" />
          
          {/* Glossy chocolate surface */}
          <motion.ellipse
            cx="70"
            cy="48"
            rx="45"
            ry="15"
            fill="#8b5a3c"
            opacity="0.6"
            animate={isActive ? { scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Shine highlights */}
          <ellipse cx="55" cy="46" rx="12" ry="5" fill="white" opacity="0.3" />
          <ellipse cx="85" cy="48" rx="8" ry="3" fill="white" opacity="0.2" />
        </svg>

        {/* Steam/warmth effect */}
        {isActive && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 0, x: -20 + i * 20 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [-10, -30],
                  scale: [0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: 'easeOut',
                }}
              >
                <div className="text-2xl">💫</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-100 px-3 py-1 rounded-full shadow-md border-2 border-amber-300">
        <span className="text-xs font-semibold text-amber-900">Melted Chocolate</span>
      </div>

      {/* Active glow */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-amber-400 rounded-full opacity-20 blur-2xl -z-10 scale-150"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Instruction hint */}
      {isActive && (
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            Dip it here! 🍫
          </div>
        </motion.div>
      )}
    </div>
  );
}
