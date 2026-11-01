import type { NativeLanguage } from '../../types/game';

export const LANGUAGES: { id: NativeLanguage; label: string }[] = [
  { id: 'uk', label: 'Українська' },
  { id: 'ru', label: 'Русский' },
];

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
