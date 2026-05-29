import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/contexts/LanguageContext";

// Date de lancement du mouvement — modifier ici si besoin
const LAUNCH_DATE = new Date("2026-05-29T00:00:00Z");
const END_DATE = new Date(LAUNCH_DATE.getTime() + 2 * 365.25 * 24 * 3600 * 1000);

function useTwoYearCountdown() {
  const calc = () => {
    const now = Date.now();
    const total = END_DATE.getTime() - LAUNCH_DATE.getTime();
    const elapsed = now - LAUNCH_DATE.getTime();
    const remaining = Math.max(0, END_DATE.getTime() - now);
    const pct = Math.min(100, (elapsed / total) * 100);
    const d = Math.floor(remaining / 86400000);
    const h = Math.floor((remaining % 86400000) / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    return { d, h, m, pct };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = window.setInterval(() => setT(calc()), 60000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function AboutSection() {
  const ref = useReveal();
  const { T } = useLang();
  const { d, h, m, pct } = useTwoYearCountdown();
  const [contactName, setContactName] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={ref} className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_2fr]">

          {/* Left — title + countdown (top) + guardian (bottom, looking up) */}
          <div className="flex flex-col items-start">

            {/* Title + tagline */}
            <div className="flex flex-col gap-3">
              <div className="codex-tag text-[0.6rem]">{T.about.tag}</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                {T.about.title}
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-[var(--gold)] to-transparent" />
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[var(--muted-foreground)] leading-relaxed">
                {T.about.tagline1}<br />{T.about.tagline2}<br />{T.about.tagline3}
              </p>
            </div>

            {/* 2-year countdown — where the guardian looks */}
            <div className="mt-8 w-full max-w-[300px] border border-[var(--gold)]/20 bg-[var(--gold)]/3 p-4">
              <div className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-[var(--gold-dim)] mb-3">
                {T.about.countdown}
              </div>
              <div className="flex items-end gap-4 mb-4">
                <Unit value={d} label={T.about.days} />
                <span className="font-display text-2xl font-black text-[var(--gold)]/40 mb-3">:</span>
                <Unit value={h} label={T.about.hours} />
                <span className="font-display text-2xl font-black text-[var(--gold)]/40 mb-3">:</span>
                <Unit value={m} label={T.about.min} />
              </div>
              <div className="h-px w-full bg-[var(--gold)]/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--gold)] transition-all duration-1000"
                  style={{ width: `${pct}%`, boxShadow: "0 0 8px var(--gold)" }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[0.5rem] text-[var(--muted-foreground)]">
                <span>29 mai 2026</span>
                <span>{pct.toFixed(1)}% {T.about.elapsed}</span>
                <span>29 mai 2028</span>
              </div>
            </div>

            {/* Guardian — bottom, looking up toward the countdown */}
            <div className="mt-6 w-full flex justify-center lg:justify-start">
              <img
                src="/guardian.png"
                alt="Gardien D3MAND"
                className="w-[220px] lg:w-[280px] object-contain select-none pointer-events-none"
                style={{ filter: "drop-shadow(0 0 24px rgba(201,168,76,0.18))" }}
              />
            </div>
          </div>

          {/* Right — body text + contact form */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[var(--foreground)]/80 font-light lg:pt-16">
            <p>{T.about.p1}</p>
            <p>{T.about.p2}</p>
            <p><span className="font-semibold text-[var(--gold)]">{T.about.p3}</span></p>
            <p>{T.about.p4}</p>
            <p className="font-semibold text-[var(--foreground)]">
              {T.about.p5}{" "}
              <span className="text-[var(--gold)]">{T.about.p5gold}</span>
            </p>
            <p className="font-mono text-sm text-[var(--muted-foreground)] tracking-wide pt-2 border-l-2 border-[var(--gold)]/30 pl-4">
              {T.about.p6}
            </p>

            {/* Scrollable "all content" panel */}
            <div className="border border-[var(--gold)]/15 bg-black/20 max-h-[420px] overflow-y-auto p-6 space-y-8 [scrollbar-width:thin] [scrollbar-color:var(--gold-dim)_transparent]">

              {/* Comment agir */}
              <div>
                <div className="codex-tag mb-4 text-[0.6rem]">{T.about.howToActTag}</div>
                <ul className="space-y-4">
                  {T.about.actions.map((a) => (
                    <li key={a.title}>
                      <div className="font-display text-sm font-bold text-[var(--gold)] uppercase tracking-[0.08em] mb-1">
                        ✦ {a.title}
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{a.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kit créateurs */}
              <div>
                <div className="codex-tag mb-3 text-[0.6rem]">{T.about.kitTag}</div>
                <p className="text-sm text-[var(--foreground)]/80 mb-3">{T.about.kitIntro}</p>
                <ul className="space-y-1.5 mb-3">
                  {T.about.kitItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                      <span className="mt-1 size-1 shrink-0 bg-[var(--gold)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[var(--muted-foreground)] italic">{T.about.kitNote}</p>
              </div>

              {/* Timeline */}
              <div>
                <div className="codex-tag mb-3 text-[0.6rem]">{T.about.timelineTag}</div>
                <p className="text-sm text-[var(--foreground)]/80 mb-3">{T.about.timelineIntro}</p>
                <ul className="space-y-1.5 mb-3">
                  {T.about.timelineItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                      <span className="mt-1 size-1 shrink-0 bg-[var(--gold)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[var(--muted-foreground)] italic">{T.about.timelineNote}</p>
              </div>

            </div>

            {/* Contact form */}
            <div className="pt-4 border-t border-white/5">
              <div className="codex-tag mb-4 text-[0.6rem]">{T.about.contactTag}</div>
              <form
                ref={formRef}
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const subject = encodeURIComponent(T.about.contactSubject);
                  const body = encodeURIComponent(`${T.about.contactFrom} ${contactName}\n\n${contactMsg}`);
                  window.location.href = `mailto:coalition.destiny@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                <input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  placeholder={T.about.contactNamePlaceholder}
                  className="w-full border border-white/5 bg-black/30 px-4 py-2.5 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)]/40 placeholder:text-[var(--muted-foreground)]/40 transition-colors"
                />
                <textarea
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  required
                  rows={4}
                  placeholder={T.about.contactMsgPlaceholder}
                  className="w-full resize-none border border-white/5 bg-black/30 px-4 py-2.5 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)]/40 placeholder:text-[var(--muted-foreground)]/40 transition-colors leading-relaxed"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 border border-[var(--gold)]/30 bg-transparent px-5 py-2.5 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)] transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 active:scale-[0.97]"
                >
                  {T.about.contactSend} ↗
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />
    </section>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-2xl font-black text-[var(--gold)] leading-none tabular-nums">
        {String(value).padStart(3, "0")}
      </span>
      <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
        {label}
      </span>
    </div>
  );
}
