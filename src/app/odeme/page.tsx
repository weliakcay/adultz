"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import type { ShippingInfo } from "@/types/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getShippingCost, getTotal, itemCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    note: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: PayTR entegrasyonu burada yapılacak
      // Şimdilik simüle ediyoruz
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sipariş başarılı - sepeti temizle ve başarı sayfasına yönlendir
      clearCart();
      router.push("/odeme/basarili");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sepet boşsa sepet sayfasına yönlendir
  if (itemCount === 0) {
    router.push("/sepet");
    return null;
  }

  const inputClasses =
    "w-full rounded-[12px] border border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-[rgba(0,180,216,0.5)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,180,216,0.2)]";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Güvenli Ödeme</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Ödeme
        </h1>
        <p className="mt-4 text-sm text-muted">
          Teslimat bilgilerinizi girin ve siparişinizi tamamlayın
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Teslimat Bilgileri */}
        <div className="space-y-6">
          {/* İletişim Bilgileri */}
          <div className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              İletişim Bilgileri
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-xs uppercase tracking-[0.2em] text-muted">
                  Ad *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Adınız"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs uppercase tracking-[0.2em] text-muted">
                  Soyad *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Soyadınız"
                />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-muted">
                  E-posta *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="ornek@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-[0.2em] text-muted">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="0555 555 55 55"
                />
              </div>
            </div>
          </div>

          {/* Teslimat Adresi */}
          <div className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              Teslimat Adresi
            </h2>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="address" className="block text-xs uppercase tracking-[0.2em] text-muted">
                  Adres *
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Mahalle, sokak, bina no, daire no"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className="block text-xs uppercase tracking-[0.2em] text-muted">
                    İl *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="İstanbul"
                  />
                </div>
                <div>
                  <label htmlFor="district" className="block text-xs uppercase tracking-[0.2em] text-muted">
                    İlçe *
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Kadıköy"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-xs uppercase tracking-[0.2em] text-muted">
                    Posta Kodu *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="34000"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="note" className="block text-xs uppercase tracking-[0.2em] text-muted">
                  Sipariş Notu (Opsiyonel)
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={2}
                  value={formData.note}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Teslimat için özel talimatlar varsa buraya yazabilirsiniz"
                />
              </div>
            </div>
          </div>

          {/* Gizlilik Bilgilendirmesi */}
          <div className="rounded-[16px] border border-[rgba(0,180,216,0.2)] bg-[rgba(0,180,216,0.05)] p-6">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 shrink-0 text-[rgba(0,180,216,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                  Güvenli ve Gizli Teslimat
                </p>
                <p className="mt-2 text-xs text-muted">
                  Kargo paketinizde ürün ismi veya kategorisi belirtilmez. Fatura ve tüm belgeler gizlilik esasına göre hazırlanır. Kişisel verileriniz KVKK uyumlu şekilde saklanır ve üçüncü şahıslarla paylaşılmaz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sipariş Özeti */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              Sipariş Özeti
            </h2>

            <div className="mt-6 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-foreground">{formatPrice(item.price * item.quantity)} TL</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-[rgba(157,78,221,0.2)] pt-4">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-[rgba(157,78,221,0.65)] bg-[rgba(157,78,221,0.2)] px-8 py-5 text-sm font-semibold uppercase tracking-[0.32em] text-foreground shadow-[0_0_30px_rgba(157,78,221,0.35)] transition hover:bg-[rgba(157,78,221,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(157,78,221,0.5)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(7,7,12,0.9)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "İşleniyor..." : "Siparişi Tamamla"}
            </button>

            <div className="mt-6 text-center text-xs text-muted">
              Devam ederek{" "}
              <a href="/kvkk" className="text-foreground underline hover:text-[rgba(0,180,216,1)]">
                KVKK
              </a>{" "}
              ve{" "}
              <a href="/mesafeli-satis" className="text-foreground underline hover:text-[rgba(0,180,216,1)]">
                Mesafeli Satış Sözleşmesi
              </a>
              &apos;ni kabul etmiş sayılırsınız.
            </div>

            {/* Güvenlik Rozetleri */}
            <div className="mt-8 space-y-3 border-t border-[rgba(157,78,221,0.2)] pt-6">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[rgba(0,180,216,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-xs text-muted">256-bit SSL güvenli ödeme</p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[rgba(0,180,216,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <p className="text-xs text-muted">PayTR güvenli ödeme altyapısı</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
