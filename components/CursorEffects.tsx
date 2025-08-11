import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorEffects() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', hideCursor);
    window.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('mouseenter', () => setIsVisible(true));
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Primary cursor light */}
      <motion.div
        className="refraction-overlay pointer-events-none"
        style={{
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="cursor-light"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
          }}
          animate={{
            scale: isClicking ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Secondary refraction layer */}
      <motion.div
        className="refraction-overlay pointer-events-none"
        style={{
          opacity: isVisible ? 0.2 : 0,
          mixBlendMode: 'multiply',
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="cursor-light"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        />
      </motion.div>

      {/* Glass reflection highlight */}
      <motion.div
        className="refraction-overlay pointer-events-none"
        style={{
          opacity: isVisible ? 0.6 : 0,
          mixBlendMode: 'overlay',
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          style={{
            position: 'absolute',
            left: cursorXSpring,
            top: cursorYSpring,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 800 }}
        />
      </motion.div>

      {/* Click ripple effect */}
      <motion.div
        className="refraction-overlay pointer-events-none"
        style={{
          opacity: isClicking ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          style={{
            position: 'absolute',
            left: cursorXSpring,
            top: cursorYSpring,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.6) 50%, transparent 100%)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      </motion.div>

      {/* Particle trail */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/60 rounded-full pointer-events-none"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
            opacity: [0.8, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Interactive hover effects for buttons and links */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            left: cursorXSpring,
            top: cursorYSpring,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid rgba(99, 102, 241, 0.3)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </>
  );
}