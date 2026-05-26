import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-gradient text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-bold">NovaVest</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-navy-foreground/70">
            A modern wealth platform combining structured investment plans with institutional-grade real estate — built for individual investors.
          </p>
          <p className="mt-6 text-xs text-navy-foreground/50">
            Investments involve risk including loss of principal. Past performance is not indicative of future results.
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-navy-foreground/60">Platform</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            <li><Link to="/plans" className="hover:text-primary">Investment Plans</Link></li>
            <li><Link to="/properties" className="hover:text-primary">Real Estate</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-navy-foreground/60">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-navy-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} NovaVest. All rights reserved.</p>
          <p>Built for modern investors.</p>
        </div>
      </div>
    </footer>
  );
}
