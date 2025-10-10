'use client';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
// Import icons for the left sidebar
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { VscGithubAlt } from "react-icons/vsc";


export default function PortfolioHero() {
  // State to track if the side elements should be visible
  const [isAtTop, setIsAtTop] = useState(true);

  // Effect to add a scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // If scroll position is greater than 100px from the top, hide the elements
      if (window.scrollY > 100) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs only once

  return (
    // Main container: full screen, white background
    <div className="bg-white min-h-screen relative overflow-hidden font-sans">
      
   {/* 1. Leaf SVG Pattern */}
{/* <div className="absolute top-20 left-0 z-0 rotate-65">
  <img
    src="$"
    alt="Flowing leaves background decoration"
    className="w-auto -translate-x-1/3 -translate-y-1/3 opacity-70 
               "
  />
</div> */}

      {/* 2. Left Social Icons - Now fade out on scroll */}
      <div 
        className={`hidden md:flex fixed left-18 md:left-18 top-1/2 -translate-y-1/2 z-30 flex-col space-y-6 transition-opacity duration-300 ${isAtTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <a href="https://github.com/Yogesh55S" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-300">
          <VscGithubAlt size={20} />
        </a>
        <a href="https://www.linkedin.com/in/yogesh-kumar-983840226/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-300">
          <FaLinkedinIn size={20} />
        </a>
        <a href="https://wa.me/9350161043" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-300">
          <FaWhatsapp size={20} />
        </a>
      </div>

      {/* 3. Right Resume Link - Now fade out on scroll */}
      <div 
        className={`hidden md:flex fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 ${isAtTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
      
      {/* 4. Anime Character Image */}
      <img 
        src="/new.png" // Your image path in the /public folder
        alt="Anime character of Yogesh" 
        className="absolute left-1/2 -translate-x-1/2 bottom-[-5vh] z-10 w-auto h-[110vh] md:h-[105vh] max-w-none"
      />

      {/* 5. Text Block */}
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
  );
}