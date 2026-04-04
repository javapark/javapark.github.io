---
title: "Claude Code Skill 사용법 — 슬래시 명령어로 반복 업무 자동화"
description: "Claude Code의 Skill 기능으로 반복 업무를 슬래시 명령어 하나로 자동화하는 방법. SKILL.md 작성법, 프론트매터 옵션, 실전 예시까지 정리합니다."
date: 2026-04-04
update: 2026-04-04
tags:
  - claude-code
  - skill
  - automation
  - productivity
---

안녕하세요, **자바파커**입니다.

Claude Code를 쓰다 보면 매번 같은 지시를 반복하는 순간이 옵니다.

> "블로그 포스팅 써줘. 톤은 친근하게, 마크다운으로, 코드 예시 포함해서, 도입-본문-정리 구조로..."

이 긴 설명을, 이렇게 한 줄로 바꿀 수 있다면 어떨까요?

```
/blog-post Claude Code Skill 소개
```

이게 바로 **Skill**입니다. 실제로 이 글도 제가 만든 블로그 포스팅 스킬로 작성했습니다.

---

## Claude Code Skill이란?

**반복되는 작업 지시를 파일로 저장해두고, 슬래시 명령어로 호출하는 기능**입니다.

비유하자면, 신입에게 매번 말로 설명하던 업무 절차를 **매뉴얼 문서로 만들어둔 것**과 같습니다. Claude가 그 매뉴얼을 읽고, 그대로 실행합니다.

---

## Skill vs Hook vs CLAUDE.md 차이점 비교

처음 접하면 헷갈리는 세 가지를 정리합니다.

| 구분 | 역할 | 비유 |
|------|------|------|
| **CLAUDE.md** | 프로젝트 전체에 적용되는 규칙 | 사무실 벽에 붙은 공지사항 |
| **Skill** | 특정 작업을 위한 명령어 | 업무 매뉴얼 |
| **Hook** | 이벤트 발생 시 자동 실행 | 자동화 봇 |

핵심 차이를 한 줄로 요약하면:

- **CLAUDE.md** — 항상 적용됩니다
- **Skill** — 내가 호출하거나, Claude가 판단해서 호출합니다
- **Hook** — 특정 이벤트에 자동으로 실행됩니다

---

## SKILL.md 만드는 법 — 3단계

### 1단계: 폴더와 파일 만들기

```
~/.claude/skills/blog-post/
└── SKILL.md
```

이게 끝입니다. `SKILL.md` 파일 하나만 있으면 됩니다.

저장 위치에 따라 적용 범위가 달라집니다.

| 위치 | 적용 범위 | 용도 |
|------|----------|------|
| `~/.claude/skills/<name>/SKILL.md` | 내 모든 프로젝트 | 개인 스킬 |
| `.claude/skills/<name>/SKILL.md` | 해당 프로젝트만 | 팀 공유 (Git 커밋) |

### 2단계: SKILL.md 작성하기

파일 구조는 **YAML 프론트매터 + 마크다운 본문** 두 부분으로 되어 있습니다.

```yaml
---
name: blog-post
description: 블로그 포스팅 초안을 작성합니다
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, WebSearch
---

# 블로그 포스팅 작성 스킬

## 기본 정보
- 블로그명: AI JAVAPARK
- 필명: 자바파커

## 작성 규칙
- 실전 경험 기반의 친근한 문체
- 어려운 개념은 비유나 실제 사례로 설명
- 도입 → 본문 → 정리 구조

## 포맷
- 마크다운 형식
- 코드 블록에는 언어 표기
```

`---`로 감싼 윗부분이 **프론트매터**(설정), 아랫부분이 **본문**(Claude에게 주는 지시)입니다.

### 3단계: 호출하기

```bash
/blog-post Claude Code Skill 소개
```

"Claude Code Skill 소개"가 `$ARGUMENTS`로 전달되어, 스킬에 정의된 규칙대로 포스팅이 만들어집니다.

---

## SKILL.md 프론트매터 옵션 정리

| 옵션 | 설명 | 예시 |
|------|------|------|
| `name` | 슬래시 명령어 이름 | `blog-post` |
| `description` | 스킬 설명 | `블로그 포스팅 초안을 작성합니다` |
| `disable-model-invocation` | `true`면 수동 호출만 가능 | 부작용 있는 작업에 권장 |
| `allowed-tools` | 사용할 도구 제한 | `Read, Grep, Glob` |
| `context` | `fork` 시 서브에이전트로 분리 실행 | 메인 대화 오염 방지 |
| `agent` | `context: fork` 시 에이전트 타입 | `Explore`, `Plan` |

---

## 실전 예시 — 블로그 포스팅 자동화 Skill

실제로 사용 중인 스킬 전체를 공개합니다.

