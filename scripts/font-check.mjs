// Check a font's Hudum shaping against the benchmark font, case by case.
//
//   node scripts/font-check.mjs [--benchmark FONT] [--features LIST] [--out DIR] FONT…
//
// `--features dlig` sets the fonts under test with those OpenType features on,
// as `font-feature-settings` would; without it a font is set as a browser sets
// it when nothing is asked for.
//
// The benchmark is Noto Sans Mongolian 3.100, whose glyph names spell the
// written units a letter was set in (`u1824.AO.init`), so its answer to a case
// can be read as text. A font under test names its glyphs however it likes, so
// nothing is read from its names: the two answers are cut where both fonts
// break a cluster, and each piece pairs the candidate's glyphs with the written
// units the benchmark drew there. A candidate glyph that is paired with two
// different written units draws the wrong shape for one of them.
//
// The cases are the Hudum suites of the national standard as mongfontbuilder
// carries them (`vendor/mongfontbuilder/suites/`) and every entry of the suffix
// registry on real stems, joined by MVS, by NNBSP and by a space.
//
// Needs `hb-shape` (HarfBuzz) on the PATH. Fonts are never copied or committed:
// the report refers to them where they lie. See
// `skills/mongol-bichig/references/fonts-and-rendering.md` for how to read the
// result and for the fonts measured so far.

import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DEFAULT_BENCHMARK = join(ROOT, '../gege.mn/static/fonts/NotoSansMongolian-Regular.ttf');

// The names the suites write a case with, as mongfontbuilder's `aliases.json`
// gives them for Hudum.
const ALIAS = {
  a: 0x1820,
  e: 0x1821,
  i: 0x1822,
  o: 0x1823,
  u: 0x1824,
  oe: 0x1825,
  ue: 0x1826,
  ee: 0x1827,
  n: 0x1828,
  ng: 0x1829,
  b: 0x182a,
  p: 0x182b,
  h: 0x182c,
  g: 0x182d,
  m: 0x182e,
  l: 0x182f,
  s: 0x1830,
  sh: 0x1831,
  t: 0x1832,
  d: 0x1833,
  ch: 0x1834,
  j: 0x1835,
  y: 0x1836,
  r: 0x1837,
  w: 0x1838,
  f: 0x1839,
  k2: 0x183a,
  k: 0x183b,
  c: 0x183c,
  z: 0x183d,
  hh: 0x183e,
  rh: 0x183f,
  lh: 0x1840,
  zr: 0x1841,
  cr: 0x1842,
  nirugu: 0x180a,
  fvs1: 0x180b,
  fvs2: 0x180c,
  fvs3: 0x180d,
  fvs4: 0x180f,
  mvs: 0x180e,
  nnbsp: 0x202f,
  zwj: 0x200d,
  zwnj: 0x200c,
  space: 0x20,
};
const NAME = new Map(Object.entries(ALIAS).map(([name, cp]) => [cp, name]));

const MVS = 0x180e;
const NNBSP = 0x202f;
const FVS = new Set([0x180b, 0x180c, 0x180d, 0x180f]);
const CONTROLS = [0x180b, 0x180c, 0x180d, 0x180f, MVS, NNBSP, 0x200c, 0x200d];
const isLetter = (cp) => cp >= 0x1820 && cp <= 0x1842;

// What a usable Hudum font has to map: the letters, the marks and digits, and
// the controls. U+180F (FVS4) came with Unicode 14.
const REQUIRED = [
  ...range(0x1800, 0x1806),
  ...range(0x180a, 0x180f),
  ...range(0x1810, 0x1819),
  ...range(0x1820, 0x1842),
  0x200c,
  0x200d,
  NNBSP,
];

// Stems the suffixes are set on: a vowel, n, a soft and a hard consonant at
// the end, for each harmony. Real words, written with the aliases above.
const STEMS = {
  masculine: ['a h a', 'h a g a n', 'n o m', 'g a r'],
  feminine: ['e h e', 'h e n', 'g e r e l', 'b i ch i g'],
};

