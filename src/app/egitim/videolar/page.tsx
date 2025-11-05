import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

const videos = [
  {
    title: "Bakım Ritüeli 101",
    duration: "04:32",
    description: "Haftalık bakım adımlarının tamamını 5 dakikadan kısa sürede öğrenin.",
  },
  {
    title: "Gizli Paketleme Nasıl Çalışır?",
    duration: "03:18",
    description: "Adult X lojistik zincirinin mahremiyet standartları.",
  },
  {
    title: "Orbit İskelet Esneklik Testi",
    duration: "05:24",
    description: "Adult X bebeklerinin dayanıklılık testleri ve dikkat edilmesi gerekenler.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Adult X Eğitim Videoları",
  description: "Bakım, teknoloji ve lojistik videoları ile Adult X deneyimine hazırlanın.",
  path: "/egitim/videolar",
});

export default function EducationVideosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Video Arşivi</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Eğitim Videoları
        </h1>
        <p className="mt-4 text-sm text-muted">
          Tüm videolar sessiz başlar, altyazı içerir ve gizli oynatma listesine kaydedilir. Final prodüksiyonda kendi videolarınızı ekleyin.
        </p>
      </header>
      <div className="mt-12 space-y-4">
        {videos.map((video) => (
          <div
            key={video.title}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.65)] p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl uppercase tracking-[0.28em] text-foreground">
                  {video.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{video.description}</p>
              </div>
              <span className="rounded-full border border-[rgba(157,78,221,0.3)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted">
                {video.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
