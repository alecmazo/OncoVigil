const KEY = "oncovigil.watch.v1";

export function localListWatch(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function localToggleWatch(id: string): { watching: boolean } {
  const ids = localListWatch();
  const i = ids.indexOf(id);
  if (i >= 0) ids.splice(i, 1);
  else ids.unshift(id);
  window.localStorage.setItem(KEY, JSON.stringify(ids));
  return { watching: i < 0 };
}
