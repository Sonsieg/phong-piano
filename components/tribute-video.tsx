'use client';

import { useState } from 'react';
import { useMusic } from '@/components/music/music-provider';

export function TributeVideo() {
  const { playing, loading, toggle } = useMusic();
  const [failed, setFailed] = useState(false);
  return (
    <figure className="tribute-film">
      <video
        controls
        playsInline
        preload="metadata"
        aria-label="Video lời cảm ơn gửi thầy Vũ Việt Hoàng"
        aria-describedby="tribute-caption"
        onPlay={() => {
          if (playing || loading) toggle();
        }}
        onError={() => setFailed(true)}
      >
        <source src="/videos/retro.mp4" type="video/mp4" />
        Trình duyệt chưa hỗ trợ phát video. Bạn có thể mở video bằng liên kết bên dưới.
      </video>
      <figcaption id="tribute-caption">
        Một lời cảm ơn gửi thầy, qua những hình ảnh và âm thanh.
      </figcaption>
      {failed && <p role="alert">Chưa phát được video. Bạn hãy thử mở tệp trực tiếp bên dưới.</p>}
      <a className="text-link" href="/videos/retro.mp4" target="_blank" rel="noopener noreferrer">
        Mở video trong tab mới ↗
      </a>
    </figure>
  );
}
