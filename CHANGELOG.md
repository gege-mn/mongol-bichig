# Changelog

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
