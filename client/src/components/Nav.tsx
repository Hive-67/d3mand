/* D3MAND — Top nav. Sticky, glassy, sliding active-section indicator + lang toggle. */
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useLang } from "@/contexts/LanguageContext";

export default function Nav() {
  const { lang, setLang, T } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const NAV_LINKS = [
    { href: "#about", label: T.nav.manifeste },
    { href: "#petitions", label: T.nav.petitions },
    { href: "#server-slam", label: T.nav.serverSlam },
    { href: "#tools", label: T.nav.tools },
    { href: "#arguments", label: T.nav.arguments },
    { href: "#kit", label: T.nav.kit },
    { href: "#videos", label: T.nav.videos },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const visible = new Set<string>();

    const pick = () => {
      const first = ids.find((id) => visible.has(id));
      setActiveHref(first ? `#${first}` : null);
    };

    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          entry.isIntersecting ? visible.add(id) : visible.delete(id);
          pick();
        },
        { rootMargin: "-15% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    if (!activeHref || !listRef.current) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const anchor = itemRefs.current.get(activeHref);
    if (!anchor) return;
    const listRect = listRef.current.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    setIndicator({ left: anchorRect.left - listRect.left, width: anchorRect.width, visible: true });
  }, [activeHref, lang]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all sm:px-10 lg:px-16 ${
        scrolled
          ? "border-b border-[var(--gold)]/15 bg-[var(--black)]/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <button
        onClick={async () => {
          await navigator.clipboard.writeText("https://d3mandhub.com/");
          toast.success("Lien copié !");
        }}
        className="block group text-left"
      >
        <div className="font-display text-lg sm:text-xl font-black tracking-[0.18em] text-[var(--gold)] text-glow-gold transition-transform group-hover:scale-[1.02]">
          D3MAND
        </div>
        <div className="hidden sm:block font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)] -mt-0.5">
          The Destiny 3 Community Hub
        </div>
      </button>

      <ul ref={listRef} className="hidden lg:flex items-center gap-6 relative py-1">
        {/* Sliding underline */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 h-px transition-all duration-300 ease-out"
          style={{
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.visible ? 1 : 0,
            background: "var(--gold)",
            boxShadow: "0 0 8px 1px var(--gold)",
          }}
        />

        {NAV_LINKS.map((link) => (
          <li key={link.href} className="py-1">
            <a
              href={link.href}
              ref={(el) => {
                if (el) itemRefs.current.set(link.href, el);
                else itemRefs.current.delete(link.href);
              }}
              className="relative font-display uppercase tracking-[0.25em] transition-all duration-300 ease-out inline-block hover:text-[var(--gold)]"
              style={
                activeHref === link.href
                  ? { color: "var(--gold)", fontSize: "0.72rem", transform: "translateY(-2px)", textShadow: "0 0 14px color-mix(in srgb, var(--gold) 65%, transparent)" }
                  : { fontSize: "0.65rem", transform: "translateY(0px)", color: "var(--muted-foreground)" }
              }
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="font-mono text-[0.6rem] uppercase tracking-[0.25em] border border-[var(--gold)]/30 px-2.5 py-1.5 text-[var(--gold-dim)] transition-all hover:border-[var(--gold)] hover:text-[var(--gold)]"
          aria-label="Toggle language"
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>

        <a
          href="https://c.org/GxQHNMQCH6"
          target="_blank"
          rel="noopener noreferrer"
          className="clip-bevel inline-flex items-center gap-2 bg-[var(--gold)] px-4 py-2 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--black)] transition-all hover:bg-[var(--gold-light)] hover:glow-gold active:scale-[0.97]"
        >
          {T.nav.sign}
        </a>
      </div>
    </nav>
  );
}
