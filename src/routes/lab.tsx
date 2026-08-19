import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { MechanismPlayer } from "@/components/mechanism-player";
import {
  MODALITY_LABEL,
  type MechStep,
  type Modality,
} from "@/data/pipeline";
import { allPrograms } from "@/lib/discovered";

export const Route = createFileRoute("/lab")({ component: Lab });

const ORDER: Modality[] = [
  "mrna-personalized",
  "mrna-shared",
  "t-cell-engager",
  "car-t",
  "il15-bioshield",
  "viral-immuno",
  "bispecific-io",
  "adc",
  "parp",
  "atr",
  "checkpoint",
];

function Lab() {
  const byMod = useMemo(() => {
    const map = new Map<Modality, MechStep[]>();
    for (const d of allPrograms()) {
      if (!map.has(d.modality)) map.set(d.modality, d.steps);
    }
    return map;
  }, []);
  const [mod, setMod] = useState<Modality>("mrna-personalized");
  const steps = byMod.get(mod) ?? [];
  const example = allPrograms().find((d) => d.modality === mod);

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-10 pb-20">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">Mechanism lab</p>
        <h1 className="mt-2 font-display text-4xl">How each weapon class works</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Cancer therapy is no longer one chemotherapy. These are the live modalities
          in OncoVigil — tap a class, walk the biology, then jump into a real program.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {ORDER.filter((m) => byMod.has(m)).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMod(m)}
              className={
                m === mod
                  ? "h-10 rounded-full bg-primary px-3 text-xs text-primary-fg"
                  : "h-10 rounded-full border border-border px-3 text-xs text-muted hover:text-fg"
              }
            >
              {MODALITY_LABEL[m]}
            </button>
          ))}
        </div>
        <div className="mt-8">
          <MechanismPlayer steps={steps} />
        </div>
        {example && (
          <p className="mt-6 text-sm text-muted">
            Example in the ledger:{" "}
            <Link to="/d/$id" params={{ id: example.id }} className="text-primary">
              {example.shortName}
            </Link>
          </p>
        )}
      </main>
    </AppShell>
  );
}
