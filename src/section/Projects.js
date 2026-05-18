'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// --- Helper Icons ---
const GithubIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
const LinkIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const ChevronRightIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;


// --- Main Component ---
export default function FinalProjectsPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const swipeHintRef = useRef(null);

  // Use GSAP for the swipe hint animation
  useGSAP(() => {
    if (swipeHintRef.current) {
      gsap.to(swipeHintRef.current, {
        x: 20,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  });

  const targetWord = "PROJECTS";
  const getHighlightIndex = (name) => {
    for (let char of name.replace(/[^A-Z]/g, '')) {
      const idx = targetWord.indexOf(char);
      if (idx !== -1) return idx;
    }
    return -1;
  };

  const projectsData = [
    { id: 1, name: "NIDAS-PURE", subtitle: "E-commerce", description: "Nidas Pure is a fully functional e-commerce website dedicated to 100% natural, handmade Ayurvedic skincare products. The site is designed to provide a seamless and elegant shopping experience, reflecting the brand's commitment to purity and natural beauty. The platform effectively showcases a range of products, from face oils and hair care to specialized soap bars, inviting users to explore and purchase.", technologies: ["Next.js", "TailwindCSS", "Supabase"], image: "/used/nida.jpeg", mobileImage: "/used/nida.jpeg", hoverColor: "#059669", hoverFont: "Georgia, serif", hoverBgImage: "", github: "/nidaspure", live: "https://nidaspure.com/", tagline: "Handcrafted Ayurvedic skincare bringing the pure essence of nature to your beauty ritual." },
    { id: 2, name: "GENESIS-CLASSES", subtitle: "Education", description: "Genesis Classes is a comprehensive web platform for a leading coaching institute that specializes in preparing students for major competitive exams like IIT-JEE and NEET. The website serves as the central hub for prospective students, enrolled students, and parents, providing vital academic information and access to a suiteC of digital tools.", technologies: ["React.js", "Next.js", "PostgreSQL", "Node.js", "Supabase", "Tailwind CSS"], image: "/used/genesis-logo.png", mobileImage: "/used/genesis-logo.png", bgClass: "bg-white bg-[size:75%] bg-center bg-no-repeat", hoverColor: "#2563eb", hoverFont: "Impact, sans-serif", hoverBgImage: "", github: "/genesisclasses", live: "https://genesisclasses.net/", customHoverLetterImage: "/used/project/genesis.webp", tagline: "Nurturing academic excellence and guiding students towards their dream engineering and medical careers." },
    { id: 3, name: "AERAWAT", subtitle: "Business", description: "Houese of Aerawat is a clean, modern e-commerce website specializing in 92.5 sterling silver jewellery. The site is designed to create a premium and trustworthy shopping experience, showcasing a wide variety of intricate pieces, from necklaces and pendants to earrings and bracelets.", technologies: ["Next.js", "Framer Motion", "EmailJS", "Supabase", "Tailwind CSS", "Cloudinary", "Razorpay"], image: "/used/aerawats.jpg", mobileImage: "/used/aerawats.jpg", bgClass: "bg-white bg-[size:75%] bg-center bg-no-repeat", hoverColor: "#d97706", hoverFont: "'Brush Script MT', cursive", hoverBgImage: "", github: "/aerawat", live: "https://houseofaerawat.com/", customHoverLetterImage: "/used/project/aerawat.png", tagline: "Sleek, modern e-commerce showcasing premium 92.5 sterling silver jewelry with timeless elegance." },
    { id: 4, name: "RABBIT", subtitle: " Auto Care", description: "Rabbit AutoCare is a stylish and modern e-commerce platform built to sell a premium line of car detailing and auto-care products. The website is designed with a strong brand identity, focusing on a clean, visual, and user-friendly shopping experience. It effectively translates a niche product into an aspirational brand, targeting car enthusiasts who value quality and aesthetics.", technologies: ["Next.js", "Supabase", "Tailwind CSS", "Database", "Nodemailer", "Shiprocket", "Razorpay"], image: "/used/RabbitLogo.png", mobileImage: "/used/RabbitLogo.png", bgClass: "bg-white bg-[size:75%] bg-center bg-no-repeat", hoverColor: "#6a2c94", hoverFont: "'Courier New', monospace", hoverBgImage: "", github: "/rabbitautocare", live: "https://rabbitautocare.com/", customHoverLetterImage: "/used/project/rabbit.webp", tagline: "Premium car detailing and auto-care products designed to keep your vehicle in pristine, showroom condition." },
    { id: 5, name: "PAWGLOO", subtitle: "Coming Soon", description: "An exciting new project currently under active development. I am working on it, and it will be launched soon.", technologies: ["Under Development"], image: "/used/SplashScreen.png", mobileImage: "/used/SplashScreen.png", hoverColor: "#f59e0b", hoverFont: "fantasy", hoverBgImage: "", github: "#", live: "#", customHoverLetterImage: "/used/project/pawgloo.png", tagline: "A modern, pet-focused platform designed to connect pet lovers with premium services — coming soon." },
  ].map(p => ({ ...p, highlightIndex: getHighlightIndex(p.name) }));

  const selectedProject = selectedId ? projectsData.find(p => p.id === selectedId) : null;
  const selectedIndex = selectedId ? projectsData.findIndex(p => p.id === selectedId) : -1;

  const isNidas = hoveredProject?.name === "NIDAS-PURE";
  const hasSingleProjectImage = hoveredProject && !isNidas && hoveredProject.customHoverLetterImage;

  const SLANT_AMOUNT = '80px';

  return (
    <div className="w-full h-screen bg-white font-sans text-gray-800 overflow-hidden">


      <div className="relative flex flex-col md:flex-row w-full h-full">

        {/* --- DESKTOP VIEW: DIAGONAL SLICES (Unchanged) --- */}
        <div className="hidden md:flex flex-1 relative overflow-hidden h-full">
          <motion.div
            className="relative w-2/5 flex flex-col justify-center items-start p-8 bg-gray-50 h-full"
            style={{ clipPath: `polygon(0 0, 100% 0, calc(100% - ${SLANT_AMOUNT}) 100%, 0 100%)` }}
            variants={{
              initial: { x: '0%' },
              selected: { x: '-100%' }
            }}
            animate={selectedId ? 'selected' : 'initial'}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          >
            <AnimatePresence>
              {hoveredProject && hoveredProject.hoverBgImage && (
                <motion.div
                  key={hoveredProject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 z-0 bg-contain bg-no-repeat bg-center mix-blend-multiply pointer-events-none"
                  style={{ backgroundImage: `url(${hoveredProject.hoverBgImage})` }}
                />
              )}
            </AnimatePresence>
            
            <div className="relative z-10 flex flex-col items-start">
              <div className="relative flex items-center h-16 lg:h-20">
                {/* Custom single-project image layer */}
                <img 
                  src={hoveredProject?.customHoverLetterImage || "/used/project/aerawat.png"} 
                  alt={hoveredProject?.name}
                  className="absolute left-0 w-64 lg:w-80 h-auto object-contain pointer-events-none"
                  style={{
                    top: '50%',
                    opacity: hasSingleProjectImage ? 1 : 0,
                    transform: hasSingleProjectImage ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(0.9)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformOrigin: 'left center',
                    zIndex: 2,
                  }}
                />
                
                <h1 
                  className="text-5xl lg:text-6xl font-black text-gray-300 tracking-tighter flex items-center h-full transition-all duration-300"
                  style={{
                    opacity: hasSingleProjectImage ? 0 : 1,
                    transform: hasSingleProjectImage ? 'translateY(6px) scale(0.95)' : 'none',
                    pointerEvents: 'none'
                  }}
                >
                  {targetWord.split('').map((char, idx) => {
                    const visualScale = { 'O': 0.85, 'S': 1.15 }[char] || 1.0;
                    
                    return (
                      <span
                        key={idx}
                        style={{
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transform: isNidas ? 'translateY(-6px) scale(1.1)' : 'none',
                          position: 'relative',
                        }}
                      >
                        {/* Text layer */}
                        <span 
                          style={{ 
                            opacity: isNidas ? 0 : 1,
                            transition: 'opacity 0.4s ease-in-out',
                            display: 'inline-block'
                          }}
                        >
                          {char}
                        </span>

                        {/* Floral layer (Nidas Pure) */}
                        <img 
                          src={`/used/project/${char}.png`} 
                          alt={char}
                          className="h-[0.95em] w-auto object-contain pointer-events-none"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) scale(${isNidas ? visualScale : 0.8 * visualScale})`,
                            opacity: isNidas ? 1 : 0,
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        />
                      </span>
                    );
                  })}
                </h1>
              </div>
              <div className="mt-4 max-w-xs h-16 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={hoveredProject ? hoveredProject.id : 'default'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="text-gray-600 text-sm leading-relaxed"
                  >
                    {hoveredProject ? hoveredProject.tagline : "A selection of my work. Click any project to see details."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-1 h-full">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative flex-1 h-full cursor-pointer overflow-hidden"
                style={{
                  clipPath: `polygon(${SLANT_AMOUNT} 0, 100% 0, calc(100% - ${SLANT_AMOUNT}) 100%, 0 100%)`,
                  marginLeft: `calc(-${SLANT_AMOUNT})`,
                }}
                onClick={() => setSelectedId(project.id)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                variants={{
                  initial: { x: '0%' },
                  selected: { x: index < selectedIndex ? '-100vw' : '100vw' }
                }}
                animate={selectedId && selectedId !== project.id ? 'selected' : 'initial'}
                transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
              >
                <div className={`absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110 ${project.bgClass || 'bg-cover bg-center'}`} style={{ backgroundImage: `url(${project.image})` }} />
                <div className={`absolute inset-0 transition-colors duration-300 ${
                  hoveredProject 
                    ? (hoveredProject.id === project.id ? 'bg-black/0' : 'bg-black/60') 
                    : 'bg-black/40'
                }`} />
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
                <div className={`absolute inset-0 ${selectedProject.bgClass || 'bg-cover bg-center'}`} style={{ backgroundImage: `url(${selectedProject.image})` }} />
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

        {/* --- UPDATED MOBILE VIEW (Horizontal Scroll Snap) --- */}
        <div className="md:hidden w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
          {/* Swipe Hint Overlay */}
          <div className="absolute top-1/2 right-4 z-50 pointer-events-none text-white/50 mix-blend-difference" ref={swipeHintRef}>
            <div className="flex flex-col items-center gap-1">
              <ChevronRightIcon />
            </div>
          </div>

          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="relative min-w-full w-full h-full flex-shrink-0 snap-center flex flex-col justify-end"
            >
              {/* Background Image */}
              <div
                className={`absolute inset-0 ${project.bgClass || 'bg-cover bg-center'}`}
                style={{ backgroundImage: `url(${project.mobileImage || project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-8 pb-24 md:pb-8 flex flex-col gap-3 h-full justify-end">
                <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-bold text-white w-max mb-2">
                  {String(index + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
                </div>

                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none shadow-black drop-shadow-xl border-b-4 border-whtie">{project.name}</h2>
                <p className="text-lg text-gray-200 font-medium">{project.subtitle}</p>

                <p className="text-sm text-gray-300 leading-relaxed line-clamp-4 max-w-prose">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 my-2">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-2">
                  {project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm shadow-lg hover:bg-gray-200 transition-colors">
                      <GithubIcon /> Code
                    </a>
                  )}
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white text-white rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
                      <LinkIcon /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}