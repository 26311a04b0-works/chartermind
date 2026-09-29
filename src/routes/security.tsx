import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { AppShell, PageHeading } from "@/components/Chrome";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const SECURITY_DISCLAIMER =
  "CharterMind MVP demonstrates security-by-design principles. Production use requires approved hosting, security assessment, penetration testing, data-governance approval, user training, and authorized integration with enterprise systems.";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Data Protection | CharterMind" },
      {
        name: "description",
        content:
          "Security-by-design architecture for CharterMind: access control, data protection, audit trail and incident response.",
      },
      { property: "og:title", content: "Security & Data Protection | CharterMind" },
      {
        property: "og:description",
        content: "Prototype security controls and production requirements for CharterMind.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SecurityPage,
});

const ROLES = [
  {
    role: "Procurement Officer",
    can: ["Create and view own procurement scenarios", "Run decision-support recommendations", "Export own decision briefs"],
    cannot: "Cannot manage users, system settings, or organization-wide data",
  },
  {
    role: "Chartering Manager",
    can: ["View and review assigned procurement scenarios", "Compare vessel and port options", "Approve or return recommendations for revision"],
    cannot: "Cannot manage system security settings",
  },
  {
    role: "Risk Analyst",
    can: ["View risk centre and organization-approved scenarios", "Review alerts and risk trends"],
    cannot: "Cannot modify procurement input or final approvals",
  },
  {
    role: "System Administrator",
    can: ["Manage users and role assignment", "View security audit logs", "Configure approved data-source connections"],
    cannot: "Cannot alter historical audit records",
  },
];

const PROTECTION = [
  ["Encryption in Transit", "HTTPS / TLS for data moving between browser and server"],
  ["Encryption at Rest", "Encrypted database and file storage for sensitive records"],
  ["Data Minimization", "Store only required operational and user data"],
  ["Secrets Protection", "API keys and credentials in server-side secret management; never exposed in browser code"],
  ["Backup & Recovery", "Encrypted backups, defined recovery procedure, periodic restoration testing"],
];

const LOGIN_FLOW = ["Login", "Multi-Factor Authentication", "Role Validation", "Secure Session", "Authorized Dashboard"];
const LOGIN_CONTROLS = [
  "Strong password policy",
  "Multi-factor authentication required for privileged roles",
  "Secure, short-lived session tokens",
  "Automatic logout after inactivity",
  "Failed-login rate limiting and temporary account lockout",
  "Passwords stored only as salted hashes, never plain text",
  "No real credentials in the demo; demo account access is clearly labelled",
];

const GATEWAY_FLOW = [
  "Approved API / Enterprise Data Feed",
  "API Gateway",
  "Authentication & authorization check",
  "Input validation & malware / file scanning",
  "Rate limiting",
  "Data-quality validation",
  "CharterMind processing layer",
  "Audit log",
];
const GATEWAY_RULES = [
  "No uncontrolled web scraping",
  "No sensitive enterprise data in client-side code",
  "Only approved, licensed, and documented data providers",
  "Validate data freshness, source, format, and anomalies before use",
  "External data failures must not silently change recommendations",
  "Clearly show “Data unavailable” or “Last updated” status if a source fails",
];

const THREATS = [
  ["Unauthorized user access", "Role-based access control, MFA, secure sessions, audit logs"],
  ["Data leakage through exposed API key", "Server-side secrets, environment variables, key rotation, restricted API permissions"],
  ["Data tampering", "Immutable audit events, signed / hashed decision-brief records, change tracking"],
  ["Brute-force login attack", "Rate limiting, account lockout, MFA, suspicious-login monitoring"],
  ["Malicious file upload", "Allow-list file types, size limits, antivirus scanning, isolated storage"],
  ["Injection or malicious input", "Input validation, parameterized database queries, output encoding, security testing"],
  ["API abuse / denial of service", "API gateway, rate limits, request quotas, monitoring, web application firewall in production"],
  ["Third-party provider compromise", "Vendor review, least-privilege API tokens, logging, key rotation, fallback mode"],
];

const AUDIT = [
  ["10:15", "Procurement Officer created Scenario CM-2026-004"],
  ["10:17", "Freight forecast simulation run"],
  ["10:18", "Supramax recommendation viewed"],
  ["10:20", "Chartering Manager reviewed scenario"],
  ["10:22", "Decision brief exported"],
  ["10:23", "Risk alert acknowledged"],
];

const INCIDENT = [
  ["Govern", "Define ownership, policies and risk responsibility"],
  ["Identify", "Classify assets, data, users and critical integrations"],
  ["Protect", "Apply encryption, access control, MFA and secure coding"],
  ["Detect", "Monitor abnormal logins, API errors, data-access anomalies and service failures"],
  ["Respond", "Isolate affected account/system, revoke access, preserve logs and notify security team"],
  ["Recover", "Restore verified backup, validate integrity, document lessons and strengthen controls"],
];

const STATUS: [string, string, string][] = [
  ["Role-Based Access", "Enabled in demo design", "Demo"],
  ["Audit Trail", "Demo simulation enabled", "Demo"],
  ["HTTPS/TLS", "Required for deployment", "Required Before Production"],
  ["MFA", "Planned for production", "Planned"],
  ["Penetration Testing", "Required before institutional rollout", "Required Before Production"],
  ["Live Government Integration", "Not enabled in MVP", "Not Enabled"],
];

