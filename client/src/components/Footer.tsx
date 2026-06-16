/* D3MAND — Footer */
import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useVisitorCount } from "@/hooks/useVisitorCount";
import { useHubStats } from "@/hooks/useHubStats";

const HOF_KEY = "d3mand_hall_of_fame";

function useHallOfFame() {
  const [names, setNames] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(HOF_KEY) || "[]"); } catch { return []; }
  });
  useEffect(() => {
    const onStorage = () => {
      try { setNames(JSON.parse(localStorage.getItem(HOF_KEY) || "[]")); } catch {}
    };
    window.addEventListener("storage", onStorage);
    // Also poll every 2s in case same tab updates
    const id = setInterval(onStorage, 2000);
    return () => { window.removeEventListener("storage", onStorage); clearInterval(id); };
  }, []);
  return names;
}

export default function Footer() {
  const { T } = useLang();
  const visitors = useVisitorCount();
  const { hours, cost } = useHubStats();
  const hofNames = useHallOfFame();

  return (
    <footer className="border-t border-[var(--gold)]/15 bg-[var(--dark)] py-14">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
        <div className="font-display text-2xl font-black tracking-[0.18em] text-[var(--gold)] text-glow-gold mb-3">
          D3MAND
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          {T.footer.disclaimer}
        </p>
        <p className="mt-4 max-w-2xl text-xs text-[var(--muted-foreground)]/70">
          {T.footer.sources}
        </p>

        {/* Visitor counter */}
        {visitors !== null && (
          <div className="mt-6 flex items-center justify-center gap-2 border border-[var(--gold)]/15 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-[var(--muted-foreground)]/70">
              {visitors.toLocaleString()} {T.footer.visitors}
            </span>
          </div>
        )}

        {/* Hub stats */}
        <div id="support" className="mt-4 flex flex-col items-center gap-2 border border-[var(--gold)]/15 bg-[var(--gold)]/[0.03] px-6 py-3">
          <div className="font-mono text-[0.5rem] uppercase tracking-[0.35em] text-[var(--gold-dim)]">
            {T.footer.hubUntilNow}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-display text-lg font-black text-[var(--flame)] tabular-nums">{hours}h</span>
              <span className="font-mono text-[0.45rem] uppercase tracking-[0.2em] text-[var(--gold)]">{T.footer.hubHours}</span>
            </div>
            <div className="h-6 w-px bg-[var(--gold)]/15" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-display text-lg font-black text-[var(--flame)] tabular-nums">{cost}€</span>
              <span className="font-mono text-[0.45rem] uppercase tracking-[0.2em] text-[var(--gold)]">{T.footer.hubCost}</span>
            </div>
          </div>
        </div>

        {/* Ko-fi */}
        <div className="mt-5">
          <a
            href="https://ko-fi.com/bunkerd3mandhub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[var(--flame)]/60 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[var(--flame)] transition-all hover:border-[var(--flame)] hover:text-[var(--flame)] hover:bg-[var(--flame)]/5"
          >
            ☕ Soutenez le hub avec un espresso
          </a>
        </div>

        {/* Hall of Fame */}
        {hofNames.length > 0 && (
          <div className="mt-6 max-w-2xl w-full border border-[#cc3300]/20 bg-[#0a0200] px-4 py-3">
            <div className="font-mono text-[0.42rem] uppercase tracking-[0.35em] text-[#cc3300]/70 mb-2">
              ⬡ Gardiens enregistrés par Rasputin
            </div>
            <div className="font-mono text-[0.48rem] tracking-[0.15em] text-[#ff6622]/80 leading-relaxed">
              {hofNames.join(" · ")}
            </div>
          </div>
        )}

        {/* Indice secret Rasputin */}
        <div className="mt-5 font-mono text-[0.42rem] uppercase tracking-[0.4em] text-[var(--muted-foreground)]/25 select-none cursor-default">
          // SIGNAL DÉTECTÉ — PROTOCOLE IKELOS EN VEILLE //
        </div>

        <div className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)]/50">
          {T.footer.credit}
        </div>
      </div>
    </footer>
  );
}
