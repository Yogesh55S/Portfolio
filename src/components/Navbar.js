"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const logoSrc = "/logo.png";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  // Handle LinkedIn link
  const openLinkedIn = () => {
    window.open('https://linkedin.com/in/yourprofile', '_blank');
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-700/50'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo with enhanced hover effect */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button 
              onClick={() => scrollToSection('#home')} 
              className="flex items-center group"
            >
              <div className="relative">
                <img
                  src={logoSrc}
                  alt="Logo"
                  className="h-10 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </button>
          </motion.div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-gray-300 hover:text-white px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Background hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                  
                  {/* Text */}
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Underline effect */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 p-3 text-gray-300 hover:text-blue-400 transition-all duration-300 md:hidden rounded-lg hover:bg-slate-800/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col space-y-1.5">
              <motion.span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 rounded-full ${
                  isMenuOpen ? 'rotate-45 translate-y-2 bg-blue-400' : ''
                }`}
              />
              <motion.span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 rounded-full ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <motion.span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 rounded-full ${
                  isMenuOpen ? '-rotate-45 -translate-y-2 bg-blue-400' : ''
                }`}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-out Menu with enhanced design */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-slate-900/98 via-slate-900/95 to-slate-800/98 backdrop-blur-xl shadow-2xl z-50 overflow-hidden border-l border-slate-700/50"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              <div className="flex flex-col h-full pt-20 px-6 relative z-10">
                
                {/* Navigation Items with enhanced animations */}
                <div className="space-y-2">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="group block text-gray-300 hover:text-white text-lg font-medium tracking-wide transition-all duration-300 w-full text-left p-4 rounded-xl hover:bg-slate-800/50 relative overflow-hidden"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02, x: 8 }}
                    >
                      {/* Hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Icon indicator */}
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <span className="relative z-10 ml-2">{item.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Social Section */}
                <div className="mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-4 px-4">
                      Connect
                    </h3>
                    
                    {/* LinkedIn Button */}
                    <motion.button
                      onClick={openLinkedIn}
                      className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 p-4 rounded-xl hover:bg-slate-800/50 w-full relative overflow-hidden"
                      whileHover={{ scale: 1.02, x: 8 }}
                    >
                      {/* Hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* LinkedIn Icon */}
                      <div className="relative z-10 flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      
                      <span className="relative z-10 text-base font-medium">LinkedIn</span>
                      
                      {/* External link icon */}
                      <div className="relative z-10 ml-auto">
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Footer section with enhanced styling */}
                <div className="mt-auto pb-8">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-4"></div>
                    <p className="text-gray-400 text-sm font-light">
                      Full-Stack Developer
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Building digital experiences
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}