# Mongolia's national orthography rule — rules, punctuation, word lists

Digest of *Монгол бичгийн зөв бичих дүрэм* (Institute of Language and Literature, Mongolian Academy of Sciences, Ulaanbaatar 2025), approved as Mongolia's national rule by resolution No. 02 of the National Council for Language Policy, 2026-02-11. This file covers the body of the rule (principles, alphabet,
basic and special rules), the punctuation chapter, the closing
recommendations and Appendices 3–5. The suffix appendices are in
[national-rule-suffixes.md](national-rule-suffixes.md).

## Read this first

- **A digest, not the document.** Every rule is paraphrased in English with
  the source's own section number. The source carries a notice that
  reproduction needs its authors' permission, so it is not redistributed here
  and its tables are summarized, never copied. Read the original for wording.
- **The rules and the Cyrillic are reliable. The script examples are not
  spellings.** The PDF's text layer was typed to *look* right: it interchanges
  same-shaped letters (o/u, ö/ü, a/e, t/d, feminine k/g), types y as a second
  i, and contains no MVS or NNBSP at all. Script words below are quoted from
  that layer so a rule can be found in the source, and the romanization beside
  them is computed from those code points and inherits their errors. **Never
  lift a code point sequence from this file into data.** Where the source
  prints its own Cyrillic transliteration, that is the trustworthy form.
- **This digest is not the registry.** Each part ends with the places where
  the national rule disagrees with, or adds to, the rest of this knowledge
  base, as they stood before any ruling. What was decided about each is under
  "Rulings so far" in `national-rule.md`; `suffixes.md` stays the normative
  source for the registry.
- Digested 2026-10-11. "Line N" is a locator in a local text extraction of
  the PDF and is approximate. Invisible characters appear as `U+XXXX` or as
  markers such as ⟨FVS1⟩ and ⟨NIRUGU⟩.

## Rulings so far

The repository owner's rulings on the points where this rule and the rest of
the knowledge base differ, all 2026-10-11. The per-part conflict lists below
were written before them and are kept as the record of what the source says.

- **Marks, not characters.** The rule names punctuation marks and never a
  code point; character choices stay with `orthography.md`.
- **-гүй.** No conflict: эзгүй, ашгүй, бүсгүй are ordinary words, not a word
  plus үгүй.
- **Plural after n.** The rule is right: nuγud/nügüd after n. Registry
  changed. мэргэжилтнүүд is `merγeǰilten-nügüd`.
- **Comitative -тай and the ordinals -дугаар, -дахь.** Joined or attached is
  a stylistic choice in ordinary text; legal and formal documents attach
  them. The rule's split of -тай by function (§2.3.6) is not adopted. The
  converter attaches by default; the linter checks it in formal mode.
- **Habitual -даг.** Always attached, like verbal endings generally; it has
  no standalone form. Removed from the connector-joined registry.
- **Separated final a/e (§1.1).** A matter of vocabulary. The rule's
  statements are guidance for a writer who does not know the word, not
  grammar, and no linter rule is built on them. чоно is `činu-a`.
- **-тайгаа.** Six letters, `taiγan`/`teigen`. The rule's seven-letter form
  shows the two strokes a reader sees; in Unicode a single i after a vowel is
  drawn that way by the font.
- **мань, тань, ану, инү.** Joined with the connector, like нь, минь and
  чинь. Added to the registry.
- **The name hyphen** is U+1806 with no space on either side. The keyboard
  hyphen and nirugu are not the character, however alike they draw.

## Part 1 — principles, alphabet, basic rules, abbreviation, names, foreign words

Digest of *Монгол бичгийн зөв бичих дүрэм* (2025; national rule 2026-02-11), the text layer lines 152–648: the preface on principles, chapter ONE, chapter TWO, and §3.1–§3.3. Paraphrased; § numbers are the source's.

Reading the examples. Each is `script (Cyrillic gloss from the source, *romanization*)`, the script sliced from the text layer by script and romanized mechanically by `fromScript`. The romanization reads code points, not gender: *q* is U+182C and *γ* is U+182D whichever the word's gender, and a digit after a letter is an FVS number. **The text layer was typed by glyph, not by letter**: it writes feminine k/g with either code point, the genitive after vowels as `U+1822 U+1822 U+1828` (*iin*), and swaps o/u and ö/ü where the glyphs coincide. So a romanization that looks wrong (*γeqü* for гэх) reflects the text layer, not the rule. A space inside an example is the text layer's; it contains no MVS or NNBSP and shows only that the piece is written apart, never which character joins it. Invisible characters are shown as ⟨FVS1⟩ / ⟨NIRUGU⟩.

Terms the rule text uses, kept distinct below: **attached** (залгаж бичих, one word with the stem); **written following** (дагуулж бичих, after the stem and apart from it); **apart** (салгаж / саланги); **separated by a mark** (зааглах, тусгаарлах); **fused** (нийлүүлж, written together as one word).

### Principles of the orthography (preface, unnumbered)

- **Phonetic principle** — the base principle: spell close to the pronunciation the script recorded when it was adopted. It is what puts into writing the hard/soft distinction of g and x, vowel harmony, consonant harmony, vowel–consonant agreement, and the insertion, loss and replacement of sounds at a morpheme boundary.
- **Morphological principle** — keep root, stem and suffix intact even where speech has changed, so related words show one root: ᠠᠶᠤᠬᠤ (айх, *ayuqu*), ᠠᠶᠤᠳᠠᠰᠤ (айдас, *ayudasu*), ᠠᠶᠤᠯ (аюул, *ayul*). Contracted compounds are written in their established contracted form: ᠤᠷᠠᠭᠠᠴᠠᠢ (*uraγačai*) from ᠤᠷᠠᠨ ᠬᠠᠷᠢᠶᠠᠴᠠᠢ (*uran qariyačai*).
- **Historical principle** — some words keep a fixed traditional spelling that neither pronunciation nor structure explains: ᠤᠤᠭᠤᠬᠤ (*uuγuqu*), ᠥᠭᠶᠦᠭᠡ (өгьеө, *öγyüγe*). Loans that entered through the literary language keep an origin-based spelling: ᠷᠢᠯᠦ (үрэл, *rilü*), ᠸᠴᠢᠷ (очир, *wčir*), ᠭᠱᠠᠨ (агшин, *γšan*).
- **Distinguishing (symbolic) principle** — homophones and look-alikes are told apart graphically: noun against verb by separated versus connected final a (ᠬᠠᠷᠠ (*qara*) ~ ᠬᠠᠷ ᠠ (*qar a*)); a doubled final vowel after γ/k (ᠳᠠᠭᠤ (*daγu*) ~ ᠳᠠᠭᠤᠤ (*daγuu*)); a doubled γa/ge in the first syllable (ᠳᠠᠭᠠᠬᠤ (*daγaqu*) ~ ᠳᠠᠭᠠᠭᠠᠬᠤ (*daγaγaqu*)); split meanings (ᠰᠠᠷᠠ (*sara*) ~ ᠰᠠᠷ ᠠ (*sar a*)); look-alikes of different sound (ᠳᠠᠳ (*dad*) ~ ᠳᠡᠳ⟨FVS1⟩ (*ded1*)). The limit: a word's structure must not be broken merely to distinguish it (ᠤᠭᠢᠶᠠᠬᠤ (*uγiyaqu*), ᠳᠣᠯᠢᠶᠠᠬᠤ (*doliyaqu*) stay as their structure dictates).

### §1.1 Letters for Mongolian words

The section gives a position table (initial, medial, final) for the seven vowels a e i o u ö ü and the consonants n, ng, b, q/k, γ/g, m, l, s, š, t, d, č (ч and ц share it), ǰ (ж and з share it), y, r, p, then these notes.

Final a/e (§1.1 vowels (1)) has two shapes, the tail and the separated stroke (chachlag):
- After the bowed consonants b, p, f, feminine k/g and ᠻ, the stroke shape is written **joined** to the consonant: ᠠᠪᠠ (*aba*), ᠰᠠᠪᠠ (*saba*).
- After s, š, d/t, č, ǰ only the tail is written, never the separated form. One exception: the sentence-final particle за after an auxiliary verb is written as a separated y + a: ᠪᠤᠢ ⟨NIRUGU⟩ᠶ ᠠ (буй за, *bui ⟨NIRUGU⟩y a*).
- After q and γ (the masculine pair, by the shapes shown and the examples — an inference, not stated in the rule) the final a is **always separated**, noun or verb alike, except in the monosyllables ᠬᠠ (хаа, *qa*) and ᠭᠠ (гаа, *γa*).
- After n, m, l, y, r either shape occurs. Verbs: apart from the converb endings -qul-a/-kül-e, -tal-a, -r-a and the finite endings -l-a, -n-a, a verb never ends in separated n-a, m-a, l-a, y-a, r-a; verb stems in -na, -ma, -la, -ya, -ra take the tail (ᠰᠠᠨᠠ (*sana*), ᠵᠠᠯᠠ (*ǰala*), ᠬᠤᠷᠢᠶᠠ (*quriya*)). Nouns mostly end in the separated form; which nouns take the connected one is custom, not rule, and sometimes distinguishes a pair: ᠨᠡᠷ ᠡ (нэр, *ner e*) ~ ᠨᠠᠷᠠ (нар, *nara*), ᠰᠢᠨᠠ (шанаа, *sina*) ~ ᠰᠢᠨ ᠡ (шинэ, *sin e*).
- After u (the letter that also stands for в) a final a/e is separated: ᠴᠢᠨᠤ ᠠ (*činu a*), ᠡᠰᠡᠷᠤ ᠠ (эсэрваа, *eseru a*).

