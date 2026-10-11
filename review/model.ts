/**
 * The review page's logic, free of the DOM so it can be tested: reading a
 * translation file into rows, turning a phrase of romanization into script
 * and back, and writing the review a person hands back to an agent.
 *
 * The page is `review/app.js`; the built, self-contained file is
 * `skills/bichig-review/assets/review.html` (`pnpm build:review`).
 */

import type { Diagnostic } from '@gege-mn/gege-linter';
import { applyFixes, lint } from '@gege-mn/gege-linter';
import { fromScript, harmonyOf, toScript } from '../src/index.js';

export const FORMAT = 'bichig-review/1';

export type Verdict = 'ok' | 'wrong' | 'unsure';

/** One string under review. */
export interface Row {
  key: string;
  /** Mongolian script, as the interface will show it. Empty when `error` is set. */
  text: string;
  /** Classical romanization: the file's own when it has one, else derived from `text`. */
  roman: string;
  /** What the string is meant to say, in a language the reviewer reads. */
  meaning?: string;
  /** Where it appears, or anything else worth knowing. */
  context?: string;
  /** Section of the file the string sits in. */
  group?: string;
  /** Why the value could not be turned into script. */
  error?: string;
}

/** What the reviewer said about a row before its text changed. */
export interface Previous {
  verdict: Verdict | null;
  roman: string;
  note?: string;
}

/** What the reviewer has said about one row. */
export interface Mark {
  verdict?: Verdict;
  /** The corrected spelling as typed: romanization or script. */
  fix?: string;
  note?: string;
  previous?: Previous;
}

export type Marks = Record<string, Mark>;

export interface Doc {
  title: string;
  source: string;
  rows: Row[];
}

export interface ReviewItem {
  key: string;
  text: string;
  roman: string;
  meaning?: string;
  verdict: Verdict | null;
  correction?: { text: string; roman: string };
  /** A correction the page could not turn into script, exactly as typed. */
  correctionAsTyped?: string;
  note?: string;
  /** Why the file's value could not be turned into script; `text` is then empty. */
  error?: string;
  lint?: Array<Pick<Diagnostic, 'rule' | 'severity' | 'message'>>;
}

export interface Review {
  format: typeof FORMAT;
  title: string;
  source: string;
  updatedAt: string;
  finished: boolean;
  summary: Record<Verdict | 'unreviewed' | 'total', number>;
  items: ReviewItem[];
}

const MONGOLIAN = /[\u1800-\u18AF]/;
/** Word separators. Not `\s`: that matches NNBSP, which sits inside a word. */
const SPACE = ' \\t\\r\\n\\u00A0\\u3000';
const SPACES = new RegExp(`([${SPACE}]+)`);
const IS_SPACE = new RegExp(`^[${SPACE}]$`);
/** `{name}`, `%s`, `<b>`: carried through untouched. */
const PLACEHOLDER = /^(\{[^}]*\}|%[\w.$-]+|<[^>]+>)[,.:?!]*$/;

const DIGIT_ZERO = 0x1810;
const PUNCT_TO_SCRIPT: Record<string, string> = { ',': '\u1802', '.': '\u1803', ':': '\u1804' };
const PUNCT_TO_ROMAN: Record<string, string> = {
  '\u1801': '\u2026',
  '\u1802': ',',
  '\u1803': '.',
  '\u1804': ':',
};
/** Invisible or out-of-place characters, named so they show up in a romanization. */
const MARKERS: Record<string, string> = {
  '\u202F': '_',
  '\u200C': '\u2039zwnj\u203A',
  '\u200D': '\u2039zwj\u203A',
};

const digitsToScript = (digits: string): string =>
  [...digits].map((d) => String.fromCodePoint(DIGIT_ZERO + Number(d))).join('');

function wordToScript(token: string): string {
  if (MONGOLIAN.test(token) || PLACEHOLDER.test(token)) return token;
  const tail = /[,.:?!]+$/.exec(token)?.[0] ?? '';
  const stem = token.slice(0, token.length - tail.length);
  const marks = [...tail].map((p) => PUNCT_TO_SCRIPT[p] ?? p).join('');
  if (/^\d+$/.test(stem)) return digitsToScript(stem) + marks;
  return toScript(stem) + marks;
}

