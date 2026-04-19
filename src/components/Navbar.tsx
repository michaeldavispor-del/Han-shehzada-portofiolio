import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'h-[80px] glass' : 'h-[80px] bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg border-subtle bg-surface flex items-center justify-center">
            <span className="font-bold text-lg text-accent">S</span>
          </div>
          <span className="font-bold text-[20px] tracking-[-0.5px]">SHEHZADA<span className="text-accent">SERVICES</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-[14px] font-[500] text-secondary hover:text-white transition-colors">Services</a>
          <a href="#work" className="text-[14px] font-[500] text-secondary hover:text-white transition-colors">Work</a>
          <a href="#about" className="text-[14px] font-[500] text-secondary hover:text-white transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-sm"
          >
            Get in touch
          </a>
          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
