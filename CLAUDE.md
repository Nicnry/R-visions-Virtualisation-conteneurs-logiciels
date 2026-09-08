# CLAUDE.md — guide pour un assistant IA travaillant sur ce dépôt

Ce site sert à réviser l'unité **63-41.2 — Virtualisation et conteneurs logiciels**
(module 63-41, examen écrit de 90 min, pondération 50% du module).

Il a été créé **avant le début réel du cours**. Toutes les fiches de théorie, tous
les exercices et toutes les questions de quiz ont été **déduits du seul intitulé /
descriptif officiel de l'unité**, pas d'un vrai support de cours. C'est le point le
plus important à garder en tête en travaillant sur ce dépôt.

## 1. Le principe : `source: "estime" | "confirme"`

Chaque item de contenu (`content/theory.ts`, `content/practice.ts`, `content/quiz.ts`)
porte un champ `source`:

- `"estime"` — contenu déduit/deviné, **pas encore confronté au vrai cours**. Affiché
  avec un tampon orange « à valider » dans l'UI (composant `SourceBadge`).
- `"confirme"` — contenu vérifié par rapport au support de cours réel (slides, notes
  de l'enseignant, TP donnés en classe...). Affiché avec un tampon vert « confirmé ».

**Tout nouveau contenu ajouté avant que le cours ait commencé doit rester `"estime"`.**

## 2. Quand le cours démarre réellement : procédure à suivre

Quand l'utilisateur fournit du vrai contenu de cours (notes, slides, énoncés de TP,
sujets d'examens passés, etc.), pour chaque fiche/exercice/question déjà présente :

1. **Comparer** le contenu existant avec le vrai contenu du cours.
2. **Si c'est confirmé et correct** → passer `source` à `"confirme"`. Corriger le texte
   si des détails diffèrent (terminologie exacte du prof, exemples utilisés en cours...).
3. **Si le sujet n'est finalement pas couvert par le cours** → supprimer l'entrée du
   fichier concerné (`content/theory.ts` / `practice.ts` / `quiz.ts`). Ne pas laisser de
   contenu hors périmètre traîner « au cas où » : ça nuit à la révision.
4. **Si un point du vrai cours n'est pas encore représenté ici** → l'ajouter en respectant
   exactement les interfaces de `content/types.ts` (voir section 3).

Objectif final : à la fin du cours, `source` devrait être `"confirme"` partout, et le
contenu doit refléter fidèlement ce qui a été réellement enseigné — ni plus, ni moins.

## 3. Comment ajouter du contenu

Pas besoin de toucher aux composants (`components/`) ni aux pages (`app/`) pour ajouter
du contenu : tout se passe dans `content/`.

- **Théorie** → ajouter un objet `TheorySection` dans `content/theory.ts`.
  `slug` unique (kebab-case), `category` cohérente avec celles déjà utilisées (voir
  `CATEGORIES` dans `content/types.ts` — en ajouter une nouvelle si un thème du cours ne
  rentre dans aucune catégorie existante).
- **Pratique** → ajouter un objet `PracticeExercise` dans `content/practice.ts`.
  `type` = `"commande"` (CLI/config à écrire), `"scenario"` (analyse/choix, pas de code),
  ou `"mixte"`. Le champ `solution` peut contenir plusieurs lignes (utiliser `\n`), il
  s'affiche dans un bloc façon terminal.
- **Quiz** → ajouter un objet `QuizQuestion` dans `content/quiz.ts`.
  ⚠️ `options` est un tableau dans un **ordre arbitraire fixé une fois pour toutes**, et
  `correctIndex` pointe vers la bonne réponse **dans cet ordre d'écriture**. Le mélange
  visuel (ordre des questions ET ordre des options) se fait automatiquement au moment de
  l'affichage via `lib/shuffle.ts` — ne jamais essayer de "pré-mélanger" les options
  soi-même, et ne jamais mettre systématiquement la bonne réponse en premier par
  flemme : `correctIndex` doit varier naturellement selon la question.

Après modification, `npm run build` doit passer sans erreur TypeScript (les interfaces
sont strictes exprès, pour éviter les fiches mal formées).

## 4. Architecture (repères rapides)

- `content/` — **Modèle** : uniquement des données typées, aucune logique d'affichage.
- `lib/` — **Contrôleur** : logique pure (mélange, agrégation par catégorie, stats),
  indépendante du rendu.
- `components/` — **Vue** : composants de présentation, y compris les composants
  interactifs client (`QuizPlayer`, `PracticeCard`).
- `app/` — routes Next.js (App Router) qui assemblent modèle + contrôleur + vue par page.

## 5. Identité visuelle (à respecter si tu ajoutes des composants)

Thème "conteneur / douane d'expédition" : cartes façon caisses (`crate-card`, ombre
portée franche, bordure épaisse), tampons rotatifs façon douane pour le statut du
contenu (`.stamp`), palette conteneur (bleu `#2F6FED`, orange `#FF8A34`, vert `#17B978`,
rouge `#FF4E6A`, jaune `#FFC93C`) sur fond clair grillagé. Police display : Space
Grotesk. Police texte : Inter. Police code/mono : IBM Plex Mono. Priorité mobile
(navigation par onglets en bas d'écran) : toujours concevoir pour ~375px de large
d'abord.

## 6. Commandes utiles

```bash
npm install
npm run dev     # développement local, http://localhost:3000
npm run build   # vérifie que tout compile avant de pousser sur GitHub
```

## 7. Déploiement

Dépôt GitHub → import direct sur Vercel (framework Next.js détecté automatiquement,
aucune variable d'environnement nécessaire). Voir `README.md`.
