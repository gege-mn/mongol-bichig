# How Mongolian encoding got here: 1987 → Unicode 17

Researched 2026-07-25 from the Unicode L2 register (topical index:
unicode.org/L2/topical/mongolian/), WG2 documents, UTC minutes, and
Tergel Teneg, "The Digitisation Odyssey of the Mongolian Script in Unicode",
*Inner Asia* 27 (2025) 277–313 (open access, read in full). Key primary
documents were fetched and read; claims below are from those unless marked.

## Timeline

| Year | Event |
|---|---|
| 1987 | China's GB 8045-1987 (7/8-bit Mongolian sets) reaches ISO as WG2 N167 |
| 1993 | Mongolia files an ISO New Work Item for the script |
| 1994–98 | Competing China/Mongolia proposals → joint drafts (N1368, N1691, N1711) via five "International Mongolian Encoding Meetings" |
| 1998 | **L2/98-268R (Whistler) invents NNBSP**: both countries wanted a Mongolian-specific space; the UTC generalizes it to U+202F "of use in other scripts as well" |
| 1999 | **Unicode 3.0 ships U+1800–18AF**: phonetic model (Prof. Quejingzhabu, Inner Mongolia University), NNBSP suffix connector, MVS, FVS1–3; UNU/IIST TR170 is the de-facto spec |
| 2002 | First Mongolian standardized variation sequences (Unicode 3.2) |
| 2007 | Windows Vista: first OS-level support (Mongolian Baiti + Uniscribe) — implementing *undefined* variation sequences (BabelStone: "an undocumented and private interpretation") |
| 2010–11 | GB/T 25914-2010 + GB/T 26226-2010; rendering survey L2/10-279 (every font failed somewhere) |
| 2013 | Unicode 6.3.0: MVS gc Zs→Cf |
| 2015 | W3C i18n Mongolian task force; **L2/15-212 tables the NNBSP problem**, names U+180F as a candidate connector |
| 2016 | PRI #308: NNBSP gc unchanged; Word_Break→ExtendNumLet lands |
| 2017 | Jan: **L2/17-036 proposes U+180F MONGOLIAN SUFFIX CONNECTOR** (Eck, West, Badral Sanlig et al.); Liang Hai objects (L2/17-052); **UTC #150: "Brief discussion. UTC took no action at this time"** — it dies by inaction, never a formal rejection. Sept: Hohhot ad hoc (N4893) — four vendors present mutually incompatible implementations; the Script Ad Hoc itself drafts a *graphetic* replacement model (N4889) |
| 2018 | **MWG2 (San Jose)**: "the phonetic model should not be abandoned"; L2/18-099 proposes deprecating the NNBSP mechanism; UTC #156 decides variant documentation moves into a UTN |
| 2019 | **MWG3 (Ulaanbaatar)**: NNBSP "very problematic and should not be used" (both countries); action item: **"Liang Hai and Liang Jinbao will investigate new rules for MVS, to establish if it can be used in place of NNBSP"** — the documented pivot |
| 2020 | UTR #54 freezes the 12.1 charts; **L2/20-057 proposes FVS4 at U+180F** — the connector's would-be code point becomes a variation selector; MWG4 planned, apparently never held (COVID) |
| 2021 | Unicode 14.0 encodes U+180F FVS4 |
| 2023 | **GB/T 25914—2023** published (2023-11-27; in force 2024-06-01): MVS as the suffix leading character |
| 2024 | UTN #57 v1–v4 (Kushim Jiang, Jul–Aug); L2/24-180 (Liang Hai): "We need to catch up in this year's 16.0"; **UTC #180 consensus 180-C31**: core spec will reference UTN #57 for GB/T compatibility; **Unicode 16.0 (2024-09-10) moves the connector role to MVS** — zero mentions in the release notes; Noto Sans Mongolian v3.002 ships (2024-07-24) |
| 2025 | Script co-official in Mongolia (Jan 1, dual-script official documents); MLREQ republished (Jul 10) **still NNBSP-based**; Unicode 17.0: no Mongolian changes |
| 2026 | r12a orthography notes teach MVS (Jun); L2/26-091 proposes deprecating the Mongolian standardized variants in the UCD; Microsoft ships its first Baiti shaping update in ~6 years (Jul, Insider/Release Preview) |

## The suffix connector saga, condensed

