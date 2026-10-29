export type ActiveTab = 'ofrenda' | 'terminal' | 'seance' | 'iot' | 'submission';

export interface Ancestor {
  id: string;
  name: string;
  era: string;
  role: string;
  image: string;
  favoriteOffering: string;
  memory: string;
  quote: string;
  isCustom?: boolean;
}

export interface Candle {
  id: number;
  label: string;
  isLit: boolean;
  tier: 'top' | 'middle' | 'base';
}

export interface TerminalOutput {
  id: string;
  type: 'input' | 'output' | 'error' | 'ghost' | 'system';
  content: string;
  timestamp: string;
}

export interface SpiritEntity {
  id: string;
  name: string;
  type: 'language' | 'pioneer' | 'platform';
  era: string;
  deathDate: string;
  causeOfDeath: string;
  avatar: string;
  tagline: string;
  sampleCode: string;
  lore: string;
}

export interface IoTSensorEvent {
  id: string;
  time: string;
  sensor: string;
  deviceType: 'motion' | 'temperature' | 'lock' | 'audio' | 'lighting' | 'camera';
  location: string;
  value: string;
  anomalyScore: number;
}
