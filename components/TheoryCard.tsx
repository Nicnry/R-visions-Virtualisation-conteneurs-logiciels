import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TheorySection } from "@/content/types";
import CategoryChip from "./CategoryChip";
import SourceBadge from "./SourceBadge";

export default function TheoryCard({ section }: { section: TheorySection }) {
  return (
    <Link
      href={`/theorie/${section.slug}`}
      className="crate-card block p-4"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <CategoryChip category={section.category} />
        <SourceBadge source={section.source} />
      </div>
      <h3 className="font-display text-base font-bold leading-snug">{section.title}</h3>
      <p className="mt-1 text-sm text-ink/70">{section.summary}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-crate-blue">
        Lire la fiche <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
