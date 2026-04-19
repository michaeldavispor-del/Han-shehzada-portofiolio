import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

type Message = {
  id: number;
  text: string | React.ReactNode;
  sender: 'bot' | 'user';
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm the Shehzada AI Assistant. How can I help you architect your digital future today?",
      sender: 'bot'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
    setInputText('');
    setShowOptions(false);

    // Simulate bot thinking and responding
    setTimeout(() => {
      let botResponse: React.ReactNode = "Thanks for reaching out! One of our human experts will get back to you shortly.";
      
      if (text.toLowerCase().includes('package') || text.toLowerCase().includes('website') || text.toLowerCase().includes('price')) {
        botResponse = (
          <div className="flex flex-col gap-3">
            <p className="text-sm">Here are our custom web development packages:</p>
            <div className="bg-black/40 p-3 rounded-lg border border-white/5">
              <strong className="text-accent block text-sm mb-1">Basic Package</strong>
              <div className="text-xs text-white font-mono mb-1">$2k — $5k</div>
              <span className="text-xs text-secondary leading-tight block">Perfect for standard business websites with foundational features and solid performance.</span>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-white/5">
              <strong className="text-accent block text-sm mb-1">Medium Package</strong>
              <div className="text-xs text-white font-mono mb-1">$5k — $10k</div>
              <span className="text-xs text-secondary leading-tight block">More powerful features, dynamic content management, and strategic integrations.</span>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-white/5">
              <strong className="text-accent block text-sm mb-1">Advanced Package</strong>
              <div className="text-xs text-white font-mono mb-1">$10k — $30k</div>
              <span className="text-xs text-secondary leading-tight block">High-level powerful features, complex bespoke architecture, and custom AI implementations.</span>
            </div>
          </div>
        );
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse
      }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#00f2ff] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)] z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] glass-card flex flex-col z-50 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="h-16 border-b border-subtle flex items-center justify-between px-4 bg-surface/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Shehzada AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] text-secondary uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-secondary hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-white/10' : 'bg-surface border border-subtle'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-accent" />}
                  </div>
                  <div 
                    className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-accent text-black rounded-tr-sm' 
                        : 'bg-white/5 border border-white/5 text-white rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Quick Options */}
              {showOptions && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-2 mt-2 ml-11"
                >
                  <button 
                    onClick={() => handleSend("Tell me about your Website Packages")}
                    className="text-left text-xs px-4 py-2 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors w-fit"
                  >
                    Website Development Packages
                  </button>
                  <button 
                    onClick={() => handleSend("How can AI automate my business?")}
                    className="text-left text-xs px-4 py-2 rounded-full border border-white/10 text-secondary hover:bg-white/5 transition-colors w-fit"
                  >
                    AI Automation Integration
                  </button>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-subtle bg-surface">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-secondary focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shrink-0"
                >
                  <Send className="w-4 h-4 ml-[-2px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
