import React, { useState } from 'react';
import { Home, AlertTriangle, Sparkles, Plus, Copy, Check, FileText, Activity, Clock, ShieldAlert } from 'lucide-react';
import { IoTSensorEvent } from '../types/index.ts';
import { spectralAudio } from '../utils/spectralAudio.ts';

const PRESET_EVENTS_1: IoTSensorEvent[] = [
  {
    id: 'evt-1',
    time: '03:14:02 AM',
    sensor: 'Hallway PIR Motion',
    deviceType: 'motion',
    location: '2nd Floor Upper Hallway',
    value: 'Motion Detected (4.2s duration, measured stride)',
    anomalyScore: 88,
  },
  {
    id: 'evt-2',
    time: '03:15:18 AM',
    sensor: 'Smart Thermostat Ambient',
    deviceType: 'temperature',
    location: 'Master Bedroom & Nursery',
    value: 'Rapid drop: 71.4°F → 48.2°F in 19 seconds',
    anomalyScore: 96,
  },
  {
    id: 'evt-3',
    time: '03:22:40 AM',
    sensor: 'Baby Monitor Acoustic Mic',
    deviceType: 'audio',
    location: 'Nursery (Unoccupied)',
    value: 'Acoustic spike: 84dB, Sibilant 140Hz whisper / hum',
    anomalyScore: 99,
  },
  {
    id: 'evt-4',
    time: '03:33:00 AM',
    sensor: 'Front Entry Deadbolt',
    deviceType: 'lock',
    location: 'Main Foyer Entrance',
    value: 'Unlocked via interior manual thumbturn (No exterior code)',
    anomalyScore: 94,
  },
];

const PRESET_EVENTS_2: IoTSensorEvent[] = [
  {
    id: 'evt-201',
    time: '02:03:11 AM',
    sensor: 'Smart Refrigerator Door',
    deviceType: 'lock',
    location: 'Kitchen Pantry',
    value: 'Magnetic seal opened 3 inches (Interior light disabled)',
    anomalyScore: 78,
  },
  {
    id: 'evt-202',
    time: '02:44:50 AM',
    sensor: 'Smart Energy Monitor Plug',
    deviceType: 'lighting',
    location: 'Basement Storage',
    value: 'Power surge: 1,840W draw on unattached outlet',
    anomalyScore: 92,
  },
  {
    id: 'evt-203',
    time: '03:12:05 AM',
    sensor: 'Smart Television Ambient CEC',
    deviceType: 'lighting',
    location: 'Living Room',
    value: 'Powered ON: Input tuned to static channel 00',
    anomalyScore: 95,
  },
];

