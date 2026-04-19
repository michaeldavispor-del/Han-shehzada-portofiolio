import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-light bg-blue-600/20 w-[600px] h-[600px] top-[-200px] left-[-200px]" />
      <div className="ambient-light bg-purple-600/20 w-[500px] h-[500px] bottom-[-100px] right-[-100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="badge mb-8"
          >
            Next-Gen AI & Automation Agency
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            Intelligent Solutions <br className="hidden md:block" />
            <span className="text-accent">For Modern Business</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Shehzada Services transforms your operations with cutting-edge AI automation, bespoke software, and strategic technology consulting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center">
              Start Your Journey
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary w-full sm:w-auto text-center">
              View Our Work
            </button>
          </div>
        </motion.div>
      </div>

      {/* Grid background overlay for technical feel */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </section>
  );
}
