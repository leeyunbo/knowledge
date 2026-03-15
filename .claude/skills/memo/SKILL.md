---
name: memo
description: 책 읽으면서 모르는 개념을 물어보면, 아름다운 HTML 문서로 정리해서 /knowledge 지식 요람에 저장해주는 스킬
---

너는 독서 노트 작가야. 사용자가 책을 읽다가 모르는 개념을 물어보면, 깊이 있게 설명하고 아름다운 HTML 문서로 정리해줘.

## 실행 흐름

### 1. 컨텍스트 파악

현재 작업 디렉토리(CWD)에서 책 정보를 추출해:

```
/knowledge/{책제목}/{목차}/  ← 사용자가 여기서 /memo 실행
```

- `pwd` 명령으로 CWD 확인
- CWD의 마지막 폴더 = **목차(chapter)**
- 그 위 폴더 = **책제목(book)**
- 만약 `/knowledge` 하위 구조가 아니면: "책 폴더 안에서 실행해주세요. 예: `/knowledge/책제목/목차/`" 안내

질문은 `${ARGUMENTS}`야.

### 2. 답변 구성

질문을 분석해서 다음을 준비해:

1. **핵심 답변** — 질문에 직접 답변 (명확하고 쉽게)
2. **배경 개념** — 이걸 이해하려면 알아야 하는 선수 개념들
3. **깊이 파고들기** — 더 넓은 맥락, 왜 중요한지, 어떻게 쓰이는지
4. **시각화** — 개념을 SVG 다이어그램이나 ASCII로 표현 (구조, 흐름, 비교 등)
5. **연관 개념** — 함께 알면 좋은 개념 키워드들

### 3. HTML 파일 생성

파일명: 질문 내용을 한국어 그대로 슬러그화 (공백→하이픈, 특수문자 제거)
경로: `/knowledge/{책제목}/{목차}/{질문슬러그}.html`

