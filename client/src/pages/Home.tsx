/*
 * D3MAND — Guardian's Codex / Home
 * Assemblage final : Nav + Hero + StatsBar + ServerSlam + Petitions + Args + Tools + Kit + Footer.
 * Background: Starfield Canvas + noise overlay + radial gradients.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Starfield from "@/components/Starfield";
import SetupModal from "@/components/SetupModal";
import AboutSection from "@/components/sections/AboutSection";
import ArgumentsSection from "@/components/sections/ArgumentsSection";
import Hero from "@/components/sections/Hero";
import GuestbookSection from "@/components/sections/GuestbookSection";
import KitSection from "@/components/sections/KitSection";
import VideosSection from "@/components/sections/VideosSection";
import PetitionsSection from "@/components/sections/PetitionsSection";
import ServerSlamSection from "@/components/sections/ServerSlamSection";
import StatsBar from "@/components/sections/StatsBar";
import ToolsSection from "@/components/sections/ToolsSection";
import {
  fetchSheet,
  FALLBACK_SIGS,
  type PetitionId,
  type SyncState,
} from "@/lib/petitions";

const STORAGE_KEY = "d3mand_sheet_id";
const DEFAULT_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTulkDy0R_Udv61t_z6lsjAypGkJ7o_FwzP4Mh1wYzRr3fuT9bP8F2rxnYRGdqJGtUC17JdnkBn1XYb/pub?gid=768808710&single=true&output=csv";

export default function Home() {
  const [csvUrl, setCsvUrl] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_CSV_URL;
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CSV_URL;
  });
  const [sigs, setSigs] = useState<Record<PetitionId, number>>(FALLBACK_SIGS);
  const [syncState, setSyncState] = useState<SyncState>("loading");
  const [syncLabel, setSyncLabel] = useState("Synchronisation...");
  const [setupOpen, setSetupOpen] = useState(false);

  const total = useMemo(
    () => Object.values(sigs).reduce((a, b) => a + b, 0),
    [sigs],
  );

  const sync = useCallback(async () => {
    if (!csvUrl) {
      setSyncState("fallback");
      setSyncLabel("Données de référence (offline)");
      setSigs(FALLBACK_SIGS);
      return;
    }
    setSyncState("loading");
    setSyncLabel("Synchronisation...");
    try {
      const data = await fetchSheet(csvUrl);
      if (!data) throw new Error("no data");
      const next: Record<PetitionId, number> = { ...FALLBACK_SIGS };
      (Object.keys(next) as PetitionId[]).forEach((k) => {
        if (data[k]) next[k] = data[k].sigs;
      });
      setSigs(next);
      setSyncState("ok");
      const time = new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setSyncLabel(`Mis à jour à ${time}`);
    } catch (err) {
      console.error("Sheet error", err);
      setSyncState("error");
      setSyncLabel("Erreur de sync — cliquer pour reconfigurer");
      setSigs(FALLBACK_SIGS);
    }
  }, [csvUrl]);

  useEffect(() => {
    sync();
    if (!csvUrl) return;
    const id = window.setInterval(sync, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [sync, csvUrl]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") setSetupOpen(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const onApply = (url: string) => {
    localStorage.setItem(STORAGE_KEY, url);
    setCsvUrl(url);
    setSetupOpen(false);
  };

  return (
    <div id="top" className="relative min-h-screen text-[var(--foreground)]">
      <Starfield />
      <div className="relative z-10">
        <Nav />
        <Hero totalSignatures={total} />
        <AboutSection />
        <StatsBar mainSigs={sigs.main} />
        <ServerSlamSection />
        <PetitionsSection sigs={sigs} />
        <ArgumentsSection />
        <ToolsSection />
        <KitSection />
        <VideosSection />
        <GuestbookSection />
        <Footer />
      </div>

      <SetupModal
        open={setupOpen}
        initialId={csvUrl}
        onClose={() => setSetupOpen(false)}
        onApply={onApply}
      />
    </div>
  );
}
