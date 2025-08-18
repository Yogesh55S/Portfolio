"use client";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const forms = [
  {
    key: "base",
    role: "Developer",
    image: "/goku_normal_form.png",
    // bg: "/bg_normal.gif",
    glowColor: "rgba(96,165,250,0.8)",
    particleColor: "#60a5fa",
    textColor: "text-blue-400",
    bgOverlay: "bg-gradient-to-br from-blue-900/30 to-purple-900/20",
    energy: 25,
    description: "Building amazing digital experiences"
  },
  {
    key: "ssj",
    role: "Frontend Developer",
    image: "/super_saiyan.png",
    // bg: "/bg_ssj.gif",
    glowColor: "rgba(251,191,36,0.95)",
    particleColor: "#fbbf24",
    textColor: "text-yellow-400",
    bgOverlay: "bg-gradient-to-br from-yellow-900/30 to-orange-900/20",
    energy: 50,
    description: "Crafting beautiful user interfaces"
  },
  {
    key: "ssb",
    role: "Backend Developer",
    image: "/goku_2nd_form.png",
    // bg: "/bg_blue.gif",
    glowColor: "rgba(59,130,246,0.95)",
    particleColor: "#3b82f6",
    textColor: "text-cyan-400",
    bgOverlay: "bg-gradient-to-br from-cyan-900/30 to-blue-900/20",
    energy: 75,
    description: "Powering robust server solutions"
  },
  {
    key: "ui",
    role: "Full-Stack Developer",
    image: "/goku.png",
    // bg: "/bg_ui.gif",
    glowColor: "rgba(226,232,240,1)",
    particleColor: "#e2e8f0",
    textColor: "text-slate-200",
    bgOverlay: "bg-gradient-to-br from-slate-800/30 to-gray-900/20",
    energy: 100,
    description: "Complete end-to-end solutions"
  },
];

// Floating particle component
const Particle = ({ color, delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full opacity-70"
    style={{ backgroundColor: color }}
    animate={{
      x: [0, Math.random() * 200 - 100],
      y: [0, -100 - Math.random() * 200],
      opacity: [0.7, 0],
      scale: [1, 0],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay: delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// Energy bar component
const EnergyBar = ({ energy, color }) => (
  <div className="w-full max-w-xs sm:max-w-md mx-auto mt-4 sm:mt-6">
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs sm:text-sm text-gray-300">Power Level</span>
      <span className="text-xs sm:text-sm text-gray-300">{energy}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${energy}%` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="h-full w-full opacity-60"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`
          }}
        />
      </motion.div>
    </div>
  </div>
);

// Skill orbs component
const SkillOrbs = ({ form }) => {
  const skills = {
    base: ["JavaScript", "HTML", "CSS"],
    ssj: ["React", "Next", "Angular"],
    ssb: ["Node.js", "Python", "Database","Supabase"],
    ui: ["Full-Stack", "Data-Structure", "Architecture"]
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 justify-center">
      {skills[form.key]?.map((skill, index) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6, ease: "backOut" }}
          className="px-2 py-1 sm:px-4 sm:py-2 rounded-full border backdrop-blur-sm text-xs sm:text-sm font-medium"
          style={{
            borderColor: form.particleColor,
            backgroundColor: `${form.particleColor}20`,
            boxShadow: `0 0 15px ${form.particleColor}40`
          }}
        >
          {skill}
        </motion.div>
      ))}
    </div>
  );
};

