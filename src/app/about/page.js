'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from '@/components/Navbar';

/* ─── REGISTER GSAP PLUGINS ─────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ─── SHARED HELPERS ─────────────────────────────────────────── */

function Halftone({ color = '#000', opacity = 0.06, size = 12, className = '' }) {
  return (
    <div
      className={`halftone-texture ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        zIndex: 0,
      }}
    />
  );
}

/* ─── SECTION WRAPPER ────────────────────────────────────────── */

function Section({ id, bg = 'paper', children, style = {}, className = '' }) {
  const isDark = bg === 'night';
  return (
    <section
      id={id}
      className={className}
      style={{
        position: 'relative',
        background: isDark ? 'var(--night)' : 'var(--paper)',
        color: isDark ? '#E8F5E9' : 'var(--ink)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <Halftone
        color={isDark ? 'rgba(232,245,233,0.4)' : 'rgba(0,0,0,0.4)'}
        opacity={0.03}
        size={isDark ? 14 : 12}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '96px 64px',
        }}
        className="section-inner"
      >
        {children}
      </div>
    </section>
  );
}

/* ─── SECTION TITLE ──────────────────────────────────────────── */

function SectionTitle({ children, color = 'var(--ink)', align = 'left' }) {
  return (
    <h2
      className="panel-reveal"
      style={{
        fontFamily: "'Edo', Impact, sans-serif",
        fontSize: 'clamp(32px, 6vw, 56px)',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color,
        textAlign: align,
        margin: 0,
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );
}

/* ─── SKILL TAG ──────────────────────────────────────────────── */

function SkillTag({ children }) {
  return (
    <span
      className="skill-tag"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(11px, 1.4vw, 13px)',
        padding: '8px 16px',
        border: '2px solid var(--ink)',
        borderRadius: 4,
        background: 'rgba(255,255,255,0.6)',
        color: 'var(--ink)',
        display: 'inline-block',
        cursor: 'default',
        position: 'relative',
        top: 0,
        left: 0,
        transition: 'top 0.15s ease, left 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
        boxShadow: '3px 3px 0 var(--ink)',
        letterSpacing: '0.5px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.top = '-1px';
        e.currentTarget.style.left = '-1px';
        e.currentTarget.style.boxShadow = '4px 4px 0 var(--ink)';
        e.currentTarget.style.background = 'var(--pop-yellow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.top = '0';
        e.currentTarget.style.left = '0';
        e.currentTarget.style.boxShadow = '3px 3px 0 var(--ink)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
      }}
    >
      {children}
    </span>
  );
}

/* ─── SCROLL PROGRESS DOTS ───────────────────────────────────── */

function ScrollDots({ activeIndex, total }) {
  return (
    <div
      className="scroll-dots"
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        zIndex: 100,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            border: '2px solid var(--forest)',
            background: i === activeIndex ? 'var(--pop-yellow)' : 'transparent',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onClick={() => {
            const section = document.getElementById(`kp-section-${i}`);
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      ))}
    </div>
  );
}

/* ─── DATA ───────────────────────────────────────────────────── */

const SKILL_GROUPS = [
  {
    label: '// frontend',
    skills: ['React Native', 'Next.js', 'React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind'],
  },
  {
    label: '// backend & cloud',
    skills: ['Node.js', 'AWS Lambda', 'API Gateway', 'Supabase', 'Firebase', 'MongoDB', 'PostgreSQL'],
  },
  {
    label: '// integrations & tools',
    skills: ['GetStream', 'Cashfree', 'Stripe', 'Shopify', 'Git', 'Figma', 'GSAP'],
  },
];

const COMIC_PAGES = [2, 3, 4, 5, 6, 7, 8];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const [showMore, setShowMore] = useState(false);

  /* ─── GSAP ANIMATIONS ──────────────────────────────────────── */
  useGSAP(
    () => {
      if (showMore) {
        gsap.fromTo(
          '.comic-panel-extra',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
            onComplete: () => ScrollTrigger.refresh(),
          }
        );
      }
    },
    { scope: containerRef, dependencies: [showMore] }
  );

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(
          '.panel-reveal, .hero-name, .hero-role, .skill-tag, .comic-panel',
          { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }
        );
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 769px)',
          isMobile: '(max-width: 768px)',
        },
        (context) => {
          const { isDesktop } = context.conditions;

          /* ── Hero intro (plays on load) ───────────────────── */
          const introTl = gsap.timeline();
          introTl
            .from('.hero-name', {
              y: 100,
              opacity: 0,
              scale: 0.9,
              duration: 1,
              ease: 'power3.out',
              delay: 0.2,
            })
            .from(
              '.hero-role',
              { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' },
              '-=0.6'
            );

          /* ── Panel reveals (fromTo keeps "to" explicit so
               stale inline styles after navigation don't break it) */
          const panels = gsap.utils.toArray('.panel-reveal');
          panels.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 48, rotate: isDesktop ? -1.5 : -0.5 },
              {
                opacity: 1,
                y: 0,
                rotate: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });

          /* ── Comic panels staggered drop-in ──────────────── */
          gsap.set('.comic-panel', { opacity: 0, y: 70, scale: 0.97 });
          gsap.utils.toArray('.comic-panel').forEach((panel, i) => {
            gsap.fromTo(
              panel,
              { opacity: 0, y: 70, scale: 0.97 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse',
                },
                delay: i === 0 ? 0 : 0,
              }
            );
          });

          /* ── Skill tags batch stagger (fromTo so "to" is
               always explicit — safe after client-side nav) ── */
          gsap.set('.skill-tag', { opacity: 0, y: 30, scale: 0.9 });
          ScrollTrigger.batch('.skill-tag', {
            start: 'top 88%',
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
              ),
            onEnterBack: (batch) =>
              gsap.fromTo(
                batch,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
              ),
            onLeaveBack: (batch) =>
              gsap.to(batch, {
                opacity: 0,
                y: 30,
                scale: 0.9,
                duration: 0.3,
                stagger: 0.03,
              }),
          });

          /* ── Halftone parallax drift ────────────────────── */
          gsap.utils.toArray('.halftone-texture').forEach((tex) => {
            gsap.to(tex, {
              y: -60,
              ease: 'none',
              scrollTrigger: {
                trigger: tex.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });
          });

          /* ── Active section tracking for scroll dots ──────── */
          for (let i = 0; i < 6; i++) {
            const el = document.getElementById(`kp-section-${i}`);
            if (el) {
              ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveSection(i),
                onEnterBack: () => setActiveSection(i),
              });
            }
          }
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  /* ─── RENDER ───────────────────────────────────────────────── */
  return (
    <main ref={containerRef} style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <style>{`
        /* ── Responsive overrides ───────────────────────────── */
        @media (max-width: 768px) {
          .section-inner {
            padding: 64px 24px !important;
          }
          .scroll-dots {
            display: none !important;
          }
          .arsenal-group {
            flex-direction: column !important;
          }
          .origin-highlight {
            font-size: clamp(20px, 5vw, 28px) !important;
          }
          .hero-name {
             font-size: clamp(48px, 15vw, 80px) !important;
          }
          .comic-cover img {
            max-width: 88vw !important;
          }
        }

        /* ── Blink cursor animation ─────────────────────────── */
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }

        /* ── Focus states ───────────────────────────────────── */
        a:focus-visible, button:focus-visible, [tabindex="0"]:focus-visible {
          outline: 3px solid var(--pop-yellow);
          outline-offset: 3px;
          border-radius: 2px;
        }

        /* ── Scratch Text Effect ────────────────────────────── */
        .scratch-text {
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 2px 2px 0px rgba(255, 214, 10, 0.5), -1px -1px 0px rgba(255, 255, 255, 0.1);
        }

        /* ── Comic section ──────────────────────────────────── */
        .comic-panel img, .comic-panel-extra img {
          display: block;
          width: 100%;
          height: auto;
        }
        .comic-page-panel {
          border: 4px solid #fff;
          box-shadow: 8px 8px 0 rgba(255, 214, 10, 0.4);
          overflow: hidden;
          line-height: 0;
        }
        .comic-cover {
          display: flex;
          justify-content: center;
        }
        .comic-cover img {
          max-width: min(560px, 100%);
          border: 4px solid #fff;
          box-shadow: 10px 10px 0 var(--pop-yellow);
        }
        @keyframes comicPulse {
          0%, 100% { box-shadow: 10px 10px 0 var(--pop-yellow); }
          50%       { box-shadow: 10px 10px 0 rgba(255,214,10,0.5); }
        }
        .comic-cover img:hover {
          animation: comicPulse 1.6s ease-in-out infinite;
        }
      `}</style>

      <Navbar />
      <ScrollDots activeIndex={activeSection} total={6} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 0 — HERO (Cold Open)
          ═══════════════════════════════════════════════════════ */}
      <section
        id="kp-section-0"
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--paper)',
          overflow: 'hidden',
        }}
      >
        <Halftone color="rgba(0,0,0,0.4)" opacity={0.04} size={12} />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 24px' }}>
          <h1
            className="hero-name"
            style={{
              fontFamily: "'Edo', Impact, sans-serif",
              fontSize: 'clamp(64px, 12vw, 160px)',
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              lineHeight: 0.95,
              margin: 0,
              color: 'var(--ink)',
              textShadow: '6px 6px 0 var(--pop-yellow)',
            }}
          >
            Yogesh Kumar
          </h1>
          <div
            className="hero-role"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(14px, 2.5vw, 20px)',
              color: 'var(--forest)',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginTop: 24,
            }}
          >
            {'// full-stack developer'}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: 2,
              color: 'rgba(0,0,0,0.3)',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 32,
              background: 'linear-gradient(to bottom, var(--ink), transparent)',
              opacity: 0.3,
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — THE STORY (Comic Book Journey)
          ═══════════════════════════════════════════════════════ */}
      <section
        id="kp-section-1"
        style={{
          background: '#0d0d0d',
          position: 'relative',
          padding: 'clamp(56px, 8vw, 96px) 0',
        }}
      >
        {/* Subtle halftone on dark bg */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            opacity: 0.025,
            pointerEvents: 'none',
          }}
        />

        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 72px)',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: 'var(--pop-yellow)',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {'// origin story'}
          </div>
          <h2
            style={{
              fontFamily: "'Edo', Impact, sans-serif",
              fontSize: 'clamp(36px, 8vw, 80px)',
              textTransform: 'uppercase',
              color: '#fff',
              margin: 0,
              letterSpacing: 2,
              lineHeight: 1,
              textShadow: '5px 5px 0 var(--pop-yellow)',
            }}
          >
            The First Commit
          </h2>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(11px, 1.5vw, 14px)',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: 3,
              marginTop: 14,
              textTransform: 'uppercase',
            }}
          >
            Volume 1 &nbsp;·&nbsp; A Developer&apos;s Journey
          </div>
        </div>

        {/* Comic panels */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 clamp(16px, 4vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(18px, 2.5vw, 30px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Opening cover — 1.png (portrait) */}
          <div className="comic-panel comic-cover">
            <img src="/used/1.png" alt="The First Commit — Cover" />
          </div>

          {!showMore && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button
                onClick={() => setShowMore(true)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  color: 'var(--ink)',
                  background: 'var(--pop-yellow)',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  boxShadow: '4px 4px 0 rgba(255, 255, 255, 0.4)',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '4px 4px 0 rgba(255, 255, 255, 0.4)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0 rgba(255, 255, 255, 0.4)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 rgba(255, 255, 255, 0.5)';
                }}
              >
                Read the full comic
              </button>
            </div>
          )}

          {showMore && (
            <>
              {/* Chapter spreads — 2.png to 8.png (landscape) */}
              {COMIC_PAGES.map((n) => (
                <div key={n} className="comic-panel-extra comic-page-panel">
                  <img src={`/used/${n}.png`} alt={`Story — Page ${n}`} />
                </div>
              ))}

              {/* Closing cover — 9.png (portrait) */}
              <div className="comic-panel-extra comic-cover">
                <img src="/used/9.png" alt="The Next Commit — Closing Cover" />
              </div>
            </>
          )}
        </div>

        {/* Bottom divider */}
        <div
          style={{
            marginTop: 'clamp(48px, 6vw, 80px)',
            height: 4,
            background: 'linear-gradient(90deg, transparent, var(--pop-yellow), transparent)',
            opacity: 0.6,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — ORIGIN (The Pitch)
          ═══════════════════════════════════════════════════════ */}
      <Section 
        id="kp-section-2" 
        bg="night"
        style={{
          borderTop: '3px solid var(--pop-yellow)',
          borderBottom: '3px solid var(--pop-yellow)',
        }}
      >

        <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        

          <blockquote
            className="panel-reveal origin-highlight"
            style={{
              fontFamily: "'Edo', Impact, sans-serif",
              fontSize: 'clamp(40px, 8vw, 80px)',
              color: '#E8F5E9',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              margin: 0,
              padding: 0,
              position: 'relative',
              textAlign: 'center',
            }}
          >
            I build things that ship.
            <br />
            <span style={{ color: 'var(--pop-yellow)' }}>Not things that demo.</span>
          </blockquote>

        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — THE ARSENAL (Stack)
          ═══════════════════════════════════════════════════════ */}
      <Section id="kp-section-3" bg="paper">
        <SectionTitle color="var(--ink)">The Arsenal</SectionTitle>

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 40 }}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="panel-reveal">
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: 'var(--forest)',
                  letterSpacing: 1,
                  marginBottom: 16,
                }}
              >
                {group.label}
              </div>
              <div
                className="arsenal-group"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                {group.skills.map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — NOW BUILDING
          ═══════════════════════════════════════════════════════ */}
      <Section id="kp-section-4" bg="paper" style={{ minHeight: 'auto' }}>
        <div
          className="panel-reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 0',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(13px, 2vw, 18px)',
              color: 'var(--forest)',
              letterSpacing: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'rgba(0,0,0,0.04)',
              padding: '16px 32px',
              borderRadius: 8,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <span style={{ color: 'rgba(0,0,0,0.3)' }}>{'>'}</span>
            <span>{'// currently migrating client storefronts to Shopify'}</span>
            <span className="cursor-blink" style={{ color: 'var(--forest)', fontWeight: 700 }}>
              ▊
            </span>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — CTA / FOOTER
          ═══════════════════════════════════════════════════════ */}
      <Section id="kp-section-5" bg="night" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            className="panel-reveal"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(12px, 2vw, 16px)',
              color: 'var(--pop-yellow)',
              letterSpacing: 2,
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            it&apos;s just a start
          </div>
          <h2
            className="panel-reveal scratch-text"
            style={{
              fontFamily: "'Edo', Impact, sans-serif",
              fontSize: 'clamp(40px, 10vw, 96px)',
              textTransform: 'uppercase',
              letterSpacing: 2,
              lineHeight: 1.1,
              margin: '0 0 48px 0',
              fontWeight: 'normal',
              textDecoration: 'line-through',
              textDecorationColor: 'var(--pop-yellow)',
              textDecorationThickness: 'clamp(2px, 0.5vw, 4px)',
            }}
          >
            End of Issue
          </h2>

          <a
            className="panel-reveal"
            href="#"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              fontFamily: "'Edo', Impact, sans-serif",
              fontSize: 20,
              letterSpacing: 4,
              textDecoration: 'none',
              textTransform: 'uppercase',
              border: '3px solid var(--pop-yellow)',
              padding: '16px 40px',
              boxShadow: '6px 6px 0 var(--pop-yellow)',
              background: 'transparent',
              color: 'var(--pop-yellow)',
              display: 'inline-block',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease, background 0.15s ease, color 0.15s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--pop-yellow)';
              e.currentTarget.style.color = 'var(--ink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--pop-yellow)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '6px 6px 0 var(--pop-yellow)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translate(2px, 2px)';
              e.currentTarget.style.boxShadow = '4px 4px 0 var(--pop-yellow)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '6px 6px 0 var(--pop-yellow)';
            }}
          >
            Back to Cover
          </a>

          <div
            className="panel-reveal"
            style={{
              marginTop: 80,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: 'rgba(232, 245, 233, 0.25)',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Yogesh Kumar Chronicles · {new Date().getFullYear()}
          </div>
        </div>
      </Section>
    </main>
  );
}
