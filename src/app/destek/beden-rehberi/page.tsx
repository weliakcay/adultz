import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

const bodyMatrix = [
  { model: "Aurora Neon", height: "165 cm", weight: "38 kg", focus: "Dengeli gece kullanımı" },
  { model: "Luna Serenity", height: "158 cm", weight: "34 kg", focus: "Mindfulness ve uyku" },
  { model: "Maya Pulse", height: "172 cm", weight: "40 kg", focus: "Aktif yaşam ve sahne" },
];

export const metadata: Metadata = buildMetadata({
  title: "Adult Z Beden Rehberi",
  description: "Adult Z bebekleri için boy ve ağırlık karşılaştırmaları, taşıma önerileri ve güvenlik notları.",
  path: "/destek/beden-rehberi",
});

export default function BodyGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Destek</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Beden Rehberi
        </h1>
        <p className="mt-4 text-sm text-muted">
          Boy, ağırlık ve taşıma önerileriyle size en uygun Adult Z bebeğini seçin. Tüm ölçüler ±1 cm/±0.5 kg toleransla verilmiştir.
        </p>
      </header>
      <table className="mt-12 w-full table-fixed border-separate border-spacing-y-4">
        <thead>
          <tr className="text-left text-xs uppercase tracking-[0.3em] text-muted">
            <th>Model</th>
            <th>Boy</th>
            <th>Ağırlık</th>
            <th>Odak</th>
          </tr>
        </thead>
        <tbody>
          {bodyMatrix.map((row) => (
            <tr key={row.model} className="rounded-[18px] bg-[rgba(12,12,20,0.65)]">
              <td className="rounded-l-[18px] border border-[rgba(157,78,221,0.2)] px-4 py-3 font-semibold text-foreground">
                {row.model}
              </td>
              <td className="border border-[rgba(157,78,221,0.2)] px-4 py-3 text-sm text-muted">
                {row.height}
              </td>
              <td className="border border-[rgba(157,78,221,0.2)] px-4 py-3 text-sm text-muted">
                {row.weight}
              </td>
              <td className="rounded-r-[18px] border border-[rgba(157,78,221,0.2)] px-4 py-3 text-sm text-muted">
                {row.focus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="mt-10 rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6 text-sm text-muted">
        <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
          Taşıma Güvenliği
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Adult Z taşıma kayışını kullanın ve gövdeyi iki noktadan destekleyin.</li>
          <li>Merdiven ve dar alanlarda ek destek isteyin; sessiz tekerlekli Shadow Case önerilir.</li>
          <li>Uzun süreli saklamada iskeleti dinlendirmek için 45° açıyla konumlandırın.</li>
        </ul>
      </section>
    </div>
  );
}
