import { useEffect, useRef } from "react";

export function useSecretWord(word: string, onActivate: () => void) {
  const buf = useRef("");
  const cb = useRef(onActivate);
  cb.current = onActivate;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        t.isContentEditable
      ) return;
      if (e.key.length === 1) {
        buf.current = (buf.current + e.key.toLowerCase()).slice(-word.length);
        if (buf.current === word.toLowerCase()) {
          buf.current = "";
          cb.current();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [word]);
}
