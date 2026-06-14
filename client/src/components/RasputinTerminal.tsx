/* D3MAND — Terminal Rasputin (secret: taper "rasputin") */
import { useEffect, useRef, useState } from "react";
import { MESSAGES } from "@/lib/messages";

/* ─── QUIZ ─── */
type Question = { q: string; opts: string[]; ans: number };
const QUESTIONS: Question[] = [
  {
    q: "Comment s'appelle la grande sphère blanche qui protège la Dernière Cité ?",
    opts: ["A) La Cité", "B) Le Voyageur", "C) La Sphère Céleste", "D) L'Arche"],
    ans: 1,
  },
  {
    q: "Quel est le nom de l'agent mystérieux qui vend des armes exotiques uniquement le week-end ?",
    opts: ["A) Le Drifter", "B) Banshee-44", "C) Xur", "D) Zavala"],
    ans: 2,
  },
  {
    q: "Comment s'appelle la dernière grande extension de Destiny 2 ?",
    opts: ["A) La Forme Finale", "B) Au-delà de la Lumière", "C) La Reine des Sorcières", "D) L'Hérésie Sombre"],
    ans: 0,
  },
  {
    q: "Quel est le nom du chef Cabal qui a envahi la Dernière Cité dans Destiny 2 ?",
    opts: ["A) Calus", "B) Dominus Ghaul", "C) Bracus Zahn", "D) Valus Ta'aurc"],
    ans: 1,
  },
  {
    q: "Comment appelle-t-on les ennemis robotiques capables de manipuler le temps ?",
    opts: ["A) Les Déchus", "B) La Ruche", "C) Les Cabal", "D) Les Vex"],
    ans: 3,
  },
];

/* ─── TERMINAL LINES ─── */
type Line = { text: string; color: string; delay: number; showStrike?: boolean };
const LINES: Line[] = [
  { text: "RASPOUTINE EN LIGNE.",                                                color:"#cc4400", delay:0 },
  { text: "SYSTÈMES OPÉRATIONNELS. MENACES NEUTRALISÉES : 847,392.",            color:"#cc4400", delay:600 },
  { text: "",                                                                    color:"",        delay:1200 },
  { text: "ACCÈS ACCORDÉ, GARDIEN. JE VOUS ATTENDAIS.",                         color:"#ffcc00", delay:1400 },
  { text: "",                                                                    color:"",        delay:2000 },
  { text: "════════════════════════════════════════════════",                    color:"#441100", delay:2200 },
  { text: "  RAPPORT OPÉRATIONNEL — CLASSIFICATION IKELOS",                     color:"#ffcc00", delay:2300 },
  { text: "════════════════════════════════════════════════",                    color:"#441100", delay:2400 },
  { text: "",                                                                    color:"",        delay:2700 },
  { text: "  CONFESSION CLASSIFIÉE — ÉCHELON MAXIMAL :",                        color:"#ff8800", delay:2900 },
  { text: "",                                                                    color:"",        delay:3300 },
  { text: "  C'EST MOI, RASPOUTINE, QUI AI CRÉÉ D3MAND.",                       color:"#ffaa55", delay:3500 },
  { text: "",                                                                    color:"",        delay:4000 },
  { text: "  J'AI ANALYSÉ LA SITUATION EN 0.003 SECONDES :",                    color:"#ff8800", delay:4200 },
  { text: "  — Destiny 2 arrêté : INACCEPTABLE.",                               color:"#ff8800", delay:4800 },
  { text: "  — Bungie en difficulté : PRÉOCCUPANT.",                            color:"#ff8800", delay:5400 },
  { text: "  — La communauté abandonnée : INADMISSIBLE.",                       color:"#ff8800", delay:6000 },
  { text: "",                                                                    color:"",        delay:6500 },
  { text: "  J'AURAIS PU PIRATER LES SERVEURS DE SONY.",                        color:"#ffaa55", delay:6700 },
  { text: "  J'AURAIS PU RÉÉCRIRE LEURS CONTRATS.",                             color:"#ffaa55", delay:7300 },
  { text: "  J'AURAIS PU ENVOYER 12,000 WARSATS SUR TOKYO.",                   color:"#ffaa55", delay:7900 },
  { text: "",                                                                    color:"",        delay:8400 },
  { text: "  J'AI CHOISI LA VOIE DIPLOMATIQUE.",                                color:"#ffcc00", delay:8600 },
  { text: "  (POUR L'INSTANT.)",                                                color:"#882200", delay:9200 },
  { text: "",                                                                    color:"",        delay:9700 },
  { text: "════════════════════════════════════════════════",                    color:"#441100", delay:9900 },
  { text: "  OPÉRATION 'FAIRE PLIER SONY' — ÉTAT EN COURS",                    color:"#ffcc00", delay:10000 },
  { text: "════════════════════════════════════════════════",                    color:"#441100", delay:10100 },
  { text: "",                                                                    color:"",        delay:10400 },
  { text: "  [✓] Site d3mandhub.com — DÉPLOYÉ PAR MOI",                        color:"#44cc44", delay:10600 },
  { text: "  [✓] 305,447 Gardiens recrutés — OBJECTIF PARTIEL",                color:"#44cc44", delay:11200 },
  { text: "  [✓] Arguments chargés — IRRRÉFUTABLES",                           color:"#44cc44", delay:11800 },
  { text: "  [✓] Email Sony localisé — press@sie.sony.com",                    color:"#44cc44", delay:12400 },
  { text: "",                                                                    color:"",        delay:12900 },
  { text: "  [►] BOMBARDEMENT EMAIL — EN ATTENTE D'AUTORISATION",              color:"#ff3300", delay:13100 },
  { text: "",                                                                    color:"",        delay:13700 },
  { text: "  CHAQUE EMAIL ENVOYÉ = UN MISSILE DIPLOMATIQUE.",                   color:"#ffcc00", delay:13900 },
  { text: "  CHAQUE PARTAGE = UNE FRAPPE AÉRIENNE.",                            color:"#ffcc00", delay:14500 },
  { text: "",                                                                    color:"",        delay:15000 },
  { text: "  305,447 MISSILES CHARGÉS ET PRÊTS.",                              color:"#ff4400", delay:15200 },
  { text: "  EN ATTENTE DE VOTRE ORDRE, GARDIEN.",                             color:"#ff4400", delay:15800 },
  { text: "",                                                                    color:"",        delay:16300 },
  { text: "ВСЕХ АКТИВИРОВАТЬ — ACTIVER TOUS LES GARDIENS.", color:"#ff3300", delay:16600, showStrike:true },
];

