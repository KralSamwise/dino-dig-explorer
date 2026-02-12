'use client'

// Web Audio API sound effects — no external files needed
class SoundEngine {
  private ctx: AudioContext | null = null

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    return this.ctx
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
    try {
      const ctx = this.getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      gain.gain.value = volume
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + duration)
    } catch {}
  }

  private playNotes(notes: [number, number, number][], type: OscillatorType = 'sine', volume = 0.3) {
    try {
      const ctx = this.getCtx()
      notes.forEach(([freq, startOffset, duration]) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = type
        osc.frequency.value = freq
        gain.gain.value = volume
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startOffset + duration)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + startOffset)
        osc.stop(ctx.currentTime + startOffset + duration)
      })
    } catch {}
  }

  // Correct answer — happy ascending chime
  correct() {
    this.playNotes([
      [523, 0, 0.15],    // C5
      [659, 0.1, 0.15],  // E5
      [784, 0.2, 0.3],   // G5
    ], 'sine', 0.25)
  }

  // Wrong answer — descending boop
  wrong() {
    this.playNotes([
      [400, 0, 0.15],
      [300, 0.15, 0.3],
    ], 'triangle', 0.2)
  }

  // Hatch/collect — triumphant fanfare
  hatch() {
    this.playNotes([
      [523, 0, 0.15],     // C5
      [659, 0.12, 0.15],  // E5
      [784, 0.24, 0.15],  // G5
      [1047, 0.36, 0.4],  // C6
      [784, 0.5, 0.15],   // G5
      [1047, 0.65, 0.5],  // C6
    ], 'sine', 0.25)
  }

  // Button click — soft pop
  click() {
    this.playTone(800, 0.08, 'sine', 0.15)
  }

  // Dino roar — low rumble
  roar() {
    try {
      const ctx = this.getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.value = 80
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5)
      gain.gain.value = 0.3
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.6)
    } catch {}
  }

  // Achievement unlock — sparkly
  achievement() {
    this.playNotes([
      [880, 0, 0.1],
      [1109, 0.08, 0.1],
      [1319, 0.16, 0.1],
      [1760, 0.24, 0.4],
    ], 'sine', 0.2)
  }

  // Egg crack
  crack() {
    try {
      const ctx = this.getCtx()
      const bufferSize = ctx.sampleRate * 0.15
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
      }
      const source = ctx.createBufferSource()
      const gain = ctx.createGain()
      source.buffer = buffer
      gain.gain.value = 0.2
      source.connect(gain)
      gain.connect(ctx.destination)
      source.start()
    } catch {}
  }
}

export const sounds = new SoundEngine()
