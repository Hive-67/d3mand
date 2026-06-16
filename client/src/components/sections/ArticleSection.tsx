/* D3MAND — Article Section: Warframe x Destiny */
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/contexts/LanguageContext";

export default function ArticleSection() {
  const reveal = useReveal();
  const { T } = useLang();

  return (
    <section className="relative bg-gradient-to-b from-[var(--dark)] via-[var(--dark)]/95 to-[var(--dark)] py-20 lg:py-28">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--flame)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
        {/* Hero Section */}
        <div className="mb-16 text-center" ref={reveal}>
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-[var(--gold)]/20 rounded-full bg-[var(--gold)]/5">
            <span className="text-[var(--gold)] text-sm font-mono uppercase tracking-wider">⚡ Article</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black mb-4 text-[var(--gold)] text-glow-gold">
            Warframe entre dans le combat pour Destiny
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm italic mb-6 max-w-2xl mx-auto">
            Le 17 juin, la communauté Warframe tend la main aux Gardiens. Un geste rare. Un signal fort.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-[var(--muted-foreground)]/70 font-mono uppercase tracking-wider">
            <span>11 Juin 2026</span>
            <span className="opacity-40">•</span>
            <span>D3MAND HUB</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--gold)]/10 p-px rounded-lg mb-16 overflow-hidden" ref={reveal}>
          {[
            { value: "167 000", label: "joueurs le jour du patch final" },
            { value: "380 000", label: "signatures sur la pétition" },
            { value: "17 juin", label: "date de l'event Warframe" },
          ].map((stat, i) => (
            <div key={i} className="bg-[var(--dark)] p-6 text-center">
              <div className="font-display text-2xl lg:text-3xl font-black text-[var(--flame)] mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]/60 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Article Body */}
        <div className="space-y-12">
          {/* Section 1 */}
          <article className="space-y-4" ref={reveal}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--flame)] font-mono font-bold">Le contexte</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--flame)] to-transparent" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[var(--gold)]">
              Un dernier patch, et une communauté qui refuse de mourir
            </h3>
            <div className="space-y-4 text-[var(--muted-foreground)] text-sm leading-relaxed">
              <p>
                Le 9 juin 2026, Destiny 2 recevait sa <span className="text-[var(--gold)] font-semibold">mise à jour finale</span>. Une date que personne n'aurait voulu voir arriver.
                Et pourtant, au lieu de plonger dans le silence, la communauté a fait l'inverse : elle a déferré.
              </p>
              <p>
                Le jour du lancement du dernier patch, Destiny 2 a atteint un <span className="text-[var(--gold)] font-semibold">pic de 167 000 joueurs simultanés</span> sur Steam —
                son meilleur score depuis deux ans, surpassant les sorties combinées de Edge of Fate et Renegades, et doublant
                à lui seul le lancement de Marathon. Le message était clair : les Gardiens sont toujours là.
              </p>
              <p>
                Dans les jours suivants, les hashtags <span className="text-[var(--gold)] font-semibold">#SaveDestiny</span> et <span className="text-[var(--gold)] font-semibold">#WeWantDestiny3</span> ont explosé sur les réseaux sociaux.
                Les créateurs de contenu, les développeurs de Bungie eux-mêmes, et même les doubleurs du jeu ont pris la parole.
                La pétition officielle Destiny <span className="text-[var(--flame)] font-semibold">3</span> frôle les <span className="text-[var(--gold)] font-semibold">380 000 signatures</span>.
              </p>
            </div>
          </article>

          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />

          {/* Section 2 */}
          <article className="space-y-4" ref={reveal}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--flame)] font-mono font-bold">L'événement</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--flame)] to-transparent" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[var(--gold)]">
              Warframe tend la main le 17 juin
            </h3>

            {/* Event Card */}
            <div className="border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/5 to-transparent rounded-lg p-6 my-6 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 text-8xl font-black text-[var(--gold)]/5 pointer-events-none">17</div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-[var(--gold)] text-black text-xs font-bold uppercase tracking-wider rounded mb-3">
                  🗓 17 Juin 2026 · Gratuit · Warframe
                </div>
                <h4 className="font-display text-xl font-black text-[var(--gold)] mb-2">
                  "Make Your Own Fate"
                </h4>
                <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]/70 mb-4 font-mono">
                  Alert · Planète Telesto · En support à Destiny
                </p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Rebecca Ford, Directrice Créative de Warframe, a annoncé un event jouable gratuit dédié à la communauté Destiny.
                  Deux hommages dans le nom et le lieu : Telesto, comme le fusil iconique de Destiny 2 — ce même fusil responsable
                  de bugs mémorables — et la phrase <em>"Guardians make their own fate"</em>, née dans le Vault of Glass.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-[var(--gold)] bg-[var(--dark)]/50 px-6 py-4 rounded-r-lg my-6">
              <p className="text-[var(--gold)] italic font-semibold mb-2">
                "Guardians make their own fate."
              </p>
              <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]/60 font-mono">
                — Vault of Glass, Destiny · Devise reprise par la communauté contre la décision de Sony
              </p>
            </div>

            <div className="space-y-4 text-[var(--muted-foreground)] text-sm leading-relaxed">
              <p>
                L'origine de cette phrase est forte : les Vex, ennemis principaux du Vault of Glass, construisent leur stratégie sur
                la simulation de leurs adversaires. Mais les Gardiens sont des êtres paracausaux — ils <span className="text-[var(--gold)] font-semibold">transcendent les simulations</span>.
                Impossible de les calculer. Impossible de les arrêter. La communauté a fait de cette phrase son cri de ralliement
                face à Sony.
              </p>
            </div>
          </article>

          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />

          {/* Section 3 */}
          <article className="space-y-4" ref={reveal}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--flame)] font-mono font-bold">Le soutien</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--flame)] to-transparent" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[var(--gold)]">
              Tout le monde se mobilise
            </h3>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
              Ce mouvement dépasse les frontières d'un seul jeu. La communauté gaming dans son ensemble répond présent :
            </p>

            <ul className="space-y-3 my-6">
              {[
                { icon: "🎙️", title: "Les créateurs de contenu", desc: "Aztecross, FalloutPlay, Mactics, Skarrow9 — relaient massivement les hashtags et mobilisent leurs audiences." },
                { icon: "👾", title: "Les développeurs de Bungie", desc: "eux-mêmes prennent la parole publiquement, avec des témoignages personnels sur les réseaux." },
                { icon: "🎭", title: "Les doubleurs du jeu", desc: "partagent des messages de soutien aux joueurs et à la franchise qu'ils ont contribué à bâtir." },
                { icon: "🪐", title: "Warframe", desc: "transforme son jeu en espace de solidarité le 17 juin, avec un event directement nommé en référence à Destiny." },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 p-4 bg-[var(--dark)]/50 border border-[var(--gold)]/10 rounded-lg">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    <span className="text-[var(--gold)] font-semibold">{item.title}</span> — {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />

          {/* Section 4 */}
          <article className="space-y-4" ref={reveal}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--flame)] font-mono font-bold">L'appel</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--flame)] to-transparent" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[var(--gold)]">
              Soyez là. Jouez. Montrez-vous.
            </h3>
            <div className="space-y-4 text-[var(--muted-foreground)] text-sm leading-relaxed">
              <p>
                L'event Warframe du 17 juin est exactement le type de signal que Sony et Bungie ne peuvent pas ignorer.
                Ce n'est pas un événement ordinaire. C'est une déclaration. Une preuve que la communauté existe, qu'elle s'unit, qu'elle refuse l'oubli.
              </p>
              <p>
                <span className="text-[var(--gold)] font-semibold">Soyez là. Jouez. Montrez-vous.</span>
              </p>
            </div>
          </article>
        </div>


      </div>
    </section>
  );
}
