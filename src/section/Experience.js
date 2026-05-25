"use client";
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Import the hooks needed for scroll-linked animations
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  
  {
    role: "Full-Stack Developer",
    company: "Indiefluence, Kurukshetra",
    date: "2025 - Present",
    description: "Working on full-stack web applications with modern frameworks like Next.js, Supabase, and TailwindCSS.",
    tech: ["Html","Css","Javascript","React Js","Bootstrap","Node js","Mongo DB","Next.js", "Supabase", "TailwindCSS"],
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
    tech: ["PHP", "MySQL","Xampp"],
    status: "completed"
  },
  {
    role: "Python with Database Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Worked with Python and MySQL to design database-driven applications.",
    tech: ["Python", "MySQL","Xampp"],
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

// --- MobileExperienceItem Component (Unchanged) ---
const MobileExperienceItem = ({ exp, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="relative">
        {/* Connection line */}
        {!isLast && (
          <div className="absolute left-6 top-full h-12 w-px bg-gradient-to-b from-gray-300 to-transparent"></div>
        )}

        <div className="flex gap-4 sm:gap-6">
          {/* Timeline marker */}
          <div className="flex-shrink-0 relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 border-3 border-black bg-white relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-black">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-sm border-2 border-gray-300 p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6 pb-5 border-b-2 border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
                  {exp.date}
                </span>
                {exp.status === 'current' && (
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                    </span>
                    <span className="text-xs font-bold tracking-[0.15em] uppercase">
                      Active
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                {exp.role}
              </h3>
              <p className="text-base sm:text-lg font-semibold text-gray-600">
                {exp.company}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              {exp.description}
            </p>

            {/* Tech Stack */}
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-3">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-300 -mt-px -mr-px"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


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
  return (
    <>
      {/* Desktop Version (GSAP Overlay Scroll) */}
      <div className="hidden md:block w-full">
        <DesktopGSAPScroll />
      </div>

      {/* Mobile Version (Timeline View - Unchanged) */}
      <div className="md:hidden min-h-screen bg-white relative overflow-hidden">
        {/* Background patterns (Unchanged) */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 60px, #9ca3af 60px, #9ca3af 61px),
                              repeating-linear-gradient(-45deg, transparent, transparent 60px, #9ca3af 60px, #9ca3af 61px)`
          }}></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle, #9ca3af 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
          <div className="absolute -top-64 -right-64 w-[600px] h-[600px] border border-gray-200 rounded-full"></div>
          <div className="absolute -bottom-48 -left-48 w-96 h-96 border border-gray-200 rotate-45"></div>
          <div className="absolute top-1/3 -right-32 w-64 h-64 border border-gray-200"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Header Section (Unchanged) */}
            <AnimatedSection className="mb-20 sm:mb-28 lg:mb-36">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-black"></div>
                  <span className="text-gray-500 text-xs tracking-[0.4em] font-semibold uppercase">
                    Professional Journey
                  </span>
                </div>
                <h1 className="text-gray-900 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter mb-6">
                  Experience
                </h1>
                <p className="text-gray-600 text-lg sm:text-xl max-w-2xl leading-relaxed">
                  A chronicle of growth, learning, and building impactful digital solutions across various technologies and platforms.
                </p>
              </div>
            </AnimatedSection>

            {/* Mobile/Tablet View (Unchanged) */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <MobileExperienceItem
                  key={index}
                  exp={exp}
                  index={index}
                  isLast={index === experiences.length - 1}
                />
              ))}
            </div>

            {/* Footer Section (Unchanged) */}
            <AnimatedSection className="mt-28 sm:mt-36 lg:mt-44 border-t-2 border-gray-200 pt-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">
                    Looking Forward
                  </div>
                  <p className="text-gray-700 text-lg sm:text-xl font-medium max-w-2xl">
                    Continuously evolving, learning new technologies, and creating meaningful digital experiences
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-px bg-gray-300"></div>
                  <span className="text-6xl font-bold text-gray-100 tracking-tighter">
                    {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </>
  );
}