/**
 * The FVS registry against everything it must agree with: a fresh derivation
 * from the vendored data (so `src/data/fvs.ts` cannot go stale), UCD 18.0's
 * standardized variants, and the quick-reference table in the reference
 * document, which wins when they disagree.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { deriveFvs, readStandardizedVariants } from '../scripts/gen-fvs.mjs';
import { hudumFvsRows, notInUseFvsPairs, otherWritingSystemFvsRows } from '../src/data/fvs.js';
import { fvsStatus, hudumFvs, undottedSha } from '../src/fvs.js';

const DOC = fileURLToPath(
  new URL('../skills/mongol-bichig/references/variation-sequences.md', import.meta.url),
);

const triple = (r: { base: number; position: string; fvs: number }): string =>
  `${r.base.toString(16)} ${r.position} ${r.fvs}`;
const pair = (r: { base: number; fvs: number }): string => `${r.base.toString(16)} ${r.fvs}`;

describe('src/data/fvs.ts', () => {
  it('matches a fresh derivation from the vendored data (run `bun run gen:fvs`)', () => {
    const fresh = deriveFvs();
    expect(hudumFvsRows).toEqual(fresh.hudum);
    expect(otherWritingSystemFvsRows).toEqual(fresh.otherWritingSystems);
    expect(notInUseFvsPairs).toEqual(fresh.notInUse);
  });

  it('has the counts the reference document quotes', () => {
    expect(hudumFvs).toHaveLength(107);
    expect(hudumFvs.filter((r) => r.selectsDefault)).toHaveLength(31);
    expect(notInUseFvsPairs).toHaveLength(6);
  });
});

describe('agreement with UCD 18.0 StandardizedVariants.txt', () => {
  const ucd = readStandardizedVariants();
  const inUse = new Set(
    ucd
      .filter((r) => !r.notInUse)
      .flatMap((r) => r.positions.map((p) => triple({ ...r, position: p }))),
  );
  const known = new Set([...hudumFvsRows, ...otherWritingSystemFvsRows].map(triple));

  it('standardizes every form Hudum registers', () => {
    expect(hudumFvsRows.map(triple).filter((t) => !inUse.has(t))).toEqual([]);
  });

  it('standardizes nothing mongfontbuilder lacks', () => {
    expect([...inUse].filter((t) => !known.has(t))).toEqual([]);
  });

  it('has only the two known position-less Ali Gali rows outside mongfontbuilder', () => {
    const knownPairs = new Set([...hudumFvsRows, ...otherWritingSystemFvsRows].map(pair));
    const missing = ucd.filter((r) => !r.notInUse && !knownPairs.has(pair(r))).map(pair);
    expect(missing).toEqual(['1880 1', '1881 1']);
  });

  it('marks nothing "not in use" that any writing system still registers', () => {
    const registered = new Set([...hudumFvsRows, ...otherWritingSystemFvsRows].map(pair));
    expect(notInUseFvsPairs.map(pair).filter((p) => registered.has(p))).toEqual([]);
  });
});

describe('the quick-reference table in variation-sequences.md', () => {
  const doc = readFileSync(DOC, 'utf8');
  const fromDoc = new Map<number, number[]>();
  for (const m of doc.matchAll(/^\| U\+([0-9A-F]{4}) [A-Z]+ \| ([\d, ]+) \|$/gm)) {
    fromDoc.set(Number.parseInt(m[1] ?? '', 16), (m[2] ?? '').split(',').map(Number));
  }

  it('is the per-letter view of the registry', () => {
    const fromData = new Map<number, Set<number>>();
    for (const r of hudumFvs) fromData.set(r.base, (fromData.get(r.base) ?? new Set()).add(r.fvs));
    expect(fromDoc.size).toBe(18);
    expect(new Map([...fromData].map(([b, s]) => [b, [...s].sort()]))).toEqual(fromDoc);
  });
});

describe('fvsStatus', () => {
  it('accepts forms Hudum registers', () => {
    expect(fvsStatus(0x1831, 1)).toBe('registered'); // dotless SHA
    expect(fvsStatus(0x182d, 4, 'init')).toBe('registered'); // archaic kaph G
    expect(fvsStatus(0x1820, 3, 'isol')).toBe('registered');
  });

  it('reads the position when given one', () => {
    expect(fvsStatus(0x1820, 3)).toBe('registered');
    expect(fvsStatus(0x1820, 3, 'medi')).toBe('unregistered');
  });

  it('names the writing system problem', () => {
    expect(fvsStatus(0x1828, 3, 'medi')).toBe('other-writing-system'); // Manchu Ali Gali
    expect(fvsStatus(0x183a, 1, 'fina')).toBe('other-writing-system'); // Hudum Ali Gali
  });

  it('reports what Unicode 18.0 withdrew', () => {
    expect(fvsStatus(0x1887, 1)).toBe('not-in-use');
    expect(fvsStatus(0x188a, 1, 'init')).toBe('not-in-use');
  });

  it('rejects forms neither Unicode 18.0 nor Hudum registers', () => {
    expect(fvsStatus(0x1835, 1, 'medi')).toBe('unregistered');
    expect(fvsStatus(0x1820, 4)).toBe('unregistered');
  });

  it('rejects any FVS on letters that take none', () => {
    for (const base of [0x1827, 0x1829, 0x182b, 0x182e, 0x182f, 0x1834, 0x1837]) {
      expect(fvsStatus(base, 1)).not.toBe('registered');
    }
  });
});

describe('undottedSha', () => {
  const SHA = '\u1831';
  const I = '\u1822';

  it('finds SHA directly before I', () => {
    expect(undottedSha(`ᠵ${I}${SHA}${I}ᠶ\u180Eᠡ`)).toEqual([2]);
    expect(undottedSha(`${SHA}${I}ᠨ ᠪᠠ${SHA}${I}`)).toEqual([0, 6]);
  });

  it('passes a selector, another letter, or a SHA at the end', () => {
    expect(undottedSha(`${SHA}\u180C${I}`)).toEqual([]);
    expect(undottedSha(`${SHA}\u180B${I}`)).toEqual([]);
    expect(undottedSha(`${SHA}ᠠ`)).toEqual([]);
    expect(undottedSha(`ᠪᠠ${SHA}`)).toEqual([]);
  });

  it('rests on the vendored data: dotless before I, FVS2 selects the dots', () => {
    const variants = JSON.parse(
      readFileSync(new URL('../vendor/mongfontbuilder/variants.json', import.meta.url), 'utf8'),
    );
    for (const position of ['init', 'medi']) {
      const forms = variants['MONGOLIAN LETTER SHA'][position];
      expect(forms['1'].locales.MNG.conditions).toEqual(['dotless']);
      expect(forms['1'].written).toEqual(['S']);
      expect(forms['2'].default).toBe(true);
      expect(forms['2'].written).toEqual(['Sh']);
    }
  });
});
