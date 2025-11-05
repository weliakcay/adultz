import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { dolls, getDollBySlug } from "@/data/dolls";
import { accessories } from "@/data/accessories";
import { buildMetadata } from "@/lib/metadata";
import { DollDetail } from "@/components/modules/doll-detail";

export function generateStaticParams() {
  return dolls.map((doll) => ({ slug: doll.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doll = getDollBySlug(params.slug);
  if (!doll) {
    return buildMetadata({
      title: "Adult X Bebek",
      description: "Adult X bebek profili bulunamadı.",
      path: `/bebekler/${params.slug}`,
    });
  }
  return buildMetadata({
    title: `${doll.name} | Adult X`,
    description: doll.persona.summary,
    path: `/bebekler/${doll.slug}`,
    image: doll.gallery[0]?.src ?? "/og/cover.svg",
  });
}

export default function DollPage({ params }: { params: { slug: string } }) {
  const doll = getDollBySlug(params.slug);
  if (!doll) {
    notFound();
  }

  const related = accessories.filter((item) => ["modern", "gizli"].includes(item.category)).slice(0, 3);

  return <DollDetail doll={doll} relatedAccessories={related} />;
}
