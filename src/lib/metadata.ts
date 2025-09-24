import type { Metadata } from "next";

const baseUrl = "https://adultz.example";

export function buildMetadata({
  title,
  description,
  path,
  image = "/og/cover.svg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${baseUrl}${path}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      locale: "tr_TR",
      siteName: "Adult Z",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: {
        tr: url,
      },
    },
  };
}
