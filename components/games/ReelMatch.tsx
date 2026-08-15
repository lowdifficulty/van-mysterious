"use client";

import { useMemo, useState } from "react";

const symbols = [
  { id: "reel", label: "Reel" },
  { id: "lantern", label: "Lantern" },
  { id: "ticket", label: "Ticket" },
  { id: "moon", label: "Moon" },
  { id: "key", label: "Key" },
  { id: "mask", label: "Mask" },
  { id: "camera", label: "Camera" },
  { id: "fog", label: "Fog" },
] as const;

type Card = {
  uid: string;
  symbol: string;
  label: string;
};

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function deal(): Card[] {
  const pairs = symbols.flatMap((symbol) => [
    { uid: `${symbol.id}-a`, symbol: symbol.id, label: symbol.label },
    { uid: `${symbol.id}-b`, symbol: symbol.id, label: symbol.label },
  ]);
  return shuffle(pairs);
}

export function ReelMatch() {
  const [deck, setDeck] = useState<Card[]>(() => deal());
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const won = matched.length === symbols.length;

  const faceUp = useMemo(() => new Set(open), [open]);

  function flip(uid: string, symbol: string) {
    if (lock || faceUp.has(uid) || matched.includes(symbol)) return;
    const next = [...open, uid];
    setOpen(next);
    if (next.length < 2) return;

    setMoves((count) => count + 1);
    const [first, second] = next;
    const a = deck.find((card) => card.uid === first);
    const b = deck.find((card) => card.uid === second);
    if (a && b && a.symbol === b.symbol) {
      setMatched((current) => [...current, a.symbol]);
      setOpen([]);
      return;
    }
    setLock(true);
    window.setTimeout(() => {
      setOpen([]);
      setLock(false);
    }, 800);
  }

  function reset() {
    setDeck(deal());
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setLock(false);
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-muted">
          {won
            ? "The cut is assembled."
            : "Turn two cards. Pair the props from the cabinet."}
        </p>
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-gold">
          Moves {moves}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {deck.map((card) => {
          const shown =
            faceUp.has(card.uid) || matched.includes(card.symbol);
          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => flip(card.uid, card.symbol)}
              className="[perspective:800px]"
              aria-label={shown ? card.label : "Facedown card"}
            >
              <span
                className={`card-flip relative block aspect-square w-full ${
                  shown ? "is-flipped" : ""
                }`}
              >
                <span className="card-face absolute inset-0 flex items-center justify-center border border-gold/20 bg-panel text-gold">
                  <span className="font-display text-2xl">V</span>
                </span>
                <span className="card-face card-back absolute inset-0 flex items-center justify-center border border-gold/40 bg-velvet-deep">
                  <span className="font-display text-xs text-gold-soft sm:text-lg md:text-xl">
                    {card.label}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center text-[0.68rem] uppercase tracking-[0.2em] text-gold"
        >
          New reel
        </button>
      </div>
    </div>
  );
}
