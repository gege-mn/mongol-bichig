/**
 * @gege-mn/mongol-bichig — canonical data and primitives for traditional
 * Mongolian script.
 *
 * The prose knowledge base this data is compiled from lives in
 * `skills/mongol-bichig/references/` in the same repository, and is installable
 * as an agent skill: `npx skills add gege-mn/mongol-bichig`.
 */

export {
  cp,
  FVS,
  harmonyOf,
  isDigit,
  isHudumLetter,
  isMongolLetter,
  isVowel,
  MVS,
  NIRUGU,
  NNBSP,
  prevBaseCp,
  uplus,
  ZWJ,
  ZWNJ,
} from './chars.js';
export type { SuffixRow } from './data/suffixes.js';
export { suffixRows } from './data/suffixes.js';
export {
  finalLetter,
  fromScript,
  isRomanizable,
  RomanizationError,
  toScript,
} from './romanize.js';
export {
  connectorSuffixes,
  spaceParticles,
  suffixByTranslit,
  suffixes,
  suffixesMatching,
} from './suffixes.js';
export type {
  AttachCondition,
  Harmony,
  Join,
  SuffixCategory,
  SuffixEntry,
} from './types.js';
