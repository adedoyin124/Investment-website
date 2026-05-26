import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/plans", label: "Plans" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-gradient text-primary-foreground shadow-glow">
            <TrendingUp className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">NovaVest</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <Link to="/dashboard" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                Sign in
              </Link>
              <Link to="/signup" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
                Open account
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-3">
              {user ? (
                <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="rounded-full border border-border px-5 py-2.5 text-center text-sm font-medium">Sign in</Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground">Open account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
