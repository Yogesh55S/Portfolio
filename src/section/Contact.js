"use client";
import React from 'react';

export default function Contact() {
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

      {/* Contact Network Animation Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="contactNodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.1)" />
            </radialGradient>
            <linearGradient id="contactLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
              <stop offset="50%" stopColor="rgba(56, 189, 248, 0.6)" />
              <stop offset="100%" stopColor="rgba(147, 197, 253, 0)" />
            </linearGradient>
            <filter id="contactGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Contact connection web */}
          <g className="opacity-40">
            {/* Central hub lines radiating outward */}
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#contactLineGradient)" strokeWidth="1.5" filter="url(#contactGlow)" strokeDasharray="6,4">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="url(#contactLineGradient)" strokeWidth="1.5" filter="url(#contactGlow)" strokeDasharray="8,6">
              <animate attributeName="stroke-dashoffset" values="0;14" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.8s" repeatCount="indefinite" />
            </line>
            <line x1="50%" y1="50%" x2="15%" y2="80%" stroke="url(#contactLineGradient)" strokeWidth="1.5" filter="url(#contactGlow)" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4.5s" repeatCount="indefinite" />
            </line>
            <line x1="50%" y1="50%" x2="85%" y2="75%" stroke="url(#contactLineGradient)" strokeWidth="1.5" filter="url(#contactGlow)" strokeDasharray="7,3">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.2s" repeatCount="indefinite" />
            </line>
            
            {/* Orbital rings around center */}
            <circle cx="50%" cy="50%" r="15%" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="20,10" filter="url(#contactGlow)">
              <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="20s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="50%" r="25%" fill="none" stroke="rgba(147, 197, 253, 0.15)" strokeWidth="0.8" strokeDasharray="15,15" filter="url(#contactGlow)">
              <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="25s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Contact nodes */}
          <g className="opacity-60">
            {/* Central contact hub */}
            <circle cx="50%" cy="50%" r="6" fill="url(#contactNodeGradient)" filter="url(#contactGlow)">
              <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            
            {/* Social platform nodes */}
            <circle cx="20%" cy="20%" r="4" fill="rgba(255, 255, 255, 0.6)" filter="url(#contactGlow)">
              <animate attributeName="r" values="3;5;3" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="80%" cy="20%" r="4" fill="rgba(59, 130, 246, 0.7)" filter="url(#contactGlow)">
              <animate attributeName="r" values="3.5;5.5;3.5" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="15%" cy="80%" r="4" fill="rgba(249, 115, 22, 0.6)" filter="url(#contactGlow)">
              <animate attributeName="r" values="3;6;3" dur="4.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="85%" cy="75%" r="4" fill="rgba(34, 197, 94, 0.6)" filter="url(#contactGlow)">
              <animate attributeName="r" values="4;6;4" dur="3.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Data packets traveling */}
          <g className="opacity-80">
            <circle r="2" fill="rgba(56, 189, 248, 0.9)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 50,50 L 20,20 L 80,20 L 50,50" />
              <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle r="1.5" fill="rgba(147, 197, 253, 0.8)">
              <animateMotion dur="6s" repeatCount="indefinite" path="M 50,50 L 85,75 L 15,80 L 50,50" />
              <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle r="1.8" fill="rgba(99, 102, 241, 0.7)">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M 20,20 Q 65,35 85,75" />
              <animate attributeName="opacity" values="0;0.8;0" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Message transmission waves */}
          <g className="opacity-30">
            <circle cx="50%" cy="50%" r="8%" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2">
              <animate attributeName="r" values="8%;35%;8%" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="50%" r="12%" fill="none" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1.5">
              <animate attributeName="r" values="12%;40%;12%" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-4 font-light">
              Let's Connect
            </div>
            <h2 className="text-white font-light text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wider mb-8">
              CONTACT ME
            </h2>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Email */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-6 hover:bg-slate-700/50 transition-all duration-300 hover:border-slate-500/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-light text-lg tracking-wide">Email</h3>
                  <a 
                    href="mailto:Yogeshama914@gmail.com" 
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    Yogeshama914@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-6 hover:bg-slate-700/50 transition-all duration-300 hover:border-slate-500/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-light text-lg tracking-wide">Phone</h3>
                  <a 
                    href="tel:+919350161043" 
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    +91-9350161043
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8 mb-16">
            <a 
              href="https://github.com/Yogesh55S" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center hover:bg-slate-600/50 hover:border-slate-500/50 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/yogesh-kumar-983840226/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center hover:bg-blue-600/50 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a 
              href="https://leetcode.com/u/Yogeshkumar55/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center hover:bg-orange-600/50 hover:border-orange-500/50 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-gray-300 group-hover:text-orange-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.623 2.133 7.823-.074l.089-.098.301-.322c1.98-2.108 2.018-5.281.061-7.429l-2.02-2.217L17.173 3.54A1.374 1.374 0 0 0 16.21 3.023L13.483 0z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.geeksforgeeks.org/user/yogesha6ghc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center hover:bg-green-600/50 hover:border-green-500/50 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-gray-300 group-hover:text-green-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5.017 12c0-3.629.265-4.736 2.541-4.892 2.099-.144 6.784-.144 8.883 0C18.718 7.264 18.983 8.378 18.983 12c0 3.629-.265 4.736-2.542 4.892z"/>
              </svg>
            </a>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-4 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-4 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300 resize-none"
                rows={6}
              ></textarea>
              <button
                type="button"
                onClick={() => alert('Message functionality would be implemented with a backend service')}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-light tracking-wide rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Bottom section */}
          <div className="text-center mt-16 sm:mt-20">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-8"></div>
            <p className="text-gray-400 font-light text-sm tracking-wide">
              Ready to turn ideas into reality. Let's build something amazing together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}