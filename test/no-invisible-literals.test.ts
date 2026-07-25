/**
 * The project's hardest-won rule: invisible characters are never typed as
 * literals in source. Editors, clipboards and language models silently
 * mistranscribe them, and the resulting bug is by definition invisible.
 *
 * Visible bichig letters (ᠠ ᠨ ᠮ …) are fine — only the format controls are
 * banned, and only in source. The reference documents use `U+XXXX` prose
 * notation, so they are covered too.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/** MVS, NNBSP, FVS1–4, ZWNJ, ZWJ, BOM, nirugu. */
const INVISIBLE = /\u202F|\u180E|\u180B|\u180C|\u180D|\u180F|\u200C|\u200D|\uFEFF|\u180A/;

function walk(dir: string, match: RegExp): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walk(path, match));
    else if (match.test(name)) out.push(path);
  }
  return out;
}

describe('no invisible literals', () => {
  const files = [
    ...walk(join(ROOT, 'src'), /\.ts$/),
    ...walk(join(ROOT, 'test'), /\.ts$/),
    ...walk(join(ROOT, 'skills'), /\.md$/),
    ...walk(join(ROOT, 'scripts'), /\.mjs$/),
  ];

  it('scans a non-trivial number of files', () => {
    expect(files.length).toBeGreaterThan(10);
  });

  it.each(files.map((f) => [f.slice(ROOT.length), f] as const))('%s', (_name, path) => {
    const offenders = readFileSync(path, 'utf8')
      .split('\n')
      .flatMap((line, i) => (INVISIBLE.test(line) ? [i + 1] : []));
    expect(offenders, `invisible literal on line(s) ${offenders.join(', ')}`).toEqual([]);
  });
});
