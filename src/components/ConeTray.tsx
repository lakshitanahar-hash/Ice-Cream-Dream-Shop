import { motion } from 'motion/react';

interface ConeTrayProps {
  onPickCone: () => void;
  isDisabled: boolean;
}

export function ConeTray({ onPickCone, isDisabled }: ConeTrayProps) {
  return (
    <div className="relative">
      {/* Tray */}
      <div className="bg-gradient-to-b from-amber-100 to-amber-200 rounded-2xl px-6 py-4 shadow-lg border-2 border-amber-300">
        <div className="text-xs font-semibold text-amber-800 mb-2 text-center">Waffle Cones</div>
        <div className="flex gap-3">
          {[1, 2, 3].map((index) => (
            <motion.button
              key={index}
              onClick={onPickCone}
              disabled={isDisabled}
              whileHover={!isDisabled ? { scale: 1.1, rotate: 5 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              className={`relative ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* Waffle Cone */}
              <svg width="40" height="70" viewBox="0 0 40 70" className="drop-shadow-md">
                {/* Cone body */}
                <defs>
                  <pattern id={`waffle-${index}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <rect width="8" height="8" fill="#d4a574" />
                    <line x1="0" y1="0" x2="8" y2="8" stroke="#b8894f" strokeWidth="0.5" />
                    <line x1="8" y1="0" x2="0" y2="8" stroke="#b8894f" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <path
                  d="M 20 10 L 35 68 Q 27.5 70 20 70 Q 12.5 70 5 68 Z"
                  fill={`url(#waffle-${index})`}
                  stroke="#b8894f"
                  strokeWidth="1.5"
                />
                {/* Cone rim */}
                <ellipse cx="20" cy="10" rx="15" ry="4" fill="#d4a574" stroke="#b8894f" strokeWidth="1.5" />
              </svg>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
