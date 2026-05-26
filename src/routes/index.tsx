import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Hero } from "@/components/landing/hero";
import { Calculator } from "@/components/landing/calculator";
import { PlansSection } from "@/components/landing/plans-section";
import { PropertiesSection } from "@/components/landing/properties-section";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta-section";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Calculator />
      <PlansSection />
      <PropertiesSection limit={3} />
      <Testimonials />
      <FAQ />
      <CTASection />
    </SiteShell>
  );
}
