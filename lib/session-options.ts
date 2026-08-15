import type { SessionOptions } from "iron-session";

export type VanSession = {
  policiesAgreed?: boolean;
  admitted?: boolean;
  studio?: boolean;
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
};

export const SESSION_COOKIE = "van_gate";

function sessionPassword() {
  const password = process.env.SESSION_SECRET;
  if (password && password.length >= 32) return password;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be at least 32 characters.");
  }
  return "van-mysterious-local-dev-secret-key-32chars";
}

export const sessionOptions: SessionOptions = {
  cookieName: SESSION_COOKIE,
  password: sessionPassword(),
  ttl: 60 * 60 * 24 * 14,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  },
};

export function isAtLeast18(isoDate: string, now = new Date()) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return false;
  const born = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  );
  if (Number.isNaN(born.getTime())) return false;
  const eighteenth = new Date(
    born.getFullYear() + 18,
    born.getMonth(),
    born.getDate(),
  );
  return now >= eighteenth;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
