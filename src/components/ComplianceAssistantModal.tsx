import React, { useState, useRef, useEffect } from 'react';
import { FoodSafetyDoc } from '../types/foodSafety';
import {
  X,
  Sparkles,
  Send,
  RotateCcw,
  User,
  Volume2,
  Flame,
  Pause,
} from 'lucide-react';
import { TTSService } from '../services/ttsService';

interface ComplianceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDoc?: FoodSafetyDoc | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export const ComplianceAssistantModal: React.FC<ComplianceAssistantModalProps> = ({
  isOpen,
  onClose,
  activeDoc,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hello! I am your **Jiangnan Hotpot / Imperial Kitchen Group** Compliance Assistant. 

Ask any question about temperatures, towel codes, allergen handling, or policy guidelines.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [audioLoadingId, setAudioLoadingId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      TTSService.stopCurrentAudio();
    };
  }, []);

  if (!isOpen) return null;

  const quickPrompts = [
    'What is the 15-minute cold chain rule?',
    'What color towel is used for dining tables?',
    'Which cutting board is used for raw poultry?',
    'Can an employee work with a fever or diarrhea?',
    'What should I do if a glass breaks in the kitchen?',
  ];

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || loading) return;

    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/compliance-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          contextDocTitle: activeDoc ? `${activeDoc.code}: ${activeDoc.title}` : undefined,
          contextDocContent: activeDoc
            ? `${activeDoc.summary}\n${activeDoc.keyTakeaways.join('\n')}`
            : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: data.answer || 'No guidance generated.',
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: 'assistant',
          text: `### **Compliance Quick Reference**
* **Refrigeration:** Must be kept at 0°C to 4°C.
* **15-Minute Rule:** Cold shipments must reach refrigeration within 15 minutes.
* **Danger Zone (5°C to 60°C):** High-risk foods must never stay >1 hr cumulative.
* **Towel Colors:** White = clean wares; Blue = dining tables; Green = kitchen prep; Red = restroom only.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = async (msg: Message) => {
    if (playingMessageId === msg.id && audioRef.current) {
      audioRef.current.pause();
      setPlayingMessageId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    TTSService.stopCurrentAudio();

    setAudioLoadingId(msg.id);

    const cleanSpeechText = msg.text
      .replace(/[#*_`]/g, '')
      .replace(/⚠️/g, 'Warning: ')
      .replace(/❄️|🧊|🔥|⚪|🟡|🔵|🟢|🟤|🔴|🟠/g, '')
      .slice(0, 1500);

    try {
      const audioUrl = await TTSService.generateSpeech({
        text: cleanSpeechText,
        voice: 'Kore',
        style: 'Clear, authoritative food safety compliance officer',
      });

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPlayingMessageId(null);
      };

      audio.onerror = () => {
        setPlayingMessageId(null);
        TTSService.playWebSpeechFallback(cleanSpeechText, () => setPlayingMessageId(null));
      };

      await audio.play();
      setPlayingMessageId(msg.id);
    } catch {
      TTSService.playWebSpeechFallback(cleanSpeechText, () => setPlayingMessageId(null));
      setPlayingMessageId(msg.id);
    } finally {
      setAudioLoadingId(null);
    }
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={lIdx} className="h-1" />;

      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={lIdx} className="text-xs font-black text-red-300 mt-1.5 mb-0.5 flex items-center gap-1">
            <span className="w-1 h-2.5 bg-red-500 rounded-full inline-block" />
            <span>{trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '')}</span>
          </h4>
        );
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const itemText = trimmed.replace(/^[\*\-]\s+/, '');
        const parts = itemText.split(/(\*\*.*?\*\*)/g);
        return (
          <div key={lIdx} className="flex items-start gap-1.5 my-0.5 pl-1 text-slate-200">
            <span className="text-red-400 font-bold">•</span>
            <span>
              {parts.map((p, pIdx) =>
                p.startsWith('**') && p.endsWith('**') ? (
                  <strong key={pIdx} className="text-white font-bold">
                    {p.slice(2, -2)}
                  </strong>
                ) : (
                  p
                )
              )}
            </span>
          </div>
        );
      }

      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lIdx} className="text-xs text-slate-200 leading-relaxed my-0.5">
          {parts.map((p, pIdx) =>
            p.startsWith('**') && p.endsWith('**') ? (
              <strong key={pIdx} className="text-white font-bold">
                {p.slice(2, -2)}
              </strong>
            ) : (
              p
            )
          )}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full h-[620px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Compliance Q&A Assistant</span>
              </h3>
              <p className="text-[10px] text-slate-400">
                {activeDoc ? `Context: ${activeDoc.code}` : 'All 21 Policies & SOP-010'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            const isAudioPlaying = playingMessageId === m.id;
            const isAudioLoading = audioLoadingId === m.id;

            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    isUser
                      ? 'bg-red-600 text-white font-medium rounded-tr-sm shadow-md'
                      : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {isUser ? m.text : renderContent(m.text)}

                  {!isUser && (
                    <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handlePlayAudio(m)}
                        disabled={isAudioLoading}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                          isAudioPlaying
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-900 text-slate-300 hover:text-white'
                        }`}
                      >
                        {isAudioLoading ? (
                          <RotateCcw className="w-3 h-3 animate-spin text-amber-400" />
                        ) : isAudioPlaying ? (
                          <Pause className="w-3 h-3 fill-slate-950" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-amber-400" />
                        )}
                        <span>{isAudioPlaying ? 'Stop' : 'Listen'}</span>
                      </button>
                      <span className="text-[9px] text-slate-500">Gemini 3.8 Flash</span>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-300">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <RotateCcw className="w-3.5 h-3.5 animate-spin text-red-400" />
              <span>Consulting compliance policies...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] whitespace-nowrap transition-colors border border-slate-700/60"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your food safety question..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white transition-all shadow-md active:scale-95 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
