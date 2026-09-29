import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeading } from "@/components/Chrome";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveScenario } from "@/lib/scenario-store";

export const Route = createFileRoute("/new-scenario")({
  head: () => ({
    meta: [
      { title: "New Charter Scenario | CharterMind" },
      {
        name: "description",
        content:
          "Configure cargo, ports, laycan and vessel preferences to run a simulated charter optimization.",
      },
      { property: "og:title", content: "New Charter Scenario | CharterMind" },
      {
        property: "og:description",
        content: "Configure a simulated dry-bulk charter scenario and run demo optimization.",
      },
    ],
  }),
  component: NewScenario,
});

const CARGOES = ["Coking Coal", "Thermal Coal", "Iron Ore", "Limestone"];
const ORIGINS = [
  "Hay Point, Australia",
  "Newcastle, Australia",
  "Kalimantan, Indonesia",
  "Maputo, Mozambique",
  "Oman",
];
const DESTINATIONS = ["Paradip", "Visakhapatnam", "Gangavaram", "Chennai", "Krishnapatnam"];
const PRIORITIES = ["Lowest Cost", "Lowest Delay Risk", "Balanced Cost & Risk"];
const VESSELS = ["Auto Select", "Handysize", "Supramax", "Panamax", "Capesize"];

function NewScenario() {
  const navigate = useNavigate();
  const [scenarioId] = useState("CM-2026-004");
  const [form, setForm] = useState({
    cargoType: "",
    quantity: "",
    origin: "",
    destination: "",
    laycanStart: "",
    laycanEnd: "",
    priority: "",
    vesselClass: "Auto Select",
  });
  const [allowAltPort, setAllowAltPort] = useState(false);
  const [allowSplit, setAllowSplit] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  function run(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.cargoType) next["cargoType"] = "Select a cargo type.";
    const qty = Number(form.quantity);
    if (!form.quantity.trim()) next["quantity"] = "Enter cargo quantity in MT.";
    else if (!Number.isFinite(qty) || qty <= 0 || qty > 250000)
      next["quantity"] = "Quantity must be between 1 and 250,000 MT.";
    if (!form.origin) next["origin"] = "Select an origin port.";
    if (!form.destination) next["destination"] = "Select a destination port.";
    if (!form.laycanStart) next["laycanStart"] = "Select a laycan start date.";
    if (!form.laycanEnd) next["laycanEnd"] = "Select a laycan end date.";
    if (form.laycanStart && form.laycanEnd && form.laycanEnd < form.laycanStart)
      next["laycanEnd"] = "Laycan end must be on or after laycan start.";
    if (!form.priority) next["priority"] = "Select a procurement priority.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setRunning(true);
    saveScenario({
      id: scenarioId,
      ...form,
      quantity: String(qty),
      allowAltPort,
      allowSplit,
    });
    setTimeout(() => {
      toast.success("Demo optimization complete");
      navigate({ to: "/recommendations" });
    }, 1600);
  }

  const err = (k: string) =>
    errors[k] ? <p className="text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <AppShell>
      <PageHeading
        title="New Charter Scenario"
        subtitle="Configure procurement inputs for a simulated charter optimization run."
        notice="Demo Data / Decision-Support Simulation"
      />

      <form
        onSubmit={run}
        noValidate
        className="rounded-lg border border-border bg-card p-6 lg:max-w-4xl"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Scenario ID</Label>
            <Input value={scenarioId} readOnly className="bg-surface" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cargoType">Cargo Type</Label>
            <Select value={form.cargoType} onValueChange={set("cargoType")}>
              <SelectTrigger id="cargoType" className="w-full">
                <SelectValue placeholder="Select cargo" />
              </SelectTrigger>
              <SelectContent>
                {CARGOES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {err("cargoType")}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="quantity">Cargo Quantity (MT)</Label>
            <Input
              id="quantity"
              inputMode="numeric"
              value={form.quantity}
              onChange={(e) => set("quantity")(e.target.value)}
              placeholder="55000"
              maxLength={7}
            />
            {err("quantity")}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="origin">Origin Port</Label>
            <Select value={form.origin} onValueChange={set("origin")}>
              <SelectTrigger id="origin" className="w-full">
                <SelectValue placeholder="Select origin" />
              </SelectTrigger>
              <SelectContent>
                {ORIGINS.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {err("origin")}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="destination">Destination Port</Label>
            <Select value={form.destination} onValueChange={set("destination")}>
              <SelectTrigger id="destination" className="w-full">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {DESTINATIONS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {err("destination")}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="laycanStart">Laycan Start Date</Label>
            <Input
              id="laycanStart"
              type="date"
              value={form.laycanStart}
              onChange={(e) => set("laycanStart")(e.target.value)}
            />
            {err("laycanStart")}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="laycanEnd">Laycan End Date</Label>
            <Input
              id="laycanEnd"
              type="date"
              value={form.laycanEnd}
              onChange={(e) => set("laycanEnd")(e.target.value)}
            />
            {err("laycanEnd")}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="priority">Procurement Priority</Label>
            <Select value={form.priority} onValueChange={set("priority")}>
              <SelectTrigger id="priority" className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {err("priority")}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="vesselClass">Preferred Vessel Class</Label>
            <Select value={form.vesselClass} onValueChange={set("vesselClass")}>
              <SelectTrigger id="vesselClass" className="w-full">
                <SelectValue placeholder="Select vessel class" />
              </SelectTrigger>
              <SelectContent>
                {VESSELS.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-border pt-5">
          <label className="flex items-center gap-2.5 text-sm">
            <Checkbox
              checked={allowAltPort}
              onCheckedChange={(v) => setAllowAltPort(v === true)}
            />
            Allow alternate discharge port
          </label>
          <label className="flex items-center gap-2.5 text-sm">
            <Checkbox checked={allowSplit} onCheckedChange={(v) => setAllowSplit(v === true)} />
            Allow cargo split
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5">
          <Button type="submit" disabled={running}>
            {running ? "Running optimization…" : "Run Charter Optimization"}
          </Button>
          {running ? (
            <p className="text-sm text-muted-foreground">
              Analysing market, vessel feasibility, port constraints and risk signals…
            </p>
          ) : null}
        </div>
      </form>
    </AppShell>
  );
}
