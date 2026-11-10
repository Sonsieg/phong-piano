'use client';

import { useId } from 'react';
import { playlist } from '@/src/config/playlist';
import { useMusic } from './music-provider';

export function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const value = Math.floor(seconds);
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}

export function TrackPlayer({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const {
    playing,
    loading,
    trackIndex,
    currentTime,
    duration,
    repeatOne,
    volume,
    muted,
    selectTrack,
    toggle,
    previous,
    next,
    seek,
    toggleRepeat,
    setVolume,
    toggleMute,
  } = useMusic();
  const track = playlist[trackIndex];
  const displayDuration = duration || track?.duration || 0;
  return (
    <div
      className={`track-player ${compact ? 'track-player-compact' : ''}`}
      role="group"
      aria-label="Trình phát và quản lý nhạc"
    >
      {!compact && (
        <div className="track-player-heading">
          <p className="eyebrow">
            TRACK PLAYER / {trackIndex + 1}—{playlist.length}
          </p>
          <h3>{track?.title ?? 'Chưa chọn bài'}</h3>
          <p>{track?.composer}</p>
        </div>
      )}
      <div className="track-timeline">
        <label className="sr-only" htmlFor={`${id}-seek`}>
          Tua bài hát
        </label>
        <input
          id={`${id}-seek`}
          className="track-seek"
          type="range"
          min={0}
          max={displayDuration || 1}
          step={0.1}
          value={Math.min(currentTime, displayDuration)}
          disabled={duration <= 0}
          onChange={(e) => seek(Number(e.target.value))}
          aria-valuetext={`${formatDuration(currentTime)} trên ${formatDuration(displayDuration)}`}
        />
        <div className="track-times">
          <span>{formatDuration(currentTime)}</span>
          <span>{formatDuration(displayDuration)}</span>
        </div>
      </div>
      <div className="track-transport">
        <button type="button" aria-label="Bài trước" onClick={previous} disabled={loading}>
          ← Trước
        </button>
        <button type="button" className="track-toggle" onClick={toggle} aria-pressed={playing}>
          {loading ? 'Đang tải…' : playing ? 'Tạm dừng' : 'Phát nhạc ▶'}
        </button>
        <button type="button" aria-label="Bài tiếp" onClick={next} disabled={loading}>
          Tiếp →
        </button>
      </div>
      <div className="track-options">
        <button type="button" aria-pressed={repeatOne} onClick={toggleRepeat}>
          {repeatOne ? 'Lặp một bài: Bật' : 'Lặp một bài: Tắt'}
        </button>
      </div>
      {!compact && (
        <>
          <div className="track-volume">
            <button type="button" aria-pressed={muted} onClick={toggleMute}>
              {muted ? 'Bỏ tắt tiếng' : 'Tắt tiếng'}
            </button>
            <label htmlFor={`${id}-volume`}>Âm lượng {Math.round(volume * 100)}%</label>
            <input
              id={`${id}-volume`}
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>
          <label className="track-queue-label" htmlFor={`${id}-queue`}>
            Chọn bài trong danh sách phát
          </label>
          <select
            id={`${id}-queue`}
            className="track-queue"
            value={trackIndex}
            onChange={(e) => selectTrack(Number(e.target.value))}
          >
            {playlist.map((item, i) => (
              <option key={item.id} value={i}>
                {i + 1}. {item.title} · {formatDuration(item.duration)}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
