# Mongolia's national orthography rule — suffixes and endings

Digest of *Монгол бичгийн зөв бичих дүрэм* (Institute of Language and Literature, Mongolian Academy of Sciences, Ulaanbaatar 2025), approved as Mongolia's national rule by resolution No. 02 of the National Council for Language Policy, 2026-02-11. This file covers Appendix 1 (derivational suffixes,
дагавар) and Appendix 2 (inflectional endings, нөхцөл), the second
cross-checked against the registry. The body of the rule is in
[national-rule.md](national-rule.md).

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

The repository owner's rulings on the conflicts listed in this file are
collected under "Rulings so far" in [national-rule.md](national-rule.md).

## Part 3 — Appendix 1, derivational suffixes

Source: the text layer lines 724–2485 (Хавсралт 1, §1.1–§1.2; printed pp. 21–48). Cited as "App.1 §x.y.z #n" (n = the row number in that table). The appendix is tables only: Cyrillic suffix, script form(s), function, attachment note, examples. It gives **no Cyrillic gloss for its examples**, so examples below carry script + mechanical romanization only; any gloss in [brackets] is mine (inferred).

**How to read the forms.** Each form is `script romanization «source's own Cyrillic-letter transliteration»`, masculine first. Script is spliced from the text layer with the table's leading hyphen/stem-extender stripped; romanization is `fromScript` output on exactly those code points. **Trust the «…» part over the code points**: the text layer is glyph-level, so it regularly has (a) u for ü and o for u/ö in non-initial syllables, (b) U+182D for feminine х/k where Unicode text would use U+182C (e.g. «-хэй» comes out as γei), (c) d/t swapped where the glyphs coincide, (d) the detached final vowel shown as a plain a/e with no MVS. Where the romanization and the «…» disagree, that is why. Superscripts ², ³, ⁴ … are the source's count of Cyrillic harmony variants (-аад⁴ = -аад/-ээд/-оод/-өөд).

### General attachment rules (recurring across the tables)

