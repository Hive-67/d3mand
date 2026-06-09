/* D3MAND — Stats Bar (mission control strip) */
import AnimatedCounter from "../AnimatedCounter";
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/contexts/LanguageContext";

type Props = { mainSigs: number };

export default function StatsBar({ mainSigs }: Props) {
  const ref = useReveal();
  const { T } = useLang();

  return (
    <div
      ref={ref}
      className="relative border-y border-[var(--gold)]/15 bg-gradient-to-r from-[var(--dark)] via-[var(--mid)] to-[var(--dark)]"
    >
      <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(90deg,transparent,transparent_120px,rgba(201,168,76,0.04)_120px,rgba(201,168,76,0.04)_121px)]" />
      <div className="relative mx-auto flex max-w-[1400px] flex-wrap justify-around gap-8 px-6 py-10 sm:px-10 lg:px-16">
        <Item
          value={
            <AnimatedCounter
              target={mainSigs}
              format={(n) => `+${Math.floor(n / 1000)}K`}
            />
          }
          label={T.stats.mainPetition}
        />
        <Item value="$3.6B" label={T.stats.buyout} />
        <Item value="-$765M" label={T.stats.losses} color="var(--flame)" />
        <Item value="12 ans" label={T.stats.timeline} />
      </div>
    </div>
  );
}

function Item({ value, label, color }: { value: React.ReactNode; label: string; color?: string }) {
  return (
    <div className="text-center">
      <div
        className="font-display text-2xl sm:text-3xl font-black tabular-nums"
        style={{ color: color || "var(--gold)" }}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
        {label}
      </div>
    </div>
  );
}