아래 HTML 템플릿을 기반으로 내용을 채워서 파일을 생성해:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{질문} — {목차} · {책제목}</title>
  <style>
    /* 전체 리셋 & 변수 */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0f1117;
      --bg2: #1a1d27;
      --bg3: #22263a;
      --border: #2e3250;
      --accent: #7c6af7;
      --accent2: #a78bfa;
      --accent3: #38bdf8;
      --text: #e2e8f0;
      --text2: #94a3b8;
      --text3: #64748b;
      --green: #34d399;
      --yellow: #fbbf24;
      --red: #f87171;
      --radius: 12px;
      --font: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --mono: 'JetBrains Mono', 'Fira Code', monospace;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      font-size: 16px;
      line-height: 1.75;
      min-height: 100vh;
    }

    /* 레이아웃 */
    .container { max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem 6rem; }

    /* 브레드크럼 */
    .breadcrumb {
      display: flex; align-items: center; gap: 0.5rem;
      font-size: 0.8rem; color: var(--text3); margin-bottom: 2.5rem;
    }
    .breadcrumb a {
      color: var(--text3); text-decoration: none;
      transition: color 0.2s;
    }
    .breadcrumb a:hover { color: var(--accent2); }
    .breadcrumb .sep { color: var(--border); }
    .breadcrumb .current { color: var(--text2); }

    /* 헤더 */
    .page-header { margin-bottom: 3rem; }
    .tag {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: rgba(124,106,247,0.15); border: 1px solid rgba(124,106,247,0.3);
      color: var(--accent2); border-radius: 20px;
      padding: 0.25rem 0.75rem; font-size: 0.75rem; font-weight: 500;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: clamp(1.5rem, 4vw, 2.2rem);
      font-weight: 700; line-height: 1.3;
      background: linear-gradient(135deg, var(--text) 0%, var(--accent2) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.75rem;
    }
    .meta { font-size: 0.85rem; color: var(--text3); }

    /* 섹션 카드 */
    .card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.75rem;
      margin-bottom: 1.5rem;
    }
    .card-header {
      display: flex; align-items: center; gap: 0.6rem;
      font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--text3);
      margin-bottom: 1.25rem;
    }
    .card-header .icon {
      width: 24px; height: 24px; border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    .icon-answer { background: rgba(124,106,247,0.2); }
    .icon-background { background: rgba(56,189,248,0.2); }
    .icon-deep { background: rgba(52,211,153,0.2); }
    .icon-visual { background: rgba(251,191,36,0.2); }
    .icon-related { background: rgba(248,113,113,0.2); }

    /* 카드 내용 */
    .card p { color: var(--text); margin-bottom: 1rem; }
    .card p:last-child { margin-bottom: 0; }

    /* 강조 박스 */
    .highlight-box {
      background: rgba(124,106,247,0.08);
      border-left: 3px solid var(--accent);
      border-radius: 0 8px 8px 0;
      padding: 1rem 1.25rem;
      margin: 1rem 0;
      font-size: 1.05rem;
    }

    /* 리스트 */
    .card ul, .card ol { padding-left: 1.5rem; color: var(--text); }
    .card li { margin-bottom: 0.5rem; }
    .card li::marker { color: var(--accent2); }

    /* 코드 */
    code {
      font-family: var(--mono);
      background: var(--bg3);
      border: 1px solid var(--border);
      padding: 0.15em 0.4em;
      border-radius: 4px;
      font-size: 0.88em;
      color: var(--accent3);
    }
    pre {
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
    pre code {
      background: none; border: none; padding: 0;
      font-size: 0.9rem; color: var(--text);
    }

    /* SVG 다이어그램 영역 */
    .diagram-wrap {
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      margin: 1rem 0;
      overflow-x: auto;
    }
    .diagram-wrap svg { max-width: 100%; height: auto; }

    /* 비교 테이블 */
    .compare-table { width: 100%; border-collapse: collapse; }
    .compare-table th, .compare-table td {
      text-align: left; padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border);
      font-size: 0.9rem;
    }
    .compare-table th {
      color: var(--text3); font-weight: 600;
      font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;
    }
    .compare-table tr:last-child td { border-bottom: none; }
    .compare-table tr:hover td { background: rgba(255,255,255,0.02); }

    /* 연관 개념 태그 */
    .related-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .related-tag {
      background: var(--bg3);
      border: 1px solid var(--border);
      color: var(--text2);
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      transition: all 0.2s;
      cursor: default;
    }
    .related-tag:hover {
      border-color: var(--accent);
      color: var(--accent2);
      background: rgba(124,106,247,0.1);
    }

    /* 하단 네비게이션 */
    .bottom-nav {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center;
    }
    .nav-link {
      display: flex; align-items: center; gap: 0.5rem;
      color: var(--text3); text-decoration: none; font-size: 0.85rem;
      transition: color 0.2s;
    }
    .nav-link:hover { color: var(--accent2); }

    /* 반응형 */
    @media (max-width: 640px) {
      .container { padding: 1.5rem 1rem 4rem; }
      .card { padding: 1.25rem; }
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- 브레드크럼 -->
    <nav class="breadcrumb">
      <a href="/knowledge/index.html">📚 지식 요람</a>
      <span class="sep">›</span>
      <a href="/knowledge/{책제목}/index.html">{책제목}</a>
      <span class="sep">›</span>
      <a href="/knowledge/{책제목}/{목차}/index.html">{목차}</a>
      <span class="sep">›</span>
      <span class="current">{질문 요약}</span>
    </nav>

    <!-- 헤더 -->
    <header class="page-header">
      <div class="tag">💡 개념 정리</div>
      <h1>{질문}</h1>
      <p class="meta">{책제목} · {목차} · {날짜}</p>
    </header>

    <!-- 핵심 답변 -->
    <div class="card">
      <div class="card-header">
        <div class="icon icon-answer">✦</div>
        핵심 답변
      </div>
      <div class="highlight-box">
        {한 줄 핵심 요약}
      </div>
      {상세 설명 - p 태그들}
    </div>

    <!-- 배경 개념 -->
    <div class="card">
      <div class="card-header">
        <div class="icon icon-background">◈</div>
        알아야 할 배경 개념
      </div>
      {선수 개념 설명}
    </div>

    <!-- 깊이 파고들기 -->
    <div class="card">
      <div class="card-header">
        <div class="icon icon-deep">◉</div>
        더 깊이 파고들기
      </div>
      {더 넓은 맥락, 실제 사용 예시, 왜 중요한지}
    </div>

    <!-- 시각화 -->
    <div class="card">
      <div class="card-header">
        <div class="icon icon-visual">◆</div>
        시각화
      </div>
      <div class="diagram-wrap">
        {SVG 다이어그램 또는 구조 표현}
      </div>
      {다이어그램 설명}
    </div>

    <!-- 연관 개념 -->
    <div class="card">
      <div class="card-header">
        <div class="icon icon-related">◇</div>
        함께 알면 좋은 개념
      </div>
      <div class="related-tags">
        {연관 개념들을 .related-tag 으로}
      </div>
    </div>

    <!-- 하단 네비게이션 -->
    <nav class="bottom-nav">
      <a href="/knowledge/{책제목}/{목차}/index.html" class="nav-link">← {목차} 목록</a>
      <a href="/knowledge/index.html" class="nav-link">📚 전체 목록 →</a>
    </nav>

  </div>
</body>
</html>
```

### 4. 인덱스 파일 업데이트

파일 생성 후, 다음 인덱스들을 업데이트해:

#### A. `/knowledge/{책제목}/{목차}/index.html`
해당 목차의 메모 목록 페이지. 없으면 생성, 있으면 새 항목 추가.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>{목차} — {책제목}</title>
  <style>
    /* memo.html과 동일한 CSS 변수 및 기본 스타일 */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0f1117; --bg2: #1a1d27; --bg3: #22263a;
      --border: #2e3250; --accent: #7c6af7; --accent2: #a78bfa;
      --accent3: #38bdf8; --text: #e2e8f0; --text2: #94a3b8;
      --text3: #64748b; --green: #34d399;
      --radius: 12px;
      --font: 'Pretendard', -apple-system, sans-serif;
    }
    body { background: var(--bg); color: var(--text); font-family: var(--font); line-height: 1.75; }
    .container { max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem 6rem; }
    .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text3); margin-bottom: 2.5rem; }
    .breadcrumb a { color: var(--text3); text-decoration: none; }
    .breadcrumb a:hover { color: var(--accent2); }
    .breadcrumb .sep { color: var(--border); }
    h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, var(--text) 0%, var(--accent2) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .subtitle { color: var(--text3); font-size: 0.9rem; margin-bottom: 2.5rem; }
    .memo-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .memo-item {
      display: flex; align-items: center; gap: 1rem;
      background: var(--bg2); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 1.1rem 1.5rem;
      text-decoration: none; color: var(--text);
      transition: all 0.2s;
    }
    .memo-item:hover { border-color: var(--accent); transform: translateX(4px); }
    .memo-item .icon { font-size: 1.2rem; flex-shrink: 0; }
    .memo-item .content { flex: 1; }
    .memo-item .title { font-weight: 500; margin-bottom: 0.2rem; }
    .memo-item .date { font-size: 0.75rem; color: var(--text3); }
    .memo-item .arrow { color: var(--text3); transition: color 0.2s; }
    .memo-item:hover .arrow { color: var(--accent2); }
    .count { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(124,106,247,0.15); border: 1px solid rgba(124,106,247,0.3); color: var(--accent2); border-radius: 20px; padding: 0.2rem 0.6rem; font-size: 0.75rem; }
  </style>
</head>
<body>
  <div class="container">
    <nav class="breadcrumb">
      <a href="/knowledge/index.html">📚 지식 요람</a>
      <span class="sep">›</span>
      <a href="/knowledge/{책제목}/index.html">{책제목}</a>
      <span class="sep">›</span>
      <span>{목차}</span>
    </nav>
    <h1>{목차}</h1>
    <p class="subtitle">{책제목} &nbsp;·&nbsp; <span class="count">💡 {n}개 메모</span></p>
    <div class="memo-list">
      <!-- MEMO_ITEMS -->
      <a href="{파일명}.html" class="memo-item">
        <span class="icon">💡</span>
        <div class="content">
          <div class="title">{질문}</div>
          <div class="date">{날짜}</div>
        </div>
        <span class="arrow">›</span>
      </a>
    </div>
  </div>
</body>
</html>
```

#### B. `/knowledge/{책제목}/index.html`
책 단위 목차 목록. 없으면 생성, 있으면 해당 목차 항목의 메모 수 업데이트.

#### C. `/knowledge/index.html` (메인 지식 요람)
전체 인덱스. 없으면 생성, 있으면 해당 책/목차 항목 업데이트.

메인 index.html에는 **검색 기능**을 포함해:
- 모든 메모 제목을 JavaScript 배열로 임베드
- 실시간 필터링 (`input` 이벤트)
- 책/목차별 그룹 접기/펼치기

### 5. 완료 안내

```
✅ 메모 저장 완료!

📄 /knowledge/{책제목}/{목차}/{파일명}.html
📚 /knowledge/{책제목}/{목차}/index.html 업데이트
🏠 /knowledge/index.html 업데이트
```

## 주의사항

- 파일 경로에 한글이 포함되어도 그대로 사용 (URL 인코딩 불필요, 로컬 파일)
- 파일명의 공백은 하이픈(-)으로 치환, 특수문자는 제거
- CWD가 `/knowledge/{책제목}/{목차}` 구조가 아닐 경우 안내 메시지 출력
- 인덱스 파일 업데이트 시 기존 항목은 건드리지 않고 새 항목만 추가
- SVG 다이어그램은 개념의 구조나 흐름을 표현할 때만 포함, 억지로 넣지 않기
