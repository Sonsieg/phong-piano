'use client';

import { playlist, sunoTracks } from '@/src/config/playlist';
import { useMusic } from './music-provider';
import { TrackPlayer, formatDuration } from './track-player';

export function SongLibrary() {
  const { playing, loading, trackIndex, error, selectTrack, toggle } = useMusic();
  const active = playlist[trackIndex];
  return (
    <section id="songs" className="section-pad song-library">
      <div className="section-label">
        <span>NGHE THỬ / {sunoTracks.length} BẢN NHẠC</span>
        <span>SUNO AI · LỜI CÓ AI HỖ TRỢ</span>
      </div>
      <h2>
        Những giai điệu
        <br />
        đang khám phá.
      </h2>
      <p>
        Chọn một bài để nghe, hoặc bật danh sách để nghe lần lượt. Nhạc tiếp tục khi chuyển trang và
        chỉ phát khi bạn chủ động bật.
      </p>
      <TrackPlayer />
      {error && <p role="alert">{error}</p>}
      <ol className="song-list">
        {sunoTracks.map((track, i) => {
          const selected = track.id === active?.id;
          return (
            <li key={track.id} data-active={selected}>
              <span className="song-number">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{track.title}</h3>
                <p>
                  {track.composer} ·{' '}
                  <span aria-label="Thời lượng">{formatDuration(track.duration)}</span>
                </p>
              </div>
              <button
                type="button"
                aria-label={`${selected && playing ? 'Tạm dừng' : 'Phát'} ${track.title}`}
                aria-pressed={selected && playing}
                onClick={() =>
                  selected
                    ? toggle()
                    : selectTrack(playlist.findIndex((item) => item.id === track.id))
                }
              >
                {selected && loading ? 'Đang tải…' : selected && playing ? 'Tạm dừng' : 'Phát ▶'}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
