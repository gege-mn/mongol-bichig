# Orthography of written Mongolian — mechanically checkable rules (Tier 3 fuel)

Researched 2026-07-25. Primary sources: Poppe, *Grammar of Written
Mongolian* (1974 printing; cited by stable § numbers), UTN #57 v4
(Tables 4–6), r12a orthography notes, mongfontbuilder particles.json.
Letters: a U+1820, e U+1821, i U+1822, o U+1823, u U+1824, ö U+1825,
ü U+1826, é U+1827; galig (foreign-sound) letters are U+1839–U+1842.
Invisibles as `U+XXXX`.

## Vowel harmony — the load-bearing law

Poppe §32, verbatim: "A word can contain only back vowels (a, o, u) or only
front vowels (e, ö, ü). Back and front vowels do not occur together in any
words except loan words. The vowel i … is, therefore, considered a neutral
vowel." And: "Words with i in all syllables are front vocalic words and
require endings with front vowels."

UTN #57 Table 5 letter classes: masculine {a, o, u}; feminine {e, ö, ü,
**é U+1827**}; neuter {i}. **é being feminine is a surprise** — it occurs
almost only in loanwords (sekünd, métr; the UTN's own example *adrés* is a
mixed-gender loan), so treat U+1827 as both a harmony participant and a
loanword beacon.

