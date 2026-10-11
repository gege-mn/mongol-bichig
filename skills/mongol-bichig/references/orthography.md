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

Not lintable (documented so nobody retries): q/γ-vs-k/g as such;
connected-vs-separated final -a per stem; medial V+i; U+1802/U+1803 spacing
(no normative source — Poppe §86: punctuation "used at random");
U+1804 COLON's function (described nowhere); digit orientation (layout).

## Personal names: one script spelling, several Cyrillic spellings

Observed while digitizing a printed dictionary of personal names (Cyrillic
headword beside its script spelling, about 23,500 names read so far), and
explained by the repository owner on 2026-10-08. Treat it as field evidence
from one book plus a native reader's account, not as a published rule.

**The mapping from script to Cyrillic is one-to-many for names.** Names were
written in the script first. When Cyrillic replaced it, the same written name
was respelt by ear, family by family, and the spellings drifted apart. The
dictionary lists them as separate headwords, or as variants after a `/`, and
prints the *same* script word beside each. In a search for entries with
identical script spellings but different Cyrillic headwords on the same or the
next page, 113 pairs turned up; the owner checked 30 and all but two were
this, not misprints. Examples (romanization as in `romanize.ts`):

| Script | Cyrillic spellings that share it |
|---|---|
| `mendü` | Мэнд, Мэндүү, Мэндээ |
| `yesim-a` | Ишмаа, Ишиймаа |
| `naran` + … | Нар-, Наран- (Нархүү = Наранхүү) |
| `arbiǰiqu` | -Арвижих, -равжих (the second "incorrect, but overused in names until it feels like a separate word") |
| `büǰim-a` | Бүжмаа, Бүжиймаа, Бүзмаа |
| `dorǰikü1ü` | Доржхүү, Доржоохүү |
| `balčoγ` | Балцог, Балчиг |
| `ariyadari` | Арьяадарь, Арьяадаарий |

**Why it branches.** In the script a consonant is normally written with its
vowel, as in the syllabic habits of other Asian writing traditions; the
written word keeps vowels that speech has reduced or dropped, and it does not
mark vowel length. Cyrillic is a phonemic alphabet fitted to the spoken Khalkha
form, so each speller had to decide which reduced vowels to write, whether a
vowel was long, and (for Tibetan and Sanskrit names) which of two
similar-sounding consonants to use. Different decisions, one written name.

Consequences for tools:

- **Cyrillic → script for names is many-to-one and cannot be done by rule.**
  Мэнд, Мэндүү and Мэндээ must all yield `mendü`. A converter that maps each
  Cyrillic letter will produce three different words. A name table keyed by
  Cyrillic spelling is the only reliable source.
