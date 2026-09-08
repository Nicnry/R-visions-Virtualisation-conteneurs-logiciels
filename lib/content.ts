// ---------------------------------------------------------------------------
// CONTROLEUR — petites fonctions d'accès/agrégation au-dessus du contenu (modèle).
// Les pages (routes) et composants (vue) passent par ici plutôt que d'importer
// directement content/*.ts, pour garder un seul point d'entrée à modifier si
// la structure des données évolue.
// ---------------------------------------------------------------------------

import { theorySections } from "@/content/theory";
import { practiceExercises } from "@/content/practice";
import { quizQuestions } from "@/content/quiz";

export function groupByCategory<T extends { category: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return Array.from(map.entries());
}

export function getStats() {
  const total = theorySections.length + practiceExercises.length + quizQuestions.length;
  const confirmed =
    theorySections.filter((t) => t.source === "confirme").length +
    practiceExercises.filter((p) => p.source === "confirme").length +
    quizQuestions.filter((q) => q.source === "confirme").length;
  return { total, confirmed, estimated: total - confirmed };
}
