"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Trophy, Star, Award, Shield 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// TECHNICAL VECTOR STENCILS (LIVE ROTATING ANIMATED WATERMARKS - MONOCHROME)
// ==========================================

const SIHVisual = () => (
  <div className="relative w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] flex items-center justify-center select-none pointer-events-none">
    {/* Concentric Circle 1 (Outer - clockwise) */}
    <svg className="absolute w-full h-full animate-[spin_60s_linear_infinite] text-slate-900/10" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="3, 3" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.15" />
    </svg>
    {/* Concentric Circle 2 (Middle - counter-clockwise) */}
    <svg className="absolute w-[85%] h-[85%] animate-[spin_40s_linear_infinite_reverse] text-slate-900/10" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="8, 4" />
      <path d="M 50 6 A 44 44 0 0 1 94 50" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </svg>
    {/* Inner decorative grid */}
    <svg className="absolute w-[65%] h-[65%] text-slate-900/10 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.35" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.35" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.35" />
    </svg>
    {/* Floating Trophy icon in the center */}
    <Trophy className="w-16 h-16 text-slate-900/20 absolute animate-[pulse_4s_ease-in-out_infinite]" />
  </div>
);

const KavachVisual = () => (
  <div className="relative w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] flex items-center justify-center select-none pointer-events-none">
    {/* Cyber scanner grid */}
    <svg className="absolute w-full h-full animate-[spin_80s_linear_infinite] text-slate-900/10" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.35" />
      <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1, 2" />
      <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1, 2" />
    </svg>
    {/* Radar sweep */}
    <svg className="absolute w-[88%] h-[88%] animate-[spin_12s_linear_infinite] text-slate-900/10" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="12, 8" />
      <polygon points="50,50 94,50 81,21" fill="currentColor" opacity="0.04" />
    </svg>
    {/* Shield in center */}
    <Shield className="w-16 h-16 text-slate-900/20 absolute animate-[pulse_5s_ease-in-out_infinite]" />
  </div>
);

const JaipurVisual = () => (
  <div className="relative w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] flex items-center justify-center select-none pointer-events-none">
    {/* Rotating star track */}
    <svg className="absolute w-full h-full animate-[spin_55s_linear_infinite] text-slate-900/10" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="2, 6" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.15" />
    </svg>
    {/* Geometric Laurel shape */}
    <svg className="absolute w-[82%] h-[82%] animate-[spin_35s_linear_infinite_reverse] text-slate-900/10" viewBox="0 0 100 100">
      <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="currentColor" strokeWidth="0.35" />
      <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="4, 4" />
    </svg>
    {/* Award Icon in center */}
    <Award className="w-16 h-16 text-slate-900/20 absolute animate-[pulse_6s_ease-in-out_infinite]" />
  </div>
);

const ConvenerVisual = () => (
  <div className="relative w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] flex items-center justify-center select-none pointer-events-none">
    {/* Celestial orbit */}
    <svg className="absolute w-full h-full animate-[spin_75s_linear_infinite] text-slate-900/10" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.35" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      <circle cx="80" cy="80" r="2.5" fill="currentColor" />
      <circle cx="85" cy="30" r="1.0" fill="currentColor" />
    </svg>
    {/* Interconnected constellations */}
    <svg className="absolute w-[85%] h-[85%] animate-[spin_45s_linear_infinite_reverse] text-slate-900/10" viewBox="0 0 100 100">
      <polygon points="50,15 80,45 65,80 35,80 20,45" fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="3, 3" />
      <line x1="50" y1="15" x2="65" y2="80" stroke="currentColor" strokeWidth="0.15" />
      <line x1="20" y1="45" x2="80" y2="45" stroke="currentColor" strokeWidth="0.15" />
    </svg>
    {/* Star Icon in center */}
    <Star className="w-16 h-16 text-slate-900/20 absolute animate-[pulse_4s_ease-in-out_infinite]" />
  </div>
);

