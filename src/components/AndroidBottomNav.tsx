import React from 'react';
import { BookOpen, Zap, Headphones, CheckSquare, Sparkles } from 'lucide-react';

export type TabType = 'library' | 'quickref' | 'audio' | 'audit' | 'assistant';

interface AndroidBottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isPlayingAudio?: boolean;
}

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  activeTab,
  onTabChange,
  isPlayingAudio = false,
}) => {
  const tabs = [
    {
      id: 'library' as TabType,
      label: 'Library',
      icon: BookOpen,
      badge: '22',
    },
    {
      id: 'quickref' as TabType,
      label: 'Quick Ref',
      icon: Zap,
    },
    {
      id: 'audio' as TabType,
      label: 'Audio TTS',
      icon: Headphones,
      activePulse: isPlayingAudio,
    },
    {
      id: 'audit' as TabType,
      label: 'Training',
      icon: CheckSquare,
    },
    {
      id: 'assistant' as TabType,
      label: 'AI Ask',
      icon: Sparkles,
      highlight: true,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 pb-safe shadow-2xl">
      <div className="flex items-center justify-around px-2 py-1 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-1 py-1.5 flex flex-col items-center justify-center relative group active:scale-95 transition-transform"
            >
              {/* Material 3 active pill indicator */}
              <div
                className={`relative px-4 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? 'bg-red-500/20 text-red-400 font-semibold shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 group-hover:bg-slate-800/50'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-red-400' : 'text-slate-400'
                  } ${tab.activePulse ? 'animate-bounce text-amber-400' : ''}`}
                />

                {tab.badge && (
                  <span className="absolute -top-1 -right-1 px-1 min-w-[15px] h-[15px] bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-slate-900">
                    {tab.badge}
                  </span>
                )}

                {tab.activePulse && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] mt-0.5 tracking-tight transition-colors ${
                  isActive ? 'text-red-400 font-bold' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
