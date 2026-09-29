import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell, PageHeading } from "@/components/Chrome";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/session";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile | CharterMind" },
      {
        name: "description",
        content: "Demo user profile, role and access level for the CharterMind decision console.",
      },
      { property: "og:title", content: "Profile | CharterMind" },
      {
        property: "og:description",
        content: "Demo user profile and access level for the CharterMind decision console.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const { session } = useSession();

  const rows = [
    { label: "Name", value: "Arun Kumar (Demo User)" },
    { label: "Employee ID", value: session?.employeeId ?? "PROC-ECI-001" },
    { label: "Role", value: session?.role ?? "Procurement Officer" },
    { label: "Access Level", value: "East Coast Procurement — Demo" },
  ];

  return (
    <AppShell>
      <PageHeading
        title="Profile"
        subtitle="Demo account details. No personal data beyond demo name and role is stored."
        notice="Demo Data / Decision-Support Simulation"
      />

      <section className="max-w-xl rounded-lg border border-border bg-card p-6">
        <dl className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4 py-3 text-sm">
              <dt className="text-muted-foreground">{r.label}</dt>
              <dd className="font-medium text-navy">{r.value}</dd>
            </div>
          ))}
        </dl>
        <Button
          className="mt-6"
          onClick={() => {
            signOut();
            toast("Signed out of demo console");
            navigate({ to: "/", replace: true });
          }}
        >
          Sign Out
        </Button>
      </section>
    </AppShell>
  );
}