const achievements = [
  {
    title: "Smart India Hackathon",
    subtitle: "National Level Innovation & Strategy",
    description: "Participated in the national level Smart India Hackathon, showcasing innovative solutions for real-world problems.",
    highlight: true,
    category: "Competition",
    year: "2024",
    icon: Trophy,
    visual: SIHVisual,
    metrics: [
      { value: "06", label: "TEAM SQUAD", desc: "Collaborated as a high-performance engineering unit." },
      { value: "1st", label: "STAGE REACHED", desc: "Represented in the national final sector rounds." },
      { value: "100%", label: "MVP SCALING", desc: "Engineered fully functional smart tech prototypes." }
    ],
    accent: "text-slate-800 bg-slate-50 border-slate-200"
  },
  {
    title: "KAVACH Hackathon",
    subtitle: "Cybersecurity Shield & Threat Defense",
    description: "Represented my college team in KAVACH Hackathon, focusing on advanced cybersecurity solutions, network threat defense, and automated intelligence analysis.",
    highlight: false,
    category: "Competition",
    year: "2023",
    icon: Shield,
    visual: KavachVisual,
    metrics: [
      { value: "01", label: "CYBER CORE", desc: "Led frontend framework design & interface." },
      { value: "NODE", label: "SECURE LAYER", desc: "Built decentralized traffic routing firewall." },
      { value: "TOP", label: "NATIONAL TIER", desc: "Competed among elite technical institutes." }
    ],
    accent: "text-zinc-800 bg-zinc-50 border-zinc-200"
  },
  {
    title: "Jaipur Hackathon",
    subtitle: "Award for Excellence in Rapid Prototyping",
    description: "Secured Runner-up position at Jaipur Hackathon with innovative web application solutions, engineering an MVP from scratch in 36 hours.",
    highlight: true,
    category: "Award",
    year: "2023",
    icon: Award,
    visual: JaipurVisual,
    metrics: [
      { value: "02", label: "RANK AWARDED", desc: "Secured the prestigious 1st Runner Up award." },
      { value: "36h", label: "RAPID CYCLE", desc: "Designed, coded and deployed production ready MVP." },
      { value: "GOLD", label: "SECTOR MEDAL", desc: "Recognized for excellence in UI/UX and performance." }
    ],
    accent: "text-neutral-800 bg-neutral-50 border-neutral-200"
  },
  {
    title: "College Club Convener",
    subtitle: "Leadership, Community & Event Scaling",
    description: "Organized and managed multiple national-level technical & cultural events, leading collaborative teams of 50+ members.",
    highlight: false,
    category: "Leadership",
    year: "2022",
    icon: Star,
    visual: ConvenerVisual,
    metrics: [
      { value: "50+", label: "TEAM LEADERSHIP", desc: "Managed active executive members and squads." },
      { value: "10+", label: "CONDUCTED EVENTS", desc: "Curated open source, tech, and web dev seminars." },
      { value: "2.5K", label: "COMMUNITY REACH", desc: "Impacted students through workshops & hackathons." }
    ],
    accent: "text-gray-800 bg-gray-50 border-gray-200"
  },
];

const categories = ["All", "Competition", "Award", "Leadership"];

