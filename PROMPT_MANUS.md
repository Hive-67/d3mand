# Prompt pour Manus — Site D3MAND

## 1. Récupérer le code

Le site est dans le dépôt GitHub suivant :

- **Repo :** `https://github.com/hive-67/d3mand`
- **Branche :** `claude/site-visual-design-5LZF6`

```bash
git clone https://github.com/hive-67/d3mand.git
cd d3mand
git checkout claude/site-visual-design-5LZF6
cd client
npm install --legacy-peer-deps
npm run dev
```

Le site tourne sur **http://localhost:3000**

Pour builder en production :
```bash
npm run build
# Les fichiers sont dans client/dist/
```

---

## 2. Stack technique

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS 4**
- Site **100% statique** (pas de backend)
- Les chiffres de pétitions se chargent depuis un **Google Sheet CSV** (configurable)
- Le livre d'or utilise un **Google Apps Script** (configurable)

---

## 3. Fichiers clés

| Fichier | Rôle |
|---|---|
| `client/src/lib/translations.ts` | **TOUS** les textes FR + EN du site |
| `client/src/lib/messages.ts` | Messages copiables (Twitter, Reddit, YouTube, Sony, Discord) |
| `client/src/lib/petitions.ts` | 2 pétitions actives + fallback des signatures |
| `client/src/pages/Home.tsx` | Assemblage de toutes les sections |
| `client/src/components/Nav.tsx` | Navigation + toggle FR/EN + clic logo = copie URL |
| `client/src/components/Footer.tsx` | Footer + compteur de visites |
| `client/src/components/Countdown.tsx` | Compte à rebours Server Slam (9 juin 2026 18h00) |
| `client/src/components/sections/` | Toutes les sections de la page |

---

## 4. État actuel du site (sections dans l'ordre)

1. **Hero** — titre « Destiny 3 », 4 métriques (signatures · 9 juin · $3.6B · −$765M), 3 boutons d'action
2. **Manifeste** — texte + compte à rebours 2 ans + panneau scrollable (Comment agir / Kit Créateurs / Timeline) + formulaire de contact
3. **StatsBar** — bande de stats (5 chiffres clés)
4. **Pétitions** — 2 pétitions avec barres de progression (live via Google Sheet)
5. **Server Slam** — compte à rebours 9 juin (placé sous les pétitions, **sans lien dans le nav** — à supprimer après le 9 juin)
6. **Arguments** — 6 arguments numérotés que Sony doit entendre
7. **Outils** — générateur de messages FR/EN + 6 cartes outils + contacts Sony/Bungie + code d'intégration
8. **Vidéos** — onglets Adieux / Info + suggestion par email
9. **Messages** — livre d'or modéré
10. **Footer** — disclaimer + compteur de visites (counterapi.dev)

---

## 5. RÈGLE IMPORTANTE — Tout est traduit FR/EN

Le toggle en haut à droite de la nav bascule **toutes** les sections entre français et anglais.

**Ne jamais mettre de texte codé en dur dans les composants.** Toujours passer par `translations.ts` et le hook `useLang()` :

```tsx
import { useLang } from "@/contexts/LanguageContext";

export default function MaSection() {
  const { T } = useLang();
  return <h2>{T.nomSection.nomCle}</h2>;
}
```

Structure dans `translations.ts` : `t.fr.nomSection.nomCle` et `t.en.nomSection.nomCle`
(les deux objets `fr` et `en` doivent toujours avoir exactement les mêmes clés).

---

## 6. Modifications fréquentes

### Mettre à jour les chiffres de pétitions (fallback)
Fichier : `client/src/lib/petitions.ts`
```ts
export const FALLBACK_SIGS = {
  main: 300000,   // ← Changer ici
  p2: 5200,
};
```

### Modifier un texte du site
Fichier : `client/src/lib/translations.ts` — tout est centralisé ici, FR et EN.

### Modifier les messages copiables (générateur)
Fichier : `client/src/lib/messages.ts`
- `MESSAGES` = versions françaises
- `MESSAGES_EN` = versions anglaises
- Plateformes : `twitter`, `reddit`, `youtube`, `sony`, `discord`

### Ajouter une vidéo
Fichier : `client/src/components/sections/VideosSection.tsx`
- Tableau `FAREWELL` = vidéos d'adieu
- Tableau `INFO` = vidéos d'info
- L'ID YouTube se trouve dans l'URL : `youtube.com/watch?v=ICI_L_ID`

### Supprimer le Server Slam (après le 9 juin 2026)
Dans `client/src/pages/Home.tsx`, retirer la ligne `<ServerSlamSection />`.

---

## 7. Panel admin (invisible aux visiteurs)

**Raccourci : `Ctrl + Shift + A`** depuis n'importe quelle page.

Ouvre un panel pour configurer :
1. **Google Sheet** (chiffres pétitions en temps réel) — colonnes : `id, name, signatures, goal`, publié en CSV
2. **Google Apps Script** (livre d'or) — coller l'URL de déploiement

---

## 8. Infos importantes

| Élément | Valeur |
|---|---|
| Site | https://d3mandhub.com/ |
| Email contact | coalition.destiny@gmail.com |
| Clic sur le logo | Copie https://d3mandhub.com/ dans le presse-papier |
| Langue | Toggle FR/EN en haut à droite de la nav |
| Server Slam | 9 juin 2026 à 18h00 Paris (UTC+2) |
| Compteur de visites | Via counterapi.dev, s'affiche dans le footer |

---

## 9. Images à conserver

| Fichier | Emplacement | Usage |
|---|---|---|
| `guardian.png` | `client/public/` | Gardien section Manifeste |
| `destiny-logo.png` | `client/public/` | Logo Hero (déjà sans fond) |

Ces deux fichiers sont déjà dans le dépôt git, aucune action nécessaire.
