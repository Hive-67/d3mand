/* D3MAND — SyncBar bottom-right indicator */
import type { SyncState } from "@/lib/petitions";

type Props = {
  state: SyncState;
  label: string;
  onClick?: () => void;
};

const DOT_COLORS: Record<SyncState, string> = {
  loading: "bg-[var(--gold)] animate-pulse-dot",
  ok: "bg-emerald-500",
  error: "bg-[var(--destructive)]",
  fallback: "bg-[var(--cobalt)]",
};

export default function SyncBar({ state, label, onClick }: Props) {
  const interactive = !!onClick;
  const Comp = interactive ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 border border-[var(--gold)]/20 bg-black/85 backdrop-blur-md px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--muted-foreground)] transition-all ${
        interactive ? "cursor-pointer hover:border-[var(--gold)]/50 hover:text-[var(--gold)]" : ""
      }`}
    >
      <span className={`size-1.5 rounded-full ${DOT_COLORS[state]}`} />
      {label}
    </Comp>
  );
}