// ==========================================
// DESKTOP SLIDE: WITH 3-LAYER CURSOR PARALLAX
// ==========================================
const DesktopSlide = ({ ach, idx, isLast }) => {
  const VisualComponent = ach.visual;
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = (clientX / width - 0.5) * 35; // Shifting factor
    const y = (clientY / height - 0.5) * 35;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`h-full flex items-center justify-between pl-24 pr-16 relative flex-shrink-0 achievement-slide overflow-hidden`}
      style={{ width: isLast ? "100vw" : "95vw" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Layer 1: Ambient background glowing orb (shifts opposite to cursor) */}
      <div 
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-slate-300/4 to-transparent blur-[90px] pointer-events-none select-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-coords.x * 1.5}px, ${-coords.y * 1.5}px, 0)`,
          left: '30%',
          top: '10%'
        }}
      />

      {/* Left Column: Typographic Details */}
      <div className="w-[42%] flex flex-col justify-center relative">
        {/* Layer 2: Giant Counter Watermark shifting gently with cursor */}
        <div 
          className="text-[12rem] font-black text-gray-900/5 font-space-grotesk tracking-tighter leading-none select-none absolute -left-12 -top-24 pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${coords.x * 0.4}px, ${coords.y * 0.4}px, 0)`
          }}
        >
          {String(idx + 1).padStart(2, '0')}
        </div>

        {/* Content Wrapper (Fully Visible by Default) */}
        <div className="relative z-10">
          {/* Metadata tag */}
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <span className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-[0.15em] rounded-full ${ach.accent}`}>
              {ach.category}
            </span>
            <span className="text-gray-400 text-sm font-medium">{ach.year}</span>
          </div>

          {/* Premium Font Contrast Heading */}
          <h1 className="text-gray-900 font-extrabold text-5xl xl:text-6xl tracking-tight leading-[1.05] font-montserrat relative z-10">
            {ach.title}
          </h1>
          
          {/* Subtitle in Cormorant Garamond */}
          <p className="text-2xl font-light text-gray-500 font-cormorant italic tracking-wide mt-3 mb-6 relative z-10 leading-normal">
            {ach.subtitle}
          </p>

          {/* Solid monochrome indicator block */}
          <div className="w-16 h-[2px] bg-black mb-8 relative z-10"></div>

          {/* Description */}
          <p className="text-gray-600 text-lg font-light leading-relaxed max-w-lg font-inter relative z-10">
            {ach.description}
          </p>
        </div>
      </div>

      {/* Right Column: Premium Open Blueprint Grid Layout */}
      <div className="w-[53%] flex flex-col justify-center pl-16 pr-8 relative h-[70%]">
        
        {/* Asymmetric Drafting blueprint grid lines */}
        <div className="absolute inset-y-0 left-16 right-8 select-none pointer-events-none opacity-[0.03] border-l border-r border-gray-900">
          <div className="absolute top-1/3 left-0 right-0 border-b border-gray-900"></div>
          <div className="absolute top-2/3 left-0 right-0 border-b border-gray-900"></div>
        </div>

        {/* Layer 3: Giant Live Rotating Stencil (Shifts with cursor parallax) */}
        <div 
          className="absolute right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${coords.x * 0.8}px, ${coords.y * 0.8}px, 0)`
          }}
        >
          {VisualComponent && <VisualComponent />}
        </div>

        {/* Asymmetrical metrics container */}
        <div className="relative z-10 grid grid-cols-2 gap-x-12 gap-y-12 w-full pl-6">
          {ach.metrics.map((metric, mIdx) => (
            <div 
              key={mIdx} 
              className="flex flex-col group transition-all duration-300 relative pl-4"
            >
              {/* Massive Typographic value */}
              <div className="text-6xl xl:text-7xl font-light text-gray-900 tracking-tighter font-space-grotesk leading-none transition-all duration-300 group-hover:text-black group-hover:translate-x-1.5 inline-block">
                {metric.value}
              </div>
              
              {/* Spaced label */}
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em] mt-3.5 mb-1.5 transition-colors duration-300">
                {metric.label}
              </span>

              {/* Light detailed explanation */}
              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-[190px] font-inter">
                {metric.desc}
              </p>

              {/* Active indicator bar */}
              <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-black scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Peeking Hint line separator */}
      {!isLast && (
        <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gray-900/5"></div>
      )}
    </div>
  );
};

