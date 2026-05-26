import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ShieldCheck, Layers, Banknote, Globe2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NovaVest" },
      { name: "description", content: "NovaVest's mission: make institutional-grade wealth strategies available to every serious investor." },
      { property: "og:title", content: "About NovaVest" },
      { property: "og:description", content: "Our mission, our team, our principles." },
    ],
  }),
  component: About,
});

const pillars = [
  { icon: ShieldCheck, title: "Security first", body: "Bank-grade encryption, SOC 2 Type II, segregated custody, and SIPC coverage on cash holdings." },
  { icon: Layers, title: "Diversification by design", body: "Every portfolio blends structured yield with hard assets — across geographies and sectors." },
  { icon: Banknote, title: "Transparent pricing", body: "0% deposit and ROI payout fees. A flat 1.0% annual fee on real estate AUM. No surprises." },
  { icon: Globe2, title: "Global by default", body: "Serving 184k+ investors in 92 countries. Multi-currency wallets and crypto on/off ramps." },
];

function About() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">About</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl">
          We build the wealth platform we wished existed.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          NovaVest was founded in 2022 by a team of fintech and real-estate operators frustrated by fragmented portfolios.
          Today, we manage over $1.24B across structured plans and tokenized real estate — with a single elegant dashboard.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <p.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-display text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
