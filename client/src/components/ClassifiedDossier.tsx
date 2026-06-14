/* D3MAND — Dossier classifié (secret: taper "guardian") */
import { useEffect, useState } from "react";

const SECTIONS = [
  {
    id: "intro",
    tag: "DOSSIER № D3-2026",
    title: "Pourquoi Destiny 3\ndoit exister",
    content: [
      "Ce document a été compilé par la communauté Destiny — 305 000 Gardiens et comptons. Il s'adresse à Sony Interactive Entertainment et Bungie Inc.",
      "Destiny n'est pas un jeu. C'est un monde. Une philosophie. Une façon d'être ensemble dans l'obscurité. La fermeture de ce monde serait une perte irréparable pour des millions de personnes.",
      "Ce dossier expose les faits. Les chiffres. Les arguments. Et une demande claire.",
    ],
  },
  {
    id: "numbers",
    tag: "LES CHIFFRES",
    title: "Le dossier\nen données",
    items: [
      { label: "Signatures sur la pétition principale", value: "305 000+" },
      { label: "Millions de joueurs actifs à son pic", value: "12M+" },
      { label: "Années de contenu Destiny (D1 + D2)", value: "12 ans" },
      { label: "Revenus générés par D2 à ce jour", value: "+3,6 Mds $" },
      { label: "Pays représentés dans la pétition", value: "140+" },
      { label: "Mois depuis l'arrêt de Destiny 2", value: "Trop" },
    ],
  },
  {
    id: "arguments",
    tag: "ARGUMENTS CLÉS",
    title: "Les raisons\nqu'ils ne peuvent pas ignorer",
    points: [
      {
        num: "01",
        title: "Une IP qui vaut des milliards",
        body: "Destiny est l'une des marques les plus reconnues du jeu vidéo. La laisser mourir est un gaspillage stratégique inexplicable.",
      },
      {
        num: "02",
        title: "Une communauté qui attend",
        body: "305 000 signatures en quelques semaines prouvent qu'une base massive de joueurs est prête à revenir — et à payer.",
      },
      {
        num: "03",
        title: "Bungie a les outils",
        body: "Le moteur, le savoir-faire, les équipes, le lore. Tout est là. Il manque juste une décision.",
      },
      {
        num: "04",
        title: "Aucun concurrent ne remplace Destiny",
        body: "Le jeu de tir coopératif à monde partagé avec cette profondeur narrative n'existe nulle part ailleurs.",
      },
    ],
  },
  {
    id: "ask",
    tag: "NOTRE DEMANDE",
    title: "Ce que nous\nvoulons",
    content: [
      "Nous ne demandons pas la lune. Nous demandons ce que Bungie sait faire mieux que quiconque.",
      "→  Une annonce officielle de développement de Destiny 3.",
      "→  Une communication transparente sur la feuille de route.",
      "→  Un jeu qui honore les 12 ans de lore et de communauté construits ensemble.",
      "La pétition principale est disponible sur Change.org. Chaque signature compte. Chaque partage compte.",
    ],
  },
];

