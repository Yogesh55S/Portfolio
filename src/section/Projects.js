'use client';
import React, { useState } from 'react';

const projectsData = [
  {
    id: 1,
    name: "NIDAS PURE",
    subtitle: "E-commerce Platform",
    type: "E-commerce Website",
    year: "2025",
    description: "A premium e-commerce platform for pure and organic products. Features include product catalog, shopping cart, secure checkout, user authentication, order management, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
    technologies: ["React.js", "Next.js", "TailwindCSS", "Node.js", "MongoDB", "Stripe API"],
    github: "#",
    live: "https://nidaspure.com/",
    status: "Completed"
  },
  {
    id: 2,
    name: "GENESIS CLASSES",
    subtitle: "Educational Platform",
    type: "Learning Management System",
    year: "2025",
    description: "An advanced educational platform designed for online learning and course management. Features include course enrollment, video streaming, assignment submission, progress tracking, and interactive learning tools for students and educators.",
    technologies: ["React.js", "Next.js", "TailwindCSS", "Node.js", "PostgreSQL", "Video.js"],
    github: "#",
    live: "https://genesisclasses.net/",
    status: "Completed"
  },
  {
    id: 3,
    name: "HOUSE OF AWERAWAT",
    subtitle: "Business Website",
    type: "Corporate Website",
    year: "2025",
    description: "A professional corporate website showcasing business services and company portfolio. Features include service catalog, company information, contact forms, testimonials, and responsive design optimized for all devices.",
    technologies: ["React.js", "Next.js", "TailwindCSS", "Framer Motion", "EmailJS"],
    github: "#",
    live: "#",
    status: "Completed"
  },
  {
    id: 4,
    name: "BLOOD DONATION",
    subtitle: "Management System",
    type: "Healthcare Platform",
    year: "Oct 2021",
    description: "A comprehensive system built for my college's annual blood donation fair to efficiently store and manage donor information. Features include donor registration, blood type tracking, and donation history management.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"],
    github: "https://github.com/yourusername/blood-donation",
    live: "https://your-blood-donation-demo.com",
    status: "Completed"
  },
  {
    id: 5,
    name: "BILLING SYSTEM",
    subtitle: "Python Application",
    type: "Desktop Application",
    year: "Oct 2022",
    description: "A comprehensive billing application built with Python that provides detailed product information including quantity, quality, and pricing simultaneously. Features invoice generation and inventory tracking.",
    technologies: ["Python", "Tkinter", "MySQL"],
    github: "https://github.com/yourusername/billing-system",
    live: "#",
    status: "Completed"
  },
  {
    id: 6,
    name: "AGRI-FARMA",
    subtitle: "Full-Stack Platform",
    type: "Agriculture Platform",
    year: "Nov 2024",
    description: "A comprehensive platform designed for farmers to purchase farm medicines and access the latest government information and offers. Features include product catalog, order management, and government schemes integration.",
    technologies: ["React.js", "Node.js", "MongoDB", "Vite", "Bootstrap"],
    github: "https://github.com/yourusername/agri-farma",
    live: "https://your-agri-farma-demo.com",
    status: "Completed"
  },
  {
    id: 7,
    name: "RABBIT AUTO CARE",
    subtitle: "Car Care Platform",
    type: "Automotive Services",
    year: "2025",
    description: "An innovative car care platform offering comprehensive services, product management, and modern dashboards for both customers and administrators. Features booking system and service tracking.",
    technologies: ["Next.js", "TailwindCSS", "Supabase", "Node.js"],
    github: "https://github.com/yourusername/rabbit-auto-care",
    live: "https://rabbitautocare.com/",
    status: "Completed"
  }
];

