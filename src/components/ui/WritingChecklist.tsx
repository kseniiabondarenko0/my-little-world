import type { WritingResult } from '../../missions/writing';

export function WritingChecklist({ result }: { result: WritingResult }) {
  return (
    <ul className="checklist">
      {result.checks.map((c) => (
        <li key={c.label} className={c.ok ? 'ok' : ''}>
          <span>{c.ok ? '✓' : '○'}</span> {c.label} <em>{c.detail}</em>
        </li>
      ))}
    </ul>
  );
}
