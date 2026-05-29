import { useReveal } from "@/hooks/useReveal";

export default function AboutSection() {
  const ref = useReveal();
  return (
    <section id="about" className="relative py-20 sm:py-28">
      {/* Subtle gold line top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">

          {/* Left — label + title */}
          <div className="flex flex-col justify-start gap-4">
            <div className="codex-tag text-[0.6rem]">Manifeste</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Pourquoi{" "}
              <span className="text-gradient-gold">D3MAND</span>{" "}
              existe
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-[var(--gold)] to-transparent mt-2" />
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)] leading-relaxed mt-2">
              Un hub, pas une pétition de plus.
              <br />
              Une communauté, pas un hashtag.
              <br />
              Deux ans pour être entendus.
            </p>
          </div>

          {/* Right — body text */}
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[var(--foreground)]/80 font-light">
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
              et une communauté d'une fidélité rare. <span className="font-semibold text-[var(--foreground)]">Sony le sait. L'argent est là.</span> Ce
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
              Ce site a une durée de vie de <span className="font-semibold text-[var(--gold)]">deux ans</span>. Sans annonce, il ferme.
              Avec une annonce, il se transforme.
            </p>

            <p className="font-mono text-sm text-[var(--gold-dim)] tracking-wide pt-2">
              Fantaisiste ? Un peu.{" "}
              <span className="text-[var(--gold)]">Irréalisable ? À des années-lumière de ça.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Subtle gold line bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />
    </section>
  );
}
