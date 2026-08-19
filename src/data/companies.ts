export type Company = {
  id: string;
  name: string;
  ticker?: string;
  hq: string;
  website: string;
  pipelineUrl?: string;
  irUrl?: string;
  trialsHub?: string;
  irEmail?: string;
  mediaEmail?: string;
  phone?: string;
};

export type TrialRef = {
  name: string;
  nct?: string;
  url: string;
};

export const COMPANIES: Record<string, Company> = {
  moderna: {
    id: "moderna",
    name: "Moderna",
    ticker: "NASDAQ: MRNA",
    hq: "Cambridge, MA",
    website: "https://www.modernatx.com/",
    pipelineUrl: "https://www.modernatx.com/research/product-pipeline",
    irUrl: "https://investors.modernatx.com/",
    trialsHub: "https://trials.modernatx.com/",
    irEmail: "Ir@modernatx.com",
    mediaEmail: "Chris.Ridley@modernatx.com",
    phone: "+1 617-209-5834 (IR, Lavina Talukdar)",
  },
  merck: {
    id: "merck",
    name: "Merck & Co. (MSD)",
    ticker: "NYSE: MRK",
    hq: "Rahway, NJ",
    website: "https://www.merck.com/",
    pipelineUrl: "https://www.merck.com/research/product-pipeline/",
    irUrl: "https://www.merck.com/investor-relations/",
    trialsHub: "https://www.merckclinicaltrials.com/",
    irEmail: "investor_relations@merck.com",
    phone: "+1 732-594-1468",
  },
  biontech: {
    id: "biontech",
    name: "BioNTech SE",
    ticker: "NASDAQ: BNTX",
    hq: "Mainz, Germany",
    website: "https://www.biontech.com/",
    pipelineUrl: "https://www.biontech.com/us/en/home/pipeline-and-products/pipeline.html",
    irUrl: "https://investors.biontech.de/",
    irEmail: "investors@biontech.de",
    mediaEmail: "media@biontech.de",
  },
  regeneron: {
    id: "regeneron",
    name: "Regeneron",
    ticker: "NASDAQ: REGN",
    hq: "Tarrytown, NY",
    website: "https://www.regeneron.com/",
    irUrl: "https://investor.regeneron.com/",
    trialsHub: "https://clinicaltrials.regeneron.com/",
    irEmail: "IR@regeneron.com",
  },
  roche: {
    id: "roche",
    name: "Roche / Genentech",
    ticker: "SIX: ROG",
    hq: "Basel / South San Francisco",
    website: "https://www.roche.com/",
    pipelineUrl: "https://www.roche.com/solutions/pipeline",
    irUrl: "https://www.roche.com/investors",
    trialsHub: "https://forpatients.roche.com/",
    irEmail: "investor.relations@roche.com",
  },
  immunitybio: {
    id: "immunitybio",
    name: "ImmunityBio",
    ticker: "NASDAQ: IBRX",
    hq: "Culver City, CA",
    website: "https://immunitybio.com/",
    pipelineUrl: "https://immunitybio.com/pipeline/",
    irUrl: "https://ir.immunitybio.com/",
    irEmail: "ir@immunitybio.com",
    mediaEmail: "media@immunitybio.com",
  },
  vir: {
    id: "vir",
    name: "Vir Biotechnology",
    ticker: "NASDAQ: VIR",
    hq: "San Francisco, CA",
    website: "https://www.vir.bio/",
    pipelineUrl: "https://www.vir.bio/pipeline/",
    irUrl: "https://investors.vir.bio/",
    irEmail: "IR@vir.bio",
  },
  jnj: {
    id: "jnj",
    name: "Johnson & Johnson Innovative Medicine",
    ticker: "NYSE: JNJ",
    hq: "New Brunswick, NJ / Raritan, NJ",
    website: "https://www.jnj.com/",
    pipelineUrl: "https://www.janssen.com/oncology",
    irUrl: "https://www.investor.jnj.com/",
    trialsHub: "https://www.jnj.com/innovativemedicine/our-innovation/clinical-trials",
    irEmail: "investor-relations@its.jnj.com",
  },
  candel: {
    id: "candel",
    name: "Candel Therapeutics",
    ticker: "NASDAQ: CADL",
    hq: "Needham, MA",
    website: "https://www.candeltx.com/",
    irUrl: "https://ir.candeltx.com/",
    irEmail: "ir@candeltx.com",
  },
  cityofhope: {
    id: "cityofhope",
    name: "City of Hope",
    hq: "Duarte, CA",
    website: "https://www.cityofhope.org/",
    trialsHub: "https://www.cityofhope.org/clinical-trials",
    mediaEmail: "media@coh.org",
    phone: "+1 800-826-4673",
  },
  a2bio: {
    id: "a2bio",
    name: "A2 Biotherapeutics",
    hq: "Agoura Hills, CA",
    website: "https://www.a2bio.com/",
    pipelineUrl: "https://www.a2bio.com/pipeline/",
  },
  sotio: {
    id: "sotio",
    name: "SOTIO Biotech",
    hq: "Prague / Boston",
    website: "https://www.sotio.com/",
    pipelineUrl: "https://www.sotio.com/pipeline/",
    irEmail: "info@sotio.com",
  },
  oncolytics: {
    id: "oncolytics",
    name: "Oncolytics Biotech",
    ticker: "NASDAQ: ONCY",
    hq: "Calgary / San Diego",
    website: "https://oncolyticsbiotech.com/",
    pipelineUrl: "https://oncolyticsbiotech.com/pipeline/",
    irUrl: "https://oncolyticsbiotech.com/investors/",
    irEmail: "ir@oncolytics.ca",
  },
  amgen: {
    id: "amgen",
    name: "Amgen",
    ticker: "NASDAQ: AMGN",
    hq: "Thousand Oaks, CA",
    website: "https://www.amgen.com/",
    pipelineUrl: "https://www.amgenpipeline.com/",
    irUrl: "https://investors.amgen.com/",
    trialsHub: "https://www.amgentrials.com/",
    irEmail: "investor.relations@amgen.com",
  },
  pfizer: {
    id: "pfizer",
    name: "Pfizer",
    ticker: "NYSE: PFE",
    hq: "New York, NY",
    website: "https://www.pfizer.com/",
    pipelineUrl: "https://www.pfizer.com/science/drug-product-pipeline",
    irUrl: "https://investors.pfizer.com/",
    trialsHub: "https://www.pfizerclinicaltrials.com/",
    irEmail: "IR@pfizer.com",
  },
  summit: {
    id: "summit",
    name: "Summit Therapeutics",
    ticker: "NASDAQ: SMMT",
    hq: "Miami, FL",
    website: "https://www.smmttx.com/",
    irUrl: "https://smmttx.com/investors/",
    irEmail: "IR@smmttx.com",
  },
  bms: {
    id: "bms",
    name: "Bristol Myers Squibb",
    ticker: "NYSE: BMY",
    hq: "Princeton, NJ",
    website: "https://www.bms.com/",
    pipelineUrl: "https://www.bms.com/research/pipeline.html",
    irUrl: "https://www.bms.com/investors.html",
    trialsHub: "https://www.bms.com/researchers-and-partners/clinical-trials-and-research.html",
    irEmail: "investor.relations@bms.com",
  },
  ict: {
    id: "ict",
    name: "Innovative Cellular Therapeutics",
    hq: "Rockville, MD",
    website: "https://www.ictbio.com/",
    trialsHub: "https://clinicaltrials.gov/search?intr=GCC19CART",
  },
  mayo: {
    id: "mayo",
    name: "Mayo Clinic",
    hq: "Rochester, MN",
    website: "https://www.mayo.edu/",
    trialsHub: "https://www.mayo.edu/research/clinical-trials",
    phone: "+1 855-776-0015",
  },
  emd: {
    id: "emd",
    name: "EMD Serono (Merck KGaA)",
    ticker: "ETR: MRK",
    hq: "Darmstadt / Boston",
    website: "https://www.emdserono.com/",
    pipelineUrl: "https://www.emdgroup.com/en/research/pipeline.html",
    irUrl: "https://www.emdgroup.com/en/investors.html",
    trialsHub: "https://clinicaltrials.merckgroup.com/",
  },
  nci: {
    id: "nci",
    name: "National Cancer Institute",
    hq: "Bethesda, MD",
    website: "https://www.cancer.gov/",
    trialsHub: "https://www.cancer.gov/research/participate/clinical-trials-search",
  },
};

