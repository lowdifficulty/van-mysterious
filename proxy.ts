import { getIronSession } from "iron-session";
import { NextResponse, type NextRequest } from "next/server";
import { sessionOptions, type VanSession } from "@/lib/session-options";

const publicPaths = new Set([
  "/enter",
  "/policies",
  "/van",
  "/login",
  "/site.webmanifest",
  "/opengraph-image",
  "/twitter-image",
  "/apple-icon",
  "/robots.txt",
  "/sitemap.xml",
  "/api/enter",
  "/api/agree",
  "/api/logout",
  "/api/van/login",
  "/api/van/logout",
  "/api/van/content",
]);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  if (publicPaths.has(pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession<VanSession>(
    request,
    response,
    sessionOptions,
  );

  if (!session.admitted && !session.studio) {
    const url = request.nextUrl.clone();
    url.pathname = "/enter";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
