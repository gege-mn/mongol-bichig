# Font conformance — which fonts set current text correctly

Measured 2026-10-19 with `scripts/font-check.mjs` against Noto Sans Mongolian
3.103, under HarfBuzz 14.4. Invisibles as `U+XXXX`. Licence wording is quoted
from each font file's own `name` table; whether a licence allows something is
our reading, not legal advice.

## The rubric

**A font passes when it sets ordinary Hudum text that gege-linter accepts the
way the benchmark does.** Concretely, both of:

1. **It maps the script.** Every one of U+1800–1806, U+180A–180E, U+1810–1819,
   U+1820–1842, U+200C, U+200D and U+202F has a glyph.
2. **It agrees with the benchmark on every case of four checks** — every case,
   not most:

   | Check | Cases | What it holds |
   |---|---|---|
   | Plain words | 1,177 | letters and spaces only: positional forms, ligatures, the contextual rules (gender of g, `i` after a vowel, final o/u, …) |
   | Suffix after MVS | 320 | every connector-joined suffix of the registry on eight stems, joined by U+180E — the Unicode 16 model |
   | Chachlag | 108 | U+180E before a final U+1820 or U+1821 |
   | MVS before a particle | 167 | the national standard's own particle cases |

"Agrees" means the font draws the same written units; see the method below. There is no partial credit: one disagreeing case fails
the check, and one failed check fails the font. A near miss is worth reading
on the comparison page, and is still a fail.

**Reported, and never deciding:**

| Check | Why it does not decide |
|---|---|
| Suffix after U+202F, and U+202F before a particle | NNBSP is the legacy connector. Unicode keeps it working; the revised national standard does not, and fonts built to that standard draw it as a visible mark. Text that gege-linter accepts has none. **A font that fails here needs NNBSP text converted to MVS first.** |
| U+180F (FVS4) mapped | Added in Unicode 14 and missing from most fonts. Unmapped, the selector is hidden and the letter keeps its default form. |
| Variation selectors | The benchmark is not an oracle here: it honours a selector registered in any locale, and it differs from the standard in documented cases. Most disagreements are constructed cases no text contains. |
| ZWJ / ZWNJ, nirugu, several controls at once | Rare, and mostly constructed. |
| Misuse made visible | Drawing a mark for a stray control is the benchmark's design choice, not a requirement. |

**What a pass does not say.** Nothing about the drawing: a font can pass with
ugly or mistaken outlines, since only the choice of glyph is compared. Nothing
about engines other than HarfBuzz. Nothing about Todo, Sibe, Manchu or Ali
Gali. And nothing about the licence — a font that passes may still be one
nobody may ship.

## Running it

```sh
pnpm font:check path/to/Font.ttf …            # → .tmp/font-check/<file>.html and .json
pnpm font:check --features dlig Font.ttf      # set with OpenType features on
pnpm font:check --benchmark Other.ttf Font.ttf
```

Needs `hb-shape`. The benchmark defaults to the Noto TTF that gege.mn keeps
for tooling (3.103 since 2026-10-15); `--benchmark` or `BICHIG_BENCHMARK` names another.
Under each font's name, the first line is `PASS` or `FAIL` by the rubric
above; the exit status is 0 either way. The JSON carries the same verdict, and the HTML page sets each kind of finding in
both fonts side by side, benchmark in green. **The page is for a reader's eye:
the counts say where to look, the page says what is wrong.**

## The method

**The cases** (4,685): the two Hudum suites of the national standard as
mongfontbuilder carries them — `core-hud` and `eac-hud`, vendored in
`vendor/mongfontbuilder/suites/` — and every entry of the suffix registry on
eight real stems, joined by U+180E, by U+202F and by a space.

**The comparison.** Noto names each glyph after the written units it
draws (`u1824.AO.init`), so its answer to a case reads as text. A font under
test names glyphs however it likes, so nothing is read from its names. Both
answers are cut where both fonts break a cluster; each piece pairs the
candidate's glyphs with the written units the benchmark drew there. **A
candidate glyph that turns up against two different written units draws the
wrong shape for one of them.** What a glyph "is" is settled by majority, in
control-free words first; one glyph may serve the same units in two positions,
as a bowed letter often does. A glyph a font draws for a control with nothing
to act on is its error mark, and drawing one where the benchmark draws none is
a finding.

**Limits.**

- A glyph that is wrong everywhere, or seen once, cannot be caught.
- The suites are constructed to reach every rule, not weighted by frequency:
  "939 of 1,177" is not a share of running text.
- Which of two shapes a shared glyph "really" is, is a guess by majority. The
  finding — one glyph, two shapes — is sound either way.
- It needs a benchmark whose glyph names spell written units, i.e. a
  mongfontbuilder build.

## Measured

Counts are cases agreeing with the benchmark. The four deciding checks first.

