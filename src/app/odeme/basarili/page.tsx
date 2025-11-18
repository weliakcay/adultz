"use client";

import Link from "next/link";
import { NeonButton } from "@/components/ui/neon-button";

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="rounded-[32px] border border-[rgba(0,180,216,0.3)] bg-[rgba(12,12,20,0.7)] p-12 shadow-[0_30px_90px_rgba(0,180,216,0.25)]">
          {/* Success Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-[rgba(0,180,216,0.6)] bg-[rgba(0,180,216,0.15)] shadow-[0_0_40px_rgba(0,180,216,0.4)]">
            <svg
              className="h-12 w-12 text-[rgba(0,180,216,1)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="mt-8 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
            Siparişiniz Alındı!
          </h1>
          <p className="mt-4 text-lg text-muted">
            Ödemeniz başarıyla tamamlandı. Siparişiniz hazırlanıyor.
          </p>

          {/* Order Info */}
          <div className="mt-8 space-y-3 rounded-[16px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6">
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-[rgba(0,180,216,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-muted">
                Sipariş onay e-postanız gönderildi
              </p>
            </div>
            <p className="text-xs text-muted">
              E-postanızı kontrol edin. Sipariş detaylarınız ve takip numaranız e-posta adresinize gönderildi.
            </p>
          </div>

          {/* Next Steps */}
          <div className="mt-8 space-y-4 text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Sıradaki Adımlar</p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(157,78,221,0.3)] bg-[rgba(157,78,221,0.1)] text-sm font-semibold text-foreground">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Sipariş Hazırlanıyor</p>
                  <p className="mt-1 text-xs text-muted">
                    Ürünleriniz özenle paketleniyor. Gizli paketleme garantisi ile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(157,78,221,0.3)] bg-[rgba(157,78,221,0.1)] text-sm font-semibold text-foreground">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Kargo Takibi</p>
                  <p className="mt-1 text-xs text-muted">
                    Kargo takip numaranız e-posta ve SMS ile gönderilecek.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(157,78,221,0.3)] bg-[rgba(157,78,221,0.1)] text-sm font-semibold text-foreground">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Teslimat</p>
                  <p className="mt-1 text-xs text-muted">
                    Paketiniz 3-5 iş günü içinde adresinize teslim edilecek.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Reminder */}
          <div className="mt-8 rounded-[16px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-[rgba(157,78,221,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                  Gizlilik Garantisi
                </p>
                <p className="mt-2 text-xs text-muted">
                  Kargo paketinizde ürün ismi veya kategorisi belirtilmez. Tüm belgeler gizlilik esasına göre hazırlanır. Verileriniz KVKK kapsamında korunur.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <NeonButton href="/bebekler" intensity="blue" size="md">
              Alışverişe Devam Et
            </NeonButton>
            <NeonButton href="/egitim" intensity="purple" size="md">
              Bakım Rehberlerini İncele
            </NeonButton>
          </div>

          {/* Support Link */}
          <p className="mt-8 text-xs text-muted">
            Sorularınız mı var?{" "}
            <Link href="/destek" className="text-foreground underline hover:text-[rgba(0,180,216,1)]">
              Destek Merkezimize
            </Link>{" "}
            göz atın veya{" "}
            <Link href="/iletisim" className="text-foreground underline hover:text-[rgba(0,180,216,1)]">
              bizimle iletişime geçin
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
