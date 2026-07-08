"use client";
import React, { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    index: '01', category: 'Competition', year: '2024', tag: 'Hackathon',
    title: 'Smart India\nHackathon',
    subtitle: 'National Level Innovation & Strategy',
    description: 'Participated in the national-level Smart India Hackathon, engineering innovative solutions for real-world government challenges. Led frontend architecture and rapid prototyping under tight deadlines.',
    metrics: [{ value: '06', label: 'Team Members' }, { value: '1st', label: 'Stage Reached' }, { value: '100%', label: 'MVP Delivered' }],
  },
  {
    index: '02', category: 'Competition', year: '2023', tag: 'Cybersecurity',
    title: 'KAVACH\nHackathon',
    subtitle: 'Cybersecurity Shield & Threat Defense',
    description: 'Represented the college team in a national cybersecurity hackathon. Built a decentralized threat-routing firewall with a secure Node.js backend and an intuitive frontend dashboard.',
    metrics: [{ value: '01', label: 'Core Dev Role' }, { value: 'NODE', label: 'Secure Layer' }, { value: 'TOP', label: 'National Tier' }],
  },
  {
    index: '03', category: 'Award', year: '2023', tag: 'Award',
    title: 'Jaipur\nHackathon',
    subtitle: 'Runner-Up — Excellence in Rapid Prototyping',
    description: 'Secured Runner-up at Jaipur Hackathon. Designed, built, and deployed a full production MVP from scratch within 36 hours — recognized for outstanding UI/UX and performance.',
    metrics: [{ value: '02nd', label: 'Place Won' }, { value: '36h', label: 'Build Cycle' }, { value: 'GOLD', label: 'Sector Medal' }],
  },
  {
    index: '04', category: 'Leadership', year: '2022', tag: 'Leadership',
    title: 'Club\nConvener',
    subtitle: 'Leadership, Community & Event Scaling',
    description: 'Organized and managed 10+ national-level technical and cultural events, leading a team of 50+ members. Impacted 2,500+ students through workshops, seminars, and open-source drives.',
    metrics: [{ value: '50+', label: 'Team Led' }, { value: '10+', label: 'Events Run' }, { value: '2.5K', label: 'Reach' }],
  },
];

const N    = achievements.length; // 4
const SEGS = N - 1;               // 3

// ─────────────────────────────────────────────
// COMPUTE FILLS — fully bidirectional (scroll up reverses exactly)
//
// scrollP 0→1 maps to a continuous liquid position.
// Each segment covers 1/SEGS of the total range.
// Within each segment lp 0→1, 4 phases:
//   0.00–0.25  box[seg] fills     top→bottom
//   0.25–0.50  h-line[seg] fills  left→right
//   0.50–0.75  v-line[seg] fills  top→bottom
//   0.75–1.00  box[seg] drains (1→0), box[seg+1] fills (0→1)
//
// Completed segments: their lines stay filled (path taken),
// their box is 0 (drained). Scroll up reverses everything.
// ─────────────────────────────────────────────
function computeFills(rawP) {
  const scrollP = Math.max(0, Math.min(1, rawP));

  const boxFill = Array(N).fill(0);
  const hFill   = Array(N).fill(0);
  const vFill   = Array(SEGS).fill(0);

  if (scrollP <= 0) { boxFill[0] = 1; return { boxFill, hFill, vFill }; }
  if (scrollP >= 1) {
    boxFill[N - 1] = 1;
    for (let i = 0; i < N; i++) hFill[i] = 1;
    for (let s = 0; s < SEGS; s++) vFill[s] = 1;
    return { boxFill, hFill, vFill };
  }

  const pos = scrollP * SEGS;
  const seg = Math.min(Math.floor(pos), SEGS - 1);
  const lp  = Math.max(0, Math.min(1, pos - seg));

  // Completed segments before current — lines stay full, boxes drained
  for (let s = 0; s < seg; s++) {
    hFill[s] = 1;
    vFill[s] = 1;
    // boxFill[s] stays 0 (drained)
  }

  const P1 = 0.25, P2 = 0.50, P3 = 0.75;

  if (lp < P1) {
    boxFill[seg] = lp / P1;
  } else if (lp < P2) {
    boxFill[seg] = 1;
    hFill[seg]   = (lp - P1) / (P2 - P1);
  } else if (lp < P3) {
    boxFill[seg] = 1;
    hFill[seg]   = 1;
    vFill[seg]   = (lp - P2) / (P3 - P2);
  } else {
    const f      = (lp - P3) / (1 - P3);
    boxFill[seg] = 1 - f;
    hFill[seg]   = 1;
    vFill[seg]   = 1;
    if (seg + 1 < N) boxFill[seg + 1] = f;
  }

  return { boxFill, hFill, vFill };
}

