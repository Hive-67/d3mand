/* D3MAND — Footer */
import { useLang } from "@/contexts/LanguageContext";
import { useVisitorCount } from "@/hooks/useVisitorCount";

export default function Footer() {
  const { T } = useLang();
  const visitors = useVisitorCount();

  return (
    <footer className="border-t border-[var(--gold)]/15 bg-[var(--dark)] py-14">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 text-center">
        <div className="font-display text-2xl font-black tracking-[0.18em] text-[var(--gold)] text-glow-gold mb-3">
          D3MAND
        </div>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          {T.footer.disclaimer}
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-xs text-[var(--muted-foreground)]/70">
          {T.footer.sources}
        </p>

        {/* Visitor counter */}
        {visitors !== null && (
          <div className="mt-6 inline-flex items-center gap-2 border border-[var(--gold)]/15 px-4 py-2">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[var(--muted-foreground)]/70">
              {visitors.toLocaleString()} {T.footer.visitors}
            </span>
          </div>
        )}

        {/* Ko-fi */}
        <div className="mt-6">
          <a
            href="https://ko-fi.com/bunkerd3mandhub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--gold)]/20 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[var(--muted-foreground)]/60 transition-all hover:border-[var(--gold)]/40 hover:text-[var(--gold-dim)]"
          >
            ♥ {T.footer.kofi}
          </a>
        </div>

        <div className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)]/50">
          {T.footer.credit}
        </div>
      </div>
    </footer>
  );
}
