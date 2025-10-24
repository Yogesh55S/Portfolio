'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { VscGithubAlt } from "react-icons/vsc";


export default function PortfolioHero() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen relative overflow-hidden font-sans">
      
      {/* --- START: NEW MOBILE-ONLY SECTION --- */}
      <div className="md:hidden">
        {/* 1. Mobile Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/man.png')` }}
        >
          {/* Subtle gradient from bottom to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* 2. Mobile Content Layout */}
        <div className="relative z-20 flex flex-col justify-center items-center h-screen p-6 text-center">
    {/* Text Content */}
    <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
        <p className="font-serif  text-gray-200 text-sm">Hi, I am</p>
        <h1 className="text-7xl font-extrabold text-white uppercase my-2 tracking-tight drop-shadow-lg">
            Yogesh
        </h1>
        {/* Decorative Line */}
        <div className="w-24 h-px bg-white/50 my-4" />
        <p className="text-gray-300 tracking-[0.4em] text-xs font-medium">FULLSTACK DEVELOPER</p>
    </motion.div>
</div>
      </div>
      {/* --- END: NEW MOBILE-ONLY SECTION --- */}


      {/* --- START: UNCHANGED DESKTOP-ONLY SECTION --- */}
      <div className="hidden md:block">
        <div 
          className={`fixed left-18 md:left-18 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-8 transition-opacity duration-300 ${isAtTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
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

        <div 
          className={`fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 ${isAtTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <a 
            href="/Yogesh_Resume.pdf" 
            download
            className="text-xs font-semibold text-gray-600 hover:text-black tracking-widest cursor-pointer"
            style={{ writingMode: 'vertical-rl' }}
            aria-label="Download Resume"
          >
            RESUME
          </a>
        </div>
        
        <img 
          src="/new.png"
          alt="Anime character of Yogesh" 
          className="absolute left-1/2 -translate-x-1/2 bottom-[-5vh] z-10 w-auto h-[110vh] md:h-[105vh] max-w-none"
        />

        <div 
          className="absolute w-full text-center z-20 pointer-events-none top-[40%] md:top-[45%] left-1/2 -translate-x-1/2"
        >
          <p className="text-gray-700 tracking-[0.4em] md:tracking-[0.6em] text-xs sm:text-sm md:text-base ml-2 font-medium">HI AM</p>
          
          <h1 
            className="font-black text-white" 
            style={{ 
              fontSize: 'clamp(3.75rem, 10vw, 8rem)', 
              WebkitTextStroke: '1.5px #2d3848' 
            }}
          >
            YOGESH
          </h1>

          <p className="text-gray-500 tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm mt-1 font-medium">FULLSTACK DEVELOPER</p>
        </div>
      </div>
      {/* --- END: UNCHANGED DESKTOP-ONLY SECTION --- */}

    </div>
  );
}