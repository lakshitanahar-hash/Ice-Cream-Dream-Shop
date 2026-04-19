import { motion } from 'motion/react';

interface CompletionMessageProps {
  onReset: () => void;
}

export function CompletionMessage({ onReset }: CompletionMessageProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl shadow-2xl p-12 max-w-md mx-4 border-4 border-white relative overflow-hidden"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300/30 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300/30 rounded-full translate-x-20 translate-y-20" />

        {/* Content */}
        <div className="relative z-10">
          {/* Animated emoji */}
          <motion.div
            className="text-8xl text-center mb-6"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🍦
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Your Ice Cream is Ready!
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-center text-gray-700 mb-8 text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Delicious chocolate dipped perfection! ✨
          </motion.p>

          {/* Button */}
          <motion.button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Make Another One! 🎉
          </motion.button>
        </div>

        {/* Floating sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
