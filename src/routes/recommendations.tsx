import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, PageHeading, RiskBadge } from "@/components/Chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { scenarioOptions, vesselFeasibility } from "@/lib/demo-data";
import { formatDate, readScenario, type ScenarioInput } from "@/lib/scenario-store";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "Charter Recommendation | CharterMind" },
      {
        name: "description",
        content:
          "Simulated charter recommendation with vessel feasibility, cost ranges and strategy comparison.",
      },
      { property: "og:title", content: "Charter Recommendation | CharterMind" },
      {
        property: "og:description",
        content: "Compare fix, wait, partial fix and alternate port strategies on demo data.",
      },
    ],
  }),
  component: Recommendations,
});

function Recommendations() {
  const [scenario, setScenario] = useState<ScenarioInput | null>(null);
  const [selected, setSelected] = useState("partial");

  useEffect(() => {
    setScenario(readScenario());
  }, []);

  const option = scenarioOptions.find((o) => o.key === selected)!;

  const id = scenario?.id ?? "CM-2026-001";
  const route = scenario
    ? `${scenario.origin} → ${scenario.destination}, India`
    : "Hay Point, Australia → Paradip, India";
  const cargo = scenario
    ? `${Number(scenario.quantity).toLocaleString("en-IN")} MT ${scenario.cargoType}`
    : "55,000 MT Coking Coal";
  const laycan = scenario
    ? `${formatDate(scenario.laycanStart)} – ${formatDate(scenario.laycanEnd)}`
    : "15–25 October 2026";

  return (
    <AppShell>
      <PageHeading
        title={`Charter Recommendation — ${id}`}
        subtitle={`${route} · ${cargo} · Laycan: ${laycan}`}
        notice="Illustrative simulation based on configured demo inputs."
      />

      <section className="rounded-lg border border-border bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Recommended Action
        </p>
        <h2 className="mt-1 text-2xl font-semibold uppercase tracking-tight text-navy">
          {selected === "partial" ? "Partial Fix" : option.title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-foreground">{option.summary}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Confidence" value={option.confidence} />
          <Metric label="Expected all-in cost range" value={option.cost} />
          <Metric label="Estimated savings vs. immediate full fix" value="USD 62,000 – 98,000" />
          <Metric label="Delay risk" value={option.delayRisk} />
        </div>

        <p className="mt-5 max-w-3xl border-t border-border pt-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Main reason: </span>
          Supramax is feasible for cargo and port constraints. Freight may soften, but Paradip
          congestion and weather uncertainty make a full wait strategy higher risk.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card p-5">
        <h2 className="text-base font-semibold text-navy">Vessel Feasibility</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Vessel Class</th>
                <th className="py-2 pr-4 font-medium">Typical Parcel</th>
                <th className="py-2 pr-4 font-medium">Port Feasibility</th>
                <th className="py-2 pr-4 font-medium">Estimated Cost Index</th>
                <th className="py-2 pr-4 font-medium">Delay Risk</th>
                <th className="py-2 font-medium">Decision</th>
              </tr>
            </thead>
            <tbody>
              {vesselFeasibility.map((v) => (
                <tr key={v.vessel} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 font-medium text-navy">{v.vessel}</td>
                  <td className="py-3 pr-4">{v.parcel}</td>
                  <td className="py-3 pr-4">{v.feasibility}</td>
                  <td className="py-3 pr-4">{v.cost}</td>
                  <td className="py-3 pr-4">{v.delay}</td>
                  <td className="py-3 font-medium">{v.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold text-navy">Scenario Comparison</h2>
          <p className="text-xs text-muted-foreground">
            Selected scenario: <span className="font-medium text-foreground">{option.title}</span>
          </p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {scenarioOptions.map((o) => {
            const active = o.key === selected;
            return (
              <button
                key={o.key}
                type="button"
                onClick={() => setSelected(o.key)}
                aria-pressed={active}
                className={`rounded-lg border p-4 text-left transition-colors ${
                  active
                    ? "border-primary bg-risk-info-bg"
                    : "border-border bg-background hover:bg-accent"
                }`}
              >
                <p className="text-sm font-semibold text-navy">{o.title}</p>
                <dl className="mt-3 space-y-1.5 text-xs">
                  <Row label="Expected Cost" value={o.cost} />
                  <Row label="Delay Risk" value={o.delayRisk} />
                  <Row label="Laycan Compliance" value={o.laycan} />
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">{o.explanation}</p>
                {active ? (
                  <p className="mt-3 text-xs font-medium text-primary">Selected</p>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card px-5">
        <Accordion type="single" collapsible>
          <AccordionItem value="why" className="border-0">
            <AccordionTrigger className="text-base font-semibold text-navy">
              Why this recommendation?
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-foreground">
                <li>Current forecast shows moderate probability of rate softening</li>
                <li>Paradip queue risk is elevated</li>
                <li>Supramax passes configured parcel and port suitability checks</li>
                <li>Partial fixing reduces exposure to both rate increase and delay risk</li>
                <li>
                  This is a simulated decision-support output, not a binding charter recommendation
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <div className="mt-6">
        <RiskBadge level="Info" />
        <span className="ml-2 text-xs text-muted-foreground">
          Demo Data / Decision-Support Simulation — Demo Model v0.1
        </span>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-background p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-sm font-semibold text-navy">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
