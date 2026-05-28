/* D3MAND — Arguments grid (numbered codex cards) */
import { useReveal } from "@/hooks/useReveal";

const ARGS = [
  {
    n: "01",
    title: "Communauté mondiale prouvée",
    text: "266 000+ signatures en quelques jours. Des millions de joueurs actifs pendant 12 ans. Destiny est une audience captive, loyale et prête à revenir — une rareté dans l'industrie.",
  },
  {
    n: "02",
    title: "Dette technologique à solder",
    text: "Le « vaulting » de contenus payants prouve les limites structurelles du moteur de Destiny 2. Un nouveau moteur permettrait de préserver l'intégralité de la saga sans compression du catalogue.",
  },
  {
    n: "03",
    title: "Lien social irremplaçable",
    text: "Des millions d'amitiés réelles, construites autour de raids nocturnes et de rituels hebdomadaires. Destiny 3 ne serait pas un jeu — ce serait la préservation d'un tissu social numérique unique.",
  },
  {
    n: "04",
    title: "Franchise plus bankable que Marathon",
    text: "Marathon est un pari risqué sur un marché encombré. Destiny bénéficie d'un univers profond, d'un lore établi sur 12 ans et d'un public qui ne demande qu'à investir dans une suite.",
  },
  {
    n: "05",
    title: "$765M de pertes sèches à compenser",
    text: "Sur la dernière année fiscale, Sony a subi une dépréciation d'actifs de 765 millions de dollars directement liée à Bungie. C'est un fait comptable, vérifiable, indiscutable. Destiny 3 est la voie la plus directe vers un ROI crédible sur l'acquisition de $3.6B.",
    highlight: true,
  },
  {
    n: "06",
    title: "L'argument du Server Slam",
    text: "Le 9 juin 2026, un pic massif de DAU (Daily Active Users) sera un argument quantitatif indiscutable auprès du board de Sony. Les métriques d'engagement parlent plus fort que les signatures.",
  },
];

export default function ArgumentsSection() {
  const ref = useReveal();
  return (
    <section id="arguments" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={ref} className="mb-12">
          <div className="codex-tag mb-2 text-[0.6rem]">Pourquoi Destiny 3</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Les <em className="not-italic text-[var(--gold)]">arguments</em> que Sony doit entendre
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ARGS.map((a) => (
            <ArgCard key={a.n} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArgCard({ n, title, text, highlight }: { n: string; title: string; text: string; highlight?: boolean }) {
  const ref = useReveal();
  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden border-l-2 p-7 transition-all ${
        highlight
          ? "border-[var(--gold)] bg-[var(--gold)]/[0.07] hover:bg-[var(--gold)]/[0.1]"
          : "border-[var(--gold-dim)] bg-[var(--gold)]/[0.03] hover:border-[var(--gold)] hover:bg-[var(--gold)]/[0.07]"
      }`}
    >
      <div className="absolute right-4 top-2 font-display text-7xl font-black leading-none text-[var(--gold)]/[0.08] select-none">
        {n}
      </div>
      <div className="relative">
        <div className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[var(--gold)] mb-3">
          {title}
        </div>
        <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
          {text}
        </p>
      </div>
    </article>
  );
}
