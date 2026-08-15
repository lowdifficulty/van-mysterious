import type { ReactNode } from "react";
import { Editable } from "@/components/studio/Editable";

const frames: Record<string, { gradient: string; svg: ReactNode }> = {
  streetlight: {
    gradient:
      "radial-gradient(circle at 70% 30%, #c9a44a 0%, #5a3d12 18%, #1a1210 42%, #070506 100%)",
    svg: (
      <g stroke="#e8d5a3" strokeWidth="1.2" fill="none" opacity="0.7">
        <line x1="140" y1="10" x2="140" y2="78" />
        <path d="M128 78h24l-4 8h-16z" fill="#c9a44a" stroke="none" />
        <ellipse cx="140" cy="118" rx="36" ry="10" fill="#c9a44a" opacity="0.2" stroke="none" />
      </g>
    ),
  },
  fogwalk: {
    gradient:
      "linear-gradient(180deg, #1b1820 0%, #2a2430 40%, #6b6570 78%, #c9c4b8 100%)",
    svg: (
      <g fill="none" stroke="#f3ead8" strokeWidth="1" opacity="0.45">
        <path d="M20 150c30-20 50-18 80 0s60 18 90-8" />
        <path d="M10 170c40-12 70-8 100 6s70 4 90-10" />
        <circle cx="90" cy="88" r="7" fill="#c9a44a" stroke="none" opacity="0.8" />
      </g>
    ),
  },
  velvet: {
    gradient:
      "radial-gradient(ellipse at 50% 0%, #6a2233 0%, #3d1a24 35%, #12080c 100%)",
    svg: (
      <g fill="#070506" opacity="0.45">
        <path d="M0 0c40 80 60 140 100 200H0z" />
        <path d="M200 0c-40 80-60 140-100 200h100z" />
      </g>
    ),
  },
  reel: {
    gradient: "radial-gradient(circle at 50% 50%, #2a2420 0%, #0c090b 70%)",
    svg: (
      <g fill="none" stroke="#c9a44a" strokeWidth="2">
        <circle cx="100" cy="100" r="46" />
        <circle cx="100" cy="100" r="12" fill="#c9a44a" stroke="none" />
        <circle cx="100" cy="62" r="6" />
        <circle cx="133" cy="119" r="6" />
        <circle cx="67" cy="119" r="6" />
      </g>
    ),
  },
  window: {
    gradient:
      "linear-gradient(180deg, #141820 0%, #1c2430 50%, #0a0c10 100%)",
    svg: (
      <g stroke="#8b8794" strokeWidth="1.5" fill="none">
        <rect x="40" y="20" width="120" height="160" />
        <line x1="100" y1="20" x2="100" y2="180" />
        <line x1="40" y1="100" x2="160" y2="100" />
        <path d="M50 40c20 10 30-8 50 6s28 4 40-6" opacity="0.5" />
      </g>
    ),
  },
  lantern: {
    gradient:
      "radial-gradient(circle at 50% 42%, #e8d5a3 0%, #c9a44a 12%, #3a2a12 38%, #070506 100%)",
    svg: (
      <g fill="none" stroke="#e8d5a3" strokeWidth="1.6">
        <rect x="82" y="70" width="36" height="48" />
        <path d="M88 70l12-16 12 16" />
        <line x1="100" y1="54" x2="100" y2="40" />
      </g>
    ),
  },
  platform: {
    gradient:
      "linear-gradient(180deg, #101018 0%, #1a1a24 55%, #2a2a22 100%)",
    svg: (
      <g stroke="#a89f93" fill="none" strokeWidth="1.2">
        <line x1="0" y1="140" x2="200" y2="140" />
        <rect x="20" y="88" width="90" height="36" opacity="0.5" />
        <circle cx="170" cy="70" r="10" stroke="#c9a44a" />
      </g>
    ),
  },
  mask: {
    gradient: "radial-gradient(circle at 50% 40%, #3a2a14 0%, #120e10 70%)",
    svg: (
      <g fill="none" stroke="#c9a44a" strokeWidth="1.8">
        <path d="M50 90c10-40 90-40 100 0-8 28-30 40-50 40S58 118 50 90z" />
        <ellipse cx="80" cy="88" rx="10" ry="6" />
        <ellipse cx="120" cy="88" rx="10" ry="6" />
      </g>
    ),
  },
  chair: {
    gradient:
      "radial-gradient(ellipse at 50% 30%, #5a4a28 0%, #1a140e 45%, #070506 100%)",
    svg: (
      <g stroke="#e8d5a3" fill="none" strokeWidth="1.5">
        <rect x="70" y="80" width="60" height="28" />
        <line x1="76" y1="108" x2="70" y2="160" />
        <line x1="124" y1="108" x2="130" y2="160" />
        <line x1="78" y1="80" x2="78" y2="50" />
        <line x1="122" y1="80" x2="122" y2="50" />
        <line x1="78" y1="50" x2="122" y2="50" />
      </g>
    ),
  },
  corridor: {
    gradient:
      "linear-gradient(90deg, #0a0809 0%, #1c1618 50%, #0a0809 100%)",
    svg: (
      <g stroke="#c9a44a" fill="none" strokeWidth="1" opacity="0.7">
        <path d="M20 20 L80 70 L80 130 L20 180" />
        <path d="M180 20 L120 70 L120 130 L180 180" />
        <rect x="88" y="86" width="24" height="40" />
      </g>
    ),
  },
  moon: {
    gradient:
      "radial-gradient(circle at 70% 22%, #e8d5a3 0%, #8a7040 10%, #1a2218 40%, #070806 100%)",
    svg: (
      <g stroke="#6b7a60" fill="none" strokeWidth="1.2">
        <path d="M10 180 C40 80 70 120 90 40" />
        <path d="M110 200 C130 90 150 140 190 30" />
      </g>
    ),
  },
  ticket: {
    gradient: "linear-gradient(160deg, #2a2014 0%, #120e0a 60%, #070506 100%)",
    svg: (
      <g fill="none" stroke="#c9a44a" strokeWidth="1.5">
        <path d="M40 70 h120 a8 8 0 0 1 0 20 v20 a8 8 0 0 1 0 20 H40 a8 8 0 0 1 0-20 V90 a8 8 0 0 1 0-20z" />
        <line x1="70" y1="78" x2="70" y2="122" strokeDasharray="4 4" />
      </g>
    ),
  },
};

export function Still({
  id,
  titlePath,
  captionPath,
  ratio,
}: {
  id: string;
  titlePath: string;
  captionPath: string;
  ratio: string;
}) {
  const frame = frames[id] ?? frames.reel;
  const height =
    ratio === "tall"
      ? "min-h-[280px] sm:min-h-[420px]"
      : ratio === "wide"
        ? "min-h-[180px] sm:min-h-[240px]"
        : "min-h-[220px] sm:min-h-[300px]";

  return (
    <figure className="group card-cinema overflow-hidden">
      <div className={`relative ${height} overflow-hidden`}>
        <div
          className="absolute inset-0 transition-transform duration-[4000ms] group-hover:scale-105"
          style={{ background: frame.gradient }}
        />
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {frame.svg}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-velvet via-transparent to-black/20" />
      </div>
      <figcaption className="border-t border-gold/10 px-5 py-4">
        <Editable
          path={titlePath}
          as="p"
          className="font-display text-2xl text-cream"
        />
        <Editable
          path={captionPath}
          as="p"
          multiline
          className="mt-1 text-sm leading-relaxed text-muted"
        />
      </figcaption>
    </figure>
  );
}
