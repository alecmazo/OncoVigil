import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FlaskConical, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  CANCER_LABEL,
  MODALITY_LABEL,
  STAGE_LABEL,
  STAGE_ORDER,
  type CancerType,
  type Modality,
} from "@/data/pipeline";
import { companiesFor } from "@/data/companies";
import { cn } from "@/lib/utils";
import { usePrograms } from "@/lib/use-programs";
import { fetchRecentTrials } from "@/lib/scan-trials";
import { mergeDiscovered } from "@/lib/discovered";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { programs, lastScan } = usePrograms();
  const [cancer, setCancer] = useState<CancerType | "all">("all");
  const [modality, setModality] = useState<Modality | "all">("all");
  const [q, setQ] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanMsg, setScanMsg] = useState<string | null>(null);
  const [scanErr, setScanErr] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return programs.filter((d) => {
      if (cancer !== "all" && !d.cancers.includes(cancer)) return false;
      if (modality !== "all" && d.modality !== modality) return false;
      if (q.trim()) {
        const orgs = companiesFor(d.id, d.sponsors)
          .map((c) => c.name)
          .join(" ");
        const hay = `${d.name} ${d.headline} ${d.sponsors.join(" ")} ${orgs}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [programs, cancer, modality, q]);

  const breaking = programs.find((d) => d.breaking) ?? programs[0];
  const byStage = STAGE_ORDER.map((stage) => ({
    stage,
    items: filtered.filter((d) => d.stage === stage),
  }));

  const modalities = [...new Set(programs.map((d) => d.modality))];
  const cancers = [...new Set(programs.flatMap((d) => d.cancers))];

  async function refresh() {
    setScanning(true);
    setScanErr(null);
    setScanMsg(null);
    try {
      const found = await fetchRecentTrials();
      const { added } = mergeDiscovered(found);
      if (added.length === 0) {
        setScanMsg(
          `Scanned ${found.length} recent trials — already on the board. Check again next week.`,
        );
      } else {
        setScanMsg(
          `Added ${added.length} new program${added.length === 1 ? "" : "s"} from ClinicalTrials.gov.`,
        );
      }
    } catch (e) {
      setScanErr(e instanceof Error ? e.message : "Scan failed");
    } finally {
      setScanning(false);
    }
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 pb-20">
        <section className="grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">
              Cancer development cycle
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Watch the attack on cancer — mRNA, T cells, Bioshield.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              A living pipeline of biotech and hospital programs aimed at prostate, colon,
              melanoma and beyond. Refresh weekly — new trials land here from
              ClinicalTrials.gov.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              [String(programs.length), "programs"],
              [String(cancers.length), "cancer types"],
              [String(new Set(programs.map((d) => d.modality)).size), "modalities"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-[var(--radius)] border border-border bg-surface px-2 py-4">
                <p className="font-display text-2xl tabular-nums text-primary">{n}</p>
                <p className="text-xs text-muted">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {breaking && (
          <Link
            to="/d/$id"
            params={{ id: breaking.id }}
            className="mb-8 flex flex-col gap-3 rounded-[var(--radius)] border border-amber/40 bg-elevated p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-xs tracking-[0.18em] text-amber uppercase">
                {breaking.breaking ? "Breaking" : "Lead"} · {breaking.date}
              </p>
              <p className="mt-1 font-display text-2xl">{breaking.headline}</p>
              <p className="mt-1 text-sm text-muted">
                {breaking.sponsors.join(" · ")}
              </p>
            </div>
            <span className="inline-flex h-11 items-center gap-2 self-start rounded-full bg-amber px-4 text-sm text-amber-fg">
              Open walkthrough <ArrowRight className="size-4" />
            </span>
          </Link>
        )}

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sponsor, drug, or headline"
            className="h-12 flex-1 rounded-full border border-border bg-surface px-5 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={scanning}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm text-primary-fg disabled:opacity-60"
          >
            {scanning ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
            {scanning ? "Scanning trials…" : "Refresh pipeline"}
          </button>
        </div>
        {lastScan && (
          <p className="mb-3 text-xs text-muted">
            Last scan {new Date(lastScan).toLocaleString()} · weekly cadence is enough at this pace.
          </p>
        )}
        {scanMsg && <p className="mb-3 text-sm text-primary">{scanMsg}</p>}
        {scanErr && <p className="mb-3 text-sm text-danger">{scanErr}</p>}

        <div className="mb-3 flex flex-wrap gap-2">
          <FilterChip active={cancer === "all"} onClick={() => setCancer("all")}>
            All cancers
          </FilterChip>
          {cancers.map((c) => (
            <FilterChip key={c} active={cancer === c} onClick={() => setCancer(c)}>
              {CANCER_LABEL[c]}
            </FilterChip>
          ))}
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip active={modality === "all"} onClick={() => setModality("all")}>
            All modalities
          </FilterChip>
          {modalities.map((m) => (
            <FilterChip key={m} active={modality === m} onClick={() => setModality(m)}>
              {MODALITY_LABEL[m]}
            </FilterChip>
          ))}
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
          {byStage.map((col) => (
            <section key={col.stage} className="w-[260px] shrink-0">
              <h2 className="mb-3 text-xs tracking-[0.16em] text-muted uppercase">
                {STAGE_LABEL[col.stage]} · {col.items.length}
              </h2>
              <div className="flex flex-col gap-3">
                {col.items.map((d) => (
                  <Link
                    key={d.id}
                    to="/d/$id"
                    params={{ id: d.id }}
                    className="rounded-[var(--radius)] border border-border bg-surface p-4 hover:border-primary/60"
                  >
                    {d.breaking && (
                      <span className="mb-2 inline-block text-[10px] tracking-widest text-amber uppercase">
                        New
                      </span>
                    )}
                    <p className="font-display text-lg leading-snug">{d.shortName}</p>
                    <p className="mt-1 text-[11px] text-fg/80">
                      {companiesFor(d.id, d.sponsors)
                        .map((c) => c.ticker ?? c.name)
                        .join(" · ") || d.sponsors.join(" · ")}
                    </p>
                    <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted">
                      {d.headline}
                    </p>
                    <p className="mt-3 text-[10px] tracking-wide text-primary uppercase">
                      {d.cancers.map((c) => CANCER_LABEL[c]).join(" · ")}
                    </p>
                  </Link>
                ))}
                {col.items.length === 0 && (
                  <p className="text-xs text-muted">No matches</p>
                )}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14 grid gap-4 md:grid-cols-2">
          <Link
            to="/lab"
            className="flex items-start gap-4 rounded-[var(--radius)] border border-border bg-surface p-6"
          >
            <FlaskConical className="size-6 text-primary" />
            <div>
              <h2 className="font-display text-2xl">Mechanism lab</h2>
              <p className="mt-1 text-sm text-muted">
                Compare how mRNA vaccines, T-cell engagers, CAR-T and IL-15 Bioshield
                each recruit the immune system.
              </p>
            </div>
          </Link>
          <div className="flex items-start gap-4 rounded-[var(--radius)] border border-border bg-surface p-6">
            <Sparkles className="size-6 text-amber" />
            <div>
              <h2 className="font-display text-2xl">Why this cycle is different</h2>
              <p className="mt-1 text-sm text-muted">
                Personalized mRNA just cleared Phase 3 in melanoma. T-cell engagers are
                finally being masked for prostate. AI accelerates neoantigen ranking —
                the bottleneck is now manufacturing and trial design, not idea generation.
              </p>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full border px-3 text-xs",
        active
          ? "border-primary bg-primary text-primary-fg"
          : "border-border bg-surface text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
