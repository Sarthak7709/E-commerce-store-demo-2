import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

const products = [
  { id: 1, name: 'The Odyssey', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, name: 'Celestial Tourbillon', image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, name: 'Lumina Chrono', image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, name: 'Heritage Classic', image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, name: 'Nautilus', image: 'https://images.unsplash.com/photo-1548171915-e76a394a0767?q=80&w=1000&auto=format&fit=crop' },
];

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));

  useEffect(() => {
    // GSAP animations for the active transition
    if (containerRef.current) {
      gsap.fromTo(
        '.showcase-title',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [activeIndex]);

  return (
    <section className="py-40 bg-[#111111] overflow-hidden flex flex-col items-center justify-center relative">
      <div className="text-center mb-16 z-10">
        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[var(--color-lux-bg)]">Signature Collection</h2>
        <p className="font-sans text-[var(--color-lux-text-secondary)] tracking-widest uppercase text-sm">Discover your legacy</p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-7xl h-[600px] flex items-center justify-center px-4">
        {products.map((product, i) => {
          const isActive = i === activeIndex;
          const offset = i - activeIndex;
          const absOffset = Math.abs(offset);
          const isVisible = absOffset <= 2; // Show up to 2 items on each side

          if (!isVisible) return null;

          // Calculate layout logic
          const zIndex = 50 - absOffset;
          const scale = isActive ? 1 : 0.8 - absOffset * 0.1;
          const x = offset * 25; // percentage offset
          const rotateY = offset * -15; // rotate towards center
          const blur = isActive ? 0 : absOffset * 4;
          const opacity = isActive ? 1 : 1 - absOffset * 0.4;

          return (
            <motion.div
              key={product.id}
              className="absolute top-1/2 left-1/2 cursor-pointer rounded-3xl overflow-hidden"
              style={{
                width: isActive ? '400px' : '300px',
                height: isActive ? '500px' : '400px',
                zIndex
              }}
              initial={false}
              animate={{
                x: `calc(-50% + ${x}vw)`,
                y: '-50%',
                scale,
                rotateY,
                opacity,
                filter: `blur(${blur}px)`,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveIndex(i)}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-8">
                  <h3 className="showcase-title text-[var(--color-lux-bg)] font-serif text-3xl">{product.name}</h3>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-8 mt-16 z-10">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
        >
          &larr;
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}
