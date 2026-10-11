// The review page. One file of plain DOM code, bundled with the romanizer and
// the linter into skills/bichig-review/assets/review.html (`pnpm build:review`).
// Everything that can be tested without a browser lives in model.ts.

import { fromScript } from '../src/index.js';
import {
  applyReference,
  buildReview,
  fixedText,
  lintText,
  parseInput,
  phraseToScript,
  resolveFix,
  restoreMarks,
  scriptToRoman,
  serialize,
  splitWords,
  summarize,
} from './model.js';

const $ = (id) => document.getElementById(id);

function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  el.append(...kids.flat().filter((kid) => kid != null && kid !== false));
  return el;
}

const VERDICTS = [
  { id: 'ok', label: 'Correct', key: 'A', sign: '✓' },
  { id: 'wrong', label: 'Wrong', key: 'X', sign: '✕' },
  { id: 'unsure', label: 'Unsure', key: 'U', sign: '?' },
];
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'todo', label: 'To review' },
  { id: 'wrong', label: 'Wrong' },
  { id: 'unsure', label: 'Unsure' },
  { id: 'ok', label: 'Correct' },
  { id: 'lint', label: 'Linter' },
];
/** Letters of the romanization a keyboard does not have. */
const LETTERS = ['ö', 'ü', 'γ', 'ǰ', 'č', 'š'];
const CONTROL_NAMES = {
  6154: 'NIRUGU',
  6155: 'FVS1',
  6156: 'FVS2',
  6157: 'FVS3',
  6158: 'MVS',
  6159: 'FVS4',
  8204: 'ZWNJ',
  8205: 'ZWJ',
  8239: 'NNBSP',
};

const S = {
  /** @type {import('./model.js').Doc | null} */
  doc: null,
  /** @type {import('./model.js').Marks} */
  marks: {},
  filter: 'all',
  query: '',
  current: '',
  showCodePoints: false,
  server: false,
  finished: false,
  celebrated: false,
};
const lintCache = new Map();
const findingsOf = (row) => {
  if (!lintCache.has(row.key)) lintCache.set(row.key, lintText(row.text));
  return lintCache.get(row.key);
};
const markOf = (key) => S.marks[key] ?? {};
const currentRow = () => S.doc?.rows.find((r) => r.key === S.current);

// ---------------------------------------------------------------- saving

const storageKey = () => `bichig-review:${S.doc.source}`;
let saveTimer = 0;

function setSaveState(text, bad = false) {
  const el = $('save-state');
  el.textContent = text;
  el.classList.toggle('bad', bad);
}

async function send(path, finished) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: serialize(buildReview(S.doc, S.marks, finished)),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function persist() {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(buildReview(S.doc, S.marks, false)));
  } catch {
    // Private windows and file pages may have no storage; the review still exports.
  }
  if (!S.server) {
    setSaveState('Kept in this browser');
    return;
  }
  setSaveState('Saving…');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await send('state', false);
      setSaveState('Saved');
    } catch {
      sessionLost();
    }
  }, 350);
}

function sessionLost() {
  S.server = false;
  setSaveState('The session has ended: download the review when you finish', true);
}

// ------------------------------------------------------------- the list

function matches(row) {
  const mark = markOf(row.key);
  if (S.filter === 'todo' && mark.verdict) return false;
  if (['ok', 'wrong', 'unsure'].includes(S.filter) && mark.verdict !== S.filter) return false;
  if (S.filter === 'lint' && !row.error && findingsOf(row).length === 0) return false;
  if (!S.query) return true;
  const hay = [row.key, row.meaning, row.roman, row.context, row.text].join('\n').toLowerCase();
  return hay.includes(S.query.toLowerCase());
}

/** The rows on show. The open row stays even when it no longer matches, so it never vanishes mid-edit. */
const visibleRows = () => S.doc.rows.filter((row) => row.key === S.current || matches(row));

function renderFilters() {
  const count = (id) => {
    const keep = S.filter;
    S.filter = id;
    const query = S.query;
    S.query = '';
    const n = S.doc.rows.filter(matches).length;
    S.filter = keep;
    S.query = query;
    return n;
  };
  $('filters').replaceChildren(
    ...FILTERS.map((f) =>
      h(
        'button',
        {
          type: 'button',
          class: 'chip',
          'aria-pressed': String(S.filter === f.id),
          onclick: () => {
            S.filter = f.id;
            renderFilters();
            renderList();
            if (!currentRow() || !matches(currentRow())) select(visibleRows()[0]?.key ?? S.current);
          },
        },
        f.label,
        h('span', { class: 'n', text: String(count(f.id)) }),
      ),
    ),
  );
}

