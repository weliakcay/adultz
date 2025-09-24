import type { Metadata } from "next";
import { OptionPicker } from "@/components/modules/option-picker";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Kendi Adult Z Bebeğini Tasarla",
  description:
    "Gövde formu, cilt, saç, göz, iskelet ve aksesuar seçenekleriyle Adult Z bebeğinizi 7 adımda kişiselleştirin.",
  path: "/bebekler/ozellestir",
});

export default function CustomizePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">7 Adımda Tasarım</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Kendi Bebeğini Tasarla
        </h1>
        <p className="mt-4 text-sm text-muted">
          Gövde formundan aksesuarlara kadar tüm seçenekleri belirleyin. Tahmini teslim süresi her adımda hatırlatılır ve seçimleriniz gizlilik politikamız kapsamında korunur.
        </p>
      </header>
      <div className="mt-12">
        <OptionPicker />
      </div>
    </div>
  );
}
