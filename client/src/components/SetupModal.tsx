/* D3MAND — Admin setup modal (Ctrl+Shift+A) */
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const SCRIPT_KEY = "d3mand_guestbook_url";

type Props = {
  open: boolean;
  initialId: string;
  onClose: () => void;
  onApply: (id: string) => void;
};

export default function SetupModal({ open, initialId, onClose, onApply }: Props) {
  const [csvVal, setCsvVal] = useState(initialId);
  const [scriptVal, setScriptVal] = useState(() => {
    try { return localStorage.getItem(SCRIPT_KEY) ?? ""; } catch { return ""; }
  });

  useEffect(() => {
    if (open) {
      setCsvVal(initialId);
      try { setScriptVal(localStorage.getItem(SCRIPT_KEY) ?? ""); } catch {}
    }
  }, [open, initialId]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const handleApply = () => {
    if (csvVal.trim()) onApply(csvVal.trim());
    try { localStorage.setItem(SCRIPT_KEY, scriptVal.trim()); } catch {}
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl border border-[var(--gold)]/30 bg-[var(--dark)] p-8 max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-[var(--muted-foreground)] hover:text-[var(--gold)]">
          <X className="size-5" />
        </button>

        {/* Section 1 — Google Sheet pétitions */}
        <h2 className="font-display text-lg font-bold text-[var(--gold)] mb-2">
          1 — URL CSV du Google Sheet (pétitions)
        </h2>
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)] mb-4">
          Connecte les chiffres de pétitions en temps réel.
        </p>
        <input
          value={csvVal}
          onChange={(e) => setCsvVal(e.target.value)}
          placeholder="https://docs.google.com/spreadsheets/d/e/2PACX-1v..."
          className="w-full border border-[var(--gold)]/25 bg-black/40 px-4 py-3 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)] mb-8"
        />

        {/* Section 2 — Google Apps Script livre d'or */}
        <h2 className="font-display text-lg font-bold text-[var(--gold)] mb-2">
          2 — URL du script livre d'or
        </h2>
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)] mb-4">
          Déploie ce script dans Google Apps Script (Extensions → Apps Script) sur ton même Google Sheet, puis copie l'URL de déploiement ici.
        </p>

        <div className="mb-4 space-y-2 border border-white/5 bg-black/30 p-4 font-mono text-[0.6rem] text-[var(--muted-foreground)]/70 leading-relaxed overflow-x-auto">
          <p className="text-[var(--gold-dim)]">// Colle ce code dans Apps Script → Déployer → Nouvelle version → Accès : Tout le monde</p>
          <pre>{`const SHEET = "Guestbook";
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const s = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET) ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET);
  if (!s.getLastRow()) s.appendRow(["Date","Nom","Message","Statut"]);
  s.appendRow([new Date().toISOString(), d.name||"Anonyme", d.message, "pending"]);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
  if (!s) return ContentService.createTextOutput("[]")
    .setMimeType(ContentService.MimeType.JSON);
  const msgs = s.getDataRange().getValues().slice(1)
    .filter(r => r[3]==="approved")
    .map(r => ({date:r[0],name:r[1],message:r[2]}));
  return ContentService.createTextOutput(JSON.stringify(msgs))
    .setMimeType(ContentService.MimeType.JSON);
}`}</pre>
          <p className="text-[var(--gold-dim)]">// Pour approuver un message : change "pending" en "approved" dans la colonne D du sheet "Guestbook"</p>
        </div>

        <input
          value={scriptVal}
          onChange={(e) => setScriptVal(e.target.value)}
          placeholder="https://script.google.com/macros/s/AKfycb.../exec"
          className="w-full border border-[var(--gold)]/25 bg-black/40 px-4 py-3 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)] mb-6"
        />

        <button
          onClick={handleApply}
          className="clip-bevel w-full bg-[var(--gold)] px-5 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--black)] transition-all hover:bg-[var(--gold-light)] hover:glow-gold active:scale-[0.98]"
        >
          ✦ Appliquer et enregistrer
        </button>

        <p className="mt-4 text-xs text-[var(--muted-foreground)]">
          Les chiffres se rafraîchiront automatiquement toutes les 5 minutes.
        </p>
      </div>
    </div>
  );
}
