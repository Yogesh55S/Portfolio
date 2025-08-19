"use client";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const forms = [
  {
    key: "base",
    role: "Developer",
    image: "/goku_normal_form.png",
    glowColor: "rgba(96,165,250,0.8)",
    particleColor: "#60a5fa",
    textColor: "text-blue-400",
    bgOverlay: "bg-gradient-to-br from-blue-900/30 to-purple-900/20",
    description: "Building amazing digital experiences",
    gradient: "from-blue-400 via-blue-500 to-purple-600"
  },
  {
    key: "ssj",
    role: "Frontend Developer",
    image: "/super_saiyan.png",
    glowColor: "rgba(251,191,36,0.95)",
    particleColor: "#fbbf24",
    textColor: "text-yellow-400",
    bgOverlay: "bg-gradient-to-br from-yellow-900/30 to-orange-900/20",
    description: "Crafting beautiful user interfaces",
    gradient: "from-yellow-400 via-orange-500 to-red-600"
  },
  {
    key: "ssb",
    role: "Backend Developer",
    image: "/goku_2nd_form.png",
    glowColor: "rgba(59,130,246,0.95)",
    particleColor: "#3b82f6",
    textColor: "text-cyan-400",
    bgOverlay: "bg-gradient-to-br from-cyan-900/30 to-blue-900/20",
    description: "Powering robust server solutions",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600"
  },
  {
    key: "ui",
    role: "Full-Stack Developer",
    image: "/goku.png",
    glowColor: "rgba(226,232,240,1)",
    particleColor: "#e2e8f0",
    textColor: "text-slate-200",
    bgOverlay: "bg-gradient-to-br from-slate-800/30 to-gray-900/20",
    description: "Complete end-to-end solutions",
    gradient: "from-slate-400 via-gray-500 to-zinc-600"
  },
];