```yaml
---
name: blog-post
description: 블로그 포스팅 초안을 작성합니다. 주제를 전달하면 구조화된 마크다운 포스팅을 생성합니다.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, WebSearch, WebFetch, Agent
---

# 블로그 포스팅 작성 스킬

## 기본 정보
- 블로그명: AI JAVAPARK
- 필명: 자바파커
- 플랫폼: 티스토리
- 주요 독자: 개발자, AI/IT에 관심 있는 사람들

## 작성 규칙

### 톤 & 스타일
- 실전 경험 기반의 친근한 문체 ("~합니다" 체)
- 어려운 개념은 비유나 실제 사례로 설명
- 독자가 바로 따라할 수 있는 실용적 내용 중심
- 불필요한 서론 최소화, 핵심부터 진입

### 구조
1. **도입** — 왜 이 주제를 다루는지 (2~3문장)
2. **본문** — 개념 설명 + 실전 예시 + 코드/설정 예시
3. **정리** — 핵심 요약 또는 다음 단계 제안

### 포맷
- 마크다운 형식
- 코드 블록에는 언어 표기
- 적절한 소제목으로 스캔 가능하게 구성
- 긴 설명보다 표, 목록, 코드 예시 활용

## 작업 흐름
1. 주제($ARGUMENTS)를 받으면 먼저 포스팅 아웃라인을 잡는다
2. 필요하면 WebSearch로 최신 정보를 확인한다
3. 프로젝트 내 관련 코드/설정이 있으면 참조한다
4. 마크다운 초안을 작성한다
5. 초안을 프로젝트 루트에 posts/ 디렉토리 아래 저장한다
```

이 스킬 덕분에 `/blog-post 주제` 한 줄이면 블로그 톤, 구조, 포맷을 매번 설명하지 않아도 됩니다.

---

## Claude Code Skill 활용 예시 — 코드 리뷰, 이슈 처리

### 코드 리뷰 스킬

PR을 서브에이전트로 분석합니다. `!`command`` 문법으로 쉘 명령어 결과를 동적으로 주입하는 게 포인트입니다.

```yaml
---
name: review
description: PR 코드 리뷰를 수행합니다
context: fork
agent: Explore
allowed-tools: Bash(gh *), Read, Grep, Glob
---

## PR 컨텍스트
- PR diff: !`gh pr diff`
- 변경 파일: !`gh pr diff --name-only`

## 리뷰 기준
1. 버그 가능성이 있는 코드
2. 성능 이슈
3. 보안 취약점
4. 컨벤션 위반
```

### GitHub 이슈 처리 스킬

이슈 번호만 넘기면 분석부터 커밋까지 처리합니다.

```yaml
---
name: fix-issue
description: GitHub 이슈를 분석하고 수정합니다
disable-model-invocation: true
---

GitHub 이슈 #$ARGUMENTS 를 처리합니다:

1. 이슈 내용을 읽고 요구사항 파악
2. 관련 코드 탐색
3. 수정 구현
4. 테스트 작성
5. 커밋 생성
```

---

## Claude Code Skill 작성 팁 5가지

**`disable-model-invocation: true`를 습관적으로 쓰세요.**
배포, 커밋, 메시지 전송 등 부작용이 있는 스킬에 설정하지 않으면, Claude가 대화 중 알아서 호출할 수 있습니다.

**description을 잘 쓰세요.**
Claude가 자동 호출 여부를 판단할 때 이 설명을 봅니다. 모호하면 엉뚱한 타이밍에 호출됩니다.

**SKILL.md는 500줄 이내로.**
길어지면 별도 파일로 분리하고 SKILL.md에서 참조하세요. 스킬 디렉토리 안에 `examples/`, `templates/` 같은 하위 폴더를 두면 됩니다.

**`$ARGUMENTS`로 입력값을 받으세요.**
`/skill-name 인자값` 형태로 호출하면 `$ARGUMENTS`에 전달됩니다. `$0`, `$1`로 개별 인자도 접근 가능합니다.

**`context: fork`로 대화를 깔끔하게.**
리서치나 분석처럼 긴 작업은 서브에이전트로 분리하면 메인 대화가 오염되지 않습니다.

---

## 자주 묻는 질문 (FAQ)

### Skill과 프롬프트 템플릿은 뭐가 다른가요?

프롬프트 템플릿은 텍스트를 복사-붙여넣기 하는 방식입니다. Skill은 Claude Code가 직접 파일을 읽고 실행하기 때문에, 도구 사용 제한(`allowed-tools`), 자동 호출 제어(`disable-model-invocation`), 서브에이전트 분리(`context: fork`) 같은 세밀한 제어가 가능합니다.

### Skill을 팀원과 공유할 수 있나요?

프로젝트 루트의 `.claude/skills/` 에 저장하면 Git으로 커밋할 수 있습니다. 팀원이 같은 저장소를 클론하면 동일한 슬래시 명령어를 사용할 수 있습니다.

### Skill이 너무 길어지면 어떻게 하나요?

SKILL.md는 500줄 이내로 유지하는 것이 좋습니다. 길어지면 스킬 디렉토리 안에 `examples/`, `templates/` 같은 하위 폴더를 만들고, SKILL.md에서 해당 파일을 참조하도록 작성하세요.

---

## 마무리

Skill은 결국 **"Claude에게 주는 업무 매뉴얼을 파일로 저장한 것"**입니다.

1. `SKILL.md` 파일 하나 만들고
2. 프론트매터에 이름과 설명 적고
3. 본문에 작업 지시를 마크다운으로 작성하면

그때부터 `/name`으로 호출할 수 있습니다.

반복하는 작업이 있다면, 오늘 바로 하나 만들어보세요. 한번 만들어두면 다시는 같은 설명을 반복하지 않아도 됩니다.

여러분은 어떤 반복 업무를 스킬로 만들고 싶으신가요? 댓글로 알려주세요!

---

## 참고 자료

- [Claude Code 공식 문서 — Skills](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Claude Code 공식 문서 — CLAUDE.md](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Claude Code 공식 문서 — Hooks](https://docs.anthropic.com/en/docs/claude-code/hooks)
