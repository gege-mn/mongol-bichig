# The knowledge base

Curated, source-cited reference documents on traditional Mongolian script.
Researched from primary sources (Unicode core spec + UCD, the L2 register,
UTN #57, mongfontbuilder data, W3C, Poppe's grammar) on 2026-07-23/25;
provenance and the re-verification checklist live in [`sources.md`](../../../sources.md).

These files are canonical — there is no other copy. House rule applies
everywhere: invisible characters appear only as `U+XXXX` notation, never as
literals.

| Doc | What it covers | Feeds |
|---|---|---|
| [encoding-model.md](encoding-model.md) | The current (Unicode 16+/17) model: block inventory, MVS's two roles, format-control properties, normalization, ZWJ/ZWNJ/nirugu, UTN #57 summary, version history | everything; linter `mvs-context`, `nnbsp-legacy`, `zwj-zwnj` |
| [encoding-history.md](encoding-history.md) | 1987→2026: why the 1999 model failed, the suffix-connector saga, how MVS won via GB/T 25914—2023 | narrative; provenance |
| [variation-sequences.md](variation-sequences.md) | FVS semantics, UCD-vs-UTN registry divergence, the Hudum valid-FVS table, vendoring traps | linter `fvs-placement`, planned `fvs-unregistered` |
| [script-styles.md](script-styles.md) | Hudum/Todo/Sibe/Manchu/Ali Gali: ranges vs letter profiles, look-alikes, locale metadata, severity calibration | linter `wrong-block` |
| [suffixes.md](suffixes.md) | **Normative.** The curated Hudum suffix dictionary (залгах нөхцөл) with code points, conditions, provenance and errata | `@gege-mn/mongol-bichig`'s registry (cross-checked by test); linter `unknown-suffix`, planned `space-before-suffix`; convertor stage 3 |
| [legacy-encodings.md](legacy-encodings.md) | Menksoft/Saiyin/Boljoo PUA, CMs ASCII fonts, the IME landscape, PUA detection heuristics, converters | linter `no-pua`; corpus triage |
| [fonts-and-rendering.md](fonts-and-rendering.md) | Noto v3 vs Baiti, shaping engines, platform matrix, hb-shape recipes, how misuse renders | test verification; issue messages |
| [orthography.md](orthography.md) | Vowel harmony, chachlag, closed vowel-sequence inventory, ranked linguistic rule candidates with FP risk | linter `non-initial-o`; convertor harmony resolution |

Reading order for newcomers: encoding-model → suffixes → variation-sequences,
then the rest as needed. encoding-history is the "why does any of this exist"
backstory.

`suffixes.md` is special: it is not just documentation but the **normative
source** for the machine-readable registry shipped in `@gege-mn/mongol-bichig`.
A test parses its tables and fails the build if the two disagree, so editing it
carelessly breaks CI — which is the point.
