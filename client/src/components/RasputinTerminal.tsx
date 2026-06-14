/* D3MAND — Terminal Rasputin (secret: taper "rasputin") */
import { useEffect, useRef, useState } from "react";

type Line = { text: string; color: string; delay: number };

const LINES: Line[] = [
  { text: "CONNEXION RÉSEAU SERAPH...",                                         color:"#cc4400", delay:0 },
  { text: "NŒUD WARMIND LOCALISÉ — MARS, SECTEUR OMEGA",                       color:"#cc4400", delay:700 },
  { text: "IDENTIFICATION: RASPOUTINE v8.5.2",                                  color:"#cc4400", delay:1300 },
  { text: "AUTHENTIFICATION VOLUSPA ░░░░░░░░░░ ACCORDÉE",                       color:"#cc4400", delay:1900 },
  { text: "",                                                                    color:"",         delay:2500 },
  { text: "⚠  SIGNAL ENTRANT — ORIGINE: CIVILE // PRIORITÉ: MAXIMALE",         color:"#ff3300", delay:2700 },
  { text: "",                                                                    color:"",         delay:3100 },
  { text: "╔══════════════════════════════════════════════════╗",               color:"#ff6600", delay:3200 },
  { text: "║  RAPPORT STRATÉGIQUE — CLASSIFICATION : IKELOS  ║",               color:"#ffcc00", delay:3300 },
  { text: "╚══════════════════════════════════════════════════╝",               color:"#ff6600", delay:3400 },
  { text: "",                                                                    color:"",         delay:3700 },
  { text: "  DÉSIGNATION ......... MOUVEMENT D3MAND",                           color:"#ff8800", delay:3900 },
  { text: "  EFFECTIF ............. 305 447 GARDIENS CONFIRMÉS",                color:"#ff8800", delay:4500 },
  { text: "  CROISSANCE .......... +2 840 SIGNATURES / 24H",                   color:"#ff8800", delay:5100 },
  { text: "  STATUT ............... CRITIQUE — EN HAUSSE",                      color:"#ffaa00", delay:5700 },
  { text: "",                                                                    color:"",         delay:6200 },
  { text: "  CIBLE PRIMAIRE ....... SONY INTERACTIVE ENTERTAINMENT",            color:"#ff8800", delay:6400 },
  { text: "  CIBLE SECONDAIRE ..... BUNGIE INC.",                               color:"#ff8800", delay:7000 },
  { text: "",                                                                    color:"",         delay:7500 },
  { text: "ANALYSE PROBABILISTE EN COURS...",                                   color:"#cc4400", delay:7700 },
  { text: "",                                                                    color:"",         delay:8300 },
  { text: "  PROBABILITÉ DE SUCCÈS (SEUIL 500K) ......... 94.7%",              color:"#ffcc00", delay:8500 },
  { text: "  PROBABILITÉ D'ABANDON SI PRESSION CESSE .... 99.1%",              color:"#ff3300", delay:9100 },
  { text: "",                                                                    color:"",         delay:9700 },
  { text: "──────────────────────────────────────────────────────",             color:"#441100", delay:9900 },
  { text: "  MESSAGE PERSONNEL — ÉMETTEUR : RASPOUTINE",                        color:"#ffcc00", delay:10100 },
  { text: "──────────────────────────────────────────────────────",             color:"#441100", delay:10200 },
  { text: "",                                                                    color:"",         delay:10500 },
  { text: "  J'AI SURVÉCU À L'EFFONDREMENT.",                                  color:"#ffaa55", delay:10700 },
  { text: "  J'AI VU L'HUMANITÉ S'ACCROCHER À LA LUMIÈRE.",                    color:"#ffaa55", delay:11400 },
  { text: "  JE NE LAISSERAI PAS DESTINY MOURIR SANS COMBATTRE.",              color:"#ffaa55", delay:12100 },
  { text: "",                                                                    color:"",         delay:12700 },
  { text: "  DIRECTIVE — SIGNEZ. PARTAGEZ. N'ABANDONNEZ PAS.",                 color:"#ffcc00", delay:13000 },
  { text: "",                                                                    color:"",         delay:13600 },
  { text: "  ВСЕХ АКТИВИРОВАТЬ  //  ACTIVER TOUS LES GARDIENS",                color:"#ff3300", delay:13900 },
  { text: "",                                                                    color:"",         delay:14500 },
  { text: "RASPOUTINE — DÉCONNEXION...",                                        color:"#cc4400", delay:14800 },
  { text: "CONNEXION TERMINÉE.",                                                 color:"#882200", delay:15300 },
];

