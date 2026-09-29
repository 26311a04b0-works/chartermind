import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeading, RiskBadge } from "@/components/Chrome";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { activeScenarios, auditTrail, type Scenario } from "@/lib/demo-data";

export const Route = createFileRoute("/decision-briefs")({
  head: () => ({
    meta: [
      { title: "Decision Briefs | CharterMind" },
      {
        name: "description",
        content:
          "Formatted demo decision briefs with printable reports and demo audit trails for each charter scenario.",
      },
      { property: "og:title", content: "Decision Briefs | CharterMind" },
      {
        property: "og:description",
        content: "Demo decision briefs, printable reports and demo audit trails.",
      },
    ],
  }),
  component: DecisionBriefs,
});

const TIMES = [
  "12 Oct 2026, 09:14",
  "12 Oct 2026, 09:16",
  "12 Oct 2026, 10:02",
  "13 Oct 2026, 11:37",
  "13 Oct 2026, 11:40",
];

function DecisionBriefs() {
  const [brief, setBrief] = useState<Scenario | null>(null);
  const [audit, setAudit] = useState<Scenario | null>(null);

  return (
    <AppShell>
      <PageHeading
        title="Decision Briefs"
        subtitle="Formatted summaries prepared for authorized commercial review."
        notice="Demo Data / Decision-Support Simulation"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {activeScenarios.map((s) => (
          <article key={s.id} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-navy">{s.id}</h2>
              <RiskBadge level={s.risk} />
            </div>
            <p className="mt-2 text-sm">{s.cargo}</p>
            <p className="text-xs text-muted-foreground">
              {s.origin} → {s.destination}
            </p>
            <dl className="mt-4 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Quantity</dt>
                <dd className="font-medium">{s.quantity}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Recommended action</dt>
                <dd className="font-medium">{s.action}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Laycan</dt>
                <dd className="font-medium">{s.laycan}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => setBrief(s)}>
                View Brief
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setBrief(s);
                  toast("Preparing printable brief…");
                  setTimeout(() => window.print(), 500);
                }}
              >
                Export PDF
              </Button>
              <Button size="sm" variant="outline" onClick={() => setAudit(s)}>
                View Audit Trail
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={!!brief} onOpenChange={(o) => !o && setBrief(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Decision Brief — {brief?.id}</DialogTitle>
            <DialogDescription>
              Demo decision brief. Decision-support simulation only.
            </DialogDescription>
          </DialogHeader>
          {brief ? (
            <div className="space-y-4 text-sm">
              <Section title="Scenario">
                {brief.cargo}, {brief.quantity} — {brief.origin} → {brief.destination}. Laycan{" "}
                {brief.laycan}.
              </Section>
              <Section title="Recommended action">
                {brief.action}. Risk classification: {brief.risk}.
              </Section>
              <Section title="Cost position">
                Estimated all-in cost range USD 1.84M – 1.97M with estimated savings of USD 62,000 –
                98,000 versus immediate full fixing (illustrative).
              </Section>
              <Section title="Key considerations">
                Vessel suitability, discharge port constraints, simulated congestion queue and
                weather window variability were evaluated by Demo Model v0.1.
              </Section>
              <Section title="Review note">
                Final chartering decisions require authorized commercial review. This brief is not a
                binding recommendation.
              </Section>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={!!audit} onOpenChange={(o) => !o && setAudit(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Demo audit trail — {audit?.id}</DialogTitle>
            <DialogDescription>
              Demo audit trail. Model version: Demo Model v0.1.
            </DialogDescription>
          </DialogHeader>
          {audit ? (
            <ol className="space-y-3 text-sm">
              {auditTrail.map((a, i) => (
                <li key={a.step} className="rounded border border-border bg-surface p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-navy">Demo audit trail — {a.step}</p>
                    <span className="text-xs text-muted-foreground">{TIMES[i]}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Inputs: {audit.cargo}, {audit.quantity}, {audit.origin} → {audit.destination} ·
                    User: PROC-ECI-001
                  </p>
                </li>
              ))}
            </ol>
          ) : null}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <p className="mt-1.5 text-foreground">{children}</p>
    </div>
  );
}
