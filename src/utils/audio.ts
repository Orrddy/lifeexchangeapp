/**
 * Web Audio API synthesizer for the LifeSpan Exchange Authority.
 * Generates typewriter ticks, bells, stamp thuds, error buzzers, CRT hums,
 * and an ambient retro procedural music loop.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: any = null;
  private isMusicPlaying = false;
  private crtHumNode: OscillatorNode | null = null;
  private crtHumGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Typewriter key click (snappy high-frequency noise burst + sine wave tail)
  playClick() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Noise burst for mechanical transient
    const bufferSize = this.ctx.sampleRate * 0.01; // 10ms burst
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();

    noiseGain.gain.setValueAtTime(0.04, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

    osc.type = "sine";
    osc.frequency.setValueAtTime(400 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.015);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    osc.start(now);
    osc.stop(now + 0.02);
  }

  // Vintage mechanical carriage return bell
  playBell() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1450, now);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(2200, now); // Metallic overtones

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
  }

  // Heavy official rubber stamp slamming down
  playStamp() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const bandpass = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Heavy low thud
    osc.type = "triangle";
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.15);

    // Friction burst
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();

    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(180, now);
    bandpass.Q.setValueAtTime(1.5, now);

    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    noise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    gain.connect(this.ctx.destination);

    osc.start(now);
    noise.start(now);
    osc.stop(now + 0.25);
    noise.stop(now + 0.25);
  }

  // Tactile paper rustle sound (bandpassed randomized noise bursts)
  playPaperRustle() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Create a series of 3 overlapping micro-bursts of paper friction
    const burstsCount = 3;
    for (let b = 0; b < burstsCount; b++) {
      const burstStart = now + b * 0.07;
      const duration = 0.12 + Math.random() * 0.08;

      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Friction crackles
        data[i] = (Math.random() * 2 - 1) * (0.15 + 0.85 * Math.sin((i / bufferSize) * Math.PI));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1500 + Math.random() * 1200, burstStart);
      filter.Q.setValueAtTime(1.2, burstStart);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, burstStart);
      gain.gain.exponentialRampToValueAtTime(0.001, burstStart + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(burstStart);
      noise.stop(burstStart + duration);
    }
  }

  // Official warning buzz
  playBuzz() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(110, now);
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(111.5, now); // Detuned buzz

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  }

  // Hum of CRT screen
  startCrtHum() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.crtHumNode) return; // Already running

      const now = this.ctx.currentTime;
      this.crtHumNode = this.ctx.createOscillator();
      this.crtHumGain = this.ctx.createGain();

      this.crtHumNode.type = "sine";
      this.crtHumNode.frequency.setValueAtTime(60, now); // 60Hz power hum

      // High pitch flyback transformer sound (15.625 kHz) at barely audible volume
      const flybackNode = this.ctx.createOscillator();
      const flybackGain = this.ctx.createGain();
      flybackNode.type = "sine";
      flybackNode.frequency.setValueAtTime(15625, now);
      flybackGain.gain.setValueAtTime(0.001, now);

      this.crtHumGain.gain.setValueAtTime(0.015, now);

      this.crtHumNode.connect(this.crtHumGain);
      flybackNode.connect(flybackGain);

      this.crtHumGain.connect(this.ctx.destination);
      flybackGain.connect(this.ctx.destination);

      this.crtHumNode.start(now);
      flybackNode.start(now);
    } catch (e) {
      console.warn("Could not start CRT hum", e);
    }
  }

  stopCrtHum() {
    if (this.crtHumNode) {
      try {
        this.crtHumNode.stop();
      } catch (e) {}
      this.crtHumNode = null;
    }
  }

  // Generates deep, dark satanic drone soundtrack and occasional faint screams (1349 occult style)
  private droneOscs: { osc: OscillatorNode; gainNode: GainNode }[] = [];
  private screamInterval: any = null;

  playFaintScream() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const duration = 1.8 + Math.random() * 1.5;

    try {
      // Distant howling scream: bandpassed noise swept in pitch
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      const startFreq = 950 + Math.random() * 350;
      const endFreq = startFreq - (250 + Math.random() * 200); // downward scream slide
      filter.frequency.setValueAtTime(startFreq, now);
      filter.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
      filter.Q.setValueAtTime(12 + Math.random() * 4, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.005 + Math.random() * 0.005, now + 0.4); // faint and distant

      // Vocal flutter / screaming vibration
      for (let t = 0.4; t < duration; t += 0.07) {
        gain.gain.linearRampToValueAtTime(0.002 + Math.random() * 0.006, now + t);
      }
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Occult delay loop to simulate a deep torment chamber
      const delay = this.ctx.createDelay();
      const delayGain = this.ctx.createGain();
      delay.delayTime.setValueAtTime(0.4, now);
      delayGain.gain.setValueAtTime(0.35, now);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      gain.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch (e) {
      console.warn("Could not play faint scream", e);
    }
  }

  startMusic() {
    this.init();
    if (!this.ctx || this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // 1. Play continuous, breathing low-frequency satanic drones
    try {
      this.droneOscs = [];
      const droneFrequencies = [55.00, 82.41, 110.00, 116.54]; // A1, E2, A2, Bb2 (dissonant tritone)
      droneFrequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        // Add subtle detune modulation
        osc.detune.setValueAtTime((Math.random() * 2 - 1) * 8, this.ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, this.ctx.currentTime);
        filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

        // Slow breathing volume modulation
        gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(idx === 3 ? 0.005 : 0.016, this.ctx.currentTime + 1.5); // lower volume for Bb2 tritone

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        this.droneOscs.push({ osc, gainNode });
      });
    } catch (e) {
      console.warn("Could not start satanic drones", e);
    }

    // 2. Play dark, slow, chilling minor keys
    const notes = [
      110.00, // A2
      116.54, // Bb2 (Tense half-step)
      130.81, // C3
      164.81, // E3
      116.54, // Bb2
      130.81, // C3
      164.81, // E3
      220.00, // A3
      233.08, // Bb3
      164.81, // E3
      130.81, // C3
      116.54, // Bb2
    ];

    let step = 0;
    const stepDuration = 0.75; // slow 80 BPM steps (750ms)

    this.musicInterval = setInterval(() => {
      try {
        if (!this.ctx || this.ctx.state === "suspended") return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        const currentFreq = notes[step % notes.length];

        osc.type = "triangle";
        osc.frequency.setValueAtTime(currentFreq, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320 + Math.sin(now * 0.25) * 120, now);
        filter.Q.setValueAtTime(3, now);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stepDuration * 0.95);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + stepDuration);

        // Dark reverberation
        const delay = this.ctx.createDelay();
        const delayGain = this.ctx.createGain();
        delay.delayTime.setValueAtTime(stepDuration * 1.5, now);
        delayGain.gain.setValueAtTime(0.012, now);

        gain.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(this.ctx.destination);

        step++;
      } catch (e) {
        console.warn("Music tick failed", e);
      }
    }, stepDuration * 1000);

    // 3. Play faint random screams periodically (every 6 to 12 seconds)
    this.screamInterval = setInterval(() => {
      if (Math.random() > 0.35) {
        this.playFaintScream();
      }
    }, 4500);

    // Play one immediately to start
    setTimeout(() => {
      this.playFaintScream();
    }, 1200);
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.screamInterval) {
      clearInterval(this.screamInterval);
      this.screamInterval = null;
    }

    // Stop continuous drones
    this.droneOscs.forEach(({ osc }) => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.droneOscs = [];

    this.isMusicPlaying = false;
  }
}

export const LEAAudio = new AudioEngine();
