export function getPath(obj: unknown, pathStr: string): string {
  let current: unknown = obj;
  for (const part of pathStr.split(".")) {
    if (current == null || typeof current !== "object") return "";
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : current == null ? "" : String(current);
}

export function setPath<T>(obj: T, pathStr: string, value: string): T {
  const parts = pathStr.split(".");
  const next = structuredClone(obj) as Record<string, unknown>;
  let current: Record<string, unknown> = next;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i];
    const child = current[key];
    if (child == null || typeof child !== "object") return obj;
    current[key] = Array.isArray(child) ? [...child] : { ...child };
    current = current[key] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
  return next as T;
}