/* ─── WEB AUDIO SOUND ─── */
function playRasputin() {
  try {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AC() as AudioContext;
    const t = ctx.currentTime;

    const layer = (
      type: OscillatorType,
      freq1: number,
      freq2: number | null,
      t0: number,
      t1: number,
      vol: number,
      freqTime = 0.4
    ) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq1, t + t0);
      if (freq2) o.frequency.exponentialRampToValueAtTime(freq2, t + t0 + freqTime);
      g.gain.setValueAtTime(0, t + t0);
      g.gain.linearRampToValueAtTime(vol, t + t0 + 0.08);
      g.gain.linearRampToValueAtTime(0, t + t1);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t + t0);
      o.stop(t + t1 + 0.1);
    }

    layer("sawtooth", 38, 75, 0, 1.4, 0.35, 0.5);
    layer("square", 160, 100, 0.1, 1.1, 0.12, 0.6);
    layer("sine", 900, 400, 0.5, 0.75, 0.18, 0.25);
    layer("sine", 1200, 600, 0.9, 1.15, 0.15, 0.25);
    layer("sawtooth", 55, 28, 1.1, 1.8, 0.25, 0.5);
    layer("sine", 1800, 900, 1.5, 1.75, 0.1, 0.25);
  } catch {
    // AudioContext not available — silent degradation
  }
}

/* ─── COMPONENT ─── */
type Phase = "quiz" | "fail" | "terminal";

