import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.8 9.8 0 0 1-1.5-5.23c0-5.42 4.41-9.83 9.83-9.83 2.63 0 5.09 1.02 6.95 2.88a9.77 9.77 0 0 1 2.88 6.95c0 5.42-4.41 9.83-9.83 9.83m8.36-18.19A11.75 11.75 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.1.55 4.14 1.59 5.95L.07 24l6.33-1.66a11.83 11.83 0 0 0 5.65 1.44h.01c6.54 0 11.87-5.33 11.88-11.88a11.8 11.8 0 0 0-3.48-8.4" />
  </svg>
);

export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.3} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Clock = (p: P) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.5l3.5 2" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Lotus = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...p}>
    <path d="M12 3c1.9 2.2 2.9 4.5 2.9 6.8S13.9 14.4 12 16.6c-1.9-2.2-2.9-4.5-2.9-6.8S10.1 5.2 12 3z" />
    <path d="M12 16.6c-2.6.9-5.1.7-7.4-.6 1-2.4 2.7-4 5.1-4.9M12 16.6c2.6.9 5.1.7 7.4-.6-1-2.4-2.7-4-5.1-4.9" />
    <path d="M4 19.5c2.4 1.4 5.1 2 8 2s5.6-.6 8-2" />
  </svg>
);

export const Menu = (p: P) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

/* Service icons, keyed by the `icon` field in config/content.ts */
export const serviceIcons: Record<string, (p: P) => React.ReactElement> = {
  wallet: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.8} {...p}>
      <path d="M20 7H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <circle cx="12" cy="13" r="2.5" />
    </svg>
  ),
  truck: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.8} {...p}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18.5" r="1.8" />
      <circle cx="17.5" cy="18.5" r="1.8" />
    </svg>
  ),
  rupee: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.8} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 7.5h6M9 10.5h6M14 7.5c1.4 0 2.2 1 2.2 2.2S15.4 12 14 12H9.6l4.4 4.5" />
    </svg>
  ),
  exchange: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.8} {...p}>
      <path d="M3 8h14l-3-3M21 16H7l3 3" />
    </svg>
  ),
  flame: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.8} {...p}>
      <path d="M8 3v5.5a4 4 0 0 1-1.2 2.9L5 13.2A4 4 0 0 0 3.8 16v2.5A2.5 2.5 0 0 0 6.3 21h11.4a2.5 2.5 0 0 0 2.5-2.5V16a4 4 0 0 0-1.2-2.8l-1.8-1.8A4 4 0 0 1 16 8.5V3z" />
      <path d="M6.5 3h11" />
    </svg>
  ),
  whatsapp: (p) => <WhatsApp {...p} />,
};

/** One per stop on the roadmap, in the order the stops appear. */
export const stepIcons: Record<string, (p: P) => React.ReactElement> = {
  camera: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.7} {...p}>
      <path d="M3 8.5h3.2l1.4-2.2h8.8l1.4 2.2H21v10H3z" />
      <circle cx="12" cy="13.2" r="3.4" />
    </svg>
  ),
  shopfront: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.7} {...p}>
      <path d="M4 9.5V20h16V9.5M2.5 9.5 4.6 4h14.8l2.1 5.5a3 3 0 0 1-5.8 0 3 3 0 0 1-5.8 0 3 3 0 0 1-5.8 0z" />
      <path d="M10 20v-5.2h4V20" />
    </svg>
  ),
  scale: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.7} {...p}>
      <path d="M12 4v16M8 20h8M5 8h14M12 8 8.2 8 5 14.5a3.6 3.6 0 0 0 6.4 0zM12 8l3.8 0 3.2 6.5a3.6 3.6 0 0 1-6.4 0z" />
      <circle cx="12" cy="4.4" r="1.4" />
    </svg>
  ),
  loupe: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.7} {...p}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5M8 10.5h5M8.7 8.2h3.6M8.7 12.8h3.6" />
    </svg>
  ),
  tag: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.7} {...p}>
      <path d="M11.6 3H20a1 1 0 0 1 1 1v8.4a1 1 0 0 1-.3.7l-8 8a1 1 0 0 1-1.4 0l-7.4-7.4a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 .7-.3z" />
      <circle cx="16.6" cy="7.4" r="1.5" />
    </svg>
  ),
  rupee: (p) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.7} {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9 7.6h6M9 10.4h6M13.9 7.6c1.4 0 2.2 1 2.2 2.2s-.8 2.2-2.2 2.2H9.6l4.3 4.4" />
    </svg>
  ),
};

export const YouTube = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8M9.5 15.6V8.4l6.3 3.6z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.8" cy="6.2" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12" />
  </svg>
);
