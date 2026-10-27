import { describe, expect, it } from 'vitest';
import {
  applyReference,
  buildReview,
  FORMAT,
  type Marks,
  parseInput,
  phraseToScript,
  resolveFix,
  restoreMarks,
  scriptToRoman,
  serialize,
  splitWords,
} from '../review/model.js';

const MONGGUL = '\u182E\u1823\u1829\u182D\u1824\u182F';

describe('phraseToScript / scriptToRoman', () => {
  it('converts words, sentence marks and digits', () => {
    expect(phraseToScript('mongγul')).toBe(MONGGUL);
    expect(phraseToScript('ner-e, 2026 gege.')).toBe(
      '\u1828\u1821\u1837\u180E\u1821\u1802 \u1812\u1810\u1812\u1816 \u182D\u1821\u182D\u1821\u1803',
    );
  });

  it('leaves placeholders and script alone', () => {
    expect(phraseToScript(`{count} ${MONGGUL} %s`)).toBe(`{count} ${MONGGUL} %s`);
  });

  it('throws on a word that does not romanize', () => {
    expect(() => phraseToScript('hello')).toThrow(/Unmapped/);
  });

  it('round-trips, choosing q/k and γ/g by the word', () => {
    for (const roman of [
      'mongγul bičig-ün keregsel-üd',
      'ilegeǰü čidaγsan ügei. daqin ilegegerei, 12 ner-e',
    ]) {
      expect(scriptToRoman(phraseToScript(roman))).toBe(roman);
    }
  });

  it('shows a legacy NNBSP instead of hiding it', () => {
    expect(scriptToRoman(`${MONGGUL}\u202F\u1824\u1828`)).toBe('mongγul\u2039nnbsp\u203Aun');
  });

  it('writes nirugu as `_`, and reads it back', () => {
    const hhk = '\u182C\u1822\u180A \u182C\u1820\u180A \u183B\u1823\u180A';
    // ᠬᠢ alone has only the neutral i, so it takes the front reading k.
    expect(scriptToRoman(hhk)).toBe('ki_ qa_ kho_');
    expect(phraseToScript('qi_ qa_ kho_')).toBe(hhk);
    expect(resolveFix('qi_ qa_ kho_')).toEqual({ text: hhk, roman: 'qi_ qa_ kho_' });
  });
});

describe('splitWords', () => {
  it('counts in code points and keeps NNBSP inside its word', () => {
    expect(splitWords(`${MONGGUL}\u202F\u1824\u1828  \u182A\u1822`)).toEqual([
      { text: `${MONGGUL}\u202F\u1824\u1828`, start: 0, end: 9 },
      { text: '\u182A\u1822', start: 11, end: 13 },
    ]);
  });
});

describe('parseInput', () => {
  it('reads a source file of romanized lines, with meanings and sections', () => {
    const { doc } = parseInput(
      'src/text.ts',
      [
        'const ROMAN = {',
        '  // Site',
        "  siteName: 'mongγul bičig', // Mongolian script",
        '  // Home',
        '  \'home.lead\': "ner-e",',
        '} as const;',
        "const COMMA = '\u1802';",
      ].join('\n'),
    );
    expect(doc.title).toBe('text.ts');
    expect(doc.rows).toEqual([
      {
        key: 'siteName',
        text: `${MONGGUL} \u182A\u1822\u1834\u1822\u182D`,
        roman: 'mongγul bičig',
        meaning: 'Mongolian script',
        group: 'Site',
      },
      { key: 'home.lead', text: '\u1828\u1821\u1837\u180E\u1821', roman: 'ner-e', group: 'Home' },
    ]);
  });

  it('flattens JSON, reads script as it is, and keeps a value it cannot convert', () => {
    const { doc } = parseInput(
      'mn.json',
      JSON.stringify({
        a: { b: MONGGUL },
        list: ['ner-e'],
        bad: 'hello',
        '@bad': { description: 'x' },
        n: 3,
      }),
    );
    expect(doc.rows.map((r) => r.key)).toEqual(['a.b', 'list.0', 'bad']);
    expect(doc.rows[0]).toMatchObject({ text: MONGGUL, roman: 'mongγul' });
    expect(doc.rows[2]).toMatchObject({ text: '', roman: 'hello', context: 'x' });
    expect(doc.rows[2]?.error).toMatch(/Unmapped/);
  });

  it('reads prepared rows and numbers repeated keys', () => {
    const { doc } = parseInput(
      'rows.json',
      JSON.stringify({
        title: 'App',
        rows: [
          { key: 'k', roman: 'ner-e', meaning: 'Name', context: 'Home' },
          { key: 'k', text: MONGGUL, roman: 'mongγul' },
        ],
      }),
    );
    expect(doc.title).toBe('App');
    expect(doc.rows.map((r) => [r.key, r.roman, r.meaning])).toEqual([
      ['k', 'ner-e', 'Name'],
      ['k#2', 'mongγul', undefined],
    ]);
  });
});

