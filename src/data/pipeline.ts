export type CancerType =
  | "melanoma"
  | "prostate"
  | "colorectal"
  | "lung"
  | "bladder"
  | "kidney"
  | "pancreatic"
  | "myeloma"
  | "solid-tumors";

export type Modality =
  | "mrna-personalized"
  | "mrna-shared"
  | "t-cell-engager"
  | "car-t"
  | "il15-bioshield"
  | "checkpoint"
  | "viral-immuno"
  | "adc"
  | "parp"
  | "bispecific-io";

export type PipelineStage =
  | "phase-1"
  | "phase-2"
  | "phase-3"
  | "regulatory"
  | "approved";

export type SceneKind =
  | "biopsy"
  | "encode"
  | "lnp"
  | "present"
  | "train"
  | "hunt"
  | "checkpoint"
  | "dualbind"
  | "synapse"
  | "kill"
  | "expand"
  | "lymphopenia"
  | "harvest"
  | "engineer"
  | "virus"
  | "adc"
  | "parp"
  | "vegf";

export type MechStep = {
  title: string;
  body: string;
  scene: SceneKind;
};

export type Development = {
  id: string;
  name: string;
  shortName: string;
  sponsors: string[];
  cancers: CancerType[];
  modality: Modality;
  stage: PipelineStage;
  breaking?: boolean;
  date: string;
  headline: string;
  whatItDoes: string;
  howItWorks: string;
  trial?: {
    name: string;
    n?: number;
    result?: string;
    nct?: string;
  };
  nextSteps: string;
  sources: { label: string; url: string }[];
  steps: MechStep[];
  impact: "landmark" | "high" | "watch";
};

export const CANCER_LABEL: Record<CancerType, string> = {
  melanoma: "Melanoma",
  prostate: "Prostate",
  colorectal: "Colon / CRC",
  lung: "Lung (NSCLC)",
  bladder: "Bladder",
  kidney: "Kidney (RCC)",
  pancreatic: "Pancreatic",
  myeloma: "Myeloma",
  "solid-tumors": "Solid tumors",
};

export const MODALITY_LABEL: Record<Modality, string> = {
  "mrna-personalized": "Personalized mRNA",
  "mrna-shared": "Shared-antigen mRNA",
  "t-cell-engager": "T-cell engager",
  "car-t": "CAR-T",
  "il15-bioshield": "IL-15 Bioshield",
  checkpoint: "Checkpoint (PD-1)",
  "viral-immuno": "Viral immunotherapy",
  adc: "Antibody-drug conjugate",
  parp: "PARP + ARPI",
  "bispecific-io": "PD-1/VEGF bispecific",
};

export const STAGE_LABEL: Record<PipelineStage, string> = {
  "phase-1": "Phase 1",
  "phase-2": "Phase 2",
  "phase-3": "Phase 3",
  regulatory: "Regulatory",
  approved: "Approved",
};

export const STAGE_ORDER: PipelineStage[] = [
  "phase-1",
  "phase-2",
  "phase-3",
  "regulatory",
  "approved",
];

const MRNA_STEPS: MechStep[] = [
  {
    title: "Read the tumor's fingerprint",
    body: "After surgery, the tumor is sequenced. Software picks mutations unique to that patient — neoantigens the immune system has never been trained on.",
    scene: "biopsy",
  },
  {
    title: "Write a custom mRNA cassette",
    body: "Up to 34 neoantigen sequences are encoded into a synthetic mRNA message. This is a one-patient, one-batch medicine — not a stocked vial.",
    scene: "encode",
  },
  {
    title: "Deliver in a lipid nanoparticle",
    body: "The mRNA is wrapped in a lipid nanoparticle (the same family of delivery used in COVID vaccines) and injected on a three-week schedule.",
    scene: "lnp",
  },
  {
    title: "Antigen-presenting cells display the targets",
    body: "Dendritic cells take up the mRNA, translate it into protein fragments, and pin those fragments on MHC molecules like wanted posters.",
    scene: "present",
  },
  {
    title: "T cells get trained",
    body: "Naïve T cells that recognize those posters clone themselves into a killer army specific to residual melanoma cells hiding after surgery.",
    scene: "train",
  },
  {
    title: "Hunt micrometastases",
    body: "Trained CD8 T cells patrol lymph nodes and distant sites, killing leftover cancer before it can seed a recurrence.",
    scene: "hunt",
  },
  {
    title: "Keytruda keeps the brakes off",
    body: "Pembrolizumab (anti-PD-1) blocks the PD-1 checkpoint tumors use to exhaust T cells, so the newly trained army stays active.",
    scene: "checkpoint",
  },
];

