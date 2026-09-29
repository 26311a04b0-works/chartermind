import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { signOut, useSession } from "@/lib/session";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/new-scenario", label: "New Charter Scenario" },
  { to: "/recommendations", label: "Recommendations" },
  { to: "/risk-centre", label: "Risk Centre" },
  { to: "/decision-briefs", label: "Decision Briefs" },
  { to: "/data-sources", label: "Data Sources" },
  { to: "/security", label: "Security & Data Protection" },
  { to: "/profile", label: "Profile" },
] as const;

export function DemoBanner() {
  return (
    <div className="border-b border-border bg-navy px-4 py-2 text-center text-xs font-medium tracking-wide text-primary-foreground">
      Decision-support simulation only. Final chartering decisions require authorized commercial
      review.
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-surface px-6 py-4 text-center text-xs text-muted-foreground print:hidden">
      <p>CharterMind | SIH 2026 Demonstration MVP | Decision-support simulation only</p>
      <p className="mx-auto mt-1 max-w-4xl text-[11px]">
        CharterMind MVP demonstrates security-by-design principles. Production use requires
        approved hosting, security assessment, penetration testing, data-governance approval, user
        training, and authorized integration with enterprise systems.
      </p>
    </footer>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { session, ready } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !session) navigate({ to: "/", replace: true });
  }, [ready, session, navigate]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading secure console…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DemoBanner />
      <header className="sticky top-0 z-40 border-b border-border bg-background print:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
          <Link to="/dashboard" className="text-base font-semibold tracking-tight text-navy">
            CharterMind
          </Link>
          <nav className="flex flex-1 flex-wrap items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-accent data-[status=active]:font-medium data-[status=active]:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => {
              signOut();
              navigate({ to: "/", replace: true });
            }}
            className="rounded border border-input px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeading({
  title,
  subtitle,
  notice,
}: {
  title: string;
  subtitle?: string;
  notice?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-navy">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      {notice ? (
        <p className="mt-3 inline-block rounded border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground">
          {notice}
        </p>
      ) : null}
    </div>
  );
}

export function RiskBadge({ level }: { level: string }) {
  const key = level.toLowerCase();
  const cls = key.startsWith("high")
    ? "bg-risk-high-bg text-risk-high border-risk-high/30"
    : key.startsWith("medium")
      ? "bg-risk-medium-bg text-risk-medium border-risk-medium/30"
      : key.startsWith("low")
        ? "bg-risk-low-bg text-risk-low border-risk-low/30"
        : "bg-risk-info-bg text-risk-info border-risk-info/30";
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${cls}`}
    >
      {level}
    </span>
  );
}
