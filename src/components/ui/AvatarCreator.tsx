import type { AvatarConfig } from '../../player/types';
import { ACCESSORIES, HAIR_COLORS, HAIR_STYLES, OUTFIT_COLORS, OUTFITS, PRESETS, SKIN_TONES } from '../../data/avatar';
import { AvatarPortrait } from './AvatarPortrait';
import { exclusiveFor } from '../../data/shop';
import { useCompanion } from '../../companion/companionStore';

/** A style chip. Exclusive styles are locked (with their price) until bought in the shop. */
function StyleChip({ kind, id, label, active, onPick }: { kind: 'hair' | 'outfit' | 'accessory'; id: string; label: string; active: boolean; onPick: () => void }) {
  const owned = useCompanion((s) => s.owned);
  const item = exclusiveFor(kind, id);
  const locked = !!item && !owned.includes(item.id);
  return (
    <button className={`chip ${active ? 'active' : ''} ${item ? 'chip-exclusive' : ''}`} disabled={locked} onClick={onPick}
      title={locked ? `Buy it in the shop for ${item.price} coins` : undefined}>
      {item && (locked ? '🔒 ' : '✨ ')}{label}{locked && <> · 🪙{item.price}</>}
    </button>
  );
}

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
          <StyleChip key={h.id} kind="hair" id={h.id} label={h.label} active={value.hair === h.id} onPick={() => set('hair', h.id)} />
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
          <StyleChip key={o.id} kind="outfit" id={o.id} label={o.label} active={value.outfit === o.id} onPick={() => set('outfit', o.id)} />
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
          <StyleChip key={a.id} kind="accessory" id={a.id} label={a.label} active={value.accessory === a.id} onPick={() => set('accessory', a.id)} />
        ))}
      </div>
    </div>
  );
}
