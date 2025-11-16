import { NeonButton } from "@/components/ui/neon-button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
      >
        <source src="https://cdn.coverr.co/videos/coverr-digital-woman-8615/1080p.mp4" type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      <div className="absolute inset-0 bg-[rgba(7,7,12,0.75)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(7,7,12,0.65)] to-[rgba(7,7,12,0.9)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 py-32 text-center sm:py-40">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Adult X Manifesto</p>
        <h1 className="glitch-text font-display text-4xl uppercase tracking-[0.32em] text-foreground sm:text-5xl"
          data-text="Geleceğin Gerçeklik Deneyimi"
        >
          Geleceğin Gerçeklik Deneyimi
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-muted sm:text-base">
          Realistik silikon bebekler ve premium modern ürünlerle mahremiyet, güvenlik ve zarafet arasında yeni bir standart oluşturuyoruz. Gizli paketleme, isimsiz faturalandırma ve KVKK uyumluluğu adult deneyimi yeniden tanımlar.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NeonButton
            href="/bebekler"
            size="lg"
            intensity="blue"
            eventName="hero_cta_click"
          >
            Bebekleri Keşfet
          </NeonButton>
          <NeonButton
            href="/bebekler/ozellestir"
            size="lg"
            intensity="purple"
            eventName="hero_cta_click"
          >
            Sohbet Botu
          </NeonButton>
        </div>
        <p className="text-xs text-muted">
          18+ içeriktir. Tüm görseller ve videolar telifsiz placeholder görsellerdir; final prodüksiyonda değiştirilmelidir.
        </p>
      </div>
    </section>
  );
}
