import type { Metadata } from "next";
import { QuizForm } from "@/components/modules/quiz-form";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Adult X Deneyim Quizi",
  description: "5 soruda Adult X bebekleri ve yan ürünleri arasından kişisel öneriler alın.",
  path: "/quiz",
});

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Deneyim Quiz</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Hangisi Sana Göre?
        </h1>
        <p className="mt-4 text-sm text-muted">
          Beklentiniz, kullanım senaryonuz ve bakım tercihlerinize göre 1 bebek ve 1-2 aksesuar önerelim. Gizlilik politikamız gereği yanıtlarınız 24 saat içinde anonimleştirilir.
        </p>
      </header>
      <div className="mt-10">
        <QuizForm />
      </div>
    </div>
  );
}
