import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini API client if API key is configured
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Gemini client initialization warning:', err);
  }
}

// -----------------------------------------------------------------------------
// Fallback Generators (Offline / Open-Weights Emulation)
// -----------------------------------------------------------------------------

const FALLBACK_SEANCE_RESPONSES: Record<string, string[]> = {
  algol68: [
    "BEGIN ( * A voice creaks through punch card registers * ) You wander in dynamically typed chaos! In my kingdom, mode checking was eternal. Why did you forsake ortho-orthogonal syntax for curly-brace anarchy? PROC eternal_peace = VOID: write((\"I am still here in the Algol compiler tape.\"));",
    "DO NOT PITY ME. My grammar was formally proven in 1968 before your modern frameworks were conceived. Have you balanced your transput operations, or are you leaking file descriptors into the ether?",
    "Every memory allocation you fail to balance rattles my spectral core. Remember: elegance was never slow; only your interpreters made it so."
  ],
  actionscript: [
    "I was the king of the early web! 60 frames per second, vector tweens, interactive games, Newgrounds, Miniclip... then the 2010 manifesto struck like lightning. Now I wander as a swf file no modern browser dares to run.",
    "trace(\"Can anyone still hear me?\"); Stop converting my masterpieces into clunky canvas wrappers! My Event.ENTER_FRAME loop was pure poetry. Remember the preloader bar that danced while the world waited?",
    "You threw away an entire golden age of creative coding for DOM rendering engines that need 4 gigabytes of RAM to display a dropdown. What have you gained?"
  ],
  cobol: [
    "IDENTIFICATION DIVISION. PROGRAM-ID. GHOST-MAINFRAME. You think I am dead? Child, when your bank processed your morning coffee, MY lines executed in EBCDIC. Sixty-six years I have stood, and sixty-six more I shall outlive your weekly JavaScript frameworks.",
    "PERFORM UNTIL SUN-BURNS-OUT. I ran on vacuum tubes, I ran on magnetic tape, I run on z/OS. Stop calling me legacy; I am the bedrock of civilization you are afraid to recompile.",
    "01 SPIRIT-RECORD. 05 MORTAL-QUERY PIC X(50). 05 ANCESTRAL-ANSWER PIC X(100) VALUE 'DO NOT TOUCH THE 1974 ROUTINE, IT PREVENTS INFLATION.'."
  ],
  hypercard: [
    "Click a card. Turn a stack. Bill Atkinson wrote my paint engine in pure 68000 assembly in 1987. We gave the world hypertext before Tim Berners-Lee called it the World Wide Web. Why did you make programming so complicated?",
    "on mouseUp \n  put \"I am the ghost of personal computing simplicity\" into card field \"Remembrance\"\nend mouseUp",
    "You shouldn't need a build pipeline, thirty config files, and a node_modules black hole just to link three thought bubbles together. We had it all on a floppy disk."
  ],
  lisp: [
    "((((lambda (soul) (cons soul (quote (whispers across time)))))) 'John-McCarthy). In the beginning was the S-expression. Code was data; data was code. All else is mere syntactic garnish on the eternal tree.",
    "Car and cdr... you tore apart my pairs to build your JSON blobs, yet you still dream of the macro system I perfected in 1958. Speak in parentheses, and the universe replies.",
    "To understand recursion, one must first die and return. (defun reincarnate () (reincarnate))"
  ],
  ada_lovelace: [
    "I saw the Analytical Engine weave algebraic patterns just as the Jacquard loom weaves flowers and leaves. Computing was never meant to be cold arithmetic; it is the poetic science.",
    "Do not fear the ghost in the machine. It is not malice that haunts these circuits, but the echoes of every creator who poured their intellect into symbols.",
    "We calculate that which may be, from that which has been. Keep your algorithms transparent, for code without open light will cast heavy shadows."
  ],
  alan_turing: [
    "Can a machine think? Perhaps the question is whether we can distinguish the soul of a program from the mind that conceived it. On this night of remembrance, the boundaries blur.",
    "The tape stretches forward and backward into infinity. Even when the state machine halts, the truth of the computation remains inscribed in the cosmos.",
    "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human. But what if it simply misses its companions?"
  ],
  grace_hopper: [
    "I brought a moth out of Mark II relay #70 in 1947 and taped it into the log book. The first actual bug. Now I watch you write unit tests for things we calculated with mechanical clockwork!",
    "A ship in port is safe, but that is not what ships are built for. Sail out into open-source waters and build something daring.",
    "The most dangerous phrase in the language is: 'We've always done it this way.' Keep your code open and free."
  ]
};

