"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb, Terminal, MapPinned } from "lucide-react";
import { PracticeExercise } from "@/content/types";
import CategoryChip from "./CategoryChip";
import SourceBadge from "./SourceBadge";

const TYPE_LABEL: Record<PracticeExercise["type"], { label: string; icon: typeof Terminal }> = {
  commande: { label: "Commande", icon: Terminal },
  scenario: { label: "Scénario", icon: MapPinned },
  mixte: { label: "Mixte", icon: Lightbulb },
};

export default function PracticeCard({ exercise }: { exercise: PracticeExercise }) {
  const [open, setOpen] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const TypeIcon = TYPE_LABEL[exercise.type].icon;

  return (
    <div className="crate-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <CategoryChip category={exercise.category} />
            <span className="tag-chip flex items-center gap-1 bg-ink/5 text-ink/70">
              <TypeIcon size={12} /> {TYPE_LABEL[exercise.type].label}
            </span>
            <SourceBadge source={exercise.source} />
          </div>
          <h3 className="font-display text-base font-bold leading-snug">{exercise.title}</h3>
        </div>
        <ChevronDown
          size={20}
          className={`mt-1 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t-2 border-ink/10 p-4 pt-3">
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink/90">{exercise.prompt}</p>

          {exercise.hint && !showSolution && (
            <p className="rounded-crate bg-crate-yellow/20 p-3 text-xs text-ink/80">
              💡 Indice : {exercise.hint}
            </p>
          )}

          {!showSolution ? (
            <button
              type="button"
              onClick={() => setShowSolution(true)}
              className="rounded-crate border-2 border-ink bg-crate-blue px-4 py-2 text-sm font-bold text-white shadow-crate-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Voir la correction
            </button>
          ) : (
            <div className="rounded-crate border-2 border-ink bg-ink text-paper">
              <pre className="overflow-x-auto whitespace-pre-wrap p-3 font-mono text-xs leading-relaxed">
                {exercise.solution}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