describe('applyReference', () => {
  it('takes meanings from a file with the same keys', () => {
    const { doc } = parseInput('mn.json', JSON.stringify({ a: { b: 'ner-e' }, c: 'gege' }));
    expect(applyReference(doc, JSON.stringify({ a: { b: 'Name' } }))).toBe(1);
    expect(doc.rows.map((r) => r.meaning)).toEqual(['Name', undefined]);
    expect(applyReference(doc, "c: 'gege, the brand',")).toBe(1);
    expect(doc.rows[1]?.meaning).toBe('gege, the brand');
  });
});

describe('the review handed back', () => {
  const { doc } = parseInput('mn.json', JSON.stringify({ a: 'ner-e', b: 'gege', c: 'hello' }));
  const marks: Marks = {
    a: { verdict: 'wrong', fix: 'ner-e-ben', note: ' possessive ' },
    b: { verdict: 'ok', fix: 'gege' },
    c: { verdict: 'unsure', fix: 'hxllo' },
  };
  const review = buildReview(doc, marks, true, new Date('2026-10-08T00:00:00Z'));

  it('carries verdicts, corrections and notes', () => {
    expect(review.format).toBe(FORMAT);
    expect(review.summary).toEqual({ total: 3, ok: 1, wrong: 1, unsure: 1, unreviewed: 0 });
    expect(review.items[0]).toMatchObject({
      verdict: 'wrong',
      note: 'possessive',
      correction: { text: phraseToScript('ner-e-ben'), roman: 'ner-e-ben' },
    });
    // A correction that changes nothing is not one.
    expect(review.items[1]?.correction).toBeUndefined();
    expect(review.items[2]).toMatchObject({ correctionAsTyped: 'hxllo', text: '' });
    expect(review.items[2]?.error).toMatch(/Unmapped/);
  });

  it('is written without invisible literals', () => {
    const json = serialize(review);
    expect(json).toContain('\\u180E');
    expect(json).not.toMatch(/[\u180A-\u180F\u202F\uFEFF]|\u200C|\u200D/);
    expect(JSON.parse(json)).toEqual(review);
  });

  it('is picked up again while the text is unchanged', () => {
    expect(restoreMarks(doc, review)).toEqual({
      a: { verdict: 'wrong', fix: 'ner-e-ben', note: 'possessive' },
      b: { verdict: 'ok' },
      c: { verdict: 'unsure', fix: 'hxllo' },
    });
  });

  it('asks again about a string whose text has changed', () => {
    const next = parseInput('mn.json', JSON.stringify({ a: 'ner-e-ben', b: 'gege' })).doc;
    expect(restoreMarks(next, review)).toEqual({
      a: { previous: { verdict: 'wrong', roman: 'ner-e', note: 'possessive' } },
      b: { verdict: 'ok' },
    });
  });
});

describe('resolveFix', () => {
  it('reads romanization or script', () => {
    expect(resolveFix('  ')).toBeUndefined();
    expect(resolveFix('mongγul')).toEqual({ text: MONGGUL, roman: 'mongγul' });
    expect(resolveFix(MONGGUL)).toEqual({ text: MONGGUL, roman: 'mongγul' });
    expect(resolveFix('hello')).toHaveProperty('error');
  });
});