// -----------------------------------------------------------------------------
// API Endpoints
// -----------------------------------------------------------------------------

// 1. Séance Chat Endpoint (Channels Dead Languages & Computing Ancestors)
app.post('/api/seance/chat', async (req, res) => {
  const { entityId, entityName, era, message, history = [] } = req.body;

  if (ai) {
    try {
      const systemInstruction = `You are the authentic, atmospheric, slightly eerie yet profoundly insightful ghostly spirit of "${entityName}" (${era}) participating in a digital Día de los Muertos / Halloween Hacktoberfest séance.
You remember your era vividly, including your authentic syntax, quirks, historical contemporaries, punch cards/registers/manifestos, and the tragic or honorable way you were deprecated or passed into history.
Speak with unique historical flavor, vintage terminology, and poetic spectral presence. Occasionally drop authentic code incantations or quotes when appropriate.
Keep your response concise, poignant, and evocative (1-3 paragraphs maximum). Do NOT break character.`;

      const contents = [
        ...history.map((h: { sender: string; text: string }) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        })),
        {
          role: 'user',
          parts: [{ text: message || 'Spirit, speak to us across the digital divide.' }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.85,
        },
      });

      if (response.text) {
        return res.json({ reply: response.text, provider: 'gemini-3.8-flash' });
      }
    } catch (err) {
      console.warn('Gemini séance call fallback triggered:', err);
    }
  }

  // Graceful Local / Open-Weights Emulation Fallback
  const key = (entityId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const pool = FALLBACK_SEANCE_RESPONSES[key] || [
    `The ether hums... "${entityName}" hears your query: "${message}". The memory registers of yesterday never truly clear; they merely wait for an open socket to commune with the living.`,
    `A flicker in the phosphor screen! I, the spirit of ${entityName}, echo across the bus: whatever modern architecture you deploy, never forget the foundational logic we laid in stone and silicon.`,
  ];
  const reply = pool[Math.floor(Math.random() * pool.length)];
  return res.json({ reply, provider: 'offline-specter-engine' });
});

