'use client';

import { useEffect, useRef, useState } from 'react';
import { playlist } from '@/src/config/playlist';
import { useMusic } from './music-provider';
import { TrackPlayer } from './track-player';

export function MusicToggle({ compact = false }: { compact?: boolean }) {
  const { playing, loading, toggle } = useMusic();
  return (
    <button
      type="button"
      className={compact ? 'music-toggle compact' : 'music-toggle'}
      aria-pressed={playing}
      onClick={toggle}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M9 18V5l11-2v13M9 8l11-2" />
        <ellipse cx="6" cy="18" rx="3" ry="2.5" />
        <ellipse cx="17" cy="16" rx="3" ry="2.5" />
      </svg>
      <span>{loading ? 'Đang tải…' : playing ? 'Tắt nhạc' : 'Bật âm nhạc'}</span>
    </button>
  );
}
export function AudioVisualizer() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { playing, analyser, energy } = useMusic();
  useEffect(() => {
    const element = canvas.current,
      ctx = element?.getContext('2d');
    if (!element || !ctx) return;
    let frame = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const values = new Uint8Array(32);
    const draw = () => {
      ctx.clearRect(0, 0, 64, 24);
      if (playing && analyser.current) analyser.current.getByteFrequencyData(values);
      else values.fill(0);
      energy.current = playing ? values.reduce((sum, v) => sum + v, 0) / values.length / 255 : 0;
      ctx.fillStyle = '#b8d86f';
      for (let i = 0; i < 12; i++) {
        const height = reduced.matches || !playing ? 2 : Math.max(2, (values[i * 2] / 255) * 22);
        ctx.fillRect(i * 5 + 2, (24 - height) / 2, 2, height);
      }
      if (playing && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      draw();
    };
    document.addEventListener('visibilitychange', visibility);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      energy.current = 0;
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [playing, analyser, energy]);
  return (
    <canvas ref={canvas} width={64} height={24} className="audio-visualizer" aria-hidden="true" />
  );
}
export function MusicPlayer() {
  const [expanded, setExpanded] = useState(false);
  const { playing, volume, muted, setVolume, toggleMute, next, trackIndex, error } = useMusic();
  const track = playlist[trackIndex];
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!expanded) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpanded(false);
        trigger.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!panel.current?.contains(event.target as Node)) setExpanded(false);
    };
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', key);
      document.removeEventListener('pointerdown', outside);
    };
  }, [expanded]);
  return (
    <div className="music-player" ref={panel} aria-label="Nhạc nền piano">
      {expanded && (
        <section className="music-panel" id="music-panel" aria-label="Điều khiển âm nhạc">
          <p className="eyebrow">PIANO / LẮNG NGHE</p>
          <h2>{track?.title ?? 'Chưa có nguồn nhạc'}</h2>
          <p>{track?.composer ?? 'Bổ sung bản nhạc có quyền sử dụng để bắt đầu.'}</p>
          <TrackPlayer compact />
          <div className="music-controls">
            <button onClick={toggleMute} aria-pressed={muted}>
              {muted ? 'Bỏ tắt tiếng' : 'Tắt tiếng'}
            </button>
            <button onClick={next} disabled={playlist.length < 2}>
              Bài tiếp →
            </button>
          </div>
          <label htmlFor="music-volume">
            Âm lượng <span>{Math.round(volume * 100)}%</span>
          </label>
          <input
            id="music-volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <small>Chỉ phát khi bạn bật nhạc. Tiếp tục khi chuyển trang.</small>
        </section>
      )}
      {error && (
        <p className="music-error" role="status">
          {error}
        </p>
      )}
      <div className="music-dock">
        <MusicToggle compact />
        <AudioVisualizer />
        <button
          ref={trigger}
          className="music-settings"
          aria-label={expanded ? 'Đóng tuỳ chỉnh nhạc' : 'Mở tuỳ chỉnh nhạc'}
          aria-expanded={expanded}
          aria-controls="music-panel"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '×' : '⋯'}
        </button>
      </div>
      <span className="sr-only" role="status">
        {playing ? 'Nhạc nền đang phát' : 'Nhạc nền đã tắt'}
      </span>
    </div>
  );
}
