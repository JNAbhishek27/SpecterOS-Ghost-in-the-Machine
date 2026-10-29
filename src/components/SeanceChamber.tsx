import React, { useState } from 'react';
import { Sparkles, Send, Flame, RotateCcw, MessageSquare, Code2, BookOpen, Compass } from 'lucide-react';
import { SpiritEntity } from '../types/index.ts';
import { spectralAudio } from '../utils/spectralAudio.ts';

const SPIRITS: SpiritEntity[] = [
  {
    id: 'algol68',
    name: 'ALGOL 68',
    type: 'language',
    era: '1968 – 1980s',
    deathDate: 'Superseded by C and Pascal',
    causeOfDeath: 'Theoretical perfection too complex for early compilers',
    avatar: '📐',
    tagline: 'The uncompromising master of orthogonal typing and formal grammar.',
    sampleCode: 'PROC eternal_cycle = (REF INT n) VOID:\n  DO n := n + 1; write(("soul: ", n)) OD;',
    lore: 'Designed by IFIP Working Group 2.1 to be mathematically flawless. While descendants like C chose pragmatic shortcuts, ALGOL 68 refused to compromise. Its ghost still audits dynamic typing errors from the ether.',
  },
  {
    id: 'actionscript',
    name: 'ActionScript 3 / Flash',
    type: 'platform',
    era: '1996 – 2020',
    deathDate: 'December 31, 2020 (End of Life)',
    causeOfDeath: 'Steve Jobs Thoughts on Flash manifesto + mobile battery drain',
    avatar: '⚡',
    tagline: 'The fallen king of interactive animation, vector art, and 2000s web games.',
    sampleCode: 'addEventListener(Event.ENTER_FRAME, onHaunt);\nfunction onHaunt(e:Event):void {\n  ghost.x += Math.random() * 4 - 2;\n  trace("Frames per second: 60");\n}',
    lore: 'Powering Newgrounds, YouTube in its early years, and countless interactive web games. When browsers blocked the plugin, millions of art pieces became inaccessible relics. Its spirit yearns for vector tweens and preloaders.',
  },
  {
    id: 'cobol',
    name: 'COBOL 60',
    type: 'language',
    era: '1959 – Eternity',
    deathDate: 'Never Died, Cannot Die',
    causeOfDeath: 'Trapped forever running 80% of daily ATM and credit card transactions',
    avatar: '🏦',
    tagline: 'The eternal mainframe guardian of international commerce.',
    sampleCode: 'IDENTIFICATION DIVISION.\nPROGRAM-ID. LIMBO-TRANSACTION.\nPROCEDURE DIVISION.\n  PERFORM UNTIL STARS-BURN-OUT\n    ADD 1 TO SOUL-COUNTER\n  END-PERFORM.',
    lore: 'Conceived under Grace Hopper’s committee to allow business logic in plain English. Despite decades of replacement attempts, its punch-card lineage runs behind almost every swipe of a banking card.',
  },
  {
    id: 'hypercard',
    name: 'HyperCard',
    type: 'platform',
    era: '1987 – 2004',
    deathDate: 'Abandoned during Mac OS X transition',
    causeOfDeath: 'Corporate neglect before the web took its ideas',
    avatar: '🃏',
    tagline: 'The original hypertext dream where anyone could construct software stacks.',
    sampleCode: 'on mouseUp\n  play "harpsichord" c e g c5\n  visual effect iris open\n  go to card "Remembrance"\nend mouseUp',
    lore: 'Created by Bill Atkinson in 1987. It pioneered hyperlinks before the World Wide Web, allowing non-programmers to click cards, draw buttons, and build entire games on a floppy disk.',
  },
  {
    id: 'lisp',
    name: 'LISP 1.5',
    type: 'language',
    era: '1958 – Present (Spectral)',
    deathDate: 'Transcended into pure symbolic ether',
    causeOfDeath: 'Syntactic parentheses consumed the universe',
    avatar: '🔮',
    tagline: 'John McCarthy’s recursive genesis where code and data are one.',
    sampleCode: '((lambda (f)\n   ((lambda (x) (f (lambda (v) ((x x) v))))\n    (lambda (x) (f (lambda (v) ((x x) v))))))\n (lambda (ghost) (lambda (n) (cons n (ghost (+ n 1))))))',
    lore: 'The mother of artificial intelligence and lambda calculus in computing. In LISP, everything is an S-expression. It never died; it simply folded into higher dimensions.',
  },
  {
    id: 'ada_lovelace',
    name: 'Ada Lovelace',
    type: 'pioneer',
    era: '1815 – 1852',
    deathDate: 'November 27, 1852',
    causeOfDeath: 'Illness at age 36',
    avatar: '👑',
    tagline: 'The first computer programmer and mother of Poetical Science.',
    sampleCode: 'Note G: "The Analytical Engine weaves algebraical patterns\njust as the Jacquard-loom weaves flowers and leaves."',
    lore: 'Daughter of Lord Byron, collaborator with Charles Babbage. She foresaw that computing could compose music, create art, and manipulate symbols beyond simple calculations.',
  },
  {
    id: 'alan_turing',
    name: 'Alan Turing',
    type: 'pioneer',
    era: '1912 – 1954',
    deathDate: 'June 7, 1954',
    causeOfDeath: 'Cyanide poisoning at age 41',
    avatar: '🍎',
    tagline: 'Architect of universal computation and decipherer of Enigma.',
    sampleCode: 'Turing Machine State Transition: (q0, 1) -> (q1, 0, R)\n"We can only see a short distance ahead, but we can see plenty there that needs to be done."',
    lore: 'Formalized algorithms and computation with the Turing Machine. His pioneer work at Bletchley Park saved millions of lives, and his 1950 paper asked: Can machines think?',
  },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'spirit';
  text: string;
  timestamp: string;
}