export const PROGRAM_COMPANIES: Record<string, string[]> = {
  "intismeran-autogene": ["moderna", "merck"],
  "mrna-4157-nsclc": ["moderna", "merck"],
  "mrna-4359": ["moderna"],
  bnt111: ["biontech", "regeneron"],
  bnt122: ["biontech", "roche"],
  "anktiva-bioshield": ["immunitybio"],
  "vir-5500": ["vir"],
  pasritamig: ["jnj"],
  "can-2409": ["candel"],
  "psca-car-t": ["cityofhope"],
  a2b543: ["a2bio"],
  sot109: ["sotio"],
  "pelareorep-reo033": ["oncolytics"],
  "lumakras-vectibix": ["amgen"],
  "talzenna-xtandi": ["pfizer"],
  ivonescimab: ["summit"],
  pumitamig: ["biontech", "bms"],
  "gcc-car-t": ["ict"],
  "tec-dara": ["jnj"],
  "akeega-spop": ["mayo", "jnj"],
  "tuvusertib-spop": ["nci", "emd"],
};

export const PROGRAM_TRIALS: Record<string, TrialRef[]> = {
  "intismeran-autogene": [
    {
      name: "INTerpath-001 adjuvant melanoma",
      nct: "NCT05933577",
      url: "https://clinicaltrials.gov/study/NCT05933577",
    },
    {
      name: "KEYNOTE-942 / mRNA-4157-P201 (Phase 2b melanoma)",
      nct: "NCT03897881",
      url: "https://clinicaltrials.gov/study/NCT03897881",
    },
  ],
  "mrna-4157-nsclc": [
    {
      name: "INTerpath NSCLC (search)",
      url: "https://clinicaltrials.gov/search?term=mRNA-4157%20NSCLC",
    },
  ],
  "mrna-4359": [
    {
      name: "mRNA-4359 solid tumors",
      url: "https://clinicaltrials.gov/search?intr=mRNA-4359",
    },
  ],
  bnt111: [
    {
      name: "BNT111 + cemiplimab melanoma",
      url: "https://clinicaltrials.gov/search?intr=BNT111",
    },
  ],
  bnt122: [
    {
      name: "Autogene cevumeran (BNT122)",
      url: "https://clinicaltrials.gov/search?intr=BNT122",
    },
  ],
  "anktiva-bioshield": [
    {
      name: "QUILT-3.032 NMIBC",
      nct: "NCT03022825",
      url: "https://clinicaltrials.gov/study/NCT03022825",
    },
    {
      name: "QUILT NSCLC program",
      url: "https://clinicaltrials.gov/search?term=nogapendekin%20NSCLC",
    },
  ],
  "vir-5500": [
    {
      name: "VIR-5500 mCRPC",
      url: "https://clinicaltrials.gov/search?intr=VIR-5500",
    },
  ],
  pasritamig: [
    {
      name: "Pasritamig (JNJ-78278343)",
      url: "https://clinicaltrials.gov/search?intr=JNJ-78278343",
    },
  ],
  "can-2409": [
    {
      name: "Phase 3 localized prostate + RT",
      nct: "NCT01436968",
      url: "https://clinicaltrials.gov/study/NCT01436968",
    },
  ],
  "psca-car-t": [
    {
      name: "PSCA CAR-T City of Hope",
      url: "https://clinicaltrials.gov/search?term=PSCA%20CAR-T%20City%20of%20Hope",
    },
  ],
  a2b543: [
    {
      name: "EVEREST-2",
      nct: "NCT06051695",
      url: "https://clinicaltrials.gov/study/NCT06051695",
    },
  ],
  sot109: [
    {
      name: "SOT109 CRC",
      url: "https://clinicaltrials.gov/search?intr=SOT109",
    },
  ],
  "pelareorep-reo033": [
    {
      name: "REO 033 RAS-mutant MSS mCRC",
      url: "https://clinicaltrials.gov/search?term=pelareorep%20colorectal",
    },
  ],
  "lumakras-vectibix": [
    {
      name: "CodeBreaK CRC (approved use)",
      url: "https://clinicaltrials.gov/search?term=sotorasib%20panitumumab%20colorectal",
    },
  ],
  "talzenna-xtandi": [
    {
      name: "Talazoparib + enzalutamide HRR mCSPC",
      url: "https://clinicaltrials.gov/search?term=talazoparib%20enzalutamide%20prostate",
    },
  ],
  ivonescimab: [
    {
      name: "HARMONi EGFRm NSCLC post-TKI",
      url: "https://clinicaltrials.gov/search?intr=ivonescimab",
    },
  ],
  pumitamig: [
    {
      name: "ROSETTA CRC (pumitamig / BNT327)",
      url: "https://clinicaltrials.gov/search?intr=pumitamig",
    },
    {
      name: "ROSETTA Lung-02",
      nct: "NCT06712316",
      url: "https://clinicaltrials.gov/study/NCT06712316",
    },
  ],
  "gcc-car-t": [
    {
      name: "GCC19CART metastatic CRC",
      url: "https://clinicaltrials.gov/search?intr=GCC19CART",
    },
  ],
  "tec-dara": [
    {
      name: "MajesTEC-3",
      url: "https://clinicaltrials.gov/search?term=MajesTEC-3",
    },
  ],
  "akeega-spop": [
    {
      name: "SPOP-mutant mCRPC — niraparib/abiraterone",
      nct: "NCT05689021",
      url: "https://clinicaltrials.gov/study/NCT05689021",
    },
  ],
  "tuvusertib-spop": [
    {
      name: "Refractory SPOP-mutant prostate — tuvusertib (M1774)",
      nct: "NCT05828082",
      url: "https://clinicaltrials.gov/study/NCT05828082",
    },
  ],
};

export function companiesFor(programId: string, sponsors: string[] = []): Company[] {
  const fromMap = (PROGRAM_COMPANIES[programId] ?? [])
    .map((id) => COMPANIES[id])
    .filter((c): c is Company => Boolean(c));
  if (fromMap.length) return fromMap;
  const hits: Company[] = [];
  for (const s of sponsors) {
    const hay = s.toLowerCase();
    for (const c of Object.values(COMPANIES)) {
      const needle = c.name.split("/")[0]!.trim().toLowerCase();
      if ((hay.includes(needle) || hay.includes(c.id)) && !hits.some((h) => h.id === c.id)) {
        hits.push(c);
      }
    }
  }
  return hits;
}

export function trialsFor(programId: string): TrialRef[] {
  return PROGRAM_TRIALS[programId] ?? [];
}

export function nctUrl(nct: string) {
  return `https://clinicaltrials.gov/study/${nct}`;
}
