(function () {
  // Lazy-load Prism for syntax highlighting (autoloader fetches language defs on demand)
  function loadPrism() {
    if (window.Prism) return Promise.resolve();
    return new Promise(function (resolve) {
      var s1 = document.createElement('script');
      s1.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js';
      s1.onload = function () {
        var s2 = document.createElement('script');
        s2.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js';
        s2.onload = function () {
          if (window.Prism) {
            window.Prism.plugins.autoloader.languages_path =
              'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/';
          }
          resolve();
        };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var article = document.querySelector('.post-body');
    var container = document.querySelector('.container');
    if (!article || !container) return;

    // Trigger Prism on any <code class="language-*"> blocks
    if (article.querySelector('code[class*="language-"]')) {
      loadPrism().then(function () {
        if (window.Prism) window.Prism.highlightAllUnder(article);
      });
    }

    var headings = article.querySelectorAll('h2');
    if (headings.length < 2) return;

    headings.forEach(function (h, i) {
      if (!h.id) {
        h.id = 'h-' + i + '-' + (h.textContent || '').trim().replace(/\s+/g, '-').replace(/[^\w가-힣-]/g, '').slice(0, 40);
      }
    });

    // Wrap existing children (back-link + article) in a single column wrapper
    var wrap = document.createElement('div');
    wrap.className = 'article-main';
    while (container.firstChild) {
      wrap.appendChild(container.firstChild);
    }
    container.appendChild(wrap);

    // Build TOC sidebar
    var toc = document.createElement('aside');
    toc.className = 'toc';
    toc.innerHTML = '<div class="toc-title">목차</div>';
    var ul = document.createElement('ul');
    headings.forEach(function (h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.dataset.target = h.id;
      li.appendChild(a);
      ul.appendChild(li);
    });
    toc.appendChild(ul);
    container.appendChild(toc);

    container.classList.add('has-toc');

    var links = toc.querySelectorAll('a');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (link) {
            if (link.dataset.target === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    headings.forEach(function (h) { observer.observe(h); });
  });
})();
