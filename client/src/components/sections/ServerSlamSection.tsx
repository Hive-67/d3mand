/* D3MAND — Server Slam countdown banner + compteur participatif */
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import Countdown from "../Countdown";
import { useReveal } from "@/hooks/useReveal";
import AnimatedCounter from "../AnimatedCounter";

const SLAM_KEY = "d3mand_slam_voted";
const COUNT_API_URL = "https://api.countapi.xyz/hit/d3mandhub.com/serverslam";

export default function ServerSlamSection() {
  const ref = useReveal();
  const BASE_COUNT = 800;
  const [slamCount, setSlamCount] = useState<number>(0);
  const [voted, setVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialisation : récupère le compteur depuis CountAPI
  useEffect(() => {
    const alreadyVoted = !!localStorage.getItem(SLAM_KEY);
    setVoted(alreadyVoted);

    fetch(COUNT_API_URL)
      .then((r) => r.json())
      .then((data) => {
        setSlamCount((data.value || 0) + BASE_COUNT);
        setLoading(false);
      })
      .catch(() => {
        // Fallback localStorage si CountAPI indisponible
        const stored = parseInt(localStorage.getItem("d3mand_slam_count") || "0");
        setSlamCount(stored);
        setLoading(false);
      });
  }, []);

  const joinSlam = () => {
    if (voted) return;
    localStorage.setItem(SLAM_KEY, "1");
    setVoted(true);

    fetch(COUNT_API_URL)
      .then((r) => r.json())
      .then((data) => {
        setSlamCount((data.value || slamCount - BASE_COUNT + 1) + BASE_COUNT);
      })
      .catch(() => {
        const next = slamCount + 1;
        localStorage.setItem("d3mand_slam_count", String(next));
        setSlamCount(next);
      });
  };

  return (
    <section id="server-slam" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div
          ref={ref}
          className="relative overflow-hidden border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/[0.06] to-[var(--flame)]/[0.04] p-8 sm:p-12"
          style={{ borderLeftWidth: "3px", borderLeftColor: "var(--gold)" }}
        >
          <div className="absolute inset-0 opacity-50 [background:repeating-linear-gradient(90deg,transparent,transparent_100px,rgba(201,168,76,0.025)_100px,rgba(201,168,76,0.025)_101px)]" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[var(--flame)]">
              <Zap className="size-3 fill-[var(--flame)] stroke-none" />
              Opération Server Slam
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--gold)] mb-8 tracking-wide">
              Monument of Triumph — Dernière mise à jour de Destiny 2
            </h2>

            <Countdown />

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
              Le{" "}
              <strong className="text-[var(--gold)]">9 juin 2026</strong>,
              connectez-vous massivement à Destiny 2 — anciens gardiens
              inclus. L'objectif : saturer les serveurs et prouver à Sony que
              la communauté est{" "}
              <strong className="text-[var(--foreground)]">
                massive, active et mobilisable
              </strong>
              . Des chiffres d'engagement record valent plus que mille
              signatures.
            </p>

            {/* Compteur Server Slam */}
            <div className="mt-8 flex flex-col items-start gap-4">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[var(--gold-dim)]">
                Gardiens mobilisés pour le 9 juin
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                {/* Compteur animé */}
                <div className="font-display text-5xl sm:text-6xl font-black text-[var(--gold)] leading-none tabular-nums"
                  style={{ textShadow: "0 0 40px rgba(201,168,76,0.5)" }}
                >
                  {loading ? (
                    <span className="opacity-40">—</span>
                  ) : (
                    <AnimatedCounter
                      target={slamCount}
                      format={(n) => n.toLocaleString("fr-FR")}
                    />
                  )}
                </div>

                {/* Bouton ou confirmation */}
                {!voted ? (
                  <button
                    onClick={joinSlam}
                    className="clip-bevel inline-flex items-center gap-2 bg-[var(--flame)] px-6 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <span className="relative inline-flex">
                      <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
                      <span className="relative size-1.5 rounded-full bg-white" />
                    </span>
                    Je serai là le 9 juin
                  </button>
                ) : (
                  <div className="font-mono text-[0.7rem] tracking-[0.15em] text-green-400">
                    ✅ CONFIRMÉ — À toi de jouer Gardien. Partage le hub.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
