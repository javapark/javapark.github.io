---
title: "AI로 웹서비스 만드는 법 — Claude Code + Supabase 실전 가이드"
description: "코드 한 줄 안 쓰고 AI로 웹서비스를 만들 수 있을까? Claude Code, Supabase, Vercel을 활용한 1인 개발 실전 프로세스를 공유합니다."
date: 2026-04-04
update: 2026-04-04
tags:
  - claude-code
  - supabase
  - web-development
  - ai-coding
  - vercel
---

안녕하세요, **자바파커**입니다.

요즘 개발 환경이 빠르게 바뀌고 있습니다. 예전에는 웹서비스 하나 만들려면 프론트엔드, 백엔드, DB, 배포까지 혼자 다 해야 했습니다. 지금은 다릅니다.

> "아이디어만 있으면, AI와 함께 웹서비스를 만들 수 있는 시대"

과장이 아닙니다. 실제로 저는 **Claude Code + GitHub + Supabase** 조합으로 웹서비스를 개발하고 있고, 이 프로세스를 공유합니다.

---

## AI 웹개발 도구 조합 — Claude Code, GitHub, Supabase

먼저 각 도구의 역할을 정리합니다.

| 도구 | 역할 | 비유 |
|------|------|------|
| **Claude Code** | AI 코딩 에이전트 — 설계, 구현, 디버깅 | 24시간 일하는 시니어 개발자 |
| **GitHub** | 코드 저장소 + 버전 관리 + 배포 | 프로젝트의 금고 |
| **Supabase** | 백엔드 올인원 (DB, 인증, API, 스토리지) | 서버 없이 쓰는 백엔드 |

이 세 가지를 조합하면, 1인 개발자가 풀스택 웹서비스를 만들 수 있는 환경이 됩니다. 서버를 직접 관리할 필요도, 인증 로직을 처음부터 짤 필요도 없습니다.

---

## AI 웹서비스 개발 프로세스 — 5단계

제가 실제로 사용하는 프로세스를 단계별로 정리합니다.

### 1단계: 기획 — Claude Code와 대화하기

코드를 한 줄도 작성하기 전에, Claude Code에게 아이디어를 설명합니다.

```
"할 일 관리 웹앱을 만들려고 합니다.
사용자 로그인, 할 일 CRUD, 카테고리 분류 기능이 필요합니다.
기술 스택은 Next.js + Supabase로 가려고 하는데, 어떻게 구조를 잡으면 좋을까요?"
```

Claude Code는 단순히 코드만 생성하는 게 아닙니다. 프로젝트 구조를 제안하고, 테이블 설계를 잡아주고, 필요한 패키지까지 알려줍니다.

이 단계에서 중요한 건 **"무엇을 만들 것인가"를 명확히 하는 것**입니다. AI는 방향을 알려주면 알아서 길을 찾지만, 방향이 모호하면 엉뚱한 곳으로 갑니다.

### 2단계: 프로젝트 셋업 — GitHub + Supabase 초기화

#### GitHub 저장소 생성

```bash
gh repo create my-todo-app --public --clone
cd my-todo-app
```

#### Supabase 프로젝트 생성

Supabase 대시보드에서 프로젝트를 만들면 바로 사용할 수 있는 것들이 생깁니다.

- **PostgreSQL 데이터베이스** — 테이블 만들면 자동으로 REST API 생성
- **Auth** — 이메일, Google, GitHub 로그인 내장
- **Storage** — 파일 업로드/다운로드
- **Realtime** — 데이터 변경 시 실시간 동기화

별도의 백엔드 서버 없이, 프론트엔드에서 직접 Supabase를 호출하는 구조입니다.

#### 환경 변수 설정

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 3단계: 개발 — Claude Code가 코드를 쓴다

여기서부터 Claude Code의 진가가 발휘됩니다.

#### DB 테이블 설계

```
"Supabase에 할 일 관리용 테이블을 만들어줘.
사용자별로 할 일을 관리하고, 카테고리 분류가 가능해야 해."
```

