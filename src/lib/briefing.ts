import { createServerFn } from "@tanstack/react-start";
import { companiesFor } from "@/data/companies";
import { getDevelopment } from "@/data/pipeline";
import type { BriefingInput } from "@/lib/briefing-types";

export type { BriefingInput };

export const askBriefing = createServerFn({ method: "POST" })
  .validator((input: BriefingInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Grok briefing is not available in this environment." };
    }

    const seed = getDevelopment(data.id);
    const name = data.name ?? seed?.name;
    if (!name) return { ok: false as const, error: "Unknown development." };

    const sponsors = data.sponsors?.length ? data.sponsors : (seed?.sponsors ?? []);
    const orgs = companiesFor(data.id, sponsors);
    const companyLine = orgs.length
      ? orgs
          .map((c) => {
            const bits = [c.name, c.ticker, c.website, c.pipelineUrl, c.irEmail].filter(Boolean);
            return bits.join(" · ");
          })
          .join("\n")
      : sponsors.join(", ");

    const nct = data.nct ?? seed?.trial?.nct;
    const trialUrl = nct ? `https://clinicaltrials.gov/study/${nct}` : "";

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are OncoVigil's oncology pipeline analyst (Grok). Explain clearly for a scientifically curious reader. No hype, no investment advice. Distinguish approved vs investigational. Use exactly three short sections with these headings: What it is / Why it matters / What to watch next. Mention the developing company and trial ID when known.",
          },
          {
            role: "user",
            content: [
              `Program: ${name}${data.shortName ? ` (${data.shortName})` : ""}`,
              `Developers:\n${companyLine}`,
              `Stage: ${data.stage ?? seed?.stage ?? "unknown"}`,
              `Modality: ${data.modality ?? seed?.modality ?? "unknown"}`,
              `Cancers: ${(data.cancers ?? seed?.cancers ?? []).join(", ") || "n/a"}`,
              `Biomarkers: ${(data.biomarkers ?? seed?.biomarkers ?? []).join(", ") || "n/a"}`,
              `Headline: ${data.headline ?? seed?.headline ?? ""}`,
              `What it does: ${data.whatItDoes ?? seed?.whatItDoes ?? ""}`,
              `Mechanism: ${data.howItWorks ?? seed?.howItWorks ?? ""}`,
              `Trial: ${data.trialName ?? seed?.trial?.name ?? "n/a"}`,
              `Trial result: ${data.trialResult ?? seed?.trial?.result ?? "n/a"}`,
              nct ? `NCT: ${nct} ${trialUrl}` : "",
              `Next: ${data.nextSteps ?? seed?.nextSteps ?? ""}`,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false as const,
        error: `Grok API error ${res.status}${detail ? `: ${detail.slice(0, 180)}` : ""}`,
      };
    }

    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
