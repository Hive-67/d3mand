/* D3MAND — Easter egg: Destiny Director map v2 (style in-game) */
import { useEffect, useState } from "react";

type Destination = {
  id: string;
  name: string;
  subtitle: string;
  x: number; y: number;   // % from top-left of canvas
  size: number;            // diameter px
  gradient: string;        // planet sphere gradient
  highlight: string;       // top-left highlight gradient
  glow: string;            // outer glow color
  atmosphere: string;      // atmosphere ring color
  floatDelay: number;      // s
  floatDuration: number;   // s
  lore: string;
};

const DESTINATIONS: Destination[] = [
  {
    id: "cosmodrome",
    name: "Cosmodrome",
    subtitle: "Terre · Secteur Rho",
    x: 22, y: 66,
    size: 82,
    gradient: "radial-gradient(circle at 55% 55%, #1a0f03 0%, #2d1a05 30%, #5a3a0e 55%, #8b6020 75%, #d4b070 100%)",
    highlight: "radial-gradient(circle at 30% 28%, rgba(255,230,160,0.55) 0%, transparent 55%)",
    glow: "#c8902a",
    atmosphere: "rgba(190,130,50,0.18)",
    floatDelay: 0,
    floatDuration: 6.2,
    lore: "Le berceau des Gardiens. Des millions de vaisseaux de la Grande Offensive reposent ici dans la rouille et l'oubli.",
  },
  {
    id: "moon",
    name: "Lune",
    subtitle: "Luna · Sanctuaire des Cauchemars",
    x: 40, y: 74,
    size: 70,
    gradient: "radial-gradient(circle at 55% 55%, #12121e 0%, #2a2a3a 28%, #5a5a6a 55%, #8a8a9a 75%, #c8c8d4 100%)",
    highlight: "radial-gradient(circle at 30% 28%, rgba(220,220,240,0.5) 0%, transparent 55%)",
    glow: "#7a7a9a",
    atmosphere: "rgba(100,100,130,0.15)",
    floatDelay: 1.1,
    floatDuration: 7.5,
    lore: "Les cauchemars remontent des profondeurs. Savathûn y a tissé ses mensonges pendant des siècles.",
  },
  {
    id: "nessus",
    name: "Nessus",
    subtitle: "Astéroïde · Territoire Vex",
    x: 18, y: 32,
    size: 76,
    gradient: "radial-gradient(circle at 55% 55%, #051a0c 0%, #0d3d1e 28%, #1c6635 55%, #3a9b5c 75%, #90e0a0 100%)",
    highlight: "radial-gradient(circle at 30% 28%, rgba(160,255,180,0.5) 0%, transparent 55%)",
    glow: "#3aaa60",
    atmosphere: "rgba(40,150,70,0.18)",
    floatDelay: 2.3,
    floatDuration: 6.8,
    lore: "Entièrement converti par les Vex. Le dernier terrain de chasse de Cayde-6 avant son sacrifice.",
  },
  {
    id: "europa",
    name: "Europa",
    subtitle: "Lune de Jupiter · Beyond Light",
    x: 70, y: 58,
    size: 88,
    gradient: "radial-gradient(circle at 55% 55%, #030d1c 0%, #081c3e 25%, #1a4e8a 50%, #4a8cc4 72%, #eef4ff 100%)",
    highlight: "radial-gradient(circle at 30% 28%, rgba(200,230,255,0.6) 0%, transparent 55%)",
    glow: "#4a8cc4",
    atmosphere: "rgba(70,140,210,0.2)",
    floatDelay: 0.7,
    floatDuration: 8.1,
    lore: "Sous les glaces, une Pyramide sommeille. C'est ici que la Stasis fut révélée aux Gardiens.",
  },
  {
    id: "neomuna",
    name: "Néomuna",
    subtitle: "Neptune · Cité de Lumière",
    x: 77, y: 26,
    size: 72,
    gradient: "radial-gradient(circle at 55% 55%, #011520 0%, #053040 28%, #0c5a6a 54%, #1898a8 74%, #5ae0e0 100%)",
    highlight: "radial-gradient(circle at 30% 28%, rgba(120,240,245,0.5) 0%, transparent 55%)",
    glow: "#1ab8c8",
    atmosphere: "rgba(20,160,170,0.18)",
    floatDelay: 3.5,
    floatDuration: 7.2,
    lore: "La dernière cité secrète de l'humanité. Elle a résisté à La Forme Finale en restant cachée des siècles.",
  },
  {
    id: "pale-heart",
    name: "Cœur Pâle",
    subtitle: "Intérieur du Voyageur",
    x: 50, y: 42,
    size: 104,
    gradient: "radial-gradient(circle at 55% 55%, #3c2808 0%, #8a6810 22%, #c0a028 45%, #e8d060 66%, #f8f0c0 84%, #ffffff 100%)",
    highlight: "radial-gradient(circle at 30% 28%, rgba(255,255,240,0.7) 0%, transparent 50%)",
    glow: "#e8c840",
    atmosphere: "rgba(240,210,80,0.22)",
    floatDelay: 1.8,
    floatDuration: 9.0,
    lore: "Le Témoin a été vaincu ici, dans le cœur même du Voyageur. Une nouvelle ère commence — Destiny 3 doit naître.",
  },
];

