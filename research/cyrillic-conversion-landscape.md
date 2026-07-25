<!--
Converted to Markdown 2026-07-26 from converter-research.html, which was
generated 2026-07-25/26 and had been living in gege-linter's gitignored
.tmp/ — unversioned, while being cited by committed files. The HTML original
is not authoritative; this file is.
-->

# Cyrillic → Mongol bichig: what already exists, and what you'd have to build

Generated 2026-07-25 · 40 sources · 6 parallel research angles · Framed for a zero-dependency TypeScript library

## Verdict

1. **Build it.** No existing tool can be adopted. The market leader's converter *explicitly excludes Unicode as an output target*[15]; the open-source ones emit PUA by design[28], are unlicensed, or are undocumented LLM wrappers.

2. **A usable lexicon exists, and it's newer than you'd expect.** CoPiT (July 2026) released **14,125 Cyrillic↔traditional word pairs under CC BY 4.0**[5] — permissive, MIT-compatible. Wiktionary via kaikki adds ~2,900 hand-curated lemmas[6]. That's a real starting corpus, not zero.

3. **Your rules-first instinct matches published practice.** The group with the most experience patented a three-stage hybrid — lexicon+rules first, statistical model only for OOV, n-gram LM only for one-to-many — and *kept that design through the Transformer era*[10].

4. **The linter isn't a side project — it's the prerequisite.** In a professionally edited Inner Mongolia Daily front page, 45.25% of words were *visually correct but encoding-wrong*[4]. Every corpus you'd train on is contaminated this way.

5. **Nobody has adopted the Unicode 16.0 MVS model.** Not one keyboard, IME, or converter. W3C's own published layout spec still says NNBSP[2]. You would be first.

## The number that reframes the project

**45.25%** of words on a professionally edited Inner Mongolia Daily front page had the correct *glyph shape* but the wrong *encoding*. 182 of 411 words.[4]

From Bai & Husel, CCL 2020 — the most rigorous study of this problem. Same paper: the single word *ündüsüten* has **86,400 theoretically valid spellings**, of which **273 are attested** in a 62.7M-token news corpus.[4] Their taxonomy of causes maps almost one-to-one onto gege-linter's existing rules, including explicit call-outs of NNBSP misuse and unbounded FVS stacking.

The independent corroboration is blunter. The author of the main open-source neural converter warns:

"If you try this network on the Mongolian script texts found on internet, it will fail! Because the majority of the Mongolian script texts are misspelled."[13]

And a peer-reviewed 2025 article calls Mongolian *"one of the few living language scripts that is digitally unsearchable."*[19]

**Implication:** encoding normalization is a load-bearing pipeline stage that must run *before* conversion, on both training data and input. You already built it. That ordering is the project's actual moat.

## Can any existing tool be trusted?

| Tool | Output encoding | License | Verdict |
|---|---|---|---|
| **Tungaamal** / Bolorsoft (mngl.net) | Unresolved. State media says "satisfies Unicode halfway"[16]; install guide requires proprietary fonts from mngl.net and never mentions encoding[17] | Proprietary | NOT USABLE |
| **Menksoft** (Inner Mongolia) | PUA `U+E234–U+E71D` + GB 18030[14] | Proprietary | NOT USABLE |
| **suragch/mongol_code** | PUA — converting *to* Menksoft is its stated purpose[28] | CC0 | WRONG GOAL |
| **trans.mglip.com** (Inner Mongolia Univ.) | Unverified — expired TLS cert[39] | Service only | BASELINE ONLY |
| **tugstugi/bichig2cyrillic** | Real Unicode[13] | None stated | UNLICENSED |
| **bichig.xyz** | Real Unicode; claims hand-verified dictionary + rule fallback[32] | Unknown | CLOSEST RIVAL |
| LingoJam / yeschat / grado.mn etc. | Unicode, method undocumented | — | LLM WRAPPERS |

