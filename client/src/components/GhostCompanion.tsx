/* D3MAND — Ghost / Spectre Destiny (bottom-right, toujours visible) */
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

/* ── Son Raspoutine ── */
function playGhostSound() {
  const audio = new Audio("/sounds/rasputin.mp3");
  audio.volume = 0.55;
  audio.play().catch(() => playRasputinSynth());
}

function playRasputinSynth() {
  try {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AC() as AudioContext;
    const t = ctx.currentTime;

    // Distorsion
    const dist = ctx.createWaveShaper();
    const k = 280, N = 512;
    const curve = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const x = (i * 2) / N - 1;
      curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
    }
    dist.curve = curve;
    dist.connect(ctx.destination);

    // Bruit blanc filtré (transmission brouillée)
    const bufSz = Math.floor(ctx.sampleRate * 0.8);
    const nb = ctx.createBuffer(1, bufSz, ctx.sampleRate);
    const nd = nb.getChannelData(0);
    for (let i = 0; i < bufSz; i++) nd[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = nb;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(800, t);
    bp.frequency.exponentialRampToValueAtTime(200, t + 0.5);
    bp.Q.value = 3;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, t);
    ng.gain.linearRampToValueAtTime(0.45, t + 0.03);
    ng.gain.linearRampToValueAtTime(0.05, t + 0.3);
    ng.gain.linearRampToValueAtTime(0, t + 0.7);
    noise.connect(bp); bp.connect(ng); ng.connect(dist);
    noise.start(t); noise.stop(t + 0.75);

    // Oscillateur principal — grondement grave
    const osc = (type: OscillatorType, f1: number, f2: number, t0: number, t1: number, vol: number, ft = 0.25) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f1, t + t0);
      o.frequency.exponentialRampToValueAtTime(f2, t + t0 + ft);
      g.gain.setValueAtTime(0, t + t0);
      g.gain.linearRampToValueAtTime(vol, t + t0 + 0.04);
      g.gain.linearRampToValueAtTime(0, t + t1);
      o.connect(g); g.connect(dist);
      o.start(t + t0); o.stop(t + t1 + 0.05);
    };

    osc("sawtooth", 55, 100, 0,    0.6, 0.35, 0.3);
    osc("square",  220,  80, 0.05, 0.5, 0.10, 0.4);
    osc("sine",   1400, 500, 0.2,  0.45, 0.18, 0.2);
    osc("sine",    700, 250, 0.4,  0.7,  0.12, 0.2);
  } catch { /* silent */ }
}

export default function GhostCompanion() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleClick = () => {
    if (open) { setOpen(false); clearTimeout(timer.current); return; }
    setQuoteIdx((i) => (i + 1) % QUOTES.length);
    setOpen(true);
    playGhostSound();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 7000);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      <style>{`
        @keyframes ghost-bob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ghost-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ghost-in   { from{opacity:0;transform:scale(.85) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes eye-pulse  { 0%,100%{opacity:.82} 50%{opacity:1} }
        @keyframes core-pulse { 0%,100%{opacity:.3} 50%{opacity:.55} }
      `}</style>

      <div style={{ position:"fixed", bottom:28, right:28, zIndex:150, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>

        {/* Bulle de citation */}
        {open && (
          <div
            key={quoteIdx}
            style={{
              maxWidth: 260,
              border: "1px solid rgba(0,200,255,0.25)",
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
            <span style={{ color:"#00ccff", fontWeight:700 }}>Spectre // </span>
            {QUOTES[quoteIdx]}
            <div style={{
              position:"absolute", bottom:-7, right:22,
              width:0, height:0,
              borderLeft:"6px solid transparent",
              borderRight:"6px solid transparent",
              borderTop:"7px solid rgba(0,200,255,0.25)",
            }}/>
          </div>
        )}

        {/* Bouton Spectre */}
        <button
          onClick={handleClick}
          title="Spectre"
          style={{
            background:"none", border:"none", cursor:"pointer", padding:4,
            animation: "ghost-bob 4s ease-in-out infinite",
            filter: open
              ? "drop-shadow(0 0 10px rgba(0,200,255,0.7))"
              : "drop-shadow(0 0 5px rgba(0,180,230,0.35))",
            transition:"filter 0.3s",
          }}
        >
          <svg width="52" height="52" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Dégradé des panneaux — nacre */}
              <linearGradient id="gh-pg" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%"   stopColor="#f4efe4"/>
                <stop offset="100%" stopColor="#c8c0b0"/>
              </linearGradient>
              {/* Dégradé œil — cyan */}
              <radialGradient id="gh-eg" cx="38%" cy="32%" r="65%">
                <stop offset="0%"   stopColor="#aff0ff"/>
                <stop offset="45%"  stopColor="#00b8e0"/>
                <stop offset="100%" stopColor="#004466"/>
              </radialGradient>
              {/* Halo central */}
              <radialGradient id="gh-cg" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#00ccff" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#00ccff" stopOpacity="0"/>
              </radialGradient>
              {/* Filtre lueur œil */}
              <filter id="gh-ef" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Halo ambiant */}
            <circle style={{ animation:"core-pulse 2.4s ease-in-out infinite" }}
              cx="24" cy="24" r="12" fill="url(#gh-cg)"/>

            {/* 5 panneaux en rotation — symétrie pentagonale */}
            <g style={{ transformOrigin:"24px 24px", animation:"ghost-spin 12s linear infinite" }}>
              {/* template kite: outer(24,4) left(15,14) inner(24,19) right(33,14) */}
              <polygon points="24,4 15,14 24,19 33,14"
                fill="url(#gh-pg)" stroke="#a09888" strokeWidth="0.4"/>
              <polygon points="24,4 15,14 24,19 33,14" transform="rotate(72,24,24)"
                fill="url(#gh-pg)" stroke="#a09888" strokeWidth="0.4"/>
              <polygon points="24,4 15,14 24,19 33,14" transform="rotate(144,24,24)"
                fill="url(#gh-pg)" stroke="#a09888" strokeWidth="0.4"/>
              <polygon points="24,4 15,14 24,19 33,14" transform="rotate(216,24,24)"
                fill="url(#gh-pg)" stroke="#a09888" strokeWidth="0.4"/>
              <polygon points="24,4 15,14 24,19 33,14" transform="rotate(288,24,24)"
                fill="url(#gh-pg)" stroke="#a09888" strokeWidth="0.4"/>
            </g>

            {/* Œil diamant */}
            <polygon style={{ animation:"eye-pulse 2.4s ease-in-out infinite" }}
              points="24,18 30,24 24,30 18,24"
              fill="url(#gh-eg)" filter="url(#gh-ef)"/>
            {/* Reflet */}
            <ellipse cx="21.5" cy="21.5" rx="2.2" ry="1.5"
              fill="white" opacity="0.55" transform="rotate(-25,21.5,21.5)"/>
          </svg>
        </button>

      </div>
    </>
  );
}
