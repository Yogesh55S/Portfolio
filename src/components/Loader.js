'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let startTime;
    const duration = 1800; // Count from 0 to 100 in 1.8 seconds (smooth & premium feel)
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      const currentProgress = Math.floor(progressFraction * 100);

      setProgress(currentProgress);

      if (progressFraction < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Hold 100% briefly before unmounting/completing
        setTimeout(() => {
          setShowLoader(false);
          onComplete?.();
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="loader-panel"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none overflow-hidden"
          style={{ transformOrigin: 'top center' }}
          exit={{ 
            scaleY: 0, 
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Centered counter container */}
          <div className="flex flex-col items-center justify-center gap-6">
            {/* The Percentage Counter */}
            <motion.h1
              className="text-white text-5xl sm:text-7xl font-light font-mono tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {progress}%
            </motion.h1>

            {/* Minimalist Progress Line */}
            <div 
              className="w-48 bg-neutral-900 overflow-hidden" 
              style={{ height: '2px' }}
            >
              <div 
                className="h-full bg-white transition-all"
                style={{ 
                  width: `${progress}%`,
                  transitionDuration: '50ms',
                  transitionTimingFunction: 'linear'
                }}
              />
            </div>

            {/* Simple Elegant Status Label */}
            <motion.span 
              className="text-[10px] tracking-[0.4em] font-semibold text-neutral-500 uppercase font-space-grotesk mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              Loading Portfolio
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
