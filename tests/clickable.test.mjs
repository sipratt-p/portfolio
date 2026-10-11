// Everything that looks clickable is clickable. Every Lab piece has a detail view; every card, tile and
// row is ONE real link stretched over its whole area; "Try it live" tiles go only to pieces already on
// everdust.ai/play; nothing links a private (tailnet) URL.
//
// The last test drives a real browser. It runs when SITE_BASE (a served build, e.g. http://localhost:4321)
// and PLAYWRIGHT_MODULE (path to a playwright install) are set, and is skipped otherwise.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';
import { PRIV } from './private-terms.mjs';
const read = p => readFileSync(p, 'utf8');
const load = async p => import('data:text/javascript;base64,' + Buffer.from(transpileModule(read(p), { compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2022 } }).outputText).toString('base64'));
const { labSeries, lab, livePieces, liveImg, liveHref } = await load('lib/lab.ts');
const { notes } = await load('lib/editorial.ts');
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const pieces = s => [s.hero, ...s.pieces, ...s.more];
const PRIVATE = new RegExp(String.raw`\b100\.\d+\.\d+\.\d+\b|localhost|diagnos|\bCDS\b|consulting|hire me` + (PRIV ? '|' + PRIV.pattern : ''), 'i');
const sentences = t => t.trim().split(/(?<=[.!?”])\s+(?=[A-Z0-9“‘(])/);

test('Every Lab piece has a short, plain detail: 2–4 sentences, real links only, nothing private', () => {
  for (const s of labSeries) {
    const ids = pieces(s).map(p => p.id);
    assert.equal(new Set(ids).size, ids.length, `${s.slug}: duplicate piece ids`);
    for (const p of pieces(s)) {
      const where = `${s.slug}#${p.id}`;
      assert(p.about, `${where} has no description`);
      const n = sentences(p.about).length;
      assert(n >= 2 && n <= 4, `${where}: ${n} sentences`);
      assert(p.about.length <= 720, `${where}: description is ${p.about.length} chars`);
      assert(/[.!?”’)]$/.test(p.about.trim()), `${where}: description ends mid-sentence`);
      for (const t of [p.about, p.note ?? '', p.fact, ...(p.links ?? []).map(l => l.label + ' ' + l.href)]) assert(!PRIVATE.test(t), `${where}: ${t.match(PRIVATE)?.[0]}`);
      for (const l of p.links ?? []) {
        if (l.href.startsWith('/writing/')) {
          const [slug, hash] = l.href.slice('/writing/'.length).split('#');
          const note = notes.find(n => n.slug === slug); assert(note, `${where}: ${l.href}`);
          if (hash) assert(note.sections.some(x => x.id === hash), `${where}: #${hash} missing in ${slug}`);
        } else assert(/^https:\/\/everdust\.ai\/play\/[a-z0-9-]+$/.test(l.href), `${where}: ${l.href} is not a write-up or an everdust.ai/play piece`);
      }
    }
  }
});

test('Our pieces that are not on everdust.ai/play keep “public hosting coming” and get no hosting link', () => {
  const all = labSeries.flatMap(pieces);
  for (const id of ['hidden-attractors', 'slower-light', 'nebulae']) {
    const p = all.find(p => p.id === id); assert(p, id);
    assert.match(p.status ?? '', /public hosting coming/, id);
    assert(!(p.links ?? []).some(l => /everdust\.ai\/play/.test(l.href)), `${id} links a hosting page`);
  }
  for (const c of lab.coming) assert(c.href.startsWith('/lab/'), c.href);
});

test('“Try it live” tiles: everdust.ai/play only, space and maths only, light, with our own 800 px stills', () => {
  assert(livePieces.length >= 4);
  const excluded = ['box-mandala', 'glass-orbs', 'laser-cathedral', 'latent-space', 'attention-iv', 'evolution', 'particle-vortex', 'pink-tree-creek', 'starry-coast', 'great-wave', 'monet-bridge', 'wheat-field'];
  for (const p of livePieces) {
    assert(!excluded.includes(p.slug), `${p.slug} is not a space or maths piece`);
    assert.match(liveHref(p.slug), /^https:\/\/everdust\.ai\/play\/[a-z0-9-]+$/);
    assert(p.mb > 0 && p.mb <= 8, `${p.slug}: ${p.mb} MB`);
    const f = 'public' + liveImg(p.slug); const buf = readFileSync(f);
    assert(buf.length > 5000 && buf.length < 150_000, `${f}: ${buf.length} bytes`);
    // JPEG frame header: width must be 800
    let i = 2, w = 0; while (i < buf.length) { const m = buf[i + 1], len = buf.readUInt16BE(i + 2); if (m >= 0xc0 && m <= 0xc3) { w = buf.readUInt16BE(i + 7); break; } i += 2 + len; }
    assert.equal(w, 800, `${f} is ${w} px wide`);
  }
  const tile = read('components/portfolio/lab-label.tsx');
  assert(tile.includes("target: '_blank', rel: 'noopener'"), 'live tiles open in a new tab with rel=noopener');
  for (const f of [...walk('app'), ...walk('components/portfolio'), ...walk('lib')]) assert(!/everdust\.ai\/(play\/thumbs|_next)/.test(read(f)), `${f} hotlinks an everdust.ai image`);
});