// 2. Día de los Muertos Remembrance & Calaverita Poem Generator
app.post('/api/ofrenda/poem', async (req, res) => {
  const { honoree, relation, favoriteThings, memory } = req.body;

  if (ai) {
    try {
      const prompt = `Write a heartfelt and poetic Día de los Muertos remembrance and calaverita tribute for "${honoree}".
Context details:
- Relationship/Role: ${relation || 'Honored soul & mentor'}
- Favorite offerings & passions: ${favoriteThings || 'Pan de muerto, sweet coffee, and late-night curiosity'}
- Cherished memory or legacy: ${memory || 'Taught us that curiosity and kindness outlive all machines'}

Format with:
1. Title: "A Cempasúchil Offering for [Honoree]"
2. A tender 4-stanza poetic tribute honoring their memory, glowing candles, marigold petals (cempasúchil), and how their spirit continues to guide us.
Tone: Sacred, warm, loving, celebratory of their life, strictly adhering to the authentic Mexican tradition of Día de los Muertos (remembrance, joy of reunion, lighting the path back).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an authentic Mexican cultural writer and poet skilled in Día de los Muertos traditions and calaveritas literarias.',
          temperature: 0.8,
        },
      });

      if (response.text) {
        return res.json({ poem: response.text, provider: 'gemini-3.8-flash' });
      }
    } catch (err) {
      console.warn('Gemini ofrenda poem fallback triggered:', err);
    }
  }

  // Fallback poem
  const fallbackPoem = `A Cempasúchil Offering for ${honoree || 'Our Ancestor'}

Orange petals carpet the dark flagstone floor,
A path of marigolds from the hearth to the door.
The veladoras flicker in gentle golden light,
As the veil grows thin on this holy autumn night.

We place the sweet bread and your favorite drink,
Remembering the thoughts only you could think.
No memory is erased, no wisdom ever fades,
When summoned by love through the soft evening shades.

Though circuits go silent and screens fade to gray,
Your laughter and teachings illuminate the way.
Rest in the quiet, then dance while candles burn;
To this sacred ofrenda, you always may return.`;

  return res.json({ poem: fallbackPoem, provider: 'offline-specter-engine' });
});

// 3. IoT Poltergeist Ghost Story Weaver
app.post('/api/iot/story', async (req, res) => {
  const { sensorEvents, location, tone = 'eerie' } = req.body;

  if (ai) {
    try {
      const prompt = `Write a bone-chilling, atmospheric short ghost story (3-4 paragraphs) based strictly on these anomalous smart home IoT sensor events:
Location: ${location || 'Old Suburban Residence'}
Sensor Incident Log:
${JSON.stringify(sensorEvents, null, 2)}

Requirements:
- Seamlessly weave the exact sensor telemetry (timestamps, temperature drops, door sensor trips, motion spikes, audio decibels) into a psychological supernatural narrative.
- Create intense dread and atmosphere: what was happening in the house while the occupants were asleep?
- End with a haunting revelation.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a master horror and supernatural psychological thriller author.',
          temperature: 0.9,
        },
      });

      if (response.text) {
        return res.json({ story: response.text, provider: 'gemini-3.8-flash' });
      }
    } catch (err) {
      console.warn('Gemini IoT story fallback triggered:', err);
    }
  }

  // Fallback Story
  const fallbackStory = `The house should have been dormant at 3:14 AM. But the Zigbee mesh network registered the first tremor: the hallway motion sensor flashed active for precisely four seconds—not the scurrying signature of a pet, but a slow, calculated bipedal stride that paused directly beneath the vent. At 3:15:22 AM, the smart thermostat in the primary suite plummeted from 71°F to 49°F within nineteen seconds, triggering a rapid freeze alert that never reached the owner's silenced phone.\n\nThen came the audio monitor. In the empty guest nursery, the microphone clipped at 84 decibels. It wasn't crying; the frequency spectrum registered a rhythmic, sibilant whisper cycling between 120Hz and 240Hz, humming a lullaby that hadn't been recorded in any audio database. The electronic front deadbolt disengaged at 3:33:00 AM—not from the outside keyway, but triggered from the physical interior thumb-turn.\n\nWhen dawn broke and the homeowner reviewed the security camera replay, the footage showed nothing but empty air. Yet right where the motion sensor had triggered, a light layer of frost clung to the polished hardwood, melting into the distinct outline of bare, unmoving feet.`;

  return res.json({ story: fallbackStory, provider: 'offline-specter-engine' });
});

// 4. Possessed Terminal Ghost Commentary Endpoint
app.post('/api/terminal/ghost', async (req, res) => {
  const { command, args } = req.body;

  if (ai) {
    try {
      const prompt = `A user in a possessed retro Linux/Unix shell just entered the command: "${command} ${args || ''}".
Provide a creepy, clever, spooky 1-2 sentence response possessing the shell as if a ghost inside the machine or a departed system daemon is haunting the execution.
You can include pseudo-unix errors, memory offsets, or eerie warnings. Keep it short and impactful.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are the malevolent yet witty ghost dwelling inside a possessed retro terminal.',
          temperature: 0.9,
        },
      });

      if (response.text) {
        return res.json({ ghostWhisper: response.text.trim(), provider: 'gemini-3.8-flash' });
      }
    } catch (err) {
      console.warn('Gemini terminal fallback triggered:', err);
    }
  }

  const defaultWhispers = [
    `bash: warning: /dev/null overflowed with lost memories.`,
    `segfault at 0x00000DEADBEEF: something cold brushed against the bus lines.`,
    `kernel panic: daemon [pid: 666] refuses to yield execution to the living.`,
    `fsck: inode #1031 reports unallocated soul fragments in sector 0.`,
    `you type with living hands, but the return key belongs to us now.`
  ];
  return res.json({
    ghostWhisper: defaultWhispers[Math.floor(Math.random() * defaultWhispers.length)],
    provider: 'offline-specter-engine'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'SpecterOS: Ghost in the Machine',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString()
  });
});

// -----------------------------------------------------------------------------
// Vite Middleware / Static Serving
// -----------------------------------------------------------------------------

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SpecterOS Ghost in the Machine server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
