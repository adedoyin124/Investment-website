import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How does NovaVest generate daily returns?", a: "Capital is allocated across diversified strategies including private credit, structured yield products, and rental income from our real estate portfolio. Daily ROI is calibrated per tier." },
  { q: "Is my money safe?", a: "Customer assets are held with regulated custodians. NovaVest is SOC 2 Type II and uses bank-grade encryption. Real estate is held in property-specific SPVs." },
  { q: "When can I withdraw?", a: "Plan capital is locked for the duration of the chosen tier; earnings accrue daily and can be withdrawn at any time. Real estate positions are liquid through our secondary marketplace." },
  { q: "What are the fees?", a: "0% on deposits and ROI payouts. A 1.0% annual platform fee applies to real estate AUM. No hidden charges." },
  { q: "Do you support crypto deposits?", a: "Yes — USDC, USDT and BTC are supported alongside ACH, wire and card. Stablecoin deposits settle within minutes." },
  { q: "Is there a minimum investment?", a: "$100 for the Starter plan. Real estate fractions start at $250 per share." },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center">FAQ</p>
      <h2 className="mt-3 text-center font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Questions, answered.
      </h2>
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="border-b border-border">
            <AccordionTrigger className="text-left font-display text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