Other vowel notes: (2) final i takes the bowed-ligature shape after a bowed consonant, the ordinary final elsewhere (ᠲᠣᠬᠢ (*toqi*), ᠲᠣᠯᠢ (*toli*)). (3) Medial ö/ü has the form with the extra stroke in the first syllable after a consonant, and the plain form in later syllables. (4) Final o/u/ö/ü after a bowed consonant is drawn inside the bow (ᠠᠪᠤ (*abu*), ᠮᠥᠬᠦ (*möqü*)). (5) The short final shape (the vowel plus FVS1 in the text layer) occurs only in a few monosyllables, ᠱᠣ⟨FVS1⟩ (шоо, *šo1*), ᠵᠣ⟨FVS1⟩ (зоо, *ǰo1*); every other final rounded vowel takes the full final shape. (6) lists the isolated forms.

Consonant notes: (1)–(2) a consonant followed by a vowel is "vocalised"; one that closes a syllable is a **devsger**. Soft devsger: n, m, l, ng, i (й), u/ü (в). Hard devsger: **b, γ/g, r, s, d**. (3) Medial n and γ are dotted before a vowel and undotted when they close a syllable. (4) Syllable-final d has its ordinary medial and final shapes; the other final d shape (d + FVS1 in the text layer) is kept for a few monosyllables with fixed spelling, ᠡᠳ⟨FVS1⟩ (*ed1*), ᠳᠡᠳ⟨FVS1⟩ (*ded1*). (5) The initial d written as d + FVS1 occurs in a few fixed words: ᠳ⟨FVS1⟩ᠤᠭᠠᠷ (дугаар, *d1uγar*), ᠳ⟨FVS1⟩ᠤᠯᠠᠬᠤ (дулах, *d1ulaqu*).

**(6), for digital text:** letters that look alike must not be exchanged on the strength of their visible shape; a/e, u/ü and o/ö are named explicitly.

### §1.2 Letters for foreign words

Foreign words use the basic letters plus the foreign set. From the table and its notes: э is U+1827 in every position; foreign у is written with the ü shapes; final o takes the short shape. Consonants added: х as *h* U+183E, х as *ch* U+183A, к U+183B, ж as *ž* U+183F, з U+183D, ц U+183C, в U+1838, ф U+1839, лх U+1840, жы U+1841, чы U+1842; х as *kh* and ж as *j* reuse the native letters. (1) b, m, l, s, č, y, r are identical in native and foreign words. (2) U+1840 occurs only in Tibetan words; U+1841 and U+1842 only for Chinese syllables.

### §2.1 Writing by sound harmony

- **§2.1.1.1** In a simple word, a masculine vowel in the first syllable means masculine vowels throughout, feminine likewise; neutral i goes in either: ᠪᠠᠳᠠᠷᠠᠭᠠᠳ (*badaraγad*), ᠭᠥᠭᠵᠢᠭᠡᠳ (*γöγǰiγed*).
- **§2.1.1.2** A word whose only vowel is i inflects as feminine: ᠴᠢᠭᠢᠭᠰᠢᠭᠦᠯ (*čiγiγsiγül*), ᠪᠢᠴᠢᠬᠦ (*bičiqü*).
- **§2.1.1 note a** The -гүй that has become an adjective-forming suffix is attached without regard to gender: ᠡᠵᠡ⟨NIRUGU⟩ᠭᠦᠢ (эзгүй, *eǰe⟨NIRUGU⟩γüi*), ᠠᠰᠢᠭᠦᠢ (ашгүй, *asiγüi*).
- **§2.1.1 note b** The verbal negative -гүй, and the directive case's руу/луу and -аад⁴, are written following in their base form — ᠦᠭᠡᠢ (*üγei*), ᠤᠷᠤᠭᠤ (*uruγu*), ᠥᠭᠡᠳᠡ (*öγede*) — so they ignore the gender of the word they follow.
- **§2.1.2** After a stem ending in a devsger, a consonant-initial suffix takes the variant matching that devsger (hard/soft, voiced/voiceless).
- **§2.1.2.1** After hard b, γ/g, r, s, d: dative-locative *tur/tu* (written following), and attached passive *-ta*, converb *-ču*, past *-čuqui/-čüküi/-čai*: ᠲᠥᠰᠦᠪ ᠲᠤᠷ (төсөвт, *tösüb tur*), ᠨᠤᠲᠤᠭ ᠲᠤ (нутагт, *nutuγ tu*), ᠠᠪᠲᠠᠬᠤ (автах, *abtaqu*), ᠠᠪᠴᠤ (авч, *abču*), ᠠᠪᠴᠠᠢ (авчээ, *abčai*).
- **§2.1.2.2** After soft m, n, l, ng, exactly as after a vowel: *dur/du*, passive *-da*, converb *-ǰu*, past *-ǰuqui/-ǰüküi/-ǰai*: ᠣᠨ ᠳ⟨FVS1⟩ᠤᠷ (онд, *on d1ur*), ᠭᠡᠷᠡᠯ ᠳ⟨FVS1⟩ᠦ (гэрэлд, *γerel d1ü*), ᠣᠯᠳᠠᠬᠤ (олдох, *oldaqu*), ᠪᠣᠯᠵᠠᠢ (болжээ, *bolǰai*).
- **§2.1.2.3** After syllable-final d or s the voiced γ/g does not occur; q/k is written: ᠪᠠᠶᠠᠰᠬᠤᠯᠠᠩ (баясгалан, *bayasqulang*), ᠰᠡᠳᠭᠢᠯ (сэтгэл, *sedγil*). Hence the causative on d- and s-final verb stems is *-qa/-ke*: ᠳᠤᠷᠠᠳᠬᠠᠬᠤ (дуртгах, *duradqaqu*), ᠲᠤᠰᠬᠠᠬᠤ (тусгах, *tusqaqu*).
- **§2.1.2.4** Stem-final n becomes **ng** before a suffix beginning with γ/g, q/k or n: ᠬᠠᠩᠭᠠᠬᠤ (хангах, *qangγaqu*), ᠬᠠᠩᠬᠤ (ханах, *qangqu*).
- **§2.1.3** After a vowel-final word the soft-devsger variants apply: *dur/du*, *-ǰu*, *-ǰuqui/-ǰüküi/-ǰai*: ᠠᠪᠠ ᠳ⟨FVS1⟩ᠤ (авд, *aba d1u*), ᠣᠷᠤᠵᠤ (орж, *oruǰu*).

### §2.2 Writing by the positional law of sounds

The law: vowels do not stand in sequence, and every consonant has a vowel before or after it. Where suffixation would break it, a sound is inserted or dropped. Stated exceptions (note under §2.2):
- vowel-less consonants in loans and historically spelled words: ᠪᠠᠷᠰ (бар, *bars*), ᠠᠷᠰᠯᠠᠨ (арслан, *arslan*);
- double vowels in loans and historically spelled words: ᠲᠡᠦᠭᠡ (түүх, *teüγe*);
- double vowels in onomatopoeia and interjections: ᠱᠤᠤᠭᠢᠬᠤ (шуугих, *šuuγiqu*);
- the -γuu/-güü ending of nouns and adjectives, doubled to distinguish them: ᠵᠥᠷᠢᠭᠦᠦ (зөрүү, *ǰöriγüü*);
- vowel + i (й) and vowel + u/ü (в) are not violations, since the second element is historically a soft devsger: ᠳᠡᠭᠦᠦ (дүү, *deγüü*), ᠲᠠᠤᠯᠠᠢ (туулай, *taulai*).

