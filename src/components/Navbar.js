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
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map(item => item.href.substring(1));
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section with fixed mobile issue
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      setIsMenuOpen(false);
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 150);
    }
  };

  // Handle LinkedIn link
  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/yogesh-kumar-983840226/', '_blank');
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo with enhanced hover effect - YOUR DESIGN */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#home')}
              className="flex items-center group cursor-pointer"
            >
              <img
                src={logoSrc}
                alt="Logo"
                className="h-8 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Glow effect behind logo - YOUR DESIGN */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Desktop Navigation with enhanced styling - YOUR DESIGN + ACTIVE STATES */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.div
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Background hover effect - YOUR DESIGN */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Text */}
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Active indicator - ENHANCED */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Underline effect - YOUR DESIGN */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced Mobile Menu Button - YOUR DESIGN */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 p-3 text-gray-300 hover:text-blue-400 transition-all duration-300 md:hidden rounded-lg hover:bg-slate-800/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-0.5'
                }`} />
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm my-0.5 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0.5'
                }`} />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu Overlay - YOUR DESIGN */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop with blur - YOUR DESIGN */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-out Menu with enhanced design - YOUR DESIGN */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-slate-900/98 backdrop-blur-xl shadow-2xl z-50 md:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Background pattern - YOUR DESIGN */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_70%)]" />

              <div className="relative z-10 p-6 pt-20">
                {/* Navigation Items with enhanced animations - YOUR DESIGN + ACTIVE STATES */}
                <div className="space-y-2">
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <motion.div
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className={`group block text-lg font-medium tracking-wide transition-all duration-300 w-full text-left p-4 rounded-xl relative overflow-hidden cursor-pointer ${
                          isActive 
                            ? 'text-white bg-gradient-to-r from-blue-600/20 to-purple-600/20' 
                            : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                      >
                        {/* Hover gradient background - YOUR DESIGN */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Icon indicator - YOUR DESIGN */}
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
                        )}
                        
                        <span className="relative z-10 pl-4">{item.name}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Section - YOUR DESIGN */}
                <div className="mt-12 pt-8 border-t border-slate-700/50">
                  <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h3>
                  
                  {/* LinkedIn Button - YOUR DESIGN */}
                  <motion.button
                    onClick={openLinkedIn}
                    className="group flex items-center w-full p-4 text-gray-300 hover:text-white rounded-xl hover:bg-slate-800/50 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ scale: 1.02, x: 8 }}
                  >
                    {/* Hover gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* LinkedIn Icon - YOUR DESIGN */}
                    <svg className="w-6 h-6 mr-3 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="relative z-10">LinkedIn</span>
                    
                    {/* External link icon - YOUR DESIGN */}
                    <svg className="w-4 h-4 ml-auto opacity-60 group-hover:opacity-100 transition-opacity relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.button>
                </div>

                {/* Footer section with enhanced styling - YOUR DESIGN */}
                <div className="mt-12 pt-8 border-t border-slate-700/50 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <h4 className="text-white font-semibold text-lg">Full-Stack Developer</h4>
                    <p className="text-gray-400 text-sm">Building digital experiences</p>
                  </motion.div>

                  {/* Decorative elements - YOUR DESIGN */}
                  <div className="flex justify-center space-x-1 mt-6">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
