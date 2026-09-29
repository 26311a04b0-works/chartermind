import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DemoBanner, Footer } from "@/components/Chrome";
import { signIn, useSession } from "@/lib/session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign In | CharterMind Charter Decision Support" },
      {
        name: "description",
        content:
          "Secure demo sign-in for CharterMind, the dry-bulk charter decision-support simulation for East Coast India.",
      },
      { property: "og:title", content: "Sign In | CharterMind" },
      {
        property: "og:description",
        content: "Secure demo sign-in for the CharterMind charter decision-support simulation.",
      },
    ],
  }),
  component: LoginPage,
});

const ROLES = ["Procurement Officer", "Chartering Manager", "Risk Analyst", "Administrator"];

function LoginPage() {
  const navigate = useNavigate();
  const { session, ready } = useSession();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && session) navigate({ to: "/dashboard", replace: true });
  }, [ready, session, navigate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!employeeId.trim()) next.employeeId = "Employee ID is required.";
    if (!password.trim()) next.password = "Password is required.";
    if (!role) next.role = "Select an access role.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      signIn({ employeeId: employeeId.trim(), role, name: "Arun Kumar (Demo User)" });
      toast.success("Signed in to demo console");
      navigate({ to: "/dashboard" });
    }, 600);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DemoBanner />
      <div className="flex flex-1 items-center justify-center px-4 py-14">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-navy">CharterMind</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Intelligent Freight Forecasting &amp; Charter Decision Support
          </p>

          <form className="mt-7 space-y-5" onSubmit={submit} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="PROC-ECI-001"
                maxLength={40}
              />
              {errors.employeeId ? (
                <p className="text-xs text-destructive">{errors.employeeId}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={64}
              />
              {errors.password ? (
                <p className="text-xs text-destructive">{errors.password}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role ? <p className="text-xs text-destructive">{errors.role}</p> : null}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Secure Sign In"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setEmployeeId("PROC-ECI-001");
                setPassword("Demo@2026");
                setRole("Procurement Officer");
                setErrors({});
                toast("Demo credentials filled");
              }}
            >
              Use Demo Credentials
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            Demo Data / Decision-Support Simulation. No real credentials or commercial systems are
            connected.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
