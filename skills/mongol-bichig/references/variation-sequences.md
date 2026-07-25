# FVS variation sequences — the registry for `fvs-unregistered`

Researched 2026-07-25. Sources: StandardizedVariants.txt (17.0.0, 2025-07-30,
plus historical versions 4.1–17.0 diffed), mongfontbuilder
`lib/mongfontbuilder/data/variants.json` (commit `539b45507548`, 2026-07-10),
UTN #57 v4, core spec §13.5 (16.0/17.0), L2/20-057. Invisibles as `U+XXXX`:
FVS1 U+180B, FVS2 U+180C, FVS3 U+180D, FVS4 U+180F, MVS U+180E.

## Which registry to trust — the headline finding

**Neither the UCD nor UTN #57 contains the other.**

- UCD StandardizedVariants.txt: 60 Mongolian (base, selector) pairs = 93
  (base, selector, position) triples — 91 explicit position tokens summed
  across the 60 lines, plus 1 each for the two blank-position entries
  (U+1880/U+1881; re-deriving from the raw file gives 91 first).
  **Frozen since Unicode 4.1 (2005)** in
  membership (the 2017 edit was purely editorial: 64→60 lines, uniform
  "second/third/fourth form" naming, zero pairs added or removed).
  **Zero FVS4 sequences.**
