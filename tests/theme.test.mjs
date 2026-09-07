import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const bootstrap = readFileSync('public/theme-init.js', 'utf8');
function initialize({saved = null, systemDark = false, blocked = false} = {}) {
  const root = {dataset: {}, classList: {toggle(name, value) {this[name] = value;}}};
  vm.runInNewContext(bootstrap, {
    document: {documentElement: root},
    window: {matchMedia: () => ({matches: systemDark})},
    localStorage: {getItem(key) {
      assert.equal(key, 'sethpratt-theme');
      if (blocked) throw new Error('Storage unavailable');
      return saved;
    }},
  });
  return root;
}

test('Theme follows the system until the visitor chooses a preference', () => {
  for (const systemDark of [false, true]) {
    const root = initialize({systemDark});
    assert.equal(root.classList.dark, systemDark);
    assert.equal(root.dataset.themePreference, 'system');
  }
});
test('Saved light/dark choices override the opposite system preference', () => {
  assert.equal(initialize({saved: 'light', systemDark: true}).classList.dark, false);
  assert.equal(initialize({saved: 'dark', systemDark: false}).classList.dark, true);
});
test('Invalid or inaccessible storage falls back safely to system dark mode', () => {
  for (const opts of [{saved: 'invalid'}, {blocked: true}]) {
    const root = initialize({...opts, systemDark: true});
    assert.equal(root.classList.dark, true);
    assert.equal(root.dataset.themePreference, 'system');
  }
});
test('Shared layout initializes the theme before page content', () => {
  const layout = readFileSync('app/layout.tsx', 'utf8');
  assert(layout.indexOf('src="/theme-init.js"') < layout.indexOf('<body>'));
  assert(layout.includes('suppressHydrationWarning'));
  const header = readFileSync('components/portfolio/header.tsx', 'utf8');
  assert.equal((header.match(/<ThemeToggle\/>/g) || []).length, 1);
  const toggle = readFileSync('components/portfolio/theme-toggle.tsx', 'utf8');
  assert(toggle.includes("from '@/components/ui/switch'"));
  assert(toggle.includes('aria-label="Dark mode"'));
  assert(toggle.includes("localStorage.setItem('sethpratt-theme', preference)"));
  assert(toggle.includes("system.removeEventListener('change', sync)"));
  assert(toggle.includes("window.removeEventListener('storage', onStorage)"));
});
test('Career copy includes Seth’s confirmed title and scope', () => {
  const data = readFileSync('lib/portfolio.ts', 'utf8');
  assert(data.includes("company:'NVIDIA',role:'AI Product Leader'"));
  assert(data.includes("detail:'AI Research, enterprise AI"));
  assert(data.includes("detail:'Level 5 Autonomous Vehicles"));
});

test('Employer branding uses Meta while preserving historical employment context', () => {
  const home = readFileSync('app/page.tsx', 'utf8');
  const data = readFileSync('lib/portfolio.ts', 'utf8');
  assert(home.includes("'intuit','Meta','VISA'"));
  assert(!/facebook/i.test(home));
  assert(data.includes("company:'Meta',role:'Product Management',years:'2015 — 2017'"));
  assert(data.includes("detail:'Formerly Facebook. Consumer growth"));
  assert(!data.includes("company:'Facebook'"));
});
