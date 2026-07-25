# Fonts, shaping engines, and platforms — how (mis)encoded text actually renders

Researched 2026-07-25: repo/API data, L2 documents, engine source, plus
**first-party hb-shape measurements** against the exact Noto Sans Mongolian
v3.002 binary gege.mn self-hosts. Invisibles as `U+XXXX`.

## The central fact

**Unicode 16.0 changed zero UCD properties; the entire NNBSP→MVS model lives
in font GSUB.** There was never a HarfBuzz/CoreText/DirectWrite "Mongolian
16.0 patch" — engines supply joining masks, FVS transparency, and
default-ignorable hiding; everything connector-specific is font logic. Which
means: whether text renders correctly depends on (a) *which font* resolves
it and (b) whether the whole cluster *stays* in one font. A text-level
linter is the only layer that can enforce the encoding itself.

## The two fonts that matter

### Noto Sans Mongolian v3 (the new model)

- v3.000 (2023-11-04): "completely re-engineered … compliance with the draft
  UTN"; **v3.002 (2024-07-24)**: "updates the shaping rules to meet the
  published standard (UTN#57)". Shaping/OTL by Kushim Jiang; outlines still
  Monotype. Noto v3 is a *sibling* implementation of the UTN, not a
  mongfontbuilder build output.
- NNBSP back-compat is engineered in the feature files: the connector class
  is `[mvs mvs.narrow mvs.wide mvs.nominal nnbsp]` — U+202F takes exactly
  the same particle path as U+180E. Hence the byte-identical shaping this
  project verified.
- **Misuse-visibility is a design principle**, not an accident: preprocessing
  makes every control visible first; only *valid* contexts substitute the
  invisible forms; postprocessing forces unconsumed controls back to visible
  glyphs. Google's FontBakery QA FAILed the inked control glyphs ("Glyph
  'mvs' has ink") and it shipped anyway.
- The MVS glyph is **three glyphs**: `mvs.narrow` (adv 55 — chachlag),
  `mvs.wide` (adv 260 — suffix connector), `mvs.nominal` (adv 389 — the
  visible *misuse* glyph). Earlier project notes calling the wide glyph
  "mvs.nominal" were imprecise.

### Mongolian Baiti (the installed base)

- Windows 10/11 ship **v5.53** (© 2018; designed by Beijing Founder
  Electronics). Model: pre-16.0 — OT rules keyed on `<U+202F, letter>`.
  No Unicode-16 suffix-connector rules; no FVS4 (predates Unicode 14).
- The famous "MVS broken on Windows/Chrome" bug (typography-issues #1174,
  open since 2024-09) is **not primarily Baiti's fault**: the same font
  loaded as a webfont renders MVS chachlag fine — Chrome's font *fallback*
  captures U+180E/U+202F mid-cluster. Baiti's real gap is the missing
  new-model particle rules.
- The oft-cited "Windows 10 2018 update broke Baiti" legend has no findable
  primary source; what is real is v5.01→v5.53 FVS drift across the 2016+
  re-standardization, so old documents render differently.
- **Microsoft is shipping its first Baiti shaping update in ~6 years right
  now** (Windows 11 Insider Beta 2026-07-06; Release Preview 2026-07-20,
  whose note reads "improves character shaping and rendering for Mongolian
  Baiti font" — the Beta note is worded differently but says the same).
  Whether it retrofits the Unicode-16 model is unstated — re-test at GA.

## Shaping engines

- **HarfBuzz** routes Mongolian to the **USE shaper** (since 2.7.3,
  2020-12-23 — "Arabic shaper" claims are stale), with Arabic joining logic
  embedded; `mongolian_variation_selectors()` copies the base letter's
  joining action onto FVS1–4 so a selector never breaks positional shaping;
  since 2024-09 FVS is also ignored in GPOS.
- **The 2024–2026 battleground is font selection, not shaping** (HarfBuzz
  issue #4503): Chrome's per-script fallback lets a Latin font (SF Pro,
  Helvetica — which own U+202F for French typography) capture the connector
  mid-cluster. Safari and Firefox reportedly fixed; a HarfBuzz-level fix was
  rejected as wrong-layer (PR #5969) and moved to Chromium CL 7849879
  ("Keep Mongolian segments on letter-covering fallback fonts", in review
  2026-07). Pango defers spaces to the neighbor font; Firefox special-cases
  NNBSP; Android Minikin allowlists it; Chromium was the unprotected one.
- U+180E is Default_Ignorable: *unmapped* → hidden entirely; *mapped* →
  reaches GSUB. Noto's visible misuse glyphs work because the font maps it.
- CoreText: no public spec; macOS ≥ 15.1 + Safari handle the new model.
  DirectWrite: `mong` is in Microsoft's USE registry; legacy Uniscribe spec
  (2002) is dead (404, no archive).

## Platform matrix (2026-07 — expires with the Baiti update and Chromium CL)

| Platform | Default font | Model | Notes |
|---|---|---|---|
| Windows 11 | Mongolian Baiti 5.53 | legacy NNBSP | MVS text degrades; Chrome additionally eats connectors; update rolling out |
| macOS ≥ 15.1 | **Noto v3.002 in /System** (verified locally) | new | correct in Safari; broken in Chrome until the CL lands; Apple's support pages still claim v1.04 download-only — wrong |
| macOS ≤ 15.0 | none preinstalled | — | tofu unless user installs |
| Android | **Noto v1.04 (2016!)** | old | binary-verified in AOSP main; no v3 uptake statement anywhere |
| Debian/Ubuntu | fonts-noto-core = 2020 snapshot | old | pre-v3 |
| ChromeOS | Noto v3.002 | new | same Chromium fallback bug |
| iOS | presumably shares macOS asset ≥ 18.1 | ? | unverified |

Takeaway for the README's claim "the text quietly fails tomorrow — in
another font, another OS": the two biggest consumer platforms (Windows,
Android) still render with pre-model fonts in 2026.

Vertical text: the whole block is `vo=R` in UTR #50 — correct CSS is
`writing-mode: vertical-lr` with default `text-orientation: mixed`
(`upright` breaks joining). WebKit's vertical-lr squash bug fixed 2025-05.

## How misuse renders (measured, Noto v3.002, hb-shape)

| Input | Renders as |
|---|---|
| stem + U+202F + suffix | identical glyph stream to the MVS version (`mvs.wide` + particle forms) |
| stem + U+180E + suffix | same — byte-identical |
| stem + U+0020 + suffix | space + suffix in **word-initial** form — visibly a separate word |
| chachlag (U+180E + final a/e) | `mvs.narrow` + isolated-form vowel — the legitimate case |
| bare U+180E | **visible `mvs.nominal`** |
| lone U+202F | **visible `nnbsp` marker** (adv 770) |
| registered letter+FVS | form changes; selector invisible (`fvsN.effective`) |
| unregistered letter+FVS | default form; **visible `fvsN` marker** |
| doubled FVS | first consumed, second **visible** |
| U+1820 + U+180F (isolate) | default + visible `fvs4` marker — FVS4 registration is position-sensitive |
| PUA U+E266 | `.notdef` tofu |

In legacy fonts, all of the above except PUA is typically *invisible* —
which is why these bugs ship. Noto v3's visible markers + this linter are
the two halves of the same enforcement story.

## Verification recipes

```sh
# Never type invisible literals — pass code points via -u / --unicodes.
FONT=NotoSansMongolian-Regular.ttf

# NNBSP and MVS suffixes must shape identically:
hb-shape $FONT -u 'U+1828,U+1823,U+182E,U+202F,U+1824,U+1828'
hb-shape $FONT -u 'U+1828,U+1823,U+182E,U+180E,U+1824,U+1828'

# Plain-space bug — suffix takes the word-initial form instead:
hb-shape $FONT -u 'U+1828,U+1823,U+182E,U+0020,U+1824,U+1828'

# Bare MVS is visible:
hb-shape $FONT -u 'U+180E'        # → mvs.nominal

# Stable golden files: --no-glyph-names --ned ; JSON: -O json
# Pictures for issues: hb-view $FONT -u '...' -O png -o out.png --direction=ttb
```

Caveats: hb-shape exercises HarfBuzz only — DirectWrite+Baiti and CoreText
are separate engines. Other tools: **Crowbar** (browser-based per-lookup
shaping trace — watch the `_.narrow` lookup rewrite NNBSP);
**mongfontbuilder's test harness** (the de-facto UTN #57 conformance suite);
`ttx -t GSUB` + grep for `mvs.narrow`/`mvs.nominal`; FontBakery's
"whitespace glyphs have ink?" check instantly identifies misuse-visible
fonts (new-model Noto deliberately FAILs it).
