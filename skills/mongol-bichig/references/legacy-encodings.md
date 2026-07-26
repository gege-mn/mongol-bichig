# Legacy encodings and input methods — where broken text comes from

Researched 2026-07-25. Key sources: Tergel Teneg, "The Digitisation Odyssey
of the Mongolian Script in Unicode", *Inner Asia* 27 (2025), CC BY (read in
full); Batjargal et al., "A Study of Traditional Mongolian Script Encodings
and Rendering", IJALP 21(1) 2011 (its Table 7 is the legacy-encoding Rosetta
stone); suragch/mongol_code source; L2/18-293, L2/18-294; kbdlayout.info.

Vocabulary: **phonetic model** = standard Unicode (letters, font shapes);
**graphetic model** = one code point per written glyph form (all the PUA
schemes below).

## Menksoft PUA — what `no-pua` is really catching

- **Hudum range: U+E234–U+E34F** (confirmed twice over: Batjargal Table 7 +
  mongol_code constants). Full multi-script range U+E234–U+E71D
  (Todo/Manchu/Sibe/etc. above U+E34F).
- Internal structure: punctuation U+E234–E243 (birga U+E234, comma U+E236,
  full stop U+E237, nirugu U+E23E …), digits U+E244–E24D, more punctuation
  to ~U+E263, letter forms U+E264 (A isolate) – U+E34F.
- Pure graphetic: one point per *positional/variant form*; graphically
  identical forms **share** a point across letters (mongol_code: the QA and
  GA isolate-FVS4 forms are both U+E2D1) — the mirror image of Unicode's
  homograph problem. ⚠ Batjargal 2011's example "O-final = UE-final =
  U+E2A3" conflicts with mongol_code (oFina = U+E285; U+E2A3 is UE-only) —
  the two cited sources disagree here.
- Menksoft PUA also circulates as GB18030 bytes (all BMP PUA round-trips);
  after decoding, the linter only ever sees U+Exxx.
- **Menksoft itself has migrated to standard Unicode** (Teneg 2025) and sells
  PUA→Unicode conversion services. Fresh PUA text now comes mostly from old
  documents, un-migrated Inner-Mongolian websites, and *other* vendors:
  **Saiyin** (U+E235–E354 — nearly Menksoft's exact band, incompatible
  assignments, **still graphetic in 2025**) and **Z Mongol** (graphetic,
  current).

Other PUA/legacy schemes worth recognizing:

| Scheme | Signature | Notes |
|---|---|---|
| Boljoo IME (2006) | U+E610–E7BD | ligature-based (shorter runs) |
| MongolUsug font | U+E000–E811 | Unicode + PUA hybrid; Mongolian PUA *below* U+E234 suggests this |
| MongolianScript font (Erdenechimeg Myatav — Batjargal §3.4.2) | U+F300–F3B0, U+F400–F4C1 | usually mixed with standard U+1800 text |
| CMs fonts (CMs Ulaanbaatar/Huree/Urga) | plain ASCII bytes ("FeB" = abu) | Mongolia's de-facto DTP standard until ~2007; unrecoverable without the font, invisible to a code-point linter |
| GB 8045-1987 | high-bit single bytes | no surviving corpora found |

### Detection heuristics (for a future smarter `no-pua`)

1. Mongolian words = 2–15 glyph forms → **contiguous runs of ≥3 PUA points**
   between spaces; icon-font PUA appears as isolated single points.
2. Band concentration: ~all PUA inside U+E234–E71D (especially the letter
   zone U+E264–E34F) → Menksoft-family near-certain.
3. Glyph encoding means a point almost never repeats adjacently within a run
   (unlike nominal Unicode where U+1820 may appear 3× per word).
4. Interleaved U+E236/E237 (punctuation) or U+E244–E24D (digits) with letter
   runs = strong Menksoft signal.
5. Menksoft vs Saiyin needs mapping-level tests (the *abu* probe: Menksoft
   U+E266 U+E2C6 U+E287 vs Saiyin U+E246 U+E247 U+E25C); score runs against
   mongol_code's table.
6. Suggested diagnostic enhancement: ≥80% of flagged points in U+E234–E71D
   with median run ≥3 → annotate "likely Menksoft-encoded glyph text —
   mechanically convertible (e.g. suragch/mongol_code, CC0, rewritten to
   GB/T 25914-2023)".

## The IME landscape (2024–2026) — what keyboards actually emit

**The headline: no mainstream keyboard is confirmed to emit MVS for suffixes
yet (as of 2026-07).** Every documented layout still exposes/teaches NNBSP.
Expect NNBSP-joined suffixes in keyboard-produced text for years — that is
`nnbsp-legacy`'s entire caseload.

