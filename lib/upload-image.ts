export async function uploadStudioImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch("/api/van/upload", { method: "POST", body });
  const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
  if (!response.ok || !data?.url) {
    throw new Error(data?.error || "Upload failed.");
  }
  return data.url;
}
