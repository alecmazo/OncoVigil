import type {
  CancerType,
  Development,
  MechStep,
  Modality,
  PipelineStage,
} from "@/data/pipeline";
import { developments } from "@/data/pipeline";
import { COMPANIES } from "@/data/companies";

type CtStudy = {
  protocolSection?: {
    identificationModule?: {
      nctId?: string;
      briefTitle?: string;
      officialTitle?: string;
    };
    statusModule?: {
      overallStatus?: string;
      lastUpdatePostDateStruct?: { date?: string };
      startDateStruct?: { date?: string };
    };
    sponsorCollaboratorsModule?: {
      leadSponsor?: { name?: string };
      collaborators?: { name?: string }[];
    };
    conditionsModule?: { conditions?: string[] };
    designModule?: { phases?: string[] };
    armsInterventionsModule?: {
      interventions?: { name?: string; type?: string; description?: string }[];
    };
    descriptionModule?: { briefSummary?: string };
  };
};

type CtResponse = { studies?: CtStudy[] };

const QUERIES = [
  "mRNA neoantigen cancer vaccine melanoma OR prostate OR colorectal OR NSCLC",
  "T-cell engager prostate cancer PSMA OR KLK2",
  "CAR-T prostate OR colorectal OR GCC OR PSCA",
  "IL-15 OR nogapendekin OR ANKTIVA cancer",
  "antibody-drug conjugate colorectal OR prostate",
  "personalized cancer vaccine BioNTech OR Moderna",
];

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function guessCancer(text: string): CancerType[] {
  const t = text.toLowerCase();
  const out: CancerType[] = [];
  if (/melanoma/.test(t)) out.push("melanoma");
  if (/prostate|mcrpc|cspc/.test(t)) out.push("prostate");
  if (/colorectal|colon|rectal|\bcrc\b/.test(t)) out.push("colorectal");
  if (/lung|nsclc|sclc/.test(t)) out.push("lung");
  if (/bladder|urothelial|nmibc/.test(t)) out.push("bladder");
  if (/kidney|renal cell|\brcc\b/.test(t)) out.push("kidney");
  if (/pancrea/.test(t)) out.push("pancreatic");
  if (/myeloma/.test(t)) out.push("myeloma");
  if (out.length === 0) out.push("solid-tumors");
  return out;
}

function guessModality(text: string): Modality {
  const t = text.toLowerCase();
  if (/mrna-4157|intismeran|personalized neoantigen|individualized neoantigen/.test(t))
    return "mrna-personalized";
  if (/mrna|rna vaccine|lipoplex/.test(t)) return "mrna-shared";
  if (/car-t|car t|chimeric antigen/.test(t)) return "car-t";
  if (/il-15|il15|nogapendekin|anktiva|bioshield/.test(t)) return "il15-bioshield";
  if (/t cell engager|t-cell engager|bispecific.*cd3|cd3.*bispecific/.test(t))
    return "t-cell-engager";
  if (/pd-1.*vegf|vegf.*pd-1|pd-l1.*vegf/.test(t)) return "bispecific-io";
  if (/antibody-drug|adc\b|conjugate/.test(t)) return "adc";
  if (/parp/.test(t)) return "parp";
  if (/oncolytic|adenovirus|herpes|reovirus|pelareorep/.test(t)) return "viral-immuno";
  if (/pd-1|pd-l1|pembrolizumab|nivolumab|cemiplimab|checkpoint/.test(t)) return "checkpoint";
  return "t-cell-engager";
}

function guessStage(phases?: string[]): PipelineStage {
  const p = (phases ?? []).join(" ").toUpperCase();
  if (p.includes("PHASE3") || p.includes("PHASE 3")) return "phase-3";
  if (p.includes("PHASE2") || p.includes("PHASE 2")) return "phase-2";
  if (p.includes("PHASE4")) return "approved";
  return "phase-1";
}

