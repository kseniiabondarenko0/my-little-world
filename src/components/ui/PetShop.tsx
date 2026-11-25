import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { Modal } from './Modals';
import { Segmented } from './Segmented';
import { PetModel } from '../3d/PetFigure';
import { useCompanion } from '../../companion/companionStore';
import { usePlayer } from '../../player/playerStore';
import { useProgress } from '../../progression/progressStore';
import { useUI } from '../../hooks/useUIStore';
import { getRoom } from '../../rooms';
import { COURSE } from '../../courses/active';
import {
  FREE_PET_ACCESSORIES, PET_SPECIES, SHOP_ITEMS, speciesInfo,
  type PetAccessory, type PetConfig, type PetSpecies, type ShopCategory, type ShopItem,
} from '../../data/shop';

// The pet window (adopt, name, colour, accessory) and the coin shop.

const PET_ACCESSORY_LABELS: Record<PetAccessory, string> = {
  none: 'None', collar: 'Collar', bow: 'Bow', bandana: 'Bandana', partyhat: 'Party hat', crown: 'Crown', glasses: 'Glasses',
};

function Spin({ pet }: { pet: PetConfig }) {
  const g = useRef<Group>(null);
  useFrame((s) => {
    if (g.current) g.current.rotation.y = 0.5 + Math.sin(s.clock.elapsedTime * 0.8) * 0.6;
  });
  return (
    <group ref={g} scale={pet.species === 'parrot' ? 4.2 : 3.2} position={[0, pet.species === 'parrot' ? -0.55 : -0.5, 0]}>
      <PetModel pet={pet} />
    </group>
  );
}

/** A small turning 3D picture of the pet. */
export function PetPreview({ pet, size = 160 }: { pet: PetConfig; size?: number }) {
  return (
    <div className="pet-preview" style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0.5, 2.6], fov: 35 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <hemisphereLight args={['#fff6ee', '#d9c8ec', 1.4]} />
        <directionalLight position={[2, 3, 3]} intensity={1.6} />
        <Spin pet={pet} />
      </Canvas>
    </div>
  );
}

/** The animal's name in the language being learned (German/Polish students see "die Katze", "kot"). */
const speciesWord = (id: PetSpecies) => speciesInfo(id).word[COURSE.id];

