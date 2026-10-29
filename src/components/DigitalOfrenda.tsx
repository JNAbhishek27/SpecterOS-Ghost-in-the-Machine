import React, { useState } from 'react';
import { Sparkles, Plus, Feather, Heart, Bell, Music2, Share2, Check } from 'lucide-react';
import { Ancestor, Candle } from '../types/index.ts';
import { VeladoraCandle } from './VeladoraCandle.tsx';
import { spectralAudio } from '../utils/spectralAudio.ts';

interface DigitalOfrendaProps {
  candles: Candle[];
  toggleCandle: (id: number) => void;
  ancestors: Ancestor[];
  onAddAncestor: (newAncestor: Ancestor) => void;
}

export const DigitalOfrenda: React.FC<DigitalOfrendaProps> = ({
  candles,
  toggleCandle,
  ancestors,
  onAddAncestor,
}) => {
  const [selectedAncestor, setSelectedAncestor] = useState<Ancestor | null>(ancestors[0] || null);
  const [isAddingMemorial, setIsAddingMemorial] = useState(false);
  const [copiedPoem, setCopiedPoem] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formEra, setFormEra] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formOffering, setFormOffering] = useState('');
  const [formMemory, setFormMemory] = useState('');

  // Poem generation state
  const [poem, setPoem] = useState<string>('');
  const [isComposingPoem, setIsComposingPoem] = useState(false);

  const handleComposePoem = async (ancestor: Ancestor) => {
    setIsComposingPoem(true);
    spectralAudio.playSacredBell();

    try {
      const res = await fetch('/api/ofrenda/poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          honoree: ancestor.name,
          relation: ancestor.role,
          favoriteThings: ancestor.favoriteOffering,
          memory: ancestor.memory,
        }),
      });
      const data = await res.json();
      setPoem(data.poem || 'Memory eternal in the cempasúchil light.');
    } catch {
      setPoem(
        `A Cempasúchil Offering for ${ancestor.name}\n\nGolden marigolds pave the way tonight,\nIlluminated by soft veladora light.\nYour memory remains unbroken and clear,\nAs departed friends draw warmly near.`
      );
    } finally {
      setIsComposingPoem(false);
    }
  };

  const handleSaveMemorial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newMemorial: Ancestor = {
      id: `custom-${Date.now()}`,
      name: formName.trim(),
      era: formEra.trim() || 'Timeless',
      role: formRole.trim() || 'Honored Soul & Guide',
      image: '/src/assets/images/spectral_ancestor_portrait_1793275375564.jpg',
      favoriteOffering: formOffering.trim() || 'Pan de Muerto and hot chocolate',
      memory: formMemory.trim() || 'Their kindness and wisdom remain our guiding star.',
      quote: 'Live warmly, for memory is the only bridge between worlds.',
      isCustom: true,
    };

    onAddAncestor(newMemorial);
    setSelectedAncestor(newMemorial);
    setIsAddingMemorial(false);
    spectralAudio.playSacredBell();

    // Reset
    setFormName('');
    setFormEra('');
    setFormRole('');
    setFormOffering('');
    setFormMemory('');
  };

  const copyToClipboard = () => {
    if (!poem) return;
    navigator.clipboard.writeText(poem);
    setCopiedPoem(true);
    setTimeout(() => setCopiedPoem(false), 2000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Marquee Section */}
      <section className="relative rounded-2xl overflow-hidden border border-amber-900/40 bg-neutral-900/90 shadow-2xl">
        <div className="relative h-72 md:h-96 w-full overflow-hidden">
          <img
            src="/src/assets/images/ofrenda_altar_marigolds_1793275373469.jpg"
            alt="Día de los Muertos Altar glowing with marigolds and candles"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:left-10 md:bottom-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-serif mb-2">
              <span>Noviembre 1 & 2 · Día de los Muertos</span>
              <span aria-hidden="true">·</span>
              <span>Hacktoberfest 2026: Week 4</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-100 tracking-tight text-balance leading-tight">
              The Digital Ofrenda Sanctuary
            </h1>
            <p className="mt-2 text-sm md:text-base text-neutral-300 max-w-2xl font-serif leading-relaxed">
              Where open-source memory defies deprecation. Light a veladora, offer marigold petals, and honor the computing ancestors and loved ones whose spirits echo through the machine.
            </p>
          </div>
        </div>

        {/* Altar Tiered Candles Ribbon */}
        <div className="p-6 md:p-8 bg-neutral-950/80 border-t border-amber-900/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-serif font-semibold text-amber-200 uppercase tracking-wider">
                Altar Veladoras (Click to light or extinguish)
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Every flickering flame provides warmth and guides souls through the digital ether
              </p>
            </div>
            <button
              onClick={() => spectralAudio.playSacredBell()}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors cursor-pointer py-1 px-2.5 rounded bg-amber-950/40 border border-amber-800/40"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Ring Altar Bell</span>
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-4 items-end justify-center py-2">
            {candles.map((candle) => (
              <VeladoraCandle
                key={candle.id}
                id={candle.id}
                label={candle.label}
                isLit={candle.isLit}
                onToggle={toggleCandle}
                size={candle.tier === 'top' ? 'lg' : candle.tier === 'middle' ? 'md' : 'sm'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Sanctuary Two-Column Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ancestors & Memorial Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-neutral-100">
                Honored Spirits on the Altar
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Founders of computing, departed open-source visionaries, and personal loved ones
              </p>
            </div>

            <button
              onClick={() => setIsAddingMemorial(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-700/50 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Remembrance</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ancestors.map((anc) => {
              const isSelected = selectedAncestor?.id === anc.id;
              return (
                <div
                  key={anc.id}
                  onClick={() => {
                    setSelectedAncestor(anc);
                    spectralAudio.playKeyClick();
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 relative group overflow-hidden ${
                    isSelected
                      ? 'bg-neutral-900 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40'
                      : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-amber-600/40 bg-neutral-800">
                      <img
                        src={anc.image}
                        alt={anc.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter sepia-[0.35]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-semibold text-neutral-100 truncate text-base">
                          {anc.name}
                        </h3>
                      </div>
                      <p className="text-xs text-amber-400/90 font-serif truncate mt-0.5">
                        {anc.role}
                      </p>
                      <p className="text-[11px] text-neutral-400 tabular-nums">
                        {anc.era}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 line-clamp-2 mt-3 font-serif italic">
                    "{anc.quote}"
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="truncate">Offering: {anc.favoriteOffering}</span>
                    {anc.isCustom && (
                      <span className="text-amber-400 text-[10px] uppercase tracking-wider font-semibold">
                        Family
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Spirit Focus & Calaverita Composer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedAncestor ? (
            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-amber-900/50 shadow-xl space-y-6 sticky top-24">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-amber-400 font-serif">
                    Ofrenda Altar Tablet
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-amber-100 mt-1">
                    {selectedAncestor.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                    <span>{selectedAncestor.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{selectedAncestor.era}</span>
                  </div>
                </div>

                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-md">
                  <img
                    src={selectedAncestor.image}
                    alt={selectedAncestor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.3]"
                  />
                </div>
              </div>

              {/* Memory & Offering */}
              <div className="space-y-3 py-3 border-y border-neutral-800 text-sm">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                    Tradición & Favorite Offering
                  </span>
                  <p className="text-amber-200 font-serif">
                    {selectedAncestor.favoriteOffering}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                    Enduring Legacy
                  </span>
                  <p className="text-neutral-300 font-serif leading-relaxed text-xs">
                    {selectedAncestor.memory}
                  </p>
                </div>
              </div>

              {/* Compose Poem Action */}
              <div className="space-y-3">
                <button
                  onClick={() => handleComposePoem(selectedAncestor)}
                  disabled={isComposingPoem}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-950/50"
                >
                  <Feather className="w-4 h-4" />
                  <span>
                    {isComposingPoem ? 'Weaving Calaverita...' : 'Compose Remembrance Calaverita'}
                  </span>
                </button>

                {poem && (
                  <div className="p-4 rounded-xl bg-neutral-950 border border-amber-800/40 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-serif">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Calaverita Literaria</span>
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-amber-300 cursor-pointer transition-colors"
                      >
                        {copiedPoem ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                        <span>{copiedPoem ? 'Copied!' : 'Copy Verse'}</span>
                      </button>
                    </div>

                    <pre className="font-serif text-xs text-neutral-200 whitespace-pre-wrap leading-relaxed">
                      {poem}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center">
              <p className="text-neutral-400 text-sm">Select an honored spirit to view remembrance</p>
            </div>
          )}
        </div>
      </section>

      {/* Add Custom Memorial Modal */}
      {isAddingMemorial && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-900/70 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-100">
                  Add to the Virtual Ofrenda
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Honor a departed relative, mentor, teacher, or forgotten engineer
                </p>
              </div>
              <button
                onClick={() => setIsAddingMemorial(false)}
                className="text-neutral-400 hover:text-neutral-200 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMemorial} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1 font-medium">
                  Name of Honored Person / Project *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Abuela Elena / Dennis Ritchie / My First Linux Box"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">
                    Years / Era
                  </label>
                  <input
                    type="text"
                    value={formEra}
                    onChange={(e) => setFormEra(e.target.value)}
                    placeholder="e.g. 1934 – 2021"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">
                    Role / Relationship
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Beloved Grandmother / Mentor"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">
                  Favorite Offerings & Passions
                </label>
                <input
                  type="text"
                  value={formOffering}
                  onChange={(e) => setFormOffering(e.target.value)}
                  placeholder="e.g. Cinnamon coffee, pan dulce, listening to boleros"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">
                  Cherished Memory or Lesson
                </label>
                <textarea
                  rows={3}
                  value={formMemory}
                  onChange={(e) => setFormMemory(e.target.value)}
                  placeholder="What is the story or value they passed down to you?"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingMemorial(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Place on Altar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
