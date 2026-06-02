'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { VscGithubAlt } from "react-icons/vsc";


export default function PortfolioHero() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [startSignatureAnim, setStartSignatureAnim] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 1. Initial golden lines draw staggered on load. Exit loader columns after 1.2s
    const loaderTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loaderTimer);
    };
  }, []);

  useEffect(() => {
    if (loaderComplete) {
      // Tiny delay to let the loader exit fully before starting cursive signing strokes
      const signatureTimer = setTimeout(() => {
        setStartSignatureAnim(true);
      }, 150);
      return () => clearTimeout(signatureTimer);
    }
  }, [loaderComplete]);

  const columns = [0, 1, 2, 3, 4, 5];

  return (
    <div className="bg-white min-h-screen relative overflow-hidden font-sans">
      
      {/* Premium Staggered Columns Loader */}
      <AnimatePresence onExitComplete={() => setLoaderComplete(true)}>
        {!isLoaded && (
          <div className="fixed inset-0 z-[9999] grid grid-cols-6 pointer-events-auto select-none bg-transparent">
            {columns.map((i) => (
              <motion.div
                key={i}
                initial={{ y: "0%" }}
                exit={{ 
                  y: "-100%",
                  transition: { 
                    duration: 0.8, 
                    ease: [0.76, 0, 0.24, 1],
                    delay: i * 0.12 
                  }
                }}
                className="relative h-screen bg-[#111111] border-r border-neutral-900/30 flex items-center justify-center"
              >
                {/* Subtle thin vertical accent line inside the column that draws down in a staggered pattern */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ 
                    duration: 0.9, 
                    ease: [0.22, 1, 0.36, 1], 
                    delay: i * 0.1 
                  }}
                  className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#c5a880]/30 to-transparent"
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      
      {/* --- START: NEW MOBILE-ONLY SECTION (No changes here) --- */}
      <div className="md:hidden">
        {/* ... your mobile code remains the same ... */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/used/man.png')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-20 flex flex-col justify-center items-center h-screen p-6 text-center">
          <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
              <p className="font-serif  text-gray-200 text-sm">Hi, I am</p>
              <h1 className="text-7xl font-extrabold text-white uppercase my-2 tracking-tight drop-shadow-lg">
                  Yogesh
              </h1>
              {/* Animated divider line */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: isLoaded ? 96 : 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="h-px bg-white/50 my-4" 
              />
              <p className="text-gray-300 tracking-[0.4em] text-xs font-medium">FULLSTACK DEVELOPER</p>
          </motion.div>
        </div>
      </div>
      {/* --- END: NEW MOBILE-ONLY SECTION --- */}


      {/* --- START: MODIFIED DESKTOP-ONLY SECTION --- */}
      <div className="hidden md:block">
        {/* Left Social Links Staggered entrance with drawing vertical line */}
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
            <a href="https://github.com/Yogesh55S" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-300">
              <VscGithubAlt size={24} />
            </a>
            <a href="https://www.linkedin.com/in/yogesh-kumar-983840226/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-300">
              <FaLinkedinIn size={24} />
            </a>
            <a href="https://wa.me/9350161043" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-300">
              <FaWhatsapp size={24} />
            </a>
          </div>
          {/* Elegant vertical line that draws down staggered */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: loaderComplete ? 96 : 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="w-px bg-gray-300 mt-6"
          />
        </motion.div>

        {/* Right Resume Link Staggered entrance with drawing vertical line */}
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
          {/* Elegant vertical line that draws down staggered */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: loaderComplete ? 96 : 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            className="w-px bg-gray-300 mt-6"
          />
        </motion.div>
        
        {/* Load elegant handwriting font */}
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />

        {/* Comic signature handwriting watermark behind the image */}
        {/* ADDED transition-all duration-700 ease-[0.16,1,0.3,1] to remove coordinate jump glitch between 1024px & 1440px on screen resize */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[64%] md:top-[68%] lg:top-[74%] xl:top-[80%] z-0 pointer-events-none select-none w-full max-w-6xl px-4 flex items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1]">
          <div className="flex items-center justify-center font-bold select-none" style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(2rem, 8vw, 7.5rem)" }}>
            {"Fullstack Developer".split("").map((char, index) => {
              // Delay for each letter starts instantly upon mount with slow incremental gaps
              const delay = index * 0.22; // 220ms slow delay per letter for natural, ultra-slow signing!
              const chars = "Fullstack Developer".split("");
              
              return (
                <span 
                  key={index} 
                  className="relative inline-block" 
                  style={{ 
                    width: char === " " ? "3em" : "auto",
                    marginLeft: index === 0 || char === " " || chars[index - 1] === " " ? "0" : "-0.075em"
                  }}
                >
                  {char !== " " && (
                    <span className="relative block">
                      {/* Cursive drawing SVG outline */}
                      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                        {/* Gray offset shadow stroke */}
                        <text
                          x="2.5px"
                          y="2.5px"
                          fill="none"
                          stroke="#9ca3af"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="1000"
                          strokeDashoffset="1000"
                          style={{
                            fontFamily: "'Caveat', cursive",
                            animationName: startSignatureAnim ? "drawLetterBack" : "none",
                            animationDuration: "2.1s",
                            animationTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                            animationFillMode: "forwards",
                            animationDelay: `${delay + 0.15}s`,
                            opacity: 0.3
                          }}
                        >
                          {char}
                        </text>
                        
                        {/* Main black line stroke */}
                        <text
                          x="0"
                          y="0"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="1000"
                          strokeDashoffset="1000"
                          style={{
                            fontFamily: "'Caveat', cursive",
                            animationName: startSignatureAnim ? "drawLetter" : "none",
                            animationDuration: "1.8s",
                            animationTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                            animationFillMode: "forwards",
                            animationDelay: `${delay}s`
                          }}
                        >
                          {char}
                        </text>
                      </svg>
                      
                      {/* Invisible font placeholder to occupy space and compute perfect auto widths dynamically */}
                      <span className="opacity-0 select-none pointer-events-none">{char}</span>
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Anime Character of Yogesh staggered parallax rise */}
        <motion.img 
          src="/used/back.png"
          alt="Anime character of Yogesh" 
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: loaderComplete ? 1 : 0, y: loaderComplete ? 0 : 120 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[-5vh] z-10 w-auto h-[110vh] md:h-[105vh] max-w-none pointer-events-none select-none"
        />

        {/* Name and Title staggered fade-up slide */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: loaderComplete ? 1 : 0, y: loaderComplete ? 0 : 50 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="absolute w-full text-center z-20 pointer-events-none top-[40%] md:top-[45%] left-1/2 -translate-x-1/2 mix-blend-difference"
        >
          <p className="text-white tracking-[0.4em] md:tracking-[0.6em] text-xs sm:text-sm md:text-base ml-2 font-medium">HI AM</p>
          
          <h1 
            className="font-black text-white" 
            style={{ 
              fontSize: 'clamp(3.75rem, 10vw, 8rem)', 
              WebkitTextStroke: '1.5px white' 
            }}
          >
            YOGESH
          </h1>
        </motion.div>
      </div>
      {/* --- END: MODIFIED DESKTOP-ONLY SECTION --- */}

      <style jsx global>{`
        @keyframes drawLetter {
          0% {
            stroke-dashoffset: 1000;
            fill: rgba(0, 0, 0, 0);
          }
          75% {
            stroke-dashoffset: 0;
            fill: rgba(0, 0, 0, 0);
          }
          100% {
            stroke-dashoffset: 0;
            fill: rgba(0, 0, 0, 0.95); /* Solid filled premium paintbrush black ink */
          }
        }

        @keyframes drawLetterBack {
          0% {
            stroke-dashoffset: 1000;
            fill: rgba(0, 0, 0, 0);
          }
          75% {
            stroke-dashoffset: 0;
            fill: rgba(0, 0, 0, 0);
          }
          100% {
            stroke-dashoffset: 0;
            fill: rgba(156, 163, 175, 0.7); /* Solid filled gray pop shadow */
          }
        }
      `}</style>

    </div>
  );
}