const CHECKS = [
  ['plain', 'Letters and joining, no controls'],
  ['suffix-mvs', 'Suffix after MVS — the Unicode 16 connector'],
  ['chachlag', 'Chachlag: MVS before a final a or e'],
  ['mvs', 'MVS before a particle, in the suites'],
  ['suffix-nnbsp', 'Suffix after NNBSP — the legacy connector'],
  ['nnbsp', 'NNBSP before a particle, in the suites'],
  ['fvs', 'Variation selectors, where the benchmark honours them'],
  ['zwj', 'ZWJ and ZWNJ'],
  ['nirugu', 'Nirugu'],
  ['mixed', 'Several kinds of control in one case'],
  ['misuse', 'Misuse the benchmark makes visible'],
];

// The rubric. A font passes when it maps every character of REQUIRED but FVS4
// and agrees with the benchmark on every case of these four checks: what a
// reader meets in ordinary text that gege-linter accepts. The other checks are
// reported and never decide — see `references/font-conformance.md` for why.
const DECIDING = ['plain', 'suffix-mvs', 'chachlag', 'mvs'];
const FVS4 = 0x180f;

function verdictOf({ missing, summary }) {
  const failed = summary.filter((s) => DECIDING.includes(s.key) && s.passed !== s.cases);
  const unmapped = missing.filter((cp) => cp !== FVS4);
  return {
    pass: failed.length === 0 && unmapped.length === 0,
    failed: failed.map((s) => s.key),
    unmapped,
  };
}

function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

