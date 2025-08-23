"use client";
import React from 'react';

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Indiefluence, Kurukshetra",
    date: "2025 - Present",
    description: "Working on full-stack web applications with modern frameworks like Next.js, Supabase, and TailwindCSS.",
    tech: ["Next.js", "Supabase", "TailwindCSS"],
    status: "current"
  },
  {
    role: "Full-Stack Intern",
    company: "Hopping Minds, Mohali",
    date: "Jul 2023 - Aug 2023",
    description: "Built full-stack applications using React.js, Node.js, and MongoDB, gaining experience in scalable architectures.",
    tech: ["React.js", "Node.js", "MongoDB"],
    status: "completed"
  },
  {
    role: "Web Developer Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Worked with HTML, CSS, JavaScript, and PHP to design responsive websites and integrate databases.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    status: "completed"
  },
  {
    role: "PHP Developer",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Developed backend APIs and dynamic modules with PHP and MySQL.",
    tech: ["PHP", "MySQL"],
    status: "completed"
  },
  {
    role: "Python with Database Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Worked with Python and MySQL to design database-driven applications.",
    tech: ["Python", "MySQL"],
    status: "completed"
  },
];

export default function Experience() {
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

      {/* Animated Network Lines Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
              <stop offset="50%" stopColor="rgba(56, 189, 248, 0.4)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(147, 197, 253, 0)" />
              <stop offset="50%" stopColor="rgba(147, 197, 253, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 197, 253, 0)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Horizontal flowing lines */}
          <g className="opacity-60">
            <line x1="0" y1="20%" x2="100%" y2="25%" stroke="url(#lineGradient1)" strokeWidth="1" filter="url(#glow)">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="40%" x2="100%" y2="35%" stroke="url(#lineGradient1)" strokeWidth="1" filter="url(#glow)">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="60%" x2="100%" y2="65%" stroke="url(#lineGradient1)" strokeWidth="1" filter="url(#glow)">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="80%" x2="100%" y2="75%" stroke="url(#lineGradient1)" strokeWidth="1" filter="url(#glow)">
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3.5s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Vertical flowing lines */}
          <g className="opacity-50">
            <line x1="15%" y1="0" x2="20%" y2="100%" stroke="url(#lineGradient2)" strokeWidth="1" filter="url(#glow)">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4.5s" repeatCount="indefinite" />
            </line>
            <line x1="35%" y1="0" x2="30%" y2="100%" stroke="url(#lineGradient2)" strokeWidth="1" filter="url(#glow)">
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3.8s" repeatCount="indefinite" />
            </line>
            <line x1="65%" y1="0" x2="70%" y2="100%" stroke="url(#lineGradient2)" strokeWidth="1" filter="url(#glow)">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4.2s" repeatCount="indefinite" />
            </line>
            <line x1="85%" y1="0" x2="80%" y2="100%" stroke="url(#lineGradient2)" strokeWidth="1" filter="url(#glow)">
              <animate attributeName="opacity" values="0.5;0.3;0.5" dur="5.2s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Network nodes */}
          <g className="opacity-40">
            <circle cx="15%" cy="25%" r="2" fill="rgba(56, 189, 248, 0.6)" filter="url(#glow)">
              <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="85%" cy="40%" r="2" fill="rgba(147, 197, 253, 0.6)" filter="url(#glow)">
              <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="65%" cy="75%" r="2" fill="rgba(56, 189, 248, 0.5)" filter="url(#glow)">
              <animate attributeName="r" values="1.5;3.5;1.5" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="25%" cy="60%" r="2" fill="rgba(147, 197, 253, 0.4)" filter="url(#glow)">
              <animate attributeName="r" values="2;4;2" dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Connection lines between nodes */}
          <g className="opacity-30">
            <line x1="15%" y1="25%" x2="85%" y2="40%" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.5" filter="url(#glow)" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="85%" y1="40%" x2="65%" y2="75%" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" filter="url(#glow)" strokeDasharray="3,3">
              <animate attributeName="stroke-dashoffset" values="0;6" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="65%" y1="75%" x2="25%" y2="60%" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.5" filter="url(#glow)" strokeDasharray="4,4">
              <animate attributeName="stroke-dashoffset" values="0;8" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3.5s" repeatCount="indefinite" />
            </line>
            <line x1="25%" y1="60%" x2="15%" y2="25%" stroke="rgba(147, 197, 253, 0.25)" strokeWidth="0.5" filter="url(#glow)" strokeDasharray="6,6">
              <animate attributeName="stroke-dashoffset" values="0;12" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2.8s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-4 font-light">
              My Journey
            </div>
            <h2 className="text-white font-light text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wider">
              EXPERIENCE
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
            
            {/* Mobile timeline line */}
            <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>

            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {experiences.map((exp, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-br from-slate-600 to-slate-800 border-2 border-gray-400 rounded-full z-10">
                    {exp.status === 'current' && (
                      <div className="absolute inset-0 rounded-full bg-cyan-400 animate-pulse"></div>
                    )}
                  </div>

                  {/* Content card */}
                  <div className={`ml-16 lg:ml-0 lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'} group`}>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-6 sm:p-8 hover:bg-slate-700/50 transition-all duration-300 hover:border-slate-500/50">
                      
                      {/* Date badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-3 py-1 bg-slate-700/50 text-gray-300 text-xs sm:text-sm font-light tracking-wide rounded-full border border-slate-600/50">
                          {exp.date}
                        </span>
                        {exp.status === 'current' && (
                          <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-light tracking-wide rounded-full border border-cyan-500/30">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Role and Company */}
                      <h3 className="text-white font-light text-xl sm:text-2xl mb-2 tracking-wide group-hover:text-gray-100 transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-gray-400 font-light text-sm sm:text-base mb-4 tracking-wide">
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p className="text-gray-300 font-light leading-relaxed mb-6 text-sm sm:text-base">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-slate-600/30 text-gray-300 text-xs font-light rounded border border-slate-500/30 hover:bg-slate-500/30 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Connector line for desktop */}
                    <div className={`hidden lg:block absolute top-1/2 w-8 h-px bg-gray-600 ${index % 2 === 0 ? 'right-full' : 'left-full'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <div className="text-center mt-16 sm:mt-20 lg:mt-24">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-8"></div>
            <p className="text-gray-400 font-light text-sm tracking-wide">
              Building tomorrow's web experiences, one line of code at a time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}