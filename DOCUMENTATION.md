# D3MAND — Documentation Technique Complète

> **Version documentée :** `a77d6a3a` — Mai 2026
> **Auteur :** Généré automatiquement à partir du code source du projet.

---

## Table des matières

1. [Architecture du projet](#1-architecture-du-projet)
2. [Déploiement](#2-déploiement)
3. [Google Sheets — Synchronisation en direct](#3-google-sheets--synchronisation-en-direct)
4. [SEO](#4-seo)
5. [Comment modifier le site](#5-comment-modifier-le-site)
6. [Comment ajouter une nouvelle pétition](#6-comment-ajouter-une-nouvelle-pétition)
7. [Problèmes connus et points d'attention](#7-problèmes-connus-et-points-dattention)
8. [Relancer le projet depuis zéro](#8-relancer-le-projet-depuis-zéro)

---

## 1. Architecture du projet

### Stack technique

| Couche | Technologie |
| :--- | :--- |
| Framework | React 19 (SPA, client-only) |
| Build tool | Vite 7 |
| Styles | Tailwind CSS 4 + CSS variables personnalisées |
| Composants UI | shadcn/ui (Radix primitives) |
| Animations | Framer Motion + CSS transitions |
| Routing | Wouter (SPA, une seule route `/`) |
| Données | Google Sheets CSV public (fetch natif) |
| Polices | Orbitron, Rajdhani, Space Mono (Google Fonts) |
| Hébergement | Manus Web (static) |

### Arborescence complète

```
d3mand/
├── client/
│   ├── index.html                        ← Head HTML : SEO, meta OG, polices
│   ├── public/                           ← Fichiers statiques servis à la racine
│   └── src/
│       ├── main.tsx                      ← Point d'entrée React
│       ├── App.tsx                       ← Routing (Wouter) + ThemeProvider dark
│       ├── index.css                     ← Système de design complet (variables CSS, polices, utilitaires)
│       ├── const.ts                      ← Constantes partagées
│       │
│       ├── pages/
│       │   ├── Home.tsx                  ← ★ PAGE PRINCIPALE — assemblage + logique Google Sheets
│       │   └── NotFound.tsx              ← Page 404
│       │
│       ├── components/
│       │   ├── Nav.tsx                   ← Barre de navigation sticky (liens ancres + CTA Signer)
│       │   ├── Starfield.tsx             ← Fond étoilé animé (Canvas API, ~150 étoiles)
│       │   ├── AnimatedCounter.tsx       ← Compteur animé count-up (Framer Motion)
│       │   ├── Countdown.tsx             ← Compte à rebours live vers le 9 juin 2026
│       │   ├── Footer.tsx                ← Pied de page (disclaimer, sources, hashtags)
│       │   ├── SyncBar.tsx               ← Bandeau de statut Google Sheets (bas de page)
│       │   ├── SetupModal.tsx            ← Modal de configuration de l'URL CSV
│       │   ├── ErrorBoundary.tsx         ← Gestion des erreurs React
│       │   ├── ManusDialog.tsx           ← Composant dialogue Manus (template)
│       │   ├── Map.tsx                   ← Composant carte Google Maps (non utilisé)
│       │   │
│       │   ├── sections/                 ← Sections de la page, dans l'ordre d'affichage
│       │   │   ├── Hero.tsx              ← ★ Section héro (wordmark D3MAND, manifeste, métriques)
│       │   │   ├── StatsBar.tsx          ← Bandeau de statistiques clés (5 colonnes)
│       │   │   ├── ServerSlamSection.tsx ← Section Server Slam + compte à rebours
│       │   │   ├── PetitionsSection.tsx  ← ★ Grille des pétitions avec barres de progression
│       │   │   ├── ArgumentsSection.tsx  ← 6 arguments numérotés (pourquoi D3 est viable)
│       │   │   ├── ToolsSection.tsx      ← Générateur de messages + outils d'action
│       │   │   └── KitSection.tsx        ← Kit presse / créateurs + code embed
│       │   │
│       │   └── ui/                       ← Composants shadcn/ui (accordion, button, card, etc.)
│       │
│       ├── hooks/
│       │   ├── useReveal.ts              ← Intersection Observer pour animations au scroll
│       │   ├── useMobile.tsx             ← Détection mobile (breakpoint 768px)
│       │   ├── useComposition.ts         ← Hook composition IME
│       │   └── usePersistFn.ts           ← Référence stable de fonction
│       │
│       ├── lib/
│       │   ├── petitions.ts              ← ★ Données des pétitions + fetchSheet (CSV)
│       │   ├── messages.ts               ← Messages pré-rédigés par plateforme
│       │   └── utils.ts                  ← Utilitaire cn() (clsx + tailwind-merge)
│       │
│       └── contexts/
│           └── ThemeContext.tsx          ← Contexte de thème (dark par défaut, non switchable)
│
├── server/                               ← Placeholder (non utilisé en web-static)
├── shared/                               ← Placeholder (non utilisé en web-static)
├── DOCUMENTATION.md                      ← Ce fichier
├── package.json                          ← Dépendances et scripts npm/pnpm
├── vite.config.ts                        ← Configuration Vite
├── tsconfig.json                         ← Configuration TypeScript
└── .project-config.json                  ← Métadonnées Manus (port, build command, etc.)
```

### Flux de données

```
Google Sheets (CSV public)
        ↓  fetch() toutes les 5 min
  Home.tsx (état global : sigs, syncState)
        ↓  props
  Hero.tsx          → totalSignatures (somme de toutes les pétitions)
  StatsBar.tsx      → mainSigs (pétition principale uniquement)
  PetitionsSection  → sigs (objet complet par ID)
```

---

## 2. Déploiement

### Hébergeur

Le site est hébergé sur **Manus Web** (infrastructure statique managée). Il n'y a pas de serveur backend actif — le site est une SPA purement client.

### URL de prévisualisation (développement)

```
https://3000-i2d4q9vbxensecqdtcx4m-cf6dd0d5.us1.manus.computer
```

### Publier le site

Le site n'est pas encore publié publiquement. Pour le déployer :

1. Dans l'interface Manus, cliquer sur le bouton **Publish** (en haut à droite du panneau de gestion).
2. Un checkpoint doit exister avant de pouvoir publier (le dernier checkpoint est `a77d6a3a`).
3. Après publication, une URL publique de type `*.manus.space` sera attribuée.

### Domaine personnalisé

Pour utiliser un domaine personnalisé (ex. `d3mand.gg`) :

1. Dans l'interface Manus → **Settings** → **Domains**.
2. Ajouter votre domaine et suivre les instructions DNS.
3. Manus gère automatiquement le certificat **HTTPS** (Let's Encrypt).

### Configuration DNS requise (domaine externe)

| Type | Nom | Valeur |
| :--- | :--- | :--- |
| `CNAME` | `@` ou `www` | Fourni par Manus après configuration |

> **Note :** Si vous utilisez un registrar qui ne supporte pas les CNAME à la racine (`@`), utilisez un enregistrement `ALIAS` ou `ANAME` à la place.

### HTTPS

Le HTTPS est géré automatiquement par Manus. Aucune configuration manuelle n'est requise.

---

## 3. Google Sheets — Synchronisation en direct

### URL CSV connectée

```
https://docs.google.com/spreadsheets/d/e/2PACX-1vTulkDy0R_Udv61t_z6lsjAypGkJ7o_FwzP4Mh1wYzRr3fuT9bP8F2rxnYRGdqJGtUC17JdnkBn1XYb/pub?gid=768808710&single=true&output=csv
```

Cette URL est codée en dur dans `client/src/pages/Home.tsx` (ligne 27, constante `DEFAULT_CSV_URL`). Elle peut être surchargée par l'utilisateur via le modal de configuration (les préférences sont sauvegardées dans le `localStorage` du navigateur sous la clé `d3mand_sheet_id`).

### Structure attendue du Google Sheet

L'onglet publié doit contenir **4 colonnes sans en-tête**, dans cet ordre exact :

| Colonne A | Colonne B | Colonne C | Colonne D |
| :--- | :--- | :--- | :--- |
| `id` de la pétition | Nom (ignoré) | Nombre de signatures | Objectif |

**Exemple de contenu actuel :**

```
main,Harley Casto,122000,150000
p2,SONY/BUNGIE MAKE US D3,2674,5000
p3,Urge Sony & Bungie,172,1000
```

> **Important :** Les IDs de la colonne A (`main`, `p2`, `p3`, `p4`) doivent correspondre exactement aux IDs définis dans `client/src/lib/petitions.ts`. Toute ligne avec un ID inconnu est ignorée silencieusement.

### Comment mettre à jour les chiffres

**Méthode recommandée (manuelle) :**

1. Ouvrir le Google Sheet : `https://docs.google.com/spreadsheets/d/1vz59L_QOXbeFdzIB-kLpZNGZJbueczlV2GWx6lxj8hE/edit`
2. Modifier les valeurs de la colonne C (signatures).
3. Sauvegarder. Les changements seront visibles sur le site dans les **5 minutes** (intervalle de rafraîchissement automatique).

**Rafraîchissement forcé :**

Le site se synchronise automatiquement toutes les 5 minutes. Il n'y a pas de bouton de rafraîchissement manuel exposé à l'utilisateur.

### Reconfigurer l'URL CSV (si le Sheet change)

Si vous devez changer de Sheet ou d'URL CSV :

1. Sur le site, la barre de statut en bas à droite affiche l'état de la sync.
2. En cas d'erreur, cliquer sur la barre ouvre le **modal de configuration**.
3. Coller la nouvelle URL CSV et cliquer **Appliquer**.

Pour modifier l'URL par défaut dans le code source, éditer la ligne 27 de `client/src/pages/Home.tsx` :

```ts
const DEFAULT_CSV_URL = "VOTRE_NOUVELLE_URL_CSV_ICI";
```

---

## 4. SEO

### Ce qui est en place

| Élément | Statut | Détail |
| :--- | :--- | :--- |
| `<title>` | ✅ | "D3MAND — The Destiny 3 Community Hub \| Toutes les pétitions pour Destiny 3" |
| `<meta description>` | ✅ | Description complète en français |
| `<meta keywords>` | ✅ | 9 mots-clés ciblés (Destiny 3, pétition, Server Slam…) |
| `<meta robots>` | ✅ | `index, follow` |
| `<meta theme-color>` | ✅ | `#C9A84C` (or Traveler) |
| Open Graph (`og:*`) | ✅ | Titre, description, image 1200×630, locale `fr_FR` |
| Twitter Card | ✅ | `summary_large_image`, titre, description, image |
| Schema.org JSON-LD | ✅ | Type `WebSite` + `VideoGame` (Destiny 3) |
| Favicon | ✅ | SVG inline (symbole ✦) |
| `lang="fr"` | ✅ | Déclaré sur `<html>` |
| `<link rel="canonical">` | ❌ | **Absent** — à ajouter après publication avec le domaine final |
| Sitemap | ❌ | Non généré automatiquement (SPA statique) |
| `robots.txt` | ❌ | Non présent dans `client/public/` |

### Ajouter le canonical (après publication)

Une fois votre domaine final connu, ajouter dans `client/index.html` à l'intérieur de `<head>` :

```html
<link rel="canonical" href="https://votre-domaine.gg/" />
```

Et mettre à jour les URLs Open Graph :

```html
<meta property="og:url" content="https://votre-domaine.gg/" />
```

### Créer et soumettre un sitemap à Google

**Étape 1 — Créer le fichier sitemap**

Créer `client/public/sitemap.xml` avec ce contenu (remplacer le domaine) :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votre-domaine.gg/</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Étape 2 — Créer robots.txt**

Créer `client/public/robots.txt` :

```
User-agent: *
Allow: /
Sitemap: https://votre-domaine.gg/sitemap.xml
```

**Étape 3 — Soumettre à Google Search Console**

1. Aller sur [Google Search Console](https://search.google.com/search-console).
2. Ajouter votre propriété (domaine ou URL).
3. Vérifier la propriété (méthode recommandée : fichier HTML dans `client/public/`).
4. Dans le menu gauche → **Sitemaps** → coller `https://votre-domaine.gg/sitemap.xml` → **Envoyer**.

---

## 5. Comment modifier le site

### Changer les textes du héro

Fichier : `client/src/components/sections/Hero.tsx`

| Élément | Localisation dans le fichier |
| :--- | :--- |
| Eyebrow (`// INITIATIVE MONDIALE…`) | Ligne ~30 |
| Sous-titre (`WE DEMAND DESTINY 3`) | Ligne ~40 |
| Texte du manifeste | Bloc `<p>` contenant "Toutes les pétitions réunies" |
| Chiffre "+122 000 Gardiens" | Texte en dur dans le `<strong>` du manifeste |
| Lien de la pétition principale (bouton CTA) | `href` du premier bouton |
| Date du Server Slam dans l'encart | Texte "9 JUIN 2026" |
| Hashtags bas droite | Tableau `HASHTAGS` en haut du fichier |

### Changer les couleurs

Fichier : `client/src/index.css` — section `:root` (lignes 50–83)

| Variable | Couleur actuelle | Rôle |
| :--- | :--- | :--- |
| `--gold` | `oklch(0.78 0.13 85)` ≈ `#C9A84C` | Or principal (titres, accents) |
| `--gold-light` | `oklch(0.86 0.14 85)` ≈ `#F0C96A` | Or clair (hover, highlights) |
| `--gold-dim` | `oklch(0.5 0.09 80)` ≈ `#7A5F28` | Or sombre (bordures, séparateurs) |
| `--flame` | `oklch(0.7 0.2 40)` ≈ `#FF6B35` | Orange alarme (Server Slam, alertes) |
| `--cobalt` | `oklch(0.65 0.18 265)` ≈ `#4A7BFF` | Bleu secondaire (données, barres) |
| `--black` | `oklch(0.1 0.01 250)` ≈ `#080A0E` | Noir spatial (fond le plus sombre) |
| `--dark` | `oklch(0.14 0.015 250)` ≈ `#0C0F17` | Fond principal |

> **Format :** Tailwind 4 utilise le format OKLCH. Pour convertir un hex en OKLCH, utiliser [oklch.com](https://oklch.com).

### Changer les polices

Fichier : `client/index.html` — balise `<link>` Google Fonts (ligne 53)
Fichier : `client/src/index.css` — variables `--font-display`, `--font-body`, `--font-mono`

| Variable | Police actuelle | Usage |
| :--- | :--- | :--- |
| `--font-display` | Orbitron | Titres, wordmark, métriques |
| `--font-body` | Rajdhani | Corps de texte, paragraphes |
| `--font-mono` | Space Mono | Tags `//`, hashtags, code |

### Changer les messages pré-rédigés (section Outils)

Fichier : `client/src/lib/messages.ts`

Chaque plateforme (`twitter`, `reddit`, `youtube`, `sony`, `discord`) possède une entrée dans l'objet `MESSAGES`. Modifier directement le texte de la plateforme souhaitée.

### Changer les arguments (section Arguments)

Fichier : `client/src/components/sections/ArgumentsSection.tsx`

Les 6 arguments sont définis dans un tableau `ARGUMENTS` en haut du fichier. Chaque entrée contient : `num` (numéro), `title`, `body`, et optionnellement `stat`.

### Changer le kit presse / créateurs

Fichier : `client/src/components/sections/KitSection.tsx`

Le tableau `KIT` contient les éléments du kit (points de langage, angles, sources, CTA). Le code embed HTML est dans la constante `EMBED_CODE`.

### Changer les liens de navigation

Fichier : `client/src/components/Nav.tsx`

Le tableau `NAV_LINKS` (lignes 4–10) contient les ancres de navigation. Le CTA "Signer" pointe vers la pétition principale Change.org.

---

## 6. Comment ajouter une nouvelle pétition

L'ajout d'une pétition nécessite des modifications dans **deux fichiers**.

### Étape 1 — Déclarer l'ID et les métadonnées

Fichier : `client/src/lib/petitions.ts`

**1a.** Ajouter le nouvel ID au type `PetitionId` :

```ts
// Avant
export type PetitionId = "main" | "p2" | "p3" | "p4";

// Après (exemple avec p5)
export type PetitionId = "main" | "p2" | "p3" | "p4" | "p5";
```

**1b.** Ajouter l'entrée dans le tableau `PETITIONS` :

```ts
{
  id: "p5",
  title: "Titre de la nouvelle pétition",
  author: "Nom de l'auteur",
  date: "Date · Change.org",
  goal: 1000,                                    // Objectif de signatures
  href: "https://www.change.org/p/votre-lien",  // Lien Change.org
},
```

**1c.** Ajouter la valeur fallback dans `FALLBACK_SIGS` :

```ts
export const FALLBACK_SIGS: Record<PetitionId, number> = {
  main: 122000,
  p2: 2674,
  p3: 172,
  p4: 16,
  p5: 0,   // ← ajouter cette ligne
};
```

### Étape 2 — Ajouter la ligne dans le Google Sheet

Dans votre Google Sheet, ajouter une nouvelle ligne :

```
p5,Titre de la pétition,0,1000
```

> La colonne A doit contenir exactement le même ID que celui déclaré dans `petitions.ts`. La colonne C (signatures) sera mise à jour manuellement ou automatiquement selon votre processus.

### Étape 3 — Vérifier l'affichage

La nouvelle pétition apparaîtra automatiquement dans la grille de `PetitionsSection.tsx` puisque celle-ci itère sur le tableau `PETITIONS`. Aucune modification de `PetitionsSection.tsx` n'est nécessaire pour les pétitions standards.

> **Note :** `PetitionsSection.tsx` contient également des cartes "historiques" et "connexes" codées en dur (pétitions fermées ou archivées). Ces cartes sont indépendantes du tableau `PETITIONS` et doivent être éditées manuellement dans le fichier si besoin.

---

## 7. Problèmes connus et points d'attention

### CORS et Google Sheets

La synchronisation utilise `fetch()` côté navigateur vers une URL CSV publique Google. Ce mécanisme fonctionne uniquement si le Sheet est **publié sur le web** (Fichier → Partager → Publier sur le web). Si le Sheet est simplement "partagé avec lien" (lecture seule), la requête échouera avec une erreur CORS ou une redirection vers une page de connexion.

**Symptôme :** La barre de statut affiche "Erreur de sync".
**Solution :** Vérifier que le Sheet est bien publié (pas seulement partagé) et que l'URL commence par `https://docs.google.com/spreadsheets/d/e/2PACX-`.

### Chiffres affichés vs chiffres réels

Le site affiche les chiffres du Google Sheet, pas les chiffres en temps réel de Change.org. Il faut mettre à jour le Sheet manuellement (ou via un script d'automatisation) pour que les compteurs restent à jour.

### Valeurs fallback

Si la synchronisation échoue (réseau, Sheet non publié, URL invalide), le site affiche les valeurs codées en dur dans `FALLBACK_SIGS` :

```ts
main: 122000,  p2: 2674,  p3: 172,  p4: 16
```

Ces valeurs doivent être maintenues à jour manuellement dans `petitions.ts` pour rester pertinentes en cas de panne.

### Canonical et og:url manquants

Le `<link rel="canonical">` et la balise `<meta property="og:url">` ne sont pas encore configurés car le domaine final n'est pas encore défini. **À ajouter impérativement** après publication pour éviter les problèmes de duplicate content et optimiser le partage sur les réseaux sociaux.

### Date du Server Slam codée en dur

La date "9 JUIN 2026" est présente à plusieurs endroits dans le code (Hero, Nav, ServerSlamSection, StatsBar). Si l'événement est reporté, il faudra effectuer une recherche globale (`grep -r "9 juin\|9 JUIN\|June 9"`) et mettre à jour toutes les occurrences.

### Pas de sitemap ni de robots.txt

Ces deux fichiers ne sont pas encore présents dans `client/public/`. Voir la [section SEO](#4-seo) pour les créer.

### Rafraîchissement toutes les 5 minutes

L'intervalle de sync est fixé à 5 minutes (`5 * 60 * 1000` ms dans `Home.tsx`). Pour les périodes de forte activité (ex. jour du Server Slam), il peut être utile de réduire cet intervalle à 1 minute, en modifiant cette valeur.

---

## 8. Relancer le projet depuis zéro

### Prérequis

- Node.js ≥ 18
- pnpm ≥ 10 (`npm install -g pnpm`)
- Git

### Cloner et installer

```bash
# Télécharger le code (via l'interface Manus → Code → Download ZIP, ou GitHub export)
cd d3mand
pnpm install
```

### Lancer en développement

```bash
pnpm run dev
# → http://localhost:3000
```

### Builder pour la production

```bash
pnpm run build
# Génère dist/ (frontend statique)
```

### Variables d'environnement

Le projet est purement statique et ne nécessite **aucune variable d'environnement** pour fonctionner. Les variables `VITE_ANALYTICS_*` sont injectées automatiquement par Manus pour l'analytics (Umami) et ne sont pas nécessaires en développement local.

### Reconfigurer le Google Sheet

Si vous repartez de zéro avec un nouveau Sheet :

1. Créer un nouveau Google Sheet avec la structure décrite en [section 3](#3-google-sheets--synchronisation-en-direct).
2. Le publier en CSV (Fichier → Partager → Publier sur le web → Format CSV).
3. Copier l'URL CSV publique (commence par `https://docs.google.com/spreadsheets/d/e/2PACX-`).
4. Remplacer la valeur de `DEFAULT_CSV_URL` dans `client/src/pages/Home.tsx` (ligne 27).

### Déployer sur Manus

1. Créer un checkpoint via l'interface Manus ou la commande interne.
2. Cliquer sur **Publish** dans l'interface Manus.
3. Configurer le domaine dans **Settings → Domains**.

### Déployer sur un hébergeur tiers (Netlify, Vercel, etc.)

> **Attention :** Manus propose un hébergement intégré avec support de domaines personnalisés. L'usage d'un hébergeur tiers peut entraîner des incompatibilités avec certaines fonctionnalités Manus.

```bash
pnpm run build
# Déployer le dossier dist/ sur votre hébergeur
# Configurer la règle de redirect : /* → /index.html (SPA)
```

Pour Netlify, créer `client/public/_redirects` :

```
/*    /index.html   200
```

---

*Documentation générée le 25 mai 2026 — Projet D3MAND v`a77d6a3a`.*