const hex = (cp) => `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
const spell = (cps) => cps.map((cp) => NAME.get(cp) ?? hex(cp)).join(' ');

// ── cases ────────────────────────────────────────────────────────────────────

function parse(aliases) {
  return aliases.split(' ').map((alias) => {
    if (!(alias in ALIAS)) throw new Error(`unknown alias ${alias}`);
    return ALIAS[alias];
  });
}

function suiteCases(file) {
  const path = join(ROOT, 'vendor/mongfontbuilder/suites', file);
  return readFileSync(path, 'utf8')
    .split('\n')
    .filter((row) => row && !row.startsWith('#'))
    .map((row) => {
      const [id, input, expected] = row.split('\t');
      return { id, cps: parse(input), expected, source: file };
    });
}

function registryCases() {
  const { entries } = JSON.parse(readFileSync(join(ROOT, 'data/suffixes.json'), 'utf8'));
  const joins = [
    ['mvs', MVS],
    ['nnbsp', NNBSP],
    ['space', 0x20],
  ];
  const cases = [];
  for (const entry of entries) {
    const suffix = entry.codepoints.map((cp) => Number.parseInt(cp.slice(2), 16));
    const harmonies = entry.harmony === 'neutral' ? ['masculine', 'feminine'] : [entry.harmony];
    for (const stem of harmonies.flatMap((h) => STEMS[h])) {
      for (const [join_, connector] of joins) {
        // A registry entry written with a space is a word, and is only set as one.
        if (entry.join === 'space' && join_ !== 'space') continue;
        cases.push({
          id: `${stem.replaceAll(' ', '')}+${entry.translit}/${join_}`,
          cps: [...parse(stem), connector, ...suffix],
          source: 'registry',
          join: join_,
        });
      }
    }
  }
  return cases;
}

// ── shaping ──────────────────────────────────────────────────────────────────

function shape(font, texts, features) {
  const asked = features ? [`--features=${features}`] : [];
  const run = spawnSync('hb-shape', [font, '-O', 'json', '--show-extents', ...asked], {
    input: `${texts.map((cps) => String.fromCodePoint(...cps)).join('\n')}\n`,
    encoding: 'utf8',
    maxBuffer: 1 << 30,
  });
  if (run.error?.code === 'ENOENT') throw new Error('hb-shape not found — install HarfBuzz');
  if (run.status !== 0) throw new Error(`hb-shape failed on ${font}: ${run.stderr}`);
  const rows = run.stdout.trimEnd().split('\n');
  if (rows.length !== texts.length) throw new Error(`hb-shape answered ${rows.length} rows`);
  return rows.map((row) =>
    JSON.parse(row).map((glyph) => ({
      g: String(glyph.g),
      cl: glyph.cl,
      ax: glyph.ax,
      ink: glyph.w !== 0 && glyph.h !== 0,
    })),
  );
}

/** Family, version and maker, read from the `name` table. */
function describe(font) {
  const data = readFileSync(font);
  const names = {};
  const tables = data.readUInt16BE(4);
  for (let i = 0; i < tables; i++) {
    const record = 12 + i * 16;
    if (data.toString('latin1', record, record + 4) !== 'name') continue;
    const table = data.readUInt32BE(record + 8);
    const strings = table + data.readUInt16BE(table + 4);
    for (let n = 0; n < data.readUInt16BE(table + 2); n++) {
      const at = table + 6 + n * 12;
      const platform = data.readUInt16BE(at);
      const id = data.readUInt16BE(at + 6);
      const start = strings + data.readUInt16BE(at + 10);
      const bytes = data.subarray(start, start + data.readUInt16BE(at + 8));
      if (platform === 3 || platform === 0) names[id] = new TextDecoder('utf-16be').decode(bytes);
      else names[id] ??= bytes.toString('latin1');
    }
  }
  return {
    file: basename(font),
    family: names[1] ?? basename(font),
    version: (names[5] ?? '').replace(/^Version\s+/i, '').split(';')[0],
    maker: names[8] ?? '',
  };
}

/** The glyphs a font draws for a control that has nothing to act on. */
function markersOf(font, features) {
  const drawn = shape(
    font,
    CONTROLS.map((cp) => [cp]),
    features,
  );
  return new Set(drawn.flatMap((glyphs) => glyphs.filter((g) => g.ink).map((g) => g.g)));
}

function missingFrom(font) {
  const run = spawnSync(
    'hb-shape',
    [font, '-O', 'json', '--preserve-default-ignorables', '--shapers=fallback'],
    { input: `${REQUIRED.map((cp) => String.fromCodePoint(cp)).join('\n')}\n`, encoding: 'utf8' },
  );
  const rows = run.stdout.trimEnd().split('\n');
  return REQUIRED.filter((_, i) => JSON.parse(rows[i]).some((g) => g.g === '.notdef' || g.g === 0));
}

// ── reading the benchmark ────────────────────────────────────────────────────

const UNITS = /^u[0-9A-F]{4,5}(?:_u[0-9A-F]{4,5})*\.([A-Z][A-Za-z0-9]*\.(?:isol|init|medi|fina))/;

/** `u1824.AO.init` → `AO.init`: the written units and the position, whatever the letter. */
const shapeOf = (glyph) => UNITS.exec(glyph)?.[1] ?? glyph;

/** `AO.init` → `AO`: one glyph may serve the same written units in two positions. */
const unitsOf = (shapes) => shapes.replace(/\.(isol|init|medi|fina)\b/g, '');

/** A stroke the benchmark adds between two letters; another font draws it into the letter. */
const EXTENDER = 'nirugu.extend';

/** Cut two shaped answers where both break a cluster. */
function pieces(bench, cand, length) {
  const starts = (glyphs) => new Set(glyphs.map((g) => g.cl));
  const candStarts = starts(cand);
  const cuts = [...new Set([0, ...[...starts(bench)].filter((cl) => candStarts.has(cl))])];
  cuts.sort((a, b) => a - b);
  return cuts.map((from, i) => {
    const to = cuts[i + 1] ?? length;
    const within = (glyphs) => glyphs.filter((g) => g.cl >= from && g.cl < to);
    return { from, to, bench: within(bench), cand: within(cand) };
  });
}

function checkOf(testCase, bench, benchMarkers) {
  const { cps } = testCase;
  if (testCase.source === 'registry' && testCase.join !== 'space') return `suffix-${testCase.join}`;
  if (bench.some((g) => benchMarkers.has(g.g))) return 'misuse';
  const kinds = [
    ['fvs', cps.some((cp) => FVS.has(cp))],
    ['mvs', cps.includes(MVS)],
    ['nnbsp', cps.includes(NNBSP)],
    ['zwj', cps.includes(0x200d) || cps.includes(0x200c)],
    ['nirugu', cps.includes(0x180a)],
  ].flatMap(([kind, present]) => (present ? [kind] : []));
  if (kinds.length > 1) return 'mixed';
  if (kinds[0] === 'mvs') return bench.some((g) => g.g === 'mvs.narrow') ? 'chachlag' : 'mvs';
  return kinds[0] ?? 'plain';
}

// ── the check ────────────────────────────────────────────────────────────────

function check(font, cases, bench, benchMarkers, features) {
  const shaped = shape(
    font,
    cases.map((c) => c.cps),
    features,
  );
  const markers = markersOf(font, features);
  const rows = [];
  const seen = { plain: new Map(), all: new Map() };

  for (const [i, testCase] of cases.entries()) {
    const row = { ...testCase, check: checkOf(testCase, bench[i], benchMarkers), pieces: [] };
    rows.push(row);
    if (bench[i].some((g) => g.g === '.notdef')) row.skip = 'benchmark';
    else if (shaped[i].some((g) => g.g === '.notdef')) row.skip = 'unmapped';
    if (row.skip) continue;

    const plain = testCase.cps.every((cp) => isLetter(cp) || cp === 0x20);
    for (const piece of pieces(bench[i], shaped[i], testCase.cps.length)) {
      const inked = (glyphs, set) => glyphs.filter((g) => g.ink && set.has(g.g)).map((g) => g.g);
      const letters = (glyphs, set) =>
        glyphs.filter((g) => g.ink && !set.has(g.g) && g.g !== EXTENDER).map((g) => g.g);
      const entry = {
        cps: testCase.cps.slice(piece.from, piece.to),
        want: letters(piece.bench, benchMarkers).map(shapeOf).join(' '),
        got: letters(piece.cand, markers).join(' '),
        wantMarker: inked(piece.bench, benchMarkers).length > 0,
        gotMarker: inked(piece.cand, markers).join(' '),
      };
      row.pieces.push(entry);
      if (!entry.got) continue;
      for (const tier of plain ? [seen.plain, seen.all] : [seen.all]) {
        if (!tier.has(entry.got)) tier.set(entry.got, new Map());
        const counts = tier.get(entry.got);
        counts.set(entry.want, (counts.get(entry.want) ?? 0) + 1);
      }
    }
  }

  // What a glyph draws is what it is seen drawing most — in plain words, where
  // any font of any age should be right, before the cases that use a control.
  // It may draw the same written units in another position too, as a bowed
  // letter is often one drawing at the head of a word and inside it.
  const most = (counts) => [...counts].sort((a, b) => b[1] - a[1])[0][0];
  const draws = (glyphs) => most(seen.plain.get(glyphs) ?? seen.all.get(glyphs));
  const mayDraw = (glyphs, shapes) =>
    (seen.plain.get(glyphs) ?? seen.all.get(glyphs)).has(shapes) &&
    unitsOf(shapes) === unitsOf(draws(glyphs));

  for (const row of rows) {
    row.findings = [];
    if (row.skip) continue;
    for (const piece of row.pieces) {
      const at = spell(piece.cps);
      if (piece.gotMarker && !piece.wantMarker)
        row.findings.push({ kind: 'marker', at, text: `draws ${piece.gotMarker}, an error mark` });
      if (piece.wantMarker && !piece.gotMarker) row.hidden = true;
      if (!piece.want && !piece.got) continue;
      if (!piece.got) {
        // A control the benchmark marks and the candidate hides is no finding.
        if (!piece.wantMarker || piece.want)
          row.findings.push({ kind: 'form', at, text: `draws nothing for ${piece.want}` });
      } else if (!piece.want) {
        row.findings.push({ kind: 'form', at, text: `draws ${piece.got} where nothing is drawn` });
      } else if (!mayDraw(piece.got, piece.want)) {
        const text = `benchmark draws ${piece.want}, this font the glyph it draws ${draws(piece.got)} with (${piece.got})`;
        row.findings.push({ kind: 'form', at, text });
      }
    }
    row.pass = row.findings.length === 0;
  }

  const summary = CHECKS.map(([key, label]) => {
    const of = rows.filter((row) => row.check === key && !row.skip);
    const base = { key, label, cases: of.length, unmapped: 0 };
    base.unmapped = rows.filter((row) => row.check === key && row.skip === 'unmapped').length;
    if (key === 'misuse') return { ...base, passed: of.filter((row) => !row.hidden).length };
    return { ...base, passed: of.filter((row) => row.pass).length };
  });
  const about = { ...describe(font), features: features ?? '' };
  const result = { font: about, path: font, missing: missingFrom(font), summary, rows };
  return { ...result, verdict: verdictOf(result) };
}

/** The findings of a check, the commonest first, each with the cases that show it. */
function grouped(rows, key) {
  const groups = new Map();
  for (const row of rows) {
    if (row.check !== key || row.skip) continue;
    for (const finding of row.findings) {
      const label = `${finding.at} — ${finding.text}`;
      if (!groups.has(label)) groups.set(label, { label, kind: finding.kind, rows: [] });
      const group = groups.get(label);
      if (!group.rows.includes(row)) group.rows.push(row);
    }
  }
  return [...groups.values()].sort((a, b) => b.rows.length - a.rows.length);
}

// ── reports ──────────────────────────────────────────────────────────────────

function print(result) {
  const { font, missing, summary } = result;
  const set = font.features ? `, with ${font.features}` : '';
  process.stdout.write(`\n${font.family} ${font.version} (${font.file}${set})\n`);
  const lack = missing.length ? `missing ${missing.map(hex).join(' ')}` : 'complete';
  const covered = result.verdict.unmapped.length ? 'FAIL' : missing.length ? 'note' : 'pass';
  process.stdout.write(`  ${result.verdict.pass ? 'PASS' : 'FAIL'}  by the rubric\n`);
  process.stdout.write(`  ${covered}  Hudum coverage: ${lack}\n`);
  for (const { key, label, cases, passed, unmapped } of summary) {
    if (!cases && !unmapped) continue;
    const verdict = passed === cases ? 'pass' : DECIDING.includes(key) ? 'FAIL' : 'note';
    const skipped = unmapped ? `, ${unmapped} not set for a missing character` : '';
    process.stdout.write(`  ${verdict}  ${label}: ${passed}/${cases}${skipped}\n`);
    if (key === 'misuse') continue;
    for (const group of grouped(result.rows, key).slice(0, 4))
      process.stdout.write(`          ${group.rows.length}× ${group.label}\n`);
  }
}

const quoted = (text) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const entities = (cps) => cps.map((cp) => `&#x${cp.toString(16)};`).join('');

