const KEY = "oncovigil.watch.v1";

function load(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function save(ids: string[]) {
  window.localStorage.setItem(KEY, JSON.stringify(ids));
}

export const listWatch = async () => load().map((development_id) => ({ development_id }));

export const toggleWatch = async ({ data: id }: { data: string }) => {
  const ids = load();
  const i = ids.indexOf(id);
  if (i >= 0) {
    ids.splice(i, 1);
    save(ids);
    return { watching: false as const };
  }
  ids.unshift(id);
  save(ids);
  return { watching: true as const };
};