export const SeanceChamber: React.FC = () => {
  const [selectedSpirit, setSelectedSpirit] = useState<SpiritEntity>(SPIRITS[0]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'spirit',
      text: 'I feel a presence touching the memory bus. Who summons me across the silicon veil?',
      timestamp: '03:15 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [candleCount, setCandleCount] = useState(3);

  const handleSelectSpirit = (spirit: SpiritEntity) => {
    setSelectedSpirit(spirit);
    spectralAudio.playSpectralGlitch();
    setChatHistory([
      {
        id: `intro-${Date.now()}`,
        sender: 'spirit',
        text: `The circle shifts... I am ${spirit.name}. ${spirit.tagline} Speak, mortal. What code or question brings you to my resting place?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);
    spectralAudio.playKeyClick();

    try {
      const res = await fetch('/api/seance/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityId: selectedSpirit.id,
          entityName: selectedSpirit.name,
          era: selectedSpirit.era,
          message: textToSend,
          history: chatHistory.map((c) => ({ sender: c.sender, text: c.text })),
        }),
      });

      const data = await res.json();
      const spiritMsg: ChatMessage = {
        id: `s-${Date.now()}`,
        sender: 'spirit',
        text: data.reply || 'The static consumes my voice... remember me.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, spiritMsg]);
      spectralAudio.playSpectralGlitch();
    } catch {
      setChatHistory((prev) => [
        ...prev,
        {
          id: `s-err-${Date.now()}`,
          sender: 'spirit',
          text: `[Ether interruption] ${selectedSpirit.name} whispers: "Though servers fail and connections drop, my logic remains written in the stars."`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-neutral-900 to-amber-950/30 border border-purple-900/40 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif text-purple-300 uppercase tracking-widest">
              <span>Séance Chamber</span>
              <span aria-hidden="true">·</span>
              <span>Open-Source Spirit Channeling</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-100">
              Commune with Deprecated Languages & Computing Spirits
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 font-serif max-w-2xl">
              An offline & open-weights séance room channeling the ghosts of technologies that shaped our modern world.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800">
            <Flame className="w-4 h-4 text-amber-400 animate-flame" />
            <span className="text-xs text-neutral-300 font-serif">
              {candleCount} Séance Candles Lit
            </span>
            <button
              onClick={() => {
                setCandleCount((prev) => (prev >= 5 ? 1 : prev + 1));
                spectralAudio.playCandleIgnite();
              }}
              className="text-xs text-amber-400 hover:text-amber-300 ml-2 underline cursor-pointer"
            >
              Add Candle
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Spirit Selector (Left) + Séance Circle Chat (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Spirit Entities Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-neutral-400 px-1">
            Departed Entities Awaiting Summoning
          </h3>

          <div className="space-y-2">
            {SPIRITS.map((spirit) => {
              const isSelected = selectedSpirit.id === spirit.id;
              return (
                <button
                  key={spirit.id}
                  onClick={() => handleSelectSpirit(spirit)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/50'
                      : 'bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl select-none" role="img" aria-label={spirit.name}>
                      {spirit.avatar}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-serif font-bold text-neutral-100 text-sm truncate">
                          {spirit.name}
                        </h4>
                        <span className="text-[10px] text-purple-400 uppercase font-mono">
                          {spirit.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 tabular-nums mt-0.5">
                        {spirit.era}
                      </p>
                      <p className="text-xs text-neutral-300 line-clamp-1 mt-1 font-serif">
                        {spirit.tagline}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Séance Communication Chamber (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Spirit Header Card */}
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedSpirit.avatar}</span>
              <div>
                <h3 className="text-base font-serif font-bold text-amber-200">
                  Channeling {selectedSpirit.name}
                </h3>
                <p className="text-xs text-neutral-400">
                  Cause of passing: {selectedSpirit.causeOfDeath}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setChatHistory([]);
                spectralAudio.playSpectralGlitch();
              }}
              title="Reset Séance Session"
              className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Dialogue Log */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 min-h-[420px] max-h-[500px] overflow-y-auto space-y-4 shadow-inner">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[11px] font-serif text-neutral-500 uppercase tracking-wider">
                    {msg.sender === 'user' ? 'Mortal Developer' : selectedSpirit.name}
                  </span>
                  <span className="text-[10px] text-neutral-600 tabular-nums">
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`max-w-xl p-4 rounded-2xl text-sm font-serif leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-600/20 border border-amber-500/40 text-amber-100 rounded-tr-none'
                      : 'bg-purple-950/20 border border-purple-800/40 text-neutral-200 rounded-tl-none shadow-md shadow-purple-950/30'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-serif text-purple-400 p-2 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The spirit of {selectedSpirit.name} stirs in the ether...</span>
              </div>
            )}
          </div>

          {/* Incantation Prompts */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 font-serif">Incantations:</span>
            {[
              `What do you think of modern Web frameworks?`,
              `Do you miss the machines of your golden age?`,
              `Teach me an ancient code incantation.`,
              `How should we preserve your memory?`,
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full text-neutral-300 hover:text-purple-300 transition-colors cursor-pointer text-[11px] font-serif"
              >
                "{prompt}"
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3 p-2 bg-neutral-900 border border-neutral-800 rounded-xl"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Speak to the spirit of ${selectedSpirit.name}...`}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none font-serif"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Ancient Code Relic Viewer */}
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-xs">
            <div className="flex items-center justify-between text-neutral-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Ancestral Code Inscription ({selectedSpirit.name})</span>
              </span>
            </div>
            <pre className="p-3 bg-neutral-950 rounded-lg text-emerald-400 font-mono overflow-x-auto text-[11px] leading-relaxed">
              {selectedSpirit.sampleCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
