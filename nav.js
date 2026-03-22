(function () {
  // nav.js의 위치로부터 knowledge 루트 경로를 추출
  var cs = document.currentScript;
  if (!cs) return;

  var scriptUrl = new URL(cs.src, window.location.href);
  var basePath = scriptUrl.pathname.replace(/nav\.js$/, '');
  var currentPath = decodeURIComponent(window.location.pathname);

  if (!currentPath.startsWith(basePath)) return;

  var relative = currentPath.substring(basePath.length);
  var parts = relative.split('/').filter(Boolean);

  // 루트 페이지(index.html)면 nav 불필요
  if (parts.length <= 1) return;

  var isIndex = parts[parts.length - 1] === 'index.html';

  // ── breadcrumb ──
  var bc = document.querySelector('nav.breadcrumb');
  if (bc) {
    var html = '<a href="' + basePath + 'index.html">bok\'s wiki</a>';
    var pathSoFar = basePath;

    // index.html이면 마지막 디렉토리가 current, 아니면 파일명이 current
    var end = isIndex ? parts.length - 1 : parts.length;

    for (var i = 0; i < end; i++) {
      var seg = parts[i];
      if (seg === 'index.html') continue;

      var displayName = seg.replace(/\.html$/, '').replace(/-/g, ' ');

      html += '<span class="sep">›</span>';

      if (i === end - 1) {
        // 현재 페이지 — 링크 아닌 텍스트
        html += '<span class="current">' + displayName + '</span>';
      } else {
        // 상위 경로 — 링크
        pathSoFar += encodeURIComponent(seg) + '/';
        html += '<a href="' + pathSoFar + 'index.html">' + displayName + '</a>';
      }
    }

    bc.innerHTML = html;
  }

  // ── bottom-nav (메모 페이지에서만) ──
  var bn = document.querySelector('nav.bottom-nav');
  if (bn && !isIndex && parts.length >= 2) {
    var parentParts = parts.slice(0, -1);
    var parentPath = basePath + parentParts.map(encodeURIComponent).join('/') + '/index.html';
    var parentName = parentParts[parentParts.length - 1].replace(/-/g, ' ');

    bn.innerHTML =
      '<a href="' + parentPath + '" class="nav-link">← ' + parentName + ' 목록</a>' +
      '<a href="' + basePath + 'index.html" class="nav-link">📚 전체 목록 →</a>';
  }
})();
