---
title: "블로그 대표이미지를 코드로 만드는 법 — HTML + Playwright PNG 변환"
description: "포토샵 없이 HTML+CSS로 블로그 대표이미지를 디자인하고, Playwright로 PNG 캡처하는 방법. 실제 이 블로그에 적용한 코드와 과정을 공유합니다."
date: 2026-04-04
update: 2026-04-04
tags:
  - html
  - playwright
  - blog-image
  - css
  - automation
---

안녕하세요, **자바파커**입니다.

블로그 포스팅을 쓸 때마다 고민되는 게 있습니다 — **대표이미지**.

> "포토샵은 못 쓰고, Canva는 매번 접속하기 귀찮고, 일관된 스타일을 유지하고 싶은데..."

결론부터 말씀드리면 — **HTML+CSS로 이미지를 디자인하고, Playwright로 PNG를 캡처하면 됩니다.** 이 블로그의 모든 대표이미지가 이 방식으로 만들어졌습니다.

---

## 왜 HTML로 이미지를 만드는가?

| 방법 | 장점 | 단점 |
|------|------|------|
| **포토샵/피그마** | 자유도 높음 | 매번 수동 작업, 라이선스 비용 |
| **Canva** | 쉽고 빠름 | 템플릿 느낌, 일관성 유지 어려움 |
| **HTML+CSS** | 코드로 관리, 재사용, 자동화 가능 | CSS 지식 필요 |

개발자에게 HTML+CSS 방식이 유리한 이유는 세 가지입니다.

1. **코드 = 템플릿** — 한 번 만들면 텍스트만 바꿔서 재사용
2. **버전 관리** — Git으로 이미지 소스를 관리할 수 있음
3. **자동화** — Claude Code에게 "이 포스팅용 대표이미지 만들어줘" 한 마디로 생성 가능

---

## 전체 워크플로우

```
HTML+CSS 작성 → 브라우저에서 확인 → Playwright로 PNG 캡처 → 블로그에 사용
```

| 단계 | 도구 | 소요 시간 |
|------|------|----------|
| 1. HTML 작성 | VS Code / Claude Code | 5~10분 |
| 2. 미리보기 | 브라우저에서 파일 열기 | 즉시 |
| 3. PNG 캡처 | Playwright | 즉시 |

---

## 1단계: HTML+CSS로 이미지 디자인

### 기본 구조 — 썸네일 (1200x630)

블로그 OG 이미지, 유튜브 썸네일용 비율입니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    font-family: 'Segoe UI', 'Malgun Gothic', sans-serif;
    overflow: hidden;
    position: relative;
  }

  h1 {
    color: #f1f5f9;
    font-size: 48px;
    font-weight: 800;
    text-align: center;
    line-height: 1.3;
  }

  h1 span {
    background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
</head>
<body>
  <h1>여기에 <span>제목</span>을<br>입력합니다</h1>
</body>
</html>
```

이것만으로도 다크 배경에 그라데이션 텍스트가 들어간 이미지가 됩니다.

### 기본 구조 — 대표이미지 (1080x1080)

SNS 공유, 티스토리 대표이미지용 1:1 비율입니다.

```html
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { width: 1080px; height: 1080px; overflow: hidden; }
  body {
    width: 1080px;
    height: 1080px;
    /* 나머지는 동일 */
  }
</style>
```

> **핵심:** 1:1 비율일 때는 `html`에도 `width`, `height`, `overflow: hidden`을 넣어야 캡처 시 여백이 생기지 않습니다.

---

## 2단계: 디자인 요소 추가하기

기본 구조에 시각적 요소를 더하면 완성도가 올라갑니다. 이 블로그에서 실제로 사용하는 패턴을 공개합니다.

### 그리드 배경

```css
body::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

반투명 격자 패턴으로 "기술적인 느낌"을 줍니다. 배경에 깔아두면 단순한 배경이 살아납니다.

### 글로우 오브(Glow Orb)

```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}
.orb-1 { width: 350px; height: 350px; background: #0ea5e9; top: -100px; left: 150px; }
.orb-2 { width: 280px; height: 280px; background: #8b5cf6; bottom: -80px; right: 100px; }
```

```html
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
```

`blur` 처리된 큰 원이 배경에 깔리면서 자연스러운 색감 변화를 만듭니다. 색상을 바꾸면 포스팅 주제별로 분위기를 다르게 줄 수 있습니다.

| 주제 | 오브 색상 | 느낌 |
|------|----------|------|
| AI / 기술 | `#0ea5e9` + `#8b5cf6` | 차분한 블루 |
| 경고 / 폐지 | `#f97316` + `#ef4444` | 긴장감 있는 오렌지 |
| YouTube | `#ef4444` + `#8b5cf6` | 레드 + 퍼플 |
| Claude Code | `#d4a574` + `#8b5cf6` | 브라운 + 퍼플 |

### 배지(Badge)

```css
.badge {
  display: inline-block;
  background: rgba(14,165,233,0.15);
  border: 1px solid rgba(14,165,233,0.3);
  color: #38bdf8;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
```

```html
<div class="badge">SEO Guide</div>
```

상단에 카테고리 느낌의 라벨을 넣으면 한눈에 주제가 파악됩니다.

### 그라데이션 텍스트

```css
h1 span {
  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

제목의 핵심 단어에만 적용하면 강조 효과가 확실합니다.

---

## 3단계: Playwright로 PNG 캡처

HTML 파일을 브라우저에서 열어 확인한 후, Playwright로 캡처합니다.

### Playwright MCP 사용 (Claude Code 환경)

Claude Code에서 Playwright MCP를 사용하면 대화 중에 바로 캡처할 수 있습니다.

```
1. playwright_navigate — HTML 파일 열기 (뷰포트 크기 지정)
2. playwright_screenshot — PNG로 저장
```

**썸네일 (1200x630)** 캡처:

```
navigate: file:///경로/thumbnail.html (width: 1200, height: 630)
screenshot: savePng → thumbnail.png
```

**대표이미지 (1080x1080)** 캡처:

```
navigate: file:///경로/cover.html (width: 1080, height: 1080)
screenshot: savePng → cover.png
```

### Playwright CLI 사용 (수동)

Playwright가 설치되어 있다면 스크립트로도 캡처할 수 있습니다.

```javascript
// capture.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 }
  });

  await page.goto('file:///경로/thumbnail.html');
  await page.screenshot({ path: 'thumbnail.png' });

  await browser.close();
})();
```

```bash
node capture.js
```

### 캡처 시 주의할 점

| 문제 | 원인 | 해결 |
|------|------|------|
| 이미지가 2:1로 찍힘 | 뷰포트와 body 크기 불일치 | `html`에도 `width`, `height`, `overflow: hidden` 추가 |
| 하단에 여백 발생 | 브라우저가 html에 추가 높이 부여 | `html { overflow: hidden }` |
| 한글 깨짐 | 폰트 미지정 | `font-family`에 `'Malgun Gothic'` 추가 |
| 그라데이션 텍스트 안 보임 | Firefox에서 미지원 | Chromium 사용 (Playwright 기본값) |

---

## 실전 예시 — 이 블로그의 이미지 시스템

이 블로그는 모든 포스팅에 2종류의 이미지를 만듭니다.

| 유형 | 비율 | 크기 | 용도 | 파일명 |
|------|------|------|------|--------|
| **Thumbnail** | ~2:1 | 1200x630 | OG 이미지, 유튜브 썸네일 | `*-thumbnail.png` |
| **Cover** | 1:1 | 1080x1080 | 티스토리 대표이미지, SNS | `*-cover.png` |

### 디자인 일관성 유지 패턴

모든 이미지에 공통으로 적용하는 요소:

- **배경** — 다크 그라데이션 (`#0f172a` → `#1e293b`)
- **그리드** — 반투명 격자 패턴
- **글로우 오브** — 주제별 색상 2~3개
- **배지** — 상단 카테고리 라벨
- **블로그명** — 우하단 `AI JAVAPARK`

