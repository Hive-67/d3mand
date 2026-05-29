import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

// Date de lancement du mouvement — modifier ici si besoin
const LAUNCH_DATE = new Date("2026-05-29T00:00:00Z");
const END_DATE = new Date(LAUNCH_DATE.getTime() + 2 * 365.25 * 24 * 3600 * 1000);

function useTwoYearCountdown() {
  const calc = () => {
    const now = Date.now();
    const total = END_DATE.getTime() - LAUNCH_DATE.getTime();
    const elapsed = now - LAUNCH_DATE.getTime();
    const remaining = Math.max(0, END_DATE.getTime() - now);
    const pct = Math.min(100, (elapsed / total) * 100);
    const d = Math.floor(remaining / 86400000);
    const h = Math.floor((remaining % 86400000) / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    return { d, h, m, pct };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = window.setInterval(() => setT(calc()), 60000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function AboutSection() {
  const ref = useReveal();
  const { d, h, m, pct } = useTwoYearCountdown();

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={ref} className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_2fr]">

          {/* Left — title + countdown (top) + guardian (bottom, looking up) */}
          <div className="flex flex-col items-start">

            {/* Title + tagline */}
            <div className="flex flex-col gap-3">
              <div className="codex-tag text-[0.6rem]">Manifeste</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Pourquoi{" "}
                <span className="text-gradient-gold">D3MAND</span>{" "}
                existe
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-[var(--gold)] to-transparent" />
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[var(--muted-foreground)] leading-relaxed">
                Un hub, pas une pétition de plus.
                <br />Une communauté, pas un hashtag.
                <br />Deux ans pour être entendus.
              </p>
            </div>

            {/* 2-year countdown — where the guardian looks */}
            <div className="mt-8 w-full max-w-[300px] border border-[var(--gold)]/20 bg-[var(--gold)]/3 p-4">
              <div className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-[var(--gold-dim)] mb-3">
                // Temps restant
              </div>
              <div className="flex items-end gap-4 mb-4">
                <Unit value={d} label="Jours" />
                <span className="font-display text-2xl font-black text-[var(--gold)]/40 mb-3">:</span>
                <Unit value={h} label="Heures" />
                <span className="font-display text-2xl font-black text-[var(--gold)]/40 mb-3">:</span>
                <Unit value={m} label="Min" />
              </div>
              <div className="h-px w-full bg-[var(--gold)]/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--gold)] transition-all duration-1000"
                  style={{ width: `${pct}%`, boxShadow: "0 0 8px var(--gold)" }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[0.5rem] text-[var(--muted-foreground)]">
                <span>29 mai 2026</span>
                <span>{pct.toFixed(1)}% écoulé</span>
                <span>29 mai 2028</span>
              </div>
            </div>

            {/* Guardian — bottom, looking up toward the countdown */}
            <div className="mt-6 w-full flex justify-center lg:justify-start">
              <img
                src="/guardian.png"
                alt="Gardien D3MAND"
                className="w-[220px] lg:w-[280px] object-contain select-none pointer-events-none"
                style={{ filter: "drop-shadow(0 0 24px rgba(201,168,76,0.18))" }}
              />
            </div>
          </div>

          {/* Right — body text */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[var(--foreground)]/80 font-light lg:pt-16">
            <p>
              Sony a racheté Bungie{" "}
              <span className="font-semibold text-[var(--foreground)]">3,6 milliards de dollars</span>.
              Aujourd'hui :{" "}
              <span className="font-semibold text-[var(--flame)]">765 millions de dollars de pertes</span>.{" "}
              <span className="font-semibold text-[var(--foreground)]">400 développeurs licenciés</span>.
              Destiny 2 se ferme le{" "}
              <span className="font-semibold text-[var(--flame)]">9 juin 2026</span>.
            </p>

            <p>
              Aucun concurrent n'a jamais réussi à remplacer Destiny.{" "}
              <span className="font-semibold text-[var(--foreground)]">Douze ans. Zéro équivalent.</span>
            </p>

            <p>
              <span className="font-semibold text-[var(--gold)]">220 000 signatures en 4 jours.</span>{" "}
              Spontanées. Pas organisées. Pas payées.
            </p>

            <p>
              Ce n'est pas une pétition de plus. C'est{" "}
              <span className="font-semibold text-[var(--foreground)]">un hub</span> : toutes les pétitions,
              tous les outils, un seul endroit. Zéro pub. Zéro monétisation. Juste organiser cette demande
              pour la rendre incontournable.
            </p>

            <p className="font-semibold text-[var(--foreground)]">
              Sony cherche comment inverser la tendance.{" "}
              <span className="text-[var(--gold)]">Montrez-leur où est la réponse.</span>
            </p>

            <p className="font-mono text-sm text-[var(--muted-foreground)] tracking-wide pt-2 border-l-2 border-[var(--gold)]/30 pl-4">
              Le site sera actif et mis à jour régulièrement pendant{" "}
              <span className="text-[var(--gold)]">deux ans</span>.
              Sans annonce officielle d'un Destiny 3, le site fermera.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />
    </section>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-2xl font-black text-[var(--gold)] leading-none tabular-nums">
        {String(value).padStart(3, "0")}
      </span>
      <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
        {label}
      </span>
    </div>
  );
}
