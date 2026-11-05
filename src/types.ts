/** Vowel-harmony class of a stem or suffix. */
export type Harmony = 'masculine' | 'feminine' | 'neutral';

/** Grammatical role of a suffix or particle. */
export type SuffixCategory =
  | 'genitive'
  | 'accusative'
  | 'dative-locative'
  | 'ablative'
  | 'instrumental'
  | 'comitative'
  | 'reflexive'
  | 'plural'
  | 'fused'
  | 'possession'
  | 'particle'
  | 'question'
  | 'negation';

/**
 * What a suffix may attach to, normalised from the "Use after" column of
 * `skills/mongol-bichig/references/suffixes.md`. The school-grammar groups
 * are: any vowel · word-final ᠨ · the soft finals м, л, нг · the hard
 * finals б, г, р, с, д.
 *
 * The condition reads the **Classical** stem, never a Cyrillic one: Cyrillic
 * хот is consonant-final but Classical `qota` is not, so хотын is `qota-yin`.
 */
export type AttachCondition =
  | 'vowel'
  | 'consonant'
  | 'consonant-not-n'
  | 'n'
  | 'vowel-or-n'
  | 'vowel-or-soft'
  | 'hard'
  | 'people'
  | 'any';

/** How the suffix is joined to its stem. */
export type Join =
  /** Suffix connector, MVS U+180E (legacy text uses NNBSP U+202F). */
  | 'mvs'
  /** An ordinary space — these are separate words, never connector-joined. */
  | 'space';

/**
 * One row of the Hudum suffix registry.
 *
 * `translit` is authored; `sequence` and `harmony` are derived from it, so a
 * row can never disagree with itself and no invisible character is ever
 * typed as a literal. See `src/data/suffixes.ts`.
 */
export interface SuffixEntry {
  /**
   * Letters only, without the leading connector. May contain a word-internal
   * MVS (only ᠯᠤᠭ⟨MVS⟩ᠠ does). Derived from `translit`.
   */
  readonly sequence: string;
  /** Classical romanization; `toScript(translit) === sequence`. */
  readonly translit: string;
  /** Khalkha Cyrillic gloss; `'?'` where unconfirmed. */
  readonly cyrillic: string;
  readonly category: SuffixCategory;
  /** Derived from the vowels of `sequence`. */
  readonly harmony: Harmony;
  readonly after: AttachCondition;
  readonly join: Join;
  /**
   * Present in the UTN #57 / mongfontbuilder particle **shaping** registry.
   *
   * `false` does not mean invalid — that registry only lists particles some
   * of whose letters take particle-specific written forms, so entries that
   * shape by default rules (ᠪᠠᠷ, ᠲᠠᠢ, ᠡᠴᠡ, ᠨᠤᠭᠤᠳ …) are simply absent.
   * It can confirm an entry but never refute one.
   */
  readonly registry: boolean;
}

/** Where a letter sits in its word: isolate, initial, medial or final. */
export type JoiningPosition = 'isol' | 'init' | 'medi' | 'fina';

/**
 * What an FVS after a letter means in **Hudum** text. See `fvsStatus`.
 *
 * - `registered`: Hudum lets this FVS select a form here.
 * - `not-in-use`: Unicode 18.0 keeps the sequence only for old
 *   implementations and says not to use it.
 * - `other-writing-system`: valid in Todo, Sibe, Manchu or Ali Gali text,
 *   not in Hudum.
 * - `unregistered`: no writing system registers it in mongfontbuilder. UCD 18.0
 *   still lists two Ali Gali rows without positions, U+1880 and U+1881 + FVS1.
 */
export type FvsStatus = 'registered' | 'not-in-use' | 'other-writing-system' | 'unregistered';

/** One form Hudum lets an FVS select, from mongfontbuilder's MNG locale. */
export interface FvsRegistration {
  /** Code point of the letter. */
  readonly base: number;
  readonly position: JoiningPosition;
  /** 1–4: FVS1 U+180B, FVS2 U+180C, FVS3 U+180D, FVS4 U+180F. */
  readonly fvs: number;
  /**
   * The FVS selects the form shaping would pick anyway. Not redundant: it
   * pins the form against context, e.g. MVS + a + FVS cancels chachlag.
   */
  readonly selectsDefault: boolean;
  /** Pre-contemporary orthography only (dotted isolated I/U, kaph G …). */
  readonly archaic?: true;
  /** Registered, but the standard advises against it. */
  readonly unrecommended?: true;
}
