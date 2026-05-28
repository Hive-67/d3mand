import { useEffect, useRef, useState } from "react";

type Props = {
  target: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
};

/**
 * AnimatedCounter — ease-out cubic count-up.
 * Triggers once when scrolled into view (mission control aesthetic).
 */
export default function AnimatedCounter({
  target,
  duration = 1800,
  className,
  format,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const from = 0;
      const tick = (now: number) => {
        const t = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const v = Math.floor(from + (target - from) * ease);
        setValue(v);
        if (t < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  // Restart when target changes (live updates from sheet)
  useEffect(() => {
    if (startedRef.current && value !== target) {
      const t0 = performance.now();
      const from = value;
      const tick = (now: number) => {
        const t = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const v = Math.floor(from + (target - from) * ease);
        setValue(v);
        if (t < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const text = format ? format(value) : value.toLocaleString("fr-FR");

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