**§2.2.1.1 Nominal suffixes (written following).** Where a suffix has a vowel-initial and a consonant-initial variant, a vowel-final stem takes the consonant-initial one and a consonant-final stem the vowel-initial one: ᠦᠨᠡᠨ ᠤ (үнэний, *ünen u*), ᠠᠯᠤᠰ ᠤᠨ (алсын, *alus un*), ᠦᠨᠡᠨ ᠢᠶᠡᠷ (үнэнээр, *ünen iyer*), ᠣᠢ ᠪᠠᠷ (ойгоор, *oi bar*), ᠣᠢ ᠪᠠᠨ (ойгоо, *oi ban*).

**§2.2.1.2 Verbal suffixes (attached).**
- **.1** A vowel-final stem takes the suffix directly.
- **.2 (1)** The seven stem-final devsger n, b, d, r, s, l, γ/g are "variable" letters. Suffix-initial y, γ/g, n, ng, m, l, r are "triggers", as are the endings -si ügei (-шгүй) and -ski (-схий).
- **.2 (2)** Variable-final stem + trigger-initial suffix: insert the connecting vowel u/ü: ᠰᠤᠨᠤᠭᠰᠠᠨ (*sunuγsan*), ᠠᠪᠤᠮᠤᠢ (*abumui*).
- **.2 (3)** A stem ending in γ/g (ög-, geyeg-, gög-) takes the connecting syllable γu/gü, which doubles the g: ᠥᠭᠭᠦᠭᠰᠡᠨ (*öγγüγsen*).
- **.2 (4)** A b-final stem before a b-initial suffix also takes the connecting vowel: ᠠᠪᠤᠪᠠᠯ (*abubal*), ᠠᠪᠤᠪᠠ (*abuba*).
- **.2 (5)** Suffixes beginning with b, s, d, ǰ, č, q/k, t are non-triggers and attach directly, as does the causative -γa/-ge: ᠰᠤᠨᠵᠤ (*sunǰu*), ᠠᠪᠴᠤ (*abču*), ᠪᠡᠯᠡᠳᠳᠡᠭ (*beleddeγ*), ᠲᠤᠰᠰᠤᠭᠠᠢ (*tussuγai*). Identical consonants can therefore meet at the boundary (dd, ss).

**§2.2.2 Derivational suffixes (attached).**
- **.1.1** Consonant-final *noun* stem + a suffix that is a single consonant or begins with a cluster: insert **a/e**: ᠵᠦᠢᠯᠡᠰ (зүйл+с, *ǰüiles*), ᠵᠤᠳᠠᠷᠬᠠᠭ (зуд+рхаг, *ǰudarqaγ*).
- **.1.2** Consonant-final *verb* stem + such a suffix: insert **u/ü**: ᠭᠠᠷᠤᠯ (гарал, *γarul*), ᠪᠣᠯᠤᠮᠵᠢ (боломж, *bolumǰi*). A few deverbal nouns and adjectives have a/e by custom: ᠰᠠᠯᠠᠩ (салан, *salang*).
- **.1.3** -mal on a consonant-final verb takes u/ü: ᠨᠢᠭᠡᠳᠦᠮᠡᠯ (нэгдмэл, *niγedümel*), ᠲᠤᠨᠤᠮᠠᠯ (тунамал, *tunumal*).
- **.1.4** The deverbal adjective suffixes -maqai/-mekei, -maγai/-megei, -mataγai/-metegei, -maγ/-meg attach directly after d, r, s; take u/ü after n, l, b; take γu/gü after γ/g: ᠰᠤᠷᠮᠠᠭ (сурмаг, *surmaγ*), ᠰᠢᠢᠳᠮᠡᠭᠡᠢ (шийдэмгий, *siidmeγei*), ᠭᠥᠪᠦᠮᠡᠭᠡᠢ (хөвөмхий, *γöbümeγei*), ᠥᠭᠭᠦᠮᠡᠲᠡᠭᠡᠢ (өгөмтгий, *öγγümeteγei*).

### §2.3 Attached versus written following

- **§2.3.1 Written following, apart from the stem:** the nominal case suffixes; the possessive (хамаатуулах) suffixes; the plurals *nuγud/nügüd* (-нууд²), *ud/üd* (-ууд²) and *nar* (нар); and the negative *ügei* (-гүй).
- **§2.3.1 note** The case forms of the personal pronouns are fused by custom and are not split: ᠮᠢᠨᠤ (миний, *minu*), ᠴᠢᠨᠤ (чиний, *činu*), ᠨᠠᠳᠤᠷ (надад, *nadur*), ᠨᠠᠮᠠᠶᠢ (намайг, *namayi*).
- **§2.3.2 Attached:** the plurals *-d* (-д), *-s* (-с), *-čud/-čüd* (-чууд²), *-čuul/-čüül* (-чуул²), and **all verbal suffixes**.
- **§2.3.3** The possession-marking -х and -хан⁴ (*ki*, *kin*) are written following **when they come after a genitive**: ᠲᠡᠳᠡᠨ ᠤ ᠭᠢ (тэднийх, *teden u γi*), ᠨᠤᠲᠤᠭ ᠤᠨ ᠭᠢᠨ (нутгийнхан, *nutuγ un γin*). Everywhere else they are attached: ᠬᠣᠯᠠᠭᠢ (холхи, *qolaγi*), ᠣᠢᠷᠠᠭᠢ (ойрх, *oiraγi*), ᠳᠠᠷᠠᠭᠠᠭᠢ (дараах, *daraγaγi*).
- **§2.3.4** Any derivational suffix other than *ki/kin* that comes after a genitive is attached. (No example is given; see Could not digest.)
- **§2.3.5** Modal and particle words that follow a host word (дагах баймж үгс) are written following it: ᠡᠨᠡ ᠬᠦ (энэхүү, *ene qü*), ᠨᠢᠭᠡ ᠯᠡ (нэг л, *niγe le*), ᠪᠠᠰᠠ ᠴᠤ (бас ч, *basa ču*), ᠶᠤᠮ ᠰᠢᠭ (юм шиг, *yum siγ*), ᠲᠡᠢᠮᠦ ᠤᠦ (тийм үү, *teimü uü*), ᠶᠠᠭᠠᠭᠢᠬᠤ ᠪᠤᠢ (яах вэ, *yaγaγiqu bui*), ᠶᠤᠮ ᠰᠠᠨ (юм сан, *yum san*), ᠭᠡᠨ ᠪᠤᠢ (хэн бэ, *γen bui*), ᠪᠤᠢ ᠢ ᠠ (буй за, *bui i a*). Note энэхүү, тэрхүү, гагцхүү: one word in Cyrillic, two pieces in the script.
- **§2.3.6 -тай³.** The comitative **case** suffix is written following, like every other case. The **adjective-forming** suffix -тай³ is always attached. The **modal** -тай³ (affirming, conceding, approximating) is attached: ᠭᠡᠷᠡᠭᠲᠡᠢ (хэрэгтэй, *γereγtei*), ᠶᠣᠰᠤᠲᠠᠢ (ёстой, *yosutai*), ᠮᠠᠶᠢᠭᠲᠠᠢ (маягтай, *mayiγtai*), ᠰᠠᠨᠠᠭᠠᠲᠠᠢ (санаатай, *sanaγatai*).
- **§2.3.7 ügei / -güi.** Words in which -гүй has become a suffix and is by custom written with its stem stay fused: ᠡᠵᠡᠭᠦᠢ (эзгүй, *eǰeγüi*), ᠠᠰᠢᠭᠦᠢ (ашгүй, *asiγüi*), ᠪᠦᠰᠡᠭᠦᠢ (бүсгүй, *büseγüi*). Every other -гүй word is written apart, and any further suffix is attached to *ügei*, not to the stem: ᠠᠵᠢᠯ ᠦᠭᠡᠢᠢᠳᠡᠯ (ажилгүйдэл, *aǰil üγeiidel*), ᠳᠤᠷ ᠠ ᠦᠭᠡᠢᠢᠴᠡᠬᠦ (дургүйцэх, *dur a üγeiičeqü*), ᠭᠠᠢ ᠦᠭᠡᠢ (гайгүй, *γai üγei*).
- **§2.3.8 ki- (хий-).** (1) After a reduplicated or paired word and after an onomatopoeic word it is written apart; the test is that гэх can replace it: ᠨᠢᠷ ᠭᠢᠬᠦ (нирхийх, *nir γiqü*), ᠲᠠᠰ ᠭᠢᠬᠦ (тасхийх, *tas γiqü*). (2) After a descriptive root ending in s, b, γ/g, d, ng, and where it has become a suffix, it is attached: ᠠᠯᠠᠪᠭᠢᠬᠦ (алавхийх, *alabγiqü*), ᠤᠬᠤᠰᠭᠢᠬᠦ (ухасхийх, *uqusγiqü*), ᠭᠣᠳᠭᠢᠬᠦ (годхийх, *γodγiqü*).

**What the rule does not say.** It has one term, "written following", for case suffixes, for *ügei*, for *uruγu* and for the particles of §2.3.5 alike. Nothing in this range separates what our knowledge base joins with a connector from what it joins with a plain space.