function StatusPill({ label }: { label: string }) {
  const cls =
    label === "Demo"
      ? "bg-risk-low-bg text-risk-low border-risk-low/30"
      : label === "Planned"
        ? "bg-risk-info-bg text-risk-info border-risk-info/30"
        : label === "Not Enabled"
          ? "bg-muted text-muted-foreground border-border"
          : "bg-risk-medium-bg text-risk-medium border-risk-medium/30";
  return <span className={`whitespace-nowrap rounded border px-2 py-0.5 text-xs font-medium ${cls}`}>{label}</span>;
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1.5">
          <span className="rounded border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-navy">{s}</span>
          {i < steps.length - 1 ? <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" /> : null}
        </div>
      ))}
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 rounded border-l-2 border-primary bg-surface px-3 py-2 text-xs text-muted-foreground">{children}</p>;
}

function AuditList() {
  return (
    <ol className="relative space-y-3 border-l border-border pl-4">
      {AUDIT.map(([t, e]) => (
        <li key={t} className="text-sm">
          <span className="absolute -left-1 mt-1.5 h-2 w-2 rounded-full bg-primary" />
          <span className="font-mono text-xs text-muted-foreground">{t}</span>
          <span className="ml-2">{e}</span>
        </li>
      ))}
    </ol>
  );
}

function IncidentList() {
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {INCIDENT.map(([k, v], i) => (
        <li key={k} className="rounded border border-border bg-surface p-3">
          <p className="text-xs font-semibold text-navy">
            {i + 1}. {k}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{v}</p>
        </li>
      ))}
    </ol>
  );
}

const CERT_NOTE =
  "For Indian production deployment, incident reporting and response procedures must align with applicable organizational, legal, and CERT-In requirements.";

function SecurityPage() {
  return (
    <AppShell>
      <PageHeading
        title="Security & Data Protection"
        subtitle="Security-by-design architecture with prototype security controls."
        notice="Production deployment requires security assessment, penetration testing, approved infrastructure, and organization authorization."
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Demo Audit Trail</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Demo Audit Trail</DialogTitle>
              <DialogDescription>Simulated events — demo data only.</DialogDescription>
            </DialogHeader>
            <AuditList />
            <Note>Audit records are append-only in production and retained according to organization policy.</Note>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Incident Response Plan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Incident Response Plan (Demo)</DialogTitle>
              <DialogDescription>Six-step lifecycle for production readiness.</DialogDescription>
            </DialogHeader>
            <IncidentList />
            <Note>{CERT_NOTE}</Note>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Accordion type="multiple" defaultValue={["access"]} className="rounded-lg border border-border bg-card px-5">
            <AccordionItem value="access">
              <AccordionTrigger>1. Access Control</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ROLES.map((r) => (
                    <div key={r.role} className="rounded border border-border bg-surface p-3">
                      <p className="text-sm font-semibold text-navy">{r.role}</p>
                      <ul className="mt-2 space-y-1 text-xs">
                        {r.can.map((c) => (
                          <li key={c} className="text-risk-low">✓ <span className="text-foreground">{c}</span></li>
                        ))}
                        <li className="text-risk-high">✕ <span className="text-muted-foreground">{r.cannot}</span></li>
                      </ul>
                    </div>
                  ))}
                </div>
                <Note>Least-privilege access: each user receives only the access needed for their role.</Note>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="data">
              <AccordionTrigger>2. Data Protection</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {PROTECTION.map(([t, d]) => (
                    <div key={t} className="rounded border border-border bg-surface p-3">
                      <p className="text-sm font-semibold text-navy">{t}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{d}</p>
                    </div>
                  ))}
                </div>
                <Note>Production deployments must use organization-approved cloud / data-centre infrastructure and key-management procedures.</Note>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="login">
              <AccordionTrigger>3. Login and Account Security</AccordionTrigger>
              <AccordionContent>
                <Flow steps={LOGIN_FLOW} />
                <ul className="mt-4 grid gap-1.5 text-sm sm:grid-cols-2">
                  {LOGIN_CONTROLS.map((c) => (
                    <li key={c} className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{c}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gateway">
              <AccordionTrigger>4. Authorized Data Integration Gateway</AccordionTrigger>
              <AccordionContent>
                <Flow steps={GATEWAY_FLOW} />
                <ul className="mt-4 grid gap-1.5 text-sm sm:grid-cols-2">
                  {GATEWAY_RULES.map((c) => (
                    <li key={c} className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{c}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="threats">
              <AccordionTrigger>5. Threat Protection</AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                        <th className="py-2 pr-4 font-medium">Threat</th>
                        <th className="py-2 font-medium">Control</th>
                      </tr>
                    </thead>
                    <tbody>
                      {THREATS.map(([t, c]) => (
                        <tr key={t} className="border-b border-border last:border-0">
                          <td className="py-2 pr-4 font-medium text-navy">{t}</td>
                          <td className="py-2 text-muted-foreground">{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="audit">
              <AccordionTrigger>6. Auditability and Accountability</AccordionTrigger>
              <AccordionContent>
                <AuditList />
                <Note>Audit records are append-only in production and retained according to organization policy.</Note>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="incident" className="border-b-0">
              <AccordionTrigger>7. Incident Response</AccordionTrigger>
              <AccordionContent>
                <Flow steps={INCIDENT.map(([k]) => k)} />
                <div className="mt-4"><IncidentList /></div>
                <Note>{CERT_NOTE}</Note>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-navy">
              <ShieldCheck className="h-4 w-4 text-primary" /> Security Status
            </h2>
            <ul className="mt-4 space-y-3">
              {STATUS.map(([k, d, s]) => (
                <li key={k} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{k}</p>
                    <p className="text-xs text-muted-foreground">{d}</p>
                  </div>
                  <StatusPill label={s} />
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-xs text-muted-foreground">
            <p className="mb-1 font-semibold text-navy">Security Disclaimer</p>
            {SECURITY_DISCLAIMER}
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
