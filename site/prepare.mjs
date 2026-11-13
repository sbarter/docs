// Turns the Redocly portal sources in the repository root into VitePress sources in site/.src.
//
// The Redocly files (redocly.yaml, sidebars.yaml, @theme/, the markdown pages, server.yaml and
// client.yaml) stay the single source and are not changed: Redocly can still build them, and this
// script translates the few Redocly-only constructs for the GitHub Pages build:
//   - {% cards %} / {% card %} / {% admonition %} Markdoc tags -> HTML / VitePress containers
//   - links into the API reference (/server/..., /client/...) -> Redoc anchors on /api/server, /api/client
//   - sidebars.yaml -> VitePress sidebar (written to .src/sidebar.json)
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.resolve(import.meta.dirname, '.src');
const BASE = '/docs/';

const CONTENT_DIRS = ['getting-started', 'guides', 'app-manual', 'api', 'operations', 'testing', 'images', 'assets'];
const ROOT_PAGES = ['index.md'];
// Published as plain files next to the site, so links that worked on the old GitHub page keep working.
const PUBLIC_FILES = [
  'server.yaml',
  'client.yaml',
  'level-3-overview.html',
  'level-3-deeplink-flow.html',
  'level-3-in-app-linking-flow.html',
  'logo-sbarter-color.svg',
  'sbarter-logo.png',
];
const SPECS = { server: 'server.yaml', client: 'client.yaml' };

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'public'), { recursive: true });

// ---------- API reference anchors ----------

const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Redoc's tag ids: whitespace and dashes collapse into one dash ("VGP - DeepLink" -> "VGP-DeepLink").
const redocTag = (tag) => tag.trim().replace(/[\s-]+/g, '-');

function anchorsFor(spec) {
  const doc = yaml.load(fs.readFileSync(path.join(ROOT, SPECS[spec]), 'utf8'));
  const tags = new Map();
  const ops = new Map();
  const byPath = new Map();
  for (const [p, item] of Object.entries(doc.paths ?? {})) {
    for (const [method, op] of Object.entries(item)) {
      if (!op || typeof op !== 'object' || !op.responses) continue;
      const tag = (op.tags ?? [])[0];
      const prefix = tag ? `tag/${redocTag(tag)}/` : '';
      // Redoc ids an operation by operationId, or by its JSON-pointer path when it has none.
      const anchor = op.operationId
        ? `${prefix}operation/${op.operationId}`
        : `${prefix}paths/${p.replace(/~/g, '~0').replace(/\//g, '~1')}/${method}`;
      if (tag) tags.set(slug(tag), `tag/${redocTag(tag)}`);
      if (op.operationId) ops.set(op.operationId.toLowerCase(), anchor);
      byPath.set(`${p}|${method}`, anchor);
    }
  }
  return { tags, ops, byPath };
}
const anchors = Object.fromEntries(Object.keys(SPECS).map((s) => [s, anchorsFor(s)]));

// Redocly API links: /server, /server/<tag>, /server/<tag>/<operationid>, /client/<tag>/paths/<~1v1~1x>/<method>
function apiLink(target) {
  const m = target.match(/^\/(server|client)(?:\.yaml)?(?:\/(.*))?$/);
  if (!m) return null;
  const [, spec, rest] = m;
  const page = `/api/${spec}`;
  if (!rest) return page;
  const parts = rest.split('/');
  const a = anchors[spec];
  if (parts[1] === 'paths' && parts.length >= 4) {
    const p = decodeURIComponent(parts[2]).replace(/~1/g, '/').replace(/~0/g, '~');
    const hit = a.byPath.get(`${p}|${parts[3]}`);
    return hit ? `${page}#${hit}` : page;
  }
  if (parts.length >= 2 && a.ops.has(parts[1])) return `${page}#${a.ops.get(parts[1])}`;
  if (a.tags.has(parts[0])) return `${page}#${a.tags.get(parts[0])}`;
  return page;
}

// ---------- markdown transforms ----------

// A card's `to` is relative to the page; cards are raw HTML, so it is resolved to a site URL here.
function cardHref(to, fromFile) {
  if (/^[a-z]+:/i.test(to)) return to;
  const api = apiLink(to.replace(/^\.\//, '/'));
  if (api) return BASE + api.slice(1);
  const abs = path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), to));
  return BASE + abs.replace(/^\//, '').replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html');
}

const ADMONITION = { info: 'info', note: 'info', tip: 'tip', success: 'tip', warning: 'warning', danger: 'danger', error: 'danger' };
const attr = (s, name) => (s.match(new RegExp(`${name}="([^"]*)"`)) ?? [])[1];

