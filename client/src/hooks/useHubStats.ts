import { useEffect, useState } from "react";

const SHEET_KEY = "d3mand_sheet_url";

// Fallback values — displayed when no Sheet is configured or fetch fails
const FALLBACK_HOURS = 37;
const FALLBACK_COST = 140;

export type HubStats = { hours: number; cost: number };

export function useHubStats(): HubStats {
  const [stats, setStats] = useState<HubStats>({ hours: FALLBACK_HOURS, cost: FALLBACK_COST });

  useEffect(() => {
    const url = (() => { try { return localStorage.getItem(SHEET_KEY); } catch { return null; } })();
    if (!url) return;
    fetch(url)
      .then((r) => r.text())
      .then((text) => {
        const result: HubStats = { hours: FALLBACK_HOURS, cost: FALLBACK_COST };
        text.trim().split("\n").forEach((line) => {
          const [id, , val] = line.split(",");
          const n = parseInt(val?.trim());
          if (id?.trim() === "hours" && !isNaN(n)) result.hours = n;
          if (id?.trim() === "cost" && !isNaN(n)) result.cost = n;
        });
        setStats(result);
      })
      .catch(() => {});
  }, []);

  return stats;
}
