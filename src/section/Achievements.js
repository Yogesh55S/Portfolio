"use client";
import React from 'react';

const achievements = [
  {
    title: "Smart India Hackathon",
    description: "Participated in the national level Smart India Hackathon, showcasing innovative solutions for real-world problems.",
    icon: "emoji_events",
    highlight: true,
    category: "Competition"
  },
  {
    title: "KAVACH Hackathon",
    description: "Represented my college team in KAVACH Hackathon, focusing on cybersecurity solutions.",
    icon: "security",
    highlight: false,
    category: "Competition"
  },
  {
    title: "Jaipur Hackathon - Runner Up",
    description: "Secured Runner-up position at Jaipur Hackathon with innovative web application solutions.",
    icon: "military_tech",
    highlight: true,
    category: "Award"
  },
  {
    title: "College Club Convener",
    description: "Organized and managed multiple technical & cultural events, leading teams of 50+ members.",
    icon: "groups",
    highlight: false,
    category: "Leadership"
  },
];

export default function Achievements() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/ach.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Google Icons CSS */}
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
      />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Minimal geometric lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="monoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          
          <g className="opacity-40">
            <line x1="0%" y1="30%" x2="100%" y2="35%" stroke="url(#monoGradient)" strokeWidth="1">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="0%" y1="70%" x2="100%" y2="65%" stroke="url(#monoGradient)" strokeWidth="1">
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="5s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-8 sm:py-12 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <div className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-4 font-light">
              Milestones
            </div>
            <h2 className="text-white font-light text-2xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wider">
              ACHIEVEMENTS
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-6"></div>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative">
                <div className="bg-gray-800/40 backdrop-blur-md border border-gray-600/30 rounded-2xl p-8 hover:bg-gray-700/40 transition-all duration-500 hover:border-gray-500/40 relative overflow-hidden hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1">
                  
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600/30 mb-6 group-hover:scale-105 group-hover:from-gray-600/50 group-hover:to-gray-700/50 transition-all duration-500 shadow-lg">
                    <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-white transition-colors duration-300">
                      {achievement.icon}
                    </span>
                    {achievement.highlight && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gray-700/30 text-gray-400 text-xs font-light tracking-wider uppercase rounded-full border border-gray-600/20 mb-4">
                      {achievement.category}
                    </span>
                    <h3 className="text-white font-medium text-xl mb-3 tracking-wide group-hover:text-gray-100 transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-300">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Geometric accent */}
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <svg viewBox="0 0 64 64" className="w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <path d="M64 0L32 32L64 64V0Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="relative group">
                
                <div className="bg-gray-800/50 backdrop-blur-md border border-gray-600/30 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-500 hover:border-gray-500/40 relative overflow-hidden hover:shadow-xl hover:shadow-black/20">
                  
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Icon */}
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-700/60 to-gray-800/60 rounded-2xl flex items-center justify-center border border-gray-600/30 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <span className="material-symbols-outlined text-xl text-gray-300 group-hover:text-white transition-colors duration-300">
                          {achievement.icon}
                        </span>
                      </div>
                      {achievement.highlight && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                          <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Category */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-light tracking-wider uppercase mb-1">
                        {achievement.category}
                      </span>
                      {achievement.highlight && (
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <span className="text-gray-400 text-xs font-light">Featured</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="text-white font-medium text-lg mb-3 tracking-wide group-hover:text-gray-100 transition-colors duration-300 leading-tight">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Progress line */}
                  <div className="relative">
                    <div className="w-full h-0.5 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-gray-400 to-white rounded-full transition-all duration-1000 group-hover:w-full"
                        style={{ width: achievement.highlight ? '100%' : '75%' }}
                      ></div>
                    </div>
                  </div>

                  {/* Geometric pattern */}
                  <div className="absolute top-0 right-0 w-12 h-12">
                    <svg viewBox="0 0 48 48" className="w-full h-full opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <path d="M48 0L24 24L48 48V0Z" fill="white"/>
                    </svg>
                  </div>
                </div>

                {/* Connection line */}
                {index < achievements.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="w-px h-8 bg-gradient-to-b from-gray-600 via-gray-500 to-transparent relative">
                      <div className="absolute top-0 left-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stats (Mobile/Tablet) */}
          <div className="lg:hidden mt-8 grid grid-cols-3 gap-4">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-light text-white mb-1">4</div>
              <div className="text-xs text-gray-500 tracking-wider uppercase">Total</div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-light text-gray-300 mb-1">2</div>
              <div className="text-xs text-gray-500 tracking-wider uppercase">Featured</div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-light text-gray-400 mb-1">3</div>
              <div className="text-xs text-gray-500 tracking-wider uppercase">Categories</div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="text-center mt-16 sm:mt-20 lg:mt-24">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mb-8"></div>
            <p className="text-gray-500 font-light text-sm tracking-wide max-w-md mx-auto">
              Every achievement shapes the foundation for future innovations and growth
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .material-symbols-outlined {
          font-variation-settings:
            'FILL' 0,
            'wght' 300,
            'GRAD' 0,
            'opsz' 24;
        }
      `}</style>
    </div>
  );
}