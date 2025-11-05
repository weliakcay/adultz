import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

const resources = [
  {
    title: "Beden Rehberi",
    description: "Boy ve ağırlık karşılaştırmalarıyla ideal formu seçin.",
    href: "/destek/beden-rehberi",
  },
  {
    title: "Bakım Rehberi",
    description: "Temizlik, saklama ve onarım ipuçları.",
    href: "/destek/bakim-rehberi",
  },
  {
    title: "SSS",
    description: "Teslimat, ödeme, garanti ve mahremiyet soruları.",
    href: "/destek/sss",
  },
  {
    title: "KVKK",
    description: "Kişisel verilerinizi nasıl koruduğumuzu öğrenin.",
    href: "/destek/kvkk",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Adult X Destek Merkezi",
  description: "Beden rehberi, bakım rehberi ve sık sorulan sorularla Adult X destek merkezi.",
  path: "/destek",
});

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Destek</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Destek Merkezi
        </h1>
        <p className="mt-4 text-sm text-muted">
          Adult X ekibi, gizli chat ve randevulu telefon hattı ile 7/24 yanınızda. Destek makalelerimizle bakım ve teslimat süreçlerini güvenle yönetin.
        </p>
      </header>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {resources.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6 transition hover:border-[rgba(0,180,216,0.3)]"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {resource.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{resource.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
