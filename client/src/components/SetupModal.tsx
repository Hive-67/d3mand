/* D3MAND — Google Sheets setup modal */
import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  initialId: string;
  onClose: () => void;
  onApply: (id: string) => void;
};

export default function SetupModal({ open, initialId, onClose, onApply }: Props) {
  const [val, setVal] = useState(initialId);

  useEffect(() => {
    if (open) setVal(initialId);
  }, [open, initialId]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl border border-[var(--gold)]/30 bg-[var(--dark)] p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--muted-foreground)] hover:text-[var(--gold)]"
        >
          <X className="size-5" />
        </button>

        <h2 className="font-display text-lg font-bold text-[var(--gold)] mb-2">
          Configurer l'URL CSV du Google Sheet
        </h2>
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)] mb-5">
          Suis ces 3 étapes pour connecter les vrais chiffres en direct :
        </p>

        <div className="space-y-3 mb-5">
          {[
            <>
              <strong>Crée un Google Sheet</strong> avec colonnes :
              <code className="bg-black/40 px-1.5 py-0.5 text-[var(--gold-light)] font-mono text-xs ml-1">
                id, name, signatures, goal
              </code>
            </>,
            <>
              <strong>Publie-le en CSV :</strong> Fichier &gt; Partager &gt;
              Publier sur le Web &gt; Format CSV.
            </>,
            <>
              <strong>Copie l'URL CSV</strong> (elle commence par{" "}
              <code className="bg-black/40 px-1.5 py-0.5 text-[var(--gold-light)] font-mono text-xs">
                https://docs.google.com/spreadsheets/d/e/
              </code>
              ) et colle-la ci-dessous.
            </>,
          ].map((node, i) => (
            <div
              key={i}
              className="flex items-start gap-4 border-l-2 border-[var(--gold-dim)] bg-[var(--gold)]/[0.04] p-3"
            >
              <div className="font-display text-xl font-black text-[var(--gold)]">
                {i + 1}
              </div>
              <div className="text-sm leading-relaxed text-[var(--foreground)]/90">
                {node}
              </div>
            </div>
          ))}
        </div>

        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Ex: https://docs.google.com/spreadsheets/d/e/2PACX-1v..."
          className="w-full border border-[var(--gold)]/25 bg-black/40 px-4 py-3 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)] mb-4"
        />

        <button
          onClick={() => val.trim() && onApply(val.trim())}
          className="clip-bevel w-full bg-[var(--gold)] px-5 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--black)] transition-all hover:bg-[var(--gold-light)] hover:glow-gold active:scale-[0.98]"
        >
          ✦ Appliquer et synchroniser
        </button>

        <p className="mt-4 text-xs text-[var(--muted-foreground)]">
          Les chiffres se rafraîchiront automatiquement toutes les 5 minutes.
        </p>
      </div>
    </div>
  );
}
