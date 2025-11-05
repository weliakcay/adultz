import type { Metadata } from "next";
import { Saira, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteTitle = "Adult X | Geleceğin Gerçeklik Deneyimi";
const siteDescription =
  "Adult X: Realistik silikon bebekler ve modern gizli oyuncaklarla mahremiyet odaklı premium deneyim.";

export const metadata: Metadata = {
  metadataBase: new URL("https://adultz.example"),
  title: {
    default: siteTitle,
    template: "%s | Adult X",
  },
  description: siteDescription,
  applicationName: "Adult X",
  keywords: [
    "realistik bebek",
    "premium oyuncaklar",
    "mahremiyet",
    "gizli kargo",
    "adult x",
  ],
  category: "commerce",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://adultz.example",
    siteName: "Adult X",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/og/cover.svg",
        width: 1200,
        height: 630,
        alt: "Adult X neon hero görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@adultx",
    images: ["/og/cover.svg"],
  },
  alternates: {
    canonical: "https://adultz.example",
    languages: {
      tr: "https://adultz.example",
    },
  },
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/apple-touch.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${saira.variable} ${inter.variable} font-sans bg-background text-foreground antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
