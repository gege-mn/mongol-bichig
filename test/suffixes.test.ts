/**
 * Cross-checks the machine registry against the normative document.
 *
 * `skills/mongol-bichig/references/suffixes.md` is the source of truth: its
 * **Code points** column is normative and its Gender / Use after / Reg columns
 * carry the grammar. This test parses those tables and asserts the data agrees
 * — so editing one without the other fails the build, in either direction.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { toScript } from '../src/romanize.js';
import { connectorSuffixes, spaceParticles, suffixes } from '../src/suffixes.js';
import type { AttachCondition, Harmony } from '../src/types.js';

const DOC = fileURLToPath(
  new URL('../skills/mongol-bichig/references/suffixes.md', import.meta.url),
);

/** Every markdown table row in the document, keyed by its column headings. */
function parseTables(markdown: string): Array<Record<string, string>> {
  const rows: Array<Record<string, string>> = [];
  const lines = markdown.split('\n');
  const cells = (line: string): string[] =>
    line
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((c) => c.trim());

  let headers: string[] | undefined;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    if (!line.trimStart().startsWith('|')) {
      headers = undefined;
      continue;
    }
    const next = lines[i + 1] ?? '';
    // A header is any table line immediately followed by the |---|---| rule.
    if (/^\|[\s:|-]+\|$/.test(next.trim())) {
      headers = cells(line);
      i++;
      continue;
    }
    if (headers === undefined) continue;
    const values = cells(line);
    rows.push(Object.fromEntries(headers.map((h, k) => [h, values[k] ?? ''])));
  }
  return rows;
}

/** `U+180E U+1836 U+1822` → the letters, minus any leading connector. */
function fromCodePoints(cell: string): { sequence: string; join: 'mvs' | 'space' } {
  const points = cell.replace(/`/g, '').trim().split(/\s+/);
  const join = points[0] === 'U+180E' ? 'mvs' : 'space';
  const letters = join === 'mvs' ? points.slice(1) : points;
  return {
    sequence: letters.map((p) => String.fromCodePoint(Number.parseInt(p.slice(2), 16))).join(''),
    join,
  };
}

/** The document's prose conditions, mapped to the machine enum. */
const CONDITIONS: Record<string, AttachCondition> = {
  vowels: 'vowel',
  consonants: 'consonant',
  'consonants except н': 'consonant-not-n',
  н: 'n',
  'vowel/soft finals': 'vowel-or-soft',
  'б г р с д': 'hard',
  'any ending': 'any',
  'any ending (literary)': 'any',
  'people/titles': 'people',
};

const GENDERS: Record<string, Harmony> = {
  masc: 'masculine',
  fem: 'feminine',
  neutral: 'neutral',
};

const docRows = parseTables(readFileSync(DOC, 'utf8')).filter((r) =>
  (r['Code points'] ?? '').includes('U+'),
);

describe('suffixes.md ↔ the machine registry', () => {
  it('finds the normative tables', () => {
    // 48 of the 63 connector-joined entries are tabulated with code points,
    // plus the 4 space-joined words. The other 15 appear in prose or in
    // code-point-less tables: the 4 expected-but-unregistered harmonic mates
    // (taγan, tegen, echegen, tuni) and the 11 "not yet in scope" registry
    // extras. Those are covered by the registry-shape counts below instead.
    expect(docRows.length).toBe(52);
  });

  it.each(docRows.map((r) => [r.Translit || r.Bichig, r] as const))(
    'matches the document for %s',
    (_label, row) => {
      const { sequence, join } = fromCodePoints(row['Code points'] ?? '');
      const entry = suffixes.find((s) => s.sequence === sequence && s.join === join);
      expect(entry, `no registry entry for ${row['Code points']}`).toBeDefined();
      if (entry === undefined) return;

      const translit = row.Translit;
      if (translit !== undefined && translit !== '') {
        expect(entry.translit, 'translit').toBe(translit);
      }

      const gender = row.Gender;
      if (gender !== undefined && gender !== '') {
        expect(entry.harmony, 'harmony').toBe(GENDERS[gender]);
      }

      const after = row['Use after'];
      if (after !== undefined && after !== '') {
        expect(CONDITIONS[after], `unmapped condition ${JSON.stringify(after)}`).toBeDefined();
        expect(entry.after, 'attach condition').toBe(CONDITIONS[after]);
      }

      const reg = row.Reg;
      if (reg !== undefined && reg !== '') {
        expect(entry.registry, 'registry presence').toBe(reg === '✓');
      }
    },
  );

  it('traces every entry back to the document', () => {
    // The 15 entries without a code-point row still have to be *in* the
    // document — as bichig, in prose or in the not-yet-in-scope table. This
    // is what stops a plausible-looking row from being invented here.
    // The document never types an invisible character either, so its
    // word-internal MVS is spelled with the marker instead.
    const text = readFileSync(DOC, 'utf8').replace(/⟨MVS⟩/g, '\u180E');
    for (const entry of suffixes) {
      expect(text.includes(entry.sequence), `${entry.translit} is not in suffixes.md`).toBe(true);
    }
  });

  it('renders every Bichig cell from its own code points', () => {
    // The Bichig column is decorative, the code points are normative — but a
    // mismatch between them means the document itself is wrong.
    for (const row of docRows) {
      const bichig = (row.Bichig ?? '').replace(/⟨MVS⟩/g, '\u180E');
      if (bichig === '') continue;
      expect(fromCodePoints(row['Code points'] ?? '').sequence, row.Translit).toBe(bichig);
    }
  });
});

describe('registry shape', () => {
  it('has 63 connector-joined suffixes and 4 space-joined words', () => {
    expect(connectorSuffixes.length).toBe(63);
    expect(spaceParticles.length).toBe(4);
  });

  it('derives every sequence from its romanization', () => {
    for (const entry of suffixes) {
      expect(toScript(entry.translit), entry.translit).toBe(entry.sequence);
    }
  });

  it('has no duplicate sequence within a join class', () => {
    for (const group of [connectorSuffixes, spaceParticles]) {
      const seen = new Map<string, string>();
      for (const entry of group) {
        const clash = seen.get(entry.sequence);
        expect(clash, `${entry.translit} collides with ${clash}`).toBeUndefined();
        seen.set(entry.sequence, entry.translit);
      }
    }
  });
});