const built = existsSync('dist/client/index.html');
test('Built pages: every Lab piece opens the detail dialog from its tile, row or hero, and its text ships with the page', { skip: !built && 'no build' }, () => {
  for (const s of labSeries) {
    const html = read(`dist/client/lab/${s.slug}.html`);
    assert.equal((html.match(/<dialog\b/g) || []).length, 1, s.slug);
    assert(html.includes('<dialog class="detail" id="lab-detail" aria-labelledby="lab-detail-h"'), `${s.slug}: no detail dialog`);
    for (const p of pieces(s)) {
      assert(new RegExp(`<a class="t stretch" href="#${p.id}" data-detail="${p.id}" aria-haspopup="dialog" aria-controls="lab-detail"`).test(html), `${s.slug}: nothing opens ${p.id}`);
      const run = p.about.match(/[A-Za-z0-9 ,.-]{24,}/)?.[0];   // a stretch of the description that survives escaping
      assert(run && html.includes(run), `${s.slug}: ${p.id}'s description is not in the page`);
    }
    for (const p of s.live ?? []) assert(html.includes(`href="${liveHref(p.slug)}" target="_blank" rel="noopener"`), `${s.slug}: live tile ${p.slug}`);
  }
});

test('Built pages: every card, tile and row is one link stretched over its whole area', { skip: !built && 'no build' }, () => {
  let cards = 0;
  for (const f of walk('dist/client').filter(f => f.endsWith('.html'))) {
    const html = read(f);
    for (const m of html.matchAll(/<(article|li)\b[^>]*?\bclass="((?:card|more-row)\b[^"]*)"[^>]*>([\s\S]*?)<\/\1>/g)) {
      const body = m[3];
      const primary = (body.match(/<a [^>]*class="[^"]*\bstretch\b/g) || []).length + (body.match(/<h[23] class="[^"]*\bcard-title\b[^"]*"><a /g) || []).length;
      assert.equal(primary, 1, `${f}: <${m[1]} class="${m[2]}"> has ${primary} primary links`);
      cards++;
    }
    for (const m of html.matchAll(/<div class="(side-card soft|archive-row)"[^>]*>[\s\S]*?<\/a>/g)) assert(/class="link stretch"/.test(m[0]), `${f}: ${m[1]} is not one link`);
    assert(!/<div class="cta-strip"/.test(html), `${f}: a CTA strip is not a link`);
  }
  assert(cards > 60, `only ${cards} cards found`);   // guards against the pattern silently matching nothing
});