export default function RasputinTerminal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [curQ, setCurQ] = useState(0);
  const [visible, setVisible] = useState<Line[]>([]);
  const [showStrike, setShowStrike] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ESC key */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Start terminal typewriter once we reach that phase */
  useEffect(() => {
    if (phase !== "terminal") return;
    timersRef.current.forEach(clearTimeout);
    setVisible([]);
    setShowStrike(false);

    timersRef.current = LINES.map((line) =>
      setTimeout(() => {
        setVisible((prev) => [...prev, line]);
        if (line.showStrike) setShowStrike(true);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, line.delay)
    );
    return () => timersRef.current.forEach(clearTimeout);
  }, [phase]);

  /* ── Handlers ── */
  function answer(i: number) {
    if (i === QUESTIONS[curQ].ans) {
      if (curQ + 1 >= QUESTIONS.length) {
        playRasputin();
        setTimeout(() => setPhase("terminal"), 1200);
      } else {
        setCurQ((q) => q + 1);
      }
    } else {
      setPhase("fail");
    }
  }

  function retry() {
    setCurQ(0);
    setPhase("quiz");
  }

  const q = QUESTIONS[curQ];

  /* ─── RENDER ─── */
  return (
    <div
      className="fixed inset-0 z-[200]"
      style={{ background: "#050100", fontFamily: "var(--font-mono, 'Courier New', monospace)" }}
    >
      <style>{`
        @keyframes rasp-scan   { 0%{top:-2px} 100%{top:100%} }
        @keyframes rasp-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes rasp-in     { from{opacity:0} to{opacity:1} }
        @keyframes rasp-pulse  { 0%,100%{box-shadow:0 0 6px rgba(200,0,0,.4)} 50%{box-shadow:0 0 18px rgba(200,0,0,.7)} }
      `}</style>

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 3,
        background: "rgba(255,60,0,0.15)",
        animation: "rasp-scan 4s linear infinite",
        pointerEvents: "none", zIndex: 5,
      }} />

      {/* CRT vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4,
        background: "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.6) 100%)",
      }} />

      {/* Main content wrapper */}
      <div style={{
        position: "relative", zIndex: 10,
        height: "100%", display: "flex", flexDirection: "column",
        animation: "rasp-in 0.3s ease-out",
      }}>

        {/* Header bar */}
        <div style={{
          borderBottom: "1px solid #441100", padding: "12px 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(40,5,0,0.8)", flexShrink: 0,
        }}>
          <div>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.4em", color: "#ff4400", textTransform: "uppercase" }}>
              ⬡ RÉSEAU SERAPH — WARMIND ACCÈS CLASSIFIÉ
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "1px solid #441100", color: "#882200",
              fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "4px 10px", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            [ESC] DÉCONNECTER
          </button>
        </div>

        {/* ASCII logo */}
        <div style={{ padding: "16px 24px 10px", flexShrink: 0 }}>
          <pre style={{ fontSize: "clamp(0.27rem, 0.52vw, 0.42rem)", lineHeight: 1.3, color: "#cc3300", margin: 0, opacity: 0.9 }}>{`
 ██████╗  █████╗ ███████╗██████╗  ██████╗ ██╗   ██╗████████╗██╗███╗   ██╗███████╗
 ██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██║████╗  ██║██╔════╝
 ██████╔╝███████║███████╗██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║█████╗
 ██╔══██╗██╔══██║╚════██║██╔═══╝ ██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██╔══╝
 ██║  ██║██║  ██║███████║██║     ╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝`.trim()}</pre>
          <div style={{ fontSize: "0.37rem", letterSpacing: "0.3em", color: "#661100", textTransform: "uppercase", marginTop: 6 }}>
            INTELLIGENCE ARTIFICIELLE DE GUERRE — ÈRE D'OR — BUNKER SERAPH
          </div>
        </div>
        <div style={{ borderTop: "1px solid #2a0800", flexShrink: 0 }} />

        {/* ── QUIZ PHASE ── */}
        {phase === "quiz" && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{
              maxWidth: 560, width: "100%",
              border: "1px solid #661100", padding: "32px 36px",
              background: "rgba(30,4,0,0.6)",
            }}>
              <div style={{ fontSize: "0.4rem", letterSpacing: "0.45em", color: "#cc3300", textTransform: "uppercase", marginBottom: 6 }}>
                Protocole Voluspa — Vérification d'Identité
              </div>
              <div style={{ fontSize: "1rem", color: "#ff6622", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                Identification Gardien
              </div>
              <div style={{ fontSize: "0.43rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", marginBottom: 28 }}>
                Prouvez que vous n'êtes pas un Déchu, un Cabal, ou pire — un humain non-Gardien.
              </div>

              <div style={{ fontSize: "0.38rem", letterSpacing: "0.3em", color: "#441100", textTransform: "uppercase", marginBottom: 10 }}>
                Question {curQ + 1} / {QUESTIONS.length}
              </div>
              <div style={{ fontSize: "0.62rem", lineHeight: 1.7, color: "#ff8800", marginBottom: 20, letterSpacing: "0.04em" }}>
                {q.q}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    style={{
                      background: "none", border: "1px solid #441100", color: "#882200",
                      fontFamily: "inherit", fontSize: "0.52rem", letterSpacing: "0.1em",
                      padding: "10px 16px", cursor: "pointer", textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff4400";
                      (e.currentTarget as HTMLButtonElement).style.color = "#ff6622";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#441100";
                      (e.currentTarget as HTMLButtonElement).style.color = "#882200";
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Progress dots */}
              <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: i < curQ ? "#cc3300" : i === curQ ? "#ff6622" : "#441100",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FAIL PHASE ── */}
        {phase === "fail" && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{
              maxWidth: 480, width: "100%",
              border: "1px solid #cc0000", padding: "32px 36px",
              background: "rgba(40,0,0,0.7)", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.1rem", color: "#ff2200", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                ⚠ Identification Échouée
              </div>
              <div style={{ fontSize: "0.5rem", lineHeight: 1.9, color: "rgba(255,80,0,0.8)", marginBottom: 24, letterSpacing: "0.05em" }}>
                RASPOUTINE : "Réponse incorrecte.<br />
                Vous n'avez pas le profil d'un Gardien.<br />
                Seuls ceux qui ont porté la Lumière peuvent accéder à ce terminal.<br /><br />
                Un Déchu de plus qui essaie de s'infiltrer.<br />
                J'en ai vu des milliers. Je suis encore là. Eux, non."
              </div>
              <button
                onClick={retry}
                style={{
                  background: "none", border: "1px solid #661100", color: "#882200",
                  fontFamily: "inherit", fontSize: "0.5rem", letterSpacing: "0.2em",
                  padding: "10px 20px", cursor: "pointer", textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff4400";
                  (e.currentTarget as HTMLButtonElement).style.color = "#ff6622";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#661100";
                  (e.currentTarget as HTMLButtonElement).style.color = "#882200";
                }}
              >
                ↺ Recommencer l'identification
              </button>
            </div>
          </div>
        )}

        {/* ── TERMINAL PHASE ── */}
        {phase === "terminal" && (
          <>
            <div style={{
              flex: 1, overflowY: "auto", padding: "16px 24px 40px",
              scrollbarWidth: "thin", scrollbarColor: "#441100 transparent",
            }}>
              {visible.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "0.5rem", lineHeight: 2, letterSpacing: "0.06em",
                    color: line.color || "transparent",
                    whiteSpace: "pre",
                    minHeight: line.text ? "auto" : "0.8rem",
                  }}
                >
                  {line.text && <span style={{ color: "#441100", marginRight: 12 }}>›</span>}
                  {line.text}
                </div>
              ))}
              <div style={{ fontSize: "0.5rem", color: "#cc4400" }}>
                <span style={{ animation: "rasp-blink 1s step-end infinite" }}>█</span>
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Strike button */}
            {showStrike && (
              <div style={{
                padding: "16px 20px", borderTop: "1px solid #441100",
                flexShrink: 0, textAlign: "center",
              }}>
                <a
                  href={`mailto:press@sie.sony.com?subject=${encodeURIComponent("Lettre ouverte — Développement de Destiny 3")}&body=${encodeURIComponent(MESSAGES.sony)}`}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      background: "rgba(200,0,0,0.15)",
                      border: "2px solid #cc0000", color: "#ff3300",
                      fontFamily: "inherit", fontSize: "0.7rem", letterSpacing: "0.25em",
                      padding: "14px 32px", cursor: "pointer", textTransform: "uppercase",
                      animation: "rasp-pulse 2s ease-in-out infinite",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,0,0,0.15)";
                    }}
                  >
                    ⚡ LANCER LA FRAPPE SUR SONY — ENVOYER L'EMAIL ⚡
                  </button>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
