import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  expected_roi: number;
  property_type: string;
  image_url: string | null;
  description: string | null;
  funded_percent: number;
};

export function PropertiesSection({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const { data } = useQuery({
    queryKey: ["properties", limit ?? "all"],
    queryFn: async () => {
      let q = supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return data as Property[];
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {heading && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">Real estate</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Own a fraction of institutional property.
            </h2>
          </div>
          <Link to="/properties" className="text-sm font-semibold text-primary hover:underline">
            Browse all properties →
          </Link>
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition hover:shadow-elegant"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              )}
              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
                {p.property_type}
              </span>
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
                <TrendingUp className="h-3 w-3" />
                {p.expected_roi}% ROI
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {p.location}
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>${p.price.toLocaleString()}</span>
                  <span>{p.funded_percent}% funded</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-red-gradient" style={{ width: `${p.funded_percent}%` }} />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
