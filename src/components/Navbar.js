"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const logoSrc = "/logo2.png";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

// Transform states matching your hero component
const transformStates = [
  {
    key: "base",
    name: "Developer",
    accentColor: "#60a5fa",
    glowColor: "rgba(96,165,250,0.8)",
    bgGradient: "from-blue-900/20 to-purple-900/10",
    textGlow: "text-blue-400",
  },
  {
    key: "ssj",
    name: "Frontend",
    accentColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.95)",
    bgGradient: "from-yellow-900/20 to-orange-900/10",
    textGlow: "text-yellow-400",
  },
  {
    key: "ssb",
    name: "Backend",
    accentColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.95)",
    bgGradient: "from-cyan-900/20 to-blue-900/10",
    textGlow: "text-cyan-400",
  },
  {
    key: "ui",
    name: "Full-Stack",
    accentColor: "#e2e8f0",
    glowColor: "rgba(226,232,240,1)",
    bgGradient: "from-slate-800/20 to-gray-900/10",
    textGlow: "text-slate-200",
  },
];

// Animated hamburger component
const HamburgerButton = ({ isOpen, onClick, accentColor }) => (
  <motion.button
    onClick={onClick}
    className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center z-50"
    whileTap={{ scale: 0.9 }}
    aria-label="Toggle menu"
  >
    <motion.span
      className="absolute w-6 h-0.5 rounded-full"
      style={{ backgroundColor: accentColor }}
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -6,
      }}
      transition={{ duration: 0.3 }}
    />
    <motion.span
      className="absolute w-6 h-0.5 rounded-full"
      style={{ backgroundColor: accentColor }}
      animate={{
        opacity: isOpen ? 0 : 1,
        scale: isOpen ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute w-6 h-0.5 rounded-full"
      style={{ backgroundColor: accentColor }}
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 6,
      }}
      transition={{ duration: 0.3 }}
    />
  </motion.button>
);

// Mobile menu component
const MobileMenu = ({ isOpen, currentTransform, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Menu panel */}
        <motion.div
          className="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-40 md:hidden overflow-hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          {/* Animated background */}
          <div 
            className="absolute inset-0 backdrop-blur-xl border-l"
            style={{
              background: `linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)`,
              borderLeftColor: currentTransform.accentColor,
            }}
          />
          
          {/* Energy effect */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at top right, ${currentTransform.glowColor} 0%, transparent 50%)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Menu content */}
          <div className="relative h-full flex flex-col pt-20 px-8">
          

            {/* Navigation items */}
            <nav className="flex-1">
              <ul className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <motion.a
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center space-x-4 text-white text-lg font-medium py-3 px-4 rounded-lg transition-all"
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Glow dot */}
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: currentTransform.accentColor }}
                        whileHover={{ scale: 1.5 }}
                        animate={{
                          boxShadow: [
                            `0 0 10px ${currentTransform.glowColor}`,
                            `0 0 20px ${currentTransform.glowColor}`,
                            `0 0 10px ${currentTransform.glowColor}`,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <span className="group-hover:text-opacity-100 transition-colors">
                        {item.name}
                      </span>
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute left-0 w-1 h-full rounded-r opacity-0 group-hover:opacity-100"
                        style={{ backgroundColor: currentTransform.accentColor }}
                        initial={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Power level indicator */}
            <motion.div
              className="mt-8 text-center pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-xs text-gray-400 mb-2">NAVIGATION POWER</div>
              <motion.div
                className="text-2xl font-mono font-bold"
                style={{ color: currentTransform.accentColor }}
                animate={{
                  textShadow: [
                    `0 0 10px ${currentTransform.glowColor}`,
                    `0 0 20px ${currentTransform.glowColor}`,
                    `0 0 10px ${currentTransform.glowColor}`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                OVER 9000!
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default function EnhancedNavbar() {
  const [currentTransformIndex, setCurrentTransformIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const currentTransform = transformStates[currentTransformIndex];

  // Sync with hero transformations (you might want to use a context or props)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTransformIndex((prev) => (prev + 1) % transformStates.length);
    }, 8000); // Match hero auto-cycle timing

    return () => clearInterval(interval);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navVariants = {
    initial: { y: -100 },
    animate: { 
      y: 0,
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -180 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        damping: 10
      }
    },
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'backdrop-blur-xl bg-black/60 border-b shadow-2xl' 
            : 'backdrop-blur-md bg-black/40 border-b'
        }`}
        style={{
          borderBottomColor: currentTransform.accentColor + '40',
          boxShadow: isScrolled ? `0 8px 32px ${currentTransform.glowColor}` : 'none',
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          key={currentTransform.key}
          className={`absolute inset-0 bg-gradient-to-r ${currentTransform.bgGradient} opacity-50`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />

        {/* Energy pulse effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${currentTransform.glowColor} 50%, transparent 100%)`,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
          {/* Enhanced Logo */}
          <motion.a
            href="#home"
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              variants={logoVariants}
              className="relative"
            >
              {/* Logo glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-lg opacity-60"
                style={{
                  background: `radial-gradient(circle, ${currentTransform.glowColor} 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.img
                key={currentTransform.key}
                src={logoSrc}
                alt="Yogesh logo"
                className="relative h-12 w-12 object-contain"
                style={{
                  filter: `drop-shadow(0 0 10px ${currentTransform.glowColor})`,
                }}
                draggable={false}
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

        
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {item.name}
                
                {/* Enhanced underline effect */}
                <motion.span
                  className="absolute left-0 bottom-[-4px] h-[2px] rounded-full"
                  style={{ backgroundColor: currentTransform.accentColor }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hover glow */}
                <motion.span
                  className="absolute left-0 bottom-[-4px] h-[2px] rounded-full opacity-0 blur-sm"
                  style={{ backgroundColor: currentTransform.accentColor }}
                  initial={{ width: 0 }}
                  whileHover={{ 
                    width: "100%", 
                    opacity: 0.8,
                    boxShadow: `0 0 10px ${currentTransform.glowColor}`
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
         
          </div>

          {/* Mobile Hamburger */}
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            accentColor={currentTransform.accentColor}
          />
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        currentTransform={currentTransform}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}