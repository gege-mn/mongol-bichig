# Changelog

## 0.2.3 — unreleased

A patch number for the same reason 0.2.2 was: both consumers require
`^0.2.0`. **Not purely additive this time**: see Changed.

### Added

- **`=` romanizes the script's hyphen, U+1806**, in `toScript` and
  `fromScript`: `altan=odu` is Алтан-Од.
- **Four possessive clitics**, `mani` (маань), `tani` (тань), `anu` (ану) and
  `inü` (инү), connector-joined like `mini` and `chini`. Ruled 2026-10-11.
- **Two fused suffixes**, `taiγan` (-тайгаа) and `teigen` (-тэйгээ): the
  comitative + reflexive stack -tai-ban / -tei-ben written as one suffix.
  Ruled by a bichig reader 2026-10-11. Joined with MVS like the comitative
  itself; absent from the shaping registry because they shape by default
  rules. A linter reading this table stops reporting them as unknown.

### Changed

- **Plural after a stem in n** is `nuγud`/`nügüd`, not `ud`/`üd` (сонинууд =
  `sonin-nuγud`). `ud`/`üd` are now `after: 'consonant-not-n'`, and
  `nuγud`/`nügüd` take a new condition, `'vowel-or-n'`, added to
  `AttachCondition`. A consumer that switches exhaustively on that type needs
  the new case. Ruled 2026-10-11, following the national rule.

- **`dag`/`deg` are removed** from the connector-joined suffixes. They were a
  low-confidence guess that a registry shaping entry was the habitual
  -даг/-дэг; that ending is always attached to the verb stem and never takes a
  connector. A linter reading this table now reports a connector before it.
  Two entries go and six are added below, so the registry moves from 68
  connector-joined entries to 72 (80 with the space-joined words): a consumer that accepted MVS + `dag` will stop accepting it.

### Documentation

- **What Mongolia's national orthography rule teaches** is recorded in two
  new reference documents, `national-rule.md` and `national-rule-suffixes.md`:
  the lessons in our own words, with the repository owner's rulings where the
  rule and this knowledge base differ. The rule itself is not reproduced.
- **Compound proper names** in `orthography.md`: Mongolia hyphenates a
  vowel-initial second part, Inner Mongolian practice joins it with FVS.
- The mongol-bichig and gege-linter skills point at both.

## 0.2.2 — 2026-07-31

A patch for the same reason 0.2.1 was: both consumers require `^0.2.0`, which
on a `0.x` version pins the minor, so a 0.3.0 would strand them. Everything
here is additive — no existing romanization changes meaning, and no existing
input that parsed now parses differently.

### Added

- **Loan letters can be written down.** `kh` romanizes to KHA (U+183B), the
  letter Cyrillic к takes in a loanword. Ruled by a bichig reader 2026-07-30:
  кирилл is ᠻирилл, confirming the reference converter's spelling directly.

  Loan letters are **digraphs on purpose**, so reaching for one is deliberate
  rather than a typo that happened to land in the right block; single-letter
  keys stay reserved for native vocabulary, which is what keeps `k` meaning the
  harmony-selected U+182C. The digraph is unambiguous by construction — `h`
  alone is unmapped, so no romanization that already parsed can contain `kh` —
  and `fromScript` round-trips it.

  This unblocks `@gege-mn/gege-converter`, which had a reader-confirmed
  spelling for кириллээс and no way to write it: every data row there is
  romanized and asserted to convert, so a word needing a loan letter could not
  be added at all.

- **Documented rulings** in `skills/mongol-bichig/references/suffixes.md`, all
  from a bichig reader on 2026-07-30:
  - §7 **Directive** is confirmed and no longer "⚠ needs confirmation" — one
    bichig form ᠤᠷᠤᠭᠤ for all four Cyrillic surfaces (-руу/-рүү/-луу/-лүү),
    always space-joined, and the л-forms only after a host ending in р. The
    section had been marked open while a *different* section of the same file
    recorded the related 2026-07-27 ruling sixty lines below it.
  - **Word-forming suffixes are not in this registry**, with the one ruled so
    far recorded for its home: -лаг⁴ → `lig`, one form for four surfaces.
  - **Fused case-possessive forms are compositions, not entries** — -ынхаа is
    the genitive plus the reflexive, and the Cyrillic х has no bichig
    counterpart at all.

### Still unmapped

KA, HAA, ZRA, LHA, ZHI and CHI. Each should be added the way KHA was — as a
digraph, on a ruling that says which words take it — not by mapping the block.

