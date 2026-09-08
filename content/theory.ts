import { TheorySection } from "./types";

// Contenu déduit du descriptif officiel de l'unité 63-41.2 (Cloud, virtualisation,
// conteneur, API) — PAS encore validé sur un vrai support de cours.
// -> source: "estime" partout tant que le cours n'a pas commencé.
// Voir CLAUDE.md pour la procédure de mise à jour.

export const theorySections: TheorySection[] = [
  {
    slug: "hyperviseurs-type-1-2",
    title: "Hyperviseurs de type 1 et 2",
    category: "Hyperviseurs & VM",
    summary:
      "Le logiciel qui permet à plusieurs machines virtuelles de partager le matériel physique.",
    content: [
      "Un hyperviseur est la couche logicielle qui crée et exploite des machines virtuelles (VM) en partageant les ressources physiques (CPU, RAM, disque, réseau) d'une même machine hôte.",
      "Type 1 (natif / bare-metal) : l'hyperviseur s'installe directement sur le matériel, sans système d'exploitation hôte entre les deux. Exemples : VMware ESXi, Microsoft Hyper-V (mode serveur), KVM, Xen. Utilisé en datacenter et sur les infrastructures cloud pour de meilleures performances et une meilleure isolation.",
      "Type 2 (hébergé) : l'hyperviseur tourne comme une application au-dessus d'un OS déjà installé. Exemples : VirtualBox, VMware Workstation, Parallels. Pratique pour un usage poste de travail / test, mais avec une couche supplémentaire donc un peu moins performant.",
      "Dans les deux cas, chaque VM embarque son propre OS complet (noyau compris), ce qui la rend lourde mais totalement isolée des autres VM.",
    ],
    keyPoints: [
      "Type 1 = directement sur le matériel (datacenter, cloud)",
      "Type 2 = au-dessus d'un OS existant (poste de travail)",
      "Chaque VM a son propre noyau/OS complet",
    ],
    source: "estime",
  },
  {
    slug: "vm-vs-conteneurs",
    title: "Machines virtuelles vs conteneurs",
    category: "VM vs conteneurs",
    summary:
      "Deux façons d'isoler des applications, avec des compromis très différents en poids et en rapidité.",
    content: [
      "Une VM virtualise le matériel : chaque VM embarque un OS complet. Un conteneur virtualise le système d'exploitation : tous les conteneurs d'une même machine partagent le même noyau, ce qui les rend beaucoup plus légers.",
      "Isolation : les VM offrent une isolation forte (frontière au niveau du noyau), ce qui convient à des besoins de sécurité stricts ou du multi-tenant. Les conteneurs isolent via des mécanismes du noyau Linux (namespaces, cgroups) : c'est une isolation plus légère mais suffisante pour la majorité des usages applicatifs.",
      "Performance et démarrage : une VM démarre en dizaines de secondes/minutes (boot d'un OS complet). Un conteneur démarre en général en moins d'une seconde car il ne fait que lancer un processus isolé.",
      "Portabilité : une image de conteneur embarque l'application et ses dépendances, pas le noyau. Elle est donc très portable d'un environnement à l'autre (poste de dev, serveur, cloud) tant que le noyau hôte est compatible.",
      "En pratique, les deux se combinent souvent : des conteneurs tournent à l'intérieur de VM chez les fournisseurs cloud, pour cumuler l'isolation forte des VM et l'agilité des conteneurs.",
    ],
    keyPoints: [
      "VM = virtualise le matériel, OS complet par VM",
      "Conteneur = virtualise l'OS, noyau partagé",
      "Conteneurs : plus légers, démarrage quasi instantané, très portables",
      "VM : isolation plus forte, plus lourdes",
    ],
    source: "estime",
  },
  {
    slug: "docker-images-conteneurs",
    title: "Docker : images et conteneurs",
    category: "Docker",
    summary: "La brique de base de Docker : différencier une image d'un conteneur.",
    content: [
      "Une image Docker est un modèle en lecture seule : un ensemble de fichiers (code, dépendances, configuration) organisé en couches (layers) empilées les unes sur les autres.",
      "Un conteneur est une instance en cours d'exécution d'une image : Docker ajoute une fine couche inscriptible par-dessus l'image et démarre un processus isolé. On peut lancer plusieurs conteneurs indépendants à partir de la même image.",
      "Les couches d'une image sont mises en cache et réutilisées : si deux images partagent les mêmes premières instructions, Docker ne stocke ces couches qu'une seule fois, ce qui économise espace disque et temps de build.",
      "Commandes de base : `docker build` construit une image à partir d'un Dockerfile, `docker run` démarre un conteneur à partir d'une image, `docker ps` liste les conteneurs actifs, `docker images` liste les images disponibles localement.",
    ],
    keyPoints: [
      "Image = modèle figé et en couches",
      "Conteneur = instance en cours d'exécution d'une image",
      "Les couches sont mises en cache et partagées entre images",
    ],
    source: "estime",
  },
  {
    slug: "dockerfile",
    title: "Le Dockerfile",
    category: "Docker",
    summary: "Le fichier texte qui décrit, étape par étape, comment construire une image.",
    content: [
      "Un Dockerfile est une recette : chaque instruction ajoute une couche à l'image. Docker exécute les instructions dans l'ordre et met en cache chaque étape.",
      "Instructions courantes : FROM (image de base), WORKDIR (dossier de travail dans le conteneur), COPY / ADD (copier des fichiers depuis l'hôte), RUN (exécuter une commande pendant le build, ex. installer des dépendances), ENV (variables d'environnement), EXPOSE (documente le port utilisé), CMD / ENTRYPOINT (commande exécutée au démarrage du conteneur).",
      "Bonne pratique : placer les instructions qui changent le moins souvent (ex. installation de dépendances) avant celles qui changent souvent (ex. copie du code source), pour profiter au maximum du cache de build et accélérer les rebuilds.",
    ],
    keyPoints: [
      "FROM, WORKDIR, COPY, RUN, ENV, EXPOSE, CMD/ENTRYPOINT",
      "Chaque instruction = une couche, mise en cache",
      "Ordonner les instructions du plus stable au plus changeant",
    ],
    source: "estime",
  },
  {
    slug: "registres-images",
    title: "Registres d'images",
    category: "Docker",
    summary: "Où sont stockées et partagées les images Docker.",
    content: [
      "Un registre (registry) est un service qui stocke et distribue des images de conteneurs. Docker Hub est le registre public par défaut ; il existe aussi des registres privés (GitHub Container Registry, GitLab Registry, Amazon ECR, Azure Container Registry, ou un registre auto-hébergé).",
      "Une image est identifiée par un nom et un tag, par exemple `nginx:1.27` ou `mon-registre.exemple.com/mon-projet/mon-app:1.0.0`. Le tag `latest` est utilisé par défaut si aucun tag n'est précisé, mais il est déconseillé en production car il ne garantit pas une version stable.",
      "Cycle typique : `docker build` pour créer l'image, `docker tag` pour lui donner un nom compatible avec le registre cible, `docker push` pour l'envoyer, `docker pull` pour la récupérer sur une autre machine.",
    ],
    keyPoints: [
      "Registre public (Docker Hub) vs registre privé",
      "Nom d'image = dépôt + tag (ex. nginx:1.27)",
      "build → tag → push → pull",
    ],
    source: "estime",
  },
  {
    slug: "orchestration-kubernetes",
    title: "Bases de l'orchestration (Kubernetes)",
    category: "Orchestration",
    summary:
      "Comment faire tourner et superviser automatiquement des dizaines de conteneurs.",
    content: [
      "Gérer des conteneurs un par un devient vite impossible à grande échelle : un orchestrateur automatise le déploiement, la mise à l'échelle et la supervision de nombreux conteneurs sur plusieurs machines.",
      "Kubernetes (K8s) est l'orchestrateur le plus répandu. Concepts clés : le Pod (plus petite unité déployable, un ou plusieurs conteneurs qui partagent réseau/stockage), le Node (machine, physique ou virtuelle, qui exécute des pods), le Cluster (ensemble de nodes gérés ensemble), le Deployment (décrit combien de répliques d'un pod doivent tourner en permanence), le Service (point d'accès réseau stable vers un ensemble de pods).",
      "Kubernetes assure aussi l'auto-réparation (redémarre un conteneur en panne), la mise à l'échelle automatique selon la charge, et les déploiements progressifs (rolling updates) sans interruption de service.",
      "Docker Compose, plus simple, permet de décrire et lancer plusieurs conteneurs liés entre eux (ex. app + base de données) sur une seule machine — utile en développement, mais ce n'est pas un orchestrateur multi-machines comme Kubernetes.",
    ],
    keyPoints: [
      "Orchestrateur = automatise déploiement, scaling, supervision",
      "K8s : Pod, Node, Cluster, Deployment, Service",
      "Docker Compose : multi-conteneurs sur une seule machine (dev)",
    ],
    source: "estime",
  },
  {
    slug: "modeles-cloud-iaas-paas-saas",
    title: "Modèles de service cloud : IaaS, PaaS, SaaS",
    category: "Modèles cloud",
    summary: "Qui gère quoi, entre le matériel et l'application, selon le modèle choisi.",
    content: [
      "IaaS (Infrastructure as a Service) : le fournisseur gère le matériel, le réseau et le stockage physique. Le client gère l'OS, le runtime, les applications et les données. Exemple : une VM louée chez AWS EC2, Azure VM ou Google Compute Engine.",
      "PaaS (Platform as a Service) : le fournisseur gère en plus l'OS et le runtime d'exécution. Le client se concentre sur le code applicatif et les données. Exemple : Heroku, Azure App Service, Google App Engine.",
      "SaaS (Software as a Service) : le fournisseur gère tout, y compris l'application. Le client ne fait qu'utiliser le logiciel via un navigateur ou une API. Exemple : Gmail, Microsoft 365, Salesforce.",
      "La virtualisation et les conteneurs sont les briques techniques qui rendent ces modèles possibles : ils permettent au fournisseur de multiplexer un même matériel physique entre de nombreux clients tout en gardant chacun isolé.",
    ],
    keyPoints: [
      "IaaS : matériel géré par le fournisseur, reste géré par le client",
      "PaaS : + OS et runtime gérés par le fournisseur",
      "SaaS : tout est géré par le fournisseur, le client utilise juste l'app",
    ],
    source: "estime",
  },
  {
    slug: "apis-gestion-infrastructure",
    title: "APIs pour la gestion d'infrastructures cloud/conteneurs",
    category: "APIs cloud",
    summary: "Comment on pilote une infrastructure virtualisée par programmation.",
    content: [
      "Les fournisseurs cloud et les moteurs de conteneurs exposent des APIs (le plus souvent REST, sur HTTP) qui permettent de créer, configurer et détruire des ressources par programmation plutôt qu'à la main via une interface graphique.",
      "L'API Docker Engine permet par exemple de créer des conteneurs, gérer des images ou des réseaux depuis un script ou une autre application ; le CLI `docker` que l'on tape au clavier n'est lui-même qu'un client de cette API.",
      "L'API Kubernetes (kube-apiserver) est au cœur du fonctionnement d'un cluster : chaque commande `kubectl` se traduit par un appel à cette API, et tous les composants internes de Kubernetes communiquent également via elle.",
      "L'Infrastructure as Code (IaC — ex. Terraform, ARM/Bicep, CloudFormation) s'appuie sur ces APIs pour décrire l'infrastructure souhaitée dans des fichiers de configuration versionnables, plutôt que de cliquer manuellement dans une console.",
    ],
    keyPoints: [
      "APIs REST pour piloter cloud et conteneurs par programmation",
      "Le CLI (docker, kubectl) est un client de l'API, pas l'inverse",
      "Infrastructure as Code = décrire l'infra dans des fichiers versionnés",
    ],
    source: "estime",
  },
  {
    slug: "reseaux-stockage-virtualises",
    title: "Réseaux et stockage dans un environnement virtualisé",
    category: "Réseaux & stockage",
    summary: "Comment les VM et conteneurs accèdent au réseau et conservent leurs données.",
    content: [
      "Réseau virtuel : un hyperviseur ou un moteur de conteneurs crée des switches/bridges virtuels pour relier les VM ou conteneurs entre eux et au réseau physique. Docker crée par défaut un réseau de type bridge qui isole les conteneurs tout en leur donnant accès à Internet via NAT.",
      "Types de réseaux Docker courants : bridge (par défaut, isolation locale), host (le conteneur partage directement la pile réseau de la machine hôte, pas d'isolation réseau), none (aucun accès réseau), et les réseaux overlay pour relier des conteneurs situés sur des machines différentes (utile avec un orchestrateur).",
      "Stockage : un conteneur est éphémère par défaut — ses données disparaissent quand il est supprimé. Pour persister des données, on utilise des volumes (gérés par Docker, indépendants du cycle de vie du conteneur) ou des bind mounts (qui pointent vers un dossier précis de la machine hôte).",
      "Dans le cloud, le stockage persistant est généralement proposé comme un service à part (ex. disque réseau, objet de type S3) que l'on attache à la VM ou au conteneur, indépendamment de sa durée de vie.",
    ],
    keyPoints: [
      "Réseau bridge (par défaut), host, none, overlay",
      "Conteneur = éphémère par défaut",
      "Volumes (gérés par Docker) vs bind mounts (dossier de l'hôte)",
    ],
    source: "estime",
  },
];

export function getTheoryBySlug(slug: string) {
  return theorySections.find((t) => t.slug === slug);
}
