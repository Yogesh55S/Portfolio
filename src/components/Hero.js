"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Put these files in /public (you will add the actual images/GIFs):
 *  IMAGES:
 *   - /goku_base.png       // normal Goku (Developer)
 *   - /goku_ssj.png        // Super Saiyan (Frontend)
 *   - /goku_blue.png       // Super Saiyan Blue (Backend)
 *   - /goku_ui.png         // Ultra Instinct (Full-Stack)
 *
 *  BACKGROUND GIFs:
 *   - /bg_normal.gif       // subtle white/blue flow
 *   - /bg_ssj.gif          // golden aura
 *   - /bg_blue.gif         // deep blue aura
 *   - /bg_ui.gif           // silver/white cosmic aura
 */

const forms = [
  {
    key: "base",
    role: "Developer",
    image: "/goku_base.png",
    bg: "/bg_normal.gif",
    glowRing: "shadow-[0_0_38px_rgba(96,165,250,0.8)]",
  },
  {
    key: "ssj",
    role: "Frontend Developer",
    image: "/goku_ssj.png",
    bg: "/bg_ssj.gif",
    glowRing: "shadow-[0_0_42px_rgba(251,191,36,0.95)]",
  },
  {
    key: "ssb",
    role: "Backend Developer",
    image: "/goku_blue.png",
    bg: "/bg_blue.gif",
    glowRing: "shadow-[0_0_45px_rgba(59,130,246,0.95)]",
  },
  {
    key: "ui",
    role: "Full-Stack Developer",
    image: "/goku.png",
    bg: "/bg_ui.gif",
    glowRing: "shadow-[0_0_50px_rgba(226,232,240,1)]",
  },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const current = forms[idx];

  // Preload images & GIFs for ultra-smooth transitions
  useEffect(() => {
    forms.forEach((f) => {
      const a = new window.Image();
      a.src = f.image;
      const b = new window.Image();
      b.src = f.bg;
    });
  }, []);

  // toggle form (click/Space/Enter)
  const nextForm = () => setIdx((i) => (i + 1) % forms.length);
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        nextForm();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // animations
  const fade = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
  };
  const text = {
    initial: { opacity: 0, y: 18, filter: "blur(6px)" },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -18,
      filter: "blur(6px)",
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };
  const img = {
    initial: { opacity: 0, scale: 0.96, rotate: 0.5 },
    enter: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      rotate: -0.5,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Background GIF cross-fade */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.bg}
            variants={fade}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${current.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.75) saturate(1.1)",
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="mx-auto flex w-11/12 max-w-7xl flex-col-reverse items-center justify-between gap-10 md:flex-row">
        {/* Left: Text */}
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current.key}`}
              variants={text}
              initial="initial"
              animate="enter"
              exit="exit"
              className="text-4xl font-extrabold md:text-6xl"
            >
              Hi, I&apos;m{" "}
              <span className="text-blue-400 drop-shadow-[0_0_12px_#60a5fa]">
                Yogesh Kumar
              </span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`role-${current.key}`}
              variants={text}
              initial="initial"
              animate="enter"
              exit="exit"
              className="mt-4 text-xl text-gray-200 md:text-2xl"
            >
              {current.role}
            </motion.p>
          </AnimatePresence>

          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Right: Goku (click to transform) */}
        <button
          onClick={nextForm}
          className="group relative isolate outline-none"
          aria-label="Transform character"
          title="Click to Transform (or press Space/Enter)"
        >
          {/* dynamic glow */}
          <div
            className={`absolute -inset-7 -z-10 rounded-full blur-2xl opacity-80 transition group-hover:opacity-100 ${current.glowRing}`}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.image}
              variants={img}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Image
                src={current.image}
                alt={`${current.role} form`}
                width={520}
                height={520}
                priority
                className="pointer-events-none select-none"
              />
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-300/80">
        Click the character (or press Space/Enter) to transform
      </div>
    </section>
  );
}
