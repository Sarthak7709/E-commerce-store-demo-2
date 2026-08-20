import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import { WatchExploded } from './Watch3D';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000', // Scroll length for the animation
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Progress goes 0 -> 1 -> 0 to explode and reassemble
          // 0 to 0.4: Explode
          // 0.4 to 0.6: Hold exploded
          // 0.6 to 1: Assemble
          let p = 0;
          if (self.progress < 0.4) {
            p = self.progress / 0.4;
          } else if (self.progress < 0.6) {
            p = 1;
          } else {
            p = 1 - ((self.progress - 0.6) / 0.4);
          }
          setScrollProgress(p);

          // Animate text opacity
          if (textRef.current) {
            gsap.to(textRef.current, {
              opacity: self.progress < 0.1 ? 1 - (self.progress / 0.1) : 0,
              duration: 0.1,
              ease: 'power1.out',
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[var(--color-lux-bg)] overflow-hidden">
      
      {/* 3D Canvas - Absolute to cover or be on right */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            enabled={scrollProgress === 0} // Only interactive when not animating
          >
            <WatchExploded scrollProgress={scrollProgress} />
          </PresentationControls>
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Canvas>
      </div>

      {/* Left Side Content */}
      <div ref={textRef} className="absolute inset-0 z-20 flex items-center max-w-7xl mx-auto px-6 lg:px-8 pointer-events-auto">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-6xl md:text-8xl tracking-tight leading-tight mb-6">
            <span className="block text-[var(--color-lux-text-secondary)] font-sans font-light text-2xl md:text-3xl mb-4 tracking-widest uppercase">Time isn't measured.</span>
            It is <span className="font-serif italic text-[var(--color-lux-accent)]">worn.</span>
          </h1>
          
          <div className="flex gap-6 mt-8">
            <button 
              onClick={() => document.getElementById('shop-collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[var(--color-lux-text)] text-[var(--color-lux-bg)] font-sans uppercase tracking-widest text-sm hover:bg-[var(--color-lux-accent)] transition-colors duration-500 rounded-full"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => document.getElementById('explore-story')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-[var(--color-lux-text)] text-[var(--color-lux-text)] font-sans uppercase tracking-widest text-sm hover:bg-[var(--color-lux-text)] hover:text-[var(--color-lux-bg)] transition-colors duration-500 rounded-full"
            >
              Explore Story
            </button>
          </div>

          <div className="flex gap-12 mt-24">
            <div>
              <p className="font-serif text-3xl mb-1">50+</p>
              <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-lux-text-secondary)]">Countries</p>
            </div>
            <div>
              <p className="font-serif text-3xl mb-1">5000+</p>
              <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-lux-text-secondary)]">Reviews</p>
            </div>
            <div>
              <p className="font-serif text-3xl mb-1">Lifetime</p>
              <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-lux-text-secondary)]">Warranty</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
