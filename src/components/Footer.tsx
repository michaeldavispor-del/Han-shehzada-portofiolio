export default function Footer() {
  return (
    <footer className="border-t border-subtle pt-16 pb-8 bg-[#030306]/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg border-subtle bg-surface flex items-center justify-center">
                <span className="font-bold text-lg text-accent">S</span>
              </div>
              <span className="font-bold text-[20px] tracking-[-0.5px]">SHEHZADA<span className="text-accent">SERVICES</span></span>
            </div>
            <p className="text-secondary max-w-sm">
              We design, build, and deploy intelligent automation systems for modern businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-secondary hover:text-white transition-colors">Services</a></li>
              <li><a href="#work" className="text-secondary hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#about" className="text-secondary hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-secondary hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Socials</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-secondary hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="text-secondary hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-secondary hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-subtle text-secondary text-sm">
          <p>&copy; {new Date().getFullYear()} Shehzada Services. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
