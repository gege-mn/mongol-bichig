# Vendored: mongfontbuilder data

Upstream data files, copied **byte for byte** — do not edit, reformat or lint
them. They are the living form of UTN #57 and the data Noto Sans Mongolian
3.100 is generated from.

| | |
|---|---|
| Source | [`Kushim-Jiang/mongolian`](https://github.com/Kushim-Jiang/mongolian) (formerly `mongfontbuilder`), `lib/mongfontbuilder/data/` |
| Pinned at | **v0.13.0**, commit `a43024ee732e`, taken from the PyPI wheel `mongfontbuilder==0.13.0` |
| Vendored | 2026-10-02 |
| License | MIT — see `LICENSE` |

Not part of the published package: `package.json` `files` ships `dist` and
`data` only. Nothing in `src/` reads these yet; they are here so that FVS
validation is derived from a pinned file rather than from a table retyped out
of a PDF. Schema traps (key `"0"` is *not* FVS0) are in
`skills/mongol-bichig/references/variation-sequences.md`.

`suites/` holds the two Hudum shaping suites of the same commit,
`mongfontbuilder/src/mongfontbuilder/data/suites/core-hud.tsv` and `eac-hud.tsv`
(the wheel of 0.13.0 does not ship them; they were taken from the repository).
A row is an id, the case in the aliases of `aliases.json`, and the written
units the standard expects; `#` comments a case out. `scripts/font-check.mjs`
reads the first two columns.

To update: replace the files from a newer release, change the pin above and in
`sources.md`, then re-derive the counts quoted in `variation-sequences.md` and
re-run `pnpm font:check` on the fonts listed in `fonts-and-rendering.md`.
