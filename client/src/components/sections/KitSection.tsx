/* D3MAND — Kit Press & YouTubers + embed code */
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/useReveal";

const KIT = [
  {
    title: "Angle vidéo #1",
    desc: "« Sony a perdu $760M sur Bungie — Destiny 3 est leur seule bouée de sauvetage »",
    tag: "Finance · Analytique · Viral",
  },
  {
    title: "Angle vidéo #2",
    desc: "« 122 000 gardiens ont signé en 48h — la plus grande pétition gaming de 2026 »",
    tag: "News · Breaking · Communauté",
  },
  {
    title: "Angle vidéo #3",
    desc: "« Le Server Slam : quand les joueurs hackent les métriques pour sauver leur jeu »",
    tag: "Stratégie · Activisme · Innovant",
  },
  {
    title: "Angle vidéo #4",
    desc: "« Destiny 3 vs Marathon : quel jeu devrait Bungie vraiment faire ? »",
    tag: "Débat · Opinion · Engagement",
  },
  {
    title: "Data clé à citer",
    desc: "122K+ signatures · 6 pétitions actives · $760M de dépréciation Sony · $3.6B rachat · 12 ans de franchise · 9 juin : Server Slam",
    tag: "Sources vérifiées · IGN, TweakTown, Reddit",
  },
  {
    title: "Sources à citer",
    desc: "IGN SEA · TweakTown · DualShockers · Bungie.net officiel · Reddit r/destiny2 · Change.org",
    tag: "Toutes sourcées dans ce hub",
  },
  {
    title: "Call-to-action vidéo",
    desc: "« Lien dans la description — signe la pétition et rejoins le Server Slam le 9 juin. Partage ce hub à tous les Gardiens que tu connais. »",
    tag: "CTA optimisé",
  },
  {
    title: "Contact presse Sony",
    desc: "Sony Interactive Entertainment PR : press@sie.sony.com · Investisseurs : ir.sony.com · Bungie community team : community@bungie.com",
    tag: "Relations presse officielles",
  },
];

const EMBED_CODE = `<a href="https://c.org/GxQHNMQCH6" target="_blank" style="display:inline-block;background:#C9A84C;color:#080A0E;font-family:monospace;font-weight:700;padding:12px 24px;text-decoration:none;letter-spacing:2px;font-size:12px;">✦ SIGNER — DESTINY 3 PETITION</a>`;

export default function KitSection() {
  const headerRef = useReveal();
  const embedRef = useReveal();
  const [copied, setCopied] = useState(false);

  const copyEmbed = async () => {
    await navigator.clipboard.writeText(EMBED_CODE);
    setCopied(true);
    toast.success("Code d'intégration copié");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="kit" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="mb-8">
          <div className="codex-tag mb-2 text-[0.6rem]">
            Créateurs de contenu & Presse
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Kit <em className="not-italic text-[var(--gold)]">YouTubeur</em> & Journaliste
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
            Un créateur avec 100K abonnés qui parle du sujet fait plus que 10 000 signatures. Voici tout ce qu'il faut pour structurer un contenu viral et sourcé.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KIT.map((k) => (
            <KitCard key={k.title} {...k} />
          ))}
        </div>

        {/* Embed */}
        <div ref={embedRef} className="mt-14">
          <div className="mb-3 font-display text-base font-bold text-[var(--gold)]">
            Code d'intégration — Bouton Pétition pour votre site
          </div>
          <div className="border border-[var(--gold)]/15 bg-black/50 p-4 font-mono text-xs text-[var(--gold-dim)] overflow-x-auto whitespace-pre-wrap break-all">
            {EMBED_CODE}
          </div>
          <button
            onClick={copyEmbed}
            className={`mt-4 inline-flex items-center gap-2 px-5 py-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97] ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)] hover:glow-gold"
            }`}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Code copié !" : "Copier le code"}
          </button>
        </div>
      </div>
    </section>
  );
}

function KitCard({ title, desc, tag }: { title: string; desc: string; tag: string }) {
  const ref = useReveal();
  return (
    <article
      ref={ref}
      className="flex flex-col gap-3 border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-[var(--gold)]/25 hover:bg-[var(--gold)]/[0.04]"
    >
      <div className="font-display text-sm font-bold tracking-wide text-[var(--foreground)]">
        {title}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
        {desc}
      </p>
      <div className="font-mono text-[0.6rem] tracking-[0.15em] text-[var(--gold-dim)]">
        {tag}
      </div>
    </article>
  );
}
