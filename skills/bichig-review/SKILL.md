---
name: bichig-review
description: Put an app's traditional Mongolian script (Mongol bichig) interface strings in front of a human reader for review, then apply what they say. Opens a bundled local review page — each string drawn vertically in the pinned font, word by word under its Classical romanization, with its meaning, code points and gege-linter findings — where the reader marks every string correct / wrong / unsure, types corrections and notes, and hands the result back as JSON. Use when the user asks to review, proofread, check or sign off Mongolian-script UI text, translation or locale files (JSON, ARB, romanized source such as a text.ts), or says "review the bichig strings", "let me check the UI text", "open the translation review".
license: MIT
---

# bichig-review — a human reviews the strings, the agent applies the result

Whether a Mongol bichig spelling is right is a reader's judgement. An agent
cannot make it and must not guess at it: text can pass every encoding check and
still be misspelled. This skill is the loop that gets that judgement:

1. find the strings and open them in the review page,
2. wait while the reader goes through them,
3. read the review they hand back and apply it.

Everything runs locally. The page is one self-contained file
(`assets/review.html`: font, romanizer and linter inside, no network), served
by `scripts/review.mjs`, which needs only Node 18+.

Encoding questions belong to the **mongol-bichig** skill, linting to the
**gege-linter** skill. This one is about spelling and wording.

## Run a review

```sh
node <this-skill>/scripts/review.mjs <file> [--ref <file>] [--title <text>] [--out <review.json>]
```

- `<file>`: the strings. See "What the page can read".
- `--ref`: a file with the same keys in a language the reader knows (the
  English or Cyrillic locale). Its values become each string's meaning. A
  reader without the meaning cannot tell a wrong word from a right one, so
  always supply meanings, here or in the rows.
- `--title`: the name at the top of the page, e.g. the app's name.
- `--out`: where the review is saved. Default `<file>.review.json` in the
  current directory. If the file exists the review **resumes** from it.

**Run it in the background and wait.** The command opens the browser, saves
the review to `--out` after every change, and exits only when the reader
presses "Hand it back", printing a summary: every string marked wrong or
unsure, with its romanization, correction and note. A review takes a person
minutes to hours. Tell the user the page is open and stop; do not poll, do not
time out, do not open the page a second time. If the process is killed, what
was saved so far is still in `--out`.

`--no-open` prints the address without opening a browser. `--static out.html`
writes a standalone page with the strings inside instead of serving one: the
reader then downloads the review from the page and gives the file back by
hand. Use it only when the reader is on another machine.

## What the page can read

In this order:

1. **A review it wrote** (`--out` from an earlier round): picks up where it
   stopped.
2. **Prepared rows**: `{ "title": "...", "rows": [ { "key", "text" | "roman",
   "meaning"?, "context"?, "group"? } ] }`. The form to produce when a
   project's format is not one of the two below.
3. **Any JSON tree of strings** (i18next, paraglide, svelte-i18n, ARB): keys
   are flattened to dotted paths; `@key` entries are metadata, and an ARB
   `description` becomes the string's context.
4. **A source file with one string per line**, `key: 'value', // meaning`. The
   trailing comment is the meaning; a comment on a line of its own names the
   section that follows.

A value containing Mongolian script is taken as it is. A value in Latin letters
is read as **Classical romanization** and converted: words follow `toScript` of
`@gege-mn/mongol-bichig` (`-` is the MVS connector, `gh ch sh j` are ASCII for
γ č š ǰ, `kh` is the loan letter for Cyrillic к); a word may end in `,` `.` `:`
(U+1802, U+1803, U+1804) or `?` `!`; a word of digits becomes Mongolian digits;
`{name}`, `%s` and `<tag>` pass through. A value that does not convert is shown
to the reader as unreadable, not dropped.

### When to prepare rows yourself

- The project converts romanization with rules of its own. Then **run the
  project's converter** and give both: `text` (what the app really shows) and
  `roman` (what the source says).
