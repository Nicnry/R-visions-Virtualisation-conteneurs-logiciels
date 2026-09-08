import { theorySections } from "@/content/theory";
import { groupByCategory } from "@/lib/content";
import TheoryCard from "@/components/TheoryCard";

export const metadata = { title: "Théorie — Révisions 63-41.2" };

export default function TheoriePage() {
  const grouped = groupByCategory(theorySections);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Théorie</h1>
        <p className="mt-1 text-sm text-ink/70">
          {theorySections.length} fiches, classées par thème. Le tampon indique si le contenu
          a déjà été confronté au cours réel.
        </p>
      </header>

      {grouped.map(([category, items]) => (
        <section key={category} className="space-y-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">
            {category}
          </h2>
          <div className="space-y-3">
            {items.map((section) => (
              <TheoryCard key={section.slug} section={section} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
