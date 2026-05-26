import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { PropertiesSection } from "@/components/landing/properties-section";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Real Estate — NovaVest" },
      { name: "description", content: "Own fractions of institutional-grade real estate — commercial, residential, industrial, and hospitality." },
      { property: "og:title", content: "Real Estate — NovaVest" },
      { property: "og:description", content: "Browse curated real estate investment opportunities." },
    ],
  }),
  component: Properties,
});

function Properties() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">Real estate</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">Curated properties.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Each property is held in a dedicated SPV. Rental income distributes monthly; appreciation realizes on sale.
        </p>
      </section>
      <PropertiesSection heading={false} />
    </SiteShell>
  );
}
