import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listWatch } from "@/lib/watchlist";
import { companiesFor } from "@/data/companies";
import { allPrograms } from "@/lib/discovered";

export const Route = createFileRoute("/watchlist")({ component: WatchPage });

const spa = import.meta.env.VITE_SPA === "1";

function WatchPage() {
  const { user, isPending } = useCurrentUserState();
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => {
    if (!user && !spa) return;
    listWatch()
      .then((rows) => setIds(rows.map((r) => r.development_id)))
      .catch(() => setIds([]));
  }, [user]);

  if (isPending && !spa) {
    return (
      <AppShell>
        <main className="mx-auto max-w-3xl px-4 py-16">
          <div className="h-8 w-48 animate-pulse rounded bg-elevated" />
        </main>
      </AppShell>
    );
  }
  if (!user && !spa) return <RedirectToSignIn />;

  const items = allPrograms().filter((d) => ids?.includes(d.id));

  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl">Watchlist</h1>
        <p className="mt-2 text-sm text-muted">Programs you pinned from the pipeline.</p>
        <ul className="mt-8 space-y-3">
          {ids !== null && items.length === 0 && (
            <li className="text-sm text-muted">
              Empty. Open any program and tap Watch.
            </li>
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
