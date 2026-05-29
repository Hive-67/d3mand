/* D3MAND — Community reaction videos */
import { Play } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/contexts/LanguageContext";

const VIDEOS = [
  {
    id: "B7yh77LOd24",
    url: "https://youtube.com/shorts/B7yh77LOd24",
    short: true,
  },
  {
    id: "-27OXz4NZcs",
    url: "https://youtu.be/-27OXz4NZcs",
    short: false,
  },
  {
    id: "zYyDfYe96Hg",
    url: "https://youtu.be/zYyDfYe96Hg",
    short: false,
  },
  {
    id: "HuWVUxOkz5s",
    url: "https://youtu.be/HuWVUxOkz5s",
    short: false,
  },
];

export default function VideosSection() {
  const headerRef = useReveal();
  const { T } = useLang();

  return (
    <section id="videos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="mb-12">
          <div className="codex-tag mb-2 text-[0.6rem]">{T.videos.tag}</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {T.videos.title1}{" "}
            <em className="not-italic text-[var(--gold)]">{T.videos.title2}</em>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)]">
            {T.videos.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ id, url, short }: { id: string; url: string; short: boolean }) {
  const ref = useReveal();
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden border border-white/5 bg-black/40 transition-all hover:border-[var(--gold)]/40 hover:scale-[1.02] ${
        short ? "aspect-[9/16] sm:aspect-[9/16]" : "aspect-video"
      }`}
    >
      {/* Thumbnail */}
      <img
        src={thumb}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-14 items-center justify-center border-2 border-white/80 bg-black/50 text-white transition-all group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)]/20 group-hover:text-[var(--gold)]">
          <Play className="size-5 translate-x-0.5 fill-current" />
        </div>
      </div>

      {/* Short badge */}
      {short && (
        <div className="absolute top-3 left-3 border border-[var(--flame)]/60 bg-[var(--flame)]/20 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[var(--flame)]">
          Short
        </div>
      )}

      {/* YouTube badge */}
      <div className="absolute bottom-3 right-3 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-white/50 group-hover:text-[var(--gold)]/70 transition-colors">
        YouTube ↗
      </div>
    </a>
  );
}
