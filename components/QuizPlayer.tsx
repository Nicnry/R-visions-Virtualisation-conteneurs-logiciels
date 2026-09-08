"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, X, RotateCcw, Trophy } from "lucide-react";
import { QuizQuestion } from "@/content/types";
import { shuffle, shuffleOptions } from "@/lib/shuffle";
import CategoryChip from "./CategoryChip";
import SourceBadge from "./SourceBadge";

const STORAGE_KEY = "quiz-63-41-2-best-score";

interface RunQuestion extends QuizQuestion {
  displayOptions: string[];
  displayCorrectIndex: number;
}

function buildRun(questions: QuizQuestion[]): RunQuestion[] {
  return shuffle(questions).map((q) => {
    const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex);
    return { ...q, displayOptions: options, displayCorrectIndex: correctIndex };
  });
}

export default function QuizPlayer({ questions }: { questions: QuizQuestion[] }) {
  const [run, setRun] = useState<RunQuestion[]>(() => buildRun(questions));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setBestScore(Number(stored));
    } catch {
      // localStorage indisponible (navigation privée, etc.) — pas bloquant.
    }
  }, []);

  const current = run[index];
  const total = run.length;

  function restart() {
    setRun(buildRun(questions));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  function answer(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === current.displayCorrectIndex;
    if (correct) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      const finalScore = score;
      setFinished(true);
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        const prevBest = stored ? Number(stored) : 0;
        if (finalScore > prevBest) {
          window.localStorage.setItem(STORAGE_KEY, String(finalScore));
          setBestScore(finalScore);
        }
      } catch {
        // pas grave si on ne peut pas persister
      }
    }
  }

  if (finished) {
    return (
      <div className="crate-card space-y-4 p-6 text-center">
        <Trophy className="mx-auto text-crate-yellow" size={40} strokeWidth={2} />
        <h2 className="font-display text-2xl font-bold">
          {score} / {total}
        </h2>
        <p className="text-sm text-ink/70">
          {score === total
            ? "Sans faute ! 🎉"
            : score >= total * 0.7
            ? "Bon score, encore quelques révisions pour le sans-faute."
            : "Direction la partie Théorie pour repasser les points ratés."}
        </p>
        {bestScore !== null && (
          <p className="text-xs text-ink/50">Meilleur score sur cet appareil : {bestScore} / {total}</p>
        )}
        <button
          type="button"
          onClick={restart}
          className="mx-auto flex items-center gap-2 rounded-crate border-2 border-ink bg-crate-blue px-5 py-2.5 text-sm font-bold text-white shadow-crate-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <RotateCcw size={16} /> Rejouer (ordre mélangé)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-semibold text-ink/50">
        <span>
          Question {index + 1} / {total}
        </span>
        <span>
          Score : {score}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full border-2 border-ink bg-white">
        <div
          className="h-full bg-crate-blue transition-all"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>

      <div className="crate-card space-y-4 p-5">
        <div className="flex items-center gap-2">
          <CategoryChip category={current.category} />
          <SourceBadge source={current.source} />
        </div>
        <h2 className="font-display text-lg font-bold leading-snug">{current.question}</h2>

        <div className="space-y-2">
          {current.displayOptions.map((option, i) => {
            const isCorrect = i === current.displayCorrectIndex;
            const isSelected = i === selected;
            const revealed = selected !== null;

            let style = "border-ink/20 bg-white";
            if (revealed && isCorrect) style = "border-crate-green bg-crate-green/10";
            else if (revealed && isSelected && !isCorrect) style = "border-crate-red bg-crate-red/10";

            return (
              <button
                key={i}
                type="button"
                onClick={() => answer(i)}
                disabled={revealed}
                className={`flex w-full items-center justify-between gap-2 rounded-crate border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${style} ${
                  !revealed ? "active:bg-ink/5" : ""
                }`}
              >
                <span>{option}</span>
                {revealed && isCorrect && <Check size={18} className="shrink-0 text-crate-green" />}
                {revealed && isSelected && !isCorrect && <X size={18} className="shrink-0 text-crate-red" />}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="space-y-3 border-t-2 border-ink/10 pt-3">
            <p className="text-sm text-ink/80">{current.explanation}</p>
            <button
              type="button"
              onClick={next}
              className="w-full rounded-crate border-2 border-ink bg-ink px-4 py-2.5 text-sm font-bold text-paper shadow-crate-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              {index + 1 < total ? "Question suivante" : "Voir le résultat"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
