/**
 * Classical romanization ↔ script.
 *
 * Every data file in this package and its consumers writes Classical forms in
 * romanization, so this module is the single point where a convention error
 * turns thousands of readable rows into malformed Unicode. Expectations are
 * written as `\uXXXX` escapes rather than bichig literals wherever a format
 * control is involved — see `no-invisible-literals.test.ts` for why.
 */

import { describe, expect, it } from 'vitest';
import {
  finalLetter,
  fromScript,
  isRomanizable,
  RomanizationError,
  toScript,
} from '../src/index.js';

const MVS = '\u180E';
const NNBSP = '\u202F';
const FVS1 = '\u180B';
const FVS2 = '\u180C';
const FVS3 = '\u180D';
/** U+180F, NOT U+180E — that is MVS. */
const FVS4 = '\u180F';

describe('toScript', () => {
  it('maps the plain alphabet', () => {
    expect(toScript('mongγul')).toBe('ᠮᠣᠩᠭᠤᠯ');
    expect(toScript('bičig')).toBe('ᠪᠢᠴᠢᠭ');
  });

  it('accepts the ASCII aliases', () => {
    expect(toScript('bichig')).toBe(toScript('bičig'));
    expect(toScript('ghal')).toBe(toScript('γal'));
    expect(toScript('jil')).toBe(toScript('ǰil'));
    expect(toScript('shine')).toBe(toScript('šine'));
    expect(toScript('vaghar')).toBe(toScript('waγar'));
  });

  it('writes `-` as MVS, never as NNBSP', () => {
    expect(toScript('qar-a')).toBe(`ᠬᠠᠷ${MVS}ᠠ`);
    expect(toScript('qota-du')).toContain(MVS);
    expect(toScript('qar-a')).not.toContain(NNBSP);
  });

  it('breaks the ANG ligature on `.`', () => {
    expect(toScript('n.g')).toBe('ᠨᠭ');
    expect(toScript('ng')).toBe('ᠩ');
    expect(toScript('n.g')).not.toBe(toScript('ng'));
  });

  it('reads q/k and γ/g as one letter each', () => {
    expect(toScript('qan')).toBe(toScript('kan'));
    expect(toScript('γal')).toBe(toScript('gal'));
  });

  it('selects a variation selector with a digit', () => {
    // найм — NA A YA FVS1 MA A. The selector attaches to the letter before it.
    expect(toScript('nay1ma')).toBe(`ᠨᠠᠶ${FVS1}ᠮᠠ`);
    expect(toScript('a1')).toBe(`ᠠ${FVS1}`);
    expect(toScript('a2')).toBe(`ᠠ${FVS2}`);
    expect(toScript('a3')).toBe(`ᠠ${FVS3}`);
    // FVS4 is U+180F. U+180E is MVS — mixing them up is the classic bug.
    expect(toScript('a4')).toBe(`ᠠ${FVS4}`);
    expect(toScript('a4')).not.toContain(MVS);
  });

  it('throws on anything outside the alphabet', () => {
    expect(() => toScript('xyz')).toThrow(RomanizationError);
    // Ali Gali and loan letters are deliberately unmapped.
    expect(() => toScript('ḥ')).toThrow(RomanizationError);
    expect(isRomanizable('qota')).toBe(true);
    expect(isRomanizable('hello')).toBe(false);
  });

  it('reports where the offending character was', () => {
    try {
      toScript('qota?');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(RomanizationError);
      expect((error as RomanizationError).offset).toBe(4);
      expect((error as RomanizationError).input).toBe('qota?');
    }
  });
});

describe('finalLetter', () => {
  const A = 0x1820;
  const GA = 0x182d;
  const NA = 0x1828;

  it('looks through the connector to the real final letter', () => {
    expect(finalLetter('qar-a')).toBe(A);
    expect(finalLetter('qota')).toBe(A);
  });

  it('looks through a boundary marker', () => {
    expect(finalLetter('n.g')).toBe(GA);
  });

  it('looks through a variation selector', () => {
    // A selector does not change what shape the stem ends in, so a suffix
    // conditioned on `vowel` must still see the A.
    expect(finalLetter('nay1ma')).toBe(A);
    expect(finalLetter('qa1n')).toBe(NA);
  });

  it('is undefined when there is no letter at all', () => {
    expect(finalLetter('')).toBeUndefined();
    expect(finalLetter('-')).toBeUndefined();
    expect(finalLetter('???')).toBeUndefined();
  });
});

describe('fromScript', () => {
  it('round-trips the plain alphabet', () => {
    expect(fromScript(toScript('mongγul'))).toBe('mongγul');
    expect(fromScript(toScript('bičig'), 'feminine')).toBe('bičig');
  });

  it('picks the allograph by harmony', () => {
    expect(fromScript('ᠭᠠᠯ', 'masculine')).toBe('γal');
    expect(fromScript('ᠭᠠᠯ', 'feminine')).toBe('gal');
  });

  it('round-trips a variation selector back to its digit', () => {
    expect(fromScript(toScript('nay1ma'))).toBe('nay1ma');
    expect(fromScript(`ᠠ${FVS4}`)).toBe('a4');
  });

  it('round-trips the connector', () => {
    expect(fromScript(toScript('qar-a'))).toBe('qar-a');
  });

  it('passes unknown code points through unchanged', () => {
    expect(fromScript('abc')).toBe('abc');
  });
});