export default function ProjectsPage() {
  const [currentProject, setCurrentProject] = useState(0);
  const [showTech, setShowTech] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentProjectData = projectsData[currentProject];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projectsData.length);
    setShowTech(false);
    setShowInfo(false);
    setIsFlipped(false);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setShowTech(false);
    setShowInfo(false);
    setIsFlipped(false);
  };

  const handleTechClick = () => {
    setShowTech(!showTech);
  };

  const handleInfoClick = () => {
    if (!showInfo) {
      setIsFlipped(true);
      setTimeout(() => setShowInfo(true), 300);
    } else {
      setShowInfo(false);
      setTimeout(() => setIsFlipped(false), 300);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/pro.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* Main content container */}
        <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:px-8 min-h-[60vh] sm:min-h-[50vh]">
          {/* Small label */}
          <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 md:mb-6 font-light">
            Project {currentProject + 1} of {projectsData.length}
          </div>
          
          {/* Main project name with flip effect */}
          <div className="relative mb-3 sm:mb-4 md:mb-6 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto" style={{ perspective: '1000px' }}>
            <div 
              className="transition-transform duration-700"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front - Project Name */}
              <div 
                className="backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className="text-white font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wider mb-1 sm:mb-2 leading-tight">
                  {currentProjectData.name}
                </h1>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-wide">
                  {currentProjectData.subtitle}
                </div>
              </div>
              
              {/* Back - Project Info */}
              <div 
                className="absolute inset-0 backface-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {showInfo && (
                  <div className="text-white font-light text-[10px] sm:text-xs md:text-sm lg:text-base leading-relaxed px-2 sm:px-4 max-h-[30vh] overflow-y-auto">
                    {currentProjectData.description}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Project type and year */}
          <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-4 sm:mb-6">
            {currentProjectData.type} • {currentProjectData.year}
          </div>
        </div>

        {/* Left side - GitHub, Live, Tech icons */}
        <div className="absolute left-1 sm:left-2 md:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 sm:space-y-4 md:space-y-6 z-40">
          {/* GitHub Link */}
          {currentProjectData.github !== "#" && (
            <a 
              href={currentProjectData.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 group p-1"
              aria-label="GitHub Repository"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
            </a>
          )}
          
          {/* Live Demo Link */}
          {currentProjectData.live !== "#" && (
            <a 
              href={currentProjectData.live} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 group p-1"
              aria-label="Live Demo"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          
          {/* Tech Stack Toggle */}
          <button
            onClick={handleTechClick}
            className="text-gray-400 hover:text-white transition-colors duration-300 group relative p-1"
            aria-label="View Technologies"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            
            {/* Tech Stack Popup */}
            {showTech && (
              <div className="absolute left-full ml-2 sm:ml-4 top-1/2 transform -translate-y-1/2 bg-slate-800/95 backdrop-blur-sm border border-gray-600 rounded-lg p-2 sm:p-3 min-w-[180px] sm:min-w-[200px] z-50 max-w-[250px]">
                <div className="text-gray-300 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider font-light mb-2">
                  Technologies Used
                </div>
                <div className="flex flex-wrap gap-1">
                  {currentProjectData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-700/50 text-gray-300 text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-gray-600 font-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Right side - Info icon */}
        <div className="absolute right-1 sm:right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-40">
          <button
            onClick={handleInfoClick}
            className="text-gray-400 hover:text-white transition-colors duration-300 group p-1"
            aria-label="Project Information"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Navigation arrows - FIXED positioning for better responsiveness */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 sm:space-x-6 bg-slate-800/80 backdrop-blur-sm border border-gray-600 rounded-full px-3 sm:px-4 py-2 z-50">
          <button
            onClick={prevProject}
            className="text-gray-400 hover:text-white transition-colors duration-300 group p-1"
            aria-label="Previous Project"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Project indicators */}
          <div className="flex space-x-1 sm:space-x-2">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentProject(index);
                  setShowTech(false);
                  setShowInfo(false);
                  setIsFlipped(false);
                }}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300 ${
                  currentProject === index ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextProject}
            className="text-gray-400 hover:text-white transition-colors duration-300 group p-1"
            aria-label="Next Project"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Status indicator */}
        <div className="absolute top-2 sm:top-4 md:top-8 right-2 sm:right-4 md:right-8 z-40">
          <div className={`text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider font-light px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border ${
            currentProjectData.status === 'Completed' 
              ? 'text-green-400 border-green-400/50 bg-green-400/5' 
              : 'text-yellow-400 border-yellow-400/50 bg-yellow-400/5'
          }`}>
            {currentProjectData.status}
          </div>
        </div>
      </div>

      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}