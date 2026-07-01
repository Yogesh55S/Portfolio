const fs = require('fs');
const file = 'src/app/about/page.js';

const correctContent = `
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';

/* ─── COMICS DATA DEFINITION ────────────────────────────────── */

const COMICS_DATA = [
  {
    id: 'first-commit',
    title: 'The First Commit',
    background: '#e8f5e9', // Light green
    themeColor: '#2e7d32',
    isSpreads: true,
    images: [
      '/used/1.png', // Cover (Portrait)
      '/used/2.png', // Spread 1
      '/used/3.png', // Spread 2
      '/used/4.png', // Spread 3
      '/used/5.png', // Spread 4
      '/used/6.png', // Spread 5
      '/used/7.png', // Spread 6
    ],
  }
];

/* ─── shared helpers ────────────────────────────────────────── */

function Halftone({ color = '#000', opacity = 0.06, size = 12 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: \`radial-gradient(\${color} 1px, transparent 1px)\`,
      backgroundSize: \`\${size}px \${size}px\`, opacity, zIndex: 0
    }} />
  );
}

function PageImage({ src, borderSide = 'none', isSpread = false, spreadSide = 'none' }) {
  let borderRadius = '2px';
  if (borderSide === 'left') borderRadius = '10px 2px 2px 10px';
  if (borderSide === 'right') borderRadius = '2px 10px 10px 2px';

  let bgPosition = 'center';
  if (isSpread) {
    bgPosition = spreadSide === 'left' ? 'left center' : 'right center';
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius, background: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: \`url(\${src})\`,
        backgroundSize: isSpread ? '200% 100%' : 'cover',
        backgroundPosition: bgPosition,
        backgroundRepeat: 'no-repeat',
      }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15)', pointerEvents: 'none' }} />
      <Halftone color="rgba(0,0,0,0.4)" opacity={0.03} size={8} />
    </div>
  );
}

function BackCoverPage({ title }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      border: '4px solid #111', borderRight: '2px solid #111',
      background: '#1a1a2e',
      color: '#ffd60a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Halftone color="rgba(255,214,10,0.6)" opacity={0.06} size={14} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,214,10,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 16 }}>
        <div style={{ fontFamily: 'Impact, sans-serif', fontSize: 'clamp(20px, 4vw, 36px)', textShadow: '2px 2px 0 #e63946', textTransform: 'uppercase', lineHeight: 1.1 }}>
          THE END
        </div>
        <div style={{ fontFamily: "'Edo', Impact, sans-serif", fontSize: 16, letterSpacing: 2, color: '#00f5d4', marginTop: 12, textTransform: 'uppercase' }}>
          {title}
        </div>
        <div style={{ marginTop: 16, width: 30, height: 2, background: '#ffd60a', margin: '0 auto' }} />
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 12, letterSpacing: 1 }}>
          YOGESH KUMAR CHRONICLES
        </div>
      </div>
    </div>
  );
}

/* ─── BOOK COMPONENT ────────────────────────────────────────── */

function Book({ images, title, setCardRef, isSpreads }) {
  if (isSpreads) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* SPINE */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: 'calc(50% - 3px)', width: 6,
          background: 'linear-gradient(180deg, #2a2a2a, #111, #2a2a2a)',
          zIndex: 60,
          boxShadow: '-4px 0 12px rgba(0,0,0,0.6), 4px 0 12px rgba(0,0,0,0.6)',
        }} />

        {/* CARD 6 */}
        <div ref={el => setCardRef(6, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
            <PageImage src={images[6]} borderSide="left" isSpread spreadSide="right" />
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
            <BackCoverPage title={title} />
          </div>
        </div>

        {/* CARD 5 */}
        <div ref={el => setCardRef(5, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
            <PageImage src={images[5]} borderSide="left" isSpread spreadSide="right" />
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
            <PageImage src={images[6]} borderSide="right" isSpread spreadSide="left" />
          </div>
        </div>

        {/* CARD 4 */}
        <div ref={el => setCardRef(4, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
            <PageImage src={images[4]} borderSide="left" isSpread spreadSide="right" />
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
            <PageImage src={images[5]} borderSide="right" isSpread spreadSide="left" />
          </div>
        </div>

        {/* CARD 3 */}
        <div ref={el => setCardRef(3, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
            <PageImage src={images[3]} borderSide="left" isSpread spreadSide="right" />
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
            <PageImage src={images[4]} borderSide="right" isSpread spreadSide="left" />
          </div>
        </div>

        {/* CARD 2 */}
        <div ref={el => setCardRef(2, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
            <PageImage src={images[2]} borderSide="left" isSpread spreadSide="right" />
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
            <PageImage src={images[3]} borderSide="right" isSpread spreadSide="left" />
          </div>
        </div>

        {/* CARD 1 */}
        <div ref={el => setCardRef(1, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
            <PageImage src={images[1]} borderSide="left" isSpread spreadSide="right" />
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
            <PageImage src={images[2]} borderSide="right" isSpread spreadSide="left" />
          </div>
        </div>

        {/* CARD 0 */}
        <div ref={el => setCardRef(0, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
            <PageImage src={images[0]} borderSide="left" />
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
            <PageImage src={images[1]} borderSide="right" isSpread spreadSide="left" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* SPINE */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: 'calc(50% - 3px)', width: 6,
        background: 'linear-gradient(180deg, #2a2a2a, #111, #2a2a2a)',
        zIndex: 60,
        boxShadow: '-4px 0 12px rgba(0,0,0,0.6), 4px 0 12px rgba(0,0,0,0.6)',
      }} />

      {/* CARD 2 */}
      <div ref={el => setCardRef(2, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
          <PageImage src={images[4]} borderSide="left" />
        </div>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
          <BackCoverPage title={title} />
        </div>
      </div>

      {/* CARD 1 */}
      <div ref={el => setCardRef(1, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
          <PageImage src={images[2]} borderSide="left" />
        </div>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
          <PageImage src={images[3]} borderSide="right" />
        </div>
      </div>

      {/* CARD 0 */}
      <div ref={el => setCardRef(0, el)} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', transformStyle: 'preserve-3d', transformOrigin: 'left center' }}>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
          <PageImage src={images[0]} borderSide="left" />
        </div>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', transform: 'rotateY(180deg)' }}>
          <PageImage src={images[1]} borderSide="right" />
        </div>
      </div>
    </div>
  );
}


/* ─── MAIN PAGE ─────────────────────────────────────────────── */

export default function AboutPage() {
  const mainWrapRef = useRef(null);
  const aboutTextRef = useRef(null);
  const bookContainerRef = useRef(null);
  const bookExtrasRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentSpread, setCurrentSpread] = useState(0);

  const comic = COMICS_DATA[0];

  const setCardRef = (cardIdx, el) => {
    cardRefs.current[cardIdx] = el;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean);
    if (!cards || !cards.length) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainWrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate(self) {
            const p = self.progress;
            const introThreshold = 1 / 9;

            let s = 0;
            if (p < introThreshold) {
              s = 0;
            } else {
              const flipP = (p - introThreshold) / (1 - introThreshold);
              const numCards = cards.length;
              const cardThreshold = 1 / numCards;
              if (flipP >= 0.98) {
                s = numCards;
              } else {
                s = Math.floor(flipP / cardThreshold);
              }
            }
            setCurrentSpread(s);
          }
        }
      });

      const introDuration = 1;
      
      tl.to(aboutTextRef.current, {
        opacity: 0,
        y: -100,
        scale: 0.9,
        duration: introDuration,
        ease: 'power2.inOut'
      }, 0);

      tl.to(bookContainerRef.current, {
        scale: 1,
        y: 0,
        duration: introDuration,
        ease: 'power2.inOut'
      }, 0);

      tl.to(bookExtrasRef.current, {
        opacity: 1,
        duration: introDuration,
        ease: 'power2.inOut'
      }, 0);

      const flipDuration = 8;
      cards.forEach((card, index) => {
        tl.set(card, { zIndex: 20 - index }, 0);
      });

      cards.forEach((card, index) => {
        const startTime = introDuration + (index * (flipDuration / cards.length));
        
        tl.to(card, {
          rotateY: -180,
          ease: 'none',
          duration: flipDuration / cards.length
        }, startTime);

        tl.set(card, { zIndex: index + 1 }, startTime + (flipDuration / cards.length / 2));
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <main style={{
      background: comic.background,
      color: '#111',
      minHeight: '100vh',
    }}>
      <style>{\`
        .desktop-view { display: block; }
        .mobile-view { display: none; }
        @media (max-width: 768px) {
          .desktop-view { display: none !important; }
          .mobile-view { display: block !important; }
        }
      \`}</style>
      <Navbar />

      <div className="desktop-view" ref={mainWrapRef} style={{ height: '900vh', position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div ref={aboutTextRef} style={{
            display: 'flex', gap: '24px', justifyContent: 'center',
            fontFamily: 'Impact, "Arial Black", sans-serif', 
            fontSize: 'clamp(60px, 15vw, 180px)',
            letterSpacing: '-2px',
            textTransform: 'uppercase',
            backgroundImage: 'url(/used/1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: 'saturate(1.4) contrast(1.1)',
            position: 'absolute',
            top: '20vh',
            zIndex: 10,
          }}>
            <span>ABOUT</span>
            <span>ME</span>
          </div>

          <div ref={bookContainerRef} style={{
            position: 'absolute',
            width: 'min(90vw, 900px)',
            height: 'min(80vh, 620px)',
            perspective: '2200px',
            zIndex: 20,
            transform: 'scale(0.35) translateY(120vh)', 
          }}>
             <Book
                images={comic.images}
                title={comic.title}
                isSpreads={comic.isSpreads}
                setCardRef={setCardRef}
             />
          </div>
          
          <div ref={bookExtrasRef} style={{ opacity: 0, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
            <div style={{
              position: 'absolute', top: 40, width: '100%',
              fontFamily: "'Edo', Impact, sans-serif", fontSize: 'clamp(32px, 7vw, 60px)',
              letterSpacing: 2, textTransform: 'uppercase', color: comic.themeColor,
              textAlign: 'center', textShadow: '1px 1px 0 rgba(255,255,255,0.8)',
            }}>
              {comic.title}
            </div>

            <div style={{
              position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{
                  height: 5, width: i === currentSpread ? 18 : 5, borderRadius: 3,
                  background: i === currentSpread ? comic.themeColor : 'rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>

            <div style={{
              position: 'absolute', top: 100, right: 'max(20px, 4%)',
              fontFamily: 'Impact, sans-serif', fontSize: 9, letterSpacing: 3,
              color: 'rgba(0,0,0,0.18)', textTransform: 'uppercase',
            }}>
              {currentSpread + 1} / 8
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-view" style={{ width: '100%', minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px' }}>
         <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'flex', gap: '12px', justifyContent: 'center',
              fontFamily: 'Impact, "Arial Black", sans-serif', 
              fontSize: 'clamp(40px, 12vw, 80px)',
              letterSpacing: '-1px', textTransform: 'uppercase',
              backgroundImage: 'url(/used/1.png)', backgroundSize: 'cover', backgroundPosition: 'center',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              filter: 'saturate(1.4) contrast(1.1)',
            }}>
              <span>ABOUT</span>
              <span>ME</span>
            </div>
            <div style={{
              fontFamily: "'Edo', Impact, sans-serif", fontSize: 'clamp(28px, 8vw, 40px)',
              letterSpacing: 2, textTransform: 'uppercase', color: comic.themeColor,
              marginTop: 16
            }}>
              {comic.title}
            </div>
         </div>

         <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', margin: '0 auto', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
            {comic.images.map((src, i) => (
              <img key={i} src={src} style={{ width: '100%', height: 'auto', display: 'block' }} alt={'Page ' + (i+1)} />
            ))}
            <div style={{
              background: '#1a1a2e', padding: '40px 20px', textAlign: 'center',
              borderBottom: '4px solid #111', borderLeft: '4px solid #111', borderRight: '4px solid #111'
            }}>
              <div style={{ fontFamily: 'Impact, sans-serif', fontSize: 24, textShadow: '2px 2px 0 #e63946', color: '#ffd60a' }}>THE END</div>
              <div style={{ fontFamily: "'Edo', Impact, sans-serif", fontSize: 20, color: '#00f5d4', marginTop: 12 }}>{comic.title}</div>
            </div>
         </div>
      </div>

      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: '#fafafa',
        borderTop: '4px solid #111',
      }}>
        <Halftone color="#000" opacity={0.03} size={12} />
        <div style={{ textAlign: 'center', padding: 24, zIndex: 10 }}>
          <h2 style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: 'clamp(28px, 6vw, 54px)',
            color: '#1a1a2e',
            textShadow: '3px 3px 0 #ffd60a, 5px 5px 0 #111',
            WebkitTextStroke: '1.5px #111',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 20
          }}>
            THANKS FOR READING!
          </h2>
          <p style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: 'clamp(11px, 2.5vw, 15px)',
            color: '#555',
            maxWidth: 500,
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            My full-stack journey continues with every new code commit.
          </p>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: 14,
              letterSpacing: 2,
              textDecoration: 'none',
              textTransform: 'uppercase',
              border: '3px solid #111',
              padding: '12px 28px',
              boxShadow: '4px 4px 0 #111',
              background: '#ffd60a',
              color: '#111',
              display: 'inline-block',
              transition: 'transform 0.1s ease',
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(2px, 2px)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
          >
            Back to Cover
          </a>
        </div>
      </div>
    </main>
  );
}
`

fs.writeFileSync(file, correctContent.trim());