### §3.1 Abbreviation

- **§3.1.1** A syllabic abbreviation is written as one word, vowel harmony disregarded: ᠮᠣᠩᠴᠠᠮᠡ (МОНЦАМЭ, *mongčame*), ᠮᠣᠪᠢᠻᠣᠮ (Мобиком, *mobikhom*).
- **§3.1.2** A Mongolian initialism is written letter by letter with a space between: each consonant vocalised with the vowel it has in its word, each vowel alone: ᠨᠢ⟨NIRUGU⟩ ᠦ⟨NIRUGU⟩ ᠪᠠ⟨NIRUGU⟩ (НҮБ, *ni⟨NIRUGU⟩ ü⟨NIRUGU⟩ ba⟨NIRUGU⟩*), ᠰᠠ⟨NIRUGU⟩ ᠥ⟨NIRUGU⟩ ᠬᠣ⟨NIRUGU⟩ (СӨХ, *sa⟨NIRUGU⟩ ö⟨NIRUGU⟩ qo⟨NIRUGU⟩*). The last word may be written out if the reader could be unsure. In the text layer every piece ends in a nirugu.
- **§3.1.3** An initialism established in a foreign language is written as bare letters separated by spaces: ᠷ ᠼ ᠨ ᠻ⟨NIRUGU⟩ (РЦНК, *r c n kh⟨NIRUGU⟩*).
- **§3.1.4** Internationally established Latin abbreviations may stay in Latin (UNESCO, SOS).
- **§3.1.5** A patronymic initial: a consonant with its following vowel, or a vowel alone, set off from the name by a single dot (U+00B7 in the text layer): ᠳᠠ⟨NIRUGU⟩ (*da⟨NIRUGU⟩*) · ᠨᠠᠴᠤᠭᠳᠣᠷᠵᠢ (*načuγdorǰi*); ᠦ⟨NIRUGU⟩ (*ü⟨NIRUGU⟩*) · ᠶᠢᠳᠠᠮᠰᠦᠷᠦᠩ (*yidamsürüng*).
- **§3.1.6** After a number written in digits the case suffix is written following directly, with no punctuation between; an ordinal suffix is written in full, not abbreviated: `10 ᠳ⟨FVS1⟩ᠤᠭᠠᠷ ᠰᠠᠷ ᠠ ᠢᠢᠨ 22 ᠤᠨ ᠡᠳᠣᠷ (*10 d1uγar sar a iin 22 un edor*)` (10 дугаар сарын 22-ны өдөр).
- **§3.1.7** A civil registration number keeps its letters in Cyrillic and writes its digits in traditional numerals. (Example lost; see Could not digest.)

### §3.2 Proper names (outside §3.2.2)

- **§3.2.1** Follow the dedicated orthographic dictionary of proper names. A name not in it is spelled from its meaning, its origin, and the established understanding in the language and culture it comes from.
- **§3.2.3** A name that Cyrillic writes with a vocative (hypocoristic) vowel is written in the script without it — only the base name: ᠪᠠᠲᠤ (Батаа, *batu*), ᠳᠣᠷᠵᠢ (Доржоо, *dorǰi*), ᠴᠢᠮᠡᠭ (Чимгээ, *čimeγ*).

### §3.3 Foreign words

- **§3.3.1** Assimilated loans follow their traditional spelling and Mongolised pronunciation as standardised in dictionaries: ᠭᠱᠠᠨ (агшин, *γšan*), ᠭᠬᠢᠷ (хир, *γqir*), ᠸᠴᠢᠷ (очир, *wčir*).
- **§3.3.2** Chinese words and names follow the established tradition for rendering Chinese syllables.
- **§3.3.3.1** A foreign word whose spelling and pronunciation agree is transliterated letter for letter: ᠻᠠᠷᠠᠣᠻᠧ (karaoke, *kharaokhē*), ᠮᠣᠲ⟨FVS1⟩ᠣᠷ (motor, *mot1or*).
- **§3.3.3.2** Where they disagree, pronunciation mostly wins, but spelling may be followed to keep the word recognisable; this cannot be fully regulated and is left to dictionaries. By sound: ᠳ⟨FVS1⟩ᠢᠵᠢᠲ⟨FVS1⟩ᠠᠯ (digital, *d1iǰit1al*). By spelling: ᠠ⟨NIRUGU⟩ᠦᠰᠲ⟨FVS1⟩ᠷᠢ (Austria, *a⟨NIRUGU⟩üst1ri*), ᠫᠠᠷᠢᠰ (Paris, *paris*).
- **§3.3.3.3** Shapes and usage that differ from native words:
  - (1) final a is the connected tail after any consonant that is not bowed (b, p, f, U+183B, U+183A); (2) э is never the native initial e but the U+1827 shape in every position; (3) у is written with the ü shapes; (4) final o is the short shape, not the long final: ᠷᠠᠳᠢᠣ⟨FVS1⟩ (радио, *radio1*).
  - (5) g before a vowel distinguishes masculine and feminine as in native words (ᠭᠠᠮᠮᠠ (гамма, *γamma*), ᠭᠢᠪᠰᠣᠨ (Гибсон, *γibson*)); syllable-final g follows the gender of the preceding vowel, and after a masculine vowel is always written with two dots, medially and finally (ᠪᠠᠭᠳᠠᠳ⟨FVS1⟩ (Багдад, *baγdad1*)). Initial g before a consonant takes one fixed initial shape (the feminine one, inferred from the glyph) and keeps it inside a compound (ᠪᠧᠯᠭᠷᠠᠳ⟨FVS1⟩ (Белград, *bēlγrad1*)).
  - (6) х: Latin *h* is U+183E (ᠾᠢᠲ (хит, *ᠾit*)); *kh* is the native letter (ᠬᠠᠷᠲ⟨FVS1⟩ᠦᠮ (Хартум, *qart1üm*)); *ch* is U+183A (ᠮᠸᠺᠠᠨᠢᠻ (механик, *mwᠺanikh*)). A *kh* + u in a masculine word gets a special spelling to keep it apart from gü/kü (ᠰᠦᠬᠤᠢᠮᠢ (Сухуми, *süquimi*)).
  - (7) affricate ж is the native ǰ (ᠵᠠᠻᠠᠷᠲ⟨FVS1⟩ᠠ (Jakarta, *ǰakhart1a*)); fricative ж is U+183F (ᠿᠦᠻᠣᠸ (Жуков, *ᠿükhow*), ᠸᠣᠷᠣᠨᠧᠿ (Воронеж, *woronēᠿ*)).
  - (8) n and masculine g are always dotted in foreign words, before a vowel or syllable-final. (9) t is U+1832 in all positions, its medial typed with FVS1 in the text layer. (10) d: U+1833 in the shape the text layer encodes with FVS1, in all positions.
  - (11) t, č, c, ǰ, z, š, h, ch may close a syllable in foreign words though never in native ones; word-finally all but š end in a foot stroke.
  - (12) a doubled aa is divided by a nirugu: ᠰᠠᠨᠠ⟨NIRUGU⟩⟨NIRUGU⟩ᠠ (Sana, *sana⟨NIRUGU⟩⟨NIRUGU⟩a*). (17) a final doubled n is divided by a nirugu, each n dotted. (18) initial ng in a foreign name is written dotted: ᠨᠭ⟨NIRUGU⟩ᠥ (Нго, *nγ⟨NIRUGU⟩ö*).
  - (13) ai, oi as in native words; эй with U+1827, never the native initial e + i; уй, үй with the ü shape. (14) ao, au, eo, eü are joined directly: ᠻᠠᠣᠷᠢ (Kaori, *khaori*), ᠧᠦᠷᠣ⟨FVS1⟩ (евро, *ēüro1*). (15) ia, ie take a y between them, io, iu, iü do not: ᠭᠠᠪᠷᠢᠶᠧᠯ (Габриел, *γabriyēl*), ᠻᠣᠨᠰᠣᠷᠼᠢᠥᠮ (консорциум, *khonsorciöm*). (16) ua, uai, uo, ue, uei, oa, öe take a U+1838 between them: ᠣᠸᠠᠽᠢᠰ (oasis, *owazis*), ᠰᠦᠸᠧᠼ (Суэц, *süwēc*).
