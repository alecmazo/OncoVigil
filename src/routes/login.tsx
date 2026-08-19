import { useState } from "react";
import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { AppShell } from "@/components/app-shell";

function safeNext(raw: unknown): string {
  if (typeof raw !== "string") return "/";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("://")) return "/";
  return raw;
}

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const searchStr = useRouterState({
    select: (s) => s.location.searchStr ?? "",
  });
  const next = safeNext(
    new URLSearchParams(searchStr.startsWith("?") ? searchStr.slice(1) : searchStr).get("next"),
  );
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.split("@")[0] || "OncoVigil",
        });
        if (err) throw new Error(err.message ?? "Could not create account");
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (err) throw new Error(err.message ?? "Could not sign in");
      }
      await authClient.getSession();
      if (next.includes("?")) {
        window.location.assign(next);
        return;
      }
      await navigate({ to: next });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell>
      <main className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-10">
        <div className="w-full space-y-5 rounded-[var(--radius)] border border-border bg-surface p-8">
          <p className="text-xs tracking-[0.2em] text-primary uppercase">OncoVigil</p>
          <h1 className="font-display text-3xl">
            {mode === "in" ? "Sign in" : "Create an account"}
          </h1>
          {authEnabled ? (
            <>
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: next, errorCallbackURL: "/login" })}
                  className="h-12 w-full rounded-full border border-border bg-elevated text-sm hover:border-primary"
                >
                  Continue with {p.label}
                </button>
              ))}
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="h-px flex-1 bg-border" />
                or email
                <span className="h-px flex-1 bg-border" />
              </div>
              <form className="space-y-3" onSubmit={onEmail}>
                {mode === "up" && (
                  <label className="block text-xs text-muted">
                    Name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 h-12 w-full rounded-xl border border-border bg-elevated px-4 text-sm text-fg outline-none focus:border-primary"
                      autoComplete="name"
                    />
                  </label>
                )}
                <label className="block text-xs text-muted">
                  Email
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 h-12 w-full rounded-xl border border-border bg-elevated px-4 text-sm text-fg outline-none focus:border-primary"
                    autoComplete="email"
                  />
                </label>
                <label className="block text-xs text-muted">
                  Password
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 h-12 w-full rounded-xl border border-border bg-elevated px-4 text-sm text-fg outline-none focus:border-primary"
                    autoComplete={mode === "up" ? "new-password" : "current-password"}
                  />
                </label>
                {error && <p className="text-sm text-danger">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="h-12 w-full rounded-full bg-primary text-sm text-primary-fg disabled:opacity-60"
                >
                  {busy ? "Working…" : mode === "in" ? "Sign in with email" : "Create account"}
                </button>
              </form>
              <button
                type="button"
                className="w-full text-center text-sm text-muted hover:text-fg"
                onClick={() => {
                  setMode(mode === "in" ? "up" : "in");
                  setError(null);
                }}
              >
                {mode === "in" ? "Need an account? Create one" : "Already have an account? Sign in"}
              </button>
            </>
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
          <Link to="/" className="block text-center text-sm text-muted hover:text-fg">
            Back to pipeline
          </Link>
        </div>
      </main>
    </AppShell>
  );
}