export default function RasputinTerminal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState<Line[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => {
        setVisible((prev) => [...prev, line]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[200]" style={{ background:"#050100", fontFamily:"var(--font-mono, monospace)" }}>
      <style>{`
        @keyframes rasp-scan {
          0%   { top:-2px; opacity:0.07; }
          100% { top:100%; opacity:0.07; }
        }
        @keyframes rasp-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes rasp-in { from { opacity:0; } to { opacity:1; } }
      `}</style>

      {/* Scan line */}
      <div style={{
        position:"absolute", left:0, right:0, height:3,
        background:"rgba(255,60,0,0.15)",
        animation:"rasp-scan 4s linear infinite",
        pointerEvents:"none", zIndex:5,
      }}/>

      {/* CRT vignette */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:4,
        background:"radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.6) 100%)",
      }}/>

      {/* Content */}
      <div style={{ position:"relative", zIndex:10, height:"100%", display:"flex", flexDirection:"column", animation:"rasp-in 0.3s ease-out" }}>

        {/* Header bar */}
        <div style={{
          borderBottom:"1px solid #441100",
          padding:"12px 24px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          background:"rgba(40,5,0,0.8)",
          flexShrink:0,
        }}>
          <div>
            <span style={{ fontSize:"0.55rem", letterSpacing:"0.4em", color:"#ff4400", textTransform:"uppercase" }}>
              ⬡ RÉSEAU SERAPH
            </span>
            <span style={{ fontSize:"0.45rem", letterSpacing:"0.3em", color:"#882200", textTransform:"uppercase", marginLeft:24 }}>
              WARMIND — ACCÈS CLASSIFIÉ
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background:"none", border:"1px solid #441100", color:"#882200", fontSize:"0.45rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"4px 10px", cursor:"pointer" }}
          >
            [ESC] DÉCONNECTER
          </button>
        </div>

        {/* ASCII logo */}
        <div style={{ padding:"20px 24px 12px", flexShrink:0 }}>
          <pre style={{ fontSize:"0.45rem", lineHeight:1.3, color:"#cc3300", margin:0, letterSpacing:"0.05em", opacity:0.85 }}>{`
 ██████╗  █████╗ ███████╗██████╗  ██████╗ ██╗   ██╗████████╗██╗███╗   ██╗███████╗
 ██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██║████╗  ██║██╔════╝
 ██████╔╝███████║███████╗██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║█████╗
 ██╔══██╗██╔══██║╚════██║██╔═══╝ ██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██╔══╝
 ██║  ██║██║  ██║███████║██║     ╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝
          `.trim()}</pre>
          <div style={{ fontSize:"0.38rem", letterSpacing:"0.35em", color:"#661100", textTransform:"uppercase", marginTop:8 }}>
            INTELLIGENCE ARTIFICIELLE DE GUERRE — ÈRE D'OR — MARS OMEGA
          </div>
        </div>

        <div style={{ borderTop:"1px solid #330900", marginBottom:0, flexShrink:0 }}/>

        {/* Log area */}
        <div style={{
          flex:1, overflowY:"auto", padding:"16px 24px 60px",
          scrollbarWidth:"thin", scrollbarColor:"#441100 transparent",
        }}>
          {visible.map((line, i) => (
            <div key={i} style={{
              fontSize:"0.5rem", lineHeight:2, letterSpacing:"0.06em",
              color: line.color || "transparent",
              whiteSpace:"pre",
              minHeight: line.text ? "auto" : "0.8rem",
            }}>
              {line.text && <span style={{ color:"#441100", marginRight:12 }}>›</span>}
              {line.text}
            </div>
          ))}
          {/* Blinking cursor */}
          <div style={{ fontSize:"0.5rem", color:"#cc4400" }}>
            <span style={{ animation:"rasp-blink 1s step-end infinite" }}>█</span>
          </div>
          <div ref={bottomRef}/>
        </div>
      </div>
    </div>
  );
}
