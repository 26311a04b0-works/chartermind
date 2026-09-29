import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeading, RiskBadge } from "@/components/Chrome";
import { Button } from "@/components/ui/button";
import { portStatus, riskItems, type RiskItem } from "@/lib/demo-data";

export const Route = createFileRoute("/risk-centre")({
  head: () => ({
    meta: [
      { title: "Risk Centre | CharterMind" },
      {
        name: "description",
        content:
          "Simulated East Coast India port status, congestion, weather and freight volatility risk signals.",
      },
      { property: "og:title", content: "Risk Centre | CharterMind" },
      {
        property: "og:description",
        content: "Demo port status and operational risk signals for East Coast India discharge.",
      },
    ],
  }),
  component: RiskCentre,
});

const LEVELS: RiskItem["level"][] = ["Low", "Medium", "High"];

function RiskCentre() {
  const [risks, setRisks] = useState<RiskItem[]>(riskItems);
  const [stamp, setStamp] = useState("15 October 2026, 08:15 IST (demo)");

  function refresh() {
    setRisks((prev) =>
      prev.map((r, i) => {
        if (i !== 0 && i !== 3) return r;
        const idx = LEVELS.indexOf(r.level);
        const nextLevel = LEVELS[(idx + 1) % LEVELS.length];
        return { ...r, level: nextLevel };
      }),
    );
    setStamp(
      `${new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}, ${new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })} (demo)`,
    );
    toast.success(
      "Demo signals refreshed. Production integration would use authorized weather, port and market data providers.",
    );
  }

  return (
    <AppShell>
      <PageHeading
        title="Risk Centre"
        subtitle="East Coast India operational risk view — simulated signals only."
        notice="Demo Data / Decision-Support Simulation"
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Signals last updated: {stamp}</p>
        <Button variant="outline" onClick={refresh}>
          Refresh Demo Signals
        </Button>
      </div>

      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-base font-semibold text-navy">Port Status — East Coast India</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {portStatus.map((p) => (
            <div key={p.port} className="rounded border border-border bg-surface p-4">
              <p className="text-sm font-semibold text-navy">{p.port}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.status}</p>
              <div className="mt-3">
                <RiskBadge level={p.level} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Simplified operational view. Positions are indicative, not AIS-derived.
        </p>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        {risks.map((r) => (
          <article key={r.category} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-navy">{r.category}</h3>
              <RiskBadge level={r.level} />
            </div>
            <p className="mt-3 text-sm text-foreground">{r.observation}</p>
            <p className="mt-2 text-sm text-muted-foreground">{r.impact}</p>
            <p className="mt-2 text-sm text-muted-foreground">{r.action}</p>
            <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
              Updated {stamp}
            </p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
