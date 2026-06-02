'use client';
import React, { useEffect, useRef } from 'react';

// --- Minimalist Luxury SVG Icon Components (No Emojis allowed) ---

const SparkleIcon = ({ className = "w-4 h-4 text-[#c5a880]" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.2L22 11.6l-5.6 4.4L18.8 22 12 17.6 5.2 22l2.4-6-5.6-4.4 7.6-2.4z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg className="w-4 h-4 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6M12 20h.01M5 12.5v4c0 1.5 3 2.5 7 2.5s7-1.076 7-2.5v-4" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 text-[#b45309]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);

const WrenchIcon = () => (
  <svg className="w-4 h-4 text-[#7c3aed]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-4 h-4 text-[#047857]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3a9 9 0 019 9c0 4.97-4.03 9-9 9M12 3a9 9 0 00-9 9c0 4.97 4.03 9 9 9M12 9c2 0 4 2 4 4s-2 4-4 4M12 9c-2 0-4 2-4 4s2 4 4 4" />
  </svg>
);

const SparklesCinemaIcon = () => (
  <svg className="w-12 h-12 text-[#c5a880] animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.187.904zM18 9.75L16.5 12M16.5 12L15 9.75M16.5 12L18 12.75M16.5 12L15 12.75M18 4.5L17.25 6M17.25 6L16.5 4.5M17.25 6L18 6.75M17.25 6L16.5 6.75" />
  </svg>
);

export default function HiddenReveal() {
  const containerRef = useRef(null);

  // --- Element DOM Refs for Direct Style Animations ---
  const sec2LeftRef = useRef(null);
  const sec2RightRef = useRef(null);
  const sec3Ref = useRef(null);
  const sec4TopRef = useRef(null);
  const sec4BottomRef = useRef(null);
  const sec5LeftRef = useRef(null);
  const sec5RightRef = useRef(null);
  const sec6Ref = useRef(null);
  const sec7Ref = useRef(null);

  // --- Shadow DOM Refs ---
  const shadow1Ref = useRef(null);
  const shadow2LeftRef = useRef(null);
  const shadow2RightRef = useRef(null);
  const shadow3LeftRef = useRef(null);
  const shadow3RightRef = useRef(null);
  const shadow4TopRef = useRef(null);
  const shadow4BottomRef = useRef(null);
  const shadow5LeftRef = useRef(null);
  const shadow5RightRef = useRef(null);
  const shadow6LeftRef = useRef(null);
  const shadow6RightRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let rafId;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const update = () => {
      const diff = targetScroll - currentScroll;
      // Butter-smooth damping easing
      if (Math.abs(diff) > 0.05) {
        currentScroll += diff * 0.2;
      } else {
        currentScroll = targetScroll;
      }

      const container = containerRef.current;
      if (container) {
        const height = window.innerHeight;
        if (height > 0) {
          // Progress variables (0 to 1) for the 7 snap zones (6 scrolling phases)
          const p1 = Math.max(0, Math.min(1, currentScroll / height));
          const p2 = Math.max(0, Math.min(1, (currentScroll - height) / height));
          const p3 = Math.max(0, Math.min(1, (currentScroll - 2 * height) / height));
          const p4 = Math.max(0, Math.min(1, (currentScroll - 3 * height) / height));
          const p5 = Math.max(0, Math.min(1, (currentScroll - 4 * height) / height));
          const p6 = Math.max(0, Math.min(1, (currentScroll - 5 * height) / height));

          // 1. Slide 2: House of Aerawat (Horizontal split entering from left & right)
          if (sec2LeftRef.current) {
            sec2LeftRef.current.style.transform = `translateX(${-100 * (1 - p1)}%)`;
          }
          if (sec2RightRef.current) {
            sec2RightRef.current.style.transform = `translateX(${100 * (1 - p1)}%)`;
          }

          // 2. Slide 3: Rabbit Auto Care (Entire container slides up from bottom)
          if (sec3Ref.current) {
            sec3Ref.current.style.transform = `translateY(${100 * (1 - p2)}%)`;
          }

          // 3. Slide 4: Nidas Pure (Vertical split entering from top & bottom)
          if (sec4TopRef.current) {
            sec4TopRef.current.style.transform = `translateY(${-100 * (1 - p3)}%)`;
          }
          if (sec4BottomRef.current) {
            sec4BottomRef.current.style.transform = `translateY(${100 * (1 - p3)}%)`;
          }

          // 4. Slide 5: Genesis Classes (Vertical-opposite split panels)
          if (sec5LeftRef.current) {
            sec5LeftRef.current.style.transform = `translateY(${-100 * (1 - p4)}%)`;
          }
          if (sec5RightRef.current) {
            sec5RightRef.current.style.transform = `translateY(${100 * (1 - p4)}%)`;
          }

          // 5. Slide 6: Pawgloo (Entire section slides in from the right)
          if (sec6Ref.current) {
            sec6Ref.current.style.transform = `translateX(${100 * (1 - p5)}%)`;
          }

          // 6. Slide 7: Bollywood Ending (Entire section slides in from the left)
          if (sec7Ref.current) {
            sec7Ref.current.style.transform = `translateX(${-100 * (1 - p6)}%)`;
          }

          // --- Direct Opacity Dampening for Shadow Overlays (Soft White/Grey Dimming) ---
          if (shadow1Ref.current) {
            shadow1Ref.current.style.opacity = p1 * 0.35;
          }
          if (shadow2LeftRef.current) {
            shadow2LeftRef.current.style.opacity = p2 * 0.35;
          }
          if (shadow2RightRef.current) {
            shadow2RightRef.current.style.opacity = p2 * 0.35;
          }
          if (shadow3LeftRef.current) {
            shadow3LeftRef.current.style.opacity = p3 * 0.35;
          }
          if (shadow3RightRef.current) {
            shadow3RightRef.current.style.opacity = p3 * 0.35;
          }
          if (shadow4TopRef.current) {
            shadow4TopRef.current.style.opacity = p4 * 0.35;
          }
          if (shadow4BottomRef.current) {
            shadow4BottomRef.current.style.opacity = p4 * 0.35;
          }
          if (shadow5LeftRef.current) {
            shadow5LeftRef.current.style.opacity = p5 * 0.35;
          }
          if (shadow5RightRef.current) {
            shadow5RightRef.current.style.opacity = p5 * 0.35;
          }
          if (shadow6LeftRef.current) {
            shadow6LeftRef.current.style.opacity = p6 * 0.35;
          }
          if (shadow6RightRef.current) {
            shadow6RightRef.current.style.opacity = p6 * 0.35;
          }
        }
      }

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    handleScroll();
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="s__main hidden-reveal-wrapper w-full relative"
      style={{ height: '700vh' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        /* Enable snap type on page level globally */
        html {
          scroll-snap-type: y mandatory;
          scroll-behavior: auto;
          background-color: #f8fafc;
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background-color: #f8fafc;
        }

        .hidden-reveal-wrapper {
          background-color: #f8fafc;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          user-select: none;
        }

        /* Scroll Snap Anchors */
        .snap-anchor {
          scroll-snap-align: start;
          pointer-events: none;
        }

        /* Section layout overlay */
        .s-section {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          will-change: transform;
        }

        /* Soft light overlays for background dimming */
        .s-shadow {
          position: absolute;
          inset: 0;
          background-color: #0f172a;
          z-index: 5;
          pointer-events: none;
          will-change: opacity;
          opacity: 0;
        }

        /* Split panel halves */
        .panel-half {
          width: 50vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }

        @media (max-width: 767px) {
          .panel-half {
            width: 100%;
            height: 50vh;
          }
        }

        .panel-half-h {
          width: 100%;
          height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }

        /* Responsive Split Heights */
        .panel-half-img {
          width: 50vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }

        .panel-half-content {
          width: 50vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }

        .panel-half-h-img {
          width: 100%;
          height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }

        .panel-half-h-content {
          width: 100%;
          height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }

        @media (max-width: 767px) {
          .panel-half-img {
            width: 100% !important;
            height: 35vh !important;
          }
          .panel-half-content {
            width: 100% !important;
            height: 65vh !important;
          }
        }



        /* --- Beautiful Responsive Typography Easing & Condense Rules --- */
        @media (max-width: 1024px) {
          .responsive-title {
            font-size: 2.25rem !important;
            letter-spacing: 0.1em !important;
            line-height: 1.2 !important;
          }
          .responsive-subtitle {
            font-size: 0.8rem !important;
            letter-spacing: 0.1em !important;
          }
          .responsive-desc {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
          }
          .responsive-desc p {
            margin-bottom: 0.5rem !important;
          }
        }

        /* Hiding second paragraph on small screen heights or widths to prevent overlap */
        @media (max-width: 1024px) and (max-height: 850px) {
          .responsive-desc p:nth-child(2) {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .responsive-desc p:nth-child(2) {
            display: none !important;
          }
        }

        @media (max-height: 780px) {
          .responsive-title {
            font-size: 2rem !important;
            margin-top: 0.25rem !important;
          }
          .responsive-desc {
            font-size: 0.9rem !important;
            line-height: 1.45 !important;
          }
          .responsive-desc p:nth-child(2) {
            display: none !important;
          }
          .tech-badges {
            margin-top: 0.75rem !important;
            margin-bottom: 0.75rem !important;
          }
          .project-btn {
            padding: 0.6rem 1.25rem !important;
            margin-top: 0.5rem !important;
          }
        }

        /* Premium Brand Typography styling */
        .font-cinzel {
          font-family: 'Cinzel', serif;
        }
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .font-space {
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Brand Elements */
        .project-tag {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .tech-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
          margin-bottom: 1.75rem;
        }

        .tech-badge {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.38rem 0.8rem;
          border-radius: 9999px;
          background-color: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: rgba(15, 23, 42, 0.75);
        }

        .tech-badge-dark {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.38rem 0.8rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.85);
        }

        .project-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.85rem 1.75rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .shadow-glow-gold {
          text-shadow: 0 4px 20px rgba(197, 168, 128, 0.15);
        }

        .shadow-glow-purple {
          text-shadow: 0 4px 20px rgba(124, 58, 237, 0.15);
        }

        .shadow-glow-green {
          text-shadow: 0 4px 20px rgba(5, 150, 105, 0.15);
        }

        .shadow-glow-blue {
          text-shadow: 0 4px 20px rgba(37, 99, 235, 0.15);
        }

        .shadow-glow-amber {
          text-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);
        }

        .shadow-glow-cinema {
          text-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
        }

        /* Float Micro-animation */
        @keyframes luxury-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-luxury-float {
          animation: luxury-float 5s ease-in-out infinite;
        }
      `}</style>

      {/* Viewport snap target helpers */}
      <div className="absolute inset-x-0 top-0 h-[700vh] pointer-events-none z-0 flex flex-col">
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
      </div>

      {/* Sticky Main Frame */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10">

        {/* ==========================================
            SLIDE 1: Intro (Projects light luxury title) 
            ========================================== */}
        <div
          className="s-section bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#eef2f6] text-center"
          style={{ zIndex: 1 }}
        >
          <div className="w-full max-w-6xl px-8 select-text relative z-10 flex flex-col items-center animate-luxury-float">
            <h1
              className="font-sans font-black text-[#0f172a] uppercase tracking-tighter leading-none"
              style={{ fontSize: 'clamp(5rem, 16vw, 15rem)' }}
            >
              PROJECTS
            </h1>
          </div>
          <div
            ref={shadow1Ref}
            className="s-shadow"
          />
        </div>

        {/* ==========================================
            SLIDE 2: House of Aerawat (Blue + Black + White brand theme)
            ========================================== */}
        <div
          className="s-section bg-transparent pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <div className="flex flex-col md:flex-row w-full h-full pointer-events-none">
            {/* Left Panel: High-End Product Image (Slides from Left) */}
            <div
              ref={sec2LeftRef}
              className="panel-half panel-half-img relative bg-[#f4f7fc] border-r border-neutral-100 pointer-events-auto overflow-hidden"
              style={{ transform: 'translateX(-100%)' }}
            >
              <img
                src="/used/aerawat-new.png"
                alt="House of Aerawat Silver Jewelry"
                className="absolute inset-0 w-full h-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f4f7fc]/10" />
              <div
                ref={shadow2LeftRef}
                className="s-shadow"
              />
            </div>

            {/* Right Panel: Project Details (Slides from Right) */}
            <div
              ref={sec2RightRef}
              className="panel-half panel-half-content bg-gradient-to-br from-[#ffffff] to-[#f4f7fc] text-left pointer-events-auto"
              style={{ transform: 'translateX(100%)' }}
            >
              <div className="w-full max-w-2xl px-6 md:px-12 py-8 md:py-0 select-text z-10 relative">
                <span className="project-tag text-[#14397C]/95">
                  <SparkleIcon className="w-4 h-4 text-[#14397C]" /> Sterling Jewelry Boutique
                </span>
                <h2 className="font-cinzel responsive-title text-4xl md:text-5xl font-light text-[#0f172a] tracking-widest uppercase shadow-glow-blue mt-1">
                  AERAWAT
                </h2>
                <p className="font-cormorant responsive-subtitle text-[#14397C] text-lg italic tracking-wider mt-1 font-light">
                  House of Aerawat
                </p>
                <div className="font-cormorant responsive-desc text-neutral-600 text-base md:text-lg font-light leading-relaxed mt-4 md:mt-6 space-y-3 md:space-y-4">
                  <p>
                    House of Aerawat is an ultra-premium digital boutique specializing in exquisite 92.5 sterling silver jewelry. Engineered under strict aesthetic discipline, the platform delivers a high-fidelity visual experience that matches the exceptional craftsmanship of the boutique's custom creations.
                  </p>
                  <p>
                    The technical core is built on Next.js 16 and React 19, powered by a robust Supabase database and authentication architecture. Immersive client-side animations are managed via a high-performance timeline engine combining GSAP and Framer Motion. High-resolution jewelry showcases are optimized on the fly using a custom Cloudinary media pipeline, guaranteeing instantaneous load times and smooth layout snapping.
                  </p>
                </div>

                <div className="tech-badges mt-5 md:mt-6">
                  <span className="tech-badge">Next.js 16</span>
                  <span className="tech-badge">React 19</span>
                  <span className="tech-badge">Supabase DB</span>
                  <span className="tech-badge">GSAP Motion</span>
                  <span className="tech-badge">Framer Motion</span>
                  <span className="tech-badge">Cloudinary API</span>
                  <span className="tech-badge">Razorpay SDK</span>
                  <span className="tech-badge">Tailwind v4</span>
                  <span className="tech-badge">Biome Tooling</span>
                </div>

                <a
                  href="https://houseofaerawat.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn border border-[#14397C]/30 hover:border-[#14397C] text-[#14397C] hover:bg-[#14397C]/5 mt-5"
                >
                  Visit Boutique <ExternalLinkIcon />
                </a>
              </div>
              <div
                ref={shadow2RightRef}
                className="s-shadow"
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            SLIDE 3: Rabbit Auto Care (Slides from Bottom, Typographic Panel)
            ========================================== */}
        <div
          ref={sec3Ref}
          className="s-section bg-transparent pointer-events-none"
          style={{
            zIndex: 3,
            transform: 'translateY(100%)'
          }}
        >
          <div className="flex flex-col md:flex-row w-full h-full pointer-events-none">
            {/* Left Panel: High-End Product Image */}
            <div className="panel-half panel-half-img relative bg-black border-r border-neutral-900 pointer-events-auto overflow-hidden">
              <img
                src="/used/kitCat.webp"
                alt="Rabbit Auto Care Premium Detailing Products"
                className="absolute inset-0 w-full h-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              <div
                ref={shadow3LeftRef}
                className="s-shadow"
              />
            </div>

            {/* Right Panel: Project Details */}
            <div className="panel-half panel-half-content bg-gradient-to-br from-[#faf8ff] via-[#f5f3ff] to-[#ffffff] text-left pointer-events-auto">
              <div className="w-full max-w-2xl px-6 md:px-12 py-8 md:py-0 select-text z-10 relative">
                <span className="project-tag text-[#7c3aed]/95">
                  <WrenchIcon /> Premium Auto Detailing
                </span>
                <h2 className="font-space responsive-title text-4xl md:text-5xl font-bold text-[#1e1b4b] tracking-wider uppercase shadow-glow-purple mt-1">
                  RABBIT AUTO CARE
                </h2>
                <p className="font-montserrat responsive-subtitle text-neutral-500 text-xs font-semibold tracking-widest uppercase mt-2">
                  Brand & E-commerce Engineering
                </p>
                <div className="font-cormorant responsive-desc text-neutral-600 text-base md:text-lg font-light leading-relaxed mt-4 md:mt-6 space-y-3 md:space-y-4">
                  <p>
                    Rabbit AutoCare is a highly polished e-commerce platform engineered to retail premium professional car detailing products. Structured under rigorous performance and transactional standards, it offers a seamless and luxurious digital experience for automotive enthusiasts.
                  </p>
                  <p>
                    The architecture is powered by Next.js 15 and React 19, utilizing Supabase SSR for resilient user session state and secure database transactions. A custom billing pipeline integrates Puppeteer and @react-pdf/renderer to auto-generate and distribute PDF invoices. Dynamic dashboard analytics are rendered using Recharts and Chart.js, while product specifications are authored via an integrated TipTap rich text engine. Razorpay handles secure payment pathways, with Sharp executing server-side asset optimization to guarantee lightning-fast page loading.
                  </p>
                </div>

                <div className="tech-badges mt-5 md:mt-6">
                  <span className="tech-badge">Next.js 15</span>
                  <span className="tech-badge">React 19</span>
                  <span className="tech-badge">Supabase SSR</span>
                  <span className="tech-badge">GSAP Motion</span>
                  <span className="tech-badge">TipTap Editor</span>
                  <span className="tech-badge">Puppeteer</span>
                  <span className="tech-badge">Recharts</span>
                  <span className="tech-badge">Razorpay SDK</span>
                  <span className="tech-badge">Tailwind v4</span>
                </div>

                <a
                  href="https://rabbitautocare.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn border border-[#7c3aed]/30 hover:border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/5 mt-5"
                >
                  Launch Site <ExternalLinkIcon />
                </a>
              </div>
              <div
                ref={shadow3RightRef}
                className="s-shadow"
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            SLIDE 4: Nidas Pure (Light botanical green & apothecary white vertical split)
            ========================================== */}
        <div
          className="s-section bg-transparent pointer-events-none"
          style={{ zIndex: 4 }}
        >
          <div className="flex flex-col w-full h-full pointer-events-none">
            {/* Top Half: Sage Green Botanical Branding Header with Product Image */}
            <div
              ref={sec4TopRef}
              className="panel-half-h panel-half-h-img bg-[#f4f7f5] border-b border-[#cbdad2] text-center relative pointer-events-auto overflow-hidden"
              style={{ transform: 'translateY(-100%)' }}
            >
              <img
                src="/used/nidas-new.png"
                alt="Nidas Pure Ayurvedic Soap and Face Oil"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                ref={shadow4TopRef}
                className="s-shadow"
              />
            </div>

            {/* Bottom Half: Detailed Information & Link */}
            <div
              ref={sec4BottomRef}
              className="panel-half-h panel-half-h-content bg-gradient-to-b from-[#fbfdfc] to-[#f4f7f5] relative pointer-events-auto flex items-center justify-center"
              style={{ transform: 'translateY(100%)' }}
            >
              {/* Desktop / Large Screen Layout (width >= 1024px) - Two Column Elegant Grid */}
              <div className="w-full max-w-5xl px-8 select-text relative z-10 hidden lg:grid grid-cols-12 gap-8 items-center h-full">
                {/* Left Column (Brand Headline & Action) */}
                <div className="col-span-5 flex flex-col items-start text-left">
                  <span className="project-tag text-[#064e3b]/95 mb-3">
                    <LeafIcon /> Botanical Ayurvedic Skincare
                  </span>
                  <h2 className="font-cinzel text-4xl xl:text-5xl font-light text-[#064e3b] tracking-[0.12em] uppercase shadow-glow-green leading-tight">
                    NIDAS PURE
                  </h2>
                  <p className="font-cormorant text-[#064e3b] text-base tracking-widest font-medium uppercase mt-2">
                    100% Natural & Handmade Apothecary
                  </p>
                  <div className="w-16 h-[1px] bg-[#064e3b]/20 my-4" />
                  <a
                    href="https://nidaspure.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn border border-[#047857]/30 hover:border-[#047857] text-[#047857] hover:bg-[#047857]/5 mt-2"
                  >
                    Visit Apothecary <ExternalLinkIcon />
                  </a>
                </div>

                {/* Right Column (Description and Tech Badges) */}
                <div className="col-span-7 flex flex-col items-start text-left pl-4">
                  <div className="font-cormorant text-neutral-700 text-base xl:text-lg font-light leading-relaxed space-y-4">
                    <p>
                      Nidas Pure serves as an elegant Ayurvedic digital sanctuary, meticulously engineered to retail 100% natural, handmade soaps, face oils, and holistic hair remedies. Reflecting the brand's absolute commitment to purity, the platform translates traditional Ayurvedic wisdom into a frictionless, elegant e-commerce experience.
                    </p>
                    <p className="hidden xl:block">
                      The frontend architecture utilizes Next.js for high-fidelity rendering, with TailwindCSS providing responsive utility styling. A secure Supabase backend orchestrates user profiles, active cart state, and order histories, while custom PostgreSQL database functions run real-time catalog lookups.
                    </p>
                  </div>

                  <div className="tech-badges flex-wrap gap-2 mt-5">
                    <span className="tech-badge">Next.js</span>
                    <span className="tech-badge">React.js</span>
                    <span className="tech-badge">TailwindCSS</span>
                    <span className="tech-badge">Supabase DB</span>
                    <span className="tech-badge">PostgreSQL</span>
                    <span className="tech-badge">State Management</span>
                  </div>
                </div>
              </div>

              {/* Mobile / Tablet Layout (width < 1024px) - Vertical Centered Compact Card */}
              <div className="w-full max-w-2xl px-6 py-4 select-text relative z-10 flex flex-col items-center justify-center lg:hidden text-center h-full overflow-hidden">
                <span className="project-tag text-[#064e3b]/95 justify-center mb-1.5">
                  <LeafIcon /> Botanical Skincare
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-light text-[#064e3b] tracking-[0.15em] uppercase shadow-glow-green leading-none mb-1.5">
                  NIDAS PURE
                </h2>
                <p className="font-cormorant text-[#064e3b]/85 text-xs sm:text-sm tracking-widest font-semibold uppercase mb-1.5">
                  100% Natural Apothecary
                </p>
                <div className="w-12 h-[1px] bg-[#064e3b]/20 my-2" />

                <div className="font-cormorant text-neutral-700 text-sm sm:text-base font-light leading-relaxed max-w-[55ch] px-2 mb-3">
                  <p>
                    Nidas Pure is a luxurious Ayurvedic digital sanctuary retailing 100% natural soaps, face oils, and holistic hair remedies. Powered by Next.js and Supabase, it translates botanical wisdom into an elegant e-commerce experience.
                  </p>
                </div>

                <div className="tech-badges justify-center gap-1.5 mt-1 mb-3 max-w-[45ch]">
                  <span className="tech-badge py-0.5 px-2 text-[0.65rem]">Next.js</span>
                  <span className="tech-badge py-0.5 px-2 text-[0.65rem]">React.js</span>
                  <span className="tech-badge py-0.5 px-2 text-[0.65rem]">TailwindCSS</span>
                  <span className="tech-badge py-0.5 px-2 text-[0.65rem]">Supabase DB</span>
                  <span className="tech-badge py-0.5 px-2 text-[0.65rem]">PostgreSQL</span>
                </div>

                <a
                  href="https://nidaspure.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn border border-[#047857]/30 hover:border-[#047857] text-[#047857] hover:bg-[#047857]/5 py-2 px-5 text-xs mt-1"
                >
                  Visit Apothecary <ExternalLinkIcon />
                </a>
              </div>

              <div
                ref={shadow4BottomRef}
                className="s-shadow"
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            SLIDE 5: Genesis Classes (Opposite vertical split typographic panels)
            ========================================== */}
        <div
          className="s-section bg-transparent pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <div className="flex flex-col md:flex-row w-full h-full pointer-events-none">
            {/* Left Panel: Typographic Brand Panel (Slides from Top) */}
            <div
              ref={sec5LeftRef}
              className="panel-half panel-half-img bg-[#eff6ff] flex flex-col items-center justify-center relative overflow-hidden pointer-events-auto"
              style={{ transform: 'translateY(-100%)' }}
            >
              <img
                src="/used/genesis-new.png"
                alt="Genesis Classes LMS Dashboard"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                ref={shadow5LeftRef}
                className="s-shadow"
              />
            </div>

            {/* Right Panel: Academic Coaching Details (Slides from Bottom) */}
            <div
              ref={sec5RightRef}
              className="panel-half panel-half-content bg-gradient-to-br from-[#eff6ff] via-[#f8fafc] to-[#ffffff] text-left pointer-events-auto"
              style={{ transform: 'translateY(100%)' }}
            >
              <div className="w-full max-w-xl px-6 md:px-12 py-8 md:py-0 select-text z-10 relative">
                <span className="project-tag text-[#2563eb]/95">
                  <GraduationCapIcon /> Academic Excellence & Elite Coaching
                </span>
                <h2 className="font-space responsive-title text-4xl md:text-5xl font-bold text-[#0f172a] tracking-wider uppercase shadow-glow-blue mt-1">
                  GENESIS CLASSES
                </h2>
                <p className="font-montserrat responsive-subtitle text-neutral-500 text-xs font-semibold tracking-widest uppercase mt-2">
                  Elite Education Platform
                </p>
                <p className="font-cormorant responsive-desc text-neutral-600 text-base md:text-lg font-light leading-relaxed mt-4 md:mt-6">
                  Genesis Classes is a high-performance academic ecosystem providing elite coaching, digital classroom modules, and comprehensive progress trackers engineered for student excellence.
                </p>

                <div className="tech-badges">
                  <span className="tech-badge">Next.js</span>
                  <span className="tech-badge">React.js</span>
                  <span className="tech-badge">Tailwind CSS</span>
                  <span className="tech-badge">Interactive LMS</span>
                </div>

                <a
                  href="https://genesisclasses.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn border border-[#2563eb]/30 hover:border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb]/5 mt-4"
                >
                  Explore Academy <ExternalLinkIcon />
                </a>
              </div>
              <div
                ref={shadow5RightRef}
                className="s-shadow"
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            SLIDE 6: Pawgloo (Bright warm amber/cream marketplace, typographic layout)
            ========================================== */}
        <div
          ref={sec6Ref}
          className="s-section bg-transparent pointer-events-none"
          style={{
            zIndex: 6,
            transform: 'translateX(100%)'
          }}
        >
          <div className="flex flex-col md:flex-row w-full h-full pointer-events-none">
            {/* Left Panel: Typographic Brand Panel */}
            <div className="panel-half panel-half-img bg-[#ffffff] flex flex-col items-center justify-center relative overflow-hidden pointer-events-auto">
              <img
                src="/used/pawgloo-paw.png"
                alt="Pawgloo Pet Booking Interface"
                className="absolute w-[80%] h-[80%] object-contain select-none transition-transform duration-700 hover:scale-105"
              />
              <div
                ref={shadow6LeftRef}
                className="s-shadow"
              />
            </div>

            {/* Right Panel: Project Details */}
            <div className="panel-half panel-half-content bg-gradient-to-br from-[#fffdf5] via-[#fffbeb] to-[#ffffff] text-left pointer-events-auto">
              <div className="w-full max-w-xl px-6 md:px-12 py-8 md:py-0 select-text z-10 relative">
                <span className="project-tag text-[#b45309]/95">
                  <ClockIcon /> Active Booking Marketplace
                </span>
                <h2 className="font-space responsive-title text-4xl md:text-5xl font-bold text-[#1e293b] tracking-wider uppercase shadow-glow-amber mt-1">
                  PAWGLOO
                </h2>
                <p className="font-montserrat responsive-subtitle text-neutral-500 text-xs font-semibold tracking-widest uppercase mt-2">
                  Pet Care Marketplace
                </p>
                <p className="font-cormorant responsive-desc text-neutral-600 text-base md:text-lg font-light leading-relaxed mt-4 md:mt-6">
                  Pawgloo is a highly sophisticated, pet-focused platform designed to streamline bookings, connect premium pet service providers, and host retail catalogs. Engineered under high engineering discipline to optimize parent-pet transactions.
                </p>

                <div className="tech-badges">
                  <span className="tech-badge">Next.js</span>
                  <span className="tech-badge">React.js</span>
                  <span className="tech-badge">Tailwind CSS</span>
                  <span className="tech-badge">State Engine</span>
                </div>

                <div className="inline-flex items-center gap-3 text-[#b45309] font-space text-xs font-bold uppercase tracking-wider px-5 py-3.5 border border-[#f59e0b]/20 bg-[#f59e0b]/3 rounded-full mt-2">
                  <ClockIcon /> Active Production Code
                </div>
              </div>
              <div
                ref={shadow6RightRef}
                className="s-shadow"
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            SLIDE 7: Bollywood Ending Screen (Slides from Left, Champagne Gold)
            ========================================== */}
        <div
          ref={sec7Ref}
          className="s-section bg-gradient-to-br from-[#fdfbf7] via-[#faf6ed] to-[#f4ebe1] text-center"
          style={{
            zIndex: 7,
            transform: 'translateX(-100%)'
          }}
        >
          <div className="w-full max-w-4xl px-8 select-text relative z-10 flex flex-col items-center">
            <div className="mb-2">
              <SparklesCinemaIcon />
            </div>
            <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6.5xl font-bold tracking-[0.12em] text-[#1e293b] uppercase mt-8 shadow-glow-cinema max-w-[20ch] leading-snug">
              Make it work, make it right, make it fast.
            </h1>
            <span className="w-max border-t border-[#c5a880]/30 pt-4 mt-8 px-6 text-[#c5a880] text-xs font-bold uppercase tracking-[0.25em] font-montserrat">
              The Story Continues
            </span>
            <p className="font-cormorant text-neutral-600 italic text-base md:text-xl tracking-widest mt-3 max-w-[50ch] font-light">
              More high-end web experiences, digital crafts, and advanced architectural integrations are actively in the pipeline.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
