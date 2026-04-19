import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { ConeState, ToppingType } from "../App";

interface DraggableConeProps {
  state: ConeState;
  toppings: ToppingType[];
  onFillIceCream: () => void;
  onDipChocolate: () => void;
}

export function DraggableCone({
  state,
  toppings,
  onFillIceCream,
  onDipChocolate,
}: DraggableConeProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (state === "complete") {
      setShowSparkles(true);
    }
  }, [state]);

  const handleDrag = (_event: any, info: any) => {
    const centerX = window.innerWidth / 2;
    const bottomY = window.innerHeight - 300;

    // Check if near soft serve machine (center)
    if (state === "picked") {
      const distanceToMachine = Math.sqrt(
        Math.pow(info.point.x - centerX, 2) +
          Math.pow(info.point.y - bottomY, 2),
      );
      if (distanceToMachine < 100) {
        onFillIceCream();
      }
    }

    // Check if near chocolate bowl (right of center)
    if (state === "filled") {
      const chocolateX = centerX + 150;
      const distanceToChocolate = Math.sqrt(
        Math.pow(info.point.x - chocolateX, 2) +
          Math.pow(info.point.y - bottomY, 2),
      );
      if (distanceToChocolate < 100) {
        onDipChocolate();
      }
    }
  };

  const isDraggable =
    state === "picked" ||
    state === "filled" ||
    state === "chocolate" ||
    state === "topped";

  return (
    <>
      <motion.div
        drag={isDraggable}
        dragMomentum={false}
        dragElastic={0.1}
        onDrag={handleDrag}
        style={{ x, y }}
        initial={{ x: -400, y: 100, scale: 0.8 }}
        animate={
          state === "complete"
            ? {
                x: 0,
                y: -150,
                scale: 1.3,
                rotate: [0, -5, 5, -5, 5, 0],
              }
            : { scale: 1 }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${
          isDraggable
            ? "cursor-grab active:cursor-grabbing"
            : ""
        }`}
      >
        <div className="relative">
          {/* Cone SVG */}
          <svg
            width="100"
            height="180"
            viewBox="0 0 100 180"
            className="drop-shadow-2xl"
          >
            {/* Waffle pattern */}
            <defs>
              <pattern
                id="waffle-drag"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <rect width="10" height="10" fill="#d4a574" />
                <line
                  x1="0"
                  y1="0"
                  x2="10"
                  y2="10"
                  stroke="#b8894f"
                  strokeWidth="0.8"
                />
                <line
                  x1="10"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke="#b8894f"
                  strokeWidth="0.8"
                />
              </pattern>

              {/* Gradient for ice cream */}
              <radialGradient id="ice-cream-gradient">
                <stop offset="0%" stopColor="#fffef7" />
                <stop offset="50%" stopColor="#fff8e1" />
                <stop offset="100%" stopColor="#f5e6c8" />
              </radialGradient>

              {/* Chocolate gradient */}
              <radialGradient id="chocolate-gradient">
                <stop offset="0%" stopColor="#8b5a3c" />
                <stop offset="50%" stopColor="#6b4423" />
                <stop offset="100%" stopColor="#4a2c1a" />
              </radialGradient>
            </defs>

            {/* Cone body */}
            <path
              d="M 18 40 Q 50 175 82 40 Z"
              fill="url(#waffle-drag)"
              stroke="#b8894f"
              strokeWidth="2"
            />
            <ellipse
              cx="50"
              cy="40"
              rx="32"
              ry="8"
              fill="#d4a574"
              stroke="#b8894f"
              strokeWidth="2"
            />

            {/* Ice cream states */}
            {(state === "filled" ||
              state === "chocolate" ||
              state === "topped" ||
              state === "complete") && (
              <>
                {/* Ice cream base */}
                <motion.g
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  <ellipse
                    cx="50"
                    cy="40"
                    rx="30"
                    ry="8"
                    fill="url(#ice-cream-gradient)"
                  />

                  {/* Swirl layers */}
                  <ellipse
                    cx="50"
                    cy="32"
                    rx="32"
                    ry="9"
                    fill="url(#ice-cream-gradient)"
                  />
                  <ellipse
                    cx="50"
                    cy="24"
                    rx="30"
                    ry="9"
                    fill="url(#ice-cream-gradient)"
                  />
                  <ellipse
                    cx="50"
                    cy="16"
                    rx="26"
                    ry="8"
                    fill="url(#ice-cream-gradient)"
                  />
                  <ellipse
                    cx="50"
                    cy="10"
                    rx="20"
                    ry="7"
                    fill="url(#ice-cream-gradient)"
                  />

                  {/* Top swirl */}
                  <circle
                    cx="50"
                    cy="6"
                    r="8"
                    fill="url(#ice-cream-gradient)"
                  />
                </motion.g>
              </>
            )}

            {/* Chocolate coating */}
            {(state === "chocolate" ||
              state === "topped" ||
              state === "complete") && (
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Chocolate shell */}
                <ellipse
                  cx="50"
                  cy="10"
                  rx="21"
                  ry="8"
                  fill="url(#chocolate-gradient)"
                  opacity="0.95"
                />
                <ellipse
                  cx="50"
                  cy="16"
                  rx="27"
                  ry="9"
                  fill="url(#chocolate-gradient)"
                  opacity="0.9"
                />
                <ellipse
                  cx="50"
                  cy="24"
                  rx="31"
                  ry="10"
                  fill="url(#chocolate-gradient)"
                  opacity="0.85"
                />
                <circle
                  cx="50"
                  cy="6"
                  r="9"
                  fill="url(#chocolate-gradient)"
                  opacity="0.95"
                />

                {/* Chocolate drips */}
                <motion.path
                  d="M 35 32 Q 33 36 35 40"
                  stroke="url(#chocolate-gradient)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.path
                  d="M 65 32 Q 67 36 65 40"
                  stroke="url(#chocolate-gradient)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />

                {/* Glossy shine */}
                <ellipse
                  cx="45"
                  cy="8"
                  rx="6"
                  ry="3"
                  fill="white"
                  opacity="0.4"
                />
              </motion.g>
            )}

            {/* Sprinkles topping */}
            {toppings.includes("sprinkles") && (
              <motion.g
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                <rect
                  x="42"
                  y="8"
                  width="2"
                  height="6"
                  fill="#ff1744"
                  transform="rotate(20 43 11)"
                />
                <rect
                  x="55"
                  y="6"
                  width="2"
                  height="6"
                  fill="#2196f3"
                  transform="rotate(-15 56 9)"
                />
                <rect
                  x="48"
                  y="4"
                  width="2"
                  height="6"
                  fill="#ffeb3b"
                  transform="rotate(40 49 7)"
                />
                <rect
                  x="52"
                  y="12"
                  width="2"
                  height="6"
                  fill="#4caf50"
                  transform="rotate(-30 53 15)"
                />
                <rect
                  x="45"
                  y="14"
                  width="2"
                  height="6"
                  fill="#ff9800"
                  transform="rotate(10 46 17)"
                />
                <rect
                  x="58"
                  y="10"
                  width="2"
                  height="6"
                  fill="#e91e63"
                  transform="rotate(25 59 13)"
                />
                <rect
                  x="40"
                  y="12"
                  width="2"
                  height="6"
                  fill="#9c27b0"
                  transform="rotate(-20 41 15)"
                />
                <rect
                  x="50"
                  y="18"
                  width="2"
                  height="6"
                  fill="#00bcd4"
                  transform="rotate(35 51 21)"
                />
              </motion.g>
            )}

            {/* Nuts topping */}
            {toppings.includes("nuts") && (
              <motion.g
                initial={{ opacity: 0, y: -35, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ellipse
                  cx="44"
                  cy="10"
                  rx="2.5"
                  ry="2"
                  fill="#d4a373"
                  transform="rotate(20 44 10)"
                />
                <ellipse
                  cx="56"
                  cy="8"
                  rx="2.5"
                  ry="2"
                  fill="#c89968"
                  transform="rotate(-15 56 8)"
                />
                <ellipse
                  cx="50"
                  cy="6"
                  rx="2.5"
                  ry="2"
                  fill="#d4a373"
                  transform="rotate(30 50 6)"
                />
                <ellipse
                  cx="47"
                  cy="16"
                  rx="2.5"
                  ry="2"
                  fill="#c89968"
                  transform="rotate(-25 47 16)"
                />
                <ellipse
                  cx="53"
                  cy="14"
                  rx="2.5"
                  ry="2"
                  fill="#d4a373"
                  transform="rotate(10 53 14)"
                />
                <ellipse
                  cx="40"
                  cy="14"
                  rx="2.5"
                  ry="2"
                  fill="#c89968"
                  transform="rotate(40 40 14)"
                />
                <ellipse
                  cx="60"
                  cy="12"
                  rx="2.5"
                  ry="2"
                  fill="#d4a373"
                  transform="rotate(-30 60 12)"
                />
              </motion.g>
            )}
          </svg>

          {/* Sparkles for completion */}
          {showSparkles && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{
                    x: 50,
                    y: 30,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x:
                      50 + Math.cos((i * Math.PI * 2) / 8) * 60,
                    y:
                      30 + Math.sin((i * Math.PI * 2) / 8) * 60,
                    scale: [0, 1.2, 0],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
