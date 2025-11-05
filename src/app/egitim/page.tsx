import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/posts";
import { buildMetadata } from "@/lib/metadata";

const categories: Record<string, string> = {
  "Bakım & Güvenlik": "/destek/bakim-rehberi",
  "Tasarım & Teknoloji": "/teknoloji-tasarim",
  "Seçim Rehberleri": "/quiz",
  "Mahremiyet & Paketleme": "/destek/sss",
  Videolar: "/egitim/videolar",
};

export const metadata: Metadata = buildMetadata({
  title: "Adult X Eğitim Merkezi",
  description: "Bakım, teknoloji, seçim rehberi ve mahremiyet başlıklarında Adult X eğitim içerikleri.",
  path: "/egitim",
});

export default function EducationPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Eğitim</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Bilgi Merkezi
        </h1>
        <p className="mt-4 text-sm text-muted">
          Bakım, güvenlik, teknoloji ve mahremiyet üzerine hazırladığımız rehberlerle Adult X deneyimini bilinçli şekilde yönetin. Tüm içerikler açık ve güven verici bir dil kullanır; erotik anlatımlar içermez.
        </p>
      </header>
      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categories).map(([title, href]) => (
          <Link
            key={title}
            href={href}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6 transition hover:border-[rgba(0,180,216,0.3)]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Kategori</p>
            <h3 className="mt-3 font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {title}
            </h3>
            <p className="mt-3 text-sm text-muted">
              {title === "Videolar"
                ? "Kısa eğitim videoları ve bakımla ilgili hızlı ipuçları"
                : "Uzman ekibimizin hazırladığı rehber ve makalelere göz atın"}
            </p>
          </Link>
        ))}
      </section>
      <section className="mt-16">
        <h2 className="font-display text-3xl uppercase tracking-[0.3em] text-foreground">
          Güncel Yazılar
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                {post.topics.join(", ")}
              </p>
              <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.28em] text-foreground">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              <p className="mt-4 text-xs text-muted">Okuma süresi ≈ {post.readingMinutes} dk</p>
              <Link
                href={`/egitim/${post.slug}`}
                className="mt-4 inline-flex text-xs uppercase tracking-[0.3em] text-foreground underline decoration-dotted"
              >
                İçeriği Oku
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
