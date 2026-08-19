import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, RefreshCw, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { MechanismPlayer } from "@/components/mechanism-player";
import { isSpopProgram, STAGE_LABEL, type MechStep } from "@/data/pipeline";
import { companiesFor } from "@/data/companies";
import { usePrograms } from "@/lib/use-programs";
import { fetchRecentTrials } from "@/lib/scan-trials";
import { mergeDiscovered } from "@/lib/discovered";
import { pingSpopAlert } from "@/lib/spop-alert";

export const Route = createFileRoute("/spop")({ component: SpopDesk });

const BIOLOGY: MechStep[] = [
  {
    title: "SPOP tags proteins for destruction",
    body: "Speckle-type POZ protein is the substrate adaptor of a cullin-3 RING E3 ligase. In prostate epithelium it keeps AR coactivators, BET proteins (BRD2/3/4), SRC-3, DEK and TRIM24 from accumulating.",
    scene: "spop",
  },
  {
    title: "MATH-domain hotspots break recognition",
    body: "Y87, F102, F133, W131 and neighboring MATH residues wreck the binding pocket. This is the most common point-mutation subtype in primary prostate cancer (~8–15%), mutually exclusive with ERG fusions.",
    scene: "spop",
  },
  {
    title: "AR runs hot — ARPI still works",
    body: "Because AR machinery piles up, SPOP-mutant tumors are unusually sensitive to androgen-receptor pathway inhibitors and have longer overall survival despite aggressive histology. That is prognostic, not a targeted drug.",
    scene: "kill",
  },
  {
    title: "Do not chase BET inhibitors here",
    body: "Stabilized BRD4 makes SPOP-mutant cells resistant to BET bromodomain inhibitors. The live therapeutic bets are DNA-damage synthetic lethality: PARP (Akeega) and ATR (tuvusertib).",
    scene: "atr",
  },
];

function SpopDesk() {
  const { programs, lastScan } = usePrograms();
  const hits = useMemo(() => programs.filter(isSpopProgram), [programs]);
  const [scanning, setScanning] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function refresh() {
    setScanning(true);
    setErr(null);
    setMsg(null);
    try {
      const found = await fetchRecentTrials();
      const { added } = mergeDiscovered(found);
      const spop = added.filter(isSpopProgram);
      if (spop.length) {
        pingSpopAlert(spop.map((d) => d.shortName || d.name));
        setMsg(`SPOP ALERT — ${spop.length} new program${spop.length === 1 ? "" : "s"} naming SPOP.`);
      } else if (added.length) {
        setMsg(`No new SPOP-named trials. ${added.length} other programs added to the main board.`);
      } else {
        setMsg("Still no new SPOP-specific trials. Mayo Akeega is terminated; tuvusertib is closed to enrollment.");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Scan failed");
    } finally {
      setScanning(false);
    }
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10 pb-20">
        <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-amber uppercase">
          <AlertTriangle className="size-3.5" /> Priority surveillance
        </p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">SPOP-mutant prostate cancer</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          This is the watch you asked for. Anyone who enrolls, doses, or publishes against
          SPOP mutations lands here first. As of August 2026, no trial is recruiting
          SPOP-mutant prostate cancer. Scan ClinicalTrials.gov for the word SPOP in
          prostate protocols — a new hit is treated as breaking and pings the browser.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={scanning}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-amber px-5 text-sm text-amber-fg disabled:opacity-60"
          >
            {scanning ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
            Scan for SPOP trials
          </button>
          {lastScan && (
            <span className="text-xs text-muted">Last board scan {new Date(lastScan).toLocaleString()}</span>
          )}
        </div>
        {msg && <p className="mt-3 text-sm text-amber">{msg}</p>}
        {err && <p className="mt-3 text-sm text-danger">{err}</p>}

        <section className="mt-10">
          <h2 className="font-display text-2xl">How the mutation works</h2>
          <p className="mt-2 text-sm text-muted">
            There is still no drug that binds mutant SPOP itself. Everything in the clinic is
            synthetic lethality or ARPI sensitivity.
          </p>
          <div className="mt-4">
            <MechanismPlayer steps={BIOLOGY} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl">Who is actually targeting SPOP</h2>
          <p className="mt-2 text-sm text-muted">
            {hits.length} program{hits.length === 1 ? "" : "s"} on the board name SPOP as a
            biomarker — not just prostate cancer in general.
          </p>
          <ul className="mt-5 space-y-4">
            {hits.map((d) => (
              <li key={d.id}>
                <Link
                  to="/d/$id"
                  params={{ id: d.id }}
                  className="block rounded-[var(--radius)] border border-amber/40 bg-surface p-5 hover:border-amber"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full border border-amber/50 px-2 py-0.5 text-amber">
                      SPOP
                    </span>
                    <span className="text-muted">{STAGE_LABEL[d.stage]}</span>
                  </div>
                  <p className="mt-2 font-display text-2xl">{d.shortName}</p>
                  <p className="mt-1 text-sm text-muted">
                    {companiesFor(d.id, d.sponsors).map((c) => c.name).join(" · ") ||
                      d.sponsors.join(" · ")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{d.headline}</p>
                  {d.trial?.result && (
                    <p className="mt-2 text-xs leading-relaxed text-amber">{d.trial.result}</p>
                  )}
                  {d.trial?.nct && (
                    <p className="mt-2 font-mono text-xs text-primary">{d.trial.nct}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-amber">
                    Open walkthrough <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <article className="mt-12 rounded-[var(--radius)] border border-border bg-elevated p-5 text-sm leading-relaxed text-muted">
          <h2 className="font-display text-xl text-fg">What is still missing</h2>
          <p className="mt-3">
            No biotech has a small molecule or degrader that restores SPOP function or binds
            the mutant MATH pocket. BET inhibitors are the wrong class here (BRD4 is
            stabilized). Mayo’s PARP+ARPI bet (Akeega, NCT05689021) terminated July 2026 —
            slow accrual and no efficacy at n=8. NCI’s ATR bet (tuvusertib) is closed to
            new patients. If a company files an IND against mutant SPOP itself — or a new
            PARP/ATR/WRN/POLQ trial that requires SPOP — this desk will surface it on the
            next scan, and a daily Grok watch will email you.
          </p>
        </article>
      </main>
    </AppShell>
  );
}
