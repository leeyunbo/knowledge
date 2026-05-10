const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const csPath = path.join(root, 'cs.html');

const ZONES = {
  'Java':            { x: 30,  y: 65,  w: 150, h: 150, cols: 3, rows: 3, label: 'Java',     group: 'A' },
  'Spring':          { x: 205, y: 65,  w: 175, h: 150, cols: 4, rows: 3, label: 'Spring',   group: 'B' },
  'DB':              { x: 405, y: 65,  w: 175, h: 150, cols: 4, rows: 4, label: 'DB',       group: 'C' },
  '네트워크':         { x: 605, y: 65,  w: 165, h: 150, cols: 4, rows: 3, label: '네트워크',  group: 'D' },
  '보안':            { x: 795, y: 65,  w: 135, h: 150, cols: 3, rows: 2, label: '보안',     group: 'G' },
  '동시성':          { x: 30,  y: 250, w: 410, h: 195, cols: 8, rows: 3, label: '동시성',   group: 'E' },
  '분산 시스템 설계':  { x: 465, y: 250, w: 465, h: 195, cols: 8, rows: 4, label: '분산 시스템 설계', group: 'F' },
};

function placePosition(zone, idx) {
  const cellW = zone.w / zone.cols;
  const cellH = zone.h / zone.rows;
  const col = idx % zone.cols;
  const row = Math.floor(idx / zone.cols);
  return {
    x: Math.round(zone.x + cellW * col + cellW / 2),
    y: Math.round(zone.y + cellH * row + cellH / 2 + 18),
  };
}

const NODE_RE = /<a\s+class="node\s+group-(\w+)"\s+([^>]*?)href="([^"]*)">[\s\S]*?<\/a>/g;
const ATTR_RE = (name) => new RegExp(`data-${name}="([^"]*)"`);

function parseNodes(html) {
  const nodes = [];
  let m;
  NODE_RE.lastIndex = 0;
  while ((m = NODE_RE.exec(html)) !== null) {
    const [full, group, attrs, href] = m;
    const stateM = attrs.match(ATTR_RE('state'));
    const catM = attrs.match(ATTR_RE('cat'));
    const titleM = attrs.match(ATTR_RE('title'));
    const descM = attrs.match(ATTR_RE('desc'));
    const idM = attrs.match(ATTR_RE('id'));
    const ringM = full.match(/--ring-delay:\s*([\d.]+)s/);
    nodes.push({
      group,
      state: stateM ? stateM[1] : 'locked',
      cat: catM ? catM[1] : '',
      title: titleM ? titleM[1] : '',
      desc: descM ? descM[1] : '',
      id: idM ? idM[1] : '',
      href,
      ringDelay: ringM ? parseFloat(ringM[1]) : null,
    });
  }
  return nodes;
}

function escAttr(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function shortLabelFor(title) {
  return ''; // 라벨은 build 시점에 추가하지 않음 (기존 dynamic 로직 유지)
}

function emitNode(node, pos) {
  const ringDelay = node.ringDelay !== null ? node.ringDelay : 0;
  const idAttr = node.id ? ` data-id="${escAttr(node.id)}"` : '';
  const ringStyle = node.state === 'done' ? ` style="--ring-delay: ${ringDelay}s;"` : '';
  const ring = node.state === 'done' ? '<circle class="node-ring" />' : '';
  return `        <a class="node group-${node.group}" data-state="${node.state}"${idAttr} data-cat="${escAttr(node.cat)}" data-title="${escAttr(node.title)}" data-desc="${escAttr(node.desc)}" href="${escAttr(node.href)}">\n          <g transform="translate(${pos.x},${pos.y})"${ringStyle}>${ring}<circle class="node-circle" r="6.5" /></g>\n        </a>`;
}

function emitZone(zoneKey, zone, nodes) {
  const placed = nodes.map((n, i) => emitNode(n, placePosition(zone, i)));
  const labelX = zone.x;
  const labelY = zone.y - 8;
  const metaY = zone.y + zone.h + 18;
  return [
    `        <!-- ${zone.label} (${nodes.length}) -->`,
    `        <rect class="category-bg bg-${zone.group}" x="${zone.x - 8}" y="${zone.y}" width="${zone.w + 16}" height="${zone.h}" rx="10" />`,
    `        <text class="category-label" data-group="${zone.group}" x="${labelX}" y="${labelY}">${zone.label}</text>`,
    `        <text class="category-label-meta" data-group="${zone.group}" x="${zone.x + zone.w}" y="${labelY}" text-anchor="end">${nodes.length}</text>`,
    placed.join('\n'),
  ].join('\n');
}

function regenSvg(allNodes) {
  const zoneOrder = ['Java', 'Spring', 'DB', '네트워크', '보안', '동시성', '분산 시스템 설계'];
  const groups = {};
  for (const n of allNodes) {
    if (!groups[n.cat]) groups[n.cat] = [];
    groups[n.cat].push(n);
  }
  const sections = [];
  for (const key of zoneOrder) {
    const zone = ZONES[key];
    const nodes = groups[key] || [];
    sections.push(emitZone(key, zone, nodes));
  }
  return sections.join('\n\n');
}

function main() {
  const html = fs.readFileSync(csPath, 'utf8');
  const nodes = parseNodes(html);
  console.log(`Parsed ${nodes.length} nodes`);
  const grouped = {};
  for (const n of nodes) {
    grouped[n.cat] = (grouped[n.cat] || 0) + 1;
  }
  for (const [k, v] of Object.entries(grouped)) {
    console.log(`  ${k}: ${v}`);
  }

  const newInner = regenSvg(nodes);

  const newSvgBlock = `<svg class="galaxy-svg" viewBox="0 0 960 470" xmlns="http://www.w3.org/2000/svg" aria-label="백엔드 CS 토픽 별자리">\n\n${newInner}\n\n      </svg>`;

  const replaced = html.replace(/<svg class="galaxy-svg"[\s\S]*?<\/svg>/, newSvgBlock);
  if (replaced === html) {
    console.error('SVG block not replaced — check regex');
    process.exit(1);
  }
  fs.writeFileSync(csPath, replaced);
  console.log(`\ncs.html updated`);
}

main();