export const developments: Development[] = [
  {
    id: "intismeran-autogene",
    name: "Intismeran autogene (mRNA-4157 / V940) + Keytruda",
    shortName: "Intismeran + Keytruda",
    sponsors: ["Moderna", "Merck"],
    cancers: ["melanoma", "lung", "kidney", "bladder", "pancreatic"],
    modality: "mrna-personalized",
    stage: "phase-3",
    breaking: true,
    date: "2026-08-19",
    headline:
      "First Phase 3 win for a personalized mRNA cancer vaccine — adjuvant melanoma.",
    whatItDoes:
      "A made-to-order mRNA shot that teaches each patient's T cells to recognize mutations unique to their own melanoma. Given after the visible tumor is surgically removed, together with Merck's PD-1 drug Keytruda (pembrolizumab), to stop the cancer from coming back or spreading.",
    howItWorks:
      "Each dose encodes up to 34 patient-specific neoantigens. Lipid nanoparticles deliver the mRNA into antigen-presenting cells, which display the peptides and prime cytotoxic T cells. Keytruda prevents PD-1 from shutting those T cells down. Dose: intismeran 1 mg every 3 weeks (up to 9 doses) plus Keytruda 400 mg every 6 weeks (up to 9 cycles), about one year of adjuvant therapy.",
    trial: {
      name: "INTerpath-001 (NCT05933577)",
      n: 1137,
      result:
        "At a pre-specified interim analysis in completely resected stage IIB–IV melanoma, the combination met both recurrence-free survival (primary) and distant metastasis-free survival (key secondary) versus Keytruda alone. 2:1 randomization. Phase 2b KEYNOTE-942 previously showed 49% lower risk of recurrence or death (HR 0.51) and 59% lower risk of distant metastasis or death (HR 0.41).",
      nct: "NCT05933577",
    },
    nextSteps:
      "Full data at an upcoming medical meeting; regulatory filings planned. Overall survival still maturing. Parallel Phase 3 programs in NSCLC and Phase 2 in kidney, bladder, and pancreatic cancer.",
    sources: [
      {
        label: "Merck / Moderna (19 Aug 2026)",
        url: "https://www.merck.com/news/merck-and-moderna-announce-phase-3-interpath-001-trial-of-intismeran-autogene-plus-keytruda-met-endpoints-of-recurrence-free-survival-rfs-and-distant-metastasis-free-survival-dmfs-in-patient/",
      },
      {
        label: "Reuters",
        url: "https://www.reuters.com/legal/litigation/merck-moderna-say-melanoma-skin-cancer-vaccine-meets-goals-large-trial-2026-08-19/",
      },
    ],
    steps: MRNA_STEPS,
    impact: "landmark",
  },
  {
    id: "mrna-4157-nsclc",
    name: "Intismeran autogene — adjuvant NSCLC program",
    shortName: "mRNA-4157 NSCLC",
    sponsors: ["Moderna", "Merck"],
    cancers: ["lung"],
    modality: "mrna-personalized",
    stage: "phase-3",
    date: "2026-04-20",
    headline:
      "Same individualized neoantigen platform now in multiple Phase 3 lung trials.",
    whatItDoes:
      "Applies the melanoma playbook to non-small cell lung cancer: sequence the resected tumor, manufacture a personal mRNA cassette, and combine with pembrolizumab after surgery (including non-pCR after neoadjuvant treatment and earlier-stage NSCLC).",
    howItWorks:
      "Identical INT manufacturing: tumor mutanome → up to 34 neoantigens → LNP mRNA → T-cell priming, layered on PD-1 blockade. The bet is that high mutational burden tumors (like melanoma and smoking-related NSCLC) present enough neoantigens for the vaccine to work.",
    trial: {
      name: "INTerpath NSCLC suite (adjuvant / non-pCR / Stage I)",
      result:
        "Phase 3 ongoing across adjuvant NSCLC, non-pCR post-neoadjuvant, and Stage I adjuvant settings. No Phase 3 lung readout yet — melanoma is the first late-stage proof.",
    },
    nextSteps:
      "Melanoma Phase 3 success de-risks the platform. Watch lung event-driven analyses next.",
    sources: [
      {
        label: "Moderna pipeline",
        url: "https://www.modernatx.com/research/product-pipeline",
      },
    ],
    steps: MRNA_STEPS,
    impact: "high",
  },
  {
    id: "mrna-4359",
    name: "mRNA-4359 off-the-shelf cancer antigen therapy",
    shortName: "mRNA-4359",
    sponsors: ["Moderna"],
    cancers: ["melanoma", "solid-tumors"],
    modality: "mrna-shared",
    stage: "phase-2",
    date: "2026-04-20",
    headline:
      "An off-the-shelf mRNA that doesn't wait for a personal batch.",
    whatItDoes:
      "Unlike intismeran, mRNA-4359 is not individualized. It encodes shared tumor antigens so it can be stocked and given faster — a complementary approach for patients who cannot wait weeks for a personal vaccine.",
    howItWorks:
      "mRNA instructs cells to produce a fixed set of cancer antigens plus immune-stimulatory signals. Antigen-presenting cells display those antigens and drive T-cell responses without a patient-specific manufacturing run. AACR 2026 Phase 1/2 data showed encouraging response rates and mechanistic T-cell expansion.",
    trial: {
      name: "Phase 1/2 mRNA-4359 (AACR 2026)",
      result:
        "Moderna reported high response rates and translational evidence of antigen-specific T-cell activation in early solid-tumor cohorts.",
    },
    nextSteps: "Expanded Phase 2; positioning versus personalized INT.",
    sources: [
      {
        label: "Moderna AACR 2026 recap",
        url: "https://www.modernatx.com/irinsights-recapping-moderna-mrna-presentation",
      },
    ],
    steps: [
      {
        title: "Shared antigens, not a personal cassette",
        body: "A fixed mRNA payload encodes tumor-associated antigens common across many patients — no biopsy-to-batch wait.",
        scene: "encode",
      },
      {
        title: "Same LNP delivery",
        body: "Lipid nanoparticles carry the message into antigen-presenting cells after injection.",
        scene: "lnp",
      },
      {
        title: "T cells expand against stocked targets",
        body: "CD8 responses rise against the encoded antigens; combination with checkpoint blockade is the likely late-stage design.",
        scene: "train",
      },
    ],
    impact: "watch",
  },
  {
    id: "bnt111",
    name: "BNT111 FixVac (shared melanoma antigens)",
    shortName: "BNT111",
    sponsors: ["BioNTech", "Regeneron"],
    cancers: ["melanoma"],
    modality: "mrna-shared",
    stage: "phase-2",
    date: "2024-07-30",
    headline:
      "BioNTech's off-the-shelf melanoma mRNA — four shared antigens, IV RNA-lipoplex.",
    whatItDoes:
      "An intravenous mRNA immunotherapy encoding a fixed set of four melanoma tumor-associated antigens. Designed for patients whose tumors share those antigens, including PD-1 refractory disease, in combination with cemiplimab (Libtayo).",
    howItWorks:
      "RNA-lipoplex delivers mRNA encoding NY-ESO-1, MAGE-A3, tyrosinase and TPTE. The formulation preferentially targets dendritic cells. Unlike intismeran, manufacturing is not patient-specific — faster to dose, less personalized.",
    trial: {
      name: "Phase 2 BNT111 + cemiplimab (PD-1 refractory melanoma)",
      result:
        "Positive Phase 2 topline in anti-PD-1 relapsed/refractory unresectable Stage III/IV melanoma. Randomized late-stage plans continue.",
    },
    nextSteps:
      "Path to a registrational study; competitive read versus Moderna's individualized INT in earlier-stage disease.",
    sources: [
      {
        label: "BioNTech pipeline",
        url: "https://www.biontech.com/us/en/home/pipeline-and-products/pipeline.html",
      },
    ],
    steps: [
      {
        title: "Four shared melanoma antigens",
        body: "A stocked cassette encodes NY-ESO-1, MAGE-A3, tyrosinase and TPTE — antigens many melanomas display.",
        scene: "encode",
      },
      {
        title: "IV RNA-lipoplex to dendritic cells",
        body: "Intravenous lipoplex delivery is optimized to hit professional antigen-presenting cells in spleen and lymph nodes.",
        scene: "lnp",
      },
      {
        title: "Rescue exhausted immunity",
        body: "Combined with cemiplimab to re-open PD-1–blocked T cells in patients who already failed a checkpoint drug.",
        scene: "checkpoint",
      },
    ],
    impact: "high",
  },
  {
    id: "bnt122",
    name: "Autogene cevumeran (BNT122 / RO7198457)",
    shortName: "BNT122",
    sponsors: ["BioNTech", "Genentech / Roche"],
    cancers: ["pancreatic", "solid-tumors"],
    modality: "mrna-personalized",
    stage: "phase-2",
    date: "2026-01-15",
    headline:
      "Personalized mRNA neoantigen shot from BioNTech/Roche, including adjuvant pancreas.",
    whatItDoes:
      "An individualized neoantigen-specific immunotherapy (iNeST). Each patient's tumor mutations are encoded into mRNA so T cells can hunt residual disease after surgery — including hard-to-treat pancreatic ductal adenocarcinoma.",
    howItWorks:
      "Same family as intismeran: next-generation sequencing → neoantigen ranking → uridine mRNA in lipoplex → prime T cells against private mutations. Being tested as adjuvant therapy where micrometastases drive relapse.",
    trial: {
      name: "iNeST Phase 2 adjuvant / perioperative program",
      result:
        "Earlier academic work in pancreas showed durable T-cell clones tracking with delayed recurrence in responders. Randomized Phase 2 continues.",
    },
    nextSteps: "Randomized adjuvant readouts; comparison with Moderna INT.",
    sources: [
      {
        label: "BioNTech iNeST",
        url: "https://www.biontech.com/us/en/home/pipeline-and-products/pipeline.html",
      },
    ],
    steps: MRNA_STEPS.slice(0, 6),
    impact: "high",
  },
  {
    id: "anktiva-bioshield",
    name: "ANKTIVA (nogapendekin alfa inbakicept) — ImmunityBio Bioshield",
    shortName: "ANKTIVA Bioshield",
    sponsors: ["ImmunityBio"],
    cancers: ["bladder", "lung"],
    modality: "il15-bioshield",
    stage: "approved",
    date: "2026-06-01",
    headline:
      "IL-15 superagonist that rebuilds NK and T cells — FDA-approved in bladder, expanding toward lung.",
    whatItDoes:
      "ANKTIVA is an IL-15 receptor agonist (IL-15 superagonist fused to IL-15Rα). Patrick Soon-Shiong brands the approach 'Bioshield': restore the lymphocytes chemotherapy and tumors destroy so checkpoints and vaccines have an army to work with. U.S. FDA-approved with BCG for BCG-unresponsive NMIBC with CIS. Saudi Arabia granted a 2026 lung-cancer combination approval; U.S. lung remains investigational and was the subject of FDA warning-letter scrutiny over promotional claims.",
    howItWorks:
      "IL-15 signaling expands natural killer cells, CD4 and CD8 T cells, and memory T cells without the Treg-preferential expansion of high-dose IL-2. In bladder, it is given with BCG to amplify local innate and adaptive killing. In lung programs (QUILT), it is layered on checkpoint inhibitors ± chemo, with a claim that reversing lymphopenia (ALC > 1,000/µL) correlates with longer survival. Treat the Bioshield narrative as a mechanism hypothesis — not a universal cancer cure.",
    trial: {
      name: "QUILT bladder + QUILT-2.023 / 3.055 NSCLC",
      result:
        "Approved (U.S.) for BCG-unresponsive NMIBC CIS ± papillary tumors. SFDA (Saudi) conditional accelerated approval Jan 2026 for metastatic NSCLC with checkpoint inhibitors. U.S. FDA has not approved lung or 'all cancers' use; a March 2026 warning letter flagged overbroad promotion. Phase 3 NSCLC randomized data presented at ASCO 2026.",
    },
    nextSteps:
      "U.S. discussions on accelerated lung path; papillary NMIBC sBLA resubmission after FDA asked for more data (Jan 2026).",
    sources: [
      {
        label: "ImmunityBio ASCO 2026",
        url: "https://immunitybio.com/immunitybio-presents-new-clinical-and-comparative-data-across-lung-and-bladder-cancer-at-asco-2026/",
      },
      {
        label: "FDA warning letter (Mar 2026)",
        url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/immunitybio-inc-725468-03132026",
      },
    ],
    steps: [
      {
        title: "Cancer and chemo empty the barracks",
        body: "Many patients become lymphopenic — too few NK and T cells for a checkpoint drug to have anyone to unleash.",
        scene: "lymphopenia",
      },
      {
        title: "IL-15 superagonist signal",
        body: "ANKTIVA binds IL-15 receptors on NK, CD8 and memory T cells, a growth signal without IL-2's Treg bias.",
        scene: "expand",
      },
      {
        title: "Restore absolute lymphocyte count",
        body: "Trials report a majority of patients recovering ALC above 1,000 cells/µL — the company's immune-competence threshold.",
        scene: "expand",
      },
      {
        title: "Pair with BCG or a checkpoint",
        body: "In bladder, BCG provides antigen; in lung programs, PD-1 blockade is added once the T-cell pool is rebuilt.",
        scene: "checkpoint",
      },
      {
        title: "Memory T cells persist",
        body: "The Bioshield pitch is duration: memory T and NK cells that keep surveying after the infusion window.",
        scene: "hunt",
      },
    ],
    impact: "high",
  },
  {
    id: "vir-5500",
    name: "VIR-5500 — conditionally activated PSMA × CD3 engager",
    shortName: "VIR-5500",
    sponsors: ["Vir Biotechnology"],
    cancers: ["prostate"],
    modality: "t-cell-engager",
    stage: "phase-1",
    date: "2026-06-01",
    headline:
      "A masked T-cell engager that only arms itself inside the prostate-cancer neighborhood.",
    whatItDoes:
      "A prodrug bispecific antibody that links PSMA on prostate-cancer cells to CD3 on T cells — but only after proteases in the tumor microenvironment clip off a mask. The design aims to avoid the cytokine-release storms that doomed earlier solid-tumor T-cell engagers.",
    howItWorks:
      "Classical BiTE geometry (PSMA × CD3) plus a masking domain. In blood the CD3 arm is blocked. In the tumor, proteases unmask it, forming an immune synapse that forces any nearby T cell — even one that never saw the cancer — to kill the PSMA+ cell. Early mCRPC data: PSA90 in 53% and PSA99 in 30% of heavily pretreated patients, with T-cell infiltration on biopsy.",
    trial: {
      name: "Phase 1 VIR-5500 mCRPC",
      result:
        "PSA90 53%, PSA99 30% in heavily pretreated metastatic castration-resistant prostate cancer; T-cell infiltration confirmed. Registration trials planned for 2027.",
    },
    nextSteps: "Dose expansion; 2027 registrational start.",
    sources: [
      {
        label: "Prostate Cancer 2026 roundup",
        url: "https://binaytara.org/cancernews/article/prostate-cancer-in-2026",
      },
    ],
    steps: [
      {
        title: "Masked in circulation",
        body: "The CD3-binding arm is covered so T cells are not triggered in blood — the main safety trick versus first-generation engagers.",
        scene: "dualbind",
      },
      {
        title: "Tumor proteases clip the mask",
        body: "Enzymes abundant in the prostate-cancer microenvironment activate the drug on site.",
        scene: "synapse",
      },
      {
        title: "PSMA × CD3 synapse",
        body: "One arm grabs PSMA on the cancer cell; the other grabs CD3 on a T cell, forcing a kill synapse.",
        scene: "synapse",
      },
      {
        title: "Redirected cytotoxicity",
        body: "Perforin and granzymes punch the tumor. Any T cell can be recruited — no prior antigen training required.",
        scene: "kill",
      },
    ],
    impact: "high",
  },
  {
    id: "pasritamig",
    name: "Pasritamig (JNJ-78278343) — KLK2 × CD3 engager",
    shortName: "Pasritamig",
    sponsors: ["Johnson & Johnson"],
    cancers: ["prostate"],
    modality: "t-cell-engager",
    stage: "phase-1",
    date: "2026-02-26",
    headline:
      "First-in-class KLK2 T-cell engager plus chemo in metastatic prostate cancer.",
    whatItDoes:
      "A bispecific antibody that binds human kallikrein 2 (KLK2) — a prostate-restricted antigen — and CD3 on T cells. Being tested with docetaxel in metastatic castration-resistant prostate cancer to drag T cells onto a target the rest of the body barely expresses.",
    howItWorks:
      "KLK2 is enriched in prostate tissue. Pasritamig forms a KLK2–CD3 bridge, redirecting T cells independently of MHC. Phase 1b with docetaxel showed a chemo-like safety profile (no new signals) plus high PSA response rates, supporting a Phase 3 plan.",
    trial: {
      name: "Phase 1b pasritamig + docetaxel (ASCO GU 2026)",
      result:
        "Safety consistent with docetaxel alone; clinically meaningful PSA responses and sustained PSA reductions. Advancing toward Phase 3.",
    },
    nextSteps: "Phase 3 combination studies in mCRPC.",
    sources: [
      {
        label: "J&J ASCO GU 2026",
        url: "https://www.jnj.com/media-center/press-releases/early-study-results-from-johnson-johnson-show-promising-antitumor-activity-with-combination-of-pasritamig-and-docetaxel-in-advanced-prostate-cancer",
      },
    ],
    steps: [
      {
        title: "KLK2 as a prostate homing beacon",
        body: "Human kallikrein 2 sits on prostate cancer cells with limited normal-tissue expression — a cleaner target than ubiquitous antigens.",
        scene: "dualbind",
      },
      {
        title: "CD3 grab",
        body: "The second arm latches onto the T-cell receptor complex and hijacks the cell's kill program.",
        scene: "synapse",
      },
      {
        title: "Chemo plus engager",
        body: "Docetaxel debulks and may increase antigen release; the engager mops up with redirected T cells.",
        scene: "kill",
      },
    ],
    impact: "high",
  },
  {
    id: "can-2409",
    name: "Aglatimagene besadenovec (CAN-2409) + radiation",
    shortName: "CAN-2409",
    sponsors: ["Candel Therapeutics"],
    cancers: ["prostate"],
    modality: "viral-immuno",
    stage: "phase-3",
    date: "2026-06-02",
    headline:
      "Viral gene therapy plus radiation — first potential new localized-prostate immunotherapy in 20+ years.",
    whatItDoes:
      "A replication-defective adenovirus injected into the prostate delivers the HSV-thymidine kinase gene. Patients then take valacyclovir; infected tumor cells convert the pill into a toxic metabolite, die immunogenically, and teach the immune system while radiation is already attacking the gland.",
    howItWorks:
      "In situ vaccination: local cytotoxic conversion + antigen release + radiation. Phase 3 (n=745) with curative-intent radiotherapy showed 30% improvement in disease-free survival (HR 0.70) and 38–39% improvement in prostate-cancer-specific DFS versus placebo + radiation. Intermediate-risk subgroup: 41% PCa-specific DFS benefit (HR 0.59) at 58-month median follow-up.",
    trial: {
      name: "Phase 3 NCT01436968 (Lancet Oncology 2026)",
      n: 745,
      result:
        "DFS HR 0.70 (p=0.016); prostate-cancer-specific DFS HR 0.62 (p=0.0046). Extended follow-up: 39% PCa-specific DFS improvement (HR 0.61, p=0.0031).",
      nct: "NCT01436968",
    },
    nextSteps:
      "Regulatory discussions for localized intermediate/high-risk prostate cancer with radiotherapy.",
    sources: [
      {
        label: "Johns Hopkins / trial news",
        url: "https://www.hopkinsmedicine.org/news/newsroom/news-releases/2026/06/adding-immunotherapy-to-radiation-improves-disease-free-survival-in-localized-prostate-cancer",
      },
      {
        label: "Candel AUA 2026 follow-up",
        url: "https://ir.candeltx.com/news-releases/news-release-details/candel-therapeutics-reports-extended-clinical-benefit-over",
      },
    ],
    steps: [
      {
        title: "Inject the viral vector into the gland",
        body: "A modified adenovirus carries the herpes simplex thymidine kinase (HSV-tk) gene into prostate tumor cells.",
        scene: "virus",
      },
      {
        title: "Prodrug becomes a local chemo",
        body: "Oral valacyclovir is converted by HSV-tk into a toxic nucleotide analog — a suicide gene, but only inside transduced cells.",
        scene: "kill",
      },
      {
        title: "Immunogenic cell death + radiation",
        body: "Dying cells dump antigens while radiotherapy damages DNA. Dendritic cells pick up the debris.",
        scene: "present",
      },
      {
        title: "Systemic immune education",
        body: "T cells primed in the prostate can theoretically hunt occult disease outside the radiation field.",
        scene: "hunt",
      },
    ],
    impact: "landmark",
  },
  {
    id: "psca-car-t",
    name: "PSCA-directed CAR-T — City of Hope",
    shortName: "PSCA CAR-T",
    sponsors: ["City of Hope"],
    cancers: ["prostate"],
    modality: "car-t",
    stage: "phase-1",
    date: "2026-01-23",
    headline:
      "Patient-made T cells retargeted at PSCA, including bone metastases.",
    whatItDoes:
      "A patient's own T cells are genetically equipped with a chimeric antigen receptor that recognizes prostate stem cell antigen (PSCA). First-in-human data in Nature Medicine showed infiltration into bone lesions — historically a desert for cellular therapy.",
    howItWorks:
      "Leukapheresis → viral CAR insert → expansion → lymphodepletion → infusion. The CAR provides antigen recognition without MHC. Correlative biopsies confirmed CAR-T traffic into tumor and guided next-generation constructs to survive the prostate microenvironment.",
    trial: {
      name: "First-in-human PSCA CAR-T (Nature Medicine)",
      result:
        "Durable responses including bone lesions; biopsies showed CAR-T infiltration and antigen expression, informing design refinements.",
    },
    nextSteps: "Next-gen constructs and combination with TME modulators.",
    sources: [
      {
        label: "City of Hope / Cancer Letter",
        url: "https://cancerletter.com/sponsored-article/20260123_5/",
      },
    ],
    steps: [
      {
        title: "Harvest the patient's T cells",
        body: "Leukapheresis pulls circulating T cells — the raw material for a living drug.",
        scene: "harvest",
      },
      {
        title: "Install the PSCA CAR",
        body: "A viral vector writes a chimeric receptor: antibody-like PSCA binder fused to T-cell signaling domains.",
        scene: "engineer",
      },
      {
        title: "Infuse a targeted army",
        body: "After expansion, cells go home. When the CAR kisses PSCA, the T cell kills — MHC optional.",
        scene: "kill",
      },
    ],
    impact: "watch",
  },
  {
    id: "a2b543",
    name: "A2B543 — logic-gated CAR-T (MSLN + HLA-A*02 loss)",
    shortName: "A2B543",
    sponsors: ["A2 Biotherapeutics"],
    cancers: ["colorectal", "pancreatic", "lung", "solid-tumors"],
    modality: "car-t",
    stage: "phase-1",
    date: "2026-04-01",
    headline:
      "A CAR-T that fires only if the tumor has lost HLA-A*02 — a logic gate against healthy tissue.",
    whatItDoes:
      "Autologous CAR-T for patients who inherited HLA-A*02 but whose tumors deleted it. It targets mesothelin AND requires HLA-A*02 loss, plus a membrane-tethered IL-12 booster. FDA Fast Track April 2026 for MSLN+ solid tumors including colorectal.",
    howItWorks:
      "NOT-gate: an inhibitory receptor engages HLA-A*02 on healthy cells and blocks killing. Tumor cells that lost HLA-A*02 through immune editing no longer send the 'don't kill' signal, so the mesothelin CAR proceeds. IL-12 tethered to the membrane juiced local T-cell function without full-systemic IL-12 toxicity.",
    trial: {
      name: "EVEREST-2 (NCT06051695)",
      nct: "NCT06051695",
      result:
        "Ongoing in CRC, pancreas, NSCLC, ovarian, mesothelioma. Fast Track for germline HLA-A*02 heterozygotes with MSLN+ tumors that lost HLA-A*02.",
    },
    nextSteps: "EVEREST-2 efficacy cohorts.",
    sources: [
      {
        label: "Oncology News Central April 2026",
        url: "https://www.oncologynewscentral.com/drugs/info/oncology-drugs-fast-tracked-by-the-fda-in-april-2026",
      },
    ],
    steps: [
      {
        title: "The logic gate",
        body: "Healthy cells still display HLA-A*02 — an inhibitory receptor tells the CAR-T to stand down.",
        scene: "engineer",
      },
      {
        title: "Tumors that edited HLA away",
        body: "Cancers that deleted HLA-A*02 to hide from normal T cells accidentally become visible to this gated CAR.",
        scene: "synapse",
      },
      {
        title: "Mesothelin kill + local IL-12",
        body: "MSLN binding fires the CAR; membrane-tethered IL-12 boosts the synapse without flooding the body.",
        scene: "kill",
      },
    ],
    impact: "high",
  },
  {
    id: "sot109",
    name: "SOT109 — CDH17-targeting ADC",
    shortName: "SOT109",
    sponsors: ["SOTIO Biotech"],
    cancers: ["colorectal"],
    modality: "adc",
    stage: "phase-1",
    date: "2026-07-14",
    headline:
      "An antibody that tows chemo into colon-cancer cells via CDH17.",
    whatItDoes:
      "Antibody-drug conjugate aimed at cadherin-17, a GI-lineage protein on colorectal tumors. The antibody finds CDH17; a cytotoxic payload is released inside the cell. FDA Fast Track July 2026 for advanced CRC after standard chemo is exhausted.",
    howItWorks:
      "mAb binds CDH17 → internalization → linker cleavage → payload (typically a microtubule or topoisomerase toxin) kills the cell and may leak to neighbors (bystander effect).",
    trial: {
      name: "SOT109 advanced CRC (Fast Track)",
      result:
        "FDA Fast Track for unresectable/metastatic CRC after standard options. Early clinical program ongoing.",
    },
    nextSteps: "Dose expansion in post-chemo CRC.",
    sources: [
      {
        label: "FDA Fast Track July 2026",
        url: "https://www.oncologynewscentral.com/drugs/info/oncology-drugs-fast-tracked-granted-priority-review-by-the-fda-in-july-2026",
      },
    ],
    steps: [
      {
        title: "Antibody finds CDH17",
        body: "Cadherin-17 marks intestinal-lineage cells, concentrating the drug on CRC.",
        scene: "adc",
      },
      {
        title: "Internalize and detonate",
        body: "The conjugate is swallowed by the tumor cell; the linker clips; the toxin kills from the inside.",
        scene: "kill",
      },
    ],
    impact: "watch",
  },
  {
    id: "pelareorep-reo033",
    name: "Pelareorep — REO 033 pivotal path in RAS-mutant CRC",
    shortName: "Pelareorep REO 033",
    sponsors: ["Oncolytics Biotech"],
    cancers: ["colorectal"],
    modality: "viral-immuno",
    stage: "phase-2",
    date: "2026-08-18",
    headline:
      "FDA aligns on turning an oncolytic-virus CRC study into a pivotal trial.",
    whatItDoes:
      "Pelareorep is a reovirus that preferentially infects RAS-activated cells. In microsatellite-stable, RAS-mutant metastatic CRC — a notoriously immunotherapy-cold group — it is meant to inflame tumors so T cells will enter. FDA written alignment (18 Aug 2026) supports expanding REO 033 Part A into pivotal Part B.",
    howItWorks:
      "Systemic reovirus infection of RAS-mutant tumor cells → oncolysis + interferon programs → T-cell infiltration of previously 'cold' MSS tumors. Prior REO 022: 33% response rate and 27-month median survival vs historical benchmarks.",
    trial: {
      name: "REO 033 (2L RAS-mutant MSS mCRC)",
      result:
        "FDA alignment to use ORR/DoR for accelerated approval and PFS for full approval. Part A data expected by year-end 2026.",
    },
    nextSteps: "Part A readout YE 2026; Part B pivotal start.",
    sources: [
      {
        label: "FDA alignment (18 Aug 2026)",
        url: "https://x.com/i/trending/2089721560366219563",
      },
    ],
    steps: [
      {
        title: "A virus that likes RAS",
        body: "Pelareorep exploits the RAS pathway's interference with antiviral defenses — common in MSS colorectal cancer.",
        scene: "virus",
      },
      {
        title: "Burst and inflame",
        body: "Infected cells lyse, dumping antigens and type-I interferon into a previously cold tumor.",
        scene: "present",
      },
      {
        title: "T cells finally enter",
        body: "The goal: convert MSS CRC from checkpoint-refractory to infiltrated enough for immune control.",
        scene: "hunt",
      },
    ],
    impact: "high",
  },
  {
    id: "lumakras-vectibix",
    name: "Sotorasib (Lumakras) + panitumumab (Vectibix)",
    shortName: "Sotorasib + panitumumab",
    sponsors: ["Amgen"],
    cancers: ["colorectal"],
    modality: "adc",
    stage: "approved",
    date: "2025-01-16",
    headline:
      "Approved KRAS G12C combo — small molecule plus EGFR antibody for colon cancer.",
    whatItDoes:
      "Sotorasib covalently locks mutant KRAS G12C in the inactive state. Panitumumab blocks EGFR, cutting the rebound signaling CRC uses to escape KRAS inhibitors. FDA-approved Jan 2025 for previously treated KRAS G12C metastatic CRC.",
    howItWorks:
      "G12C is a pocket unique to that mutant. Dual blockade prevents EGFR-driven reactivation that made KRAS-inhibitor monotherapy weak in CRC (unlike lung).",
    trial: {
      name: "CodeBreaK CRC (FDA 16 Jan 2025)",
      result:
        "Approved for KRAS G12C mCRC after fluoropyrimidine, oxaliplatin and irinotecan.",
    },
    nextSteps: "Earlier-line combinations; other KRAS alleles still uncovered.",
    sources: [
      {
        label: "FDA approval",
        url: "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-sotorasib-panitumumab-kras-g12c-mutated-colorectal-cancer",
      },
    ],
    steps: [
      {
        title: "Covalent KRAS G12C lock",
        body: "Sotorasib binds the mutant cysteine and holds RAS off.",
        scene: "parp",
      },
      {
        title: "EGFR antibody cuts the escape hatch",
        body: "Panitumumab stops EGFR from re-lighting MAPK — the reason KRAS drugs failed alone in CRC.",
        scene: "kill",
      },
    ],
    impact: "high",
  },
  {
    id: "talzenna-xtandi",
    name: "Talazoparib (Talzenna) + enzalutamide (Xtandi)",
    shortName: "Talzenna + Xtandi",
    sponsors: ["Pfizer"],
    cancers: ["prostate"],
    modality: "parp",
    stage: "regulatory",
    date: "2026-07-22",
    headline:
      "FDA priority review for PARP + androgen blockade in HRR-mutant hormone-sensitive prostate cancer.",
    whatItDoes:
      "Talazoparib is a PARP inhibitor that exploits DNA-repair defects (BRCA, ATM and other HRR genes). Enzalutamide starves the androgen receptor. Together they hit metastatic castration-sensitive prostate cancer that already carries an HRR alteration — earlier than classic mCRPC PARP use.",
    howItWorks:
      "HRR-deficient cells rely on PARP-mediated repair. PARP inhibition causes synthetic lethality. Androgen-receptor blockade further stresses DNA repair in prostate cancer, which is AR-addicted.",
    trial: {
      name: "sNDA — HRR-altered mCSPC (priority review Jul 2026)",
      result:
        "FDA accepted a supplemental NDA with priority review for talazoparib + enzalutamide in HRR gene–altered metastatic castration-sensitive prostate cancer.",
    },
    nextSteps: "PDUFA decision following July 2026 filing acceptance.",
    sources: [
      {
        label: "Pfizer / FDA July 2026",
        url: "https://www.oncologynewscentral.com/drugs/info/oncology-drugs-fast-tracked-granted-priority-review-by-the-fda-in-july-2026",
      },
    ],
    steps: [
      {
        title: "HRR mutation = a broken spare tire",
        body: "BRCA/ATM-altered prostate cancers cannot faithfully repair double-strand DNA breaks.",
        scene: "parp",
      },
      {
        title: "PARP inhibitor removes the last repair path",
        body: "Talazoparib traps PARP on DNA. Combined with enzalutamide's AR blockade, the cell accumulates lethal damage.",
        scene: "kill",
      },
    ],
    impact: "high",
  },
  {
    id: "ivonescimab",
    name: "Ivonescimab (PD-1 × VEGF bispecific) + chemo",
    shortName: "Ivonescimab",
    sponsors: ["Summit Therapeutics"],
    cancers: ["lung"],
    modality: "bispecific-io",
    stage: "regulatory",
    date: "2026-01-29",
    headline:
      "PDUFA 14 Nov 2026 — one molecule that blocks PD-1 and VEGF in EGFR-mutant lung cancer.",
    whatItDoes:
      "A tetravalent bispecific that simultaneously blocks PD-1 (so T cells stay on) and VEGF (so tumor vessels normalize and the microenvironment is less immunosuppressive). Under FDA review with chemo for EGFR-mutated non-squamous NSCLC after a TKI such as osimertinib.",
    howItWorks:
      "VEGF blockade can increase T-cell infiltration; PD-1 blockade keeps those T cells from exhausting. Doing both in one antibody concentrates activity in VEGF-high, PD-1-rich tumor niches. HARMONi Phase 3 vs chemo after 3rd-generation EGFR TKI is the BLA basis.",
    trial: {
      name: "HARMONi Phase 3 (BLA accepted Jan 2026)",
      result:
        "FDA PDUFA goal date 14 November 2026 for ivonescimab + chemo in EGFRm non-squamous NSCLC post-TKI.",
    },
    nextSteps: "FDA decision 14 Nov 2026; HARMONi-3 ongoing in other settings.",
    sources: [
      {
        label: "Summit BLA acceptance",
        url: "https://smmttx.com/news/press-releases/news-details/2026/Summit-Therapeutics-Announces-U-S-FDA-Acceptance-of-Biologics-License-Application-BLA-Seeking-Approval-for-Ivonescimab-in-Combination-with-Chemotherapy-in-Treatment-of-Patients-with-EGFRm-NSCLC-Post-TKI-Therapy/default.aspx",
      },
    ],
    steps: [
      {
        title: "Two locks, one key",
        body: "Ivonescimab binds PD-1 on T cells and VEGF in the milieu — checkpoint plus anti-angiogenic in a single protein.",
        scene: "vegf",
      },
      {
        title: "Vessels normalize, T cells enter",
        body: "Less chaotic VEGF signaling firms up tumor vasculature so immune cells can actually arrive.",
        scene: "hunt",
      },
      {
        title: "PD-1 stay-on signal",
        body: "Once inside, T cells are less likely to be switched off by PD-L1 on the tumor.",
        scene: "checkpoint",
      },
    ],
    impact: "landmark",
  },
  {
    id: "pumitamig",
    name: "Pumitamig (PD-L1 × VEGF-A) — ROSETTA CRC",
    shortName: "Pumitamig",
    sponsors: ["BioNTech / Bristol Myers Squibb partners"],
    cancers: ["colorectal"],
    modality: "bispecific-io",
    stage: "phase-2",
    date: "2026-08-07",
    headline:
      "PD-L1/VEGF bispecific + chemo versus bevacizumab + chemo in first-line CRC.",
    whatItDoes:
      "A bispecific targeting PD-L1 and VEGF-A, tested with standard chemo against bevacizumab plus chemo in previously untreated unresectable/metastatic CRC that is not dMMR/MSI-H or BRAF V600E — the huge MSS majority that does not respond to plain checkpoints.",
    howItWorks:
      "Same dual logic as ivonescimab but PD-L1 (tumor/myeloid) rather than PD-1 (T cell), plus VEGF-A. The question: can vessel + checkpoint blockade finally move MSS CRC?",
    trial: {
      name: "ROSETTA CRC-203",
      result:
        "Randomized vs bevacizumab + chemo in 1L unresectable/metastatic non-dMMR, non-BRAF V600E CRC. Recruiting as of Aug 2026.",
    },
    nextSteps: "Enrollment and first efficacy looks.",
    sources: [
      {
        label: "Fight CRC Aug 2026 roundup",
        url: "https://fightcolorectalcancer.org/august-clinical-trials-2026-roundup/",
      },
    ],
    steps: [
      {
        title: "Starve the vessels, unmask T cells",
        body: "VEGF-A arm mimics bevacizumab; PD-L1 arm tries to do what checkpoints cannot do alone in MSS CRC.",
        scene: "vegf",
      },
      {
        title: "Chemo still debulks",
        body: "Standard chemo remains the backbone; the bispecific is the immune/vascular upgrade.",
        scene: "kill",
      },
    ],
    impact: "watch",
  },
  {
    id: "gcc-car-t",
    name: "GCC-targeted CAR-T for metastatic colorectal cancer",
    shortName: "GCC CAR-T",
    sponsors: ["Academic / industry (U.S. sites)"],
    cancers: ["colorectal"],
    modality: "car-t",
    stage: "phase-1",
    date: "2026-08-07",
    headline:
      "CAR-T aimed at guanylyl cyclase C — a gut-lineage marker on CRC cells.",
    whatItDoes:
      "Engineered T cells targeting GCC (GUCY2C), expressed on colorectal epithelium and most CRC. A Phase 1 U.S. study is recruiting in metastatic disease — an attempt to bring living drugs into a solid tumor with a lineage-restricted antigen.",
    howItWorks:
      "Standard autologous CAR-T manufacturing against GCC. On-target/off-tumor risk is intestinal epithelium; trial design watches GI toxicity closely.",
    trial: {
      name: "Phase 1 GCC CAR-T (recruiting, Aug 2026)",
      result: "Early safety/dose-finding; no pivotal efficacy yet.",
    },
    nextSteps: "DLT window and expansion if GI toxicity is manageable.",
    sources: [
      {
        label: "Fight CRC trial radar",
        url: "https://fightcolorectalcancer.org/august-clinical-trials-2026-roundup/",
      },
    ],
    steps: [
      {
        title: "Pick a gut barcode",
        body: "GCC is a brush-border enzyme on intestinal cells — CRC usually keeps it.",
        scene: "harvest",
      },
      {
        title: "Write the CAR and infuse",
        body: "Patient T cells learn to see GCC. The open question is whether colon lining can tolerate the hunt.",
        scene: "engineer",
      },
      {
        title: "Seek metastatic deposits",
        body: "If on-target gut toxicity is controllable, CAR-T can reach liver and lung mets that antibodies struggle with.",
        scene: "kill",
      },
    ],
    impact: "watch",
  },
  {
    id: "tec-dara",
    name: "Teclistamab + subcutaneous daratumumab (Tec-Dara)",
    shortName: "Tec-Dara",
    sponsors: ["Johnson & Johnson"],
    cancers: ["myeloma"],
    modality: "t-cell-engager",
    stage: "approved",
    date: "2026-03-01",
    headline:
      "Approved BCMA T-cell engager combo — a template for solid-tumor engagers.",
    whatItDoes:
      "Teclistamab is a BCMAxCD3 bispecific; daratumumab is an anti-CD38 antibody. Together they were FDA-approved March 2026 for relapsed/refractory myeloma after ≥1 prior line (MajesTEC-3). Not a prostate/colon drug — included because it is the cleanest late-line proof that T-cell engagers can be used earlier and combined.",
    howItWorks:
      "Teclistamab forcibly synapses T cells onto BCMA+ plasma cells. Daratumumab strips CD38+ support cells and contributes ADCC. The pairing is a playbook: engager + targeted mAb, earlier lines.",
    trial: {
      name: "MajesTEC-3 → FDA Mar 2026",
      result:
        "Approved for relapsed/refractory multiple myeloma after at least one prior line.",
    },
    nextSteps: "Earlier-line myeloma; the solid-tumor analogue is VIR-5500 / pasritamig.",
    sources: [
      {
        label: "CRI 2026 immunotherapy report",
        url: "https://www.cancerresearch.org/cancer-immunotherapy-report-2026",
      },
    ],
    steps: [
      {
        title: "BCMA marks the plasma cell",
        body: "Teclistamab's tumor arm locks onto BCMA; the other arm grabs CD3.",
        scene: "dualbind",
      },
      {
        title: "Forced synapse + CD38 mAb",
        body: "T cells kill myeloma while daratumumab attacks the niche.",
        scene: "kill",
      },
    ],
    impact: "high",
  },
];

export function getDevelopment(id: string) {
  return developments.find((d) => d.id === id);
}

export function cancersInData(): CancerType[] {
  const set = new Set<CancerType>();
  developments.forEach((d) => d.cancers.forEach((c) => set.add(c)));
  return [...set];
}
