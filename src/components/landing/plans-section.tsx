import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Plan = {
  id: string;
  name: string;
  tier: string;
  min_amount: number;
  max_amount: number;
  daily_roi: number;
  duration_days: number;
  features: string[];
};

export function PlansSection({ heading = true }: { heading?: boolean }) {
  const { data: plans } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("investment_plans")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Plan[];
    },
  });

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">Investment plans</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Built for every stage of your wealth journey.
            </h2>
          </div>
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(plans ?? []).map((p, i) => {
            const featured = p.tier === "gold";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`relative rounded-3xl border p-6 ${
                  featured
                    ? "border-primary/40 bg-navy text-navy-foreground shadow-elegant"
                    : "border-border bg-card shadow-card"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Most popular
                  </span>
                )}
                <p className="font-display text-xs font-semibold uppercase tracking-wider opacity-70">{p.name}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold tabular-nums">{p.daily_roi}%</span>
                  <span className="text-sm opacity-70">/day</span>
                </div>
                <p className="mt-1 text-xs opacity-70">
                  ${p.min_amount.toLocaleString()} – ${p.max_amount.toLocaleString()} · {p.duration_days} days
                </p>

                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-primary" : "text-success"}`} />
                      <span className="opacity-90">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    featured ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-background hover:bg-secondary"
                  }`}
                >
                  Choose {p.name}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
