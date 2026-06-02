import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NovaVest" },
      { name: "description", content: "Get in touch with the NovaVest team. We respond within one business day." },
    ],
  }),
  component: Contact,
});

type FeaturedProperty = {
  id: string;
  title: string;
  location: string;
  price: number;
  funded_percent: number;
  image_url: string | null;
};

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const { data: properties, isLoading, error } = useQuery<FeaturedProperty[]>({
    queryKey: ["contact", "featured-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title, location, price, funded_percent, image_url")
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <SiteShell>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">Contact</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight">Let's talk.</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Investor relations, partnerships, or just a question — we read every message.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-primary" /> novavestandproperties@gmail.com</li>
            <li className="flex items-start gap-3"><MessageSquare className="mt-0.5 h-4 w-4 text-primary" /> 24/7 in-app support for account holders</li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> 28 Liberty Street, New York, NY</li>
          </ul>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll reply within 1 business day."); setForm({ name: "", email: "", message: "" }); }}
          className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div>
            <label className="text-sm font-medium">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Send message
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">Featured properties</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Latest investment opportunities</h2>
          </div>
          {isLoading && <p className="text-sm text-muted-foreground">Loading latest deals…</p>}
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
            Could not load featured properties. Try again later.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(properties ?? []).map((property) => (
              <article key={property.id} className="rounded-3xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{property.title}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">{property.funded_percent}% funded</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{property.location}</p>
                <p className="mt-4 text-base font-semibold">${property.price.toLocaleString()}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
