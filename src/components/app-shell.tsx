import { Link } from "@tanstack/react-router";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg border border-primary/40 bg-elevated text-primary">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3l8 4v6c0 5-3.5 8.5-8 9.5C7.5 21.5 4 18 4 13V7l8-4z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
            <span className="font-display text-xl tracking-tight">OncoVigil</span>
          </Link>
          <nav className="ml-2 flex min-w-0 flex-1 items-center gap-4 text-sm text-muted md:gap-6">
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
        </div>
      </header>
      {children}
    </div>
  );
}
