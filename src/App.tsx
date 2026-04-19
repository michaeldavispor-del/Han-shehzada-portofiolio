import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import AIVoiceReceptionist from './components/AIVoiceReceptionist';

export default function App() {
  return (
    <div className="min-h-screen text-white font-sans">
      <div className="glow-bg"></div>
      <div className="glow-bg-alt"></div>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <AIVoiceReceptionist />
    </div>
  );
}
