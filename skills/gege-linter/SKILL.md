---
name: gege-linter
description: Lint and fix traditional Mongolian script (Mongol bichig) text with the @gege-mn/gege-linter library and CLI — flags legacy NNBSP suffix connectors, broken MVS/FVS placement, PUA leftovers, wrong-block look-alike letters, stray ZWJ/ZWNJ, and unknown suffixes, with mechanical fixes. Use when validating or fixing Mongol bichig (U+1800–18AF) text in files, string constants, or CI; when integrating Mongolian text validation into an app; or when a user reports "invisible" Mongolian encoding bugs.
license: MIT
---

# gege-linter — lint Mongol bichig text

Mongol bichig text can look perfect and be encoded wrong: the script's
grammar lives partly in invisible characters. gege-linter mechanizes the
Unicode 16+/UTN #57 rules. Zero runtime dependencies; pure TypeScript.

For *why* the rules exist (the encoding model, FVS, normalization), use the
companion **mongol-bichig** skill in this repo.

## CLI

```sh
pnpm dlx @gege-mn/gege-linter file.txt          # or: npx @gege-mn/gege-linter
gege-linter --fix file.txt                      # apply mechanical fixes in place
gege-linter --json file.txt                     # machine-readable (best for agents)
cat file.txt | gege-linter -                    # stdin
cat file.txt | gege-linter --fix - > fixed.txt  # fixed text on stdout, report on stderr
gege-linter --list-rules
```

From a repo checkout: `pnpm build && node dist/cli.js <file>`.

Exit codes: **0** clean or warnings only · **1** error-severity findings ·
**2** usage or I/O failure. In CI, treat exit 1 as a hard failure; decide
per-project whether warnings (legacy NNBSP is a warning) should also fail.

`--json` emits `{ files: [{ path, diagnostics }], summary }` where each
diagnostic has `rule`, `severity`, `message`, code-point `start`/`end`,
1-based `line`/`col`, and `fix` when mechanical.

## Library

```ts
import { applyFixes, lint, nnbspLegacy, rules, suffixes } from '@gege-mn/gege-linter';

const diagnostics = lint(text);
// [{ rule: 'nnbsp-legacy', severity: 'warning', start: 5, end: 6, fix: '\u180E', … }]

const fixed = applyFixes(text, diagnostics);

lint(text, [nnbspLegacy]); // run a subset — every rule is exported by name
```

**Offsets are Unicode code points, not UTF-16 units.** Never apply them
with `String.slice`/`substring` — that corrupts text containing astral
characters. Always splice via `applyFixes`, or convert through
`[...text]` first.

## The rules

| Rule | Severity | Flags | Fix |
|---|---|---|---|
| `mvs-context` | error | MVS not between two Mongolian letters | — |
| `fvs-placement` | error | FVS1–4 not immediately after a Mongolian letter (doubling included) | — |
| `no-pua` | error | Private Use Area code points (Menksoft-era glyph text), one diagnostic per run | — |
| `wrong-block` | warning | Todo/Sibe/Manchu/Ali Gali letters in Hudum text | ᠬ/ᠭ for the U+1888/U+1889 look-alikes |
| `zwj-zwnj` | warning | ZWJ/ZWNJ **between** two Mongolian letters | — |
| `nnbsp-legacy` | warning | NNBSP suffix connector (pre-16.0 model) | MVS (U+180E) |
| `unknown-suffix` | warning | connector-joined letter run not in the suffix dictionary; a run that *is* a separate word is named as one | the dictionary sequence when only a stray FVS breaks the match; a plain space when a whole word follows an MVS |
| `doubled-ae` | warning | adjacent ᠠᠠ / ᠡᠡ — long a/e take the γ/g hiatus, never a doubled vowel | **none** — the reflexive wants ᠢᠶᠠᠨ/ᠢᠶᠡᠨ, the vocative a single ᠠ/ᠡ and a space |
| `non-initial-o` | info | O/Ö past the first syllable (heuristic; native exceptions exist) | — |

At a **word boundary** a joiner is legitimate and `zwj-zwnj` says nothing: the
core spec (16.0 §13.5) sanctions ZWJ/ZWNJ for selecting a positional form in
isolation — `<1820 200D>` initial, `<200D 1820>` final — which is how bichig
writes abbreviations (ЗХУ is each letter + ZWJ + U+1802). Emoji sequences are
untouched for the same structural reason.

### One rule is opt-in

`fusableStack` (info) is **exported but not in `rules`**, because it reports
text that is already correct: an analytic case + reflexive stack that has a
registered fused equivalent (ᠳᠤ + ᠪᠠᠨ → ᠳᠠᠭᠠᠨ). Задлаг and нийлэг are both
valid and choosing between them is style, so it carries no `fix` and `--fix`
cannot rewrite one into the other. The fused sequence is named in the message
and the span covers the whole stack including its leading connector, so a UI
that wants one-click apply builds connector + sequence over that span.

```ts
lint(text, [...rules, fusableStack]); // an editor panel wanting the hint
```

The suffix dictionary is not the linter's own: it comes from
`@gege-mn/mongol-bichig`, re-exported here as `suffixes` for convenience.
The human-readable form is `references/suffixes.md` in the mongol-bichig
skill, which is also its normative source.

## Conventions when writing code/tests around this library

- Never type invisible characters (U+202F, U+180E, U+180B–180D, U+180F,
  U+200C/D) as literals in source — always `\uXXXX` escapes. Visible
  bichig letters may appear literally.
- Lint **raw** text: never NFKC/normalize input first (NFKC destroys the
  NNBSP evidence and manufactures space-corruption; see the mongol-bichig
  skill's normalization section).
- Diagnostics arrive sorted by position; `applyFixes` applies back-to-front
  so offsets stay valid.
