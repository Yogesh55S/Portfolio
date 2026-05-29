'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('intro');  // intro → reveal → bar → exit
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  // ── Timeline (total 5 000 ms) ───────────────────────────────────────────────
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('reveal'), 500),   // 0.5s – show mark + tagline
      setTimeout(() => setPhase('bar'),   1800),   // 1.8s – show progress
      setTimeout(() => setPhase('exit'),  4300),   // 4.3s – begin wipe
      setTimeout(() => {
        setShowLoader(false);
        onComplete?.();
      }, 5000),                                    // 5.0s – unmount
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // ── Progress counter 0→100 over 2.5 s from phase 'bar' ────────────────────
  useEffect(() => {
    if (phase !== 'bar') return;
    const total = 2500;
    const steps = 100;
    let count = 0;
    const id = setInterval(() => {
      count++;
      setProgress(count);
      if (count >= steps) clearInterval(id);
    }, total / steps);
    return () => clearInterval(id);
  }, [phase]);

  const isRevealed = phase !== 'intro';

  return (
    <AnimatePresence>
      {showLoader && (
        <>
          {/* ── Main panel ──────────────────────────────────────────────── */}
          <motion.div
            key="loader-panel"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
            style={{
              background: 'linear-gradient(160deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
              transformOrigin: 'top center',
            }}
            exit={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          >

            {/* Subtle noise texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: 0.03, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
            />

            {/* Ambient glow — top-left */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(148,163,184,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            {/* Ambient glow — bottom-right */}
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(203,213,225,0.04) 0%, transparent 70%)', filter: 'blur(50px)' }}
            />

            {/* ── Top accent line ───────────────────────────────────────── */}
            <motion.div
              className="absolute top-0 left-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(203,213,225,0.5) 50%, transparent 100%)' }}
              initial={{ width: '0%' }}
              animate={isRevealed ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />

            {/* ── Animated geometric mark ───────────────────────────────── */}
            <motion.div
              className="relative flex items-center justify-center mb-10"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Outer rotating ring */}
              <motion.svg
                width="90" height="90" viewBox="0 0 90 90" fill="none"
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <circle
                  cx="45" cy="45" r="42"
                  stroke="rgba(148,163,184,0.15)"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                />
              </motion.svg>

              {/* Middle static ring */}
              <svg width="66" height="66" viewBox="0 0 66 66" fill="none" className="absolute">
                <circle cx="33" cy="33" r="30" stroke="rgba(148,163,184,0.2)" strokeWidth="0.5" />
              </svg>

              {/* Core diamond mark */}
              <motion.svg
                width="28" height="28" viewBox="0 0 28 28" fill="none"
                animate={{ rotate: [0, 45, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <rect
                  x="4" y="4" width="20" height="20"
                  stroke="rgba(203,213,225,0.7)"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(45 14 14)"
                />
                <rect
                  x="9" y="9" width="10" height="10"
                  fill="rgba(203,213,225,0.12)"
                  transform="rotate(45 14 14)"
                />
              </motion.svg>
            </motion.div>





            {/* ── Progress bar ──────────────────────────────────────────── */}
            <AnimatePresence>
              {(phase === 'bar' || phase === 'exit') && (
                <motion.div
                  key="progress-wrap"
                  className="absolute bottom-14 flex flex-col items-center gap-3"
                  style={{ width: '160px' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Track */}
                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{ height: '1px', background: 'rgba(148,163,184,0.15)' }}
                  >
                    {/* Fill — warm slate white, no blue */}
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, rgba(148,163,184,0.4), rgba(226,232,240,0.9))',
                        transition: 'width 0.025s linear',
                      }}
                    />
                  </div>

                  {/* Counter */}
                  <span
                    className="font-mono text-slate-500"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.18em' }}
                  >
                    {String(progress).padStart(3, '0')}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Bottom accent line ────────────────────────────────────── */}
            <motion.div
              className="absolute bottom-0 left-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.35) 50%, transparent 100%)' }}
              initial={{ width: '0%' }}
              animate={isRevealed ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
            />
          </motion.div>

          {/* ── Exit curtain wipes upward ──────────────────────────────── */}
          <AnimatePresence>
            {phase === 'exit' && (
              <motion.div
                key="exit-curtain"
                className="fixed inset-0 z-[10000]"
                style={{
                  background: 'linear-gradient(160deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
                  transformOrigin: 'bottom center',
                }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
