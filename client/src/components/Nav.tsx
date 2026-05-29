/* D3MAND — Top nav. Sticky, glassy, sliding active-section indicator. */
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#about", label: "Manifeste" },
  { href: "#petitions", label: "Pétitions" },
  { href: "#server-slam", label: "Server Slam" },
  { href: "#tools", label: "Outils" },
  { href: "#arguments", label: "Arguments" },
  { href: "#kit", label: "Kit Presse" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch each section — active = first one in the viewport
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

  // Move indicator whenever active link changes
  useEffect(() => {
    if (!activeHref || !listRef.current) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const li = itemRefs.current.get(activeHref);
    if (!li) return;
    const listRect = listRef.current.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    setIndicator({
      left: liRect.left - listRect.left,
      width: liRect.width,
      visible: true,
    });
  }, [activeHref]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all sm:px-10 lg:px-16 ${
        scrolled
          ? "border-b border-[var(--gold)]/15 bg-[var(--black)]/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <a href="#top" className="block group">
        <div className="font-display text-lg sm:text-xl font-black tracking-[0.18em] text-[var(--gold)] text-glow-gold transition-transform group-hover:scale-[1.02]">
          D3MAND
        </div>
        <div className="hidden sm:block font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[var(--muted-foreground)] -mt-0.5">
          The Destiny 3 Community Hub
        </div>
      </a>

      <ul ref={listRef} className="hidden lg:flex items-center gap-6 relative py-1">
        {/* Sliding highlight — moves to the active <li> */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 rounded-sm transition-all duration-300 ease-out
                     bg-[var(--gold)]/8 border border-[var(--gold)]/20"
          style={{
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.visible ? 1 : 0,
          }}
        />

        {NAV_LINKS.map((link) => (
          <li
            key={link.href}
            ref={(el) => {
              if (el) itemRefs.current.set(link.href, el);
              else itemRefs.current.delete(link.href);
            }}
            className="px-3 py-1"
          >
            <a
              href={link.href}
              className={`relative font-display text-[0.65rem] uppercase tracking-[0.25em] transition-colors duration-200 ${
                activeHref === link.href
                  ? "text-[var(--gold)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--gold)]"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="https://c.org/GxQHNMQCH6"
        target="_blank"
        rel="noopener noreferrer"
        className="clip-bevel inline-flex items-center gap-2 bg-[var(--gold)] px-4 py-2 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--black)] transition-all hover:bg-[var(--gold-light)] hover:glow-gold active:scale-[0.97]"
      >
        ✦ Signer
      </a>
    </nav>
  );
}
