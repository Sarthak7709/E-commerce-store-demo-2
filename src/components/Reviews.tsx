import { useRef } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  { id: 1, text: "A masterpiece of engineering. The weight, the finish, it's incomparable.", author: "James W.", location: "London" },
  { id: 2, text: "Exceeded every expectation. The attention to detail is staggering.", author: "Sophia L.", location: "New York" },
  { id: 3, text: "An heirloom piece I will proudly pass down to the next generation.", author: "Arthur C.", location: "Geneva" },
  { id: 4, text: "Unparalleled elegance. It doesn't just tell time, it tells a story.", author: "Elena R.", location: "Milan" },
  { id: 5, text: "The unboxing experience alone is worth it. Pure luxury from start to finish.", author: "David H.", location: "Tokyo" },
];

export default function Reviews() {
  return (
    <section className="py-32 bg-[var(--color-lux-bg)] overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">The Verdict</h2>
        <p className="font-sans text-[var(--color-lux-text-secondary)] tracking-widest uppercase text-sm">Words from our collectors</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-8 whitespace-nowrap group-hover:pause-animation">
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div key={i} className="w-96 flex-shrink-0 p-10 border border-black/5 rounded-3xl bg-white/50 backdrop-blur-sm">
              <div className="flex gap-1 mb-6 text-[var(--color-lux-accent)]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="font-serif text-xl leading-relaxed mb-8 whitespace-normal">"{review.text}"</p>
              <div>
                <p className="font-sans font-medium text-sm">{review.author}</p>
                <p className="font-sans text-xs text-[var(--color-lux-text-secondary)] tracking-widest uppercase mt-1">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