export const IoTGhostStory: React.FC = () => {
  const [events, setEvents] = useState<IoTSensorEvent[]>(PRESET_EVENTS_1);
  const [locationName, setLocationName] = useState('14 Elmwood Hollow Residence');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [isWeaving, setIsWeaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // New Event Form
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newTime, setNewTime] = useState('03:45:00 AM');
  const [newSensor, setNewSensor] = useState('');
  const [newLoc, setNewLoc] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleWeaveStory = async () => {
    setIsWeaving(true);
    spectralAudio.playSpectralGlitch();

    try {
      const res = await fetch('/api/iot/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: locationName,
          sensorEvents: events,
        }),
      });

      const data = await res.json();
      setGeneratedStory(data.story || 'A chilling silence remains in the telemetry.');
      spectralAudio.playCandleIgnite();
    } catch {
      setGeneratedStory(
        'The telemetry logs froze at 3:14 AM. Whatever was walking down the hallway stepped directly through the optical path of the sensor, leaving a signature of frost on the floorboards that took three hours to melt.'
      );
    } finally {
      setIsWeaving(false);
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSensor.trim() || !newValue.trim()) return;

    const newEvt: IoTSensorEvent = {
      id: `custom-evt-${Date.now()}`,
      time: newTime,
      sensor: newSensor.trim(),
      deviceType: 'motion',
      location: newLoc.trim() || 'Interior Room',
      value: newValue.trim(),
      anomalyScore: Math.floor(Math.random() * 20 + 80),
    };

    setEvents((prev) => [...prev, newEvt]);
    setShowAddEvent(false);
    setNewSensor('');
    setNewLoc('');
    setNewValue('');
    spectralAudio.playKeyClick();
  };

  const copyStory = () => {
    if (!generatedStory) return;
    navigator.clipboard.writeText(
      `PARANORMAL IOT INCIDENT REPORT\nLocation: ${locationName}\n\nSENSOR TELEMETRY:\n${events
        .map((e) => `[${e.time}] ${e.location} - ${e.sensor}: ${e.value}`)
        .join('\n')}\n\nNARRATIVE:\n${generatedStory}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      {/* Visual Header with Generated Spooky Smart Home Image */}
      <section className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img
            src="/src/assets/images/smart_home_haunted_night_1793275375679.jpg"
            alt="Moody dimly lit smart home hallway at 3:14 AM"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-85 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:left-8 md:bottom-8 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2">
              <span>Smart Home Telemetry · Forensic Engine</span>
              <span aria-hidden="true">·</span>
              <span>Paranormal Synthesis</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
              Poltergeist IoT: The 3:00 AM Sensor Log Weaver
            </h1>
            <p className="mt-1.5 text-xs md:text-sm text-neutral-300 font-serif leading-relaxed">
              When the humans sleep, the smart sensors continue recording. Feed cold sensor anomalies into our horror engine to reconstruct what walked through your home in the dark.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Telemetry Table + Story Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sensor Event Log (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            <div>
              <h2 className="text-sm font-serif font-bold text-neutral-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Smart Home Event Log</span>
              </h2>
              <p className="text-xs text-neutral-400">
                Location: {locationName}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => {
                  setEvents(PRESET_EVENTS_1);
                  setLocationName('14 Elmwood Hollow Residence');
                  spectralAudio.playKeyClick();
                }}
                className="px-2.5 py-1 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 transition-colors cursor-pointer"
              >
                Log A (3:14 AM)
              </button>
              <button
                onClick={() => {
                  setEvents(PRESET_EVENTS_2);
                  setLocationName('Old Vicarage Basement & Kitchen');
                  spectralAudio.playKeyClick();
                }}
                className="px-2.5 py-1 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 transition-colors cursor-pointer"
              >
                Log B (Basement Surge)
              </button>
              <button
                onClick={() => setShowAddEvent(true)}
                className="px-2.5 py-1 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/50 text-cyan-300 rounded transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          {/* Sensor Events Definition Table */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
            <div className="divide-y divide-neutral-900">
              {events.map((evt) => (
                <div key={evt.id} className="p-4 hover:bg-neutral-900/50 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-xs font-mono font-semibold text-cyan-400 tabular-nums">
                        {evt.time}
                      </span>
                      <span className="text-xs font-medium text-neutral-200">
                        {evt.sensor}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-rose-400 bg-rose-950/40 border border-rose-900/50 px-2 py-0.5 rounded">
                      Anomaly: {evt.anomalyScore}%
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 font-sans pl-5">
                    {evt.value}
                  </p>
                  <p className="text-[11px] text-neutral-500 pl-5 mt-0.5 font-serif italic">
                    Location: {evt.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleWeaveStory}
            disabled={isWeaving}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-neutral-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-950/40 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {isWeaving ? 'Reconstructing Paranormal Timeline...' : 'Weave Ghost Story from Telemetry'}
            </span>
          </button>
        </div>

        {/* Right Column: Reconstructed Horror Narrative (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-cyan-400 font-mono">
                  Synthesized Incident Tale
                </span>
                <h3 className="text-xl font-serif font-bold text-neutral-100 mt-0.5">
                  The Entity in the Mesh Network
                </h3>
              </div>

              {generatedStory && (
                <button
                  onClick={copyStory}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                  title="Copy full incident report"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Export'}</span>
                </button>
              )}
            </div>

            {generatedStory ? (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-sm font-serif leading-relaxed text-neutral-200 whitespace-pre-wrap">
                  {generatedStory}
                </div>
                <div className="p-3 bg-rose-950/20 border border-rose-900/30 rounded-lg text-xs text-rose-300 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>
                    Warning: Discrepancy between sensor telemetry and camera archive detected. Sensor trip was physical; optical camera recorded transparent space.
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-10 rounded-xl bg-neutral-950 border border-dashed border-neutral-800 text-center space-y-3">
                <Home className="w-8 h-8 text-neutral-600 mx-auto" />
                <p className="text-xs text-neutral-400 font-serif">
                  Click "Weave Ghost Story" to let the AI horror engine correlate timestamps and generate the supernatural account of what transpired while you slept.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Sensor Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-neutral-100">
              Add Anomalous Sensor Incident
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1">Timestamp</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
                />
              </div>
              <div>
                <label className="block text-neutral-300 mb-1">Sensor Device Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Mirror Optic, Basement Water Detector"
                  value={newSensor}
                  onChange={(e) => setNewSensor(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
                />
              </div>
              <div>
                <label className="block text-neutral-300 mb-1">Room / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Master Bedroom, Attic Stairwell"
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
                />
              </div>
              <div>
                <label className="block text-neutral-300 mb-1">Anomalous Telemetry Value</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cold draft detected: 38°F, Audio knock 3x on door"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="px-3 py-1.5 text-neutral-400 hover:text-neutral-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-neutral-950 font-bold rounded-lg"
                >
                  Insert Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
