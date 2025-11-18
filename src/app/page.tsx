import Link from "next/link";
import { Hero } from "@/components/modules/hero";
import { dolls } from "@/data/dolls";
import { posts } from "@/data/posts";
import { ProductCard, ProductCardCustomizeTeaser } from "@/components/modules/product-card";
import { GlowCard } from "@/components/ui/glow-card";
import { NeonButton } from "@/components/ui/neon-button";

export default function HomePage() {
  const featurePosts = posts.slice(0, 3);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section>
          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Adult X Koleksiyonu</p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.3em] text-foreground">
                Realistik Bebekler
              </h2>
            </div>
            <NeonButton href="/bebekler" intensity="blue" size="sm">
              Tümünü Gör
            </NeonButton>
          </header>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {dolls.map((doll, index) => (
              <ProductCard key={doll.slug} doll={doll} index={index} />
            ))}
            <ProductCardCustomizeTeaser />
          </div>
        </section>
        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <GlowCard>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Aksesuarlar</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.28em] text-foreground">
              Tamamlayıcı Aksesuarlar
            </h3>
            <p className="mt-3 text-sm text-muted">
              Fantezi giyim, peruklar, takılar ve bakım ürünleri. Mankenleriniz için özel tasarlanmış tamamlayıcı aksesuarları keşfedin.
            </p>
            <NeonButton href="/oyuncaklar/modern" intensity="blue" size="sm" className="mt-6">
              Aksesuarlar
            </NeonButton>
          </GlowCard>
          <GlowCard>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Cosplay</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.28em] text-foreground">
              Kostüm Koleksiyonu
            </h3>
            <p className="mt-3 text-sm text-muted">
              Tematik kostümler, rol yapma kıyafetleri ve özel tasarım setler. Hayalinizdeki karakteri yaratın.
            </p>
            <NeonButton href="/oyuncaklar/gizli" intensity="purple" size="sm" className="mt-6">
              Cosplay
            </NeonButton>
          </GlowCard>
        </section>
        <section className="mt-20 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <GlowCard className="lg:order-2 flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Kişiselleştirilmiş Öneri</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.28em] text-foreground">
              Hangisi sana göre?
            </h3>
            <p className="mt-3 text-sm text-muted">
              Beklentinizi, kullanım senaryonuzu ve bakım alışkanlıklarınızı birkaç soruyla paylaşın; sizin için 1 bebek ve 2 yan ürün önerelim.
            </p>

            {/* Quiz İstatistikleri */}
            <div className="mt-6 grid grid-cols-3 gap-6 w-full max-w-xs">
              <div className="flex flex-col items-center">
                <p className="text-3xl font-bold text-foreground">5</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Soru</p>
              </div>
              <div className="flex flex-col items-center border-x border-[rgba(157,78,221,0.2)]">
                <p className="text-3xl font-bold text-foreground">~2</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Dakika</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl font-bold text-foreground">3</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Öneri</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted max-w-sm">
              AI destekli öneri sistemimiz, tercihlerinize göre size en uygun manken ve aksesuarları seçer.
            </p>

            <NeonButton href="/quiz" intensity="pink" size="md" className="mt-6">
              Quiz&apos;e Başla
            </NeonButton>
          </GlowCard>
          <div className="space-y-5">
            <header>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Eğitim</p>
              <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.28em] text-foreground">
                Eğitim Merkezi
              </h3>
            </header>
            <div className="space-y-4">
              {featurePosts.map((post) => (
                <Link
                  href={`/egitim/${post.slug}`}
                  key={post.slug}
                  className="block rounded-[18px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-5 transition hover:border-[rgba(0,180,216,0.35)]"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">
                    {post.topics.join(", ")}
                  </p>
                  <h4 className="mt-2 font-semibold uppercase tracking-[0.28em] text-foreground">
                    {post.title}
                  </h4>
                  <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                  <p className="mt-2 text-xs text-muted">Okuma süresi ≈ {post.readingMinutes} dk</p>
                </Link>
              ))}
            </div>
            <NeonButton href="/egitim" size="sm" intensity="blue">
              Tüm Eğitim İçerikleri
            </NeonButton>
          </div>
        </section>
        <section className="mt-20 rounded-[32px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.7)] p-10 shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Manifesto</p>
          <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.28em] text-foreground">
            Mahremiyet. Teknoloji. Zarafet.
          </h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <p className="text-sm text-muted">
              Adult X, gerçeklik deneyimini mahremiyet merkezli teknolojilerle yeniden tasarlıyor. Neon glow estetiğini minimalizmle buluşturuyor, her temas noktasında güven ve gizlilik sunuyoruz.
            </p>
            <p className="text-sm text-muted">
              Gizli paketleme, isimsiz faturalar, KVKK uyumlu veri işleme ve uzman bakım rehberleri ile her adımı şeffaf biçimde paylaşıyoruz. Tasarım stüdyomuzda geliştirilen silikon dokular etik ve sürdürülebilir tedarikten geliyor.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <NeonButton href="/hakkimizda" size="sm" intensity="blue">
              Hakkımızda
            </NeonButton>
            <NeonButton href="/teknoloji-tasarim" size="sm" intensity="purple">
              Teknoloji & Tasarım
            </NeonButton>
          </div>
        </section>
      </div>
    </>
  );
}
