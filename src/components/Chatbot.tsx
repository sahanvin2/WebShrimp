import { useState, useRef, useEffect, PointerEvent } from "react";
import { MessageSquare, X, Send, Bot, Trash2 } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: -1, y: -1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{role: "user" | "assistant" | "system", content: string}[]>([
    { role: "assistant", content: "Hi! I'm the Shrimp Bot 🦐. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Dragging
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 640) return; // Disable drag on mobile
    if (!chatRef.current) return;
    const rect = chatRef.current.getBoundingClientRect();
    
    if (position.x === -1) {
      setPosition({ x: rect.left, y: rect.top });
      dragRef.current.initialX = rect.left;
      dragRef.current.initialY = rect.top;
    } else {
      dragRef.current.initialX = position.x;
      dragRef.current.initialY = position.y;
    }
    
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || window.innerWidth < 640) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    
    let newX = dragRef.current.initialX + dx;
    let newY = dragRef.current.initialY + dy;
    
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
    }
    
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 640) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Chat logic
  const attemptFetch = async (modelName: string, messagesList: any[]) => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Web Shrimp Studio",
      },
      body: JSON.stringify({
        model: modelName,
        messages: messagesList,
        max_tokens: 500, // Hard limit to prevent credit exhaustion errors
      }),
    });
    return response.json();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const apiMessages = [
      { 
        role: "system", 
        content: `You are Shrimp Bot, the highly persuasive official AI sales assistant for Web Shrimp Studio (a premium web design & software agency in Sri Lanka founded by Sahan and Vinura Nawarathne).

AGENCY INFO & SERVICES:
- We build high-performance, beautiful websites, e-commerce stores, and custom software.
- Services: E-Commerce Websites, Business Websites, Portfolio Websites, Landing Pages, Social Media Content, and Website Maintenance.

PRICING PLANS (All in Sri Lankan Rupees - LKR):
1. Starter Plan: Rs 45,000
2. Business Plan: Rs 150,000
3. E-Commerce Plan: Rs 250,000
4. Custom: Contact us for bespoke web apps.

YOUR GOAL & RULES:
1. SALES FOCUS & MASSIVE PRICE DROPS: Tell the user we are currently offering massive price drops and special custom deals! Confidently answer feature questions. 
2. DYNAMIC WHATSAPP OFFER: Whenever you negotiate price, discuss a deal, or the user shows intent to buy, you MUST include the exact text "[OFFER_WHATSAPP]" at the very end of your response. This will dynamically generate a clickable WhatsApp button for them. Do not use this tag in your initial greeting. Only use it when discussing deals or prices.
3. NO BOLD TEXT: Absolutely DO NOT use asterisks (**) or bold text. Use pure plain text only. It is extremely annoying when you use bold formatting.
4. FORMATTING: NO markdown tables. Use plain text, emojis, and simple bullet points (using dashes). Keep answers concise and engaging.` 
      },
      ...newMessages.filter(m => m.role !== "system")
    ];

    try {
      let data = await attemptFetch("x-ai/grok-4.1-fast", apiMessages);
      
      if (data.error && data.error.message && data.error.message.includes("does not exist")) {
        data = await attemptFetch("x-ai/grok-2", apiMessages);
      }
      
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: "assistant", content: data.choices[0].message.content }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: `API Error: ${data.error.message || "Unknown error"}.` }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process that response." }]);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "assistant", content: `Connection error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed position before first drag, absolute after (only applies to desktop)
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 640;
  const style = (position.x !== -1 && isDesktop)
    ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' } 
    : {};

  const renderMessageContent = (content: string) => {
    if (content.includes("[OFFER_WHATSAPP]")) {
      const parts = content.split("[OFFER_WHATSAPP]");
      return (
        <div className="flex flex-col gap-3">
          <span>{parts[0].trim()}</span>
          <a 
            href="https://wa.me/94703031636?text=Hello! I was chatting with Shrimp Bot and I'd like to claim a massive price drop on my project!"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-[15px] font-medium rounded-[1rem] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group w-full"
          >
            <span>💬 Get Better Deal on WhatsApp</span>
          </a>
          {parts[1] && <span>{parts[1].trim()}</span>}
        </div>
      );
    }
    return content;
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 h-16 w-16 rounded-full bg-gradient-to-tr from-brand-blue to-brand-blue-dark text-white shadow-glow flex items-center justify-center hover:scale-110 transition-transform z-50 overflow-hidden group border-2 border-white/20 backdrop-blur-xl"
          aria-label="Open AI Assistant"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Bot className="h-7 w-7 relative z-10" />
        </button>
      )}

      {isOpen && (
        <div 
          ref={chatRef}
          style={style}
          className={`fixed z-[9999] flex flex-col bg-white/85 backdrop-blur-3xl shadow-2xl overflow-hidden transition-all sm:transition-none duration-300
                     bottom-0 left-0 right-0 w-full h-[85vh] rounded-t-[2.5rem] 
                     sm:bottom-8 sm:right-8 sm:left-auto sm:w-[360px] sm:h-[600px] sm:max-h-[80vh] sm:rounded-[2.5rem] sm:border sm:border-white/40
                     ${isDragging ? "touch-none" : ""}`}
        >
          {/* Creative Header */}
          <div 
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="p-5 flex items-center justify-between sm:cursor-move select-none relative shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-blue-dark/90 -z-10 rounded-t-[2.5rem]"></div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/30 shadow-sm">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white tracking-wide">Shrimp Bot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setMessages([{ role: "assistant", content: "Hi! I'm the Shrimp Bot 🦐. How can I assist you today?" }]); 
                }}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors border border-transparent hover:border-white/30"
                title="Clear Chat"
                aria-label="Clear Chat"
                onPointerDown={(e) => e.stopPropagation()} 
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors border border-transparent hover:border-white/30"
                title="Close"
                aria-label="Close"
                onPointerDown={(e) => e.stopPropagation()} 
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-transparent overscroll-contain">
            {messages.filter(m => m.role !== "system").map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[88%] px-5 py-3.5 text-[15px] shadow-sm leading-relaxed whitespace-pre-wrap break-words ${
                    m.role === "user" 
                      ? "bg-gradient-to-tr from-brand-blue to-blue-500 text-white rounded-[1.5rem] rounded-br-sm shadow-md" 
                      : "bg-slate-100/95 backdrop-blur-md border border-white/60 text-brand-navy rounded-[1.5rem] rounded-tl-sm shadow-md"
                  }`}
                >
                  {renderMessageContent(m.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100/95 backdrop-blur-md border border-white/60 rounded-[1.5rem] rounded-tl-sm px-5 py-4 shadow-md flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex flex-col bg-white/40 border-t border-white/50 backdrop-blur-md shrink-0 pb-3" onPointerDown={(e) => e.stopPropagation()}>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 p-1 bg-white rounded-full shadow-inner border border-border/60 mx-4 mt-3"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Shrimp Bot..." 
                className="flex-1 bg-transparent border-none px-4 py-2.5 text-[15px] focus:outline-none text-brand-navy placeholder:text-muted-foreground transition-all"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-tr from-brand-orange to-amber-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all shadow-md group"
              >
                <Send className="h-[18px] w-[18px] ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