function page(result, benchmark) {
  const { font, missing, summary, rows } = result;
  const sample = (row) => `
    <figure>
      <div class="pair"><p class="bench">${entities(row.cps)}</p><p class="cand">${entities(row.cps)}</p></div>
      <figcaption><b>${quoted(row.id)}</b><br>${quoted(spell(row.cps))}</figcaption>
    </figure>`;
  const sections = summary
    .filter(({ key }) => key !== 'misuse')
    .map(({ key, label }) => {
      const groups = grouped(rows, key);
      if (!groups.length) return '';
      const body = groups
        .slice(0, 40)
        .map(
          (group) => `
        <h3>${group.rows.length}× ${quoted(group.label)}</h3>
        <div class="row">${group.rows.slice(0, 8).map(sample).join('')}</div>`,
        )
        .join('');
      const more = groups.length > 40 ? `<p>… and ${groups.length - 40} more kinds.</p>` : '';
      return `<h2>${quoted(label)}</h2>${body}${more}`;
    })
    .join('');
  const table = summary
    .map(({ key, label, cases, passed, unmapped }) => {
      const verdict = passed === cases ? 'pass' : DECIDING.includes(key) ? 'fail' : 'note';
      return `<tr class="${verdict}"><td>${verdict}</td><td>${quoted(label)}</td><td>${passed}/${cases}</td><td>${unmapped || ''}</td></tr>`;
    })
    .join('');
  return `<!doctype html>
<meta charset="utf-8">
<title>${quoted(font.family)} ${quoted(font.version)} — font check</title>
<style>
  @font-face { font-family: bench; src: url("${pathToFileURL(benchmark.path)}"); }
  @font-face { font-family: cand; src: url("${pathToFileURL(result.path)}"); }
  body { font: 14px/1.4 system-ui, sans-serif; margin: 24px; color: #222; background: #fff; }
  table { border-collapse: collapse; } td { padding: 2px 12px 2px 0; }
  tr.fail td:first-child { color: #b00020; font-weight: 600; } tr.pass td:first-child { color: #18794e; }
  h2 { margin-top: 32px; border-top: 1px solid #ddd; padding-top: 16px; }
  h3 { font-size: 13px; font-weight: 600; margin: 20px 0 6px; }
  .row { display: flex; flex-wrap: wrap; gap: 16px; }
  figure { margin: 0; border: 1px solid #e5e5e5; padding: 8px; }
  .pair { display: flex; gap: 14px; height: 220px; }
  .pair p { writing-mode: vertical-lr; font-size: 30px; margin: 0; line-height: 1.3; }
  .bench { font-family: bench; color: #18794e; }
  .cand { font-family: cand; font-feature-settings: ${
    font.features
      ? font.features
          .split(',')
          .map((f) => `"${f}"`)
          .join(', ')
      : 'normal'
  }; }
  figcaption { font-size: 11px; color: #666; max-width: 150px; overflow-wrap: anywhere; }
</style>
<h1>${quoted(font.family)} ${quoted(font.version)}</h1>
<p>${quoted(font.maker)} · ${quoted(font.file)}${font.features ? ` · set with ${quoted(font.features)}` : ''} · against ${quoted(benchmark.font.family)} ${quoted(benchmark.font.version)}.
In each pair the benchmark is on the left, in green, and the font under test on the right.</p>
<p><b>${result.verdict.pass ? 'Passes' : 'Does not pass'} the rubric</b>: every case of the first four checks, and every Hudum character mapped.</p>
<p>Hudum coverage: ${missing.length ? `missing ${missing.map(hex).join(' ')}` : 'complete'}.</p>
<table><tr><th></th><th>Check</th><th>Agree</th><th>Not set</th></tr>${table}</table>
${sections}
`;
}

