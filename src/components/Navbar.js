"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, Shield, ChevronDown } from "lucide-react";

// Replace with your actual logo path in the /public folder
const logoSrc = "/used/logo.png"; 

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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  
  const { user, isSignedIn, isLoaded } = useUser();
  const { openSignIn, signOut } = useClerk();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  
  const router = useRouter();
  const pathname = usePathname();

  // --- Effect for Scroll-based Styling & Active Section ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scrolled style
      setScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 150) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      lastScrollYRef.current = currentScrollY;

      // Only run section detection on the homepage
      if (pathname === "/") {
        const scrollPosition = currentScrollY + 100; // Offset for better accuracy
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

  // Auto-redirect removed — handled via forceRedirectUrl in openSignIn()

  // --- Handlers for Navigation and UI Actions ---
  const handleNavigation = (item) => {
    setIsMenuOpen(false);
    if (item.type === "page") {
      if (pathname !== item.href) {
        router.push(item.href);
      } else {
        // Already on this page — scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    // Scroll-type nav items
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (!isSignedIn) {
      // forceRedirectUrl ensures Clerk sends the user to /admin after Google OAuth
      openSignIn({ forceRedirectUrl: "/admin" });
    } else {
      setIsProfileMenuOpen(!isProfileMenuOpen);
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
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-xl border-b border-gray-200/40 shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Profile Dropdown */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogoClick}
                className="relative cursor-pointer group flex items-center gap-2"
              >
                {logoSrc ? (
                  <img src={logoSrc} alt="Logo" className="h-8 w-auto filter invert-0 transition-all" />
                ) : (
                  <span className="text-xl font-extrabold text-gray-900 tracking-tighter font-montserrat">YOGESH</span>
                )}
                {user && (
                  <motion.div
                    animate={{ rotate: isProfileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-900" />
                  </motion.div>
                )}
              </motion.div>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && isSignedIn && user && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-3 w-64 bg-white border border-gray-200 shadow-xl rounded-sm p-4 z-20 font-space-grotesk"
                    >
                      <div className="border-b border-gray-100 pb-3 mb-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Signed In As</div>
                        <div className="text-sm font-bold text-gray-900 truncate">{user.fullName || user.primaryEmailAddress?.emailAddress}</div>
                        <div className="text-xs text-gray-500 truncate">{user.primaryEmailAddress?.emailAddress}</div>
                      </div>

                      <div className="space-y-1">
                        {isAdmin && (
                          <button
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              router.push('/admin');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-sm transition-colors text-left"
                          >
                            <Shield className="w-4 h-4 text-black" />
                            <span>ADMIN PORTAL</span>
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            setIsProfileMenuOpen(false);
                            await signOut();
                            router.push('/');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-sm transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>SIGN OUT</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

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
                    <span className={`text-sm font-semibold tracking-widest uppercase transition-colors duration-300 font-space-grotesk ${
                      isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-gray-955'
                    }`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-2 left-0 w-full h-[2px] bg-black"
                        layoutId="underline"
                        initial={false}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button - High Contrast Monochrome Hamburger */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 p-2.5 lg:hidden flex items-center justify-center rounded-full bg-transparent transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between items-center relative">
                <motion.div
                  className="w-full h-[2px] bg-black rounded-full"
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 7 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                />
                <motion.div
                  className="w-full h-[2px] bg-black rounded-full"
                  animate={{ opacity: isMenuOpen ? 0 : 1, scale: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.div
                  className="w-full h-[2px] bg-black rounded-full"
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* --- Full-Screen Mobile Menu Overlay - Premium Minimalist Luxury Design --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center px-10 sm:px-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* White-Frosted Backdrop */}
            <div className="absolute inset-0 bg-white/98 backdrop-blur-2xl z-0" />

            {/* Subtle Drafting Blueprint grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-0">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
                backgroundSize: '36px 36px'
              }} />
            </div>

            {/* Soft decorative light silver glow orb behind the text */}
            <div className="absolute top-[45%] left-1/4 w-80 h-80 rounded-full bg-slate-300/10 blur-[80px] pointer-events-none select-none z-0" />

            {/* Navigation Links list - Left-Aligned for structured high-fashion elegance */}
            <div className="flex flex-col items-start justify-center space-y-6 relative z-10 w-full">
              {navItems.map((item, i) => {
                const isActive = activeSection === (item.href === "/" ? "home" : item.href.substring(1));
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.215, 0.610, 0.355, 1.000] }}
                    onClick={() => handleNavigation(item)}
                    className="group relative flex items-center justify-start gap-4 cursor-pointer py-1.5 text-left"
                  >
                    {/* Index Counter */}
                    <span className="text-[10px] font-bold text-gray-300 font-space-grotesk tracking-widest mt-1.5 transition-colors duration-300 group-hover:text-black">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Nav Item Title */}
                    <span className={`text-4.5xl sm:text-5xl font-black uppercase tracking-tight font-montserrat transition-all duration-300 ${
                      isActive 
                        ? 'text-black translate-x-2' 
                        : 'text-gray-400 group-hover:text-gray-900 group-hover:translate-x-2'
                    }`}>
                      {item.name}
                    </span>

                    {/* Underline active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveMenuIndicator"
                        className="absolute -bottom-0.5 left-6 right-0 h-[3px] bg-black"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* LinkedIn Connection Trigger - Left-Aligned */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.35 }}
              className="pt-10 relative z-10 self-start"
            >
              <button
                onClick={openLinkedIn}
                className="flex items-center space-x-3 px-8 py-3.5 bg-black text-white rounded-full font-space-grotesk font-bold text-xs uppercase tracking-widest hover:bg-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer border border-black"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
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