/* D3MAND — Community videos: farewell + info tabs */
import { useState } from "react";
import { Play } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/contexts/LanguageContext";

type VideoEntry = { id: string; url: string; short?: boolean };

const FAREWELL: VideoEntry[] = [
  { id: "B7yh77LOd24", url: "https://youtube.com/shorts/B7yh77LOd24", short: true },
  { id: "QXr_AlUAsU8", url: "https://youtube.com/shorts/QXr_AlUAsU8", short: true },
  { id: "NZu-0A1rG7c", url: "https://youtube.com/shorts/NZu-0A1rG7c", short: true },
  { id: "-27OXz4NZcs", url: "https://youtu.be/-27OXz4NZcs" },
  { id: "zYyDfYe96Hg", url: "https://youtu.be/zYyDfYe96Hg" },
  { id: "HuWVUxOkz5s", url: "https://youtu.be/HuWVUxOkz5s" },
];

const INFO: VideoEntry[] = [
  // À compléter — ajouter les vidéos d'information ici
];

type Tab = "farewell" | "info";

export default function VideosSection() {
  const headerRef = useReveal();
  const { T } = useLang();
  const [tab, setTab] = useState<Tab>("farewell");

  const list = tab === "farewell" ? FAREWELL : INFO;

  return (
    <section id="videos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <div className="codex-tag mb-2 text-[0.6rem]">{T.videos.tag}</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {T.videos.title}{" "}
            <em className="not-italic text-[var(--gold)]">{T.videos.titleGold}</em>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-white/5">
          {(["farewell", "info"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-6 py-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all ${
                tab === t
                  ? "text-[var(--gold)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {t === "farewell" ? T.videos.tabFarewell : T.videos.tabInfo}
              {tab === t && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--gold)]" style={{ boxShadow: "0 0 8px 1px var(--gold)" }} />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {list.length === 0 ? (
          <div className="flex items-center justify-center border border-dashed border-white/10 py-20 text-sm text-[var(--muted-foreground)]">
            {T.videos.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((v) => (
              <VideoCard key={v.id} {...v} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

function VideoCard({ id, url, short }: VideoEntry) {
  const ref = useReveal();
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden border border-white/5 bg-black/40 transition-all hover:border-[var(--gold)]/40 hover:scale-[1.02] ${
        short ? "aspect-[9/16]" : "aspect-video"
      }`}
    >
      <img
        src={thumb}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-100"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-12 items-center justify-center border-2 border-white/70 bg-black/50 text-white transition-all group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)]/20 group-hover:text-[var(--gold)]">
          <Play className="size-4 translate-x-0.5 fill-current" />
        </div>
      </div>
      {short && (
        <div className="absolute top-2.5 left-2.5 border border-[var(--flame)]/60 bg-[var(--flame)]/20 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-[var(--flame)]">
          Short
        </div>
      )}
      <div className="absolute bottom-2.5 right-2.5 font-mono text-[0.5rem] uppercase tracking-[0.15em] text-white/40 group-hover:text-[var(--gold)]/60 transition-colors">
        YouTube ↗
      </div>
    </a>
  );
}
