import { createContext, useContext, useState, type ReactNode } from "react";
import t, { type Lang, type Translations } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  T: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  T: t.fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("d3mand_lang") as Lang) || "fr";
    } catch {
      return "fr";
    }
  });

  const handleSetLang = (l: Lang) => {
    setLang(l);
    try { localStorage.setItem("d3mand_lang", l); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, T: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
