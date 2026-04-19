import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, X, Phone, Volume2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function AIVoiceReceptionist() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [statusText, setStatusText] = useState('Available 24/7');
  const [transcript, setTranscript] = useState('Ready to assist you with your business needs.');
  
  // Refs to prevent stale closures and garbage collection bugs
  const isCallingRef = useRef(false);
  const statusRef = useRef('Available 24/7');
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<any>(null);
  const chatHistoryRef = useRef<{role: string; text: string}[]>([]);

  // Keep state and refs synced
  const updateStatus = (newStatus: string) => {
    statusRef.current = newStatus;
    setStatusText(newStatus);
  };

  useEffect(() => {
    isCallingRef.current = isCalling;
  }, [isCalling]);

  const startListening = () => {
    if (!isCallingRef.current) return;
    updateStatus('Listening (Speak now)...');

    try {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRec) {
        setTranscript("Your browser doesn't support speech recognition.");
        updateStatus('Unsupported Browser');
        return;
      }
      
      // Clean up previous instance
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch(e) {}
      }

      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.continuous = true; // Stay open while speaking
      recognition.interimResults = true; // Show live text
      
      let finalTranscript = '';

      recognition.onresult = async (event: any) => {
        let interim = '';
        let hasFinal = false;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            hasFinal = true;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        
        // Show live typing
        const displayTranscript = finalTranscript + interim;
        if (displayTranscript) {
           setTranscript(`You: "${displayTranscript}"`);
        }

        // If user finished a sentence, process it
        if (hasFinal && finalTranscript.trim()) {
          updateStatus('Thinking...');
          recognition.stop();
          await getAIResponse(finalTranscript.trim());
          finalTranscript = ''; 
        }
      };
      
      recognition.onend = () => {
         // Auto-restart mic if the browser timed out but we still want to listen
         if (isCallingRef.current && statusRef.current === 'Listening (Speak now)...') {
             setTimeout(() => {
                 if (isCallingRef.current && statusRef.current === 'Listening (Speak now)...') {
                     try { recognitionRef.current.start(); } catch(e){}
                 }
             }, 200);
         }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
           updateStatus("Microphone permission denied.");
           setIsCalling(false);
        } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
           console.error("Speech Rec Error:", event.error);
        }
      };

      recognition.start();
    } catch(e) {
       console.error("Recognition Error:", e);
       updateStatus('Error starting mic.');
    }
  };

  const getAIResponse = async (userText: string) => {
    try {
      chatHistoryRef.current.push({ role: 'User', text: userText });

      const prompt = `You are the Shehzada Services AI Voice Receptionist.
      Follow these rules exactly:
      1. This is a continuous conversation. Answer naturally based on the conversation history below.
      2. Keep responses EXTREMELY short (1-2 sentences maximum). 
      3. Speak conversationally. Do NOT use markdown symbols like * or **.
      4. You work for every niche: roofing, plumbing, restaurants, salons, shops, etc.
      5. If they ask about packages/pricing: Basic ($2k-$5k), Medium ($5k-$10k), Advanced ($10k-$30k).
      
      Conversation History:
      ${chatHistoryRef.current.map(msg => `${msg.role}: ${msg.text}`).join('\n')}
      
      AI Response:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      let reply = response.text || "I didn't quite catch that. Could you repeat?";
      // Clean up accidental markdown
      reply = reply.replace(/\*\*/g, '').replace(/\*/g, '').replace(/AI Response:/gi, '').trim();

      chatHistoryRef.current.push({ role: 'AI', text: reply });
      setTranscript(`AI: "${reply}"`);
      speak(reply);
    } catch (err) {
       console.error("Gemini Error:", err);
       const errorReply = "I am having a network issue. Can you please repeat that?";
       setTranscript(`AI: "${errorReply}"`);
       speak(errorReply);
    }
  };

  const speak = (text: string) => {
    if (!isCallingRef.current) return;
    updateStatus('AI Speaking...');
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance; // Prevent Garbage Collection drop
    
    const setVoiceAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        // Prefer clear English voices
        let voice = voices.find(v => v.name.includes('Google US English'));
        if (!voice) voice = voices.find(v => v.lang === 'en-US' && v.name.includes('Female'));
        if (!voice) voice = voices.find(v => v.lang.includes('en'));
        if (voice) utterance.voice = voice;
        
        utterance.rate = 1.0; 
        
        utterance.onend = () => {
          if (isCallingRef.current) {
            startListening();
          }
        };
        
        utterance.onerror = (e) => {
           if (e.error !== 'canceled' && isCallingRef.current) {
              startListening();
           }
        };
        
        window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
    } else {
        setVoiceAndSpeak();
    }
  };

  const handleStartCall = () => {
    setIsCalling(true);
    isCallingRef.current = true;
    chatHistoryRef.current = []; // Reset memory
    const greeting = "Hi there! I am the AI Voice Receptionist from Shehzada Services. I can help build websites and grow businesses for any niche. How can I assist you today?";
    chatHistoryRef.current.push({ role: 'AI', text: greeting });
    setTranscript(`AI: "${greeting}"`);
    speak(greeting);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    isCallingRef.current = false;
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch(e) {}
    }
    updateStatus('Call ended');
    setTranscript('Call disconnected.');
  };

  useEffect(() => {
    return () => {
       window.speechSynthesis.cancel();
       if (recognitionRef.current) {
         try { recognitionRef.current.abort(); } catch(e) {}
       }
    };
  }, []);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 w-14 h-14 rounded-full bg-surface border border-accent text-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.2)] z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping"></div>
        <Phone className="w-5 h-5 relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-6 w-[350px] glass-card z-50 overflow-hidden flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-accent/20"
          >
            {/* Header */}
            <div className="h-16 border-b border-subtle flex items-center justify-between px-5 bg-surface/80">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 text-accent flex items-center justify-center font-bold relative">
                   {isCalling && <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-50"></div>}
                   <Mic className="w-4 h-4" />
                 </div>
                 <div>
                   <h3 className="font-bold text-sm text-white">AI Voice Agent</h3>
                   <span className="text-[10px] text-accent uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                     {isCalling && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                     {statusText}
                   </span>
                 </div>
               </div>
               <button onClick={() => { setIsOpen(false); handleEndCall(); }} className="text-secondary hover:text-white transition-colors">
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              <div className="text-center">
                <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 shadow-inner relative overflow-hidden text-center min-h-[140px] flex items-center justify-center">
                  <p className="text-[14px] font-medium text-white leading-relaxed italic break-words w-full">
                    {transcript}
                  </p>
                </div>
              </div>

              {/* Sound Visualization */}
              <div className="h-12 flex items-center justify-center gap-1 my-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                       height: isCalling ? (statusText.includes('Speaking') ? [10, Math.random() * 40 + 10, 10] : [4, 15, 4]) : 4
                    }}
                    transition={{
                       repeat: isCalling ? Infinity : 0,
                       duration: statusText.includes('Speaking') ? 0.3 + Math.random() * 0.3 : 1,
                       ease: "easeInOut"
                    }}
                    className="w-1.5 bg-accent rounded-full opacity-80"
                    style={{ height: '4px' }}
                  />
                ))}
              </div>

              <button 
                onClick={isCalling ? handleEndCall : handleStartCall}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isCalling 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20' 
                    : 'bg-accent text-black hover:opacity-90 shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                }`}
              >
                {isCalling ? (
                  <><X className="w-4 h-4" /> End Call</>
                ) : (
                  <><Phone className="w-4 h-4" /> Start Live AI Call</>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
