/**
 * Animated hero ground, built to read as a loom: a square grid whose warp and
 * weft drift in opposite directions, with brighter shuttle threads running
 * across and down over it. All pure CSS, so the static export needs no
 * JavaScript for any of it.
 *
 * Reduced-motion users get the same picture, held still.
 */

// [position along the axis, thickness, duration, delay]
const ACROSS: [string, string, string, string][] = [
  ["12%", "1px", "13s", "0s"],
  ["29%", "2px", "17s", "-6s"],
  ["47%", "1px", "15s", "-11s"],
  ["66%", "2px", "19s", "-3s"],
  ["83%", "1px", "14s", "-9s"],
];

const DOWN: [string, string, string, string][] = [
  ["16%", "1px", "16s", "-2s"],
  ["34%", "2px", "21s", "-12s"],
  ["58%", "1px", "18s", "-7s"],
  ["78%", "2px", "23s", "-15s"],
];

export default function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_50%_-8%,#fffdf4,transparent_65%),linear-gradient(180deg,#ffffff_0%,#fffcef_38%,#fdf3d6_100%)]" />

      {/* warp: vertical grid lines creeping sideways */}
      <div
        className="hero-grid absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(202,154,4,.16) 0 1px, transparent 1px 64px)",
          backgroundSize: "64px 64px",
          animation: "grid-pan-x 6s linear infinite",
        }}
      />

      {/* weft: horizontal grid lines creeping the other way */}
      <div
        className="hero-grid absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(21,128,61,.14) 0 1px, transparent 1px 64px)",
          backgroundSize: "64px 64px",
          animation: "grid-pan-y 8s linear infinite reverse",
        }}
      />

      {/* soft colour behind it all */}
      <span
        className="hero-shape absolute -top-24 -left-16 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(253,224,71,.30),transparent_70%)] blur-2xl"
        style={{ animation: "shape-a 22s ease-in-out infinite" }}
      />
      <span
        className="hero-shape absolute -right-20 top-1/3 size-[360px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,.18),transparent_70%)] blur-2xl"
        style={{ animation: "shape-b 27s ease-in-out infinite" }}
      />

      {/* shuttle threads running across */}
      {ACROSS.map(([top, height, duration, delay], i) => (
        <span
          key={`a${i}`}
          className="hero-thread absolute w-[45%] rounded-full opacity-55"
          style={{
            top,
            height,
            background:
              "linear-gradient(90deg, transparent, rgba(202,154,4,.8) 20%, #fde047 50%, rgba(202,154,4,.8) 80%, transparent)",
            animation: `thread-drift ${duration} linear ${delay} infinite`,
          }}
        />
      ))}

      {/* and running down, so the two sets visibly cross */}
      {DOWN.map(([left, width, duration, delay], i) => (
        <span
          key={`d${i}`}
          className="hero-thread absolute h-[55%] rounded-full opacity-40"
          style={{
            left,
            width,
            background:
              "linear-gradient(180deg, transparent, rgba(21,128,61,.7) 20%, rgba(34,197,94,.95) 50%, rgba(21,128,61,.7) 80%, transparent)",
            animation: `thread-fall ${duration} linear ${delay} infinite`,
          }}
        />
      ))}

      {/* keeps the copy readable without hiding the weave behind it */}
      <div className="absolute inset-0 bg-[radial-gradient(62%_58%_at_50%_46%,rgba(255,255,255,.93)_0%,rgba(255,255,255,.78)_42%,rgba(255,255,255,.30)_70%,transparent_88%)]" />
    </div>
  );
}
