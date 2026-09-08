// ---------------------------------------------------------------------------
// MODELE (au sens MVC) — toutes les données de révision passent par ces types.
// Voir CLAUDE.md à la racine pour savoir comment ajouter / valider / retirer
// du contenu une fois le cours réellement donné.
// ---------------------------------------------------------------------------

/**
 * "estime"   -> contenu déduit de l'intitulé/plan du module, PAS confirmé par le cours réel.
 * "confirme" -> contenu vérifié par rapport au support de cours / aux notes réelles.
 */
export type SourceFlag = "estime" | "confirme";

export interface TheorySection {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string[];
  keyPoints: string[];
  source: SourceFlag;
}

export type PracticeType = "commande" | "scenario" | "mixte";

export interface PracticeExercise {
  slug: string;
  title: string;
  type: PracticeType;
  category: string;
  prompt: string;
  hint?: string;
  solution: string;
  source: SourceFlag;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  /** Ordre "tel qu'écrit" — l'affichage mélange systématiquement l'ordre, voir lib/shuffle.ts */
  options: string[];
  correctIndex: number;
  explanation: string;
  source: SourceFlag;
}

export const CATEGORIES = [
  "Hyperviseurs & VM",
  "VM vs conteneurs",
  "Docker",
  "Orchestration",
  "Modèles cloud",
  "APIs cloud",
  "Réseaux & stockage",
] as const;

export type Category = (typeof CATEGORIES)[number];
