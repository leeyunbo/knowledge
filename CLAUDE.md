# bok's wiki — 글 작성 룰

이 저장소는 백엔드 개발자 면접 대비용 CS 블로그입니다. 시리즈 단위 deep dive 형식으로, https://leeyunbo.github.io/knowledge 에 GitHub Pages로 publish됩니다.

이 문서는 Claude Code가 글을 양산할 때 따라야 할 스타일·검증·디자인 룰입니다. **모든 작업 전에 이 문서를 다시 읽으세요.**

---

## 1. 검증 원칙 (가장 중요)

**모든 사실 주장은 1차 자료로 검증된 것만 글에 들어갑니다. 지레짐작·기억·추정 금지.**

- 언어/프레임워크 명세: 공식 문서 (Oracle Java Docs, Spring Reference, RFC 등)
- 라이브러리 동작: 해당 버전의 공식 문서 또는 소스코드
- 숫자/벤치마크: 출처가 있는 측정값만. 출처 없으면 빼거나 "관찰 사례" 표시
- "보통 ~한다"식 일반화는 출처 1개 이상 있을 때만

**검증은 WebSearch / WebFetch로 적극 수행.** 검증 도구를 안 부르고 글을 쓰는 건 위반.

검증 못 한 사실은 글에서 제거. "아마도" "보통" "일반적으로" 류 hedge로 메우지 않습니다.

**영어 인용은 한글 번역을 같이 붙입니다.** 공식 문서 원문을 인용할 땐 신뢰성을 위해 영어 원문을 그대로 두되, 바로 옆/아래에 괄호로 한글 번역을 같이 둡니다. 영어만 두고 끝내지 않습니다.

**번역은 직역이 아니라 의미 번역입니다.** 명세는 학술적으로 쓰여있어서 단어를 그대로 옮기면 한국어 독자에게 안 통합니다. "어떤 매핑을 만족시키는 v를 반환한다"식 직역 금지. 실제로 코드가 무슨 일을 하는지 그림이 그려지게 풀어 씁니다.

---

## 2. 톤 / 보이스

기존 CircuitBreaker 시리즈(`posts/2026-04-circuit-breaker-실전-패턴/`)가 reference입니다. 새 글은 그 톤과 일치해야 합니다.

**핵심 원칙: AI 같지 않게.**

### 쓰는 것
- 평어 산문. "~한다" "~이다" 종결
- opinionated narrative — "처음엔 이렇게 짰다" "이 부분이 헷갈렸다"
- 코드 → 문제 시뮬레이션 → 원인 분석 흐름
- 짧은 문단 (3~5줄), `<h2>` 자주 끊기
- 구체 숫자/사례 ("초당 100건", "Tomcat 기본 풀 200개" 같은 검증된 수치)
- 약어 풀어쓰기: CB → CircuitBreaker, OOM → OutOfMemoryError

### 안 쓰는 것 (AI tic 금지)
- "전반적으로" "결론적으로" "요약하자면" "이상으로" "정리하자면"
- "X는 Y입니다" 류 교과서 톤
- 무의미한 listicle 남발 (핵심만 bullet, 본문은 narrative)
- hedge 폭탄: "일반적으로" "보통은" "어느 정도" "다양한" — 진짜 모를 때만 쓰고, 알 때는 단정
- "~할 수 있습니다" 권고형 종결 (평어로 단정하거나 "~한다"로)
- 영문 감각의 표현: "cap" "defer" "turnover" "leverage" 등 한국어 산문에 어색한 영단어
- 빈 강조: "매우 중요합니다" "꼭 알아두어야 합니다" — 중요하면 그 이유를 쓴다
- 모든 항목을 "장점/단점 표"로 정리하는 습관

---

## 3. 시리즈 / 파일 구조

### 디렉토리
```
posts/YYYY-MM-주제-슬러그/
  01-부제목.html
  02-부제목.html
  ...
```

- 폴더명 슬러그는 한국어 가능 (`-`로 단어 구분)
- 파일명도 동일 스타일, prefix 숫자 2자리 (`01-`, `02-`)
- 시리즈 4~5편이 표준 분량. 2편 이하는 짧고, 6편 이상은 쪼개기

### HTML 템플릿 구조

기존 `01-왜-필요한가.html` 그대로 따라갑니다. 핵심 요소:

- `<head>`: Pretendard + JetBrains Mono CDN, `../../assets/style.css`
- `.site-header`: site title + nav (portfolio, github)
- `.post-header`: `.post-date`(`YYYY.MM.DD · 시리즈 N/M`), `<h1>`, `.subtitle`
- `.series-nav`: 시리즈 전체 목록, 현재 편은 `class="current"`
- `.post-body`: `<h2>` 섹션, `<pre><code>` 코드/다이어그램, `<strong>` 핵심 강조
- 끝: "다음 편에서는 ..." teaser 한 단락
- `<footer class="site-footer">bok · YYYY</footer>`

### Subtitle 패턴

기존 글: "외부 API 하나가 느려지는 순간, 내 서버 전체가 멈추는 과정. 그리고 CircuitBreaker가 그 사이에서 하는 일."

