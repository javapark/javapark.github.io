/**
 * 자체 도메인으로 나가는 링크에만 UTM 을 붙인다.
 *
 * 포털에는 GA 가 없다. 대신 blog(G-TG9BJHTX59)·quiz(G-DY27CH6R06) 쪽 GA 에서
 * "portal / <위치>" 소스로 잡히게 해서 어느 자리에서 눌렸는지를 도착지에서 센다.
 * 유튜브·인스타·깃허브는 우리가 리포트를 못 받으므로 붙이지 않는다 — 붙여봐야 노이즈다.
 */
const OWNED = /(^|\.)javapark\.kr$/;

export function tagged(url: string, medium: string): string {
  try {
    const u = new URL(url);
    if (!OWNED.test(u.hostname)) return url;
    u.searchParams.set('utm_source', 'portal');
    u.searchParams.set('utm_medium', medium);
    return u.toString();
  } catch {
    return url;
  }
}
