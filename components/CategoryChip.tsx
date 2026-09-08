const PALETTE = [
  { bg: "bg-crate-blue/10", text: "text-crate-blue" },
  { bg: "bg-crate-orange/10", text: "text-crate-orange" },
  { bg: "bg-crate-green/10", text: "text-crate-green" },
  { bg: "bg-crate-red/10", text: "text-crate-red" },
  { bg: "bg-crate-yellow/20", text: "text-ink" },
];

function colorFor(category: string) {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = (hash + category.charCodeAt(i)) % PALETTE.length;
  return PALETTE[hash];
}

export default function CategoryChip({ category }: { category: string }) {
  const c = colorFor(category);
  return <span className={`tag-chip ${c.bg} ${c.text}`}>{category}</span>;
}
