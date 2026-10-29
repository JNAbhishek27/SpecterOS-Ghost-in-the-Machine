import React from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';
import { ActiveTab } from '../types/index.ts';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMuted: boolean;
  toggleMute: () => void;
  allCandlesLit: boolean;
  toggleAllCandles: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  toggleMute,
  allCandlesLit,
  toggleAllCandles,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md sticky top-0 z-50">
      {/* Zone 1: Brand wordmark */}
      <button
        onClick={() => setActiveTab('ofrenda')}
        className="text-xl font-bold tracking-tight text-amber-100 hover:text-amber-300 font-serif whitespace-nowrap shrink-0 transition-colors text-left"
      >
        SpecterOS
      </button>

      {/* Zone 2: 4-5 single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
        <button
          onClick={() => setActiveTab('ofrenda')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'ofrenda' ? 'text-amber-400 border-b border-amber-400' : ''
          }`}
        >
          Digital Ofrenda
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'terminal' ? 'text-amber-400 border-b border-amber-400' : ''
          }`}
        >
          NecroShell CLI
        </button>
        <button
          onClick={() => setActiveTab('seance')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'seance' ? 'text-amber-400 border-b border-amber-400' : ''
          }`}
        >
          Spirit Séance
        </button>
        <button
          onClick={() => setActiveTab('iot')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'iot' ? 'text-amber-400 border-b border-amber-400' : ''
          }`}
        >
          IoT Poltergeist
        </button>
        <button
          onClick={() => setActiveTab('submission')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'submission' ? 'text-amber-400 border-b border-amber-400' : ''
          }`}
        >
          DEV.to Post
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={toggleMute}
          title={isMuted ? 'Unmute atmospheric sounds' : 'Mute sounds'}
          className="p-2 text-neutral-400 hover:text-amber-300 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>

        <button
          onClick={toggleAllCandles}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            allCandlesLit
              ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40 hover:bg-amber-600/40'
              : 'bg-amber-600 text-neutral-950 font-semibold hover:bg-amber-500'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${allCandlesLit ? 'text-amber-400 fill-amber-400' : ''}`} />
          {allCandlesLit ? 'Extinguish Altar' : 'Light All Candles'}
        </button>
      </div>
    </header>
  );
};
