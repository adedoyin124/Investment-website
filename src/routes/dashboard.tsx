import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, LogOut, TrendingUp, Wallet, PiggyBank, Building2, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — NovaVest" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string | null; referral_code: string | null; balance: number } | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, referral_code, balance").eq("id", user.id).single()
      .then(({ data }) => setProfile(data as any));
  }, [user]);

  const { data: plans } = useQuery({
    queryKey: ["plans-mini"],
    queryFn: async () => {
      const { data } = await supabase.from("investment_plans").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  if (loading || !user) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
  }

  const name = profile?.full_name ?? user.email?.split("@")[0] ?? "Investor";

  // Demo portfolio numbers
  const portfolio = { total: 48210.94, change: 12.4, plans: 22400, realEstate: 19100, cash: 6710 };
  const recent = [
    { type: "deposit", method: "ACH transfer", amount: 5000, when: "Today, 10:42" },
    { type: "roi", method: "Gold plan payout", amount: 412.5, when: "Today, 00:01" },
    { type: "investment", method: "Marina Bay Residences", amount: -2500, when: "Yesterday" },
    { type: "withdrawal", method: "Bank transfer", amount: -1200, when: "Apr 28" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-gradient text-primary-foreground"><TrendingUp className="h-4 w-4" /></span>
            <span className="font-display text-xl font-bold">NovaVest</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary"><Bell className="h-4 w-4" /></button>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{name}.</h1>
          </div>
          <Link to="/plans" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90">
            <Sparkles className="h-4 w-4" /> Invest more
          </Link>
        </div>

        {/* Hero card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 overflow-hidden rounded-3xl bg-navy-gradient p-6 text-navy-foreground shadow-elegant sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-navy-foreground/60">Total portfolio</p>
              <p className="mt-2 font-display text-5xl font-bold tabular-nums">${portfolio.total.toLocaleString()}</p>
              <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/20 px-3 py-1 text-xs font-semibold text-success">
                <ArrowUpRight className="h-3 w-3" /> +{portfolio.change}% this month
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Plans", v: portfolio.plans, i: PiggyBank },
                { l: "Real estate", v: portfolio.realEstate, i: Building2 },
                { l: "Cash", v: portfolio.cash, i: Wallet },
              ].map((c) => (
                <div key={c.l} className="rounded-2xl bg-white/5 p-3">
                  <c.i className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-navy-foreground/60">{c.l}</p>
                  <p className="mt-0.5 text-sm font-bold tabular-nums">${c.v.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Active plans */}
          <section className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Plans available to you</h2>
              <Link to="/plans" className="text-xs font-semibold text-primary hover:underline">Browse all →</Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(plans ?? []).slice(0, 4).map((p: any) => (
                <div key={p.id} className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-sm font-semibold">{p.name}</p>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{p.daily_roi}%/day</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    ${p.min_amount.toLocaleString()} – ${p.max_amount.toLocaleString()} · {p.duration_days} days
                  </p>
                  <button className="mt-3 w-full rounded-full bg-secondary py-1.5 text-xs font-semibold hover:bg-foreground hover:text-background transition">
                    Invest
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Profile / referral */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold">Your account</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd className="font-medium">{user.email}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Wallet balance</dt><dd className="font-semibold tabular-nums">${Number(profile?.balance ?? 0).toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">KYC</dt><dd className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">Pending</dd></div>
            </dl>
            <div className="mt-5 rounded-2xl bg-cream p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Referral code</p>
              <p className="mt-1 font-display text-xl font-bold tracking-widest">{profile?.referral_code ?? "—"}</p>
              <p className="mt-1 text-xs text-muted-foreground">Earn 5% of your friends' first plan ROI.</p>
            </div>
          </section>
        </div>

        {/* Recent transactions */}
        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold">Recent activity</h2>
          <ul className="mt-4 divide-y divide-border">
            {recent.map((t, i) => (
              <li key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className={`grid h-9 w-9 place-items-center rounded-full ${t.amount > 0 ? "bg-success/15 text-success" : "bg-primary/10 text-primary"}`}>
                    {t.amount > 0 ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="text-sm font-semibold capitalize">{t.type}</p>
                    <p className="text-xs text-muted-foreground">{t.method} · {t.when}</p>
                  </div>
                </div>
                <p className={`font-display text-base font-bold tabular-nums ${t.amount > 0 ? "text-success" : "text-foreground"}`}>
                  {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
