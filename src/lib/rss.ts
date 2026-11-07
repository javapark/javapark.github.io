import { XMLParser } from 'fast-xml-parser';

export interface Post {
  title: string;
  link: string;
  pubDate: string;
  /** 본문 첫 이미지(= 커버). 없으면 빈 문자열 */
  thumbnail: string;
  /** 본문에 걸린 유튜브 쇼츠 링크(짝 영상). 없으면 빈 문자열 */
  shorts: string;
}

const BLOG = 'https://blog.javapark.kr';

// RSS 에는 썸네일·카테고리 필드가 따로 없다. 블로그 글은 커버 이미지를 본문 맨 앞에 두므로
// 첫 <img> 를 썸네일로 쓴다(Gatsby 가 만든 /static/... 상대 경로 → 절대 경로로).
function firstImage(html: string): string {
  const m = html.match(/<img[^>]+src=['"]([^'"]+)['"]/);
  if (!m) return '';
  try {
    return new URL(m[1].replace(/&amp;/g, '&'), BLOG).toString();
  } catch {
    return '';
  }
}

// 짝 쇼츠: 개별 영상 주소(youtube.com/shorts/ID)가 우선, 예약 전이면 채널 쇼츠 목록 주소도 받는다.
function shortsLink(html: string): string {
  const m =
    html.match(/https?:\/\/(?:www\.)?youtube\.com\/shorts\/[\w-]+/) ??
    html.match(/https?:\/\/(?:www\.)?youtube\.com\/@[^"'&<\s/]+\/shorts/);
  return m ? m[0] : '';
}

/**
 * blog.javapark.kr 의 RSS 는 최근 몇 건이 아니라 **전체 글**을 담고 있다(2026-11 기준 121편).
 * 그래서 목록 페이지를 만들 때 블로그에 별도 엔드포인트를 두지 않아도 된다.
 * 다만 본문(content:encoded)까지 들어 있어 4MB 가까이 되므로 빌드 타임에만 받고,
 * 한 번의 빌드에서 여러 컴포넌트가 불러도 한 번만 받도록 결과를 기억해 둔다.
 */
const cache = new Map<string, Promise<Post[]>>();
function fetchFeed(feedUrl: string): Promise<Post[]> {
  if (!cache.has(feedUrl)) cache.set(feedUrl, loadFeed(feedUrl));
  return cache.get(feedUrl)!;
}

async function loadFeed(feedUrl: string): Promise<Post[]> {
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
    return items.map((item: any) => {
      const html = String(item?.['content:encoded'] ?? '');
      return {
        title: String(item?.title ?? '').trim(),
        link: String(item?.link ?? '').trim(),
        pubDate: String(item?.pubDate ?? '').trim(),
        thumbnail: firstImage(html),
        shorts: shortsLink(html),
      };
    });
  } catch (e) {
    console.warn('[rss] error:', e);
    return [];
  }
}

export async function fetchLatestPosts(feedUrl: string, limit = 5): Promise<Post[]> {
  const items = await fetchFeed(feedUrl);
  return items.slice(0, limit);
}

/** 목록 페이지용 — 자르지 않고 전부 돌려준다. */
export async function fetchAllPosts(feedUrl: string): Promise<Post[]> {
  return fetchFeed(feedUrl);
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

/** 연도별로 묶는다. 최신 연도가 먼저, 각 연도 안에서도 최신 글이 먼저. */
export function groupByYear(posts: Post[]): { year: string; posts: Post[] }[] {
  const buckets = new Map<string, Post[]>();
  for (const p of posts) {
    const d = new Date(p.pubDate);
    const year = isNaN(d.getTime()) ? '기타' : String(d.getFullYear());
    if (!buckets.has(year)) buckets.set(year, []);
    buckets.get(year)!.push(p);
  }
  return [...buckets.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, list]) => ({
      year,
      posts: list.sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate)),
    }));
}
