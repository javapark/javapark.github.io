---
title: "AI 코딩 도구 Skill 비교 — Claude Code vs Gemini CLI vs Codex CLI 커스텀 명령어 완전 정리"
description: "Claude Code, Gemini CLI, OpenAI Codex CLI의 커스텀 명령어(Skill) 기능을 비교합니다. 파일 구조, 호출 방식, 실전 예시까지 한눈에 정리한 가이드."
date: 2026-04-04
update: 2026-04-04
tags:
  - claude-code
  - gemini-cli
  - codex-cli
  - ai-coding
  - skill
  - automation
---

안녕하세요, **자바파커**입니다.

> "AI 코딩 도구마다 커스텀 명령어 만드는 방식이 다르던데, 어떤 걸 써야 하죠?"

요즘 Claude Code, Gemini CLI, OpenAI Codex CLI 모두 **반복 작업을 명령어 하나로 처리하는 기능**을 제공합니다. 이름은 조금씩 다르지만 핵심은 같습니다 — **자주 하는 작업 지시를 파일로 저장해두고, 한 줄로 호출하는 것**.

결론부터 말씀드리면, 세 도구 모두 비슷한 목적을 달성하지만 **설계 철학과 세부 구현이 꽤 다릅니다.** 직접 조사하고 비교해봤습니다.

---

## 한눈에 보는 3사 비교표

| 구분 | Claude Code | Gemini CLI | Codex CLI (OpenAI) |
|------|------------|------------|-------------------|
| **커스텀 명령어** | Skill (`SKILL.md`) | Custom Command (`.toml`) + Agent Skill (`SKILL.md`) | Skill (`SKILL.md`) |
| **프로젝트 설정 파일** | `CLAUDE.md` | `GEMINI.md` | `AGENTS.md` |
| **호출 방식** | `/skill-name` | `/command-name` | `$skill-name` |
| **자동 호출** | description 기반 | Agent Skill만 자동 | description 기반 |
| **파일 형식** | Markdown + YAML | TOML (명령어) / Markdown (스킬) | Markdown + YAML |
| **쉘 명령 주입** | `` !`command` `` | `!{command}` | 미지원 |
| **서브에이전트 분리** | `context: fork` | 미지원 | 미지원 |
| **스킬 배포/공유** | Git으로 공유 | `.skill` 패키지, Extensions | 로컬 공유 |

---

## 1. Claude Code — Skill

이전 포스팅에서 자세히 다뤘지만, 핵심만 짚겠습니다.

### 파일 구조

```
~/.claude/skills/blog-post/
├── SKILL.md          # 필수: 프론트매터 + 지시문
├── reference.md      # 선택: 상세 문서
└── scripts/
    └── helper.py     # 선택: 헬퍼 스크립트
```

### SKILL.md 예시

```yaml
---
name: blog-post
description: 블로그 포스팅 초안을 작성합니다
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, WebSearch
---

# 블로그 포스팅 작성 스킬

주제($ARGUMENTS)를 받으면:
1. 아웃라인을 먼저 잡는다
2. WebSearch로 최신 정보 확인
3. 마크다운 초안 작성
```

### 호출

```bash
/blog-post Claude Code Skill 소개
```

### Claude Code만의 강점

- **`context: fork`** — 서브에이전트로 분리 실행해서 메인 대화가 오염되지 않음
- **`allowed-tools`** — 스킬별로 사용 가능한 도구를 제한 가능
- **`disable-model-invocation`** — 배포 같은 위험한 작업은 수동 호출만 허용
- **`` !`command` ``** — 쉘 명령어 결과를 동적으로 프롬프트에 주입

---

## 2. Gemini CLI — Custom Command + Agent Skill

Gemini CLI는 커스텀 명령어 시스템을 **두 가지로 분리**합니다.

### (1) Custom Command — 간단한 슬래시 명령어

**TOML 파일**로 작성합니다. Claude Code나 Codex와 달리 마크다운이 아니라 TOML입니다.

```
~/.gemini/commands/commit.toml
```

```toml
description = "Git 커밋 메시지를 자동 생성합니다"
prompt = """
다음 diff를 기반으로 Conventional Commit 메시지를 생성해주세요:

```diff
!{git diff --staged}
```
"""
```

호출:
```bash
/commit
```

핵심 문법:
- `!{command}` — 쉘 명령어 실행 후 결과 주입
- `{{args}}` — 사용자 인자 전달
- `@{파일경로}` — 파일/이미지/PDF 내용 주입 (멀티모달 지원)

하위 폴더로 네임스페이스도 지원합니다:
```
.gemini/commands/git/commit.toml  →  /git:commit
```

