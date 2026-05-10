const Prism = require("prismjs");
const loadLanguages = require("prismjs/components/");

loadLanguages([
  "java", "javascript", "typescript", "jsx", "tsx",
  "sql", "bash", "yaml", "json", "css", "html",
  "kotlin", "go", "python", "rust", "c", "cpp",
  "diff", "properties", "ini", "shell-session", "markdown",
]);

const LANG_DISPLAY = {
  "javascript": "JS", "typescript": "TS",
  "jsx": "JSX", "tsx": "TSX",
  "shell-session": "SHELL", "bash": "BASH",
  "yaml": "YAML", "json": "JSON",
  "html": "HTML", "css": "CSS",
  "java": "JAVA", "kotlin": "KOTLIN",
  "sql": "SQL", "go": "GO", "python": "PY",
  "rust": "RUST", "c": "C", "cpp": "C++",
  "diff": "DIFF", "properties": "PROPERTIES",
  "ini": "INI", "markdown": "MD",
};

function decodeHtml(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s) {
  return escapeHtml(s);
}

function parseHlAttr(s) {
  const result = new Set();
  if (!s) return result;
  s.split(",").forEach(part => {
    const range = part.trim();
    if (!range) return;
    if (range.includes("-")) {
      const [a, b] = range.split("-").map(Number);
      if (Number.isFinite(a) && Number.isFinite(b)) {
        for (let i = a; i <= b; i++) result.add(i);
      }
    } else {
      const n = Number(range);
      if (Number.isFinite(n)) result.add(n);
    }
  });
  return result;
}

const COPY_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

function buildCb(lang, source, filename, hlSet) {
  let highlighted;
  try {
    const grammar = Prism.languages[lang];
    if (grammar) {
      highlighted = Prism.highlight(source, grammar, lang);
    } else {
      highlighted = escapeHtml(source);
    }
  } catch (e) {
    highlighted = escapeHtml(source);
  }

  let lines = highlighted.split("\n");
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  if (lines.length === 0) lines = [""];

  const gutterHtml = lines.map((_, i) => i + 1).join("\n");
  const codeHtml = lines.map((line, i) => {
    const cls = hlSet.has(i + 1) ? "ln hl" : "ln";
    const content = line === "" ? "&#8203;" : line;
    return `<span class="${cls}">${content}</span>`;
  }).join("\n");

  const langLabel = LANG_DISPLAY[lang] || lang.toUpperCase();
  const langPill = `<span class="lang-pill">${escapeHtml(langLabel)}</span>`;
  const filenameHtml = filename
    ? ` <span class="cb-filename">${escapeHtml(filename)}</span>`
    : "";
  const headHtml = `<div class="cb-head"><div class="cb-file">${langPill}${filenameHtml}</div><button class="cb-copy" type="button" aria-label="복사">${COPY_ICON}<span class="cb-copy-text">복사</span></button></div>`;
  const bodyHtml = `<div class="cb-body"><div class="cb-gutter" aria-hidden="true">${gutterHtml}</div><pre class="cb-code"><code>${codeHtml}</code></pre></div>`;
  return `<div class="cb">${headHtml}${bodyHtml}</div>`;
}

const CODE_BLOCK_RE = /<pre>\s*<code\s+class="language-([\w+-]+)"([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/g;

function transformCodeBlocks(content) {
  return content.replace(CODE_BLOCK_RE, (match, lang, extras, sourceEncoded) => {
    const fileMatch = extras.match(/data-file="([^"]*)"/);
    const hlMatch = extras.match(/data-hl="([^"]*)"/);
    const filename = fileMatch ? fileMatch[1] : "";
    const hlSet = parseHlAttr(hlMatch ? hlMatch[1] : "");

    const source = decodeHtml(sourceEncoded);
    return buildCb(lang, source, filename, hlSet);
  });
}

module.exports = { transformCodeBlocks };
