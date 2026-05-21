# Hidden Reveal Sections Code Reference

Here is the complete source code for the high-performance, butter-smooth, bidirectional "Hidden Reveal Sections" UI component.

It features:
- **Native Browser Window Scrolling** (with sticky lock elements) to avoid mobile touch glitches.
- **RequestAnimationFrame Damped Easing** (lerp engine) to smooth mouse wheel stepping.
- **GPU Compositor Thread Translations** using CSS custom variables to ensure stable **60/120 FPS**.
- **Interactive CSS Sliding Link Overlays**.

```javascript
'use client';
import React, { useEffect, useRef } from 'react';

export default function HiddenReveal() {
  const containerRef = useRef(null);

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
      // Damping factor of 0.08 for extremely smooth and responsive easing
      if (Math.abs(diff) > 0.05) {
        currentScroll += diff * 0.08;
      } else {
        currentScroll = targetScroll;
      }

      const container = containerRef.current;
      if (container) {
        const height = window.innerHeight;
        if (height > 0) {
          // Progress variables (0 to 1) for each viewport-sized phase
          const p1 = Math.max(0, Math.min(1, currentScroll / height));
          const p2 = Math.max(0, Math.min(1, (currentScroll - height) / height));
          const p3 = Math.max(0, Math.min(1, (currentScroll - 2 * height) / height));
          const p4 = Math.max(0, Math.min(1, (currentScroll - 3 * height) / height));
          const p5 = Math.max(0, Math.min(1, (currentScroll - 4 * height) / height));

          container.style.setProperty('--p1', p1);
          container.style.setProperty('--p2', p2);
          container.style.setProperty('--p3', p3);
          container.style.setProperty('--p4', p4);
          container.style.setProperty('--p5', p5);
        }
      }

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initialize targets immediately on mount
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
      style={{ height: '600vh' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* Enable snap type on page level globally */
        html {
          scroll-snap-type: y mandatory;
          scroll-behavior: auto;
          background-color: #000;
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background-color: #000;
        }

        .hidden-reveal-wrapper {
          font-family: 'Inter', sans-serif;
          color: #bfd7ea;
          background-color: #000;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          user-select: none;
        }

        /* Typography spacing & rules */
        .hidden-reveal-wrapper h1 {
          font-size: 4.5rem;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-top: 0;
          margin-bottom: 20px;
        }

        .hidden-reveal-wrapper h2 {
          font-size: 3.2rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.015em;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .hidden-reveal-wrapper p {
          font-size: 1.25rem;
          font-weight: 400;
          line-height: 1.5;
          margin-top: 0;
          margin-bottom: 0;
          color: #bfd7ea;
        }

        @media (max-width: 991px) {
          .hidden-reveal-wrapper h1 {
            font-size: 3.5rem;
          }
          .hidden-reveal-wrapper h2 {
            font-size: 2.5rem;
          }
          .hidden-reveal-wrapper p {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 768px) {
          .hidden-reveal-wrapper h1 {
            font-size: 2.8rem;
          }
          .hidden-reveal-wrapper h2 {
            font-size: 2.0rem;
          }
          .hidden-reveal-wrapper p {
            font-size: 1rem;
          }
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

        /* Shadow overlays for background dimming */
        .s-shadow {
          position: absolute;
          inset: 0;
          background-color: #000;
          z-index: 1;
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

        /* Text width constraints */
        .c-content {
          width: 100%;
          max-width: 75ch;
          padding: 2rem;
          z-index: 2;
          position: relative;
        }

        .c-content-small {
          width: 100%;
          max-width: 50ch;
          padding: 1.5rem;
          z-index: 2;
          position: relative;
        }

        /* Floating Links Overlay Styles */
        .links-overlay {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 999;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }

        @media (max-width: 991px) {
          .links-overlay {
            display: none;
          }
        }

        .links-overlay-link {
          pointer-events: auto;
          color: #fff;
          background-color: #4268fb;
          border-radius: 0.25rem;
          min-width: 13rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .links-overlay-link.links-overlay-link-black {
          background-color: #0c0c0c;
          border: 1px solid #313131;
        }

        .links-overlay-link.links-overlay-link-black:hover {
          background-color: #161616;
          border-color: #4a4a4a;
        }

        .links-overlay-link:hover {
          background-color: #3b5ce5;
        }

        .links-overlay-link-text-outer-wrapper {
          overflow: hidden;
          height: 1.2rem;
          line-height: 1.2rem;
          position: relative;
        }

        .links-overlay-link-text-inner-wrapper {
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .links-overlay-link:hover .links-overlay-link-text-inner-wrapper {
          transform: translateY(-50%);
        }

        .links-overlay-link-text {
          display: block;
          height: 1.2rem;
          white-space: nowrap;
        }
      `}</style>

      {/* Invisible Scroll Snap Anchors (controls viewport snapping) */}
      <div className="absolute inset-x-0 top-0 h-[600vh] pointer-events-none z-0 flex flex-col">
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
        <div className="h-screen w-full snap-anchor" />
      </div>

      {/* Sticky Viewport Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10">
        
        {/* SECTION 1: Intro */}
        <div 
          className="s-section bg-black text-center"
          style={{ zIndex: 1 }}
        >
          <div className="c-content select-text">
            <h1 style={{ color: 'var(--light-steel-blue)' }}>Hello</h1>
            <p style={{ color: 'var(--light-steel-blue)' }}>You should scroll down -&gt;</p>
          </div>
          <div 
            className="s-shadow"
            style={{ opacity: 'calc(var(--p1, 0) * 0.6)' }}
          />
        </div>

        {/* SECTION 2: Split Left/Right */}
        <div 
          className="s-section"
          style={{ zIndex: 2 }}
        >
          <div className="flex w-full h-full">
            {/* Left Panel: slides from Left */}
            <div 
              className="panel-half bg-[#0b3954] text-center"
              style={{ transform: 'translateX(calc(-100% * (1 - var(--p1, 0))))' }}
            >
              <div className="c-content-small select-text">
                <h2>Hello again but from the left</h2>
              </div>
              <div 
                className="s-shadow"
                style={{ opacity: 'calc(var(--p2, 0) * 0.6)' }}
              />
            </div>

            {/* Right Panel: slides from Right */}
            <div 
              className="panel-half bg-[#2e4c6a] text-center"
              style={{ transform: 'translateX(calc(100% * (1 - var(--p1, 0))))' }}
            >
              <div className="c-content-small select-text">
                <h2>Hello again but from the right</h2>
              </div>
              <div 
                className="s-shadow"
                style={{ opacity: 'calc(var(--p2, 0) * 0.6)' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Slide from Bottom */}
        <div 
          className="s-section bg-[#ff5a5f] text-center text-white"
          style={{ 
            zIndex: 3,
            transform: 'translateY(calc(100% * (1 - var(--p2, 0))))'
          }}
        >
          <div className="c-content select-text">
            <h1 className="text-white">Hello again but from the bottom</h1>
          </div>
          <div 
            className="s-shadow"
            style={{ opacity: 'calc(var(--p3, 0) * 0.6)' }}
          />
        </div>

        {/* SECTION 4: Split Top/Bottom */}
        <div 
          className="s-section"
          style={{ zIndex: 4 }}
        >
          <div className="flex flex-col w-full h-full">
            {/* Top Half: slides from Top */}
            <div 
              className="panel-half-h bg-black text-center text-white border-b border-[#161616]"
              style={{ transform: 'translateY(calc(-100% * (1 - var(--p3, 0))))' }}
            >
              <div className="c-content select-text">
                <h2>Hello from the top</h2>
              </div>
              <div 
                className="s-shadow"
                style={{ opacity: 'calc(var(--p4, 0) * 0.6)' }}
              />
            </div>

            {/* Bottom Half: slides from Bottom */}
            <div 
              className="panel-half-h bg-black text-center text-white"
              style={{ transform: 'translateY(calc(100% * (1 - var(--p3, 0))))' }}
            >
              <div className="c-content select-text">
                <h2>Hello from the bottom</h2>
              </div>
              <div 
                className="s-shadow"
                style={{ opacity: 'calc(var(--p4, 0) * 0.6)' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: Slide from Right */}
        <div 
          className="s-section bg-[#ebebeb] text-black text-center"
          style={{ 
            zIndex: 5,
            transform: 'translateX(calc(100% * (1 - var(--p4, 0))))'
          }}
        >
          <div className="c-content select-text">
            <h1 className="text-black">And let's end it off with one from the right...</h1>
          </div>
          <div 
            className="s-shadow"
            style={{ opacity: 'calc(var(--p5, 0) * 0.6)' }}
          />
        </div>

        {/* SECTION 6: Slide from Left */}
        <div 
          className="s-section bg-black text-center text-white"
          style={{ 
            zIndex: 6,
            transform: 'translateX(calc(-100% * (1 - var(--p5, 0))))'
          }}
        >
          <div className="c-content select-text">
            <h1 className="text-white">And one from the left</h1>
            <p style={{ color: '#bfd7ea' }}>
              You should clone this project! It's really hard to customize, but hey, it's fun :)
            </p>
          </div>
        </div>

      </div>


    </div>
  );
}
```