// ── main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const option = (name) => {
  const at = args.indexOf(name);
  return at < 0 ? undefined : args.splice(at, 2)[1];
};
const benchmarkPath = resolve(
  option('--benchmark') ?? process.env.BICHIG_BENCHMARK ?? DEFAULT_BENCHMARK,
);
const features = option('--features');
const out = resolve(option('--out') ?? join(ROOT, '.tmp/font-check'));
if (!args.length) {
  process.stderr.write(
    'usage: node scripts/font-check.mjs [--benchmark FONT] [--features LIST] [--out DIR] FONT…\n',
  );
  process.exit(2);
}

const cases = [...suiteCases('core-hud.tsv'), ...suiteCases('eac-hud.tsv'), ...registryCases()];
const bench = shape(
  benchmarkPath,
  cases.map((c) => c.cps),
);
const benchmark = { path: benchmarkPath, font: describe(benchmarkPath) };
const benchMarkers = markersOf(benchmarkPath);
process.stdout.write(
  `${cases.length} cases against ${benchmark.font.family} ${benchmark.font.version}\n`,
);

mkdirSync(out, { recursive: true });
for (const path of args.map((arg) => resolve(arg))) {
  const result = check(path, cases, bench, benchMarkers, features);
  print(result);
  const stem = join(out, basename(path).replace(/\.[^.]+$/, '') + (features ? `+${features}` : ''));
  writeFileSync(`${stem}.html`, page(result, benchmark));
  const findings = result.rows
    .filter((row) => row.findings?.length || row.skip)
    .map(({ id, check: of, cps, skip, findings: found }) => ({
      id,
      check: of,
      input: spell(cps),
      skip,
      findings: found,
    }));
  const { font, missing, summary } = result;
  const verdict = { ...result.verdict, unmapped: result.verdict.unmapped.map(hex) };
  const record = {
    font,
    benchmark: benchmark.font,
    verdict,
    missing: missing.map(hex),
    summary,
    findings,
  };
  writeFileSync(`${stem}.json`, `${JSON.stringify(record, null, 2)}\n`);
  process.stdout.write(`  → ${stem}.html\n`);
}
