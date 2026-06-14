/* D3MAND — Easter egg: Destiny Director map (Konami code) */
import { useEffect, useRef, useState } from "react";

type Destination = {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  orbit: number;    // radius in px
  size: number;     // planet diameter in px
  speed: number;    // seconds per orbit
  startAngle: number; // degrees CW from 12 o'clock
  lore: string;
};

const DESTINATIONS: Destination[] = [
  {
    id: "cosmodrome",
    name: "Cosmodrome",
    subtitle: "Terre · Secteur Rho",
    color: "#c8956a",
    orbit: 82,
    size: 11,
    speed: 38,
    startAngle: 30,
    lore: "Le berceau des Gardiens. Des millions de vaisseaux de la Grande Offensive reposent dans la rouille et l'oubli.",
  },
  {
    id: "moon",
    name: "Lune",
    subtitle: "Luna · Sanctuaire des Cauchemars",
    color: "#9b9aab",
    orbit: 142,
    size: 14,
    speed: 60,
    startAngle: 115,
    lore: "Les cauchemars remontent des profondeurs. Savathûn y a tissé ses mensonges pendant des siècles.",
  },
  {
    id: "nessus",
    name: "Nessus",
    subtitle: "Astéroïde · Territoire Vex",
    color: "#5da67a",
    orbit: 204,
    size: 15,
    speed: 88,
    startAngle: 205,
    lore: "Entièrement converti par les Vex. Le dernier terrain de chasse de Cayde-6 avant son sacrifice.",
  },
  {
    id: "europa",
    name: "Europa",
    subtitle: "Lune de Jupiter · Au-delà de la Lumière",
    color: "#5b8fd4",
    orbit: 272,
    size: 18,
    speed: 115,
    startAngle: 285,
    lore: "Sous les glaces, une Pyramide sommeille. C'est ici que la Stasis fut révélée aux Gardiens.",
  },
  {
    id: "neomuna",
    name: "Néomuna",
    subtitle: "Neptune · Cité de Lumière",
    color: "#38bfbf",
    orbit: 344,
    size: 13,
    speed: 150,
    startAngle: 155,
    lore: "La dernière cité secrète de l'humanité. Elle a résisté à La Forme Finale en restant cachée des siècles.",
  },
  {
    id: "pale-heart",
    name: "Cœur Pâle",
    subtitle: "Intérieur du Voyageur",
    color: "#e8d88a",
    orbit: 418,
    size: 20,
    speed: 200,
    startAngle: 62,
    lore: "Le Témoin a été vaincu ici, dans le cœur même du Voyageur. Une nouvelle ère commence — Destiny 3 doit naître.",
  },
];

// Delay to place the planet at startAngle (CW from 12 o'clock)
// CSS orbit-cw starts at 3 o'clock (0deg), so we offset by +270 to get to 12 o'clock
const armDelay = (startAngle: number, speed: number) =>
  -(((startAngle + 270) % 360) / 360) * speed;

// Deterministic star positions (golden angle spiral)
const STARS = Array.from({ length: 140 }, (_, i) => ({
  x: ((i * 137.508) % 900),
  y: ((i * 97.313) % 900),
  r: i % 7 === 0 ? 1.4 : i % 3 === 0 ? 1.0 : 0.6,
  op: 0.15 + (i % 5) * 0.08,
}));

