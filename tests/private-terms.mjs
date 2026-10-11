// Private copy rules (names, places and projects that must never appear) live in tests/private-terms.local.json,
// which is gitignored so the list itself is never published. When it is absent those checks are skipped.
import { existsSync as _privExists, readFileSync as _privRead } from 'node:fs';
export const PRIV = _privExists('tests/private-terms.local.json') ? JSON.parse(_privRead('tests/private-terms.local.json', 'utf8')) : null;
