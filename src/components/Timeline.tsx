import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: '01', name: 'Handcrafted' },
  { id: '02', name: 'Assembly' },
  { id: '03', name: 'Quality Test' },
  { id: '04', name: 'Packaging' },
  { id: '05', name: 'Delivery' }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the line drawing
      gsap.fromTo(lineRef.current, 
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          }
        }
      );

      // Animate the steps appearing
      gsap.utils.toArray('.timeline-step').forEach((step: any, i) => {
        gsap.fromTo(step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * 10}% center`,
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-[var(--color-lux-bg)] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">The Journey</h2>
          <p className="font-sans text-[var(--color-lux-text-secondary)] tracking-widest uppercase text-sm">From creation to you</p>
        </div>

        <div className="relative">
          {/* Base Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 -translate-y-1/2" />
          
          {/* Animated Line */}
          <div 
            ref={lineRef}
            className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--color-lux-accent)] -translate-y-1/2 origin-left"
          />

          <div className="relative flex justify-between">
            {steps.map((step, i) => (
              <div key={i} className="timeline-step flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[var(--color-lux-bg)] border border-[var(--color-lux-accent)] z-10 mb-6 relative">
                  <div className="absolute inset-1 rounded-full bg-[var(--color-lux-accent)]" />
                </div>
                <span className="font-serif text-2xl text-[var(--color-lux-accent)] mb-2">{step.id}</span>
                <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-lux-text-secondary)]">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
