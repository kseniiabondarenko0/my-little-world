import type { Course, NativeLanguage } from '../../types/game';
import { COURSES } from '../../courses/courses';

export const LANGUAGES: { id: NativeLanguage; label: string }[] = [
  { id: 'uk', label: 'Українська' },
  { id: 'ru', label: 'Русский' },
];

/** The languages a player can learn. */
export const COURSE_OPTIONS: { id: Course; label: string }[] = COURSES.map((c) => ({ id: c.id, label: `${c.flag} ${c.label}` }));

export function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button key={o.id} className={value === o.id ? 'active' : ''} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
