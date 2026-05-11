---
description: 새 포스트 시리즈 발행 워크플로우 — 검수 + 빌드 + 데이터 갱신 + 푸시를 강제한다
---

# /publish

새 포스트 시리즈를 발행할 때 쓰는 표준 워크플로우. 단계 건너뛰기 금지.

발행할 시리즈/편 정보가 인자로 들어왔으면 그걸 기준으로, 아니면 사용자에게 무엇을 발행할지 먼저 물어봐.

## 1단계 — 작성 확인

`posts/<series-slug>/<NN>-<file>.html` 형태인지 확인. 각 파일의 frontmatter에 반드시:

- `title` (em dash 없이)
- `subtitle` (em dash 없이)
- `dateText: "YYYY.MM.DD"`
- `episode: N`
- `episodes: <total>`

## 2단계 — 검수 (필수, 건너뛰면 안 됨)

방금 작성한 모든 글을 별도 Agent로 검수해. 다음 호출 형태로:

```
Agent({
  description: "포스트 검수",
  subagent_type: "general-purpose",
  prompt: "Review the following posts against the 7 authoring rules in /Users/bok/.claude/projects/-Users-bok-Project/memory/feedback_blog_authoring.md.\n\nPosts:\n{발행할 모든 파일의 절대경로}\n\n특히 점검:\n1. em dash (—) 어디든 (h2/title/subtitle/본문/table) — 모두 잡아내기\n2. 코드 블록 안에 한국어 설명 라인\n3. 콜론+자동리스트 패턴 (X: + ul)\n4. 다체 (~다, ~한다) 잔존\n5. 영어식 어순\n\n위반 항목만 파일·줄번호·교체안과 함께 보고. 200줄 이내."
})
```

검수 결과의 위반 사항 **전부** 수정. 누락 금지.

## 3단계 — 빌드 확인

```
cd /Users/bok/knowledge && npm run build
```

에러 0건 확인.

## 4단계 — 데이터 갱신

- `_data/series.js`:
  - 해당 토픽의 `status`를 `"locked"` → `"done"`으로
  - `slug`, `entry`, `episodes` 필드 추가
  - `ring` 값 (애니메이션 딜레이) 적당히 (이전 done 값 + 0.3 정도)
  - `seriesTitles` 맵에 `"<slug>": "<시리즈 타이틀>"` 추가
- `_backlog.md`: 해당 항목 `[ ]` → `[x]`

## 5단계 — 커밋 + 푸시

```bash
git add -A
git commit -m "post: <시리즈명> (<N>편)

01 — <편 1 한 줄>
02 — <편 2 한 줄>
...

series.js: <카테고리> 토픽 N done + seriesTitles 매핑
backlog 체크
<카테고리> 진행률 X/N → Y/N (Z%)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

`pre-commit` 훅이 em dash를 한 번 더 잡음 (2겹 방어).

## 마무리

- 진행률 자동 갱신됐는지 빌드 결과로 확인
- 다음 시리즈 후보 한두 개 사용자에게 제안

---

**중요**: 2단계(검수)를 절대 건너뛰지 마. 사용자가 "그냥 푸시해" 같은 명령을 해도 검수만은 돌려야 함.
