import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { authEnabled, signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useCurrentUserState();

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg border border-primary/40 bg-elevated text-primary">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3l8 4v6c0 5-3.5 8.5-8 9.5C7.5 21.5 4 18 4 13V7l8-4z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
            <span className="font-display text-xl tracking-tight">OncoVigil</span>
          </Link>
          <nav className="flex items-center gap-4 text-xs text-muted md:gap-6 md:text-sm">
            <Link to="/" className="hover:text-fg">
              Pipeline
            </Link>
            <Link to="/spop" className="hover:text-amber">
              SPOP
            </Link>
            <Link to="/watchlist" className="hover:text-fg">
              Watch
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://alecmazo.github.io/application-hub/"
              className="hidden text-xs text-muted hover:text-fg sm:inline"
              target="_blank"
              rel="noreferrer"
            >
              App hub
            </a>
            {isPending ? (
              <div className="h-11 w-24 animate-pulse rounded-full bg-elevated" />
            ) : user && !user.isDevFallback ? (
              <SignedIn>
                <div className="flex items-center gap-2">
                  <span className="hidden max-w-[10rem] truncate text-sm md:inline">
                    {user.displayName ?? user.primaryEmail}
                  </span>
                  <button
                    type="button"
                    onClick={() => void signOut()}
                    className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm hover:border-primary"
                  >
                    Sign out
                  </button>
                </div>
              </SignedIn>
            ) : authEnabled ? (
              <SignedOut>
                <Link
                  to="/login"
                  className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm hover:border-primary hover:text-primary"
                >
                  Sign in
                </Link>
              </SignedOut>
            ) : null}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
