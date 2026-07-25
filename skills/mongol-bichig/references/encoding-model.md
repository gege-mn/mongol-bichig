# The Unicode encoding model for Mongolian (current: 16.0+, unchanged through 17.0)

Researched 2026-07-25 from primary sources: Unicode 16.0/17.0 core spec §13.5
(diffed — identical prose), the U1800/U11660 code charts (17.0), UCD 17.0 data
files, UAX #14/#29, UTN #57 v4, W3C MLREQ. Project rule applies throughout:
invisible characters are written `U+XXXX`, never as literals.

## The one-paragraph model

Mongolian encodes *phonetic letters*, not glyphs: one code point per letter,
with the rendering font deriving positional forms (isol/init/medi/fina) and
gender forms from context. Three mechanisms adjust the defaults: **MVS**
(U+180E) triggers the separated final a/e (*chachlag*) **and** — since
Unicode 16.0 — joins separated suffixes (particles); **FVS1–4**
(U+180B–180D, U+180F) select registered variant forms; **NNBSP** (U+202F) is
the *legacy* suffix connector, retained only for backward compatibility.
The authoritative shaping registry is UTN #57 (implementing China's
GB/T 25914—2023), referenced by the core spec itself.

## Block inventory (U+1800–18AF)

| Range | Chart subhead | Contents | Age |
|---|---|---|---|
| U+1800–180A | Punctuation | see table below | 3.0 |
| U+180B–180F | Format controls | FVS1–3, MVS, FVS4 | 3.0 (FVS4: **14.0**, 2021) |
| U+1810–1819 | Digits | derived from Tibetan digits; Manchu/Sibe use none | 3.0 |
| U+1820–1842 | **Basic letters** | the unified letters, shared by Hudum/Todo/Manchu/Sibe | 3.0 |
| U+1843–185C | Todo letters | U+1843 TODO LONG VOWEL SIGN is gc **Lm**, rest Lo | 3.0 |
| U+185D–1872 | Sibe letters | | 3.0 |
| U+1873–1877 | Manchu letters | I, KA, RA, FA, ZHA only | 3.0 |
| U+1878 | **Buryat letter** | CHA WITH TWO DOTS — historical Buryat š, *not* generic Hudum | **11.0** (2018) |
| U+1880–18AA | Extensions for Sanskrit and Tibetan | Ali Gali (see `script-styles.md`) | 3.0 (U+18AA: 5.1) |
| U+18AB–18AF | unassigned | ⚠ U+1879 MONGOLIAN LETTER ALTERNATE UE sat in the pipeline (Accepted 2025-10-29, **reverted to provisional 2026-04-21**) — treat U+1879 as unassigned but expect it may return | — |

**Mongolian Supplement U+11660–1167F** (Unicode 9.0): 13 extra birga head-mark
variants, U+11660–1166C, all gc Po, LB class BB. Passage-head marks only —
they never interact with letter shaping. The Mongolian *script* is not
coextensive with the U+1800 block.

### Punctuation detail