function renderList() {
  const rows = visibleRows();
  const items = [];
  let group;
  for (const row of rows) {
    if (row.group && row.group !== group) items.push(h('li', { class: 'group', text: row.group }));
    group = row.group;
    const mark = markOf(row.key);
    const flagged = row.error || findingsOf(row).some((d) => d.severity !== 'info');
    items.push(
      h(
        'li',
        {},
        h(
          'button',
          {
            type: 'button',
            class: 'row',
            'data-key': row.key,
            'aria-current': row.key === S.current ? 'true' : null,
            onclick: () => select(row.key),
          },
          h('span', {
            class: `dot ${mark.verdict ?? 'todo'}`,
            title: mark.verdict ?? 'not reviewed',
          }),
          h(
            'span',
            { class: 'row-text' },
            h('span', { class: 'row-main', text: row.meaning || row.roman || row.key }),
            h('span', { class: 'row-key', text: row.key }),
          ),
          flagged &&
            h('span', { class: 'flag', title: 'The linter has something to say', text: '!' }),
        ),
      ),
    );
  }
  if (rows.length === 0) items.push(h('li', { class: 'none', text: 'Nothing matches.' }));
  $('list').replaceChildren(...items);
  $('list').querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest' });
}

function renderProgress() {
  const s = summarize(S.doc, S.marks);
  const done = s.total - s.unreviewed;
  for (const v of ['ok', 'wrong', 'unsure']) {
    $(`meter-${v}`).style.width = `${s.total ? (s[v] / s.total) * 100 : 0}%`;
  }
  $('progress-text').textContent = `${done} of ${s.total} reviewed`;
  $('meter').setAttribute('aria-valuenow', String(done));
  $('meter').setAttribute('aria-valuemax', String(s.total));
  $('btn-finish').classList.toggle('ready', s.unreviewed === 0);
  if (s.unreviewed === 0 && s.total > 0 && !S.celebrated) {
    S.celebrated = true;
    openFinish();
  }
  if (s.unreviewed > 0) S.celebrated = false;
}

// ------------------------------------------------------------ the stage

function codePointChips(word) {
  return [...word].map((ch) => {
    const c = ch.codePointAt(0);
    const control = CONTROL_NAMES[c];
    const roman = control ? '' : c === 0x182c ? 'q / k' : c === 0x182d ? 'γ / g' : fromScript(ch);
    return h(
      'span',
      { class: `cp${control ? ' control' : ''}` },
      h('span', { class: 'cp-glyph', text: control ?? ch }),
      h('span', { class: 'cp-code', text: `U+${c.toString(16).toUpperCase().padStart(4, '0')}` }),
      h('span', { class: 'cp-roman', text: roman === ch ? '' : roman }),
    );
  });
}

/** Which words of `after` are not carried over from `before`: those outside their longest common subsequence. */
function changedWords(before, after) {
  const a = before.map((w) => w.text);
  const b = after.map((w) => w.text);
  const lcs = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const changed = new Set();
  let i = 0;
  let j = 0;
  while (j < b.length) {
    if (i < a.length && a[i] === b[j]) {
      i += 1;
      j += 1;
    } else if (i < a.length && lcs[i + 1][j] >= lcs[i][j + 1]) i += 1;
    else {
      changed.add(j);
      j += 1;
    }
  }
  return changed;
}

/** The words of a phrase, each standing under its romanization. */
function wordColumns(text, roman, findings = [], before = null) {
  const words = splitWords(text);
  const fresh = before === null ? new Set() : changedWords(splitWords(before), words);
  const romans = splitWords(roman);
  const aligned = romans.length === words.length;
  return h(
    'div',
    { class: 'words' },
    words.map((word, i) => {
      const hit = findings.filter(
        (d) =>
          (d.start < word.end && d.end > word.start) ||
          (d.start === d.end && d.start >= word.start && d.start <= word.end),
      );
      const severity =
        ['error', 'warning', 'info'].find((level) => hit.some((d) => d.severity === level)) ?? '';
      return h(
        'div',
        {
          class: `word ${severity}${fresh.has(i) ? ' changed' : ''}`,
          title: hit.map((d) => d.message).join('\n') || null,
        },
        h('span', {
          class: 'word-roman',
          text: aligned ? romans[i].text : scriptToRoman(word.text),
        }),
        h('span', { class: 'mn word-script', lang: 'mn-Mong', text: word.text }),
      );
    }),
  );
}

