# Vendored: Unicode Character Database 18.0.0

Released 2026-09-16. License: Unicode License v3, see `LICENSE`.

| File | Source | Copied |
|---|---|---|
| `StandardizedVariants-18.0.0.txt` | `https://www.unicode.org/Public/18.0.0/ucd/StandardizedVariants.txt` (header date 2026-07-29) | Whole file, byte for byte |
| `UnicodeData-18.0.0-mongolian.txt` | `https://www.unicode.org/Public/18.0.0/ucd/UnicodeData.txt` | Only the lines for U+1800–18FF, unmodified: `grep -E '^18[0-9A-F]{2};'` |

Not part of the published package. `scripts/gen-fvs.mjs` reads them, together
with `vendor/mongfontbuilder/variants.json`, to write `src/data/fvs.ts`:

- `UnicodeData` turns the character names that `variants.json` is keyed by
  into code points.
- `StandardizedVariants` gives the sequences Unicode 18.0 marks "not in use".
  `test/fvs.test.ts` also checks that the vendored mongfontbuilder data and
  this file still agree.

Unicode 18.0 brought the Mongolian section of `StandardizedVariants.txt` into
line with the Chinese national standards (UTC decision 188-C33, L2/26-203).
The section lists no writing systems, so on its own it cannot tell Hudum from
Todo, Sibe or Manchu. That is why `variants.json` stays the source for what
Hudum allows.

To update: replace both files from the new version, change the version in the
file names, this README, `scripts/gen-fvs.mjs` and `sources.md`, then run
`bun run gen:fvs` and `bun run test`.
