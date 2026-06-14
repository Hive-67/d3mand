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

/* ─── WEB AUDIO — RASPOUTINE ─── */
function playRasputin() {
  try {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AC() as AudioContext;
    const t = ctx.currentTime;

    // Distortion shaper
    const dist = ctx.createWaveShaper();
    const k = 300, N = 512;
    const curve = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const x = (i * 2) / N - 1;
      curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
    }
    dist.curve = curve;
    dist.connect(ctx.destination);

    // Filtered white noise (scrambled radio effect)
    const bufSz = Math.floor(ctx.sampleRate * 2.2);
    const noiseBuf = ctx.createBuffer(1, bufSz, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufSz; i++) nd[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(700, t);
    bp.frequency.exponentialRampToValueAtTime(180, t + 0.9);
    bp.Q.value = 3;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, t);
    noiseGain.gain.linearRampToValueAtTime(0.55, t + 0.04);
    noiseGain.gain.linearRampToValueAtTime(0.08, t + 0.45);
    noiseGain.gain.linearRampToValueAtTime(0.45, t + 0.75);
    noiseGain.gain.linearRampToValueAtTime(0, t + 1.8);
    noise.connect(bp); bp.connect(noiseGain); noiseGain.connect(dist);
    noise.start(t); noise.stop(t + 1.85);

    // Oscillator layers
    const osc = (type: OscillatorType, f1: number, f2: number | null, t0: number, t1: number, vol: number, ft = 0.35) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f1, t + t0);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + t0 + ft);
      g.gain.setValueAtTime(0, t + t0);
      g.gain.linearRampToValueAtTime(vol, t + t0 + 0.05);
      g.gain.linearRampToValueAtTime(0, t + t1);
      o.connect(g); g.connect(dist);
      o.start(t + t0); o.stop(t + t1 + 0.1);
    };

    osc("sawtooth", 40, 90,   0,    1.6, 0.4, 0.4);
    osc("square",  200, 80,   0.1,  1.2, 0.12, 0.7);
    osc("sine",   1200, 500,  0.4,  0.65, 0.22, 0.2);
    osc("sine",    900, 350,  0.75, 1.0,  0.15, 0.2);
    osc("sawtooth", 60, 20,   1.2,  2.2,  0.35, 0.5);
    osc("sine",   2200, 800,  1.5,  1.75, 0.1,  0.2);
  } catch { /* silent degradation */ }
}

/* ─── SNAKE CONSTANTS ─── */
const CELL = 20;
const COLS = 20;
const ROWS = 15;
const WIN_SCORE = 4000;
const FOOD_PTS = 200;
const TICK_START = 140;
const TICK_MIN = 65;

type Pos = { x: number; y: number };
type SnakePhase = "playing" | "over" | "exploding" | "won";

interface GameState {
  snake: Pos[];
  dir: Pos;
  nextDir: Pos;
  food: Pos;
  score: number;
  speed: number;
  phase: SnakePhase;
}

