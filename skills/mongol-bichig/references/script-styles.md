# Script styles in the Mongolian block — the knowledge behind `wrong-block`

Researched 2026-07-25 from UCD 17.0 (UnicodeData/NamesList/DerivedAge),
core spec §13.5 Table 13-7, ISO 15924 registry, CLDR likelySubtags,
confusables.txt/intentional.txt, Liang Hai's IUC #42 deck (2018), BabelStone.

## The five styles, one block

The block deliberately *unifies* four writing systems — Hudum, Todo, Manchu,
Sibe — sharing the "basic letters" U+1820–1842, plus Ali Gali transcription
extensions. Derivation chain: Hudum (13th c.) → Manchu (early 17th c.) →
Sibe (a reform of *Manchu*, not Hudum); Hudum → Todo (1648, Zaya Pandita).
Hudum also writes Evenki; Manchu-Sibe writes Daur — Hudum letters do not
imply the Mongolian *language*.

| Style | Community | Status |
|---|---|---|
| **Hudum** | ~4–5M in Inner Mongolia (official); Mongolia (state revival — dual-script official documents mandatory since **2025-01-01**, Language Law art. 7.2) | Living, dominant online |
| **Todo** ("clear script") | Oirats in Xinjiang; Kalmyks historically (Cyrillic since 1924) | Fading but alive in Xinjiang |
| **Sibe** | ~30k, Qapqal county, Xinjiang; *Qapqal News* is the world's only Sibe newspaper | Living minority script |
| **Manchu** | No everyday community; millions of Qing archival documents | Nearly extinct vernacular, archivally huge |
| **Ali Gali** | Not a community — Sanskrit/Tibetan transcription in Buddhist texts (Hudum, Todo, and Manchu flavors) | Liturgical/philological |

## Ranges — and why ranges are not repertoires

| Range | Subhead (17.0 chart) | Note |
|---|---|---|
| U+1820–1842 | Basic letters | shared by **all four** systems |
| U+1843–185C | Todo letters | U+1843 LONG VOWEL SIGN is gc **Lm** |
| U+185D–1872 | Sibe letters | |
| U+1873–1877 | Manchu letters | **only five letters** (I, KA, RA, FA, ZHA) |
| U+1878 | **Buryat letter** | CHA WITH TWO DOTS, Unicode 11.0, for historical Buryat š (WG2 N4781) — correctly not flagged |
| U+1880–18AA | Extensions for Sanskrit and Tibetan | see Ali Gali breakdown |

**Real Manchu text is mostly *not* in the Manchu range.** It draws from three
ranges at once: Hudum A/O/NA/ANG/BA/MA/LA/SA/CA/JA/YA/WA/KA + Sibe
E/IY/UE/U/GA/HA/PA/SHA/TA/DA/TSA/ZA/RAA/CHA plus GAA/HAA (U+186C/186D,
only before a/o, for Chinese g'a/h'a) + the five Manchu letters. Todo
and Sibe likewise reuse Hudum letters. Consequences:

- The current rule direction — flag Todo/Sibe/Manchu/Ali Gali letters in
  **Hudum** text — is the safe one: Hudum never needs those code points,
  while every other style needs Hudum's.
- The converse ("Hudum letters in Sibe text") would be nonsense; never add it.
- Feeding non-Hudum text to the linter fires `wrong-block` on nearly every
  word. If a style option ever lands, styles are **letter profiles, not
  ranges**: Todo = U+1820–1842 ∪ U+1843–185C; Sibe = U+1820–1842 ∪
  U+185D–1872; Manchu = Sibe's set ∪ U+1873–1877.

## Ali Gali sub-structure (U+1880–18AA)

Non-contiguous — derive sub-styles from explicit sets, never ranges:

| Sub-group | Code points |
|---|---|
| Head marks (Hudum-side) | U+1880–1884 (anusvara, visarga, damaru, ubadama, inverted ubadama) |
| Baluda marks | U+1885–1886 — gc **Mn since Unicode 9.0** (Lo before; combining marks used *on* letters) |
| Hudum Ali Gali letters | U+1887–1897 |
| Todo Ali Gali | U+1898–1899 only (Todo handles Sanskrit natively) |
| Manchu Ali Gali | U+189A–18A5, U+18A8, U+18AA — interleaved with the unprefixed U+18A6/18A7 HALF U/HALF YA (style assignment normatively unstated) |
| Combining | U+18A9 DAGALGA (Mn) |

