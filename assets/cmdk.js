(function() {
  const cmdk = document.getElementById('cmdk');
  if (!cmdk) return;

  const input = document.getElementById('cmdkInput');
  const results = document.getElementById('cmdkResults');

  let data = null;
  let activeIdx = 0;

  function open() {
    cmdk.removeAttribute('hidden');
    cmdk.classList.add('open');
    if (!data) loadIndex();
    setTimeout(function() { input.focus(); }, 30);
    render();
  }

  function close() {
    cmdk.classList.remove('open');
    cmdk.setAttribute('hidden', '');
    input.value = '';
  }

  function loadIndex() {
    const path = window.cmdkIndexPath || './cmdk-index.json';
    fetch(path)
      .then(function(r) { return r.json(); })
      .then(function(d) { data = d; render(); })
      .catch(function() { results.innerHTML = '<div class="cmdk-empty">인덱스를 불러올 수 없어요.</div>'; });
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    const safe = escapeHtml(text);
    const regex = new RegExp('(' + escapeRegex(q) + ')', 'gi');
    return safe.replace(regex, '<mark>$1</mark>');
  }

  function matchScore(haystack, q) {
    if (!q) return 0;
    const h = haystack.toLowerCase();
    if (h === q) return 100;
    if (h.startsWith(q)) return 80;
    if (h.includes(q)) return 50;
    return 0;
  }

  function render() {
    if (!data) {
      results.innerHTML = '<div class="cmdk-empty">로딩 중...</div>';
      return;
    }
    const q = input.value.trim().toLowerCase();

    const scoreFn = function(item, fields) {
      let s = 0;
      for (const f of fields) {
        const v = item[f];
        if (!v) continue;
        const m = matchScore(String(v), q);
        if (m > s) s = m;
      }
      return s;
    };

    let posts = data.posts || [];
    let topics = data.topics || [];

    if (q) {
      posts = posts
        .map(function(p) { return { item: p, score: scoreFn(p, ['title', 'subtitle', 'series']) }; })
        .filter(function(x) { return x.score > 0; })
        .sort(function(a, b) { return b.score - a.score; })
        .map(function(x) { return x.item; });
      topics = topics
        .map(function(t) { return { item: t, score: scoreFn(t, ['title', 'desc', 'category', 'group']) }; })
        .filter(function(x) { return x.score > 0; })
        .sort(function(a, b) { return b.score - a.score; })
        .map(function(x) { return x.item; });
    }

    posts = posts.slice(0, 12);
    topics = topics.slice(0, 8);

    let html = '';
    let count = 0;

    if (posts.length > 0) {
      html += '<div class="cmdk-group-label">포스트</div>';
      posts.forEach(function(p) {
        const title = highlight(p.title, q);
        const meta = p.series ? escapeHtml(p.series) : escapeHtml(p.date);
        html += '<a class="cmdk-item" data-idx="' + count + '" href="' + escapeHtml(p.url) + '">'
          + '<div class="cmdk-item-title">' + title + '</div>'
          + (meta ? '<div class="cmdk-item-meta">' + meta + '</div>' : '')
          + '</a>';
        count++;
      });
    }

    if (topics.length > 0) {
      html += '<div class="cmdk-group-label">CS 토픽</div>';
      topics.forEach(function(t) {
        const title = highlight(t.title, q);
        const isDone = !!t.url;
        const meta = isDone
          ? escapeHtml(t.category + ' · ' + t.group)
          : escapeHtml(t.category + ' · ' + t.group + ' · 미공개');
        const cls = isDone ? 'cmdk-item' : 'cmdk-item cmdk-item-locked';
        const tag = isDone ? 'a' : 'div';
        const hrefAttr = isDone ? ' href="' + escapeHtml(t.url) + '"' : '';
        html += '<' + tag + ' class="' + cls + '" data-idx="' + count + '"' + hrefAttr + '>'
          + '<div class="cmdk-item-title">' + title + '</div>'
          + '<div class="cmdk-item-meta">' + meta + '</div>'
          + '</' + tag + '>';
        count++;
      });
    }

    if (count === 0) {
      html = '<div class="cmdk-empty">결과 없음</div>';
    }

    results.innerHTML = html;
    activeIdx = 0;
    updateActive();
  }

  function updateActive() {
    const items = results.querySelectorAll('.cmdk-item');
    items.forEach(function(it, i) { it.classList.toggle('active', i === activeIdx); });
    if (items[activeIdx]) {
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    }
  }

  document.addEventListener('keydown', function(e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modKey = isMac ? e.metaKey : e.ctrlKey;
    if (modKey && e.key && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdk.classList.contains('open') ? close() : open();
      return;
    }
    if (!cmdk.classList.contains('open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const items = results.querySelectorAll('.cmdk-item');
      if (items.length) {
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        updateActive();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const items = results.querySelectorAll('.cmdk-item');
      if (items.length) {
        activeIdx = Math.max(activeIdx - 1, 0);
        updateActive();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const items = results.querySelectorAll('.cmdk-item');
      const item = items[activeIdx];
      if (item && item.tagName.toLowerCase() === 'a') {
        location.href = item.getAttribute('href');
      }
    }
  });

  input.addEventListener('input', render);

  cmdk.querySelector('[data-cmdk-close]').addEventListener('click', close);

  const trigger = document.getElementById('cmdkTrigger');
  if (trigger) trigger.addEventListener('click', open);

  results.addEventListener('mousemove', function(e) {
    const item = e.target.closest('.cmdk-item');
    if (!item) return;
    const idx = parseInt(item.getAttribute('data-idx'), 10);
    if (!isNaN(idx) && idx !== activeIdx) {
      activeIdx = idx;
      updateActive();
    }
  });
})();
