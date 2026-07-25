/**
 * The Hudum suffix registry — canonical machine form of
 * `skills/mongol-bichig/references/suffixes.md`, which is the normative
 * document and carries the sourcing, the errata log and the caveats.
 *
 * 63 connector-joined entries plus 4 space-joined words. Compiled 2026-07-25
 * from Mongolian school grammar tables (тийн ялгалын хүснэгт), UTN #57 v4
 * (2024-08-14) and the mongfontbuilder particle shaping registry; merged into
 * this single canonical form 2026-07-26 from the two copies that had grown in
 * gege-linter and gege-converter.
 *
 * ## Why rows are written in romanization
 *
 * Only `translit` is authored. The bichig `sequence` and the `harmony` class
 * are *derived* from it at load (see `../suffixes.ts`), which means:
 *
 * - no invisible character is ever typed as a literal — `-` is the MVS, so
 *   even ᠯᠤᠭ⟨MVS⟩ᠠ is just `luγ-a`;
 * - a row cannot disagree with itself;
 * - `test/suffixes.test.ts` checks every derived sequence against the
 *   normative **Code points** column in `suffixes.md`, so a typo here fails
 *   the build instead of shipping malformed Unicode.
 *
 * ## What is deliberately NOT here
 *
 * Khalkha Cyrillic *surface-form* pairings (which of -ын/-ийн maps to which
 * allomorph under which condition) live in gege-converter, flagged as that
 * package's own unreviewed work. The `cyrillic` field below is the gloss
 * printed in the reference tables — a human label, not a conversion rule.
 */

import type { AttachCondition, Join, SuffixCategory } from '../types.js';

/** A row as authored: everything that is not mechanically derivable. */
export interface SuffixRow {
  readonly translit: string;
  readonly cyrillic: string;
  readonly category: SuffixCategory;
  readonly after: AttachCondition;
  readonly join: Join;
  readonly registry: boolean;
}