export default function EnhancedHero() {
  const [idx, setIdx] = useState(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const [particles, setParticles] = useState([]);
  const current = forms[idx];

  // Preload all assets
  useEffect(() => {
    forms.forEach((f) => {
      const img = new window.Image();
      img.src = f.image;
      if (f.bg) {
        const bg = new window.Image();
        bg.src = f.bg;
      }
    });
  }, []);

  // Generate particles on transformation
  const generateParticles = useCallback(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Math.random(),
      delay: i * 0.1,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 5000);
  }, []);

  // Transform function with enhanced effects (REMOVED AUTO-CYCLE)
  const transform = useCallback(() => {
    if (isTransforming) return;
    
    setIsTransforming(true);
    generateParticles();
    
    setTimeout(() => {
      setIdx((i) => (i + 1) % forms.length);
      setIsTransforming(false);
    }, 300);
  }, [isTransforming, generateParticles]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        transform();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [transform]);

  // REMOVED AUTO-CYCLE INTERVAL

  // Animation variants
  const fadeVariants = {
    initial: { opacity: 0 },
    enter: { 
      opacity: 1, 
      transition: { duration: 1, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.5, ease: "easeIn" } 
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(10px)" },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.1
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(6px)",
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8, rotateY: 45 },
    enter: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        ease: "backOut",
        type: "spring",
        stiffness: 100
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      rotateY: -45,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 sm:px-6 lg:px-8">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.bg}
            variants={fadeVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute inset-0"
            style={{
              backgroundImage: current.bg ? `url(${current.bg})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7) saturate(1.2) contrast(1.1)",
            }}
          />
        </AnimatePresence>
        
        {/* Dynamic overlay */}
        <motion.div 
          key={`overlay-${current.key}`}
          className={`absolute inset-0 ${current.bgOverlay}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Animated grid overlay */}
        <motion.div
          className="absolute inset-0 opacity-5 sm:opacity-10"
          style={{
            backgroundImage: `linear-gradient(${current.particleColor} 1px, transparent 1px), linear-gradient(90deg, ${current.particleColor} 1px, transparent 1px)`,
            backgroundSize: "30px 30px sm:50px 50px",
          }}
          animate={{
            backgroundPosition: ["0 0", "30px 30px", "0 0"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Particle color={current.particleColor} delay={particle.delay} />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-8 sm:gap-12 lg:flex-row">
        
        {/* Left: Enhanced Text Section */}
        <div className="max-w-full lg:max-w-2xl text-center lg:text-left flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current.key}`}
              variants={textVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="space-y-4 sm:space-y-6"
            >
              <motion.div variants={textVariants}>
               
                <motion.h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                  <span className="text-white drop-shadow-2xl">Hi, I'm</span>
                  <br />
                  <span 
                    className={`${current.textColor} drop-shadow-2xl`}
                    style={{
                      textShadow: `0 0 20px ${current.particleColor}, 0 0 40px ${current.particleColor}40`
                    }}
                  >
                    Yogesh
                  </span>
                </motion.h1>
              </motion.div>

              <motion.div variants={textVariants}>
                <motion.p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-200 mb-2">
                  {current.role}
                </motion.p>
                <motion.p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-md mx-auto lg:mx-0">
                  {current.description}
                </motion.p>
              </motion.div>

              <motion.div variants={textVariants}>
                <EnergyBar energy={current.energy} color={current.particleColor} />
              </motion.div>

              <motion.div variants={textVariants}>
                <SkillOrbs form={current} />
              </motion.div>

              <motion.div 
                variants={textVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8"
              >
                <motion.a
                  href="#projects"
                  className="group relative overflow-hidden rounded-xl px-6 py-3 sm:px-8 sm:py-4 font-bold text-black transition-all duration-300 text-sm sm:text-base"
                  style={{ backgroundColor: current.particleColor }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative">View Projects</span>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="group rounded-xl border-2 px-6 py-3 sm:px-8 sm:py-4 font-bold text-white transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                  style={{ 
                    borderColor: current.particleColor,
                    backgroundColor: `${current.particleColor}10`
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    backgroundColor: current.particleColor,
                    color: "#000"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Enhanced Character Section */}
        <div className="relative flex-shrink-0">
          <motion.button
            onClick={transform}
            className="group relative isolate outline-none"
            aria-label="Transform character"
            title="Click to Transform (or press Space/Enter)"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isTransforming}
          >
            {/* Multi-layered glow effect - Responsive */}
            <motion.div
              className="absolute -inset-6 sm:-inset-8 lg:-inset-12 -z-10 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 70%)`,
                filter: "blur(15px) sm:blur(20px)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute -inset-4 sm:-inset-6 lg:-inset-8 -z-10 rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 60%)`,
                filter: "blur(30px) sm:blur(40px)",
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Character image with enhanced animations - Responsive */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                variants={imageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="relative"
              >
                <motion.img
                  src={current.image}
                  alt={`${current.role} form`}
                  className="pointer-events-none select-none w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-contain"
                  style={{
                    filter: `drop-shadow(0 0 15px ${current.glowColor}) drop-shadow(0 0 30px ${current.glowColor}40)`,
                  }}
                  animate={{
                    y: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Transformation effect overlay */}
                <AnimatePresence>
                  {isTransforming && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 70%)`,
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 3, opacity: 0 }}
                      exit={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Interactive transformation indicator - Responsive */}
            <motion.div
              className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {forms.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border"
                  style={{
                    backgroundColor: i === idx ? current.particleColor : "transparent",
                    borderColor: current.particleColor,
                  }}
                />
              ))}
            </motion.div>

            {/* Mobile tap instruction */}
            <motion.div
              className="absolute -bottom-12 sm:-bottom-14 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-gray-400 text-center lg:hidden"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to Transform
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}