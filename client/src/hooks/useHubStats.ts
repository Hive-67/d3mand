import { useEffect, useState } from "react";

const SHEET_KEY = "d3mand_sheet_url";

export type HubStats = { hours: number | null; cost: number | null };

export function useHubStats(): HubStats {
  const [stats, setStats] = useState<HubStats>({ hours: null, cost: null });

  useEffect(() => {
    const url = (() => { try { return localStorage.getItem(SHEET_KEY); } catch { return null; } })();
    if (!url) return;
    fetch(url)
      .then((r) => r.text())
      .then((text) => {
        const result: HubStats = { hours: null, cost: null };
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
