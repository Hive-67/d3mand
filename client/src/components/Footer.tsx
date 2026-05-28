/* D3MAND — Footer */
export default function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 bg-[var(--dark)] py-14">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 text-center">
        <div className="font-display text-2xl font-black tracking-[0.18em] text-[var(--gold)] text-glow-gold mb-3">
          D3MAND
        </div>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          Initiative communautaire indépendante. Ce site n'est pas affilié à
          Bungie, Sony Interactive Entertainment ou Change.org. Toutes les
          données de pétitions proviennent de sources publiques vérifiées.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-xs text-[var(--muted-foreground)]/70">
          Sources : IGN SEA · TweakTown · DualShockers · Bungie.net · Reddit r/destiny2 · Change.org
        </p>
        <div className="mt-8 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)]/50">
          Fait par la communauté, pour la communauté · #D3MAND · #MakeDestiny3 · 2026
        </div>
      </div>
    </footer>
  );
}
