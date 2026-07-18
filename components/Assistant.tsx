import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { COLORS } from '../constants';
import { ChatMessage, UserData } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface AssistantProps {
  userData?: UserData | null;
}

const Assistant: React.FC<AssistantProps> = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Update welcome message dynamically based on user profile
  useEffect(() => {
    const scopeName = userData?.role === 'Individual' ? 'At Home' : userData?.role === 'Business' ? 'In the Office' : 'Municipal';
    const hasCalibrated = !!userData?.calculatedEmissions;
    const footprintText = hasCalibrated ? `${userData?.calculatedEmissions?.total} tCO2e` : 'uncalibrated';
    
    setMessages([
      { 
          id: 'welcome', 
          role: 'model', 
          text: `Hello! I am your GreenAI advisor. I see you are tracking sustainability ${scopeName} with a ${userData?.target || 'moderate'} target. Your calculated footprint is currently ${footprintText}. How can I assist you with optimization schedules today?`, 
          timestamp: new Date() 
      }
    ]);
  }, [userData]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text, userData);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 flex items-center gap-2 ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ backgroundColor: COLORS.primary, color: 'white' }}
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-full max-w-[400px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden z-50 flex flex-col transition-all duration-500 origin-bottom-right ${
            isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '600px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-200/50 bg-white/50">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md" style={{ backgroundColor: COLORS.accent }}>
                <Sparkles size={20} />
             </div>
             <div>
                 <h3 className="font-bold text-sm" style={{ color: COLORS.primary }}>GreenAI Assistant</h3>
                 <span className="text-[10px] text-gray-500 font-medium block">
                    {userData?.role === 'Individual' ? '🏠 At Home Advisor' : userData?.role === 'Business' ? '🏢 Office Advisor' : '🌍 Regional Advisor'}
                 </span>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                }`}
                style={{ backgroundColor: msg.role === 'user' ? COLORS.primary : 'rgba(255,255,255,0.8)' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
                 <div className="bg-white/80 border border-gray-100 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-gray-400" />
                    <span className="text-xs text-gray-500">Thinking...</span>
                 </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 border-t border-gray-200/50">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-inner focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about emissions, costs..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className={`p-2 rounded-full transition-all ${
                        input.trim() ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-300'
                    }`}
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Assistant;