/**
 * Which FVS selections Hudum allows, compiled from mongfontbuilder (the living
 * UTN #57) and UCD 18.0. Background and the traps: the reference document
 * `skills/mongol-bichig/references/variation-sequences.md`.
 */

import { hudumFvsRows, notInUseFvsPairs, otherWritingSystemFvsRows } from './data/fvs.js';
import type { FvsRegistration, FvsStatus, JoiningPosition } from './types.js';

/** Every form Hudum lets an FVS select. 107 rows, sorted by letter, position, FVS. */
export const hudumFvs: readonly FvsRegistration[] = hudumFvsRows;

const tripleKey = (base: number, fvs: number, position: JoiningPosition): string =>
  `${base} ${fvs} ${position}`;
const pairKey = (base: number, fvs: number): string => `${base} ${fvs}`;

const index = (rows: ReadonlyArray<{ base: number; fvs: number; position: JoiningPosition }>) => ({
  triples: new Set(rows.map((r) => tripleKey(r.base, r.fvs, r.position))),
  pairs: new Set(rows.map((r) => pairKey(r.base, r.fvs))),
});

const HUDUM = index(hudumFvsRows);
const OTHER = index(otherWritingSystemFvsRows);
const NOT_IN_USE = new Set(notInUseFvsPairs.map((p) => pairKey(p.base, p.fvs)));

/**
 * What FVS number `fvs` (1–4) after the letter `base` means in Hudum text.
 *
 * Without `position` the check is per letter: `registered` when Hudum allows
 * this FVS on the letter in any position. Pass the letter's joining position
 * for the exact answer. For example, A + FVS3 is registered only in isolate.
 *
 * The answers are checked in the order the `FvsStatus` type lists them, so
 * Hudum wins: a pair Hudum registers in one position and only Manchu in
 * another is `registered` when no position is given.
 */
export function fvsStatus(base: number, fvs: number, position?: JoiningPosition): FvsStatus {
  const hit = (set: { triples: Set<string>; pairs: Set<string> }): boolean =>
    position === undefined
      ? set.pairs.has(pairKey(base, fvs))
      : set.triples.has(tripleKey(base, fvs, position));
  if (hit(HUDUM)) return 'registered';
  if (NOT_IN_USE.has(pairKey(base, fvs))) return 'not-in-use';
  if (hit(OTHER)) return 'other-writing-system';
  return 'unregistered';
}
