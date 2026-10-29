import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Skull, Radio, RotateCcw, Volume2, ShieldAlert } from 'lucide-react';
import { TerminalOutput } from '../types/index.ts';
import { spectralAudio } from '../utils/spectralAudio.ts';

export const NecroShell: React.FC = () => {
  const [phosphorColor, setPhosphorColor] = useState<'green' | 'amber' | 'blue' | 'ghost'>('green');
  const [isPossessed, setIsPossessed] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanlines, setScanlines] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const [logs, setLogs] = useState<TerminalOutput[]>([
    {
      id: 'boot-1',
      type: 'system',
      content: 'SpecterOS NecroShell v6.66-haunted (x86_64-spirit-limbo)',
      timestamp: '03:14:00',
    },
    {
      id: 'boot-2',
      type: 'system',
      content: 'Mounted virtual ectoplasm filesystem at /dev/spectral',
      timestamp: '03:14:01',
    },
    {
      id: 'boot-3',
      type: 'ghost',
      content: '... [A chilling whisper resonates through the bus lines: "WE STILL LIVE IN THIS MEMORY."] ...',
      timestamp: '03:14:02',
    },
    {
      id: 'boot-4',
      type: 'output',
      content: 'Type "help" to inspect haunted terminal commands or "necrofetch" to probe the hardware.',
      timestamp: '03:14:03',
    },
  ]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const colorClasses = {
    green: {
      text: 'text-emerald-400',
      glow: 'crt-glow-green',
      border: 'border-emerald-900/60',
      bg: 'bg-emerald-950/20',
      prompt: 'text-emerald-300',
    },
    amber: {
      text: 'text-amber-400',
      glow: 'crt-glow-amber',
      border: 'border-amber-900/60',
      bg: 'bg-amber-950/20',
      prompt: 'text-amber-300',
    },
    blue: {
      text: 'text-cyan-400',
      glow: 'crt-glow-blue',
      border: 'border-cyan-900/60',
      bg: 'bg-cyan-950/20',
      prompt: 'text-cyan-300',
    },
    ghost: {
      text: 'text-neutral-200',
      glow: 'crt-glow-ghost',
      border: 'border-neutral-800',
      bg: 'bg-neutral-900/30',
      prompt: 'text-neutral-300',
    },
  };

  const currentTheme = colorClasses[phosphorColor];

  const handleCommand = async (cmdString: string) => {
    const raw = cmdString.trim();
    if (!raw) return;

    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const newLogs: TerminalOutput[] = [
      ...logs,
      {
        id: `input-${Date.now()}`,
        type: 'input',
        content: `ghost@necro-box:~$ ${raw}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];

    spectralAudio.playKeyClick();

    // Check for local built-in commands
    if (cmd === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      newLogs.push({
        id: `help-${Date.now()}`,
        type: 'output',
        content: `AVAILABLE COMMANDS:
  necrofetch       Probe supernatural hardware and kernel status
  ls [-la]         List spiritual artifacts and forgotten memory sectors
  cat <file>       Read contents of ancestral scrolls & core dumps
  whoami           Query mortal / spectral identity
  ps aux           Display running haunted daemon processes
  kill -9 <pid>    Attempt exorcism on a possessed process
  resurrect <lang> Summon an ancient programming spirit (e.g. resurrect cobol)
  possess          Toggle terminal possession state (currently: ${isPossessed ? 'ACTIVE' : 'DORMANT'})
  theme <color>    Switch phosphor display (green | amber | blue | ghost)
  clear            Clear terminal screen`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } else if (cmd === 'ls') {
      newLogs.push({
        id: `ls-${Date.now()}`,
        type: 'output',
        content: `total 42
-rw-r--r--  1 ada_lovelace  ancestors   1843 Oct 29  soul.txt
-rw-r--r--  1 grace_hopper  spirits     1947 Sep  9  moth_relay70.log
-rwxr-xr-x  1 macromedia    ghosts     20100 Apr 12  actionscript_legacy.swc
drwxr-xr-x  2 turing        crypt        512 Jun 23  /lost+found/
drwxr-xr-x  4 mcCarthy      lisp        1958 Oct 31  /lambda_ether/
-rw-rw-r--  1 poltergeist   daemon       666 Oct 31  manifesto_of_the_dead.md`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } else if (cmd === 'whoami') {
      newLogs.push({
        id: `whoami-${Date.now()}`,
        type: 'output',
        content: isPossessed
          ? `USER: 0x00000000 (Mortal Shell borrowed by Entity #666)\nSTATUS: "You are the visitor. We were here before the BIOS was burned."`
          : `USER: guest (Unprivileged human terminal session)`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } else if (cmd === 'cat') {
      if (!args) {
        newLogs.push({
          id: `cat-err-${Date.now()}`,
          type: 'error',
          content: 'cat: missing file operand. Try "cat soul.txt" or "cat moth_relay70.log"',
          timestamp: new Date().toLocaleTimeString(),
        });
      } else if (args.includes('soul')) {
        newLogs.push({
          id: `cat-soul-${Date.now()}`,
          type: 'output',
          content: `=== RECOVERED FRAGMENT FROM ARCHIVAL CORE ===\n"The Analytical Engine has no pretensions whatever to originate anything.\nIt can do whatever we know how to order it to perform.\nYet when the lights turn low and the fans fall silent,\nsomething between the punched cards continues to whisper."\n— Ada Augusta, Countess of Lovelace (1843)`,
          timestamp: new Date().toLocaleTimeString(),
        });
      } else if (args.includes('moth')) {
        newLogs.push({
          id: `cat-moth-${Date.now()}`,
          type: 'output',
          content: `=== NAVAL OBSERVATORY RELAY LOG 1947 ===\n1545 Relay #70 Panel F (moth) in relay.\nFirst actual case of bug being found.\nThe moth has long turned to dust, but its spirit resides in every unhandled NullPointerException in perpetuity.`,
          timestamp: new Date().toLocaleTimeString(),
        });
      } else {
        newLogs.push({
          id: `cat-other-${Date.now()}`,
          type: 'output',
          content: `cat: ${args}: file is bound by an ancient cryptographic seal. Only open-weights key can decipher it.`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } else if (cmd === 'ps') {
      newLogs.push({
        id: `ps-${Date.now()}`,
        type: 'output',
        content: `PID  TTY      STAT   TIME COMMAND
  1  ?        Ss     0:01 /sbin/init (eternal)
 42  pts/0    S+     4:04 /bin/necrosh --paranormal
 666 ?        D      9:99 [poltergeist-d] <spectral lock>
 777 ?        Sl     1:23 [ebcdic-loop] <waiting on punchcards>
1987 ?        S      0:42 [hypercard-xcmd] <listening on stack>`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } else if (cmd === 'kill') {
      if (args.includes('666')) {
        newLogs.push({
          id: `kill-${Date.now()}`,
          type: 'ghost',
          content: `kill: (666) - Operation not permitted. You cannot slay that which has already halted! The ghost chuckles in hex.`,
          timestamp: new Date().toLocaleTimeString(),
        });
        spectralAudio.playSpectralGlitch();
      } else {
        newLogs.push({
          id: `kill-ok-${Date.now()}`,
          type: 'output',
          content: `Process terminated. A quiet cold wind passes through the vents.`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } else if (cmd === 'resurrect') {
      const target = args || 'algol';
      newLogs.push({
        id: `res-${Date.now()}`,
        type: 'system',
        content: `[+] Commencing resurrection ritual for ${target.toUpperCase()}...`,
        timestamp: new Date().toLocaleTimeString(),
      });
      newLogs.push({
        id: `res-reply-${Date.now()}`,
        type: 'ghost',
        content: `I AM AWAKE. Did you bring punch cards? Or do you seek to entrap me in modern web workers? Speak your petition!`,
        timestamp: new Date().toLocaleTimeString(),
      });
      spectralAudio.playSpectralGlitch();
    } else if (cmd === 'possess') {
      const nextState = !isPossessed;
      setIsPossessed(nextState);
      newLogs.push({
        id: `pos-${Date.now()}`,
        type: 'system',
        content: `Possession mode is now: ${nextState ? 'ENGAGED (Spirits will possess your keystrokes)' : 'DISENGAGED (Cold rational shell)'}`,
        timestamp: new Date().toLocaleTimeString(),
      });
      if (nextState) spectralAudio.playSpectralGlitch();
    } else if (cmd === 'theme') {
      if (['green', 'amber', 'blue', 'ghost'].includes(args)) {
        setPhosphorColor(args as 'green' | 'amber' | 'blue' | 'ghost');
        newLogs.push({
          id: `th-${Date.now()}`,
          type: 'system',
          content: `Phosphor cathode ray tuned to ${args.toUpperCase()} spectrum.`,
          timestamp: new Date().toLocaleTimeString(),
        });
      } else {
        newLogs.push({
          id: `th-err-${Date.now()}`,
          type: 'error',
          content: `Usage: theme <green | amber | blue | ghost>`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } else if (cmd === 'necrofetch') {
      newLogs.push({
        id: `nf-${Date.now()}`,
        type: 'output',
        content: `           .---.           ghost@necro-mainframe
          /     \\          ---------------------
         | () () |         OS: SpecterOS 1982.10 (x86_64-spectral)
          \\  -  /          Kernel: 6.6.6-ectoplasm-lts
           |||||           Uptime: 42 years, 3 months, 14 days in Limbo
           |||||           Packages: 1031 (dpkg-departed)
                           Shell: necrosh 6.66
                           Terminal: /dev/ttyS0 (VT100 Phosphor Tube)
                           CPU: MOS 6502 @ 1.023 MHz (Overclocked by spirits)
                           Memory: 64KB / 64KB [100% Leaked into Ether]
                           Disk: 5.25" Floppy Diskette [Haunted]`,
        timestamp: new Date().toLocaleTimeString(),
      });
    } else {
      // Unknown command: if possessed, invoke ghost commentary
      if (isPossessed) {
        setIsProcessing(true);
        try {
          const res = await fetch('/api/terminal/ghost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: cmd, args }),
          });
          const data = await res.json();
          newLogs.push({
            id: `ghost-${Date.now()}`,
            type: 'ghost',
            content: `ghost: ${data.ghostWhisper || 'bash: command not recognized by the living or the dead.'}`,
            timestamp: new Date().toLocaleTimeString(),
          });
          spectralAudio.playSpectralGlitch();
        } catch {
          newLogs.push({
            id: `ghost-err-${Date.now()}`,
            type: 'ghost',
            content: `ghost: [unhandled-spectral-fault: 0xDEADBEEF] You type commands unknown to this realm.`,
            timestamp: new Date().toLocaleTimeString(),
          });
        } finally {
          setIsProcessing(false);
        }
      } else {
        newLogs.push({
          id: `err-${Date.now()}`,
          type: 'error',
          content: `necrosh: command not found: ${cmd}. Type "help" for valid commands.`,
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else {
      spectralAudio.playKeyClick();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Terminal Title & Controls Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
        <div className="flex items-center gap-3">
          <TerminalIcon className={`w-5 h-5 ${currentTheme.text}`} />
          <div>
            <h2 className="text-sm font-mono font-bold text-neutral-100 flex items-center gap-2">
              <span>NecroShell: The Possessed Terminal</span>
              {isPossessed && (
                <span className="text-[10px] bg-red-950/60 text-red-400 border border-red-800/50 px-2 py-0.5 rounded font-mono uppercase tracking-wider animate-pulse">
                  Ghost Active
                </span>
              )}
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              VT100 CRT Shell possessed by departed system daemons
            </p>
          </div>
        </div>

        {/* Phosphor & Effect Controls */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setPhosphorColor('green')}
              className={`px-2 py-1 rounded transition-colors ${
                phosphorColor === 'green' ? 'bg-emerald-950 text-emerald-400 font-bold' : 'text-neutral-400'
              }`}
            >
              Green
            </button>
            <button
              onClick={() => setPhosphorColor('amber')}
              className={`px-2 py-1 rounded transition-colors ${
                phosphorColor === 'amber' ? 'bg-amber-950 text-amber-400 font-bold' : 'text-neutral-400'
              }`}
            >
              Amber
            </button>
            <button
              onClick={() => setPhosphorColor('blue')}
              className={`px-2 py-1 rounded transition-colors ${
                phosphorColor === 'blue' ? 'bg-cyan-950 text-cyan-400 font-bold' : 'text-neutral-400'
              }`}
            >
              Azure
            </button>
            <button
              onClick={() => setPhosphorColor('ghost')}
              className={`px-2 py-1 rounded transition-colors ${
                phosphorColor === 'ghost' ? 'bg-neutral-800 text-neutral-200 font-bold' : 'text-neutral-400'
              }`}
            >
              Ghost
            </button>
          </div>

          <button
            onClick={() => setIsPossessed(!isPossessed)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isPossessed
                ? 'bg-red-950/40 border-red-800/60 text-red-300'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400'
            }`}
          >
            <Skull className="w-3.5 h-3.5" />
            <span>{isPossessed ? 'Exorcise' : 'Possess'}</span>
          </button>

          <button
            onClick={() => setScanlines(!scanlines)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
              scanlines
                ? 'bg-neutral-800 border-neutral-700 text-neutral-200'
                : 'bg-neutral-950 border-neutral-800 text-neutral-500'
            }`}
          >
            CRT Lines
          </button>
        </div>
      </div>

      {/* CRT Monitor Housing */}
      <div className="relative rounded-2xl bg-neutral-950 p-4 sm:p-8 border-4 border-neutral-800 shadow-2xl overflow-hidden">
        {/* CRT Scanline Overlay */}
        {scanlines && (
          <div className="absolute inset-0 pointer-events-none crt-scanlines z-20 opacity-80" />
        )}

        {/* Vintage Vignette and Curve glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-neutral-950/40 to-neutral-950/90 z-10" />

        {/* Terminal Screen Canvas */}
        <div
          onClick={() => inputRef.current?.focus()}
          className={`relative min-h-[440px] font-mono text-sm leading-relaxed p-4 rounded-lg cursor-text z-0 overflow-y-auto max-h-[550px] ${currentTheme.text} ${currentTheme.glow}`}
        >
          {logs.map((log) => {
            if (log.type === 'system') {
              return (
                <div key={log.id} className="opacity-80 text-xs py-0.5">
                  <span className="text-neutral-500 mr-2">[{log.timestamp}]</span>
                  <span>{log.content}</span>
                </div>
              );
            }
            if (log.type === 'ghost') {
              return (
                <div key={log.id} className="text-red-400 font-bold py-1 my-1 border-l-2 border-red-500/60 pl-2 bg-red-950/20">
                  <span className="text-red-500/80 mr-2">[{log.timestamp}]</span>
                  <span>{log.content}</span>
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={log.id} className="text-rose-400 py-0.5">
                  <span className="text-neutral-500 mr-2">[{log.timestamp}]</span>
                  <span>{log.content}</span>
                </div>
              );
            }
            if (log.type === 'input') {
              return (
                <div key={log.id} className="font-semibold py-0.5 mt-2">
                  <span className="text-amber-500/80 mr-2">[{log.timestamp}]</span>
                  <span>{log.content}</span>
                </div>
              );
            }
            return (
              <pre key={log.id} className="whitespace-pre-wrap py-0.5 font-mono text-xs md:text-sm">
                {log.content}
              </pre>
            );
          })}

          {isProcessing && (
            <div className="animate-pulse text-xs text-neutral-400 py-1">
              ... [The bus lines tremble with spectral reply] ...
            </div>
          )}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 mt-3 pt-1">
            <span className={`font-mono text-xs md:text-sm select-none ${currentTheme.prompt}`}>
              {isPossessed ? 'possessed@machine:~$ ' : 'guest@machine:~$ '}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm ${currentTheme.text} ${currentTheme.glow}`}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Suggested Quick Commands */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
        <span className="text-neutral-500">Quick Summon:</span>
        {['necrofetch', 'ls -la', 'cat soul.txt', 'whoami', 'ps aux', 'resurrect flash', 'resurrect cobol', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