- Strings are spread over several files, or built at run time.
- Meanings or context live somewhere else (a review table in the docs, code
  comments, where the string appears on screen). Put them in `meaning` and
  `context`: the more the reader knows about where a string appears, the better
  the review.

Write the rows file **with a script**, never by hand: script text is full of
invisible characters (MVS, FVS) that must not be typed or pasted. Have the
script emit `\uXXXX` escapes for them, or simply emit `roman` and let the page
convert.

## What comes back

`--out` is JSON, `format: "bichig-review/1"`, invisible characters written as
`\uXXXX`:

```json
{
  "format": "bichig-review/1",
  "title": "…", "source": "…", "updatedAt": "…", "finished": true,
  "summary": { "total": 31, "ok": 28, "wrong": 2, "unsure": 1, "unreviewed": 0 },
  "items": [
    {
      "key": "reportSent",
      "text": "…script as reviewed…",
      "roman": "bayarlaluγ-a.",
      "meaning": "Thank you.",
      "verdict": "wrong",
      "correction": { "text": "…script…", "roman": "bayarlal-a." },
      "note": "the form people actually write",
      "lint": [{ "rule": "…", "severity": "warning", "message": "…" }]
    }
  ]
}
```

- `verdict` is `"ok"`, `"wrong"`, `"unsure"`, or `null` for a string the reader
  did not reach. `finished` is false if the process was stopped before the
  hand-back.
- `correction` is present only when the reader typed a spelling that differs.
  `correctionAsTyped` replaces it when what they typed is not valid
  romanization: ask them what they meant, do not repair it yourself.
- `error` means the file's own value could not be turned into script.

## Apply it

- **`wrong` with a `correction`**: apply it exactly. In a romanized source,
  write `correction.roman`; in a file of script, write `correction.text`
  **by program** (read the review JSON, write the target file), never by
  retyping. The reader's ruling is final: do not "improve" it, and do not
  re-derive it with a converter.
- **`wrong` with only a note**: the note is the instruction. If it does not
  determine a spelling, ask the reader; do not invent one.
- **`unsure`**: change nothing. Report these to the user with their notes; they
  are open questions for a better reader or a dictionary.
- **`null`**: not reviewed. Say how many remain; do not treat them as approved.
- A note may ask for a change of wording, not spelling ("too formal", "use the
  word for X"). That is a new string: draft it, then put it back in review.
- Keep whatever else the project holds in step: a review table in the docs, a
  second locale file, snapshot tests.
- After applying, run the linter over the result (gege-linter skill) and the
  project's own tests.

Then **review again**, with the same `--out`. Strings whose text is unchanged
keep their verdicts; every string you changed comes back unreviewed, showing
the reader what it used to say and what they said about it. A review is done
when the reader hands back a round with nothing wrong.

## The page, for the reader

One string at a time: its meaning in large type, the words standing in a row
each under its romanization, and the same phrase as running text. `A` or
`Enter` marks it correct and moves on; `X` marks it wrong and opens the
correction, pre-filled with the current romanization to edit; `U` marks it
unsure and opens the note. `J`/`K` move, `C` shows code points with the
invisible characters named, `/` searches, `?` lists the keys. A typed
correction is drawn and linted as it is typed, with the changed words
highlighted. The linter's findings are advice for the reader, shown on the word
they concern.

The same file works without the script: open `assets/review.html` in a browser
(or host it anywhere static) and drop a file on it, paste the file's text, or
pass `?url=<address>&ref=<address>`; the addresses must allow cross-origin
reads. The review is then kept in the browser and downloaded or copied at the
end.

## Maintaining the page

`assets/review.html` is generated. Its sources are in `review/` of
[gege-mn/mongol-bichig](https://github.com/gege-mn/mongol-bichig); rebuild with
`pnpm build:review` and commit the result. The font is Noto Sans Mongolian
3.100 with repaired vertical metrics, under the SIL Open Font License
(`assets/OFL.txt`).