1. **1998 — the original sin.** China and Mongolia asked for a dedicated
   Mongolian space/connector (Quejingzhabu had proposed one). The UTC
   generalized it to U+202F NNBSP in General Punctuation so other scripts
   could share it. That sharing is exactly what broke it: because Arial,
   Calibri, Times, Courier, Charis SIL all carry U+202F, font fallback can
   resolve the NNBSP from a *non-Mongolian* font, destroying the OpenType
   context match — "Mongolian text which includes NNBSP-sequenced suffixes
   will never display correctly given a non-Mongolian fallback font is
   selected" (L2/17-036). Plus: word breaking, search, sort, word count,
   cursor movement all treat NNBSP as a space; and the French-typography use
   of NNBSP made property changes politically impossible (L2/15-212).

2. **2017 — the dedicated character that never was.** L2/17-036 proposed
   U+180F MONGOLIAN SUFFIX CONNECTOR, with prototype fonts already
   demonstrating that **MVS works as the connector** ("The requirements for
   the tsatslag connector and the requirements of the suffix connector are
   identical"). Liang Hai's counter (L2/17-052): suffix identity rests on
   contested grammatical analysis; non-breaking is typographic preference;
   Manchu/Sibe treat suffixes as separate words. The Script Ad Hoc noted a
   new character means supporting *both* forever. UTC #150 took no action.
   The README's old phrasing "proposed — and rejected" is imprecise: it died
   by inaction, and U+180F was later consumed by FVS4 (Unicode 14.0) — in a
   proposal authored by the man who had opposed the connector.

3. **2019–2024 — MVS wins by the back door.** MWG3 tasked Liang Hai and
   Liang Jinbao with investigating MVS-for-NNBSP. The result surfaced not in
   Unicode first but in **GB/T 25914—2023**, China's national standard; UTN
   #57 implemented it; L2/24-180 then asked Unicode to align, and UTC #180
   consensus 180-C31 did so for 16.0. **The standards flow reversed**: in
   1999 ISO/Unicode led and China followed; in 2024 the GB standard led and
   Unicode caught up — with Mongolia's Jan-2025 co-officialization deadline
   as urgency. The MVS suffix model gege-linter enforces is, genealogically,
   a Chinese national standard adopted upward.

4. **The change is deliberately invisible.** Zero UCD property changes, zero
   release-notes mentions, byte-identical rendering in updated fonts. Old
   NNBSP text and new MVS text look the same and *search differently* —
   Andrew West's 2015 objection to a new character (L2/15-212: text with
   NNBSP and text with the new character "will look the same to end users"
   yet searches for one "will not match" the other) now applies point for
   point to the NNBSP/MVS duality. That duality is this linter's founding
   problem.

## Why the 1999 model kept failing (context for everything above)

- **Under-specified**: "the exact shaping behaviour of Mongolian remains
  undefined" (West, 2007); vendors filled gaps incompatibly (Menksoft,
  Microsoft/Founder Baiti, Almas, Bolorsoft, Jade Bird Huaguang) — the same
  visual form needed different FVS sequences per font.
- **Confusable by design**: five different characters can encode the same
  final written form; users literally cannot see O/U mis-encodings
  (MWG/2-N12). "Unintended mistakes … make the phonetic information in text
  unreliable from the moment text is input."
- **Nearly abandoned**: the UTC's own Script Ad Hoc drafted a graphetic
  (glyph-based) replacement model in 2017; at Hohhot the UTC "did not state
  a preference for either model". Only MWG2 (2018) locked the phonetic model
  in — "we cannot desert our existing user community". The graphetic camp
  persists (Zteam petition, w3c/mlreq#38, open since 2020).

## Standing facts for the linter

- GB/T 25914—2023 is *recommended* (voluntary), covers Hudum + Hudum Ali
  Gali only; companion standards for Todo/Sibe/Manchu are in progress
  (GB/T 36649/36641/36645 revisions, per L2/25-140).
- Mongolia has **no national encoding standard** aligned to the new model,
  even after co-officialization.
- W3C MLREQ actively re-published the NNBSP model in July 2025 and has no
  tracker issue about MVS alignment — guidance online genuinely contradicts
  the standard, which is part of this project's pitch.
- L2/26-091 (2026-04) proposes deprecating the UCD Mongolian standardized
  variants — watch it; it would further consecrate UTN #57/mongfontbuilder
  as the only variant registry (see `variation-sequences.md`).
