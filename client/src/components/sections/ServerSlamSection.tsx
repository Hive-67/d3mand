/* D3MAND — Server Slam section */
import { Zap } from "lucide-react";
import Countdown from "../Countdown";
import { useReveal } from "@/hooks/useReveal";

export default function ServerSlamSection() {
  const ref = useReveal();

  return (
    <section id="server-slam" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div
          ref={ref}
          className="relative overflow-hidden border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/[0.06] to-[var(--flame)]/[0.04] p-8 sm:p-12"
          style={{ borderLeftWidth: "3px", borderLeftColor: "var(--gold)" }}
        >
          <div className="absolute inset-0 opacity-50 [background:repeating-linear-gradient(90deg,transparent,transparent_100px,rgba(201,168,76,0.025)_100px,rgba(201,168,76,0.025)_101px)]" />

          <div className="relative">
            {/* Tag */}
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[var(--flame)]">
              <Zap className="size-3 fill-[var(--flame)] stroke-none" />
              Opération coordonnée
            </div>

            {/* Title */}
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--gold)] mb-2 tracking-wide">
              Monument of Triumph — Dernière mise à jour de Destiny 2
            </h2>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[var(--flame)] mb-10">
              9 juin 2026 · 18h00
            </div>

            {/* Countdown */}
            <Countdown />

            {/* Message */}
            <div className="mt-10 max-w-2xl space-y-4">
              <p className="text-base leading-relaxed text-[var(--foreground)]">
                <strong className="text-[var(--gold)]">Ce jour-là, à 18h00, connectez-vous massivement à Destiny 2.</strong>{" "}
                Anciens gardiens inclus — même si vous n'avez pas joué depuis des mois.
              </p>
              <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
                L'objectif est simple : saturer les serveurs et générer un pic massif de joueurs actifs.
                Un chiffre d'engagement record est l'argument le plus solide qu'on puisse mettre
                sur le bureau de Sony. <strong className="text-[var(--foreground)]">Les métriques parlent
                plus fort que les signatures.</strong>
              </p>
              <div className="mt-6 inline-flex items-center gap-3 border border-[var(--flame)]/40 bg-[var(--flame)]/5 px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--flame)]">
                <span className="relative inline-flex">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[var(--flame)]/60" />
                  <span className="relative size-1.5 rounded-full bg-[var(--flame)]" />
                </span>
                9 juin 2026 · 18h00 · Connectez-vous à Destiny 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