Exception classes (all structural — no exception word list exists anywhere):
loanwords (galig letters or é present → strong signal; Poppe §51: "In loan
words k may occur with a and other back vowels"); connected compound proper
names (§88, the ulaγanbaγatur / Naran-gerel type — bichig has no case, so
undetectable). ᠮᠣᠩᠭᠣᠯ is **not** a harmony exception — o…o is harmonic; it
only looked exceptional to the naive non-initial-o heuristic.

Why a linter rule has value even though text "renders fine": UTN #57's
shaping is deliberately *total* — the h/g gender chain ends in a feminine
fallback and handles mixed words via "remotely follows … without a blocking
…" clauses, so harmony violations render *something* plausible. Visual
inspection cannot catch them.

**q/γ vs k/g gender pairing is NOT code-point checkable**: q/k unify in
U+182C, γ/g in U+182D; gender lives in shaping, not encoding. The
vowel-harmony rule subsumes it.

## The o/ö distribution rule

> **Corrected 2026-07-26. Poppe §33 does not describe modern practice, and
> the "upgrade" this section used to propose was wrong — do not implement
> it.** See the ruling below before using anything in this section.

Poppe §33: "The vowel o does not occur in the medial or in the final
syllables of words of which the first syllable is formed by a or u. The
vowel o occurs only in the non-initial syllables of words of which the first
syllable contains o or, rarely, i. The vowel ö occurs in the non-initial
syllables of words of which the first syllable contains ö."

Read literally, that licenses non-initial o after an initial o, which would
make ᠮᠣᠩᠭᠣᠯ / oroi / qorin regular rather than exceptional. An earlier
version of this document proposed narrowing `non-initial-o` on that basis.

**That is not the rule taught in Mongolia, and it is not what to implement.**
The school rule is categorical, with no first-vowel condition:

> Монгол бичигт үгийн нэгдүгээр (тэргүүн) үеэс хойш о, ө үсгүүд
> бичигдэхгүй бөгөөд тэдгээрийн оронд эр үгэнд у, эм үгэнд ү үсэг
> бичигддэг.

After the first syllable, masculine words take **u** and feminine **ü**,
full stop. So монгол is `mongγul` (ᠮᠣᠩᠭᠤᠯ), богино is `boγuni`, орой is
`orui`, тогоо is `toγuγ-a`.

Two independent confirmations, both 2026-07-26:

1. A bichig reader ruled on it directly, supplying the corrected forms.
2. **Tungaamal applies the rule throughout its own output** —
   богино→ᠪᠣᠭᠤᠨᠢ, орой→ᠣᠷᠤᠢ, тогоо→ᠲᠣᠭᠤᠭ[MVS]ᠠ — while exempting ᠮᠣᠩᠭᠣᠯ
   alone. A commercial Mongolian converter treating it as one frozen
   lexical exception is evidence the *rule* is general, not that Poppe's
   conditioning is live.

Genuine exceptions remain, which is why the rule stays **info** severity:
loanwords keep their o (ᠹᠣᠲᠣ, ᠻᠢᠨᠣ), and ᠭᠣᠣᠯ (γool, "river") has a
doubled short o. Those are lexical, listed one by one — not derivable from
a first-vowel condition.

## Vowel sequences (native inventory is closed — Poppe §89–94)

- Doubled letters mark long **u, ü, i** (buu, degüü, γaǰiiqu) — legitimate,
  including word-finally.
- Doubled **o** exists but marks *short* o in a few lexical items
  (door-a, qoor-a — disambiguating from dur-a, qur-a). Never write "doubled
  vowel = long vowel" in docs; it is false for o.
- **Long a/e are never doubled** — written with the γ/g hiatus (aγa, ege,
  oγo, aγu, öge, egü …). Therefore adjacent `U+1820 U+1820` or
  `U+1821 U+1821` is a typo or a Cyrillic-transliteration artifact (аа/ээ
  typed letter-for-letter) → strong candidate rule, warning. Shipped as
  gege-linter's `doubled-ae`.

  **Where the artifact comes from, and why it can carry no mechanical fix**
  (bichig reader, 2026-07-27). Two different things produce a Cyrillic аа:
  the reflexive possessive, which is bichig ᠢᠶᠠᠨ/ᠢᠶᠡᠨ, and the vocative for
  calling someone, which is a **single** ᠠ/ᠡ. Cyrillic requires a space for
  the second — аав аа, ээж ээ — "but many people writing just smush them
  together, so it's hard to distinguish if 'ааваа' means abu-ban or abu a."
  The ambiguity is created in Cyrillic; transliterating letter for letter
  carries it into bichig as a doubled vowel that is wrong under either
  reading, but whose correct repair depends on which was meant.
- Diphthongs: word-final V+i (ai/ei/oi/ui/üi); au, eü (taulai, keüken).
  Classical spelling wrote *medial* i-diphthongs as V+y+i (ayil, sayin), but
  **UTN #57 prefers the modern analyses ail/aimag/taulai — do not lint
  medial V+i.**
- ua/uua occurs only word-finally *with the separated a*: quu-a, činu-a —
  i.e. `… U+1824 U+180E U+1820`.

Whitelist of native adjacent-vowel pairs: {a,e,o,u,ö,ü}+i, a+u, e+ü, u+u,
ü+ü, i+i, o+o. Anything else (a+e, o+u, u+o, a+o, i+a …) → info-level
candidate (`vowel-adjacency`), loans downgraded as usual.

## The separated final a/e (chachlag) vs suffix MVS

- Which stems separate their final a/e is a strong consonant-class tendency
  (Poppe §87: after q, γ, s, l, m, r "usually"; also the syllables se/le/
  me/re) but lexically frozen per word — Poppe shows both ᠠᠬᠠ and separated `<1820 182C 180E 1820>`.
  **Not decidable mechanically; the linter must accept both.**
- Chachlag also occurs **after vowels** (quu-a, door-a) — "MVS must follow a
  consonant" would be wrong.
- `MVS + a/e + word boundary` is doubly legitimate: chachlag *or* the
  archaic dative-locative -a/-e (Poppe §104: γaǰar-a "to the country") —
  encoding-identical, and particles.json deliberately has no bare `mvs a`
  entry (chachlag is a shaping step, not a particle). The `unknown-suffix`
  exemption for it is provably the only correct behavior.
- `MVS + a/e + FVS` selects the *default* (non-chachlag) form — the
  sanctioned escape hatch; keep tolerating it.

**New rule candidate `chachlag-harmony`** (works under *both* readings of
the ambiguity): `MVS + a` after a word whose last non-neutral vowel is
feminine → warning ("separated final should be ᠡ"), and mirror. All-neutral
(i-only) words are front-class → expect e. Low FP risk; warning.

## Suffix–stem gender agreement (the flagship Tier-3 rule)

Poppe §104: suffixes harmonize — back-vowel form after back-vowel stems,
front after front (qaγan-luγ-a vs eke-lüge). All-neutral stems take
**feminine** suffixes (§32; UTN #57's shaping default agrees — its gender
chain ends "else: Feminine").

Mechanics for `suffix-harmony`:
- Stem gender = last vowel in {a,o,u} ∪ {e,ö,ü,é} scanning right-to-left
  (identical to word-class for native words; most defensible guess for mixed
  loans). No non-neutral vowel → feminine.
- Check every dictionary-matched suffix whose gender is masc/fem (the pairs
  in `suffixes.md`: un/ün, du/dü, acha/eche, bar/ber, iyar/iyer, tai/tei,
  ban/ben, ud/üd, daγan/degen, duγar/düger …). Neutral suffixes (yin, yi, i,
  ni, mini, chini) exempt by construction.
- **Fix is mechanical**: the pairs are 1:1 — offer the harmonic mate.
- Severity: warning; info when the stem contains galig letters or é.
- Prerequisite: `src/data/suffixes.ts` needs a `gender` field added from the
  `suffixes.md` tables.

## Other structural candidates, ranked

| Rule | Statement | Basis | FP risk | Severity |
|---|---|---|---|---|
| word-initial ng | U+1829 has no initial form; no word begins with /ŋ/ | UTN #57 T4 | ~zero | warning |
| `doubled-a-e` | adjacent U+1820 U+1820 / U+1821 U+1821 | Poppe §89–94 | low | warning |
| `postconsonantal-final-n` | word-final U+1828 right after a consonant ("no words ending in ln, rn, gn") | Poppe §98 | low | warning |
| `wrong-script-punctuation` | U+1807/U+1808/U+1809 in Hudum text (**not** U+1806 — chart says it's also Hudum) | charts | very low | warning |
| `impossible-final` | word-final p/t/č/ǰ/q-k (U+182B 1832 1834 1835 182C) never native (§57 lists exactly these six; it treats s separately — syllable-final yes, word-final no — and never mentions š) | Poppe §57 | low-mod (loans) | info |
| `geminate-consonant` | identical adjacent consonants except dd (verb boundaries: üileddümüi) and gg (öggümüi) | Poppe §97 | moderate | info |
| `no-vowel-word` | vowel-less letter run *not* ending in nirugu U+180A (nirugu-final = sanctioned patronymic abbreviation) | §91; UTN 57 §2.2.2 | moderate | info |
| `vowel-adjacency` | outside the native pair whitelist | Poppe §89–94 | moderate | info |
| `digit-consistency` | U+1810–1819 and ASCII digits mixed in one document | UTN 57 T1; r12a | low | info |
| `initial-cluster` | word-initial CC (loans only — but whitelist ᠲᠩᠷᠢ tngri, vcir: native vowel-omission canon) | Poppe §95, §91 | mod-high | info, marginal |

### ★ Newly lintable: no ГА after a д/с дэвсгэр (added 2026-07-31)

The 2026 national rulebook §2.1.2.3 states categorically that ᠭ (GA, U+182D)
does not occur after a ᠳ or ᠰ дэвсгэр — the voiceless ᠬ (QA/KA, U+182C) appears
instead: баясгалан, өтгөн, тосгон, сэтгэл. This is a **code-point-adjacent**
rule and so escapes the "q/γ-vs-k/g is not checkable" caveat below: that caveat
is about *gender* (q vs k unify in U+182C), whereas this is about *voicing*,
and ᠬ and ᠭ are distinct code points.

Candidate rule `ga-after-hard-dental`: flag ᠭ immediately preceded by ᠳ or ᠰ.
FP risk **moderate** — loanwords are exempt (rulebook §3.3.3.3 gives foreign
words their own consonant rules), and one native lexical exception is already
attested (тоосго, ruled ᠲᠣᠭᠤᠰᠭ U+180E ᠠ by a reader on 2026-07-29 against both this
rule and the 2015 Цэвэл). Severity `info`, not `warning`, until the exception
class is bounded.

The converse — rewriting ᠬ to ᠭ in this position — is **wrong** and was shipped
and withdrawn downstream; see [rulebook-2026.md](rulebook-2026.md) §2.1.2.3.

Not lintable (documented so nobody retries): q/γ-vs-k/g as such;
connected-vs-separated final -a per stem; medial V+i; U+1802/U+1803 spacing
(no normative source — Poppe §86: punctuation "used at random");
U+1804 COLON's function (described nowhere); digit orientation (layout).

## Punctuation & numerals notes

Classical functions: U+1802 ceg ≈ comma; U+1803 dabqur ceg ends sentences;
U+1805 four dots ends passages; U+1800 birga heads texts. Modern practice
uses fullwidth upright ？！ (U+FF1F/U+FF01 — UTN #57 Table 1 lists the CJK
question mark as required). Mongolian digits U+1810–1819 are "less used
now"; ASCII digits are common. UTN #57 §2.2.3 explicitly defers all
number/punctuation specifications to future versions — the authoritative
source has nothing here yet.
