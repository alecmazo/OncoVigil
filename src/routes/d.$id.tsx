import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Bookmark, ExternalLink, Loader2, Mail, Phone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MechanismPlayer } from "@/components/mechanism-player";
import {
  CANCER_LABEL,
  MODALITY_LABEL,
  STAGE_LABEL,
  getDevelopment,
} from "@/data/pipeline";
import { companiesFor, trialsFor } from "@/data/companies";
import { findProgram } from "@/lib/discovered";
import { askBriefing } from "@/lib/briefing";
import { listWatch, toggleWatch } from "@/lib/watchlist";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/d/$id")({
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  const d = findProgram(id) ?? getDevelopment(id);
  const { user } = useCurrentUserState();
  const spa = import.meta.env.VITE_SPA === "1";
  const canWatch = Boolean(user) || spa;
  const [watching, setWatching] = useState(false);
  const [brief, setBrief] = useState<string | null>(null);
  const [briefErr, setBriefErr] = useState<string | null>(null);
  const [loadingBrief, setLoadingBrief] = useState(false);

  useEffect(() => {
    if (!canWatch) return;
    listWatch()
      .then((rows) => setWatching(rows.some((r) => r.development_id === id)))
      .catch(() => setWatching(false));
  }, [canWatch, id]);

  if (!d) {
    return (
      <AppShell>
        <main className="mx-auto max-w-3xl px-4 py-20">
          <p className="text-muted">That program is not in the ledger.</p>
          <Link to="/" className="mt-4 inline-block text-primary">
            Back to pipeline
          </Link>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8 pb-20">
        <Link to="/" className="text-xs text-muted hover:text-fg">
          ← Pipeline
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            {d.breaking && (
              <p className="text-xs tracking-[0.18em] text-amber uppercase">
                Breaking · {format(new Date(d.date + "T12:00:00"), "d MMM yyyy")}
              </p>
            )}
            <h1 className="mt-2 font-display text-4xl">{d.shortName}</h1>
            <p className="mt-2 max-w-2xl text-muted">{d.name}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-primary/40 px-3 py-1 text-primary">
                {STAGE_LABEL[d.stage]}
              </span>
              <span className="rounded-full border border-border px-3 py-1">
                {MODALITY_LABEL[d.modality]}
              </span>
              {d.cancers.map((c) => (
                <span key={c} className="rounded-full border border-border px-3 py-1">
                  {CANCER_LABEL[c]}
                </span>
              ))}
              {d.biomarkers?.map((b) =>
                b.toUpperCase() === "SPOP" ? (
                  <Link
                    key={b}
                    to="/spop"
                    className="rounded-full border border-amber/50 px-3 py-1 text-amber hover:bg-amber/10"
                  >
                    {b} desk
                  </Link>
                ) : (
                  <span key={b} className="rounded-full border border-amber/50 px-3 py-1 text-amber">
                    {b}
                  </span>
                ),
              )}
            </div>
          </div>
          {canWatch ? (
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await toggleWatch({ data: id });
                  setWatching(res.watching);
                } catch {
                  /* session expired */
                }
              }}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm",
                watching
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border hover:border-primary",
              )}
            >
              <Bookmark className="size-4" />
              {watching ? "Watching" : "Watch"}
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm hover:border-primary"
            >
              <Bookmark className="size-4" />
              Sign in to watch
            </Link>
          )}
        </div>

        <p className="mt-8 font-display text-2xl leading-snug">{d.headline}</p>

        <Developers programId={d.id} fallback={d.sponsors} />

        <div className="mt-8">
          <MechanismPlayer steps={d.steps} />
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-[var(--radius)] border border-border bg-surface p-5">
            <h2 className="text-xs tracking-[0.16em] text-primary uppercase">
              What the drug does
            </h2>
            <p className="mt-3 text-sm leading-relaxed">{d.whatItDoes}</p>
          </article>
          <article className="rounded-[var(--radius)] border border-border bg-surface p-5">
            <h2 className="text-xs tracking-[0.16em] text-primary uppercase">
              Mechanism in one paragraph
            </h2>
            <p className="mt-3 text-sm leading-relaxed">{d.howItWorks}</p>
          </article>
        </section>

        {d.trial && (
          <article className="mt-6 rounded-[var(--radius)] border border-border bg-surface p-5">
            <h2 className="text-xs tracking-[0.16em] text-primary uppercase">Trial snapshot</h2>
            <p className="mt-2 font-display text-xl">{d.trial.name}</p>
            {d.trial.n && (
              <p className="text-sm tabular-nums text-muted">{d.trial.n} patients</p>
            )}
            {d.trial.result && (
              <p className="mt-3 text-sm leading-relaxed">{d.trial.result}</p>
            )}
            <TrialLinks programId={d.id} nct={d.trial.nct} />
          </article>
        )}

        <article className="mt-6 rounded-[var(--radius)] border border-border bg-surface p-5">
          <h2 className="text-xs tracking-[0.16em] text-primary uppercase">Next</h2>
          <p className="mt-3 text-sm leading-relaxed">{d.nextSteps}</p>
        </article>

        <section className="mt-6 rounded-[var(--radius)] border border-border bg-elevated p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl">Ask Grok for a briefing</h2>
            <button
              type="button"
              disabled={loadingBrief}
              onClick={async () => {
                setLoadingBrief(true);
                setBriefErr(null);
                const res = await askBriefing({ data: { id } });
                setLoadingBrief(false);
                if (!res.ok) setBriefErr(res.error);
                else setBrief(res.text);
              }}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm text-primary-fg"
            >
              {loadingBrief && <Loader2 className="size-4 animate-spin" />}
              Generate briefing
            </button>
          </div>
          {briefErr && <p className="mt-3 text-sm text-danger">{briefErr}</p>}
          {brief && (
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted">
              {brief}
            </div>
          )}
        </section>

        <ul className="mt-8 space-y-2">
          <li className="text-xs tracking-[0.16em] text-muted uppercase">Sources</li>
          {d.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                {s.label} <ExternalLink className="size-3" />
              </a>
            </li>
          ))}
        </ul>
      </main>
    </AppShell>
  );
}

