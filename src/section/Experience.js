"use client";
import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Import the hooks needed for scroll-linked animations
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Indiefluence, Kurukshetra",
    date: "2025 – Present",
    description: "Architecting and shipping production-grade web products end-to-end — from pixel-perfect interfaces to scalable APIs. Every feature I build solves a real user problem and ships with intention.",
    highlights: [
      "Designed and launched client-facing platforms with complex real-time workflows",
      "Owned the full product cycle — ideation, development, deployment, and iteration",
      "Introduced design systems that brought consistency and speed to the team",
    ],
    status: "current"
  },
  {
    role: "Full-Stack Intern",
    company: "Hopping Minds, Mohali",
    date: "Jul 2023 – Aug 2023",
    description: "My first step into real-world software development. Learned what it truly means to write code that ships — readable, maintainable, and built for scale.",
    highlights: [
      "Understood how professional teams collaborate and deliver under deadlines",
      "Learned component-driven architecture and clean separation of concerns",
      "Built and consumed REST APIs in a live production environment",
    ],
    status: "completed"
  },
  {
    role: "Multi-Domain Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 – Oct 2021",
    description: "An intensive multi-discipline bootcamp that forged my foundation. Simultaneously trained across web, backend, and data — learning by building, not just reading.",
    subtasks: [
      {
        label: "Web Development",
        description: "Crafted responsive, accessible websites from scratch — learning the art of translating design into living, breathing interfaces."
      },
      {
        label: "PHP & Backend",
        description: "Built server-driven modules and dynamic pages — understanding how the web truly works beneath the surface."
      },
      {
        label: "Python & Databases",
        description: "Wrote data-driven Python apps and learned SQL from first principles — turning raw data into meaningful output."
      }
    ],
    status: "completed"
  },
];

// --- AnimatedSection Component (Unchanged) ---
const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

