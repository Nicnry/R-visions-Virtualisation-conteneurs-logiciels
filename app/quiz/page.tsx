import { quizQuestions } from "@/content/quiz";
import QuizPlayer from "@/components/QuizPlayer";

export const metadata = { title: "Quiz — Révisions 63-41.2" };

export default function QuizPage() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Quiz</h1>
        <p className="mt-1 text-sm text-ink/70">
          {quizQuestions.length} questions, ordre et propositions mélangés à chaque partie.
        </p>
      </header>
      <QuizPlayer questions={quizQuestions} />
    </div>
  );
}
