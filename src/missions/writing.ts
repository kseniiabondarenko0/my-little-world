import type { WordRequirement } from '../chapter/types';

// Simple, transparent checks for students' writing: length and required vocabulary.
// (Not AI marking — the teacher can read every answer in the student's profile.)

export interface WritingCheck {
  label: string;
  ok: boolean;
  detail: string;
}

export interface WritingResult {
  ok: boolean;
  wordCount: number;
  checks: WritingCheck[];
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
}

export function evaluateWriting(text: string, minWords: number, require: WordRequirement[] = []): WritingResult {
  const lower = ` ${text.toLowerCase().replace(/[’']/g, "'")} `;
  const wordCount = countWords(text);
  const checks: WritingCheck[] = [
    { label: `At least ${minWords} words`, ok: wordCount >= minWords, detail: `${wordCount}/${minWords}` },
  ];
  const occurrences = (phrase: string, inText = lower) =>
    (inText.match(new RegExp(`(^|[^a-z])${escape(phrase.toLowerCase())}(?=[^a-z]|$)`, 'g')) ?? []).length;
  for (const r of require) {
    const found = r.words.filter((w) => occurrences(w) > 0);
    // "in" inside "in front of" only counts if "in" is also used on its own.
    const distinct = found.filter((w) => {
      const covered = found
        .filter((o) => o !== w && o.length > w.length && occurrences(w, ` ${o.toLowerCase()} `) > 0)
        .reduce((n, o) => n + occurrences(o), 0);
      return occurrences(w) > covered;
    });
    checks.push({
      label: `Use ${r.count} ${r.label}`,
      ok: distinct.length >= r.count,
      detail: distinct.length ? `Found: ${distinct.slice(0, 6).join(', ')}` : 'None yet',
    });
  }
  return { ok: checks.every((c) => c.ok), wordCount, checks };
}
