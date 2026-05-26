import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { PlansSection } from "@/components/landing/plans-section";
import { Calculator } from "@/components/landing/calculator";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Investment Plans — NovaVest" },
      { name: "description", content: "Four investment tiers — Starter, Silver, Gold, Platinum — with daily ROI from 0.8% to 2.5%." },
      { property: "og:title", content: "Investment Plans — NovaVest" },
      { property: "og:description", content: "Compare daily ROI across NovaVest's four investment tiers." },
    ],
  }),
  component: Plans,
});

function Plans() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-4 text-center sm:px-6 lg:px-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">Investment plans</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">
          Pick the plan that fits your goals.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Every plan compounds daily and auto-pays principal back at the end of the term.
        </p>
      </section>
      <PlansSection heading={false} />
      <Calculator />
    </SiteShell>
  );
}