- Eight further rules follow, numbered 3.3–3.10 in the text layer (presumably §3.3.4–§3.3.11):
  - a final vowel that is written but silent in the source language is dropped: ᠭᠦᠦᠭᠯ (Google, *γüüγl*), ᠠᠫᠫᠯ (Apple, *appl*);
  - a word ending in и in Cyrillic keeps the i: ᠢᠲ⟨FVS1⟩ᠠᠯᠢ (Итали, *it1ali*);
  - an unpronounced reduced final a is dropped in common loans (ᠲᠧᠺᠨᠢᠻ (техника, *tēᠺnikh*)) but kept in proper names (ᠠᠮᠧᠷᠢᠻᠠ (America, *amērikha*));
  - я, е, ё, ю after a consonant take no inserted i: ᠭᠯᠶᠦᠻᠣᠽ (глюкоз, *γlyükhoz*);
  - consonant clusters and doubled consonants are transliterated letter for letter: ᠠᠷᠮᠰᠲ⟨FVS1⟩ᠷᠣᠩ (Armstrong, *armst1rong*), ᠫᠢᠼᠼᠠ (пицца, *picca*), ᠻᠷᠣᠰᠰ (кросс, *khross*);
  - a Cyrillic soft sign adds no i where the consonant simply closes a syllable in the source language (ᠨᠣᠪᠧᠯ (Нобель, *nobēl*)) and adds one where it is palatalised there (ᠷᠦᠪᠯᠢ (рубль, *rübli*));
  - suffixes on foreign words follow vowel harmony and the word's ending as for native words. A word ending in p, f, w, U+183B takes the dative-locative *tur/tu* and the dative + reflexive ᠲᠠᠭᠠᠨ (*taγan*) / ᠲᠡᠭᠡᠨ (*teγen*); one ending in z, c, ǰ, č, ž, h, š, t takes *dur/du* and *daγan/degen*.

### Conflicts and additions versus the rest of this knowledge base

1. **Comitative attached "by writer's choice" (suffixes.md §6, and "Linter implications") — contradicted.** §2.3.6 makes it grammatical: the case suffix is written following; the adjective-forming and modal -тай³ are attached (ᠭᠡᠷᠡᠭᠲᠡᠢ (хэрэгтэй, *γereγtei*)).
2. **"Bichig does not make Cyrillic's -гүй contraction" (suffixes.md) — not a conflict** (repository owner, 2026-10-11: эзгүй and бүсгүй are words in their own right, never written with a separate үгүй even in Cyrillic, and бүсгүй, "woman", is not a negation at all; see the note in `suffixes.md`). The rule's wording: §2.3.7 and §2.1.1 note a keep a closed class fused: ᠡᠵᠡᠭᠦᠢ (эзгүй, *eǰeγüi*), ᠠᠰᠢᠭᠦᠢ (ашгүй, *asiγüi*), ᠪᠦᠰᠡᠭᠦᠢ (бүсгүй, *büseγüi*). §2.3.7 also adds that suffixes after a separate *ügei* attach to it (ᠠᠵᠢᠯ ᠦᠭᠡᠢᠢᠳᠡᠯ (ажилгүйдэл, *aǰil üγeiidel*)).
3. **Chachlag "not decidable mechanically; accept both" (orthography.md) — partly contradicted.** §1.1 (1) is categorical in three contexts: always separated after masculine q/γ (monosyllables хаа, гаа excepted), always separated after u, never separated after s, š, d/t, č, ǰ. Our document cites Poppe §87 for separation after *s* and shows an unseparated a-q-a; both disagree with this rule. Only n, m, l, y, r remain lexical.
4. **Addition — `ögede`.** ᠥᠭᠡᠳᠡ (-аад⁴, *öγede*) is named beside *uruγu* as a directive written following in one invariant form (§2.1.1 note b). suffixes.md has no entry.
5. **Addition — particles written following that suffixes.md lacks:** ᠡᠨᠡ ᠬᠦ (энэхүү, *ene qü*) (the *kü* piece; ours lists it only as "not yet in scope"), ᠶᠠᠭᠠᠭᠢᠬᠤ ᠪᠤᠢ (яах вэ, *yaγaγiqu bui*) (*bui*, вэ/бэ), and the за particle of ᠪᠤᠢ ⟨NIRUGU⟩ᠶ ᠠ (буй за, *bui ⟨NIRUGU⟩y a*).
6. **Unsettled, needs a ruling — §2.3.5 puts л and ч in one class with шиг, үү, сан.** We join *la/le* and *ču/čü* with a connector and *siγ*, *uu/üü*, *san/sen* with a space. The rule gives no ground for the split (nor against it).
7. **Addition — *ki/kin* is written following only after a genitive (§2.3.3);** otherwise attached (ᠬᠣᠯᠠᠭᠢ (холхи, *qolaγi*)). suffixes.md lists it as a connector suffix without that condition.
8. **Addition — attached plurals** -d, -s, -čud, -čuul (§2.3.2) and the **fused pronoun forms** of §2.3.1 are absent from our tables; a `space-before-suffix` check must not split them.
9. **Addition — soft devsger includes й and в** (§1.1 consonants (2)); suffixes.md's soft group is н, м, л, нг. The hard group б, г, р, с, д agrees.
10. **Addition — dative choice after foreign finals (last rule of §3.3):** t-forms after p, f, w, U+183B; d-forms after z, c, ǰ, č, ž, h, š, t. It also confirms ᠲᠠᠭᠠᠨ (*taγan*) / ᠲᠡᠭᠡᠨ (*teγen*), which suffixes.md lists as "expected but unregistered".
11. **§3.2.2 — one item missing from our record.** Item (8): in a proper name, an ng-final word followed by a vowel-initial suffix takes an added g: ᠡᠩᠭᠦᠨ (Энгүүн, *engγün*), ᠡᠩᠭᠦᠨ⟨NIRUGU⟩ᠮᠥᠷᠡᠨ (Энгүүнмөрөн, *engγün⟨NIRUGU⟩mören*). Our list stops at (7).
12. **§3.2.2 item (2) — our FVS1 remark overgeneralises.** Of the three examples only ᠠᠮᠤᠷᠬᠦ⟨FVS1⟩ᠦ (Амархүү, *amurqü1ü*) carries FVS1 in the text layer; ᠳᠠᠸᠠᠰᠦᠷᠦᠩ (Даваасүрэн, *dawasürüng*) and ᠲᠡᠮᠦᠷᠰᠦᠭᠡ (Төмөрсүх, *temürsüγe*) do not.
13. **`geminate-consonant` exceptions (orthography.md) are incomplete.** Besides dd and gg, §2.2.1.2.2 (5) yields ss at a verb boundary (ᠲᠤᠰᠰᠤᠭᠠᠢ (*tussuγai*)), and §3.3 keeps any doubled consonant of a foreign word (ᠫᠢᠼᠼᠠ (пицца, *picca*)).
14. **`doubled-ae`:** §3.3.3.3 (12) writes a foreign aa with a nirugu between (ᠰᠠᠨᠠ⟨NIRUGU⟩⟨NIRUGU⟩ᠠ (Sana, *sana⟨NIRUGU⟩⟨NIRUGU⟩a*)), so that sequence is not adjacent a + a; the patronymic initial ᠠᠠ⟨NIRUGU⟩ (*aa⟨NIRUGU⟩*) of §3.1.5 is a real doubled a in the text layer.
15. **`initial-cluster` / `no-vowel-word` whitelist:** the rule's own vowel-less spellings are ᠭᠱᠠᠨ (агшин, *γšan*), ᠭᠬᠢᠷ (хир, *γqir*), ᠸᠴᠢᠷ (очир, *wčir*), ᠪᠠᠷᠰ (бар, *bars*); ours names only tngri and wčir.
16. **Agreements worth recording:** *ügei* and *uruγu* invariant and gender-blind (§2.1.1 note b); all-i words feminine (§2.1.1.2); *nuγud*, *ud*, *nar* and the cases written following (§2.3.1); digits take their suffix with no punctuation (§3.1.6); one script name for several Cyrillic hypocoristics (§3.2.3).

### Could not digest

