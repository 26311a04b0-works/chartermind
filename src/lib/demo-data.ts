export type Scenario = {
  id: string;
  cargo: string;
  origin: string;
  destination: string;
  quantity: string;
  action: string;
  risk: "Low" | "Medium" | "High";
  laycan: string;
};

export const activeScenarios: Scenario[] = [
  {
    id: "CM-2026-001",
    cargo: "Coking Coal",
    origin: "Hay Point, Australia",
    destination: "Paradip",
    quantity: "55,000 MT",
    action: "Partial Fix",
    risk: "Medium",
    laycan: "15–25 October 2026",
  },
  {
    id: "CM-2026-002",
    cargo: "Thermal Coal",
    origin: "Kalimantan, Indonesia",
    destination: "Visakhapatnam",
    quantity: "48,000 MT",
    action: "Wait 5 Days",
    risk: "Low",
    laycan: "18–28 October 2026",
  },
  {
    id: "CM-2026-003",
    cargo: "Limestone",
    origin: "Oman",
    destination: "Gangavaram",
    quantity: "38,000 MT",
    action: "Review Alternate Port",
    risk: "High",
    laycan: "20–30 October 2026",
  },
];

export const alerts = [
  {
    level: "High" as const,
    text: "Paradip congestion may add 2.4 estimated waiting days",
  },
  {
    level: "Medium" as const,
    text: "Freight volatility widened by 18% over the last 7 demo days",
  },
  {
    level: "Medium" as const,
    text: "Bay of Bengal weather watch — monitor arrival-window exposure",
  },
  {
    level: "Info" as const,
    text: "Supramax availability is favourable for Australia–East Coast route",
  },
];

export type MarketPoint = {
  day: string;
  actual: number | null;
  forecast: number | null;
  band: [number, number] | null;
};

export function buildMarketSeries(): MarketPoint[] {
  const points: MarketPoint[] = [];
  let value = 18.4;
  const seed = [
    0.3, -0.2, 0.45, -0.35, 0.15, 0.5, -0.1, -0.45, 0.25, 0.4, -0.3, 0.1, 0.55, -0.4, 0.2,
    0.35, -0.25, -0.15, 0.3, 0.45, -0.5, 0.2, 0.15, -0.3, 0.4, 0.1, -0.2, 0.35, -0.15, 0.25,
  ];
  for (let i = 0; i < 30; i++) {
    value = Math.round((value + (seed[i % seed.length] ?? 0)) * 100) / 100;
    points.push({
      day: `D-${30 - i}`,
      actual: value,
      forecast: i === 29 ? value : null,
      band: i === 29 ? [value, value] : null,
    });
  }
  let f = value;
  for (let i = 1; i <= 14; i++) {
    f = Math.round((f - 0.06 + (i % 3 === 0 ? 0.18 : -0.04)) * 100) / 100;
    const band = 0.18 * i;
    points.push({
      day: `F+${i}`,
      actual: null,
      forecast: f,
      band: [Math.round((f - band) * 100) / 100, Math.round((f + band) * 100) / 100],
    });
  }
  return points;
}

export const vesselFeasibility = [
  {
    vessel: "Handysize",
    parcel: "25–35K MT",
    feasibility: "Feasible",
    cost: "High due to split cargo",
    delay: "Low",
    decision: "Backup option",
  },
  {
    vessel: "Supramax",
    parcel: "50–60K MT",
    feasibility: "Feasible",
    cost: "Lowest",
    delay: "Medium",
    decision: "Recommended",
  },
  {
    vessel: "Panamax",
    parcel: "65–75K MT",
    feasibility: "Conditional",
    cost: "Moderate",
    delay: "Medium",
    decision: "Consider alternate port",
  },
  {
    vessel: "Capesize",
    parcel: "120K+ MT",
    feasibility: "Not feasible",
    cost: "N/A",
    delay: "N/A",
    decision: "Rejected: cargo/port mismatch",
  },
];

export type ScenarioOption = {
  key: string;
  title: string;
  cost: string;
  delayRisk: string;
  laycan: string;
  explanation: string;
  summary: string;
  confidence: string;
};

