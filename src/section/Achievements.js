"use client";
import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const achievements = [
  {
    index: '01',
    category: 'Competition',
    year: '2024',
    title: 'Smart India\nHackathon',
    subtitle: 'National Level Innovation & Strategy',
    description:
      'Participated in the national-level Smart India Hackathon, engineering innovative solutions for real-world government challenges. Led frontend architecture and rapid prototyping under tight deadlines.',
    metrics: [
      { value: '06', label: 'Team Members' },
      { value: '1st', label: 'Stage Reached' },
      { value: '100%', label: 'MVP Delivered' },
    ],
    tag: 'Hackathon',
  },
  {
    index: '02',
    category: 'Competition',
    year: '2023',
    title: 'KAVACH\nHackathon',
    subtitle: 'Cybersecurity Shield & Threat Defense',
    description:
      'Represented the college team in a national cybersecurity hackathon. Built a decentralized threat-routing firewall with a secure Node.js backend and an intuitive frontend dashboard.',
    metrics: [
      { value: '01', label: 'Core Dev Role' },
      { value: 'NODE', label: 'Secure Layer' },
      { value: 'TOP', label: 'National Tier' },
    ],
    tag: 'Cybersecurity',
  },
  {
    index: '03',
    category: 'Award',
    year: '2023',
    title: 'Jaipur\nHackathon',
    subtitle: 'Runner-Up — Excellence in Rapid Prototyping',
    description:
      'Secured Runner-up at Jaipur Hackathon. Designed, built, and deployed a full production MVP from scratch within 36 hours — recognized for outstanding UI/UX and performance.',
    metrics: [
      { value: '02nd', label: 'Place Won' },
      { value: '36h', label: 'Build Cycle' },
      { value: 'GOLD', label: 'Sector Medal' },
    ],
    tag: 'Award',
  },
  {
    index: '04',
    category: 'Leadership',
    year: '2022',
    title: 'Club\nConvener',
    subtitle: 'Leadership, Community & Event Scaling',
    description:
      'Organized and managed 10+ national-level technical and cultural events, leading a team of 50+ members. Impacted 2,500+ students through workshops, seminars, and open-source drives.',
    metrics: [
      { value: '50+', label: 'Team Led' },
      { value: '10+', label: 'Events Run' },
      { value: '2.5K', label: 'Reach' },
    ],
    tag: 'Leadership',
  },
];

