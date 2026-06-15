"use client";
import React, { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
// SVG CONNECTOR — 1 line from active box right-center to card left-center
// ─────────────────────────────────────────────
function SvgConnector({ activeIdx, boxRefs, cardRef, containerRef }) {
  const [line, setLine] = useState(null);

  const recalc = useCallback(() => {
    const box       = boxRefs.current[activeIdx];
    const card      = cardRef.current;
    const container = containerRef.current;
    if (!box || !card || !container) return;

    const cRect = container.getBoundingClientRect();
    const bRect = box.getBoundingClientRect();
    const kRect = card.getBoundingClientRect();

    // From: right-center of the active box
    const x1 = bRect.right  - cRect.left;
    const y1 = bRect.top + bRect.height / 2 - cRect.top;

    // To: left edge of card, at the SAME vertical level as the box
    const x2 = kRect.left   - cRect.left;
    const y2 = y1; // same height — purely horizontal line

    setLine({ x1, y1, x2, y2 });
  }, [activeIdx]);

  useEffect(() => {
    const t = setTimeout(recalc, 60);
    window.addEventListener('resize', recalc);
    return () => { clearTimeout(t); window.removeEventListener('resize', recalc); };
  }, [recalc]);

  if (!line) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <AnimatePresence mode="wait">
        <motion.line
          key={activeIdx}
          x1={line.x1} y1={line.y1}
          x2={line.x2} y2={line.y2}
          stroke="#171717"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          exit={{ pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
    </svg>
  );
}

// ─────────────────────────────────────────────
// DESKTOP
// ─────────────────────────────────────────────

// Each segment between two boxes has:
//   phase 0 → 0.33 : color drains from top-box (top-box fill goes 100→0)
//   phase 0.33→0.66: color travels through the line (line fill goes 0→100)
//   phase 0.66→1   : color fills into bottom-box  (bottom-box fill goes 0→100)

// Global progress p ∈ [0, 1] mapped across 3 segments (N-1 transitions for N boxes)
// Within segment i: localP = (p * (N-1)) - i  → 0..1

function DesktopAchievements() {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const boxRefs      = useRef([]);
  const cardRef      = useRef(null);
  const stRef        = useRef(null);

  // raw scroll progress 0..1
  const [scrollP, setScrollP]   = useState(0);
  const [active,  setActive]    = useState(0);
  const [direction, setDirection] = useState(1);
  const activeRef = useRef(0);

  const N    = achievements.length;   // 4
  const SEGS = N - 1;                 // 3 transitions

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${N * 750}`,
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollP(p);

          // Active box = which box is currently "filled"
          // Transition happens in the middle of each segment (localP ≥ 0.66)
          const segRaw   = p * SEGS;
          const seg      = Math.floor(segRaw);
          const localP   = segRaw - seg;
          // Box fills when localP >= 0.66 of next segment  → i.e., new box active
          const newActive = localP >= 0.66 ? Math.min(seg + 1, N - 1) : seg;

          if (newActive !== activeRef.current) {
            setDirection(newActive > activeRef.current ? 1 : -1);
            activeRef.current = newActive;
            setActive(newActive);
          }
        },
      });
    }, sectionRef);
    stRef.current = ctx;
    return () => ctx.revert();
  }, []);

  // ── Compute per-box fill fraction (0..1) and per-segment line fill (0..1) ──
  // Returns { boxes: [f0,f1,f2,f3], lines: [l0,l1,l2] }
  const computeFills = () => {
    const segRaw = scrollP * SEGS;           // e.g. 1.45 = segment 1, localP 0.45
    const seg    = Math.min(Math.floor(segRaw), SEGS - 1);
    const localP = Math.min(segRaw - Math.floor(segRaw), 1); // 0..1

    const boxes = Array(N).fill(0);
    const lines = Array(SEGS).fill(0);

    // All fully-completed segments: their "from" box is white, "to" box is... handled below
    // Current active box (before transition starts) is fully black
    // Phase splits: drain 0-0.33, travel 0.33-0.66, fill 0.66-1.0
    const DRAIN  = 0.33;
    const TRAVEL = 0.66;

    // Set the box that was active before this transition
    const fromBox = seg;
    const toBox   = seg + 1;

    if (localP < DRAIN) {
      // Draining from fromBox
      const drainFrac = localP / DRAIN;      // 0..1 (how much has drained)
      boxes[fromBox] = 1 - drainFrac;        // filling down
      lines[seg]     = 0;
    } else if (localP < TRAVEL) {
      // Traveling through line
      const travelFrac = (localP - DRAIN) / (TRAVEL - DRAIN);
      boxes[fromBox] = 0;
      lines[seg]     = travelFrac;
    } else {
      // Filling into toBox
      const fillFrac = (localP - TRAVEL) / (1 - TRAVEL);
      boxes[fromBox] = 0;
      lines[seg]     = 1;
      if (toBox < N) boxes[toBox] = fillFrac;
    }

    // All boxes before fromBox: white (already transitioned away)
    // All boxes after toBox: white (not yet reached)
    // fromBox and toBox handled above

    // But the very first box starts fully black at p=0
    if (seg === 0 && localP === 0) boxes[0] = 1;
    if (segRaw === 0) boxes[0] = 1;

    return { boxes, lines };
  };

  const { boxes, lines } = computeFills();
  const ach = achievements[active];

  const cardVariants = {
    enter:  (dir) => ({ x: dir > 0 ? 56 : -56, opacity: 0 }),
    center: {
      x: 0, opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -56 : 56, opacity: 0,
      transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
    }),
  };

  const goTo = (idx) => {
    if (!stRef.current) return;
    // ctx.revert clears stRef but we keep stRef as the gsap context
    // Use the ScrollTrigger directly
    const sts = ScrollTrigger.getAll();
    if (!sts.length) return;
    const st = sts[sts.length - 1];
    const target = st.start + (idx / N) * (st.end - st.start);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  // Segment line height: 80px between boxes
  const SEG_H = 80;
  const BOX_H = 48; // w-12 h-12

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden font-sans"
    >
      {/* Dot grid bg */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Faint watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-6 bottom-0 font-black leading-none text-neutral-900/[0.028] font-space-grotesk"
        style={{ fontSize: 'clamp(9rem, 18vw, 18rem)', lineHeight: 1 }}
      >
        {ach.index}
      </div>

      {/* ── Main grid: left 38% / right 62% ── */}
      <div
        ref={containerRef}
        className="relative z-10 h-full grid"
        style={{ gridTemplateColumns: '38% 62%' }}
      >

        {/* ══════════════ LEFT ══════════════ */}
        <div className="flex flex-col justify-between py-14 pl-16 xl:pl-24 pr-10 border-r border-neutral-100/80">

          {/* Section label + heading */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-px bg-neutral-300" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neutral-400 font-space-grotesk">
                Recognition
              </span>
            </div>
            <h2
              className="font-black text-neutral-900 leading-none tracking-tight font-space-grotesk"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.6rem)' }}
            >
              ACHIEVE<br />MENTS
            </h2>
          </div>

          {/* ── Number boxes + liquid fill ── */}
          <div className="flex items-start gap-0 self-start ml-6">

            {/* Vertical column: boxes separated by animated lines */}
            <div className="relative flex flex-col items-center">
              {achievements.map((a, i) => {
                const fillFrac = boxes[i]; // 0..1

                return (
                  <React.Fragment key={i}>
                    {/* Segment line ABOVE this box */}
                    {i > 0 && (
                      <div
                        className="relative bg-neutral-200 overflow-hidden"
                        style={{ width: '2px', height: `${SEG_H}px` }}
                      >
                        {/* Liquid fill traveling down */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 bg-neutral-900 origin-top"
                          style={{ height: `${lines[i - 1] * 100}%` }}
                        />
                      </div>
                    )}

                    {/* Box */}
                    <button
                      ref={(el) => (boxRefs.current[i] = el)}
                      onClick={() => goTo(i)}
                      aria-label={`Achievement ${i + 1}`}
                      className="relative cursor-pointer focus:outline-none group"
                      style={{ width: `${BOX_H}px`, height: `${BOX_H}px` }}
                    >
                      {/* Border */}
                      <div className="absolute inset-0 border-2 border-neutral-300 group-hover:border-neutral-500 transition-colors duration-200" />

                      {/* Liquid fill — flows top to bottom */}
                      <div
                        className="absolute top-0 left-0 right-0 bg-neutral-900 transition-none"
                        style={{ height: `${fillFrac * 100}%` }}
                      />

                      {/* Number */}
                      <span
                        className="absolute inset-0 flex items-center justify-center text-base font-black font-space-grotesk leading-none select-none z-10"
                        style={{ color: fillFrac > 0.5 ? '#ffffff' : '#9ca3af' }}
                      >
                        {i + 1}
                      </span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-400" />
            </span>
            <span className="text-[10px] text-neutral-400 font-bold tracking-[0.25em] uppercase font-space-grotesk">
              Scroll to navigate
            </span>
          </div>
        </div>

        {/* ══════════════ RIGHT ══════════════ */}
        <div className="relative flex flex-col justify-center pl-16 xl:pl-20 pr-16 xl:pr-24 py-14">

          {/* SVG connector: active box → card */}
          <SvgConnector
            activeIdx={active}
            boxRefs={boxRefs}
            cardRef={cardRef}
            containerRef={containerRef}
          />

          {/* Counter */}
          <div className="absolute top-14 right-16 xl:right-24 flex items-baseline gap-1 font-space-grotesk select-none">
            <span className="text-3xl font-black text-neutral-900">{ach.index}</span>
            <span className="text-neutral-300 text-sm">/</span>
            <span className="text-neutral-300 text-sm">
              {String(N).padStart(2, '0')}
            </span>
          </div>

          {/* ── Achievement card ── */}
          <div className="relative z-20 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div
                  ref={cardRef}
                  className="border-2 border-neutral-900 bg-white relative overflow-hidden"
                >
                  {/* Dark header */}
                  <div className="flex items-center justify-between px-8 py-4 bg-neutral-900">
                    <span className="text-[10px] font-bold tracking-[0.32em] uppercase text-neutral-400 font-space-grotesk">
                      {ach.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 font-space-grotesk">
                        {ach.year}
                      </span>
                      <span className="w-px h-3 bg-neutral-700" />
                      <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 font-space-grotesk">
                        {ach.tag}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-8 pt-8 pb-8 grid grid-cols-[1fr_auto] gap-10 items-start">

                    {/* Text */}
                    <div>
                      <h3
                        className="font-black text-neutral-900 leading-[1.05] tracking-tight font-space-grotesk whitespace-pre-line"
                        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
                      >
                        {ach.title}
                      </h3>
                      <p className="mt-2.5 text-lg font-light italic text-neutral-400 font-cormorant leading-snug">
                        {ach.subtitle}
                      </p>
                      <div className="w-full h-px bg-neutral-100 my-5" />
                      <p className="text-neutral-500 text-sm leading-relaxed font-inter max-w-[44ch]">
                        {ach.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-col gap-6 min-w-[150px] pt-1">
                      {ach.metrics.map((m, i) => (
                        <div key={i} className="flex flex-col border-l-2 border-neutral-900 pl-4">
                          <span className="font-black text-neutral-900 font-space-grotesk leading-none text-3xl xl:text-4xl">
                            {m.value}
                          </span>
                          <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-neutral-400 font-space-grotesk">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Corner mark */}
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-t-2 border-l-2 border-neutral-200 pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-neutral-900 z-50"
        animate={{ width: `${((active + 1) / N) * 100}%` }}
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
    enter:  (dir) => ({ x: dir > 0 ? 52 : -52, opacity: 0 }),
    center: {
      x: 0, opacity: 1,
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -52 : 52, opacity: 0,
      transition: { duration: 0.24, ease: [0.4, 0, 1, 1] },
    }),
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="px-5 sm:px-6 pt-14 pb-16 max-w-sm mx-auto flex flex-col">

        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-[10px] font-bold tracking-[0.38em] uppercase text-neutral-400 font-space-grotesk">
            Recognition
          </span>
          <span className="flex-1 h-px bg-neutral-100" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-300 font-space-grotesk">
            0{active + 1}&nbsp;/&nbsp;0{achievements.length}
          </span>
        </div>

        <h2
          className="font-black text-neutral-900 leading-[1.0] tracking-tight font-space-grotesk mb-10"
          style={{ fontSize: 'clamp(2.6rem, 12vw, 3.8rem)' }}
        >
          ACHIEVE<br />MENTS
        </h2>

        {/* Number boxes */}
        <div className="relative mb-0">
          <div className="absolute top-5 left-0 right-0 h-px bg-neutral-200 z-0" />
          <div className="relative z-10 flex items-start justify-between">
            {achievements.map((a, i) => {
              const isActive = i === active;
              return (
                <div key={i} className="flex flex-col items-center">
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

        {/* Card */}
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
                <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900">
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
                <div className="px-5 pt-6 pb-5">
                  <h3
                    className="font-black text-neutral-900 leading-[1.05] tracking-tight font-space-grotesk whitespace-pre-line"
                    style={{ fontSize: 'clamp(1.75rem, 7.5vw, 2.4rem)' }}
                  >
                    {ach.title}
                  </h3>
                  <p className="mt-2 text-sm font-light italic text-neutral-400 font-cormorant leading-snug">
                    {ach.subtitle}
                  </p>
                  <div className="w-full h-px bg-neutral-100 my-5" />
                  <p className="text-neutral-500 text-sm leading-relaxed font-inter">
                    {ach.description}
                  </p>
                  <div className="mt-6 grid grid-cols-3 divide-x divide-neutral-100 border border-neutral-100">
                    {ach.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col items-center justify-center py-4 px-2 text-center">
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
                <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-neutral-200 pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next + dots */}
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
                animate={{ width: i === active ? 20 : 6, backgroundColor: i === active ? '#171717' : '#d1d5db' }}
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
