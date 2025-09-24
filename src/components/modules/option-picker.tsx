"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { useAnalytics } from "@/components/providers/use-analytics";
import { useToast } from "@/components/providers/use-toast";
import { StickyCartDrawer } from "@/components/modules/sticky-cart-drawer";

const basePrice = 72000;

const heroPreview = [
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    alt: "Adult Z bebek önizleme",
  },
  {
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    alt: "Önizleme ikinci açı",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    alt: "Önizleme üçüncü açı",
  },
];

type StepOption = {
  value: string;
  label: string;
  description: string;
  priceDelta: number;
};

type Step = {
  id: string;
  title: string;
  subtitle: string;
  options: StepOption[];
};

const steps: Step[] = [
  {
    id: "body",
    title: "Gövde & Boy",
    subtitle: "Formunuzu ve kullanım senaryonuzu seçin.",
    options: [
      {
        value: "165-classic",
        label: "165 cm Zarif Form",
        description: "Dengeli ağırlık merkezli, ev içi kullanım için ideal.",
        priceDelta: 0,
      },
      {
        value: "158-light",
        label: "158 cm Hafif Form",
        description: "Meditatif ve taşınabilir kullanım için hafifletilmiş gövde.",
        priceDelta: 3200,
      },
      {
        value: "172-athletic",
        label: "172 cm Atletik",
        description: "Aktif yaşam ritmine uygun karbon destekli yapı.",
        priceDelta: 5200,
      },
    ],
  },
  {
    id: "skin",
    title: "Cilt Tonu",
    subtitle: "Medikal sınıf silikon tonunuzu seçin.",
    options: [
      {
        value: "opal",
        label: "Opal",
        description: "Serin alt ton, neon ışıkta parlaklık.",
        priceDelta: 0,
      },
      {
        value: "champagne",
        label: "Şampanya",
        description: "Yumuşak altın yansıma, sıcak dokunuş.",
        priceDelta: 900,
      },
      {
        value: "siber-bronze",
        label: "Siber Bronz",
        description: "Gün batımı yansımalarına uyumlu koyu ton.",
        priceDelta: 1300,
      },
    ],
  },
  {
    id: "hair",
    title: "Saç",
    subtitle: "Fiber-optik güçlendirilmiş saç seçenekleri.",
    options: [
      {
        value: "safran-waves",
        label: "Safran Dalgalar",
        description: "Yumuşak dalga, ısıya dayanıklı lif.",
        priceDelta: 450,
      },
      {
        value: "graphite-short",
        label: "Grafit Kısa",
        description: "Minimal bakım, modern görünüm.",
        priceDelta: 0,
      },
      {
        value: "ombre-long",
        label: "Ombre Uzun",
        description: "Çift tonlu neon uçlar.",
        priceDelta: 780,
      },
    ],
  },
  {
    id: "eyes",
    title: "Göz",
    subtitle: "Optik cam yansımalarıyla desteklenmiş seçenekler.",
    options: [
      {
        value: "kobalt",
        label: "Kobalt",
        description: "Neon mavi parıltı.",
        priceDelta: 0,
      },
      {
        value: "amber",
        label: "Amber",
        description: "Sıcak odak ve gece ışığı.",
        priceDelta: 420,
      },
      {
        value: "lavender",
        label: "Lavanta",
        description: "Soft mor yansımalar.",
        priceDelta: 620,
      },
    ],
  },
  {
    id: "skeleton",
    title: "İskelet",
    subtitle: "Hareket kapasitesini belirleyin.",
    options: [
      {
        value: "standard-flex",
        label: "Standart Esnek",
        description: "Günlük kullanım için sessiz eklemler.",
        priceDelta: 0,
      },
      {
        value: "dance-module",
        label: "Dans Modülü",
        description: "320° hareket, sahne uyumu.",
        priceDelta: 2600,
      },
      {
        value: "athletic-frame",
        label: "Atletik Şasi",
        description: "Spor odaklı dayanıklı çerçeve.",
        priceDelta: 3100,
      },
    ],
  },
  {
    id: "accessories",
    title: "Aksesuar",
    subtitle: "Kişisel bakım ve kullanım setini seçin.",
    options: [
      {
        value: "veil-kit",
        label: "Veil Gizlilik Kiti",
        description: "Saklama ve kokusuz koruma.",
        priceDelta: 1850,
      },
      {
        value: "zen-audio",
        label: "Zen Audio Difüzör",
        description: "Aroma ve ses senkronu.",
        priceDelta: 3500,
      },
      {
        value: "shadow-case",
        label: "Shadow Case Valiz",
        description: "Kilitle korunan seyahat valizi.",
        priceDelta: 5600,
      },
    ],
  },
  {
    id: "summary",
    title: "Özet",
    subtitle: "Seçimlerinizi kontrol edin ve siparişi tamamlayın.",
    options: [],
  },
];

type Selections = Record<string, StepOption | null>;

