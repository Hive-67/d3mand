/* D3MAND — Arguments grid (numbered codex cards) */
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/contexts/LanguageContext";

export default function ArgumentsSection() {
  const ref = useReveal();
  const { T } = useLang();

  return (
    <section id="arguments" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={ref} className="mb-12">
          <div className="codex-tag mb-2 text-[0.6rem]">{T.arguments.tag}</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {T.arguments.title}{" "}
            <em className="not-italic text-[var(--gold)]">{T.arguments.titleGold}</em>{" "}
            {T.arguments.titleEnd}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {T.arguments.args.map((a) => (
            <ArgCard key={a.n} n={a.n} title={a.title} text={a.text} highlight={a.highlight} />
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
