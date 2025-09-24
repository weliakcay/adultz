"use client";

import { useMemo, useState } from "react";
import { useAnalytics } from "@/components/providers/use-analytics";
import { dolls } from "@/data/dolls";
import { accessories } from "@/data/accessories";
import { NeonButton } from "@/components/ui/neon-button";

type QuizOption = {
  value: string;
  label: string;
  description: string;
};

type QuizQuestion = {
  id: string;
  title: string;
  options: QuizOption[];
};

const quizQuestions: QuizQuestion[] = [
  {
    id: "experience",
    title: "Adult Z deneyiminden temel beklentiniz nedir?",
    options: [
      {
        value: "companionship",
        label: "Sakin ve dengeli eşlik",
        description: "Günlük ritminize uyum sağlayan daha sakin bir persona",
      },
      {
        value: "mindfulness",
        label: "Mindfulness & uyku desteği",
        description: "Gece rutinleri ve nefes ritmi ile eşleşmek",
      },
      {
        value: "active",
        label: "Dinamik ve enerjik kullanım",
        description: "Aktif yaşam, farklı pozlar ve spor uyumu",
      },
    ],
  },
  {
    id: "environment",
    title: "En çok hangi kullanım senaryosu size uygun?",
    options: [
      {
        value: "home",
        label: "Ev içi sakin atmosfer",
        description: "Minimal alan ve sessizlik önceliği",
      },
      {
        value: "travel",
        label: "Sık seyahat eden",
        description: "Taşınabilirlik ve gizli taşıma öncelikli",
      },
      {
        value: "studio",
        label: "Stüdyo / performans",
        description: "Sahne ve fotoğraf çekimi senaryoları",
      },
    ],
  },
  {
    id: "material",
    title: "Doku tercihiniz hangisi?",
    options: [
      {
        value: "satin",
        label: "Saten dokunuş",
        description: "Yumuşak hissiyat, düşük sürtünme",
      },
      {
        value: "gel",
        label: "Jel dolgulu",
        description: "Vücut ısısına duyarlı form",
      },
      {
        value: "athletic",
        label: "Kas hissi",
        description: "Dayanıklı dış katman, yüksek destek",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Bakım kolaylığı sizin için ne kadar önemli?",
    options: [
      {
        value: "low",
        label: "Minimum bakım",
        description: "Haftada bir hafif temizlik yeterli olsun",
      },
      {
        value: "routine",
        label: "Rutin bakım yapabilirim",
        description: "Detaylı bakım ritüellerinden keyif alırım",
      },
      {
        value: "assisted",
        label: "Destek almak isterim",
        description: "Servis ve hatırlatma desteği önemli",
      },
    ],
  },
  {
    id: "delivery",
    title: "Teslimat hızı önceliğiniz nedir?",
    options: [
      {
        value: "standard",
        label: "Standart (~30 gün)",
        description: "Normal üretim süreci yeterli",
      },
      {
        value: "priority",
        label: "Hızlandırılmış (~21 gün)",
        description: "Ek ücretle daha hızlı teslim almak isterim",
      },
      {
        value: "flexible",
        label: "Esnek (45 güne kadar)",
        description: "Özel kişiselleştirme için bekleyebilirim",
      },
    ],
  },
];

type Answers = Record<string, string>;

function evaluateResult(answers: Answers) {
  const persona = answers.experience;
  if (!persona) return null;

  const recommendedDoll =
    persona === "mindfulness"
      ? dolls.find((doll) => doll.slug === "luna-serenity")
      : persona === "active"
      ? dolls.find((doll) => doll.slug === "maya-pulse")
      : dolls.find((doll) => doll.slug === "aurora-neon");

  const accessory1 =
    answers.environment === "travel"
      ? accessories.find((item) => item.slug === "shadow-case")
      : accessories.find((item) => item.slug === "nebula-touch");

  const accessory2 =
    answers.maintenance === "low"
      ? accessories.find((item) => item.slug === "veil-kit")
      : accessories.find((item) => item.slug === "zen-audio-diffuser");

  return {
    doll: recommendedDoll,
    accessories: [accessory1, accessory2].filter(Boolean),
  };
}

export function QuizForm() {
  const { track } = useAnalytics();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [completed, setCompleted] = useState(false);

  const currentQuestion = quizQuestions[step];
  const result = useMemo(() => evaluateResult(answers), [answers]);

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    if (step === 0) {
      track("quiz_start");
    }
    if (step < quizQuestions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setCompleted(true);
      track("quiz_finish", { answers });
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="rounded-[28px] border border-[rgba(157,78,221,0.25)] bg-[rgba(7,7,12,0.8)] p-8 text-center shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Sonuç</p>
        <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.3em] text-foreground">
          Sizin İçin Önerimiz
        </h3>
        {result?.doll ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-[20px] border border-[rgba(0,180,216,0.35)] bg-[rgba(0,180,216,0.18)] p-5">
              <h4 className="font-semibold uppercase tracking-[0.28em] text-foreground">
                {result.doll.name}
              </h4>
              <p className="mt-2 text-sm text-muted">{result.doll.subtitle}</p>
              <NeonButton
                href={`/bebekler/${result.doll.slug}`}
                intensity="blue"
                size="sm"
                eventName="card_open"
                className="mt-4"
              >
                Profili Aç
              </NeonButton>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Yan Ürün Önerileri
              </p>
              {result.accessories?.map((item) => (
                <div
                  key={item!.slug}
                  className="rounded-[18px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.65)] p-4 text-left"
                >
                  <p className="font-semibold uppercase tracking-[0.28em] text-foreground">
                    {item!.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item!.specs}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">
            Şu an için net bir tavsiye çıkaramadık. Destek ekibimiz size özel seçenekler sunabilir.
          </p>
        )}
        <div className="mt-8 flex justify-center">
          <NeonButton intensity="pink" size="sm" onClick={restart}>
            Yeniden Başla
          </NeonButton>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[rgba(157,78,221,0.25)] bg-[rgba(7,7,12,0.8)] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">
        Soru {step + 1} / {quizQuestions.length}
      </p>
      <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.3em] text-foreground">
        {currentQuestion.title}
      </h3>
      <div className="mt-6 space-y-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className="w-full rounded-[20px] border border-[rgba(157,78,221,0.25)] bg-[rgba(12,12,20,0.65)] px-6 py-5 text-left transition hover:border-[rgba(0,180,216,0.35)]"
          >
            <p className="font-semibold uppercase tracking-[0.28em] text-foreground">
              {option.label}
            </p>
            <p className="mt-1 text-sm text-muted">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
