const fs = require('fs');
const file = 'src/app/about/page.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove Letter component and DEFAULT_CYCLE_IMAGES
content = content.replace(/\/\/ Flat list of all covers.*?\];/s, '');
content = content.replace(/\/\* ─── LETTER CYCLE COMPONENT ───.*?\/\* ─── BOOK COMPONENT ───/s, '/* ─── BOOK COMPONENT ───');

// 2. Replace AboutPage component
const newAboutPage = `
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

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <main style={{
      background: comic.background,
      color: '#111',
      minHeight: '100vh',
    }}>
      <Navbar />

      <div ref={mainWrapRef} style={{ height: '900vh', position: 'relative' }}>
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
              fontFamily: 'Impact, sans-serif', fontSize: 'clamp(22px, 5vw, 42px)',
              letterSpacing: 2, textTransform: 'uppercase', color: comic.themeColor,
              textAlign: 'center', textShadow: '1px 1px 0 rgba(255,255,255,0.8)',
            }}>
              📖 {comic.title}
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
            ⚡ Back to Cover ⚡
          </a>
        </div>
      </div>
    </main>
  );
}
`;

content = content.replace(/\/\* ─── MAIN PAGE ───.*$/s, newAboutPage);
fs.writeFileSync(file, content);