// Stars (golden angle spiral, deterministic)
const STARS = Array.from({ length: 200 }, (_, i) => ({
  x: (i * 137.508) % 100,
  y: (i * 89.313) % 100,
  r: i % 9 === 0 ? 1.6 : i % 4 === 0 ? 1.1 : 0.6,
  op: 0.12 + (i % 6) * 0.1,
}));

export default function DestinyMap({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState<Destination | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="fixed inset-0 z-[200]" style={{ fontFamily: "var(--font-display, sans-serif)" }}>
      <style>{`
        @keyframes d3-float { 0%,100% { transform: translate(-50%,-50%) translateY(0px); } 50% { transform: translate(-50%,-50%) translateY(-14px); } }
        @keyframes d3-in    { from { opacity:0; transform:scale(1.04); } to { opacity:1; transform:scale(1); } }
        @keyframes d3-panel { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes d3-rotate { from { transform:translate(-50%,-50%) rotate(0deg); } to { transform:translate(-50%,-50%) rotate(360deg); } }
        @keyframes d3-pulse-ring {
          0%   { transform:translate(-50%,-50%) scale(1);   opacity:0.5; }
          100% { transform:translate(-50%,-50%) scale(1.7); opacity:0; }
        }
      `}</style>

      {/* Full-screen space background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 45% at 25% 20%, rgba(55,10,80,0.45) 0%, transparent 100%),
            radial-gradient(ellipse 50% 40% at 80% 75%, rgba(8,25,70,0.5) 0%, transparent 100%),
            radial-gradient(ellipse 40% 35% at 55% 50%, rgba(15,10,40,0.6) 0%, transparent 100%),
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(20,60,20,0.15) 0%, transparent 70%),
            #010208
          `,
        }}
        onClick={onClose}
      />

      {/* Stars SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
        {STARS.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white" opacity={s.op} />
        ))}
      </svg>

      {/* Subtle Earth silhouette at bottom (atmospheric) */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -120, left: "50%",
          width: 900, height: 300,
          transform: "translateX(-50%)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          background: "radial-gradient(ellipse at 50% 100%, rgba(20,60,30,0.25) 0%, rgba(10,30,60,0.12) 50%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />

      {/* Director panel — entire canvas */}
      <div
        className="absolute inset-0"
        style={{ animation: "d3-in 0.5s ease-out both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center pointer-events-none" style={{ zIndex: 10 }}>
          <div style={{ fontSize: "0.4rem", letterSpacing: "0.55em", color: "rgba(232,216,138,0.3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 4 }}>
            Accès classifié — Gardien
          </div>
          <div style={{
            fontSize: "1.5rem", fontWeight: 900, letterSpacing: "0.38em", color: "var(--gold, #e8d88a)", textTransform: "uppercase",
            textShadow: "0 0 25px rgba(232,216,138,0.6), 0 0 60px rgba(232,216,138,0.2)",
          }}>
            THE DIRECTOR
          </div>
          <div style={{ fontSize: "0.38rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginTop: 4 }}>
            Système Solaire · Destinations Connues
          </div>
        </div>

        {/* Planets */}
        {DESTINATIONS.map((d) => {
          const isActive = active?.id === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setActive(isActive ? null : d)}
              style={{
                position: "absolute",
                left: `${d.x}%`,
                top: `${d.y}%`,
                transform: "translate(-50%, -50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
                animation: `d3-float ${d.floatDuration}s ease-in-out ${d.floatDelay}s infinite`,
                zIndex: isActive ? 20 : 10,
              }}
            >
              {/* Subtitle above */}
              <div style={{
                fontSize: "0.36rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                color: isActive ? d.glow : "rgba(255,255,255,0.28)",
                marginBottom: 6,
                transition: "color 0.3s",
                whiteSpace: "nowrap",
              }}>
                {d.subtitle}
              </div>

              {/* Planet sphere */}
              <div style={{ position: "relative", width: d.size, height: d.size, flexShrink: 0 }}>

                {/* Outer atmosphere halo */}
                <div style={{
                  position: "absolute",
                  inset: -10,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${d.atmosphere} 50%, transparent 75%)`,
                  filter: "blur(8px)",
                }} />

                {/* Pulse ring when active */}
                {isActive && (
                  <div style={{
                    position: "absolute",
                    left: "50%", top: "50%",
                    width: d.size + 20, height: d.size + 20,
                    marginLeft: -(d.size + 20) / 2, marginTop: -(d.size + 20) / 2,
                    borderRadius: "50%",
                    border: `1.5px solid ${d.glow}`,
                    animation: "d3-pulse-ring 1.6s ease-out infinite",
                  }} />
                )}

                {/* Selection ring (active) */}
                {isActive && (
                  <div style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    border: `2px solid ${d.glow}`,
                    boxShadow: `0 0 14px 3px ${d.glow}60, inset 0 0 8px ${d.glow}30`,
                  }} />
                )}

                {/* Planet body */}
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: d.gradient,
                  boxShadow: isActive
                    ? `inset -14px -10px 30px rgba(0,0,0,0.6), 0 0 ${d.size * 0.6}px ${d.glow}55`
                    : `inset -14px -10px 30px rgba(0,0,0,0.6), 0 0 ${d.size * 0.3}px ${d.glow}30`,
                  transition: "box-shadow 0.4s ease",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  {/* Highlight overlay */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: d.highlight,
                  }} />
                  {/* Limb darkening (dark edge) */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
                  }} />
                </div>
              </div>

              {/* Name below */}
              <div style={{
                marginTop: 10,
                fontSize: "0.62rem",
                fontWeight: 900,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: isActive ? d.glow : "rgba(255,255,255,0.7)",
                textShadow: isActive ? `0 0 12px ${d.glow}` : "none",
                transition: "color 0.3s, text-shadow 0.3s",
                whiteSpace: "nowrap",
              }}>
                {d.name}
              </div>
            </button>
          );
        })}

        {/* Info panel */}
        {active && (
          <div
            key={active.id}
            style={{
              position: "absolute",
              bottom: 36,
              left: "50%",
              transform: "translateX(-50%)",
              border: `1px solid ${active.glow}40`,
              background: `color-mix(in srgb, ${active.glow} 8%, rgba(0,0,0,0.92))`,
              backdropFilter: "blur(12px)",
              padding: "20px 36px",
              textAlign: "center",
              maxWidth: 480,
              width: "90vw",
              animation: "d3-panel 0.3s ease-out both",
              zIndex: 30,
            }}
          >
            <div style={{ fontSize: "0.4rem", letterSpacing: "0.42em", textTransform: "uppercase", fontFamily: "var(--font-mono)", color: active.glow, marginBottom: 6 }}>
              {active.subtitle}
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: active.glow, marginBottom: 10, textShadow: `0 0 16px ${active.glow}60` }}>
              {active.name}
            </div>
            <p style={{ fontSize: "0.52rem", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-mono)" }}>
              {active.lore}
            </p>
          </div>
        )}

        {/* Bottom hint when nothing active */}
        {!active && (
          <div style={{
            position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
            fontSize: "0.4rem", letterSpacing: "0.32em", textTransform: "uppercase",
            fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.18)",
          }}>
            Sélectionner une destination
          </div>
        )}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 20, zIndex: 50,
          fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase",
          border: "1px solid rgba(255,255,255,0.12)", padding: "6px 14px",
          color: "rgba(255,255,255,0.3)", background: "none", cursor: "pointer",
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--gold-dim, #c8a84a)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,216,138,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
        }}
      >
        [ESC] Fermer
      </button>
    </div>
  );
}
