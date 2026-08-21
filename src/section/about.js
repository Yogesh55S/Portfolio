"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Eye, Download, X, ArrowUpRight, 
  BookOpen, CheckCircle2, Code2, Smartphone, Terminal
} from 'lucide-react';

// Custom SVG Icons for social links
const FaGithub = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

const FaLinkedin = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
  </svg>
);

const FaWhatsapp = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-26.7l-7-4.1-72.5 19 19.3-70.6-4.5-7.4c-18.4-30.2-28.2-65.7-28.2-101.7 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
  </svg>
);

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks = {
    github: "https://github.com/Yogesh55S",
    linkedin: "https://www.linkedin.com/in/yogesh-kumar-983840226/",
    whatsapp: "https://wa.me/919350161043"
  };

  return (
    <section 
      id="about" 
      className="relative min-h-fit w-full bg-[#fcfbf9] text-gray-900 font-sans py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle blueprint line texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <div className="w-12 h-px bg-gray-900"></div>
          <span className="text-gray-600 text-xs tracking-[0.3em] font-bold uppercase font-space-grotesk">
            // About The Developer
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT COLUMN: Creative Polaroid Graphic Resume Preview --- */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div 
              onClick={() => setIsModalOpen(true)}
              className="group relative cursor-pointer w-full max-w-md"
            >
              {/* Paper tape stickers at corners */}
              <div className="absolute -top-3 left-8 w-20 h-6 bg-amber-100/90 border border-amber-200/80 -rotate-6 z-30 shadow-sm pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono text-amber-900/60 uppercase tracking-widest">res_v2026</span>
              </div>
              <div className="absolute -bottom-3 right-8 w-24 h-6 bg-amber-100/90 border border-amber-200/80 rotate-3 z-30 shadow-sm pointer-events-none flex items-center justify-center">
                <span className="text-[9px] font-mono text-amber-900/60 uppercase tracking-widest">click_to_view</span>
              </div>

              {/* Tilted Polaroid Frame (No glassmorphism, authentic paper feel) */}
              <div className="relative bg-white border-2 border-gray-900 p-4 sm:p-5 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-2 group-hover:rotate-0 group-hover:scale-[1.02] transition-all duration-500 ease-out">
                
                {/* Image Wrap */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 border border-gray-200">
                  <img 
                    src="/used/creative-resume.png" 
                    alt="Yogesh Kumar — Creative Resume Board"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle overlay badge on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="w-14 h-14 bg-white text-gray-900 rounded-full flex items-center justify-center mb-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-6 h-6" />
                    </div>
                    <span className="font-space-grotesk font-bold text-xs uppercase tracking-widest bg-black/80 px-4 py-2 rounded-sm border border-white/20">
                      Click to Expand Graphic Resume
                    </span>
                  </div>
                </div>

                {/* Polaroid Bottom Caption */}
                <div className="pt-4 pb-1 px-1 flex items-center justify-between font-space-grotesk">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm tracking-tight">YOGESH KUMAR</h3>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider">Full-Stack & Mobile Developer</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 border border-amber-200 rounded-sm">
                    <Sparkles className="w-3 h-3 animate-spin text-amber-600" />
                    <span>Scrapboard</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Hint underneath polaroid */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold font-space-grotesk text-gray-700 hover:text-black uppercase tracking-widest transition-colors cursor-pointer group"
            >
              <Eye className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>Tap to Open Graphic Resume Board</span>
            </button>
          </div>

          {/* --- RIGHT COLUMN: Creative Narrative & Interactive Features --- */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <span className="text-amber-600 font-bold font-space-grotesk text-xs uppercase tracking-[0.25em] mb-3">
              Full-Stack & Mobile Specialist
            </span>

            <h2 className="text-3xl sm:text-5xl font-light font-montserrat tracking-tight text-gray-900 uppercase leading-[1.1] mb-6">
              Turning complex ideas into <span className="font-semibold underline decoration-2 decoration-amber-500 underline-offset-8">shipped products</span>.
            </h2>

            <p className="text-gray-600 text-base sm:text-lg font-light font-inter leading-relaxed mb-8">
              Specializing in <strong className="font-medium text-gray-900">React Native, Next.js, Python, and AWS</strong>. I engineer production-grade applications with serverless infrastructure, robust fintech integrations (Cashfree, Razorpay), and fluid user interfaces designed for real-world impact.
            </p>

            {/* Organic Feature Badges (Physical Paper Tags) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 mb-10 font-space-grotesk">
              
              <div className="p-3.5 bg-white/90 border border-stone-200/60 border-l-4 border-l-[#c5a880] shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 flex items-center gap-4 group rounded-sm">
                <div className="w-9 h-9 rounded-full bg-stone-100/80 border border-stone-200/50 flex items-center justify-center text-stone-600 group-hover:bg-[#c5a880]/10 group-hover:text-[#c5a880] transition-colors shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 mb-0.5">Mobile Dev</h4>
                  <p className="text-[11px] text-stone-500 font-light leading-snug font-inter">React Native, iOS & Android MVP Builds</p>
                </div>
              </div>

              <div className="p-3.5 bg-white/90 border border-stone-200/60 border-l-4 border-l-[#c5a880] shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 flex items-center gap-4 group rounded-sm">
                <div className="w-9 h-9 rounded-full bg-stone-100/80 border border-stone-200/50 flex items-center justify-center text-stone-600 group-hover:bg-[#c5a880]/10 group-hover:text-[#c5a880] transition-colors shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 mb-0.5">Next.js & React</h4>
                  <p className="text-[11px] text-stone-500 font-light leading-snug font-inter">Modern Web, SSR, Turbopack & GSAP</p>
                </div>
              </div>

              <div className="p-3.5 bg-white/90 border border-stone-200/60 border-l-4 border-l-[#c5a880] shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 flex items-center gap-4 group rounded-sm">
                <div className="w-9 h-9 rounded-full bg-stone-100/80 border border-stone-200/50 flex items-center justify-center text-stone-600 group-hover:bg-[#c5a880]/10 group-hover:text-[#c5a880] transition-colors shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 mb-0.5">Backend & Cloud</h4>
                  <p className="text-[11px] text-stone-500 font-light leading-snug font-inter">Python, AWS Lambda, Supabase & Mongo</p>
                </div>
              </div>

            </div>

            {/* Action Buttons & Socials */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-gray-200 font-space-grotesk">
              
              {/* Read Story */}
              <Link 
                href="/about" 
                className="px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border-2 border-gray-900 rounded-sm flex-1 sm:flex-none"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Story</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {/* Social links */}
              <div className="flex items-center justify-center gap-3 sm:ml-auto pt-2 sm:pt-0">
                <a 
                  href={socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="GitHub Profile"
                  className="w-11 h-11 bg-white border border-gray-200 hover:border-gray-900 rounded-sm flex items-center justify-center text-gray-700 hover:text-black transition-colors shadow-sm"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn Profile"
                  className="w-11 h-11 bg-white border border-gray-200 hover:border-gray-900 rounded-sm flex items-center justify-center text-gray-700 hover:text-[#0A66C2] transition-colors shadow-sm"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a 
                  href={socialLinks.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp Contact"
                  className="w-11 h-11 bg-white border border-gray-200 hover:border-gray-900 rounded-sm flex items-center justify-center text-gray-700 hover:text-[#25D366] transition-colors shadow-sm"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* --- HIGH-RES GRAPHIC RESUME BOARD MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 shadow-2xl z-10 rounded-sm overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Top Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800 font-space-grotesk">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    Yogesh Kumar — Graphic Resume Board
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="/used/Yogesh_Resume.pdf"
                    download
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">PDF Resume</span>
                  </a>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-stone-400 hover:text-white p-1.5 rounded-sm hover:bg-stone-800 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Body with Custom Scrollbar */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-950/60 flex items-center justify-center custom-scrollbar">
                <div className="relative max-w-full shadow-2xl rounded-sm overflow-hidden border border-neutral-800">
                  <img
                    src="/used/creative-resume.png"
                    alt="Full Graphic Resume Scrapboard — Yogesh Kumar"
                    className="w-full h-auto max-h-[75vh] object-contain rounded-sm select-none"
                  />
                </div>
              </div>

              {/* Footer Bar */}
              <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-stone-400 text-[11px] font-space-grotesk">
                <span>Designed & Engineered by Yogesh Kumar</span>
                <span className="text-amber-500 font-bold uppercase">React Native • Next.js • Python</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}