// ==========================================
// DESKTOP MAIN CONTAINER
// ==========================================
function DesktopAchievementsHorizontal() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const tabs = [
    { id: 0, label: "01 · Hackathon", fullLabel: "Smart India Hackathon" },
    { id: 1, label: "02 · Kavach", fullLabel: "KAVACH Hackathon" },
    { id: 2, label: "03 · Jaipur", fullLabel: "Jaipur Hackathon" },
    { id: 3, label: "04 · Convener", fullLabel: "Club Convener" },
  ];

  useLayoutEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    // A. Master horizontal scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate current active slide index smoothly
          const newIndex = Math.min(3, Math.floor(progress * 4));
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }
        }
      }
    });

    scrollTriggerInstanceRef.current = tl.scrollTrigger;

    // 1. Translate horizontal track
    tl.to(trackRef.current, {
      x: () => -(trackRef.current.scrollWidth - window.innerWidth),
      ease: "none",
    });

    // 2. Smoothly transition elegant off-white backgrounds between slides (no warm orange/blue)
    tl.to(containerRef.current, {
      backgroundColor: "#f8fafc", // Slide 2 background: cool off-white
      duration: 0.33,
      ease: "power1.inOut"
    }, 0.1)
    .to(containerRef.current, {
      backgroundColor: "#f5f5f5", // Slide 3 background: clean gray
      duration: 0.33,
      ease: "power1.inOut"
    }, 0.43)
    .to(containerRef.current, {
      backgroundColor: "#fafaf9", // Slide 4 background: soft stone-50
      duration: 0.33,
      ease: "power1.inOut"
    }, 0.76);

    return () => {
      if (scrollTriggerInstanceRef.current) {
        scrollTriggerInstanceRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  const scrollToSlide = (idx) => {
    if (!scrollTriggerInstanceRef.current) return;
    const start = scrollTriggerInstanceRef.current.start;
    const end = scrollTriggerInstanceRef.current.end;
    const totalDistance = end - start;
    const targetScroll = start + (idx / 3) * totalDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden select-none bg-white transition-colors duration-500"
    >
      {/* Dynamic Header Section */}
      <div className="absolute top-0 left-0 w-full z-30 pt-8 px-16 flex items-center justify-between border-b border-gray-900/5 bg-transparent">
        <div className="flex items-center gap-6">
          <span className="text-gray-900 text-[10px] tracking-[0.4em] font-bold uppercase">
            RECOGNITION
          </span>
          <div className="h-4 w-px bg-gray-300"></div>
          <h2 className="text-gray-900 font-medium text-lg tracking-tight">
            ACHIEVEMENTS
          </h2>
        </div>

        {/* Floating Top Navigation Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSlide(idx)}
                className={`relative py-2.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${
                  isActive ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktopActiveTabDot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Slides Track */}
      <div 
        ref={trackRef} 
        className="flex h-full items-center flex-row"
        style={{ width: "fit-content" }}
      >
        {achievements.map((ach, idx) => (
          <DesktopSlide 
            key={idx}
            ach={ach}
            idx={idx}
            isLast={idx === achievements.length - 1}
          />
        ))}
      </div>

      {/* Floating Bottom Navigation Progress elements */}
      <div className="absolute bottom-0 left-0 w-full z-30 pb-8 px-16 flex items-center justify-between border-t border-gray-900/5 bg-transparent">
        {/* Scroll Cue Instruction */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
          </span>
          <span className="text-[10px] text-gray-400 font-bold tracking-[0.25em] uppercase animate-pulse">
            CONTINUE SCROLLING — SLIDES TRAVEL SIDEWAYS →
          </span>
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-1 text-gray-900">
          <span className="text-2xl font-bold font-space-grotesk">0{activeIndex + 1}</span>
          <span className="text-gray-400 text-xs font-medium">/</span>
          <span className="text-gray-400 text-xs font-medium">04</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MOBILE VERSION: PREMIUM MONOCHROME LIGHT DESIGN
// ==========================================

const VisualLightbox = ({ title, Visual, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal Window */}
        <motion.div
          className="relative bg-white border-2 border-gray-900 p-8 flex flex-col items-center justify-center max-w-[90vw] w-[350px] shadow-2xl z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black text-white hover:bg-gray-800 flex items-center justify-center font-bold text-sm transition-colors duration-200 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Heading */}
          <div className="text-center mb-6">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] font-space-grotesk">Live Blueprint Visual</span>
            <h4 className="text-xl font-bold text-gray-900 tracking-tight mt-1 font-montserrat">{title}</h4>
          </div>

          {/* Animated SVG Container */}
          <div className="w-[200px] h-[200px] flex items-center justify-center border border-gray-150 bg-white p-4 relative overflow-hidden">
            {/* Soft grid background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            {/* The actual live rotating component scaled for modal */}
            <div style={{ transform: 'scale(0.65)' }}>
              <Visual />
            </div>
          </div>

          <p className="text-[10px] text-gray-400 text-center font-inter mt-6 tracking-wide leading-relaxed">
            TAP OUTSIDE OR CLICK CROSS TO RETURN
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

function MobileAchievementsList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVisualModal, setActiveVisualModal] = useState(null); // { title, Visual }

  const filteredAchievements = activeCategory === "All"
    ? achievements
    : achievements.filter(ach => ach.category === activeCategory);

  return (
    <div className="bg-white relative overflow-hidden border-t border-gray-200/50">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Subtle neutral glow overlays (no strong colors) */}
      <div
        className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(0,0,0,0.02) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute top-[40%] -left-20 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.015) 0%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 px-5 pt-16 pb-20 max-w-lg mx-auto">

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-black" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500 font-space-grotesk">
              RECOGNITION
            </span>
          </div>

          {/* Big headline — Montserrat like desktop */}
          <h2
            className="font-montserrat font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-3"
            style={{ fontSize: 'clamp(2.5rem, 12vw, 3.8rem)' }}
          >
            ACHIEVE<br />MENTS
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-inter">
            Key professional highlights, national hackathons, and leadership milestones built on dedication.
          </p>
        </div>

        {/* ── Category filter tabs ────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100 border border-gray-200/60 bg-white/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 rounded-full bg-black"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* ── Achievement cards ───────────────────────────────────── */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((ach) => {
              const IconComponent = ach.icon;
              const VisualComponent = ach.visual;
              const globalIdx = achievements.indexOf(ach);

              return (
                <motion.div
                  key={ach.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group"
                >
                  <div 
                    className="bg-white border-2 transition-all duration-300 relative overflow-hidden group-hover:border-gray-900 group-hover:shadow-lg"
                    style={{
                      borderColor: ach.highlight ? 'rgba(0,0,0,0.2)' : 'rgba(229,231,235,0.9)'
                    }}
                  >
                    {/* Highlight corner diamond — same as experience */}
                    {ach.highlight && (
                      <div className="absolute -top-3.5 -right-3.5 w-7 h-7 bg-black rotate-45 z-10" />
                    )}

                    {/* ── Top bar: category + year + icon ─────────── */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="w-4 h-4 text-gray-800" />}
                        <span className={`px-2.5 py-0.5 border text-[9px] font-bold uppercase tracking-[0.15em] rounded-full ${ach.accent}`}>
                          {ach.category}
                        </span>
                      </div>
                      <span className="text-gray-400 text-xs font-semibold tracking-wider font-space-grotesk">{ach.year}</span>
                    </div>

                    {/* ── Main content ─────────────────────────────── */}
                    <div className="px-5 pt-5 pb-0 relative">

                      {/* Ghost index watermark — like desktop */}
                      <span
                        className="absolute top-1 right-4 font-black text-gray-900 select-none pointer-events-none font-space-grotesk opacity-[0.03]"
                        style={{ fontSize: 'clamp(3.8rem, 16vw, 6rem)', lineHeight: 1 }}
                      >
                        {String(globalIdx + 1).padStart(2, '0')}
                      </span>

                      {/* Title — Montserrat extrabold like desktop */}
                      <h3
                        className="font-montserrat font-extrabold text-gray-900 tracking-tight leading-tight mb-1 pr-12"
                        style={{ fontSize: 'clamp(1.25rem, 5.2vw, 1.6rem)' }}
                      >
                        {ach.title}
                      </h3>

                      {/* Subtitle — Cormorant italic like desktop */}
                      <p className="font-cormorant italic text-gray-500 text-[17px] leading-snug mb-3">
                        {ach.subtitle}
                      </p>

                      {/* Accent separator bar */}
                      <div className="w-12 h-[2px] bg-black/80 mb-4" />

                      {/* Description */}
                      <p className="text-gray-600 text-[13px] leading-relaxed font-inter mb-6">
                        {ach.description}
                      </p>
                    </div>

                    {/* ── Metrics row — the big numbers from desktop ─ */}
                    <div className="grid grid-cols-3 border-t border-gray-100 bg-[#FAF9F6]/40">
                      {ach.metrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className={`px-3 py-3.5 relative group/metric ${mIdx < 2 ? 'border-r border-gray-100' : ''}`}
                        >
                          {/* Active indicator bar (bottom) */}
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black scale-y-0 origin-bottom transition-transform duration-300 group-hover/metric:scale-y-100" />

                          {/* Big number */}
                          <div
                            className="font-space-grotesk font-light text-gray-900 tracking-tighter leading-none mb-1 group-hover/metric:text-black transition-colors duration-200"
                            style={{ fontSize: 'clamp(1.4rem, 6.5vw, 1.95rem)' }}
                          >
                            {metric.value}
                          </div>
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em] block mb-0.5">
                            {metric.label}
                          </span>
                          <p className="text-gray-400 text-[9px] font-inter leading-tight hidden sm:block">
                            {metric.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* ── Animated SVG visual strip at the bottom ─── */}
                    <div className="flex justify-end px-5 py-3 border-t border-gray-100 overflow-hidden h-14 items-center bg-[#FAFBFD]/30">
                      <div style={{ transform: 'scale(0.24)', transformOrigin: 'right center' }}>
                        {VisualComponent && <VisualComponent />}
                      </div>
                    </div>

                    {/* Decorative corners — same as desktop */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-200 pointer-events-none group-hover:border-gray-900 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-200 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Stats row ──────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 mt-10">
          {[
            { value: '04', label: 'Total' },
            { value: '02', label: 'Featured' },
            { value: '03', label: 'Categories' },
          ].map((stat) => (
            <div 
              key={stat.label} 
              className="group bg-white border-2 border-gray-200/80 p-4 text-center relative overflow-hidden transition-all duration-300 hover:border-gray-900"
            >
              <div
                className="font-space-grotesk font-light text-gray-900 tracking-tighter leading-none mb-1 group-hover:scale-105 transition-transform duration-200"
                style={{ fontSize: 'clamp(1.6rem, 8vw, 2.3rem)' }}
              >
                {stat.value}
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-gray-400 font-bold">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-500 font-space-grotesk">
              CONTINUOUS GROWTH
            </span>
          </div>
          <p className="text-gray-500 text-[13px] font-inter leading-relaxed">
            Each achievement represents an inflection point in my engineering journey — pushing bounds in core architecture, scalable systems, and rapid web prototyping.
          </p>
        </div>

      </div>

      {/* Blueprint Lightbox Modal overlay */}
      {activeVisualModal && (
        <VisualLightbox
          title={activeVisualModal.title}
          Visual={activeVisualModal.Visual}
          onClose={() => setActiveVisualModal(null)}
        />
      )}
    </div>
  );
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function Achievements() {
  return (
    <>
      {/* Desktop Version (GSAP Horizontal Scroll Slider) */}
      <div className="hidden lg:block w-full">
        <DesktopAchievementsHorizontal />
      </div>

      {/* Mobile Version (Premium Light Grid Layout) */}
      <div className="lg:hidden w-full">
        <MobileAchievementsList />
      </div>
    </>
  );
}