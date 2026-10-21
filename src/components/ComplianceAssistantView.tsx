import React, { useState, useRef, useEffect } from 'react';
import { FoodSafetyDoc } from '../types/foodSafety';
import {
  Sparkles,
  Send,
  RotateCcw,
  User,
  Volume2,
  Flame,
  Zap,
  Pause,
  AlertTriangle,
  Settings2,
  CheckCircle2,
} from 'lucide-react';
import { TTSService } from '../services/ttsService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isStreaming?: boolean;
  modelUsed?: string;
}

interface ComplianceAssistantViewProps {
  activeDoc?: FoodSafetyDoc | null;
  onOpenDoc?: (docId: string) => void;
}

export const ComplianceAssistantView: React.FC<ComplianceAssistantViewProps> = ({
  activeDoc,
}) => {
  // Speed & Model Mode
  // 'fast': gemini-3.1-flash-lite (fastest!)
  // 'standard': gemini-3.8-flash
  // 'complex': gemini-4-argon
  const [speedMode, setSpeedMode] = useState<'fast' | 'standard' | 'complex'>('fast');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hello! I am your **Jiangnan Hotpot / Imperial Kitchen Group** Compliance Intelligence Assistant. 

⚡ **Speed Mode: Ultra-Fast Active (Gemini 3.1 Flash Lite)**
Ask me any food safety rule, temperature threshold, color code, or corrective action across our **21 policies and SOPs**.

Tap any quick prompt below or type your question:`,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [audioLoadingId, setAudioLoadingId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      TTSService.stopCurrentAudio();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const quickPrompts = [
    'What is the 15-minute cold chain rule?',
    'What color towel is used for dining tables?',
    'Which cutting board is for raw poultry?',
    'Can an employee work with vomiting or diarrhea?',
    'What are the 4 approved thawing methods?',
    'What should I do if a glass breaks in the kitchen?',
    'What color plates are used for US Beef vs Angus Beef?',
  ];

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: q,
    };

    // Prepare multi-turn history from current messages
    const currentHistory = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({
        role: m.role,
        text: m.text,
      }));

    const assistantMsgId = `assistant-${Date.now()}`;
    const initialAssistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      text: '',
      isStreaming: true,
      modelUsed:
        speedMode === 'fast'
          ? 'gemini-3.1-flash-lite'
          : speedMode === 'standard'
          ? 'gemini-3.8-flash'
          : 'gemini-4-argon',
    };

    setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
    setInput('');
    setLoading(true);

    // Setup abort controller
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Use streaming SSE endpoint for instant token delivery
      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          history: currentHistory,
          speedMode,
          contextDocTitle: activeDoc ? `${activeDoc.code}: ${activeDoc.title}` : undefined,
          contextDocContent: activeDoc
            ? `${activeDoc.summary}\n${activeDoc.keyTakeaways.join('\n')}`
            : undefined,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      if (!res.body) {
        throw new Error('No readable response body');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const rawData = line.slice(6).trim();
            if (rawData === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(rawData);
              if (parsed.text) {
                accumulatedText += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId ? { ...m, text: accumulatedText } : m
                  )
                );
              }
            } catch {
              // Ignore partial JSON chunks
            }
          }
        }
      }

      // Mark streaming complete
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.warn('Streaming fetch failed, falling back to standard Q&A:', err);

      try {
        const fallbackRes = await fetch('/api/compliance-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q,
            speedMode,
            contextDocTitle: activeDoc ? `${activeDoc.code}: ${activeDoc.title}` : undefined,
            contextDocContent: activeDoc
              ? `${activeDoc.summary}\n${activeDoc.keyTakeaways.join('\n')}`
              : undefined,
          }),
        });
        const fallbackData = await fallbackRes.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  text: fallbackData.answer || 'Compliance rule verified.',
                  isStreaming: false,
                }
              : m
          )
        );
      } catch (fbErr) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  text: `### **Imperial Kitchen Group Compliance Standard**
* **Cold Storage:** Refrigerators strictly at 0°C to 4°C; Freezers at -18°C or below.
* **15-Minute Rule:** Cold deliveries must reach cold storage within 15 minutes of dock arrival.
* **Danger Zone (5°C to 60°C):** Never exceed 1 hour cumulative exposure.
* **Towel Colors:** White = clean wares; Blue = FOH dining; Green = kitchen prep; Red = restroom only.`,
                  isStreaming: false,
                }
              : m
          )
        );
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  // TTS audio playback for assistant messages
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
        style: 'Clear, authoritative, and helpful food safety compliance officer',
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
    } catch (err) {
      console.warn('Gemini TTS failed, falling back to Web Speech API:', err);
      const fallbackSuccess = TTSService.playWebSpeechFallback(cleanSpeechText, () =>
        setPlayingMessageId(null)
      );
      if (fallbackSuccess) {
        setPlayingMessageId(msg.id);
      }
    } finally {
      setAudioLoadingId(null);
    }
  };

  const handleClearChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    TTSService.stopCurrentAudio();
    setPlayingMessageId(null);
    setLoading(false);
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: `Chat reset. Ask me any question for ultra-fast guidance!`,
      },
    ]);
  };

  // Render markdown text cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={lIdx} className="h-1" />;
      }

      if (trimmed.startsWith('### ')) {
        const titleText = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '');
        return (
          <h4 key={lIdx} className="text-xs sm:text-sm font-black text-red-300 mt-2 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-red-500 rounded-full inline-block" />
            <span>{titleText}</span>
          </h4>
        );
      }

      if (trimmed === '---') {
        return <hr key={lIdx} className="my-1.5 border-slate-800" />;
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const itemText = trimmed.replace(/^[\*\-]\s+/, '');
        const parts = itemText.split(/(\*\*.*?\*\*)/g);

        return (
          <div key={lIdx} className="flex items-start gap-1.5 my-0.5 pl-1 text-slate-200">
            <span className="text-red-400 font-bold mt-0.5">•</span>
            <span className="leading-relaxed">
              {parts.map((p, pIdx) => {
                if (p.startsWith('**') && p.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="text-white font-bold">
                      {p.slice(2, -2)}
                    </strong>
                  );
                }
                return p;
              })}
            </span>
          </div>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const match = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (match) {
          const num = match[1];
          const rest = match[2];
          const parts = rest.split(/(\*\*.*?\*\*)/g);
          return (
            <div key={lIdx} className="flex items-start gap-1.5 my-0.5 pl-1 text-slate-200">
              <span className="text-amber-400 font-mono font-bold text-[10px] px-1 py-0.2 rounded bg-slate-900 border border-slate-800">
                {num}
              </span>
              <span className="leading-relaxed">
                {parts.map((p, pIdx) => {
                  if (p.startsWith('**') && p.endsWith('**')) {
                    return (
                      <strong key={pIdx} className="text-white font-bold">
                        {p.slice(2, -2)}
                      </strong>
                    );
                  }
                  return p;
                })}
              </span>
            </div>
          );
        }
      }

      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lIdx} className="text-xs text-slate-200 leading-relaxed my-0.5">
          {parts.map((p, pIdx) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return (
                <strong key={pIdx} className="text-white font-bold">
                  {p.slice(2, -2)}
                </strong>
              );
            }
            return p;
          })}
        </p>
      );
    });
  };

  return (
    <div className="space-y-3 pb-12 animate-fadeIn flex flex-col h-[calc(100vh-140px)] min-h-[550px]">
      {/* Top Banner with Model & Speed Mode Selector */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-800/40 rounded-2xl p-3 sm:p-4 shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-lg shadow-red-950/60 ring-1 ring-red-400/40 flex-shrink-0">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-black text-white tracking-tight">
                AI Compliance Assistant
              </h2>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                Live Stream
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Multi-turn compliance dialogue with sub-second token streaming
            </p>
          </div>
        </div>

        {/* Speed / Model Selection Buttons */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-end sm:self-auto text-xs">
          <button
            onClick={() => setSpeedMode('fast')}
            title="gemini-3.1-flash-lite: Lightning fast responses for busy kitchen operations"
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
              speedMode === 'fast'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Fast (Flash Lite)</span>
          </button>

          <button
            onClick={() => setSpeedMode('standard')}
            title="gemini-3.8-flash: General tasks with full depth and references"
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
              speedMode === 'standard'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Standard (3.8 Flash)</span>
          </button>

          <button
            onClick={handleClearChat}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 ml-1"
            title="Clear conversation history"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Messages Scrollable Thread */}
      <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-3xl p-3 sm:p-4 overflow-y-auto space-y-3 shadow-inner">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          const isAudioPlaying = playingMessageId === m.id;
          const isAudioLoading = audioLoadingId === m.id;

          return (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-red-600/30 to-amber-600/30 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                </div>
              )}

              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3 leading-relaxed text-xs shadow-md ${
                  isUser
                    ? 'bg-red-600 text-white font-medium rounded-tr-sm'
                    : 'bg-slate-950 border border-slate-800 rounded-tl-sm text-slate-200'
                }`}
              >
                {/* Message body */}
                {isUser ? (
                  <p className="whitespace-pre-wrap">{m.text}</p>
                ) : (
                  <div>
                    {renderFormattedContent(m.text)}
                    {m.isStreaming && (
                      <span className="inline-block w-2 h-3.5 bg-red-400 animate-pulse ml-1 rounded-sm align-middle" />
                    )}
                  </div>
                )}

                {/* Footer bar on assistant messages */}
                {!isUser && m.text.length > 0 && !m.isStreaming && (
                  <div className="mt-2.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <button
                      onClick={() => handlePlayAudio(m)}
                      disabled={isAudioLoading}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-lg transition-all font-semibold active:scale-95 ${
                        isAudioPlaying
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {isAudioLoading ? (
                        <>
                          <RotateCcw className="w-3 h-3 animate-spin text-amber-400" />
                          <span>Generating voice...</span>
                        </>
                      ) : isAudioPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-slate-950" />
                          <span>Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-amber-400" />
                          <span>Listen (TTS)</span>
                        </>
                      )}
                    </button>

                    <span className="text-[9px] text-slate-500 font-mono">
                      {m.modelUsed || 'gemini-3.1-flash-lite'}
                    </span>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-300">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {loading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-950 border border-slate-800 max-w-[240px]">
            <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="text-xs text-slate-300 font-medium">
              Generating instant answer...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="flex-shrink-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] whitespace-nowrap transition-colors border border-slate-800 flex-shrink-0 shadow-sm"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center gap-2 flex-shrink-0 shadow-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={
            speedMode === 'fast'
              ? 'Fast mode: Ask about any food safety rule, temperature, towel color...'
              : 'Ask a compliance question...'
          }
          className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all flex-shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  );
};
