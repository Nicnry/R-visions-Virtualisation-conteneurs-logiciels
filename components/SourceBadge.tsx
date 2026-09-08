import { SourceFlag } from "@/content/types";

export default function SourceBadge({ source }: { source: SourceFlag }) {
  const isEstime = source === "estime";
  return (
    <span
      className={`stamp ${isEstime ? "text-crate-orange" : "text-crate-green"}`}
      title={
        isEstime
          ? "Contenu déduit du plan de cours, pas encore confirmé par le cours réel."
          : "Contenu validé sur la base du cours réel."
      }
    >
      {isEstime ? "À valider" : "Confirmé"}
    </span>
  );
}