function stepsFor(modality: Modality, name: string): MechStep[] {
  const n = name.split("(")[0]?.trim() || "the drug";
  const catalog: Record<Modality, MechStep[]> = {
    "mrna-personalized": [
      { title: "Sequence the tumor", body: `${n} starts from this patient's mutations — a one-batch cassette.`, scene: "biopsy" },
      { title: "Encode neoantigens", body: "Selected mutations are written into mRNA.", scene: "encode" },
      { title: "Lipid nanoparticle delivery", body: "The message is injected so dendritic cells can read it.", scene: "lnp" },
      { title: "Train T cells", body: "The immune system learns the tumor's fingerprint and hunts leftover cells.", scene: "train" },
    ],
    "mrna-shared": [
      { title: "Shared antigen cassette", body: `${n} encodes tumor antigens common to many patients.`, scene: "encode" },
      { title: "Deliver mRNA", body: "Lipid particles carry the message into antigen-presenting cells.", scene: "lnp" },
      { title: "Present and train", body: "T cells that recognize those antigens expand.", scene: "train" },
      { title: "Hunt tumor cells", body: "Trained T cells look for matching cancer.", scene: "hunt" },
    ],
    "t-cell-engager": [
      { title: "Two-headed antibody", body: `${n} binds a tumor antigen with one arm and CD3 on T cells with the other.`, scene: "dualbind" },
      { title: "Forced synapse", body: "Any nearby T cell is pulled onto the cancer cell.", scene: "synapse" },
      { title: "Kill", body: "The T cell releases perforin and granzymes.", scene: "kill" },
    ],
    "car-t": [
      { title: "Harvest T cells", body: "The patient's T cells are collected.", scene: "harvest" },
      { title: "Engineer a receptor", body: `${n} adds a chimeric receptor aimed at the tumor antigen.`, scene: "engineer" },
      { title: "Infuse and kill", body: "Armed cells expand and attack marked cancer.", scene: "kill" },
    ],
    "il15-bioshield": [
      { title: "IL-15 superagonist", body: `${n} drives NK and CD8 T-cell proliferation.`, scene: "expand" },
      { title: "Restore lymphocytes", body: "Counts recover after lymphodepleting therapy.", scene: "lymphopenia" },
      { title: "Sustain the hunt", body: "A larger killer pool stays on the tumor.", scene: "hunt" },
    ],
    checkpoint: [
      { title: "PD-1 blockade", body: `${n} takes the brakes off exhausted T cells.`, scene: "checkpoint" },
      { title: "T cells stay active", body: "The existing anti-tumor army is less likely to shut down.", scene: "train" },
      { title: "Hunt", body: "Reactivated T cells continue killing.", scene: "hunt" },
    ],
    "viral-immuno": [
      { title: "Engineered virus", body: `${n} is injected into or near tumor.`, scene: "virus" },
      { title: "Lysis + antigen dump", body: "Infected cancer cells burst and spill targets.", scene: "kill" },
      { title: "Immune flare", body: "T cells notice the debris and spread the attack.", scene: "hunt" },
    ],
    adc: [
      { title: "Antibody finds the antigen", body: `${n} homes to a tumor surface marker.`, scene: "adc" },
      { title: "Internalize the payload", body: "The cell swallows a cytotoxic warhead.", scene: "kill" },
      { title: "Bystander kill", body: "Nearby antigen-low cells can also die.", scene: "hunt" },
    ],
    parp: [
      { title: "DNA repair trap", body: `${n} blocks PARP in HRR-deficient tumors.`, scene: "parp" },
      { title: "Synthetic lethality", body: "Unrepaired breaks accumulate until the cell dies.", scene: "kill" },
    ],
    "bispecific-io": [
      { title: "PD-1 + VEGF in one antibody", body: `${n} blocks immune exhaustion and tumor blood supply together.`, scene: "vegf" },
      { title: "Starve + unleash", body: "Vessels normalize while T cells stay on.", scene: "checkpoint" },
      { title: "Shrink", body: "The tumor loses both camouflage and plumbing.", scene: "kill" },
    ],
  };
  return catalog[modality];
}

function knownIds() {
  return new Set(developments.map((d) => d.id.toLowerCase()));
}

function knownNcts() {
  const s = new Set<string>();
  for (const d of developments) {
    if (d.trial?.nct) s.add(d.trial.nct.toUpperCase());
  }
  return s;
}

function knownNames() {
  return developments.map((d) => d.name.toLowerCase());
}

