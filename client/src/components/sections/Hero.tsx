/*
 * D3MAND — Guardian's Codex / HERO
 * Reproduit fidèlement la composition de l'image de référence :
 * - Wordmark D3MAND massif gradient or, layout asymétrique gauche
 * - Eyebrow monospace `// INITIATIVE MONDIALE · COMMUNITY HUB`
 * - Encart Server Slam orange en haut à droite
 * - Métriques en colonnes : 122K+, 6, 9 juin, $3.6B
 * - Hashtags discrets en bas à droite
 */
import { ArrowUpRight } from "lucide-react";
import AnimatedCounter from "../AnimatedCounter";
import { useLang } from "@/contexts/LanguageContext";

type HeroProps = {
  totalSignatures: number;
};

export default function Hero({ totalSignatures }: HeroProps) {
  const { T } = useLang();
  const getSublabel = (total: number) => {
    if (total >= 500000) return T.hero.sublabel500k;
    if (total >= 200000) return T.hero.sublabel200k;
    if (total >= 150000) return T.hero.sublabel150k;
    return T.hero.sublabelDefault;
  };
  return (
    <header className="relative isolate overflow-hidden">
      {/* Outer frame — subtle codex border */}
      <div className="pointer-events-none absolute inset-x-4 top-4 bottom-4 border border-[var(--gold)]/10" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28 lg:px-16">

        {/* Eyebrow */}
        <div
          className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-[var(--gold-dim)] animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          {T.hero.eyebrow}
        </div>

        {/* Wordmark */}
        <h1
          className="mt-6 font-display font-black leading-[0.9] tracking-tight text-gradient-gold animate-fade-up"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 12rem)",
            animationDelay: "0.15s",
          }}
        >
          D3MAND
        </h1>

        {/* Subtitle */}
        <div
          className="mt-3 font-mono text-xs sm:text-sm uppercase tracking-[0.5em] text-[var(--muted-foreground)] animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          We demand Destiny 3
        </div>

        {/* Divider */}
        <div
          className="mt-8 h-px w-40 bg-gradient-to-r from-[var(--gold)] to-transparent animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        />

        {/* Feature list */}
        <ul
          className="mt-8 max-w-xl space-y-1.5 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {T.hero.features.map((f: string) => (
            <li key={f} className="flex items-start gap-2.5 text-base sm:text-lg leading-snug font-light text-[var(--foreground)]">
              <span className="mt-1 size-1.5 shrink-0 bg-[var(--gold)]" aria-hidden />
              {f}
            </li>
          ))}
          <li className="flex items-start gap-2.5 text-base sm:text-lg leading-snug font-semibold text-[var(--gold)]">
            <span className="mt-1 size-1.5 shrink-0 bg-[var(--gold)]" aria-hidden />
            {T.hero.featuresEnd}
          </li>
        </ul>

        {/* Closer */}
        <p
          className="mt-5 max-w-xl text-lg sm:text-xl leading-relaxed font-light text-[var(--foreground)] animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="font-semibold text-[var(--gold)]">
            {T.hero.p2Prefix}{Math.floor(totalSignatures / 1000)}K+{T.hero.p2Suffix}
          </span>
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="https://c.org/GxQHNMQCH6"
            target="_blank"
            rel="noopener noreferrer"
            className="clip-bevel group inline-flex items-center gap-2 bg-[var(--gold)] px-6 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--black)] transition-all hover:bg-[var(--gold-light)] hover:-translate-y-0.5 hover:glow-gold active:scale-[0.98]"
          >
            {T.hero.cta1}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#server-slam"
            className="clip-bevel inline-flex items-center gap-2 bg-[var(--flame)] px-6 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span className="relative inline-flex">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
              <span className="relative size-1.5 rounded-full bg-white" />
            </span>
            {T.hero.cta2}
          </a>
          <a
            href="#tools"
            className="clip-bevel inline-flex items-center gap-2 border border-[var(--gold-dim)] bg-transparent px-6 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 hover:-translate-y-0.5"
          >
            {T.hero.cta3}
          </a>
        </div>

        {/* Metrics row */}
        <div
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 sm:gap-10 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="border-l border-[var(--gold)]/20 pl-4">
            <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--gold)] leading-none tabular-nums">
              <AnimatedCounter
                target={totalSignatures}
                format={(n) =>
                  n >= 1000 ? `${Math.floor(n / 1000)}K+` : n.toString()
                }
              />
            </div>
            <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              {T.hero.signatures}
            </div>
            <div className="mt-1 font-mono text-[0.55rem] tracking-[0.1em] text-[var(--gold-dim)] max-w-[180px] leading-relaxed">
              {getSublabel(totalSignatures)}
            </div>
          </div>
          <Metric value="6" label={T.hero.activePetitions} />
          <Metric value="9 juin" label={T.hero.serverSlam} />
          <Metric value="$3.6B" label={T.hero.buyout} />
          <Metric value="−$765M" label={T.hero.losses} accent="flame" />
        </div>

        {/* Hashtags column — bottom right */}
        <div
          className="mt-14 sm:absolute sm:right-10 sm:bottom-12 lg:right-16 sm:mt-0 flex flex-col items-end gap-1 font-mono text-[0.7rem] tracking-[0.15em] text-[var(--gold-dim)]/70 animate-fade-up"
          style={{ animationDelay: "0.85s" }}
        >
          <span># MakeDestiny3</span>
          <span># D3MAND</span>
          <span># ServerSlam</span>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--background)]" />
    </header>
  );
}

function Metric({ value, label, accent = "gold" }: { value: React.ReactNode; label: string; accent?: "gold" | "flame" }) {
  const color = accent === "flame" ? "var(--flame)" : "var(--gold)";
  return (
    <div className="border-l border-[var(--gold)]/20 pl-4">
      <div
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-none tabular-nums"
        style={{ color }}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
        {label}
      </div>
    </div>
  );
}
