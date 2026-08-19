import { createServerFn } from "@tanstack/react-start";
import { getDevelopment } from "@/data/pipeline";

export const askBriefing = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI briefing is not available here." };
    const d = getDevelopment(data.id);
    if (!d) return { ok: false as const, error: "Unknown development." };

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content:
              "You are an oncology pipeline analyst. Explain clearly for a scientifically curious reader. No hype. Distinguish approved vs investigational. 3 short sections: What it is, Why it matters, What to watch next.",
          },
          {
            role: "user",
            content: `${d.name} (${d.sponsors.join(", ")}). Stage: ${d.stage}. Headline: ${d.headline}. What it does: ${d.whatItDoes}. Trial: ${d.trial?.result ?? "n/a"}. Next: ${d.nextSteps}`,
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI API error ${res.status}` };
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
