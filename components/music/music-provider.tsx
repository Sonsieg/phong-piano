'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { playlist } from '@/src/config/playlist';

type MusicState = {
  playing: boolean;
  loading: boolean;
  volume: number;
  muted: boolean;
  error: string;
  trackIndex: number;
  toggle: () => void;
  next: () => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  analyser: React.RefObject<AnalyserNode | null>;
  energy: React.RefObject<number>;
};
const MusicContext = createContext<MusicState | null>(null);
export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error('MusicProvider is required.');
  return value;
}
export function MusicProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const context = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const energy = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const operation = useRef({ id: 0 });
  const settings = useRef({ volume: 0.35, muted: false });
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, updateVolume] = useState(0.35);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState('');
  const [trackIndex, setTrackIndex] = useState(0);
  useEffect(() => {
    const pending = operation.current;
    const element = new Audio();
    element.preload = 'none';
    element.loop = true;
    audio.current = element;
    const onPlay = () => setPlaying(true);
    const onPause = () => {
      setPlaying(false);
      energy.current = 0;
    };
    const onError = () => {
      setLoading(false);
      setPlaying(false);
      setError('Không tải được bản nhạc. Hãy thử lại hoặc chọn bản khác.');
    };
    element.addEventListener('playing', onPlay);
    element.addEventListener('pause', onPause);
    element.addEventListener('error', onError);
    Promise.resolve().then(() => {
      try {
        const saved = JSON.parse(localStorage.getItem('piano-music') ?? 'null');
        if (saved && typeof saved.volume === 'number' && Number.isFinite(saved.volume)) {
          settings.current = {
            volume: Math.min(1, Math.max(0, saved.volume)),
            muted: saved.muted === true,
          };
          updateVolume(settings.current.volume);
          setMuted(settings.current.muted);
        }
      } catch {
        /* Storage is optional; playback still works in private mode. */
      }
    });
    return () => {
      pending.id++;
      if (timer.current) clearTimeout(timer.current);
      element.pause();
      element.removeAttribute('src');
      element.load();
      element.removeEventListener('playing', onPlay);
      element.removeEventListener('pause', onPause);
      element.removeEventListener('error', onError);
      void context.current?.close();
      context.current = null;
      gain.current = null;
      analyser.current = null;
      audio.current = null;
    };
  }, []);
  function fade(target: number, seconds = 0.35) {
    const ctx = context.current,
      node = gain.current;
    if (ctx && node) {
      node.gain.cancelScheduledValues(ctx.currentTime);
      node.gain.setValueAtTime(node.gain.value, ctx.currentTime);
      node.gain.linearRampToValueAtTime(target, ctx.currentTime + seconds);
    } else if (audio.current) audio.current.volume = target;
  }
  function saveSettings() {
    try {
      localStorage.setItem('piano-music', JSON.stringify(settings.current));
    } catch {
      /* Optional. */
    }
  }
  async function play(index = trackIndex) {
    const element = audio.current,
      track = playlist[index];
    if (!element || !track) {
      setError('Chưa có nguồn nhạc.');
      return;
    }
    const currentOperation = ++operation.current.id;
    if (timer.current) clearTimeout(timer.current);
    setLoading(true);
    setError('');
    try {
      if (!context.current && typeof AudioContext !== 'undefined') {
        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(element);
        const gainNode = ctx.createGain();
        const meter = ctx.createAnalyser();
        meter.fftSize = 64;
        source.connect(gainNode);
        gainNode.connect(meter);
        meter.connect(ctx.destination);
        context.current = ctx;
        gain.current = gainNode;
        analyser.current = meter;
      }
      // Start/resume only inside the user's click, including on mobile Safari.
      const resume = context.current?.resume();
      if (element.getAttribute('src') !== track.src) element.src = track.src;
      fade(0, 0);
      await Promise.all([resume, element.play()]);
      if (currentOperation !== operation.current.id) return;
      fade(settings.current.muted ? 0 : settings.current.volume);
    } catch {
      if (currentOperation === operation.current.id) {
        element.pause();
        setError('Chưa phát được nhạc. Bấm bật nhạc để thử lại.');
      }
    } finally {
      if (currentOperation === operation.current.id) setLoading(false);
    }
  }
  function toggle() {
    if (!audio.current) return;
    if (loading || !audio.current.paused) {
      operation.current.id++;
      setLoading(false);
      fade(0);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => audio.current?.pause(), 360);
    } else void play();
  }
  function next() {
    if (playlist.length < 2 || loading) return;
    const index = (trackIndex + 1) % playlist.length;
    setTrackIndex(index);
    const element = audio.current;
    if (element && !element.paused) {
      fade(0);
      setLoading(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        element.pause();
        void play(index);
      }, 360);
    } else if (element) {
      element.src = playlist[index].src;
    }
  }
  function setVolume(value: number) {
    settings.current.volume = value;
    updateVolume(value);
    fade(settings.current.muted ? 0 : value, 0.1);
    saveSettings();
  }
  function toggleMute() {
    settings.current.muted = !settings.current.muted;
    setMuted(settings.current.muted);
    fade(settings.current.muted ? 0 : settings.current.volume, 0.12);
    saveSettings();
  }
  return (
    <MusicContext.Provider
      value={{
        playing,
        loading,
        volume,
        muted,
        error,
        trackIndex,
        toggle,
        next,
        setVolume,
        toggleMute,
        analyser,
        energy,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
