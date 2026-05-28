import { useEffect, useRef } from "react";

/**
 * useReveal — adds `.visible` class when element enters viewport.
 * Used for staggered reveal-on-scroll across the codex layout.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}
