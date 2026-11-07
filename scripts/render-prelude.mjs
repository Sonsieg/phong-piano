// Original, procedurally composed piano-style miniature. No samples or third-party recordings.
// Generated audio and this score are dedicated to the public domain under CC0-1.0.
import { writeFile, mkdir } from 'node:fs/promises';
const rate = 22050;
const beat = 0.75;
const duration = 52;
const left = new Float32Array(rate * duration);
const right = new Float32Array(left.length);
function note(midi, start, velocity = 0.18, length = 3) {
  const freq = 440 * 2 ** ((midi - 69) / 12);
  const offset = Math.floor(start * rate);
  const pan = Math.max(0.25, Math.min(0.75, (midi - 36) / 60));
  for (let i = 0; i < length * rate && offset + i < left.length; i++) {
    const t = i / rate;
    let sample = 0;
    for (let h = 1; h <= 5; h++) {
      sample +=
        (Math.sin(2 * Math.PI * freq * h * (1 + h * h * 0.000018) * t) *
          Math.exp(-t * (1.15 + h * 0.48))) /
        h ** 1.9;
    }
    sample *= (1 - Math.exp(-t * 150)) * velocity * Math.min(1, (length - t) / 0.3);
    left[offset + i] += sample * (1 - pan);
    right[offset + i] += sample * pan;
  }
}
const chords = [
  [48, 55, 60, 64],
  [45, 52, 57, 60],
  [41, 48, 53, 57],
  [43, 50, 55, 59],
];
const melody = [
  [72, 76, 74, 71],
  [69, 72, 76, 72],
  [69, 72, 77, 76],
  [74, 71, 67, 71],
  [72, 79, 76, 74],
  [72, 69, 64, 69],
  [65, 69, 72, 69],
  [67, 71, 74, 72],
];
for (let bar = 0; bar < 16; bar++) {
  const start = bar * beat * 4;
  const chord = chords[bar % 4];
  [0, 1, 2, 3, 2, 1].forEach((degree, i) => note(chord[degree], start + i * beat * 0.5, 0.17));
  melody[bar % melody.length].forEach((pitch, i) => note(pitch, start + i * beat, 0.24, 3.5));
}
note(48, 48, 0.2, 4);
note(60, 48, 0.15, 4);
note(64, 48, 0.12, 4);
note(72, 48, 0.1, 4);
const dryL = left.slice(),
  dryR = right.slice();
for (let i = 0; i < left.length; i++) {
  for (const [delay, gain] of [
    [0.113, 0.18],
    [0.237, 0.12],
    [0.389, 0.06],
  ]) {
    const j = i - Math.floor(delay * rate);
    if (j >= 0) {
      left[i] += dryR[j] * gain;
      right[i] += dryL[j] * gain;
    }
  }
}
let peak = 0;
for (let i = 0; i < left.length; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
const buffer = Buffer.alloc(44 + left.length * 4);
buffer.write('RIFF');
buffer.writeUInt32LE(buffer.length - 8, 4);
buffer.write('WAVEfmt ', 8);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(2, 22);
buffer.writeUInt32LE(rate, 24);
buffer.writeUInt32LE(rate * 4, 28);
buffer.writeUInt16LE(4, 32);
buffer.writeUInt16LE(16, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(left.length * 4, 40);
for (let i = 0; i < left.length; i++) {
  const fade = Math.min(1, i / rate / 0.5, (duration - i / rate) / 2);
  buffer.writeInt16LE(Math.round((left[i] / peak) * 0.72 * fade * 32767), 44 + i * 4);
  buffer.writeInt16LE(Math.round((right[i] / peak) * 0.72 * fade * 32767), 46 + i * 4);
}
await mkdir('public/audio', { recursive: true });
await writeFile('public/audio/prelude-original.wav', buffer);
console.log('Rendered original 52-second stereo prelude, CC0.');
