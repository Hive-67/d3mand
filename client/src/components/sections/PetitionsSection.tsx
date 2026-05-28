/* D3MAND — Petitions grid (cards with HUD bevel + progress bars) */
import { ArrowUpRight } from "lucide-react";
import AnimatedCounter from "../AnimatedCounter";
import { useReveal } from "@/hooks/useReveal";
import {
  PETITIONS,
  type PetitionEntry,
  type PetitionId,
} from "@/lib/petitions";

type Props = {
  sigs: Record<PetitionId, number>;
};

export default function PetitionsSection({ sigs }: Props) {
  const headerRef = useReveal();

  return (
    <section id="petitions" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="mb-12">
          <div className="codex-tag mb-2 text-[0.6rem]">
            Mobilisation globale
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Toutes les <em className="not-italic text-[var(--gold)]">pétitions</em> en un seul endroit
          </h2>
        </div>

        {/* 4 pétitions actives uniquement */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PETITIONS.map((p) => (
            <PetitionCard key={p.id} petition={p} sigs={sigs[p.id]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PetitionCard({
  petition,
  sigs,
}: {
  petition: PetitionEntry;
  sigs: number;
}) {
  const ref = useReveal();
  const pct = Math.min((sigs / petition.goal) * 100, 100);

  return (
    <div
      ref={ref}
      className={`clip-bevel-card group relative overflow-hidden border p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${
        petition.featured
          ? "border-[var(--gold)]/50 bg-[var(--gold)]/[0.06]"
          : "border-[var(--gold)]/15 bg-[var(--card)]"
      }`}
    >
      {/* Left bar */}
      <div
        className={`absolute left-0 top-0 h-full w-[3px] transition-all ${
          petition.featured
            ? "bg-[var(--gold)] shadow-[0_0_20px_var(--gold)]"
            : "bg-[var(--gold-dim)] group-hover:bg-[var(--gold)] group-hover:shadow-[0_0_20px_var(--gold)]"
        }`}
      />

      <div className="flex items-center gap-3 mb-3">
        <div className="size-1.5 rounded-full bg-[var(--gold)] animate-pulse-dot" />
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-[var(--gold)]">
          {petition.featured ? "Pétition principale" : "Active"}
        </span>
        {petition.featured && (
          <span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            Live
          </span>
        )}
      </div>

      <h3 className="font-display text-base font-bold leading-snug text-[var(--foreground)]">
        {petition.title}
      </h3>
      <p className="mt-1 font-mono text-[0.65rem] tracking-wide text-[var(--muted-foreground)]">
        Par {petition.author} · {petition.date}
      </p>

      <div className="mt-5 flex items-baseline gap-2">
        <div className="font-display text-3xl font-black text-[var(--gold)] tabular-nums">
          <AnimatedCounter target={sigs} />
        </div>
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
          signatures
        </div>
      </div>

      <div className="mt-3 h-1 w-full overflow-hidden bg-[var(--gold)]/10">
        <div
          className="h-full bg-gradient-to-r from-[var(--gold-dim)] via-[var(--gold)] to-[var(--gold-light)] transition-[width] duration-1000 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
        <span>{pct.toFixed(1)}% objectif</span>
        <span>{petition.goal.toLocaleString("fr-FR")}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={petition.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border border-[var(--gold-dim)] px-3 py-2 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
        >
          Signer
          <ArrowUpRight className="size-3" />
        </a>
        {petition.altLinks?.map((alt) => (
          <a
            key={alt.href}
            href={alt.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--muted-foreground)] transition-colors hover:text-[var(--gold)] hover:border-[var(--gold)]/40"
          >
            {alt.label}
          </a>
        ))}
      </div>
    </div>
  );
}
