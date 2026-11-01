import type { AvatarConfig } from '../../player/types';
import { ACCESSORIES, HAIR_COLORS, HAIR_STYLES, OUTFIT_COLORS, OUTFITS, PRESETS, SKIN_TONES } from '../../data/avatar';
import { AvatarPortrait } from './AvatarPortrait';

// Pick a ready-made character, then change any detail. Live preview at the top.

export function AvatarCreator({ value, onChange }: { value: AvatarConfig; onChange: (a: AvatarConfig) => void }) {
  const set = <K extends keyof AvatarConfig>(key: K, v: AvatarConfig[K]) => onChange({ ...value, [key]: v });

  return (
    <div className="creator">
      <div className="creator-preview">
        <AvatarPortrait avatar={value} size={128} />
      </div>

      <h3 className="section-title">Characters</h3>
      <div className="preset-row">
        {PRESETS.map((p) => (
          <button key={p.name} className="preset" onClick={() => onChange(p.avatar)} aria-label={p.name}>
            <AvatarPortrait avatar={p.avatar} size={52} />
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      <h3 className="section-title">Skin</h3>
      <div className="swatches">
        {SKIN_TONES.map((c) => (
          <button key={c} className={`swatch ${value.skin === c ? 'active' : ''}`} style={{ background: c }} onClick={() => set('skin', c)} aria-label="Skin tone" />
        ))}
      </div>

      <h3 className="section-title">Hair</h3>
      <div className="chips">
        {HAIR_STYLES.map((h) => (
          <button key={h.id} className={`chip ${value.hair === h.id ? 'active' : ''}`} onClick={() => set('hair', h.id)}>{h.label}</button>
        ))}
      </div>
      <div className="swatches">
        {HAIR_COLORS.map((c) => (
          <button key={c} className={`swatch ${value.hairColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => set('hairColor', c)} aria-label="Hair colour" />
        ))}
      </div>

      <h3 className="section-title">Clothes</h3>
      <div className="chips">
        {OUTFITS.map((o) => (
          <button key={o.id} className={`chip ${value.outfit === o.id ? 'active' : ''}`} onClick={() => set('outfit', o.id)}>{o.label}</button>
        ))}
      </div>
      <div className="swatches">
        {OUTFIT_COLORS.map((c) => (
          <button key={c} className={`swatch ${value.outfitColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => set('outfitColor', c)} aria-label="Clothes colour" />
        ))}
      </div>

      <h3 className="section-title">Accessory</h3>
      <div className="chips">
        {ACCESSORIES.map((a) => (
          <button key={a.id} className={`chip ${value.accessory === a.id ? 'active' : ''}`} onClick={() => set('accessory', a.id)}>{a.label}</button>
        ))}
      </div>
    </div>
  );
}
