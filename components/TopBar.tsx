import { Package } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-crate border-2 border-ink bg-crate-yellow text-ink shadow-crate-sm">
          <Package size={18} strokeWidth={2.5} />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold tracking-tight">Révisions 63-41.2</p>
          <p className="text-[11px] text-ink/60">Virtualisation & conteneurs logiciels</p>
        </div>
      </div>
    </header>
  );
}
