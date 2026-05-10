#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'posts');

function listPostHtmls() {
  const out = execSync(`ls posts/*/*.html`, { cwd: root, encoding: 'utf8' });
  return out.trim().split('\n').filter(Boolean).map(p => path.join(root, p));
}

function escapeYamlString(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function extractMeta(html) {
  const meta = {};

  const titleMatch = html.match(/<header class="post-header">[\s\S]*?<h1>([\s\S]*?)<\/h1>/);
  if (titleMatch) {
    meta.title = titleMatch[1]
      .replace(/<br\s*\/?>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const subtitleMatch = html.match(/<p class="subtitle">\s*([\s\S]*?)\s*<\/p>/);
  if (subtitleMatch) {
    meta.subtitle = subtitleMatch[1]
      .replace(/\s+/g, ' ')
      .trim();
  }

  const dateMatch = html.match(/<div class="post-date">\s*([\s\S]*?)\s*<\/div>/);
  if (dateMatch) {
    const raw = dateMatch[1].replace(/\s+/g, ' ').trim();
    const dPart = raw.match(/^(\d{4}\.\d{2}\.\d{2})/);
    if (dPart) meta.date = dPart[1];
    const epPart = raw.match(/시리즈\s*(\d+)\s*\/\s*(\d+)/);
    if (epPart) {
      meta.episode = parseInt(epPart[1], 10);
      meta.episodes = parseInt(epPart[2], 10);
    }
  }

  return meta;
}

function extractBody(html) {
  const m = html.match(/<section class="post-body">([\s\S]*?)<\/section>/);
  if (!m) return null;
  return m[1].trim();
}

function buildFrontmatter(meta) {
  const lines = ['---'];
  if (meta.title) lines.push(`title: "${escapeYamlString(meta.title)}"`);
  if (meta.subtitle) lines.push(`subtitle: "${escapeYamlString(meta.subtitle)}"`);
  if (meta.date) lines.push(`dateText: "${meta.date}"`);
  if (meta.episode) lines.push(`episode: ${meta.episode}`);
  if (meta.episodes) lines.push(`episodes: ${meta.episodes}`);
  lines.push('---');
  return lines.join('\n');
}

function migrateFile(filepath) {
  const html = fs.readFileSync(filepath, 'utf8');

  if (html.startsWith('---')) {
    return { status: 'skip', reason: 'already migrated' };
  }

  const meta = extractMeta(html);
  const body = extractBody(html);

  if (!body) {
    return { status: 'fail', reason: 'no post-body section found' };
  }
  if (!meta.title) {
    return { status: 'fail', reason: 'no title found' };
  }

  const frontmatter = buildFrontmatter(meta);
  const newContent = frontmatter + '\n\n' + body + '\n';

  fs.writeFileSync(filepath, newContent);
  return { status: 'ok', meta };
}

function main() {
  const files = listPostHtmls();
  console.log(`Found ${files.length} post HTML files`);

  const results = { ok: 0, skip: 0, fail: 0, failures: [] };
  for (const f of files) {
    const rel = path.relative(root, f);
    const r = migrateFile(f);
    if (r.status === 'ok') {
      results.ok++;
    } else if (r.status === 'skip') {
      results.skip++;
    } else {
      results.fail++;
      results.failures.push({ file: rel, reason: r.reason });
    }
  }

  console.log(`\nMigrated: ${results.ok}, Skipped: ${results.skip}, Failed: ${results.fail}`);
  if (results.failures.length > 0) {
    console.log('\nFailures:');
    for (const f of results.failures) {
      console.log(`  ${f.file}: ${f.reason}`);
    }
  }
}

main();
