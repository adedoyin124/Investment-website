import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const [email, setEmail] = useState("");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-navy-gradient p-8 sm:p-12 lg:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-navy-foreground sm:text-5xl">
              Start with $100. <br />
              <span className="text-primary">Compound daily.</span>
            </h2>
            <p className="mt-4 max-w-md text-navy-foreground/80">
              Open your account in under 2 minutes. No paperwork, no waiting.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center rounded-full border border-navy-foreground/20 px-6 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy-foreground/10">
                Learn more
              </Link>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("You're on the list!"); setEmail(""); }}
            className="rounded-2xl bg-background/95 p-6 shadow-elegant backdrop-blur"
          >
            <p className="font-display text-sm font-semibold">Weekly market briefing</p>
            <p className="mt-1 text-xs text-muted-foreground">Curated insights for serious investors. No spam.</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