**The strongest single finding on this angle:** Menksoft — the dominant vendor — ships *"a standalone version converter which can convert almost every Mongolian script code, except Unicode."*[15] Unicode is deliberately out of scope for the market leader. Any text sourced from the Inner Mongolian ecosystem arrives as PUA.

Note: Tungaamal's actual code points remain unresolved. No primary technical spec was found. Settling it requires a byte-level test — dump the KIMO font's cmap, or run `hb-shape` over text produced by mngl.net's web keyboard. Worth doing; it's a 20-minute experiment that would be genuinely novel published information.

## Data: what you can actually get

### Lexicons — the blocking question

| Resource | Size | License | Verdict |
|---|---|---|---|
| **CoPiT lexical pairs** (2026)[5] | 14,125 word pairs | **CC BY 4.0** | START HERE |
| **Wiktionary via kaikki**[6] | ~2,900 lemmas w/ bichig form | CC BY-SA 4.0 | USABLE |
| **bataak/dict-mn** (Hunspell)[8] | ~75,000 Cyrillic roots | LPPL-1.3c (GPL-incompatible) | CYRILLIC ONLY |
| Bolor-toli | Unknown; bundled in APK | Proprietary | NOT USABLE |
| Lessing dictionary[36] | Ideal content | In copyright | NOT USABLE |
| Tohoku online dictionaries[37] | 39 dictionaries, searchable | No dump/API | LOOKUP ORACLE |
| HuggingFace (55 mn datasets) | — | — | ZERO LEXICONS |
| mongfontbuilder `particles`[27] | 1,432 bytes / 47 entries | MIT | NOT A DICTIONARY |

**Wiktionary's format is better than expected.** English Wiktionary prints the traditional form *and* its Classical romanization on the headword line — `ᠰᠠᠷᠠ (sara) сар (sar)`[7]. That is exactly the arbitrary-residue case rules can't reach (сар ← *sara* keeps its final vowel; ном ← *nom* never had one), encoded per lemma. In kaikki's JSONL it arrives glued into a `forms[]` string — regex the U+1820–1878 run out — while the Classical romanization comes cleanly tagged.[6]

**Realistic picture:** roughly 15–17k free pairs available now against a ~75k-stem target. A published Chinese 80k-word lexicon reached only *85.2% text coverage* — so even 20× more entries leaves a tail. Expect substantial hand-curation, but you are not starting from zero.

### Morphology — you will write the segmenter

| Resource | What it is | License | Verdict |
|---|---|---|---|
| **UniMorph khk**[9] | 14,592 inflected forms *with morpheme segmentations* | CC BY-SA 3.0 | EVAL SET |
| apertium-khk[22] | 441 stems, ~50.6% coverage; good morphotactics | GPL-3.0, dormant 2021 | READ, DON'T COPY |
| giellalt/lang-khk[23] | Active HFST analyser (June 2026) | **LICENSE is an unfilled `__FIXME__`** | ALL RIGHTS RESERVED |
| UD_Mongolian-MTLR[24] | Empty placeholder — zero `.conllu` files | CC BY-SA 4.0 | DOESN'T EXIST |
| Stanza / spaCy / UDPipe[35] | No Mongolian model (no UD data to train on) | — | NOTHING |

Confirmed absence: **no npm or PyPI package, and no permissively licensed tool of any kind, performs Khalkha Cyrillic morphological segmentation.** The realistic build is a hand-authored suffix table (order + harmony allomorphs), validated against UniMorph's 14,592 segmented forms as a test set — facts and orderings, not copied expression. A few hundred lines of TypeScript plus a data file.

### Corpora — no parallel gold standard exists

- **No human-aligned Cyrillic↔traditional corpus is publicly available.** Every alignment found is machine-generated.

- Mongolia's dual-script mandate **is real** — effective 1 Jan 2025 under the Law on the Mongolian Language, Art. 7.2[18]. But **compliance is unproven**: no 2025–26 audit exists, no government portal was found publishing both scripts, and the government's own survey found 46.4% of civil servants not ready[18]. Don't plan around it yet.

