/* D3MAND — Footer */
import { useLang } from "@/contexts/LanguageContext";

export default function Footer() {
  const { T } = useLang();
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
        <div className="mt-8 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)]/50">
          {T.footer.credit}
        </div>
      </div>
    </footer>
  );
}
