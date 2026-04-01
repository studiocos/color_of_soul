import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message, Sender } from '../types';

/** ui-ux-code-analysis §6와 동일 레이아웃·클래스 패턴. 다크 글래스 색만 라이트 글래스/파스텔로 매핑. */
const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Greetings. I am Dune. The sands of knowledge are vast. What do you seek?",
      sender: Sender.AI,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: Sender.User,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMessage.text);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.AI,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'The connection was severed by a sandstorm. Please try again.',
        sender: Sender.AI,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] max-h-[85vh] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/50 shadow-2xl shadow-purple-500/5 backdrop-blur-xl bg-white/45">
      <div className="flex items-center justify-between p-5 border-b border-white/35 bg-white/35">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-sky-500" />
          <h2 className="text-sm font-medium tracking-widest uppercase text-gray-700">
            Dune Oracle
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-500 uppercase tracking-tighter">
            Online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 ${
              msg.sender === Sender.User ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                msg.sender === Sender.User
                  ? 'bg-sky-100/90 text-sky-800'
                  : 'bg-fuchsia-100/70 text-fuchsia-800'
              }`}
            >
              {msg.sender === Sender.User ? <User size={18} /> : <Bot size={18} />}
            </div>

            <div
              className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === Sender.User
                  ? 'bg-white text-gray-800 rounded-tr-none shadow-lg border border-sky-100/80'
                  : 'bg-white/75 text-gray-700 border border-pink-200/45 rounded-tl-none shadow-lg'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-100/80 text-fuchsia-800 flex items-center justify-center">
              <Loader2 size={18} className="animate-spin" />
            </div>
            <div className="bg-white/70 px-5 py-3 rounded-2xl rounded-tl-none border border-pink-200/40">
              <span className="text-gray-500 text-xs tracking-widest uppercase">
                Thinking...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-5 bg-white/35 border-t border-white/35">
        <form
          onSubmit={handleSend}
          className="relative flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the Oracle..."
            className="w-full bg-white/90 text-gray-700 placeholder-gray-400 rounded-full px-6 py-4 pr-14 text-sm border border-sky-200/50 focus:outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-200/70 transition-all shadow-inner"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-3 rounded-full bg-sky-400/25 text-sky-800 hover:bg-sky-400/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