export default function ClassifiedDossier({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setRevealed(true), 100);
    return () => { document.body.style.overflow = ""; clearTimeout(t); };
  }, []);

  const sec = SECTIONS[section];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background:"rgba(0,0,0,0.96)", backdropFilter:"blur(4px)" }}>
      <style>{`
        @keyframes dos-in { from { opacity:0; transform:scale(.96) translateY(16px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes dos-stamp { from { opacity:0; transform:rotate(-12deg) scale(1.3); } to { opacity:0.12; transform:rotate(-12deg) scale(1); } }
      `}</style>

      {/* Backdrop click closes */}
      <div className="absolute inset-0" onClick={onClose}/>

      {/* Dossier card */}
      <div
        style={{
          position:"relative", zIndex:10,
          width:"min(680px, 92vw)", maxHeight:"85vh",
          border:"1px solid rgba(232,216,138,0.2)",
          background:"#08060e",
          display:"flex", flexDirection:"column",
          animation:"dos-in 0.4s ease-out both",
          overflow:"hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLASSIFIÉ watermark */}
        <div style={{
          position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
          pointerEvents:"none", zIndex:0,
        }}>
          <div style={{
            fontSize:"7rem", fontWeight:900, letterSpacing:"0.1em", color:"#cc0000",
            textTransform:"uppercase", fontFamily:"var(--font-display)",
            animation:"dos-stamp 0.8s ease-out 0.3s both",
            transform:"rotate(-12deg)",
            userSelect:"none",
          }}>
            CLASSIFIÉ
          </div>
        </div>

        {/* Header */}
        <div style={{
          borderBottom:"1px solid rgba(232,216,138,0.15)", padding:"16px 28px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexShrink:0, position:"relative", zIndex:1,
        }}>
          <div>
            <div style={{ fontSize:"0.38rem", letterSpacing:"0.5em", color:"rgba(232,216,138,0.4)", textTransform:"uppercase", fontFamily:"var(--font-mono)" }}>
              Document interne — Communauté D3MAND
            </div>
            <div style={{ fontSize:"0.65rem", fontWeight:900, letterSpacing:"0.2em", color:"var(--gold, #e8d88a)", textTransform:"uppercase", fontFamily:"var(--font-display)", marginTop:3 }}>
              DOSSIER D3
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background:"none", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.3)", fontSize:"0.42rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"5px 12px", cursor:"pointer", fontFamily:"var(--font-mono)" }}
          >
            [ESC]
          </button>
        </div>

        {/* Tab nav */}
        <div style={{ display:"flex", borderBottom:"1px solid rgba(232,216,138,0.1)", flexShrink:0, position:"relative", zIndex:1 }}>
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSection(i)}
              style={{
                flex:1, padding:"10px 4px", background:"none", border:"none", cursor:"pointer",
                fontFamily:"var(--font-mono)", fontSize:"0.38rem", letterSpacing:"0.2em",
                textTransform:"uppercase", transition:"all 0.2s",
                color: section === i ? "var(--gold, #e8d88a)" : "rgba(255,255,255,0.3)",
                borderBottom: section === i ? "2px solid var(--gold, #e8d88a)" : "2px solid transparent",
              }}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:"28px 32px", position:"relative", zIndex:1 }}>

          <div style={{ fontSize:"0.38rem", letterSpacing:"0.45em", color:"rgba(232,216,138,0.4)", textTransform:"uppercase", fontFamily:"var(--font-mono)", marginBottom:12 }}>
            {sec.tag}
          </div>

          <h2 style={{
            fontSize:"1.6rem", fontWeight:900, lineHeight:1.15, letterSpacing:"0.05em",
            color:"var(--gold, #e8d88a)", textTransform:"uppercase", fontFamily:"var(--font-display)",
            marginBottom:24, whiteSpace:"pre-line",
          }}>
            {sec.title}
          </h2>

          {/* INTRO / ASK: paragraphs */}
          {"content" in sec && sec.content && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {sec.content.map((p, i) => (
                <p key={i} style={{ fontSize:"0.52rem", lineHeight:1.8, color:"rgba(255,255,255,0.65)", fontFamily:"var(--font-mono)", margin:0 }}>
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* NUMBERS: grid */}
          {"items" in sec && sec.items && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
              {sec.items.map((item, i) => (
                <div key={i} style={{ border:"1px solid rgba(232,216,138,0.1)", padding:"14px 16px", background:"rgba(232,216,138,0.03)" }}>
                  <div style={{ fontSize:"1.4rem", fontWeight:900, color:"var(--flame, #e85520)", fontFamily:"var(--font-display)", letterSpacing:"0.05em", lineHeight:1 }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize:"0.42rem", color:"rgba(255,255,255,0.45)", fontFamily:"var(--font-mono)", marginTop:6, letterSpacing:"0.1em", lineHeight:1.5 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ARGUMENTS: cards */}
          {"points" in sec && sec.points && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {sec.points.map((pt, i) => (
                <div key={i} style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ fontSize:"1.2rem", fontWeight:900, color:"rgba(232,216,138,0.2)", fontFamily:"var(--font-display)", flexShrink:0, lineHeight:1 }}>
                    {pt.num}
                  </div>
                  <div>
                    <div style={{ fontSize:"0.58rem", fontWeight:900, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold, #e8d88a)", fontFamily:"var(--font-display)", marginBottom:5 }}>
                      {pt.title}
                    </div>
                    <p style={{ fontSize:"0.5rem", lineHeight:1.7, color:"rgba(255,255,255,0.6)", fontFamily:"var(--font-mono)", margin:0 }}>
                      {pt.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer nav */}
        <div style={{
          borderTop:"1px solid rgba(232,216,138,0.1)", padding:"12px 28px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexShrink:0, position:"relative", zIndex:1,
        }}>
          <button
            onClick={() => setSection((s) => Math.max(0, s - 1))}
            disabled={section === 0}
            style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.3)", fontSize:"0.45rem", letterSpacing:"0.2em", fontFamily:"var(--font-mono)", opacity: section === 0 ? 0.3 : 1 }}
          >
            ← précédent
          </button>
          <div style={{ display:"flex", gap:6 }}>
            {SECTIONS.map((_, i) => (
              <div key={i} style={{ width:6, height:6, borderRadius:"50%", background: section === i ? "var(--gold, #e8d88a)" : "rgba(255,255,255,0.15)", transition:"background 0.2s", cursor:"pointer" }} onClick={() => setSection(i)}/>
            ))}
          </div>
          {section < SECTIONS.length - 1 ? (
            <button
              onClick={() => setSection((s) => Math.min(SECTIONS.length - 1, s + 1))}
              style={{ background:"none", border:"none", cursor:"pointer", color:"var(--gold, #e8d88a)", fontSize:"0.45rem", letterSpacing:"0.2em", fontFamily:"var(--font-mono)" }}
            >
              suivant →
            </button>
          ) : (
            <a
              href="https://c.org/GxQHNMQCH6"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color:"var(--flame, #e85520)", fontSize:"0.45rem", letterSpacing:"0.2em", fontFamily:"var(--font-mono)", textDecoration:"none" }}
            >
              → signer la pétition
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
