/**
 * Animated hero ground. Three layers, all decorative and all pure CSS so the
 * static export needs no JavaScript for them:
 *
 *   1. a white-to-gold gradient base
 *   2. a faint woven lattice that pans diagonally
 *   3. zari threads drifting across, over soft shapes wandering behind
 *
 * Everything is low-contrast by design; the copy has to stay the loudest thing
 * in the section. Reduced-motion users get the same picture, held still.
 */
export default function HeroBackdrop() {
  // left offset, vertical position, thickness, duration, delay
  const threads: [string, string, string, string, string][] = [
    ["0%", "18%", "1px", "26s", "0s"],
    ["0%", "34%", "2px", "34s", "-8s"],
    ["0%", "52%", "1px", "30s", "-18s"],
    ["0%", "68%", "1.5px", "38s", "-4s"],
    ["0%", "84%", "1px", "28s", "-22s"],
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1. gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_50%_-8%,#fffdf4,transparent_65%),linear-gradient(180deg,#ffffff_0%,#fffcef_38%,#fdf3d6_100%)]" />

      {/* 2. woven lattice */}
      <div
        className="hero-weave absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(202,154,4,.07) 0 1px, transparent 1px 12px), repeating-linear-gradient(-45deg, rgba(21,128,61,.05) 0 1px, transparent 1px 12px)",
          backgroundSize: "120px 120px",
          animation: "weave-pan 40s linear infinite",
        }}
      />

      {/* 3a. soft shapes */}
      <span
        className="hero-shape absolute -top-24 -left-16 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(253,224,71,.32),transparent_70%)] blur-2xl"
        style={{ animation: "shape-a 22s ease-in-out infinite" }}
      />
      <span
        className="hero-shape absolute -right-20 top-1/3 size-[360px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,.20),transparent_70%)] blur-2xl"
        style={{ animation: "shape-b 27s ease-in-out infinite" }}
      />
      <span
        className="hero-shape absolute bottom-[-9rem] left-1/3 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(202,154,4,.22),transparent_72%)] blur-2xl"
        style={{ animation: "shape-a 31s ease-in-out infinite reverse" }}
      />

      {/* 3b. zari threads */}
      {threads.map(([left, top, height, duration, delay], i) => (
        <span
          key={i}
          className="hero-thread absolute w-[60%] rounded-full opacity-40"
          style={{
            left,
            top,
            height,
            background:
              "linear-gradient(90deg, transparent, rgba(202,154,4,.55) 18%, rgba(253,224,71,.85) 50%, rgba(202,154,4,.55) 82%, transparent)",
            animation: `thread-drift ${duration} linear ${delay} infinite`,
          }}
        />
      ))}

      {/* a soft veil over the centre so the copy always sits on calm ground
          while the motion stays visible towards the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_58%_at_50%_46%,rgba(255,255,255,.82)_0%,rgba(255,255,255,.55)_45%,transparent_78%)]" />
    </div>
  );
}
