import type { BriefingInput } from "@/lib/briefing-types";

/**
 * GitHub Pages has no Better Auth session and no XAI_API_KEY.
 * Keep the same call shape as the signed-in Grok app so the UI is identical.
 */
export const askBriefing = async (_args: { data: BriefingInput }) => {
  return {
    ok: false as const,
    error:
      "Grok briefings need a signed-in OncoVigil session (Google, X, or email). This public Pages mirror cannot call Grok — open the live app and sign in, then generate.",
  };
};
