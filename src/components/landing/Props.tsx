/** Stylized game props — CSS/SVG stand-ins for stock 3D layers.
 *  Swap paths in /public/props when you drop Spline/Sketchfab WebP exports.
 */

import Image from "next/image";

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
        <linearGradient
          id="coinFace"
          x1="20"
          y1="10"
          x2="100"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE08A" />
          <stop offset="0.55" stopColor="#F5C542" />
          <stop offset="1" stopColor="#C99212" />
        </linearGradient>
        <linearGradient
          id="coinRim"
          x1="0"
          y1="60"
          x2="120"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B8840E" />
          <stop offset="1" stopColor="#F5C542" />
        </linearGradient>
      </defs>
      <ellipse cx="62" cy="66" rx="48" ry="48" fill="#000" opacity="0.22" />
      <circle cx="60" cy="60" r="48" fill="url(#coinRim)" />
      <circle cx="60" cy="60" r="40" fill="url(#coinFace)" />
      <circle
        cx="60"
        cy="60"
        r="34"
        stroke="#B8840E"
        strokeWidth="2"
        opacity="0.55"
      />
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

export function Gavel({ className, style }: PropProps) {
  return (
    <Image
      src="/props/gavel.png"
      alt="Gavel"
      width={1000}
      height={1000}
      className={className}
      style={style}
    />
  );
}

export function JusticeScales({ className, style }: PropProps) {
  return (
    <Image
      src="/props/justice.png"
      alt="Justice Scales"
      width={1000}
      height={1000}
      className={className}
      style={style}
    />
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
        <linearGradient
          id="shieldGrad"
          x1="20"
          y1="10"
          x2="100"
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
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
      <path
        d="M12 20 H68 V96 H12 C8 96 6 92 6 88 V28 C6 24 8 20 12 20Z"
        fill="#2EE59D"
      />
      <path
        d="M72 20 H128 C132 20 134 24 134 28 V88 C134 92 132 96 128 96 H72 V20Z"
        fill="#1FAE72"
      />
      <path
        d="M70 18 V98"
        stroke="#0B1F3A"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="22"
        y="36"
        width="32"
        height="6"
        rx="3"
        fill="#0B1F3A"
        opacity="0.35"
      />
      <rect
        x="22"
        y="50"
        width="24"
        height="6"
        rx="3"
        fill="#0B1F3A"
        opacity="0.25"
      />
      <rect
        x="86"
        y="36"
        width="32"
        height="6"
        rx="3"
        fill="#0B1F3A"
        opacity="0.35"
      />
      <rect
        x="86"
        y="50"
        width="24"
        height="6"
        rx="3"
        fill="#0B1F3A"
        opacity="0.25"
      />
    </svg>
  );
}

export function Megaphone({ className, style }: PropProps) {
  return (
    <Image
      src="/props/megaphone.png"
      alt="Megaphone"
      width={1000}
      height={1000}
      className={className}
      style={style}
    />
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
      <rect
        x="30"
        y="110"
        width="60"
        height="10"
        rx="5"
        fill="#2EE59D"
        opacity="0.9"
      />
      <rect
        x="36"
        y="128"
        width="48"
        height="8"
        rx="4"
        fill="#F5C542"
        opacity="0.8"
      />
      <rect
        x="44"
        y="186"
        width="32"
        height="6"
        rx="3"
        fill="#F7F1E4"
        opacity="0.35"
      />
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
      <path
        d="M50 54 L50 36"
        stroke="#2EE59D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M50 54 L64 62"
        stroke="#F7F1E4"
        strokeWidth="4"
        strokeLinecap="round"
      />
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
    <Image
      src="/props/mascot.gif"
      alt="Civic Play mascot"
      width={1000}
      height={1000}
      className={className}
      style={style}
      unoptimized
    />
  );
}
