import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-[16px] p-10 md:p-20 text-center relative overflow-hidden"
        >
          {/* Subtle grid pattern inside card */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
            style={{
              backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to automate your future?
            </h2>
            <p className="text-xl text-secondary mb-10">
              Schedule a free discovery call to discuss how Shehzada Services can help streamline your business operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                Book a Strategy Call
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center">
                <Mail className="w-5 h-5" />
                Email Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
