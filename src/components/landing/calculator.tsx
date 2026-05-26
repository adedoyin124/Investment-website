import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const tiers = [
  { name: "Starter", roi: 0.8, min: 100 },
  { name: "Silver", roi: 1.2, min: 1000 },
  { name: "Gold", roi: 1.8, min: 5000 },
  { name: "Platinum", roi: 2.5, min: 25000 },
];

function compound(principal: number, dailyRoi: number, days: number) {
  return principal * Math.pow(1 + dailyRoi / 100, days);
}

export function Calculator() {
  const [amount, setAmount] = useState(5000);
  const [days, setDays] = useState(90);
  const [tierIdx, setTierIdx] = useState(2);
  const tier = tiers[tierIdx];

  const projected = useMemo(() => compound(amount, tier.roi, days), [amount, days, tier]);
  const profit = projected - amount;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">Calculator</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            See your money work — every single day.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Estimate compounded daily returns across our four investment tiers. Numbers are illustrative; actual results vary with market conditions.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="flex flex-wrap gap-2">
            {tiers.map((t, i) => (
              <button
                key={t.name}
                onClick={() => { setTierIdx(i); if (amount < t.min) setAmount(t.min); }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  i === tierIdx ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {t.name} · {t.roi}%/day
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium">Investment amount</label>
                <span className="font-display text-2xl font-bold tabular-nums">${amount.toLocaleString()}</span>
              </div>
              <input
                type="range" min={tier.min} max={100000} step={100}
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2 w-full accent-[oklch(0.585_0.215_28)]"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium">Duration</label>
                <span className="font-display text-2xl font-bold tabular-nums">{days} days</span>
              </div>
              <input
                type="range" min={7} max={365} value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-2 w-full accent-[oklch(0.585_0.215_28)]"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-navy p-5 text-navy-foreground">
            <div>
              <p className="text-xs uppercase tracking-wider text-navy-foreground/60">Projected value</p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums">
                ${projected.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-navy-foreground/60">Profit</p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums text-primary">
                +${profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