- **Raw traditional-script text is abundant and well-licensed:** MC² (~970M, CC0)[25] and CMLI-NLP (~12 GB, 919K rows, CC BY 4.0)[26]. Both Inner Mongolian-dominant — fine for frequency priors, risky as Khalkha ground truth.

- **These corpora are of unknown encoding hygiene** — which makes them an excellent evaluation set for gege-linter itself. Running your Tier-1 rules over MC² would produce a real-world violation frequency distribution. That's a publishable, genuinely novel result nobody has measured.

## Rules vs. neural: the evidence settles it

Three independent findings point the same way:

1. **The canonical architecture is a hybrid, and its authors never abandoned it.** Inner Mongolia University's patent CN103810161B[10] specifies: (1) rule + lexicon conversion using stem/suffix morphology, (2) joint sequence model for OOV only, (3) n-gram LM to pick among one-to-many candidates. The same group published the Transformer paper eight years later[11] and still kept lexicon-first.

2. **Neural work released nothing reusable.** The Transformer paper reports only *relative* WER reduction (5.72% C2T) — not accuracy, no code, no data. The one open neural converter was trained on 80K song-lyric lines machine-labeled by a system whose own error rate is ~18%.[13]

3. **The one genuinely open modern artifact is a lexicon** — CoPiT's 14,125 pairs — which favors the lexicon path. CoPiT also factorizes conversion into three *linguistically motivated* steps (vowel harmony recovery, Latin-assisted normalization, Cyrillic normalization)[5], i.e. a rule-design blueprint rather than an opaque model.

**On the ambiguity you asked about:** the only hard number in the literature is **87.66% correct on the subset of Cyrillic words with multiple traditional correspondences**, achieved with a context n-gram LM[12]. Notably, every paper describes one-to-many as affecting "a large part" of the vocabulary and *none publishes the fraction*. That unknown is the single most important number for your design, and measuring it on your own lexicon would be an original contribution.

Calibration: the best absolute figures found for a deployed system are ~18.4% / 18.8% word error rate (T2C / C2T) — roughly one word in five wrong. Sourced from a Chinese-language summary of IMU work, not verifiable on a primary page; treat as indicative only.

## Unicode: you'd be first, and the standards bodies disagree

Unicode 16.0 confirmed, verbatim from the core spec:

"Prior to Unicode Version 16.0, U+202F NARROW NO-BREAK SPACE (NNBSP) was used to represent this small whitespace… However, its role has been taken over by U+180E MONGOLIAN VOWEL SEPARATOR (MVS), which not only prevents word breaking and line breaking, but also triggers special shaping for the following separated suffix."[1]

But nothing has followed:

- **No keyboard, IME, or converter emits MVS for suffixes.** Microsoft's layout exposes MVS, but framed as the *chachlag* separator, not a suffix connector. Real-world text is still NNBSP-joined.

- **W3C's published MLREQ (10 July 2025) still specifies NNBSP** and never mentions Unicode 16.0[2] — ten months after the change.

- **Its own editor contradicts it.** Richard Ishida's orthography notes (1 June 2026) say *"180E should be used for this gap"* and call NNBSP legacy[3]. Same author, two W3C-affiliated surfaces, opposite guidance.

- **No source outside the core spec attributes the change to version 16.0.** Which is precisely why it's been missed.

- **No Mongolian Unicode linter or validator exists** — confirmed across three differently-worded searches. Only pickers, converters, and one Cyrillic spell checker.

Worth knowing before you commit: several senior figures consider the encoding model itself defective. Andrew West (who wrote the Unicode 5.0 Mongolian block description) calls it *"deeply flawed"*[20], and W3C's own issue tracker states that phonetic-rather-than-glyph encoding *"makes it impossible to create interoperable content that can be guaranteed to look the same"*[30]. You'd be enforcing a standard its designers' critics consider broken. That's still worth doing — but it's an argument for surfacing diagnostics rather than silently "fixing" text.