// Enhanced floating particle component
const Particle = ({ color, delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full opacity-70"
    style={{ backgroundColor: color }}
    animate={{
      x: [0, Math.random() * 300 - 150],
      y: [0, -150 - Math.random() * 300],
      opacity: [0.7, 0.9, 0],
      scale: [1, 1.5, 0],
      rotate: [0, 360],
    }}
    transition={{
      duration: 4 + Math.random() * 3,
      delay: delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// Enhanced skill orbs component
const SkillOrbs = ({ form }) => {
  const skills = {
    base: ["JavaScript", "HTML", "CSS"],
    ssj: ["React", "Next", "Angular"],
    ssb: ["Node.js", "Python", "Database", "Supabase"],
    ui: ["Full-Stack", "Data-Structure", "Architecture"]
  };

  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
      {skills[form.key]?.map((skill, index) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0, rotate: -180, y: 50 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180, y: -50 }}
          transition={{ 
            delay: index * 0.15, 
            duration: 0.8, 
            ease: "backOut",
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            scale: 1.1, 
            y: -5,
            transition: { duration: 0.2 }
          }}
          className={`px-4 py-2 sm:px-5 sm:py-3 rounded-full border-2 backdrop-blur-md text-sm sm:text-base font-semibold cursor-pointer relative overflow-hidden group ${form.textColor}`}
          style={{
            borderColor: form.particleColor,
            backgroundColor: `${form.particleColor}20`,
            boxShadow: `0 0 25px ${form.particleColor}40, inset 0 0 20px ${form.particleColor}10`
          }}
        >
          {/* Animated background on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-full"
            style={{ 
              backgroundColor: form.particleColor,
              opacity: 0.15
            }}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full rounded-full"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "linear"
            }}
          />
          
          <span className="relative z-10 font-bold">{skill}</span>
        </motion.div>
      ))}
    </div>
  );
};

// New animated background component
const AnimatedBackground = ({ current }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated gradient orbs */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${current.particleColor} 0%, transparent 70%)`,
          width: `${200 + i * 100}px`,
          height: `${200 + i * 100}px`,
        }}
        animate={{
          x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
          y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
        }}
        transition={{
          duration: 20 + i * 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
      />
    ))}
  </div>
);

export default function EnhancedHero() {
  const [idx, setIdx] = useState(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const current = forms[idx];

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // Enhanced particle generation
  const generateParticles = useCallback(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: Math.random(),
      delay: i * 0.08,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 6000);
  }, []);

  // Enhanced transform function
  const transform = useCallback(() => {
    if (isTransforming) return;
    
    setIsTransforming(true);
    generateParticles();
    
    setTimeout(() => {
      setIdx((i) => (i + 1) % forms.length);
      setIsTransforming(false);
    }, 400);
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

  // Enhanced animation variants
  const fadeVariants = {
    initial: { opacity: 0 },
    enter: { 
      opacity: 1, 
      transition: { duration: 1.2, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.6, ease: "easeIn" } 
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 40, filter: "blur(10px)" },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1, 
        ease: "easeOut",
        staggerChildren: 0.15
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(8px)",
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.7, rotateY: 90, z: -100 },
    enter: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: { 
        duration: 1.2, 
        ease: "backOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: -90,
      z: -100,
      transition: { duration: 0.6, ease: "easeIn" },
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
              filter: "brightness(0.6) saturate(1.3) contrast(1.2)",
            }}
          />
        </AnimatePresence>
        
        {/* Animated background orbs */}
        <AnimatedBackground current={current} />
        
        {/* Dynamic overlay with mouse interaction */}
        <motion.div 
          key={`overlay-${current.key}`}
          className={`absolute inset-0 ${current.bgOverlay}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${current.particleColor}20 0%, transparent 50%)`
          }}
        />
        
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Enhanced animated grid overlay */}
        <motion.div
          className="absolute inset-0 opacity-5 sm:opacity-10"
          style={{
            backgroundImage: `linear-gradient(${current.particleColor} 1px, transparent 1px), linear-gradient(90deg, ${current.particleColor} 1px, transparent 1px)`,
            backgroundSize: "40px 40px sm:60px 60px",
          }}
          animate={{
            backgroundPosition: ["0 0", "40px 40px", "0 0"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* New: Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 border border-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                rotate: `${Math.random() * 360}deg`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced floating particles */}
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
        
        {/* Enhanced Text Section */}
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
                  <motion.span 
                    className="text-white drop-shadow-2xl inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Hi, I'm
                  </motion.span>
                  <br />
                  <motion.span 
                    className={`bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent drop-shadow-2xl inline-block`}
                    style={{
                      textShadow: `0 0 30px ${current.particleColor}, 0 0 60px ${current.particleColor}40`
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Yogesh
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.div variants={textVariants}>
                <motion.div className="space-y-2">
                  <motion.p 
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}
                    initial={{ backgroundSize: "0% 100%" }}
                    animate={{ backgroundSize: "100% 100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                      textShadow: `0 0 20px ${current.particleColor}60`,
                    }}
                  >
                    {current.role}
                  </motion.p>
                  <motion.p 
                    className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-md mx-auto lg:mx-0 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    {current.description}
                  </motion.p>
                </motion.div>
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
                  className="group relative overflow-hidden rounded-2xl px-6 py-3 sm:px-8 sm:py-4 font-bold text-black transition-all duration-300 text-sm sm:text-base"
                  style={{ backgroundColor: current.particleColor }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20"
                    initial={{ x: "-100%", skewX: -15 }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10">View Projects</span>
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      boxShadow: `0 0 30px ${current.particleColor}80`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="group relative overflow-hidden rounded-2xl border-2 px-6 py-3 sm:px-8 sm:py-4 font-bold text-white transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                  style={{ 
                    borderColor: current.particleColor,
                    backgroundColor: `${current.particleColor}10`
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    backgroundColor: `${current.particleColor}20`,
                    borderColor: current.particleColor,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20"
                    style={{ 
                      background: `linear-gradient(90deg, transparent, ${current.particleColor}, transparent)`
                    }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Contact Me</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Character Section */}
        <div className="relative flex-shrink-0">
          <motion.button
            onClick={transform}
            className="group relative isolate outline-none focus:ring-4 focus:ring-white/20 rounded-full"
            aria-label="Transform character"
            title="Click to Transform (or press Space/Enter)"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isTransforming}
          >
            {/* Enhanced multi-layered glow effect */}
            <motion.div
              className="absolute -inset-8 sm:-inset-12 lg:-inset-16 -z-10 rounded-full"
              style={{
                background: `radial-gradient(circle, ${current.glowColor} 0%, ${current.particleColor}40 30%, transparent 70%)`,
                filter: "blur(20px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute -inset-6 sm:-inset-8 lg:-inset-12 -z-10 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, ${current.particleColor}, transparent, ${current.particleColor})`,
                filter: "blur(15px)",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Character image with enhanced animations */}
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
                    filter: `drop-shadow(0 0 20px ${current.glowColor}) drop-shadow(0 0 40px ${current.glowColor}60) drop-shadow(0 10px 30px rgba(0,0,0,0.5))`,
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    rotateY: [-2, 2, -2],
                    rotateX: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Enhanced transformation effect overlay */}
                <AnimatePresence>
                  {isTransforming && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 70%)`,
                        }}
                        initial={{ scale: 0, opacity: 1, rotate: 0 }}
                        animate={{ scale: 4, opacity: 0, rotate: 180 }}
                        exit={{ scale: 5, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute inset-0 border-4 rounded-full"
                        style={{ borderColor: current.particleColor }}
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Pulse ring indicator */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 opacity-30"
              style={{ borderColor: current.particleColor }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
}