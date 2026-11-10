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
  currentTime: number;
  duration: number;
  repeatOne: boolean;
  seek: (seconds: number) => void;
  previous: () => void;
  toggleRepeat: () => void;
  toggle: () => void;
  next: () => void;
  selectTrack: (index: number) => void;
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
  const currentIndex = useRef(0);
  const playNext = useRef<(index: number) => void>(() => {});
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatOne, setRepeatOne] = useState(false);
  useEffect(() => {
    const pending = operation.current;
    const element = new Audio();
    element.preload = 'none';
    element.loop = false;
    const onEnded = () => playNext.current((currentIndex.current + 1) % playlist.length);
    element.addEventListener('ended', onEnded);
    const onTime = () =>
      setCurrentTime(Number.isFinite(element.currentTime) ? element.currentTime : 0);
    const onDuration = () => setDuration(Number.isFinite(element.duration) ? element.duration : 0);
    const onEmpty = () => {
      setCurrentTime(0);
      setDuration(0);
    };
    element.addEventListener('timeupdate', onTime);
    element.addEventListener('loadedmetadata', onDuration);
    element.addEventListener('durationchange', onDuration);
    element.addEventListener('emptied', onEmpty);
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
      element.removeEventListener('ended', onEnded);
      element.removeEventListener('timeupdate', onTime);
      element.removeEventListener('loadedmetadata', onDuration);
      element.removeEventListener('durationchange', onDuration);
      element.removeEventListener('emptied', onEmpty);
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
    currentIndex.current = index;
    setTrackIndex(index);
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
      if (element.getAttribute('src') !== track.src) {
        setCurrentTime(0);
        setDuration(0);
        element.src = track.src;
      }
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
  useEffect(() => {
    playNext.current = (index) => {
      if (repeatOne && audio.current) {
        audio.current.currentTime = 0;
        void play(currentIndex.current);
      } else void play(index);
    };
  });
  function selectTrack(index: number) {
    if (!Number.isInteger(index) || !playlist[index]) return;
    void play(index);
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
  function changeTrack(index: number) {
    if (!playlist[index] || loading) return;
    const element = audio.current;
    if (!element) return;
    if (timer.current) clearTimeout(timer.current);
    if (!element.paused) {
      void play(index);
    } else {
      currentIndex.current = index;
      setTrackIndex(index);
      setCurrentTime(0);
      setDuration(0);
      setError('');
      element.preload = 'metadata';
      element.src = playlist[index].src;
    }
  }
  function next() {
    changeTrack((currentIndex.current + 1) % playlist.length);
  }
  function previous() {
    changeTrack((currentIndex.current - 1 + playlist.length) % playlist.length);
  }
  function seek(seconds: number) {
    const element = audio.current;
    if (
      !element ||
      !Number.isFinite(seconds) ||
      !Number.isFinite(element.duration) ||
      element.duration <= 0
    )
      return;
    const time = Math.max(0, Math.min(seconds, element.duration));
    element.currentTime = time;
    setCurrentTime(time);
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
        currentTime,
        duration,
        repeatOne,
        seek,
        previous,
        toggleRepeat: () => setRepeatOne((value) => !value),
        toggle,
        next,
        selectTrack,
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
