import { developments, type Development } from "@/data/pipeline";

const KEY = "oncovigil.discovered.v1";
const META = "oncovigil.scan.meta";

type ScanMeta = { at: string; added: number; scanned: number };

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribePrograms(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function loadDiscovered(): Development[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Development[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadScanMeta(): ScanMeta | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(META);
    return raw ? (JSON.parse(raw) as ScanMeta) : null;
  } catch {
    return null;
  }
}

export function allPrograms(): Development[] {
  const extra = loadDiscovered();
  const seen = new Set(developments.map((d) => d.id));
  const out = [...developments];
  for (const d of extra) {
    if (seen.has(d.id)) continue;
    seen.add(d.id);
    out.push(d);
  }
  return out;
}

export function findProgram(id: string): Development | undefined {
  return allPrograms().find((d) => d.id === id);
}

export function mergeDiscovered(incoming: Development[]): {
  added: Development[];
  total: number;
} {
  const existing = loadDiscovered();
  const seen = new Set([...developments, ...existing].map((d) => d.id));
  const added: Development[] = [];
  for (const d of incoming) {
    if (seen.has(d.id)) continue;
    seen.add(d.id);
    added.push(d);
    existing.push(d);
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(existing));
    window.localStorage.setItem(
      META,
      JSON.stringify({
        at: new Date().toISOString(),
        added: added.length,
        scanned: incoming.length,
      } satisfies ScanMeta),
    );
  }
  notify();
  return { added, total: existing.length };
}