- mongfontbuilder (= living UTN #57): 252 triples across all locales
  (deduplicated — summing per-locale registrations gives 438); the
  Hudum (MNG) locale has **107** registered triples.
- Of the 43 UCD Hudum triples, 39 are in MNG; **4 are not** (U+1820 medi
  FVS2, U+1835 medi FVS1 — in *no* locale; U+1828 medi FVS3 and U+1830 fina
  FVS2 — only in Manchu Ali Gali). The MNG locale has **68 triples the UCD
  lacks**, including all of SHA U+1831 and everything FVS4.
- The core spec *itself* declares the UCD list defective: "The list of
  standardized variants … has not yet been updated to synchronize with …
  Unicode Technical Note #57 … This defect will be addressed in a future
  version." L2/26-091 (2026-04) proposes deprecating the UCD set outright.

**Rule: validate against the vendored mongfontbuilder registry.** Treat the
UCD-only leftovers as a distinct "legacy-registered" set (technically still
standardized, meaningless in the current model — distinct message, info
severity). Validating against StandardizedVariants.txt alone would mark
modern canonical text (e.g. dotless SHA via U+1831 + FVS1) as invalid *and*
bless dead sequences.

## What an FVS means

Current model: **FVSn is a fixed index into that letter's per-position
variant registry**, aligned with GB/T 25914—2023's "first/second/third/fourth
form" glyph numbering. Three non-obvious properties:

1. **Same FVS, same letter, different meaning per position.** QA + FVS2 =
   feminine G form in init/medi but "third isolated form" in isol; A + FVS2 =
   chachlag Aa in isol but the default in fina.
2. **Defaults are deliberately FVS-selectable** (31 of the 107 MNG triples
   select the form default shaping would produce). This is *load-bearing*,
   not redundant — it pins a form against context. Canonical case:
   `MVS + a/e + FVS` cancels chachlag (UTN #57: "a e if follows an MVS and
   precedes an FVS: Default"). A naive "redundant FVS" rule would flag
   correct text.
3. **An FVS can change a *neighboring* character's form**: ö/ü final takes
   the marked form "if … follows an FVS2 or FVS4 that follows h or g in
   initial position" — an EAC-mandated wart UTN #57 acknowledges. FVS is not
   a pure postfix modifier.

Pre-2017, FVS meanings were the vague 2005 chart descriptions and vendors
implemented mutually incompatible assignments (Menksoft vs Baiti vs Founder).
Sharpest legacy trap: U+182C/U+182D + FVS3 medial is "fourth form" per the
frozen UCD but selects the *first/masculine* H form in the current model —
the fourth (double-dotted) form moved to **FVS4**. Same bytes, different
glyph across model generations; not warnable from bytes alone, but document
it. mongfontbuilder's docs say bluntly: do **not** implement from UTR #54's
variant tables.

**FVS4 (U+180F)**, encoded Unicode 14.0 via L2/20-057, exists solely for
pre-contemporary orthography (dotted isolated I/U, double-dotted kaph G on
QA/GA). Only QA and GA take FVS4 in Hudum. It has zero UCD registrations.

## The Hudum quick-reference table

A (letter, FVSn) pair outside this table is unregistered in Hudum in *every*
position (pair-level check — cheap, no position inference needed):

| Letter | Valid FVS numbers |
|---|---|
| U+1820 A | 1, 2, 3 |
| U+1821 E | 1, 2 |
| U+1822 I | 1, 2, 3 |
| U+1823 O | 1, 2 |
| U+1824 U | 1, 2, 3 |
| U+1825 OE | 1, 2, 3 |
| U+1826 UE | 1, 2, 3 |
| U+1828 NA | 1, 2 |
| U+182A BA | 1 |
| U+182C QA | 1, 2, 3, 4 |
| U+182D GA | 1, 2, 3, 4 |
| U+1830 SA | 1 |
| U+1831 SHA | 1, 2 |
| U+1832 TA | 1, 2 |
| U+1833 DA | 1, 2 |
| U+1835 JA | 1 |
| U+1836 YA | 1, 2, 3 |
| U+1838 WA | 1 |

**17 Hudum letters take no FVS at all** — any FVS after them is unregistered:
U+1827 EE, U+1829 ANG, U+182B PA, U+182E MA, U+182F LA, U+1834 CHA,
U+1837 RA, and all galig letters U+1839–U+1842.

Position-aware refinement (second tier, optional): e.g. U+1820 + FVS3 is
registered in isol only; U+1820 + FVS4 is registered nowhere (and Noto
v3.002 renders it as a visible `fvs4` marker — verified by hb-shape). The
full 107-triple table with written units, default flags, `archaic`/
`unrecommended` status and GB form names lives in the vendored data; the
schema is below.

## variants.json schema notes (vendoring traps)

```
variants[characterName][position]["0"|"1"|"2"|"3"|"4"] = {
  written: WrittenUnitID[] | [position, fvs, locale?],  // or cross-reference
  default?: true,
  locales: { MNG?/MNGx?/TOD?/TODx?/SIB?/MCH?/MCHx?: {
    conditions?: string[], archaic?: true, unrecommended?: true,
    gb?: string, eac?: string } }
}
```

- **Key `"0"` means "context-only form, no FVS assigned" — not FVS0.**
  Off-by-one trap.
- `written: ["init", 4]` is a cross-reference ("fabricated variant").
- A `default: true` entry *with* an FVS number means the default is
  explicitly selectable (see load-bearing defaults above).
- Locale is a **text-level property, not a code-point property**: the same
  letter has different registrations per locale (U+1828 medial FVS3 is valid
  only as Manchu Ali Gali). A Hudum linter validates against MNG (+ MNGx for
  Buddhist text) only. Locale triple counts: MNG 107, MNGx 22, TOD 46,
  TODx 36, SIB 59, MCH 71, MCHx 97.
- The three `unrecommended` Hudum variants (JA fina FVS1, YA medi FVS2,
  WA medi FVS1) exist only in this data — UCD DoNotEmit.txt has zero
  Mongolian entries.
- If parsing raw StandardizedVariants.txt: the U+1880/U+1881 lines have an
  **empty positions field** — a positions-required parser silently drops them.

## Linter rules derived

1. **Placement (`fvs-placement`, shipped)** — normative backing, core spec:
   a selector "immediately follows the base character it modifies"; any FVS
   "not immediately preceded by one of their defined base characters will be
   ignored". FVS after space/NNBSP/MVS/digit/punctuation/another FVS/ZWJ/
   string start = dead invisible character → error. Subsumes doubling.
2. **Registration (`fvs-unregistered`, planned)** — pair outside the table
   above → warning. UCD-legacy-only pairs → separate info message
   ("standardized in UCD but meaningless in the current GB/T-2023 model").
   Optional second tier: position-aware via cursive-position derivation.
3. **Legacy ZWJ ordering** — `letter ZWJ FVS` (pre-standard ordering) is a
   dead selector today; flaggable with a mechanical swap fix to
   `letter FVS ZWJ`.
4. **Redundancy: mostly not lintable.** Only safe at info level when the
   selected form provably equals default shaping *and* no context rule
   consults FVS presence (chachlag cancellation, o/u/ö/ü marked-reset,
   neighbor effects). When in doubt, silent.
5. Rendering note: unlike bare MVS (visible in Noto v3), a stray FVS in a
   *legacy* font is typically invisible — silent corruption for search and
   collation. Noto v3.002 renders unregistered/doubled FVS as visible
   `fvsN` marker glyphs (deliberate misuse-visibility; see
   `fonts-and-rendering.md`).

## Provenance for vendored data

When implementing rule 9, vendor `lib/mongfontbuilder/data/variants.json`
(MIT, commit `539b45507548`, 2026-07-10) plus a derived per-letter MNG
valid-FVS table and the UCD-legacy-only list. Cite: UTN #57 v4 (2024-08-14),
StandardizedVariants-17.0.0.txt (2025-07-30), GB/T 25914—2023.
Useful test-case source: r12a.github.io/mongolian-variants/ (2016-era model —
good for *legacy* divergence cases, not current validation).
