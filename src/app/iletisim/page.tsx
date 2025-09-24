import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Adult Z İletişim",
  description: "Adult Z destek hattı, gizli chat ve randevulu danışmanlık seçenekleri.",
  path: "/iletisim",
});

const channels = [
  {
    title: "Gizli Chat",
    details: "7/24 erişim, kimlik doğrulama yok, 24 saat sonra anonimleştirilir.",
  },
  {
    title: "Randevulu Sesli Destek",
    details: "Hafta içi 09:00-22:00, tüm görüşmeler şifrelenir.",
  },
  {
    title: "Atölye Ziyareti",
    details: "İstanbul Maslak showroom, gizli giriş ve NDA ile deneyim.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">İletişim</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Bize Ulaşın
        </h1>
        <p className="mt-4 text-sm text-muted">
          Adult Z destek ekibi gizli iletişim kanallarıyla hizmet verir. Tüm görüşmeler uçtan uca şifrelenir ve yalnızca destek amaçlı kullanılır.
        </p>
      </header>
      <div className="mt-12 space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.title}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {channel.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{channel.details}</p>
          </div>
        ))}
      </div>
      <section className="mt-10 rounded-[24px] border border-[rgba(0,180,216,0.35)] bg-[rgba(0,180,216,0.18)] p-6 text-sm text-muted">
        <p>destek@adultz.com • +90 850 000 00 00 • KVKK sorumlusu: kvkk@adultz.com</p>
      </section>
    </div>
  );
}