export function PetModal() {
  const saved = useCompanion((s) => s.pet);
  const owned = useCompanion((s) => s.owned);
  const [draft, setDraft] = useState<PetConfig>(
    () => saved ?? { species: 'cat', name: '', color: PET_SPECIES[0].colors[0], accessory: 'collar' },
  );
  const pet = saved ?? draft;
  const change = (patch: Partial<PetConfig>) => {
    if (saved) useCompanion.getState().updatePet(patch);
    else setDraft((d) => ({ ...d, ...patch }));
  };
  const info = speciesInfo(pet.species);
  const boughtColors = SHOP_ITEMS.filter((i) => i.kind === 'petColor' && owned.includes(i.id)).map((i) => (i.kind === 'petColor' ? i.color : ''));
  const accessories = (Object.keys(PET_ACCESSORY_LABELS) as PetAccessory[]).map((a) => {
    const item = SHOP_ITEMS.find((i) => i.kind === 'petAccessory' && i.petAccessory === a);
    return { id: a, item, locked: !FREE_PET_ACCESSORIES.includes(a) && !(item && owned.includes(item.id)) };
  });
  const open = useUI.getState().openModal;

  const adopt = () => {
    useCompanion.getState().adopt({ ...draft, name: draft.name.trim() || info.defaultName });
    useUI.getState().cheerUp();
    useUI.getState().pushToast({ icon: info.icon, title: `Welcome home, ${draft.name.trim() || info.defaultName}!`, text: 'Your pet will stay with you in every room.', tone: 'success' });
    open(null);
  };

  return (
    <Modal title={saved ? `My pet ${saved.name}` : 'Adopt a pet'}>
      <div className="pet-top">
        <PetPreview pet={{ ...pet, name: pet.name || info.defaultName }} />
        {COURSE.id !== 'en' && <p className="pet-word">{info.icon} {speciesWord(pet.species)}</p>}
      </div>

      <h3 className="section-title">Animal</h3>
      <div className="species-grid">
        {PET_SPECIES.map((s) => (
          <button key={s.id} className={`species-card ${pet.species === s.id ? 'active' : ''}`}
            onClick={() => change({ species: s.id, ...(s.colors.includes(pet.color) || boughtColors.includes(pet.color) ? {} : { color: s.colors[0] }) })}>
            <span className="species-icon">{s.icon}</span>
            <span className="species-name">{s.word.en}</span>
            {COURSE.id !== 'en' && <span className="muted small">{s.word[COURSE.id]}</span>}
          </button>
        ))}
      </div>

      <h3 className="section-title">Name</h3>
      <input className="pet-name-input" value={pet.name} maxLength={16} placeholder={info.defaultName}
        onChange={(e) => change({ name: e.target.value })} aria-label="Pet name" />

      <h3 className="section-title">{pet.species === 'parrot' ? 'Feather colour' : 'Fur colour'}</h3>
      <div className="swatches">
        {[...info.colors, ...boughtColors].map((c) => (
          <button key={c} className={`swatch ${pet.color === c ? 'active' : ''}`} style={{ background: c }} onClick={() => change({ color: c })} aria-label="Colour" />
        ))}
        <button className="swatch swatch-more" onClick={() => open('shop')} aria-label="More colours in the shop" title="More colours in the shop">🛍️</button>
      </div>

      <h3 className="section-title">Accessory</h3>
      <div className="chips">
        {accessories.map(({ id, item, locked }) => (
          <button key={id} className={`chip ${pet.accessory === id ? 'active' : ''}`} disabled={locked} onClick={() => change({ accessory: id })}
            title={locked && item ? `Buy it in the shop for ${item.price} coins` : undefined}>
            {locked ? '🔒 ' : ''}{PET_ACCESSORY_LABELS[id]}{locked && item && <> · 🪙{item.price}</>}
          </button>
        ))}
      </div>

      <div className="pet-actions">
        {saved ? (
          <>
            <button className="btn btn-soft" onClick={() => open('shop')}>🛍️ Shop</button>
            <button className="btn btn-primary" onClick={() => open(null)}>Done</button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={adopt}>{info.icon} Adopt {draft.name.trim() || info.defaultName}!</button>
        )}
      </div>
    </Modal>
  );
}

// ── Shop ────────────────────────────────────────────────────────────────────

const TABS: { id: ShopCategory; label: string }[] = [
  { id: 'room', label: '🏠 Room' },
  { id: 'avatar', label: '🧑 Avatar' },
  { id: 'pet', label: '🐾 Pet' },
];

function useItemState(item: ShopItem) {
  const roomId = useProgress((s) => s.currentRoomId);
  const style = useCompanion((s) => s.roomStyles[roomId]);
  const pet = useCompanion((s) => s.pet);
  const avatar = usePlayer((s) => s.current?.avatar);
  const c = useCompanion.getState();
  const wear = (patch: Partial<NonNullable<typeof avatar>>) => avatar && usePlayer.getState().update({ avatar: { ...avatar, ...patch } });

  switch (item.kind) {
    case 'wall': {
      const on = style?.wall === item.id;
      return { on, label: on ? 'On the walls' : 'Paint this room', use: () => c.setRoomStyle(roomId, { wall: on ? undefined : item.id }) };
    }
    case 'floor': {
      const on = style?.floor === item.id;
      return { on, label: on ? 'On the floor' : 'Use in this room', use: () => c.setRoomStyle(roomId, { floor: on ? undefined : item.id }) };
    }
    case 'decor': {
      const on = !!style?.decor?.includes(item.id);
      return { on, label: on ? 'Hide' : 'Show in this room', use: () => c.toggleDecor(roomId, item.id) };
    }
    case 'hair': {
      const on = avatar?.hair === item.hair;
      return { on, label: on ? 'Wearing' : 'Wear it', use: () => !on && wear({ hair: item.hair }) };
    }
    case 'outfit': {
      const on = avatar?.outfit === item.outfit;
      return { on, label: on ? 'Wearing' : 'Wear it', use: () => !on && wear({ outfit: item.outfit }) };
    }
    case 'accessory': {
      const on = avatar?.accessory === item.accessory;
      return { on, label: on ? 'Take off' : 'Wear it', use: () => wear({ accessory: on ? 'none' : item.accessory }) };
    }
    case 'petAccessory': {
      const on = pet?.accessory === item.petAccessory;
      return { on, label: !pet ? 'Adopt a pet first' : on ? 'Take off' : 'Put on', disabled: !pet, use: () => c.updatePet({ accessory: on ? 'none' : item.petAccessory }) };
    }
    case 'petColor': {
      const on = pet?.color === item.color;
      return { on, label: !pet ? 'Adopt a pet first' : on ? 'In use' : 'Use it', disabled: !pet || on, use: () => c.updatePet({ color: item.color }) };
    }
  }
}