| Font | Faces | Verdict | Plain | Suffix, MVS | Chachlag | MVS particle | Suffix, NNBSP | FVS4 |
|---|---|---|---|---|---|---|---|---|
| Noto Sans Mongolian 3.103 | 1 | benchmark | 1177 | 320 | 108 | 167 | 320 | mapped |
| Gege Pixel, Shahaa, Mini 0.700 | 3 | **pass** | 1177 | 320 | 108 | 167 | 320 | mapped |
| Menk … StdEx Tig 2.002 | 28 | **pass** | 1177 | 320 | 108 | 167 | **0** | no |
| GLT … Tig 1.001 | 83 of 94 | **pass** | 1177 | 320 | 108 | 167 | **0** | no |
| GLT … Tig 1.001, the other 11 | 11 | fail | 792–1176 | 316–320 | 27–108 | 162–167 | 0 | no |
| Mongolian … "Delehi3.0.0" | 34 | fail | 1177 | 320 | **106** | 167 | 0 | no |
| Mongol Qagan Tig Mirror 1.00 | 1 | fail | 1168 | **132** | 89 | 25 | 320 | mapped |
| MongolianScript 5.91 | 1 | fail | 939 | **0** | 53 | 0 | 144 | no |
| Classical Mongolian Dashitseden 5.91 | 1 | fail | 939 | **0** | 53 | 0 | 144 | no |

### Notes on each

- **Gege Pixel** (mongfontbuilder layout) disagrees with Noto on 3 cases in
  all, every one U+1828 with FVS2, none in a deciding check. It draws no error
  marks.
- **Menk StdEx, GLT and the "Delehi3.0.0" set** are fonts built to the revised
  national standard, and on plain words and MVS suffixes they are the
  benchmark's equal. They differ from Noto where the standard does:
  - **U+202F is drawn as a visible mark, and the suffix after it takes
    word-initial forms** — in all 156 faces. This is the "NNBSP behaviour
    retained" difference Noto documents, seen from the other side.
  - U+180F is unmapped in all three.
  - Menk also marks U+1828 + FVS2/FVS3; the rest of the selector
    disagreements are constructed cases.
  - Coverage of the block: Menk and GLT map 91 code points, the third set 57
    (Hudum only, as Gege Pixel's 58); Noto maps 158.
- **The eleven GLT faces that fail**: seven lose four plain and three chachlag
  cases (Bag Ebhemel, Jabsariin, Jahidal, Oigvrjin, Tvsvlt Oigvrjin, Tvsvlgui
  Oigvrjin, Yeh Ebhemel), three lose one plain case (Juiqilel Budun, Qomorlig
  Budun, Soninaihar Narihan), and Tabvn Xogomt is broken throughout.
- **The "Delehi3.0.0" set** fails on two cases, the same two in all 34 faces:
  U+182D before a chachlag `e`, where it and the benchmark draw different
  finals.
- **Mongol Qagan Tig Mirror** is the older model: NNBSP suffixes agree on every
  case, MVS suffixes on 132 of 320.
- **MongolianScript and Classical Mongolian Dashitseden** (both © 2008, one
  layout, identical counts) are pre-model, with conventions of their own:
  - Every U+180E that is not a chachlag is drawn as a visible error box. The
    font knows MVS only as a ligature with a following U+1820 or U+1821.
  - U+202F is a gap and nothing more by default. Particle forms exist behind
    `dlig`, which no browser turns on unasked; with it on NNBSP rises only to
    168/320, plain words fall to 919 and chachlag to 0.
  - A selector the font has no rule for is drawn as the same error box.
  - Plain words differ where the standard's contextual rules do the work: `i`
    after a vowel stays single, syllable-final and word-final U+182D take the
    other gender's shape, the final of a one-syllable word in o/u.

## Licences

A pass is not permission. What each font file declares:

| Font | Declared terms | Embedding bit | Ship it? Modify it? |
|---|---|---|---|
| Noto Sans Mongolian | SIL Open Font License 1.1 | — | **Yes and yes** — it declares no Reserved Font Name |
| Gege Pixel | proprietary, L'Atelier Gege | — | the owner's to decide |
| Menk StdEx | "You may use this font to display and print content as permitted by the license terms for the product in which this font is included." © 2002–2020 | print and preview | **No** |
| GLT | "All rights reserved." No licence text. © 2018 | print and preview | **No** |
| "Delehi3.0.0" set | no licence text and no copyright string | print and preview | **No** — silence grants nothing |
| Mongol Qagan Tig Mirror | "You may not use this font for commercial purposes." | editable | **No** |
| MongolianScript, Classical Mongolian Dashitseden | "…may be downloaded, distributed and used free of charge for both personal and commercial use. Any other use is prohibited." | installable | Ship unmodified: yes. **Modify: no** — and subsetting or converting to WOFF2 is modifying |

No fuller terms could be found for any of the proprietary families (looked
2026-10-12): the licence URL in the 2008 fonts answers 404, two of the
foundries' domains are parked for sale, one serves an empty page, and one did
not answer from where we looked. The copies in circulation come with no
licence file. Until a foundry says otherwise in writing, these are
measurements of what the standard's fonts do, not fonts to bundle.

**So, as of this date, the only fonts that both pass and may be shipped by
anyone are Noto Sans Mongolian and, for its owner, Gege Pixel.** No second
openly licensed Mongolian-script font was found.
