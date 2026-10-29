/**
 * Web Audio API synthesizer for ambient ghostly atmospheres,
 * CRT terminal clicks, candle lighting whooshes, and marigold bell tones.
 * 100% client-side, zero external audio assets required.
 */

class SpectralAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(muted ? 0 : 0.08, this.ctx?.currentTime || 0);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Continuous eerie low-frequency spectral drone
   */
  public toggleAmbientDrone(enabled?: boolean): boolean {
    this.initContext();
    if (!this.ctx) return false;

    const targetState = enabled !== undefined ? enabled : !this.isAmbientPlaying;

    if (!targetState) {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          try {
            this.ambientOsc1?.stop();
            this.ambientOsc2?.stop();
            this.ambientOsc1?.disconnect();
            this.ambientOsc2?.disconnect();
          } catch {
            // ignore
          }
          this.isAmbientPlaying = false;
        }, 1300);
      }
      return false;
    }

    try {
      this.ambientOsc1?.stop();
      this.ambientOsc2?.stop();
    } catch {
      // ignore
    }

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, t); // A1 note
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(55.8, t); // Slight detune for ghostly beating

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, t);
    filter.Q.setValueAtTime(4, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(this.isMuted ? 0.0001 : 0.07, t + 2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);

    this.ambientOsc1 = osc1;
    this.ambientOsc2 = osc2;
    this.ambientGain = gain;
    this.isAmbientPlaying = true;
    return true;
  }

  /**
   * Sound of striking a match and lighting a candle
   */
  public playCandleIgnite() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Noise burst for match strike
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.Q.setValueAtTime(2.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    // Warm resonant tone for fire catch
    const warmOsc = this.ctx.createOscillator();
    const warmGain = this.ctx.createGain();
    warmOsc.type = 'sine';
    warmOsc.frequency.setValueAtTime(220, t);
    warmOsc.frequency.exponentialRampToValueAtTime(330, t + 0.4);
    warmGain.gain.setValueAtTime(0.001, t);
    warmGain.gain.linearRampToValueAtTime(0.12, t + 0.1);
    warmGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    warmOsc.connect(warmGain);
    warmGain.connect(this.ctx.destination);

    noise.start(t);
    warmOsc.start(t);
    warmOsc.stop(t + 0.6);
  }

  /**
   * Vintage mechanical CRT terminal key click
   */
  public playKeyClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(700 + Math.random() * 200, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.04);

    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  /**
   * Eerie ghostly whisper / glitch interference
   */
  public playSpectralGlitch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin(i * 0.05);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.linearRampToValueAtTime(1600, t + 0.35);
    filter.Q.setValueAtTime(7, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  /**
   * Ethereal temple bell chime (Día de los Muertos chime)
   */
  public playSacredBell() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [528, 1056, 1584]; // Harmonious Solfeggio 528Hz frequency
    const weights = [0.15, 0.08, 0.03];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(weights[idx], t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 2.9);
    });
  }
}

export const spectralAudio = new SpectralAudioEngine();