function renderStage() {
  const stage = $('stage');
  const row = currentRow();
  if (!row) {
    stage.replaceChildren(h('p', { class: 'none', text: 'Nothing matches this filter.' }));
    return;
  }
  const rows = visibleRows();
  const index = rows.indexOf(row);
  const mark = markOf(row.key);
  const findings = findingsOf(row);
  const mechanical = row.text ? fixedText(row.text) : undefined;

  const head = h(
    'div',
    { class: 'head' },
    h('span', { class: 'pos', text: `${index + 1} / ${rows.length}` }),
    h('code', { class: 'key', text: row.key }),
    row.group && h('span', { class: 'group-name', text: row.group }),
  );
  const meaning = h(
    'div',
    { class: 'meaning' },
    h('p', {
      class: row.meaning ? 'meaning-text' : 'meaning-text missing',
      text: row.meaning || 'No meaning given for this string',
    }),
    row.context && h('p', { class: 'context', text: row.context }),
  );
  const previous =
    mark.previous &&
    h(
      'p',
      { class: 'previous' },
      h('strong', { text: 'Changed since your last review. ' }),
      `It read `,
      h('code', { text: mark.previous.roman }),
      mark.previous.verdict ? ` and you marked it ${mark.previous.verdict}` : '',
      mark.previous.note ? `: “${mark.previous.note}”` : '.',
    );

  const script = row.error
    ? h(
        'div',
        { class: 'unreadable' },
        h('p', { text: 'This value could not be turned into script.' }),
        h('code', { text: row.roman }),
        h('p', { class: 'bad', text: row.error }),
      )
    : h(
        'div',
        { class: 'script' },
        wordColumns(row.text, row.roman, findings),
        h(
          'figure',
          { class: 'running' },
          h('figcaption', { text: 'As running text' }),
          h('div', { class: 'mn', lang: 'mn-Mong', text: row.text }),
        ),
      );

  const codePoints =
    S.showCodePoints &&
    !row.error &&
    h(
      'div',
      { class: 'cps' },
      splitWords(row.text).map((word) =>
        h(
          'div',
          { class: 'cp-word' },
          h('span', { class: 'cp-word-roman', text: scriptToRoman(word.text) }),
          codePointChips(word.text),
        ),
      ),
    );

  const lintList =
    findings.length > 0 &&
    h(
      'div',
      { class: 'lint' },
      h('h3', { text: 'Linter' }),
      h(
        'ul',
        {},
        findings.map((d) =>
          h('li', { class: d.severity }, h('code', { text: d.rule }), ` ${d.message}`),
        ),
      ),
      mechanical &&
        h('button', {
          type: 'button',
          class: 'link',
          onclick: () => useFix(mechanical),
          text: 'Use the mechanical fix as the correction',
        }),
    );

  const verdicts = h(
    'div',
    { class: 'verdicts', role: 'group', 'aria-label': 'Verdict' },
    VERDICTS.map((v) =>
      h(
        'button',
        {
          type: 'button',
          class: `verdict ${v.id}`,
          'data-verdict': v.id,
          onclick: () => setVerdict(v.id, true),
        },
        h('span', { class: 'sign', text: v.sign }),
        v.label,
        h('kbd', { text: v.key }),
      ),
    ),
  );

  const fixInput = h('textarea', {
    id: 'fix',
    rows: '1',
    spellcheck: 'false',
    autocomplete: 'off',
    autocapitalize: 'off',
    placeholder: 'Romanization, or paste script',
    oninput: (e) => {
      const m = touch(row.key);
      m.fix = e.target.value;
      grow(e.target);
      if (m.fix.trim() && !m.verdict) m.verdict = 'wrong';
      changed(row.key);
    },
  });
  fixInput.value = mark.fix ?? '';
  const letters = h(
    'span',
    { class: 'letters', 'aria-label': 'Insert a letter' },
    LETTERS.map((letter) =>
      h('button', {
        type: 'button',
        tabindex: '-1',
        text: letter,
        // Keep the caret where it is.
        onmousedown: (e) => e.preventDefault(),
        onclick: () => {
          fixInput.focus();
          fixInput.setRangeText(letter, fixInput.selectionStart, fixInput.selectionEnd, 'end');
          fixInput.dispatchEvent(new Event('input'));
        },
      }),
    ),
  );
  const noteInput = h('textarea', {
    id: 'note',
    rows: '2',
    placeholder: 'What is wrong, or what you are unsure of',
    oninput: (e) => {
      const m = touch(row.key);
      m.note = e.target.value;
      if (m.note.trim() && !m.verdict) m.verdict = 'unsure';
      changed(row.key);
    },
  });
  noteInput.value = mark.note ?? '';

  const fields = h(
    'div',
    { class: 'fields' },
    h(
      'div',
      { class: 'field' },
      h('label', { for: 'fix', text: 'Correct spelling' }),
      h('div', { class: 'fix-line' }, fixInput, letters),
      h('div', { id: 'fix-preview' }),
    ),
    h('div', { class: 'field' }, h('label', { for: 'note', text: 'Note' }), noteInput),
  );

  const nav = h(
    'div',
    { class: 'nav' },
    h(
      'button',
      { type: 'button', class: 'ghost', disabled: index <= 0, onclick: () => step(-1) },
      '← Previous',
      h('kbd', { text: 'K' }),
    ),
    h(
      'button',
      {
        type: 'button',
        class: 'ghost',
        disabled: index >= rows.length - 1,
        onclick: () => step(1),
      },
      'Next →',
      h('kbd', { text: 'J' }),
    ),
    h(
      'button',
      {
        type: 'button',
        class: 'ghost push',
        'aria-pressed': String(S.showCodePoints),
        onclick: toggleCodePoints,
      },
      'Code points',
      h('kbd', { text: 'C' }),
    ),
  );

  stage.replaceChildren(
    ...[
      head,
      meaning,
      previous,
      script,
      codePoints,
      lintList,
      h('div', { class: 'decide' }, verdicts, fields),
      nav,
    ].filter(Boolean),
  );
  stage.scrollTop = 0;
  grow(fixInput);
  syncVerdicts();
  renderFixPreview();
}

