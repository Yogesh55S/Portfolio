'use client';
import React from 'react';

// Icon positions - Responsive sizing for different screen sizes
const iconPositions = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", top: "20%", left: "8%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", top: "15%", left: "20%", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", top: "10%", left: "38%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", top: "15%", left: "55%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", top: "8%", left: "70%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", top: "25%", left: "85%", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", top: "45%", left: "22%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", top: "50%", left: "78%", size: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", top: "50%", left: "92%", size: "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", top: "70%", left: "10%", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", top: "80%", left: "32%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", top: "70%", left: "48%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", top: "75%", left: "68%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", top: "68%", left: "82%", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24" },
];

export default function Skills() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-white to-indigo-50 px-4 sm:px-6 lg:px-8 group">
      
      {/* Background Image with Hover Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: 'url(/imgs.jpg)',
          filter: 'blur(0px) group-hover:blur(0px)',
        }}
      />
      
      {/* Floating Tech Icons - Responsive sizing */}
      {iconPositions.map((pos, index) => (
        <div
          key={index}
          className={`absolute ${pos.size} transition-transform duration-300 hover:scale-110`}
          style={{
            top: pos.top,
            left: pos.left,
            animation: `floatIcon 4s ease-in-out infinite`,
            animationDelay: `${index * 0.3}s`,
          }}
        >
          <img src={pos.icon} alt="" className="w-full h-full object-contain drop-shadow-2xl opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      ))}
      
      {/* Central Skills Logo */}
      <div className="text-center z-10 px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider">
          <span className="text-teal-500 drop-shadow-lg" style={{ fontSize: '0.8em' }}>&lt;</span>
          <span className="flex items-center gap-1 sm:gap-2 md:gap-3 relative">
            <span className="text-gray-600 drop-shadow-md">SK</span>
            {/* MongoDB Leaf Icon attached to I */}
            <span className="relative inline-block">
              <span className="text-gray-600 drop-shadow-md">I</span>
              <svg className="absolute -top-6 sm:-top-8 md:-top-10 lg:-top-14 left-1/2 transform -translate-x-1/2 w-6 h-10 sm:w-8 sm:h-14 md:w-10 md:h-18 lg:w-12 lg:h-20 text-green-500 drop-shadow-lg" 
                   viewBox="0 0 24 48" 
                   fill="currentColor"
                   style={{ animation: 'leafFloat 3s ease-in-out infinite' }}>
                <ellipse cx="12" cy="24" rx="8" ry="20" opacity="0.9"/>
                <path d="M12 4C12 4 8 12 8 24C8 36 12 44 12 44C12 44 16 36 16 24C16 12 12 4 12 4Z" opacity="0.7"/>
                <path d="M12 44 L12 48 L11 48 L11 44 Z" opacity="0.5"/>
              </svg>
            </span>
            <span className="text-gray-600 drop-shadow-md">LLS</span>
          </span>
          <span className="text-teal-500 drop-shadow-lg" style={{ fontSize: '0.8em' }}>/&gt;</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(8deg);
          }
        }
        
        @keyframes leafFloat {
          0%, 100% {
            transform: translateX(-50%) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(-50%) translateY(-8px) rotate(-5deg);
          }
          75% {
            transform: translateX(-50%) translateY(-5px) rotate(5deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          @keyframes floatIcon {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(5deg);
            }
          }
        }
      `}</style>
    </div>
  );
}