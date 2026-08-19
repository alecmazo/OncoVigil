import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MechStep, SceneKind } from "@/data/pipeline";

const SCENE_LABEL: Record<SceneKind, string> = {
  biopsy: "Tumor sample",
  encode: "mRNA design",
  lnp: "Delivery",
  present: "Antigen display",
  train: "T-cell priming",
  hunt: "Patrol",
  checkpoint: "PD-1 brake",
  dualbind: "Bispecific",
  synapse: "Immune synapse",
  kill: "Cytotoxicity",
  expand: "IL-15 expansion",
  lymphopenia: "Empty barracks",
  harvest: "Apheresis",
  engineer: "CAR write",
  virus: "Vector",
  adc: "ADC docking",
  parp: "DNA repair trap",
  vegf: "Vessel + checkpoint",
  spop: "SPOP ligase",
  atr: "ATR checkpoint",
};

const VIDEO_SCENES: Partial<Record<SceneKind, true>> = {
  lnp: true,
  train: true,
  dualbind: true,
  kill: true,
  expand: true,
  adc: true,
  spop: true,
  atr: true,
};

function asset(kind: SceneKind, ext: "jpg" | "mp4") {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}mechanisms/${kind}.${ext}`;
}

function SceneArt({ kind, playing }: { kind: SceneKind; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(VIDEO_SCENES[kind]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) void el.play().catch(() => undefined);
    else el.pause();
  }, [playing, kind]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      {hasVideo ? (
        <video
          ref={ref}
          key={kind}
          className="h-full w-full object-cover"
          src={asset(kind, "mp4")}
          poster={asset(kind, "jpg")}
          muted
          loop
          playsInline
          autoPlay={playing}
          aria-label={SCENE_LABEL[kind]}
        />
      ) : (
        <img
          key={kind}
          src={asset(kind, "jpg")}
          alt={SCENE_LABEL[kind]}
          className="scene-still h-full w-full object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/30" />
      <p className="absolute bottom-3 left-4 text-[10px] tracking-[0.22em] text-amber uppercase">
        {SCENE_LABEL[kind]}
      </p>
    </div>
  );
}

export function MechanismPlayer({ steps }: { steps: MechStep[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const step = steps[i];
  const dwell = VIDEO_SCENES[step?.scene ?? "biopsy"] ? 6500 : 5000;

  useEffect(() => {
    steps.forEach((s) => {
      const img = new Image();
      img.src = asset(s.scene, "jpg");
    });
  }, [steps]);

  useEffect(() => {
    if (!playing || steps.length < 2) return;
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % steps.length);
    }, dwell);
    return () => window.clearInterval(t);
  }, [playing, steps.length, dwell]);

  if (!step) return null;

  return (
    <section className="overflow-hidden rounded-[var(--radius)] border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted uppercase">How it works</p>
          <p className="font-display text-lg text-fg">
            Step {i + 1} of {steps.length}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-fg hover:bg-surface"
            onClick={() => setI((n) => (n - 1 + steps.length) % steps.length)}
            aria-label="Previous step"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-fg hover:bg-surface"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-fg hover:bg-surface"
            onClick={() => setI((n) => (n + 1) % steps.length)}
            aria-label="Next step"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div className="aspect-video bg-bg">
        <SceneArt kind={step.scene} playing={playing} />
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-[1fr_240px]">
        <div>
          <h3 className="font-display text-2xl text-fg">{step.title}</h3>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{step.body}</p>
        </div>
        <ol className="flex flex-col gap-1">
          {steps.map((s, idx) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => {
                  setI(idx);
                  setPlaying(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs",
                  idx === i ? "bg-surface text-primary" : "text-muted hover:text-fg",
                )}
              >
                <img
                  src={asset(s.scene, "jpg")}
                  alt=""
                  className="size-8 shrink-0 rounded object-cover"
                />
                <span className="tabular-nums text-[10px]">{String(idx + 1).padStart(2, "0")}</span>
                {s.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