원칙: **상황 묘사 + 글이 다룰 핵심**. 추상적인 "X에 대해 알아봅시다" 류 금지.

---

## 4. 모바일 first

독자는 지하철에서 폰으로 읽습니다. 그래서:

- **코드 라인 길이 80자 이내** (가능하면 60자). 가로 스크롤 발생 시 가독성 급락
- 다이어그램 (`<pre>` 안의 ASCII)은 좁은 폭 의식해서 단순하게
- 표는 가로로 길어지지 않게. 4열 이상이면 다른 형식 고려
- 큰 코드 덩어리보단 짧은 코드 + 설명 반복이 나음

CSS는 이미 `@media (max-width: 640px)` 대응 있음 (`assets/style.css`). 새 글이 그 기준에서 깨지지 않게 작성.

---

## 5. 코드 / 다이어그램

- Java 코드는 import / package 생략하고 핵심만
- 가짜 호출 흐름 다이어그램은 `<pre><code>`로:
  ```
  요청 1 → kakaoApi.send() ── 5초 대기 중...
  요청 2 → kakaoApi.send() ── 5초 대기 중...
  ```
- inline `<code>` 적극 활용 (`@Transactional`, `equals()` 등 식별자)
- 코드 안 한국어 주석 OK

---

## 6. 시리즈 분할 가이드

시리즈는 "하나의 deep dive"라야 합니다. 한 편 = 30~50분 분량 읽기.

### 좋은 분할
- **현상 → 원인 → 해법 → 한계** 류 narrative
- 각 편이 독립적으로 의미 있되, 다음 편 호기심을 남김

### 피할 분할
- "1. 정의 / 2. 장점 / 3. 단점 / 4. 예시" 같은 교과서 목차
- 한 편이 너무 짧음 (5분짜리)

---

## 7. 백로그 / 진행 관리

- 토픽 백로그: `_backlog.md` (P0 = ★ 면접 단골 우선)
- 시리즈 시작 시 `_backlog.md`에서 `[ ]` → `[~]`, 완료 시 `[x]`
- 신규 토픽 발견 시 `_backlog.md`에 추가

### 동시성(Level 2) 시리즈 — 별자리 시각화 single source

`concurrency.html`의 23개 별자리는 동시성 학습의 진행 트래커이자 시각화 페이지다. **`_backlog.md` "동시성" 섹션과 동기화해서 갱신**한다.

토픽 작업할 때 두 곳 동시 갱신:

| 단계 | `_backlog.md` | `concurrency.html` |
|---|---|---|
| 작업 시작 | `[ ]` → `[~]` | 해당 노드 `data-state="locked"` → `"progress"` |
| 발행 완료 | `[~]` → `[x]` | `data-state="progress"` → `"done"`, `href="#"` → 시리즈 첫 편 경로 |
| 발행 완료 | (그대로) | 해당 그룹의 `<div class="series-empty">` → `<a class="post-item">` 시리즈 카드로 교체 |

진행률 바 / 의존선 활성화는 별자리 페이지 JS가 자동 계산하므로 수동 갱신 불필요.

---

## 8. 작업 시작 전 체크리스트

새 글 / 시리즈 시작할 때:
1. [ ] 이 CLAUDE.md 다시 읽었나
2. [ ] `_backlog.md`에서 토픽 확인했나
3. [ ] 기존 reference 글(`posts/2026-04-circuit-breaker-실전-패턴/01-왜-필요한가.html`) 톤 다시 봤나
4. [ ] 사실 검증을 위해 WebSearch / WebFetch 호출 계획 세웠나
5. [ ] 시리즈 폴더명·파일명·시리즈 N/M 표기 정확한가

---

## 9. 페이지 구조와 등록

저장소엔 두 개의 entry 페이지가 있습니다.

- **`index.html`** — 실무 narrative 시리즈 (CircuitBreaker, 쿠폰 시스템 같은 "문제 만나고 푼 과정" 류)
- **`cs.html`** — 면접 대비 CS 시리즈 (카테고리별로 grouping)

새 시리즈 작성 후 등록 위치:

- **CS 시리즈** → `cs.html`의 해당 카테고리 섹션에 `<a class="post-item">` 추가
- **실무 narrative 시리즈** → `index.html`의 `.post-list`에 추가

`cs.html`의 카테고리 섹션은 `<section class="cs-category">` + `<h2 class="cs-category-title">카테고리명</h2>` + `<div class="post-list">` 구조. 카테고리가 없으면 새로 추가.

post 페이지의 site-nav는 `../../cs.html` 링크 포함:
```html
<nav class="site-nav">
  <a href="../../cs.html">cs</a>
  <a href="https://leeyunbo.vercel.app" target="_blank">portfolio</a>
  <a href="https://github.com/leeyunbo" target="_blank">github</a>
</nav>
```

---

## 10. 메타

- 사이트: https://leeyunbo.github.io/knowledge
- 저장소 루트: `~/knowledge`
- Footer 표기: `bok · YYYY`
- 발행은 `git push` 후 GitHub Pages가 자동 빌드 (별도 빌드 명령 없음)