- **Position tables** of §1.1 and §1.2 (lines 197–209, 242–262, 278–307) are column-scrambled in both text files. This digest takes the letter inventory and the notes, not the per-position shapes; §1.1 (3) and (6) are reported only as far as the prose goes. (6) appears to give two isolated forms for ü, ᠥ (*ö*) and ᠡᠦ (*eü*) — unclear.
- **Look-alike code points are unreliable throughout** (the very thing §1.1 (6) forbids): genitive *yin* typed ᠣᠢ ᠢᠢᠨ (*oi iin*); the question particle typed ᠲᠡᠢᠮᠦ ᠤᠦ (тийм үү, *teimü uü*); өдөр typed two ways in one sentence (ᠤᠨ ᠡᠳᠣᠷ (*un edor*) / ᠤ ᠡᠳᠤᠷ (*u edur*)); *nügüd* typed ᠨᠤᠭᠦᠳ (*nuγüd*); *ki/kin* typed with U+182D (ᠭᠢ (*γi*)) where suffixes.md has U+182C; Од typed *odu* in §3.2.2 (3) and *odo* in (7). **This range cannot be used as evidence on non-initial o versus u.**
- ᠮᠠᠠᠳᠡᠦ (мантуу, *maadeü*) reads *maadeü*: probably an n typed as a, so the "double vowel in a loan" example of §2.2 cannot be trusted. ᠮᠸᠺᠠᠨᠢᠻ (механик, *mwᠺanikh*) and ᠲᠸᠺᠨᠣᠯᠣᢉᠢ (технологи, *twᠺnoloᢉi*) type U+1838 where U+1827 is meant, and the second contains U+1889.
- **§2.3.4** is one sentence without examples; "attached" to what (the genitive suffix, presumably) is an inference.
- **§2.3.8** ᠲᠠᠰ ᠭᠢᠬᠦ (тасхийх, *tas γiqü*) (apart, onomatopoeic) against ᠤᠬᠤᠰᠭᠢᠬᠦ (ухасхийх, *uqusγiqü*) (attached, s-final descriptive root): the boundary between the two classes is semantic and was not reduced to a test here beyond the гэх substitution.
- **§3.1.7** breaks off after "УД" at a page break; the registration-number example is lost.
- **§3.3.3.3 (6)** the special *kh* + u spelling and **(13)** the эй spellings are given as shape lists that were not mapped to code points with confidence.
- **Numbering:** the rules after §3.3.3.3 (18) are numbered 3.3–3.10 in the text layer, colliding with §3.3 itself.
- **Hyphen in §3.2.2 (3):** typed as two nirugu between spaces, as our record already notes; nothing new.

## Part 2 — punctuation, closing recommendations, Appendices 3–5

Source: *Монгол бичгийн зөв бичих дүрэм* (2025), the text layer lines 649–724 and 2848–3079. Conventions here: every script word is
spliced from the source by script, followed by its mechanical romanization in backticks (`fromScript`). That romanizer prints U+182D as
`γ` and U+182C as `q` whatever the word's gender, and a digit after a letter is an FVS (`d1u` = d + FVS1). Invisibles are written
⟨FVS1⟩ / ⟨NIRUGU⟩ or as `U+XXXX`. The text layer carries no MVS or NNBSP, so a space inside an example says nothing about the
connector. "(inferred)" marks an inference, not the source's words.

### Punctuation marks (ch. FOUR, table on p. 19)

One table of twelve rows: the mark in Cyrillic writing, the mark in the script, its name, its uses. Code points below were computed
from the text layer by script.

| Name (source) | Cyrillic column | Script column | Use (paraphrased) |
|---|---|---|---|
| дан цэг, "single dot" | `,` U+002C | ᠂ U+1802 | Works like the Cyrillic comma: separates coordinate members of a sentence and the simple clauses of a compound sentence. Also: after the abbreviated syllable or letter of a clan/father's name, in numbering by digits or letters, and in dates written in digits. |
| давхар цэг, "double dot" | `.` U+002E | ᠃ U+1803 | Ends a declarative or an imperative sentence. |
| цэгтэй таслал, semicolon | `;` U+003B | `;` U+003B | Separates groups, by sense, inside a long enumeration. |
| тодорхойлох цэг, "defining dot" (colon) | `:` U+003A | ᠄ U+1804 | Like the Cyrillic colon: before a quotation, an example, a clarifying list, or reported words. Also in score ratios and in clock times written in digits. |
| цуваа цэг, ellipsis | `...` 3 × U+002E | ᠁ U+1801 | Marks an omitted part of a word or sentence, or an unfinished thought; may also mark a speaker faltering or hesitating. |
| асуух тэмдэг, question mark | `?` U+003F | `?` U+003F | Ends a question; may stand in brackets after a doubtful word or sentence. |
| анхааруулах тэмдэг, exclamation mark | `!` U+0021 | `!` U+0021 | Ends an exclamatory word or sentence; follows a form of address or an interjection; sets off slogans, blessings and auspicious words; may combine with the question mark for something doubtful or needing a check. |
| давхар хашилт, double quotes | `«»` U+00AB U+00BB | `«»` U+00AB U+00BB | Direct speech; a word used in an unusual or ironic sense; usually the conventional names of works, periodicals, organizations and enterprises. |
| дан хаалт, brackets | `()` U+0028 U+0029, `[]` U+005B U+005D | same four code points | Round: an explanation, definition or added remark placed after the word or sentence it belongs to; also numbering by digits or letters. Square: an inserted addition. |
| тодчилох зураас, dash/hyphen | `-` U+002D | U+1806 | Four uses: writing a compound proper name whose second word begins with a vowel; marking dialogue turns and listed items; a range of time or space; setting off the subject (өгүүлэгдэхүүн) for emphasis. |
| орлуулах тэмдэг, substitution mark | `~` U+007E | `~` U+007E | Stands for the headword inside a dictionary example. |
| од, asterisk | `*` U+002A | `*` U+002A | Footnote marker: placed at the word or sentence being annotated and again at the start of the note. |

- **The rule names marks, not code points.** It is a language rule, not a technical specification: it says which mark to use
  (question mark, dash, colon) and never which Unicode character. The code points in this table are only what the PDF happened to be
  typed with, and settle nothing about encoding; the character choices in `orthography.md` and `encoding-model.md` stand.
- As typed, five rows use script-block marks (U+1801, U+1802, U+1803, U+1804, U+1806) and the other seven the same
  ASCII/Latin-1 character as Cyrillic uses. The table has no row for U+1800 (birga), U+1805 (four dots), U+1807–U+1809, single quotes
  or a slash (absence, not a ban).
- The question and exclamation marks in the script column are plain U+003F and U+0021 — not the fullwidth U+FF1F/U+FF01 and not the
  vertical presentation forms. Upright drawing in a vertical line is left to the font (inferred; the table says nothing about
  orientation).
- The table gives functions only. It says nothing about spacing before or after any mark.
- U+1802 and U+1804 have numeric jobs: U+1802 in digit dates and numbering, U+1804 in times and scores.

### The hyphen: what each occurrence actually contains

- **In this part there is exactly one U+1806**: the script column of the dash row (the text layer line 702, the layout-preserving extraction line 773), opposite
  U+002D in the Cyrillic column. Its name and four uses are as above.
- **In this part there is no hyphen-like sequence between words at all.** U+180A occurs 32 times here and never as a hyphen: 30 times in
  the recommendations (lines 714–719) as a stem-stroke prefix on bound verb endings, printed once or twice before the ending (e.g.
  `U+180A U+1835 U+1820 U+1822`, `U+180A U+180A U+1828 U+0020 U+1820`), and twice word-internally in Appendix 3 (entries 59, 60,
  below).
