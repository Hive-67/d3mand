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

          {/* Left — Guardian + title + countdown */}
          <div className="relative flex flex-col items-start">
            {/* Guardian image — positioned to bleed out of the column */}
            <div className="relative w-full max-w-[320px] lg:max-w-none">
              <img
                src="/guardian.png"
                alt="Gardien D3MAND"
                className="w-full max-w-[280px] lg:max-w-[340px] object-contain select-none pointer-events-none
                           drop-shadow-[0_0_40px_rgba(201,168,76,0.15)]"
                style={{ filter: "drop-shadow(0 0 32px rgba(201,168,76,0.12))" }}
              />
            </div>

            {/* Title + tagline overlaid below guardian */}
            <div className="mt-6 flex flex-col gap-3 lg:mt-4">
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

            {/* 2-year countdown */}
            <div className="mt-8 w-full max-w-[300px] border border-[var(--gold)]/20 bg-[var(--gold)]/3 p-4">
              <div className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-[var(--gold-dim)] mb-3">
                // Temps restant
              </div>

              {/* Digits */}
              <div className="flex items-end gap-4 mb-4">
                <Unit value={d} label="Jours" />
                <span className="font-display text-2xl font-black text-[var(--gold)]/40 mb-3">:</span>
                <Unit value={h} label="Heures" />
                <span className="font-display text-2xl font-black text-[var(--gold)]/40 mb-3">:</span>
                <Unit value={m} label="Min" />
              </div>

              {/* Progress bar */}
              <div className="h-px w-full bg-[var(--gold)]/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--gold)] transition-all duration-1000"
                  style={{
                    width: `${pct}%`,
                    boxShadow: "0 0 8px var(--gold)",
                  }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[0.5rem] text-[var(--muted-foreground)]">
                <span>29 mai 2026</span>
                <span>{pct.toFixed(1)}% écoulé</span>
                <span>29 mai 2028</span>
              </div>
            </div>
          </div>

          {/* Right — body text */}
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[var(--foreground)]/80 font-light lg:pt-16">
            <p>
              <span className="font-semibold text-[var(--gold)]">D3MAND</span>, c'est{" "}
              <em className="not-italic font-medium text-[var(--foreground)]">DEMAND</em> +{" "}
              <em className="not-italic font-medium text-[var(--foreground)]">D3</em> — Destiny 3. Ce nom, on ne l'a pas inventé.
              Il a émergé organiquement de la communauté active de Destiny : des passionnés qui ont décidé
              qu'ils n'allaient pas regarder leur franchise s'éteindre sans rien dire.
            </p>

            <p>
              Le{" "}
              <span className="font-semibold text-[var(--flame)]">9 juin 2026</span>, c'est officiel — c'est la date
              de la dernière mise à jour de Destiny 2. Bungie l'a annoncé : le cycle se ferme. Après des années
              de contenu, un moteur graphique à bout de souffle et une gestion catastrophique depuis le rachat
              par Sony —{" "}
              <span className="font-semibold text-[var(--foreground)]">400 développeurs licenciés</span>,{" "}
              <span className="font-semibold text-[var(--flame)]">705 millions de dollars de pertes</span>,{" "}
              <span className="font-semibold text-[var(--foreground)]">3,6 milliards investis</span> pour ce résultat — le rideau tombe.
            </p>

            <p>
              Sauf que Destiny n'a pas de concurrent. Pas d'équivalent. Personne n'a réussi à reproduire ce
              que cette franchise fait depuis dix ans : un shooter MMO avec un lore profond, un gunfeel unique
              et une communauté d'une fidélité rare.{" "}
              <span className="font-semibold text-[var(--foreground)]">Sony le sait. L'argent est là.</span> Ce
              n'est pas une question de faisabilité — c'est une question de volonté.
            </p>

            <p>
              Ce que la communauté exige, ce n'est pas un DLC de plus. C'est un{" "}
              <span className="font-semibold text-[var(--gold)]">vrai Destiny 3</span> — nouveau moteur, nouvelles bases.
              Que ça continue l'histoire ou qu'on reparte à l'Âge d'Or, aux origines de l'humanité au faîte
              de sa puissance. Du moment que c'est fait sérieusement.
            </p>

            <p>
              Créer une énième pétition nous semblait inutile. On a préféré construire{" "}
              <span className="font-semibold text-[var(--foreground)]">un hub</span> : toutes les pétitions réunies,
              tous les outils pour amplifier le mouvement, pour faire du bruit là où ça compte.
              Ce site a une durée de vie de{" "}
              <span className="font-semibold text-[var(--gold)]">deux ans</span>. Sans annonce, il ferme.
              Avec une annonce, il se transforme.
            </p>

            <p className="font-mono text-sm text-[var(--gold-dim)] tracking-wide pt-2">
              Fantaisiste ? Un peu.{" "}
              <span className="text-[var(--gold)]">Irréalisable ? À des années-lumière de ça.</span>
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
