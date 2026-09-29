export type ScenarioInput = {
  id: string;
  cargoType: string;
  quantity: string;
  origin: string;
  destination: string;
  laycanStart: string;
  laycanEnd: string;
  priority: string;
  vesselClass: string;
  allowAltPort: boolean;
  allowSplit: boolean;
};

const KEY = "chartermind.scenario";

export function saveScenario(input: ScenarioInput) {
  localStorage.setItem(KEY, JSON.stringify(input));
}

export function readScenario(): ScenarioInput | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ScenarioInput) : null;
  } catch {
    return null;
  }
}

export function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
