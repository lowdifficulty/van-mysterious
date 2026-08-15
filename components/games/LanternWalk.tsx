"use client";

import { useMemo, useState } from "react";

const lanterns = [
  { id: 1, x: 14, y: 68, line: "The first light is always a rumor." },
  { id: 2, x: 32, y: 52, line: "Fog keeps its own appointments." },
  { id: 3, x: 48, y: 70, line: "A path is only a radius you agree to trust." },
  { id: 4, x: 63, y: 44, line: "She is not late. The scene is early." },
  { id: 5, x: 78, y: 62, line: "Perforations in the quiet — a reel turning." },
  { id: 6, x: 88, y: 38, line: "The last lantern does not explain. It arrives." },
];

export function LanternWalk() {
  const [lit, setLit] = useState<number[]>([]);
  const complete = lit.length === lanterns.length;
  const lastLine = useMemo(() => {
    const last = lit[lit.length - 1];
    return lanterns.find((item) => item.id === last)?.line;
  }, [lit]);

  function light(id: number) {
    setLit((current) => (current.includes(id) ? current : [...current, id]));
  }

  return (
    <div className="card-cinema overflow-hidden">
      <div className="relative min-h-[360px] bg-[#08070a] sm:min-h-[520px]">
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, rgba(139,135,148,0.18), transparent 55%)",
            opacity: 0.35 + lit.length * 0.08,
          }}
        />
        {lanterns.map((lantern) => {
          const on = lit.includes(lantern.id);
          return (
            <button
              key={lantern.id}
              type="button"
              onClick={() => light(lantern.id)}
              className="absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: `${lantern.x}%`, top: `${lantern.y}%` }}
              aria-label={`Lantern ${lantern.id}`}
            >
              <span
                className={`block h-8 w-8 rounded-full border border-gold/50 ${
                  on ? "lantern-glow bg-gold" : "bg-panel"
                }`}
              />
            </button>
          );
        })}
        {complete ? (
          <div className="pointer-events-none absolute inset-x-0 top-[18%] flex justify-center">
            <div className="h-40 w-16 rounded-full bg-gradient-to-b from-cream/20 to-transparent opacity-80" />
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-velvet via-velvet/80 to-transparent px-4 py-5 sm:px-6 sm:py-6">
          <p className="font-display text-xl text-cream sm:text-2xl">
            {complete
              ? "You found the cut. The walk is yours."
              : lastLine ?? "Click a lantern. The fog will allow it."}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">
            {lit.length} / {lanterns.length} lit
          </p>
        </div>
      </div>
      <div className="flex justify-end border-t border-gold/10 px-5 py-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center text-[0.68rem] uppercase tracking-[0.2em] text-gold"
          onClick={() => setLit([])}
        >
          Reset walk
        </button>
      </div>
    </div>
  );
}
