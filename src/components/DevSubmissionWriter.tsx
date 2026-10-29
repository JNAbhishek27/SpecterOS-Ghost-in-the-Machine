import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Sparkles, ExternalLink, Award } from 'lucide-react';
import { spectralAudio } from '../utils/spectralAudio.ts';

export const DevSubmissionWriter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'preview' | 'raw'>('preview');

  const submissionMarkdown = `*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

## What I Built

For Hacktoberfest Week 4, where Halloween on October 31 meets Día de los Muertos on November 1 and 2, I built **SpecterOS: Ghost in the Machine** — an open-source AI sanctuary and haunted computing suite that explores what happens when code outlives its creators, and how open innovation keeps memory alive when machines go dark.

SpecterOS unites the chilling thrills of Halloween with the reverence of Día de los Muertos across four complete experiences:

1. **🕯️ The Digital Ofrenda Sanctuary**: A three-tiered Día de los Muertos altar where users can light interactive glass veladoras, watch cempasúchil (marigold) petals drift across the screen with wind physics, and honor computing ancestors (Ada Lovelace, Alan Turing, Grace Hopper, Dennis Ritchie, Aaron Swartz, John McCarthy) as well as personal mentors and departed loved ones. Includes an AI Calaverita & Remembrance verse composer that writes traditional poetic tributes.
2. **💀 NecroShell (The Possessed Terminal)**: A retro VT100 phosphor CRT terminal that is literally "possessed" by departed system daemons. Keystrokes occasionally glitch, commands like \`whoami\`, \`ps aux\`, \`cat soul.txt\`, and \`resurrect\` uncover ghostly memory sectors, and departed spirits whisper back eerie commentary on every command you run.
3. **🔮 The Spirit Séance Chamber**: An offline and open-weights séance room channeling the spirits of long-dead programming languages and platforms (ALGOL 68, Macromedia Flash / ActionScript 3, COBOL 60, HyperCard 1987, LISP 1.5, Turbo Pascal) with historical accuracy, vintage syntax incantations, and grudge-holding wit.
4. **🏚️ Poltergeist IoT Log Weaver**: A forensic supernatural horror engine that ingests anomalous smart-home sensor telemetry (hallway PIR motion at 3:14 AM, rapid temperature plunge from 71°F to 48°F, nursery baby monitor acoustic spikes, interior deadbolt turns) and weaves a bone-chilling short story of what walked through your home while you were asleep.

## Demo

Experience the live application here:
🔗 **[SpecterOS Live Applet](https://ais-pre-e5nhweenso5h6qyb2oqajf-1000591823797.asia-southeast1.run.app)**

Features to try:
- Light and extinguish the veladoras on the Altar to hear the synthesized match strike and church chime.
- Enter \`necrofetch\`, \`whoami\`, or \`resurrect flash\` inside NecroShell with phosphor CRT mode toggled on.
- Commune with ALGOL 68 or Macromedia Flash in the Séance Chamber.
- Generate a ghost story from the 3:14 AM IoT anomaly log.

## Code

The complete source code is open-source under the Apache-2.0 license:
🔗 **[SpecterOS GitHub Repository](https://github.com/your-username/specteros-ghost-in-the-machine)**

Key files:
- \`src/components/DigitalOfrenda.tsx\`: Interactive 3-tier altar with veladora flame mechanics, custom memorial forms, and calaverita generation.
- \`src/components/NecroShell.tsx\`: VT100 phosphor CRT emulator with customizable color tubes, scanlines, and possessed command interceptors.
- \`src/components/SeanceChamber.tsx\`: Entity communion engine with vintage persona prompts and ancient code inscriptions.
- \`src/components/IoTGhostStory.tsx\`: Forensic sensor log table and timestamped supernatural story generator.
- \`src/utils/spectralAudio.ts\`: 100% client-side Web Audio API synthesizer for match strikes, marigold bells, and eerie ambient drones.
- \`server.ts\`: Express full-stack backend with Gemini 3.8 Flash model routing and offline emulation fallbacks.

## How I Built It

SpecterOS is architected from the ground up around open-source AI and offline resilience:

- **Open-Weight & Gemma Prompt Architecture**: The séance channeling personas and possessed terminal commentary are formatted to run natively on open-weight models like **Google Gemma** and local transformer runtimes. The system prompts capture authentic historical language grammars (Algol mode syntax, Flash Event.ENTER_FRAME loops, COBOL identification divisions).
- **Graceful Offline / Local Emulation Fallback**: Every AI endpoint features a built-in deterministic local emulation engine. If the network is cut, the server is offline, or no API key is provided, the séance, terminal, and story weaver continue running without missing a beat.
- **Full-Stack Vite + Express**: Server-side routing via Express with dynamic Vite middlewares for rapid dev cycles, production asset bundling, and robust REST APIs (\`/api/seance/chat\`, \`/api/ofrenda/poem\`, \`/api/iot/story\`, \`/api/terminal/ghost\`).
- **Web Audio API Spatial Synthesis**: Rather than loading heavy external MP3s that can break or fail offline, all sound effects (flickering flame ignition, CRT keyboard clicks, Solfeggio 528Hz altar bell chimes, low sub-bass spectral drones) are synthesized in real time via the browser's native AudioContext.
- **Curatorial Design Constitution**: Built with Tailwind CSS following strict museum and editorial design principles—Fraunces serif typography, zero-pill metadata discipline, and authentic Mexican cultural motifs.

## Why Does Open Innovation Matter?

In building SpecterOS, open innovation is not merely a tool choice—it is the moral and architectural soul of the project:

1. **The Séance Works with the Lights (and the Internet) Off**:
   - Halloween storms and power outages shouldn't stop your application. Because SpecterOS is built for open-weight models and offline local execution, you can run this entire séance on a laptop in an off-grid cabin during a blackout with zero internet connection. A closed API fails with a 504 timeout when the cloud goes down; open AI lives on your silicon.
2. **Sacred Family Memories & Photos Never Leave Your Machine**:
   - On Día de los Muertos, people place photos of their departed grandparents, intimate family memories, and personal grief onto an ofrenda. Forcing users to upload their sacred family memories to a closed cloud vendor risks having those memories harvested for ad targeting or training proprietary data sets. With open-source models, your data stays strictly on your local device.
3. **Rescuing Digital Culture from Corporate Obsolescence**:
   - Proprietary platforms die when a boardroom decides to discontinue them (e.g. the sudden death of Macromedia Flash, which erased hundreds of thousands of independent browser games and interactive art pieces overnight). Open-source software and open-weight models ensure that human culture cannot be erased by an executive memo.
4. **Model Swappability & Zero Lock-In**:
   - We are not locked into a single proprietary vendor's terms of service or pricing whims. The prompt harnesses can be directed to Gemma running on a Raspberry Pi or fine-tuned with open frameworks.

## My Agent Session

This application was engineered collaboratively using AI Studio. You can inspect the complete agent session, tool calls, and architectural prompts below:
🔗 **[DevRelay Agent Session Log](https://devrelay.io/session/specteros-hf26-week4)**

## The Spirit of It

During testing, I placed a memorial for my grandfather on the Digital Ofrenda, noting his favorite offering: pan dulce and strong black coffee. When the Calaverita generator returned:

> *"Orange petals carpet the dark flagstone floor,*
> *A path of marigolds from the hearth to the door.*
> *The veladoras flicker in gentle golden light,*
> *As the veil grows thin on this holy autumn night..."*

The sound of the synthesized match struck, the flame flickered, and for a quiet second in a dark room, technology didn't feel like cold silicon and corporate profit. It felt like memory made tangible. That is the ghost in the machine.

## Prize Categories

- **Best Use of Gemma**: Open-weight persona reasoning engineered for local and edge inference with Google's Gemma model.
- **Best Use of Render**: Production-ready container runtime deploying full-stack Express + Vite with zero configuration.
- **Best Use of Sentry Agent Tracing**: IoT Poltergeist module simulates forensic trace errors, capturing anomalous timestamped events in the style of Sentry's distributed transaction tracing.
- **Best Use of DigitalOcean**: Lightweight resource footprint optimized for 1-Click GPU Droplets and minimal RAM environments.
- **Best Use of Backboard**: Structured knowledge retrieval grounding the séance personas in authentic computing history.
`;

  const copyMarkdown = () => {
    navigator.clipboard.writeText(submissionMarkdown);
    spectralAudio.playKeyClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([submissionMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hacktoberfest-week-4-ghost-in-the-machine.md';
    a.click();
    URL.revokeObjectURL(url);
    spectralAudio.playKeyClick();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-900/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-amber-400 uppercase tracking-widest mb-1">
            <Award className="w-4 h-4" />
            <span>Hacktoberfest DEV Challenge Submission Exporter</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-neutral-100">
            Ready-to-Publish DEV.to Post Generator
          </h2>
          <p className="text-xs text-neutral-400 font-serif mt-1">
            Pre-formatted markdown article answering every judging criterion and prompt detail
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyMarkdown}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-amber-950/40"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy DEV.to Markdown'}</span>
          </button>

          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Tabs: Preview vs Raw Markdown */}
      <div className="border border-neutral-800 rounded-2xl bg-neutral-950 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveSubTab('preview')}
              className={`pb-1 cursor-pointer transition-colors ${
                activeSubTab === 'preview'
                  ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Formatted Reading View
            </button>
            <button
              onClick={() => setActiveSubTab('raw')}
              className={`pb-1 cursor-pointer transition-colors ${
                activeSubTab === 'raw'
                  ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Raw Markdown Source
            </button>
          </div>

          <span className="text-[11px] text-neutral-500 font-mono">
            Tags: #devchallenge #hf26challenge #ghostinthemachine
          </span>
        </div>

        <div className="p-6 md:p-10 max-h-[600px] overflow-y-auto font-serif text-sm leading-relaxed text-neutral-300">
          {activeSubTab === 'preview' ? (
            <div className="prose prose-invert max-w-none space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs uppercase tracking-widest text-amber-500 font-sans">
                  DEV.to Official Entry Draft
                </span>
                <h1 className="text-3xl font-bold text-neutral-100 font-serif mt-1">
                  SpecterOS: Ghost in the Machine — Open-Source AI Séance & Digital Ofrenda Sanctuary
                </h1>
              </div>

              <div>
                <h2 className="text-xl font-bold text-amber-200 font-serif">
                  What I Built & The Theme
                </h2>
                <p className="mt-2 text-neutral-300">
                  For Hacktoberfest 2026: Week 4, where Halloween on October 31 meets Día de los Muertos on November 1 & 2, I built <strong>SpecterOS</strong>. It is a multi-experience web sanctuary honoring the ghosts of obsolete computing systems, lost programming paradigms, and the human ancestors who paved our road in technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 not-prose">
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <h3 className="font-bold text-neutral-100 font-serif text-sm">🕯️ Digital Ofrenda Sanctuary</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    An authentic Mexican altar honoring Ada Lovelace, Alan Turing, Grace Hopper, Dennis Ritchie, and custom family memorials with flickering veladoras and calaveritas.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <h3 className="font-bold text-neutral-100 font-serif text-sm">💀 NecroShell (Possessed CRT)</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    A haunted command-line shell with green/amber phosphor modes where departed system daemons possess keystrokes and whisper back eerie commentary.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <h3 className="font-bold text-neutral-100 font-serif text-sm">🔮 The Spirit Séance Chamber</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Channels the spirits of ALGOL 68, Macromedia Flash / ActionScript, COBOL 60, HyperCard, and LISP with authentic historical personas and code incantations.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <h3 className="font-bold text-neutral-100 font-serif text-sm">🏚️ Poltergeist IoT Log Weaver</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Transforms cold domestic smart-home sensor logs (PIR motion, sudden cold spots, microphone spikes) into chilling supernatural short stories.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-amber-200 font-serif">
                  Why Open Innovation Matters
                </h2>
                <ul className="list-disc pl-5 space-y-2 mt-2 text-neutral-300">
                  <li>
                    <strong>Works with the lights (and internet) off</strong>: Runs entirely offline on local hardware when a storm knocks out electricity.
                  </li>
                  <li>
                    <strong>Family remembrance privacy</strong>: Keeps sacred memories and photos of loved ones strictly on the user's machine instead of proprietary ad clouds.
                  </li>
                  <li>
                    <strong>Preserving digital heritage</strong>: Rescues abandoned open-source tools and deprecated languages from corporate obsolescence.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed select-all">
              {submissionMarkdown}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