텍스트와 오브 색상만 바꾸면 일관된 브랜딩을 유지하면서 포스팅별로 구분이 됩니다.

### 파일 구조

```
tistory/post/images/
├── post-name-thumbnail.html    ← 썸네일 소스
├── post-name-thumbnail.png     ← 썸네일 이미지
├── post-name-cover.html        ← 대표이미지 소스
└── post-name-cover.png         ← 대표이미지
```

HTML 소스를 함께 보관하면 나중에 수정이 필요할 때 바로 편집하고 다시 캡처할 수 있습니다.

---

## Claude Code와 함께 쓰면

이 방법의 진짜 장점은 **Claude Code와 결합했을 때** 나타납니다.

```
"이 포스팅에 맞는 대표이미지 만들어줘"
```

이 한 마디면 Claude Code가:

1. 포스팅 내용을 읽고
2. 주제에 맞는 색상과 레이아웃을 결정하고
3. HTML+CSS를 작성하고
4. Playwright로 PNG를 캡처합니다

실제로 이 블로그의 포스팅 6개에 대한 썸네일 6개 + 대표이미지 6개, 총 12개의 이미지를 모두 이 방식으로 만들었습니다.

---

## 자주 묻는 질문 (FAQ)

### Playwright 없이 PNG로 변환할 수 있나요?

브라우저에서 HTML을 열고 개발자 도구의 **디바이스 모드**에서 해상도를 맞춘 뒤 스크린샷을 찍는 방법도 있습니다. 다만 정확한 크기 제어와 자동화를 위해서는 Playwright가 훨씬 편합니다.

### 폰트를 웹폰트로 쓸 수 있나요?

네, `<link>` 태그로 Google Fonts를 불러와서 사용할 수 있습니다. 다만 로컬 파일을 열 때 네트워크 요청이 필요하므로, Playwright 캡처 시 `waitUntil: 'networkidle'` 옵션을 추가하면 폰트 로딩을 기다립니다.

### 다크 모드 말고 라이트 모드도 가능한가요?

물론입니다. `background`를 `#ffffff`로, 텍스트를 `#0f172a`로 바꾸면 됩니다. 오브 색상의 `opacity`를 더 낮추면 라이트 배경에서도 자연스럽습니다.

---

## 마무리

정리하면, HTML로 블로그 이미지를 만드는 과정은 이렇습니다.

1. **HTML+CSS로 디자인** — body 크기로 비율 고정, CSS로 시각 요소 구성
2. **브라우저에서 확인** — 파일을 열어 결과 확인
3. **Playwright로 PNG 캡처** — 정확한 크기로 이미지 생성

포토샵 없이, 코드만으로, 일관된 브랜딩의 이미지를 만들 수 있습니다. 한 번 패턴을 잡아두면 새 포스팅마다 텍스트와 색상만 바꾸면 되니, 이미지 제작에 들이는 시간이 크게 줄어듭니다.

여러분은 블로그 이미지를 어떻게 만들고 있나요? 댓글로 알려주세요!

---

## 참고 자료

- [Playwright 공식 문서 — Screenshots](https://playwright.dev/docs/screenshots) — 스크린샷 캡처 옵션 상세 가이드
- [CSS Gradient Generator](https://cssgradient.io/) — 배경 그라데이션 생성 도구
- [MDN — background-clip: text](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip) — 그라데이션 텍스트 구현 방법
- [Google Fonts](https://fonts.google.com/) — 무료 웹폰트
