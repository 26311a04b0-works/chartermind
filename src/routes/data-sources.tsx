import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeading } from "@/components/Chrome";

export const Route = createFileRoute("/data-sources")({
  head: () => ({
    meta: [
      { title: "Data Sources | CharterMind" },
      {
        name: "description",
        content:
          "What powers the CharterMind demo today and which authorized data providers a production deployment would require.",
      },
      { property: "og:title", content: "Data Sources | CharterMind" },
      {
        property: "og:description",
        content: "MVP demonstration data and the production data integration roadmap.",
      },
    ],
  }),
  component: DataSources,
});

const MVP = [
  "Simulated route freight histories",
  "Static vessel-class profiles",
  "Configured port constraints",
  "Illustrative weather and congestion risk signals",
  "Sample commodity and fuel-price indicators",
];

const ROADMAP = [
  "Authorized freight-market data provider",
  "Official meteorological and marine weather provider",
  "Port authority operational feeds",
  "AIS / vessel positioning provider",
  "Commodity and fuel-price provider",
  "SAIL / enterprise procurement and charter-history integration",
];

function DataSources() {
  return (
    <AppShell>
      <PageHeading
        title="Data Sources"
        subtitle="Clear separation between demonstration data and production integration capability."
        notice="Demo Data / Decision-Support Simulation"
      />

      <section className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-base font-semibold text-navy">MVP Demonstration Data</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {MVP.map((m) => (
            <li key={m} className="rounded border border-border bg-surface p-4 text-sm">
              {m}
              <span className="mt-1 block text-xs text-muted-foreground">
                Active in this demonstration
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card p-5">
        <h2 className="text-base font-semibold text-navy">Production Data Integration Roadmap</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Informational only — no connections are configured or attempted in this MVP.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {ROADMAP.map((r) => (
            <li
              key={r}
              aria-disabled="true"
              className="cursor-not-allowed rounded border border-dashed border-border bg-surface p-4 text-sm text-muted-foreground"
            >
              {r}
              <span className="mt-1 block text-xs">Not connected — requires authorization</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 rounded-lg border border-border bg-surface p-5 text-sm text-foreground">
        CharterMind does not scrape restricted websites or use unverified online data for commercial
        recommendations. Production deployment requires approved APIs, data licenses, data
        validation, audit logs, and organization authorization.
      </p>
    </AppShell>
  );
}