/**
 * A phrase of Classical romanization → script. Words follow `toScript`; a
 * word may end in `,` `.` `:` (U+1802, U+1803, U+1804) or `?` `!`; a word of
 * digits becomes Mongolian digits; placeholders and anything already in
 * script pass through. Throws `RomanizationError` on a word that does not
 * romanize.
 */
export function phraseToScript(roman: string): string {
  return roman
    .split(SPACES)
    .map((part, i) => (i % 2 === 1 || part === '' ? part : wordToScript(part)))
    .join('');
}

function wordToRoman(token: string): string {
  const tail = /[\u1801-\u1804?!]+$/.exec(token)?.[0] ?? '';
  const stem = token.slice(0, token.length - tail.length);
  let out = '';
  for (const ch of fromScript(stem, harmonyOf(stem))) {
    const c = ch.codePointAt(0) ?? 0;
    if (c >= DIGIT_ZERO && c <= DIGIT_ZERO + 9) out += String(c - DIGIT_ZERO);
    else out += MARKERS[ch] ?? ch;
  }
  return out + [...tail].map((p) => PUNCT_TO_ROMAN[p] ?? p).join('');
}

/** Script → the romanization `phraseToScript` reads, word by word. */
export function scriptToRoman(text: string): string {
  return text
    .split(SPACES)
    .map((part, i) => (i % 2 === 1 || part === '' ? part : wordToRoman(part)))
    .join('');
}

export interface Word {
  text: string;
  /** Offsets into the phrase, in code points, as the linter counts them. */
  start: number;
  end: number;
}

export function splitWords(text: string): Word[] {
  const out: Word[] = [];
  let current = '';
  let start = 0;
  let i = 0;
  for (const ch of text) {
    if (IS_SPACE.test(ch)) {
      if (current) out.push({ text: current, start, end: i });
      current = '';
    } else {
      if (!current) start = i;
      current += ch;
    }
    i += 1;
  }
  if (current) out.push({ text: current, start, end: i });
  return out;
}

/** The linter's findings for a phrase; never throws. */
export function lintText(text: string): Diagnostic[] {
  if (!text) return [];
  try {
    return lint(text);
  } catch {
    return [];
  }
}

/** The phrase with every mechanical fix applied, or `undefined` when there is none. */
export function fixedText(text: string): string | undefined {
  const fixed = applyFixes(text, lintText(text));
  return fixed === text ? undefined : fixed;
}

/**
 * What a typed correction means. Script is taken as it is; anything else is
 * read as romanization.
 */
