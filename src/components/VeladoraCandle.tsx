import React from 'react';
import { spectralAudio } from '../utils/spectralAudio.ts';

interface VeladoraCandleProps {
  id: number;
  label?: string;
  isLit: boolean;
  onToggle: (id: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const VeladoraCandle: React.FC<VeladoraCandleProps> = ({
  id,
  label,
  isLit,
  onToggle,
  size = 'md',
}) => {
  const handleClick = () => {
    if (!isLit) {
      spectralAudio.playCandleIgnite();
    }
    onToggle(id);
  };

  const heights = {
    sm: 'h-10 w-6',
    md: 'h-14 w-8',
    lg: 'h-20 w-11',
  };

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      <button
        onClick={handleClick}
        className="relative group cursor-pointer focus:outline-none"
        title={isLit ? 'Extinguish flame' : 'Light candle (Click)'}
        aria-label={label ? `${label} candle: ${isLit ? 'lit' : 'unlit'}` : 'Veladora candle'}
      >
        {/* Flame element */}
        <div className="h-6 flex items-end justify-center">
          {isLit ? (
            <div className="relative">
              {/* Outer soft ambient flame glow */}
              <div className="absolute -inset-2 bg-amber-500/30 rounded-full blur-md animate-pulse" />
              {/* Main flickering flame */}
              <div className="w-3 h-5 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 rounded-full rounded-t-full animate-flame shadow-[0_0_12px_#f59e0b]" />
              {/* Wick */}
              <div className="w-0.5 h-1.5 bg-neutral-800 mx-auto" />
            </div>
          ) : (
            <div className="w-0.5 h-2 bg-neutral-600 opacity-60" />
          )}
        </div>

        {/* Glass candle jar */}
        <div
          className={`${heights[size]} relative rounded-t-sm rounded-b-md border border-amber-900/40 overflow-hidden transition-all duration-300 ${
            isLit
              ? 'bg-gradient-to-b from-amber-700/50 via-amber-900/60 to-amber-950/80 shadow-[0_4px_16px_rgba(245,158,11,0.25)]'
              : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          {/* Wax filling level */}
          <div
            className={`absolute bottom-0 inset-x-0 h-4/5 transition-colors duration-300 ${
              isLit ? 'bg-amber-100/20' : 'bg-neutral-800/40'
            }`}
          />

          {/* Calavera / sacred cross etched detail */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 text-[9px] font-serif text-amber-200">
            ✝
          </div>
        </div>
      </button>

      {label && (
        <span className="text-[11px] text-neutral-400 max-w-[80px] text-center truncate font-serif">
          {label}
        </span>
      )}
    </div>
  );
};
