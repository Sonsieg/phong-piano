export interface MusicTrack {
  id: string;
  title: string;
  composer: string;
  src: string;
  duration: number;
}

export const sunoTracks: MusicTrack[] = [
  {
    id: 'suno-01',
    title: 'Chờ cơn mưa rơi… cuốn em đi xa',
    composer: 'Suno AI · Lời có AI hỗ trợ',
    src: '/audio/suno/track-01.mp3',
    duration: 147.792,
  },
  {
    id: 'suno-02',
    title: 'Cơ mưa đêm rơi xuống',
    composer: 'Suno AI · Lời có AI hỗ trợ',
    src: '/audio/suno/track-02.mp3',
    duration: 232.632,
  },
  {
    id: 'suno-03',
    title: 'Làm tôi vui 60s',
    composer: 'Suno AI · Lời có AI hỗ trợ',
    src: '/audio/suno/track-03.mp3',
    duration: 178.584,
  },
  {
    id: 'suno-04',
    title: 'Mưa Cuối Phố (Lofi Edit)',
    composer: 'Suno AI · Lời có AI hỗ trợ',
    src: '/audio/suno/track-04.mp3',
    duration: 179.784,
  },
  {
    id: 'suno-05',
    title: 'Thu trên vai áo',
    composer: 'Suno AI · Lời có AI hỗ trợ',
    src: '/audio/suno/track-05.m4a',
    duration: 170.549116,
  },
  {
    id: 'suno-06',
    title: 'Tự sự',
    composer: 'Suno AI · Lời có AI hỗ trợ',
    src: '/audio/suno/track-06.mp3',
    duration: 149.352,
  },
  {
    id: 'suno-07',
    title: 'Xa kỉ niệm',
    composer: 'Suno AI · Lời có AI hỗ trợ',
    src: '/audio/suno/track-07.mp3',
    duration: 160.872,
  },
];

// Add only audio files you own or are licensed to distribute in public/audio.
export const playlist: MusicTrack[] = [
  {
    id: 'piano-concerto-no-21',
    title: 'Piano Concerto No.21',
    composer: 'Nhạc nền · Tệp do người dùng cung cấp',
    src: '/audio/piano-concerto-no-21.mp3',
    duration: 462.335187,
  },
  ...sunoTracks,
];
