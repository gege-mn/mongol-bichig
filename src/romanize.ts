/**
 * Classical Mongolian romanization ↔ Unicode Mongolian script (Hudum).
 *
 * Every data file in this package writes Classical forms in romanization
 * rather than as bichig literals, because romanization is auditable by eye
 * and diffs readably. This module is the single place that turns those into
 * script, so a mistake here is caught once by tests rather than silently
 * baked into thousands of unreadable data rows.
 *
 * Conventions
 * - `-` marks a chachlag / suffix connector and becomes MVS (U+180E).
 * - `.` forces a letter boundary and is otherwise ignored, so `n.g` is
 *   NA+GA rather than the ANG ligature that bare `ng` produces.
 * - ASCII aliases: `gh`=γ, `ch`=č, `sh`=š, `j`=ǰ, `v`=w.
 * - q/k and γ/g are the back/front readings of the same two letters
 *   (U+182C, U+182D), exactly as in Classical romanization.
 * - Loan and Ali Gali letters (KA, KHA, HAA, ZRA, LHA, ZHI, CHI) are
 *   deliberately unmapped — emitting them from native vocabulary would be a
 *   wrong-block error, so an attempt to do so throws instead.
 */

import type { Harmony } from './types.js';

/** Suffix connector / chachlag. */
const MVS_CP = 0x180e;

const ROMAN_TO_CP: ReadonlyArray<readonly [string, number]> = [
  ['ng', 0x1829],
  ['gh', 0x182d],
  ['ch', 0x1834],
  ['sh', 0x1831],
  ['a', 0x1820],
  ['e', 0x1821],
  ['i', 0x1822],
  ['o', 0x1823],
  ['u', 0x1824],
  ['ö', 0x1825],
  ['ü', 0x1826],
  ['ē', 0x1827],
  ['n', 0x1828],
  ['b', 0x182a],
  ['p', 0x182b],
  ['q', 0x182c],
  ['k', 0x182c],
  ['γ', 0x182d],
  ['g', 0x182d],
  ['m', 0x182e],
  ['l', 0x182f],
  ['s', 0x1830],
  ['š', 0x1831],
  ['t', 0x1832],
  ['d', 0x1833],
  ['č', 0x1834],
  ['ǰ', 0x1835],
  ['j', 0x1835],
  ['y', 0x1836],
  ['r', 0x1837],
  ['w', 0x1838],
  ['v', 0x1838],
  ['f', 0x1839],
  ['c', 0x183c],
  ['z', 0x183d],
  ['-', MVS_CP],
];

/** Longest romanization key first, so digraphs beat their leading letter. */
const KEYS = [...ROMAN_TO_CP].map(([k]) => k).sort((a, b) => b.length - a.length);
const LOOKUP = new Map(ROMAN_TO_CP);

/** Canonical romanization per code point; the two harmony-dependent letters are resolved separately. */
const CP_TO_ROMAN = new Map<number, string>([
  [0x1820, 'a'],
  [0x1821, 'e'],
  [0x1822, 'i'],
  [0x1823, 'o'],
  [0x1824, 'u'],
  [0x1825, 'ö'],
  [0x1826, 'ü'],
  [0x1827, 'ē'],
  [0x1828, 'n'],
  [0x1829, 'ng'],
  [0x182a, 'b'],
  [0x182b, 'p'],
  [0x182e, 'm'],
  [0x182f, 'l'],
  [0x1830, 's'],
  [0x1831, 'š'],
  [0x1832, 't'],
  [0x1833, 'd'],
  [0x1834, 'č'],
  [0x1835, 'ǰ'],
  [0x1836, 'y'],
  [0x1837, 'r'],
  [0x1838, 'w'],
  [0x1839, 'f'],
  [0x183c, 'c'],
  [0x183d, 'z'],
  [MVS_CP, '-'],
]);

export class RomanizationError extends Error {
  constructor(
    message: string,
    readonly input: string,
    readonly offset: number,
  ) {
    super(message);
    this.name = 'RomanizationError';
  }
}

/**
 * Classical romanization → Unicode Mongolian script.
 * Throws `RomanizationError` on any character outside the alphabet above,
 * which turns a typo in a data file into a failing test rather than
 * malformed output.
 */
export function toScript(roman: string): string {
  const src = roman.toLowerCase();
  let out = '';
  let i = 0;
  while (i < src.length) {
    if (src[i] === '.') {
      i += 1;
      continue;
    }
    const key = KEYS.find((k) => src.startsWith(k, i));
    if (key === undefined) {
      throw new RomanizationError(
        `Unmapped character ${JSON.stringify(src[i])} at offset ${i} of ${JSON.stringify(roman)}`,
        roman,
        i,
      );
    }
    const cp = LOOKUP.get(key);
    if (cp !== undefined) out += String.fromCodePoint(cp);
    i += key.length;
  }
  return out;
}

/**
 * Code point of the last Hudum *letter* in a romanized form, or `undefined`
 * when there is none (empty input, or input that does not romanize).
 *
 * Connectors and boundary markers are skipped, so `qar-a` ends in A (U+1820)
 * and `n.g` ends in GA. Callers use this to ask what shape a stem ends in —
 * which allomorph a suffix takes depends on it.
 */
export function finalLetter(roman: string): number | undefined {
  let script: string;
  try {
    script = toScript(roman);
  } catch {
    return undefined;
  }
  const letters = [...script];
  for (let i = letters.length - 1; i >= 0; i -= 1) {
    const cp = letters[i]?.codePointAt(0);
    if (cp !== undefined && cp !== MVS_CP) return cp;
  }
  return undefined;
}

/** True when `roman` maps cleanly onto the Hudum alphabet. */
export function isRomanizable(roman: string): boolean {
  try {
    toScript(roman);
    return true;
  } catch {
    return false;
  }
}

/**
 * Unicode Mongolian script → Classical romanization.
 *
 * Lossy in one respect: U+182C and U+182D each carry two romanizations
 * (q/k, γ/g) chosen by vowel harmony, so `harmony` selects between them.
 * Unknown code points are passed through unchanged.
 */
export function fromScript(script: string, harmony: Harmony = 'masculine'): string {
  const front = harmony === 'feminine' || harmony === 'neutral';
  let out = '';
  for (const ch of script) {
    const cp = ch.codePointAt(0) ?? -1;
    if (cp === 0x182c) out += front ? 'k' : 'q';
    else if (cp === 0x182d) out += front ? 'g' : 'γ';
    else out += CP_TO_ROMAN.get(cp) ?? ch;
  }
  return out;
}