- **Identical script spellings under different Cyrillic headwords are normal**
  and are not evidence of an error. The signal for a misprint is a *different
  name* sharing a word (Цолмонбаатар printed with Цолмонбаяр's word), not a
  spelling variant sharing one.
- **A/e and u/ü still follow the Cyrillic variant's gender.** Where the glyph
  is the same either way, the owner's ruling is to take the vowel from the
  Cyrillic headword: Батдэрэм is `batuderm-e` while Батдарам is `batudarm-a`,
  although the two print alike. In a foreign word д/т and у/ү likewise follow
  the Cyrillic.
- **A printed source is not always right.** The same book prints a wrong word
  beside a few names and drops a loop in others (-сүрэн printed without its
  vowel once). Where the correct word is certain it is written, and the
  disagreement with the print is recorded.


## Compound proper names: joined with FVS in Inner Mongolia

A name of a place or a person made of two words, where the second begins
with a vowel, is written two ways. Recorded 2026-10-11 from the repository
owner's account and from Menksoft-encoded test words; field evidence, not a
published rule.

- **Mongolia**: the two parts are kept apart with a hyphen. In the owner's
  Latin notation that hyphen is `=`, so the place name is `bayan=ündür`.
- **Inner Mongolia**: the parts are concatenated into one word. The joint is
  kept readable with variation selectors: the final n of the first part
  takes FVS2 (U+180C), which hides its dot, and the vowel that opens the
  second part takes an FVS of its own.

Inner Mongolia uses the script far more, so the joined spelling is the one
real text is likely to contain.

| Romanization (digit = FVS) | Parts | Code points |
|---|---|---|
| `bayan2ü2ndür` | bayan + ündür | `U+182A U+1820 U+1836 U+1820 U+1828 U+180C U+1826 U+180C U+1828 U+1833 U+1826 U+1837` |
| `čolmon2o1do` | čolmon + odo | `U+1834 U+1823 U+182F U+182E U+1823 U+1828 U+180C U+1823 U+180B U+1833 U+1823` |

Both are what the Menksoft glyphs of those words read as, and the owner
confirmed on 2026-10-11 that the Unicode sequences draw the same shapes as
the Menksoft originals. The three variants are registered for Hudum in
`variants.json`: NA medial FVS2 (condition `devsger`, "first medial form"),
UE medial FVS2 ("third medial form"), O medial FVS1 ("second medial form").

Consequences for tools:

- **These FVS are meaningful, not stray.** A linter must not strip or flag
  them, and a later-syllable o inside such a word (`čolmon2o1do`) is the
  first vowel of the second name, not a `non-initial-o` slip.
- **A joined name can mix vowel genders** for the same reason as the
  connected compounds of Poppe §88 above.
### What Mongolia's rule says

*Монгол бичгийн зөв бичих дүрэм* (Institute of Language and Literature,
Mongolian Academy of Sciences, 2025), approved as the national rule by
resolution No. 02 of the National Council for Language Policy, 2026-02-11.
§3.2.2 covers proper names of compound structure:

1. Second name begins with a **consonant**: written joined. Улаанбаатар,
   Батсайхан, Мөнхцэцэг.
2. A first-syllable ö/ü of the second name keeps its stroke (шилбэ), as it
   would at the start of a word: Амархүү, Даваасүрэн.
3. Second name begins with a **vowel**: separated by a hyphen (зураас).
   Алтан-Од, Энх-Орших, Баян-Өлгий. Exception: where the script spelling of
   the second name begins with a consonant by etymology although the Cyrillic
   begins with a vowel, it is joined (Эрдэнэ-Очир, Лхам-Орлом).
4. A second name beginning with y is joined to the first: Бадам-Ёндон.
5. A first name ending in n before a second beginning with q/γ/k/g writes
   that n as ng: Баянгол, Нарангэрэл.
6. A first name with the traditional ua spelling drops the final a:
   Чонохүү.
7. A suffix inside the name is written with it: Үүрийнтуяа, Энхийн-Од.
8. A name ending in ng takes an added g before a vowel-initial suffix:
   Энгүүн.

So for a vowel-initial second part **Mongolia separates with a hyphen and
Inner Mongolian practice joins with FVS**; both occur in real text and
neither is an encoding error.

**The document does not specify the hyphen's code point**, or any other: it
is a language rule, not a technical one, and says only "a dash" (зураас).
Its punctuation table happens to be typed with U+1806 on the dash row. The
§3.2.2 examples, in the PDF's text layer, are typeset as two U+180A between
spaces: Алтан-Од is `U+1820 U+182F U+1832 U+1820 U+1828 U+0020 U+180A U+180A
U+0020 U+1823 U+1833 U+1824`. That layer is typed by shape and is weak
evidence for any code point. Neither is a prescription. **This knowledge base writes U+1806, with no space
on either side** (repository owner, 2026-10-11): Алтан-Од is the two names
with a single U+1806 between them. The keyboard hyphen U+002D and nirugu
U+180A draw much the same and are not that character.

The whole rule is digested in [national-rule.md](national-rule.md) and
[national-rule-suffixes.md](national-rule-suffixes.md). Where it disagrees with this file, the repository owner's rulings are
collected under "Rulings so far" at the top of `national-rule.md`. In short:
the separated final a/e stays a matter of vocabulary, learned word by word,
and the book's statements about it are a guide for the undecided writer and
not a rule to lint; чоно is `činu-a` and nothing else.

The same document's closing recommendations list the fused case + reflexive
forms, among them `taiγan` and `teigen`, as valid alternatives to the
separated ones, to be used consistently within one text.

## Punctuation & numerals notes

Classical functions: U+1802 ceg ≈ comma; U+1803 dabqur ceg ends sentences;
U+1805 four dots ends passages; U+1800 birga heads texts. Modern practice
uses fullwidth upright ？！ (U+FF1F/U+FF01 — UTN #57 Table 1 lists the CJK
question mark as required). Mongolian digits U+1810–1819 are "less used
now"; ASCII digits are common. UTN #57 §2.2.3 explicitly defers all
number/punctuation specifications to future versions — the authoritative
source has nothing here yet.