Claude Code가 SQL을 작성합니다.

```sql
-- categories 테이블
create table categories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

-- todos 테이블
create table todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  category_id uuid references categories(id),
  title text not null,
  completed boolean default false,
  created_at timestamptz default now()
);

-- RLS(Row Level Security) 활성화
alter table todos enable row level security;
alter table categories enable row level security;

-- 본인 데이터만 접근 가능
create policy "Users can manage own todos"
  on todos for all
  using (auth.uid() = user_id);

create policy "Users can manage own categories"
  on categories for all
  using (auth.uid() = user_id);
```

Supabase의 **RLS(Row Level Security)** 는 꼭 설정해야 합니다. 안 그러면 모든 사용자가 다른 사람의 데이터를 볼 수 있습니다.

#### 프론트엔드 구현

```
"Next.js App Router 구조로 할 일 목록 페이지를 만들어줘.
Supabase에서 데이터 가져오고, 추가/삭제/완료 토글 기능이 필요해."
```

Claude Code가 컴포넌트, API 호출, 상태 관리까지 한 번에 작성합니다. 저는 결과를 확인하고, 수정이 필요한 부분만 피드백합니다.

```
"완료된 할 일은 아래쪽으로 내려가게 해줘."
"카테고리 필터 버튼 추가해줘."
```

이런 식으로 **대화하면서 개발을 진행**합니다. 코드를 직접 쓰는 시간보다, 원하는 동작을 설명하는 시간이 더 깁니다.

### 4단계: 버전 관리 — GitHub으로 기록

개발 중간중간 커밋을 남깁니다.

```bash
git add .
git commit -m "feat: todo CRUD 기능 구현"
git push origin main
```

Claude Code에게 `/commit` 명령어를 사용하면 변경 내용을 분석해서 적절한 커밋 메시지까지 작성해줍니다.

### 5단계: 배포 — Vercel 또는 GitHub Pages

Next.js 프로젝트라면 Vercel에 연결하는 게 가장 간단합니다.

1. Vercel에 GitHub 저장소 연결
2. 환경 변수(Supabase URL, Key) 설정
3. `git push`만 하면 자동 배포

---

## AI 개발의 핵심 — 사람과 AI의 역할 분담

제가 경험한 AI 기반 개발의 핵심은 **역할 분담**입니다.

| 내가 하는 일 | Claude Code가 하는 일 |
|------------|---------------------|
| 무엇을 만들지 결정 | 어떻게 만들지 설계 |
| 요구사항 설명 | 코드 작성 |
| 결과 확인 및 피드백 | 수정 및 개선 |
| 최종 판단 | 대안 제시 |

비유하자면, 저는 **건축주**이고 Claude Code는 **건축가**입니다. 건축주가 "3층짜리 카페를 짓고 싶어요"라고 말하면, 건축가가 도면을 그리고 시공합니다. 건축주가 벽돌을 쌓을 필요는 없습니다.

---

## Supabase vs Firebase — 백엔드 서비스 비교

백엔드 서비스는 여러 선택지가 있습니다. 비교해봤습니다.

| 서비스 | 특징 | 적합한 경우 |
|--------|------|-----------|
| **Supabase** | PostgreSQL 기반, 오픈소스, REST/GraphQL 자동 생성 | 관계형 데이터, SQL 선호 |
| **Firebase** | NoSQL(Firestore), Google 생태계 | 빠른 프로토타이핑, 모바일 앱 |
| **PocketBase** | Go 기반 단일 바이너리, 셀프호스팅 | 가벼운 프로젝트, 직접 서버 관리 |

제가 Supabase를 선택한 이유는 세 가지입니다.

1. **SQL을 쓸 수 있다** — NoSQL보다 익숙하고, 복잡한 쿼리가 가능합니다
2. **무료 티어가 넉넉하다** — 개인 프로젝트에 충분한 용량
3. **Claude Code와 궁합이 좋다** — SQL과 REST API를 AI가 잘 다룹니다

