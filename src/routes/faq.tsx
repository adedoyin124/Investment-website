import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { FAQ } from "@/components/landing/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — NovaVest" },
      { name: "description", content: "Answers about how NovaVest works, security, withdrawals, fees, and supported deposit methods." },
    ],
  }),
  component: () => (<SiteShell><FAQ /></SiteShell>),
});