function transform(md, file) {
  let out = md.replace(/\r\n/g, '\n');

  // Indented raw HTML blocks (the home page hero) read as code blocks in markdown-it: flatten them.
  out = out.replace(/^<div class="sbarter-hero">\n[\s\S]*?\n<\/div>$/gm, (block) =>
    block.split('\n').map((l) => l.trim()).filter(Boolean).join('\n'),
  );

  out = out.replace(/^[ \t]*\{%\s*cards\b[^%]*%\}[ \t]*$/gm, '<div class="sb-cards">\n');
  out = out.replace(/^[ \t]*\{%\s*\/cards\s*%\}[ \t]*$/gm, '\n</div>');
  out = out.replace(/^[ \t]*\{%\s*card\b([^%]*)%\}[ \t]*$/gm, (_, a) => {
    const title = attr(a, 'title') ?? '';
    const to = attr(a, 'to');
    const open = to ? `<a class="sb-card" href="${cardHref(to, '/' + file)}">` : '<div class="sb-card">';
    return `${open}\n<p class="sb-card__title">${title}</p>\n`;
  });
  // Card bodies are indented in the Redocly sources; unindent them so they are not code blocks.
  out = out.replace(/(<(?:a|div) class="sb-card"[^>]*>\n[\s\S]*?)\{%\s*\/card\s*%\}/g, (_, body) => {
    const isLink = body.startsWith('<a');
    return body.replace(/^[ \t]+/gm, '') + `\n${isLink ? '</a>' : '</div>'}`;
  });

  out = out.replace(/^[ \t]*\{%\s*admonition\b([^%]*)%\}[ \t]*$/gm, (_, a) => {
    const kind = ADMONITION[attr(a, 'type') ?? 'info'] ?? 'info';
    const name = attr(a, 'name');
    return `::: ${kind}${name ? ' ' + name : ''}`;
  });
  out = out.replace(/^[ \t]*\{%\s*\/admonition\s*%\}[ \t]*$/gm, ':::');

  // Site-absolute links in raw HTML (the home page hero) are not rewritten by VitePress.
  out = out.replace(/href="(\/[^"]*)"/g, (whole, target) => {
    if (target.startsWith(BASE)) return whole;
    const api = apiLink(target);
    if (api) return `href="${BASE}${api.slice(1)}"`;
    return `href="${BASE}${target.slice(1).replace(/\.md(#|$)/, '.html$1')}"`;
  });

  // Markdown links: Redocly accepts folder-style page links (./one-v-one/) and API links relative to
  // the page (../server/...); VitePress needs the page file or the API page anchor.
  out = out.replace(/\]\(([^)\s#]+)(#[^)\s]*)?\)/g, (whole, target, hash = '') => {
    if (/^[a-z]+:/i.test(target)) return whole;
    const abs = target.startsWith('/') ? target : path.posix.join('/', path.posix.dirname(file), target);
    const api = apiLink(abs.replace(/\/$/, ''));
    if (api) return `](${api}${hash})`;
    if (abs.endsWith('/')) {
      const page = abs.slice(0, -1);
      if (fs.existsSync(path.join(ROOT, page + '.md'))) return `](${page}.md${hash})`;
    }
    return whole;
  });
  return out;
}

// ---------- copy ----------

function copyTree(rel) {
  const src = path.join(ROOT, rel);
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(src)) copyTree(path.join(rel, entry));
    return;
  }
  const dst = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  if (rel.endsWith('.md')) {
    fs.writeFileSync(dst, transform(fs.readFileSync(src, 'utf8'), rel.split(path.sep).join('/')));
  } else {
    fs.copyFileSync(src, dst);
    // Files a page links to directly (PDFs) are not bundled by Vite: also serve them as-is.
    if (/\.pdf$/i.test(rel)) {
      const pub = path.join(OUT, 'public', rel);
      fs.mkdirSync(path.dirname(pub), { recursive: true });
      fs.copyFileSync(src, pub);
    }
  }
}

for (const d of CONTENT_DIRS) copyTree(d);
for (const f of ROOT_PAGES) copyTree(f);
for (const f of PUBLIC_FILES) {
  if (fs.existsSync(path.join(ROOT, f))) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, 'public', f));
}
fs.cpSync(path.join(ROOT, 'assets'), path.join(OUT, 'public', 'assets'), { recursive: true });

// The home page is a landing page: no outline column, like in Redocly (markdown.toc.hide).
const home = path.join(OUT, 'index.md');
fs.writeFileSync(home, fs.readFileSync(home, 'utf8').replace(/^---\n/, '---\naside: false\noutline: false\n'));

// API reference pages rendered by Redoc.
for (const [spec, file] of Object.entries(SPECS)) {
  const title = spec === 'server' ? 'Sbarter API' : 'Game Studio API';
  fs.writeFileSync(
    path.join(OUT, 'api', `${spec}.md`),
    `---\nlayout: page\ntitle: ${title}\nsidebar: false\naside: false\n---\n\n<RedocView spec="${file}" />\n`,
  );
}

// ---------- sidebar ----------

function pageLink(page) {
  if (SPECS[page.replace(/\.yaml$/, '')] && page.endsWith('.yaml')) return `/api/${page.replace(/\.yaml$/, '')}`;
  return '/' + page.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
}
function sidebarItem(node) {
  if (node.group) {
    return { text: node.group, collapsed: !node.expanded, items: (node.items ?? []).map(sidebarItem) };
  }
  const page = node.page;
  const label = node.label ?? page;
  return { text: label, link: pageLink(page) };
}
const sidebars = yaml.load(fs.readFileSync(path.join(ROOT, 'sidebars.yaml'), 'utf8').replace(/\r\n/g, '\n'));
fs.writeFileSync(path.join(OUT, 'sidebar.json'), JSON.stringify(sidebars.map(sidebarItem), null, 2));

console.log(`prepared ${OUT}`);
