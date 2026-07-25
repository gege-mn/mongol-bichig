# Sources

Every primary source the knowledge base rests on, pinned to the version it was
verified against. This is the **re-verification checklist**: when a new Unicode
version, UTN revision, GB/T revision or font release lands, this file says what
to re-read and which documents to update.

Last full verification: **2026-07-25**. Compiled here 2026-07-26.

## Normative — the encoding model

| Source | Version pinned | Verified | What rests on it |
|---|---|---|---|
| Unicode core specification, ch. 13.5 "Mongolian" | **16.0** (2024-09-10), re-checked unchanged through 17.0 | 2026-07-25 | The whole MVS-as-suffix-connector model. The single most load-bearing citation in this repo. |
| Unicode Character Database | 16.0 / 17.0 | 2026-07-25 | Format-control properties (gc, Default_Ignorable), normalization behaviour |
| **UTN #57**, "Encoding and Shaping of the Mongolian Script" (Kushim Jiang) | **v4**, `utn57-mong-4.pdf`, 2024-08-14 | 2026-07-25 | Shaping registry, particle inventory, variant registrations |
| **GB/T 25914—2023** (China) | published 2023-11-27, in force 2024-06-01 | 2026-07-25 | The model UTN #57 implements; how MVS reached Unicode |

⚠ **Unicode 16.0 changed zero UCD properties.** The entire NNBSP → MVS shift
lives in core-spec prose and font GSUB tables, and it is absent from the 16.0
release notes. There is no property, no derived file and no algorithm that
encodes it — which is precisely why a text-level tool is the only enforcement
layer that can exist.

## Machine-readable data

| Source | Pinned at | Verified | Notes |
|---|---|---|---|
| [`Kushim-Jiang/mongfontbuilder`](https://github.com/Kushim-Jiang/mongfontbuilder) (MIT) | `data/particles.ts`, fetched 2026-07-25 | 2026-07-25 | 47 Hudum particle entries. **Not yet vendored into this repo** — see below. |
| — `particles.json` | | | A *shaping* registry, not a dictionary: it lists only particles where some letter takes a particle-specific form. It can **confirm** an entry but never **refute** one. `references/suffixes.md` is the dictionary. |
| — `variants.json` | | | FVS registrations. Key `"0"` means context-only, **not** FVS0. |
| — `writtenUnits.json` | | | |
| UCD `StandardizedVariants.txt` | — | 2026-07-25 | ⚠ **Do not use for FVS validation.** Neither it nor mongfontbuilder is a superset of the other: it has been frozen since 2005/2017 with dead sequences, 68 current MNG registrations are missing from it, and the core spec itself calls it defective. See `references/variation-sequences.md`. |

UTN #57's maintenance moved to auto-generated mongfontbuilder data in 2025
(site: mongfontbuilder.pages.dev); the unicode.org PDF is frozen at v4. **Vendor
the JSON — never parse the PDF.**

**Open item:** the mongfontbuilder JSON has not been vendored into this
repository yet, so no commit hash is pinned. Do that before implementing
FVS-registration validation, and record the hash in this table.

## The suffix registry's own sources

`references/suffixes.md` — and therefore `src/data/suffixes.ts` — is compiled
from:

- Mongolian school grammar tables (тийн ялгалын хүснэгт, ерөнхийлөн
  хамаатуулах charts), collected 2026-07-25
- UTN #57 v4 particle registry
- `suffixes.csv`, hand-compiled — **seven errata found and corrected**, logged
  in the document itself
- Corpus-linting of gege.mn's own bichig, 2026-07-25, which surfaced the three
  possessive clitics and two real encoding bugs

## Standards history (why the model changed)

Full narrative in `references/encoding-history.md`. The load-bearing documents:

| Document | Year | Why it matters |
|---|---|---|
| L2/98-268R (Whistler) | 1998 | Invents NNBSP; the UTC generalises it beyond Mongolian |
| L2/15-212 (West) | 2015 | Tables the NNBSP problem; names U+180F as a candidate connector |
| **L2/17-036** (Eck, West, Badral Sanlig et al.) | 2017 | Proposes U+180F MONGOLIAN SUFFIX CONNECTOR. **UTC #150 "took no action"** — it died by inaction and was *never formally rejected*, a nuance most summaries get wrong |
| L2/17-052 (Liang Hai) | 2017 | The objection to that proposal |
| L2/18-293, L2/18-294 (Bolorsoft) | 2018 | NNBSP→SPACE corruption in the wild; the rejected KE/GE proposal |
| L2/20-057 | 2020 | Proposes FVS4 at U+180F — the would-be connector's code point is consumed instead (Unicode 14.0) |
| L2/24-180 (Liang Hai) | 2024 | "We need to catch up in this year's 16.0" |
| **UTC #180 consensus 180-C31** | 2024 | Core spec will reference UTN #57 for GB/T compatibility → Unicode 16.0 |
| L2/26-091 | 2026-04-02 | Proposes deprecating the UCD Mongolian standardized variants |

## Layout and typography — cite for layout only, never encoding

| Source | Version | Verified | Caveat |
|---|---|---|---|
| W3C **MLREQ** (Mongolian Layout Requirements) | republished **2025-07-10** | 2026-07-25 | ⚠ Re-published *ten months after* Unicode 16.0 and still documents the **NNBSP** model. Its own editor's notes (June 2026) say MVS. Cite it for layout; never for encoding. |
| r12a orthography notes | 2026-06 | 2026-07-25 | Teaches MVS |

## Fonts (measured, not assumed)

| Font | Version | Verified how |
|---|---|---|
| **Noto Sans Mongolian** | **v3.002** (2024-07-24) | hb-shape, locally. NNBSP- and MVS-joined suffixes shape **byte-identically**; misuse (bare MVS, lone NNBSP, unregistered/doubled FVS) renders as visible marker glyphs by design. This is what gege.mn self-hosts. |
| Mongolian Baiti (Windows 10/11) | v5.53 (© 2018) | Pre-model. Microsoft shipped its first Baiti shaping update in ~6 years in July 2026 (Insider / Release Preview). |
| Noto Sans Mongolian (Android) | **v1.04 (2016)** | Binary-verified in AOSP main. No v3 uptake statement anywhere. |
| macOS ≥ 15.1 | Noto v3.002 in `/System` | Verified locally. Apple's support pages still claim v1.04 download-only — wrong. |

Chromium additionally breaks connectors via font fallback; fix was in review as
of 2026-07.

## Linguistics

- Poppe, *Grammar of Written Mongolian* — vowel harmony, classical morphology
- Mongolian school grammar tables, as above

## Downstream research

- **CoPiT** (arXiv 2607.05849, July 2026) — 14,125 Cyrillic ↔ traditional
  pairs, **CC BY 4.0** (MIT-compatible). Target replacement for
  gege-convertor's unverified seed lexicon. Repository link was still
  anonymised at time of research; chasing it down is an open item.
- Wiktionary via kaikki.org — ~2,900 further pairs, CC BY-SA.

## Standing facts worth not re-deriving

- No mainstream keyboard or IME is confirmed to emit MVS for suffixes as of
  2026-07. Real-world text stays NNBSP-joined, and will for years.
- No off-the-shelf Mongolian encoding linter existed as of 2026-07.
- U+1879 ALTERNATE UE is in pipeline limbo — accepted 2025, reverted 2026.
  Treat as unassigned; it may return.
- U+1878 (CHA WITH TWO DOTS, Unicode 11.0) is chart-classified a Buryat
  letter and belongs to the Hudum sphere — do not flag it as wrong-block.
