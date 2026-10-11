# What Mongolia's national orthography rule teaches

What this knowledge base learned from *Монгол бичгийн зөв бичих дүрэм*
(Institute of Language and Literature, Mongolian Academy of Sciences, 2025),
approved as Mongolia's national rule by resolution No. 02 of the National
Council for Language Policy on 2026-02-11. These are the lessons, in our own
words, with the section they come from. The book itself is not reproduced
here; read it for its wording, tables and examples. What it teaches about
suffixes and endings is in [national-rule-suffixes.md](national-rule-suffixes.md).

Two things to know before using it:

- **It is a language rule, not a technical one.** It says which mark or which
  spelling, never which Unicode character, and it has one term, "written
  following", for everything that stands after a stem, whether this knowledge
  base joins it with a connector or a space. Encoding stays with
  `encoding-model.md`, `orthography.md` and `suffixes.md`.
- **Its PDF is not a source of code points.** The script in it is typed to
  look right: same-shaped letters are interchanged and there is no MVS or
  NNBSP anywhere.

## Rulings so far

The repository owner's rulings on the points where this rule and the rest of
the knowledge base differ, all 2026-10-11.

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

## The four principles

The orthography rests on four principles, in this order of weight. Spell as
the script recorded the pronunciation when it was adopted (phonetic). Keep a
root, stem and suffix recognisable even where speech has moved on, so related
words share one written root (morphological). Keep the fixed traditional
spelling of the words that have one, and the origin-based spelling of old
literary loans (historical). Tell look-alike words apart in writing, which is
what a separated against a joined final vowel often does (distinguishing).

## Harmony (§2.1)

- A word is masculine or feminine throughout, set by its first syllable; i is
  neutral, and a word whose only vowel is i takes feminine endings.
- үгүй, the directive руу and өөд are written following in one fixed form, so
  they ignore the gender of the word before them.
- A consonant-initial ending agrees with the stem's final: the voiceless
  variant after a hard final (б, г, р, с, д), the voiced one after a soft
  final or a vowel.
- After a syllable-final д or с the velar is the voiceless one, and a
  stem-final н is written ng before a velar or another n.

## Vowels and consonants in sequence (§2.2)

Vowels do not stand next to each other and a consonant does not stand without
a vowel; where a suffix would break that, a sound is added or dropped. The
book's own exceptions: loans and historically spelled words, sound-imitating
words, the doubled vowel that marks a noun or adjective in -уу, and a vowel
followed by й or в, which count as soft finals. This is why a consonant-final
verb stem takes a linking u/ü before many endings, and a noun stem a linking
a/e before a single-consonant suffix.

## Attached or written following (§2.3)

- **Written following the stem:** case endings, possessive and reflexive
  endings, the plurals -ууд / -нууд and нар, and the negative үгүй.
- **Attached:** all verbal endings, and the plurals -д, -с, -чууд, -чуул.
- **Pronouns with a case ending** are single words (миний, надад, намайг).
- **-х and -хан** follow only after a genitive (тэднийх, нутгийнхан);
  otherwise attached.
- **Particles after a head word follow it** (нэг л, бас ч, юм шиг, яах вэ).
  энэхүү, тэрхүү and гагцхүү are one word in Cyrillic and two in the script.
- **A few words in -гүй are single words** by long custom (эзгүй, ашгүй,
  бүсгүй). Real negation is a separate үгүй, and a further suffix attaches to
  үгүй, not to the stem (ажилгүйдэл).
- **хий-** is written apart after a paired or sound-imitating word, where гэх
  could replace it, and attached where it has become a suffix.

## The final a and e (§1.1)

The separated final vowel is largely a matter of vocabulary, learned word by
word, and sometimes all that tells two words apart (сар the month against сар
the moon, нэр against нар). The book offers this as orientation: it is always
separated after у, as in чоно; it is not separated after с, ш, д, т, ч, ж; and
verb stems ending in -на, -ма, -ла, -я, -ра take the joined form. The
repository owner treats this as guidance for a writer who does not know the
word, not as a rule to check mechanically.

## Abbreviations and numbers (§3.1)

- A syllabic abbreviation is one word and ignores harmony (МОНЦАМЭ).
- A Mongolian initialism is written letter by letter with a space between,
  each consonant given the vowel it has in its own word (НҮБ).
- An internationally known Latin abbreviation may stay Latin (UNESCO).
- A patronymic initial is the first consonant with its vowel, or the vowel
  alone, set off from the name by a dot.
- After a number in digits the ending is written following with nothing
  between, and an ordinal ending is written in full.

## Proper names (§3.2)

Names follow the dedicated dictionary of proper names; one not in it is
spelled from its meaning and origin. A name that Cyrillic writes with a
familiar ending is written in the script as the base name only (Батаа,
Доржоо). Compound names, and the difference between Mongolia's hyphen and
Inner Mongolia's joined form, are in `orthography.md`.

## Foreign words (§3.3)

- Old, assimilated loans keep their traditional spelling (агшин, хир, очир).
- A new foreign word is written letter for letter where its spelling and
  sound agree. Where they do not, sound usually wins, but spelling may be kept
  to leave the word recognisable; the book leaves these to dictionaries.
- Foreign words have their own letter shapes: э is the loan letter U+1827 in
  every position, a doubled consonant is kept, and a final a is the joined
  tail except after the round letters.
- The dative after a foreign final follows the same hard and soft split as
  native words.

## Punctuation (chapter four)

Twelve marks, each with its uses. Five belong to the script: the single dot
(a comma), the double dot (a full stop), the colon, the ellipsis and the
dash. The rest are the marks Cyrillic uses: semicolon, question mark,
exclamation mark, double quotes, round and square brackets, the tilde that
stands for a headword in a dictionary, and the asterisk for a footnote.

- The single dot also follows a patronymic initial and separates the parts of
  a date written in digits.
- The colon also writes a score and a clock time.
- The dash has four uses: the hyphen of a compound name, dialogue and listed
  items, a range of time or space, and setting off the subject for emphasis.
- The book says nothing about spacing around a mark.

## Word lists (Appendices 3 to 5)

The appendices fix the spelling of pronouns, of conjunctions and particles,
and of the forms of гэ-. What they teach beyond the individual words:

- Pronoun case forms are an oblique stem (над-, чам-, тан-, ман-, бидэн-) with
  an ordinary ending written following; only a few are fused single words and
  must be looked up.
- Several conjunctions that Cyrillic writes as one word are several words in
  the script (төдийгүй, тиймээс), while others are one word in both (эсвэл,
  түүнчлэн).
- Negators and sentence particles are separate words (бүү, битгий, үл, юм,
  шүү, биз), and chains of them stay separate (юм сан, шүү дээ).
- One written particle serves several Cyrillic ones: the question particle
  for уу, үү, юу, юү.
- With гэ-, the negation, possessive, case and question pieces are written
  apart from the verb form.
