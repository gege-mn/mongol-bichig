---
name: mongol-bichig
description: Unicode encoding expertise for traditional Mongolian script (Mongol bichig, U+1800–18AF) — the Unicode 16 MVS suffix-connector model, legacy NNBSP, FVS variation selectors, chachlag, legacy PUA text, normalization hazards, and rendering verification. Use when reading, writing, generating, reviewing, or debugging Mongol bichig text or code that handles it; when choosing suffix connectors or validating FVS usage; when bichig renders wrong or search misbehaves; or when handling Todo, Sibe, Manchu, or Ali Gali letters.
license: MIT
---

# Mongol bichig — Unicode encoding

Knowledge base researched 2026-07 from primary sources (Unicode core spec +
UCD, the L2 register, UTN #57, mongfontbuilder data, Poppe's grammar) and
independently fact-checked against them. Depth lives in `references/`; this
file is the operational layer.

## The model in one paragraph

Mongolian encodes *phonetic letters*, not glyphs — one code point per
letter; the font derives positional (isolate/initial/medial/final) and
gender forms from context. Three mechanisms adjust defaults: **MVS**
(U+180E) triggers the separated final a/e (*chachlag*) and — since
**Unicode 16.0 (2024)** — joins separated suffixes; **FVS1–4** (U+180B–180D,
U+180F) select registered variant forms; **NNBSP** (U+202F) is the *legacy*
suffix connector, kept only for backward compatibility. The shaping
registry is UTN #57 (implements China's GB/T 25914—2023), maintained as
machine-readable data in `mongfontbuilder`.

## Rule zero: never type invisible characters as literals

NNBSP U+202F, MVS U+180E, FVS1–4 U+180B/U+180C/U+180D/U+180F, ZWJ U+200D,
ZWNJ U+200C are invisible and get silently mistranscribed by editors,
clipboards, and language models — including you.

- In code and tests: always `\uXXXX` escapes (`'\u180E'`, never the raw
  character).
- In prose and docs: `U+XXXX` notation.
- Visible bichig letters (ᠠ ᠨ ᠮ …) may appear literally.
- After generating any file containing bichig, scan it:

```sh
perl -CSD -e 'while (<<>>) {
  printf "%s:%d invisible literal\n", $ARGV, $.
    if /[\x{202F}\x{180E}\x{180B}-\x{180D}\x{180F}\x{200C}\x{200D}\x{FEFF}]/;
} continue { close ARGV if eof }' FILE...
```

(Every piece is load-bearing: `-CSD` makes perl scan characters, not bytes
— without it the match never fires; `<<>>` forbids perl's magic open — with
plain `<>`/`-n` a hostile file *named* `something|` would be executed, not
read; `close ARGV if eof` keeps line numbers per-file.)

## Code points that matter

| Code point(s) | What | Notes |
|---|---|---|
| U+1820–1842 | Basic letters | shared by Hudum/Todo/Manchu/Sibe |
| U+180E MVS | suffix connector + chachlag trigger | gc=Cf, Default_Ignorable, breaks grapheme clusters |
| U+202F NNBSP | **legacy** suffix connector | gc=Zs; still what every mainstream keyboard emits (2026) |
| U+180B–180D, U+180F | FVS1–3, FVS4 | must sit *immediately* after the letter they modify |
| U+180A | nirugu | sanctioned visible joiner — never flag it |
| U+200C/U+200D | ZWNJ/ZWJ | never needed in running text (UTN #57 §2.2.2) |
| U+1843–185C / U+185D–1872 / U+1873–1877 / U+1880–18AA | Todo / Sibe / Manchu / Ali Gali | in Hudum text these are wrong-block hazards |
| U+1878 | Buryat CHA WITH TWO DOTS | Hudum-sphere; do not flag |
| U+E000–F8FF | PUA | Menksoft-era glyph encoding — convertible, never valid |

## The hard rules

1. **Suffix connector is MVS.** `stem + U+180E + suffix`. NNBSP-joined text
   is legacy (fix: replace U+202F with U+180E — byte-identical rendering in
   current fonts). A plain U+0020 before a suffix is *corruption*: the
   suffix silently becomes a standalone word (ᠨᠣᠮ ᠤᠨ "nom un" instead of
   *nom-un*).
2. **MVS must sit between two Mongolian letters** (digits allowed on the
   left). Anywhere else it is structurally broken — new-model fonts render
   a visible error glyph.
3. **FVS immediately follows its base letter**, never doubled, never after
   ZWJ. Validate (letter, FVS) pairs against mongfontbuilder
   `variants.json`, **not** UCD `StandardizedVariants.txt` — neither
   contains the other and the core spec itself calls the UCD list
   defective. In `variants.json`, key `"0"` means context-only, *not* FVS0.
4. **`MVS + a/e` at word end is legitimate** (chachlag, or the archaic
   dative) — never flag it. `MVS + a/e + FVS` selects the non-chachlag
   default: also legitimate.
5. **No PUA, no ZWJ/ZWNJ** in running Mongolian text.

## Normalization

- NFC and NFD are exact no-ops on Mongolian text — safe.
- **NFKC/NFKD turn NNBSP into a plain space** (compatibility decomposition,
  frozen forever) — they manufacture the space-corruption bug at scale.
- **NFKC_Casefold deletes MVS and all four FVS outright** and NNBSP→space:
  identifier-style folding erases Mongolian's entire format-control layer.
- Therefore: process bichig **raw**. Never normalize before validating.
  Use code-point offsets (not UTF-16) for any caret/diagnostic math.

## Rendering: looking right proves nothing

- NNBSP- and MVS-joined suffixes shape **byte-identically** in current
  fonts — no eye can tell the encodings apart; only the bytes differ.
- The two biggest consumer platforms still ship pre-model fonts (2026):
  Windows Mongolian Baiti 5.53, Android Noto v1.04 (2016). macOS ≥ 15.1
  ships Noto v3 (new model). Chrome additionally breaks connectors via
  font fallback (fix in review).
- Noto Sans Mongolian v3 renders *misuse* visibly by design: bare MVS,
  lone NNBSP, unregistered/doubled FVS all get visible marker glyphs.
- Verify shaping with hb-shape, passing code points — never literals:

```sh
# NNBSP and MVS suffix joins must shape identically:
hb-shape NotoSansMongolian-Regular.ttf -u 'U+1828,U+1823,U+182E,U+202F,U+1824,U+1828'
hb-shape NotoSansMongolian-Regular.ttf -u 'U+1828,U+1823,U+182E,U+180E,U+1824,U+1828'
# A bare MVS must surface the visible misuse glyph:
hb-shape NotoSansMongolian-Regular.ttf -u 'U+180E'   # → mvs.nominal
```

## Mechanical checking

Don't hand-roll any of this. Two things in this same repository already do it:

- The companion **gege-linter** skill — the `@gege-mn/gege-linter` library and
  CLI, which mechanize every hard rule above.
- `@gege-mn/mongol-bichig` — the canonical data behind them: the 63-entry
  Hudum suffix registry (plus the 4 space-joined words that must never take a
  connector), Classical romanization (`toScript`/`fromScript`), and the
  character classes used throughout this document.

```sh
pnpm add @gege-mn/mongol-bichig
```

## References (progressive disclosure)

Read on demand. These are canonical — this repository is where they live:

| File | Read when you need |
|---|---|
| `references/encoding-model.md` | the current model: blocks, MVS roles, UCD properties, normalization, ZWJ/nirugu |
| `references/suffixes.md` | the 63-entry Hudum suffix dictionary with code points |
| `references/variation-sequences.md` | FVS semantics, the valid-FVS quick table, registry divergence |
| `references/script-styles.md` | Todo/Sibe/Manchu/Ali Gali ranges, look-alikes, locale metadata |
| `references/legacy-encodings.md` | Menksoft/Saiyin PUA bands, detection heuristics, IME landscape, converters |
| `references/fonts-and-rendering.md` | font/engine/platform matrix, hb-shape recipes, how misuse renders |
| `references/orthography.md` | vowel harmony, chachlag, candidate linguistic rules |
| `references/encoding-history.md` | why the model changed (1987→2026) |
| `references/README.md` | index mapping each doc to the tools that consume it |