function randomFood(snake: Pos[]): Pos {
  let p: Pos;
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

/* ─── SNAKE GAME ─── */
function SnakeGame({ onWin }: { onWin: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const onWinRef = useRef(onWin);
  const G = useRef<GameState>({
    snake: [{ x: 12, y: 7 }, { x: 11, y: 7 }, { x: 10, y: 7 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: randomFood([{ x: 12, y: 7 }, { x: 11, y: 7 }, { x: 10, y: 7 }]),
    score: 0,
    speed: TICK_START,
    phase: "playing",
  });

  const [displayScore, setDisplayScore] = useState(0);
  const [snakePhase, setSnakePhase] = useState<SnakePhase>("playing");

  useEffect(() => { onWinRef.current = onWin; }, [onWin]);

  function draw() {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const { snake, food } = G.current;

    ctx.fillStyle = "#050100";
    ctx.fillRect(0, 0, cv.width, cv.height);

    ctx.strokeStyle = "rgba(80,20,0,0.22)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke();
    }

    ctx.save();
    ctx.shadowColor = "#d4a840";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#ffcc44";
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    snake.forEach((seg, i) => {
      const ratio = i / Math.max(snake.length - 1, 1);
      ctx.save();
      if (i === 0) {
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#00ffcc";
      } else {
        const g = Math.round(200 - ratio * 80);
        const b = Math.round(180 - ratio * 60);
        ctx.fillStyle = `rgba(0,${g},${b},${1 - ratio * 0.5})`;
      }
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      ctx.restore();
    });
  }

  function tick() {
    const g = G.current;
    if (g.phase !== "playing") return;

    g.dir = g.nextDir;
    const head = g.snake[0];
    const nh = { x: head.x + g.dir.x, y: head.y + g.dir.y };

    if (nh.x < 0 || nh.x >= COLS || nh.y < 0 || nh.y >= ROWS || g.snake.some((s) => s.x === nh.x && s.y === nh.y)) {
      g.phase = "over";
      setSnakePhase("over");
      return;
    }

    const ns = [nh, ...g.snake];
    if (nh.x === g.food.x && nh.y === g.food.y) {
      g.score += FOOD_PTS;
      g.food = randomFood(ns);
      g.snake = ns;
      setDisplayScore(g.score);
      if ((g.score / FOOD_PTS) % 5 === 0) g.speed = Math.max(TICK_MIN, g.speed - 10);
      if (g.score >= WIN_SCORE) {
        g.phase = "exploding";
        setSnakePhase("exploding");
        setTimeout(() => {
          g.phase = "won";
          setSnakePhase("won");
          playRasputin();
          setTimeout(() => onWinRef.current(), 2000);
        }, 1500);
        return;
      }
    } else {
      ns.pop();
      g.snake = ns;
    }
    draw();
  }

  function resetGame() {
    const initSnake: Pos[] = [{ x: 12, y: 7 }, { x: 11, y: 7 }, { x: 10, y: 7 }];
    G.current = {
      snake: initSnake,
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: randomFood(initSnake),
      score: 0,
      speed: TICK_START,
      phase: "playing",
    };
    setDisplayScore(0);
    setSnakePhase("playing");
    lastTickRef.current = 0;
    draw();
  }

  useEffect(() => {
    draw();

    const loop = (time: number) => {
      if (G.current.phase === "playing" && time - lastTickRef.current >= G.current.speed) {
        lastTickRef.current = time;
        tick();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
      const g = G.current;
      if (g.phase !== "playing") return;
      switch (e.key) {
        case "ArrowUp":    if (g.dir.y !==  1) g.nextDir = { x: 0, y: -1 }; break;
        case "ArrowDown":  if (g.dir.y !== -1) g.nextDir = { x: 0, y:  1 }; break;
        case "ArrowLeft":  if (g.dir.x !==  1) g.nextDir = { x: -1, y: 0 }; break;
        case "ArrowRight": if (g.dir.x !== -1) g.nextDir = { x:  1, y: 0 }; break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 24px", gap: 14, overflowY: "auto" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.42rem", letterSpacing: "0.4em", color: "#cc3300", textTransform: "uppercase", marginBottom: 5 }}>
          Protocole Ikelos — Phase 2
        </div>
        <div style={{ fontSize: "0.85rem", color: "#ff6622", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
          LE VERRE DIVIN
        </div>
        <div style={{ fontSize: "0.42rem", color: "rgba(255,140,0,0.65)", lineHeight: 1.8, letterSpacing: "0.06em" }}>
          L'exotique piégé est affamé. Absorbez les grenades corrompues.<br />
          Atteignez <span style={{ color: "#ffcc00" }}>4 000 fragments</span> pour déclencher l'explosion finale.
        </div>
      </div>

      <div style={{ fontSize: "0.48rem", letterSpacing: "0.3em", color: "#ff8800", textTransform: "uppercase" }}>
        Fragments absorbés :{" "}
        <span style={{ color: "#ffcc00" }}>{displayScore}</span>
        <span style={{ color: "#441100" }}> / {WIN_SCORE}</span>
      </div>

      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          style={{ border: "1px solid #441100", display: "block", boxShadow: "0 0 20px rgba(255,60,0,0.1)" }}
        />

        {snakePhase === "over" && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(20,0,0,0.87)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
          }}>
            <div style={{ fontSize: "0.85rem", color: "#ff2200", letterSpacing: "0.2em" }}>⚠ EXPLOSION PRÉMATURÉE</div>
            <div style={{ fontSize: "0.42rem", color: "rgba(255,100,0,0.75)", letterSpacing: "0.08em", textAlign: "center" }}>
              L'exotique a implosé avant le seuil critique.<br />Score : {displayScore} / {WIN_SCORE}
            </div>
            <button
              onClick={resetGame}
              style={{
                background: "none", border: "1px solid #661100", color: "#882200",
                fontFamily: "inherit", fontSize: "0.48rem", letterSpacing: "0.2em",
                padding: "8px 18px", cursor: "pointer", textTransform: "uppercase",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff4400"; (e.currentTarget as HTMLButtonElement).style.color = "#ff6622"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#661100"; (e.currentTarget as HTMLButtonElement).style.color = "#882200"; }}
            >
              ↺ Recalibrer l'exotique
            </button>
          </div>
        )}

        {snakePhase === "exploding" && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,80,0,0.35)", animation: "rasp-pulse 0.15s ease-in-out infinite",
          }}>
            <div style={{ fontSize: "1.3rem", color: "#ffcc00", letterSpacing: "0.2em" }}>⚡ EXPLOSION ⚡</div>
          </div>
        )}

        {snakePhase === "won" && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(0,20,0,0.92)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <div style={{ fontSize: "0.9rem", color: "#44ff88", letterSpacing: "0.2em" }}>✓ SEUIL CRITIQUE ATTEINT</div>
            <div style={{ fontSize: "0.42rem", color: "rgba(80,255,130,0.7)", letterSpacing: "0.1em" }}>
              Terminal Raspoutine déverrouillé...
            </div>
          </div>
        )}
      </div>

      <div style={{ fontSize: "0.37rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
        ← ↑ → ↓ diriger le Verre Divin
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
type MainPhase = "quiz" | "fail" | "snake" | "terminal";

export default function RasputinTerminal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<MainPhase>("quiz");
  const [curQ, setCurQ] = useState(0);
  const [visible, setVisible] = useState<Line[]>([]);
  const [showStrike, setShowStrike] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

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

  function answer(i: number) {
    if (i === QUESTIONS[curQ].ans) {
      if (curQ + 1 >= QUESTIONS.length) {
        setPhase("snake");
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

  const btnBase: React.CSSProperties = {
    background: "none", border: "1px solid #441100", color: "#882200",
    fontFamily: "inherit", fontSize: "0.52rem", letterSpacing: "0.1em",
    padding: "10px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
  };

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

      <div style={{ position:"absolute", left:0, right:0, height:3, background:"rgba(255,60,0,0.15)", animation:"rasp-scan 4s linear infinite", pointerEvents:"none", zIndex:5 }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:4, background:"radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />

      <div style={{ position:"relative", zIndex:10, height:"100%", display:"flex", flexDirection:"column", animation:"rasp-in 0.3s ease-out" }}>

        {/* Header */}
        <div style={{ borderBottom:"1px solid #441100", padding:"12px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(40,5,0,0.8)", flexShrink:0 }}>
          <span style={{ fontSize:"0.55rem", letterSpacing:"0.4em", color:"#ff4400", textTransform:"uppercase" }}>
            ⬡ RÉSEAU SERAPH — WARMIND ACCÈS CLASSIFIÉ
          </span>
          <button onClick={onClose} style={{ background:"none", border:"1px solid #441100", color:"#882200", fontSize:"0.45rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"4px 10px", cursor:"pointer", fontFamily:"inherit" }}>
            [ESC] DÉCONNECTER
          </button>
        </div>

        {/* ASCII logo */}
        <div style={{ padding:"16px 24px 10px", flexShrink:0 }}>
          <pre style={{ fontSize:"clamp(0.27rem, 0.52vw, 0.42rem)", lineHeight:1.3, color:"#cc3300", margin:0, opacity:0.9 }}>{`
 ██████╗  █████╗ ███████╗██████╗  ██████╗ ██╗   ██╗████████╗██╗███╗   ██╗███████╗
 ██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██║████╗  ██║██╔════╝
 ██████╔╝███████║███████╗██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║█████╗
 ██╔══██╗██╔══██║╚════██║██╔═══╝ ██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██╔══╝
 ██║  ██║██║  ██║███████║██║     ╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝`.trim()}</pre>
          <div style={{ fontSize:"0.37rem", letterSpacing:"0.3em", color:"#661100", textTransform:"uppercase", marginTop:6 }}>
            INTELLIGENCE ARTIFICIELLE DE GUERRE — ÈRE D'OR — BUNKER SERAPH
          </div>
        </div>
        <div style={{ borderTop:"1px solid #2a0800", flexShrink:0 }} />

        {/* ── QUIZ ── */}
        {phase === "quiz" && (
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
            <div style={{ maxWidth:560, width:"100%", border:"1px solid #661100", padding:"32px 36px", background:"rgba(30,4,0,0.6)" }}>
              <div style={{ fontSize:"0.4rem", letterSpacing:"0.45em", color:"#cc3300", textTransform:"uppercase", marginBottom:6 }}>
                Protocole Voluspa — Vérification d'Identité
              </div>
              <div style={{ fontSize:"1rem", color:"#ff6622", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>
                Identification Gardien
              </div>
              <div style={{ fontSize:"0.43rem", color:"rgba(255,255,255,0.3)", letterSpacing:"0.2em", marginBottom:28 }}>
                Prouvez que vous n'êtes pas un Déchu, un Cabal, ou pire — un humain non-Gardien.
              </div>
              <div style={{ fontSize:"0.38rem", letterSpacing:"0.3em", color:"#441100", textTransform:"uppercase", marginBottom:10 }}>
                Question {curQ + 1} / {QUESTIONS.length}
              </div>
              <div style={{ fontSize:"0.62rem", lineHeight:1.7, color:"#ff8800", marginBottom:20, letterSpacing:"0.04em" }}>
                {q.q}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {q.opts.map((opt, i) => (
                  <button key={i} onClick={() => answer(i)} style={btnBase}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor="#ff4400"; (e.currentTarget as HTMLButtonElement).style.color="#ff6622"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor="#441100"; (e.currentTarget as HTMLButtonElement).style.color="#882200"; }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div style={{ display:"flex", gap:6, marginTop:20 }}>
                {QUESTIONS.map((_, i) => (
                  <div key={i} style={{ width:8, height:8, borderRadius:"50%", background: i < curQ ? "#cc3300" : i === curQ ? "#ff6622" : "#441100", transition:"background 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FAIL ── */}
        {phase === "fail" && (
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
            <div style={{ maxWidth:480, width:"100%", border:"1px solid #cc0000", padding:"32px 36px", background:"rgba(40,0,0,0.7)", textAlign:"center" }}>
              <div style={{ fontSize:"1.1rem", color:"#ff2200", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:16 }}>
                ⚠ Identification Échouée
              </div>
              <div style={{ fontSize:"0.5rem", lineHeight:1.9, color:"rgba(255,80,0,0.8)", marginBottom:24, letterSpacing:"0.05em" }}>
                RASPOUTINE : "Réponse incorrecte.<br />
                Vous n'avez pas le profil d'un Gardien.<br />
                Seuls ceux qui ont porté la Lumière peuvent accéder à ce terminal.<br /><br />
                Un Déchu de plus qui essaie de s'infiltrer.<br />
                J'en ai vu des milliers. Je suis encore là. Eux, non."
              </div>
              <button onClick={retry}
                style={{ background:"none", border:"1px solid #661100", color:"#882200", fontFamily:"inherit", fontSize:"0.5rem", letterSpacing:"0.2em", padding:"10px 20px", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor="#ff4400"; (e.currentTarget as HTMLButtonElement).style.color="#ff6622"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor="#661100"; (e.currentTarget as HTMLButtonElement).style.color="#882200"; }}
              >
                ↺ Recommencer l'identification
              </button>
            </div>
          </div>
        )}

        {/* ── SNAKE ── */}
        {phase === "snake" && (
          <SnakeGame onWin={() => setPhase("terminal")} />
        )}

        {/* ── TERMINAL ── */}
        {phase === "terminal" && (
          <>
            <div style={{ flex:1, overflowY:"auto", padding:"16px 24px 40px", scrollbarWidth:"thin", scrollbarColor:"#441100 transparent" }}>
              {visible.map((line, i) => (
                <div key={i} style={{ fontSize:"0.5rem", lineHeight:2, letterSpacing:"0.06em", color:line.color || "transparent", whiteSpace:"pre", minHeight:line.text ? "auto" : "0.8rem" }}>
                  {line.text && <span style={{ color:"#441100", marginRight:12 }}>›</span>}
                  {line.text}
                </div>
              ))}
              <div style={{ fontSize:"0.5rem", color:"#cc4400" }}>
                <span style={{ animation:"rasp-blink 1s step-end infinite" }}>█</span>
              </div>
              <div ref={bottomRef} />
            </div>

            {showStrike && (
              <div style={{ padding:"16px 20px", borderTop:"1px solid #441100", flexShrink:0, textAlign:"center" }}>
                <a
                  href={`mailto:press@sie.sony.com?subject=${encodeURIComponent("Lettre ouverte — Développement de Destiny 3")}&body=${encodeURIComponent(MESSAGES.sony)}`}
                  style={{ textDecoration:"none" }}
                >
                  <button
                    style={{ background:"rgba(200,0,0,0.15)", border:"2px solid #cc0000", color:"#ff3300", fontFamily:"inherit", fontSize:"0.7rem", letterSpacing:"0.25em", padding:"14px 32px", cursor:"pointer", textTransform:"uppercase", animation:"rasp-pulse 2s ease-in-out infinite" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background="rgba(200,0,0,0.3)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background="rgba(200,0,0,0.15)"; }}
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
