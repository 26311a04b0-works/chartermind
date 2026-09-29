import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, PageHeading, RiskBadge } from "@/components/Chrome";
import { activeScenarios, alerts, buildMarketSeries } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | CharterMind Decision Console" },
      {
        name: "description",
        content:
          "Simulated KPI console for dry-bulk charter decisions: market outlook, active scenarios and risk alerts.",
      },
      { property: "og:title", content: "Dashboard | CharterMind Decision Console" },
      {
        property: "og:description",
        content: "Simulated KPI console for dry-bulk charter decisions to East Coast India.",
      },
    ],
  }),
  component: Dashboard,
});

const KPIS = [
  { label: "Active Procurement Scenarios", value: "03", note: "Open demo scenarios" },
  { label: "Recommended Action Today", value: "Fix 50% Cargo Now", note: "Primary demo case" },
  { label: "High-Risk Alerts", value: "02", note: "Requiring review" },
  {
    label: "Estimated Avoidable Cost Exposure",
    value: "USD 148,000",
    note: "Illustrative estimate",
  },
];

function Dashboard() {
  const data = buildMarketSeries();

  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeading
          title="Good morning, Procurement Officer"
          subtitle="East Coast India Bulk Cargo Decision Console"
          notice="Demo Data / Decision-Support Simulation"
        />
        <Link
          to="/security"
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-2.5 py-1 text-xs font-medium text-navy hover:bg-accent"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure Demo Environment
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-lg border border-border bg-surface p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {k.label}
            </p>
            <p className="mt-2 text-xl font-semibold text-navy">{k.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-card p-5 lg:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-base font-semibold text-navy">Market Outlook</h2>
            <span className="text-xs text-muted-foreground">
              Forecast condition: Moderate volatility
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Illustrative freight trend — demo data (30 days actual, 14-day forecast band)
          </p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  interval={5}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    fontSize: 12,
                  }}
                />
                <Area
                  dataKey="band"
                  stroke="none"
                  fill="var(--chart-2)"
                  fillOpacity={0.18}
                  connectNulls
                  isAnimationActive={false}
                />
                <Line
                  dataKey="actual"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                  isAnimationActive={false}
                />
                <Line
                  dataKey="forecast"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  dot={false}
                  connectNulls
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-base font-semibold text-navy">Top Alerts</h2>
          <ul className="mt-4 space-y-3">
            {alerts.map((a) => (
              <li key={a.text} className="rounded border border-border bg-surface p-3">
                <RiskBadge level={a.level} />
                <p className="mt-2 text-sm text-foreground">{a.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-navy">Active Scenarios</h2>
          <Link to="/new-scenario" className="text-sm font-medium text-primary hover:underline">
            New Charter Scenario
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Scenario</th>
                <th className="py-2 pr-4 font-medium">Cargo</th>
                <th className="py-2 pr-4 font-medium">Route</th>
                <th className="py-2 pr-4 font-medium">Quantity</th>
                <th className="py-2 pr-4 font-medium">Action</th>
                <th className="py-2 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {activeScenarios.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 font-medium text-navy">{s.id}</td>
                  <td className="py-3 pr-4">{s.cargo}</td>
                  <td className="py-3 pr-4">
                    {s.origin} → {s.destination}
                  </td>
                  <td className="py-3 pr-4">{s.quantity}</td>
                  <td className="py-3 pr-4">{s.action}</td>
                  <td className="py-3">
                    <RiskBadge level={s.risk} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
