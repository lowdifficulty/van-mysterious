import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionOptions, type VanSession } from "@/lib/session-options";

export {
  isAtLeast18,
  isValidEmail,
  SESSION_COOKIE,
  sessionOptions,
  type VanSession,
} from "@/lib/session-options";

export async function getSession() {
  return getIronSession<VanSession>(await cookies(), sessionOptions);
}

export async function requireAdmission() {
  const session = await getSession();
  if (session.studio) return session;
  if (!session.admitted) redirect("/enter");
  return session;
}

export async function requireStudio() {
  const session = await getSession();
  if (!session.studio) redirect("/login");
  return session;
}
