'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { VscGithubAlt } from "react-icons/vsc";

const loaderItems = [
  { letter: "P", tech: "Python" },
  { letter: "O", tech: "OAuth" },
  { letter: "R", tech: "React" },
  { letter: "T", tech: "TypeScript" },
  { letter: "F", tech: "Firebase" },
  { letter: "O", tech: "OOP" },
  { letter: "L", tech: "Logic" },
  { letter: "I", tech: "Interface" },
  { letter: "O", tech: "Output" }
];

export default function PortfolioHero() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [startSignatureAnim, setStartSignatureAnim] = useState(false);
  const [mobileLoaderIndex, setMobileLoaderIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < loaderItems.length - 1) {
          currentIndex++;
          setMobileLoaderIndex(currentIndex);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
          }, 400);
        }
      }, 250);
      return () => clearInterval(interval);
    } else {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (loaderComplete) {
      const signatureTimer = setTimeout(() => {
        setStartSignatureAnim(true);
      }, 150);
      return () => clearTimeout(signatureTimer);
    }
  }, [loaderComplete]);

  return (
    <div className="bg-white min-h-screen relative overflow-hidden font-sans">
      
      {/* Premium Staggered Columns Loader */}
      <AnimatePresence onExitComplete={() => setLoaderComplete(true)}>
        {!isLoaded && (
          <div className="fixed inset-0 z-[9999] pointer-events-auto select-none bg-gradient-to-br from-white via-neutral-50 to-neutral-100 overflow-hidden flex flex-col justify-center">
            
            {/* Desktop Loader: 9 Columns Grid */}
            <div className="hidden md:grid grid-cols-9 h-screen w-full bg-transparent">
              {loaderItems.map((item, i) => {
                return (
                  <motion.div
                    key={i}
                    initial={{ y: "0%" }}
                    exit={{ 
                      y: "-100%",
                      transition: { 
                        duration: 0.8, 
                        ease: [0.76, 0, 0.24, 1],
                        delay: i * 0.08 
                      }
                    }}
                    className="relative h-screen bg-white/90 backdrop-blur-2xl border-r border-neutral-200/50 flex flex-col justify-center items-center overflow-hidden"
                  >
                    {/* Background Letter Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center text-[12vw] font-black font-space-grotesk text-black/[0.012] select-none pointer-events-none uppercase">
                      {item.letter}
                    </div>

                    {/* Accent vertical line inside column */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ 
                        duration: 0.9, 
                        ease: [0.22, 1, 0.36, 1], 
                        delay: i * 0.08 
                      }}
                      className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#c5a880]/20 to-transparent pointer-events-none"
                    />

                    {/* Center Letter (Clean Typography) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.5, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      <span className="text-4xl md:text-5xl font-black tracking-widest text-neutral-800 font-space-grotesk">
                        {item.letter}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Loader: Centered Slideshow Loop */}
            <div className="md:hidden h-screen w-full bg-gradient-to-br from-white via-neutral-50 to-neutral-100 flex flex-col items-center justify-center p-6 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileLoaderIndex}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center mt-2"
                >
                  <span className="text-5xl font-black text-neutral-800 font-space-grotesk uppercase">
                    {loaderItems[mobileLoaderIndex].letter}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Progress Line */}
              <div className="w-44 bg-neutral-200 h-[2px] overflow-hidden mt-12 relative">
                <div 
                  className="h-full bg-[#c5a880]/80 transition-all duration-200" 
                  style={{ width: `${(mobileLoaderIndex + 1) * 11.1}%` }}
                />
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

      
      {/* --- START: MOBILE-ONLY SECTION --- */}
      <div className="md:hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/used/man.webp')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-20 flex flex-col justify-center items-end h-screen p-8 text-right">
          <motion.div
              className="flex flex-col items-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase tracking-tighter drop-shadow-xl font-space-grotesk leading-none mb-3">
                  Yogesh
              </h1>
              <div className="w-12 h-1 bg-[#c5a880] mb-4"></div>
              <p className="text-[#c5a880] tracking-[0.3em] text-sm font-bold">
                  FULLSTACK
              </p>
              <p className="text-gray-300 tracking-[0.4em] text-xs font-medium mt-1">
                  DEVELOPER
              </p>
          </motion.div>
        </div>
      </div>
      {/* --- END: MOBILE-ONLY SECTION --- */}


      {/* --- START: DESKTOP-ONLY SECTION --- */}
      <div className="hidden md:block">
        {/* Left Social Links with Rope Lines */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ 
            opacity: loaderComplete ? (isAtTop ? 1 : 0) : 0, 
            x: loaderComplete ? 0 : -40,
            pointerEvents: loaderComplete && isAtTop ? 'auto' : 'none'
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="fixed left-6 md:left-10 lg:left-14 xl:left-[70px] top-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
        >
          <div className="flex flex-col space-y-8">
            {/* GitHub */}
            <a 
              href="https://github.com/Yogesh55S" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative text-gray-400 hover:text-[#333333] transition-colors duration-300"
            >
              <VscGithubAlt size={24} />
            </a>
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/yogesh-kumar-983840226/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative text-gray-400 hover:text-[#0A66C2] transition-colors duration-300"
            >
              <FaLinkedinIn size={24} />
            </a>
            {/* WhatsApp */}
            <a 
              href="https://wa.me/9350161043" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative text-gray-400 hover:text-[#25D366] transition-colors duration-300"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </motion.div>

        {/* Right Resume Link */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ 
            opacity: loaderComplete ? (isAtTop ? 1 : 0) : 0, 
            x: loaderComplete ? 0 : 40,
            pointerEvents: loaderComplete && isAtTop ? 'auto' : 'none'
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
        >
          <a 
            href="/used/Yogesh_Resume.pdf" 
            download
            className="text-xs font-semibold text-gray-600 hover:text-black tracking-widest cursor-pointer"
            style={{ writingMode: 'vertical-rl' }}
            aria-label="Download Resume"
          >
            RESUME
          </a>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: loaderComplete ? 96 : 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            className="w-px bg-gray-300 mt-6"
          />
        </motion.div>
        
        {/* Comic signature handwriting watermark behind the image */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[45%] md:top-[50%] lg:top-[58%] xl:top-[62%] -translate-y-1/2 z-0 pointer-events-none select-none w-full flex items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] overflow-hidden">
          <div
            className="flex flex-nowrap whitespace-nowrap items-center justify-center text-center select-none leading-none tracking-widest font-bebas-neue"
            style={{ fontSize: "clamp(2rem, 6vw, 7rem)" }}
          >
            {(() => {
              const chars = "FULLSTACK DEVELOPER".split("");
              
              return (
                <>
                  {chars.map((char, index) => {
                    const delay = index * 0.08;
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ 
                          opacity: startSignatureAnim ? 0.35 : 0, 
                          y: startSignatureAnim ? 0 : 30,
                          scale: startSignatureAnim ? 1 : 0.8
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.22, 1, 0.36, 1], 
                          delay: startSignatureAnim ? delay : 0 
                        }}
                        className="inline-block text-gray-500/40"
                        style={{ 
                          width: char === " " ? "0.35em" : "auto",
                          letterSpacing: "0.08em"
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    );
                  })}
                </>
              );
            })()}
          </div>
        </div>

        {/* Anime Character of Yogesh */}
        <motion.img 
          src="/used/back.png"
          alt="Anime character of Yogesh" 
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: loaderComplete ? 1 : 0, y: loaderComplete ? 0 : 120 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[-5vh] z-10 w-auto h-[110vh] md:h-[105vh] max-w-none pointer-events-none select-none"
        />

        {/* Name and Title */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: loaderComplete ? 1 : 0, y: loaderComplete ? 0 : 50 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="absolute w-full text-center z-20 pointer-events-none top-[61%] md:top-[66%] lg:top-[63%] xl:top-[72%] left-1/2 -translate-x-1/2 mix-blend-difference flex flex-col items-center transition-all duration-700 ease-[0.16,1,0.3,1]"
        >
          <div className="relative inline-block text-left">
            <h1 
              className="font-black text-white leading-none mt-1" 
              style={{ 
                fontSize: 'clamp(3.75rem, 10vw, 8rem)', 
                WebkitTextStroke: '1.5px white' 
              }}
            >
              YOGESH
            </h1>
          </div>
        </motion.div>
      </div>
      {/* --- END: DESKTOP-ONLY SECTION --- */}

      <style jsx global>{`
        @keyframes drawLetter {
          0% {
            stroke-dashoffset: 1000;
            fill: rgba(107, 114, 128, 0);
          }
          75% {
            stroke-dashoffset: 0;
            fill: rgba(107, 114, 128, 0);
          }
          100% {
            stroke-dashoffset: 0;
            fill: rgba(107, 114, 128, 0.4);
          }
        }
      `}</style>

    </div>
  );
}