export async function fetchRecentTrials(): Promise<Development[]> {
  const studies: CtStudy[] = [];
  await Promise.all(
    QUERIES.map(async (q) => {
      const url = new URL("https://clinicaltrials.gov/api/v2/studies");
      url.searchParams.set("query.term", q);
      url.searchParams.set(
        "filter.overallStatus",
        "RECRUITING,ACTIVE_NOT_RECRUITING,ENROLLING_BY_INVITATION,NOT_YET_RECRUITING",
      );
      url.searchParams.set("pageSize", "12");
      url.searchParams.set("sort", "LastUpdatePostDate");
      url.searchParams.set("format", "json");
      try {
        const res = await fetch(url.toString());
        if (!res.ok) return;
        const body = (await res.json()) as CtResponse;
        studies.push(...(body.studies ?? []));
      } catch {
        /* network / CORS — skip this query */
      }
    }),
  );

  const seenNct = knownNcts();
  const seenId = knownIds();
  const names = knownNames();
  const out: Development[] = [];

  for (const st of studies) {
    const idn = st.protocolSection?.identificationModule;
    const nct = idn?.nctId?.toUpperCase();
    if (!nct || seenNct.has(nct)) continue;
    seenNct.add(nct);
    const title = idn?.briefTitle || idn?.officialTitle || nct;
    if (names.some((n) => n.includes(title.toLowerCase().slice(0, 24)))) continue;
    const id = slug(nct);
    if (seenId.has(id)) continue;
    seenId.add(id);

    const sponsor = st.protocolSection?.sponsorCollaboratorsModule;
    const sponsors = [
      sponsor?.leadSponsor?.name,
      ...(sponsor?.collaborators ?? []).map((c) => c.name),
    ].filter((s): s is string => Boolean(s));
    const conditions = st.protocolSection?.conditionsModule?.conditions ?? [];
    const interventions = st.protocolSection?.armsInterventionsModule?.interventions ?? [];
    const summary = st.protocolSection?.descriptionModule?.briefSummary ?? "";
    const blob = `${title} ${conditions.join(" ")} ${interventions.map((i) => `${i.name} ${i.description}`).join(" ")} ${summary}`;
    const modality = guessModality(blob);
    const cancers = guessCancer(blob);
    const stage = guessStage(st.protocolSection?.designModule?.phases);
    const date =
      st.protocolSection?.statusModule?.lastUpdatePostDateStruct?.date ??
      new Date().toISOString().slice(0, 10);
    const drug =
      interventions.find((i) => /drug|biological|combination/i.test(i.type ?? ""))?.name ??
      interventions[0]?.name ??
      title;
    const shortName = drug.length > 42 ? drug.slice(0, 40) + "…" : drug;
    const what =
      summary.replace(/\s+/g, " ").trim().slice(0, 420) ||
      `${drug} is in ${stage.replace("-", " ")} for ${cancers.join(", ")}.`;

    out.push({
      id,
      name: `${drug} — ${title}`,
      shortName,
      sponsors: sponsors.length ? sponsors : ["Unknown sponsor"],
      cancers,
      modality,
      stage,
      date: date.slice(0, 10),
      headline: title,
      whatItDoes: what,
      howItWorks: `${drug} (${modality.replace(/-/g, " ")}). Pulled live from ClinicalTrials.gov ${nct}. Open the walkthrough for a mechanism sketch based on the trial description.`,
      trial: {
        name: title,
        nct,
        result: st.protocolSection?.statusModule?.overallStatus
          ? `Status: ${st.protocolSection.statusModule.overallStatus}`
          : undefined,
      },
      nextSteps: "Confirm eligibility on ClinicalTrials.gov and watch for readouts / protocol amendments.",
      sources: [
        { label: `${nct} · ClinicalTrials.gov`, url: `https://clinicaltrials.gov/study/${nct}` },
      ],
      steps: stepsFor(modality, drug),
      impact: "watch",
    });
  }

  return out.slice(0, 24);
}

export function matchCompanyIds(sponsors: string[]): string[] {
  const ids: string[] = [];
  for (const s of sponsors) {
    const hay = s.toLowerCase();
    for (const c of Object.values(COMPANIES)) {
      if (hay.includes(c.name.toLowerCase().split("/")[0]!.trim().toLowerCase()) || hay.includes(c.id)) {
        if (!ids.includes(c.id)) ids.push(c.id);
      }
    }
  }
  return ids;
}