function Developers({ programId, fallback }: { programId: string; fallback: string[] }) {
  const orgs = companiesFor(programId, fallback);
  if (orgs.length === 0) {
    return <p className="mt-2 text-sm text-muted">{fallback.join(" · ")}</p>;
  }
  return (
    <section className="mt-6 grid gap-4 md:grid-cols-2">
      {orgs.map((c) => (
        <article key={c.id} className="rounded-[var(--radius)] border border-border bg-surface p-5">
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Developer</p>
          <h2 className="mt-1 font-display text-2xl">{c.name}</h2>
          {c.ticker && <p className="text-sm tabular-nums text-muted">{c.ticker}</p>}
          <p className="mt-1 text-sm text-muted">{c.hq}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={c.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                Company site <ExternalLink className="inline size-3" />
              </a>
            </li>
            {c.pipelineUrl && (
              <li>
                <a href={c.pipelineUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  Pipeline <ExternalLink className="inline size-3" />
                </a>
              </li>
            )}
            {c.irUrl && (
              <li>
                <a href={c.irUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  Investor relations <ExternalLink className="inline size-3" />
                </a>
              </li>
            )}
            {c.trialsHub && (
              <li>
                <a href={c.trialsHub} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  Company trial finder <ExternalLink className="inline size-3" />
                </a>
              </li>
            )}
            {c.irEmail && (
              <li className="flex items-center gap-2 text-muted">
                <Mail className="size-3.5 shrink-0" />
                <a href={`mailto:${c.irEmail}`} className="hover:text-fg">
                  {c.irEmail}
                </a>
              </li>
            )}
            {c.mediaEmail && (
              <li className="flex items-center gap-2 text-muted">
                <Mail className="size-3.5 shrink-0" />
                <a href={`mailto:${c.mediaEmail}`} className="hover:text-fg">
                  Media: {c.mediaEmail}
                </a>
              </li>
            )}
            {c.phone && (
              <li className="flex items-center gap-2 text-muted">
                <Phone className="size-3.5 shrink-0" />
                {c.phone}
              </li>
            )}
          </ul>
        </article>
      ))}
    </section>
  );
}

function TrialLinks({ programId, nct }: { programId: string; nct?: string }) {
  const extras = trialsFor(programId);
  const seen = new Set(extras.map((t) => t.nct).filter(Boolean));
  return (
    <ul className="mt-4 space-y-2">
      {nct && !seen.has(nct) && (
        <li>
          <a
            href={`https://clinicaltrials.gov/study/${nct}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            {nct} on ClinicalTrials.gov <ExternalLink className="size-3" />
          </a>
        </li>
      )}
      {extras.map((t) => (
        <li key={t.url}>
          <a
            href={t.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            {t.nct ? `${t.nct} · ${t.name}` : t.name} <ExternalLink className="size-3" />
          </a>
        </li>
      ))}
    </ul>
  );
}