function ShopCard({ item }: { item: ShopItem }) {
  const coins = useCompanion((s) => s.coins);
  const owned = useCompanion((s) => s.owned.includes(item.id));
  const state = useItemState(item);
  const swatch = item.kind === 'wall' ? item.wall : item.kind === 'floor' ? item.floor[0] : item.kind === 'petColor' ? item.color : null;

  const buy = () => {
    if (!useCompanion.getState().buy(item.id)) return;
    useUI.getState().cheerUp();
    useUI.getState().pushToast({ icon: item.icon, title: `${item.name} is yours!`, text: `−${item.price} coins`, tone: 'success' });
    state.use(); // put it on / use it straight away
  };

  return (
    <div className={`shop-card ${owned ? 'owned' : ''} ${state.on ? 'on' : ''}`}>
      <div className="shop-icon" style={swatch ? { background: swatch } : undefined}>
        {item.kind === 'floor' ? <span className="floor-chip" style={{ background: `repeating-linear-gradient(90deg, ${item.floor[0]} 0 10px, ${item.floor[1]} 10px 20px)` }} /> : item.icon}
      </div>
      <div className="shop-name">{item.name}</div>
      {owned ? (
        <button className={`btn btn-small ${state.on ? 'btn-soft' : 'btn-primary'}`} disabled={state.disabled} onClick={state.use}>{state.label}</button>
      ) : (
        <button className="btn btn-small btn-gold" disabled={coins < item.price} onClick={buy}
          title={coins < item.price ? `You need ${item.price - coins} more coins` : undefined}>
          🪙 {item.price}
        </button>
      )}
      {!owned && coins < item.price && <span className="muted small">{item.price - coins} more to go</span>}
    </div>
  );
}

export function ShopModal() {
  const [tab, setTab] = useState<ShopCategory>('room');
  const coins = useCompanion((s) => s.coins);
  const roomId = useProgress((s) => s.currentRoomId);
  const style = useCompanion((s) => s.roomStyles[roomId]);
  const hasPet = useCompanion((s) => s.pet !== null);
  const room = getRoom(roomId);
  const items = SHOP_ITEMS.filter((i) => i.category === tab);
  const groups: { title: string; kinds: ShopItem['kind'][] }[] =
    tab === 'room'
      ? [{ title: 'Wall paint', kinds: ['wall'] }, { title: 'Floors', kinds: ['floor'] }, { title: 'Decorations', kinds: ['decor'] }]
      : tab === 'avatar'
        ? [{ title: 'Hairstyles', kinds: ['hair'] }, { title: 'Clothes', kinds: ['outfit'] }, { title: 'Accessories', kinds: ['accessory'] }]
        : [{ title: 'Accessories', kinds: ['petAccessory'] }, { title: 'Special colours', kinds: ['petColor'] }];

  return (
    <Modal title="Shop" wide>
      <div className="shop-head">
        <div className="coin-balance">🪙 <b>{coins}</b> coins</div>
        <p className="muted small">Earn coins by finishing lessons, missions, mini-games and side quests.</p>
      </div>
      <Segmented value={tab} options={TABS} onChange={setTab} />
      {tab === 'room' && (
        <p className="muted small shop-note">
          Paint and floors change the room you’re in: <b>{room.icon} {room.name}</b>.
          {(style?.wall || style?.floor) && (
            <button className="link-btn" onClick={() => useCompanion.getState().setRoomStyle(roomId, { wall: undefined, floor: undefined })}> Back to the original look</button>
          )}
        </p>
      )}
      {tab === 'pet' && !hasPet && (
        <p className="shop-note"><button className="btn btn-soft btn-small" onClick={() => useUI.getState().openModal('pet')}>🐾 Adopt a pet first</button></p>
      )}
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="section-title">{g.title}</h3>
          <div className="shop-grid">
            {items.filter((i) => g.kinds.includes(i.kind)).map((i) => <ShopCard key={i.id} item={i} />)}
          </div>
        </div>
      ))}
    </Modal>
  );
}