## What I'd build

1. **Vendor CoPiT's 14,125 pairs** (CC BY 4.0) + kaikki Wiktionary extract. Lint every entry through gege-linter first — assume contamination.

2. **Ship bichig → Cyrillic first.** Near-deterministic, independently useful, and it gives you round-trip accuracy as an automatic metric with no annotation.

3. **Hand-author the suffix table**, validated against UniMorph khk as a held-out test set.

4. **Measure the ambiguity rate** on your own lexicon. Nobody has published it. It determines whether a lexicon alone is viable.

5. **Return candidates, not strings.** `analyze() → Candidate[]`, with the ranker as a pluggable seam: frequency prior → context n-gram → optional model. All three fit inside a zero-dependency package.

6. **Use the linter as a discriminator** — drop or penalize any candidate that trips a rule. No competitor can make that guarantee.

## Open items worth an hour each

- **Byte-test Tungaamal.** Dump the KIMO font cmap or `hb-shape` mngl.net output. Resolves the report's biggest unknown and nobody has published it.

- **Find CoPiT's de-anonymized repo.** The 4open.science link is still blinded; this is your primary data dependency.

- **Email bataak/dict-mn's author** for an MIT/CC0 grant on a derived suffix table. Highest-leverage single action available — 75k roots, actively maintained, reachable Mongolian developer.

- **Check SIGMORPHON 2022's Mongolian segmentation data** — shared-task data is often CC BY, which would be permissive enough.[40]

- **File a W3C MLREQ issue** about the Unicode 16.0 staleness. Cheap, useful, and gives you a citable artifact.

- **mongfontbuilder now ships `.ts`, not `.json`**[27] — the vendoring plan in CLAUDE.md needs updating.

## Sources

1. [The Unicode Standard 16.0, Core Specification, Chapter 13](https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-13/) — Unicode Consortium, Sept 2024.

