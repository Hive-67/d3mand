import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-06-09T16:00:00Z"); // 18h00 Paris (CEST = UTC+2)

function getDiff() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, finished: true };
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, finished: false };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const [t, setT] = useState(getDiff);

  useEffect(() => {
    const id = window.setInterval(() => setT(getDiff()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: "Jours", value: pad(t.d) },
    { label: "Heures", value: pad(t.h) },
    { label: "Minutes", value: pad(t.m) },
    { label: "Secondes", value: pad(t.s) },
  ];

  return (
    <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-end gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <div
              className="min-w-[80px] sm:min-w-[110px] border border-[var(--gold)]/25 bg-[var(--gold)]/5 px-3 py-2 sm:px-5 sm:py-3 text-center font-display text-3xl sm:text-5xl font-black leading-none text-[var(--gold)] text-glow-gold tabular-nums"
              aria-label={`${u.label}: ${u.value}`}
            >
              {u.value}
            </div>
            <div className="codex-tag mt-2 text-[0.55rem]">{u.label}</div>
          </div>
          {i < units.length - 1 && (
            <div className="pb-7 sm:pb-9 font-display text-2xl sm:text-4xl text-[var(--gold-dim)]">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
