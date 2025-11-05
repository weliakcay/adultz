import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Adult X Hesabım",
  description: "Adult X hesabınızla siparişleri takip edin, gizlilik tercihlerinizi yönetin ve destek geçmişini görün.",
  path: "/hesap",
});

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Hesap</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Adult X Hesabı
        </h1>
        <p className="mt-4 text-sm text-muted">
          Bu sayfa üretim aşamasında. Vercel dağıtımı sonrasında Auth sağlayıcınızı bağlayarak sipariş, gizlilik ve kişiselleştirme geçmişini gösterebilirsiniz.
        </p>
      </header>
      <section className="mt-12 space-y-4 text-sm text-muted">
        <div className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6">
          <strong className="text-foreground">Sipariş Takibi:</strong> Vercel edge middleware ile kullanıcı oturumlarını doğrulayabilir ve gizli takip linkleri sunabilirsiniz.
        </div>
        <div className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6">
          <strong className="text-foreground">Gizlilik Tercihleri:</strong> KVKK metni ve açık rıza yönetimine dair bileşenleri burada konumlandırın.
        </div>
      </section>
    </div>
  );
}