export const suffixRows: readonly SuffixRow[] = [
  // ── Genitive — харьяалахын тийн ялгал ────────────────────────────────────
  // For u/ü the н belongs to the *stem* in bichig (ᠬᠠᠭᠠᠨ ᠤ = хааны).
  {
    translit: 'yin',
    cyrillic: '-ийн/-ын',
    category: 'genitive',
    after: 'vowel',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'un',
    cyrillic: '-ын',
    category: 'genitive',
    after: 'consonant-not-n',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'ün',
    cyrillic: '-ийн',
    category: 'genitive',
    after: 'consonant-not-n',
    join: 'mvs',
    registry: true,
  },
  { translit: 'u', cyrillic: '-ы', category: 'genitive', after: 'n', join: 'mvs', registry: true },
  { translit: 'ü', cyrillic: '-ий', category: 'genitive', after: 'n', join: 'mvs', registry: true },

  // ── Accusative — заахын тийн ялгал ───────────────────────────────────────
  {
    translit: 'yi',
    cyrillic: '-г',
    category: 'accusative',
    after: 'vowel',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'i',
    cyrillic: '-ыг/-ийг',
    category: 'accusative',
    after: 'consonant',
    join: 'mvs',
    registry: true,
  },

  // ── Dative-locative — өгөх оршихын тийн ялгал ────────────────────────────
  // d-forms after vowels and the soft finals н, м, л, нг; t-forms after the
  // hard finals б, г, р, с, д. The -r forms are the fuller classical variants.
  {
    translit: 'du',
    cyrillic: '-д',
    category: 'dative-locative',
    after: 'vowel-or-soft',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'dü',
    cyrillic: '-д',
    category: 'dative-locative',
    after: 'vowel-or-soft',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'dur',
    cyrillic: '-д',
    category: 'dative-locative',
    after: 'vowel-or-soft',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'dür',
    cyrillic: '-д',
    category: 'dative-locative',
    after: 'vowel-or-soft',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'tu',
    cyrillic: '-т',
    category: 'dative-locative',
    after: 'hard',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'tü',
    cyrillic: '-т',
    category: 'dative-locative',
    after: 'hard',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'tur',
    cyrillic: '-т',
    category: 'dative-locative',
    after: 'hard',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'tür',
    cyrillic: '-т',
    category: 'dative-locative',
    after: 'hard',
    join: 'mvs',
    registry: true,
  },

  // ── Ablative — гарахын тийн ялгал ────────────────────────────────────────
  {
    translit: 'acha',
    cyrillic: '-аас/-оос',
    category: 'ablative',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'eche',
    cyrillic: '-ээс/-өөс',
    category: 'ablative',
    after: 'any',
    join: 'mvs',
    registry: false,
  },

  // ── Instrumental — үйлдэхийн тийн ялгал ──────────────────────────────────
  {
    translit: 'bar',
    cyrillic: '-аар/-оор',
    category: 'instrumental',
    after: 'vowel',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'ber',
    cyrillic: '-ээр/-өөр',
    category: 'instrumental',
    after: 'vowel',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'iyar',
    cyrillic: '-аар/-оор',
    category: 'instrumental',
    after: 'consonant',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'iyer',
    cyrillic: '-ээр/-өөр',
    category: 'instrumental',
    after: 'consonant',
    join: 'mvs',
    registry: true,
  },

  // ── Comitative — хамтрахын тийн ялгал ────────────────────────────────────
  // May also be written *attached* to the stem — writer's choice, both valid,
  // so a linter must accept attached ᠲᠠᠢ with no preceding connector.
  {
    translit: 'tai',
    cyrillic: '-тай',
    category: 'comitative',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'tei',
    cyrillic: '-тэй',
    category: 'comitative',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'luγ-a',
    cyrillic: 'лугаа',
    category: 'comitative',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'lüge',
    cyrillic: 'лүгээ',
    category: 'comitative',
    after: 'any',
    join: 'mvs',
    registry: true,
  },

  // ── Reflexive-possessive — хамаатуулах нөхцөл ────────────────────────────
  // Stacks after a case suffix (задлаг хэлбэр); each piece gets its own MVS.
  {
    translit: 'ban',
    cyrillic: '-аа/-оо',
    category: 'reflexive',
    after: 'vowel',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'ben',
    cyrillic: '-ээ/-өө',
    category: 'reflexive',
    after: 'vowel',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'iyan',
    cyrillic: '-аа/-оо',
    category: 'reflexive',
    after: 'consonant',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'iyen',
    cyrillic: '-ээ/-өө',
    category: 'reflexive',
    after: 'consonant',
    join: 'mvs',
    registry: true,
  },

  // ── Plural — олон тооны дагавар ──────────────────────────────────────────
  {
    translit: 'ud',
    cyrillic: '-ууд',
    category: 'plural',
    after: 'consonant',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'üd',
    cyrillic: '-үүд',
    category: 'plural',
    after: 'consonant',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'nuγud',
    cyrillic: '-ууд',
    category: 'plural',
    after: 'vowel',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'nügüd',
    cyrillic: '-үүд',
    category: 'plural',
    after: 'vowel',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'nar',
    cyrillic: 'нар',
    category: 'plural',
    after: 'people',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'ner',
    cyrillic: 'нэр',
    category: 'plural',
    after: 'people',
    join: 'mvs',
    registry: false,
  },

  // ── Fused case + reflexive / clitic combinations ─────────────────────────
  // The unregistered rows are the expected harmonic mates of registered ones:
  // valid, absent only because they need no special letter forms.
  {
    translit: 'daγan',
    cyrillic: '-даа/-доо',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'degen',
    cyrillic: '-дээ/-дөө',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'taγan',
    cyrillic: '-таа/-тоо',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'tegen',
    cyrillic: '-тээ/-төө',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'achaγan',
    cyrillic: '-аасаа',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'echegen',
    cyrillic: '-ээсээ',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'duni',
    cyrillic: '-д нь',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'düni',
    cyrillic: '-д нь',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'tuni',
    cyrillic: '-т нь',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'tüni',
    cyrillic: '-т нь',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'daqi',
    cyrillic: '-дахь',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'deqi',
    cyrillic: '-дэхь',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'duγar',
    cyrillic: '-дугаар',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'düger',
    cyrillic: '-дүгээр',
    category: 'fused',
    after: 'any',
    join: 'mvs',
    registry: true,
  },

  // ── Possessive clitics ───────────────────────────────────────────────────
  // Standard detached clitics, MVS-joined. Absent from the shaping registry
  // only because they need no special letter forms; found missing when
  // corpus-linting gege.mn's blog (2026-07-25).
  {
    translit: 'ni',
    cyrillic: 'нь',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'mini',
    cyrillic: 'минь',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: false,
  },
  {
    translit: 'chini',
    cyrillic: 'чинь',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: false,
  },

  // ── Other MVS-joined particles from the UTN #57 registry ─────────────────
  // Cyrillic glosses here are best-guess; '?' marks an unconfirmed one. See
  // the "Registry entries not yet in scope" table in suffixes.md for the
  // per-row confidence ratings.
  {
    translit: 'chu',
    cyrillic: 'ч',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'chü',
    cyrillic: 'ч',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'yüm',
    cyrillic: 'юм',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'yümsen',
    cyrillic: 'юмсан',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'da',
    cyrillic: '-да',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'de',
    cyrillic: '-дэ',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'dag',
    cyrillic: '-даг?',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'deg',
    cyrillic: '-дэг?',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'yügen',
    cyrillic: '?',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  {
    translit: 'nügen',
    cyrillic: '?',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },
  // suffixes.md prints this as `hü`; `k` is the front-vowel reading of QA
  // (U+182C) in Classical romanization, and `h` has no letter to map to.
  {
    translit: 'kü',
    cyrillic: 'кү',
    category: 'particle',
    after: 'any',
    join: 'mvs',
    registry: true,
  },

  // ── Space-joined words — plain U+0020, NEVER a connector ─────────────────
  // These exist so `space-before-suffix` can whitelist them: a space here is
  // correct and an MVS is the error. ügei in particular is an ordinary
  // separate word — bichig does not make Cyrillic's -гүй contraction, so
  // санамсаргүй is ᠰᠠᠨᠠᠮᠰᠠᠷ + space + ᠦᠭᠡᠢ.
  {
    translit: 'uu',
    cyrillic: 'уу',
    category: 'question',
    after: 'any',
    join: 'space',
    registry: true,
  },
  {
    translit: 'üü',
    cyrillic: 'үү',
    category: 'question',
    after: 'any',
    join: 'space',
    registry: true,
  },
  {
    translit: 'büü',
    cyrillic: 'бүү',
    category: 'particle',
    after: 'any',
    join: 'space',
    registry: true,
  },
  {
    translit: 'ügei',
    cyrillic: 'үгүй / -гүй',
    category: 'negation',
    after: 'any',
    join: 'space',
    registry: false,
  },
];
