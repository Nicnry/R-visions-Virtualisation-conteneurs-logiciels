# Révisions — Virtualisation & conteneurs logiciels (63-41.2)

Site de révision pour l'unité 63-41.2 (module 63-41, examen écrit 90 min, 50% du
module) : fiches de théorie, exercices pratiques, quiz à réponses mélangées.
Pensé mobile-first, prêt pour GitHub + Vercel.

⚠️ **Le contenu est pour l'instant déduit du plan officiel de l'unité**, pas d'un
vrai support de cours — voir [`CLAUDE.md`](./CLAUDE.md) pour la procédure à suivre
pour le valider / corriger une fois le cours réellement donné.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
content/     Données (théorie, pratique, quiz) — le "Modèle"
lib/         Logique pure (mélange des quiz, agrégations) — le "Contrôleur"
components/  Composants d'affichage — la "Vue"
app/         Pages Next.js (App Router)
CLAUDE.md    Comment ajouter/valider/retirer du contenu
```

## Ajouter du contenu

Éditer directement `content/theory.ts`, `content/practice.ts` ou `content/quiz.ts`
en respectant les types de `content/types.ts`. Aucun autre fichier à toucher.
Détails et conventions dans [`CLAUDE.md`](./CLAUDE.md).

## Déploiement sur Vercel

1. Pousser ce dossier sur un nouveau dépôt GitHub :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/<ton-repo>.git
   git push -u origin main
   ```
2. Sur [vercel.com](https://vercel.com), **Add New → Project**, importer le dépôt.
3. Vercel détecte automatiquement Next.js — aucune configuration ni variable
   d'environnement à ajouter. Cliquer **Deploy**.
4. Chaque `git push` sur `main` redéploie automatiquement le site.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react. Aucune base de
données : tout le contenu est statique et versionné dans `content/`.
