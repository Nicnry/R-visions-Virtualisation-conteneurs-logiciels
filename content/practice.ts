import { PracticeExercise } from "./types";

// Idem theory.ts : contenu estimé, à valider une fois le cours réellement donné.

export const practiceExercises: PracticeExercise[] = [
  {
    slug: "dockerfile-node-simple",
    title: "Écrire un Dockerfile pour une petite app Node.js",
    type: "commande",
    category: "Docker",
    prompt:
      "Tu as une app Node.js avec un fichier `package.json` et un point d'entrée `server.js` qui écoute sur le port 3000. Écris un Dockerfile qui construit une image pour cette app.",
    hint: "Pense à l'ordre des instructions pour profiter du cache : dépendances avant code source.",
    solution:
      "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --production\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\n\n-> package.json est copié et installé AVANT le reste du code : si seul le code change, npm install n'est pas relancé au prochain build.",
    source: "estime",
  },
  {
    slug: "docker-run-expose",
    title: "Lancer un conteneur et l'exposer sur le bon port",
    type: "commande",
    category: "Docker",
    prompt:
      "À partir d'une image `mon-app:1.0`, lance un conteneur en arrière-plan, nomme-le `app-prod`, et rends-le accessible sur le port 8080 de la machine hôte (le conteneur écoute en interne sur le port 3000).",
    solution:
      "docker run -d --name app-prod -p 8080:3000 mon-app:1.0\n\n-> -d : détaché (arrière-plan) · --name : nom lisible du conteneur · -p hôte:conteneur : mappe le port 8080 de la machine vers le port 3000 du conteneur.",
    source: "estime",
  },
  {
    slug: "compose-app-db",
    title: "Décrire une app + une base de données avec Docker Compose",
    type: "mixte",
    category: "Docker",
    prompt:
      "Écris un fichier `docker-compose.yml` minimal pour une app web (image `mon-app:1.0`, port 3000) qui doit communiquer avec une base PostgreSQL (image officielle `postgres:16`).",
    hint: "Deux services suffisent ; ils doivent être sur le même réseau pour se voir par leur nom de service.",
    solution:
      "services:\n  web:\n    image: mon-app:1.0\n    ports:\n      - \"3000:3000\"\n    depends_on:\n      - db\n    environment:\n      DATABASE_URL: postgres://user:pass@db:5432/app\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: pass\n      POSTGRES_USER: user\n      POSTGRES_DB: app\n\n-> Compose crée un réseau commun automatiquement : le service web peut joindre la base via le nom \"db\" (pas besoin d'IP).",
    source: "estime",
  },
  {
    slug: "choix-iaas-paas-saas",
    title: "Choisir le bon modèle cloud selon le besoin",
    type: "scenario",
    category: "Modèles cloud",
    prompt:
      "Une petite équipe veut déployer une API sans gérer de serveur ni de mises à jour d'OS, en se concentrant uniquement sur le code. Quel modèle de service cloud (IaaS, PaaS ou SaaS) est le plus adapté, et pourquoi ?",
    solution:
      "PaaS. Le fournisseur gère l'OS, le runtime et la scalabilité ; l'équipe déploie juste son code. L'IaaS demanderait de gérer soi-même l'OS/les mises à jour, et le SaaS ne convient pas puisqu'ils développent leur propre logiciel (pas un produit prêt à l'emploi).",
    source: "estime",
  },
  {
    slug: "isolation-securite-forte",
    title: "Isolation forte : VM ou conteneur ?",
    type: "scenario",
    category: "VM vs conteneurs",
    prompt:
      "Une plateforme doit exécuter du code non fiable envoyé par des utilisateurs externes (multi-tenant, aucune confiance entre les tenants). Faut-il privilégier des VM ou des conteneurs pour isoler chaque exécution, et pourquoi ?",
    solution:
      "Des VM (ou une isolation renforcée type micro-VM, ex. Firecracker). Les conteneurs partagent le même noyau hôte : une faille du noyau ou une mauvaise configuration peut permettre une évasion. Pour du code non fiable, une frontière au niveau matériel/noyau (VM) est plus sûre, quitte à perdre en légèreté.",
    source: "estime",
  },
  {
    slug: "nettoyage-docker",
    title: "Nettoyer les images et conteneurs inutilisés",
    type: "commande",
    category: "Docker",
    prompt:
      "Liste les conteneurs actifs, liste les images locales, puis supprime toutes les ressources Docker inutilisées (conteneurs arrêtés, images non taguées, réseaux/caches inutilisés) en une seule commande.",
    solution:
      "docker ps          # conteneurs en cours d'exécution\ndocker images       # images locales\ndocker system prune -a\n\n-> \"-a\" supprime aussi les images non utilisées par un conteneur en cours (à utiliser avec prudence).",
    source: "estime",
  },
  {
    slug: "reseau-3-tiers",
    title: "Concevoir un réseau conteneurisé à 3 niveaux",
    type: "mixte",
    category: "Réseaux & stockage",
    prompt:
      "Tu conteneurises une app en 3 parties : frontend, backend (API), base de données. Le frontend ne doit accéder qu'au backend, jamais directement à la base de données. Comment organiser les réseaux Docker pour ça ?",
    hint: "Un conteneur peut appartenir à plusieurs réseaux Docker en même temps.",
    solution:
      "Créer deux réseaux bridge : \"reseau-public\" (frontend + backend) et \"reseau-interne\" (backend + db). Le frontend n'est branché que sur \"reseau-public\" donc ne peut pas atteindre la db. Le backend est branché sur les deux réseaux et fait le pont. Ainsi la db n'est jamais directement exposée au frontend.",
    source: "estime",
  },
  {
    slug: "push-registre-prive",
    title: "Publier une image sur un registre privé",
    type: "commande",
    category: "Docker",
    prompt:
      "Tu as construit une image locale `mon-app:1.0`. Publie-la sur le registre privé `registre.exemple.com` sous le projet `equipe-a`, avec le tag `1.0.0`.",
    solution:
      "docker tag mon-app:1.0 registre.exemple.com/equipe-a/mon-app:1.0.0\ndocker login registre.exemple.com\ndocker push registre.exemple.com/equipe-a/mon-app:1.0.0\n\n-> docker tag ne copie pas l'image, il ajoute juste une référence supplémentaire vers les mêmes couches.",
    source: "estime",
  },
];

export function getPracticeBySlug(slug: string) {
  return practiceExercises.find((p) => p.slug === slug);
}
