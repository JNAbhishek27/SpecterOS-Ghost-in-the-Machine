import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { DigitalOfrenda } from './components/DigitalOfrenda.tsx';
import { NecroShell } from './components/NecroShell.tsx';
import { SeanceChamber } from './components/SeanceChamber.tsx';
import { IoTGhostStory } from './components/IoTGhostStory.tsx';
import { DevSubmissionWriter } from './components/DevSubmissionWriter.tsx';
import { MarigoldPetals } from './components/MarigoldPetals.tsx';
import { ActiveTab, Ancestor, Candle } from './types/index.ts';
import { spectralAudio } from './utils/spectralAudio.ts';

const INITIAL_ANCESTORS: Ancestor[] = [
  {
    id: 'ada',
    name: 'Ada Lovelace',
    era: '1815 – 1852',
    role: 'Mother of Computer Programming',
    image: '/src/assets/images/spectral_ancestor_portrait_1793275375564.jpg',
    favoriteOffering: 'Black tea with lavender, punch card diagrams, fresh marigolds',
    memory: 'First to recognize that Charles Babbage’s Analytical Engine could process symbols beyond mere numbers, creating the first algorithm intended for a machine.',
    quote: 'The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.',
  },
  {
    id: 'turing',
    name: 'Alan Turing',
    era: '1912 – 1954',
    role: 'Pioneer of Artificial Intelligence & Cryptanalysis',
    image: '/src/assets/images/spectral_ancestor_portrait_1793275375564.jpg',
    favoriteOffering: 'Fresh crisp apples, chess pieces, radio schematics',
    memory: 'Broke the Enigma naval ciphers at Bletchley Park, formulated the Universal Turing Machine, and established the philosophical foundation for artificial intelligence.',
    quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
  },
  {
    id: 'hopper',
    name: 'Grace Hopper',
    era: '1906 – 1992',
    role: 'Rear Admiral & Compiler Pioneer',
    image: '/src/assets/images/spectral_ancestor_portrait_1793275375564.jpg',
    favoriteOffering: 'Strong naval coffee, mechanical relay tubes, one foot of wire (a nanosecond)',
    memory: 'Invented the first compiler (A-0), helped design COBOL so humans could write code in words rather than machine numbers, and taped the first literal computer bug into a logbook.',
    quote: 'The most dangerous phrase in the language is: We have always done it this way.',
  },
  {
    id: 'swartz',
    name: 'Aaron Swartz',
    era: '1986 – 2013',
    role: 'Open-Access Champion & RSS Architect',
    image: '/src/assets/images/spectral_ancestor_portrait_1793275375564.jpg',
    favoriteOffering: 'Open academic papers, Markdown files, dark roast espresso',
    memory: 'Co-created Markdown with John Gruber, co-designed RSS 1.0 at age 14, and fought fearlessly to ensure human knowledge remained accessible to every person on Earth.',
    quote: 'Information is power. But like all power, there are those who want to keep it for themselves.',
  },
  {
    id: 'ritchie',
    name: 'Dennis Ritchie',
    era: '1941 – 2011',
    role: 'Creator of the C Language & Co-Creator of Unix',
    image: '/src/assets/images/spectral_ancestor_portrait_1793275375564.jpg',
    favoriteOffering: 'Pan de Muerto, a quiet teletype terminal, pipe tobacco',
    memory: 'Created the C programming language and co-developed the Unix operating system at Bell Labs, laying the foundation on which nearly all modern software and operating systems rest.',
    quote: 'UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity.',
  },
  {
    id: 'mccarthy',
    name: 'John McCarthy',
    era: '1927 – 2011',
    role: 'Father of LISP & Artificial Intelligence',
    image: '/src/assets/images/spectral_ancestor_portrait_1793275375564.jpg',
    favoriteOffering: 'Warm Mexican hot chocolate, recursive fractals, chalk and blackboard',
    memory: 'Coined the term Artificial Intelligence in 1955, invented LISP, garbage collection, and pioneered timesharing systems.',
    quote: 'If you want the machine to possess intelligence, it must be capable of learning from its mistakes.',
  },
];