## 0.2.1 — 2026-07-27

Data only. A patch rather than a minor **on purpose**: a caret on a `0.x`
version pins the minor, so shipping this as 0.3.0 would strand both
`@gege-mn/gege-linter` and `@gege-mn/gege-converter`, which require `^0.2.0`.
As a patch, both pick it up on their next install with no coordinated release —
the same family-split trap gege-linter 0.3.2 was published to close.

### Added

Nine registry entries, all ruled by a bichig reader on 2026-07-27 from a corpus
draw of the letter runs a linter could not account for, and cross-checked
against L2/17-036 Appendix IV — the only enumerated connector inventory anyone
has published. Provenance and the two dissents are in
`skills/mongol-bichig/references/suffixes.md`.

- **`connectorSuffixes` 63 → 68**: ᠬᠢ and ᠬᠢᠨ (Cyrillic -ынх/-ных, -ныхан) under
  a new `possession` category — confirmed twice over, since Appendix IV lists
  both under "case-bound possession"; ᠶᠤᠭᠠᠨ, the masculine mate of the ᠶᠦᠭᠡᠨ
  already present, whose absence was an oversight; and ᠯᠠ/ᠯᠡ.
- **`spaceParticles` 4 → 8**: ᠰᠢᠭ (шиг), ᠤᠷᠤᠭᠤ (руу/рүү), and ᠰᠠᠨ/ᠰᠡᠨ — words
  that take a plain space and must never be connector-joined.
- **`SuffixCategory` gains `'possession'`.** Additive for consumers that read
  the union; breaking only for an exhaustive `Record<SuffixCategory, …>`.
  gege-converter declares its own copy of the type and is unaffected.

### Notes

- **ᠰᠠᠨ/ᠰᠡᠨ is only the modal** — the wish/regret particle of *тэгэх юм сан*,
  written apart. The past-tense participle -сан/-сэн that looks identical in
  Cyrillic attaches *inside* the word as `gsan`/`gsen` and needs no entry.
- **ᠯᠠ/ᠯᠡ is the weakest-sourced row in the file**: no inventory lists it
  either way, in any era. It rests on the reader's ruling and on class
  membership with ᠨᠢ/ᠮᠢᠨᠢ/ᠴᠢᠨᠢ/ᠳᠠ, which Cyrillic also writes apart while bichig
  connects them. If any row here is later overturned, expect it to be this one.
- **Two deliberate dissents from Appendix IV** are recorded rather than
  followed: ᠤᠷᠤᠭᠤ (the appendix marks the directive "may or may not use NNBSP";
  the reader ruled a connector wrong) and the vocative ᠠ/ᠡ (the appendix writes
  the single vowel with a connector; the reader ruled it a plain space).

## 0.2.0 — 2026-07-26

### Added

- **Variation-selector digits in romanization.** `toScript` maps a digit
  `1`–`4` onto FVS1–FVS4, so `nay1ma` is NA A YA FVS1 MA A (найм). Classical
  romanization has no other use for digits, so the syntax cannot collide with
  a letter. The digit map is derived from the canonical `FVS` map in
  `chars.ts` rather than re-listed, so FVS4 (U+180F) cannot drift into MVS
  (U+180E).
- `fromScript` round-trips a selector back to its digit.
- The module's **first test file** (`test/romanize.test.ts`, 32 cases). It had
  none.

### Changed

- **`finalLetter` now looks through a variation selector**, as it already did
  through MVS and the `.` boundary marker: `finalLetter('nay1ma')` is A, not
  the selector. A selector does not change what shape a stem ends in, so a
  suffix conditioned on `vowel` must still see the vowel.

### Compatibility

Additive. Input that was valid before behaves identically — digits previously
made `toScript` throw and `isRomanizable` return false, so no accepted form
changes meaning. `finalLetter` differs only for input containing a digit,
which previously returned `undefined` via the throw.

`@gege-mn/gege-linter` imports only the character classes and the suffix
registry (`cp`, `FVS`, `harmonyOf`, `isMongolLetter`, `MVS`, `NNBSP`,
`prevBaseCp`, `connectorSuffixes`, `spaceParticles`, …) and none of the
romanization functions, so it is unaffected.

### Notes

This syntax already existed in gege-converter's private copy of `romanize.ts`,
which means the "copied verbatim, will drift" warning written the previous day
was accurate within a day. Porting it up here is the precondition for that copy
becoming a re-export.

## 0.1.0

Initial release: the Hudum suffix registry, Classical romanization, and
Unicode character classes for the Mongolian block.