/** A field as tall as what is written in it. */
function grow(field) {
  field.style.height = 'auto';
  field.style.height = `${field.scrollHeight + 2}px`;
}

function setFix(text) {
  const field = $('fix');
  field.value = text;
  grow(field);
}

function syncVerdicts() {
  const verdict = markOf(S.current).verdict;
  for (const button of document.querySelectorAll('.verdict')) {
    button.setAttribute('aria-pressed', String(button.dataset.verdict === verdict));
  }
}

function renderFixPreview() {
  const row = currentRow();
  const box = $('fix-preview');
  if (!row || !box) return;
  const fix = resolveFix(markOf(row.key).fix ?? '');
  if (!fix) {
    box.replaceChildren();
  } else if ('error' in fix) {
    box.replaceChildren(h('p', { class: 'bad', text: fix.error }));
  } else if (fix.text === row.text) {
    box.replaceChildren(
      h('p', { class: 'dim', text: 'The same as the current spelling: edit it to correct it.' }),
    );
  } else {
    const findings = lintText(fix.text);
    box.replaceChildren(
      wordColumns(fix.text, fix.roman, findings, row.text),
      findings.length
        ? h(
            'ul',
            { class: 'lint-inline' },
            findings.map((d) =>
              h('li', { class: d.severity }, h('code', { text: d.rule }), ` ${d.message}`),
            ),
          )
        : h('p', { class: 'good', text: 'The linter finds nothing wrong with it.' }),
    );
  }
}

// -------------------------------------------------------------- actions

function touch(key) {
  S.marks[key] ??= {};
  return S.marks[key];
}

/** After any change to a mark: tidy it, redraw what shows it, save. */
function changed(key) {
  const mark = S.marks[key];
  if (mark && !mark.verdict && !mark.fix?.trim() && !mark.note?.trim() && !mark.previous)
    delete S.marks[key];
  renderFilters();
  renderList();
  syncVerdicts();
  renderFixPreview();
  persist();
  renderProgress();
}

function select(key, focus) {
  if (!key) return;
  S.current = key;
  renderList();
  renderStage();
  if (focus) $(focus)?.focus();
}

function step(delta) {
  const rows = visibleRows();
  const next = rows[rows.findIndex((r) => r.key === S.current) + delta];
  if (next) select(next.key);
}

/** On to the next string that still needs a verdict, if there is one. */
function advance() {
  const rows = visibleRows();
  const at = rows.findIndex((r) => r.key === S.current);
  const waiting = (r) => !markOf(r.key).verdict;
  const next = rows.slice(at + 1).find(waiting) ?? rows.slice(0, at).find(waiting) ?? rows[at + 1];
  if (next) select(next.key);
  else {
    renderList();
    renderStage();
  }
}