- **G1 Attached by default.** Derivational suffixes are written joined to the stem (залгаж бичнэ); the most common table note is "attach directly whatever the stem ends in". Marked **[any]** below. (App.1 passim)
- **G2 The few that are written after the stem as a separate unit (дагуулна):** plural ᠨᠤᠭᠤᠳ/ᠨᠣᠭᠦᠳ nuγud/noγüd «-нугуд/-нүгүд», ᠤᠳ/ᠤᠳ ud/ud «-уд/-үд», ᠨᠠᠷ nar «нар», and ᠭᠢ γi «-хи» / ᠭᠢᠨ γin «-хин» when they follow a case suffix (§1.1.1 #1, #2, #51, #52). Everything else in the appendix is attached. (The rule text says only "дагуулна"; which connector that means is not stated here.)
- **G3 Vowel harmony** picks between a masculine and a feminine written form (эгшиг зохицох ёсоор). A Cyrillic ² or ⁴ set normally collapses to **two** written forms (-нгар⁵ has three, -аахай⁶ four), and several suffixes have **one** written form for all Cyrillic variants: ᠯᠢᠭ liγ «-лиг» for -лаг⁴, ᠷᠢᠭ riγ «-риг» for -раг⁴, ᠨᠴᠢᠷ nčir «-нчир» for -нцар⁴, ᠵᠢᠶᠡᠯ ǰiyel «-жийал» is spelled identically in both rows for -жаал/-жөөл/-жээл (likewise -жаар), plus the i-final ones (ᠴᠢ či «-чи», ᠴᠢᠨ čin «-чин», ᠵᠢᠨ ǰin «-жин», ᠮᠵᠢ mǰi «-мжи», ᠪᠴᠢ bči «-бчи», ᠭᠴᠢ γči «-гчи», ᠮᠰᠢᠭ msiγ «-мшиг», ᠰᠢ si «-ши»).
- **G4 γ/g after most vowels, y after i.** Suffixes whose Cyrillic form starts with a long vowel (-аа⁴, -аач², -аан⁴, -аарь, -аахай⁶, numeral -аад⁴) are written with γ/g + vowel after a stem ending in any vowel but i, and with y + vowel after a stem ending in i (§1.1.1 #7, #15; §1.1.2 #1, #34, #36, #38, #40).
- **G5 γ/g becomes q/k (Cyrillic х) after d, s** (and b for one suffix): -гана⁴ (§1.1.1 #18; §1.1.3 #4), -галан⁴ after d, s, b (§1.1.2 #5), causative -га⁴ → -ха⁴ (§1.2.2 #2–3), -гар² (§1.1.2 #55, inferred from its examples).
- **G6 Linking vowel (жийрэглэх).** Vowel-final stems take the suffix directly; consonant-final stems insert u/ü before it. Marked **[+u]**: -аал², -аас⁴, -лга⁴ (§1.1.2 #35, #39, #45), causative -уул², passive -гд, reciprocal -лд, cooperative -лц, -аатах⁴, -схий, -лхийл (§1.2.2 #5, #6, #8, #9, #11, #13, #29). Linking **a/e** instead before noun-forming -г (§1.1.1 #71) and verb-forming -рх/-лх (§1.2.1 #15).
- **G7 Stem-final consonant dropped** (marked **[−n]** etc.): n before plural -чууд², -втар⁴, colour -бар⁴, -рх; n and ng before -мсаг⁴; n, ng, r before -гч; n and й before -лзгана⁴; r before verb-forming -с (#16); "some" n-final words before verb-forming -д/-ж. With verb-forming -ш the final n turns into m rather than dropping (§1.2.1 #18). With -га⁴/-гаа⁴ on an n-final stem the n is written as ng (the source calls it "much инхлэг", §1.1.1 #68; ᠤᠶᠠᠩᠭᠠ (uyangγa)).
- **G8 Hard vs soft finals** choose t vs d and č vs ǰ: passive -т after hard finals, -д after soft (§1.2.2 #7); plural-action -цгаа⁴ is «-цаг-а/-цэгэ» after hard finals and «-заг-а/-зэгэ» after soft finals and vowels (§1.2.2 #10). The hard-final examples end in b, γ/g, r, s, d.
- **G9 Detached final a/e.** The source's transliterations hyphenate the final vowel of the masculine form — «-г-а», «-ган-а», «-хан-а», «-таг-а», «-цаг-а», «-сх-а», «-лг-а», «-м-а/-м-э», «-н-а/-н-э», «-р-а/-р-э», «-рх-а», «-лх-а», «-х-а», «-чих-а», «-гадх-а», «-заг-а», «-лзаган-а» — i.e. these suffixes end in the separately written a/e. Feminine rows are mostly unhyphenated («-гэ», «-цэгэ», «-лгэ»). The text layer drops the separator, so the script forms below show an ordinary a/e.
- **G10 -ра/-рэ + -хай/-хэй contracts**: when ᠬᠠᠢ/ᠭᠡᠢ qai/γei «-хай/-хэй» follows the verb suffix -ра/-рэ, the a/e tooth is dropped by convention and the result is written «-рхай/-рхэй» (§1.1.2 #16; ᠲᠣᠳᠤᠷᠬᠠᠢ (todurqai), ᠨᠡᠪᠲᠡᠷᠭᠡᠢ (nebterγei)).
- **G11 Do not confuse** -мсаг⁴ (ᠮᠰᠤᠭ/ᠮᠰᠦᠭ msuγ/msüγ «-мсуг/-мсүг») with the compound -са+г / -сэ+г that follows a stem ending in m or n (footnote to §1.1.1 #69).

### Plural suffixes (олон тооны дагавар) — App.1 §1.1.1 #1–6

- **#1 -нууд² / -ууд²**, written after the stem (дагуулна), by harmony:
  - ᠨᠤᠭᠤᠳ/ᠨᠣᠭᠦᠳ nuγud/noγüd «-нугуд/-нүгүд» after a stem ending in **n or a vowel**: ᠰᠣᠨᠢᠨ (sonin) + ᠨᠤᠭᠤᠳ (nuγud), ᠣᠪᠤᠭ (obuγ) ⟨detached ᠠ (a)⟩ + ᠨᠤᠭᠤᠳ (nuγud), ᠰᠢᠷᠡᠭᠡ (sireγe) + ᠨᠤᠭᠦᠳ (nuγüd).
  - ᠤᠳ/ᠤᠳ ud/ud «-уд/-үд» after a stem ending in a **consonant other than n**: ᠤᠯᠤᠰ (ulus) + ᠤᠳ (ud), ᠭᠡᠷ (γer) + ᠤᠳ (ud) [гэрүүд], ᠲᠡᠮᠳᠡᠭ (temdeγ) + ᠤᠳ (ud).
- **#2 нар** ᠨᠠᠷ nar «нар» — written after the stem, whatever its final; only for a small set of kinship and occupation words. The header gives one form, but the examples harmonize: ᠪᠠᠭᠰᠢ (baγsi) + ᠨᠠᠷ (nar) [багш нар], ᠰᠠᠶᠢᠳ (sayid) + ᠨᠠᠷ (nar), yet ᠳᠡᠭᠦᠦ (deγüü) + ᠨᠡᠷ (ner), ᠡᠮᠴᠢ (emči) + ᠨᠡᠷ (ner).
- **#3 -с** ᠰ s «-с» — **attached**, whatever the final; a stem-final n, i, r or l is dropped first (the text says "final consonant" although it lists i). ᠬᠦᠮᠦᠰ (qümüs) [хүмүүс], ᠦᠷᠡᠰ (üres), ᠨᠣᠬᠠᠰ (noqas), ᠵᠠᠯᠠᠭᠤᠰ (ǰalaγus).
- **#4 -д** ᠳ d «-д» — attached; on words ending in a long vowel or diphthong the final vowel is dropped first. ᠨᠥᠬᠦᠳ (nöqüd) [нөхөд], ᠲᠦᠰᠢᠮᠡᠳ (tüsimed) [түшмэд], ᠬᠥᠭᠰᠢᠳ (qöγsid), ᠨᠢᠷᠤᠭᠤᠳ (niruγud). (See Could not digest: the examples look like consonant-drop cases.)
- **#5 -чууд²** ᠴᠣᠳ/ᠴᠤᠳ čod/čud «-чуд/-чүд» — attached, whatever the final; stem-final n dropped. ᠤᠷᠠᠴᠤᠳ (uračud), ᠪᠠᠭᠠᠴᠤᠳ (baγačud), ᠡᠷᠡᠴᠦᠳ (erečüd), ᠪᠦᠰᠡᠭᠦᠶᠢᠴᠦᠳ (büseγüyičüd).
- **#6 -чуул²** ᠴᠤᠤᠯ/ᠴᠤᠦᠯ čuul/čuül «-чуул/-чүүл» — attached (no condition stated). ᠪᠠᠶᠠᠴᠤᠤᠯ (bayačuul), ᠪᠠᠭᠠᠴᠤᠤᠯ (baγačuul), ᠡᠷᠡᠭᠲᠡᠶᠢᠴᠦᠦᠯ (ereγteyičüül).

### Numeral suffixes (тооны нэрийн дагавар) — App.1 §1.1.1 #7–14

All are attached (залгана) to the numeral word, by harmony.

- **#7 -аад⁴** approximate numbers: ᠭᠠᠳ/ᠭᠡᠳ γad/γed «-гад/-гэд»; ᠶᠠᠳ yad «-йад» after i. ᠠᠷᠪᠠᠭᠠᠳ (arbaγad) [арваад], ᠵᠠᠭᠤᠭᠠᠳ (ǰaγuγad), ᠶᠡᠷᠡᠭᠡᠳ (yereγed), ᠬᠣᠰᠢᠶᠠᠳ (qosiyad).
- **#8 -дагч⁴** ordinal: ᠳ⟨FVS1⟩ᠠᠭᠴᠢ/ᠳ⟨FVS1⟩ᠡᠭᠴᠢ d1aγči/d1eγči «-дагчи/-дэгчи» (the text layer carries an FVS1 after the d). ᠭᠣᠷᠪᠠᠳᠠᠭᠴᠢ (γorbadaγči), ᠳᠥᠷᠪᠡᠳᠡᠭᠴᠢ (dörbedeγči), ᠠᠩᠬᠠᠳᠠᠭᠴᠢ (angqadaγči).
- **#9 -дахь / -дэх** ordinal: ᠳ⟨FVS1⟩ᠠᠭᠢ/ᠳ⟨FVS1⟩ᠡᠭᠢ d1aγi/d1eγi «-дахи/-дэхи». ᠵᠠᠭᠤᠳᠠᠭᠢ (ǰaγudaγi), ᠨᠠᠶᠮᠠᠳᠠᠬᠢ (naymadaqi), ᠨᠢᠭᠡᠳᠡᠭᠢ (niγedeγi), ᠭᠡᠳᠦᠳᠡᠭᠢ (γedüdeγi). (Text layer mixes U+182D and U+182C for the х within one column.)
- **#10 -дугаар²** ordinal: ᠳᠤᠭᠠᠷ/ᠳᠤᠭᠡᠷ duγar/duγer «-дугар/-дүгэр». ᠬᠣᠶᠠᠳᠤᠭᠠᠷ (qoyaduγar), ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ (γurbaduγar), ᠨᠠᠶᠮᠠᠳᠤᠭᠠᠷ (naymaduγar), ᠨᠢᠭᠡᠳᠦᠭᠡᠷ (niγedüγer), ᠭᠡᠳᠦᠳᠦᠭᠡᠷ (γedüdüγer); and contracted bases ᠭᠤᠲᠤᠭᠠᠷ (γutuγar) beside ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ (γurbaduγar) (3rd), ᠳᠥᠲᠦᠭᠡᠷ (dötüγer) (4th).
- **#11 -л** collective, a contracted form of -уул²: ᠯ l «-л». ᠭᠤᠷᠪᠠᠯ (γurbal), ᠳᠥᠷᠪᠡᠯ (dörbel), ᠲᠠᠪᠤᠯ (tabul).
- **#12 -мсан⁴ / -мөсөн** "n-fold, done n times over": ᠮᠦᠰᠦᠨ/ᠮᠦᠰᠦᠨ müsün/müsün «-мусун/-мүсүн» (text layer gives the same code points for both; masculine examples show musun). ᠭᠤᠷᠮᠤᠰᠤᠨ (γurmusun), ᠨᠢᠭᠡᠮᠦᠰᠦᠨ (niγemüsün), ᠪᠦᠷᠢᠮᠦᠰᠦᠨ (bürimüsün).
- **#13 -уул²** collective: ᠭᠤᠯᠠ/ᠭᠦᠯᠡ γula/γüle «-гула/-гүлэ». ᠬᠣᠶᠠᠭᠤᠯᠠ (qoyaγula) [хоёул], ᠳᠥᠷᠪᠡᠭᠦᠯᠡ (dörbeγüle), ᠣᠯᠠᠭᠣᠯᠠ (olaγola).
- **#14 -таа⁴** multiplicative ("n times"): ᠲᠠ/ᠲᠡ ta/te «-та/-тэ», attached to the numeral's **n-stem**, except "two". ᠨᠢᠭᠡᠨᠲᠡ (niγente), ᠬᠣᠶᠠᠷᠲᠠ (qoyarta), ᠣᠯᠠᠨᠲᠠ (olanta), ᠲᠦᠮᠡᠨᠲᠡ (tümente).

### Noun from noun — other suffixes (App.1 §1.1.1 #15–75)

- #15 **-аа⁴**: ᠭᠠ/ᠭᠡ γa/γe «-г-а/-гэ» after a vowel other than i; ᠢᠠ/ᠢᠠ ia/ia «-й-а/-й-э» after i (both rows carry the same code points).
- #16 **-гай/-гий/-гой/-гуй/-гүй** (honorific kin terms, other nouns): ᠭᠠᠢ/ᠭᠡᠢ γai/γei «-гай/-гэй», ᠭᠣᠢ/ᠭᠦᠢ γoi/γüi «-гуй/-гүй» [any]. Not the negative -гүй.
- #17 **-ган⁴** (kin terms): ᠭᠠᠨ/ᠭᠡᠨ γan/γen «-ган/-гэн» [any]. · #18 **-гана⁴** (plants, animals): ᠭᠠᠨᠠ/ᠭᠡᠨᠡ γana/γene «-ган-а/-гэн-э» after vowels and consonants other than d, s; ᠬᠠᠨᠠ/ᠭᠡᠨᠡ qana/γene «-хан-а/-хэн-э» after d, s.
- #19 **-д** (place/direction, from locational stems and inactive roots): ᠳᠤ/ᠳᠦ du/dü «-ду/-дү». · #20 **-д** (time/place nouns; intensifies modal words and conjunctions): ᠳᠠ/ᠳᠡ da/de «-да/-дэ» [any].
- #21 **-даг⁴**: ᠳᠠᠭ/ᠲᠡᠭ daγ/teγ «-даг/-дэг», ᠳᠤᠭ/ᠲᠦᠭ duγ/tüγ «-дуг/-дүг» [any]. · #22 **-дай³** (endearing/honorific): ᠳᠠᠢ/ᠳᠡᠢ dai/dei «-дай/-дэй» [any].
- #23 **-дуу²** ("slightly"; a compound of verb-forming -да/-дэ and adjectival -уу/-үү): ᠳᠠᠭᠤ/ᠳᠡᠭᠦᠦ daγu/deγüü «-дагу/-дэгүү».
- #24 **-з**: ᠵᠠ/ᠵᠡ ǰa/ǰe «-жа/-жэ». · #25 **-жин** ("all through" a time): ᠵᠢᠨ ǰin «-жин». · #26 **-жин** (personal names): ᠵᠢᠨ ǰin «-жин».
- #27 **-жаар/-жөөр/-жээр**: ᠵᠢᠶᠡᠷ/ᠵᠢᠶᠡᠷ ǰiyer/ǰiyer «-жийар/-жийэр» [any]. · #28 **-жаал/-жөөл/-жээл** (variant of #27): ᠵᠢᠶᠡᠯ/ᠵᠢᠶᠡᠯ ǰiyel/ǰiyel «-жийал/-жийэл».
- #29 **-л, -ль / -лд**: ᠯᠢ li «-ли», ᠯᠢᠳ lid «-лид». · #30 **-лаг⁴**: ᠯᠢᠭ liγ «-лиг» — one form. · #31 **-лан⁴**: ᠯᠠᠩ/ᠯᠡᠩ lang/leng «-ланг/-лэнг».
- #32 **-маг⁴**: ᠮᠠᠭ/ᠮᠡᠭ maγ/meγ «-маг/-мэг». · #33 **-мад²**: ᠮᠠᠳ/ᠮᠡᠳ mad/med «-мад/-мэд». · **-раг⁴**: ᠷᠢᠭ riγ «-риг» — one form.
- #34 **-с / -сан⁴**: ᠰᠤ/ᠰᠦ su/sü «-су/-сү», ᠰᠤᠨ/ᠰᠤᠨ sun/sun «-сун/-сүн». (Numbers #29–34 are spread over ten columns; exact number-to-column mapping not recoverable.)
- #35 **-сар⁴**: ᠰᠠᠷ/ᠰᠡᠷ sar/ser «-сар/-сэр». · #36 **-т**: ᠲᠤ/ᠲᠦ tu/tü «-ту/-тү». · #37 **-таа⁴**: ᠲᠠ/ᠲᠡ ta/te «-таа/-тээ», ᠲᠠᠭᠠ/ᠲᠡᠭᠡ taγa/teγe «-таг-а/-тэгэ».
- #38 **-тай³**: ᠲᠠᠢ/ᠲᠡᠢ tai/tei «-тай/-тэй» — attached as a word-forming suffix (ᠶᠣᠰᠤᠲᠠᠢ (yosutai), ᠭᠡᠷᠡᠭᠲᠡᠢ (γereγtei)). · #39 **-тан⁴** (people/animals having X): ᠲᠠᠨ/ᠳᠡᠨ tan/den «-тан/-тэн». · #40 **-тан⁴** (honorific, from the pronoun тан): ᠲᠠᠨ/ᠳᠡᠨ tan/den «-тан/-тэн».
- #41 **-уур²** (tools): ᠭᠤᠷ/ᠭᠦᠷ γur/γür «-гур/-гүр». · #42 **-уур²** (approximate location): ᠭᠤᠷ/ᠭᠦᠷ γur/γür «-гур/-гүр». · #43 **-хай³**: ᠬᠠᠢ/ᠭᠡᠢ qai/γei «-хай/-хэй».
- #44 **-хай³ / -гай³** (endearing, diminutive): ᠬᠠᠢ/ᠭᠡᠢ qai/γei «-хай/-хэй», ᠭᠠᠢ/ᠭᠡᠢ γai/γei «-гай/-гэй». · #45 **-ц**: ᠴᠠ/ᠴᠡ ča/če «-ца/-цэ».
- #46 **-цаа⁴** (measure; from чинээ): ᠴᠠᠭᠠ/ᠴᠡᠭᠡ čaγa/čeγe «-цаг-а/-цэгэ». · #47 **-цаа⁴** (compound of -ца + -га): ᠴᠠᠭᠠ/ᠴᠡᠭᠡ čaγa/čeγe «-цаг-а/-цэгэ». · #48 **-цаг⁴** (diminutive): ᠴᠠᠭ/ᠴᠡᠭ čaγ/čeγ «-цаг/-цэг».
- #49 **-ч** ᠴᠢ či «-чи», **-чин** ᠴᠢᠨ čin «-чин» (occupation, quality). · #50 **-ш** (direction, time): ᠰᠢ si «-ши».
- #51 **-х(и)** (belonging): ᠭᠢ γi «-хи» — attached directly whatever the final (ᠳᠠᠷᠠᠭᠠᠭᠢ (daraγaγi), ᠳᠣᠲᠤᠷᠠᠭᠢ (doturaγi)); **after a case suffix it is written following** (дагуулна): ᠭᠡᠷ (γer) + ᠲᠦ (tü) + ᠭᠢ (γi), ᠮᠠᠨ (man) + ᠤ (u) + ᠭᠢ (γi).
- #52 **-хан⁴** (the people belonging to): ᠭᠢᠨ γin «-хин» — written following a genitive or dative-locative: ᠬᠣᠲᠠ (qota) + ᠢᠢᠨ (iin) + ᠭᠢᠨ (γin), ᠮᠠᠨ (man) + ᠤ (u) + ᠭᠢᠨ (γin).
- #53 **-лдай³**: ᠯᠳᠠᠢ/ᠯᠳᠡᠢ ldai/ldei «-лдай/-лдэй». · #54 **-лж** ᠯᠵᠢ lǰi «-лжи», **-лжин** ᠯᠵᠢᠨ lǰin «-лжин». · #55 **-н**: ᠨ n «-н», direct on vowel-final words. · #56 **-н** (written ng): ᠩ ng «-нг».
- #57 **-ндай³**: ᠨᠳᠠᠢ/ᠨᠳᠡᠢ ndai/ndei «-ндай/-ндэй». · #58 **-нгуй²**: ᠩᠭᠤᠢ/ᠩᠭᠦᠢ ngγui/ngγüi «-нггуй/-нггүй». · #59 **-нхай²**: ᠩᠬᠠᠢ/ᠩᠭᠡᠢ ngqai/ngγei «-нгхай/-нгхэй».
- #60 **-втар⁴**: ᠪᠲᠤᠷ/ᠪᠲᠦᠷ btur/btür «-втур/-втүр» [−n]. · #61 **-гтай³** (gender, honorific): ᠭᠲᠠᠢ/ᠭᠲᠡᠢ γtai/γtei «-гтай/-гтэй».
- #62 **-гч** (sex/coat colour): ᠭᠴᠢ γči «-гчи» [−n, −ng, −r]. · #63 **-гч** (a variant of -вч on stems containing a labial consonant): ᠭᠴᠢ γči «-гчи». · #64 **-гчин**: ᠭᠴᠢᠨ γčin «-гчин».
- #65 **-лзгана⁴** (compound of -лж + -гана): ᠯᠵᠠᠭᠠᠨᠠ/ᠯᠵᠡᠭᠡᠨᠡ lǰaγana/lǰeγene «-лзаган-а/-лзэгэн-э», ᠯᠵᠢᠭᠠᠨᠠ/ᠯᠵᠢᠭᠡᠨᠡ lǰiγana/lǰiγene «-лзиган-а/-лзигэн-э» [−n, −й].
- #66 **-мж**: ᠮᠵᠢ mǰi «-мжи». · #67 **-хан⁴** (diminutive/attenuative): ᠬᠠᠨ/ᠭᠡᠨ qan/γen «-хан/-хэн». · #68 **-га⁴ / -гаа⁴**: ᠭᠠ/ᠭᠡ γa/γe «-г-а/-гэ»; n-final stem → ng (G7).
- #69 **-мсаг⁴**: ᠮᠰᠤᠭ/ᠮᠰᠦᠭ msuγ/msüγ «-мсуг/-мсүг» [−n, −ng] (G11). · #70 **-вч** (covers, guards): ᠪᠴᠢ bči «-бчи», direct on vowel-final stems.
- #71 **-г**: ᠭ γ «-г»; consonant-final noun stems take a linking a/e. · #72 **-нцар⁴**: ᠨᠴᠢᠷ nčir «-нчир» — one form.
- #73 **-бар² / -вар²**: ᠪᠤᠷ/ᠪᠦᠷ bur/bür «-бур/-бүр», direct on vowel-final stems; rare. · #74 **-бар⁴ / -вар⁴** (off-shade colours): ᠪᠤᠷ/ᠪᠦᠷ bur/bür «-бур/-бүр» [−n]. · #75 **-дас⁴**: ᠳᠠᠰᠤ/ᠳᠡᠰᠦ dasu/desü «-дасу/-дэсү».

### Noun from verb (App.1 §1.1.2 #1–59)

- #1 **-аач²** (agent): ᠭᠠᠴᠢ/ᠭᠡᠴᠢ γači/γeči «-гачи/-гэчи» after a vowel other than i; ᠶᠠᠴᠢ/ᠶᠡᠴᠢ yači/yeči «-йачи/-йэчи» after i. ᠬᠠᠷᠪᠤᠭᠠᠴᠢ (qarbuγači), ᠪᠠᠷᠢᠶᠠᠴᠢ (bariyači).
- #2 **-вар⁴ / -бар⁴**: ᠪᠤᠷᠢ/ᠪᠦᠷᠢ buri/büri «-бури/-бүри». · #3 **-вар⁴ / -бар⁴**: ᠪᠤᠷ/ᠪᠦᠷ bur/bür «-бур/-бүр» [any]. · #4 **-га⁴ / -г / -гаа⁴**: ᠭᠠ/ᠭᠡ γa/γe «-г-а/-гэ».
- #5 **-галан⁴**: ᠭᠤᠯᠠᠩ/ᠭᠦᠯᠡᠩ γulang/γüleng «-гуланг/-гүлэнг» on a few vowel-final words; ᠬᠣᠯᠠᠩ/ᠭᠦᠯᠡᠩ qolang/γüleng «-хуланг/-хүлэнг» after d, s, b (ᠪᠠᠶᠠᠰᠬᠤᠯᠠᠩ (bayasqulang)).
- #6 **-д**: ᠳᠤ/ᠳᠦ du/dü «ду/дү», ᠳᠤᠨ/ᠳᠦᠨ dun/dün «-дун/-дүн» [any]. · #7 **-дал**: ᠳᠠᠯ/ᠳᠡᠯ dal/del «-дал/-дэл». · #8 **-дас**: ᠳᠠᠰᠤ/ᠳᠡᠰᠦ dasu/desü «-дасу/-дэсү». · #9 **-з**: ᠵᠠ/ᠵᠡ ǰa/ǰe «-за/-зэ».
- #10 **-л, -ль**: ᠯᠢ li «-ли». · #11 **-лан⁴**: ᠯᠠᠩ/ᠯᠡᠩ lang/leng «-ланг/-лэнг». · #12 **-мь**: ᠮᠢ mi «-ми». · #13 **-р, -рь**: ᠷᠢ ri «-ри».
- #14 **-с**: ᠰᠤ/ᠰᠦ su/sü «-су/-сү», ᠰᠤᠨ/ᠰᠦᠨ sun/sün «-сун/-сүн». · #15 **-сга² / -сага²**: ᠰᠬᠠ/ᠰᠭᠡ sqa/sγe «-сх-а/-схэ». (#7–15 share one note: whatever the final, by harmony.)
- #16 **-хай³**: ᠬᠠᠢ/ᠭᠡᠢ qai/γei «-хай/-хэй»; contraction after -ра/-рэ, see G10. · #17 **-хуй²** (originally an inflection of the written language): ᠬᠤᠢ/ᠭᠦᠢ qui/γüi «-хуй/-хүй». · #18 **-хуун²**: ᠬᠤᠨ/ᠭᠦᠨ qun/γün «-хун/-хүн».
- #19 **-ц**: ᠴᠠ/ᠴᠡ ča/če «-ца/-цэ». · #20 **-цаа⁴** (compound -ца + -га): ᠴᠠᠭᠠ/ᠴᠡᠭᠡ čaγa/čeγe «-цаг-а/-цэгэ» [any]. · #21 **-цаг⁴**: ᠴᠠᠭ/ᠴᠡᠭ čaγ/čeγ «-цаг/-цэг». · #22 **-даг⁴**: ᠳᠠᠭ/ᠳ⟨FVS1⟩ᠡᠭ daγ/d1eγ «даг/дэг».
- #23 **-мшиг**: ᠮᠰᠢᠭ msiγ «-мшиг». · #24 **-н** (written ng): ᠩ ng «-нг». · #25 **-нгар⁵**: ᠩᠭᠠᠷ/ᠩᠭᠡᠷ ngγar/ngγer «-нггар/-нггэр», ᠩᠭᠢᠷ ngγir «-нггир».
- #26 **-ндаг⁴ / -нтаг⁴**: ᠨᠳᠠᠭ/ᠨᠳᠡᠭ ndaγ/ndeγ «-ндаг/-ндэг», ᠨᠲᠠᠭ/ᠨᠲᠡᠭ ntaγ/nteγ «-нтаг/-нтэг». · #27 **-нхай⁴**: ᠩᠬᠠᠢ/ᠩᠭᠡᠢ ngqai/ngγei «-нгхай/-нгхэй».
- #28 **-уурь / -(г)үүр**: ᠭᠤᠷᠢ/ᠭᠦᠷᠢ γuri/γüri «-гури/-гүри». · #29 **-ууль / -үүл**: ᠭᠤᠯᠢ/ᠭᠦᠯᠢ γuli/γüli «-гули/-гүли».
- #30 **-уур²**: ᠭᠤᠷ/ᠭᠦᠷ γur/γür «-гур/-гүр» on stems **without** an r; **-уул²**: ᠭᠤᠯ/ᠭᠦᠯ γul/γül «-гул/-гүл» on stems **with** an r (r-dissimilation; ᠭᠢᠨᠠᠭᠤᠷ (γinaγur) vs ᠰᠠᠷᠠᠭᠤᠯ (saraγul)).
- #31 **-вч**: ᠪᠴᠢ bči «-бчи», direct on vowel-final words. · #32 **-мт**: ᠮᠲᠠ/ᠮᠲᠡ mta/mte «-мта/-мтэ». · #33 **-уун²**: ᠭᠤᠨ/ᠭᠦᠨ γun/γün «-гун/-гүн».
- #34 **-аа⁴**: ᠭᠠ/ᠭᠡ γa/γe «-г-а/-гэ» after a vowel other than i; ᠶᠠ ya «-й-а» (and its feminine) after i.
- #35 **-аал²**: ᠭᠠᠯ/ᠭᠡᠯ γal/γel «-гал/-гэл» [+u]. · #36 **-аан⁴**: ᠭᠠᠨ/ᠭᠡᠨ γan/γen «-ган/-гэн» after consonants and vowels other than i; ᠶᠠᠨ/ᠶᠡᠨ yan/yen «-йан/-йэн» after i.
- #37 **-аар⁴**: ᠭᠠᠷ/ᠭᠡᠷ γar/γer «-гар/-гэр», direct on vowel-final stems. · #38 **-аар⁴ / -аарь**: ᠭᠠᠷᠢ/ᠭᠡᠷᠢ γari/γeri «-гари/-гэри» after a vowel other than i; ᠶᠠᠷᠢ yari «-йэри», ᠶᠡᠷᠢ yeri «-йари» after i (script and «…» look swapped between these two rows).
- #39 **-аас⁴**: ᠭᠠᠰᠤ/ᠭᠡᠰᠦ γasu/γesü «-гасу/-гэсү» [+u]. · #40 **-аахай⁶**: ᠭᠠᠬᠠᠢ/ᠭᠡᠭᠡᠢ γaqai/γeγei «-гахай/-гэхэй», ᠭᠤᠬᠠᠢ/ᠭᠦᠭᠡᠢ γuqai/γüγei «-гухай/-гүхэй» after a vowel other than i; ᠶᠠᠬᠠᠢ/ᠶᠡᠬᠡᠢ yaqai/yeqei «-йахай/-йэхэй» after i.
- #41 **-в**: ᠪ b «-б». · #42 **-г**: ᠭ γ «-г». · #43 **-й**: ᠢ i «й». · #44 **-л**: ᠯ l «-л». · #45 (printed "44" twice) **-лга⁴**: ᠯᠭᠠ/ᠯᠭᠡ lγa/lγe «-лг-а/-лгэ» [+u].
- #46 **-лт**: ᠯᠲᠠ/ᠯᠲᠡ lta/lte «-лта/-лтэ». · #47 **-м**: ᠮ m «-м». · #48 **-м** (with detached vowel): ᠮᠠ/ᠮᠡ ma/me «-м-а/-м-э».
- #49 **-мал⁴**: ᠮᠠᠯ/ᠮᠡᠯ mal/mel «-мал/-мэл». · #50 **-мж**: ᠮᠵᠢ mǰi «-мжи». · #51 **-мсар²**: ᠮᠰᠠᠷ/ᠮᠰᠠᠷ msar/msar «-мсар/-мсэр». · #52 **-нга⁵**: ᠩᠭᠢ ngγi «-нгги», ᠩᠭᠤ/ᠩᠭᠦ ngγu/ngγü «-нггу/-нггү». · #53 **-нгуй²**: ᠩᠭᠤᠢ/ᠩᠭᠦᠢ ngγui/ngγüi «-нггуй/-нггүй».
- (#52–53 are printed twice) **-р**: ᠷ r «-р». · **-уу²**: ᠭᠤ/ᠭᠦᠦ γu/γüü «-гу/-гүү». · #54 **-ш**: ᠰᠢ si «-ши». · #55 **-гар²**: ᠬᠠᠷ/ᠭᠡᠷ qar/γer «-хар/-хэр» — examples all follow d or s (ᠳᠡᠪᠢᠰᠭᠡᠷ (debisγer), ᠤᠶᠢᠳᠬᠠᠷ (uyidqar)). · #56 **-маг⁴**: ᠮᠠᠭ/ᠮᠡᠭ maγ/meγ «-маг/-мэг».
- #57 **-мгай²**: ᠮᠠᠭᠠᠢ/ᠮᠡᠭᠡᠢ maγai/meγei «-магай/-мэгэй». · #58 **-мтгай²**: ᠮᠠᠲᠠᠭᠠᠢ/ᠮᠡᠲᠡᠭᠡᠢ mataγai/meteγei «-матагай/-мэтэгэй». · #59 **-мхай³**: ᠮᠠᠬᠠᠢ/ᠮᠡᠭᠡᠢ maqai/meγei «-махай/-мэхэй».

### Noun from inactive roots (App.1 §1.1.3 #1–26)

Table-wide note: whatever the root's final, attach directly by harmony.

- #1 **-гай/-гий/-гой/-гуй/-гүй**: ᠭᠠᠢ/ᠭᠡᠢ γai/γei «-гай/-гэй», ᠬᠠᠢ/ᠭᠡᠢ qai/γei «-хай/-хэй». · #2 **-га⁴ / -гүү**: ᠭᠤ/ᠭᠦᠦ γu/γüü «-гу/-гүү». · #3 **-ган⁴**: ᠭᠠᠨ/ᠭᠡᠨ γan/γen «-ган/-гэн».
- #4 **-гана⁴**: ᠭᠠᠨᠠ/ᠭᠡᠨᠡ γana/γene «-ган-а/-гэн-э» after consonants other than d, s; ᠬᠠᠨᠠ/ᠭᠡᠨᠡ qana/γene «-хан-а/-хэн-э» after d, s (ᠵᠡᠳᠭᠡᠨᠡ (ǰedγene)). · #5 **-гар²**: ᠭᠠᠷ/ᠭᠡᠷ γar/γer «-гар/-гэр».
- #6 **-гир**: ᠭᠢᠷ γir «-гир». · #7 **-жи**: ᠵᠢ ǰi «-жи». · #8 **-жин / -чин**: ᠵᠢᠩ ǰing «-жинг», ᠴᠢᠩ čing «-чинг». · #9 **-л**: ᠯ l «-л». · #10 **-лз**: ᠯᠵᠠ/ᠯᠵᠡ lǰa/lǰe «-лза/-лзэ».
- #11 **-н**: ᠨ n «-н». · #12 **-н** (written ng): ᠩ ng «-нг». · #13 **-на⁴** (locational): ᠨᠠ/ᠨᠡ na/ne «-н-а/-н-э». · #14 **-наг⁴**: ᠨᠠᠭ/ᠨᠡᠭ naγ/neγ «-наг/-нэг», ᠨᠤᠭ/ᠨᠦᠭ nuγ/nüγ «-нуг/-нүг». · #15 **-нь**: ᠨᠢ ni «-ни».
- #16 **-нцаг⁴**: ᠨᠴᠠᠭ/ᠨᠴᠡᠭ nčaγ/nčeγ «-нцаг/-нцэг». · #17 **-р**: ᠷ r «-р». · #18 **-р** (locational): ᠷᠠ/ᠷᠡ ra/re «-р-а/-р-э». · #19 **-р (-руу²)**: ᠷᠤ/ᠷᠦ ru/rü «-ру/-рү».
- #20 **-сар⁴**: ᠰᠠᠷ/ᠰᠡᠷ sar/ser «-сар/-сэр», ᠰᠤᠷ sur «-сур». · #21 **-таг⁴ / -даг**: ᠲᠠᠭ/ᠲᠡᠭ taγ/teγ «-таг/-тэг», ᠳᠠᠭ daγ «-даг», ᠲᠤᠭ tuγ «-туг». · #22 **-уу²**: ᠭᠤ/ᠭᠦᠦ γu/γüü «-гу/-гүү».
- #23 **-уун²**: ᠭᠤᠨ/ᠭᠦᠨ γun/γün «-гун/-гүн». · #24 **-уур²**: ᠭᠤᠷ/ᠭᠦᠷ γur/γür «-гур/-гүр». · #25 **-цаг⁴**: ᠴᠠᠭ/ᠴᠡᠭ čaγ/čeγ «-цаг/-цэг». · #26 **-ш** ᠰᠢ si «-ши», **-гш** ᠭᠰᠢ γsi «гши» (direction: ᠢᠨᠠᠭᠰᠢ (inaγsi), ᠳᠡᠭᠡᠭᠰᠢ (deγeγsi)).

### Verb from noun (App.1 §1.2.1 #1–19)

- #1 **-д** (excess of a quality) and #2 **-д** (to wield/use): ᠳᠠ/ᠳᠡ da/de «-да/-дэ» [any]. · #3 **-лд**: ᠯᠳᠠ/ᠯᠳᠡ lda/lde «-лда/-лдэ», mostly after words ending in a long vowel or diphthong.
- #4 **-ли**: ᠯᠢ li «-ли». · #5 **-р**: ᠷᠠ/ᠷᠡ ra/re «-ра/-рэ». · #6 **-т**: ᠲᠤ/ᠲᠦ tu/tü «-ту/-тү» [any]. · #7 **-чил**: ᠴᠢᠯᠠ/ᠴᠢᠯᠡ čila/čile «-чила/-чилэ». · #8 **-шаа⁴**: ᠰᠢᠶᠠ/ᠰᠢᠶᠡ siya/siye «-шийа/-шийэ».
- #9 **-д**: ᠳ d «-д» and #10 **-ж**: ᠵᠢ ǰi «-жи» — on some n-final words the n is usually dropped. · #11 **-жир**: ᠵᠢᠷᠠ/ᠵᠢᠷᠡ ǰira/ǰire «-жира/-жирэ». · #12 **-л**: ᠯᠠ/ᠯᠡ la/le «-ла/-лэ».
- #13 **-с**: ᠰ s «-с». · #14 **-ц**: ᠴᠠ/ᠴᠡ ča/če «-ца/-цэ». · #15 **-рх**: ᠷᠬᠠ/ᠷᠭᠡ rqa/rγe «-рх-а/-рхэ», and **-лх** ᠯᠬᠠ/ᠯᠭᠡ lqa/lγe «-лх-а/-лхэ» as its variant after a word ending in the syllable ра/рэ; [−n]; direct on vowel-final words, linking a/e after a consonant.
- #16 **-с** (to receive): ᠰ s «-с» [−r]. · #17 **-с** (to crave): ᠰᠠ/ᠰᠡ sa/se «-са/-сэ». · #18 **-ш**: ᠰᠢ si «-ши»; on some n-final words n → m (ᠦᠨᠡᠮᠰᠢ (ünemsi)). · #19 **-шир**: ᠰᠢᠷᠠ/ᠰᠢᠷᠡ sira/sire «-шира/-ширэ».

### Verb from verb (App.1 §1.2.2 #1–29)

Voice suffixes (хэвийн дагавар):
- **Causative** — #1 **-аа⁴**: ᠭᠡ γe «-гэ» (masc. as in #2) on roots/stems ending in a short vowel. · #2 **-га⁴**: ᠭᠠ/ᠭᠡ γa/γe «-г-а/-гэ» after consonants other than d, s. · #3 **-ха⁴**: ᠬᠠ/ᠭᠡ qa/γe «-х-а/-хэ» after d, s. · #4 **-лга⁴**: ᠯᠭᠠ/ᠯᠭᠡ lγa/lγe «-лг-а/-лгэ» on stems that end in a long vowel or diphthong in the modern language. · #5 **-уул²**: ᠭᠤᠯ/ᠭᠦ⟨FVS1⟩ᠯ γul/γü1l «-гул/-гүл» [+u] (the feminine carries an FVS1 in the text layer).
- **Passive** — #6 **-гд**: ᠭᠳᠠ/ᠭᠳᠡ γda/γde «-гда/-гдэ» [+u]. · #7 **-д / -т**: «-да/-дэ» directly after soft finals, «-та/-тэ» directly after hard finals (all four cells are one asterisked code-point string in the text layer, ᠳᠡ de «-дэ»; not usable).
- **Reciprocal** — #8 **-лд**: ᠯᠳᠤ/ᠯᠳᠦ ldu/ldü «-лду/-лдү». **Cooperative** — #9 **-лц**: ᠯᠴᠠ/ᠯᠴᠡ lča/lče «-лца/-лцэ». Both [+u].

Aspect suffixes (байдлын дагавар):
- #10 **-цгаа⁴** (plural action): ᠴᠠᠭᠠ/ᠴᠡᠭᠡ čaγa/čeγe «-цаг-а/-цэгэ» after hard finals; ᠵᠠᠭᠠ/ᠵᠡᠭᠡ ǰaγa/ǰeγe «-заг-а/-зэгэ» after soft finals and vowels.
- #11 **-чих** (completive): ᠴᠢᠬᠠ/ᠴᠢᠭᠡ čiqa/čiγe «-чих-а/-чихэ» [any]; **-аатах⁴**: ᠭᠠᠳᠬᠠ/ᠭᠡᠳᠭᠡ γadqa/γedγe «-гадх-а/-гэдхэ» [+u]. · #12 **-зана⁴** (briefly): ᠵᠠᠨᠠ/ᠵᠡᠨᠡ ǰana/ǰene «-зана/-зэнэ» [any]. · #13 **-схий** (abruptly): ᠰᠭᠢ sγi «-схи» [+u].

Other (#14–29):
- #14 **-валз⁴**: ᠪᠠᠯᠵᠠ/ᠪᠡᠯᠵᠡ balǰa/belǰe «-балза/-бэлзэ». · #15 **-вхий**: ᠪᠭᠢ bγi «-бхи». · #16 **-галз⁴**: ᠭᠠᠯᠵᠠ/ᠭᠡᠯᠵᠡ γalǰa/γelǰe «-галза/-гэлзэ». · #17 **-гана⁴**: ᠭᠠᠨᠠ/ᠭᠡᠨᠡ γana/γene «-гана/-гэнэ», direct on vowel-final stems.
- #18 **-гна²**: ᠩᠨᠠ/ᠩᠨᠡ ngna/ngne «-нгна/-нгнэ». · #19 **-ий / -й**: ᠢ i «-й». · #20 **-лз**: ᠯᠵᠠ/ᠯᠵᠡ lǰa/lǰe «-лза/-лзэ». · #21 **-на⁴**: ᠨᠢ ni «-ни» (one form).
- #22 **-л**: ᠯᠠ/ᠯᠡ la/le «-ла/-лэ» [any]. · #23 **-р**: ᠷᠠ/ᠷᠡ ra/re «-ра/-рэ». · #24 **-рх**: ᠷᠬᠠ/ᠷᠭᠡ rqa/rγe «-рх-а/-рхэ». · #25 **-хийл**: ᠭᠢᠯᠠ/ᠭᠢᠯᠠ γila/γila «-хила/-хилэ».
- #26 **-ц**: ᠴᠠ/ᠴᠡ ča/če «-ца/-цэ». · #27 **-ч**: ᠴᠢ či «-чи». · #28 **-ш**: ᠰᠢ si «-ши». · #29 **-лхийл**: ᠯᠭᠢᠯᠠ/ᠯᠭᠢᠯᠠ lγila/lγila «- лхила/-лхилэ» [+u].

### Verb from inactive roots (App.1 §1.2.3 #1–16)

Table-wide note: attach directly, by harmony.

- #1 **-(а)й³**: ᠢ i «-й». · #2 **-гана⁴**: ᠭᠠᠨᠠ/ᠭᠡᠨᠡ γana/γene «-гана/-гэнэ». · #3 **-гина / -гэнэ**: ᠭᠢᠨᠠ/ᠭᠢᠨᠡ γina/γine «-гина/-гинэ». · #4 **-ги / -гэ / -гь**: ᠭᠢ γi «-ги».
- #5 **-жигна³ / -чигна³**: ᠵᠢᠭᠢᠨᠠ/ᠵᠢᠭᠢᠨᠡ ǰiγina/ǰiγine «жигина/жигинэ», ᠴᠢᠭᠢᠨᠠ/ᠴᠢᠭᠢᠨᠡ čiγina/čiγine «-чигина/-чигинэ». · #6 **-л**: ᠯ l «-л». · #7 **-л** (onomatopoeic): ᠯᠠ/ᠯᠠ la/la «-ла/-лэ». · #8 **-лз**: ᠯᠵᠠ/ᠯᠵᠡ lǰa/lǰe «-лза/-лзэ».
- #9, #10 **-р**: ᠷᠠ/ᠷᠡ ra/re «-ра/-рэ». · #11 **-схий**: ᠰᠭᠢ sγi «-схи». · #12 **-тна²**: ᠲᠤᠨᠠ/ᠲᠦᠨᠡ tuna/tüne «-туна/-түнэ». · #13 **-хий**: ᠭᠢ γi «-хи». · #14 **-хир**: ᠭᠢᠷᠠ/ᠭᠢᠷᠡ γira/γire «-хира/-хирэ». · #15 **-ч**: ᠴᠢ či «-чи». · #16 **-ш**: ᠰᠢ si «-ши».

### Conflicts and additions versus the rest of this knowledge base

1. **Plural conditioning — resolved 2026-10-11:** the repository owner ruled for the source, and `suffixes.md` and the registry now have nuγud/nügüd after n. As it stood: Ours: ud/üd after consonants, nuγud/nügüd after vowels. Source #1: nuγud/nügüd after **n and vowels**; ud/üd after consonants **other than n** (ᠰᠣᠨᠢᠨ (sonin) + ᠨᠤᠭᠤᠳ (nuγud)). Our "Use after" cells need the n moved.
2. **Ordinal -дугаар² is shown attached** to the numeral word in every example (ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ (γurbaduγar), ᠨᠢᠭᠡᠳᠦᠭᠡᠷ (niγedüγer)); suffixes.md lists duγar/düger only as a connector-joined row. Not necessarily a contradiction (ours may describe the form after digits, which this appendix does not show) — needs a ruling. The contracted ᠭᠤᠲᠤᠭᠠᠷ (γutuγar) / ᠳᠥᠲᠦᠭᠡᠷ (dötüγer) are not in our docs.
3. **-дахь/-дэх as an ordinal is attached** (ᠨᠠᠶᠮᠠᠳᠠᠬᠢ (naymadaqi)); suffixes.md has daqi/deqi only as a connector-joined "located at". Different function, same letters — a linter must accept the attached numeral form.
4. **Plural suffixes we lack** (all attached, so correctly absent from a connector registry but missing from the plural section): -с ᠰ s «-с», -д ᠳ d «-д», -чууд² ᠴᠣᠳ/ᠴᠤᠳ čod/čud «-чуд/-чүд», -чуул² ᠴᠤᠤᠯ/ᠴᠤᠦᠯ čuul/čuül «-чуул/-чүүл».
5. **нар/нэр agrees** with ours in the examples (both harmony forms), though the source's header prints only the masculine.
6. **qi / qin (suffixes.md "case-bound possession") agrees and extends:** the source writes them following a case suffix, and names **dative-locative** as well as genitive (ᠭᠡᠷ (γer) + ᠲᠦ (tü) + ᠭᠢ (γi)); it also attaches -х(и) directly to non-case stems (ᠳᠠᠷᠠᠭᠠᠭᠢ (daraγaγi)). Ours says only "stacks outside a genitive".
7. **-лаг⁴ → one form lig agrees** with our 2026-07-30 ruling. Same collapse, not in our docs: -раг⁴ → ᠷᠢᠭ riγ «-риг», -нцар⁴ → ᠨᠴᠢᠷ nčir «-нчир», -жаар/-жаал.
8. **Verb morphology gap (suffixes.md "Verb suffixes are NOT in this registry")**: §1.2.2 is a sourced table of the voice and aspect suffixes with their conditioning; all attached. Still no converbs/participles here (those are Appendix 2).
9. **Word-forming suffixes gap**: our table has only -лаг; this appendix supplies roughly 220 rows.
10. **da/de and daγ/deγ ("Registry entries not yet in scope")**: this appendix has -д ᠳᠠ/ᠳᠡ da/de «-да/-дэ» and -даг⁴ ᠳᠠᠭ/ᠲᠡᠭ daγ/teγ «-даг/-дэг» only as **attached** derivational suffixes (ᠮᠥᠩᠭᠡᠳᠡ (möngγede), ᠮᠠᠰᠢᠳᠠ (masida)); it offers no support for a detached daγ/deγ. Whether the connector-joined da/de particle is the same morpheme as #20 is for a reader to say.
11. **Hard-final set agrees**: the hard-final examples under §1.2.2 #10 end in b, γ, r, s, d — the same б г р с д list.

### Could not digest

- **Text-layer code points are not trustworthy for vowels and velars** (see "How to read the forms"); e.g. the header ᠨᠣᠭᠦᠳ noγüd «-нүгүд», and ᠮᠦᠰᠦᠨ müsün «-мусун» vs ᠮᠦᠰᠦᠨ müsün «-мүсүн». Every script form here should be re-derived from the «…» transliteration before it is used as data.
- **Plural #3 vs #4**: the consonant-drop note (n, i, r, l) is printed under -с and the vowel-drop note under -д, but the -д examples (ᠨᠥᠬᠦᠳ (nöqüd), ᠲᠦᠰᠢᠮᠡᠳ (tüsimed)) look like r/l-drop cases. Either the two notes belong to both rows or the cells slipped; needs a human reader with the PDF.
- **Rotated pages** (printed pp. 25–26, 32, 37–40): columns survive but row numbers and notes float. Unassigned notes: p. 37 "after d, s" / "n, l, b finals take linking u/ü" (probably -гар² and one of -мал⁴/-маг⁴); p. 38 "d, r, s finals attach directly" and "other than d, s / d, s" (the second is the -гана⁴ split; the first is unplaced). Function glosses on those pages were not matched to columns, so most are omitted above.
- §1.2.2 #1 masculine cell and §1.1.2 #34 feminine i-cell contain a space inside the suffix (a dropped separator); not spliced. §1.2.2 #7's four cells are identical asterisked strings.
- G4 is stated by the source as "i vs other vowels", yet its own "other vowel" examples for -аач² include i-final stems (ᠪᠢᠴᠢᠭᠡᠴᠢ (bičiγeči), ᠰᠢᠨᠵᠢᠭᠡᠴᠢ (sinǰiγeči)); the split is evidently lexical/historical, so a converter cannot derive it from the Cyrillic stem alone.
- §1.1.2 #38: script and transliteration of the two after-i cells appear swapped; #44 is numbered twice and #52–53 repeat on p. 37 (source typos).
- Example-level oddities that look like typos, not built on: ᠵᠡᠭᠡᠷᠨᠨᠴᠡᠭ (ǰeγernnčeγ) (doubled n), ᠴᠥᠭᠡᠭᠦᠯᠠ (čöγeγüla) (final a in a feminine word), ᠨᠤᠭᠦᠳ (nuγüd) / ᠪᠦᠰᠡᠭᠦᠶᠢᠴᠦᠳ (büseγüyičüd).
- Cyrillic label "-аатах⁴" (§1.2.2 #11) beside the forms «-гадх-а/-гэдхэ»: label reproduced as printed; this digest could not confirm the intended modern form.

## Part 4 — Appendix 2, inflectional endings, cross-checked against the registry

Covers the text layer 2486–2847 (App. 2: §2.1 nominal, §2.2 verbal endings), the rule-form statements in
§2.1.2, §2.1.3, §2.2.1, §2.3, and the closing recommendations (line 713). It includes a
row-by-row cross-check against `references/suffixes.md` / `suffixRows`.
Examples are spliced from the text layer by script: script (Cyrillic gloss where the source prints one,
*mechanical romanization*). **The romanization mirrors the text layer, not the intended spelling.**

### Read this first: what the text layer can and cannot prove

Measured over all of the text layer: **0 × U+180E, 0 × U+202F**, 166 × U+180B, 1120 × U+180A, 579 × U+1806.

- **The text layer is glyph-level, not phonemic** — typed to look right, so same-shaped letters are
  interchanged (the document's own §1.1 item (6) forbids swapping a/e, u/ü, o/ö when typing; its PDF
  does it anyway). Substitutions that touch the endings:
  - header cells reuse one sequence for both genders: "-үн" and "-ун" are both `U+1824 U+1828`, "-бэр"
    and "-бар" both `U+182A U+1820 U+1837`. Example words usually carry the right vowel
    (ᠪᠢᠴᠢᠭ ᠦᠨ (*bičiγ ün*) has `U+1826 U+1828`).
  - y is typed as a second i: the genitive after vowels is `U+1822 U+1822 U+1828` (20 tokens) or
    `U+1836 U+180B U+1822 U+1828` (12), never our bare `U+1836 U+1822 U+1828` (0). Instrumental and
    reflexive are `U+1822 U+1822 …` in Appendix 2 but `U+1822 U+1836 …` (= ours) in §2.2.1.1.
  - masculine ablative is typed `U+1821 U+1834 U+1820` (E-CH-A, 12 tokens).
  - feminine k is typed GA `U+182D` (хүмүүн is `U+182D U+1826 U+182E U+1826 U+1828`).
  - every dative d carries FVS1: `U+1833 U+180B U+1824` (13 tokens); so do the contracted d-forms.
- Detached endings follow a plain space and the separated final a is "space + `U+1820`" (60 tokens).
  None of this is evidence for MVS versus space (brief rule 4).
- **What is evidence for joining:** the rule text of §2.3, and the appendix notation — attached endings
  are printed with a leading `U+1806` (+ `U+180A`), detached ones bare. Every verbal ending in §2.2 has
  the prefix; no nominal ending in §2.1 does.
- A linter fed text extracted from this PDF will meet space + D + FVS1 suffixes and i-i genitives:
  font workarounds, not prescribed spellings.

### Method

`d-work/extract.py` pulled every "script form + parenthesised Cyrillic transliteration" pair from lines
2486–2847: **198 pairs** (75 nominal, 26 of them two-part stacks; 123 verbal). `cmp.py` compared each
with the 78 rows of `suffixes` from `dist/index.js`: raw code points (FVS, nirugu, U+1806 stripped; our
connector ignored), then a skeleton folding a/e, o/u/ö/ü, y/i, q/γ. Of 49 single nominal forms: **30
raw matches** (8 only because a feminine header was typed with masculine letters), **11 skeleton-only**
(all explained above), **8 with no row** (see additions). Data: `d-work/pairs.json`, `ours.json`.

### Nominal endings, row by row (App. 2 §2.1.1 case, §2.1.2 possessive)

Rows 5–17 sit in a rotated table scrambled in both text files; † = a reconstruction by column order.

| # | Ending (source's own transliteration) | Source condition | Our rows | Sequence check |
|---|---|---|---|---|
| 1 | genitive -ун/-үн | consonant finals other than n | `un`, `ün` | raw match; fem in examples |
| 1 | genitive -у/-ү | n-final stems and stems with unstable n | `u`, `ü` | raw match |
| 1 | genitive -йин | vowel finals | `yin` | skeleton only (i-i for y-i) |
| 2 | dative -ду/-дү, -дур/-дүр | vowels and soft finals | `du dü dur dür` | match once FVS1 is stripped |
| 2 | dative -ту/-тү, -тур/-түр | hard finals | `tu tü tur tür` | raw match |
| 2 | dative -а/-э | consonant finals and unstable-n stems | **none** | `U+1820`; see additions |
| 3 | accusative -и | consonant finals, gender ignored | `i` | raw match |
| 3 | accusative -йи | vowel finals, gender ignored | `yi` | header i-i; examples `U+1836 U+1822` = ours |
| 4 | ablative -ача/-эчэ | any final | `acha`, `eche` | fem raw in examples; masc typed E-CH-A |
| 5 | instrumental -бар/-бэр | vowel finals † | `bar`, `ber` | raw match |
| 5 | instrumental -ийар/-ийэр | consonant finals † | `iyar`, `iyer` | skeleton only (i-i); §2.2.1.1 raw |
| 6 | comitative -тай/-тэй | any final, by harmony † | `tai`, `tei` | raw match |
| 7 | comitative -луг-а/-лүгэ (-лугаа²) | any final, by harmony † | `luγ-a`, `lüge` | raw match (no separator in the text layer) |
| 8 | directive уругу (-руу², -луу²) | any final, **gender ignored** † | `uruγu` (space) | raw match |
| 9 | reflexive -бан/-бэн | vowel finals † | `ban`, `ben` | raw match |
| 9 | reflexive -ийан/-ийэн | consonant finals † | `iyan`, `iyen` | skeleton only (i-i); §2.2.1.1 raw |
| 10 | 1st person мини, мани (минь, маань) | any final † | `mini`; **no `mani`** | `mini` raw |
| 10 | 2nd person чини, тани (чинь, тань) | any final † | `chini`; **no `tani`** | `chini` raw |
| 11 | 3rd person ану / инү; ни* | ану/инү by harmony, ни regardless of gender † | `ni`; **no `anu`, `inu`** | `ni` raw |

Examples: ᠤᠰᠤᠨ ᠤ (*usun u*), ᠲᠩᠷᠢ ᠢᠢᠨ (*tngri iin*); ᠰᠠᠩ ᠳ⟨FVS1⟩ᠤ (*sang d1u*), ᠨᠤᠲᠤᠭ ᠲᠤᠷ (*nutuγ tur*); ᠠᠵᠢᠯ ᠡᠴᠠ (*aǰil eča*), ᠮᠡᠷᠭᠡᠳ ᠡᠴᠡ (*merγed eče*);
ᠠᠵᠢᠯ ᠢᠢᠠᠷ (*aǰil iiar*) beside ᠦᠨᠡᠨ ᠢᠶᠡᠷ (үнэнээр, *ünen iyer*); ᠭᠠᠵᠠᠷ ᠯᠤᠭᠠ (*γaǰar luγa*), ᠭᠡᠷ ᠤᠷᠤᠭᠤ (*γer uruγu*), ᠭᠠᠵᠠᠷ ᠤᠷᠤᠭᠤ (*γaǰar uruγu*);
ᠠᠬᠠ ᠮᠠᠨᠢ (*aqa mani*), ᠨᠠᠢᠵᠠ ᠠᠨᠤ (*naiǰa anu*), ᠦᠢᠯᠡ ᠢᠨᠤ (*üile inu*), ᠰᠡᠳᠭᠢᠯ ᠨᠢ (*sedγil ni*).

- **Every condition we already state agrees**: the genitive three-way split, accusative, the d/t
  dative split, ablative, instrumental, comitative, reflexive.
- **Hard and soft finals are the same sets as ours**: §2.1.2.1 hard = b, γ/g, r, s, d; §2.1.2.2 soft =
  m, n, l, ng; §2.1.3 vowel-final stems behave like soft-final ones. ᠠᠷᠠᠳ ᠲᠤ (ардад, *arad tu*),
  ᠰᠠᠩ ᠳ⟨FVS1⟩ᠤ (санд, *sang d1u*).
- **§2.2.1.1 states the allomorph rule generically**: of a vowel-initial and a consonant-initial
  variant, vowel-final stems take the consonant-initial one and vice versa (ᠠᠯᠤᠰ ᠤᠨ (алсын, *alus un*),
  ᠣᠢ ᠢᠢᠨ (ойн, *oi iin*), ᠣᠢ ᠪᠠᠷ (ойгоор, *oi bar*), ᠦᠨᠡᠨ ᠢᠶᠡᠨ (үнэнээ, *ünen iyen*)).
- **The directive is confirmed as one invariant word.** Row 8 has a single form for all four Cyrillic
  surfaces, and a note under §2.1.1 says the negative, the directive and the -аад⁴ directional are
  written apart in their original form (*ügei*, *uruγu*, *ögede*), so stem gender is not consulted.
- Row 2 presents -а/-э as a current dative-locative variant (ᠭᠠᠵᠠᠷᠠ (*γaǰara*)); row 11 stars ни as the
  "modernised form" of ану/инү.

### Double nominal endings and their contractions (App. 2 §2.1.2, rows 12–17)

Each row gives the separated stack (two endings, each written apart) and, where one exists, the
contracted single ending.

| # | Stack (Cyrillic) | Separated | Contracted | Source condition † | Ours |
|---|---|---|---|---|---|
| 12 | genitive + reflexive (-ынхаа², -ийнхээ, -ныхаа², -нийхээ) | -йин-ийан, -ун-ийан, -у-бан (+fem) | none | as the genitive | composition note only — agrees, incl. *ban* after the vowel of *u/ü* |
| 13 | dative + reflexive (-даа⁴, -таа⁴) | -ду-бан, -ту-бан, -дур-ийан, -тур-ийан (+fem) | -даган/-дэгэн, -таган/-тэгэн | d after vowels/soft, t after hard finals | `daγan degen taγan tegen` (after: any) |
| 14 | accusative + reflexive (-гаа⁴, -ыгаа², -ийгээ²) | -йи-бан (vowels), -и-бан (consonants) | -йуган/-йүгэн | contracted: any final, by harmony | `yuγan`, `yügen` (Cyrillic "?") |
| 15 | ablative + reflexive (-аасаа⁴) | -ача-бан/-эчэ-бэн | -ачаган/-эчэгэн | any final, by harmony | `achaγan`, `echegen` |
| 16 | instrumental + reflexive (-аараа⁴) | -бар-ийан (vowels), -ийар-ийан (consonants) | none | as the instrumental | none (composition) |
| 17 | comitative + reflexive (-тайгаа³) | -тай-бан/-тэй-бэн | -тайиган/-тэйигэн | any final, by harmony | `taiγan`, `teigen` |

Examples: ᠭᠣᠣᠯ ᠤᠨ ᠢᠢᠠᠨ (*γool un iian*), ᠮᠣᠳᠤᠨ ᠤ ᠪᠠᠨ (*modun u ban*); ᠨᠠᠷᠠᠨ ᠳ⟨FVS1⟩ᠤ ᠪᠠᠨ (*naran d1u ban*) beside ᠨᠠᠷᠠᠨ ᠳ⟨FVS1⟩ᠠᠭᠠᠨ (*naran d1aγan*); ᠭᠤᠲᠤᠯ ᠢ ᠪᠠᠨ (*γutul i ban*) beside
ᠭᠤᠲᠤᠯ ᠶᠤᠭᠠᠨ (*γutul yuγan*); ᠨᠠᠢᠵᠠ ᠲᠠᠢ ᠪᠠᠨ (*naiǰa tai ban*) beside ᠨᠠᠢᠵᠠ ᠲᠠᠶᠢᠭᠠᠨ (*naiǰa tayiγan*).

- Row 14's condition reads "the modernised form follows any final, by vowel harmony" †, and the examples
  bear it out (after a vowel-final and an l-final stem): the source calls *yuγan/yügen* modernised.
- Sequence check: `daγan degen taγan tegen yuγan echegen` match raw (d-forms once FVS1 is stripped);
  `achaγan` is skeleton-only (E-CH-A); `yügen` occurs both as ours and with `U+1823` for the ü.
- **Row 17 is the one real code-point difference**: the appendix types the contraction with seven
  letters, `U+1832 U+1820 U+1836 U+1822 U+182D U+1820 U+1828` (-тайиган; feminine likewise); ours has
  six, `U+1832 U+1820 U+1822 U+182D U+1820 U+1828` — and recommendation 2 types it our way.

### Written apart or attached (§2.3, plus the appendix notation)

The source has a **two-way** split — *залгаж* (attached, inside the word) versus *дагуулж / саланги*
(written apart, following the stem). It never distinguishes our `mvs` from our `space`.

- §2.3.1 Written apart: all case endings, the possessive/reflexive endings, the plurals -нууд²,
  -ууд² and нар, and the negative *ügei*. Exception: case-inflected personal pronouns are single words
  by convention (ᠨᠠᠳᠤᠷ (надад, *nadur*), ᠨᠠᠮᠠᠶᠢ (намайг, *namayi*)).
- §2.3.2 Attached: the plurals -д, -с, -чууд², -чуул² and **all verbal endings**.
- §2.3.3–4 The belonging suffix -х / -хан⁴ is written apart **only after a genitive**
  (ᠲᠡᠳᠡᠨ ᠤ ᠭᠢ (тэднийх, *teden u γi*), ᠨᠤᠲᠤᠭ ᠤᠨ ᠭᠢᠨ (нутгийнхан, *nutuγ un γin*)); elsewhere it is attached (ᠬᠣᠯᠠᠭᠢ (холхи, *qolaγi*)).
  Any other suffix after a genitive is attached.
- §2.3.5 Modal words that follow a head word are written apart: ᠡᠨᠡ ᠬᠦ (энэхүү, *ene qü*),
  ᠨᠢᠭᠡ ᠯᠡ (нэг л, *niγe le*), ᠪᠠᠰᠠ ᠴᠤ (бас ч, *basa ču*), ᠶᠤᠮ ᠰᠠᠨ (юм сан, *yum san*); also шиг, the question particle, бэ/вэ.
- §2.3.6 **-тай³ is decided by function, not by the writer.** The comitative case ending is written
  apart like any case; the adjective-forming suffix is always attached; so is the modal -тай of
  affirmation/probability (ᠭᠡᠷᠡᠭᠲᠡᠢ (хэрэгтэй, *γereγtei*), ᠶᠣᠰᠤᠲᠠᠢ (ёстой, *yosutai*)).
- §2.3.7 *ügei* is written apart (ᠭᠠᠢ ᠦᠭᠡᠢ (гайгүй, *γai üγei*)), further suffixes attaching to *ügei* itself;
  but lexicalised words keep an attached -güi (ᠡᠵᠡᠭᠦᠢ (эзгүй, *eǰeγüi*), ᠠᠰᠢᠭᠦᠢ (ашгүй, *asiγüi*)), which per a
  note under §2.1.1 ignores harmony.

### Original versus modernised variants (closing recommendations, line 713)

1. Endings come in an **original** set — dative *tur/dur*, 3rd-person *anu/inu*, unwitnessed past
   *-ǰuqui/-čuqui* (and feminine), present *-mui*, recent past *-luγ-a/-lüge* — and a **modernised**
   set — *tu/du*, *ni*, *-ǰai/-čai*, *-n-a*, *-l-a*. Use one set throughout a text: with *tur/dur* go
   *anu/inu* and the long verbal forms; with *tu/du* go *ni* and the short ones.
2. Separated stacks (*tu-ban, du-ban, yi-ban, i-ban, eče-ben*) and contracted forms (*taγan, daγan,
   tegen, degen, yuγan, yügen, ačaγan, ečegen, taiγan, teigen*) should not be mixed in one text either.

Both are advice ("зохино / зохистой"), not rules — a document-level consistency hint for a linter.

### Verbal endings: attachment rule (§2.2.1.2, §2.1.2) and inventory (App. 2 §2.2)

All verbal endings are attached (§2.3.2). How they attach:

- §2.2.1.2.1 Vowel-final stems take the ending directly.
- §2.2.1.2.2 (1)–(2) Seven stem finals are "changeable" — n, b, d, r, s, l, γ/g — and endings beginning
  with y, γ/g, n, ng, m, l, r (plus -ши үгэй, -схий) are "triggers". A trigger on a changeable final
  inserts the linking vowel u/ü: ᠠᠪ (*ab*) → ᠠᠪᠤᠶᠤ (*abuyu*), ᠠᠪᠤᠨ (*abun*).
- (3) γ/g-final stems take the linking syllable γu/gü: ᠥᠭ (*öγ*) → ᠥᠭᠭᠦᠭᠰᠡᠨ (*öγγüγsen*). (4) A b-final stem
  before a b-initial ending also inserts the vowel: ᠠᠪᠤᠪᠠᠯ (*abubal*).
- (5) Endings beginning with b, s, d, ǰ, č, q/k, t, and causative -γa/-ge, attach directly:
  ᠰᠤᠨ (*sun*) → ᠰᠤᠨᠵᠤ (*sunǰu*), ᠰᠤᠨᠲᠠᠯᠠ (*suntala*).
- §2.1.2.4 Stem-final n becomes ng before γ/g, q/k or n: ᠰᠤᠩᠬᠤ (*sungqu*), ᠰᠤᠩᠭᠠ (*sungγa*).
- §2.1.2.1–3 The č-initial variants (converb, unwitnessed past) follow hard finals, the ǰ-initial ones
  vowels and soft finals; after d or s a following velar is the voiceless one.

Inventory in the source's own transliteration (masculine/feminine; modern Cyrillic in brackets).
Function labels come from the rotated tables; † where the column assignment is mine.

- **§2.2.1 Attributive (үйлийн тодотгон холбох), 1–15.** 1 -гсан/-гсэн [-сан⁴] past · 2 -гчи [-гч]
  agent · 3 -мар/-мэр [-маар⁴] · 4 -гушитай/-гүшитэй [-ууштай²] · 5 -ши үгэй [-шгүй] · 6 -лтай/-лтэй
  [-лтай³] · 7 -г-а/-гэ [-аа⁴] ongoing · 8 -г-а үгэй/-гэ үгэй, also contracted -гадуй/-гэдүй [-аагүй⁴]
  · 9 -даг/-дэг [-даг⁴] habitual · 10 -ху/-хү [-х] future · 11 -хуй/-хүй [-хуй²] · 12 -хун/-хүн
  [-хуун²] · 13 -хуйица/-хүйицэ [-хуйц²] · 14 -хуй-а/-хүй-э [-хуйяа²] · 15 -хун-а/-хүн-э [-хнаа⁴].
  ᠪᠡᠯᠡᠳᠦᠭᠰᠡᠨ (*beledüγsen*), ᠬᠠᠷᠠᠳᠠᠭ (*qaradaγ*), ᠢᠷᠡᠭᠡ ᠦᠭᠡᠢ (*ireγe üγei*), ᠵᠣᠪᠠᠭᠠᠳᠤᠢ (*ǰobaγadui*).
- **§2.2.2 Converbal (нөхцөлдүүлэн холбох), 16–32.** 16 -жу/-жү, -чу/-чү [-ж, -ч] coordinating ·
  17 -тал-а/-тэл-э [-тал⁴] terminative · 18 -хулар/-хүлэр [-хлаар⁴] · 19 -хул-а/-хүл-э [-хул²],
  20 -бал/-бэл [-бал⁴, -вал⁴], 21 -басу/-бэсү [-ваас⁴] conditional · 22 -бачу/-бэчү [-вч] concessive †
  · 23 -н [-н] · 24 -нгг-а/-нггэ [-нгаа⁴] · 25 -нггута/-нггүтэ [-нгуут²] · 26 -гад/-гэд [-аад⁴]
  perfective † · 27 -гсагар/-гсэгэр [-саар⁴] · 28 -л үгэй [-лгүй] negative · 29 -магца/-мэгцэ [-магц⁴]
  · 30 -мажин/-мэжин [-маажин⁴] · 31 -р-а/-р-э [-хаар⁴] purposive, literary · 32 -рун/-рүн [-руун²]
  quotative, literary. ᠠᠷᠢᠭᠤᠰᠴᠤ (*ariγusču*), ᠨᠡᠭᠡᠭᠡᠳ (*neγeγed*), ᠨᠣᠷᠤᠯ ᠦᠭᠡᠢ (*norul üγei*).
- **§2.2.3 Tense-finite (цагаар төгсгөх), 33–46.** 33–38 unwitnessed past [-ж, -чээ, -жээ]:
  -жухуй/-жүхүй, -жэй, colloquial contracted -жи; after hard finals -чухуй/-чүхүй, -чэй, -чи ·
  39–40 witnessed past [-бай³, -вай³, -в]: -ба/-бэ, -бай/-бэй (b-final stems insert u/ü) · 41–42
  recent witnessed past [-лаа⁴]: -луг-а/-лүгэ, -л-а/-л-э · 43–46 present-future [-на⁴, -нам⁴, -юу²,
  -муй², -муу²]: -н-а/-н-э, -нам/-нэм, -йу/-йү, -муй/-мүй, -му/-мү. ᠠᠷᠢᠭᠤᠰᠴᠤᠬᠤᠢ (*ariγusčuqui*), ᠠᠷᠢᠭᠤᠰᠴᠡᠢ (*ariγusčei*),
  ᠶᠠᠷᠢᠯᠤᠭᠠ (*yariluγa*), ᠶᠠᠷᠢᠯᠠ (*yarila*).
- **§2.2.4 Person-finite (биеэр төгсгөх), 47–61.** 47 -й-а/-й-э [-я, -е, -ё] 1st-person voluntative ·
  48 -мза/-мзэ [-мз], footnoted as a contraction of -муй за · 49 -су/-сү [-су²] · 50 -сугай/-сүгэй
  [-сугай²] · 51 -гарай/-гэрэй [-аарай⁴] · 52 -гачи/-гэчи [-аач⁴] · 53 -гтун/-гтүн [-гтун²] ·
  54 -гдахуй/-гдэхүй [-гдахуй²] · 55–56 -дхуй/-дхүй, -дхун/-дхүн [-дхуй², -дхуун²], 54–56 footnoted as
  literary and close in meaning to 53 · 57 -гузай/-гүзэй [-уузай²] · 58 -гужин/-гүжин [-уужин²] ·
  59 -г [-г] 3rd-person permissive · 60 -гасай/-гэсэй [-аасай⁴] optative · 61 -тугай/-түгэй [-тугай²]
  benedictive. ᠵᠠᠰᠠᠶᠠ (*ǰasaya*), ᠭᠤᠶᠤᠭᠠᠷᠠᠢ (*γuyuγarai*), ᠵᠠᠭᠢᠷᠲᠤᠭᠠᠢ (*ǰaγirtuγai*).

Code points for all 123 forms are in `pairs.json`; header-cell vowels and velars are unreliable, so
the Cyrillic transliterations above are the dependable part.

### Conflicts and additions versus the rest of this knowledge base

(a) Endings the source lists that suffixes.md lacks:
1. **мани (маань)**, 1st-person plural possessive: `U+182E U+1820 U+1828 U+1822`, ᠠᠬᠠ ᠮᠠᠨᠢ (*aqa mani*).
2. **тани (тань)**, 2nd-person polite possessive: `U+1832 U+1820 U+1828 U+1822`, ᠠᠬᠠ ᠲᠠᠨᠢ (*aqa tani*).
3. **ану / инү**, the original 3rd-person possessives: `U+1820 U+1828 U+1824`, and
   `U+1822 U+1828 U+1826` (header) / `U+1822 U+1828 U+1824` (examples). Distributed by harmony †.
4. **Dative-locative -а/-э**, `U+1820` / `U+1821`, after consonant finals and unstable-n stems.
   orthography.md knows it (Poppe §104) as archaic; suffixes.md has no row; the source gives no
   "archaic" label.
5. **ögede (өөд, -аад⁴)**: written apart, invariant, named beside *ügei* and *uruγu* (the text layer line
   331, another agent's range — script not extracted here). Candidate space-joined row.
6. **Sentence particles written apart** in the examples: шүү (ᠭᠡᠯᠡᠵᠢ ᠰᠢᠦ (*γeleǰi siü*)) and дээ (ᠪᠣᠯᠵᠢ ᠳ⟨FVS1⟩ᠡ (*bolǰi d1e*)).
   The latter bears on our `da`/`de` rows, glossed "archaic dative, medium confidence".
7. **The verbal inventory** (61 numbered endings); ours has none. It confirms -сан⁴ = -гсан/-гсэн and
   supplies **-аад⁴ = -гад/-гэд**, which suffixes.md says no dictionary data could establish.
8. Cyrillic for rows we gloss "?": `yuγan`/`yügen` = -гаа⁴, -ыгаа², -ийгээ². `nügen` is not in the source.

(b) Endings we list that the source spells differently:
9. **`taiγan`/`teigen`**: seven letters with Y+I in appendix row 17, our six in recommendation 2.
   Unresolved inside the source.
10. **`qi`/`qin`**: ours `U+182C U+1822` (+ `U+1828`); the source consistently types `U+182D U+1822`
    (+ `U+1828`), §2.3.3 and about a dozen tokens. Probably the GA-for-feminine-k habit; confirm.
11. All other differences (i-i for y-i, E-CH-A, FVS1 after d, shared-gender headers) this digest judges text-layer
    artifacts: no ending is spelled with letters of a *different shape* from ours.

(c) Attachment conditions that differ:
12. `daγan degen taγan tegen` are `after: 'any'` in `suffixRows`; the source (and our own prose) puts
    d-forms after vowel/soft finals and t-forms after hard finals.
13. `qi`/`qin` are `after: 'any'`; per §2.3.3 the detached form occurs only after a genitive.
14. `luγ-a`/`lüge` are "literary" in ours; the source lists an ordinary comitative pair, no register
    note. Nothing else differs.

(d) Attached versus written apart:
15. **`dag`/`deg` are `join: 'mvs'`** (our own note: "verify why detached"). The source's -даг⁴ is a
    verbal ending, printed with the attached prefix and covered by §2.3.2 (ᠬᠠᠷᠠᠳᠠᠭ (*qaradaγ*), ᠭᠠᠷᠳᠠᠭ (*γardaγ*)).
16. **Comitative -тай**: ours says attached or detached is the writer's choice; §2.3.6 says case
    ending apart, derivational/modal suffix attached. A linter must still accept both; only the
    stated reason changes.
17. **-гүй**: ours says bichig never makes the contraction; the source lists lexicalised attached
    exceptions (эзгүй, ашгүй, бүсгүй, "and the like") and a contracted verbal -гадуй/-гэдүй.
18. Homographs: `luγ-a`/`lüge`, `la`/`le`, `chu`/`chü` are detached in ours and are also **attached
    verbal endings** in the source (recent past, its short form, the č-converb).
19. Outside this part: Appendix 1 (lines 798–817) lists ordinal -дугаар² and -дахь/-дэх as *attached*
    suffixes on number words, while §3.1.6 writes the ordinal apart after digits. Our `duγar`/`düger`,
    `daqi`/`deqi` are `mvs`.
20. `yümsen`: the source writes юм сан as two words (ᠶᠤᠮ ᠰᠠᠨ (*yum san*)), matching our `san` row.

(e) Variants: suffixes.md calls the short dative forms "equally standard" — compatible, but it lacks
the non-mixing advice and the pairings in recommendation 1. orthography.md already cites recommendation 2.

Count: 20 numbered items — 8 additions, 2 open spellings, 3 conditions, 6 joining — plus (e).

### Could not digest

- **Rotated tables.** Rows 5–17 of §2.1 and all of §2.2 are landscape pages; in the text layer the condition sentences are detached from their columns. Everything marked † is
  assigned by column order and by the examples; rows 10, 11, 14 and the verbal labels need a reader.
- **Person of 49–50** (-су, -сугай): the "II person" label spans 49–58 in the text layer; standard
  grammar has these two first-person. Also -су carries a footnote star whose note did not survive
  (the one surviving single-star note appears to belong to -мза).
- **Recommendation 1, line 718** has `U+1832 U+1820 U+1822` (the comitative) between *ni* and the short
  verbal forms, where the parallel list on line 715 has nothing. Stray token or typo; left out.
- **-луг-а.** The transliteration marks a separated a; the appendix types `U+182F U+1824 U+182D U+1820`
  unbroken, the recommendations put a space before the a. Separation confirmed, encoding not. The
  dative -а/-э examples are likewise typed fused to the stem.
