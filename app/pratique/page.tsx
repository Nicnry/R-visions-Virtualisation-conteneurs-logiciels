import { practiceExercises } from "@/content/practice";
import PracticeCard from "@/components/PracticeCard";

export const metadata = { title: "Pratique — Révisions 63-41.2" };

export default function PratiquePage() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Pratique</h1>
        <p className="mt-1 text-sm text-ink/70">
          {practiceExercises.length} exercices : commandes à écrire et scénarios à analyser.
          Touche une carte pour l&apos;ouvrir, puis révèle la correction.
        </p>
      </header>

      <div className="space-y-3">
        {practiceExercises.map((exercise) => (
          <PracticeCard key={exercise.slug} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}
