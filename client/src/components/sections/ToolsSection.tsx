/* D3MAND — Tools section with message generator + tool cards */
import { useState } from "react";
import {
  BarChart3,
  Calendar,
  Check,
  Copy,
  Link2,
  Mail,
  Megaphone,
  Mic,
} from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/useReveal";
import { MESSAGES, PLATFORM_LABELS, type Platform } from "@/lib/messages";

const HASHTAGS = [
  "#Destiny3",
  "#MakeDestiny3",
  "#ServerSlam",
  "#D3MAND",
  "#BringBackDestiny",
];

export default function ToolsSection() {
  const headerRef = useReveal();
  const genRef = useReveal();
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [copied, setCopied] = useState(false);

  const copyMsg = async () => {
    await navigator.clipboard.writeText(MESSAGES[platform]);
    setCopied(true);
    toast.success("Message copié dans le presse-papiers");
    setTimeout(() => setCopied(false), 2000);
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("URL copiée");
  };

  return (
    <section id="tools" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="mb-12">
          <div className="codex-tag mb-2 text-[0.6rem]">Arsenal communautaire</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Tous les <em className="not-italic text-[var(--gold)]">outils</em> pour agir
          </h2>
        </div>

        {/* Generator */}
        <div
          ref={genRef}
          className="mb-12 border border-[var(--gold)]/15 bg-[var(--card)] p-6 sm:p-8 backdrop-blur-md"
        >
          <div className="codex-tag text-[0.6rem]">Générateur de messages</div>
          <div className="mt-1 mb-6 font-display text-lg font-bold text-[var(--foreground)]">
            Copie-colle un message prêt à l'emploi
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {(Object.keys(MESSAGES) as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`font-display text-[0.6rem] font-bold uppercase tracking-[0.18em] px-4 py-2 border transition-all ${
                  platform === p
                    ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)]"
                    : "border-[var(--gold)]/20 bg-transparent text-[var(--muted-foreground)] hover:border-[var(--gold)]/40 hover:text-[var(--foreground)]"
                }`}
              >
                {PLATFORM_LABELS[p]}
              </button>
            ))}
          </div>

          <pre className="border border-white/5 bg-black/30 p-5 font-mono text-sm leading-relaxed text-[var(--foreground)] whitespace-pre-wrap min-h-[160px] overflow-x-auto">
            {MESSAGES[platform]}
          </pre>

          <button
            onClick={copyMsg}
            className={`mt-4 inline-flex items-center gap-2 px-5 py-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97] ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)] hover:glow-gold"
            }`}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copié !" : "Copier le message"}
          </button>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            icon={<BarChart3 className="size-5" />}
            title="Tracker de signatures"
            desc="Toutes les pétitions recensées avec leur progression en temps quasi-réel. Bookmark cette page pour suivre l'évolution quotidienne."
            cta={{ href: "#petitions", label: "Voir les pétitions" }}
          />
          <ToolCard
            icon={<Calendar className="size-5" />}
            title="Événement Server Slam"
            desc="Le 9 juin 2026, connectez-vous à Destiny 2 avec tous vos gardiens. Chaque connexion compte dans les métriques Sony."
            cta={{ href: "#server-slam", label: "Voir le compte à rebours", variant: "flame" }}
          />
          <ToolCard
            icon={<Mic className="size-5" />}
            title="Kit YouTubeur"
            desc="Points de langage, données chiffrées et titres accrocheurs pour structurer une vidéo sur le sujet et maximiser l'impact."
            cta={{ href: "#kit", label: "Voir le kit" }}
          />
          <ToolCard
            icon={<Mail className="size-5" />}
            title="Email Sony Direct"
            desc="Un template d'e-mail formaté, professionnel, à envoyer aux adresses publiques des relations presse et investisseurs de Sony Interactive Entertainment."
            action={() => {
              setPlatform("sony");
              document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
            }}
            actionLabel="Générer l'email"
          />
          <ToolCard
            icon={<Link2 className="size-5" />}
            title="Lien universel à partager"
            desc="Un seul lien qui regroupe tout. Partage cette URL partout pour concentrer l'audience sur un hub unique."
            action={copyUrl}
            actionLabel="Copier l'URL"
          />
          <ToolCard
            icon={<Megaphone className="size-5" />}
            title="Hashtags officiels"
            desc="Utilise systématiquement ces hashtags pour maximiser la visibilité sur les réseaux."
            tags={HASHTAGS}
          />
        </div>
      </div>
    </section>
  );
}

type ToolCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta?: { href: string; label: string; variant?: "gold" | "flame" };
  action?: () => void;
  actionLabel?: string;
  tags?: string[];
};

function ToolCard({ icon, title, desc, cta, action, actionLabel, tags }: ToolCardProps) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="flex flex-col border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/[0.04]"
    >
      <div className="mb-3 inline-flex size-10 items-center justify-center border border-[var(--gold)]/20 text-[var(--gold)]">
        {icon}
      </div>
      <div className="font-display text-base font-bold tracking-wide text-[var(--foreground)]">
        {title}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
        {desc}
      </p>

      {tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-2.5 py-1 font-mono text-[0.65rem] text-[var(--gold)]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {cta && (
        <a
          href={cta.href}
          className={`mt-5 inline-flex w-fit items-center gap-2 px-4 py-2 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97] ${
            cta.variant === "flame"
              ? "bg-[var(--flame)] text-white hover:brightness-110"
              : "border border-[var(--gold-dim)] text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
          }`}
        >
          {cta.label}
        </a>
      )}

      {action && actionLabel && (
        <button
          onClick={action}
          className="mt-5 inline-flex w-fit items-center gap-2 border border-[var(--gold-dim)] px-4 py-2 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 active:scale-[0.97]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
