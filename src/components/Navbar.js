"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Replace with your actual logo path in the /public folder
const logoSrc = "/logo.png"; 

// --- Configuration for Navigation Items ---
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
  
  const router = useRouter();
  const pathname = usePathname();

  // --- Effect for Scroll-based Styling & Active Section ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better accuracy
      setScrolled(window.scrollY > 50);

      // Only run section detection on the homepage
      if (pathname === "/") {
        let currentSection = "home";
        for (const item of navItems) {
          if (item.type === "scroll") {
            const element = document.getElementById(item.href.substring(1));
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                currentSection = item.href.substring(1);
                break;
              }
            }
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // --- Handlers for Navigation and UI Actions ---
  const handleNavigation = (item) => {
    setIsMenuOpen(false);
    if (item.type === "page" && pathname !== item.href) {
      router.push(item.href);
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  }, [isMenuOpen]);

  return (
    <>
      {/* --- Desktop and Mobile Navbar --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/10 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogoClick}
              className="relative cursor-pointer group"
            >
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="h-8 w-auto" />
              ) : (
                <span className="text-xl font-bold text-white">YOGESH</span>
              )}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === (item.href === "/" ? "home" : item.href.substring(1));
                return (
                  <motion.div
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className="relative cursor-pointer group"
                    whileHover={{ y: -2 }}
                  >
                    <span className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                      isActive ? 'text-black' : 'text-gray-600 group-hover:text-gray-900'
                    }`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-500"
                        layoutId="underline"
                        initial={false}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 p-2 lg:hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center">
                <motion.div
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 7 : 0 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* --- Full-Screen Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              background: 'radial-gradient(circle, rgba(10,10,25,0.98) 0%, rgba(5,5,15,1) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, ease: "easeOut" }}
                onClick={() => handleNavigation(item)}
                className="text-3xl font-light text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {item.name}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navItems.length * 0.08, ease: "easeOut" }}
              className="pt-8"
            >
                <button
                    onClick={openLinkedIn}
                    className="flex items-center space-x-2 px-6 py-3 border border-white/20 rounded-full text-white/80 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>Let's Connect</span>
                </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}