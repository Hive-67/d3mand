/* D3MAND — Tools section with message generator + tool cards */
import { useState } from "react";
import { BarChart3, Calendar, Check, Copy, Link2, Mail, Megaphone, Mic } from "lucide-react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/contexts/LanguageContext";
import { MESSAGES, MESSAGES_EN, PLATFORM_LABELS, type Platform } from "@/lib/messages";

const HASHTAGS = ["#Destiny3", "#MakeDestiny3", "#ServerSlam", "#D3MAND", "#BringBackDestiny"];

export default function ToolsSection() {
  const headerRef = useReveal();
  const genRef = useReveal();
  const { T } = useLang();
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [msgLang, setMsgLang] = useState<"fr" | "en">("fr");
  const [copiedFr, setCopiedFr] = useState(false);
  const [copiedEn, setCopiedEn] = useState(false);

  const copyFr = async () => {
    await navigator.clipboard.writeText(MESSAGES[platform]);
    setCopiedFr(true);
    toast.success(T.tools.toastCopied);
    setTimeout(() => setCopiedFr(false), 2000);
  };

  const copyEn = async () => {
    await navigator.clipboard.writeText(MESSAGES_EN[platform]);
    setCopiedEn(true);
    toast.success(T.tools.toastCopied);
    setTimeout(() => setCopiedEn(false), 2000);
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText("https://d3mandhub.com/");
    toast.success(T.tools.toastUrlCopied);
  };

  const cards = T.tools.cards;

  return (
    <section id="tools" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="mb-12">
          <div className="codex-tag mb-2 text-[0.6rem]">{T.tools.tag}</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {T.tools.title}{" "}
            <em className="not-italic text-[var(--gold)]">{T.tools.titleGold}</em>{" "}
            {T.tools.titleEnd}
          </h2>
        </div>

        {/* Generator */}
        <div ref={genRef} className="mb-12 border border-[var(--gold)]/15 bg-[var(--card)] p-6 sm:p-8 backdrop-blur-md">
          {/* Header row */}
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="codex-tag text-[0.6rem]">{T.tools.generatorTag}</div>
              <div className="mt-1 font-display text-lg font-bold text-[var(--foreground)]">
                {T.tools.generatorTitle}
              </div>
            </div>
            {/* FR / EN toggle */}
            <div className="flex items-center gap-1 border border-[var(--gold)]/20 p-0.5">
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setMsgLang(l)}
                  className={`font-mono text-[0.6rem] uppercase tracking-[0.25em] px-3 py-1.5 transition-all ${
                    msgLang === l
                      ? "bg-[var(--gold)] text-[var(--black)] font-bold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--gold)]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Platform tabs */}
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

          {/* Single message box based on selected language */}
          {msgLang === "fr" ? (
            <div>
              <pre className="border border-white/5 bg-black/30 p-5 font-mono text-sm leading-relaxed text-[var(--foreground)] whitespace-pre-wrap min-h-[160px] overflow-x-auto">
                {MESSAGES[platform]}
              </pre>
              <button
                onClick={copyFr}
                className={`mt-4 inline-flex items-center gap-2 px-5 py-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97] ${
                  copiedFr ? "bg-emerald-500 text-white" : "bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)] hover:glow-gold"
                }`}
              >
                {copiedFr ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copiedFr ? T.tools.copied : T.tools.copy}
              </button>
            </div>
          ) : (
            <div>
              <pre className="border border-[var(--cobalt)]/20 bg-black/30 p-5 font-mono text-sm leading-relaxed text-[var(--foreground)] whitespace-pre-wrap min-h-[160px] overflow-x-auto">
                {MESSAGES_EN[platform]}
              </pre>
              <button
                onClick={copyEn}
                className={`mt-4 inline-flex items-center gap-2 px-5 py-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97] ${
                  copiedEn ? "bg-emerald-500 text-white" : "bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)] hover:glow-gold"
                }`}
              >
                {copiedEn ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copiedEn ? T.tools.copied : T.tools.copy}
              </button>
            </div>
          )}
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard icon={<BarChart3 className="size-5" />} title={cards[0].title} desc={cards[0].desc} cta={{ href: "#petitions", label: cards[0].cta }} />
          <ToolCard icon={<Calendar className="size-5" />} title={cards[1].title} desc={cards[1].desc} cta={{ href: "#server-slam", label: cards[1].cta, variant: "flame" }} />
          <ToolCard icon={<Mic className="size-5" />} title={cards[2].title} desc={cards[2].desc} cta={{ href: "#kit", label: cards[2].cta }} />
          <ToolCard icon={<Mail className="size-5" />} title={cards[3].title} desc={cards[3].desc} action={() => { setPlatform("sony"); document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" }); }} actionLabel={cards[3].cta} />
          <ToolCard icon={<Link2 className="size-5" />} title={cards[4].title} desc={cards[4].desc} action={copyUrl} actionLabel={cards[4].cta} />
          <ToolCard icon={<Megaphone className="size-5" />} title={cards[5].title} desc={cards[5].desc} tags={HASHTAGS} />
        </div>
      </div>
    </section>
  );
}

type ToolCardProps = { icon: React.ReactNode; title: string; desc: string; cta?: { href: string; label: string; variant?: "gold" | "flame" }; action?: () => void; actionLabel?: string; tags?: string[]; };

function ToolCard({ icon, title, desc, cta, action, actionLabel, tags }: ToolCardProps) {
  const ref = useReveal();
  return (
    <div ref={ref} className="flex flex-col border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/[0.04]">
      <div className="mb-3 inline-flex size-10 items-center justify-center border border-[var(--gold)]/20 text-[var(--gold)]">{icon}</div>
      <div className="font-display text-base font-bold tracking-wide text-[var(--foreground)]">{title}</div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">{desc}</p>
      {tags && <div className="mt-4 flex flex-wrap gap-2">{tags.map((t) => <span key={t} className="border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-2.5 py-1 font-mono text-[0.65rem] text-[var(--gold)]">{t}</span>)}</div>}
      {cta && <a href={cta.href} className={`mt-5 inline-flex w-fit items-center gap-2 px-4 py-2 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97] ${cta.variant === "flame" ? "bg-[var(--flame)] text-white hover:brightness-110" : "border border-[var(--gold-dim)] text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"}`}>{cta.label}</a>}
      {action && actionLabel && <button onClick={action} className="mt-5 inline-flex w-fit items-center gap-2 border border-[var(--gold-dim)] px-4 py-2 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 active:scale-[0.97]">{actionLabel}</button>}
    </div>
  );
}
