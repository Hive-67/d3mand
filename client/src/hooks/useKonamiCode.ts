import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export function useKonamiCode(onActivate: () => void) {
  const progress = useRef(0);
  const callback = useRef(onActivate);
  callback.current = onActivate;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === SEQUENCE[progress.current]) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          callback.current();
        }
      } else {
        progress.current = e.key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
