# Hudum suffix registry (залгах нөхцөл)

Knowledge base for Tier-2 rules (`unknown-suffix`, `space-before-suffix`).
Drafted 2026-07-25 from `suffixes.csv`, cross-checked against school grammar
tables (тийн ялгалын хүснэгт, `.tmp/` images), UTN #57 v4 (2024-08-14, latest
as of this writing), and the mongfontbuilder particle shaping registry.

## Encoding ground rules

- **The suffix connector is MVS (U+180E)** — Unicode 16.0 core spec §13.5
  moved this role from NNBSP (U+202F), which is now legacy/back-compat only.
  Everything below assumes MVS.
- **Question particles are NOT MVS-joined** — ᠤᠤ / ᠦᠦ follow a plain
  space (U+0020) per the UTN #57 registry ("u u", "ue ue" entries have no
  `mvs` prefix). The `space-before-suffix` rule must never flag these.
- Bichig cells in the tables show **letters only, without the leading
  connector** (project rule: never type invisible characters as literals).
  The **Code points** column is normative and includes the connector.
  `⟨MVS⟩` marks a *word-internal* U+180E (only ᠯᠤᠭ⟨MVS⟩ᠠ has one).
- Rendering note: cells display in isolated/word-initial letter forms; in
  real text after MVS they take particle-specific forms (e.g. crownless
  initial a/e, tailed final u/ü).

## How to read the conditions

School grammar classifies stem endings into four groups:

| Group | Endings |
|---|---|
| эгшиг | any vowel |
| н | word-final ᠨ |
| м, л, нг | soft consonant finals |
| хатуу дэвсгэр | **б, г, р, с, д** (hard finals) |