export const scenarioOptions: ScenarioOption[] = [
  {
    key: "fix100",
    title: "Fix 100% Now",
    cost: "USD 1.96M",
    delayRisk: "Low",
    laycan: "Compliant",
    explanation: "Locks current rates and removes market exposure, but forfeits likely softening.",
    summary:
      "Fix full cargo immediately on Supramax tonnage. Removes rate exposure at a higher expected all-in cost.",
    confidence: "High",
  },
  {
    key: "wait7",
    title: "Wait 7 Days",
    cost: "USD 1.88M",
    delayRisk: "High",
    laycan: "At risk",
    explanation: "Captures possible rate softening but exposes laycan to congestion and weather.",
    summary:
      "Defer fixing for 7 demo days. Potentially cheaper, but Paradip queue risk threatens laycan compliance.",
    confidence: "Low",
  },
  {
    key: "partial",
    title: "Partial Fix 50% Now",
    cost: "USD 1.84M – 1.97M",
    delayRisk: "Medium",
    laycan: "Compliant",
    explanation: "Balances rate-increase exposure against delay risk by staging the fixture.",
    summary:
      "Fix 50% of cargo now using Supramax. Monitor market for 5–7 days before fixing balance cargo.",
    confidence: "Medium",
  },
  {
    key: "altport",
    title: "Alternate Port",
    cost: "USD 1.91M",
    delayRisk: "Medium",
    laycan: "Compliant",
    explanation: "Shifts discharge to Visakhapatnam, reducing queue risk but adding inland haulage.",
    summary:
      "Discharge at Visakhapatnam instead of Paradip. Lower waiting exposure, higher onward logistics cost.",
    confidence: "Medium",
  },
];

export const portStatus = [
  { port: "Paradip", status: "Congestion Watch", level: "Medium/High" },
  { port: "Visakhapatnam", status: "Normal Operations", level: "Low" },
  { port: "Gangavaram", status: "Berth Availability Review", level: "Medium" },
  { port: "Chennai", status: "Weather Monitor", level: "Medium" },
  { port: "Krishnapatnam", status: "Normal Operations", level: "Low" },
];

export type RiskItem = {
  category: string;
  level: "Low" | "Medium" | "High";
  observation: string;
  impact: string;
  action: string;
};

export const riskItems: RiskItem[] = [
  {
    category: "Freight Volatility",
    level: "Medium",
    observation: "Demo index band widened by 18% across the last 7 simulated days.",
    impact: "Potential impact: USD 40,000–90,000 cost swing on the fixture.",
    action: "Recommended action: stage fixing instead of a single full fixture.",
  },
  {
    category: "Port Congestion",
    level: "High",
    observation: "Paradip demo queue indicator shows elevated waiting vessels.",
    impact: "Potential impact: 2–3 additional estimated waiting days.",
    action: "Recommended action: keep an alternate discharge port open.",
  },
  {
    category: "Bay of Bengal Weather",
    level: "Medium",
    observation: "Demo weather-risk indicator suggests possible arrival-window variability.",
    impact: "Potential impact: 1–3 days schedule uncertainty.",
    action: "Recommended action: retain alternate port and laycan buffer.",
  },
  {
    category: "Fuel Cost Movement",
    level: "Low",
    observation: "Simulated VLSFO indicator stable within a narrow demo range.",
    impact: "Potential impact: below 1% of estimated all-in cost.",
    action: "Recommended action: no immediate mitigation required.",
  },
  {
    category: "Geopolitical / Route Disruption",
    level: "Low",
    observation: "No routing constraints configured on Australia–East Coast India demo lane.",
    impact: "Potential impact: negligible under current demo assumptions.",
    action: "Recommended action: continue periodic review of routing advisories.",
  },
];

export const auditTrail = [
  { step: "Scenario created", detail: "Inputs captured from charter scenario form" },
  { step: "Optimization run", detail: "Demo Model v0.1 evaluated 4 strategies" },
  { step: "Recommendation viewed", detail: "Partial Fix presented as primary action" },
  { step: "Scenario selected", detail: "Partial Fix 50% Now selected by user" },
  { step: "Brief exported", detail: "Printable decision brief generated" },
];