### (2) Agent Skill — 자동 활성화되는 전문 지식

Custom Command와 별도로, **모델이 자동으로 판단해서 활성화하는 스킬 시스템**이 있습니다.

```
.gemini/skills/code-reviewer/
├── SKILL.md
├── scripts/
└── references/
```

```yaml
---
name: code-reviewer
description: 코드 리뷰를 수행합니다. 로컬 변경사항과 원격 PR 모두 지원합니다.
---

# Code Reviewer
이 스킬은 체계적인 코드 리뷰를 수행합니다.

## 워크플로우
1. 리뷰 대상 파악 (PR 번호 또는 로컬 변경사항)
2. 코드 분석
3. 리뷰 코멘트 생성
```

**토큰 효율이 좋은 설계:**
- 세션 시작 시 이름+설명만 로드
- 관련 작업이 감지되면 `activate_skill` 호출
- 그때서야 전체 SKILL.md 본문이 컨텍스트에 주입

관리 명령어:
```bash
/skills list
/skills disable code-reviewer
gemini skills install https://github.com/...
```

### Gemini CLI만의 강점

- **TOML 기반 Command** — 간단한 명령어는 3줄이면 완성
- **`@{파일경로}`** — 이미지, PDF 등 멀티모달 파일을 프롬프트에 바로 주입
- **Progressive Disclosure** — Agent Skill은 필요할 때만 전체 로드 (토큰 절약)
- **Extensions 시스템** — 스킬을 패키지로 묶어 설치/배포 가능

---

## 3. Codex CLI (OpenAI) — Skill

Codex CLI의 Skill 시스템은 구조적으로 Claude Code와 가장 비슷합니다.

### 파일 구조

```
.agents/skills/fix-issue/
├── SKILL.md          # 필수: 지시문
├── scripts/          # 선택: 실행 스크립트
├── references/       # 선택: 참고 문서
└── agents/
    └── openai.yaml   # 선택: UI 메타데이터
```

### SKILL.md 예시

```yaml
---
name: fix-issue
description: GitHub 이슈를 분석하고 코드를 수정합니다
---

# Fix Issue

이슈 번호를 받으면:
1. 이슈 내용 분석
2. 관련 코드 탐색
3. 수정 구현
4. 테스트 작성
```

### 호출

```bash
$fix-issue 42
```

Claude Code의 `/` 대신 `$` 기호를 사용합니다.

### 스킬 저장 위치

| 범위 | 경로 |
|------|------|
| 저장소 (CWD) | `.agents/skills/` |
| 저장소 (루트) | `$REPO_ROOT/.agents/skills/` |
| 사용자 | `$HOME/.agents/skills/` |
| 시스템 | `/etc/codex/skills/` |
| 번들 | Codex 내장 |

### Codex CLI만의 강점

- **`openai.yaml` 메타데이터** — 아이콘, 브랜드 색상 등 UI 커스터마이징
- **MCP 의존성 선언** — 스킬에서 필요한 MCP 도구를 명시적으로 선언
- **5단계 스코프** — CWD → 저장소 루트 → 사용자 → 관리자 → 시스템까지 세분화
- **30+ 내장 슬래시 명령어** — `/plan`, `/diff`, `/compact`, `/review` 등

---

## 프로젝트 설정 파일 비교 — CLAUDE.md vs GEMINI.md vs AGENTS.md

스킬과 함께 알아두면 좋은 게 **프로젝트 설정 파일**입니다. 세 도구 모두 "프로젝트 전체에 적용되는 규칙"을 마크다운 파일로 관리합니다.

| 구분 | Claude Code | Gemini CLI | Codex CLI |
|------|------------|------------|-----------|
| **파일명** | `CLAUDE.md` | `GEMINI.md` | `AGENTS.md` |
| **위치** | 프로젝트 루트 + 하위 디렉토리 | 프로젝트 루트 + 하위 디렉토리 | 프로젝트 루트 + 하위 디렉토리 |
| **글로벌 설정** | `~/.claude/CLAUDE.md` | `~/.gemini/GEMINI.md` | `~/.codex/AGENTS.md` |
| **동적 발견** | 작업 디렉토리 기준 | JIT 로드 (파일 접근 시) | CWD까지 누적 |
| **크기 제한** | 없음 | 없음 | 32KB |
| **자동 생성** | 없음 | `/init` 명령어 | `/init` 명령어 |

비유하자면, **CLAUDE.md/GEMINI.md/AGENTS.md는 사무실 공지사항**, **Skill은 업무 매뉴얼**입니다. 하나는 항상 읽히고, 하나는 필요할 때만 꺼냅니다.

---

## 어떤 도구를 선택해야 할까?

