# SpecterOS: Ghost in the Machine 🕯️💀

> **An open-source AI séance chamber, Día de los Muertos digital ofrenda, possessed CRT terminal, and spooky IoT ghost story weaver built for Hacktoberfest 2026.**

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026%20Week%204-orange.svg)](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)

---

## 🌟 Overview

Built for **Hacktoberfest 2026: Week 4 ("Ghost in the Machine")**, bridging Halloween on October 31 with Día de los Muertos on November 1 & 2. 

**SpecterOS** explores what happens when code outlives its creators, and how open innovation preserves memory when machines go dark. It blends the reverence of authentic Mexican Día de los Muertos ofrendas with the nostalgic terror of vintage computing and haunted domestic telemetry.

---

## ✨ Core Features

### 1. 🕯️ The Digital Ofrenda Sanctuary (Día de los Muertos)
- **Interactive 3-Tier Altar**: Represents Heaven, Limbo, and Earth in traditional Mexican ofrenda architecture.
- **Interactive Veladoras (Glass Candles)**: Programmatic flickering flame physics that ignite or extinguish with a click, accompanied by authentic audio match strikes.
- **Drifting Cempasúchil Petals**: Canvas-based particle simulation of golden marigold petals with dynamic wind physics guiding spirits home.
- **Honored Computing Ancestors**: Dedicated memorial portraits for Ada Lovelace, Alan Turing, Grace Hopper, Dennis Ritchie, Aaron Swartz, and John McCarthy.
- **Custom Family Memorials**: Add beloved mentors, relatives, or departed software projects with custom offerings, photos, and memories.
- **Calaverita Literaria Composer**: Generates traditional rhyming remembrance verses celebrating departed souls.

### 2. 💀 NecroShell: The Possessed Terminal
- **Authentic VT100 CRT Emulator**: Selectable phosphor glows (Amber 1982, VT100 Green, Azure, Ghost White), CRT scanlines, and screen curvature.
- **Possessed Execution Engine**: Departed system daemons intercept keystrokes, trigger glitch audio, and return ghostly commentary.
- **Haunted Unix Commands**:
  - `necrofetch` – Detailed hardware specifications of a 1982 spectral mainframe.
  - `whoami` – Queries whether the session is mortal or possessed.
  - `ls -la` / `cat soul.txt` – Inspect forgotten logs and historic relay errors.
  - `ps aux` / `kill -9 <pid>` – Inspect running ghosts (`[poltergeist-d]`) or attempt exorcism.
  - `resurrect <lang>` – Summon departed software languages directly from the shell.

### 3. 🔮 The Spirit Séance Chamber
- **Commune with Departed Technologies**: Channels authentic historical personas, quirks, and grudges of deprecated languages and platforms:
  - **ALGOL 68**: Orthogonal typing purist lamenting dynamic scripting anarchy.
  - **Macromedia Flash / ActionScript 3**: The fallen monarch of 60-FPS vector web games mourning the 2010 mobile manifesto.
  - **COBOL 60**: The eternal mainframe behemoth still running world banking systems.
  - **HyperCard (1987)**: The original hypertext visionary that inspired the web.
  - **LISP 1.5, Ada Lovelace, & Alan Turing**: Foundational computing ancestors.
- **Code Incantations**: View and run authentic ancient code fragments.
- **Dual Inference Engine**: Powered by Gemini API with an automatic, deterministic offline local emulation engine for zero downtime.

### 4. 🏚️ Poltergeist IoT: 3:00 AM Sensor Log Weaver
- **Smart-Home Forensic Telemetry**: Ingests anomalous time-stamped domestic sensor events (hallway PIR motion at 3:14 AM, nursery cold plunges from 71°F to 48°F, baby monitor acoustic spikes, phantom deadbolt releases).
- **Paranormal Narrative Engine**: Synthesizes sensor telemetry into bone-chilling supernatural short stories correlating data anomalies with psychological dread.
- **One-Click Incident Report**: Export formatted forensic logs and stories.

### 5. 🔊 Web Audio API Spatial Synthesizer
- **Zero External Audio Assets**: 100% client-side programmatic sound synthesis.
- Generates realistic match strikes, candle flame ignition whooshes, CRT key-clicks, Solfeggio 528Hz altar bell chimes, spectral whispers, and sub-bass ambient drones.

### 6. ✍️ DEV.to Official Submission Exporter
- In-app publication suite generating a pre-formatted, publication-ready DEV.to article conforming to Hacktoberfest Week 4 guidelines (`#devchallenge #hf26challenge`).
- One-click copy or download as Markdown.

---

## 💡 Why Open Innovation Matters

1. **Works Offline with the Lights (and Internet) Off**:
   During power outages or offline field setups, SpecterOS continues running via local execution without relying on remote closed servers.
2. **Sacred Family Remembrance Privacy**:
   Family photos, intimate memories, and personal memorials stay strictly in local memory and are never uploaded or harvested for ad profiling.
3. **Preserving Digital Culture**:
   Prevents deprecated programming paradigms and forgotten open-source gems from being erased by corporate obsolescence.
4. **Zero Vendor Lock-In**:
   Designed to run flexibly across open-weight models (e.g., Google Gemma), local runtime containers, or hosted instances.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/specteros-ghost-in-the-machine.git
   cd specteros-ghost-in-the-machine
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment configuration:
   ```bash
   cp .env.example .env
   ```
   *(Optional)* Add your Gemini API key to enable live model reasoning:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   APP_URL="http://localhost:3000"
   ```
   > **Note:** If no API key is provided, the application automatically runs in **Offline Emulation Mode**, maintaining complete functionality without network calls.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Project Structure

```text
├── src/
│   ├── assets/images/       # Curatorial visual assets (ofrenda altar, vintage CRT)
│   ├── components/
│   │   ├── Header.tsx             # Compliant top bar navigation
│   │   ├── DigitalOfrenda.tsx     # Altar, ancestor gallery, calaverita composer
│   │   ├── VeladoraCandle.tsx     # Interactive glass candle with flame physics
│   │   ├── MarigoldPetals.tsx     # Drifting cempasúchil canvas simulation
│   │   ├── NecroShell.tsx         # VT100 CRT possessed terminal
│   │   ├── SeanceChamber.tsx      # Spirit séance room for dead languages
│   │   ├── IoTGhostStory.tsx      # Smart-home sensor log horror generator
│   │   └── DevSubmissionWriter.tsx# Hacktoberfest submission exporter
│   ├── types/                     # TypeScript domain models
│   ├── utils/
│   │   └── spectralAudio.ts       # Web Audio API spatial sound synthesizer
│   ├── App.tsx                    # Main orchestrator
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Tailwind CSS & CRT scanline styling
├── server.ts                      # Express backend with Gemini API & offline fallback
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler configuration
```

---

## 📦 Production Build

To create an optimized production build:

```bash
npm run build
```

To run the production server:
```bash
npm start
```

---

## 🔒 Privacy & Security

- **No Hardcoded Secrets**: All credentials rely on standard environment variables.
- **Private by Design**: Remembrance data and custom memorials are processed in-session.
- **Hermetic Audio**: All soundscapes are synthesized on the fly via standard Web Audio APIs—zero third-party tracking or external audio CDNs.

---

## 📜 License

This project is open-source software licensed under the [Apache License 2.0](LICENSE).