// Active card index
function computeActive(rawP) {
  const scrollP = Math.max(0, Math.min(1, rawP));
  if (scrollP <= 0) return 0;
  if (scrollP >= 1) return N - 1;
  const pos = scrollP * SEGS;
  const seg = Math.min(Math.floor(pos), SEGS - 1);
  const lp  = Math.max(0, Math.min(1, pos - seg));
  if (lp >= 0.75) {
    const f = (lp - 0.75) / 0.25;
    if (f >= 0.5) return Math.min(seg + 1, N - 1);
  }
  return seg;
}

// ─────────────────────────────────────────────
// PIPE SVG
// Horizontal lines are evenly distributed across card height:
//   line[0] → card top border
//   line[1] → card 1/3 down
//   line[2] → card 2/3 down
//   line[3] → card bottom border
// All lines stop exactly at the card's left border edge.
// ─────────────────────────────────────────────
function PipeSystem({ scrollP, boxRefs, cardWrapRef, sectionRef }) {
  const [geo, setGeo] = useState(null);

  const measure = useCallback(() => {
    const section  = sectionRef.current;
    const cardWrap = cardWrapRef.current;
    if (!section || !cardWrap) return;
    if (boxRefs.current.some(b => !b)) return;

    const sRect = section.getBoundingClientRect();
    const kRect = cardWrap.getBoundingClientRect();

    const boxes = boxRefs.current.map(b => {
      const r = b.getBoundingClientRect();
      return {
        cx:    r.left + r.width  / 2 - sRect.left,
        cy:    r.top  + r.height / 2 - sRect.top,
        right: r.right  - sRect.left,
        top:   r.top    - sRect.top,
        bot:   r.bottom - sRect.top,
      };
    });

    const cardTop    = kRect.top    - sRect.top;
    const cardBot    = kRect.bottom - sRect.top;
    const cardLeft   = kRect.left   - sRect.left;
    const cardHeight = cardBot - cardTop;

    // Evenly distribute 4 connection points across card height
    // index 0 → cardTop, index 3 → cardBot, 1 and 2 equally spaced between
    const cardYPoints = Array.from({ length: N }, (_, i) =>
      cardTop + (cardHeight / (N - 1)) * i
    );

    setGeo({ boxes, cardLeft, cardTop, cardBot, cardHeight, cardYPoints });
  }, []);

  useEffect(() => {
    const t = setTimeout(measure, 80);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, [measure, scrollP]);

  if (!geo) return null;

  const { boxFill, hFill, vFill } = computeFills(scrollP);

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%', overflow: 'visible', zIndex: 15 }}
    >
      {/* ── Vertical lines between boxes ── */}
      {Array.from({ length: SEGS }).map((_, s) => {
        const x  = geo.boxes[s].cx;
        const y1 = geo.boxes[s].bot;
        const y2 = geo.boxes[s + 1].top;
        const h  = y2 - y1;
        return (
          <g key={`v-${s}`}>
            <line x1={x} y1={y1} x2={x} y2={y2} stroke="#d1d5db" strokeWidth="2" />
            <line x1={x} y1={y1} x2={x} y2={y1 + h * vFill[s]} stroke="#171717" strokeWidth="2" />
          </g>
        );
      })}

      {/* ── Horizontal lines: box right → card left border ──
           Each line connects at an evenly-distributed card y point.
           Line is drawn as: horizontal from box.right to cardLeft, at cardYPoints[i].
           A short vertical stub connects from box center-y to cardYPoints[i] if needed.
      ── */}
      {geo.boxes.map((b, i) => {
        const x1    = b.right;
        const x2    = geo.cardLeft;
        const lineY = geo.cardYPoints[i];   // where it hits the card
        const boxY  = b.cy;                 // box center y
        const w     = x2 - x1;

        // If box y and card y differ, we draw an L-shape:
        //   vertical segment from boxY down/up to lineY, then horizontal to card
        // This keeps the line anchored to the box AND hits card at equal spacing.
        const needsElbow = Math.abs(lineY - boxY) > 2;

        // Elbow x = midpoint between box right and card left
        const elbowX = x1 + w * 0.5;

        return (
          <g key={`h-${i}`}>
            {/* Grey track */}
            {needsElbow ? (
              <>
                <polyline
                  points={`${x1},${boxY} ${elbowX},${boxY} ${elbowX},${lineY} ${x2},${lineY}`}
                  fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="5 3"
                />
                {/* Black fill — animate along the polyline using strokeDashoffset */}
                <polyline
                  points={`${x1},${boxY} ${elbowX},${boxY} ${elbowX},${lineY} ${x2},${lineY}`}
                  fill="none" stroke="#171717" strokeWidth="1.5"
                  strokeDasharray={`${(w * 0.5 + Math.abs(lineY - boxY) + w * 0.5) * hFill[i]} 9999`}
                />
              </>
            ) : (
              <>
                <line x1={x1} y1={lineY} x2={x2} y2={lineY} stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="5 3" />
                <line x1={x1} y1={lineY} x2={x1 + w * hFill[i]} y2={lineY} stroke="#171717" strokeWidth="1.5" />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────
// DESKTOP
// ─────────────────────────────────────────────
function DesktopAchievements() {
  const sectionRef  = useRef(null);
  const boxRefs     = useRef([]);
  const cardWrapRef = useRef(null); // wraps the card — stable, not inside AnimatePresence

  const [scrollP,   setScrollP]   = useState(0);
  const [active,    setActive]    = useState(0);
  const [direction, setDirection] = useState(1);
  const prevActive = useRef(0);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start:   'top top',
        end:     `+=${N * 900}`,
        pin:     true,
        scrub:   0.8,          // smooth but responsive
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollP(p);

          const newActive = computeActive(p);
          if (newActive !== prevActive.current) {
            setDirection(newActive > prevActive.current ? 1 : -1);
            prevActive.current = newActive;
            setActive(newActive);
          }
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = (idx) => {
    const sts = ScrollTrigger.getAll();
    if (!sts.length) return;
    const st = sts[sts.length - 1];
    // Each achievement sits at idx/N fraction of scroll distance
    const target = st.start + (idx / SEGS) * (st.end - st.start);
    window.scrollTo({ top: Math.min(target, st.end), behavior: 'smooth' });
  };

  const { boxFill } = computeFills(scrollP);
  const ach = achievements[active];
  const BOX = 48;

  const cardVariants = {
    enter:  (d) => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit:   (d) => ({ x: d > 0 ? -48 : 48, opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }),
  };

  return (
    <div ref={sectionRef} className="relative w-full h-screen bg-white overflow-hidden font-sans">

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 select-none"
        style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* Watermark */}
      <div aria-hidden="true"
        className="pointer-events-none select-none absolute right-6 bottom-0 font-black leading-none text-neutral-900/[0.028] font-space-grotesk"
        style={{ fontSize: 'clamp(9rem, 18vw, 18rem)', lineHeight: 1 }}>
        {ach.index}
      </div>

      {/* ── Grid 36 / 64 ── */}
      <div className="relative z-10 h-full grid" style={{ gridTemplateColumns: '36% 64%' }}>

        {/* LEFT */}
        <div className="flex flex-col justify-between py-14 pl-16 xl:pl-24 pr-8 border-r border-neutral-100">

          {/* Heading */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-px bg-neutral-300" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neutral-400 font-space-grotesk">Recognition</span>
            </div>
            <h2 className="font-black text-neutral-900 leading-none tracking-tight font-space-grotesk"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3.6rem)' }}>
              ACHIEVE<br />MENTS
            </h2>
          </div>

          {/* Boxes */}
          <div className="flex flex-col items-start self-start ml-8">
            {achievements.map((_, i) => {
              const fill = boxFill[i];
              return (
                <React.Fragment key={i}>
                  <button
                    ref={(el) => (boxRefs.current[i] = el)}
                    onClick={() => goTo(i)}
                    aria-label={`Achievement ${i + 1}`}
                    className="relative cursor-pointer focus:outline-none group"
                    style={{ width: BOX, height: BOX }}
                  >
                    {/* Border */}
                    <div className="absolute inset-0 border-2 border-neutral-300 group-hover:border-neutral-500 transition-colors duration-200" />
                    {/* Liquid fill top→bottom */}
                    <div className="absolute top-0 left-0 right-0 bg-neutral-900" style={{ height: `${fill * 100}%` }} />
                    {/* Number */}
                    <span className="absolute inset-0 flex items-center justify-center text-base font-black font-space-grotesk leading-none select-none z-10"
                      style={{ color: fill > 0.5 ? '#ffffff' : '#9ca3af' }}>
                      {i + 1}
                    </span>
                  </button>
                  {/* Spacer — vertical line drawn by SVG */}
                  {i < N - 1 && <div style={{ height: 72 }} />}
                </React.Fragment>
              );
            })}
          </div>

          {/* Scroll hint */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-400" />
            </span>
            <span className="text-[10px] text-neutral-400 font-bold tracking-[0.25em] uppercase font-space-grotesk">Scroll to navigate</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-col justify-center pl-20 xl:pl-28 pr-16 xl:pr-24 py-14">

          {/* Counter */}
          <div className="absolute top-14 right-16 xl:right-24 flex items-baseline gap-1 font-space-grotesk select-none">
            <span className="text-3xl font-black text-neutral-900">{ach.index}</span>
            <span className="text-neutral-300 text-sm">/</span>
            <span className="text-neutral-300 text-sm">{String(N).padStart(2, '0')}</span>
          </div>

          {/* Stable wrapper measured by PipeSystem — outside AnimatePresence */}
          <div ref={cardWrapRef} className="relative z-20">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={active} custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit">
                <div className="border-2 border-neutral-900 bg-white relative overflow-hidden">

                  {/* Dark header */}
                  <div className="flex items-center justify-between px-8 py-4 bg-neutral-900">
                    <span className="text-[10px] font-bold tracking-[0.32em] uppercase text-neutral-400 font-space-grotesk">{ach.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 font-space-grotesk">{ach.year}</span>
                      <span className="w-px h-3 bg-neutral-700" />
                      <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 font-space-grotesk">{ach.tag}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-8 pt-8 pb-8 grid grid-cols-[1fr_auto] gap-10 items-start">
                    <div>
                      <h3 className="font-black text-neutral-900 leading-[1.05] tracking-tight font-space-grotesk whitespace-pre-line"
                        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>{ach.title}</h3>
                      <p className="mt-2.5 text-lg font-light italic text-neutral-400 font-cormorant leading-snug">{ach.subtitle}</p>
                      <div className="w-full h-px bg-neutral-100 my-5" />
                      <p className="text-neutral-500 text-sm leading-relaxed font-inter max-w-[44ch]">{ach.description}</p>
                    </div>
                    <div className="flex flex-col gap-6 min-w-[150px] pt-1">
                      {ach.metrics.map((m, i) => (
                        <div key={i} className="flex flex-col border-l-2 border-neutral-900 pl-4">
                          <span className="font-black text-neutral-900 font-space-grotesk leading-none text-3xl xl:text-4xl">{m.value}</span>
                          <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-neutral-400 font-space-grotesk">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-t-2 border-l-2 border-neutral-200 pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Pipe SVG — absolute on sectionRef, drawn last so on top */}
      <PipeSystem
        scrollP={scrollP}
        boxRefs={boxRefs}
        cardWrapRef={cardWrapRef}
        sectionRef={sectionRef}
      />

      {/* Progress bar */}
      <motion.div className="absolute bottom-0 left-0 h-[2px] bg-neutral-900 z-50"
        animate={{ width: `${((active + 1) / N) * 100}%` }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// MOBILE
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
    enter:  (d) => ({ x: d > 0 ? 52 : -52, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
    exit:   (d) => ({ x: d > 0 ? -52 : 52, opacity: 0, transition: { duration: 0.24, ease: [0.4, 0, 1, 1] } }),
  };
  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="px-5 sm:px-6 pt-14 pb-16 max-w-sm mx-auto flex flex-col">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-[10px] font-bold tracking-[0.38em] uppercase text-neutral-400 font-space-grotesk">Recognition</span>
          <span className="flex-1 h-px bg-neutral-100" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-300 font-space-grotesk">0{active + 1}&nbsp;/&nbsp;0{N}</span>
        </div>
        <h2 className="font-black text-neutral-900 leading-[1.0] tracking-tight font-space-grotesk mb-10"
          style={{ fontSize: 'clamp(2.6rem, 12vw, 3.8rem)' }}>
          ACHIEVE<br />MENTS
        </h2>
        {/* Number boxes */}
        <div className="relative mb-0">
          <div className="absolute top-5 left-0 right-0 h-px bg-neutral-200 z-0" />
          <div className="relative z-10 flex items-start justify-between">
            {achievements.map((_, i) => {
              const isActive = i === active;
              return (
                <div key={i} className="flex flex-col items-center">
                  <button onClick={() => handleSelect(i)} aria-label={`Achievement ${i + 1}`} className="cursor-pointer focus:outline-none">
                    <motion.div
                      animate={isActive ? { backgroundColor: '#171717', borderColor: '#171717' } : { backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}
                      transition={{ duration: 0.22 }}
                      className="w-10 h-10 border-2 flex items-center justify-center"
                    >
                      <motion.span animate={{ color: isActive ? '#ffffff' : '#9ca3af' }} transition={{ duration: 0.22 }}
                        className="text-sm font-black font-space-grotesk leading-none select-none">{i + 1}</motion.span>
                    </motion.div>
                  </button>
                  <div className="w-px h-6 bg-neutral-200 overflow-hidden relative">
                    <motion.div className="absolute top-0 left-0 right-0 bg-neutral-800"
                      animate={{ height: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Card */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={active} custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit">
              <div className="border-2 border-neutral-900 bg-white relative overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400 font-space-grotesk">{ach.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 font-space-grotesk">{ach.year}</span>
                    <span className="w-px h-3 bg-neutral-700" />
                    <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 font-space-grotesk">{ach.tag}</span>
                  </div>
                </div>
                <div className="px-5 pt-6 pb-5">
                  <h3 className="font-black text-neutral-900 leading-[1.05] tracking-tight font-space-grotesk whitespace-pre-line"
                    style={{ fontSize: 'clamp(1.75rem, 7.5vw, 2.4rem)' }}>{ach.title}</h3>
                  <p className="mt-2 text-sm font-light italic text-neutral-400 font-cormorant leading-snug">{ach.subtitle}</p>
                  <div className="w-full h-px bg-neutral-100 my-5" />
                  <p className="text-neutral-500 text-sm leading-relaxed font-inter">{ach.description}</p>
                  <div className="mt-6 grid grid-cols-3 divide-x divide-neutral-100 border border-neutral-100">
                    {ach.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col items-center justify-center py-4 px-2 text-center">
                        <span className="font-black text-neutral-900 font-space-grotesk leading-none text-2xl">{m.value}</span>
                        <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400 font-space-grotesk leading-tight">{m.label}</span>
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
          <button onClick={() => handleSelect(Math.max(0, active - 1))} disabled={active === 0}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 font-space-grotesk disabled:opacity-20 cursor-pointer transition-opacity">
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5"/></svg>
            Prev
          </button>
          <div className="flex items-center gap-1.5">
            {achievements.map((_, i) => (
              <motion.button key={i} onClick={() => handleSelect(i)}
                animate={{ width: i === active ? 20 : 6, backgroundColor: i === active ? '#171717' : '#d1d5db' }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="h-1.5 rounded-full cursor-pointer" aria-label={`Go to ${i + 1}`} />
            ))}
          </div>
          <button onClick={() => handleSelect(Math.min(N - 1, active + 1))} disabled={active === N - 1}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 font-space-grotesk disabled:opacity-20 cursor-pointer transition-opacity">
            Next
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
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
      <div className="hidden lg:block"><DesktopAchievements /></div>
      <div className="lg:hidden"><MobileAchievements /></div>
    </>
  );
}
