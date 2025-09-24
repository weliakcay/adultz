import Link from "next/link";

const quickLinks = [
  { label: "Bebekler", href: "/bebekler" },
  { label: "Modern Oyuncaklar", href: "/oyuncaklar/modern" },
  { label: "Gizli Oyuncaklar", href: "/oyuncaklar/gizli" },
  { label: "Quiz", href: "/quiz" },
  { label: "Eğitim", href: "/egitim" },
];

const supportLinks = [
  { label: "Beden Rehberi", href: "/destek/beden-rehberi" },
  { label: "Bakım Rehberi", href: "/destek/bakim-rehberi" },
  { label: "SSS", href: "/destek/sss" },
  { label: "Gizlilik", href: "/gizlilik" },
  { label: "KVKK", href: "/destek/kvkk" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/adultz" },
  { label: "X", href: "https://x.com/adultz" },
  { label: "YouTube", href: "https://youtube.com/@adultz" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[rgba(157,78,221,0.18)] bg-[rgba(7,7,12,0.82)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-full lg:col-span-1">
          <p className="font-display text-xl uppercase tracking-[0.35em] text-foreground">
            Adult Z
          </p>
          <p className="mt-4 text-sm text-muted">
            Mahremiyet odaklı, teknoloji destekli gerçeklik deneyimleri. Gizli paketleme ve isimsiz faturalandırma standart.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
            Keşfet
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-foreground" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
            Destek
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {supportLinks.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-foreground" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
            Sosyal
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-foreground" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xs text-muted">
            <p>© {new Date().getFullYear()} Adult Z Labs.</p>
            <p>Gizli lojistik partnerleriyle Türkiye geneli teslimat.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
