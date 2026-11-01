import type { AvatarConfig } from '../../player/types';

// Flat 2D portrait of the avatar (same colours and choices as the 3D figure).

const DARK = '#3b2f45';

function HairBack({ a }: { a: AvatarConfig }) {
  if (a.hair === 'long') return <path d="M28 52 Q26 96 40 104 L80 104 Q94 96 92 52 Z" fill={a.hairColor} />;
  if (a.hair === 'bob') return <path d="M26 56 Q24 86 36 90 L84 90 Q96 86 94 56 Z" fill={a.hairColor} />;
  return null;
}

function HairFront({ a }: { a: AvatarConfig }) {
  const c = a.hairColor;
  switch (a.hair) {
    case 'short':
      return <path d="M30 54 Q32 24 60 22 Q88 24 90 54 Q80 40 62 40 Q44 40 30 54 Z" fill={c} />;
    case 'long':
      return <path d="M28 58 Q28 22 60 21 Q92 22 92 58 Q86 38 70 36 Q66 46 52 46 Q40 46 28 58 Z" fill={c} />;
    case 'bun':
      return (
        <g fill={c}>
          <circle cx="60" cy="16" r="12" />
          <path d="M30 54 Q32 24 60 23 Q88 24 90 54 Q78 38 60 38 Q42 38 30 54 Z" />
        </g>
      );
    case 'curly':
      return (
        <g fill={c}>
          {[[34, 40], [44, 28], [58, 23], [72, 27], [84, 38], [30, 54], [90, 54], [50, 36], [68, 36]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="11" />
          ))}
        </g>
      );
    case 'spiky':
      return <path d="M30 54 L34 30 L42 38 L48 20 L56 34 L62 16 L68 33 L76 20 L80 37 L88 30 L90 54 Q76 42 60 42 Q44 42 30 54 Z" fill={c} />;
    case 'bob':
      return <path d="M27 62 Q26 22 60 21 Q94 22 93 62 Q90 44 76 38 L44 38 Q30 44 27 62 Z" fill={c} />;
  }
}

function Outfit({ a }: { a: AvatarConfig }) {
  const c = a.outfitColor;
  switch (a.outfit) {
    case 'tshirt':
      return <path d="M30 120 Q30 94 48 90 L72 90 Q90 94 90 120 Z" fill={c} />;
    case 'hoodie':
      return (
        <g>
          <path d="M28 120 Q28 92 46 88 L74 88 Q92 92 92 120 Z" fill={c} />
          <path d="M44 88 Q60 100 76 88" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3" fill="none" />
          <line x1="54" y1="94" x2="54" y2="106" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7" />
          <line x1="66" y1="94" x2="66" y2="106" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7" />
        </g>
      );
    case 'dress':
      return <path d="M26 120 L40 92 Q60 86 80 92 L94 120 Z" fill={c} />;
    case 'overalls':
      return (
        <g>
          <path d="M30 120 Q30 94 48 90 L72 90 Q90 94 90 120 Z" fill="#ffffff" />
          <path d="M40 120 L42 98 L78 98 L80 120 Z" fill={c} />
          <line x1="46" y1="98" x2="44" y2="90" stroke={c} strokeWidth="4" />
          <line x1="74" y1="98" x2="76" y2="90" stroke={c} strokeWidth="4" />
        </g>
      );
  }
}

function Accessory({ a }: { a: AvatarConfig }) {
  switch (a.accessory) {
    case 'glasses':
      return (
        <g stroke={DARK} strokeWidth="2.5" fill="none">
          <circle cx="48" cy="60" r="8" />
          <circle cx="72" cy="60" r="8" />
          <line x1="56" y1="60" x2="64" y2="60" />
        </g>
      );
    case 'cap':
      return (
        <g fill={a.outfitColor}>
          <path d="M30 46 Q32 20 60 20 Q88 20 90 46 Z" />
          <rect x="54" y="40" width="44" height="7" rx="3.5" />
        </g>
      );
    case 'headphones':
      return (
        <g>
          <path d="M28 58 Q28 18 60 18 Q92 18 92 58" stroke={DARK} strokeWidth="5" fill="none" />
          <rect x="22" y="52" width="12" height="18" rx="5" fill="#ff8f7a" />
          <rect x="86" y="52" width="12" height="18" rx="5" fill="#ff8f7a" />
        </g>
      );
    case 'bow':
      return (
        <g fill="#ff6f91" transform="translate(78 30) rotate(-20)">
          <path d="M0 0 L-12 -8 L-12 8 Z" />
          <path d="M0 0 L12 -8 L12 8 Z" />
          <circle r="3.5" />
        </g>
      );
    case 'flower':
      return (
        <g transform="translate(38 34)">
          {[0, 72, 144, 216, 288].map((d) => (
            <circle key={d} cx={Math.cos((d * Math.PI) / 180) * 5} cy={Math.sin((d * Math.PI) / 180) * 5} r="4.5" fill="#ffffff" />
          ))}
          <circle r="3.5" fill="#ffd27a" />
        </g>
      );
    default:
      return null;
  }
}

export function AvatarPortrait({ avatar, size = 64, ring = true }: { avatar: AvatarConfig; size?: number; ring?: boolean }) {
  return (
    <svg className="avatar-portrait" width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <clipPath id="avatar-clip">
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      <g clipPath={ring ? 'url(#avatar-clip)' : undefined}>
        {ring && <circle cx="60" cy="60" r="60" fill="#f6efff" />}
        <HairBack a={avatar} />
        <Outfit a={avatar} />
        <rect x="53" y="80" width="14" height="12" rx="4" fill={avatar.skin} />
        <ellipse cx="60" cy="60" rx="28" ry="27" fill={avatar.skin} />
        <circle cx="32" cy="62" r="5" fill={avatar.skin} />
        <circle cx="88" cy="62" r="5" fill={avatar.skin} />
        <circle cx="49" cy="61" r="3.2" fill={DARK} />
        <circle cx="71" cy="61" r="3.2" fill={DARK} />
        <circle cx="42" cy="70" r="4.5" fill="#ff9fa8" opacity="0.55" />
        <circle cx="78" cy="70" r="4.5" fill="#ff9fa8" opacity="0.55" />
        <path d="M53 72 Q60 78 67 72" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <HairFront a={avatar} />
        <Accessory a={avatar} />
      </g>
    </svg>
  );
}
