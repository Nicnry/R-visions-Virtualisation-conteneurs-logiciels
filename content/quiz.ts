import { QuizQuestion } from "./types";

// Idem theory.ts / practice.ts : contenu estimé, à valider une fois le cours réellement donné.
// IMPORTANT : correctIndex pointe vers l'ordre "options" ci-dessous tel qu'écrit.
// L'affichage (QuizPlayer) mélange systématiquement l'ordre à chaque partie —
// ne jamais supposer que la bonne réponse est toujours en 1re position.

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    category: "Hyperviseurs & VM",
    question: "Qu'est-ce qui distingue un hyperviseur de type 1 d'un hyperviseur de type 2 ?",
    options: [
      "Le type 1 tourne directement sur le matériel, le type 2 tourne au-dessus d'un OS hôte",
      "Le type 1 ne gère qu'une seule VM, le type 2 en gère plusieurs",
      "Le type 1 est réservé au cloud public, le type 2 au cloud privé",
      "Le type 1 virtualise l'OS, le type 2 virtualise le matériel",
    ],
    correctIndex: 0,
    explanation:
      "Type 1 = bare-metal, directement sur le matériel (ex. ESXi, KVM). Type 2 = hébergé au-dessus d'un OS existant (ex. VirtualBox).",
    source: "estime",
  },
  {
    id: "q2",
    category: "VM vs conteneurs",
    question: "Pourquoi un conteneur démarre-t-il généralement beaucoup plus vite qu'une VM ?",
    options: [
      "Parce qu'il n'a pas besoin de réseau",
      "Parce qu'il ne fait que lancer un processus isolé, sans démarrer un OS complet",
      "Parce qu'il n'utilise pas de disque",
      "Parce qu'il tourne toujours en mémoire vive uniquement",
    ],
    correctIndex: 1,
    explanation:
      "Un conteneur partage le noyau de l'hôte et se contente de démarrer un processus isolé (namespaces/cgroups), alors qu'une VM doit démarrer un OS complet.",
    source: "estime",
  },
  {
    id: "q3",
    category: "VM vs conteneurs",
    question: "En termes d'isolation, que peut-on dire des conteneurs par rapport aux VM ?",
    options: [
      "Les conteneurs offrent une isolation plus forte car ils ont chacun leur propre noyau",
      "Les conteneurs partagent le même noyau que l'hôte, donc l'isolation est plus légère que celle des VM",
      "Il n'y a aucune différence d'isolation entre les deux",
      "Les VM ne peuvent pas être isolées entre elles",
    ],
    correctIndex: 1,
    explanation:
      "Les conteneurs partagent le noyau hôte (isolation via namespaces/cgroups) : c'est plus léger mais moins étanche qu'une VM, qui a son propre noyau.",
    source: "estime",
  },
  {
    id: "q4",
    category: "Docker",
    question: "Quelle est la différence entre une image Docker et un conteneur Docker ?",
    options: [
      "Une image est un conteneur qui a été arrêté définitivement",
      "Un conteneur est un modèle figé, une image est son instance en cours d'exécution",
      "Une image est un modèle en lecture seule, un conteneur est une instance en cours d'exécution de cette image",
      "Il n'y a pas de différence, ce sont des synonymes",
    ],
    correctIndex: 2,
    explanation:
      "L'image est le modèle (couches en lecture seule) ; le conteneur est une instance qui ajoute une couche inscriptible et exécute un processus.",
    source: "estime",
  },
  {
    id: "q5",
    category: "Docker",
    question: "Dans un Dockerfile, quelle instruction copie des fichiers depuis la machine hôte vers l'image ?",
    options: ["RUN", "COPY", "CMD", "EXPOSE"],
    correctIndex: 1,
    explanation: "COPY (ou ADD) copie des fichiers de l'hôte vers l'image en construction.",
    source: "estime",
  },
  {
    id: "q6",
    category: "Docker",
    question:
      "Pour profiter au maximum du cache de build Docker, comment faut-il organiser les instructions d'un Dockerfile ?",
    options: [
      "Dans un ordre aléatoire, le cache ne dépend pas de l'ordre",
      "Les instructions qui changent souvent en premier, les plus stables à la fin",
      "Les instructions les plus stables en premier, celles qui changent souvent à la fin",
      "Toujours copier tout le code source en toute première instruction",
    ],
    correctIndex: 2,
    explanation:
      "Docker invalide le cache à partir de la première couche modifiée : mettre le stable (dépendances) avant le changeant (code source) maximise les couches réutilisées.",
    source: "estime",
  },
  {
    id: "q7",
    category: "Docker",
    question: "À quoi sert un registre d'images comme Docker Hub ?",
    options: [
      "À exécuter des conteneurs à la place de la machine locale",
      "À stocker et distribuer des images de conteneurs",
      "À orchestrer automatiquement des conteneurs sur plusieurs machines",
      "À remplacer le Dockerfile",
    ],
    correctIndex: 1,
    explanation:
      "Un registre stocke et distribue des images (public comme Docker Hub, ou privé comme un registre d'entreprise).",
    source: "estime",
  },
  {
    id: "q8",
    category: "Docker",
    question: "Pourquoi le tag `latest` est-il déconseillé en production ?",
    options: [
      "Il n'existe pas réellement, Docker l'invente automatiquement",
      "Il ne garantit pas une version stable et précise de l'image déployée",
      "Il ne fonctionne que sur un registre privé",
      "Il empêche de pousser de nouvelles images",
    ],
    correctIndex: 1,
    explanation:
      "\"latest\" pointe vers la dernière image poussée, ce qui peut changer sans prévenir : mieux vaut un tag de version explicite (ex. 1.0.0) pour la reproductibilité.",
    source: "estime",
  },
  {
    id: "q9",
    category: "Orchestration",
    question: "Dans Kubernetes, qu'est-ce qu'un Pod ?",
    options: [
      "Une machine physique du cluster",
      "La plus petite unité déployable, regroupant un ou plusieurs conteneurs qui partagent réseau et stockage",
      "Le composant qui expose une API REST vers l'extérieur",
      "Un synonyme de Node",
    ],
    correctIndex: 1,
    explanation:
      "Un Pod est la plus petite unité déployable de Kubernetes : un ou plusieurs conteneurs étroitement liés, partageant réseau et stockage.",
    source: "estime",
  },
  {
    id: "q10",
    category: "Orchestration",
    question: "Quelle est la principale différence entre Docker Compose et Kubernetes ?",
    options: [
      "Compose gère plusieurs machines, Kubernetes une seule",
      "Compose orchestre plusieurs conteneurs liés sur une seule machine, Kubernetes orchestre à travers un cluster de plusieurs machines",
      "Ce sont deux noms pour le même outil",
      "Kubernetes ne peut pas gérer plusieurs conteneurs à la fois",
    ],
    correctIndex: 1,
    explanation:
      "Docker Compose reste local à une machine (pratique en dev) ; Kubernetes orchestre des conteneurs à travers un cluster de plusieurs nodes, avec auto-réparation et scaling.",
    source: "estime",
  },
  {
    id: "q11",
    category: "Modèles cloud",
    question: "Dans le modèle PaaS, qui gère le système d'exploitation et le runtime ?",
    options: ["Le client", "Le fournisseur cloud", "Personne, ce n'est pas nécessaire", "Un tiers indépendant obligatoire"],
    correctIndex: 1,
    explanation:
      "En PaaS, le fournisseur gère l'infrastructure, l'OS et le runtime ; le client se concentre sur le code applicatif et les données.",
    source: "estime",
  },
  {
    id: "q12",
    category: "Modèles cloud",
    question: "Louer une VM chez un fournisseur cloud et y installer soi-même son OS et ses applications correspond à quel modèle ?",
    options: ["SaaS", "PaaS", "IaaS", "FaaS"],
    correctIndex: 2,
    explanation:
      "IaaS (Infrastructure as a Service) : le fournisseur ne gère que le matériel/réseau/stockage physique, le client gère tout le reste (OS compris).",
    source: "estime",
  },
  {
    id: "q13",
    category: "APIs cloud",
    question: "Que fait exactement la commande `kubectl` quand on l'utilise ?",
    options: [
      "Elle modifie directement les fichiers de configuration sur chaque node",
      "Elle envoie des appels à l'API Kubernetes (kube-apiserver)",
      "Elle remplace complètement le besoin d'une API",
      "Elle ne fonctionne que hors ligne, sans réseau",
    ],
    correctIndex: 1,
    explanation:
      "kubectl est un client de l'API Kubernetes : chaque commande se traduit par un appel HTTP au kube-apiserver, comme le ferait n'importe quel autre client de cette API.",
    source: "estime",
  },
  {
    id: "q14",
    category: "Réseaux & stockage",
    question: "Que se passe-t-il par défaut aux données écrites à l'intérieur d'un conteneur quand celui-ci est supprimé ?",
    options: [
      "Elles sont automatiquement sauvegardées dans le cloud",
      "Elles sont perdues, sauf si elles étaient stockées dans un volume ou un bind mount",
      "Elles sont transférées vers l'image d'origine",
      "Elles restent accessibles indéfiniment même après suppression",
    ],
    correctIndex: 1,
    explanation:
      "Un conteneur est éphémère par défaut : ses données disparaissent avec lui, sauf si elles sont stockées dans un volume Docker ou un bind mount vers l'hôte.",
    source: "estime",
  },
  {
    id: "q15",
    category: "Réseaux & stockage",
    question: "Quel type de réseau Docker fait perdre l'isolation réseau du conteneur en le faisant partager directement la pile réseau de la machine hôte ?",
    options: ["bridge", "none", "host", "overlay"],
    correctIndex: 2,
    explanation:
      "Le mode \"host\" fait partager directement la pile réseau de la machine hôte au conteneur : plus rapide, mais sans isolation réseau.",
    source: "estime",
  },
];
