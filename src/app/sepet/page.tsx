"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { NeonButton } from "@/components/ui/neon-button";
import { getProxiedImageUrl } from "@/lib/image-utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShippingCost, getTotal, itemCount } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (itemCount === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="rounded-[32px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-12 shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
            <svg
              className="mx-auto h-20 w-20 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h1 className="mt-6 font-display text-3xl uppercase tracking-[0.3em] text-foreground">
              Sepetiniz Boş
            </h1>
            <p className="mt-4 text-sm text-muted">
              Henüz sepetinize ürün eklemediniz. Koleksiyonumuzu keşfetmek için alışverişe başlayın.
            </p>
            <NeonButton href="/bebekler" intensity="purple" size="md" className="mt-8">
              Alışverişe Başla
            </NeonButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Alışveriş Sepeti</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Sepetim
        </h1>
        <p className="mt-4 text-sm text-muted">
          {itemCount} ürün sepetinizde
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Ürün Listesi */}
        <div className="space-y-4">
          {items.map((item) => {
            const proxiedImage = getProxiedImageUrl(item.image);
            return (
              <div
                key={item.id}
                className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition hover:border-[rgba(0,180,216,0.3)]"
              >
                <div className="flex gap-6">
                  {/* Ürün Görseli */}
                  <Link
                    href={`/bebekler/${item.slug}`}
                    className="relative h-32 w-24 shrink-0 overflow-hidden rounded-[16px]"
                  >
                    <Image
                      src={proxiedImage}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                      sizes="96px"
                    />
                  </Link>

                  {/* Ürün Bilgileri */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/bebekler/${item.slug}`}
                        className="font-display text-xl uppercase tracking-[0.28em] text-foreground transition hover:text-[rgba(0,180,216,1)]"
                      >
                        {item.name}
                      </Link>
                      {item.options && (
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
                          {item.options.skinTone && (
                            <span className="rounded-full border border-[rgba(157,78,221,0.2)] bg-[rgba(157,78,221,0.1)] px-3 py-1">
                              Cilt: {item.options.skinTone}
                            </span>
                          )}
                          {item.options.hair && (
                            <span className="rounded-full border border-[rgba(157,78,221,0.2)] bg-[rgba(157,78,221,0.1)] px-3 py-1">
                              Saç: {item.options.hair}
                            </span>
                          )}
                          {item.options.eyes && (
                            <span className="rounded-full border border-[rgba(157,78,221,0.2)] bg-[rgba(157,78,221,0.1)] px-3 py-1">
                              Göz: {item.options.eyes}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Miktar Kontrolü */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] text-foreground transition hover:border-[rgba(0,180,216,0.5)] hover:bg-[rgba(0,180,216,0.1)]"
                          aria-label="Azalt"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] text-foreground transition hover:border-[rgba(0,180,216,0.5)] hover:bg-[rgba(0,180,216,0.1)]"
                          aria-label="Artır"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Fiyat ve Sil */}
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-semibold text-foreground">
                          {formatPrice(item.price * item.quantity)} {item.currency}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,0,84,0.3)] bg-[rgba(255,0,84,0.1)] text-[rgba(255,0,84,1)] transition hover:border-[rgba(255,0,84,0.5)] hover:bg-[rgba(255,0,84,0.2)]"
                          aria-label="Sepetten Çıkar"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sipariş Özeti */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              Sipariş Özeti
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Ara Toplam</span>
                <span className="text-foreground">{formatPrice(getSubtotal())} TL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Kargo</span>
                <span className="text-foreground">
                  {getShippingCost() === 0 ? "Ücretsiz" : `${formatPrice(getShippingCost())} TL`}
                </span>
              </div>
              <div className="border-t border-[rgba(157,78,221,0.2)] pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Toplam</span>
                  <span className="text-2xl font-bold text-foreground">{formatPrice(getTotal())} TL</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <NeonButton href="/odeme" intensity="purple" size="lg" className="w-full">
                Ödemeye Geç
              </NeonButton>
              <NeonButton href="/bebekler" intensity="blue" size="md" className="w-full">
                Alışverişe Devam Et
              </NeonButton>
            </div>

            {/* Güvenlik ve Kargo Bilgileri */}
            <div className="mt-8 space-y-3 border-t border-[rgba(157,78,221,0.2)] pt-6">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 shrink-0 text-[rgba(0,180,216,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Güvenli Ödeme</p>
                  <p className="mt-1 text-xs text-muted">256-bit SSL şifreleme</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 shrink-0 text-[rgba(0,180,216,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Gizli Paketleme</p>
                  <p className="mt-1 text-xs text-muted">Ürün ismi gözükmez</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 shrink-0 text-[rgba(0,180,216,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Ücretsiz Kargo</p>
                  <p className="mt-1 text-xs text-muted">Tüm siparişlerde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
