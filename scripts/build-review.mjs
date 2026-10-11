// Build the review page of the bichig-review skill: one self-contained HTML
// file with the romanizer, the linter and the pinned font inside it, so the
// skill needs nothing installed and the page needs no network.
//
// Sources are in review/; the output is committed, because a skill is
// installed by copying its folder. Regenerate with `pnpm build:review`.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const at = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));

const bundle = await build({
  entryPoints: [at('review/app.js')],
  bundle: true,
  format: 'iife',
  target: 'es2022',
  minify: true,
  write: false,
  charset: 'ascii',
  // The linter reads its script facts from this package; give it this
  // checkout, not the published copy it was installed with.
  alias: { '@gege-mn/mongol-bichig': at('src/index.ts') },
  legalComments: 'none',
});
const js = bundle.outputFiles[0].text;

const font = readFileSync(at('review/font/noto-sans-mongolian-duct-taped.woff2')).toString(
  'base64',
);
const css = readFileSync(at('review/style.css'), 'utf8').replace(
  '/*FONT*/',
  `data:font/woff2;base64,${font}`,
);

// Function replacements: the bundle is full of `$`, which a string
// replacement would read as a pattern.
const html = readFileSync(at('review/index.html'), 'utf8')
  .replace('/*CSS*/', () => css)
  .replace('/*JS*/', () => js);

const out = at('skills/bichig-review/assets/review.html');
writeFileSync(out, html);
process.stdout.write(
  `wrote skills/bichig-review/assets/review.html (${Math.round(html.length / 1024)} kB)\n`,
);
