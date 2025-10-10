'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Icons ---
const GithubIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const LinkIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const ChevronRightIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;


// --- Main Component ---
export default function FinalProjectsPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0); // For mobile card stack

  const projectsData = [
    { id: 1, name: "NIDAS-PURE", subtitle: "E-commerce", description: "A premium e-commerce platform for pure and organic products.", technologies: ["Next.js", "TailwindCSS", "MongoDB"], image: "/aerawat.jpg", mobileImage: "/aerawat.jpg", github: "/nidaspure", live: "https://nidaspure.com/" },
    { id: 2, name: "GENESIS-CLASSES", subtitle: "Education", description: "An advanced educational platform for online learning.", technologies: ["React.js", "PostgreSQL", "Node.js"], image: "/genesis.jpg", mobileImage: "/genesis.jpg", github: "/genesisclasses", live: "https://genesisclasses.net/" },
    { id: 3, name: "AERAWAT", subtitle: "Business", description: "A professional corporate website showcasing business services.", technologies: ["React.js", "Framer Motion", "EmailJS"], image: "/aew.jpg", mobileImage: "/aew.jpg", github: "/aerawat", live: "https://rabbitautocare.com/" },
    { id: 4, name: "RABBIT", subtitle: "Car Care", description: "An innovative car care platform offering comprehensive services.", technologies: ["Next.js", "Supabase"], image: "/rabbit.jpg", mobileImage: "/rabbit.jpg", github: "/rabbitautocare", live: "https://rabbitautocare.com/" },
  ];
  
  const selectedProject = selectedId ? projectsData.find(p => p.id === selectedId) : null;
  const selectedIndex = selectedId ? projectsData.findIndex(p => p.id === selectedId) : -1;
  
  const SLANT_AMOUNT = '80px';

  // Mobile pagination
  const paginate = (newDirection) => {
    setMobileIndex((prevIndex) => (prevIndex + newDirection + projectsData.length) % projectsData.length);
  };

  const currentMobileProject = projectsData[mobileIndex];

  return (
    <div className="w-full min-h-screen bg-white font-sans text-gray-800">
      

      <div className="relative flex flex-col md:flex-row w-full min-h-screen">
        
        {/* --- DESKTOP VIEW: DIAGONAL SLICES (Unchanged) --- */}
        <div className="hidden md:flex flex-1 relative overflow-hidden">
          <motion.div 
            className="relative w-2/5 flex flex-col justify-center items-start p-8 bg-gray-50"
            style={{ clipPath: `polygon(0 0, 100% 0, calc(100% - ${SLANT_AMOUNT}) 100%, 0 100%)` }}
            variants={{
              initial: { x: '0%' },
              selected: { x: '-100%' }
            }}
            animate={selectedId ? 'selected' : 'initial'}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          >
            <h1 className="text-5xl lg:text-6xl font-black text-gray-300 tracking-tighter">PROJECTS</h1>
            <p className="mt-4 max-w-xs text-gray-600">
              A selection of my work. Click any project to see details.
            </p>
          </motion.div>

          <div className="flex flex-1" style={{ marginLeft: `calc(-${SLANT_AMOUNT} / 2)` }}>
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative flex-1 h-full cursor-pointer overflow-hidden"
                style={{ 
                  clipPath: `polygon(${SLANT_AMOUNT} 0, 100% 0, calc(100% - ${SLANT_AMOUNT}) 100%, 0 100%)`,
                  marginLeft: `calc(-${SLANT_AMOUNT} / 2)`,
                }}
                onClick={() => setSelectedId(project.id)}
                variants={{
                    initial: { x: '0%' },
                    selected: { x: index < selectedIndex ? '-100vw' : '100vw' }
                }}
                animate={selectedId && selectedId !== project.id ? 'selected' : 'initial'}
                transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" style={{ backgroundImage: `url(${project.image})` }}/>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 text-white">
                  <h2 className="text-3xl font-black opacity-60 drop-shadow-lg">{String(index + 1).padStart(2, '0')}</h2>
                  <h3 className="text-xl font-bold uppercase tracking-wider drop-shadow-lg">{project.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedProject && (
              <motion.div 
                className="absolute inset-0 z-20 flex justify-center items-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                onClick={() => setSelectedId(null)}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedProject.image})` }} />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                
                <motion.div
                  className="relative w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0, transition: { duration: 0.5, delay: 0.7 } }}
                  exit={{ scale: 0.9, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-black text-gray-900">{selectedProject.name}</h1>
                    <button onClick={() => setSelectedId(null)} className="p-2 rounded-full hover:bg-black/10 transition-colors"><CloseIcon /></button>
                  </div>
                  <p className="text-lg text-gray-600 font-semibold mt-1">{selectedProject.subtitle}</p>
                  <p className="text-gray-700 my-6 leading-relaxed">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.technologies.map(tech => <span key={tech} className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">{tech}</span>)}
                  </div>
                  <div className="flex gap-4">
                    {selectedProject.github !== "#" && <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-semibold"><GithubIcon /> GitHub</a>}
                    {selectedProject.live !== "#" && <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-semibold"><LinkIcon /> Live Demo</a>}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- UPDATED MOBILE VIEW --- */}
        <div className="md:hidden w-full min-h-screen flex flex-col justify-center items-center p-4 pt-16 overflow-hidden">
          {/* Animated Background Image */}
          <AnimatePresence>
            <motion.div
              key={mobileIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentMobileProject.mobileImage || currentMobileProject.image})` }}/>
              <div className="absolute inset-0 bg-white/70 "/>
            </motion.div>
          </AnimatePresence>
          
          <h1 className="text-3xl font-black text-gray-900 text-center mb-4 z-10">My Projects</h1>
          <div className="relative w-full max-w-xs h-[520px] z-10">
            <AnimatePresence initial={false}>
              {projectsData.map((project, i) => {
                if (i === mobileIndex) {
                  return (
                    <motion.div
                      key={project.id}
                      className="absolute w-full h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 flex flex-col overflow-hidden"
                      initial={{ scale: 0.8, y: 50, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0.8, y: -50, opacity: 0, zIndex: 0 }}
                      transition={{ duration: 0.4 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, { offset, velocity }) => {
                        if (offset.x < -100 || velocity.x < -500) paginate(1);
                        if (offset.x > 100 || velocity.x > 500) paginate(-1);
                      }}
                    >
                      <img src={project.mobileImage || project.image} alt={project.name} className="w-full h-48 object-cover" />
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
                        <p className="text-gray-600 text-sm">{project.subtitle}</p>
                        <p className="text-gray-700 text-sm leading-relaxed mt-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.map(tech => <span key={tech} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">{tech}</span>)}
                        </div>
                      </div>
                      <div className="px-5 py-4 bg-white/50 border-t border-gray-200">
                        <div className="flex justify-center gap-8">
                          {project.github !== "#" && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black"><GithubIcon/></a>}
                          {project.live !== "#" && <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black"><LinkIcon/></a>}
                        </div>
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })}
            </AnimatePresence>
          </div>

          {/* <button 
            onClick={() => paginate(1)} 
            className="mt-6 bg-white p-3 rounded-full shadow-lg flex items-center justify-center z-10"
          >
            <ChevronRightIcon />
            <span className="ml-2 font-semibold text-sm">Next Project</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}