- Outside this part, for comparison (counted over the whole text layer): §3.2.2(3) prints its three examples, and §3.2.2(7) one more
  (line 543), as `U+0020 U+180A U+180A U+0020` between the two names. §2.1.2.4 (lines 359–360) uses `U+0020 U+1806 U+0020` four times,
  and U+002D once, as the dash between a stem and its derived form. The front matter has a single spaced U+180A in a compound personal
  name (line 33) and after a bare verb stem (line 88). In Appendices 1–2 U+1806 is the dash printed before every listed suffix (most of
  the document's 579 U+1806).
- So the document types the dash as U+1806, as U+002D, and as one or two U+180A. The table row is typed with
  U+1806, which is how the PDF was keyed and not a ruling on the character; the doubled nirugu appears only in compound-name examples, the very use the table assigns to U+1806.

### Closing recommendations (Зөвлөмж, p. 20)

1. **Do not mix "original" (уугуул) and "modernized" (эдүгээчилсэн) variants of an ending inside one text; pick a set and stay in it.**
   Original set, e.g. ᠲᠤᠷ `tur`, ᠠᠨᠤ `anu`, ⟨NIRUGU⟩ᠵᠤᠬᠤᠢ `⟨NIRUGU⟩ǰuqui`; modernized set, e.g. ᠲᠤ `tu`, ᠨᠢ `ni`, ⟨NIRUGU⟩ᠵᠠᠢ
   `⟨NIRUGU⟩ǰai`. Full membership, romanized: original `tur`, `d1ur`, `anu`, `inü`, `⟨NIRUGU⟩ǰuqui`, `⟨NIRUGU⟩⟨NIRUGU⟩čuqui`,
   `⟨NIRUGU⟩ǰüγüi`, `⟨NIRUGU⟩čüγüi`, `⟨NIRUGU⟩mui`, `⟨NIRUGU⟩⟨NIRUGU⟩luγ a`, `⟨NIRUGU⟩⟨NIRUGU⟩lüγe`; modernized `tu`, `d1u`, `ni`,
   `⟨NIRUGU⟩ǰai`, `⟨NIRUGU⟩čai`, `⟨NIRUGU⟩⟨NIRUGU⟩n a`, `⟨NIRUGU⟩l a`. The pairing is spelled out: a text that uses the -r
   dative-locative uses the original third-person possessive and the original finite verb endings too; a text that uses the short
   dative-locative uses the short possessive and the short verb endings.
2. **Do not mix the separate and the fused spelling of case + reflexive possessive inside one text.** Separate, e.g. ᠲᠤ ᠪᠠᠨ `tu ban`, ᠢ
   ᠪᠠᠨ `i ban`, ᠡᠴᠡ ᠪᠠᠨ `eče ban`; fused, e.g. ᠲᠠᠭᠠᠨ `taγan`, ᠶᠤᠭᠠᠨ `yuγan`, ᠲᠠᠢᠭᠠᠨ `taiγan`. Full membership, romanized: separate `tu
   ban`, `d1u ban`, `ii ban`, `i ban`, `eče ban`; fused `taγan`, `d1aγan`, `teγen`, `d1eγen`, `yuγan`, `yoγen`, `ečaγan`, `ečeγen`,
   `taiγan`, `teiγen`. Both spellings are valid; the rule is consistency. A linter can check this per document, not per word.

### Appendix 3 — spelling of pronouns (113 entries)

A numbered word list (script + Cyrillic) with no rule text.

- **Personal pronouns have irregular fused forms** that a converter must look up, not derive: ᠮᠢᠨᠤ `minu` (миний), ᠨᠠᠮᠠᠶᠢ `namayi`
  (намайг), ᠨᠠᠳᠤᠷ `nadur` (надад). Likewise чиний, чамайг.
- **All other case forms are the oblique stem plus an ordinary case ending, printed as a separate piece**: ᠨᠠᠳᠠ ᠡᠴᠠ `nada eča`
  (надаас), ᠲᠠᠨ ᠲᠠᠢ `tan tai` (тантай), ᠪᠢᠳᠡᠨ ᠢ `biden i` (биднийг). Stems: над-, чам-, тан-, ман-, бидэн-. The Cyrillic is one word;
  the script is stem + ending.
- **The directive is the separate word, one form for both genders**: ᠮᠠᠨ ᠤᠷᠤᠭᠤ `man uruγu` (ман руу) and ᠪᠢᠳᠡᠨ ᠤᠷᠤᠭᠤ `biden uruγu`
  (бидэн рүү) carry the same second word.
- The literary comitative is listed beside the plain one for every person: ᠨᠠᠳᠠ ᠯᠤᠭᠠ `nada luγa` (над лугаа), ᠪᠢᠳᠡᠨ ᠯᠤᠭᠡ `biden luγe`
  (бидэн лүгээ).
- Plurals of pronouns: ᠮᠠ ᠨᠠᠷ `ma nar` (ма нар), ᠲᠠ ᠨᠠᠷ `ta nar` (та нар) with the separate plural word, and ᠮᠠᠨᠤᠰ `manus` (мануус)
  fused.
- Demonstratives and their derived verbs and adverbs: ᠡᠨᠡ `ene` (энэ), ᠡᠶᠢᠮᠦ `eyimü` (ийм), ᠢᠩᠭᠢᠭᠦ `ingγiγü` (ингэх). Two entries
  contain a word-internal nirugu: ᠡ⟨NIRUGU⟩ᠨᠳᠡ `e⟨NIRUGU⟩nde` (энд), ᠲᠡ⟨NIRUGU⟩ᠨᠳᠡ `te⟨NIRUGU⟩nde` (тэнд).
- Interrogatives: ᠭᠡᠨ `γen` (хэн), ᠶᠠᠭᠤ `yaγu` (юу), ᠬᠠᠮᠢᠭᠠ `qamiγa` (хаана), ᠭᠡᠵᠢᠶᠠ `γeǰiya` (хэзээ). One entry gives two accepted
  spellings for ямар: ᠶᠠᠮᠠᠷ `yamar` and ᠶᠠᠮᠪᠠᠷ `yambar`.
- Reflexive and collective pronouns: ᠥᠪᠡᠰᠦᠪᠡᠨ `öbesüben` (өөсөө), ᠬᠠᠮᠤᠭ `qamuγ` (хамаг), ᠪᠦᠭᠦᠳᠡ `büγüde` (бүгд), ᠶᠠᠮᠠᠷᠪᠠ `yamarba`
  (ямарваа). Entry 111 prints өөр with the reflexive ending in brackets as optional.

### Appendix 4 — spelling of some auxiliary words

### 4.1 Conjunctions and linking words (холбох үгс, 69 entries)

- Single words: ᠪᠠ `ba` (ба), ᠪᠤᠶᠤ `buyu` (буюу), ᠪᠥᠭᠡᠳ `böγed` (бөгөөд), ᠪᠣᠯᠪᠠᠴᠤ `bolbaču` (боловч).
- **Cyrillic one word, script several words** (the list prints them apart): ᠲᠡᠳᠦᠢ ᠦᠭᠡᠢ `tedüi üγei` (төдийгүй), ᠲᠡᠶᠢᠨ ᠭᠦ `teyin γü`
  (тийнхүү), ᠲᠡᠶᠢᠮᠦ ᠡᠴᠡ `teyimü eče` (тиймээс), ᠲᠡᠭᠦᠪᠡᠷ ᠪᠠᠷᠠᠬᠤ ᠦᠭᠡᠢ `teγüber baraqu üγei` (түүгээр барахгүй). Also apart: иймийн тул,
  тийм учраас, ташрамд, хэрд, улмаас, хэр нь, эс бөгөөс, өөрөөр хэлбэл, үл барам.
- **Cyrillic one word, script one word**: ᠡᠰᠡᠭᠦᠯᠡ `eseγüle` (эсхүл), ᠡᠰᠡᠪᠡᠯ `esebel` (эсвэл), ᠲᠡᠭᠦᠨᠴᠢᠯᠡᠨ `teγünčilen` (түүнчлэн),
  ᠭᠡᠪᠡᠴᠦ `γebečü` (гэвч).
- Postpositions are in the same list: ᠲᠤᠯᠠᠳᠠ `tulada` (тулд), ᠲᠥᠯᠦᠭᠡ `tölüγe` (төлөө), ᠲᠤᠬᠠᠢ `tuqai` (тухай), ᠮᠡᠲᠦ `metü` (мэт).

### 4.2 Modal words and particles (баймж үгс, 75 entries)

- Degree words: ᠮᠠᠰᠢ `masi` (маш), ᠲᠤᠩ `tung` (тун), ᠨᠡᠩ `neng` (нэн).
- About thirty intensifiers that occur with one fixed partner, each glossed with that partner: ᠬᠤᠭᠤ `quγu` (хуга ~ цохих), ᠲᠠᠭ `taγ`
  (таг ~ харанхуй), ᠴᠢᠰ `čis` (час ~ улаан).
- Negators and prohibitives, all separate words: ᠪᠦ⟨FVS1⟩ᠦ `bü1ü` (бүү), ᠪᠢᠲᠡᠭᠡᠢ `biteγei` (битгий), ᠦᠯᠦ `ülü` (үл), ᠦᠭᠡᠢ `üγei`
  (үгүй). Also эс, биш, бус.
- Sentence particles, each given as its own word: ᠶᠤᠮ `yum` (юм), ᠰᠢᠦ `siü` (шүү), ᠪᠢᠵᠡ `biǰe` (биз), ᠴᠤ `ču` (ч). Also `γü` (хүү),
  `ber` (бээр), `la` (л).
- **One script word covers several Cyrillic particles**: ᠤᠤ `uu` is glossed уу, үү, юу, юү; ᠪᠤᠢ `bui` is glossed бэ, вэ, and the
  identical word (entry 55) буй, бий.
- Harmony pairs with FVS1 after the d: ᠳ⟨FVS1⟩ᠠ `d1a` / ᠳ⟨FVS1⟩ᠡ `d1e` (Cyrillic даа, four harmonic forms) and ᠳ⟨FVS1⟩ᠠᠭ `d1aγ` /
  ᠳ⟨FVS1⟩ᠡᠭ `d1eγ` (даг, four forms).
- Particle chains are printed as separate words: ᠶᠤᠮ ᠰᠠᠨ `yum san` (юм сан), ᠰᠢᠦ ᠳ⟨FVS1⟩ᠡ `siü d1e` (шүү дээ), ᠶᠤᠮ ᠤᠤ ᠳ⟨FVS1⟩ᠠ `yum uu
  d1a` (юм уу даа), ᠴᠤᠬᠤᠮ ᠭᠦ `čuqum γü` (чухамхүү).

### Appendix 5 — grammatical forms of the verb гэ- (59 entries)

- Stems of voice and aspect: ᠭᠡᠭᠳᠡ `γeγde` (гэгд), ᠭᠡᠯᠴᠡ `γelče` (гэлц), ᠭᠡᠴᠢᠭᠡ `γečiγe` (гэчих), ᠭᠡᠵᠡᠭᠡ `γeǰeγe` (гэцгээ).
- Participles and finite forms: ᠭᠡᠭᠦ `γeγü` (гэх), ᠭᠡᠭᠰᠡᠨ `γeγsen` (гэсэн), ᠭᠡᠨᠡ `γene` (гэнэ), ᠭᠡᠵᠡᠢ `γeǰei` (гэжээ).
- Converbs: ᠭᠡᠭᠡᠳ `γeγed` (гээд), ᠭᠡᠲᠡᠯᠡ `γetele` (гэтэл), ᠭᠡᠪᠡᠯ `γebel` (гэвэл), ᠭᠡᠪᠡᠴᠦ `γebečü` (гэвч).
- **Two spellings are listed for гэж**: ᠭᠡᠵᠦ `γeǰü` (entry 15) and ᠭᠡᠵᠢ `γeǰi` (entry 32, footnoted).
- Imperative and optative: ᠭᠡᠶᠡ `γeye` (гэе), ᠭᠡᠭᠡᠷᠡᠢ `γeγerei` (гээрэй), ᠭᠡᠭᠡᠴᠢ `γeγeči` (гээч), ᠭᠡᠭᠡᠰᠡᠢ `γeγesei` (гээсэй).
- **Negation, possessive, case and question pieces are printed apart from the verb form**: ᠭᠡᠯ ᠦᠭᠡᠢ `γel üγei` (гэлгүй), ᠭᠡᠭᠡ ᠦᠭᠡᠢ
  `γeγe üγei` (гээгүй), ᠭᠡᠮᠡ ᠨᠢ `γeme ni` (гэмээ нь), ᠭᠡᠴᠢᠭᠡᠭᠦ ᠢᠢ `γečiγeγü ii` (гэчихийг).
- Question forms: entry 43 is ᠭᠡᠵᠢ ᠤᠤ `γeǰi uu` followed by U+FE16 (гэж үү); entry 44 is ᠭᠡᠵᠢ ᠦᠦ ᠳ⟨FVS1⟩ᠡ `γeǰi üü d1e` followed by
  U+003F (гэж үү дээ). Entries 49–50 end in U+0021.

### Conflicts and additions versus the rest of this knowledge base

Conflicts (7):

1. **Question/exclamation mark — not a conflict** (repository owner, 2026-10-11: the rule does not specify characters). The table is
   typed with U+003F and U+0021. `orthography.md` ("Punctuation & numerals notes") says modern
   practice uses fullwidth U+FF1F/U+FF01.
2. **юм.** Source: ᠶᠤᠮ = `U+1836 U+1824 U+182E` (8 occurrences in the document, none with U+1826), listed as a modal word.
   `suffixes.md` ("Registry entries not yet in scope") has `yüm` with U+1826 as an MVS-joined particle.
3. **бүү.** Source: `U+182A U+1826 U+180B U+1826` (FVS1 between the vowels). `suffixes.md` space-joined row: `U+182A U+1826 U+1826`.
4. **Masculine ablative.** Source writes `U+1821 U+1834 U+1820` (16 occurrences; `U+1820 U+1834 U+1820` never occurs) and the fused
   `U+1821 U+1834 U+1820 U+182D U+1820 U+1828`. `suffixes.md` has `U+1820 U+1834 U+1820` and `U+1820 U+1834 U+1820 U+182D U+1820
   U+1828`. Possibly typed by glyph (inferred).
5. **y-initial endings are typed with doubled U+1822**: genitive `U+1822 U+1822 U+1828` (23 times; `U+1836 U+1822 U+1828` never stands
   alone), accusative `U+1822 U+1822` (6, beside 6 of `U+1836 U+1822`), instrumental `U+1822 U+1822 U+1820 U+1837` (9 to 1), reflexive
   `U+1822 U+1822 U+1820 U+1828` (24 to 0). `suffixes.md` has `U+1836 U+1822 U+1828`, `U+1836 U+1822`, `U+1822 U+1836 U+1820 U+1837`,
   `U+1822 U+1836 U+1820 U+1828`. Almost certainly a font-driven text layer, but it is systematic.
6. **d-initial dative and the particle даа carry FVS1**: `U+1833 U+180B U+1824` (22 with FVS1, 4 without). `suffixes.md` has no FVS
   there and calls an FVS inside a suffix redundant. Probably the source's substitute for the connector it does not encode.
7. **хүү and л.** Source lists `U+182D U+1826` (хүү) and one form `U+182F U+1820` (л) as modal *words*. `suffixes.md` has `hü` with
   U+182C and has la/le as MVS-joined suffixes (its self-declared weakest row).

Additions (10):

1. U+1804's function is documented here; `encoding-model.md` and `orthography.md` both say it is described nowhere.
2. U+1806 is the general dash with four uses, not only the line-continuation hyphen of `encoding-model.md`. Agrees with "never flag as
   Todo-only".
3. `encoding-model.md` calls nirugu "also a nonbreaking compound-word separator". That matches how §3.2.2 is typeset and not what the
   table names; `orthography.md` already records the open question.
4. Numeric uses of U+1802 and U+1804; `orthography.md` says no source covers number punctuation.
5. Abbreviated names: the table gives U+1802 as the mark; §3.1.5 (Part 1) says the same in words, but its examples print
   nirugu, space, U+00B7. `encoding-model.md` has the nirugu, not the dot.
6. Not in `suffixes.md`: the original third-person possessives ᠠᠨᠤ (`anu`) and ᠢᠨᠦ (`inü`), the counterparts of нь. The source calls нь
   itself a possessive ending (нөхцөл), which bears on the open question there, though not on its connector.
7. Fused forms `taγan`, `teγen`, `ečeγen` are listed by the source; `suffixes.md` has them as "expected-but-unregistered". `yuγan` and
   its feminine mate pair with the accusative + reflexive in the separate list (inferred from list order); `suffixes.md` shows "?" for
   the Cyrillic.
8. `suffixes.md` asks why dag/deg is detached: the source files it as a modal word (4.2 entry 53).
9. The consistency rules (recommendations 1–2) are new; `suffixes.md` calls the -r datives "equally standard" and `orthography.md`
   mentions only the fused forms.
10. Pronoun stems and fused forms (Appendix 3) and the гэ- paradigm (Appendix 5): no counterpart.

Agreements: one directive word for both genders, written apart; үгүй, the modal сан and the question particle all apart.

### Could not digest

- **Appendix layout.** Appendices 3–5 are multi-column pages that the text layer reads bottom-up and interleaved. Entries whose
  Cyrillic sits on a neighbouring line were paired by order plus the romanization (inferred). Every example above was checked that way;
  the full lists were not.
- **Appendix 5 footnotes are missing.** Entries 6, 7, 16, 32 and 48 (the last inferred) carry `*`, `**`, `**`, `***`, `*****`; neither
  file has the notes, so what distinguishes the two spellings of гэж is unknown.
- **k and g in feminine words are not reliable.** The text layer types U+182D for both: хэн is `U+182D U+1821 U+1828`, гэх is `U+182D
  U+1821 U+182D U+1826`. Do not take k/g letter identity from this source.
- **Vowel letters typed by look**: `biden luγe` and `γeǰi siu` have U+1824 where the word is feminine; `γeγsan aǰei` (entries 47–48)
  has U+1820 where entry 7 has U+1821; `γeǰiya` ends in U+1820; `yoγen` is `U+1836 U+1823 U+182D U+1821 U+1828`.
- **Entry 74 of 4.2** (буй за) is `U+182A U+1824 U+1822 U+0020 U+1822 U+1820`: the particle за is typed U+1822 U+1820.
- **уу / үү.** 4.2 lists one form for all four Cyrillic particles, yet Appendix 5 uses U+1824 U+1824 in entry 43 and U+1826 U+1826 in
  entry 44 after the same word. Cannot tell if one form is prescribed.
- **Recommendation 1** names `ni` and `tai` as the possessive of the modernized set; the second is the comitative and looks like a
  slip.
- **Literary comitative**: Appendix 3 prints `U+182F U+1824 U+182D U+1820` with no break before the final vowel, while the
  recommendations print the verb ending as `U+180A U+180A U+182F U+1824 U+182D U+0020 U+1820`. Not evidence either way.
- 4.1 entry 54 prints the same word twice (ᠰᠢᠭ, identical code points) for шиг. Appendix 5 entries 24 and 25 are both glossed гэнгээ
  although the script differs (`γengγüte`, `γengγe`).
- One or two nirugu before a bound ending: no pattern found; treated as typesetting (inferred).