솔직히 말하면, Skill 기능만으로 도구를 선택하진 않습니다. 하지만 각 도구의 Skill 설계에서 **철학의 차이**가 보입니다.

### Claude Code가 적합한 경우
- **안전성 제어**가 중요할 때 — `disable-model-invocation`, `allowed-tools`로 세밀한 제어
- **서브에이전트 분리**가 필요할 때 — `context: fork`로 긴 작업을 깔끔하게 분리
- 이미 Claude Code를 주력으로 사용 중일 때

### Gemini CLI가 적합한 경우
- **간단한 명령어를 빠르게** 만들고 싶을 때 — TOML 3줄이면 충분
- **멀티모달 입력**이 필요할 때 — `@{이미지.png}` 같은 파일 주입
- **토큰 효율**을 중시할 때 — Progressive Disclosure 방식

### Codex CLI가 적합한 경우
- **조직 단위 관리**가 필요할 때 — 5단계 스코프로 세분화
- **UI 커스터마이징**이 필요할 때 — `openai.yaml`로 아이콘, 색상 설정
- 이미 OpenAI 생태계를 사용 중일 때

---

## 실전 팁 — 어떤 도구든 공통으로 적용되는 원칙

**1. description을 잘 쓰세요.**
세 도구 모두 description을 보고 자동 호출 여부를 판단합니다. 모호하면 엉뚱한 타이밍에 호출됩니다.

**2. 부작용이 있는 작업은 수동 호출만 허용하세요.**
배포, 커밋, 메시지 전송 등은 실수로 자동 호출되면 큰일입니다.
- Claude Code: `disable-model-invocation: true`
- Gemini CLI: Custom Command는 기본이 수동
- Codex CLI: `allow_implicit_invocation: false`

**3. 스킬 파일은 짧게 유지하세요.**
500줄 이내가 권장됩니다. 길어지면 별도 파일로 분리하고 참조하세요.

**4. 팀과 공유하려면 프로젝트 디렉토리에 저장하세요.**
```
# Claude Code
.claude/skills/my-skill/SKILL.md

# Gemini CLI
.gemini/skills/my-skill/SKILL.md
.gemini/commands/my-command.toml

# Codex CLI
.agents/skills/my-skill/SKILL.md
```

Git으로 커밋하면 팀원 모두 같은 명령어를 사용할 수 있습니다.

---

## 자주 묻는 질문 (FAQ)

### SKILL.md 표준이 통일되어 있나요?

[Agent Skills](https://agentskills.io)라는 오픈 스탠다드가 있고, Gemini CLI와 Codex CLI가 이를 따르고 있습니다. Claude Code도 비슷한 구조를 사용하지만 프론트매터 옵션에 차이가 있습니다. 완전한 호환은 아니지만, 핵심 구조(YAML 프론트매터 + 마크다운 본문)는 동일합니다.

### 하나의 Skill 파일을 여러 도구에서 쓸 수 있나요?

기본 구조가 비슷해서 **간단한 스킬은 거의 그대로 사용 가능**합니다. 하지만 `allowed-tools`(Claude Code 전용), `!{command}` vs `` !`command` `` 같은 도구별 고유 문법이 있어서 완전한 호환은 어렵습니다.

### Skill과 프롬프트 복사-붙여넣기의 차이는 뭔가요?

프롬프트 복사-붙여넣기는 텍스트만 전달하는 거지만, Skill은 **도구 사용 제한, 자동 호출 제어, 서브에이전트 분리, 쉘 명령어 동적 주입** 같은 제어가 가능합니다. 자동차와 자전거의 차이라고 보시면 됩니다.

---

## 마무리

AI 코딩 도구의 **Skill/커스텀 명령어 기능은 이제 선택이 아니라 기본**입니다.

세 도구 모두 "반복 작업을 파일로 저장하고 한 줄로 호출한다"는 핵심은 같지만:
- **Claude Code**는 안전성 제어와 서브에이전트에 강하고
- **Gemini CLI**는 간결함과 토큰 효율에 강하고
- **Codex CLI**는 조직 관리와 UI 커스터마이징에 강합니다

어떤 도구를 쓰든, 반복하는 작업이 있다면 오늘 바로 Skill 파일 하나 만들어보세요.

여러분은 어떤 AI 코딩 도구를 주로 사용하고 계신가요? 댓글로 알려주세요!

---

## 참고 자료

- [Claude Code 공식 문서 — Skills](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Gemini CLI GitHub 저장소](https://github.com/google-gemini/gemini-cli)
- [OpenAI Codex CLI](https://github.com/openai/codex)
- [Agent Skills 오픈 스탠다드](https://agentskills.io)
