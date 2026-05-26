import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const stats = [
  { label: "Assets under management", value: "$1.24B", sub: "+18% YoY" },
  { label: "Avg. annual portfolio return", value: "11.6%", sub: "Net of fees" },
  { label: "Active investors", value: "184,902", sub: "in 92 countries" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-24 lg:pb-32">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            New: Tokenized real estate now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Wealth, <span className="text-primary">simplified.</span>
            <br />
            Real estate, <span className="bg-navy-gradient bg-clip-text text-transparent">unlocked.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            NovaVest blends structured daily-ROI plans with fractional ownership in institutional real estate — all from one premium dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="/signup" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
              Open your account
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/plans" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
              Explore plans
            </Link>
          </motion.div>

          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            Bank-grade encryption · SOC 2 Type II · SIPC up to $500k
          </div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl bg-navy-gradient p-1 shadow-elegant"
          >
            <div className="rounded-[1.4rem] bg-navy p-6 text-navy-foreground">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-navy-foreground/60">Portfolio</p>
                <span className="rounded-full bg-success/20 px-2.5 py-1 text-xs font-semibold text-success">+12.4%</span>
              </div>
              <p className="mt-3 font-display text-4xl font-bold tabular-nums">$48,210.94</p>
              <p className="text-xs text-navy-foreground/60">Total balance · live</p>

              <div className="mt-6 h-32 w-full">
                <svg viewBox="0 0 320 120" className="h-full w-full">
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.22 30)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="oklch(0.65 0.22 30)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    d="M0,90 C40,70 70,80 100,60 C140,40 170,50 200,30 C240,18 280,28 320,12"
                    fill="none"
                    stroke="oklch(0.65 0.22 30)"
                    strokeWidth="2.5"
                  />
                  <path d="M0,90 C40,70 70,80 100,60 C140,40 170,50 200,30 C240,18 280,28 320,12 L320,120 L0,120 Z" fill="url(#g)" />
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { l: "Plans", v: "$22.4k" },
                  { l: "Real estate", v: "$19.1k" },
                  { l: "Cash", v: "$6.7k" },
                ].map((c) => (
                  <div key={c.l} className="rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-navy-foreground/60">{c.l}</p>
                    <p className="mt-1 text-sm font-semibold">{c.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="font-display text-4xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
