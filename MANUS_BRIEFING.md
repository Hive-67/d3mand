# D3MAND — Briefing Manus

## 1. Récupérer le code

```bash
git clone https://github.com/hive-67/d3mand.git
cd d3mand
git checkout claude/site-visual-design-5LZF6
```

## 2. Installer et lancer en local

```bash
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

## 3. Stack technique

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS 4**
- Pas de backend — site 100% statique
- Les chiffres de pétitions se chargent depuis un **Google Sheet CSV** (configurable)
- Le livre d'or utilise un **Google Apps Script** (configurable)

---

## 4. Structure des fichiers importants

```
client/
├── public/
│   ├── guardian.png          ← Personnage gardien (section Manifeste)
│   └── destiny-logo.png      ← Logo Destiny (section Hero)
│
└── src/
    ├── lib/
    │   ├── translations.ts   ← TOUS les textes FR + EN du site
    │   ├── messages.ts       ← Messages copiables (Twitter, Reddit, YouTube, Sony, Discord)
    │   └── petitions.ts      ← Chiffres de pétitions (fallback si Google Sheet absent)
    │
    ├── components/
    │   ├── Nav.tsx           ← Navigation + toggle FR/EN + clic logo = copie URL
    │   ├── Footer.tsx        ← Footer + compteur de visites
    │   ├── Countdown.tsx     ← Compte à rebours Server Slam (9 juin 2026 18h00)
    │   └── sections/
    │       ├── Hero.tsx            ← Page d'accueil principale
    │       ├── AboutSection.tsx    ← Manifeste + countdown 2 ans + formulaire contact
    │       ├── PetitionsSection.tsx← Liste des pétitions avec chiffres live
    │       ├── ServerSlamSection.tsx← Compte à rebours 9 juin
    │       ├── ArgumentsSection.tsx← Arguments pour Sony
    │       ├── ToolsSection.tsx    ← Générateur de messages FR/EN à copier-coller
    │       ├── KitSection.tsx      ← Kit YouTubeur/Presse + code embed
    │       ├── VideosSection.tsx   ← Vidéos communauté (onglets Adieux / Info)
    │       └── GuestbookSection.tsx← Livre d'or avec modération
    │
    ├── contexts/
    │   └── LanguageContext.tsx  ← Système FR/EN global
    │
    └── pages/
        └── Home.tsx             ← Assemblage de toutes les sections
```

---

## 5. Modifications fréquentes

### Mettre à jour les chiffres de pétitions (fallback)
Fichier : `client/src/lib/petitions.ts`
```ts
export const FALLBACK_SIGS = {
  main: 300000,   // ← Changer ici
  p2: 5200,
  p3: 310,
  p4: 20,
};
```

### Ajouter une vidéo d'adieu
Fichier : `client/src/components/sections/VideosSection.tsx`
```ts
const FAREWELL: VideoEntry[] = [
  { id: "B7yh77LOd24", url: "https://youtube.com/shorts/B7yh77LOd24", short: true },
  // Ajouter ici : { id: "YOUTUBE_ID", url: "https://youtu.be/YOUTUBE_ID" }
];
```
L'ID YouTube se trouve dans l'URL : `youtube.com/watch?v=CECI_EST_L_ID`

### Ajouter une vidéo d'info
Même fichier, tableau `INFO` :
```ts
const INFO: VideoEntry[] = [
  // { id: "YOUTUBE_ID", url: "https://youtu.be/YOUTUBE_ID" }
];
```

### Modifier un texte du site
Fichier : `client/src/lib/translations.ts`
Toutes les traductions FR et EN sont dans ce fichier unique.
Structure : `t.fr.nomSection.nomClé` et `t.en.nomSection.nomClé`

### Modifier les messages copiables (générateur)
Fichier : `client/src/lib/messages.ts`
- `MESSAGES` = versions françaises
- `MESSAGES_EN` = versions anglaises
- Plateformes : `twitter`, `reddit`, `youtube`, `sony`, `discord`

---

## 6. Fonctionnalité admin (invisible aux visiteurs)

**Raccourci : `Ctrl + Shift + A`** depuis n'importe quelle page

Ouvre un panel pour configurer :

**1. Google Sheet (chiffres pétitions en temps réel)**
- Créer un Google Sheet avec colonnes : `id, name, signatures, goal`
- Fichier → Publier sur le web → Format CSV
- Coller l'URL dans le panel

**2. Google Apps Script (livre d'or)**
- Ouvrir Google Apps Script sur le même Sheet
- Coller ce code et déployer (Accès : Tout le monde) :

```javascript
const SHEET = "Guestbook";
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const s = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET) ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET);
  if (!s.getLastRow()) s.appendRow(["Date","Nom","Message","Statut"]);
  s.appendRow([new Date().toISOString(), d.name||"Anonyme", d.message, "pending"]);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
  if (!s) return ContentService.createTextOutput("[]")
    .setMimeType(ContentService.MimeType.JSON);
  const msgs = s.getDataRange().getValues().slice(1)
    .filter(r => r[3]==="approved")
    .map(r => ({date:r[0],name:r[1],message:r[2]}));
  return ContentService.createTextOutput(JSON.stringify(msgs))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- Coller l'URL du déploiement dans le panel admin
- **Pour approuver un message** : dans l'onglet "Guestbook" du Sheet, changer `pending` → `approved` dans la colonne D

---

## 7. Infos importantes

| Élément | Valeur |
|---|---|
| Site | https://d3mandhub.com/ |
| Email contact | coalition.destiny@gmail.com |
| Logo = clic | Copie https://d3mandhub.com/ dans le presse-papier |
| Langue | Toggle FR/EN en haut à droite de la nav |
| Server Slam | 9 juin 2026 à 18h00 Paris (UTC+2) |
| Compteur de visites | Via counterapi.dev, s'affiche dans le footer |

---

## 8. Images à conserver

| Fichier | Emplacement | Usage |
|---|---|---|
| `guardian.png` | `client/public/` | Gardien section Manifeste |
| `destiny-logo.png` | `client/public/` | Logo Hero (déjà sans fond) |

Ces deux fichiers sont dans le dépôt git, aucune action nécessaire.