---

## AI 웹개발 실전 팁 3가지

### Supabase RLS는 반드시 설정하세요

Supabase는 기본적으로 프론트엔드에서 직접 DB를 호출합니다. RLS 없이 배포하면 **누구나 API로 모든 데이터에 접근할 수 있습니다.** 이건 실수가 아니라 보안 사고입니다.

### Claude Code에게 컨텍스트를 충분히 주세요

```
# 나쁜 예
"로그인 기능 만들어줘"

# 좋은 예
"Supabase Auth를 사용해서 이메일/비밀번호 로그인 기능을 만들어줘.
Next.js App Router 구조이고, 로그인 후 /dashboard로 리다이렉트해야 해.
미인증 사용자가 /dashboard에 접근하면 /login으로 보내줘."
```

구체적으로 설명할수록, 수정 횟수가 줄어듭니다.

### Git 커밋은 자주 하세요

AI와 개발하면 코드가 빠르게 바뀝니다. 중간중간 커밋하지 않으면, 문제가 생겼을 때 되돌릴 지점이 없습니다. "동작하는 상태"가 확인될 때마다 커밋하는 습관을 들이세요.

---

## 자주 묻는 질문 (FAQ)

### 코딩을 몰라도 AI로 웹서비스를 만들 수 있나요?

기본적인 웹 개념(HTML, API 등)을 이해하면 충분합니다. Claude Code가 코드를 작성하고, 여러분은 "무엇을 만들지" 설명하는 역할입니다. 다만, 결과물을 검토하고 디버깅할 때 기초 지식이 있으면 훨씬 수월합니다.

### 이 조합으로 개발하면 비용이 얼마나 드나요?

Supabase 무료 티어(500MB DB, 1GB 스토리지), Vercel 무료 플랜, GitHub 무료 저장소를 사용하면 **호스팅 비용은 0원**입니다. Claude Code 구독 비용만 발생합니다. 개인 프로젝트나 사이드 프로젝트에는 충분한 수준입니다.

### Claude Code 말고 다른 AI 코딩 도구도 사용할 수 있나요?

GitHub Copilot, Cursor 등 다른 AI 코딩 도구도 비슷한 프로세스로 활용할 수 있습니다. 다만 Claude Code는 프로젝트 전체 맥락을 이해하고 대화 기반으로 개발을 진행할 수 있다는 점에서 이 프로세스에 가장 잘 맞습니다.

---

## 마무리

정리하면, AI를 이용한 웹서비스 개발 프로세스는 이렇습니다.

1. **기획** — Claude Code와 대화하며 구조 설계
2. **셋업** — GitHub 저장소 + Supabase 프로젝트 초기화
3. **개발** — Claude Code가 코드 작성, 나는 피드백
4. **관리** — GitHub으로 버전 관리
5. **배포** — Vercel 연결 후 자동 배포

핵심은 **"코드를 직접 쓰는 것"에서 "무엇을 만들지 설명하는 것"으로 역할이 바뀐다**는 점입니다.

개발 경험이 많으면 더 정확한 지시를 할 수 있고, 경험이 적어도 AI와 대화하면서 배워갈 수 있습니다. 어느 쪽이든, 혼자 처음부터 끝까지 코딩하던 시대와는 확실히 다릅니다.

여러분은 AI와 함께 어떤 서비스를 만들어보고 싶으신가요? 댓글로 알려주세요!

---

## 참고 자료

- [Claude Code 공식 문서](https://docs.anthropic.com/en/docs/claude-code/overview) — Anthropic의 AI 코딩 에이전트 소개 및 사용법
- [Supabase 공식 문서](https://supabase.com/docs) — 데이터베이스, 인증, 스토리지 설정 가이드
- [Vercel 공식 문서](https://vercel.com/docs) — Next.js 배포 및 환경 변수 설정
- [Next.js App Router 가이드](https://nextjs.org/docs/app) — App Router 구조와 라우팅
