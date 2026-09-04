/** Stylized game props — CSS/SVG stand-ins for stock 3D layers.
 *  Swap paths in /public/props when you drop Spline/Sketchfab WebP exports.
 */

type PropProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function KnowledgeCoin({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="coinFace" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE08A" />
          <stop offset="0.55" stopColor="#F5C542" />
          <stop offset="1" stopColor="#C99212" />
        </linearGradient>
        <linearGradient id="coinRim" x1="0" y1="60" x2="120" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B8840E" />
          <stop offset="1" stopColor="#F5C542" />
        </linearGradient>
      </defs>
      <ellipse cx="62" cy="66" rx="48" ry="48" fill="#000" opacity="0.22" />
      <circle cx="60" cy="60" r="48" fill="url(#coinRim)" />
      <circle cx="60" cy="60" r="40" fill="url(#coinFace)" />
      <circle cx="60" cy="60" r="34" stroke="#B8840E" strokeWidth="2" opacity="0.55" />
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontFamily="Syne, sans-serif"
        fontWeight="800"
        fontSize="36"
        fill="#7A5608"
      >
        ₦
      </text>
    </svg>
  );
}

export function CivicShield({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="shieldGrad" x1="20" y1="10" x2="100" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#58F0B0" />
          <stop offset="1" stopColor="#1FAE72" />
        </linearGradient>
      </defs>
      <path
        d="M60 8 L108 28 V68 C108 100 84 124 60 132 C36 124 12 100 12 68 V28 L60 8Z"
        fill="#000"
        opacity="0.2"
        transform="translate(4 6)"
      />
      <path
        d="M60 8 L108 28 V68 C108 100 84 124 60 132 C36 124 12 100 12 68 V28 L60 8Z"
        fill="url(#shieldGrad)"
      />
      <path
        d="M60 24 L92 38 V66 C92 88 76 106 60 112 C44 106 28 88 28 66 V38 L60 24Z"
        fill="#0B1F3A"
        opacity="0.2"
      />
      <path
        d="M48 70 L56 78 L76 54"
        stroke="#F7F1E4"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CivicBook({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 140 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 20 H68 V96 H12 C8 96 6 92 6 88 V28 C6 24 8 20 12 20Z" fill="#2EE59D" />
      <path d="M72 20 H128 C132 20 134 24 134 28 V88 C134 92 132 96 128 96 H72 V20Z" fill="#1FAE72" />
      <path d="M70 18 V98" stroke="#0B1F3A" strokeWidth="4" strokeLinecap="round" />
      <rect x="22" y="36" width="32" height="6" rx="3" fill="#0B1F3A" opacity="0.35" />
      <rect x="22" y="50" width="24" height="6" rx="3" fill="#0B1F3A" opacity="0.25" />
      <rect x="86" y="36" width="32" height="6" rx="3" fill="#0B1F3A" opacity="0.35" />
      <rect x="86" y="50" width="24" height="6" rx="3" fill="#0B1F3A" opacity="0.25" />
    </svg>
  );
}

export function Megaphone({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 140 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M20 42 L78 18 L78 82 L20 58 Z" fill="#F5C542" />
      <path d="M78 18 C98 10 118 14 130 22 L130 78 C118 86 98 90 78 82 Z" fill="#FF6B5B" />
      <rect x="8" y="42" width="18" height="16" rx="4" fill="#E0A820" />
      <path d="M34 58 L42 86 L54 82 L44 56 Z" fill="#0B1F3A" opacity="0.45" />
    </svg>
  );
}

export function PhoneFrame({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="8" y="8" width="104" height="204" rx="22" fill="#061426" />
      <rect x="14" y="14" width="92" height="192" rx="18" fill="#0B1F3A" />
      <rect x="22" y="28" width="76" height="140" rx="8" fill="#123A2A" />
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontFamily="Syne, sans-serif"
        fontWeight="800"
        fontSize="14"
        fill="#2EE59D"
      >
        CIVIC
      </text>
      <text
        x="60"
        y="90"
        textAnchor="middle"
        fontFamily="Syne, sans-serif"
        fontWeight="800"
        fontSize="14"
        fill="#F7F1E4"
      >
        PLAY
      </text>
      <rect x="30" y="110" width="60" height="10" rx="5" fill="#2EE59D" opacity="0.9" />
      <rect x="36" y="128" width="48" height="8" rx="4" fill="#F5C542" opacity="0.8" />
      <rect x="44" y="186" width="32" height="6" rx="3" fill="#F7F1E4" opacity="0.35" />
    </svg>
  );
}

export function StreakFlame({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 80 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M40 8 C28 32 18 40 18 62 C18 84 28 98 40 98 C52 98 62 84 62 62 C62 40 52 32 40 8Z"
        fill="#FF6B5B"
      />
      <path
        d="M40 36 C34 48 30 52 30 66 C30 78 34 86 40 86 C46 86 50 78 50 66 C50 52 46 48 40 36Z"
        fill="#F5C542"
      />
    </svg>
  );
}

export function TimerBadge({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="50" cy="54" r="36" fill="#F5C542" />
      <circle cx="50" cy="54" r="28" fill="#0B1F3A" />
      <path d="M50 54 L50 36" stroke="#2EE59D" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 54 L64 62" stroke="#F7F1E4" strokeWidth="4" strokeLinecap="round" />
      <rect x="42" y="10" width="16" height="10" rx="3" fill="#E0A820" />
    </svg>
  );
}

export function ScoreStar({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M50 8 L60 38 L92 38 L66 58 L76 90 L50 70 L24 90 L34 58 L8 38 L40 38 Z"
        fill="#F5C542"
      />
    </svg>
  );
}

/** Peeking student/citizen mascot — stock-style stand-in for a Spline character */
export function CivicCharacter({ className, style }: PropProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 280 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="140" cy="340" rx="90" ry="16" fill="#000" opacity="0.25" />
      {/* Body */}
      <path
        d="M70 210 C70 150 100 120 140 120 C180 120 210 150 210 210 V300 H70 V210Z"
        fill="#2EE59D"
      />
      <path
        d="M90 210 C90 170 110 145 140 145 C170 145 190 170 190 210 V280 H90 V210Z"
        fill="#1FAE72"
        opacity="0.55"
      />
      {/* Head */}
      <circle cx="140" cy="95" r="62" fill="#F5C8A0" />
      {/* Hair */}
      <path
        d="M88 90 C90 40 120 28 140 28 C170 28 196 48 194 92 C170 70 120 68 88 90Z"
        fill="#2A1A10"
      />
      <circle cx="108" cy="48" r="14" fill="#2A1A10" />
      <circle cx="140" cy="38" r="16" fill="#2A1A10" />
      <circle cx="172" cy="50" r="14" fill="#2A1A10" />
      {/* Eyes */}
      <ellipse cx="118" cy="98" rx="10" ry="12" fill="#0B1F3A" />
      <ellipse cx="162" cy="98" rx="10" ry="12" fill="#0B1F3A" />
      <circle cx="122" cy="94" r="3" fill="#F7F1E4" />
      <circle cx="166" cy="94" r="3" fill="#F7F1E4" />
      {/* Smile */}
      <path
        d="M120 118 C130 130 150 130 160 118"
        stroke="#0B1F3A"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cap badge */}
      <circle cx="140" cy="58" r="14" fill="#F5C542" />
      <text
        x="140"
        y="63"
        textAnchor="middle"
        fontFamily="Syne, sans-serif"
        fontWeight="800"
        fontSize="12"
        fill="#0B1F3A"
      >
        CP
      </text>
      {/* Arms */}
      <path
        d="M70 220 C40 230 30 260 36 290"
        stroke="#F5C8A0"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M210 220 C240 230 250 260 244 290"
        stroke="#F5C8A0"
        strokeWidth="22"
        strokeLinecap="round"
      />
    </svg>
  );
}
