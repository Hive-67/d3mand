/* D3MAND — Ghost companion flottant (bottom-right) */
import { useEffect, useRef, useState } from "react";

const QUOTES = [
  "Gardien… 305 000 personnes demandent déjà Destiny 3. La Lumière travaille vite.",
  "J'ai scanné tous les jeux de tir disponibles. Rien ne fait ce que Destiny faisait. Rien.",
  "Chaque signature est un Gardien qui dit : on est encore là.",
  "Le Voyageur se tait. Mais nous, on peut parler. Signe la pétition.",
  "Tu te souviens d'Europa sous la neige ? De la Cité des Rêves ? Et si D3 allait encore plus loin…",
  "Je suis petit, mais je peux analyser 10 milliards de paramètres. Tous disent : Destiny 3 doit exister.",
  "Partage. C'est la seule arme qu'on a contre l'indifférence.",
  "Sony écoute les chiffres. Donnons-leur des chiffres qu'ils ne peuvent pas ignorer.",
];

export default function GhostCompanion() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = () => {
    if (open) { setOpen(false); return; }
    setQuoteIdx((i) => (i + 1) % QUOTES.length);
    setOpen(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 7000);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <style>{`
        @keyframes ghost-bob  { 0%,100% { transform:translateY(0);   } 50% { transform:translateY(-9px); } }
        @keyframes ghost-spin { from { transform:rotate(0deg);   } to { transform:rotate(360deg); } }
        @keyframes ghost-in   { from { opacity:0; transform:scale(.8) translateY(6px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>

      <div style={{ position:"fixed", bottom:28, right:28, zIndex:150, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>

        {/* Speech bubble */}
        {open && (
          <div
            key={quoteIdx}
            style={{
              maxWidth: 260,
              border: "1px solid rgba(232,216,138,0.3)",
              background: "rgba(2,4,10,0.94)",
              backdropFilter: "blur(10px)",
              padding: "12px 16px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)",
              animation: "ghost-in 0.25s ease-out both",
              position: "relative",
            }}
          >
            <span style={{ color:"var(--gold, #e8d88a)", fontWeight:700 }}>Ghost // </span>
            {QUOTES[quoteIdx]}
            {/* Triangle pointer */}
            <div style={{
              position:"absolute", bottom:-7, right:22,
              width:0, height:0,
              borderLeft:"6px solid transparent",
              borderRight:"6px solid transparent",
              borderTop:"7px solid rgba(232,216,138,0.3)",
            }}/>
          </div>
        )}

        {/* Ghost button */}
        <button
          onClick={handleClick}
          title="Ghost"
          style={{
            background:"none", border:"none", cursor:"pointer", padding:4,
            animation:"ghost-bob 4s ease-in-out infinite",
            filter: open ? "drop-shadow(0 0 10px rgba(232,216,138,0.7))" : "drop-shadow(0 0 5px rgba(180,160,80,0.4))",
            transition:"filter 0.3s",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 40 40">
            <defs>
              <radialGradient id="eye-grad" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="35%" stopColor="#7ae8ff"/>
                <stop offset="100%" stopColor="#2090c0"/>
              </radialGradient>
              <filter id="eye-glow">
                <feGaussianBlur stdDeviation="1.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Rotating shell panels */}
            <g style={{
              transformOrigin:"20px 20px",
              animation:"ghost-spin 10s linear infinite",
            }}>
              {/* top */}
              <polygon points="20,2 27,13 13,13" fill="#d4a840" opacity="0.88"/>
              {/* right */}
              <polygon points="38,20 27,13 27,27" fill="#b89030" opacity="0.78"/>
              {/* bottom */}
              <polygon points="20,38 13,27 27,27" fill="#d4a840" opacity="0.88"/>
              {/* left */}
              <polygon points="2,20 13,27 13,13"  fill="#b89030" opacity="0.78"/>
            </g>

            {/* Eye */}
            <circle cx="20" cy="20" r="9"   fill="#e8d88a" opacity="0.15" filter="url(#eye-glow)"/>
            <circle cx="20" cy="20" r="7.5" fill="url(#eye-grad)" filter="url(#eye-glow)"/>
            <circle cx="17" cy="17" r="2"   fill="white" opacity="0.6"/>
          </svg>
        </button>

      </div>
    </>
  );
}
