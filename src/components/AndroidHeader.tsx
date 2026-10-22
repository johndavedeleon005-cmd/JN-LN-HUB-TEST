import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Sparkles, Smartphone, Monitor, Search, Bookmark, ShieldCheck, Flame, Lock, GraduationCap } from 'lucide-react';

interface AndroidHeaderProps {
  onSearchClick: () => void;
  bookmarksCount: number;
  onBookmarksClick: () => void;
  isPhoneFrame: boolean;
  togglePhoneFrame: () => void;
  onOpenAssistant: () => void;
  onOpenWelcomeModal?: () => void;
}

export const AndroidHeader: React.FC<AndroidHeaderProps> = ({
  onSearchClick,
  bookmarksCount,
  onBookmarksClick,
  isPhoneFrame,
  togglePhoneFrame,
  onOpenAssistant,
  onOpenWelcomeModal,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-sm select-none">
      {/* Android Native Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 text-xs text-slate-400 font-mono tracking-tight border-b border-slate-800/40">
        <span className="font-semibold text-slate-300">{time || '09:41'}</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="px-1 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-sans text-[10px] font-semibold">
            L&D 5G
          </span>
          <Wifi className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px]">98%</span>
            <Battery className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div 
          onClick={onOpenWelcomeModal}
          className={`flex items-center gap-2.5 min-w-0 ${onOpenWelcomeModal ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
          title="Click to view Learning and Development Training Hub & Team Info"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-amber-700 flex items-center justify-center shadow-lg shadow-red-950/50 ring-1 ring-red-400/30 flex-shrink-0">
            <Flame className="w-5 h-5 text-amber-200 fill-amber-200" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-tight text-white truncate">
                JIANGNAN HOTPOT
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-900/80 text-amber-200 border border-amber-600/50">
                L&D
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-700/50 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-amber-400" />
                <span>Confidential</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              L&D Training Hub • Internal Only
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* L&D Training Hub & Team Info */}
          {onOpenWelcomeModal && (
            <button
              onClick={onOpenWelcomeModal}
              title="Welcome to Learning and Development Training Hub & Team Info"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 hover:border-amber-400/60 text-amber-300 text-xs font-semibold active:scale-95 transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">L&D Hub</span>
            </button>
          )}

          {/* AI Compliance Ask Assistant */}
          <button
            onClick={onOpenAssistant}
            title="Ask Food Safety Assistant"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-red-600/20 to-amber-600/20 border border-red-500/30 hover:border-red-400 text-red-300 text-xs font-semibold active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Search button */}
          <button
            onClick={onSearchClick}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-300 active:scale-90 transition-all"
            title="Search documents"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks */}
          <button
            onClick={onBookmarksClick}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-300 relative active:scale-90 transition-all"
            title="Bookmarked documents"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Desktop Frame Switcher */}
          <button
            onClick={togglePhoneFrame}
            className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all"
            title={isPhoneFrame ? 'Switch to Full Width View' : 'Simulate Android Phone Frame'}
          >
            {isPhoneFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
