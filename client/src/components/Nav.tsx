/* D3MAND — Top nav. Sticky, glassy, with codex tag wordmark. */
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#petitions", label: "Pétitions" },
  { href: "#server-slam", label: "Server Slam" },
  { href: "#tools", label: "Outils" },
  { href: "#arguments", label: "Arguments" },
  { href: "#kit", label: "Kit Presse" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      <ul className="hidden lg:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-display text-[0.65rem] uppercase tracking-[0.25em] text-[var(--muted-foreground)] transition-colors hover:text-[var(--gold)]"
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