export function OptionPicker() {
  const { track } = useAnalytics();
  const { pushToast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selections, setSelections] = useState<Selections>(() => {
    const initial: Selections = {};
    steps.forEach((step) => {
      initial[step.id] = step.options[0] ?? null;
    });
    return initial;
  });
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      track("customize_start", { step: steps[currentStep]?.id });
    }
  }, [currentStep, track]);

  const isSummary = steps[currentStep]?.id === "summary";

  const totalPrice = useMemo(() => {
    return (
      basePrice +
      Object.values(selections).reduce((acc, option) => {
        if (!option) return acc;
        return acc + option.priceDelta;
      }, 0)
    );
  }, [selections]);

  const handleSelect = (stepId: string, option: StepOption) => {
    setSelections((prev) => ({ ...prev, [stepId]: option }));
    setPreviewIndex((prev) => (prev + 1) % heroPreview.length);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleComplete = () => {
    track("customize_finish", { price: totalPrice });
    pushToast({
      title: "Adult Z Sepete Eklendi",
      description: "Tercihleriniz gizli olarak kaydedildi.",
      variant: "success",
    });
    setDrawerOpen(true);
  };

  return (
    <div className="rounded-[32px] border border-[rgba(157,78,221,0.25)] bg-[rgba(7,7,12,0.78)] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[rgba(157,78,221,0.25)] bg-[rgba(12,12,20,0.8)]">
            <Image
              src={heroPreview[previewIndex].src}
              alt={heroPreview[previewIndex].alt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 480px, 100vw"
            />
            <div className="absolute left-4 top-4 rounded-full bg-[rgba(0,180,216,0.28)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted">
              Tahmini teslim: ~ 1 ay
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Toplam
              </p>
              <p className="text-3xl font-semibold text-foreground">
                {totalPrice.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
              </p>
              <p className="text-xs text-muted">Kişiselleştirme ücretleri dahildir.</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">İlerleme</p>
              <p className="text-sm text-muted">
                {currentStep + 1} / {steps.length}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              {steps[currentStep].subtitle}
            </p>
            <h3 className="font-display text-2xl uppercase tracking-[0.3em] text-foreground">
              {steps[currentStep].title}
            </h3>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[rgba(157,78,221,0.9)] to-[rgba(0,180,216,0.8)] transition-all"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
          {!isSummary ? (
            <div className="mt-6 space-y-4">
              {steps[currentStep].options.map((option) => {
                const isActive = selections[steps[currentStep].id]?.value === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(steps[currentStep].id, option)}
                    className={clsx(
                      "w-full rounded-[20px] border px-5 py-4 text-left transition",
                      isActive
                        ? "border-[rgba(0,180,216,0.65)] bg-[rgba(0,180,216,0.16)]"
                        : "border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.65)] hover:border-[rgba(157,78,221,0.35)]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold uppercase tracking-[0.28em] text-foreground">
                          {option.label}
                        </p>
                        <p className="mt-1 text-sm text-muted">{option.description}</p>
                      </div>
                      <span className="text-sm text-muted">
                        {option.priceDelta === 0
                          ? "Dahil"
                          : option.priceDelta > 0
                          ? `+${option.priceDelta.toLocaleString("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                            })}`
                          : option.priceDelta.toLocaleString("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                            })}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="rounded-[20px] border border-[rgba(157,78,221,0.25)] bg-[rgba(12,12,20,0.65)] p-5">
                <h4 className="font-semibold uppercase tracking-[0.3em] text-foreground">
                  Seçimleriniz
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {steps
                    .filter((step) => step.id !== "summary")
                    .map((step) => (
                      <li key={step.id}>
                        <span className="font-semibold text-foreground">{step.title}:</span> {selections[step.id]?.label}
                      </li>
                    ))}
                </ul>
              </div>
              <p className="text-xs text-muted">
                Tüm siparişler gizli paketlenir, isimsiz fatura ile gönderilir ve kurye tesliminden önce randevu alınır.
              </p>
              <button
                type="button"
                onClick={handleComplete}
                className="w-full rounded-full border border-[rgba(255,0,84,0.6)] bg-[rgba(255,0,84,0.18)] px-6 py-4 text-xs uppercase tracking-[0.32em] text-foreground"
              >
                Sepete Ekle
              </button>
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="disabled:opacity-40"
            >
              Geri
            </button>
            <span>
              KVKK uyumlu veri işleme | Gizli paketleme | Isimsiz fatura
            </span>
            <button
              type="button"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="disabled:opacity-40"
            >
              İleri
            </button>
          </div>
        </div>
      </div>
      <StickyCartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        summary={{
          name: "Adult Z Kişiselleştirilmiş Bebek",
          price: totalPrice,
          currency: "TRY",
          selections: steps
            .filter((step) => step.id !== "summary")
            .map((step) => ({
              label: step.title,
              value: selections[step.id]?.label ?? "Seçilmedi",
            })),
        }}
      />
    </div>
  );
}