Ali Gali letters legitimately appear inside Hudum Buddhist text (mantras,
Sanskrit loans) — warning severity is correct, never error. Exception:
U+1888/U+1889 are near-always keyboard mistakes for ᠬ/ᠭ and rightly carry
mechanical fixes.

**Category-check pitfall:** `gc=Lo` ≠ "Mongolian letter". U+1843 is Lm;
U+1885/1886/18A9 are Mn. Use explicit code-point sets (as `chars.ts` does).

## Look-alike inventory

Unicode security data is nearly useless here — confusables.txt has exactly
four Mongolian entries (U+1803→`:`, U+1809→`:`, U+1896→U+185C,
U+1855→U+1835) and knows nothing of the U+1888/U+1889 hazard. Cross-style
homoglyphy is *designed in*: the 1998 China–Mongolia agreement unified only
letters "that appear identical in **any** context", so pairs identical in
most-but-not-all positions were deliberately encoded twice. Byte-level block
checking is the only reliable detector.

| Wrong char | Looks like | Evidence |
|---|---|---|
| U+1888 ALI GALI I | ᠬ QA U+182C | this project's hb-view-verified finding; real keyboards emit it (externally unpublished — likely chain: the rejected KE/GE proposal L2/18-294 → Tungaamal's separate He/Ge keys; unconfirmed) |
| U+1889 ALI GALI KA | ᠭ GA U+182D | same |
| U+1855 TODO YA | ᠵ JA U+1835 | the one officially registered pair (confusables.txt + intentional.txt: *intentionally* identical glyphs) |
| U+1878 | ᠴ CHA U+1834 + SHA-style dots | per its proposal (N4781) |
| U+183A vs U+183B KA/KHA | each other (regionally) | **taught with opposite values**: Inner Mongolia (and GB/T 25914-2023, matching the UCD names KA/KHA) teaches U+183A as "ka", Mongolia U+183B — same sound, different code point per region; a real cross-border consistency hazard, candidate future rule |

## Out-of-scope relatives (zero overlap with U+1800–18AF)

'Phags-pa (U+A840–A87F), Zanabazar Square (U+11A00–11A4F), Soyombo
(U+11A50–11AAF) — historical/ceremonial Mongolian-language scripts, separate
blocks, correctly ignored. "Clear script" is Todo itself, *inside* this
block — any source treating it as a separate Unicode script is confused.
Mongolian Supplement (U+11660–1167F) is extra birgas — same script `Mong`.

## Locale metadata (for a future `style`/locale option)

- ISO 15924: everything here is **`Mong`** (145). There is no code for Todo —
  **`Todr` is Todhri, a 19th-century Albanian alphabet. Do not use it.**
- CLDR likelySubtags: `mn` → `mn_Cyrl_MN`; `mn_Mong` and bare `und_Mong` →
  `mn_Mong_CN` (script-only text is presumed Inner-Mongolian Hudum);
  `xal` → `xal_Cyrl_RU` (Todo must be requested as `xal-Mong`).
- CLDR has locale data only for `mn` variants (`mn_Mong`, `mn_Mong_CN`,
  `mn_Mong_MN`); **zero coverage** for `xal` (Kalmyk/Oirat), `sjo` (Xibe),
  `mnc` (Manchu), `mvf` (Peripheral Mongolian).
- Style-profile mapping: `mn-Mong-*`/`mvf` → Hudum; `xal-Mong` → Todo;
  `sjo` → Sibe; `mnc` → Manchu (superset profile).

## Severity calibration for `wrong-block`

| Range in Hudum text | Legitimate? | Severity |
|---|---|---|
| Ali Gali | yes (Buddhist text; U+1885/1886/18A9 attach to Hudum letters) | warning; U+1888/1889 keep their fixes |
| Todo | rare but real (quoting Oirat names, philology) | warning |
| Sibe / Manchu | essentially always an input error inside a Hudum word | warning (word-internal position could justify higher confidence later) |
| U+1878 | historical Buryat orthography in the Hudum sphere | not flagged — correct |
| U+1806 TODO SOFT HYPHEN | chart: "also used in the Hudum writing system" | never flag |
| U+1807/1808/1809 (Sibe/Manchu punctuation) | no Hudum use documented | candidate future warning (`wrong-block` currently covers letters only) |
