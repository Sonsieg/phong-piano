'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { MusicToggle } from './music/music-player';
import { ChapterIcon } from './chapter-icon';
const MusicAtmosphere = dynamic(() => import('./music-atmosphere'), { ssr: false });
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { assignments, type Deliverable } from '@/src/data/assignments';
const slides = [
  {
    label: 'THE PRELUDE',
    title: (
      <>
        Âm nhạc là ngôn ngữ
        <br />
        của tâm hồn.
      </>
    ),
    text: 'Hành trình khám phá nghệ thuật Piano và thế giới công nghệ số.',
    link: '/#about',
    cta: 'Khám phá hành trình',
  },
  {
    label: 'THE PASSION',
    title: (
      <>
        Mỗi phím đàn.
        <br />
        Một câu chuyện.
      </>
    ),
    text: 'Nơi đam mê, sự kiên trì và sáng tạo gặp nhau.',
    link: '/#about',
    cta: 'Tìm hiểu về tôi',
  },
  {
    label: 'THE JOURNEY',
    title: (
      <>
        Từ những nốt nhạc
        <br />
        đến những ý tưởng.
      </>
    ),
    text: 'Sáu chương học tập. Một hành trình không ngừng khám phá.',
    link: '/projects',
    cta: 'Xem các dự án',
  },
];
export function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touch = useRef(0);
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', fn);
    return () => document.removeEventListener('visibilitychange', fn);
  }, []);
  useEffect(() => {
    if (!playing || hover || hidden || matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const id = setInterval(() => setIndex((i) => (i + 1) % 3), 5000);
    return () => clearInterval(id);
  }, [playing, hover, hidden]);
  return (
    <section
      className={`hero hero-${index}`}
      aria-roledescription="trình chiếu"
      aria-label="Lời mở đầu"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setIndex((i) => (i + 1) % 3);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setIndex((i) => (i + 2) % 3);
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        scene.current?.style.setProperty('--turn', '0deg');
      }}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHover(false);
      }}
      onTouchStart={(e) => {
        touch.current = e.changedTouches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = touch.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) setIndex((i) => (i + (diff > 0 ? 1 : 2)) % 3);
      }}
      onMouseMove={(e) => {
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
          scene.current?.style.setProperty(
            '--turn',
            `${(e.clientX / window.innerWidth - 0.5) * 7}deg`,
          );
      }}
    >
      <div className="hero-grain" />
      <div className="hero-topline">
        <span>ÂM NHẠC / CÔNG NGHỆ / HÀNH TRÌNH</span>
        <span>EST. 2007 — VIỆT NAM</span>
      </div>
      <div className="hero-display" aria-hidden="true">
        PRELUDE<span>01—06</span>
      </div>
      <div ref={scene} className="piano-scene">
        <div className="stage-orbit" />
        <MusicAtmosphere />
        <Image
          src="/images/grand-piano.svg"
          alt="Minh họa đại dương cầm dưới ánh sáng sân khấu"
          width={1400}
          height={1000}
          preload
          className="grand-piano"
        />
        <span className="scene-caption">FIG. 01 — THE INSTRUMENT OF EXPRESSION</span>
      </div>
      <div className="hero-copy" key={index}>
        <p className="eyebrow lime">
          0{index + 1} / {slides[index].label}
        </p>
        <h1>{slides[index].title}</h1>
        <p className="hero-description">{slides[index].text}</p>
        <div className="hero-ctas">
          <Link className="text-link light" href={slides[index].link}>
            {slides[index].cta}
            <span>↗</span>
          </Link>
          <MusicToggle />
        </div>
      </div>
      <div className="hero-bottom">
        <span className="hero-signature">
          ĐINH QUANG PHONG<span>SƯ PHẠM ÂM NHẠC · K20F</span>
        </span>
        <div className="slide-controls">
          <span className="sr-only" aria-live="polite">
            Trang {index + 1} trên 3: {slides[index].label}
          </span>
          <button aria-label="Trang trước" onClick={() => setIndex((index + 2) % 3)}>
            ←
          </button>
          <span>
            0{index + 1}
            <span className="muted"> / 03</span>
          </span>
          <button aria-label="Trang sau" onClick={() => setIndex((index + 1) % 3)}>
            →
          </button>
          <button
            className="autoplay"
            aria-label={playing ? 'Tạm dừng tự chuyển trang' : 'Tự chuyển trang'}
            aria-pressed={playing}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? 'Ⅱ' : '▷'}
          </button>
        </div>
        <a className="scroll-hint" href="#about">
          CUỘN ĐỂ KHÁM PHÁ ↓
        </a>
      </div>
      <div className="slide-lines">
        {slides.map((s, i) => (
          <button
            key={s.label}
            aria-label={`Xem ${s.label}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          >
            <span className={i === index ? 'current' : ''} />
          </button>
        ))}
      </div>
    </section>
  );
}
export function ProjectGrid() {
  return (
    <div className="project-collection">
      <div className="project-grid-heading">
        <p className="eyebrow">SÁU CHƯƠNG HỌC TẬP</p>
        <span className="project-grid-hint">Chọn một chương để bắt đầu ↗</span>
      </div>
      <div className="project-grid" aria-label="Sáu chương học tập">
        {assignments.map((a) => (
          <Link href={`/projects/${a.slug}`} className={`project-slide art-${a.id}`} key={a.id}>
            <div className="project-art">
              <span className="art-number">0{a.id}</span>
              <span className="art-symbol" aria-hidden="true">
                <ChapterIcon id={a.id} />
              </span>
              <span className="art-caption">MOVEMENT / 0{a.id}</span>
              <span className="project-arrow">↗</span>
            </div>
            <div className="project-slide-meta">
              <span>{a.chapter} / KỸ NĂNG SỐ</span>
              <span>2026</span>
            </div>
            <h3>{a.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
const whiteNotes = [
  { name: 'Đô', freq: 261.63, key: 'a' },
  { name: 'Rê', freq: 293.66, key: 's' },
  { name: 'Mi', freq: 329.63, key: 'd' },
  { name: 'Fa', freq: 349.23, key: 'f' },
  { name: 'Sol', freq: 392, key: 'g' },
  { name: 'La', freq: 440, key: 'h' },
  { name: 'Si', freq: 493.88, key: 'j' },
  { name: 'Đô', freq: 523.25, key: 'k' },
];
const blackNotes = [
  { name: 'Đô thăng', freq: 277.18, pos: 1, key: 'w' },
  { name: 'Rê thăng', freq: 311.13, pos: 2, key: 'e' },
  { name: 'Fa thăng', freq: 369.99, pos: 4, key: 't' },
  { name: 'Sol thăng', freq: 415.3, pos: 5, key: 'y' },
  { name: 'La thăng', freq: 466.16, pos: 6, key: 'u' },
];
export function PianoKeyboard() {
  const [active, setActive] = useState('');
  const [error, setError] = useState('');
  const audio = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  async function play(freq: number, key: string) {
    setActive(key);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(''), 240);
    try {
      const ctx = audio.current ?? (audio.current = new AudioContext());
      await ctx.resume();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
      gain.connect(ctx.destination);
      [1, 2, 3].forEach((harmonic, i) => {
        const osc = ctx.createOscillator();
        const vol = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq * harmonic;
        vol.gain.value = 1 / (i * 3 + 1);
        osc.connect(vol);
        vol.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      });
    } catch {
      setError('Trình duyệt chưa hỗ trợ âm thanh. Bạn vẫn có thể thử phím đàn.');
    }
  }
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      void audio.current?.close();
    },
    [],
  );
  return (
    <section className="keyboard-section">
      <div className="keyboard-intro">
        <div>
          <p className="eyebrow">MỘT KHOẢNG LẶNG ĐỂ CẢM NHẬN</p>
          <h2>
            Chạm vào
            <br />
            một giai điệu.
          </h2>
        </div>
        <div>
          <p>
            Không cần một bản nhạc hoàn hảo.
            <br />
            Chỉ cần bắt đầu từ nốt đầu tiên.
          </p>
          <small>Âm thanh tổng hợp mô phỏng · Chỉ phát khi bạn bấm phím.</small>
        </div>
      </div>
      <div
        className="keyboard"
        role="group"
        aria-label="Bàn phím piano: dùng chuột, chạm hoặc các chữ A S D F G H J K khi bàn phím đang được chọn"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.repeat) return;
          const n = [...whiteNotes, ...blackNotes].find((n) => n.key === e.key.toLowerCase());
          if (n) {
            e.preventDefault();
            play(n.freq, n.key);
          }
        }}
      >
        {whiteNotes.map((n) => (
          <button
            key={n.key}
            onPointerDown={() => play(n.freq, n.key)}
            onClick={(e) => {
              if (e.detail === 0) play(n.freq, n.key);
            }}
            className={`white-key ${active === n.key ? 'pressed' : ''}`}
            aria-label={`${n.name}, phím ${n.key.toUpperCase()}`}
          >
            <span>
              {n.name}
              <small>{n.key.toUpperCase()}</small>
            </span>
          </button>
        ))}
        {blackNotes.map((n) => (
          <button
            key={n.key}
            style={{ left: `${n.pos * 12.5 - 3.5}%` }}
            onPointerDown={() => play(n.freq, n.key)}
            onClick={(e) => {
              if (e.detail === 0) play(n.freq, n.key);
            }}
            className={`black-key ${active === n.key ? 'pressed' : ''}`}
            aria-label={`${n.name}, phím ${n.key.toUpperCase()}`}
          />
        ))}
      </div>
      {error && <p role="status">{error}</p>}
    </section>
  );
}
export function CopyPrompt({ text }: { text: string }) {
  const [message, setMessage] = useState('Sao chép prompt ↗');
  return (
    <button
      className="text-link"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setMessage('Đã sao chép ✓');
        } catch {
          setMessage('Hãy chọn văn bản và sao chép thủ công.');
        }
      }}
    >
      {message}
    </button>
  );
}
export function IntegrityChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <div className="checklist">
      {[
        'Tôi đã kiểm chứng các thông tin và trích dẫn.',
        'Tôi không đưa dữ liệu riêng tư vào công cụ AI.',
        'Tôi đã ghi rõ công cụ, mục đích và phạm vi AI hỗ trợ.',
        'Tôi chịu trách nhiệm về nội dung cuối cùng.',
      ].map((t) => (
        <label key={t}>
          <input
            type="checkbox"
            checked={checked.includes(t)}
            onChange={(e) =>
              setChecked((prev) => (e.target.checked ? [...prev, t] : prev.filter((x) => x !== t)))
            }
          />
          <span>{t}</span>
        </label>
      ))}
      <p className="eyebrow" role="status">
        {checked.length}/4 MỤC ĐÃ TỰ KIỂM TRA · KHÔNG LƯU SAU KHI TẢI LẠI
      </p>
    </div>
  );
}
export function MediaViewer({ items }: { items: Deliverable[] }) {
  const [selected, setSelected] = useState<Deliverable | null>(null);
  const last = useRef<HTMLButtonElement | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!selected) return;
    close.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      last.current?.focus();
    };
  }, [selected]);
  if (!items.length)
    return (
      <div className="empty-evidence">
        <span aria-hidden="true">＋</span>
        <div>
          <h3>Không gian dành cho sản phẩm thật.</h3>
          <p>Chưa bổ sung ảnh chụp thao tác, tài liệu PDF, video hoặc đường dẫn sản phẩm.</p>
          <small>Chỉ công bố minh chứng sau khi hoàn thành và kiểm tra nội dung.</small>
        </div>
      </div>
    );
  return (
    <>
      <div className="media-list">
        {items.map((d) =>
          d.kind === 'link' ? (
            <a
              key={d.url}
              className="text-link"
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {d.title} ↗
            </a>
          ) : (
            <button
              key={d.url}
              onClick={(e) => {
                last.current = e.currentTarget;
                setSelected(d);
              }}
            >
              {d.title} ↗
            </button>
          ),
        )}
      </div>
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="media-modal"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelected(null);
            if (e.key === 'Tab' && selected.kind === 'image') {
              e.preventDefault();
              close.current?.focus();
            }
          }}
        >
          <button ref={close} onClick={() => setSelected(null)}>
            Đóng ×
          </button>
          {selected.kind === 'image' ? (
            <Image src={selected.url} alt={selected.title} width={1400} height={1000} />
          ) : selected.kind === 'video' ? (
            <video controls src={selected.url} />
          ) : (
            <iframe title={selected.title} src={selected.url} />
          )}
        </div>
      )}
    </>
  );
}