const BASE = process.env.SITE_BASE, PW = process.env.PLAYWRIGHT_MODULE;
test('In a browser: clicking a card’s image or empty area opens its detail, page or link; keyboard and phone work', { skip: !(BASE && PW) && 'set SITE_BASE and PLAYWRIGHT_MODULE to run', timeout: 600_000 }, async () => {
  const { chromium } = createRequire(import.meta.url)(PW);
  const browser = await chromium.launch({ headless: true, args: ['--disable-gpu', '--use-angle=swiftshader', '--mute-audio'], env: { ...process.env, CUDA_VISIBLE_DEVICES: '' } });
  if (process.env.PW_PIDFILE) writeFileSync(process.env.PW_PIDFILE, execSync(`ps -o pid=,args= --ppid ${process.pid}`).toString().split('\n').filter(l => l.includes('chromium')).map(l => l.trim().split(/\s+/)[0]).join('\n'));
  const fails = []; let checks = 0;
  const check = (ok, msg) => { checks++; if (!ok) fails.push(msg); };
  try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await ctx.route(/^(https?:\/\/(?!localhost|127\.)[^/]+\/|mailto:)/, r => r.fulfill({ status: 200, contentType: 'text/html', body: 'external' }));
    const page = await ctx.newPage();
    const errors = []; page.on('pageerror', e => errors.push(String(e)));
    const go = async p => { await page.goto(BASE + p, { waitUntil: 'networkidle' }); await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('in'))); };
    // Click a point inside an element: its image, or an empty corner of its body.
    const pointIn = async (loc, where) => {
      await loc.scrollIntoViewIfNeeded();
      const media = where === 'image' ? await loc.locator('.media').first().boundingBox().catch(() => null) : null;
      const b = media ?? await loc.boundingBox();
      return where === 'image' ? { x: b.x + b.width * 0.72, y: b.y + b.height * 0.35 } : { x: b.x + b.width - 14, y: b.y + b.height - 10 };
    };
    const openDetail = async (sel, where, label) => {
      const loc = page.locator(sel).first(); const id = await loc.locator('a[data-detail]').getAttribute('data-detail');
      const pt = await pointIn(loc, where); await page.mouse.click(pt.x, pt.y); await page.waitForTimeout(250);
      const st = await page.evaluate(() => ({ open: document.querySelector('dialog.detail[open]')?.dataset.piece ?? null, hash: location.hash, h: document.querySelector('dialog.detail[open] h2')?.textContent ?? '', about: document.querySelector('dialog.detail[open] .detail-about')?.textContent ?? '' }));
      const want = labSeries.flatMap(pieces).find(p => p.id === id);
      check(st.open === id && st.hash === '#' + id && st.h === want.title && st.about === want.about, `${label}: clicking its ${where} gave ${JSON.stringify({ ...st, about: st.about.slice(0, 30) })} (want ${id})`);
      await page.keyboard.press('Escape'); await page.waitForTimeout(150);
      const after = await page.evaluate(() => ({ open: !!document.querySelector('dialog.detail[open]'), hash: location.hash, focus: document.activeElement?.getAttribute('data-detail') }));
      check(!after.open && after.hash === '' && after.focus === id, `${label}: Escape left ${JSON.stringify(after)}`);
    };
    const navigates = async (pathName, sel, where, want, label) => {
      await go(pathName); const loc = page.locator(sel).first(); const pt = await pointIn(loc, where);
      const popup = page.waitForEvent('popup', { timeout: 3000 }).catch(() => null);
      const nav = page.waitForURL(u => u.href !== BASE + pathName, { timeout: 3000 }).catch(() => null);
      await page.mouse.click(pt.x, pt.y);
      const [p, n] = await Promise.all([popup, nav]);
      if (!p && n !== null) await page.waitForLoadState('networkidle');
      const url = p ? p.url() : n !== null ? page.url() : '(nothing)';
      check(url.replace(BASE, '').startsWith(want), `${label}: clicking its ${where} went to ${url} (want ${want})`);
      if (p) await p.close();
      return url;
    };
    // 1. Every piece on every series page opens its detail, from the image and from empty space.
    for (const s of labSeries) {
      await go('/lab/' + s.slug);
      await openDetail('.hero-fig', 'image', `${s.slug} hero`);
      for (const p of s.pieces) { await openDetail(`#${p.id}.tile`, 'image', `${s.slug}/${p.id}`); await openDetail(`#${p.id}.tile`, 'corner', `${s.slug}/${p.id}`); }
      for (const p of s.more) await openDetail(`li#${p.id}`, 'corner', `${s.slug}/${p.id}`);
    }
    // 2. Deep links open the detail; back closes it.
    await go('/lab/strange-attractors#aizawa'); await page.waitForTimeout(200);
    check(await page.evaluate(() => document.querySelector('dialog[open]')?.dataset.piece) === 'aizawa', 'deep link #aizawa did not open its detail');
    // 3. Cards elsewhere: image or empty area goes where the card says.
    await navigates('/', '.band .tile', 'image', '/lab/strange-attractors#discoveries-ii', 'home Lab tile');
    check(await page.evaluate(() => document.querySelector('dialog[open]')?.dataset.piece) === 'discoveries-ii', 'home Lab tile did not land on an open detail');
    await navigates('/', '.cards3 .card', 'corner', '/writing/autoresearch-at-home', 'home supporting card');
    await navigates('/', '.proof-cards .story', 'corner', '/writing/running-a-team-of-ai-agents', 'home story card');
    await navigates('/', '.flag-paper', 'image', '/writing/watching-a-language-model-think', 'home paper flagship');
    await navigates('/', '.flagship', 'image', '/work/scribe-bench', 'home flagship card');
    await navigates('/', '.ship', 'corner', 'https://everdust.ai', 'home shipped card');
    await navigates('/lab', '.series-grid .card', 'image', '/lab/strange-attractors', 'Lab series card');
    await navigates('/lab', '.everdust', 'image', 'https://everdust.ai', 'Lab Everdust card');
    await navigates('/lab', '.tiles5 .tile', 'image', 'https://everdust.ai/play/', 'Lab live tile');
    await navigates('/lab', '.tiles4 .tile', 'corner', '/writing/chaos-with-nothing-to-orbit', 'Lab recent tile');
    await navigates('/lab/cosmos', '.live-tile', 'image', 'https://everdust.ai/play/galaxy-collision', 'Cosmos live tile');
    await navigates('/about', '.good .card', 'corner', '/work/scribe-bench', 'About card');
    await navigates('/work', '.work-card', 'corner', '/work/scribe-bench', 'Work card');
    await navigates('/work', '.archive-row', 'corner', '/work/archive', 'Work archive row');
    await navigates('/writing', '.note-row', 'corner', '/writing/', 'Writing row');
    await navigates('/work/scribe-bench', '.side-card.soft', 'corner', '/start', 'Case “New here?” card');
    // 4. Sweep: no dead spot inside anything that looks like a card or row, on every page we touched.
    for (const p of ['/', '/lab', ...labSeries.map(s => '/lab/' + s.slug), '/about', '/work', '/writing', '/work/scribe-bench', '/writing/chaos-with-nothing-to-orbit', '/resume']) {
      await go(p);
      const dead = await page.evaluate(async () => {
        const out = [];
        for (const el of document.querySelectorAll('main .card, main .more-row, main .hero-fig, main .side-card.soft, main .archive-row, main a.cta-strip, main .post, main .note-row')) {
          if (el.closest('dialog')) continue;
          el.scrollIntoView({ block: 'center' }); await new Promise(r => setTimeout(r, 20));
          const r = el.getBoundingClientRect();
          for (const [fx, fy] of [[.5, .5], [.15, .2], [.85, .2], [.15, .85], [.85, .85]]) {
            const x = r.left + r.width * fx, y = r.top + r.height * fy;
            if (y < 80 || y > innerHeight - 4 || x < 0 || x > innerWidth) continue;
            const hit = document.elementFromPoint(x, y);
            if (hit && el.contains(hit) && !hit.closest('a[href],button')) out.push(`${el.className.split(' ').slice(0, 3).join('.')} "${el.textContent.trim().slice(0, 40)}" at ${fx},${fy}`);
          }
        }
        return out;
      });
      for (const d of dead) check(false, `${p}: dead spot in ${d}`);
    }
    check(errors.length === 0, 'page errors: ' + errors.join(' | '));
    await ctx.close();

    // 5. Keyboard: Enter opens, Tab stays inside, Escape returns focus to the tile.
    const kctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const kp = await kctx.newPage(); await kp.goto(BASE + '/lab/strange-attractors', { waitUntil: 'networkidle' });
    await kp.locator('#magnetic-basins a[data-detail]').focus(); await kp.keyboard.press('Enter'); await kp.waitForTimeout(250);
    check(await kp.evaluate(() => document.querySelector('dialog[open]')?.dataset.piece) === 'magnetic-basins', 'Enter did not open the detail');
    let inside = true; for (let i = 0; i < 8; i++) { await kp.keyboard.press('Tab'); inside &&= await kp.evaluate(() => !!document.activeElement?.closest('dialog[open]')); }
    check(inside, 'Tab left the open dialog');
    await kp.keyboard.press('Escape'); await kp.waitForTimeout(150);
    check(await kp.evaluate(() => document.activeElement?.getAttribute('data-detail')) === 'magnetic-basins', 'focus did not return to the tile');
    check(await kp.evaluate(() => getComputedStyle(document.querySelector('#magnetic-basins a[data-detail]'), '::before').position) === 'absolute', 'tile link is not stretched');
    await kctx.close();

    // 6. Phone: tapping a tile opens the detail, and the dialog fits a 390 px screen.
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const mp = await m.newPage(); await mp.goto(BASE + '/lab/strange-attractors', { waitUntil: 'networkidle' });
    const t = mp.locator('#aizawa .media'); await t.scrollIntoViewIfNeeded(); const tb = await t.boundingBox();
    await mp.touchscreen.tap(tb.x + tb.width * 0.7, tb.y + tb.height * 0.3); await mp.waitForTimeout(300);
    const fit = await mp.evaluate(() => { const d = document.querySelector('dialog[open]'); if (!d) return null; const r = d.getBoundingClientRect(); return { id: d.dataset.piece, left: r.left, right: r.right, top: r.top, bottom: r.bottom, sw: document.documentElement.scrollWidth }; });
    check(fit && fit.id === 'aizawa', `tap did not open the detail: ${JSON.stringify(fit)}`);
    check(fit && fit.left >= 0 && fit.right <= 390 && fit.top >= 0 && fit.bottom <= 844 && fit.sw <= 390, `dialog does not fit 390 px: ${JSON.stringify(fit)}`);
    await mp.locator('dialog[open] [data-close]').tap(); await mp.waitForTimeout(200);
    check(await mp.evaluate(() => !document.querySelector('dialog[open]')), 'Close did not close on a phone');
    await m.close();
  } finally { await browser.close(); }
  assert.deepEqual(fails, []);
  assert(checks > 120, `only ${checks} checks ran`);
});
