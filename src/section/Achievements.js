"use client";
import React from 'react';

const achievements = [
  {
    title: "Smart India Hackathon",
    description: "Participated in the national level Smart India Hackathon, showcasing innovative solutions for real-world problems.",
    icon: "🏆",
    color: "from-yellow-400 to-orange-500",
    highlight: true
  },
  {
    title: "KAVACH Hackathon",
    description: "Represented my college team in KAVACH Hackathon, focusing on cybersecurity solutions.",
    icon: "🛡️",
    color: "from-blue-400 to-cyan-500",
    highlight: false
  },
  {
    title: "Jaipur Hackathon - Runner Up",
    description: "Secured Runner-up position at Jaipur Hackathon with innovative web application solutions.",
    icon: "🥈",
    color: "from-gray-400 to-slate-500",
    highlight: true
  },
  {
    title: "College Club Convener",
    description: "Organized and managed multiple technical & cultural events, leading teams of 50+ members.",
    icon: "👥",
    color: "from-purple-400 to-pink-500",
    highlight: false
  },
];

export default function Achievements() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
      {/* Background texture overlay - matching hero */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Connecting Network Lines Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
              <stop offset="30%" stopColor="rgba(56, 189, 248, 0.6)" />
              <stop offset="70%" stopColor="rgba(147, 197, 253, 0.4)" />
              <stop offset="100%" stopColor="rgba(147, 197, 253, 0)" />
            </linearGradient>
            <linearGradient id="connectionGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(147, 197, 253, 0)" />
              <stop offset="30%" stopColor="rgba(147, 197, 253, 0.5)" />
              <stop offset="70%" stopColor="rgba(56, 189, 248, 0.6)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </linearGradient>
            <filter id="flowGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Achievement Connection Lines */}
          <g className="opacity-60">
            {/* Top row to bottom row connections */}
            <line x1="25%" y1="45%" x2="75%" y2="65%" stroke="url(#connectionGradient1)" strokeWidth="2" filter="url(#flowGlow)" strokeDasharray="8,4">
              <animate attributeName="stroke-dashoffset" values="0;12" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="75%" y1="45%" x2="25%" y2="65%" stroke="url(#connectionGradient2)" strokeWidth="2" filter="url(#flowGlow)" strokeDasharray="6,6">
              <animate attributeName="stroke-dashoffset" values="0;12" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.8s" repeatCount="indefinite" />
            </line>
            
            {/* Horizontal connections */}
            <line x1="25%" y1="45%" x2="75%" y2="45%" stroke="url(#connectionGradient1)" strokeWidth="1.5" filter="url(#flowGlow)" strokeDasharray="10,5">
              <animate attributeName="stroke-dashoffset" values="0;15" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="25%" y1="65%" x2="75%" y2="65%" stroke="url(#connectionGradient2)" strokeWidth="1.5" filter="url(#flowGlow)" strokeDasharray="8,8">
              <animate attributeName="stroke-dashoffset" values="0;16" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4.5s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Achievement Node Points */}
          <g className="opacity-70">
            <circle cx="25%" cy="45%" r="4" fill="rgba(56, 189, 248, 0.8)" filter="url(#flowGlow)">
              <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="75%" cy="45%" r="4" fill="rgba(147, 197, 253, 0.8)" filter="url(#flowGlow)">
              <animate attributeName="r" values="4;7;4" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="25%" cy="65%" r="4" fill="rgba(99, 102, 241, 0.7)" filter="url(#flowGlow)">
              <animate attributeName="r" values="3.5;6.5;3.5" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="75%" cy="65%" r="4" fill="rgba(168, 85, 247, 0.7)" filter="url(#flowGlow)">
              <animate attributeName="r" values="4;7;4" dur="4.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4.2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Data Flow Particles */}
          <g className="opacity-80">
            <circle r="2" fill="rgba(56, 189, 248, 0.9)">
              <animateMotion dur="6s" repeatCount="indefinite" path="M 25,45 Q 50,35 75,45" />
              <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle r="1.5" fill="rgba(147, 197, 253, 0.8)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 75,45 Q 50,75 25,65" />
              <animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle r="1.8" fill="rgba(99, 102, 241, 0.7)">
              <animateMotion dur="7s" repeatCount="indefinite" path="M 25,65 Q 50,55 75,65" />
              <animate attributeName="opacity" values="0;0.8;0" dur="7s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-4 font-light">
              Milestones
            </div>
            <h2 className="text-white font-light text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wider">
              ACHIEVEMENTS
            </h2>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-6 sm:p-8 hover:bg-slate-700/50 transition-all duration-300 hover:border-slate-500/50 relative overflow-hidden">
                  
                  {/* Achievement Icon */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 border border-slate-600/50 mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-white font-light text-xl sm:text-2xl mb-4 tracking-wide group-hover:text-gray-100 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                    {achievement.description}
                  </p>

                  {/* Highlight indicator */}
                  {achievement.highlight && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}

                  {/* Gradient accent */}
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${achievement.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="text-center mt-16 sm:mt-20 lg:mt-24">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-8"></div>
            <p className="text-gray-400 font-light text-sm tracking-wide">
              Every achievement is a stepping stone to greater innovations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}