const INITIAL_CANDLES: Candle[] = [
  { id: 1, label: 'Ada Lovelace', isLit: true, tier: 'top' },
  { id: 2, label: 'Alan Turing', isLit: true, tier: 'top' },
  { id: 3, label: 'Grace Hopper', isLit: true, tier: 'top' },
  { id: 4, label: 'Dennis Ritchie', isLit: true, tier: 'middle' },
  { id: 5, label: 'Aaron Swartz', isLit: true, tier: 'middle' },
  { id: 6, label: 'John McCarthy', isLit: true, tier: 'middle' },
  { id: 7, label: 'Claude Shannon', isLit: false, tier: 'middle' },
  { id: 8, label: 'ALGOL 68', isLit: false, tier: 'base' },
  { id: 9, label: 'Macromedia Flash', isLit: false, tier: 'base' },
  { id: 10, label: 'HyperCard 1987', isLit: false, tier: 'base' },
  { id: 11, label: 'Our Teachers', isLit: true, tier: 'base' },
  { id: 12, label: 'The Lost Repos', isLit: true, tier: 'base' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('ofrenda');
  const [candles, setCandles] = useState<Candle[]>(INITIAL_CANDLES);
  const [ancestors, setAncestors] = useState<Ancestor[]>(INITIAL_ANCESTORS);
  const [isMuted, setIsMuted] = useState(false);

  const allCandlesLit = candles.every((c) => c.isLit);

  const toggleCandle = (id: number) => {
    setCandles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isLit: !c.isLit } : c))
    );
  };

  const toggleAllCandles = () => {
    const nextState = !allCandlesLit;
    if (nextState) {
      spectralAudio.playCandleIgnite();
    }
    setCandles((prev) => prev.map((c) => ({ ...c, isLit: nextState })));
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    spectralAudio.setMuted(nextMuted);
    if (!nextMuted) {
      spectralAudio.playCandleIgnite();
    }
  };

  const handleAddAncestor = (newAncestor: Ancestor) => {
    setAncestors((prev) => [newAncestor, ...prev]);
    // Also add a candle for the new soul
    setCandles((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: newAncestor.name,
        isLit: true,
        tier: 'middle',
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Drifting Marigold Petals Canvas (Cempasúchil) */}
      <MarigoldPetals intensity={activeTab === 'ofrenda' ? 32 : 14} />

      {/* Top Navigation Bar adhering to the Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        toggleMute={toggleMute}
        allCandlesLit={allCandlesLit}
        toggleAllCandles={toggleAllCandles}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-20">
        {activeTab === 'ofrenda' && (
          <DigitalOfrenda
            candles={candles}
            toggleCandle={toggleCandle}
            ancestors={ancestors}
            onAddAncestor={handleAddAncestor}
          />
        )}

        {activeTab === 'terminal' && <NecroShell />}

        {activeTab === 'seance' && <SeanceChamber />}

        {activeTab === 'iot' && <IoTGhostStory />}

        {activeTab === 'submission' && <DevSubmissionWriter />}
      </main>

      {/* Subdued Editorial Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950/80 py-8 px-6 text-xs text-neutral-500 font-serif z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">SpecterOS</span>
            <span aria-hidden="true">·</span>
            <span>Hacktoberfest 2026: Week 4 "Ghost in the Machine"</span>
            <span aria-hidden="true">·</span>
            <span>Honoring Día de los Muertos & Open-Source Memory</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <button
              onClick={() => setActiveTab('ofrenda')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Ofrenda
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              NecroShell
            </button>
            <button
              onClick={() => setActiveTab('seance')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Séance
            </button>
            <button
              onClick={() => setActiveTab('submission')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              DEV.to Draft
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
