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

  const projectsData = [
    { id: 1, name: "NIDAS-PURE", subtitle: "E-commerce", description: "Nidas Pure is a fully functional e-commerce website dedicated to 100% natural, handmade Ayurvedic skincare products. The site is designed to provide a seamless and elegant shopping experience, reflecting the brand's commitment to purity and natural beauty. The platform effectively showcases a range of products, from face oils and hair care to specialized soap bars, inviting users to explore and purchase.", technologies: ["Next.js", "TailwindCSS", "Supabase"], image: "/nida.jpeg", mobileImage: "/nida.jpeg", github: "/nidaspure", live: "https://nidaspure.com/" },
    { id: 2, name: "GENESIS-CLASSES", subtitle: "Education", description: "Genesis Classes is a comprehensive web platform for a leading coaching institute that specializes in preparing students for major competitive exams like IIT-JEE and NEET. The website serves as the central hub for prospective students, enrolled students, and parents, providing vital academic information and access to a suiteC of digital tools.", technologies: ["React.js", "Next.js", "PostgreSQL", "Node.js", "Supabase", "Tailwind CSS"], image: "/genesis.jpg", mobileImage: "/genesis.jpg", github: "/genesisclasses", live: "https://genesisclasses.net/" },
    { id: 3, name: "AERAWAT", subtitle: "Business", description: "Houese of Aerawat is a clean, modern e-commerce website specializing in 92.5 sterling silver jewellery. The site is designed to create a premium and trustworthy shopping experience, showcasing a wide variety of intricate pieces, from necklaces and pendants to earrings and bracelets.", technologies: ["Next.js", "Framer Motion", "EmailJS","Supabase","Tailwind CSS", "Cloudinary","Razorpay"], image: "/aew.jpg", mobileImage: "/aew.jpg", github: "/aerawat", live: "https://houseofaerawat.com/" },
    { id: 4, name: "RABBIT", subtitle: " Auto Care", description: "Rabbit AutoCare is a stylish and modern e-commerce platform built to sell a premium line of car detailing and auto-care products. The website is designed with a strong brand identity, focusing on a clean, visual, and user-friendly shopping experience. It effectively translates a niche product into an aspirational brand, targeting car enthusiasts who value quality and aesthetics.", technologies: ["Next.js", "Supabase", "Tailwind CSS", "Database", "Nodemailer","Shiprocket","Razorpay"], image: "/rabbit.jpg", mobileImage: "/rabbit.jpg", github: "/rabbitautocare", live: "https://rabbitautocare.com/" },
    { id: 5, name: "PAWGLOO", subtitle: "Coming Soon", description: "An exciting new project currently under active development. I am working on it, and it will be launched soon.", technologies: ["Under Development"], image: "/SplashScreen.png", mobileImage: "/SplashScreen.png", github: "#", live: "#" },
  ];

  const selectedProject = selectedId ? projectsData.find(p => p.id === selectedId) : null;
  const selectedIndex = selectedId ? projectsData.findIndex(p => p.id === selectedId) : -1;

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
            <h1 className="text-5xl lg:text-6xl font-black text-gray-300 tracking-tighter">PROJECTS</h1>
            <p className="mt-4 max-w-xs text-gray-600">
              A selection of my work. Click any project to see details.
            </p>
          </motion.div>

          <div className="flex flex-1 h-full" style={{ marginLeft: `calc(-${SLANT_AMOUNT} / 2)` }}>
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
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" style={{ backgroundImage: `url(${project.image})` }} />
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
                className="absolute inset-0 bg-cover bg-center"
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