// --- NEW SCROLL-LINKED DesktopExperienceItem ---
const DesktopExperienceItem = ({ exp, index, isLast }) => {
  
  // 1. Create a ref for the component
  const ref = useRef(null);
  
  // 2. Track scroll progress as the ref passes through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    // Animation starts when 'start' of element hits 'end' of viewport
    // Animation ends when 'center' of element hits 'center' of viewport
    offset: ["start end", "center center"],
  });

  // 3. Create transforms based on that progress (0 to 1)
  
  // Animate line height from 0% to 100%
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Animate card opacity from 0 to 1
  const cardOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  
  // Animate card X position from -50px to 0px
  const cardX = useTransform(scrollYProgress, [0.3, 0.8], [-50, 0]);

  return (
    // 4. Attach the ref to the main motion.div
    <motion.div
      ref={ref}
      className="relative group"
    >
      {/* Connection line */}
      {!isLast && (
        <div className="absolute left-0 top-full h-32 w-px bg-gray-300 ml-8 -z-10">
          {/* 5. Apply the dynamic height to an inner motion.div */}
          <motion.div 
            className="w-full bg-black"
            style={{ height: lineHeight }}
          />
        </div>
      )}

      <div className="flex items-start gap-8">
        {/* Timeline marker */}
        <motion.div 
          className="flex-shrink-0 relative pt-2"
          // Marker will scale in based on scroll
          style={{ 
            opacity: scrollYProgress,
            scale: scrollYProgress 
          }}
        >
          <div className="w-16 h-16 border-4 border-black bg-white relative transition-all duration-300 group-hover:scale-110">
            <div className="absolute inset-0 bg-black transform scale-0 transition-transform duration-300 group-hover:scale-100"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-black group-hover:text-white relative z-10 transition-colors duration-300">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {/* 6. Apply the dynamic opacity and x to the card container */}
        <motion.div 
          className="flex-1"
          style={{ 
            opacity: cardOpacity,
            x: cardX 
          }}
        >
          <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 p-10 transition-all duration-300 group-hover:border-gray-900 group-hover:-translate-y-2 group-hover:shadow-2xl">
            {/* Header (Unchanged) */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-200">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                    {exp.date}
                  </span>
                  {exp.status === 'current' && (
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                      </span>
                      <span className="text-xs font-bold tracking-[0.2em] uppercase">
                        Active Role
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                  {exp.role}
                </h3>
                <p className="text-lg font-semibold text-gray-600 tracking-wide">
                  {exp.company}
                </p>
              </div>
            </div>

            {/* Description (Unchanged) */}
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {exp.description}
            </p>

            {/* Tech Stack (Unchanged) */}
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
                Technologies
              </div>
              <div className="flex flex-wrap gap-3">
                {exp.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full transition-all duration-200 hover:bg-gray-200 hover:-translate-y-px"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative corner (Unchanged) */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gray-300 -mt-px -mr-px"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gray-300 -mb-px -ml-px"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};


// ── Image Lightbox ─────────────────────────────────────────────────────────
const ImageLightbox = ({ src, alt, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    onClick={onClose}
  >
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

    {/* Image */}
    <motion.div
      className="relative z-10 max-w-[92vw] max-h-[85vh]"
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={e => e.stopPropagation()}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain rounded-sm shadow-2xl"
        style={{ maxHeight: '85vh' }}
      />
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-sm shadow-lg"
        aria-label="Close image"
      >
        ✕
      </button>
    </motion.div>
  </motion.div>
);

// ── Mobile Experience Item ─────────────────────────────────────────────────
const MobileExperienceItem = ({ exp, index, isLast, imageSrc, onImageClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedSubtask, setExpandedSubtask] = useState(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.05 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative"
    >
      {/* Vertical connector */}
      {!isLast && (
        <div className="absolute left-5 top-full h-10 w-px bg-gradient-to-b from-gray-400 to-transparent z-10" />
      )}

      <div className="bg-white border-2 border-gray-200 relative overflow-hidden">

        {/* ── Clickable image strip ─────────────────────────────── */}
        {imageSrc && (
          <motion.button
            className="w-full overflow-hidden block relative cursor-zoom-in"
            style={{ height: '150px' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 + 0.05 * index }}
            onClick={() => onImageClick(imageSrc, exp.company)}
            aria-label={`View ${exp.company} image`}
          >
            <motion.img
              src={imageSrc}
              alt={exp.company}
              className="w-full h-full object-cover"
              initial={{ scale: 1.08 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Dark overlay + zoom hint */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <span className="text-white text-xs font-bold tracking-[0.2em] uppercase bg-black/60 px-3 py-1.5">
                Tap to Expand
              </span>
            </div>
          </motion.button>
        )}

        {/* ── Card body ─────────────────────────────────────────── */}
        <div className="p-5 sm:p-7 relative">

          {/* Ghost index */}
          <span
            className="absolute top-3 right-4 font-black text-gray-100 select-none pointer-events-none"
            style={{ fontSize: 'clamp(3rem, 14vw, 5rem)', lineHeight: 1 }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Date + Active badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400">
              {exp.date}
            </span>
            {exp.status === 'current' && (
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Active</span>
              </div>
            )}
          </div>

          {/* Role */}
          <h3
            className="font-black text-gray-900 tracking-tighter leading-none mb-1"
            style={{ fontSize: 'clamp(1.35rem, 5.5vw, 1.9rem)' }}
          >
            {exp.role}
          </h3>

          {/* Company */}
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4">
            {exp.company}
          </p>

          <div className="w-full h-px bg-gray-100 mb-4" />

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            {exp.description}
          </p>

          {/* Highlights (bullet points) */}
          {exp.highlights && (
            <ul className="space-y-2 mb-2">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                  <span className="text-gray-500 text-xs leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Subtasks Accordion (for Achievers Technologies) */}
          {exp.subtasks && (
            <div className="space-y-2 mt-2">
              {exp.subtasks.map((sub, i) => {
                const isExpanded = expandedSubtask === i;
                return (
                  <div 
                    key={i} 
                    className="border border-gray-150 bg-gray-50/30 hover:bg-gray-50/70 transition-all duration-300 relative overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedSubtask(isExpanded ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer focus:outline-none"
                    >
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-900 font-space-grotesk">
                        {sub.label}
                      </span>
                      {/* Interactive toggle indicator */}
                      <span className="text-xs font-bold text-gray-400 transition-transform duration-300">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3.5 pt-0.5 border-t border-gray-100 bg-white">
                            <p className="text-gray-500 text-xs leading-relaxed font-inter">
                              {sub.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gray-300 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gray-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

// Map experiences to images (now 3 entries after merging Achievers)
const mobileImages = [
  '/used/experience-desktop-3.webp',   // Indiefluence
  '/used/experience-desktop-1.webp',   // Hopping Minds
  '/used/experience-desktop-2.webp',   // Achievers Technologies
];


const DesktopGSAPScroll = () => {
  const containerRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);

  // Refs for the central image wrappers and images to animate the split & scale
  const imgWrapper1Ref = useRef(null);
  const imgWrapper2Ref = useRef(null);
  const imgWrapper3Ref = useRef(null);

  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=900%", // Cinematic slow-paced scroll depth for elegant split and zoom scrubbing
        pin: true,
        scrub: true,
        anticipatePin: 1,
      }
    });

    // --- Slide 1: EXPERIENCE ---
    // 1. First, split the word "EXPERIENCE" by expanding the center image wrapper width from 0 to 24vw
    tl.fromTo(imgWrapper1Ref.current,
      { width: "0vw", opacity: 0 },
      { width: "24vw", opacity: 1, duration: 1.0, ease: "power2.inOut" }
    );
    // At the same time, scale up and fade in the inner image to fit the container nicely
    tl.fromTo(img1Ref.current,
      { scale: 0.3 },
      { scale: 1, duration: 1.0, ease: "power2.inOut" },
      "<"
    );
    // At the exact same time, smoothly transition the background color of Slide 1 based on the image theme
    tl.to(slide1Ref.current,
      { backgroundColor: "#FAF5EC", duration: 1.0, ease: "power2.inOut" },
      "<"
    );
    // 2. Once the image is perfectly centered at its natural size, perform the dramatic telescope zoom
    tl.fromTo("#zoom-container-1", 
      { scale: 1 }, 
      { scale: 5.2, ease: "power2.inOut", duration: 1.5 }
    );
    // 3. Fade out Slide 1 to transition to Slide 2
    tl.to(slide1Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 0.5,
      ease: "power1.in"
    });

    // --- Slide 2: HOPPING MINDS ---
    // 1. Fade in Slide 2
    tl.fromTo(slide2Ref.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power1.out" },
      "-=0.5"
    );
    // 2. Split "HOPPING MINDS" by expanding the center image wrapper
    tl.fromTo(imgWrapper2Ref.current,
      { width: "0vw", opacity: 0 },
      { width: "24vw", opacity: 1, duration: 1.0, ease: "power2.inOut" }
    );
    tl.fromTo(img2Ref.current,
      { scale: 0.3 },
      { scale: 1, duration: 1.0, ease: "power2.inOut" },
      "<"
    );
    // At the exact same time, smoothly transition the background color of Slide 2 based on the image theme
    tl.to(slide2Ref.current,
      { backgroundColor: "#EAF5EE", duration: 1.0, ease: "power2.inOut" },
      "<"
    );
    // 3. Perform the telescope zoom for Slide 2
    tl.fromTo("#zoom-container-2",
      { scale: 1 },
      { scale: 5.2, ease: "power2.inOut", duration: 1.5 }
    );
    // 4. Fade out Slide 2
    tl.to(slide2Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 0.5,
      ease: "power1.in"
    });

    // --- Slide 3: INDIEFLUENCE ---
    // 1. Fade in Slide 3
    tl.fromTo(slide3Ref.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power1.out" },
      "-=0.5"
    );
    // 2. Split "INDIEFLUENCE" by expanding the center image wrapper
    tl.fromTo(imgWrapper3Ref.current,
      { width: "0vw", opacity: 0 },
      { width: "24vw", opacity: 1, duration: 1.0, ease: "power2.inOut" }
    );
    tl.fromTo(img3Ref.current,
      { scale: 0.3 },
      { scale: 1, duration: 1.0, ease: "power2.inOut" },
      "<"
    );
    // At the exact same time, smoothly transition the background color of Slide 3 based on the image theme
    tl.to(slide3Ref.current,
      { backgroundColor: "#EBF3FC", duration: 1.0, ease: "power2.inOut" },
      "<"
    );
    // 3. Perform the telescope zoom for Slide 3
    tl.fromTo("#zoom-container-3",
      { scale: 1 },
      { scale: 5.2, ease: "power2.inOut", duration: 1.5 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden select-none">
      
      {/* Slide 1: EXPERIENCE */}
      <div 
        ref={slide1Ref} 
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-white"
        style={{ zIndex: 30 }}
      >
        <div 
          id="zoom-container-1" 
          className="relative w-full h-full flex items-center justify-center transform-gpu"
        >
          {/* Central text & image split - Starts fully closed with gap-0 */}
          <div className="flex items-center justify-center gap-0 z-20 text-[#0F172A] font-black text-6xl sm:text-7xl md:text-[5vw] tracking-tighter uppercase font-sans">
            <span>EXPER</span>
            <div 
              ref={imgWrapper1Ref} 
              className="relative h-[15vw] opacity-0"  style={{ width: "0vw" }}
            >
              <img 
                ref={img1Ref}
                src="/used/experience-desktop-2.webp" 
                className="w-full h-full object-contain rounded-xl" 
              />
            </div>
            <span>IENCE</span>
          </div>
        </div>
      </div>

      {/* Slide 2: HOPPING MINDS */}
      <div 
        ref={slide2Ref} 
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-white opacity-0"
        style={{ zIndex: 20 }}
      >
        <div 
          id="zoom-container-2" 
          className="relative w-full h-full flex items-center justify-center transform-gpu"
        >
          {/* Central text & image split - Starts fully closed with gap-0 */}
          <div className="flex items-center justify-center gap-0 z-20 text-[#0F172A] font-black text-6xl sm:text-7xl md:text-[5vw] tracking-tighter uppercase font-sans">
            <span>HOPPIN</span>
            <div 
              ref={imgWrapper2Ref} 
              className="relative h-[15vw] overflow-hidden flex-shrink-0 opacity-0"
              style={{ width: "0vw" }}
            >
              <img 
                ref={img2Ref}
                src="/used/experience-desktop-1.webp" 
                className="w-full h-full object-contain rounded-xl" 
              />
            </div>
            <span>GMINDS</span>
          </div>
        </div>
      </div>

      {/* Slide 3: INDIEFLUENCE */}
      <div 
        ref={slide3Ref} 
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-white opacity-0"
        style={{ zIndex: 10 }}
      >
        <div 
          id="zoom-container-3" 
          className="relative w-full h-full flex items-center justify-center transform-gpu"
        >
          {/* Central text & image split - Starts fully closed with gap-0 */}
          <div className="flex items-center justify-center gap-0 z-20 text-[#0F172A] font-black text-6xl sm:text-7xl md:text-[5vw] tracking-tighter uppercase font-sans">
            <span>INDIEF</span>
            <div 
              ref={imgWrapper3Ref} 
              className="relative h-[15vw]  overflow-hidden flex-shrink-0 opacity-0"
              style={{ width: "0vw" }}
            >
              <img 
                ref={img3Ref}
                src="/used/experience-desktop-3.webp" 
                className="w-full h-full object-contain rounded-xl" 
              />
            </div>
            <span>LUENCE</span>
          </div>
        </div>
      </div>

    </div>
  );
};

// --- Main Component ---
export default function Experience() {
  const [lightbox, setLightbox] = useState(null); // { src, alt }

  return (
    <>
      {/* Desktop Version (GSAP Overlay Scroll) */}
      <div className="hidden lg:block w-full">
        <DesktopGSAPScroll />
      </div>

      {/* ── Mobile Version ──────────────────────────────────────────── */}
      <div className="lg:hidden bg-white relative overflow-hidden">

        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 px-4 sm:px-6 pt-16 pb-20">

          {/* ── Section header ──────────────────────────────────────── */}
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-black" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">
                Professional Journey
              </span>
            </div>
            <h2
              className="font-black text-gray-900 tracking-tighter leading-none mb-4"
              style={{ fontSize: 'clamp(2.8rem, 14vw, 5rem)' }}
            >
              EXPERI<br />ENCE
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A chronicle of growth, learning, and building impactful digital solutions.
            </p>
          </AnimatedSection>

          {/* ── Cards ───────────────────────────────────────────────── */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <MobileExperienceItem
                key={index}
                exp={exp}
                index={index}
                isLast={index === experiences.length - 1}
                imageSrc={mobileImages[index]}
                onImageClick={(src, alt) => setLightbox({ src, alt })}
              />
            ))}
          </div>

          {/* ── Footer ──────────────────────────────────────────────── */}
          <AnimatedSection className="mt-16 pt-8 border-t-2 border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm font-medium max-w-[200px] leading-relaxed">
                Continuously evolving &amp; creating meaningful digital experiences
              </p>
              <span
                className="font-black text-gray-100 tracking-tighter select-none"
                style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', lineHeight: 1 }}
              >
                {new Date().getFullYear()}
              </span>
            </div>
          </AnimatedSection>

        </div>
      </div>

      {/* ── Image Lightbox (portal-style overlay) ───────────────── */}
      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}