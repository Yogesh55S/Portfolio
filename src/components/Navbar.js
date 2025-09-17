"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const logoSrc = "/logo.png";

const navItems = [
  { name: "Home", href: "/", type: "page" },
  { name: "About", href: "#about", type: "scroll" }, 
  { name: "Skills", href: "#skills", type: "scroll" },
  { name: "Projects", href: "#projects", type: "scroll" },
  { name: "Experience", href: "#experience", type: "scroll" },
  { name: "Achievements", href: "#achievements", type: "scroll" },
  { name: "Contact", href: "#contact", type: "scroll" },
];

export default function MinimalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const router = useRouter();
  const pathname = usePathname();

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      setScrolled(window.scrollY > 50);

      if (pathname === "/") {
        const sections = navItems.filter(item => item.type === "scroll").map(item => item.href.substring(1));
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      } else {
        if (pathname === "/about") setActiveSection("about");
        else setActiveSection("home");
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavigation = (item) => {
    if (item.type === "page") {
      setIsMenuOpen(false);
      router.push(item.href);
    } else {
      if (pathname !== "/") {
        router.push(`/${item.href}`);
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          setIsMenuOpen(false);
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 150);
        }
      }
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push("/");
    }
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/yogesh-kumar-983840226/', '_blank');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Minimal Split Navbar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled || pathname !== "/" 
            ? 'bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}
        style={{
          backdropFilter: scrolled || pathname !== "/" ? 'blur(24px) saturate(180%) brightness(110%)' : 'none',
          background: scrolled || pathname !== "/" 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' 
            : 'transparent'
        }}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            
            {/* Minimalist Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogoClick}
              className="relative cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={logoSrc}
                    alt="Logo"
                    className="h-10 w-auto transition-all duration-500 group-hover:brightness-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-white/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            
              </div>
            </motion.div>

            {/* Desktop Navigation - Minimalist Style */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item, i) => {
                let isActive = false;
                if (item.type === "page") {
                  isActive = pathname === item.href || (item.name.toLowerCase() === activeSection);
                } else {
                  isActive = activeSection === item.href.substring(1);
                }

                return (
                  <motion.div
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className="relative cursor-pointer group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
                  >
                    <motion.span
                      className={`text-sm font-medium tracking-widest uppercase transition-all duration-500 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                      whileHover={{ y: -2 }}
                    >
                      {item.name}
                    </motion.span>
                    
                    {/* Minimalist underline */}
                    <div className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-gray-400 to-gray-400 transition-all duration-500 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`} />
                    
                    {/* Subtle dot indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -top-3 left-1/2 w-1 h-1 bg-gradient-to-r from-gray-400 to-gray-400 rounded-full"
                        layoutId="activeDot"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ x: '-50%' }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Elegant Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 p-4 lg:hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-7 h-7 flex flex-col justify-center items-center space-y-1">
                <motion.div
                  className="w-full h-px bg-white/80 group-hover:bg-white transition-colors"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 4 : 0,
                    width: isMenuOpen ? '100%' : '100%'
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <motion.div
                  className="w-3/4 h-px bg-white/80 group-hover:bg-white transition-colors self-end"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    x: isMenuOpen ? 20 : 0,
                    width: isMenuOpen ? '0%' : '75%'
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <motion.div
                  className="w-full h-px bg-white/80 group-hover:bg-white transition-colors"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -4 : 0,
                    width: isMenuOpen ? '100%' : '100%'
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu with Glassmorphism */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop with Advanced Blur */}
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(20px) saturate(180%)',
              }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Glassmorphism Mobile Menu Panel */}
            <motion.div
              className="fixed top-4 left-4 right-4 bottom-4 z-50 lg:hidden overflow-hidden rounded-3xl border border-white/20"
              initial={{ 
                scale: 0.8,
                opacity: 0,
                rotateX: 15,
                y: 100
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                rotateX: 0,
                y: 0
              }}
              exit={{ 
                scale: 0.8,
                opacity: 0,
                rotateX: 15,
                y: 100
              }}
              transition={{ 
                duration: 0.7, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(30px) saturate(200%) brightness(120%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Grid pattern overlay */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}
              />

              <div className="relative z-10 h-full p-8 pt-16">
                
                {/* Header Section */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="text-white/60 text-sm font-light tracking-[0.2em] uppercase mb-2">Navigation</div>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
                </motion.div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-1 gap-4 mb-12 max-h-96 overflow-y-auto scrollbar-hide">
                  {navItems.map((item, i) => {
                    let isActive = false;
                    if (item.type === "page") {
                      isActive = pathname === item.href || (item.name.toLowerCase() === activeSection);
                    } else {
                      isActive = activeSection === item.href.substring(1);
                    }

                    return (
                      <motion.div
                        key={item.name}
                        onClick={() => handleNavigation(item)}
                        className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          delay: 0.3 + i * 0.1, 
                          duration: 0.6,
                          type: "spring",
                          stiffness: 120,
                          damping: 20
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          y: -2
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          background: isActive 
                            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                        }}
                      >
                        {/* Hover gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        
                        {/* Active indicator line */}
                        {isActive && (
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"
                            layoutId="mobileActiveIndicator"
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.4 }}
                          />
                        )}

                        <div className="relative z-10 p-6 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {/* Index number */}
                            <div className="text-white/40 text-xs font-mono w-6">
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            <div>
                              <motion.h3
                                className={`text-xl font-light tracking-wide transition-colors duration-300 ${
                                  isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                                }`}
                              >
                                {item.name}
                              </motion.h3>
                              <div className="text-white/40 text-xs font-light tracking-wider uppercase mt-1">
                                {item.type === 'page' ? 'Page' : 'Section'}
                              </div>
                            </div>
                          </div>
                          
                          {/* Arrow indicator */}
                          <motion.div
                            className="text-white/60 group-hover:text-white/80 transition-colors"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* LinkedIn Section with Glassmorphism */}
                <motion.div
                  className="mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="rounded-2xl border border-white/20 p-6 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5" />
                    
                    <div className="relative z-10">
                      <div className="text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-4 text-center">
                        Let's Connect
                      </div>
                      
                      <motion.button
                        onClick={openLinkedIn}
                        className="w-full flex items-center justify-center space-x-3 p-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 group relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <svg className="w-5 h-5 text-white/80 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="text-white/80 font-light tracking-wide relative z-10">LinkedIn</span>
                        <motion.div
                          className="text-white/60 relative z-10"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ↗
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}