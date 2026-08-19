import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { localListWatch } from "@/lib/watch-local";
import { companiesFor } from "@/data/companies";
import { allPrograms } from "@/lib/discovered";

export const Route = createFileRoute("/watchlist")({ component: WatchPage });

function WatchPage() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(localListWatch());
  }, []);

  const items = allPrograms().filter((d) => ids.includes(d.id));

  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl">Watchlist</h1>
        <p className="mt-2 text-sm text-muted">Programs you pinned from the pipeline.</p>
        <ul className="mt-8 space-y-3">
          {items.length === 0 && (
            <li className="text-sm text-muted">Empty. Open any program and tap Watch.</li>
          )}
          {items.map((d) => (
            <li key={d.id}>
              <Link
                to="/d/$id"
                params={{ id: d.id }}
                className="block rounded-[var(--radius)] border border-border bg-surface p-4 hover:border-primary/50"
              >
                <p className="font-display text-xl">{d.shortName}</p>
                <p className="text-xs text-muted">
                  {companiesFor(d.id, d.sponsors)
                    .map((c) => c.name)
                    .join(" · ")}
                </p>
                <p className="text-sm text-muted">{d.headline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </AppShell>
  );
}
