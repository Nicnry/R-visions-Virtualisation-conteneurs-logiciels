import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { theorySections, getTheoryBySlug } from "@/content/theory";
import CategoryChip from "@/components/CategoryChip";
import SourceBadge from "@/components/SourceBadge";

export function generateStaticParams() {
  return theorySections.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const section = getTheoryBySlug(params.slug);
  return { title: section ? `${section.title} — Révisions 63-41.2` : "Fiche introuvable" };
}

export default function TheoryDetailPage({ params }: { params: { slug: string } }) {
  const section = getTheoryBySlug(params.slug);
  if (!section) notFound();

  return (
    <article className="space-y-5">
      <Link href="/theorie" className="inline-flex items-center gap-1 text-sm font-medium text-crate-blue">
        <ArrowLeft size={16} /> Toutes les fiches
      </Link>

      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <CategoryChip category={section.category} />
          <SourceBadge source={section.source} />
        </div>
        <h1 className="font-display text-2xl font-bold leading-tight tracking-tight">
          {section.title}
        </h1>
        <p className="text-sm text-ink/70">{section.summary}</p>
      </header>

      <div className="crate-card space-y-3 p-4 text-[15px] leading-relaxed text-ink/90">
        {section.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="crate-card p-4">
        <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-wide text-ink/50">
          À retenir
        </h2>
        <ul className="space-y-2">
          {section.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-crate-green" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
