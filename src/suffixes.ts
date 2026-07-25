/**
 * The Hudum suffix registry, resolved.
 *
 * Authored rows carry only what cannot be derived (see `data/suffixes.ts`);
 * this module derives the bichig `sequence` and the `harmony` class from the
 * Classical romanization, so the two can never drift apart.
 */

import { harmonyOf } from './chars.js';
import { suffixRows } from './data/suffixes.js';
import { toScript } from './romanize.js';
import type { SuffixEntry } from './types.js';

const resolve = (): readonly SuffixEntry[] =>
  suffixRows.map((row) => {
    const sequence = toScript(row.translit);
    return { ...row, sequence, harmony: harmonyOf(sequence) };
  });

/**
 * Every entry: connector-joined suffixes **and** the space-joined words.
 * Most callers want `connectorSuffixes` instead.
 */
export const suffixes: readonly SuffixEntry[] = resolve();

/**
 * Suffixes joined by the connector (MVS U+180E; legacy text uses NNBSP).
 * This is the dictionary a linter matches a post-connector letter run against.
 */
export const connectorSuffixes: readonly SuffixEntry[] = suffixes.filter((s) => s.join === 'mvs');

/**
 * Words that follow a plain space and must never be connector-joined —
 * ᠤᠤ/ᠦᠦ/ᠪᠦᠦ and ᠦᠭᠡᠢ. A space before these is correct; an MVS is the bug.
 */
export const spaceParticles: readonly SuffixEntry[] = suffixes.filter((s) => s.join === 'space');

/** Look up an entry by its Classical romanization. */
export const suffixByTranslit = (translit: string): SuffixEntry | undefined =>
  suffixes.find((s) => s.translit === translit);

/**
 * Connector-joined entries whose letter sequence matches the start of `run`,
 * longest first — the greedy-match order a linter needs.
 */
export const suffixesMatching = (run: string): SuffixEntry[] =>
  connectorSuffixes
    .filter((s) => run.startsWith(s.sequence))
    .sort((a, b) => [...b.sequence].length - [...a.sequence].length);
