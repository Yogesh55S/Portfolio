const fs = require('fs');
const file = 'src/app/about/page.js';
let content = fs.readFileSync(file, 'utf8');

const newAboutPage = `
/* ─── MAIN PAGE ─────────────────────────────────────────────── */

export default function AboutPage() {
  const mainWrapRef = useRef(null);
  const bookContainerRef = useRef(null);
  const bookExtrasRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [selectedMobileComic, setSelectedMobileComic] = useState(null);

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
      const flipDuration = 8;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainWrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate(self) {
            const p = self.progress;
            const numCards = cards.length;
            const cardThreshold = 1 / numCards;
            let s = 0;
            if (p >= 0.98) {
              s = numCards;
            } else {
              s = Math.floor(p / cardThreshold);
            }
            setCurrentSpread(s);
          }
        }
      });

      cards.forEach((card, index) => {
        tl.set(card, { zIndex: 20 - index }, 0);
      });

      cards.forEach((card, index) => {
        const startTime = index * (flipDuration / cards.length);
        
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
        body {
          \${selectedMobileComic ? 'overflow: hidden;' : ''}
        }
      \`}</style>
      <Navbar />

      <div className="desktop-view" ref={mainWrapRef} style={{ height: '800vh', position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-start',
          paddingTop: '10vh',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            zIndex: 0
          }} />

          {/* ABOUT ME TEXT (Top) */}
          <div style={{
            display: 'flex', gap: '24px', justifyContent: 'center',
            fontFamily: 'Impact, "Arial Black", sans-serif', 
            fontSize: 'clamp(50px, 10vw, 120px)',
            letterSpacing: '-2px',
            textTransform: 'uppercase',
            backgroundImage: 'url(/used/1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: 'saturate(1.4) contrast(1.1)',
            zIndex: 10,
            marginBottom: '4vh'
          }}>
            <span>ABOUT</span>
            <span>ME</span>
          </div>

          {/* COMIC TITLE */}
          <div style={{
            fontFamily: "'Edo', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 50px)',
            letterSpacing: 2, textTransform: 'uppercase', color: comic.themeColor,
            textAlign: 'center', textShadow: '1px 1px 0 rgba(255,255,255,0.8)',
            zIndex: 10,
            marginBottom: '4vh'
          }}>
            {comic.title}
          </div>

          {/* BOOK CONTAINER (Center below text) */}
          <div ref={bookContainerRef} style={{
            position: 'relative',
            width: 'min(90vw, 800px)',
            height: 'min(70vh, 500px)',
            perspective: '2200px',
            zIndex: 20,
          }}>
             <Book
                images={comic.images}
                title={comic.title}
                isSpreads={comic.isSpreads}
                setCardRef={setCardRef}
             />
          </div>
          
          <div ref={bookExtrasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
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
              position: 'absolute', bottom: 20, right: 'max(20px, 4%)',
              fontFamily: 'Impact, sans-serif', fontSize: 12, letterSpacing: 3,
              color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase',
            }}>
              {currentSpread + 1} / 8
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
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
         </div>

         {/* Mobile Chapter List */}
         <div style={{ padding: '0 20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Impact, sans-serif', fontSize: 20, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              Comic Chapters
            </h2>
            {COMICS_DATA.map((c, idx) => (
              <div
                key={c.id}
                onClick={() => setSelectedMobileComic(c)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: 16, background: '#fff', border: '3px solid #111',
                  borderRadius: 8, boxShadow: '4px 4px 0 #111',
                  cursor: 'pointer', marginBottom: 16,
                  transition: 'transform 0.1s ease',
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translate(2px, 2px)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={{
                  width: 60, height: 80, borderRadius: 4,
                  backgroundImage: \`url(\${c.images[0]})\`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  border: '2px solid #111'
                }} />
                <div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#555', fontWeight: 'bold', textTransform: 'uppercase' }}>Chapter {idx + 1}</div>
                  <div style={{ fontFamily: "'Edo', Impact, sans-serif", fontSize: 24, color: c.themeColor, marginTop: 4 }}>{c.title}</div>
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* MOBILE POPUP MODAL */}
      {selectedMobileComic && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: '#000', display: 'flex', flexDirection: 'column',
        }}>
          {/* Popup Header */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 1010,
            background: '#111', padding: '16px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '2px solid #333'
          }}>
            <div style={{ fontFamily: "'Edo', Impact, sans-serif", fontSize: 20, color: '#ffd60a' }}>
              {selectedMobileComic.title}
            </div>
            <button
              onClick={() => setSelectedMobileComic(null)}
              style={{
                background: 'transparent', border: 'none', color: '#fff',
                fontFamily: 'Impact, sans-serif', fontSize: 16, cursor: 'pointer',
                letterSpacing: 1
              }}
            >
              CLOSE ✕
            </button>
          </div>

          {/* Popup Scrollable Content */}
          <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
              {selectedMobileComic.images.map((src, i) => (
                <img key={i} src={src} style={{ width: '100%', height: 'auto', display: 'block' }} alt={\`Page \${i+1}\`} />
              ))}
              <div style={{
                background: '#1a1a2e', padding: '60px 20px', textAlign: 'center',
                borderBottom: '4px solid #111', borderLeft: '4px solid #111', borderRight: '4px solid #111'
              }}>
                <div style={{ fontFamily: 'Impact, sans-serif', fontSize: 24, textShadow: '2px 2px 0 #e63946', color: '#ffd60a' }}>THE END</div>
                <div style={{ fontFamily: "'Edo', Impact, sans-serif", fontSize: 20, color: '#00f5d4', marginTop: 12 }}>{selectedMobileComic.title}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
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

content = content.replace(/\/\* ─── MAIN PAGE ───.*$/s, newAboutPage);
fs.writeFileSync(file, content.trim());
