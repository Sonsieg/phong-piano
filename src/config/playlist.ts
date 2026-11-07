export interface MusicTrack {
  id: string;
  title: string;
  composer: string;
  src: string;
}

// Add only audio files you own or are licensed to distribute in public/audio.
export const playlist: MusicTrack[] = [
  {
    id: 'prelude-original',
    title: 'Khúc dạo đầu',
    composer: 'Piano tổng hợp · Giai điệu nguyên bản',
    src: '/audio/prelude-original.wav',
  },
];
