/**
 * Line icons for the console only.
 *
 * Deliberately not the site's icon set. Those are brand ornaments, drawn to
 * sit beside a serif headline: a lotus, a pair of scales, a temple border.
 * An admin sidebar wants the opposite, a uniform 1.6px stroke on a 24px grid
 * that disappears into the furniture, and mixing the two makes the console
 * look like a marketing page wearing a table.
 */
type P = { className?: string };
const S = ({ className = "size-[18px]", d }: P & { d: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {d}
  </svg>
);

export const IconGrid = (p: P) => (
  <S
    {...p}
    d={
      <>
        <rect x="3" y="3" width="7" height="8" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="11" width="7" height="10" rx="1.5" />
      </>
    }
  />
);

export const IconInbox = (p: P) => (
  <S
    {...p}
    d={
      <>
        <path d="M3 13h4l1.5 3h7L17 13h4" />
        <path d="M5 5h14l2 8v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" />
      </>
    }
  />
);

export const IconReceipt = (p: P) => (
  <S
    {...p}
    d={
      <>
        <path d="M6 3h12v18l-3-1.6-3 1.6-3-1.6L6 21z" />
        <path d="M9.5 8h5M9.5 12h5" />
      </>
    }
  />
);

export const IconPin = (p: P) => (
  <S
    {...p}
    d={
      <>
        <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    }
  />
);

export const IconTag = (p: P) => (
  <S
    {...p}
    d={
      <>
        <path d="M3 12.5V5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.4.6l6.5 6.5a2 2 0 0 1 0 2.8l-7.5 7.5a2 2 0 0 1-2.8 0L3.6 13.9A2 2 0 0 1 3 12.5z" />
        <circle cx="8" cy="8" r="1.4" />
      </>
    }
  />
);

export const IconPencil = (p: P) => (
  <S
    {...p}
    d={
      <>
        <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z" />
        <path d="M14.5 7.5 16.5 9.5" />
      </>
    }
  />
);

export const IconPlus = (p: P) => <S {...p} d={<path d="M12 5v14M5 12h14" />} />;

export const IconClose = (p: P) => <S {...p} d={<path d="m6 6 12 12M18 6 6 18" />} />;

export const IconUser = (p: P) => (
  <S
    {...p}
    d={
      <>
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </>
    }
  />
);

export const IconLogout = (p: P) => (
  <S
    {...p}
    d={
      <>
        <path d="M14 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
        <path d="M10 8 6 12l4 4M6 12h9" />
      </>
    }
  />
);

export const IconSearch = (p: P) => (
  <S {...p} d={<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>} />
);

export const IconMenu = (p: P) => <S {...p} d={<path d="M4 7h16M4 12h16M4 17h16" />} />;

export const IconLock = (p: P) => (
  <S
    {...p}
    d={
      <>
        <rect x="4.5" y="10" width="15" height="10" rx="2" />
        <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      </>
    }
  />
);

export const IconArrowUp = (p: P) => <S {...p} d={<path d="M12 19V5M6 11l6-6 6 6" />} />;
export const IconArrowDown = (p: P) => <S {...p} d={<path d="M12 5v14M6 13l6 6 6-6" />} />;
