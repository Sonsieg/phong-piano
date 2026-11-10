import type { MetadataRoute } from 'next';
import { assignments } from '@/src/data/assignments';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL;
  if (!base) return [];
  return [
    '',
    '/projects',
    '/conclusion',
    '/tri-an',
    '/am-nhac',
    ...assignments.map((a) => `/projects/${a.slug}`),
  ].map((path) => ({ url: `${base.replace(/\/$/, '')}${path}`, changeFrequency: 'monthly' }));
}
