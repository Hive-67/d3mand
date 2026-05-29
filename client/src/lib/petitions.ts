export type PetitionId = "main" | "p2";

export type PetitionEntry = {
  id: PetitionId;
  title: string;
  author: string;
  date: string;
  goal: number;
  href: string;
  altLinks?: { label: string; href: string }[];
  featured?: boolean;
};

export const PETITIONS: PetitionEntry[] = [
  {
    id: "main",
    title: "Petition Sony to develop Destiny 3",
    author: "Harley Casto",
    date: "22 mai 2026 · Change.org",
    goal: 300000,
    href: "https://c.org/GxQHNMQCH6",
    altLinks: [
      { label: "Lien alternatif", href: "https://c.org/GNQ4tScJhB" },
      { label: "Lien communauté", href: "https://c.org/4FsNc2xKjf" },
    ],
    featured: true,
  },
  {
    id: "p2",
    title: "SONY/BUNGIE MAKE US D3",
    author: "amburr.",
    date: "22 mai 2026 · Change.org",
    goal: 5000,
    href: "https://www.change.org/p/sony-bungie-make-us-d3",
  },
];

export const FALLBACK_SIGS: Record<PetitionId, number> = {
  main: 300000,
  p2: 5200,
};

export type SyncState = "loading" | "ok" | "error" | "fallback";

export type SheetData = {
  sigs: Record<PetitionId, number>;
  total: number;
  state: SyncState;
  lastUpdate: string | null;
};

export async function fetchSheet(csvUrl: string): Promise<Record<PetitionId, { sigs: number; goal: number }> | null> {
  if (!csvUrl) return null;
  const res = await fetch(csvUrl);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const text = await res.text();
  if (!text.trim()) throw new Error("Sheet vide");

  const data: Record<string, { sigs: number; goal: number }> = {};
  const lines = text.trim().split("\n");
  lines.forEach((line) => {
    const [id, , sigs, goal] = line.split(",");
    if (id && sigs && goal) {
      data[id.trim()] = {
        sigs: parseInt(sigs.trim()) || 0,
        goal: parseInt(goal.trim()) || 200000,
      };
    }
  });
  return data as Record<PetitionId, { sigs: number; goal: number }>;
}