function setVerdict(verdict, fromButton) {
  const row = currentRow();
  if (!row) return;
  const mark = touch(row.key);
  // Pressing the standing verdict again takes it back.
  if (fromButton && mark.verdict === verdict) delete mark.verdict;
  else mark.verdict = verdict;
  if (mark.verdict === 'wrong' && !mark.fix?.trim() && !row.error) {
    // Most corrections change a letter or two: start from what is there.
    mark.fix = row.roman;
    setFix(mark.fix);
  }
  changed(row.key);
  if (mark.verdict === 'ok') advance();
  else if (mark.verdict === 'wrong') $('fix')?.focus();
  else if (mark.verdict === 'unsure') $('note')?.focus();
}

function useFix(text) {
  const row = currentRow();
  const mark = touch(row.key);
  const roman = scriptToRoman(text);
  let roundTrips = false;
  try {
    roundTrips = phraseToScript(roman) === text;
  } catch {
    roundTrips = false;
  }
  mark.fix = roundTrips ? roman : text;
  mark.verdict = 'wrong';
  setFix(mark.fix);
  changed(row.key);
  $('fix').focus();
}

function toggleCodePoints() {
  S.showCodePoints = !S.showCodePoints;
  const focused = document.activeElement?.id;
  renderStage();
  if (focused) $(focused)?.focus();
}

// ------------------------------------------------------------ finishing

function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  h('a', { href: url, download: name }).click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openFinish() {
  const s = summarize(S.doc, S.marks);
  $('finish-counts').replaceChildren(
    ...[
      ['ok', 'correct'],
      ['wrong', 'wrong'],
      ['unsure', 'unsure'],
      ['unreviewed', 'not reviewed'],
    ].map(([id, label]) =>
      h('li', { class: id }, h('strong', { text: String(s[id]) }), ` ${label}`),
    ),
  );
  $('finish-warning').hidden = s.unreviewed === 0;
  $('finish-warning').textContent =
    s.unreviewed === 1
      ? '1 string has no verdict yet.'
      : `${s.unreviewed} strings have no verdict yet.`;
  $('finish-server').hidden = !S.server;
  $('finish-local').hidden = S.server;
  $('finish-status').textContent = '';
  if (!$('finish').open) $('finish').showModal();
}

async function finishOnServer() {
  $('finish-status').textContent = 'Handing the review back…';
  clearTimeout(saveTimer);
  try {
    const { path } = await send('finish', true);
    S.finished = true;
    $('finish').close();
    $('app').hidden = true;
    $('done-path').textContent = path ?? '';
    $('done').hidden = false;
  } catch {
    sessionLost();
    openFinish();
    $('finish-status').textContent = 'The session has ended. Download the review instead.';
  }
}

function reviewJson() {
  return serialize(buildReview(S.doc, S.marks, true));
}

// ------------------------------------------------------------- keyboard

function onKey(e) {
  if (!S.doc || S.finished || e.metaKey || e.ctrlKey || e.altKey) return;
  if (document.querySelector('dialog[open]')) return;
  const target = e.target;
  const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
  if (typing) {
    if (e.key === 'Escape') target.blur();
    else if (e.key === 'Enter' && !e.shiftKey && target.id !== 'search') {
      e.preventDefault();
      target.blur();
      advance();
    } else if (e.key === 'Enter' && target.id === 'search') {
      target.blur();
    }
    return;
  }
  const onControl = target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const actions = {
    j: () => step(1),
    ArrowDown: () => step(1),
    k: () => step(-1),
    ArrowUp: () => step(-1),
    a: () => setVerdict('ok'),
    Enter: () => !onControl && setVerdict('ok'),
    x: () => setVerdict('wrong'),
    u: () => setVerdict('unsure'),
    n: () => $('note')?.focus(),
    c: toggleCodePoints,
    '/': () => $('search').focus(),
    '?': () => $('help').showModal(),
  };
  const action = actions[key];
  if (!action || (key === 'Enter' && onControl)) return;
  e.preventDefault();
  action();
}

// -------------------------------------------------------------- loading

