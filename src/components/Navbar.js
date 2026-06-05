"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, Shield, ChevronDown } from "lucide-react";

const logoSrc = "/used/logo.png";

const navItems = [
  { name: "Home",         href: "/",            type: "page"   },
  { name: "About",        href: "#about",        type: "scroll" },
  { name: "Skills",       href: "#skills",       type: "scroll" },
  { name: "Projects",     href: "#projects",     type: "scroll" },
  { name: "Experience",   href: "#experience",   type: "scroll" },
  { name: "Achievements", href: "#achievements", type: "scroll" },
  { name: "Contact",      href: "#contact",      type: "scroll" },
];

// ── Overlay variants ──────────────────────────────────────────────────────────
const overlayVariants = {
  hidden:  { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

// ── Each nav item reveal (clip from bottom) ───────────────────────────────────
const itemVariants = {
  hidden:  { y: "110%", opacity: 0 },
  visible: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: 0.18 + i * 0.075,
      duration: 0.55,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: (i) => ({
    y: "110%",
    opacity: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.38,
      ease: [0.55, 0, 1, 0.45],
    },
  }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.52 + i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: 10, transition: { duration: 0.25 } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function MinimalNavbar() {
  const [isMenuOpen,        setIsMenuOpen]        = useState(false);
  const [scrolled,          setScrolled]          = useState(false);
  const [activeSection,     setActiveSection]     = useState("home");
  const [isVisible,         setIsVisible]         = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  const { user, isSignedIn } = useUser();
  const { openSignIn, signOut } = useClerk();
  const router   = useRouter();
  const pathname = usePathname();

  const isAdmin =
    isSignedIn &&
    user?.primaryEmailAddress?.emailAddress?.toLowerCase() ===
      process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Scroll: glass + hide on down / show on up + active section
  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      setScrolled(cur > 50);
      setIsVisible(!(cur > lastScrollYRef.current && cur > 140));
      lastScrollYRef.current = cur;

      if (pathname === "/") {
        const pos = cur + 110;
        let section = "home";
        for (const item of navItems) {
          if (item.type === "scroll") {
            const el = document.getElementById(item.href.substring(1));
            if (el) {
              const { offsetTop, offsetHeight } = el;
              if (pos >= offsetTop && pos < offsetTop + offsetHeight) {
                section = item.href.substring(1);
                break;
              }
            }
          }
        }
        setActiveSection(section);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const handleNavigation = (item) => {
    setIsMenuOpen(false);
    if (item.type === "page") {
      pathname !== item.href
        ? router.push(item.href)
        : window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // slight delay so overlay exit doesn't fight the scroll
    setTimeout(() => {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (!isSignedIn) openSignIn({ forceRedirectUrl: "/admin" });
    else setIsProfileMenuOpen((p) => !p);
  };

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/yogesh-kumar-983840226/", "_blank");
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* ═══════════════════════ NAVBAR BAR ═══════════════════════ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.36, ease: [0.215, 0.61, 0.355, 1] }}
        className="fixed top-0 left-0 right-0 z-[60]"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled && !isMenuOpen
              ? "bg-white/85 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(0,0,0,0.07)]"
              : isMenuOpen
              ? "bg-transparent"
              : "bg-transparent"
          }`}
        >
          {/* Gradient rule on scroll */}
          <motion.div
            animate={{ opacity: scrolled && !isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300/70 to-transparent pointer-events-none"
          />

          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
            <div className="flex items-center justify-between h-[72px] md:h-[80px] lg:h-[88px]">

              {/* ── LOGO ── */}
              <div className="relative z-[61]">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={handleLogoClick}
                  className="cursor-pointer flex items-center gap-1.5 group"
                >
                  <img
                    src={logoSrc}
                    alt="Logo"
                    className={`h-9 md:h-10 lg:h-11 w-auto transition-all duration-300 ${
                      isMenuOpen ? "brightness-0 invert" : ""
                    }`}
                  />
                  {user && (
                    <motion.div
                      animate={{ rotate: isProfileMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-colors duration-300 ${
                          isMenuOpen ? "text-white/70" : "text-gray-500"
                        }`}
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* Profile dropdown */}
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
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-xl p-4 z-20 font-space-grotesk"
                      >
                        <div className="border-b border-gray-100 pb-3 mb-3">
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Signed In As
                          </div>
                          <div className="text-sm font-bold text-gray-900 truncate">
                            {user.fullName || user.primaryEmailAddress?.emailAddress}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {user.primaryEmailAddress?.emailAddress}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {isAdmin && (
                            <button
                              onClick={() => {
                                setIsProfileMenuOpen(false);
                                router.push("/admin");
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors text-left"
                            >
                              <Shield className="w-4 h-4 text-black" />
                              <span>ADMIN PORTAL</span>
                            </button>
                          )}
                          <button
                            onClick={async () => {
                              setIsProfileMenuOpen(false);
                              await signOut();
                              router.push("/");
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left"
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

              {/* ── HAMBURGER (all screen sizes) ── */}
              <motion.button
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => setIsMenuOpen((p) => !p)}
                className="relative z-[61] flex flex-col justify-center items-end gap-[6px] w-10 h-10 cursor-pointer focus:outline-none"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.88 }}
              >
                {/* Line 1 */}
                <motion.span
                  className={`block h-[2px] rounded-full origin-center transition-colors duration-300 ${
                    isMenuOpen ? "bg-white" : "bg-gray-900"
                  }`}
                  animate={
                    isMenuOpen
                      ? { width: "28px", rotate: 45, y: 8 }
                      : { width: "28px", rotate: 0, y: 0 }
                  }
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                />
                {/* Line 2 */}
                <motion.span
                  className={`block h-[2px] rounded-full transition-colors duration-300 ${
                    isMenuOpen ? "bg-white" : "bg-gray-900"
                  }`}
                  animate={
                    isMenuOpen
                      ? { width: "28px", opacity: 0, scaleX: 0 }
                      : { width: "20px", opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.18 }}
                />
                {/* Line 3 */}
                <motion.span
                  className={`block h-[2px] rounded-full origin-center transition-colors duration-300 ${
                    isMenuOpen ? "bg-white" : "bg-gray-900"
                  }`}
                  animate={
                    isMenuOpen
                      ? { width: "28px", rotate: -45, y: -8 }
                      : { width: "24px", rotate: 0, y: 0 }
                  }
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                />
              </motion.button>

            </div>
          </div>
        </div>
      </motion.nav>

      {/* ═══════════════ FULLSCREEN OVERLAY — slides top to bottom ════════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col overflow-hidden"
          >
            {/* ── Subtle noise texture ── */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />

            {/* ── Thin horizontal rule ── */}
            <div className="absolute top-[88px] md:top-[96px] left-6 sm:left-10 lg:left-14 right-6 sm:right-10 lg:right-14 h-[1px] bg-white/10" />

            {/* ── Main content area ── */}
            <div className="flex flex-col justify-between h-full pt-[88px] md:pt-[96px] pb-10 px-6 sm:px-10 lg:px-14 max-w-[1400px] mx-auto w-full">

              {/* ── NAV LINKS ── */}
              <nav className="flex flex-col justify-center flex-1 py-8 lg:py-12">
                {navItems.map((item, i) => {
                  const isActive =
                    activeSection ===
                    (item.href === "/" ? "home" : item.href.substring(1));
                  return (
                    <div
                      key={item.name}
                      className="overflow-hidden border-b border-white/[0.08] last:border-b-0"
                    >
                      <motion.div
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => handleNavigation(item)}
                        className="group flex items-center justify-between py-4 md:py-5 lg:py-6 cursor-pointer"
                      >
                        {/* Left: index + name */}
                        <div className="flex items-baseline gap-4 lg:gap-6">
                          <span className="text-[11px] md:text-[12px] text-white/25 font-space-grotesk font-medium tracking-widest tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-montserrat font-black uppercase leading-none tracking-tight transition-colors duration-200
                              text-[clamp(2.2rem,6vw,5.5rem)]
                              ${isActive ? "text-white" : "text-white/40 group-hover:text-white"}
                            `}
                          >
                            {item.name}
                          </span>
                        </div>

                        {/* Right arrow — slides in on hover */}
                        <motion.div
                          className="text-white/0 group-hover:text-white/60 transition-colors duration-200 flex-shrink-0 ml-4"
                          initial={{ x: -8, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                        >
                          <svg
                            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 -rotate-45 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}
              </nav>

              {/* ── BOTTOM BAR ── */}
              <div className="overflow-hidden">
                <motion.div
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10"
                >
                  {/* LinkedIn CTA */}
                  <button
                    onClick={openLinkedIn}
                    className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-space-grotesk font-semibold text-[12px] uppercase tracking-[0.12em] transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>Let&apos;s Connect</span>
                  </button>

                  {/* Social / email */}
                  <div className="flex items-center gap-6">
                    <motion.span
                      custom={1}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-white/30 font-space-grotesk text-[11px] tracking-widest uppercase hidden sm:block"
                    >
                      © 2025 Yogesh Kumar
                    </motion.span>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
