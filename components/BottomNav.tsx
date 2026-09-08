"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Terminal, ListChecks } from "lucide-react";

const tabs = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/theorie", label: "Théorie", icon: BookOpen },
  { href: "/pratique", label: "Pratique", icon: Terminal },
  { href: "/quiz", label: "Quiz", icon: ListChecks },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-white"
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex max-w-2xl">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-crate-blue" : "text-ink/50"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={22} strokeWidth={active ? 2.75 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
      {/* Zone de sécurité pour les mobiles avec home bar */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </nav>
  );
}
