# mongol-bichig

The single source of truth for traditional Mongolian script across the gege
tools: the knowledge base (`skills/mongol-bichig/references/`, nine
source-cited documents), the installable agent skills (`skills/`), and the npm
package `@gege-mn/mongol-bichig` — the suffix registry, Classical
romanization and Unicode character classes.

Consumers: [gege-linter](https://github.com/gege-mn/gege-linter) validates
bichig text, [gege-converter](https://github.com/gege-mn/gege-converter)
generates it. Both read their shared facts from here rather than keeping
private copies. That is the whole point of the repository — the suffix
registry had already been forked once, and `romanize.ts` drifted within a day
of being copied. **A fact that belongs to the script belongs here**, not in a
consumer.

## Publishing is the owner's, never the agent's

**`npm publish` is run only by the repository owner.** Never run it, never add
it to a script an agent invokes, and never treat a release as something to
carry over the line yourself. The registry requires an OTP an agent cannot
supply, so an attempt fails at best and half-releases at worst.

What an agent *may* do, and should: bump the version, write the CHANGELOG, run
the `prepublishOnly` chain locally (`pnpm build && pnpm typecheck && pnpm
test`), confirm `npm pack --dry-run` ships the right files, and then say the
release is ready. The last command belongs to the owner.

This matters more here than in the consumers: a change to this package is not
usable downstream until it is published, because the consumers resolve it from
the registry and there is no workspace link. So "ready to publish" is a state
worth reaching and reporting precisely.

## Project conventions

- **pnpm**, Biome (lint + format, 2-space indent, single quotes, width 100),
  Vitest, plain `tsc` build to `dist/` plus `scripts/emit-json.mjs` for the
  JSON export. Zero runtime dependencies, and it must stay that way — both
  consumers advertise this package as their only dependency.
- **Never type invisible characters as literals** (MVS U+180E, NNBSP U+202F,
  FVS1–4, ZWJ/ZWNJ, nirugu, BOM): always `\uXXXX` escapes. Visible bichig
  letters may appear literally. `test/no-invisible-literals.test.ts` enforces
  this over `src/`, `test/`, `scripts/` **and the reference documents**, which
  use `U+XXXX` or `[MVS]` prose notation instead.
- Classical forms are written in **romanization**, never as bichig literals,
  so data rows are auditable by eye and diff readably. `src/romanize.ts` is
  the single place that turns them into script.
- Do not name vendors, products or services in connection with harvested data
  or as attribution. Naming an **encoding or a converter as a technical
  artifact** is fine — Tungaamal, Menksoft PUA, Saiyin and the rest are what
  the reference documents are *about*. What stays out: company names, service
  domains and anything that reads as credit.

## What is authoritative here

`sources.md` pins the provenance of every claim. The reference documents are
the long form; the package is the machine-readable subset. When they
disagree, the documents win and the package is the bug.

Two facts worth having without a lookup:

- **Unicode 16.0 (Sept 2024) moved the suffix connector from NNBSP (U+202F) to
  MVS (U+180E)** — core spec ch. 13.5, unchanged through 17.0. It changed zero
  UCD properties and is absent from the release notes, so the model lives in
  core-spec prose and font GSUB alone.
- **For FVS validation use mongfontbuilder, not UCD
  `StandardizedVariants.txt`** — neither is a superset of the other, and the
  core spec calls the UCD list defective. Vendoring mongfontbuilder's
  `variants.json` here is an open item in `sources.md`, and it blocks
  gege-linter's `fvs-unregistered` rule.