2. [Mongolian Layout Requirements](https://www.w3.org/TR/mlreq/) — W3C Group Draft Note, 10 July 2025.

3. [Mongolian (Hudum) orthography notes](https://r12a.github.io/scripts/mong/mn) — Richard Ishida, updated 1 June 2026.

4. [白双成, 呼斯勒 — 传统蒙古文拼写问题研究](https://aclanthology.org/2020.ccl-1.45.pdf) — CCL 2020, pp. 491–498.

5. [CoPiT: Cognitive Pivot Translation for Digraphic Low-Resource Mongolian](https://arxiv.org/abs/2607.05849) — arXiv, July 2026.

6. [Kaikki.org Mongolian dictionary (Wiktextract)](https://kaikki.org/dictionary/Mongolian/index.html) — extracted 2026-07-20, 6,015 words, 12.4 MB JSONL.

7. [Wiktionary: сар](https://en.wiktionary.org/wiki/%D1%81%D0%B0%D1%80) — accessed 2026-07-25.

8. [bataak/dict-mn](https://github.com/bataak/dict-mn) — Mongolian Hunspell dictionary, LPPL-1.3c, pushed 2026-07-23.

9. [unimorph/khk](https://github.com/unimorph/khk) — UniMorph 4.0 Khalkha, CC BY-SA 3.0.

10. [CN103810161B](https://patents.google.com/patent/CN103810161B/en) — Inner Mongolia University, filed 2014-02-21.

11. [Cyrillic-Traditional Mongolian Bidirectional Conversion with Transformer](https://arxiv.org/abs/2209.11963) — ICONIP 2022.

12. [Language Model for Cyrillic Mongolian to Traditional Mongolian Conversion](https://link.springer.com/chapter/10.1007/978-3-642-41644-6_2) — Bao, Gao et al., Springer LNCS, 2013 (paywalled; abstract only).

13. [tugstugi/mongolian-nlp — bichig2cyrillic](https://github.com/tugstugi/mongolian-nlp/blob/master/bichig2cyrillic/README.md).

14. [Menksoft Mongolian IME](https://en.wikipedia.org/wiki/Menksoft_Mongolian_IME) — Wikipedia.

15. [Menksoft](https://en.wikipedia.org/wiki/Menksoft) — Wikipedia.

16. [Mongolian script keyboard and fonts developed](https://montsame.mn/en/read/180087) — Montsame, 14 Feb 2019.

17. [Bolorsoft web keyboard](https://mngl.net/webkb/) — mngl.net, © 2019–2021.

18. [Mongolia adopts dual-script official use](https://montsame.mn/en/read/358879) — Montsame, 6 Jan 2025.

19. [Tergel Teneg, "The Digitisation Odyssey of the Mongolian Script in Unicode"](https://api.repository.cam.ac.uk/server/api/core/bitstreams/dfc8cdaa-2e8c-439f-8dc1-e714a21f9c7c/content) — *Inner Asia* 27 (2025) 277–313, CC BY 4.0.

20. [BabelStone: Mongolian](https://www.babelstone.co.uk/Mongolian/Mongolian.html) — Andrew West.

21. [Apertium: Mongolic languages](https://wiki.apertium.org/wiki/Mongolic_languages).

22. [apertium/apertium-khk](https://github.com/apertium/apertium-khk) — GPL-3.0, last push 2021-09-02.

23. [giellalt/lang-khk LICENSE](https://github.com/giellalt/lang-khk/blob/main/LICENSE) — unfilled placeholder.

24. [UD_Mongolian-MTLR](https://github.com/UniversalDependencies/UD_Mongolian-MTLR) — empty placeholder repo.

25. [MC² corpus](https://huggingface.co/datasets/pkupie/mc2_corpus) — Peking University, CC0.

26. [CMLI-NLP Mongolian pretrain dataset](https://huggingface.co/datasets/CMLI-NLP/Mongolian-pretrain-dataset) — ~12 GB, CC BY 4.0.

27. [Kushim-Jiang/mongfontbuilder](https://github.com/Kushim-Jiang/mongfontbuilder) — MIT.

28. [suragch/mongol_code](https://github.com/suragch/mongol_code) — Unicode↔Menksoft PUA, CC0.

29. [UTN #57: Encoding and Shaping of the Mongolian Script](https://www.unicode.org/notes/tn57/) — v4, 2024-08-14.

30. [w3c/mlreq issue #34](https://github.com/w3c/mlreq/issues/34) — opened 5 Feb 2020.

31. [L2/17-036: Proposal to encode a Mongolian suffix connector](https://www.unicode.org/L2/L2017/17036-mongolian-suffix.pdf) — 2017.

32. [bichig.xyz](https://www.bichig.xyz/) — Cyrillic→traditional web converter.

33. [kbatsuren/MorphyNet](https://github.com/kbatsuren/MorphyNet).

34. [UD_Peripheral_Mongolian-Ordos](https://github.com/UniversalDependencies/UD_Peripheral_Mongolian-Ordos) — CC BY-SA 4.0, UD v2.19.

35. [Stanza available models](https://stanfordnlp.github.io/stanza/available_models.html) — no Mongolian.

36. [Lessing, Mongolian-English Dictionary](https://www.routledge.com/Mongolian-English-Dictionary/Lessing/p/book/9781138976375) — Routledge.

37. [Tohoku University online Mongolian dictionaries](http://hkuri.cneas.tohoku.ac.jp/project1/kdic/list?groupId=17) — 39 dictionaries.

38. [sura0111/writtenMongolianKeyboard](https://github.com/sura0111/writtenMongolianKeyboard).

39. [trans.mglip.com](http://trans.mglip.com/EnglishT2C.aspx) — Inner Mongolia University conversion service (TLS cert expired).

40. [SIGMORPHON 2022 Shared Task on Morpheme Segmentation](https://arxiv.org/pdf/2206.07615).

All sources accessed 2026-07-25. Figures marked as unverified come from search-engine summaries of paywalled or Chinese-language sources and should be treated as indicative rather than citable.