| Input | Platform | Suffix connector | Notes |
|---|---|---|---|
| "Traditional Mongolian (Standard)" KBDMONST | Windows 10/11 | **NNBSP** (unshifted, on the hyphen-position key; Shift there = MVS) | dumb layout; also keys for FVS1–3, nirugu; unchanged for Unicode 16 |
| Almas Mongolian Keyboard | iOS/macOS | **NNBSP** (capital S) | mongolfont.com (Almas Inc, Tokyo); FVS1 on capital D |
| studymongolian macOS keyboard v2.0 | macOS | **NNBSP** (Shift+Space) | MVS on accent key |
| Mongolia's dominant keyboard (vendor unnamed here) | Win/macOS/Linux/web | NNBSP (docs) | 3.7M+ downloads claimed. Ships a "refined phonetic model" — **confirmed NOT UTN #57** (Teneg 2025 fn 3); its "approved by Unicode experts" marketing was denied by three UTC members (fn 24) |
| Menksoft IME (desktop + mobile 2022) | Win/Android/iOS | standard-Unicode claimed; connector UNVERIFIED | Inner Mongolia's classic IME, now standard-encoding |
| Delehi 德力海 | Android/iOS/Win | standard Unicode; connector UNVERIFIED | dominant on Inner-Mongolian mobile; bundles a non-standard→standard converter |
| Gboard / Apple built-in | — | — | no traditional-script Mongolian support found at all |

**The U+1888/U+1889 story** (why `wrong-block`'s headline fix exists):
A Mongolian keyboard vendor formally proposed separate KE/GE letters
(L2/18-294, 2018, with a 41,808-lemma frequency analysis); Unicode did not
adopt; that vendor ships separate He/Ge keys anyway; the only standard code
points whose glyphs match are Ali Gali U+1888/U+1889. No public document
closes the final link (that the keyboard emits exactly those) — it would take
a keystroke test of it. The project's own hb-view-verified look-alike finding and
fix mapping stand on their own.

## Documented real-world corpus hazards

Each maps to a rule:

1. **NNBSP → plain space corruption** (→ `space-before-suffix`): "Some
   applications directly replace NNBSP by SPACE" (L2/18-293); MS Word
   word-count/selection regressions (worked 2007–2013, broke in 2016); and —
   widely repeated but **never primary-sourced** (treat as unverified) — a
   2017 Wikimedia bot said to have converted every NNBSP in Mongolian/Manchu
   wikitext to U+0020. This rule targets a mass-produced corruption, not
   just hand-typos.
2. **Suffix renders word-initial after a mangled connector** — *nom-un*
   misreads as *nom on* (L2/18-293 §2.2). The visual story in the README.
3. **Homograph vowel chaos** (→ future harmony rules): users type whichever
   of O/U, OE/UE renders — "proliferation of homographs" degrading search
   and NLP (Wang/Shi/Chen 2016).
4. **Font-driven FVS sprinkling** (→ `fvs-placement`/`fvs-unregistered`):
   to get feminine GA, MongolianScript users typed FVS1, Baiti users FVS2,
   Noto users nothing (L2/18-294 fig. 1) — typing habits forked the corpus
   per font.
5. **Mixed PUA + Unicode ecosystems** (→ `no-pua`): PUA text is invisible to
   search engines; "the script still cannot be easily searched on the
   internet" (Teneg 2025).
6. **Regional KA/KHA split** (→ possible future rule): U+183A vs U+183B
   taught with opposite values in Inner Mongolia vs Mongolia (see
   `script-styles.md`).

## Conversion tooling to point users at

- **suragch/mongol_code** (Dart, CC0) — bidirectional Unicode ↔ Menksoft
  PUA; v1.0 rewritten per GB/T 25914-2023. The obvious "convert with X"
  citation; its tables double as a verification oracle. Java sibling:
  suragch/mongol-library.
- **Kushim-Jiang/mongfontbuilder** (MIT) — the UTN #57 machine-readable data
  this project vendors.
- Menksoft's own PUA→Unicode converters (commercial); Delehi's bundled
  converter; the dominant Mongolian keyboard's bundled converter, tied to a
  non-UTN model.
- Cyrillic ↔ bichig: trans.mglip.com (Inner Mongolia University),
  tugstugi/bichig2cyrillic (neural). OCR: ocr.mglip.com.
- BabelPad (Andrew West) — Windows editor with its own Mongolian rendering.
