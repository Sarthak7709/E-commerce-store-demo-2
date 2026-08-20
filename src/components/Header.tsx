import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/70 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          
          <button 
            className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] hover:text-[var(--color-lux-accent)] transition-colors"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={16} />
            <span className="hidden md:inline">Menu</span>
          </button>

          <a href="#" className="font-serif text-3xl md:text-4xl tracking-wider relative group">
            LUXORA
          </a>

          <div className="flex items-center gap-6">
            <button className="hover:text-[var(--color-lux-accent)] transition-colors">
              <Search size={18} />
            </button>
            <button className="hover:text-[var(--color-lux-accent)] transition-colors relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-[var(--color-lux-text)] text-[var(--color-lux-bg)] text-[8px] rounded-full flex items-center justify-center font-sans">
                0
              </span>
            </button>
          </div>

        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full md:w-[400px] h-full bg-[var(--color-lux-bg)] shadow-2xl flex flex-col p-12"
            >
              <button 
                onClick={() => setMenuOpen(false)}
                className="self-end font-sans text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-[var(--color-lux-accent)] hover:border-[var(--color-lux-accent)] transition-colors"
              >
                Close
              </button>

              <div className="mt-20 flex flex-col gap-8">
                {['Watches', 'Leather Goods', 'Eyewear', 'Fragrances', 'Our Story', 'Journal'].map((item, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="font-serif text-4xl hover:text-[var(--color-lux-accent)] transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
