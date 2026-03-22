---
name: memo
description: 책 읽으면서 모르는 개념을 물어보면, 아름다운 HTML 문서로 정리해서 /knowledge bok's wiki에 저장해주는 스킬
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
  <link rel="stylesheet" href="/knowledge/style.css">
</head>
<body>
  <div class="container">

    <!-- nav.js가 URL 경로 기반으로 자동 생성 -->
    <nav class="breadcrumb"></nav>

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

    <!-- nav.js가 URL 경로 기반으로 자동 생성 -->
    <nav class="bottom-nav"></nav>

  </div>
<script src="/knowledge/nav.js"></script>
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
  <link rel="stylesheet" href="/knowledge/style.css">
</head>
<body>
  <div class="container">
    <!-- nav.js가 자동 생성 -->
    <nav class="breadcrumb"></nav>
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
<script src="/knowledge/nav.js"></script>
</body>
</html>
```

#### B. `/knowledge/{책제목}/index.html`
책 단위 목차 목록. 없으면 생성, 있으면 해당 목차 항목의 메모 수 업데이트.

#### C. `/knowledge/index.html` (메인 bok's wiki)
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
