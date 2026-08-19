import { useEffect, useState } from "react";
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
};

function Scene({ kind, active }: { kind: SceneKind; active: boolean }) {
  const pulse = active ? "origin-center animate-pulse" : "";
  return (
    <svg
      viewBox="0 0 640 320"
      className="h-full w-full"
      role="img"
      aria-label={SCENE_LABEL[kind]}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2fbfa4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2fbfa4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cell" x1="0" x2="1">
          <stop offset="0%" stopColor="#1a2421" />
          <stop offset="100%" stopColor="#24332e" />
        </linearGradient>
      </defs>
      <rect width="640" height="320" fill="#0a100e" />
      <circle cx="320" cy="160" r="140" fill="url(#glow)" />

      {kind === "biopsy" && (
        <>
          <ellipse cx="250" cy="160" rx="70" ry="55" fill="#3a2a2a" stroke="#c45c5c" strokeWidth="3" />
          <circle cx="230" cy="150" r="8" fill="#c45c5c" className={pulse} />
          <circle cx="268" cy="172" r="6" fill="#d4a04a" className={pulse} />
          <rect x="360" y="110" width="140" height="100" rx="8" fill="url(#cell)" stroke="#2fbfa4" strokeWidth="2" />
          <path d="M330 160 L360 160" stroke="#2fbfa4" strokeWidth="2" markerEnd="url(#a)" />
          <text x="430" y="165" textAnchor="middle" fill="#e7eee9" fontSize="13">
            sequence
          </text>
        </>
      )}

      {kind === "encode" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={120 + i * 80}
              y={130}
              width="64"
              height="60"
              rx="8"
              fill="#1a2421"
              stroke="#2fbfa4"
              strokeWidth="2"
            />
          ))}
          <text x="320" y="250" textAnchor="middle" fill="#8a9b94" fontSize="13">
            up to 34 neoantigen exons on one mRNA
          </text>
          <path
            d="M110 160 C160 80, 220 240, 280 160 S400 80, 520 160"
            fill="none"
            stroke="#2fbfa4"
            strokeWidth="3"
            className={pulse}
          />
        </>
      )}

      {kind === "lnp" && (
        <>
          <circle cx="320" cy="160" r="54" fill="#15332c" stroke="#2fbfa4" strokeWidth="4" />
          <circle cx="320" cy="160" r="22" fill="#2fbfa4" className={pulse} />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const r = ((deg - 90) * Math.PI) / 180;
            const x = 320 + Math.cos(r) * 70;
            const y = 160 + Math.sin(r) * 70;
            return <circle key={deg} cx={x} cy={y} r="8" fill="#d4a04a" />;
          })}
          <text x="320" y="250" textAnchor="middle" fill="#8a9b94" fontSize="13">
            lipid nanoparticle + mRNA cargo
          </text>
        </>
      )}

      {(kind === "present" || kind === "train") && (
        <>
          <ellipse cx="220" cy="170" rx="80" ry="60" fill="#1a2421" stroke="#2fbfa4" strokeWidth="2" />
          <rect x="270" y="100" width="18" height="40" fill="#d4a04a" />
          <rect x="250" y="88" width="58" height="14" rx="4" fill="#2fbfa4" />
          <circle cx="430" cy="160" r="42" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="3" className={pulse} />
          <text x="220" y="175" textAnchor="middle" fill="#e7eee9" fontSize="12">
            APC
          </text>
          <text x="430" y="165" textAnchor="middle" fill="#e7eee9" fontSize="12">
            T cell
          </text>
        </>
      )}

      {kind === "hunt" && (
        <>
          <circle cx="180" cy="160" r="36" fill="#3a2a2a" stroke="#c45c5c" strokeWidth="2" />
          <circle cx="320" cy="110" r="28" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="2" className={pulse} />
          <circle cx="400" cy="190" r="28" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="2" className={pulse} />
          <circle cx="500" cy="140" r="28" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="2" />
          <path d="M250 150 L300 120" stroke="#2fbfa4" strokeWidth="2" />
          <path d="M250 170 L375 185" stroke="#2fbfa4" strokeWidth="2" />
          <text x="180" y="230" textAnchor="middle" fill="#8a9b94" fontSize="12">
            residual tumor
          </text>
        </>
      )}

      {kind === "checkpoint" && (
        <>
          <circle cx="220" cy="160" r="50" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="3" />
          <circle cx="420" cy="160" r="50" fill="#3a2a2a" stroke="#c45c5c" strokeWidth="3" />
          <rect x="300" y="148" width="40" height="24" rx="4" fill="#c45c5c" />
          <rect x="308" y="120" width="24" height="24" rx="4" fill="#2fbfa4" className={pulse} />
          <text x="320" y="250" textAnchor="middle" fill="#8a9b94" fontSize="13">
            antibody blocks PD-1 / PD-L1 handshake
          </text>
        </>
      )}

      {(kind === "dualbind" || kind === "synapse") && (
        <>
          <circle cx="180" cy="160" r="48" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="3" />
          <circle cx="460" cy="160" r="48" fill="#3a2a2a" stroke="#c45c5c" strokeWidth="3" />
          <path
            d="M228 160 C280 110, 360 110, 412 160"
            fill="none"
            stroke="#2fbfa4"
            strokeWidth="6"
            className={pulse}
          />
          <circle cx="320" cy="128" r="10" fill="#d4a04a" />
          <text x="180" y="230" textAnchor="middle" fill="#8a9b94" fontSize="12">
            T cell (CD3)
          </text>
          <text x="460" y="230" textAnchor="middle" fill="#8a9b94" fontSize="12">
            tumor antigen
          </text>
        </>
      )}

      {kind === "kill" && (
        <>
          <circle cx="240" cy="160" r="44" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="3" />
          <circle cx="400" cy="160" r="50" fill="#4a3030" stroke="#c45c5c" strokeWidth="3" strokeDasharray="6 4" className={pulse} />
          {[0, 1, 2].map((i) => (
            <polygon
              key={i}
              points={`${300 + i * 12},160 ${310 + i * 12},148 ${318 + i * 12},160`}
              fill="#d4a04a"
            />
          ))}
          <text x="320" y="250" textAnchor="middle" fill="#8a9b94" fontSize="13">
            perforin / granzyme hit
          </text>
        </>
      )}

      {kind === "lymphopenia" && (
        <>
          <rect x="80" y="80" width="480" height="160" rx="12" fill="#121a18" stroke="#24332e" />
          <circle cx="160" cy="160" r="10" fill="#8a9b94" />
          <circle cx="240" cy="140" r="8" fill="#8a9b94" opacity="0.4" />
          <text x="320" y="170" textAnchor="middle" fill="#8a9b94" fontSize="14">
            too few lymphocytes to fight
          </text>
        </>
      )}

      {kind === "expand" && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx={140 + (i % 3) * 140}
              cy={110 + Math.floor(i / 3) * 100}
              r={18 + (i % 2) * 8}
              fill="#15332c"
              stroke="#2fbfa4"
              strokeWidth="2"
              className={pulse}
            />
          ))}
          <text x="320" y="300" textAnchor="middle" fill="#8a9b94" fontSize="12">
            NK · CD8 · memory T expansion
          </text>
        </>
      )}

      {(kind === "harvest" || kind === "engineer") && (
        <>
          <rect x="120" y="90" width="160" height="140" rx="16" fill="#1a2421" stroke="#2fbfa4" />
          <circle cx="200" cy="160" r="28" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="3" />
          <path d="M280 160 L360 160" stroke="#2fbfa4" strokeWidth="3" />
          <rect x="360" y="100" width="160" height="120" rx="12" fill="#15332c" stroke="#d4a04a" strokeWidth="2" />
          <text x="440" y="165" textAnchor="middle" fill="#e7eee9" fontSize="12">
            {kind === "harvest" ? "bag" : "CAR insert"}
          </text>
        </>
      )}

      {kind === "virus" && (
        <>
          <circle cx="320" cy="150" r="46" fill="#1a2421" stroke="#2fbfa4" strokeWidth="3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={320 + Math.cos(r) * 46}
                y1={150 + Math.sin(r) * 46}
                x2={320 + Math.cos(r) * 62}
                y2={150 + Math.sin(r) * 62}
                stroke="#d4a04a"
                strokeWidth="3"
              />
            );
          })}
          <text x="320" y="240" textAnchor="middle" fill="#8a9b94" fontSize="13">
            engineered viral vector
          </text>
        </>
      )}

      {kind === "adc" && (
        <>
          <circle cx="200" cy="160" r="40" fill="#1a2421" stroke="#2fbfa4" strokeWidth="3" />
          <circle cx="440" cy="160" r="56" fill="#3a2a2a" stroke="#c45c5c" strokeWidth="3" />
          <circle cx="300" cy="160" r="14" fill="#d4a04a" className={pulse} />
          <path d="M240 160 L286 160" stroke="#2fbfa4" strokeWidth="3" />
          <text x="200" y="230" textAnchor="middle" fill="#8a9b94" fontSize="12">
            antibody
          </text>
          <text x="440" y="240" textAnchor="middle" fill="#8a9b94" fontSize="12">
            tumor + payload
          </text>
        </>
      )}

      {kind === "parp" && (
        <>
          <path
            d="M160 120 Q200 80 240 120 T320 120 T400 120 T480 120"
            fill="none"
            stroke="#2fbfa4"
            strokeWidth="4"
          />
          <path
            d="M160 200 Q200 240 240 200 T320 200 T400 200 T480 200"
            fill="none"
            stroke="#8ab4ff"
            strokeWidth="4"
          />
          <rect x="300" y="140" width="40" height="40" fill="#d4a04a" className={pulse} />
          <text x="320" y="260" textAnchor="middle" fill="#8a9b94" fontSize="13">
            PARP trapped on damaged DNA
          </text>
        </>
      )}

      {kind === "vegf" && (
        <>
          <path
            d="M80 160 C160 80, 240 240, 320 160 S480 80, 560 160"
            fill="none"
            stroke="#c45c5c"
            strokeWidth="10"
            opacity="0.35"
          />
          <path
            d="M80 160 C160 110, 240 210, 320 160 S480 110, 560 160"
            fill="none"
            stroke="#2fbfa4"
            strokeWidth="6"
          />
          <circle cx="320" cy="160" r="24" fill="#1e2c38" stroke="#8ab4ff" strokeWidth="3" className={pulse} />
          <text x="320" y="250" textAnchor="middle" fill="#8a9b94" fontSize="13">
            vessels normalize · T cell can enter
          </text>
        </>
      )}
    </svg>
  );
}

export function MechanismPlayer({ steps }: { steps: MechStep[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const step = steps[i];

  useEffect(() => {
    if (!playing || steps.length < 2) return;
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % steps.length);
    }, 4200);
    return () => window.clearInterval(t);
  }, [playing, steps.length]);

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
      <div className="aspect-[16/8] bg-bg">
        <Scene kind={step.scene} active />
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-[1fr_220px]">
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
