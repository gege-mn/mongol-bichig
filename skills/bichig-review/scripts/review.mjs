#!/usr/bin/env node
// Open a translation file in the review page and wait for the reviewer.
//
//   node review.mjs <file> [--ref <file>] [--title <text>] [--out <file>]
//                          [--static <file.html>] [--no-open]
//
// Serves ../assets/review.html on a local port with the file inside it, saves
// the review to --out after every change, and exits when the reviewer presses
// "Hand it back", printing what they said. No dependencies.
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const USAGE = `usage: node review.mjs <file> [options]

  <file>            the strings to review: JSON of any shape, a source file of
                    key: 'value', // meaning lines, or { "rows": [...] }
  --ref <file>      a file with the same keys in a language the reviewer reads
  --title <text>    name shown at the top of the page
  --out <file>      where the review is written (default: <file>.review.json
                    in the current directory); an existing one is resumed
  --static <file>   write a standalone HTML page instead of serving one
  --no-open         do not open the browser
`;

function parseArgs(argv) {
  const args = { open: true };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--no-open') args.open = false;
    else if (arg === '--help' || arg === '-h') args.help = true;
    else if (['--ref', '--title', '--out', '--static'].includes(arg)) {
      i += 1;
      if (argv[i] === undefined) throw new Error(`${arg} needs a value`);
      args[arg.slice(2)] = argv[i];
    } else if (arg.startsWith('--')) throw new Error(`unknown option ${arg}`);
    else if (args.input) throw new Error('one file at a time');
    else args.input = arg;
  }
  return args;
}

/** JSON for a <script> block: nothing in it can close the block. */
const forScript = (value) =>
  JSON.stringify(value).replace(
    /[<\u2028\u2029]/g,
    (ch) => `\\u${ch.codePointAt(0).toString(16).padStart(4, '0')}`,
  );

const INVISIBLE = /[\u180A-\u180F\u202F\uFEFF]|\u200C|\u200D/g;
/** Pretty JSON with invisible characters written as escapes. */
const serialize = (value) =>
  `${JSON.stringify(value, null, 2).replace(
    INVISIBLE,
    (ch) => `\\u${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
  )}\n`;

function openInBrowser(url) {
  const [cmd, ...rest] =
    process.platform === 'darwin'
      ? ['open', url]
      : process.platform === 'win32'
        ? ['cmd', '/c', 'start', '', url]
        : ['xdg-open', url];
  spawn(cmd, rest, { stdio: 'ignore', detached: true })
    .on('error', () => {})
    .unref();
}

function report(review, out) {
  const { summary, items } = review;
  const lines = [
    `Review ${review.finished ? 'finished' : 'saved'}: ${out}`,
    `${summary.ok} correct, ${summary.wrong} wrong, ${summary.unsure} unsure, ${summary.unreviewed} not reviewed, of ${summary.total}.`,
  ];
  for (const item of items) {
    if (item.verdict !== 'wrong' && item.verdict !== 'unsure') continue;
    lines.push('', `${item.verdict.toUpperCase()}  ${item.key}`, `  now:        ${item.roman}`);
    if (item.correction) lines.push(`  correction: ${item.correction.roman}`);
    if (item.correctionAsTyped) lines.push(`  as typed:   ${item.correctionAsTyped}`);
    if (item.note) lines.push(`  note:       ${item.note.replace(/\n/g, '\n              ')}`);
  }
  return `${lines.join('\n')}\n`;
}

let args;
try {
  args = parseArgs(process.argv.slice(2));
  if (!args.help && !args.input) throw new Error('no file given');
} catch (e) {
  process.stderr.write(`${e.message}\n\n${USAGE}`);
  process.exit(2);
}
if (args.help) {
  process.stdout.write(USAGE);
  process.exit(0);
}

const template = readFileSync(
  fileURLToPath(new URL('../assets/review.html', import.meta.url)),
  'utf8',
);
const SLOT = /(<script id="review-data" type="application\/json">)[\s\S]*?(<\/script>)/;
const page = (data) => template.replace(SLOT, (_m, open, close) => open + forScript(data) + close);

const input = resolve(args.input);
const data = {
  input: { name: basename(input), content: readFileSync(input, 'utf8') },
  source: args.input,
};
if (args.title) data.title = args.title;
if (args.ref) {
  data.reference = { name: basename(args.ref), content: readFileSync(resolve(args.ref), 'utf8') };
}

if (args.static) {
  writeFileSync(resolve(args.static), page(data));
  process.stdout.write(`Wrote ${resolve(args.static)}\n`);
  if (args.open) openInBrowser(resolve(args.static));
  process.exit(0);
}

const out = resolve(args.out ?? `${basename(input)}.review.json`);
if (existsSync(out)) {
  try {
    data.saved = JSON.parse(readFileSync(out, 'utf8'));
  } catch {
    process.stderr.write(`${out} is not a review this page wrote; it will be overwritten.\n`);
  }
}
data.server = true;

const token = randomBytes(12).toString('hex');
const base = `/${token}/`;

function save(body) {
  const review = JSON.parse(body);
  if (typeof review.format !== 'string' || !review.format.startsWith('bichig-review/')) {
    throw new Error('not a review');
  }
  writeFileSync(`${out}.tmp`, serialize(review));
  renameSync(`${out}.tmp`, out);
  return review;
}

const server = createServer((req, res) => {
  const send = (status, body, type = 'application/json') => {
    res.writeHead(status, {
      'content-type': `${type}; charset=utf-8`,
      'cache-control': 'no-store',
    });
    res.end(body);
  };
  if (!req.url?.startsWith(base)) return send(404, '{}');
  const path = req.url.slice(base.length).split('?')[0];
  if (req.method === 'GET' && path === '') return send(200, page(data), 'text/html');
  if (req.method !== 'POST' || (path !== 'state' && path !== 'finish')) return send(404, '{}');

  let body = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 32e6) req.destroy();
  });
  req.on('end', () => {
    let review;
    try {
      review = save(body);
    } catch (e) {
      return send(400, JSON.stringify({ error: e.message }));
    }
    // A reload picks the review up from here.
    data.saved = review;
    send(200, JSON.stringify({ path: out }));
    if (path === 'finish') {
      process.stdout.write(`\n${report(review, out)}`);
      server.close();
      server.closeAllConnections();
    }
  });
});

server.listen(0, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${server.address().port}${base}`;
  process.stdout.write(
    `Review page: ${url}\nSaving to:   ${out}\nWaiting for the reviewer to press "Hand it back" (Ctrl+C to stop; what is saved so far stays).\n`,
  );
  if (args.open) openInBrowser(url);
});
