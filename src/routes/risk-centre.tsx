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
  component: RiskCentre;
});

function RiskCentre() {
  return null;
}
