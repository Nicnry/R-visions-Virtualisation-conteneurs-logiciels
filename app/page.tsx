import Link from "next/link";
import { BookOpen, Terminal, ListChecks, Clock, FileCheck2, Percent } from "lucide-react";
import { theorySections } from "@/content/theory";
import { practiceExercises } from "@/content/practice";
import { quizQuestions } from "@/content/quiz";

const links = [
  {
    href: "/theorie",
    title: "Théorie",
    desc: `${theorySections.length} fiches par thème`,
    icon: BookOpen,
    color: "bg-crate-blue",
  },
  {
    href: "/pratique",
    title: "Pratique",
    desc: `${practiceExercises.length} exercices, commandes & scénarios`,
    icon: Terminal,
    color: "bg-crate-orange",
  },
  {
    href: "/quiz",
    title: "Quiz",
    desc: `${quizQuestions.length} questions, ordre mélangé`,
    icon: ListChecks,
    color: "bg-crate-green",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="crate-card space-y-3 p-5">
        <span className="stamp text-crate-orange">À valider</span>
        <h1 className="font-display text-2xl font-bold leading-tight tracking-tight">
          Virtualisation & conteneurs logiciels
        </h1>
        <p className="text-sm leading-relaxed text-ink/70">
          Unité 63-41.2 (module 63-41 — Implémentation de services). Le contenu de ce site est
          pour l&apos;instant déduit du plan officiel de l&apos;unité, pas encore du cours réel :
          chaque fiche porte un tampon <span className="font-semibold">« à valider »</span> tant
          qu&apos;elle n&apos;a pas été confrontée au support de cours.
        </p>
      </section>

      <section className="grid grid-cols-3 gap-2 text-center">
        <div className="crate-card p-3">
          <Clock className="mx-auto mb-1 text-crate-blue" size={18} />
          <p className="font-display text-sm font-bold">90 min</p>
          <p className="text-[11px] text-ink/60">Examen écrit</p>
        </div>
        <div className="crate-card p-3">
          <Percent className="mx-auto mb-1 text-crate-orange" size={18} />
          <p className="font-display text-sm font-bold">50%</p>
          <p className="text-[11px] text-ink/60">Du module</p>
        </div>
        <div className="crate-card p-3">
          <FileCheck2 className="mx-auto mb-1 text-crate-green" size={18} />
          <p className="font-display text-sm font-bold">33h45</p>
          <p className="text-[11px] text-ink/60">Volume horaire</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">
          Réviser
        </h2>
        {links.map(({ href, title, desc, icon: Icon, color }) => (
          <Link key={href} href={href} className="crate-card flex items-center gap-3 p-4">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-crate border-2 border-ink text-white ${color}`}
            >
              <Icon size={20} />
            </span>
            <div>
              <p className="font-display text-base font-bold">{title}</p>
              <p className="text-xs text-ink/60">{desc}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
