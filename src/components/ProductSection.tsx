import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'The Odyssey',
    price: '$12,500',
    category: 'Automatic',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Celestial',
    price: '$18,900',
    category: 'Tourbillon',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Lumina',
    price: '$8,200',
    category: 'Chronograph',
    image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=1000&auto=format&fit=crop',
  }
];

export default function ProductSection() {
  return (
    <section id="shop-collection" className="py-32 px-6 lg:px-8 max-w-7xl mx-auto bg-[var(--color-lux-bg)]">
      <div className="flex justify-between items-end mb-20">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Latest Additions</h2>
          <p className="font-sans text-[var(--color-lux-text-secondary)] tracking-widest uppercase text-sm">Masterpieces of time</p>
        </div>
        <button className="hidden md:flex items-center gap-2 font-sans uppercase tracking-widest text-xs border-b border-[var(--color-lux-text)] pb-1 hover:text-[var(--color-lux-accent)] hover:border-[var(--color-lux-accent)] transition-colors">
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            className="group relative cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden mb-6 transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-2xl">
              <motion.div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              {/* Quick view overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                <span className="px-6 py-3 bg-white/90 text-black font-sans uppercase tracking-widest text-xs rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  Quick View
                </span>
              </div>
            </div>

            <div className="flex justify-between items-start relative overflow-hidden">
              <div>
                <p className="font-sans text-[var(--color-lux-text-secondary)] text-xs uppercase tracking-widest mb-2">{product.category}</p>
                <h3 className="font-serif text-2xl">{product.name}</h3>
              </div>
              
              <div className="flex flex-col items-end relative h-8 overflow-hidden">
                <span className="font-sans text-lg transform transition-transform duration-500 group-hover:-translate-y-full absolute right-0">
                  {product.price}
                </span>
                <button className="font-sans text-xs uppercase tracking-widest text-[var(--color-lux-accent)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 absolute right-0 border-b border-[var(--color-lux-accent)] pb-1">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