function start(parsed, options = {}) {
  const { doc } = parsed;
  if (doc.rows.length === 0) throw new Error(`No strings found in ${doc.source}.`);
  if (options.title) doc.title = options.title;
  if (options.source) doc.source = options.source;
  S.doc = doc;
  S.server = Boolean(options.server);
  lintCache.clear();
  let saved = parsed.saved ?? options.saved;
  if (!saved) {
    try {
      saved = JSON.parse(localStorage.getItem(storageKey()) ?? 'null') ?? undefined;
    } catch {
      saved = undefined;
    }
  }
  S.marks = restoreMarks(doc, saved);
  // Do not greet a finished review with the finish dialog.
  S.celebrated = summarize(doc, S.marks).unreviewed === 0;
  document.title = `${doc.title} · bichig review`;
  $('title').textContent = doc.title;
  $('source').textContent = doc.source === doc.title ? '' : doc.source;
  $('empty').hidden = true;
  $('app').hidden = false;
  setSaveState(S.server ? 'Saved' : 'Kept in this browser');
  renderFilters();
  renderProgress();
  const first = doc.rows.find((r) => !markOf(r.key).verdict) ?? doc.rows[0];
  select(first.key);
}

function fail(message) {
  $('empty-error').textContent = message;
  $('empty').hidden = false;
  $('app').hidden = true;
}

async function openFiles(files) {
  const [file] = files;
  if (!file) return;
  try {
    start(parseInput(file.name, await file.text()));
  } catch (e) {
    fail(e.message);
  }
}

async function addReference(file) {
  if (!file || !S.doc) return;
  const matched = applyReference(S.doc, await file.text());
  setSaveState(
    matched ? `Meanings added to ${matched} strings` : `No key of ${file.name} matches`,
    !matched,
  );
  renderList();
  renderStage();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} answered ${res.status}.`);
  return res.text();
}

async function boot() {
  const injected = JSON.parse($('review-data').textContent || 'null');
  const query = new URLSearchParams(location.search);
  try {
    if (injected?.input) {
      const parsed = parseInput(injected.input.name, injected.input.content);
      if (injected.reference) applyReference(parsed.doc, injected.reference.content);
      start(parsed, injected);
    } else if (query.get('url')) {
      const url = query.get('url');
      const parsed = parseInput(url, await fetchText(url));
      if (query.get('ref')) applyReference(parsed.doc, await fetchText(query.get('ref')));
      start(parsed, { title: query.get('title') });
    } else {
      $('empty').hidden = false;
    }
  } catch (e) {
    fail(
      e instanceof TypeError
        ? 'The file could not be fetched. Its server has to allow other sites to read it (CORS); otherwise download it and drop it here.'
        : e.message,
    );
  }
}

function wire() {
  document.addEventListener('keydown', onKey);
  $('search').addEventListener('input', (e) => {
    S.query = e.target.value.trim();
    renderList();
  });
  $('btn-list').addEventListener('click', () => $('app').classList.toggle('show-list'));
  $('list').addEventListener('click', () => $('app').classList.remove('show-list'));
  $('btn-help').addEventListener('click', () => $('help').showModal());
  $('btn-finish').addEventListener('click', openFinish);
  $('btn-ref').addEventListener('click', () => $('ref-file').click());
  $('ref-file').addEventListener('change', (e) => addReference(e.target.files[0]));
  $('finish-send').addEventListener('click', finishOnServer);
  $('finish-download').addEventListener('click', () =>
    download(`${S.doc.title}.review.json`, reviewJson()),
  );
  $('finish-copy').addEventListener('click', async () => {
    await navigator.clipboard.writeText(reviewJson());
    $('finish-status').textContent = 'Copied.';
  });
  for (const button of document.querySelectorAll('[data-close]')) {
    button.addEventListener('click', () => button.closest('dialog').close());
  }

  $('pick').addEventListener('click', () => $('file').click());
  $('file').addEventListener('change', (e) => openFiles(e.target.files));
  const empty = $('empty');
  for (const type of ['dragenter', 'dragover']) {
    document.addEventListener(type, (e) => {
      e.preventDefault();
      empty.classList.add('over');
    });
  }
  document.addEventListener('dragleave', () => empty.classList.remove('over'));
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    empty.classList.remove('over');
    if (S.doc) addReference(e.dataTransfer.files[0]);
    else openFiles(e.dataTransfer.files);
  });
  document.addEventListener('paste', (e) => {
    if (S.doc) return;
    const text = e.clipboardData.getData('text');
    if (!text.trim()) return;
    try {
      start(parseInput('Pasted text', text));
    } catch (err) {
      fail(err.message);
    }
  });
}

wire();
boot();
