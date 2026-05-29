/* D3MAND — Guestbook section */
import { useEffect, useRef, useState } from "react";
import { Check, Send } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/contexts/LanguageContext";

const SCRIPT_KEY = "d3mand_guestbook_url";

type GuestMsg = { date: string; name: string; message: string };

function useGuestbook(scriptUrl: string | null) {
  const [messages, setMessages] = useState<GuestMsg[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!scriptUrl) return;
    setLoading(true);
    fetch(scriptUrl)
      .then((r) => r.json())
      .then((d: GuestMsg[]) => setMessages(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [scriptUrl]);

  const submit = async (name: string, message: string) => {
    if (!scriptUrl) return false;
    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ name, message }),
      });
      return true;
    } catch {
      return false;
    }
  };

  return { messages, loading, submit };
}

export default function GuestbookSection() {
  const headerRef = useReveal();
  const { T } = useLang();
  const [scriptUrl] = useState<string | null>(() => {
    try { return localStorage.getItem(SCRIPT_KEY); } catch { return null; }
  });
  const { messages, loading, submit } = useGuestbook(scriptUrl);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setStatus("sending");
    const ok = await submit(name.trim(), msg.trim());
    if (ok) {
      setStatus("sent");
      setName("");
      setMsg("");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="guestbook" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">

        <div ref={headerRef} className="mb-12">
          <div className="codex-tag mb-2 text-[0.6rem]">{T.guestbook.tag}</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {T.guestbook.title}{" "}
            <em className="not-italic text-[var(--gold)]">{T.guestbook.titleGold}</em>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)]">
            {T.guestbook.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Form */}
          <div className="border border-[var(--gold)]/15 bg-[var(--card)] p-6 sm:p-8">
            <div className="codex-tag mb-4 text-[0.6rem]">{T.guestbook.formTag}</div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  {T.guestbook.labelName}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  required
                  placeholder={T.guestbook.placeholderName}
                  className="w-full border border-white/5 bg-black/30 px-4 py-3 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)]/40 placeholder:text-[var(--muted-foreground)]/40 transition-colors"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  {T.guestbook.labelMessage}
                </label>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  maxLength={400}
                  required
                  rows={5}
                  placeholder={T.guestbook.placeholderMessage}
                  className="w-full resize-none border border-white/5 bg-black/30 px-4 py-3 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)]/40 placeholder:text-[var(--muted-foreground)]/40 transition-colors leading-relaxed"
                />
                <div className="mt-1 text-right font-mono text-[0.55rem] text-[var(--muted-foreground)]/40">
                  {msg.length}/400
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent" || !scriptUrl}
                className={`inline-flex w-full items-center justify-center gap-2 px-5 py-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                  status === "sent"
                    ? "bg-emerald-500 text-white"
                    : "bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)]"
                }`}
              >
                {status === "sent" ? (
                  <><Check className="size-4" /> {T.guestbook.sent}</>
                ) : status === "sending" ? (
                  T.guestbook.sending
                ) : (
                  <><Send className="size-4" /> {T.guestbook.submit}</>
                )}
              </button>

              {status === "error" && (
                <p className="text-center text-xs text-red-400">{T.guestbook.error}</p>
              )}
              {!scriptUrl && (
                <p className="text-center font-mono text-[0.55rem] text-[var(--muted-foreground)]/50">
                  {T.guestbook.notConfigured}
                </p>
              )}
            </form>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            <div className="codex-tag text-[0.6rem]">{T.guestbook.messagesTag}</div>
            {loading ? (
              <div className="py-10 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--muted-foreground)]/50 animate-pulse">
                {T.guestbook.loading}
              </div>
            ) : messages.length === 0 ? (
              <div className="border border-dashed border-white/5 py-12 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--muted-foreground)]/40">
                {T.guestbook.empty}
              </div>
            ) : (
              messages.map((m, i) => <MessageCard key={i} {...m} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MessageCard({ date, name, message }: GuestMsg) {
  const ref = useReveal();
  const d = date ? new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "";
  return (
    <div ref={ref} className="border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-[var(--gold)]/20">
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <span className="font-display text-sm font-bold text-[var(--foreground)]">{name}</span>
        {d && <span className="font-mono text-[0.55rem] text-[var(--muted-foreground)]/50">{d}</span>}
      </div>
      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{message}</p>
    </div>
  );
}
