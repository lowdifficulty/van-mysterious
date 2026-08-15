import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { loadSiteContent, saveSiteContent } from "@/lib/site-store";
import type { SiteContent } from "@/lib/site-content-types";

export async function GET() {
  const session = await getSession();
  if (!session.studio) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await loadSiteContent());
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.studio) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = (await request.json().catch(() => null)) as SiteContent | null;
  if (!content?.site?.name) {
    return NextResponse.json({ error: "Invalid content." }, { status: 400 });
  }
  await saveSiteContent(content);
  return NextResponse.json({ ok: true });
}
