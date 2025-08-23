'use client';
import React, { useState, useEffect } from 'react';

export default function PortfolioHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [connections, setConnections] = useState([]);
  
  // Generate stars with random positions
  const stars = [
    { id: 0, x: 60.97, y: 16.22, r: 2.69 },
    { id: 1, x: 68.7, y: 8.17, r: 2.45 },
    { id: 2, x: 82.14, y: 87.1, r: 2.15 },
    { id: 3, x: 65.06, y: 54.06, r: 3.44 },
    { id: 4, x: 8.27, y: 34.35, r: 2.08 },
    { id: 5, x: 39.68, y: 2.43, r: 2.91 },
    { id: 6, x: 74.37, y: 43.1, r: 2.43 },
    { id: 7, x: 26.16, y: 96.92, r: 2.62 },
    { id: 8, x: 53.68, y: 50.31, r: 2.74 },
    { id: 9, x: 5.6, y: 61.12, r: 2.91 },
    { id: 10, x: 21.78, y: 43.29, r: 2.36 },
    { id: 11, x: 11.48, y: 57.59, r: 2.72 },
    { id: 12, x: 64.24, y: 78.6, r: 2.48 },
    { id: 13, x: 5.17, y: 85.75, r: 2.45 },
    { id: 14, x: 14.97, y: 91.24, r: 2.03 },
    { id: 15, x: 83.75, y: 83.53, r: 2.28 },
    { id: 16, x: 90.81, y: 55.04, r: 3.43 },
    { id: 17, x: 79.3, y: 62.05, r: 3.01 },
    { id: 18, x: 24.97, y: 27.63, r: 2.63 },
    { id: 19, x: 47.93, y: 51.41, r: 2.37 },
    { id: 20, x: 50.68, y: 22.3, r: 3.37 },
    { id: 21, x: 5.48, y: 35.02, r: 2.43 },
    { id: 22, x: 46.8, y: 51.33, r: 2.75 },
    { id: 23, x: 22.82, y: 18.32, r: 2.12 },
    { id: 24, x: 39.97, y: 86.64, r: 2.41 },
    { id: 25, x: 44.73, y: 19.63, r: 2.24 },
    { id: 26, x: 59.84, y: 39.61, r: 2.92 },
    { id: 27, x: 24.78, y: 34.49, r: 2.09 },
    { id: 28, x: 16.53, y: 35.83, r: 2.59 },
    { id: 29, x: 82.82, y: 30.93, r: 2.02 }
  ];

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 100;
      const mouseY = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x: mouseX, y: mouseY });
      
      // Find nearby stars within 15% of mouse cursor
      const nearbyStars = stars.filter(star => {
        const distance = Math.sqrt(
          Math.pow(star.x - mouseX, 2) + Math.pow(star.y - mouseY, 2)
        );
        return distance < 15;
      });
      
      // Create connections between nearby stars
      const newConnections = [];
      for (let i = 0; i < nearbyStars.length; i++) {
        for (let j = i + 1; j < nearbyStars.length; j++) {
          newConnections.push({
            from: nearbyStars[i],
            to: nearbyStars[j],
            id: `${nearbyStars[i].id}-${nearbyStars[j].id}`
          });
        }
        
        // Also connect each star to mouse position
        newConnections.push({
          from: nearbyStars[i],
          to: { x: mouseX, y: mouseY },
          id: `mouse-${nearbyStars[i].id}`
        });
      }
      
      setConnections(newConnections);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle resume download
  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/intern.pdf'; 
    link.download = 'intern.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Star Constellation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="starGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.6)" />
              <stop offset="100%" stopColor="rgba(147, 197, 253, 0.3)" />
            </linearGradient>
          </defs>
          
          {/* Star connections */}
          <g className="opacity-60">
            {connections.map((connection) => (
              <line
                key={connection.id}
                x1={`${connection.from.x}%`}
                y1={`${connection.from.y}%`}
                x2={`${connection.to.x}%`}
                y2={`${connection.to.y}%`}
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                filter="url(#starGlow)"
              />
            ))}
          </g>

          {/* Stars */}
          <g>
            {stars.map((star) => {
              // Check if this star is near mouse
              const distance = Math.sqrt(
                Math.pow(star.x - mousePosition.x, 2) + 
                Math.pow(star.y - mousePosition.y, 2)
              );
              const isNearMouse = distance < 15;
              
              return (
                <circle
                  key={star.id}
                  cx={`${star.x}%`}
                  cy={`${star.y}%`}
                  r={star.r}
                  fill={isNearMouse ? "rgba(56, 189, 248, 0.9)" : "rgba(255, 255, 255, 0.7)"}
                  filter="url(#starGlow)"
                  style={{ 
                    opacity: isNearMouse ? 1 : 0.6,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <animate 
                    attributeName="opacity" 
                    values="0.4;0.8;0.4"
                    dur={`${3 + star.id * 0.1}s`} 
                    repeatCount="indefinite" 
                  />
                </circle>
              );
            })}
          </g>

          {/* Mouse cursor indicator */}
          <circle
            cx={`${mousePosition.x}%`}
            cy={`${mousePosition.y}%`}
            r="4"
            fill="rgba(56, 189, 248, 0.3)"
            filter="url(#starGlow)"
            style={{ 
              opacity: connections.length > 0 ? 0.8 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        </svg>
      </div>
      
      {/* Main content container */}
      <div className="w-full max-w-6xl mx-auto relative">

        {/* Hero content */}
        <div className="flex flex-col items-center justify-center text-center px-4 md:px-8">
          {/* Small label */}
          <div className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-6 md:mb-8 font-light">
            I Am
          </div>
          
          {/* Main heading */}
          <h1 className="text-white font-light text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wider mb-3 md:mb-4">
            YOGESH
          </h1>
          
          {/* Subtitle */}
          <div className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-light">
            Full-Stack Developer
          </div>
        </div>

        {/* Social links - left side */}
        <div className="absolute left-4 md:left-8 bottom-8 flex flex-col space-y-4">
          {/* GitHub Link */}
          <a 
            href="https://github.com/Yogesh55S" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 group"
            aria-label="GitHub Profile"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
            </svg>
          </a>
          
          {/* LinkedIn Link */}
          <a 
            href="https://www.linkedin.com/in/yogesh-kumar-983840226/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 group"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          {/* WhatsApp Link */}
          <a 
            href="https://wa.me/9350161043" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 group"
            aria-label="WhatsApp Contact"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
          </a>
        </div>

        {/* Resume Button - right side (Changed from "Get In Touch") */}
        <div className="absolute right-8 bottom-8 text-right">
          <button
            onClick={handleResumeDownload}
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer group"
            aria-label="Download Resume"
          >
            <div className="text-xs uppercase tracking-wide font-light transform rotate-90 origin-bottom-right group-hover:scale-110 transition-transform duration-300">
              Resume
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
