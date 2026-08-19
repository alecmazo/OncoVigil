export const askBriefing = async (_args: { data: { id: string } }) => {
  return {
    ok: false as const,
    error: "AI briefings run on the signed-in server app. GitHub Pages uses the public trial scan instead.",
  };
};
