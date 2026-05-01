import { XMLParser } from 'fast-xml-parser';

export interface Post {
  title: string;
  link: string;
  pubDate: string;
}

export async function fetchLatestPosts(feedUrl: string, limit = 5): Promise<Post[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'javapark-portal/1.0' },
    });
    if (!res.ok) {
      console.warn(`[rss] fetch failed: ${res.status} ${feedUrl}`);
      return [];
    }
    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const data = parser.parse(xml);
    const raw = data?.rss?.channel?.item ?? [];
    const items = Array.isArray(raw) ? raw : [raw];
    return items.slice(0, limit).map((item: any) => ({
      title: String(item?.title ?? '').trim(),
      link: String(item?.link ?? '').trim(),
      pubDate: String(item?.pubDate ?? '').trim(),
    }));
  } catch (e) {
    console.warn('[rss] error:', e);
    return [];
  }
}

export function formatDate(pubDate: string): string {
  if (!pubDate) return '';
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return pubDate;
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}
