# Vendored: mongfontbuilder data

Upstream data files, copied **byte for byte** — do not edit, reformat or lint
them. They are the living form of UTN #57 and the data Noto Sans Mongolian
3.100 is generated from.

| | |
|---|---|
| Source | [`Kushim-Jiang/mongolian`](https://github.com/Kushim-Jiang/mongolian) (formerly `mongfontbuilder`), `mongfontbuilder/data/` in the wheel |
| Pinned at | **v0.15.3**, commit `f068e35284d0`, taken from the PyPI wheel `mongfontbuilder==0.15.3` |
| Vendored | 2026-10-02 at v0.13.0; bumped 2026-11-05 (only `locales.json` changed: each locale gained a `name`) |
| License | MIT — see `LICENSE` |

Not part of the published package: `package.json` `files` ships `dist` and
`data` only. They are here so that FVS validation is derived from a pinned
file rather than from a table retyped out of a PDF. `scripts/gen-fvs.mjs`
compiles `variants.json` into `src/data/fvs.ts`; re-run it (`bun run gen:fvs`)
after an update. Schema traps (key `"0"` is *not* FVS0) are in
`skills/mongol-bichig/references/variation-sequences.md`.

`suites/` holds the two Hudum shaping suites, taken from the repository
because the wheel does not ship them. Upstream they now live at
`mongfontbuilder/src/mongfontbuilder/testSuites/core-hudum.tsv` and
`eac-hudum.tsv` (renamed and moved after 0.13.0; byte-identical at 0.15.3).
A row is an id, the case in the aliases of `aliases.json`, and the written
units the standard expects; `#` comments a case out. `scripts/font-check.mjs`
reads the first two columns.

To update: replace the files from a newer release, change the pin above and in
`sources.md`, then re-derive the counts quoted in `variation-sequences.md` and
re-run `pnpm font:check` on the fonts listed in `font-conformance.md`.
