import { ArrowRight, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[var(--color-lux-bg)] pt-32 pb-12 px-6 lg:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 border-b border-white/10 pb-16">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-5xl md:text-8xl font-serif leading-none mb-8">LUXORA</h2>
            <p className="font-sans text-gray-400 max-w-sm text-sm leading-relaxed">
              Crafting timeless masterpieces for those who understand that time is not just measured, it is worn.
            </p>
          </div>
          
          <div className="w-full md:w-1/3">
            <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-lux-accent)] mb-6">Join The Inner Circle</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-white/20 pb-4 text-white font-sans focus:outline-none focus:border-white transition-colors peer"
              />
              <button className="absolute right-0 top-0 text-white/50 peer-focus:text-white transition-colors">
                <ArrowRight size={20} />
              </button>
              {/* Animated underline on focus/hover */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-lux-accent)] scale-x-0 group-hover:scale-x-100 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/50 mb-6">Collections</h4>
            <ul className="space-y-4">
              {['The Odyssey', 'Celestial', 'Lumina', 'Heritage'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="font-sans text-sm hover:text-[var(--color-lux-accent)] transition-colors inline-block relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-lux-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/50 mb-6">Maison</h4>
            <ul className="space-y-4">
              {['Our Story', 'Craftsmanship', 'Boutiques', 'Careers'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="font-sans text-sm hover:text-[var(--color-lux-accent)] transition-colors inline-block relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-lux-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/50 mb-6">Client Care</h4>
            <ul className="space-y-4">
              {['Contact Us', 'Warranty', 'Care Guide', 'FAQ'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="font-sans text-sm hover:text-[var(--color-lux-accent)] transition-colors inline-block relative group">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-lux-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/50 mb-6">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/30 font-sans tracking-widest uppercase">
          <p>© {new Date().getFullYear()} LUXORA. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