export default function DestinyMap({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState<Destination | null>(null);
  const [scale, setScale] = useState(1);
  const prevActive = useRef<Destination | null>(null);

  // ESC
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Responsive scale
  useEffect(() => {
    const update = () => {
      // Map canvas is 900x900 + ~200px for header/panel = ~1100px total height
      const available = Math.min(window.innerWidth, window.innerHeight);
      setScale(Math.min(1, available / 980));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Track previous active for panel animation key
  if (active !== prevActive.current) prevActive.current = active;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">

      {/* CSS keyframes */}
      <style>{`
        @keyframes d3-cw   { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes d3-ccw  { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes d3-fade { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes d3-panel { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes d3-traveler {
          0%,100% { box-shadow: 0 0 18px 5px rgba(232,216,138,.35), 0 0 55px 18px rgba(232,216,138,.12); }
          50%      { box-shadow: 0 0 30px 9px rgba(232,216,138,.55), 0 0 80px 30px rgba(232,216,138,.22); }
        }
      `}</style>

      {/* Dim backdrop — click closes */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(1,3,10,0.97)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* All content — centered + scaled */}
      <div
        className="relative z-10 flex flex-col items-center select-none"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          animation: "d3-fade 0.45s ease-out both",
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="text-center mb-5">
          <div className="font-mono text-[0.42rem] uppercase tracking-[0.55em] mb-1"
            style={{ color: "rgba(232,216,138,0.35)" }}>
            Accès classifié — Gardien
          </div>
          <div
            className="font-display text-[1.7rem] font-black tracking-[0.38em]"
            style={{ color: "var(--gold)", textShadow: "0 0 28px rgba(232,216,138,.55), 0 0 65px rgba(232,216,138,.2)" }}
          >
            THE DIRECTOR
          </div>
          <div className="font-mono text-[0.38rem] uppercase tracking-[0.32em] mt-1"
            style={{ color: "rgba(255,255,255,0.22)" }}>
            Système Solaire · Destinations Connues
          </div>
        </div>

        {/* Map canvas 900×900 */}
        <div style={{ width: 900, height: 900, position: "relative", flexShrink: 0 }}>

          {/* Stars */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="900" height="900"
            style={{ opacity: 0.9 }}
          >
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.op} />
            ))}
          </svg>

          {/* Subtle radial glow at center */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 300, height: 300,
              left: "50%", top: "50%",
              marginLeft: -150, marginTop: -150,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,216,138,0.06) 0%, transparent 70%)",
            }}
          />

          {/* Orbit rings */}
          {DESTINATIONS.map((d) => (
            <div
              key={`ring-${d.id}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: d.orbit * 2,
                height: d.orbit * 2,
                left: "50%", top: "50%",
                marginLeft: -d.orbit, marginTop: -d.orbit,
                border: `1px solid ${d.color}`,
                opacity: 0.1,
              }}
            />
          ))}

          {/* Traveler */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 38, height: 38,
              left: "50%", top: "50%",
              marginLeft: -19, marginTop: -19,
              background: "radial-gradient(circle at 36% 30%, #fff 0%, #e8d88a 45%, #b8952e 100%)",
              animation: "d3-traveler 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute pointer-events-none font-mono uppercase whitespace-nowrap"
            style={{
              fontSize: "0.36rem", letterSpacing: "0.22em",
              left: "50%", top: "calc(50% + 26px)",
              transform: "translateX(-50%)",
              color: "rgba(232,216,138,0.45)",
            }}
          >
            Le Voyageur
          </div>

          {/* Planet orbits */}
          {DESTINATIONS.map((d) => {
            const delay = armDelay(d.startAngle, d.speed);
            const isActive = active?.id === d.id;

            return (
              <div
                key={d.id}
                className="absolute pointer-events-none"
                style={{
                  left: "50%", top: "50%",
                  width: 0, height: 0,
                  transformOrigin: "0 0",
                  animation: `d3-cw ${d.speed}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                {/* Planet button (counter-rotated to stay upright) */}
                <button
                  className="absolute flex flex-col items-center pointer-events-auto"
                  style={{
                    left: d.orbit,
                    top: 0,
                    transformOrigin: `${-d.orbit}px 0px`,
                    animation: `d3-ccw ${d.speed}s linear infinite`,
                    animationDelay: `${delay}s`,
                    transform: `translate(-50%, -50%)`,
                    padding: "8px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive(isActive ? null : d)}
                >
                  {/* Halo when active */}
                  {isActive && (
                    <div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: d.size * 4, height: d.size * 4,
                        left: "50%", top: d.size / 2 + 8,
                        marginLeft: -(d.size * 2),
                        marginTop: -(d.size * 2),
                        background: `radial-gradient(circle, ${d.color}35 0%, transparent 70%)`,
                      }}
                    />
                  )}
                  {/* Planet dot */}
                  <div
                    className="rounded-full"
                    style={{
                      width: d.size, height: d.size,
                      background: `radial-gradient(circle at 34% 28%, #fff 0%, ${d.color} 48%, color-mix(in srgb, ${d.color} 55%, #000) 100%)`,
                      boxShadow: isActive
                        ? `0 0 12px 4px ${d.color}70, 0 0 28px 8px ${d.color}35`
                        : `0 0 5px 1px ${d.color}45`,
                      transform: isActive ? "scale(1.5)" : "scale(1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      flexShrink: 0,
                    }}
                  />
                  {/* Name label */}
                  <div
                    className="font-mono uppercase whitespace-nowrap mt-1.5"
                    style={{
                      fontSize: "0.37rem",
                      letterSpacing: "0.14em",
                      color: isActive ? d.color : "rgba(255,255,255,0.3)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {d.name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Info panel */}
        <div style={{ height: 130, display: "flex", alignItems: "flex-start", justifyContent: "center", width: 900 }}>
          {active ? (
            <div
              key={active.id}
              className="border px-8 py-5 text-center"
              style={{
                borderColor: `${active.color}40`,
                background: `color-mix(in srgb, ${active.color} 7%, #000)`,
                animation: "d3-panel 0.25s ease-out both",
                maxWidth: 440,
              }}
            >
              <div className="font-mono uppercase mb-1" style={{ fontSize: "0.4rem", letterSpacing: "0.42em", color: active.color }}>
                {active.subtitle}
              </div>
              <div className="font-display font-black tracking-[0.18em] mb-2.5" style={{ fontSize: "1rem", color: active.color }}>
                {active.name}
              </div>
              <p className="font-mono leading-relaxed" style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.62)" }}>
                {active.lore}
              </p>
            </div>
          ) : (
            <div
              className="font-mono uppercase text-center pt-5"
              style={{ fontSize: "0.4rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.18)" }}
            >
              Cliquer sur une destination
            </div>
          )}
        </div>

      </div>

      {/* Close — outside scale container */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 font-mono uppercase transition-all"
        style={{
          fontSize: "0.52rem", letterSpacing: "0.22em",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "6px 12px",
          color: "rgba(255,255,255,0.28)",
          background: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--gold-dim)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(232,216,138,0.35)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.28)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        [ESC] Fermer
      </button>
    </div>
  );
}
