import { motion } from 'motion/react';

interface SoftServeMachineProps {
  isActive: boolean;
}

export function SoftServeMachine({ isActive }: SoftServeMachineProps) {
  return (
    <div className="relative">
      {/* Machine Body */}
      <div className="relative bg-gradient-to-b from-red-400 to-red-500 rounded-3xl px-8 py-6 shadow-2xl border-4 border-red-600 w-48">
        {/* Top display panel */}
        <div className="bg-gradient-to-b from-cyan-300 to-cyan-400 rounded-lg px-4 py-2 mb-4 border-2 border-cyan-500">
          <div className="text-xs font-bold text-cyan-900 text-center">SOFT SERVE</div>
          <div className="flex justify-center gap-1 mt-1">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={isActive ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
              transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-yellow-400"
              animate={isActive ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
              transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-red-400"
              animate={isActive ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
              transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, delay: 0.4 }}
            />
          </div>
        </div>

        {/* Dispenser nozzle */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-full border-2 border-gray-500 shadow-inner" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-full border-2 border-gray-600" />
            
            {/* Ice cream flow animation */}
            {isActive && (
              <motion.div
                className="absolute top-full left-1/2 -translate-x-1/2 w-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-3 bg-gradient-to-b from-white to-yellow-50 rounded-full mb-1 shadow-md"
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [0, 60],
                      scale: [0.5, 1, 1, 0.8],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-6 h-6 bg-white rounded-full shadow-inner border-2 border-gray-300" />
          <div className="w-6 h-6 bg-white rounded-full shadow-inner border-2 border-gray-300" />
        </div>

        {/* Brand label */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border-2 border-red-400">
          <span className="text-xs font-bold text-red-600">DELUXE</span>
        </div>
      </div>

      {/* Active glow effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-yellow-300 rounded-3xl opacity-20 blur-xl -z-10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Instruction hint */}
      {isActive && (
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            Drop cone here! 👇
          </div>
        </motion.div>
      )}
    </div>
  );
}
