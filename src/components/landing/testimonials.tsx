import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  { quote: "I finally have one place for my plans and real-estate exposure. The dashboard is gorgeous.", name: "Maya R.", role: "Product designer · Brooklyn" },
  { quote: "Switched from three platforms. NovaVest's Gold tier paid for my mortgage last quarter.", name: "Daniel A.", role: "Founder · Austin" },
  { quote: "Fractional commercial real estate at this UX quality didn't exist before.", name: "Priya S.", role: "VP Engineering · London" },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">Loved by investors</p>
      <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Trusted by 184k+ investors worldwide.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-4 font-display text-lg leading-snug">"{t.quote}"</blockquote>
            <figcaption className="mt-5 text-sm">
              <p className="font-semibold">{t.name}</p>
              <p className="text-muted-foreground">{t.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