| Char | Name | gc | Notes |
|---|---|---|---|
| U+1800 | BIRGA | Po | head of passage/book; several glyph forms; more in U+11660–1167F |
| U+1801 | ELLIPSIS | Po | |
| U+1802 | COMMA | Po | ceg; scx = Mong Phag |
| U+1803 | FULL STOP | Po | dabqur ceg (double dot); confusable with `:` per confusables.txt |
| U+1804 | COLON | Po | **documented nowhere** — absent from spec prose and chart annotations; real, keep in inventory |
| U+1805 | FOUR DOTS | Po | ends a passage/chapter |
| U+1806 | TODO SOFT HYPHEN | Pd | **visible** hyphen that starts the *continuation* line (UAX #14 class BB); chart: "also used in the Hudum writing system" — ⚠ never flag it as Todo-only |
| U+1807 | SIBE SYLLABLE BOUNDARY MARKER | Po | Joining_Type **D** (dual-joining — participates in cursive joining) |
| U+1808 | MANCHU COMMA | Po | |
| U+1809 | MANCHU FULL STOP | Po | confusable with `:` |
| U+180A | NIRUGU | Po | see below; Joining_Type **C** (join-causing) — the only Mongolian Po with it |

## MVS (U+180E): one character, two roles

**Role 1 — vowel separator (original, retained).** Some words lexically end
in a *disconnected* final a/e taking the "leftward tail" form: ᠬᠠᠨᠠ
`<182C 1820 1828 1820>` "vein casing" vs its MVS-separated counterpart `<182C 1820 1828 180E 1820>`
"wall of a tent". "Whether a final letter a or e is joined or separated is
purely lexical" (core spec). Not used in Todo/Manchu/Sibe.

**Role 2 — suffix connector (since 16.0).** Core spec §13.5, verbatim:

> "Prior to Unicode Version 16.0, U+202F NARROW NO-BREAK SPACE (NNBSP) was
> used to represent this small whitespace; it retains its Script_Extensions
> value of 'Mong' to facilitate backward compatibility. However, its role has
> been taken over by U+180E MONGOLIAN VOWEL SEPARATOR (MVS), which not only
> prevents word breaking and line breaking, but also triggers special shaping
> for the following separated suffix."

MVS may follow another separated suffix, and may appear between non-Mongolian
characters and a suffix. If a line must break before a suffix, the MVS goes
at the *start* of the new line with zero advance width, so shaping survives.

The two roles are distinguished lexically by what follows: role 1 is always
`MVS + a/e + word boundary` (also readable as the archaic dative — see
`orthography.md`); role 2 is `MVS + dictionary particle`.

**NNBSP handling:** the spec's *only* provision for legacy text is keeping
scx=Mong on U+202F. UTN #57 goes further: "Use of the NNBSP is discouraged in
preference for the MVS, as it sometimes produces anomalous shaping in various
contexts." This is `nnbsp-legacy`'s normative backing.

## Character properties that matter for linting

| Property | U+180E MVS | U+202F NNBSP |
|---|---|---|
| General_Category | **Cf** (was Zs until **6.3.0**, 2013) | Zs |
| White_Space | No | Yes |
| Line_Break | GL (glue) | GL |
| Word_Break (UAX #29) | **Format** — invisible to word boundaries | **ExtendNumLet** — joins tokens |
| Grapheme_Cluster_Break | **Control** — *breaks* clusters on both sides | Other (own cluster) |
| Default_Ignorable | **Yes** | No |
| Joining_Type | U (non-joining) | — |
| Script (sc) | Mong | Zyyy (Common) |
| Script_Extensions (scx) | Mong (default) | **Latn Mong Phag** (Phag added 16.0) |

Consequences:

- `stem + MVS + a` is **three** grapheme clusters — caret/segmentation code
  must not assume MVS glues clusters (relevant to the /type pad).
- MVS is Default_Ignorable: fonts without Mongolian support *hide* it. Noto
  v3's visible `mvs.nominal` for bare MVS is a deliberate in-font diagnostic,
  not fallback behavior.
- Suffix tokenization differs between legacy (NNBSP = ExtendNumLet) and
  modern (MVS = Format) encodings — search/word-count results diverge.
- Joining_Type=U means UCD-level cursive joining stops at MVS; all
  suffix-side shaping is font logic (UTN #57 particle lookup).
- **Unicode 16.0 changed zero UCD properties.** The whole model shift is
  core-spec prose plus font GSUB. No shaping-engine patch exists or was
  needed — a text-level linter is the only enforcement layer.

## Normalization (NFC/NFD/NFKC/NFKD)

Verified against UCD 16.0 (`unicodedata`), and frozen forever by the
normalization stability policy:

- **NFC and NFD are exact no-ops on Mongolian text.** No character in
  U+1800–18AA or the Supplement has a canonical decomposition or
  participates in any composition, and every one has ccc=0 — except
  **U+18A9 ALI GALI DAGALGA (ccc=228)**, the block's only combining mark,
  which canonical *reordering* can move relative to other nonzero-ccc marks.
  Ali Gali-only edge; no Hudum impact.
- **NFKC/NFKD destroy the legacy connector**: U+202F carries the
  compatibility decomposition `<noBreak> U+0020` — every NNBSP-joined
  suffix silently becomes a plain-space-joined one. This is the
  `space-before-suffix` corruption manufactured at scale, and NFKC runs
  invisibly inside common pipelines (search indexing, ML tokenizers,
  identifier/security normalization). MVS, FVS1–4, nirugu, and ZWJ/ZWNJ
  all survive NFKC unchanged.
- **NFKC_Casefold is total destruction**: per DerivedNormalizationProps,
  U+180B–180F (all four FVS *and* MVS) map to the empty string and U+202F
  to U+0020 — identifier-style folding (UTS #39/#46 pipelines,
  case-insensitive matching) erases the entire format-control layer of
  Mongolian text.
- Consequences: MVS-model text is **normalization-proof under all four
  forms** — one more migration argument. The linter must run on **raw
  input** (normalizing first would destroy the very evidence
  `nnbsp-legacy` flags), and `applyFixes` must splice without normalizing.
  An NFKC-scrubbed corpus is detectable only by `space-before-suffix` —
  the NNBSP evidence is already gone.

## FVS1–4 (see `variation-sequences.md` for the full registry)

Format controls (gc Mn, Default_Ignorable, Variation_Selector=Yes) selecting
"a glyph form that cannot be predicted algorithmically". The selector
"immediately follows the base character it modifies"; any FVS *not* directly
after its registered base "will be ignored" by conformant renderers —
the normative backing for `fvs-placement`. The core spec **admits its own
UCD data is stale**: StandardizedVariants.txt "has not yet been updated to
synchronize with … Unicode Technical Note #57 … This defect will be
addressed in a future version."

Legacy ordering trap: pre-standard docs ordered `base + ZWJ + FVS`; the
standard requires `base + FVS + ZWJ`. Old text with `letter ZWJ FVS` has a
dead selector today (its "base" is ZWJ).

## ZWJ / ZWNJ / nirugu

ZWJ/ZWNJ select positional forms in isolation (`<1820, 200D>` → initial,
`<200D, 1820, 200D>` → medial, etc.) — a demo/documentation mechanism.
UTN #57 §2.2.2 is blunt: "ZWNJ and ZWJ should not be accessible to the
average user on common keyboard layouts, as everyday text does not require
these characters." That is `zwj-zwnj`'s normative backing.

**Nirugu (U+180A)** is the *sanctioned* visible joiner: "behaves exactly like
ZWJ but is visible as a piece of stem stroke". Canonical use: terminating a
patronymic abbreviation (initial syllable/letter of the father's name). Also
a nonbreaking compound-word separator (altan-agula type). Never flag it; a
word-final nirugu also legitimizes vowel-less abbreviation "words".

## UTN #57 in brief

- **v4 (2024-08-14) is the last PDF on unicode.org** — maintenance formally
  moved to auto-generated data in **mongfontbuilder** (announced 2026-04-12;
  companion UTC proposal L2/26-091, 2026-04-02; site
  mongfontbuilder.pages.dev is the editor's draft). Vendoring the JSON is the
  correct consumption path; the PDF line is frozen.
- Non-normative (UTN status), but the core spec references it as *the*
  implementation guideline, and it "can be regarded as an implementation of"
  GB/T 25914—2023.
- Model: written units vs phonetic letters (phonemic model with compromises);
  shaping phases — cursive positions → **chachlag → syllabic → particle**
  (phonetic) → devsger, post-bowed (graphemic) → FVS (uncaptured) → cleanup.
- Letter gender classes (Table 5): masculine vowels {a U+1820, o U+1823,
  u U+1824}; feminine {e U+1821, ö U+1825, ü U+1826, **é U+1827**}; neuter
  {i U+1822}. All-neutral words behave as feminine.
- Particle shaping is **dictionary-based** (the 47-entry particles registry);
  `MVS + a/e + FVS` deliberately yields the *default* (non-chachlag) form —
  the sanctioned escape hatch.

## Version history at a glance

- **3.0 (1999)** — block encoded; NNBSP prescribed as suffix connector.
- **6.3.0 (2013)** — MVS gc Zs→Cf (stops being whitespace).
- **9.0 (2016)** — Mongolian Supplement block; U+1885/1886 Lo→Mn.
- **11.0 (2018)** — U+1878 (Buryat CHA WITH TWO DOTS).
- **14.0 (2021)** — U+180F FVS4 (pre-contemporary orthography variants).
- **16.0 (2024-09)** — suffix-connector role NNBSP→MVS (core-spec prose only;
  zero UCD changes; zero mentions in the release notes). U+202F scx gains Phag.
- **17.0 (2025-09)** — no Mongolian changes (spec prose diff-verified
  identical; no repertoire or property changes). 18.0 draft: none either.

## Cross-references

- W3C MLREQ (republished **2025-07-10**, ten months *after* Unicode 16.0)
  still prescribes NNBSP for suffixes — cite it for vertical-layout topics
  only, never for encoding. Its editor's personal notes
  (r12a.github.io/scripts/mong/mn, 2026-06) already teach MVS.
- UTR #54 "Unicode Mongolian 12.1 Snapshot" preserves the last code chart
  with positional-form glyphs (charts dropped them in 13.0) — historical
  reference only; mongfontbuilder's docs explicitly say **do not** implement
  from UTR #54's variant tables.