Gender = vowel harmony: masculine (a/o/u) vs feminine (e/ö/ü) stems;
"neutral" = single form for both. `Reg` column: ✓ = present in the UTN #57
shaping registry; — = absent there *only because it needs no special letter
forms* (absence ≠ invalid; see [Provenance](#provenance--the-registry-caveat)).

## Case suffixes (тийн ялгал)

### 1. Genitive — харьяалахын тийн ялгал (-ын/-ийн/-ы/-ий)

| Bichig | Code points | Translit | Cyrillic | Gender | Use after | Reg |
|---|---|---|---|---|---|---|
| ᠶᠢᠨ | `U+180E U+1836 U+1822 U+1828` | yin | -ийн/-ын | neutral | vowels | ✓ |
| ᠤᠨ | `U+180E U+1824 U+1828` | un | -ын | masc | consonants except н | ✓ |
| ᠦᠨ | `U+180E U+1826 U+1828` | ün | -ийн | fem | consonants except н | ✓ |
| ᠤ | `U+180E U+1824` | u | -ы | masc | н | ✓ |
| ᠦ | `U+180E U+1826` | ü | -ий | fem | н | ✓ |

Note: for ᠤ/ᠦ the н belongs to the *stem* in bichig (ᠬᠠᠭᠠᠨ ᠤ = хааны);
Cyrillic surface -ны/-ний appears when the Cyrillic stem hides the historic
n (морь(н) → морины).

### 2. Accusative — заахын тийн ялгал (-ыг/-ийг/-г)

| Bichig | Code points | Translit | Cyrillic | Gender | Use after | Reg |
|---|---|---|---|---|---|---|
| ᠶᠢ | `U+180E U+1836 U+1822` | yi | -г | neutral | vowels | ✓ |
| ᠢ | `U+180E U+1822` | i | -ыг/-ийг | neutral | consonants | ✓ |

### 3. Dative-locative — өгөх оршихын тийн ялгал (-д/-т)

d-forms after vowels and soft finals (н, м, л, нг); t-forms after the hard
finals б, г, р, с, д. The -р forms are the fuller classical variants; the
short forms are equally standard.

| Bichig | Code points | Translit | Cyrillic | Gender | Use after | Reg |
|---|---|---|---|---|---|---|
| ᠳᠤ | `U+180E U+1833 U+1824` | du | -д | masc | vowel/soft finals | ✓ |
| ᠳᠦ | `U+180E U+1833 U+1826` | dü | -д | fem | vowel/soft finals | ✓ |
| ᠳᠤᠷ | `U+180E U+1833 U+1824 U+1837` | dur | -д | masc | vowel/soft finals | ✓ |
| ᠳᠦᠷ | `U+180E U+1833 U+1826 U+1837` | dür | -д | fem | vowel/soft finals | ✓ |
| ᠲᠤ | `U+180E U+1832 U+1824` | tu | -т | masc | б г р с д | ✓ |
| ᠲᠦ | `U+180E U+1832 U+1826` | tü | -т | fem | б г р с д | ✓ |
| ᠲᠤᠷ | `U+180E U+1832 U+1824 U+1837` | tur | -т | masc | б г р с д | — |
| ᠲᠦᠷ | `U+180E U+1832 U+1826 U+1837` | tür | -т | fem | б г р с д | ✓ |

### 4. Ablative — гарахын тийн ялгал (-аас⁴)

| Bichig | Code points | Translit | Cyrillic | Gender | Use after | Reg |
|---|---|---|---|---|---|---|
| ᠠᠴᠠ | `U+180E U+1820 U+1834 U+1820` | acha | -аас/-оос | masc | any ending | ✓ |
| ᠡᠴᠡ | `U+180E U+1821 U+1834 U+1821` | eche | -ээс/-өөс | fem | any ending | — |

### 5. Instrumental — үйлдэхийн тийн ялгал (-аар⁴)

| Bichig | Code points | Translit | Cyrillic | Gender | Use after | Reg |
|---|---|---|---|---|---|---|
| ᠪᠠᠷ | `U+180E U+182A U+1820 U+1837` | bar | -аар/-оор | masc | vowels | — |
| ᠪᠡᠷ | `U+180E U+182A U+1821 U+1837` | ber | -ээр/-өөр | fem | vowels | — |
| ᠢᠶᠠᠷ | `U+180E U+1822 U+1836 U+1820 U+1837` | iyar | -аар/-оор | masc | consonants | ✓ |
| ᠢᠶᠡᠷ | `U+180E U+1822 U+1836 U+1821 U+1837` | iyer | -ээр/-өөр | fem | consonants | ✓ |

### 6. Comitative — хамтрахын тийн ялгал (-тай/-тэй)

| Bichig | Code points | Translit | Cyrillic | Gender | Use after | Reg |
|---|---|---|---|---|---|---|
| ᠲᠠᠢ | `U+180E U+1832 U+1820 U+1822` | tai | -тай | masc | any ending | — |
| ᠲᠡᠢ | `U+180E U+1832 U+1821 U+1822` | tei | -тэй | fem | any ending | — |
| ᠯᠤᠭ⟨MVS⟩ᠠ | `U+180E U+182F U+1824 U+182D U+180E U+1820` | luγ-a | лугаа | masc | any ending (literary) | — |
| ᠯᠦᠭᠡ | `U+180E U+182F U+1826 U+182D U+1821` | lüge | лүгээ | fem | any ending (literary) | ✓ |

May also be written *attached* to the stem — writer's choice; both are valid
(so the linter must accept attached ᠲᠠᠢ without a preceding connector).
ᠯᠤᠭ⟨MVS⟩ᠠ carries a word-internal MVS before its final ᠠ.

### 7. Directive — чиглэхийн тийн ялгал (-руу/-рүү) — ⚠ needs confirmation

School tables list it as a case; in bichig it appears to be the separate
word ᠤᠷᠤᠭᠤ (uruγu, `U+1824 U+1837 U+1824 U+182D U+1824`) joined by a
plain space, not an MVS particle (it is absent from the UTN #57 registry).
**Excluded from the linter dictionary v1 until verified.**

## Reflexive-possessive — хамаатуулах нөхцөл (-аа⁴)

| Bichig | Code points | Translit | Cyrillic | Gender | Use after | Reg |
|---|---|---|---|---|---|---|
| ᠪᠠᠨ | `U+180E U+182A U+1820 U+1828` | ban | -аа/-оо | masc | vowels | — |
| ᠪᠡᠨ | `U+180E U+182A U+1821 U+1828` | ben | -ээ/-өө | fem | vowels | — |
| ᠢᠶᠠᠨ | `U+180E U+1822 U+1836 U+1820 U+1828` | iyan | -аа/-оо | masc | consonants | ✓ |
| ᠢᠶᠡᠨ | `U+180E U+1822 U+1836 U+1821 U+1828` | iyen | -ээ/-өө | fem | consonants | ✓ |

Stacks after case suffixes (задлаг хэлбэр): ᠲᠠᠢ ᠪᠠᠨ = -тайгаа,
ᠶᠢᠨ ᠢᠶᠡᠨ = -нийхээ, etc. — each piece gets its own MVS. Fused
(нийлэг) forms exist for the dative: see ᠳᠠᠭᠠᠨ/ᠳᠡᠭᠡᠨ below.

## Plural — олон тооны дагавар

| Bichig | Code points | Translit | Cyrillic | Gender | Use after | Reg |
|---|---|---|---|---|---|---|
| ᠤᠳ | `U+180E U+1824 U+1833` | ud | -ууд | masc | consonants | ✓ |
| ᠦᠳ | `U+180E U+1826 U+1833` | üd | -үүд | fem | consonants | ✓ |
| ᠨᠤᠭᠤᠳ | `U+180E U+1828 U+1824 U+182D U+1824 U+1833` | nuγud | -ууд | masc | vowels | — |
| ᠨᠦᠭᠦᠳ | `U+180E U+1828 U+1826 U+182D U+1826 U+1833` | nügüd | -үүд | fem | vowels | ✓ |
| ᠨᠠᠷ | `U+180E U+1828 U+1820 U+1837` | nar | нар | masc | people/titles | — |
| ᠨᠡᠷ | `U+180E U+1828 U+1821 U+1837` | ner | нэр | fem | people/titles | — |

## Fused and clitic combinations (registry-confirmed)

| Bichig | Code points | Translit | Cyrillic | Meaning | Reg |
|---|---|---|---|---|---|
| ᠳᠠᠭᠠᠨ | `U+180E U+1833 U+1820 U+182D U+1820 U+1828` | daγan | -даа/-доо | dative + reflexive | ✓ |
| ᠳᠡᠭᠡᠨ | `U+180E U+1833 U+1821 U+182D U+1821 U+1828` | degen | -дээ/-дөө | dative + reflexive | ✓ |
| ᠠᠴᠠᠭᠠᠨ | `U+180E U+1820 U+1834 U+1820 U+182D U+1820 U+1828` | achaγan | -аасаа | ablative + reflexive | ✓ |
| ᠳᠤᠨᠢ | `U+180E U+1833 U+1824 U+1828 U+1822` | duni | -д нь | dative + 3p poss. | ✓ |
| ᠳᠦᠨᠢ | `U+180E U+1833 U+1826 U+1828 U+1822` | düni | -д нь | dative + 3p poss. | ✓ |
| ᠲᠦᠨᠢ | `U+180E U+1832 U+1826 U+1828 U+1822` | tüni | -т нь | dative + 3p poss. | ✓ |
| ᠳᠠᠬᠢ | `U+180E U+1833 U+1820 U+182C U+1822` | daqi | -дахь | "located at" | ✓ |
| ᠳᠡᠬᠢ | `U+180E U+1833 U+1821 U+182C U+1822` | deqi | -дэхь | "located at" | ✓ |
| ᠳᠤᠭᠠᠷ | `U+180E U+1833 U+1824 U+182D U+1820 U+1837` | duγar | -дугаар | ordinal | ✓ |
| ᠳᠦᠭᠡᠷ | `U+180E U+1833 U+1826 U+182D U+1821 U+1837` | düger | -дүгээр | ordinal | ✓ |

Expected-but-unregistered harmonic mates (valid, no special shaping, hence
absent from the registry): ᠲᠠᠭᠠᠨ/ᠲᠡᠭᠡᠨ (-таа/-тээ after hard finals),
ᠡᠴᠡᠭᠡᠨ (-ээсээ), ᠲᠤᠨᠢ (-т нь masc).

## Space-joined particles (plain U+0020, never MVS)

| Bichig | Code points | Cyrillic | Meaning | Reg |
|---|---|---|---|---|
| ᠤᠤ | `U+1824 U+1824` | уу | question particle | ✓ |
| ᠦᠦ | `U+1826 U+1826` | үү | question particle | ✓ |
| ᠪᠦᠦ | `U+182A U+1826 U+1826` | бүү | prohibitive (preposed) | ✓ |
| ᠦᠭᠡᠢ | `U+1826 U+182D U+1821 U+1822` | үгүй / Cyrillic -гүй | negation ("without") | — |

ᠦᠭᠡᠢ (ügei) is an ordinary separate word, never connector-joined (ruled
2026-07-25): bichig does not make Cyrillic's -гүй contraction — санамсаргүй
is written ᠰᠠᠨᠠᠮᠰᠠᠷ ᠦᠭᠡᠢ with a plain space. Unlike ᠤᠤ/ᠦᠦ it has no
particle-shaping registration in UTN #57 (it keeps normal word-initial
forms), and no particle inventory in any era (NNBSP-based MLREQ included)
lists it. `space-before-suffix` must treat a space before it as correct;
MVS before it is the error.

ᠦᠭᠡᠢ is also **invariantly feminine** — it has no masculine counterpart and
does not harmonise to the preceding stem, so ᠠᠪᠤ ᠦᠭᠡᠢ (аавгүй) pairs a
masculine stem with a feminine particle and that is correct (confirmed
2026-07-26). Consequence for anything inferring harmony from letter choice:
read the **stem only**. Tungaamal writes this particle with its feminine-g
letter U+1889 unconditionally, so a whole-string reading tags every -гүй
word feminine regardless of what the stem actually is.

## Possessive clitics (added 2026-07-25, corpus-verified)

Standard detached clitics, MVS-joined; absent from the shaping registry only
because they need no special letter forms. Found missing when corpus-linting
gege.mn's blog (ᠳᠠᠷᠠᠭ⟨MVS⟩ᠠ ᠨᠢ etc. warned).

| Bichig | Code points | Translit | Cyrillic | Meaning |
|---|---|---|---|---|
| ᠨᠢ | `U+180E U+1828 U+1822` | ni | нь | 3p possessive |
| ᠮᠢᠨᠢ | `U+180E U+182E U+1822 U+1828 U+1822` | mini | минь | 1sg possessive |
| ᠴᠢᠨᠢ | `U+180E U+1834 U+1822 U+1828 U+1822` | chini | чинь | 2sg possessive |

The same corpus scan surfaced two encoding bugs in gege.mn, both ruled by
its author 2026-07-25: (1) the blog wrote санамсаргүй with an MVS before
ᠦᠭᠡᠢ — fix is MVS → plain space (see the space-joined particles section);
(2) the landing page wrote plural захидлууд with an FVS1 inside the suffix
(`U+180E U+1824 U+180B U+1833`) — registered in UCD as U's "second form",
but redundant since particle shaping after the connector is automatic, and
therefore incorrect. The rule's stray-FVS strip fix repairs exactly this.

## Verb suffixes are NOT in this registry (noted 2026-07-27)

Everything above is **nominal** — case, reflexive, plural, clitics, particles.
There is no verb morphology here at all: no participles, converbs, tense or
negation. The one verb-adjacent row is `daγ`/`deγ` in the table below, and it is
marked low confidence.

That is a real gap, not an oversight of documentation. Anyone adding verb
suffixes should add them **here**, with sources, so both consumers get them.

Until then, `@gege-mn/gege-converter` carries its own
`src/data/verb-suffixes.ts`, and that table is explicitly **not** canonical: its
Classical column was *mined from attested pairs* by
`scripts/mine-verb-suffixes.mjs` rather than sourced, and every row records how
many times the pairing was seen. It should be replaced by a sourced table here
the moment one exists. Two findings from that mining worth keeping:

- **`-сан`/`-сон` → `γsan`** at 94–100% over 25 attestations, independently
  confirmed by a bichig reader the same day.
- **`-аад`/`-ээд`, the perfective converb, has zero attestations** in a lemma
  dictionary — it is an inflection, so it never appears as a headword. It cannot
  be established from dictionary data at all and needs a grammar source.

## Registry entries not yet in scope

MVS-joined particles present in the UTN #57 registry but outside the current
tables — candidates for a later expansion pass:

| Translit | Bichig | Cyrillic (best guess) | Confidence |
|---|---|---|---|
| chu / chü | ᠴᠤ / ᠴᠦ | ч ("also/even") | high |
| yüm | ᠶᠦᠮ | юм | high |
| yümsen | ᠶᠦᠮᠰᠡᠨ | юмсан | medium |
| da / de | ᠳᠠ / ᠳᠡ | archaic dative -да/-дэ | medium |
| dag / deg | ᠳᠠᠭ / ᠳᠡᠭ | -даг/-дэг? | low — verify why detached |
| yügen | ᠶᠦᠭᠡᠨ | -ийгээ (refl. acc.)? | low |
| nügen | ᠨᠦᠭᠡᠨ | ? | low |
| hü | ᠬᠦ | кү/хү emphatic (classical) | medium |

## Provenance & the registry caveat

- **mongfontbuilder `particles.json` is a *shaping* registry, not a
  suffix dictionary.** Each of its 47 MNG entries maps a particle to the
  letter indices that take particle-specific written forms. Particles whose
  letters all shape by default rules (ᠪᠠᠷ, ᠲᠠᠢ, ᠲᠤᠷ, ᠨᠤᠭᠤᠳ, ᠡᠴᠡ,
  ᠪᠠᠨ …) are simply absent. It therefore *validates* entries it contains
  but cannot *refute* ones it lacks. The `unknown-suffix` dictionary must be
  this document's tables, not that file alone.
- Sources: Unicode 16.0 core spec §13.5 · UTN #57 v4 `utn57-mong-4.pdf`
  (2024-08-14) · `Kushim-Jiang/mongfontbuilder` `data/particles.ts` (fetched
  2026-07-25) · Mongolian school grammar tables (тийн ялгал / ерөнхийлөн
  хамаатуулах charts, `.tmp/`, collected 2026-07-25) · `suffixes.csv`
  (hand-compiled, errata below).

## Errata found in suffixes.csv (2026-07-25 audit)

1. **Mixed connectors**: rows 7–10 and 17–22 used legacy NNBSP (U+202F);
   the rest used MVS. Normalized to MVS throughout this doc.
2. **Rows 7–8 mislabeled**: ᠢᠶᠠᠨ/ᠢᠶᠡᠨ were tagged genitive (-ийн/-ын);
   they are the reflexive-possessive (-аа⁴ after consonant stems).
   Confirmed by the ерөнхийлөн хамаатуулах chart and the registry.
3. **Row 28 corrupted** (тэй): cell contained `TA E OE ⟨MVS⟩ BA E NA` —
   U+1825 (OE) typo for U+1822 (I), plus a stray ᠪᠡᠨ pasted in from
   row 30. Correct form: `U+180E U+1832 U+1821 U+1822`.
4. **Row 29 truncated** (тай бан → -тайгаа): only ᠲᠠᠢ present; the
   ` ᠪᠠᠨ` part was missing.
5. **Row 30** (тэй бэн): same OE-for-I typo as row 28.
6. **Coverage gaps**: ablative, directive, standalone ᠪᠠᠨ/ᠪᠡᠨ, plural
   ᠨᠠᠷ/ᠨᠡᠷ, question particles, and fused forms were absent — added above.
7. Confirmed correct: the hard-final list **б, г, р, с, д** (rows 23–26)
   matches the school tables exactly; genitive/accusative/instrumental/
   plural conditions all check out.

## Linter implications

- `unknown-suffix` (rule 7): after MVS, the following letter run must match
  a table entry above (longest-match). Warn, not error — the tables are
  believed complete for standard Hudum, but Ali Gali/foreign text exists.
- `space-before-suffix` (rule 8): plain space followed by a dictionary
  suffix → "did you mean MVS?" — but **whitelist ᠤᠤ/ᠦᠦ/ᠪᠦᠦ** (space is
  correct) and standalone-word homographs (ᠤᠷᠤᠭᠤ).
- Comitative ᠲᠠᠢ/ᠲᠡᠢ attached directly to a stem is valid — no diagnostic.
- Machine-readable form: vendor these tables as `src/data/suffixes.json`
  (generated, with provenance header) when implementing.