// ─────────────────────────────────────────────
// DESKTOP — horizontal GSAP pin-scroll
// ─────────────────────────────────────────────
const DesktopSlide = ({ ach, isLast }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative h-screen flex-shrink-0 flex items-center overflow-hidden bg-white"
      style={{ width: isLast ? '100vw' : '96vw' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(197,168,128,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(197,168,128,0.06) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Giant watermark number */}
      <div
        className="pointer-events-none select-none absolute right-0 bottom-0 font-black text-neutral-900/[0.032] font-space-grotesk leading-none"
        style={{ fontSize: 'clamp(12rem, 28vw, 26rem)', lineHeight: 1 }}
        aria-hidden="true"
      >
        {ach.index}
      </div>

      {/* Vertical accent line */}
      <motion.div
        className="absolute left-[46vw] top-0 bottom-0 w-px bg-[#c5a880]/20"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Content grid */}
      <div className="relative z-10 w-full grid grid-cols-[1fr_1fr] h-full px-20 xl:px-28 items-center gap-16 xl:gap-24">

        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#c5a880] font-space-grotesk">
              {ach.category}
            </span>
            <span className="w-4 h-px bg-neutral-300" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-neutral-400 font-space-grotesk">
              {ach.year}
            </span>
          </div>

          <h2
            className="font-black text-neutral-900 leading-[1.0] tracking-tight font-space-grotesk whitespace-pre-line"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}
          >
            {ach.title}
          </h2>

          <p className="mt-4 text-xl font-light italic text-neutral-400 font-cormorant leading-snug">
            {ach.subtitle}
          </p>

          <div className="flex items-center gap-4 my-8">
            <div className="w-10 h-px bg-[#c5a880]" />
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          <p className="text-neutral-500 text-base leading-relaxed font-inter max-w-[38ch]">
            {ach.description}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center pl-10 xl:pl-16">
          <span className="inline-flex self-start mb-10 px-4 py-1.5 border border-neutral-200 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-500 font-space-grotesk">
            {ach.tag}
          </span>

          <div className="space-y-8">
            {ach.metrics.map((m, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="relative w-0.5 self-stretch rounded-full bg-neutral-100 overflow-hidden shrink-0">
                  <motion.div
                    className="absolute top-0 left-0 right-0 bg-[#c5a880]"
                    initial={{ height: '0%' }}
                    animate={{ height: hovered ? '100%' : '0%' }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div>
                  <div
                    className="font-black text-neutral-900 font-space-grotesk leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                  >
                    {m.value}
                  </div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 font-space-grotesk">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="absolute right-0 top-1/4 h-1/2 w-px bg-neutral-900/5" />
      )}
    </div>
  );
};

function DesktopAchievements() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const stRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const newIdx = Math.min(achievements.length - 1, Math.floor(self.progress * achievements.length));
          if (newIdx !== activeIndexRef.current) {
            activeIndexRef.current = newIdx;
            setActiveIndex(newIdx);
          }
        },
      },
    });

    stRef.current = tl.scrollTrigger;

    tl.to(trackRef.current, {
      x: () => -(trackRef.current.scrollWidth - window.innerWidth),
      ease: 'none',
    });

    return () => {
      stRef.current?.kill();
      ScrollTrigger.getAll().forEach((s) => {
        if (s.trigger === containerRef.current) s.kill();
      });
    };
  }, []);

  const goToSlide = (idx) => {
    if (!stRef.current) return;
    const { start, end } = stRef.current;
    const target = start + (idx / (achievements.length - 1)) * (end - start);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white">

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-40 px-20 xl:px-28 pt-8 pb-5 flex items-center justify-between border-b border-neutral-900/[0.05]">
        <div className="flex items-center gap-4">
          <span className="w-5 h-px bg-[#c5a880]" />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#c5a880] font-space-grotesk">
            Recognition
          </span>
          <span className="w-px h-4 bg-neutral-200" />
          <span className="text-sm font-semibold text-neutral-800 tracking-wide font-space-grotesk">
            Achievements
          </span>
        </div>

        <div className="flex items-center gap-1">
          {achievements.map((a, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="relative flex items-center gap-2 px-4 py-2 group cursor-pointer"
              aria-label={`Go to ${a.title}`}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                animate={{ backgroundColor: activeIndex === i ? '#c5a880' : '#d1d5db' }}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.2em] font-space-grotesk transition-colors duration-300 ${
                  activeIndex === i ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-neutral-600'
                }`}
              >
                {a.index}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Track */}
      <div ref={trackRef} className="flex h-full" style={{ width: 'fit-content' }}>
        {achievements.map((ach, i) => (
          <DesktopSlide key={i} ach={ach} isLast={i === achievements.length - 1} />
        ))}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 px-20 xl:px-28 pb-8 pt-5 flex items-center justify-between border-t border-neutral-900/[0.05]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a880]" />
          </span>
          <span className="text-[10px] text-neutral-400 font-bold tracking-[0.25em] uppercase font-space-grotesk">
            Scroll to navigate →
          </span>
        </div>

        <div className="flex items-baseline gap-1 font-space-grotesk">
          <span className="text-3xl font-black text-neutral-900">{achievements[activeIndex].index}</span>
          <span className="text-neutral-300 text-sm">/</span>
          <span className="text-neutral-300 text-sm font-medium">
            {String(achievements.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-[#c5a880]/60 z-50"
        animate={{ width: `${((activeIndex + 1) / achievements.length) * 100}%` }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// MOBILE — Single card + number box selector
// ─────────────────────────────────────────────
function MobileAchievements() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleSelect = (idx) => {
    if (idx === active) return;
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  const ach = achievements[active];

  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 52 : -52,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -52 : 52,
      opacity: 0,
      transition: { duration: 0.24, ease: [0.4, 0, 1, 1] },
    }),
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="px-5 sm:px-6 pt-14 pb-16 max-w-sm mx-auto flex flex-col">

        {/* Section label row */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-[10px] font-bold tracking-[0.38em] uppercase text-neutral-400 font-space-grotesk">
            Recognition
          </span>
          <span className="flex-1 h-px bg-neutral-100" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-300 font-space-grotesk">
            0{active + 1}&nbsp;/&nbsp;0{achievements.length}
          </span>
        </div>

        {/* Section heading */}
        <h2
          className="font-black text-neutral-900 leading-[1.0] tracking-tight font-space-grotesk mb-10"
          style={{ fontSize: 'clamp(2.6rem, 12vw, 3.8rem)' }}
        >
          ACHIEVE<br />MENTS
        </h2>

        {/* ── Number boxes + connectors ── */}
        <div className="relative mb-0">

          {/* Horizontal line behind boxes */}
          <div className="absolute top-5 left-0 right-0 h-px bg-neutral-200 z-0" />

          {/* Boxes row */}
          <div className="relative z-10 flex items-start justify-between">
            {achievements.map((a, i) => {
              const isActive = i === active;
              return (
                <div key={i} className="flex flex-col items-center">
                  {/* Square box */}
                  <button
                    onClick={() => handleSelect(i)}
                    aria-label={`Achievement ${i + 1}`}
                    className="cursor-pointer focus:outline-none"
                  >
                    <motion.div
                      animate={
                        isActive
                          ? { backgroundColor: '#171717', borderColor: '#171717' }
                          : { backgroundColor: '#ffffff', borderColor: '#e5e7eb' }
                      }
                      transition={{ duration: 0.22 }}
                      className="w-10 h-10 border-2 flex items-center justify-center"
                    >
                      <motion.span
                        animate={{ color: isActive ? '#ffffff' : '#9ca3af' }}
                        transition={{ duration: 0.22 }}
                        className="text-sm font-black font-space-grotesk leading-none select-none"
                      >
                        {i + 1}
                      </motion.span>
                    </motion.div>
                  </button>

                  {/* Vertical line from box down to card top */}
                  <div className="w-px h-6 bg-neutral-200 overflow-hidden relative">
                    <motion.div
                      className="absolute top-0 left-0 right-0 bg-neutral-800"
                      animate={{ height: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Single card ── */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="border-2 border-neutral-900 bg-white relative overflow-hidden">

                {/* Card top bar — dark */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900 border-b-2 border-neutral-900">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400 font-space-grotesk">
                    {ach.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 font-space-grotesk">
                      {ach.year}
                    </span>
                    <span className="w-px h-3 bg-neutral-700" />
                    <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 font-space-grotesk">
                      {ach.tag}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 pt-6 pb-5">

                  {/* Title */}
                  <h3
                    className="font-black text-neutral-900 leading-[1.05] tracking-tight font-space-grotesk whitespace-pre-line"
                    style={{ fontSize: 'clamp(1.75rem, 7.5vw, 2.4rem)' }}
                  >
                    {ach.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-2 text-sm font-light italic text-neutral-400 font-cormorant leading-snug">
                    {ach.subtitle}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-neutral-100 my-5" />

                  {/* Description */}
                  <p className="text-neutral-500 text-sm leading-relaxed font-inter">
                    {ach.description}
                  </p>

                  {/* Metrics strip */}
                  <div className="mt-6 grid grid-cols-3 divide-x divide-neutral-100 border border-neutral-100">
                    {ach.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center py-4 px-2 text-center"
                      >
                        <span className="font-black text-neutral-900 font-space-grotesk leading-none text-2xl">
                          {m.value}
                        </span>
                        <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400 font-space-grotesk leading-tight">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-neutral-200 pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Prev / Next + dot indicators ── */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => handleSelect(Math.max(0, active - 1))}
            disabled={active === 0}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 font-space-grotesk disabled:opacity-20 cursor-pointer transition-opacity"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
            Prev
          </button>

          <div className="flex items-center gap-1.5">
            {achievements.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                animate={{
                  width: i === active ? 20 : 6,
                  backgroundColor: i === active ? '#171717' : '#d1d5db',
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="h-1.5 rounded-full cursor-pointer"
                aria-label={`Go to ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleSelect(Math.min(achievements.length - 1, active + 1))}
            disabled={active === achievements.length - 1}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 font-space-grotesk disabled:opacity-20 cursor-pointer transition-opacity"
          >
            Next
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────
export default function Achievements() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopAchievements />
      </div>
      <div className="lg:hidden">
        <MobileAchievements />
      </div>
    </>
  );
}