export function resolveFix(
  input: string,
): { text: string; roman: string } | { error: string } | undefined {
  const typed = input.trim();
  if (!typed) return undefined;
  try {
    const text = phraseToScript(typed);
    return { text, roman: MONGOLIAN.test(typed) ? scriptToRoman(text) : typed };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

type Extra = Pick<Row, 'meaning' | 'context' | 'group'>;

function makeRow(key: string, value: string, extra: Extra = {}): Row {
  const row: Row = { key, text: '', roman: '', ...extra };
  if (MONGOLIAN.test(value)) {
    row.text = value;
    row.roman = scriptToRoman(value);
    return row;
  }
  row.roman = value;
  try {
    row.text = phraseToScript(value);
  } catch (e) {
    row.error = e instanceof Error ? e.message : String(e);
  }
  return row;
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown): string | undefined => (typeof v === 'string' && v.trim() ? v : undefined);

/** Every string leaf of a JSON tree, keyed by its dotted path. `@key` entries are metadata. */
function flatten(node: unknown, prefix: string, out: Map<string, string>): Map<string, string> {
  if (typeof node === 'string') out.set(prefix, node);
  else if (Array.isArray(node)) {
    node.forEach((child, i) => {
      flatten(child, prefix ? `${prefix}.${i}` : String(i), out);
    });
  } else if (isRecord(node)) {
    for (const [k, child] of Object.entries(node)) {
      if (!k.startsWith('@')) flatten(child, prefix ? `${prefix}.${k}` : k, out);
    }
  }
  return out;
}

const SOURCE_LINE =
  /^\s*(?:(['"`])([^'"`]+)\1|([A-Za-z_$][\w$]*))\s*[:=]\s*(['"`])((?:\\.|(?!\4).)*)\4\s*[,;]?\s*(?:\/\/\s*(.*?)\s*)?$/;
const COMMENT_LINE = /^\s*\/\/\s*(.*?)\s*$/;

function unescapeLiteral(value: string): string {
  return value.replace(/\\(u\{([0-9a-fA-F]+)\}|u([0-9a-fA-F]{4})|.)/g, (_m, all, braced, four) => {
    if (braced || four) return String.fromCodePoint(Number.parseInt(braced ?? four, 16));
    return all === 'n' ? '\n' : all === 't' ? '\t' : all;
  });
}

/**
 * A source file that keeps its strings one per line, `key: 'value', // meaning`.
 * A comment on a line of its own names the section that follows.
 */
function parseSource(content: string): Row[] {
  const rows: Row[] = [];
  let group: string | undefined;
  for (const line of content.split('\n')) {
    const m = SOURCE_LINE.exec(line);
    if (m) {
      const extra: Extra = {};
      if (m[6]) extra.meaning = m[6];
      if (group) extra.group = group;
      rows.push(makeRow(m[2] ?? m[3] ?? '', unescapeLiteral(m[5] ?? ''), extra));
      continue;
    }
    const comment = COMMENT_LINE.exec(line);
    if (comment?.[1]) group = comment[1];
  }
  return rows;
}

function uniqueKeys(rows: Row[]): Row[] {
  const seen = new Map<string, number>();
  for (const row of rows) {
    const n = (seen.get(row.key) ?? 0) + 1;
    seen.set(row.key, n);
    if (n > 1) row.key = `${row.key}#${n}`;
  }
  return rows;
}

const baseName = (name: string): string => name.split(/[\\/]/).pop() || name;

export interface Parsed {
  doc: Doc;
  /** Present when the file was itself a review: the marks to pick up from. */
  saved?: Review;
}

/**
 * Read a file into rows. Understood, in this order: a review written by this
 * page; `{ rows: [{ key, text | roman, meaning?, context?, group? }] }`; any
 * JSON tree of strings; a source file of `key: 'value', // meaning` lines. A
 * value in Latin letters is read as romanization.
 */
export function parseInput(name: string, content: string): Parsed {
  const fallback = { title: baseName(name), source: name };
  let json: unknown;
  try {
    json = JSON.parse(content);
  } catch {
    return { doc: { ...fallback, rows: uniqueKeys(parseSource(content)) } };
  }
  if (!isRecord(json)) {
    return { doc: { ...fallback, rows: uniqueKeys(rowsOfTree(json, undefined)) } };
  }
  const head = {
    title: str(json.title) ?? fallback.title,
    source: str(json.source) ?? fallback.source,
  };
  const list = Array.isArray(json.items) ? json.items : Array.isArray(json.rows) ? json.rows : null;
  if (list?.every((r) => isRecord(r) && typeof r.key === 'string')) {
    const rows = (list as Record<string, unknown>[]).map((r) => {
      const extra: Extra = {};
      const meaning = str(r.meaning);
      const context = str(r.context);
      const group = str(r.group);
      if (meaning) extra.meaning = meaning;
      if (context) extra.context = context;
      if (group) extra.group = group;
      const text = str(r.text);
      const roman = str(r.roman);
      const row = makeRow(String(r.key), text ?? roman ?? '', extra);
      // The file's own romanization is the one the reviewer should read.
      if (text && roman) row.roman = roman;
      return row;
    });
    const parsed: Parsed = { doc: { ...head, rows: uniqueKeys(rows) } };
    if (json.format === FORMAT) parsed.saved = json as unknown as Review;
    return parsed;
  }
  return { doc: { ...fallback, rows: uniqueKeys(rowsOfTree(json, json)) } };
}

function rowsOfTree(json: unknown, root: Record<string, unknown> | undefined): Row[] {
  return [...flatten(json, '', new Map())].map(([key, value]) => {
    // ARB keeps a string's description beside it, under `@key`.
    const meta = root?.[`@${key}`];
    const context = isRecord(meta) ? str(meta.description) : undefined;
    return makeRow(key, value, context ? { context } : {});
  });
}

/**
 * Meanings from a second file with the same keys (the English or Cyrillic
 * locale). Returns how many rows it matched.
 */
export function applyReference(doc: Doc, content: string): number {
  const byKey = new Map<string, string>();
  try {
    flatten(JSON.parse(content), '', byKey);
  } catch {
    // Not JSON: a source file, whose values are taken as written.
    for (const line of content.split('\n')) {
      const m = SOURCE_LINE.exec(line);
      if (m) byKey.set(m[2] ?? m[3] ?? '', unescapeLiteral(m[5] ?? ''));
    }
  }
  let matched = 0;
  for (const row of doc.rows) {
    const meaning = byKey.get(row.key);
    if (meaning === undefined) continue;
    row.meaning = meaning;
    matched += 1;
  }
  return matched;
}

/**
 * Pick a review back up. A verdict holds only while the text it was given to
 * is unchanged; a row whose text has changed comes back unreviewed, carrying
 * what was said about it before.
 */
export function restoreMarks(doc: Doc, saved: Review | undefined): Marks {
  const marks: Marks = {};
  if (!saved || !Array.isArray(saved.items)) return marks;
  const byKey = new Map(saved.items.map((item) => [item.key, item]));
  for (const row of doc.rows) {
    const item = byKey.get(row.key);
    if (!item) continue;
    const note = str(item.note);
    if (item.text === row.text) {
      const mark: Mark = {};
      if (item.verdict) mark.verdict = item.verdict;
      const fix = item.correction?.roman ?? item.correctionAsTyped;
      if (fix) mark.fix = fix;
      if (note) mark.note = note;
      if (Object.keys(mark).length) marks[row.key] = mark;
    } else if (item.verdict || note) {
      const previous: Previous = { verdict: item.verdict ?? null, roman: item.roman };
      if (note) previous.note = note;
      marks[row.key] = { previous };
    }
  }
  return marks;
}

export function summarize(doc: Doc, marks: Marks): Review['summary'] {
  const summary = { total: doc.rows.length, ok: 0, wrong: 0, unsure: 0, unreviewed: 0 };
  for (const row of doc.rows) summary[marks[row.key]?.verdict ?? 'unreviewed'] += 1;
  return summary;
}

/** The review, as handed back: one item per row, in the file's order. */
export function buildReview(doc: Doc, marks: Marks, finished: boolean, now = new Date()): Review {
  const items = doc.rows.map((row) => {
    const mark = marks[row.key] ?? {};
    const item: ReviewItem = {
      key: row.key,
      text: row.text,
      roman: row.roman,
      verdict: mark.verdict ?? null,
    };
    if (row.meaning) item.meaning = row.meaning;
    if (row.error) item.error = row.error;
    const fix = resolveFix(mark.fix ?? '');
    if (fix && 'error' in fix) item.correctionAsTyped = (mark.fix ?? '').trim();
    else if (fix && fix.text !== row.text) item.correction = fix;
    const note = str(mark.note)?.trim();
    if (note) item.note = note;
    const findings = lintText(row.text);
    if (findings.length) {
      item.lint = findings.map(({ rule, severity, message }) => ({ rule, severity, message }));
    }
    return item;
  });
  return {
    format: FORMAT,
    title: doc.title,
    source: doc.source,
    updatedAt: now.toISOString(),
    finished,
    summary: summarize(doc, marks),
    items,
  };
}

/** JSON whose invisible characters are written as escapes, so the file can be read and diffed. */
export function serialize(value: unknown): string {
  return `${JSON.stringify(value, null, 2).replace(
    /[\u180A-\u180F\u202F\uFEFF]|\u200C|\u200D/g,
    (ch) => `\\u${(ch.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, '0')}`,
  )}\n`;
}
